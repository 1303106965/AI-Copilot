import { v4 as uuidv4 } from "uuid";

import { sqlServerPool } from "../db/sqlserver";

import { getSQLiteDB } from "../db/sqlite";

import { EmbeddingProvider } from "../providers/embedding.provider";

import { buildSearchableText } from "./buildSearchableText";

const embeddingProvider = new EmbeddingProvider();

/**
 * sync semantic schema
 */
export const syncSemanticSchema = async () => {
  const sqliteDB = getSQLiteDB();

  console.log("start sync semantic schema");

  const result = await sqlServerPool.request().query(`
          SELECT *
          FROM semantic_column
        `);

  await sqliteDB.exec(`
      DELETE FROM semantic_metadata
    `);

  for (const row of result.recordset) {
    const searchableText = buildSearchableText(row);

    console.log(
      `embedding:
${row.column_title}`
    );

    const embedding = await embeddingProvider.embed(searchableText);

    await sqliteDB.run(
      `
          INSERT INTO semantic_metadata (
            id,

            table_name,

            table_title,

            column_name,

            column_title,

            data_type,

            searchable_text,

            embedding
          )

          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        uuidv4(),

        row.table_name,

        row.table_title,

        row.column_name,

        row.column_title,

        row.data_type,

        searchableText,

        JSON.stringify(embedding),
      ]
    );
  }

  console.log("semantic schema sync success");
};

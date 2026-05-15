import { db } from "../db/sqlite";

import { EmbeddingProvider } from "../providers/embedding.provider";

/**
 * schema embedding service
 */
export const embedSchema = async () => {
  const provider = new EmbeddingProvider();

  /**
   * 查询所有 schema 字段
   */
  db.all(
    `
    SELECT *
    FROM schema_columns
    `,
    async (err, rows: any[]) => {
      if (err) {
        console.error(err);

        return;
      }

      for (const row of rows) {
        console.log(`embedding: ${row.column_name}`);

        /**
         * 生成 embedding
         */
        const embedding = await provider.embedding(row.searchable_text);

        /**
         * 存入 SQLite
         */
        db.run(
          `
          UPDATE schema_columns
          SET embedding = ?
          WHERE id = ?
          `,
          [JSON.stringify(embedding), row.id]
        );
      }

      console.log("schema embedding success");
    }
  );
};

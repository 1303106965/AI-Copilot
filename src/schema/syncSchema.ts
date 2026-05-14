import { v4 as uuidv4 } from "uuid";

import { db } from "../db/sqlite";

import { loadSchemaFromSQLServer } from "./loadSchema";

/**
 * 同步 SQLServer schema 到 SQLite
 */
export const syncSchema = async () => {
  const schemaList = await loadSchemaFromSQLServer();

  for (const item of schemaList) {
    /**
     * searchableText:
     * 后面用于 embedding 的语义文本
     */
    const searchableText = `
      表名 ${item.TABLE_NAME}

      字段名 ${item.COLUMN_NAME}

      类型 ${item.DATA_TYPE}
    `;

    db.run(
      `
      INSERT INTO schema_columns (
        id,

        db_id,

        table_name,
        table_title,

        column_name,
        column_title,

        data_type,

        searchable_text
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        uuidv4(),

        process.env.SQL_DATABASE,

        item.TABLE_NAME,
        item.TABLE_NAME,

        item.COLUMN_NAME,
        item.COLUMN_NAME,

        item.DATA_TYPE,

        searchableText,
      ]
    );
  }

  console.log("schema sync success");
};

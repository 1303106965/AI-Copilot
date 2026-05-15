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
   * 字段中文注释
   */
  const comment =
  item.COLUMN_COMMENT ||
  item.COLUMN_NAME

  /**
  * embedding 语义文本
  */
  const searchableText = `
  数据库 ${process.env.SQL_DATABASE}

  数据表 ${item.TABLE_NAME}

  字段名 ${item.COLUMN_NAME}

  字段中文名 ${comment}

  数据类型 ${item.DATA_TYPE}

  这个字段属于 ${item.TABLE_NAME} 表

  业务含义 ${comment}
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

import { db } from "./sqlite";

export const initDB = async () => {
  db.serialize(() => {
    /**
     * schema 字段表
     */
    db.run(`
      CREATE TABLE IF NOT EXISTS schema_columns (
        id TEXT PRIMARY KEY,

        db_id TEXT,

        table_name TEXT,
        table_title TEXT,

        column_name TEXT,
        column_title TEXT,

        data_type TEXT,

        searchable_text TEXT,

        embedding TEXT
      )
    `);
  });
};

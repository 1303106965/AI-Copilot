import sqlite3 from "sqlite3";

import { open, Database } from "sqlite";

/**
 * sqlite db
 */
let sqliteDB: Database;

/**
 * init sqlite
 */
export const initSQLite = async () => {
  sqliteDB = await open({
    filename: "./data/semantic.db",

    driver: sqlite3.Database,
  });

  /**
   * init table
   */
  await sqliteDB.exec(`
      CREATE TABLE IF NOT EXISTS semantic_metadata (
        id TEXT PRIMARY KEY,

        table_name TEXT,

        table_title TEXT,

        column_name TEXT,

        column_title TEXT,

        data_type TEXT,

        searchable_text TEXT,

        embedding TEXT
      )
    `);

  console.log("sqlite init success");

  return sqliteDB;
};

/**
 * get sqlite db
 */
export const getSQLiteDB = () => {
  if (!sqliteDB) {
    throw new Error("sqlite not initialized");
  }

  return sqliteDB;
};

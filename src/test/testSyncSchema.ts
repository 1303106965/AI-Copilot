import dotenv from "dotenv";

import { connectSQLServer } from "../db/sqlserver";

import { initSQLite } from "../db/sqlite";

import { syncSemanticSchema } from "../schema/syncSemanticSchema";

dotenv.config();

const run = async () => {
  /**
   * connect sqlserver
   */
  await connectSQLServer();

  /**
   * init sqlite
   */
  await initSQLite();

  /**
   * sync schema
   */
  await syncSemanticSchema();
};

run().catch(console.error);

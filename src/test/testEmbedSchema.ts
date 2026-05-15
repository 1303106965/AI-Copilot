import dotenv from "dotenv";

import { initDB } from "../db/init";

import { connectSQLServer } from "../db/sqlserver";

import { syncSchema } from "../schema/syncSchema";

import { embedSchema } from "../embedding/embedSchema";

dotenv.config();

const run = async () => {
  /**
   * 初始化 SQLite
   */
  await initDB();

  /**
   * 连接 SQLServer
   */
  await connectSQLServer();

  /**
   * 同步 schema
   */
  await syncSchema();

  /**
   * schema embedding
   */
  await embedSchema();
};

run();

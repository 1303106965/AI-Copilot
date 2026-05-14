import express from "express";

import { initDB } from "./db/init";

import { connectSQLServer } from "./db/sqlserver";

import { syncSchema } from "./schema/syncSchema";

const app = express();

app.use(express.json());

const start = async () => {
  // 初始化 SQLite
  await initDB();

  // 连接 SQLServer
  await connectSQLServer();

  // 同步 schema
  await syncSchema();

  app.listen(3001, () => {
    console.log("server running 3001");
  });
};

start();

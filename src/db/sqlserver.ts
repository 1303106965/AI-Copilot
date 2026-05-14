import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

/**
 * SQLServer 连接池
 */
export const sqlServerPool = new sql.ConnectionPool({
  server: process.env.SQL_SERVER!,

  port: Number(process.env.SQL_PORT),

  user: process.env.SQL_USER,

  password: process.env.SQL_PASSWORD,

  database: process.env.SQL_DATABASE,

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});

/**
 * 初始化 SQLServer 连接
 */
export const connectSQLServer = async () => {
  await sqlServerPool.connect();

  console.log("SQLServer connected");
};

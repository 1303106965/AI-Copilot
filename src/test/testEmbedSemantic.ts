import dotenv from 'dotenv'

import { initDB } from '../db/init'

import { connectSQLServer } from '../db/sqlserver'

import { embedSemantic } from '../embedding/embedSemantic'

dotenv.config()

const run = async () => {
  /**
   * 初始化 SQLite
   */
  await initDB()

  /**
   * 连接 SQLServer
   */
  await connectSQLServer()

  /**
   * semantic embedding
   */
  await embedSemantic()
}

run()
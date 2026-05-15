import { v4 as uuidv4 } from 'uuid'

import { sqlServerPool } from '../db/sqlserver'

import { db } from '../db/sqlite'

import { EmbeddingProvider } from '../providers/embedding.provider'

/**
 * semantic embedding pipeline
 */
export const embedSemantic = async () => {
  const provider = new EmbeddingProvider()

  /**
   * 从 SQLServer 读取 semantic layer
   */
  const result =
    await sqlServerPool
      .request()
      .query(`
        SELECT *
        FROM semantic_column
      `)

  /**
   * 清空旧索引
   */
  db.run(`
    DELETE FROM semantic_embedding
  `)

  for (const row of result.recordset) {
    console.log(
      `embedding: ${row.column_name}`
    )

    /**
     * semantic searchable text
     *
     * 真正给 AI 理解的业务语义
     */
    const searchableText = `
表名 ${row.table_name}

字段名 ${row.column_name}

字段中文名 ${row.column_title}

业务含义 ${row.business_meaning}

字段别名 ${row.aliases}

业务示例 ${row.examples}
`

    /**
     * 生成 embedding
     */
    const embedding =
      await provider.embedding(
        searchableText
      )

    /**
     * 存入 SQLite AI 索引
     */
    db.run(
      `
      INSERT INTO semantic_embedding (
        id,

        semantic_id,

        table_name,

        column_name,

        searchable_text,

        embedding
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        uuidv4(),

        row.id,

        row.table_name,

        row.column_name,

        searchableText,

        JSON.stringify(embedding)
      ]
    )
  }

  console.log(
    'semantic embedding success'
  )
}
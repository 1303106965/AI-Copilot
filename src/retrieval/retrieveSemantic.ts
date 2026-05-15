import { db } from '../db/sqlite'

import { EmbeddingProvider } from '../providers/embedding.provider'

import { cosineSimilarity } from './cosineSimilarity'

/**
 * semantic retrieval
 */
export const retrieveSemantic =
  async (query: string) => {
    const provider =
      new EmbeddingProvider()

    /**
     * 用户问题 embedding
     */
    const queryEmbedding =
      await provider.embedding(query)

    return new Promise((resolve) => {
      db.all(
        `
        SELECT *
        FROM semantic_embedding
        `,
        async (err, rows: any[]) => {
          if (err) {
            console.error(err)

            resolve([])

            return
          }

          const result = rows
            .map((row) => {
              /**
               * embedding 不存在
               */
              if (!row.embedding) {
                return null
              }

              const embedding =
                JSON.parse(
                  row.embedding
                )

              /**
               * cosine similarity
               */
              const score =
                cosineSimilarity(
                  queryEmbedding,

                  embedding
                )

              return {
                semanticId:
                  row.semantic_id,

                tableName:
                  row.table_name,

                columnName:
                  row.column_name,

                searchableText:
                  row.searchable_text,

                score
              }
            })
            .filter(Boolean)

          /**
           * 按相似度排序
           */
          result.sort(
            (a: any, b: any) =>
              b.score - a.score
          )

          /**
           * Top 5
           */
          resolve(
            result.slice(0, 5)
          )
        }
      )
    })
  }
import { db } from "../db/sqlite";

import { EmbeddingProvider } from "../providers/embedding.provider";

import { cosineSimilarity } from "./cosineSimilarity";

/**
 * schema retrieval
 */
export const retrieveSchema = async (query: string) => {
  const provider = new EmbeddingProvider();

  /**
   * 用户问题 embedding
   */
  const queryEmbedding = await provider.embedding(query);

  return new Promise((resolve) => {
    db.all(
      `
      SELECT *
      FROM schema_columns
      `,
      async (err, rows: any[]) => {
        if (err) {
          console.error(err);

          resolve([]);

          return;
        }

        const result = rows.map((row) => {
          /**
           * SQLite 里存的是 JSON 字符串
           */
          const embedding = JSON.parse(row.embedding);

          /**
           * 计算相似度
           */
          const score = cosineSimilarity(
            queryEmbedding,

            embedding
          );

          return {
            ...row,

            score,
          };
        });

        /**
         * 按相似度倒序
         */
        result.sort((a, b) => b.score - a.score);

        /**
         * 返回 Top5
         */
        resolve(result.slice(0, 5));
      }
    );
  });
};

import { EmbeddingProvider } from "../providers/embedding.provider";

import { getSQLiteDB } from "../db/sqlite";

import { cosineSimilarity } from "./cosineSimilarity";

const embeddingProvider = new EmbeddingProvider();

/**
 * retrieve semantic
 */
export const retrieveSemantic = async (question: string) => {
  const sqliteDB = getSQLiteDB();

  /**
   * embedding
   */
  const queryEmbedding = await embeddingProvider.embed(question);

  /**
   * all metadata
   */
  const rows = await sqliteDB.all(`
        SELECT *
        FROM semantic_metadata
      `);

  /**
   * ranking
   */
  return rows
    .map((row: any) => {
      const embedding = JSON.parse(row.embedding);

      return {
        ...row,

        score: cosineSimilarity(
          queryEmbedding,

          embedding
        ),
      };
    })

    .sort((a: any, b: any) => b.score - a.score)

    .slice(0, 10);
};

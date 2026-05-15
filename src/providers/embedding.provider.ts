import ollama from "ollama";

/**
 * 本地 embedding provider
 *
 * 当前:
 * Ollama + nomic-embed-text
 */
export class EmbeddingProvider {
  /**
   * 生成 embedding
   */
  async embedding(text: string): Promise<number[]> {
    const response = await ollama.embeddings({
      model: "nomic-embed-text",

      prompt: text,
    });

    return response.embedding;
  }
}

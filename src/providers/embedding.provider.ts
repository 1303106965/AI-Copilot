import OpenAI from "openai";

/**
 * embedding provider
 */
export class EmbeddingProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      baseURL: "http://127.0.0.1:11434/v1",

      apiKey: "ollama",
    });
  }

  /**
   * embedding
   */
  async embed(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: "bge-m3",

      input: text,
    });

    return response.data[0].embedding;
  }
}

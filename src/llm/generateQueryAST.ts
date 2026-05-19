import { retrieveSemantic } from "../retrieval/retrieveSemantic";

import { buildQueryPrompt } from "../prompt/buildQueryPrompt";

import { LLMProvider } from "../providers/llm.provider";

/**
 * generate QueryAST
 */
export const generateQueryAST = async (question: string) => {
  /**
   * retrieval
   */
  const retrievalList = await retrieveSemantic(question);

  /**
   * prompt
   */
  const prompt = buildQueryPrompt(
    question,

    retrievalList as any[]
  );

  /**
   * llm
   */
  const llm = new LLMProvider();

  const result = await llm.chat(prompt);

  const cleanResult = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  /**
   * parse json
   */
  try {
    return JSON.parse(cleanResult);
  } catch (error) {
    console.error("QueryAST parse error:", result);

    throw error;
  }
};

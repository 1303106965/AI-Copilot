import { retrieveSemantic } from "../retrieval/retrieveSemantic";

import { buildIntentPrompt } from "../prompt/buildIntentPrompt";

import { LLMProvider } from "../providers/llm.provider";

/**
 * generate intent ast
 */
export const generateIntentAST = async (question: string) => {
  /**
   * retrieval
   */
  const retrievalList = await retrieveSemantic(question);

  /**
   * prompt
   */
  const prompt = buildIntentPrompt(
    question,

    retrievalList as any[]
  );

  /**
   * llm
   */
  const llm = new LLMProvider();

  const result = await llm.chat(prompt);

  /**
   * clean markdown
   */
  const cleanResult = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  /**
   * parse
   */
  try {
    return JSON.parse(cleanResult);
  } catch (error) {
    console.error(cleanResult);

    throw error;
  }
};

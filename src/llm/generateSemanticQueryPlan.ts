import { retrieveSemantic } from "../retrieval/retrieveSemantic";

import { LLMProvider } from "../providers/llm.provider";

import { buildSemanticQueryPlanPrompt } from "../prompt/buildSemanticQueryPlanPrompt";

/**
 * generate semantic query plan
 */
export const generateSemanticQueryPlan = async (question: string) => {
  /**
   * retrieval
   */
  const retrievalList = await retrieveSemantic(question);

  /**
   * prompt
   */
  const prompt = buildSemanticQueryPlanPrompt(
    question,

    retrievalList
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

import { retrieveSemantic } from '../retrieval/retrieveSemantic'

import { buildQueryPrompt } from '../prompt/buildQueryPrompt'

import { LLMProvider } from '../providers/llm.provider'

/**
 * 生成 QueryAST
 */
export const generateQueryAST =
  async (question: string) => {
    /**
     * semantic retrieval
     */
    const retrievalList =
      await retrieveSemantic(
        question
      )

    /**
     * build prompt
     */
    const prompt =
      buildQueryPrompt(
        question,

        retrievalList as any[]
      )

    console.log(prompt)

    /**
     * llm
     */
    const llm =
      new LLMProvider()

    const result =
      await llm.chat(prompt)

    return result
  }
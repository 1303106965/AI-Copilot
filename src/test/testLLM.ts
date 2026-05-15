import dotenv from 'dotenv'

import { LLMProvider } from '../providers/llm.provider'

dotenv.config()

const run = async () => {
  const llm = new LLMProvider()

  const result =
    await llm.chat(`
你是谁？
`)

  console.log(result)
}

run()
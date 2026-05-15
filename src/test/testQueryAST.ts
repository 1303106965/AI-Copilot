import dotenv from 'dotenv'

import { generateQueryAST } from '../llm/generateQueryAST'

dotenv.config()

const run = async () => {
  const result =
    await generateQueryAST(
      '查询一班成绩大于90的学生姓名'
    )

  console.log(result)
}

run()
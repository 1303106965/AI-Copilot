import { retrieveSemantic } from '../retrieval/retrieveSemantic'

const run = async () => {
  const result =
    await retrieveSemantic(
      '查询一班成绩大于90的学生'
    )

  console.log(
    JSON.stringify(
      result,
      null,
      2
    )
  )
}

run()
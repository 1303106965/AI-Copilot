import dotenv from "dotenv";

import { generateQueryAST } from "../llm/generateQueryAST";

dotenv.config();

const run = async () => {
  const ast = await generateQueryAST("查询平均成绩最高的3个班级");

  console.log(JSON.stringify(ast, null, 2));
};

run();

import dotenv from "dotenv";

import { generateQueryAST } from "../llm/generateQueryAST";

import { buildConfig } from "../builder/buildConfig";

dotenv.config();

const run = async () => {
  /**
   * generate ast
   */
  const ast = await generateQueryAST("查询一班成绩大于90的学生姓名");

  console.log("AST:");
  console.log(ast);

  /**
   * build config
   */
  const config = buildConfig(ast);

  console.log("CONFIG:");
  console.log(JSON.stringify(config, null, 2));
};

run();

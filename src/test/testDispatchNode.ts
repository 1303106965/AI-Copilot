import dotenv from "dotenv";

import { generateQueryAST } from "../llm/generateQueryAST";

import { buildDispatchNode } from "../builder/buildDispatchNode";

dotenv.config();

const run = async () => {
  /**
   * intent ast
   */
  const ast = await generateQueryAST("查询一班成绩大于90的学生姓名");

  console.log("AST:");
  console.log(ast);

  /**
   * build config
   */
  const config = buildDispatchNode(ast);

  console.log(JSON.stringify(config, null, 2));
};

run();

import dotenv from "dotenv";

import { generateQueryAST } from "../llm/generateQueryAST";

import { buildDispatchNode } from "../builder/buildDispatchNode";
import { connectSQLServer } from "../db/sqlserver";
dotenv.config();

const run = async () => {
  /**
   * connect sqlserver
   */
  await connectSQLServer();
  /**
   * intent ast
   */
  const ast = await generateQueryAST("查询平均成绩最高的3个班级");

  console.log("AST:");
  console.log(ast);

  /**
   * build config
   */
  const config = await buildDispatchNode(ast);

  console.log(JSON.stringify(config, null, 2));
};

run();

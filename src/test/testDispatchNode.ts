import dotenv from "dotenv";

import { connectSQLServer } from "../db/sqlserver";

import { generateIntentAST } from "../llm/generateIntentAST";

import { buildDispatchNode } from "../builder/buildDispatchNode";

dotenv.config();

/**
 * test cases
 */
const testCases = [
  "查询一班成绩大于90的学生姓名",

  "查询平均成绩最高的班级",

  "统计每个班级的学生人数",

  "统计每个班级的总成绩",

  "查询每个班级最高分",
];

/**
 * run
 */
const run = async () => {
  /**
   * connect sqlserver
   */
  await connectSQLServer();

  /**
   * loop test
   */
  for (const question of testCases) {
    console.log("\n==============================");

    console.log(`\n用户问题: ${question}\n`);

    /**
     * intent ast
     */
    const ast = await generateIntentAST(question);

    console.log("IntentAST:");

    console.log(JSON.stringify(ast, null, 2));

    /**
     * dispatch config
     */
    const config = await buildDispatchNode(ast);

    console.log("\nDispatchNode:");

    console.log(JSON.stringify(config, null, 2));
  }
};

/**
 * start
 */
run().catch((error) => {
  console.error(error);
});

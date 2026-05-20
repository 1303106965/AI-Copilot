import dotenv from "dotenv";

import { connectSQLServer } from "../db/sqlserver";

import { initSQLite } from "../db/sqlite";

import { generateSemanticQueryPlan } from "../llm/generateSemanticQueryPlan";

import { compileSemanticQueryPlan } from "../compiler/compileSemanticQueryPlan";

dotenv.config();

const questions = [
  "查询一班成绩大于90的学生姓名",

  "查询每个班级最高分",

  "统计每个班级学生人数",

  "查询平均成绩最高的班级",
];

const run = async () => {
  /**
   * init db
   */
  await connectSQLServer();

  await initSQLite();

  for (const question of questions) {
    console.log("\n========================");

    console.log(`\n用户问题:${question}\n`);

    /**
     * semantic query plan
     */
    const plan = await generateSemanticQueryPlan(question);

    console.log("SemanticQueryPlan:\n");

    console.log(JSON.stringify(plan, null, 2));

    /**
     * compile config
     */
    const config = await compileSemanticQueryPlan(plan);

    console.log("\nDispatchNode Config:\n");

    console.log(JSON.stringify(config, null, 2));
  }
};

run().catch(console.error);

import dotenv from "dotenv";

import { connectSQLServer } from "../db/sqlserver";

import { initSQLite } from "../db/sqlite";

import { generateSemanticQueryPlan } from "../llm/generateSemanticQueryPlan";

dotenv.config();

const testCases = [
  "查询一班成绩大于90的学生姓名",

  "查询平均成绩最高的班级",

  "统计每个班级的学生人数",

  "统计每个班级的总成绩",

  "查询每个班级最高分",
];

const run = async () => {
  await connectSQLServer();

  await initSQLite();

  for (const question of testCases) {
    console.log("\n====================");

    console.log(
      `\n问题:
${question}\n`
    );

    const plan = await generateSemanticQueryPlan(question);

    console.log(JSON.stringify(plan, null, 2));
  }
};

run().catch(console.error);

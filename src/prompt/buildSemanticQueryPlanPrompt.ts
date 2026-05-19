import { SemanticQueryPlan } from "../types/SemanticQueryPlan";

/**
 * build semantic query plan prompt
 */
export const buildSemanticQueryPlanPrompt = (
  question: string,

  retrievalList: any[]
) => {
  /**
   * rag context
   */
  const context = retrievalList
    .map((item) => {
      return `
表名:
${item.table_name}

字段名:
${item.column_name}

字段中文:
${item.column_title}

业务含义:
${item.searchable_text}
`;
    })
    .join("\n");

  return `
你是一个企业级数据分析AI。

你的任务：

根据：

1. 用户问题
2. 数据库字段语义

生成：

SemanticQueryPlan。

注意：

你输出的是：

“查询语义规划”。

不是：
- SQL
- DSL
- dispatchNode
- AST

不要输出任何技术实现。

========================

SemanticQueryPlan结构：

{
  "queryType": "aggregate",

  "targetEntity": "students",

  "outputs": [
    {
      "semantic": "班级"
    }
  ],

  "metrics": [
    {
      "semantic": "成绩",

      "aggregation": "max"
    }
  ],

  "dimensions": [
    {
      "semantic": "班级"
    }
  ],

  "ranking": {
    "semantic": "成绩",

    "aggregation": "max",

    "direction": "desc"
  },

  "rawQuestion":
    "查询每个班级最高分"
}

========================

规则：

1.
queryType:
detail 或 aggregate

2.
select:
用户真正想看的字段

3.
aggregations:
统计字段

4.
groupBy:
分组维度

5.
ranking:
排序目标

6.
不要输出 SQL

7.
不要输出 dispatchNode

8.
不要输出代码

9.
只返回 JSON

10.
不要 markdown

========================

用户问题：

${question}

========================

数据库语义：

${context}

========================

直接返回 JSON。
`;
};

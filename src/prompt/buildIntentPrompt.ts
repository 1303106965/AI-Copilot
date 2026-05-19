/**
 * build intent prompt
 */
export const buildIntentPrompt = (
  question: string,

  retrievalList: any[]
) => {
  /**
   * semantic context
   */
  const context = retrievalList
    .map((item) => {
      return `
表名: ${item.tableName}

字段名: ${item.columnName}

字段中文名:
${item.searchableText}
`;
    })
    .join("\n");

  return `
你是一个数据库查询意图识别AI。

你的任务：

根据用户问题，
提取用户真正想表达的查询意图。

注意：

你输出的是“用户语义”。

不是：
- SQL
- QueryDSL
- dispatchNode
- 聚合配置
- GROUP BY
- ORDER BY

禁止输出任何技术实现。

========================

正确示例：

用户问题：
查询平均成绩最高的班级

输出：

{
  "queryMode": "aggregate",

  "displayFields": [
    "班级"
  ],

  "metrics": [
    "平均成绩"
  ],

  "dimensions": [
    "班级"
  ],

  "filters": [],

  "rawQuestion": "查询平均成绩最高的班级"
}

========================

用户问题：
查询一班成绩大于90的学生姓名

输出：

{
  "queryMode": "detail",

  "displayFields": [
    "学生姓名"
  ],

  "metrics": [],

  "dimensions": [],

  "filters": [
    {
      "field": "班级",

      "operator": "=",

      "value": "一班"
    },
    {
      "field": "成绩",

      "operator": ">",

      "value": 90
    }
  ],

  "rawQuestion": "查询一班成绩大于90的学生姓名"
}

========================

要求：

1.
displayFields:
用户真正想看的内容

2.
metrics:
统计指标

例如：
平均成绩
总人数
最高分

3.
dimensions:
统计维度

例如：
班级
年级

4.
filters:
筛选条件

5.
不要输出：
AVG
GROUP BY
ORDER BY
LIMIT

6.
不要输出 SQL

7.
只返回 JSON

8.
不要 markdown

========================

用户问题：
${question}

========================

可用字段语义：
${context}

========================

直接返回 JSON。
`;
};

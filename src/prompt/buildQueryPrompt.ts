/**
 * build query prompt
 */
export const buildQueryPrompt = (
  question: string,

  retrievalList: any[]
) => {
  /**
   * retrieval context
   */
  const context = retrievalList
    .map((item) => {
      return `
表名: ${item.tableName}

字段名: ${item.columnName}

字段语义:
${item.searchableText}
`;
    })
    .join("\n");

  return `
你是一个 QueryAST 生成器。

你的任务:

根据用户问题生成 QueryAST JSON。

注意:
你生成的是 QueryAST。
不是 SQL。

禁止生成:
- SQL
- AVG(score)
- COUNT(*)
- SELECT *
- ORDER BY

只能生成 QueryAST JSON。

========================

正确 QueryAST 示例:

{
  "table": "students",

  "select": [
    "class_name"
  ],

  "where": [],

  "groupBy": [
    "class_name"
  ],

  "aggregates": [
    {
      "field": "score",

      "type": "avg",

      "alias": "avg_score"
    }
  ],

  "orderBy": [
    {
      "field": "avg_score",

      "direction": "desc"
    }
  ],

  "limit": 3
}

========================

错误示例（禁止）:

{
  "select": [
    "AVG(score)"
  ]
}

========================

用户问题:
${question}

========================

可用字段:
${context}

========================

要求:

1. 只能使用提供字段

2. aggregates:
用于聚合

例如:

{
  "field": "score",
  "type": "avg"
}

3. orderBy:
只能引用字段名

禁止:
"AVG(score)"

4. select:
只能放字段名

禁止:
"AVG(score)"

5. 必须返回 JSON

6. 不要 markdown

7. 不要解释

直接返回 QueryAST JSON。
`;
};

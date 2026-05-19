/**
 * build intent prompt
 */
export const buildQueryPrompt = (
  question: string,

  retrievalList: any[]
) => {
  const context = retrievalList
    .map((item) => {
      return `
表名: ${item.tableName}

字段名: ${item.columnName}
`;
    })
    .join("\n");

  return `
你是一个数据库查询意图识别AI。

你的任务:

根据用户问题生成 IntentAST。

注意:
这里只描述用户查询意图。

禁止:
- SQL
- dispatchNode
- pipeline
- UI config

====================

IntentAST 示例:

{
  "intent": "aggregate",

  "table": "students",

  "fields": [
    "class_name"
  ],

  "filters": [],

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

  "pageSize": 3
}

====================

用户问题:
${question}

====================

可用字段:
${context}

====================

要求:

1. 只返回 JSON

2. 不要 markdown

3. fields:
用户真正想看的字段

4. aggregates:
聚合信息

5. filters:
筛选条件

6. groupBy:
分组字段

7. orderBy:
排序字段

8. pageSize:
返回数量

直接返回 IntentAST JSON。
`;
};

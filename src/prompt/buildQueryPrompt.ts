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
你是一个数据库查询AI助手。

你需要根据用户问题生成 QueryAST。

只能使用提供的字段。

返回格式必须是 JSON。

QueryAST 格式:

{
  "table": "",
  "select": [],
  "where": []
}

用户问题:
${question}

可用字段:
${context}

要求:
1. 只能使用提供的字段
2. 不要生成不存在字段
3. 必须返回 JSON
4. 不要返回 markdown

请直接返回 QueryAST JSON。
`;
};

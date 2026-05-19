import { IntentAST } from "../types/intentAST";

import { SemanticService } from "../services/semantic.service";

/**
 * semantic service
 */
const semanticService = new SemanticService();

/**
 * generate config name
 */
export const generateConfigName = async (ast: IntentAST) => {
  /**
   * 聚合查询
   */
  if (ast.intent === "aggregate") {
    return generateAggregateName(ast);
  }

  /**
   * 普通查询
   */
  return generateQueryName(ast);
};

/**
 * 普通查询
 */
const generateQueryName = async (ast: IntentAST) => {
  /**
   * 中文字段名
   */
  const titles = await Promise.all(
    ast.fields.map((field) => {
      return semanticService.getColumnTitle(
        ast.table,

        field
      );
    })
  );

  return `查询${titles.join("、")}`;
};

/**
 * 聚合查询
 */
const generateAggregateName = async (ast: IntentAST) => {
  if (!ast.aggregates?.length) {
    return "聚合查询";
  }

  const agg = ast.aggregates[0];

  /**
   * 中文字段名
   */
  const title = await semanticService.getColumnTitle(
    ast.table,

    agg.field
  );

  const aggregateMap: Record<string, string> = {
    avg: "平均",

    count: "统计",

    sum: "求和",

    max: "最大",

    min: "最小",
  };

  const typeText = aggregateMap[agg.type] || "聚合";

  return `${title}${typeText}查询`;
};

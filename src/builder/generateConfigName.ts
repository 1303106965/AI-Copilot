import { IntentAST } from "../types/intentAST";

/**
 * generate config name
 *
 * 根据用户语义生成标题
 */
export const generateConfigName = async (ast: IntentAST) => {
  /**
   * aggregate query
   */
  if (ast.queryMode === "aggregate") {
    return generateAggregateName(ast);
  }

  /**
   * detail query
   */
  return generateDetailName(ast);
};

/**
 * aggregate name
 */
const generateAggregateName = (ast: IntentAST) => {
  const metrics = ast.metrics?.join("、") || "";

  const dimensions = ast.dimensions?.join("、") || "";

  /**
   * 平均成绩按班级统计
   */
  if (metrics && dimensions) {
    return `${metrics}按${dimensions}统计`;
  }

  /**
   * 只有指标
   */
  if (metrics) {
    return `${metrics}统计`;
  }

  return "聚合查询";
};

/**
 * detail name
 */
const generateDetailName = (ast: IntentAST) => {
  const fields = ast.displayFields.join("、");

  return `查询${fields}`;
};

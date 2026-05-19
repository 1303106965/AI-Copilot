/**
 * filter
 */
export interface IntentFilter {
  field: string;

  operator: string;

  value: any;
}

/**
 * intent ast
 *
 * 只表达用户语义
 */
export interface IntentAST {
  /**
   * query mode
   */
  queryMode: "detail" | "aggregate";

  /**
   * table
   */
  table: string;

  /**
   * 用户想看的字段
   */
  displayFields: string[];

  /**
   * 指标
   *
   * 例如:
   * 平均成绩
   * 总人数
   */
  metrics?: string[];

  /**
   * 维度
   *
   * 例如:
   * 班级
   */
  dimensions?: string[];

  /**
   * filter
   */
  filters: IntentFilter[];

  /**
   * 原始问题
   */
  rawQuestion: string;
}

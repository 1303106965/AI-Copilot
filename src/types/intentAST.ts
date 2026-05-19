/**
 * 筛选条件
 */
export interface IntentFilter {
  field: string;

  operator: string;

  value: any;
}

/**
 * 聚合
 */
export interface IntentAggregate {
  field: string;

  type: "count" | "sum" | "avg" | "max" | "min";

  alias?: string;
}

/**
 * 排序
 */
export interface IntentOrder {
  field: string;

  direction: "asc" | "desc";
}

/**
 * 用户查询意图 AST
 *
 * 注意:
 * 这里只表达用户意图
 *
 * 不涉及:
 * pipeline
 * output
 * form
 * contract
 * UI
 */
export interface IntentAST {
  /**
   * 查询类型
   */
  intent: "query" | "aggregate";

  /**
   * 主表
   */
  table: string;

  /**
   * 查询字段
   */
  fields: string[];

  /**
   * 筛选条件
   */
  filters: IntentFilter[];

  /**
   * group by
   */
  groupBy?: string[];

  /**
   * 聚合
   */
  aggregates?: IntentAggregate[];

  /**
   * 排序
   */
  orderBy?: IntentOrder[];

  /**
   * 分页
   */
  pageSize?: number;
}

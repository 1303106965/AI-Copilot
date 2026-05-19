/**
 * 查询条件
 */
export interface QueryCondition {
  field: string;

  operator: string;

  value: any;
}

/**
 * 排序
 */
export interface QueryOrder {
  field: string;

  direction: "asc" | "desc";
}

/**
 * 聚合
 */
export interface QueryAggregate {
  field: string;

  type: "count" | "sum" | "avg" | "max" | "min";

  alias?: string;
}

/**
 * Query AST
 */
export interface QueryAST {
  /**
   * 主表
   */
  table: string;

  /**
   * 查询字段
   */
  select: string[];

  /**
   * where
   */
  where: QueryCondition[];

  /**
   * 排序
   */
  orderBy?: QueryOrder[];

  /**
   * group by
   */
  groupBy?: string[];

  /**
   * 聚合
   */
  aggregates?: QueryAggregate[];

  /**
   * limit
   */
  limit?: number;
}

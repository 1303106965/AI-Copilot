/**
 * semantic query plan
 */
export interface SemanticQueryPlan {
  /**
   * query type
   */
  queryType: "detail" | "aggregate";

  /**
   * target entity
   */
  targetEntity: string;

  /**
   * output fields
   */
  outputs: Array<{
    semantic: string;
  }>;

  /**
   * filters
   */
  filters: Array<{
    semantic: string;

    operator: string;

    value: any;
  }>;

  /**
   * metrics
   */
  metrics: Array<{
    semantic: string;

    aggregation?: "avg" | "count" | "sum" | "max" | "min";
  }>;

  /**
   * dimensions
   */
  dimensions: Array<{
    semantic: string;
  }>;

  /**
   * ranking
   */
  ranking?: {
    semantic: string;

    aggregation?: "avg" | "count" | "sum" | "max" | "min";

    direction: "asc" | "desc";
  };

  /**
   * limit
   */
  limit?: number;

  /**
   * raw question
   */
  rawQuestion: string;
  /**
   * result mode
   */
  resultMode?: "list" | "single";
  /**
   * pagination
   */
  pagination?: {
    page: number;

    pageSize: number;
  };
}

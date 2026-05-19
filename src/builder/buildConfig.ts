import { QueryAST } from "../types/queryAST";

/**
 * QueryAST
 * →
 * Config
 */
export const buildConfig = (ast: QueryAST) => {
  return {
    table: ast.table,

    columns: ast.select,

    conditions: ast.where,

    orderBy: ast.orderBy || [],

    groupBy: ast.groupBy || [],

    aggregates: ast.aggregates || [],

    limit: ast.limit || 100,
  };
};

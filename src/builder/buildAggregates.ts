import { BuilderContext } from "../types/builderContext";

/**
 * build aggregate columns
 */
export const buildAggregates = (context: BuilderContext) => {
  const ast = context.ast;

  /**
   * 无聚合
   */
  if (!ast.aggregates?.length) {
    return;
  }

  const aggregateColumns = ast.aggregates.map((aggregate) => {
    return {
      aggregate: true,

      alias: aggregate.alias || `${aggregate.type}_${aggregate.field}`,

      expression: `${aggregate.type.toUpperCase()}(${context.tableAlias}.${
        aggregate.field
      })`,

      subquery: false,
    };
  });

  /**
   * append aggregate columns
   */
  context.config.config.defaults.arg0.data.columns.push(...aggregateColumns);
};

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
    const alias = aggregate.alias || `${aggregate.type}_${aggregate.field}`;

    return {
      aggregate: true,

      aggregateType: aggregate.type.toUpperCase(),

      alias,

      columnType: "AGGREGATE",

      /**
       * 注意:
       * expression 不是 SQL
       *
       * 而是 runtime key
       */
      expression: aggregate.field,

      subquery: false,
    };
  });

  /**
   * append
   */
  context.config.config.defaults.arg0.data.columns.push(...aggregateColumns);
};

import { BuilderContext } from "../types/builderContext";

/**
 * build order by
 */
export const buildOrderBy = (context: BuilderContext) => {
  const ast = context.ast;

  if (!ast.orderBy?.length) {
    return;
  }

  context.config.config.defaults.arg0.data.orderBy = ast.orderBy.map(
    (order) => {
      /**
       * aggregate alias
       */
      const aggregateAlias = ast.aggregates?.find(
        (agg) => agg.alias === order.field
      );

      /**
       * 聚合字段
       */
      if (aggregateAlias) {
        return {
          expression: order.field,

          order: order.direction.toUpperCase(),
        };
      }

      /**
       * 普通字段
       */
      return {
        expression: `${context.tableAlias}.${order.field}`,

        order: order.direction.toUpperCase(),
      };
    }
  );
};

import { BuilderContext } from "../types/builderContext";

/**
 * build group by
 */
export const buildGroupBy = (context: BuilderContext) => {
  const ast = context.ast;

  if (!ast.groupBy?.length) {
    return;
  }

  context.config.config.defaults.arg0.data.groupByColumns = ast.groupBy.map(
    (field) => {
      return {
        alias: field,

        expression: `${context.tableAlias}.${field}`,
      };
    }
  );
};

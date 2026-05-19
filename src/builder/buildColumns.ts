import { BuilderContext } from "../types/builderContext";

/**
 * build columns
 */
export const buildColumns = (context: BuilderContext) => {
  const ast = context.ast;

  context.config.config.defaults.arg0.data.columns = ast.fields.map((field) => {
    return {
      aggregate: false,

      alias: field,

      expression: `${context.tableAlias}.${field}`,

      subquery: false,
    };
  });
};

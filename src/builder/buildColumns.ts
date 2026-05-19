import { BuilderContext } from "../types/builderContext";

/**
 * build columns
 */
export const buildColumns = (context: BuilderContext) => {
  const ast = context.ast;

  /**
   * 普通字段
   */
  const columns = ast.fields.map((field) => {
    return {
      aggregate: false,

      alias: field,

      columnType: "FIELD",

      expression: field,

      subquery: false,
    };
  });

  context.config.config.defaults.arg0.data.columns = columns;
};

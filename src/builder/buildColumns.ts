import { IntentAST } from "../types/intentAST";

/**
 * build columns
 */
export const buildColumns = (ast: IntentAST) => {
  return ast.fields.map((field) => {
    return {
      aggregate: false,

      alias: field,

      expression: field,

      subquery: false,
    };
  });
};

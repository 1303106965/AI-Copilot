import { IntentAST } from "../types/intentAST";

/**
 * build where condition
 */
export const buildWhereCondition = (ast: IntentAST) => {
  return {
    children: [
      {
        children: ast.filters.map((filter, index) => {
          return {
            key: filter.field,

            operateType: index === 0 ? null : "AND",

            type: convertOperator(filter.operator),

            value: filter.value,
          };
        }),

        operateType: null,
      },
    ],
  };
};

/**
 * operator convert
 */
const convertOperator = (operator: string) => {
  switch (operator) {
    case "=":
      return "EQ";

    case ">":
      return "GT";

    case "<":
      return "LT";

    case ">=":
      return "GTE";

    case "<=":
      return "LTE";

    default:
      return "EQ";
  }
};

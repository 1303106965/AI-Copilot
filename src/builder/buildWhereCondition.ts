import { BuilderContext } from "../types/builderContext";

/**
 * build where
 */
export const buildWhereCondition = (context: BuilderContext) => {
  const ast = context.ast;

  context.config.config.defaults.arg0.data.whereCondition = {
    children: [
      {
        children: ast.filters.map((filter, index) => {
          return {
            key: `${filter.field}`,

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

    default:
      return "EQ";
  }
};

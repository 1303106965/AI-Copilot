import { BuilderContext } from "../types/builderContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * build where
 */
export const buildWhereCondition = async (context: BuilderContext) => {
  const ast = context.ast;

  const children = await Promise.all(
    ast.filters.map(async (filter, index) => {
      /**
       * semantic
       */
      const semantic = await semanticService.findColumnByTitle(filter.field);

      if (!semantic) {
        return null;
      }

      return {
        key: semantic.column_name,

        operateType: index === 0 ? null : "AND",

        type: convertOperator(filter.operator),

        value: filter.value,
      };
    })
  );

  context.config.config.defaults.arg0.data.whereCondition = {
    children: [
      {
        children: children.filter(Boolean),

        operateType: null,
      },
    ],
  };
};

/**
 * convert operator
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

import { CompilerContext } from "../types/compilerContext";

import { SemanticService } from "../services/semantic.service";
import { getDispatchData } from "./dispatchNodeAccessor";

const semanticService = new SemanticService();

/**
 * operator mapping
 */
const operatorMap: Record<string, string> = {
  "=": "eq",

  ">": "gt",

  "<": "lt",

  ">=": "gte",

  "<=": "lte",

  "!=": "ne",

  like: "like",
};

/**
 * compile filters
 */
export const compileFilters = async (context: CompilerContext) => {
  const filters = context.plan.filters;
  const data = getDispatchData(context);
  if (!filters?.length) {
    return;
  }

  const conditions = await Promise.all(
    filters.map(async (filter) => {
      /**
       * semantic column
       */
      const semanticColumn = await semanticService.findColumnBySemantic(
        filter.semantic
      );

      if (!semanticColumn) {
        return null;
      }

      return {
        field: semanticColumn.column_name,

        operator: operatorMap[filter.operator] || "eq",

        value: filter.value,
      };
    })
  );

  data.whereCondition = {
    type: "AND",

    conditions: conditions.filter(Boolean),
  };
};

import { CompilerContext } from "../types/compilerContext";

import { SemanticService } from "../services/semantic.service";
import { getDispatchData } from "./dispatchNodeAccessor";

const semanticService = new SemanticService();

/**
 * compile ranking
 */
export const compileRanking = async (context: CompilerContext) => {
  const ranking = context.plan.ranking;
  const data = getDispatchData(context);
  if (!ranking) {
    return;
  }

  const semanticColumn = await semanticService.findColumnBySemantic(
    ranking.semantic
  );

  if (!semanticColumn) {
    return;
  }

  data.orderBy = [
    {
      expression: semanticColumn.column_name,

      direction: ranking.direction,
    },
  ];
};

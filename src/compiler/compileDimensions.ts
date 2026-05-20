import { CompilerContext } from "../types/compilerContext";

import { SemanticService } from "../services/semantic.service";
import { getDispatchData } from "./dispatchNodeAccessor";

const semanticService = new SemanticService();

/**
 * compile dimensions
 */
export const compileDimensions = async (context: CompilerContext) => {
  const dimensions = context.plan.dimensions;
  const data = getDispatchData(context);
  if (!dimensions?.length) {
    return;
  }

  data.groupByColumns = [];

  for (const dimension of dimensions) {
    const semanticColumn = await semanticService.findColumnBySemantic(
      dimension.semantic
    );

    if (!semanticColumn) {
      continue;
    }

    data.groupByColumns.push({
      expression: semanticColumn.column_name,
    });
  }
};

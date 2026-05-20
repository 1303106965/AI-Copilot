import { CompilerContext } from "../types/compilerContext";

import { SemanticService } from "../services/semantic.service";
import { getDispatchData } from "./dispatchNodeAccessor";

const semanticService = new SemanticService();

/**
 * compile columns
 */
export const compileColumns = async (context: CompilerContext) => {
  const outputs = context.plan.outputs;
  const data = getDispatchData(context);
  for (const output of outputs) {
    /**
     * semantic column
     */
    const semanticColumn = await semanticService.findColumnBySemantic(
      output.semantic
    );

    if (!semanticColumn) {
      continue;
    }
    data.columns.push({
      aggregate: false,

      alias: semanticColumn.column_name,

      expression: semanticColumn.column_name,

      subquery: false,
    });
    data.returns.push({
      key: semanticColumn.column_name,

      alias: semanticColumn.column_name,

      name: semanticColumn.column_title,

      type: semanticColumn.data_type,
    });
  }
};

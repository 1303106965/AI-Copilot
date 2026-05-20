import { CompilerContext } from "../types/compilerContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * compile columns
 */
export const compileColumns = async (context: CompilerContext) => {
  const outputs = context.plan.outputs;

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

    context.config.config.defaults.arg0.data.columns.push({
      aggregate: false,

      alias: semanticColumn.column_name,

      expression: semanticColumn.column_name,

      subquery: false,
    });
  }
};

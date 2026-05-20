import { CompilerContext } from "../types/compilerContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * aggregation mapping
 */
const aggregationMap: Record<string, string> = {
  avg: "AVG",

  count: "COUNT",

  sum: "SUM",

  max: "MAX",

  min: "MIN",
};

/**
 * compile aggregations
 */
export const compileAggregations = async (context: CompilerContext) => {
  const metrics = context.plan.metrics;

  for (const metric of metrics) {
    /**
     * aggregation required
     */
    if (!metric.aggregation) {
      continue;
    }

    /**
     * semantic column
     */
    const semanticColumn = await semanticService.findColumnBySemantic(
      metric.semantic
    );

    if (!semanticColumn) {
      continue;
    }

    context.config.config.defaults.arg0.data.columns.push({
      aggregate: true,

      aggregateType: aggregationMap[metric.aggregation],

      alias: metric.semantic,

      expression: semanticColumn.column_name,

      subquery: false,
    });
  }
};

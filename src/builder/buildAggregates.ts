import { BuilderContext } from "../types/builderContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * build aggregates
 */
export const buildAggregates = async (context: BuilderContext) => {
  const ast = context.ast;

  /**
   * no metrics
   */
  if (!ast.metrics?.length) {
    return;
  }

  const aggregateColumns = await Promise.all(
    ast.metrics.map(async (metric) => {
      /**
       * 平均成绩
       */
      if (metric.includes("平均")) {
        const semantic = await semanticService.findColumnByTitle("成绩");

        if (!semantic) {
          return null;
        }

        return {
          aggregate: true,

          aggregateType: "AVG",

          alias: "avg_score",

          columnType: "AGGREGATE",

          expression: semantic.column_name,

          subquery: false,
        };
      }

      return null;
    })
  );

  context.config.config.defaults.arg0.data.columns.push(
    ...aggregateColumns.filter(Boolean)
  );
};

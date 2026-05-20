import { CompilerContext } from "../types/compilerContext";

import { SemanticQueryPlan } from "../types/SemanticQueryPlan";

import { compileColumns } from "./compileColumns";

import { compileFilters } from "./compileFilters";

import { compileAggregations } from "./compileAggregations";

/**
 * compile semantic query plan
 */
export const compileSemanticQueryPlan = async (plan: SemanticQueryPlan) => {
  /**
   * compiler context
   */
  const context: CompilerContext = {
    plan,

    semanticMap: {},

    config: {
      config_name: plan.rawQuestion,

      config: {
        defaults: {
          arg0: {
            data: {
              columns: [],

              whereCondition: null,
            },
          },
        },
      },
    },
  };

  /**
   * compile columns
   */
  await compileColumns(context);

  /**
   * compile filters
   */
  await compileFilters(context);

  /**
   * compile aggregations
   */
  await compileAggregations(context);

  return context.config;
};

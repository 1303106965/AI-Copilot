import { CompilerContext } from "../types/compilerContext";

import { SemanticQueryPlan } from "../types/SemanticQueryPlan";

import { compileColumns } from "./compileColumns";

import { compileFilters } from "./compileFilters";

import { compileAggregations } from "./compileAggregations";
import { compileDimensions } from "./compileDimensions";

import { compileRanking } from "./compileRanking";
import { compilePagination } from "./compilePagination";
// import { compileLimit } from "./compileLimit";
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
      type: "dispatchNode",

      name: "JavaSqlContract",

      config_name: plan.rawQuestion,

      contract_v: "1.0.0",

      config_v: "1.0.0",

      config: {
        fn:
          plan.resultMode === "single"
            ? "selectSingleOne"
            : "selectSingleTable",

        version: "v2",

        contract_id: crypto.randomUUID(),

        defaults: {
          arg0: {
            data: {
              dbId: "sampledb",

              tableName: plan.targetEntity,

              columns: [],

              returns: [],

              joins: [],

              groupByColumns: [],

              orderBy: [],

              paginationNode: {
                pageNo: 1,

                pageSize: 10,
              },

              searchStatusFlag: false,

              allowEmptyWhere: false,

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
  await compileDimensions(context);

  await compileRanking(context);
  await compilePagination(context);
  // await compileLimit(context);
  return context.config;
};

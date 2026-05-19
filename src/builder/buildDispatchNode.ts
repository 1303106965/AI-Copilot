import { v4 as uuidv4 } from "uuid";

import { IntentAST } from "../types/intentAST";

import { BuilderContext } from "../types/builderContext";

import { generateConfigName } from "./generateConfigName";

import { buildColumns } from "./buildColumns";

import { buildWhereCondition } from "./buildWhereCondition";

import { buildReturns } from "./buildReturns";
import { buildAggregates } from "./buildAggregates";

import { buildGroupBy } from "./buildGroupBy";

import { buildOrderBy } from "./buildOrderBy";

import { buildPagination } from "./buildPagination";
/**
 * build dispatch node
 */
export const buildDispatchNode = async (ast: IntentAST) => {
  /**
   * builder context
   */
  const context: BuilderContext = {
    ast,
    semanticMap: {},

    config: {
      type: "dispatchNode",

      config: {
        contract_id: uuidv4(),

        defaults: {
          arg0: {
            data: {
              allowEmptyWhere: false,

              columns: [],

              dbId: "sampledb",

              groupByColumns: [],

              joins: [],

              orderBy: [],

              paginationNode: {
                pageNo: 1,

                pageSize: 10,
              },

              searchStatusFlag: false,

              tableName: ast.table,

              whereCondition: null,

              returns: [],
            },
          },
        },

        fn: "selectSingleTable",

        version: "v2",
      },

      name: "JavaSqlContract",

      config_name: "",

      contract_v: "1.0.0",

      config_v: "1.0.0",
    },
  };

  /**
   * config name
   */
  context.config.config_name = await generateConfigName(ast);

  /**
   * build columns
   */
  buildColumns(context);

  /**
   * build where
   */
  buildWhereCondition(context);
  /**
   * aggregates
   */
  buildAggregates(context);

  /**
   * group by
   */
  buildGroupBy(context);

  /**
   * order by
   */
  buildOrderBy(context);

  /**
   * pagination
   */
  buildPagination(context);
  /**
   * build returns
   */
  await buildReturns(context);

  return context.config;
};

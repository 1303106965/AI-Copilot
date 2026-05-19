import { v4 as uuidv4 } from "uuid";

import { IntentAST } from "../types/intentAST";

import { buildColumns } from "./buildColumns";

import { buildWhereCondition } from "./buildWhereCondition";

/**
 * build dispatch node
 */
export const buildDispatchNode = (ast: IntentAST) => {
  return {
    type: "dispatchNode",

    config: {
      contract_id: uuidv4(),

      defaults: {
        arg0: {
          data: {
            allowEmptyWhere: false,

            columns: buildColumns(ast),

            dbId: "sampledb",

            groupByColumns: ast.groupBy || [],

            joins: [],

            orderBy: ast.orderBy || [],

            paginationNode: {
              pageNo: 1,

              pageSize: ast.pageSize || 10,
            },

            searchStatusFlag: false,

            tableName: ast.table,

            whereCondition: buildWhereCondition(ast),
          },
        },
      },

      fn: "selectSingleTable",

      version: "v2",
    },

    name: "JavaSqlContract",

    config_name: "AI生成查询",

    contract_v: "1.0.0",

    config_v: "1.0.0",
  };
};

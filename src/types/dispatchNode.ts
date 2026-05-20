/**
 * dispatch node
 */
export interface DispatchNode {
  type: "dispatchNode";

  name: "JavaSqlContract";

  config_name: string;

  contract_v: string;

  config_v: string;

  config: {
    fn: "selectSingleTable" | "selectSingleOne";

    version: string;

    contract_id: string;

    defaults: {
      arg0: {
        data: {
          dbId: string;

          tableName: string;

          columns: DispatchColumn[];

          returns: DispatchReturn[];

          joins: any[];

          groupByColumns: any[];

          orderBy: any[];

          paginationNode?: {
            pageNo: number;

            pageSize: number;
          };

          searchStatusFlag: boolean;

          allowEmptyWhere: boolean;

          whereCondition: any;
        };
      };
    };
  };
}

/**
 * dispatch column
 */
export interface DispatchColumn {
  aggregate: boolean;

  aggregateType?: string;

  alias: string;

  expression: string;

  columnType: "FIELD" | "AGGREGATE";

  subquery: boolean;
}

/**
 * dispatch return
 */
export interface DispatchReturn {
  key: string;

  alias: string;

  name: string;

  type: string;
}

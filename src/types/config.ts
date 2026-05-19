/**
 * config where condition
 */
export interface ConfigCondition {
  field: string;

  operator: string;

  value: any;
}

/**
 * lowcode query config
 */
export interface QueryConfig {
  table: string;

  columns: string[];

  conditions: ConfigCondition[];
}

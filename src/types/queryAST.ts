/**
 * 查询条件
 */
export interface QueryCondition {
  field: string

  operator: string

  value: any
}

/**
 * Query AST
 */
export interface QueryAST {
  table: string

  select: string[]

  where: QueryCondition[]
}
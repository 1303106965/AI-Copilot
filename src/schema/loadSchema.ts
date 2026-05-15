import { sqlServerPool } from '../db/sqlserver'

/**
 * 从 SQLServer 加载 schema
 *
 * 包含:
 * - 表名
 * - 字段名
 * - 数据类型
 * - 中文注释
 */
export const loadSchemaFromSQLServer =
  async () => {
    const result =
      await sqlServerPool.request().query(`
        SELECT
          t.name AS TABLE_NAME,

          c.name AS COLUMN_NAME,

          ty.name AS DATA_TYPE,

          ep.value AS COLUMN_COMMENT

        FROM sys.tables t

        INNER JOIN sys.columns c
          ON t.object_id = c.object_id

        INNER JOIN sys.types ty
          ON c.user_type_id = ty.user_type_id

        LEFT JOIN sys.extended_properties ep
          ON ep.major_id = c.object_id
          AND ep.minor_id = c.column_id
          AND ep.name = 'MS_Description'

        ORDER BY t.name
      `)

    return result.recordset
  }
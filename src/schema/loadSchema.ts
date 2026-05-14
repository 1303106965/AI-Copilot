import { sqlServerPool } from "../db/sqlserver";

/**
 * 从 SQLServer 读取所有表字段信息
 */
export const loadSchemaFromSQLServer = async () => {
  const result = await sqlServerPool.request().query(`
    SELECT
      t.TABLE_NAME,

      c.COLUMN_NAME,

      c.DATA_TYPE,

      c.IS_NULLABLE,

      COLUMNPROPERTY(
        OBJECT_ID(c.TABLE_NAME),
        c.COLUMN_NAME,
        'IsIdentity'
      ) AS IS_PRIMARY_KEY

    FROM INFORMATION_SCHEMA.TABLES t

    INNER JOIN INFORMATION_SCHEMA.COLUMNS c
      ON t.TABLE_NAME = c.TABLE_NAME

    WHERE t.TABLE_TYPE = 'BASE TABLE'

    ORDER BY t.TABLE_NAME
  `);

  return result.recordset;
};

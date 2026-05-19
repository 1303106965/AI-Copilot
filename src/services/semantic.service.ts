import { sqlServerPool } from "../db/sqlserver";

/**
 * semantic metadata service
 */
export class SemanticService {
  /**
   * 获取字段语义信息
   */
  async getColumnSemantic(
    tableName: string,

    columnName: string
  ) {
    const result = await sqlServerPool
      .request()
      .input(
        "tableName",

        tableName
      )
      .input(
        "columnName",

        columnName
      ).query(`
          SELECT TOP 1 *
          FROM semantic_column
          WHERE table_name = @tableName
          AND column_name = @columnName
        `);

    return result.recordset[0];
  }

  /**
   * 获取字段中文名
   */
  async getColumnTitle(
    tableName: string,

    columnName: string
  ) {
    const semantic = await this.getColumnSemantic(
      tableName,

      columnName
    );

    return semantic?.column_title || columnName;
  }
  /**
   * 根据中文名查字段
   */
  async findColumnByTitle(title: string) {
    const result = await sqlServerPool.request().input(
      "title",

      title
    ).query(`
          SELECT TOP 1 *
          FROM semantic_column
          WHERE column_title = @title
        `);

    return result.recordset[0];
  }
}

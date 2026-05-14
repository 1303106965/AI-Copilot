export interface TableSchema {
  id: string;

  dbId: string;

  tableName: string;
  tableTitle: string;

  columns: ColumnSchema[];
}

export interface ColumnSchema {
  id: string;

  tableName: string;

  columnName: string;
  columnTitle: string;

  dataType: string;

  isPrimaryKey: boolean;

  nullable: boolean;

  searchableText: string;
}

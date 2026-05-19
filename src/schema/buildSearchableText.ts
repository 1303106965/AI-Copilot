/**
 * build searchable text
 */
export const buildSearchableText = (row: any) => {
  return `
表名:
${row.table_title}

字段名:
${row.column_name}

字段中文名:
${row.column_title}

字段类型:
${row.data_type}

业务描述:
${row.description || ""}

这个字段属于:
${row.table_title}
`;
};

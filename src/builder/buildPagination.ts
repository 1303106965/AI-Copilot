import { BuilderContext } from "../types/builderContext";

/**
 * build pagination
 */
export const buildPagination = (context: BuilderContext) => {
  const ast = context.ast;

  context.config.config.defaults.arg0.data.paginationNode = {
    pageNo: 1,

    pageSize: ast.pageSize || 10,
  };
};

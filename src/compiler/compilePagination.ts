import { CompilerContext } from "../types/compilerContext";
import { getDispatchData } from "./dispatchNodeAccessor";

/**
 * compile pagination
 */
export const compilePagination = async (context: CompilerContext) => {
  const pagination = context.plan.pagination;
  const data = getDispatchData(context);
  if (!pagination) {
    return;
  }

  data.paginationNode = {
    page: pagination.page,

    pageSize: pagination.pageSize,
  };
};

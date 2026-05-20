import { CompilerContext } from "../types/compilerContext";

/**
 * get dispatch data
 */
export const getDispatchData = (context: CompilerContext) => {
  return context.config.config.defaults.arg0.data;
};

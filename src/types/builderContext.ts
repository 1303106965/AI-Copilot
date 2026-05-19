import { IntentAST } from "./intentAST";

/**
 * builder context
 */
export interface BuilderContext {
  /**
   * intent ast
   */
  ast: IntentAST;

  /**
   * dispatch config
   */
  config: any;

  /**
   * semantic cache
   */
  semanticMap: Record<string, any>;
}

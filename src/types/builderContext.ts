import { IntentAST } from "./intentAST";

/**
 * builder context
 *
 * Builder 共享上下文
 */
export interface BuilderContext {
  /**
   * 用户意图
   */
  ast: IntentAST;

  /**
   * dispatchNode config
   */
  config: any;

  /**
   * semantic metadata cache
   */
  semanticMap: Record<string, any>;
}

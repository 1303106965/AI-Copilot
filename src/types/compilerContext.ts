import { SemanticQueryPlan } from "./SemanticQueryPlan";

/**
 * compiler context
 */
export interface CompilerContext {
  /**
   * semantic query plan
   */
  plan: SemanticQueryPlan;

  /**
   * dispatch node config
   */
  config: any;

  /**
   * semantic cache
   */
  semanticMap: Record<string, any>;
}

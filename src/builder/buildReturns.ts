import { BuilderContext } from "../types/builderContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * build returns
 */
export const buildReturns = async (context: BuilderContext) => {
  const ast = context.ast;

  const returns = await Promise.all(
    ast.displayFields.map(async (title) => {
      const semantic = await semanticService.findColumnByTitle(title);

      if (!semantic) {
        return null;
      }

      return {
        alias: semantic.column_name,

        key: semantic.column_name,

        name: semantic.column_title,

        type: semantic.data_type || "string",
      };
    })
  );

  context.config.config.defaults.arg0.data.returns = returns.filter(Boolean);
};

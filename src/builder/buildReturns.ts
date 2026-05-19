import { BuilderContext } from "../types/builderContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * build returns
 */
export const buildReturns = async (context: BuilderContext) => {
  const ast = context.ast;

  const returns = await Promise.all(
    ast.fields.map(async (field) => {
      /**
       * semantic
       */
      const semantic = await semanticService.getColumnSemantic(
        ast.table,

        field
      );

      return {
        alias: field,

        key: field,

        name: semantic?.column_title || field,

        type: semantic?.data_type || "string",
      };
    })
  );

  context.config.config.defaults.arg0.data.returns = returns;
};

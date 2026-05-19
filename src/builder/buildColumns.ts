import { BuilderContext } from "../types/builderContext";

import { SemanticService } from "../services/semantic.service";

const semanticService = new SemanticService();

/**
 * build columns
 */
export const buildColumns = async (context: BuilderContext) => {
  const ast = context.ast;

  /**
   * display fields
   */
  const columns = await Promise.all(
    ast.displayFields.map(async (fieldTitle) => {
      /**
       * semantic lookup
       */
      const semantic = await semanticService.findColumnByTitle(fieldTitle);

      if (!semantic) {
        return null;
      }

      return {
        aggregate: false,

        alias: semantic.column_name,

        columnType: "FIELD",

        expression: semantic.column_name,

        subquery: false,
      };
    })
  );

  context.config.config.defaults.arg0.data.columns = columns.filter(Boolean);
};

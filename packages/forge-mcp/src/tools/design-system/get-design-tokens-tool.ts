import { CallToolResult, Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getDesignTokensService } from '../../services/design-tokens-service.js';
import { DesignTokensResource } from '../../resources/design-tokens/design-tokens-resource.js';

export interface DesignTokensInput extends ToolInput {
  category?: string;
  query?: string;
}

export class DesignTokensTool extends BaseToolHandler<DesignTokensInput> {
  private readonly _designTokensService = getDesignTokensService();
  private readonly _designTokensResource = new DesignTokensResource();

  constructor() {
    super(
      'get_design_tokens',
      'Get Tyler Forge design tokens (CSS custom properties) for consistent styling. With no arguments, returns an overview of all token categories. Use `category` to list every token in a category, `query` to search token names, descriptions, and values, or both to search within a category. Theme color tokens include light and dark values.'
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description:
              'Optional: token category name as listed in the overview (e.g. "spacing", "primary", "surface", "text", "elevation", "shape", "animation")'
          },
          query: {
            type: 'string',
            description:
              'Optional: search terms; a token matches when every term appears in its category, name, description, or value (e.g. "error container", "dialog")'
          }
        },
        required: []
      }
    };
  }

  public async execute({ category, query }: DesignTokensInput): Promise<CallToolResult> {
    const trimmedQuery = query?.trim();
    if (!category && !trimmedQuery) {
      const categories = await this._designTokensService.getCategories();
      return this._createTextResponse(await this._designTokensResource.getOverview(categories));
    }

    const matches = await this._designTokensService.search({ category, query: trimmedQuery });
    if (!matches.length) {
      const scope = category ? ` in category "${category}"` : '';
      return this._createTextResponse(
        `No design tokens found matching "${trimmedQuery}"${scope}. Call \`get_design_tokens\` with no arguments to see all categories.`
      );
    }

    return this._createTextResponse(await this._designTokensResource.getCategories(matches, trimmedQuery));
  }
}

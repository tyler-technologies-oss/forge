import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getIconSearchService } from '../../services/icon-search-service.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';

export interface FindIconsInput extends ToolInput {
  query: string;
  limit?: number;
}

export class FindIconsTool extends BaseToolHandler<FindIconsInput> {
  private _iconSearchService = getIconSearchService();
  private _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'find_icons',
      'Search Tyler Icons using semantic/fuzzy search with natural language queries. Finds the closest matching icons by name and keywords.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'Space-separated search terms to find matching icons (e.g., "user profile", "arrow left", "check mark")',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results to return (default: 10)',
            minimum: 1,
            maximum: 50,
          },
        },
        required: ['query'],
      },
    };
  }

  public async execute(
    args: FindIconsInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { query, limit = 10 } = args;

    if (!query || query.trim().length === 0) {
      return this._createTextResponse(
        'Error: Query parameter is required and cannot be empty.',
      );
    }

    if (limit < 1 || limit > 50) {
      return this._createTextResponse('Error: Limit must be between 1 and 50.');
    }

    try {
      const results = await this._iconSearchService.searchIcons(query, limit);

      if (results.length === 0) {
        return this._createTextResponse(
          `No icons found matching "${query}". Try different search terms or check the setup_icons tool for available icons.`,
        );
      }

      const content = await this._templateEngine.render(
        'icons/find-icons-response.md',
        {
          query,
          results,
          resultCount: results.length,
        },
      );

      return this._createTextResponse(content);
    } catch (error) {
      return this._createTextResponse(
        `Error searching icons: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

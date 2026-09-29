import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';

export interface DesignTokensInput extends ToolInput {
  category?: string;
}

export class DesignTokensTool extends BaseToolHandler<DesignTokensInput> {
  private _resourceManager = getResourceManager();

  constructor() {
    super(
      'get_design_tokens',
      'Get Tyler Forge design tokens for consistent styling. Access color palettes, spacing scales, typography, animation, and other design system values.',
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
            enum: [
              'color',
              'spacing',
              'typography',
              'animation',
              'border',
              'elevation',
              'layering',
              'shape',
              'all',
            ],
            description:
              'Optional: specific design token category (default: all categories overview)',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: DesignTokensInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { category } = args;

    await this._resourceManager.initialize();

    let content = '';

    // Read the appropriate resource based on category
    if (category && category !== 'all') {
      const resourceUri = `forge://design-tokens/${category}`;
      try {
        content = await this._resourceManager.readResource(resourceUri);
      } catch (_error) {
        content = `# ${category.charAt(0).toUpperCase() + category.slice(1)} Design Tokens\n\nError loading design tokens for category "${category}". Please check that the category is valid.`;
      }
    } else {
      // Default to the main design tokens overview
      content = await this._resourceManager.readResource(
        'forge://design-tokens',
      );
    }

    return this._createTextResponse(content);
  }
}

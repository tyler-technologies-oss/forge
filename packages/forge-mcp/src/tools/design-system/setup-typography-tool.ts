import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';

export interface TypographySetupInput extends ToolInput {}

export class TypographySetupTool extends BaseToolHandler<TypographySetupInput> {
  private _resourceManager = getResourceManager();

  constructor() {
    super(
      'setup_typography',
      'Access Tyler Forge typography setup instructions including font families, type scales, weights, and practical usage guidelines for consistent text styling.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    };
  }

  public async execute(
    _args: TypographySetupInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    await this._resourceManager.initialize();
    const content = await this._resourceManager.readResource(
      'forge://design-tokens/typography',
    );

    return this._createTextResponse(content);
  }
}

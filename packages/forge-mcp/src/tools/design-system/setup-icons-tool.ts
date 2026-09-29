import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';

export interface IconsGuideInput extends ToolInput {}

export class IconsGuideTool extends BaseToolHandler<IconsGuideInput> {
  private _resourceManager = getResourceManager();

  constructor() {
    super(
      'setup_icons',
      'Access Tyler Forge icons system including installation, registration, and usage patterns for the forge-icon component.',
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
    _args: IconsGuideInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    await this._resourceManager.initialize();
    const content = await this._resourceManager.readResource('forge://icons');

    return this._createTextResponse(content);
  }
}

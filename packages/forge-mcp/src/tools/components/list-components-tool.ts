import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';

export interface ListComponentNamesInput extends ToolInput {}

export class ListComponentsTool extends BaseToolHandler<ListComponentNamesInput> {
  private _resourceManager = getResourceManager();

  constructor() {
    super(
      'list_components',
      'Browse all available Tyler Forge components with descriptions. Returns a comprehensive table of all components with their purpose and capabilities.',
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
    _args: ListComponentNamesInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    await this._resourceManager.initialize();
    const content =
      await this._resourceManager.readResource('forge://components');

    return this._createTextResponse(content);
  }
}

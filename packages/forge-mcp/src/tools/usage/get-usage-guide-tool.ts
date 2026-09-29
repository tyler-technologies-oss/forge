import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';

export interface UsageGuideInput extends ToolInput {
  type?: 'general' | 'installation' | 'framework';
  framework?: 'angular' | 'react' | 'vue' | 'svelte' | 'vanilla';
}

export class UsageGuideTool extends BaseToolHandler<UsageGuideInput> {
  private _resourceManager = getResourceManager();

  constructor() {
    super(
      'get_usage_guide',
      'Get comprehensive Tyler Forge guides including installation instructions, framework-specific integration, and general usage patterns',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['general', 'installation', 'framework'],
            description:
              'Type of guide: general (default - usage patterns), installation (setup instructions), or framework (framework-specific integration)',
          },
          framework: {
            type: 'string',
            enum: ['angular', 'react', 'vue', 'svelte', 'vanilla'],
            description:
              'Framework for installation or framework guides. Required for type=framework.',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: UsageGuideInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { type = 'general', framework } = args;

    await this._resourceManager.initialize();

    let content = '';

    if (type === 'framework') {
      if (!framework) {
        throw new Error(
          'Framework parameter is required when type=framework. Supported frameworks: angular, react, vue, svelte, vanilla',
        );
      }
      // Get framework-specific guide directly
      content = await this._getFrameworkContent(framework);
    } else if (type === 'installation') {
      if (framework) {
        // Get framework-specific installation guide directly
        content = await this._getFrameworkContent(framework);
      } else {
        // Get general installation guide
        content = await this._resourceManager.readResource(
          'forge://installation',
        );
      }
    } else {
      // type === 'general' (default)
      content = await this._resourceManager.readResource('forge://usage');
    }

    return this._createTextResponse(content);
  }

  private async _getFrameworkContent(framework: string): Promise<string> {
    const frameworkLower = framework.toLowerCase();

    switch (frameworkLower) {
      case 'angular':
        return await this._resourceManager.getFrameworkAngular();
      case 'react':
        return await this._resourceManager.getFrameworkReact();
      case 'vue':
        return await this._resourceManager.getFrameworkVue();
      case 'svelte':
        return await this._resourceManager.getFrameworkSvelte();
      case 'vanilla':
      case 'lit':
        return await this._resourceManager.getFrameworkLit();
      default:
        throw new Error(
          `Framework guide not found for ${framework}. Supported frameworks: angular, react, vue, svelte, vanilla`,
        );
    }
  }
}

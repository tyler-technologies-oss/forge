import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { readTemplateResource } from '../../resources/base/base-template-resource.js';

export interface FrameworkSetupInput extends ToolInput {
  framework: 'angular' | 'react' | 'vue' | 'svelte' | 'lit';
}

const FRAMEWORK_TEMPLATE_PATHS: Record<
  FrameworkSetupInput['framework'],
  string
> = {
  angular: 'frameworks/framework-angular.md',
  react: 'frameworks/framework-react.md',
  vue: 'frameworks/framework-vue.md',
  svelte: 'frameworks/framework-svelte.md',
  lit: 'frameworks/framework-lit.md',
};

export class FrameworkSetupTool extends BaseToolHandler<FrameworkSetupInput> {
  constructor() {
    super(
      'setup_framework',
      'Get complete framework-specific setup instructions for Tyler Forge components including installation, configuration, and best practices.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          framework: {
            type: 'string',
            enum: ['angular', 'react', 'vue', 'svelte', 'lit'],
            description:
              'Target framework for Tyler Forge setup and integration',
          },
        },
        required: ['framework'],
      },
    };
  }

  public async execute(
    args: FrameworkSetupInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { framework } = args;

    const templatePath = FRAMEWORK_TEMPLATE_PATHS[framework];
    if (!templatePath) {
      throw new Error(
        `Framework guide not found for ${framework}. Supported frameworks: angular, react, vue, svelte, lit`,
      );
    }

    try {
      const content = await readTemplateResource(templatePath);
      return this._createTextResponse(content);
    } catch (error) {
      throw new Error(
        `Failed to load ${framework} framework guide: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

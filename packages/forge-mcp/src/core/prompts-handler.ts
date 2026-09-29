import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { getTemplateEngine } from '../services/handlebars-template-engine.js';

interface PromptDefinition {
  name: string;
  description: string;
  template: string;
  arguments?: any[];
}

export class PromptsHandler {
  private _templateEngine = getTemplateEngine();

  // Define all available prompts in one place for easy management
  private _prompts: PromptDefinition[] = [
    {
      name: 'forge_mode',
      description:
        'Activates forge mode with guardrails and rules to guide Tyler Forge tasks successfully',
      template: 'prompts/forge-mode.md',
      arguments: [
        {
          name: 'task',
          description:
            'The specific task or request the user wants to accomplish with Tyler Forge',
          required: true,
        },
      ],
    },
  ];

  public registerHandlers(server: Server): void {
    // Handle prompt listing
    server.setRequestHandler(ListPromptsRequestSchema, async () => {
      try {
        return {
          prompts: this._prompts.map(prompt => ({
            name: prompt.name,
            description: prompt.description,
            arguments: prompt.arguments || [],
          })),
        };
      } catch (error) {
        throw new Error(
          `Failed to list prompts: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    });

    // Handle prompt retrieval
    server.setRequestHandler(GetPromptRequestSchema, async request => {
      try {
        const { name, arguments: args } = request.params;

        const promptDef = this._prompts.find(p => p.name === name);
        if (!promptDef) {
          throw new Error(
            `Unknown prompt: ${name}. Available prompts: ${this._prompts.map(p => p.name).join(', ')}`,
          );
        }

        return await this._generatePromptResponse(promptDef, args);
      } catch (error) {
        throw new Error(
          `Failed to get prompt: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    });
  }

  /**
   * Generate a prompt response by loading the template with provided arguments
   */
  private async _generatePromptResponse(
    promptDef: PromptDefinition,
    args?: Record<string, any>,
  ): Promise<any> {
    // Validate required arguments
    const requiredArgs = promptDef.arguments?.filter(arg => arg.required) || [];
    for (const requiredArg of requiredArgs) {
      if (!args || !args[requiredArg.name]) {
        throw new Error(
          `Missing required argument: ${requiredArg.name}. ${requiredArg.description}`,
        );
      }
    }

    // Load the template with any provided arguments as context
    const templateContext = args || {};
    const content = await this._templateEngine.render(
      promptDef.template,
      templateContext,
    );

    return {
      description: promptDef.description,
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: content,
          },
        },
      ],
    };
  }
}

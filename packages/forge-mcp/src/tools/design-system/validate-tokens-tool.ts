import { CallToolResult, Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getDesignTokensService } from '../../services/design-tokens-service.js';
import { getCEMLoader } from '../../services/cem-loader.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';

const FORGE_CUSTOM_PROPERTY_PATTERN = /--forge-[\w-]+/g;

export interface ValidateTokensInput extends ToolInput {
  tokens?: string[];
  code?: string;
}

/**
 * Validates that the Forge design tokens referenced in generated code exist.
 *
 * Unknown `--forge-` names that are component-level CSS custom properties are
 * reported separately, since they are valid but are not global design tokens.
 */
export class ValidateTokensTool extends BaseToolHandler<ValidateTokensInput> {
  private readonly _designTokensService = getDesignTokensService();
  private readonly _cemLoader = getCEMLoader();
  private readonly _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'validate_tokens',
      'Validate Tyler Forge design token usage after generating CSS or styles. Pass token names, or a code snippet to extract every `--forge-*` custom property from. Reports unknown tokens with suggested replacements, and identifies component-level CSS properties that should be checked with `validate_component_api` instead.'
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          tokens: {
            type: 'array',
            items: { type: 'string' },
            description: 'Custom property names to validate (e.g. ["--forge-spacing-medium", "--forge-theme-primary"])'
          },
          code: {
            type: 'string',
            description: 'CSS, SCSS, HTML, or JS source; every `--forge-*` custom property it references is validated'
          }
        },
        required: []
      }
    };
  }

  public async execute({ tokens = [], code = '' }: ValidateTokensInput): Promise<CallToolResult> {
    const names = [...tokens, ...(code.match(FORGE_CUSTOM_PROPERTY_PATTERN) ?? [])];
    if (!names.length) {
      throw new Error('Provide `tokens` or a `code` snippet that references at least one `--forge-*` custom property');
    }

    const { valid, unknown, ignored } = await this._designTokensService.validate(names);
    const componentPropertyOwners = await this._getComponentPropertyOwners();
    const componentProperties = unknown
      .filter(({ name }) => componentPropertyOwners.has(name))
      .map(({ name }) => ({ name, components: componentPropertyOwners.get(name) }));

    const text = await this._templateEngine.render('design-tokens/validation-response.md', {
      totalValidated: valid.length + unknown.length,
      valid,
      unknown: unknown.filter(({ name }) => !componentPropertyOwners.has(name)),
      componentProperties,
      ignored
    });
    return this._createTextResponse(text);
  }

  private async _getComponentPropertyOwners(): Promise<Map<string, string[]>> {
    if (!this._cemLoader.isLoaded()) {
      await this._cemLoader.loadCEM();
    }

    const owners = new Map<string, string[]>();
    for (const { tagName, cssProperties = [] } of this._cemLoader.getAllComponents()) {
      for (const { name } of cssProperties) {
        owners.set(name, [...(owners.get(name) ?? []), tagName]);
      }
    }
    return owners;
  }
}

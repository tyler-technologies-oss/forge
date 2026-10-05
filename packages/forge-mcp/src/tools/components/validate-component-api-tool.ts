import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getCEMLoader } from '../../services/cem-loader.js';
import { getApiValidationService, ComponentApiValidationInput, ComponentValidationResults } from '../../services/api-validation-service.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';

export interface ComponentApiValidationToolInput extends ToolInput {
  component: string;
  apis?: ComponentApiValidationInput;
}

/**
 * Tool for validating Tyler Forge component API usage after code generation
 *
 * This tool validates that component properties, attributes, events, methods,
 * slots, CSS properties, parts, and classes are correctly used on Tyler Forge
 * components. It identifies invalid APIs and warns about deprecated ones.
 *
 * Call this tool after generating code to ensure all component APIs are valid.
 */
export class ValidateComponentApiTool extends BaseToolHandler<ComponentApiValidationToolInput> {
  private _cemLoader = getCEMLoader();
  private _validationService = getApiValidationService();
  private _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'validate_component_api',
      'Validate Tyler Forge component-specific API usage after code generation. Supports all components in @tylertech/forge. DO NOT use this tool to validate standard HTML attributes (id, class, style, etc.), ARIA attributes (aria-*), or data attributes (data-*) - these are valid on all elements. Only validate component-specific properties, attributes, events, methods, slots, CSS properties, parts, and classes.'
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          component: {
            type: 'string',
            description: 'Component tag name - e.g., "forge-button", "forge-card", "forge-user-profile", "forge-app-launcher"'
          },
          apis: {
            type: 'object',
            description: 'APIs to validate for the component',
            properties: {
              properties: {
                type: 'array',
                items: { type: 'string' },
                description: 'Property names to validate (e.g., ["disabled", "value"])'
              },
              attributes: {
                type: 'array',
                items: { type: 'string' },
                description: 'Attribute names to validate (e.g., ["disabled", "aria-label"])'
              },
              events: {
                type: 'array',
                items: { type: 'string' },
                description: 'Event names to validate (e.g., ["change", "click"])'
              },
              methods: {
                type: 'array',
                items: { type: 'string' },
                description: 'Method names to validate (e.g., ["focus", "click"])'
              },
              slots: {
                type: 'array',
                items: { type: 'string' },
                description: 'Slot names to validate (e.g., ["default", "header"])'
              },
              cssProperties: {
                type: 'array',
                items: { type: 'string' },
                description: 'CSS custom property names to validate (e.g., ["--forge-button-background"])'
              },
              cssParts: {
                type: 'array',
                items: { type: 'string' },
                description: 'CSS part names to validate (e.g., ["button", "label"])'
              },
              cssClasses: {
                type: 'array',
                items: { type: 'string' },
                description: 'CSS class names to validate (e.g., ["forge-button--raised"])'
              }
            }
          }
        },
        required: ['component']
      }
    };
  }

  public async execute(args: ComponentApiValidationToolInput): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { component, apis = {} } = args;

    this._validateRequired(args, ['component']);

    // Ensure CEM data is loaded
    if (!this._cemLoader.isLoaded()) {
      await this._cemLoader.loadCEM();
    }

    // Get component data
    const componentData = this._cemLoader.getComponent(component);
    if (!componentData) {
      throw new Error(`Component not found: ${component}. Available components: ${this._cemLoader.getComponentTagNames().join(', ')}`);
    }

    // Check if there are any APIs to validate
    const hasApis = Object.values(apis).some(apiArray => apiArray && apiArray.length > 0);
    if (!hasApis) {
      return this._createTextResponse('No APIs provided for validation. Component usage is correct.');
    }

    // Perform validation
    const validationResults = this._validationService.validateComponentApis(componentData, apis);

    // Generate response using template
    const responseText = await this._generateValidationResponse(validationResults);

    return this._createTextResponse(responseText);
  }

  /**
   * Generate formatted validation response using template
   */
  private async _generateValidationResponse(results: ComponentValidationResults): Promise<string> {
    return await this._templateEngine.render('components/validation-response.md', results);
  }
}

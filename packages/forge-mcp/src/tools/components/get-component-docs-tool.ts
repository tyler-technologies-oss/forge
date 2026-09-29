import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';
import { ComponentSummaryResource } from '../../resources/components/component-summary-resource.js';
import { getCEMLoader } from '../../services/cem-loader.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';
import { buildComponentTemplateContext } from '../../services/component-template-context.js';
import { CEMComponentDeclaration } from '../../types/index.js';

export interface ComponentDocumentationInput extends ToolInput {
  component: string;
  sections?: string[];
  format?: 'full' | 'summary';
}

export class ComponentDocumentationTool extends BaseToolHandler<ComponentDocumentationInput> {
  private _resourceManager = getResourceManager();
  private _componentSummaryResource = new ComponentSummaryResource();
  private _cemLoader = getCEMLoader();
  private _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'get_component_docs',
      'Get the API contract (properties, attributes, events, slots, CSS parts, CSS vars) for a Tyler Forge component. Call list_components first if you need to discover available components. For HTML usage code, call `get_forge_blocks` instead — blocks are the sole source of Forge markup.',
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
            description:
              'Component tag name (e.g., "forge-button", "forge-card"). Required — call list_components first if you don\'t know the tag name.',
          },
          sections: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'properties',
                'methods',
                'events',
                'slots',
                'css-custom-properties',
                'css-parts',
                'css-classes',
                'states',
              ],
            },
            description:
              'Optional: specific documentation sections to include. Only applies to full format.',
          },
          format: {
            type: 'string',
            enum: ['full', 'summary'],
            description:
              'Documentation format: full (default) or summary (brief overview). For HTML usage code, call `get_forge_blocks` — this tool returns API contract only.',
          },
        },
        required: ['component'],
      },
    };
  }

  public async execute(
    args: ComponentDocumentationInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    this._validateRequired(args, ['component']);
    const { component, sections, format = 'full' } = args;

    await this._resourceManager.initialize();

    // Get component data (required for all formats)
    const componentData = this._cemLoader.getComponent(component);
    if (!componentData) {
      throw new Error(
        `Component not found: ${component}. Use list_components to see available components.`,
      );
    }

    // Generate API quick reference to prepend to all component docs
    const quickRef = await this._generateApiQuickReference(componentData);

    // Handle summary format
    if (format === 'summary') {
      const summaryContent =
        await this._componentSummaryResource.get(componentData);
      return this._createTextResponse(quickRef + summaryContent);
    }

    // Handle full format with specific sections
    if (sections && sections.length > 0) {
      const sectionContent = await this._generateSectionContent(
        componentData,
        sections,
      );
      return this._createTextResponse(quickRef + sectionContent);
    }

    // Full format - return complete resource content
    const uri = `forge://component/${component}`;
    const fullContent = await this._resourceManager.readResource(uri);
    return this._createTextResponse(quickRef + fullContent);
  }

  /**
   * Generate the API Quick Reference header using template
   */
  private async _generateApiQuickReference(
    component: CEMComponentDeclaration,
  ): Promise<string> {
    const context = buildComponentTemplateContext(component);
    return await this._templateEngine.render(
      'components/api-quick-reference.md',
      context,
    );
  }

  /**
   * Generate content for specific sections using CEM data and templates
   */
  private async _generateSectionContent(
    component: CEMComponentDeclaration,
    sections: string[],
  ): Promise<string> {
    const context = buildComponentTemplateContext(component);
    const contentSections: string[] = [];

    // Always include the component title
    contentSections.push(`# API REFERENCE: ${component.name}`);
    contentSections.push('');
    contentSections.push(
      `**Tyler Forge Component** | **Tag:** \`<${component.tagName}>\` | **Type:** Web Component`,
    );

    if (component.summary) {
      contentSections.push('');
      contentSections.push(`**PURPOSE:** ${component.summary}`);
    }

    if (component.description) {
      contentSections.push('');
      contentSections.push(`**DESCRIPTION:** ${component.description}`);
    }

    // Map section names to template names and generate content
    for (const section of sections) {
      const templateName = this._getTemplateNameForSection(section);

      if (templateName) {
        try {
          const sectionContent = await this._templateEngine.render(
            templateName,
            context,
          );
          if (sectionContent.trim()) {
            contentSections.push('');
            contentSections.push(sectionContent);
          }
        } catch (_error) {
          // If template doesn't exist, add error message
          contentSections.push('');
          contentSections.push(
            `## ${section.toUpperCase()}\n\n*Template not found for section: ${section}*`,
          );
        }
      }
    }

    return contentSections.join('\n');
  }

  /**
   * Map section parameter names to template file names
   */
  private _getTemplateNameForSection(section: string): string | null {
    const templateMap: Record<string, string> = {
      properties: 'components/component-properties.md',
      methods: 'components/component-methods.md',
      events: 'components/component-events.md',
      slots: 'components/component-slots.md',
      'css-custom-properties': 'components/component-css-properties.md',
      'css-parts': 'components/component-css-parts.md',
      'css-classes': 'components/component-css-classes.md',
      states: 'components/component-states.md',
    };

    return templateMap[section] || null;
  }
}

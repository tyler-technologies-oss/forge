import { DocumentationParser } from '../utils/parser.js';
import { COMPONENT_CATEGORIES, COMPONENT_MAP } from '../utils/constants.js';

export class ComponentsResource {
  private parser: DocumentationParser;

  constructor() {
    this.parser = new DocumentationParser();
  }

  async list(): Promise<any> {
    const components = await this.parser.getAllComponents();
    
    const categorized: Record<string, any[]> = {};
    
    for (const category of Object.keys(COMPONENT_CATEGORIES)) {
      categorized[category] = [];
    }

    for (const componentName of components) {
      const info = COMPONENT_MAP.get(componentName);
      const category = info?.category || 'utility';
      
      if (!categorized[category]) {
        categorized[category] = [];
      }

      categorized[category].push({
        name: componentName,
        displayName: info?.name || this.formatName(componentName),
        tagName: info?.tagName || `forge-${componentName}`,
        description: info?.description || '',
        hasCSSOnly: info?.hasCSSOnly || false
      });
    }

    return {
      uri: 'forge://components',
      name: 'Forge Components',
      description: 'All available Tyler Forge components',
      mimeType: 'application/json',
      text: JSON.stringify({
        total: components.length,
        categories: categorized
      }, null, 2)
    };
  }

  async get(componentName: string): Promise<any> {
    const component = await this.parser.parseComponent(componentName);
    
    if (!component) {
      throw new Error(`Component ${componentName} not found`);
    }

    return {
      uri: `forge://components/${componentName}`,
      name: component.name,
      description: component.description,
      mimeType: 'application/json',
      text: JSON.stringify(component, null, 2)
    };
  }

  async getDocumentation(componentName: string): Promise<any> {
    const component = await this.parser.parseComponent(componentName);
    
    if (!component) {
      throw new Error(`Component ${componentName} not found`);
    }

    let documentation = `# ${component.name}\n\n`;
    documentation += `${component.description}\n\n`;
    documentation += `**Tag Name:** \`${component.tagName}\`\n\n`;

    if (component.variants && component.variants.length > 0) {
      documentation += `## Variants\n\n`;
      documentation += component.variants.map(v => `- ${v}`).join('\n');
      documentation += '\n\n';
    }

    if (component.themes && component.themes.length > 0) {
      documentation += `## Themes\n\n`;
      documentation += component.themes.map(t => `- ${t}`).join('\n');
      documentation += '\n\n';
    }

    if (component.properties.length > 0) {
      documentation += `## Properties\n\n`;
      documentation += '| Property | Type | Default | Description |\n';
      documentation += '|----------|------|---------|-------------|\n';
      component.properties.forEach(prop => {
        documentation += `| ${prop.name} | ${prop.type} | ${prop.default || '-'} | ${prop.description} |\n`;
      });
      documentation += '\n';
    }

    if (component.events.length > 0) {
      documentation += `## Events\n\n`;
      component.events.forEach(event => {
        documentation += `- **${event.name}**: ${event.description}\n`;
      });
      documentation += '\n';
    }

    if (component.slots.length > 0) {
      documentation += `## Slots\n\n`;
      component.slots.forEach(slot => {
        documentation += `- **${slot.name}**: ${slot.description}\n`;
      });
      documentation += '\n';
    }

    if (component.accessibility) {
      documentation += `## Accessibility\n\n${component.accessibility}\n\n`;
    }

    if (component.dependencies && component.dependencies.length > 0) {
      documentation += `## Dependencies\n\n`;
      documentation += component.dependencies.map(d => `- ${d}`).join('\n');
      documentation += '\n';
    }

    return {
      uri: `forge://documentation/${componentName}`,
      name: `${component.name} Documentation`,
      description: `Full documentation for ${component.name}`,
      mimeType: 'text/markdown',
      text: documentation
    };
  }

  private formatName(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
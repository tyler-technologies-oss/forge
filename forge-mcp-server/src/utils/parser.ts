import fs from 'fs/promises';
import path from 'path';
import { ForgeComponent, ComponentProperty, ComponentEvent, ComponentExample, ComponentSlot, CssVariable } from './types.js';
import { STORIES_DIR, LIB_DIR, COMPONENT_MAP } from './constants.js';

export class DocumentationParser {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async parseComponent(componentName: string): Promise<ForgeComponent | null> {
    const cached = this.getCached(componentName);
    if (cached) return cached;

    try {
      const baseInfo = COMPONENT_MAP.get(componentName) || {};
      const mdxContent = await this.readMDXFile(componentName);
      const storiesContent = await this.readStoriesFile(componentName);
      const componentSource = await this.readComponentSource(componentName);
      
      const component: ForgeComponent = {
        name: baseInfo.name || this.formatName(componentName),
        tagName: baseInfo.tagName || `forge-${componentName}`,
        description: baseInfo.description || '',
        category: baseInfo.category || 'utility',
        properties: await this.extractProperties(componentSource),
        events: await this.extractEvents(componentSource),
        slots: await this.extractSlots(mdxContent),
        cssVariables: await this.extractCssVariables(componentName),
        variants: baseInfo.variants,
        themes: baseInfo.themes,
        hasCSSOnly: baseInfo.hasCSSOnly || false,
        dependencies: baseInfo.dependencies,
        accessibility: await this.extractAccessibility(mdxContent),
        examples: await this.extractExamples(storiesContent)
      };

      this.setCache(componentName, component);
      return component;
    } catch (error) {
      console.error(`Error parsing component ${componentName}:`, error);
      return null;
    }
  }

  private async readMDXFile(componentName: string): Promise<string> {
    const mdxPath = path.join(STORIES_DIR, componentName, `${this.pascalCase(componentName)}.mdx`);
    try {
      return await fs.readFile(mdxPath, 'utf-8');
    } catch {
      return '';
    }
  }

  private async readStoriesFile(componentName: string): Promise<string> {
    const storiesPath = path.join(STORIES_DIR, componentName, `${this.pascalCase(componentName)}.stories.ts`);
    try {
      return await fs.readFile(storiesPath, 'utf-8');
    } catch {
      return '';
    }
  }

  private async readComponentSource(componentName: string): Promise<string> {
    const sourcePath = path.join(LIB_DIR, componentName, `${componentName}.ts`);
    try {
      return await fs.readFile(sourcePath, 'utf-8');
    } catch {
      return '';
    }
  }

  private async extractProperties(source: string): Promise<ComponentProperty[]> {
    const properties: ComponentProperty[] = [];
    
    // Extract from @property JSDoc comments
    const propertyRegex = /@property\s+{([^}]+)}\s+(?:\[)?(\w+)(?:=[^\]]+)?(?:\])?\s+-?\s*(.+)/gm;
    let match;
    
    while ((match = propertyRegex.exec(source)) !== null) {
      const [, type, name, description] = match;
      const isOptional = source.includes(`[${name}=`) || source.includes(`[${name}]`);
      
      properties.push({
        name,
        type: type.trim(),
        description: description.trim(),
        required: !isOptional,
        default: this.extractDefault(source, name)
      });
    }

    // Also extract from interface definitions
    const interfaceMatch = source.match(/export interface I\w+Component[^{]*{([^}]+)}/);
    if (interfaceMatch) {
      const interfaceBody = interfaceMatch[1];
      const propRegex = /(\w+)(\?)?:\s*([^;]+);/g;
      
      while ((match = propRegex.exec(interfaceBody)) !== null) {
        const [, name, optional, type] = match;
        if (!properties.find(p => p.name === name)) {
          properties.push({
            name,
            type: type.trim(),
            description: '',
            required: !optional,
            default: undefined
          });
        }
      }
    }

    return properties;
  }

  private async extractEvents(source: string): Promise<ComponentEvent[]> {
    const events: ComponentEvent[] = [];
    
    // Extract custom events from constants
    const eventRegex = /['"]forge-(\w+)-(\w+)['"]/g;
    const eventNames = new Set<string>();
    
    let match;
    while ((match = eventRegex.exec(source)) !== null) {
      const eventName = `forge-${match[1]}-${match[2]}`;
      eventNames.add(eventName);
    }

    eventNames.forEach(name => {
      events.push({
        name,
        description: `Event triggered by ${name.replace('forge-', '').replace(/-/g, ' ')}`,
        detail: undefined
      });
    });

    return events;
  }

  private async extractSlots(mdxContent: string): Promise<ComponentSlot[]> {
    const slots: ComponentSlot[] = [];
    
    // Look for slot documentation in MDX
    const slotRegex = /slot=['"](\w+)['"]/g;
    const slotNames = new Set<string>();
    
    let match;
    while ((match = slotRegex.exec(mdxContent)) !== null) {
      slotNames.add(match[1]);
    }

    slotNames.forEach(name => {
      slots.push({
        name,
        description: `Content slot for ${name}`
      });
    });

    return slots;
  }

  private async extractCssVariables(componentName: string): Promise<CssVariable[]> {
    const variables: CssVariable[] = [];
    
    try {
      const scssPath = path.join(LIB_DIR, componentName, `${componentName}.scss`);
      const scssContent = await fs.readFile(scssPath, 'utf-8');
      
      const varRegex = /--forge-[^:]+/g;
      const varNames = new Set<string>();
      
      let match;
      while ((match = varRegex.exec(scssContent)) !== null) {
        varNames.add(match[0]);
      }

      varNames.forEach(name => {
        variables.push({
          name,
          description: `CSS variable for ${name.replace('--forge-', '').replace(/-/g, ' ')}`,
          default: undefined
        });
      });
    } catch {
      // No SCSS file found
    }

    return variables;
  }

  private async extractAccessibility(mdxContent: string): Promise<string> {
    const accessibilitySection = mdxContent.match(/## Accessibility([\s\S]*?)(?=##|$)/);
    return accessibilitySection ? accessibilitySection[1].trim() : '';
  }

  private async extractExamples(storiesContent: string): Promise<ComponentExample[]> {
    const examples: ComponentExample[] = [];
    
    // Extract story examples
    const storyRegex = /export const (\w+):[^=]+=\s*{([^}]+)}/g;
    let match;
    
    while ((match = storyRegex.exec(storiesContent)) !== null) {
      const [, name] = match;
      examples.push({
        title: name,
        framework: 'vanilla',
        code: '', // Would need more complex parsing to extract full code
        description: undefined
      });
    }

    return examples;
  }

  private extractDefault(source: string, propertyName: string): string | undefined {
    const defaultRegex = new RegExp(`${propertyName}.*?=\\s*['"\`]?([^'"\`\\s;]+)`, 'i');
    const match = source.match(defaultRegex);
    return match ? match[1] : undefined;
  }

  private formatName(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private pascalCase(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  private getCached(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getAllComponents(): Promise<string[]> {
    try {
      const dirs = await fs.readdir(STORIES_DIR);
      const components: string[] = [];
      
      for (const dir of dirs) {
        const stats = await fs.stat(path.join(STORIES_DIR, dir));
        if (stats.isDirectory()) {
          components.push(dir);
        }
      }
      
      return components;
    } catch {
      return Array.from(COMPONENT_MAP.keys());
    }
  }
}
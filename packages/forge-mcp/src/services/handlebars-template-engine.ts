import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import { TemplateContext } from '../types/index.js';
import { getTemplatePath } from '../utils/path-utils.js';
import { FrameworkTemplateHelpers } from './framework-template-helpers.js';

export class HandlebarsTemplateEngine {
  private _compiledTemplateCache: Map<string, HandlebarsTemplateDelegate> =
    new Map();

  constructor() {
    this._registerHelpers();
    FrameworkTemplateHelpers.registerHelpers();
  }

  /**
   * Render a template with the given context using Handlebars
   */
  public async render(
    templateName: string,
    context: TemplateContext,
  ): Promise<string> {
    const compiledTemplate = await this._getCompiledTemplate(templateName);
    return compiledTemplate(context);
  }

  /**
   * Get a compiled Handlebars template, loading and caching as needed
   */
  private async _getCompiledTemplate(
    templateName: string,
  ): Promise<HandlebarsTemplateDelegate> {
    if (this._compiledTemplateCache.has(templateName)) {
      return this._compiledTemplateCache.get(
        templateName,
      ) as HandlebarsTemplateDelegate;
    }

    const templatePath = getTemplatePath(templateName);
    const templateContent = await readFile(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateContent);

    this._compiledTemplateCache.set(templateName, compiledTemplate);
    return compiledTemplate;
  }

  /**
   * Register all helper functions with Handlebars
   */
  private _registerHelpers(): void {
    Handlebars.registerHelper('formatType', formatType);
    Handlebars.registerHelper('formatBoolean', formatBoolean);
    Handlebars.registerHelper('formatOptional', formatOptional);
    Handlebars.registerHelper('createMarkdownTable', createMarkdownTable);
    Handlebars.registerHelper('apiSummary', apiSummary);
    Handlebars.registerHelper('apiDetails', apiDetails);
    Handlebars.registerHelper('join', join);
    Handlebars.registerHelper('eq', eq);
    Handlebars.registerHelper('inc', inc);
    Handlebars.registerHelper('and', and);
  }

  /**
   * Clear the template cache (useful for development)
   */
  public clearCache(): void {
    this._compiledTemplateCache.clear();
  }
}

// Helper functions for common formatting needs (same as original implementation)

/**
 * Format a type object with text property
 */
export function formatType(type?: { text: string }): string {
  return type?.text || 'unknown';
}

/**
 * Format a boolean with a default value
 */
export function formatBoolean(value?: boolean, defaultValue = false): string {
  return value !== undefined ? String(value) : String(defaultValue);
}

/**
 * Format an optional string with fallback
 */
export function formatOptional(value?: string, fallback = 'N/A'): string {
  return value || fallback;
}

/**
 * Create markdown table from array of objects
 */
export function createMarkdownTable(items: any[], headers: string[]): string {
  if (!items.length) {
    return '';
  }

  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;

  const dataRows = items.map(item => {
    const values = headers.map(header => {
      const value = item[header.toLowerCase()];
      return String(value || '')
        .replace(/\|/g, '\\|')
        .replace(/\n/g, ' ');
    });
    return `| ${values.join(' | ')} |`;
  });

  return [headerRow, separatorRow, ...dataRows].join('\n');
}

/**
 * Generate API summary line for components
 */
export function apiSummary(context: any): string {
  const apiSurfaces: string[] = [];

  if (context.hasAttributes) {
    apiSurfaces.push(`${context.attributes.length} attributes`);
  }
  if (context.hasEvents) {
    apiSurfaces.push(`${context.events.length} events`);
  }
  if (context.hasProperties) {
    apiSurfaces.push(`${context.properties.length} properties`);
  }
  if (context.hasMethods) {
    apiSurfaces.push(`${context.methods.length} methods`);
  }
  if (context.hasSlots) {
    apiSurfaces.push(`${context.slots.length} slots`);
  }
  if (context.hasCssProperties) {
    apiSurfaces.push(`${context.cssProperties.length} CSS properties`);
  }
  if (context.hasCssParts) {
    apiSurfaces.push(`${context.cssParts.length} CSS parts`);
  }

  if (apiSurfaces.length === 0) {
    return 'This component has no public API surface.';
  }

  return `**API Surface:** ${apiSurfaces.join(', ')}`;
}

/**
 * Generate API details list for components
 */
export function apiDetails(context: any): string {
  const sections: string[] = [];

  if (context.hasProperties) {
    const propList = context.properties
      .map((p: any) => `\`${p.name}\``)
      .join(', ');
    sections.push(`- **Properties:** ${propList}`);
  }

  if (context.hasMethods) {
    const methodList = context.methods
      .map((m: any) => `\`${m.name}()\``)
      .join(', ');
    sections.push(`- **Methods:** ${methodList}`);
  }

  if (context.hasEvents) {
    const eventList = context.events
      .map((e: any) => `\`${e.name}\``)
      .join(', ');
    sections.push(`- **Events:** ${eventList}`);
  }

  if (context.hasAttributes) {
    const attrList = context.attributes
      .map((a: any) => `\`${a.name}\``)
      .join(', ');
    sections.push(`- **Attributes:** ${attrList}`);
  }

  if (context.hasSlots) {
    const slotList = context.slots
      .map((s: any) => `\`${s.name || 'default'}\``)
      .join(', ');
    sections.push(`- **Slots:** ${slotList}`);
  }

  return sections.join('\n');
}

/**
 * Join array elements with a separator
 */
export function join(array: any[], separator: string): string {
  if (!Array.isArray(array)) {
    return '';
  }
  return array.join(separator);
}

/**
 * Equality comparison helper
 */
export function eq(a: any, b: any): boolean {
  return a === b;
}

/**
 * Increment helper - adds 1 to a number
 */
export function inc(value: number): number {
  return value + 1;
}

/**
 * Logical AND helper
 */
export function and(...args: any[]): boolean {
  // Remove the last argument which is the Handlebars options object
  const values = args.slice(0, -1);
  return values.every(Boolean);
}

// Singleton instance
let templateEngineInstance: HandlebarsTemplateEngine | null = null;

/**
 * Get the singleton template engine instance
 */
export function getTemplateEngine(): HandlebarsTemplateEngine {
  if (!templateEngineInstance) {
    templateEngineInstance = new HandlebarsTemplateEngine();
  }
  return templateEngineInstance;
}

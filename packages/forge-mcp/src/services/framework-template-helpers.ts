import Handlebars from 'handlebars';
import {
  TemplateProperty,
  TemplateEvent,
} from '../types/framework-templates.js';

/**
 * Framework-specific Handlebars helpers for code generation
 */
export class FrameworkTemplateHelpers {
  /**
   * Register all framework helpers with Handlebars
   */
  public static registerHelpers(): void {
    // Angular helpers
    Handlebars.registerHelper(
      'formatAngularProperty',
      (property: TemplateProperty) => {
        const value = FrameworkTemplateHelpers.getExampleValue(
          property.type,
          property.default,
        );
        return `[${property.name}]="${value}"`;
      },
    );

    Handlebars.registerHelper('formatAngularEvent', (event: TemplateEvent) => {
      const handlerName = FrameworkTemplateHelpers.getEventHandlerName(
        event.name,
      );
      return `(${event.name})="${handlerName}($event)"`;
    });

    // React helpers
    Handlebars.registerHelper(
      'formatReactProperty',
      (property: TemplateProperty) => {
        const value = FrameworkTemplateHelpers.getExampleValue(
          property.type,
          property.default,
        );
        return `${property.name}={${value}}`;
      },
    );

    Handlebars.registerHelper(
      'formatReactEvent',
      (event: TemplateEvent) =>
        `on${FrameworkTemplateHelpers.capitalizeFirst(FrameworkTemplateHelpers.kebabToCamel(event.name))}={(event) => console.log('${event.name}:', event.detail)}`,
    );

    // Vue helpers
    Handlebars.registerHelper(
      'formatVueProperty',
      (property: TemplateProperty) => {
        const value = FrameworkTemplateHelpers.getExampleValue(
          property.type,
          property.default,
        );
        return `:${property.name}="${value}"`;
      },
    );

    Handlebars.registerHelper('formatVueEvent', (event: TemplateEvent) => {
      const handlerName = FrameworkTemplateHelpers.getEventHandlerName(
        event.name,
      );
      return `@${event.name}="${handlerName}"`;
    });

    // Svelte helpers
    Handlebars.registerHelper(
      'formatSvelteProperty',
      (property: TemplateProperty) => {
        const value = FrameworkTemplateHelpers.getExampleValue(
          property.type,
          property.default,
        );
        return `${property.name}={${value}}`;
      },
    );

    Handlebars.registerHelper('formatSvelteEvent', (event: TemplateEvent) => {
      const handlerName = FrameworkTemplateHelpers.getEventHandlerName(
        event.name,
      );
      return `on:${event.name}={${handlerName}}`;
    });

    // Lit helpers
    Handlebars.registerHelper(
      'formatLitProperty',
      (property: TemplateProperty) => {
        const value = FrameworkTemplateHelpers.getExampleValue(
          property.type,
          property.default,
        );
        return `.${property.name}=\${${value}}`;
      },
    );

    Handlebars.registerHelper(
      'formatLitEvent',
      (eventName: string) => eventName,
    );

    Handlebars.registerHelper('getLitPropertyType', (type?: string) => {
      switch (type?.toLowerCase()) {
        case 'boolean':
          return 'Boolean';
        case 'number':
          return 'Number';
        case 'string':
          return 'String';
        default:
          return 'String';
      }
    });

    Handlebars.registerHelper(
      'getDefaultValue',
      (property: TemplateProperty) => {
        if (property.default) {
          return `"${property.default}"`;
        }

        switch (property.type?.toLowerCase()) {
          case 'boolean':
            return 'false';
          case 'number':
            return '0';
          case 'string':
            return '""';
          default:
            return '""';
        }
      },
    );

    Handlebars.registerHelper('camelCase', (str: string) =>
      FrameworkTemplateHelpers.kebabToCamel(str.replace('forge-', '')),
    );

    Handlebars.registerHelper('pascalCase', (str: string) =>
      FrameworkTemplateHelpers.kebabToPascal(str.replace('forge-', '')),
    );

    // Utility helpers
    Handlebars.registerHelper('eventHandlerName', (eventName: string) =>
      FrameworkTemplateHelpers.getEventHandlerName(eventName),
    );

    Handlebars.registerHelper('kebabToCamel', (str: string) =>
      FrameworkTemplateHelpers.kebabToCamel(str),
    );

    Handlebars.registerHelper('kebabToPascal', (str: string) =>
      FrameworkTemplateHelpers.kebabToPascal(str),
    );

    Handlebars.registerHelper('capitalizeFirst', (str: string) =>
      FrameworkTemplateHelpers.capitalizeFirst(str),
    );

    // Conditional helpers
    Handlebars.registerHelper(
      'ifEquals',
      function (this: any, arg1: any, arg2: any, options: any) {
        // eslint-disable-next-line eqeqeq
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
    );

    Handlebars.registerHelper(
      'ifAdvanced',
      function (this: any, exampleType: string, options: any) {
        return exampleType === 'advanced' || exampleType === 'complete'
          ? options.fn(this)
          : options.inverse(this);
      },
    );

    Handlebars.registerHelper(
      'ifComplete',
      function (this: any, exampleType: string, options: any) {
        return exampleType === 'complete'
          ? options.fn(this)
          : options.inverse(this);
      },
    );
  }

  /**
   * Get example value based on property type and default
   */
  public static getExampleValue(type?: string, defaultValue?: string): string {
    if (defaultValue) {
      return `"${defaultValue}"`;
    }

    switch (type?.toLowerCase()) {
      case 'boolean':
        return 'true';
      case 'number':
        return '42';
      case 'string':
        return '"example"';
      default:
        return '"example"';
    }
  }

  /**
   * Get event handler name from event name
   */
  public static getEventHandlerName(eventName: string): string {
    return `on${FrameworkTemplateHelpers.capitalizeFirst(FrameworkTemplateHelpers.kebabToCamel(eventName.replace('forge-', '')))}`;
  }

  /**
   * Convert kebab-case to camelCase
   */
  public static kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
  }

  /**
   * Convert kebab-case to PascalCase
   */
  public static kebabToPascal(str: string): string {
    return FrameworkTemplateHelpers.capitalizeFirst(
      FrameworkTemplateHelpers.kebabToCamel(str),
    );
  }

  /**
   * Capitalize first letter of string
   */
  public static capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

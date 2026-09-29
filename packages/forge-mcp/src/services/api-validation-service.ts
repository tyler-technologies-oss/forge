import { CEMComponentDeclaration } from '../types/cem.js';

/**
 * Represents the result of validating a single API item
 */
export interface ApiValidationResult {
  name: string;
  isValid: boolean;
  isDeprecated?: boolean;
  deprecationMessage?: string;
  apiType: ApiType;
}

/**
 * Types of APIs that can be validated
 */
export type ApiType =
  | 'property'
  | 'attribute'
  | 'event'
  | 'method'
  | 'slot'
  | 'cssProperty'
  | 'cssPart'
  | 'cssClass';

/**
 * Input for validating component APIs
 */
export interface ComponentApiValidationInput {
  properties?: string[];
  attributes?: string[];
  events?: string[];
  methods?: string[];
  slots?: string[];
  cssProperties?: string[];
  cssParts?: string[];
  cssClasses?: string[];
}

/**
 * API item with name and description
 */
export interface ApiItem {
  name: string;
  description?: string;
}

/**
 * Complete validation results for a component
 */
export interface ComponentValidationResults {
  component: string;
  tagName: string;
  validApis: ApiValidationResult[];
  invalidApis: ApiValidationResult[];
  deprecatedApis: ApiValidationResult[];
  totalValidated: number;
  availableApis: {
    properties: ApiItem[];
    attributes: ApiItem[];
    events: ApiItem[];
    methods: ApiItem[];
    slots: ApiItem[];
    cssProperties: ApiItem[];
    cssParts: ApiItem[];
    cssClasses: ApiItem[];
  };
}

/**
 * Service for validating Tyler Forge component API usage
 *
 * This service provides comprehensive validation of component APIs including:
 * - Properties and attributes
 * - Events and methods
 * - Slots, CSS properties, parts, and classes
 * - Deprecation warnings
 * - Suggestions for invalid API usage
 */
export class ApiValidationService {
  /**
   * Validate multiple API types for a component
   */
  public validateComponentApis(
    component: CEMComponentDeclaration,
    apis: ComponentApiValidationInput,
  ): ComponentValidationResults {
    const allResults: ApiValidationResult[] = [];

    // Validate each API type if provided
    if (apis.properties?.length) {
      allResults.push(...this._validateProperties(component, apis.properties));
    }
    if (apis.attributes?.length) {
      allResults.push(...this._validateAttributes(component, apis.attributes));
    }
    if (apis.events?.length) {
      allResults.push(...this._validateEvents(component, apis.events));
    }
    if (apis.methods?.length) {
      allResults.push(...this._validateMethods(component, apis.methods));
    }
    if (apis.slots?.length) {
      allResults.push(...this._validateSlots(component, apis.slots));
    }
    if (apis.cssProperties?.length) {
      allResults.push(
        ...this._validateCssProperties(component, apis.cssProperties),
      );
    }
    if (apis.cssParts?.length) {
      allResults.push(...this._validateCssParts(component, apis.cssParts));
    }
    if (apis.cssClasses?.length) {
      allResults.push(...this._validateCssClasses(component, apis.cssClasses));
    }

    // Separate results by validation status
    const validApis = allResults.filter(r => r.isValid && !r.isDeprecated);
    const invalidApis = allResults.filter(r => !r.isValid);
    const deprecatedApis = allResults.filter(r => r.isValid && r.isDeprecated);

    // Collect available APIs only for the categories that were requested
    const availableApis = this._collectRequestedAvailableApis(component, apis);

    return {
      component: component.name,
      tagName: component.tagName,
      validApis,
      invalidApis,
      deprecatedApis,
      totalValidated: allResults.length,
      availableApis,
    };
  }

  /**
   * Validate component properties
   */
  private _validateProperties(
    component: CEMComponentDeclaration,
    propertyNames: string[],
  ): ApiValidationResult[] {
    const publicMembers =
      component.members?.filter(
        m => m.privacy === 'public' && m.kind === 'field',
      ) || [];

    return propertyNames.map(name => {
      const property = publicMembers.find(m => m.name === name);

      if (property) {
        return {
          name,
          isValid: true,
          isDeprecated: !!property.deprecated,
          deprecationMessage: property.deprecated,
          apiType: 'property' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'property' as const,
      };
    });
  }

  /**
   * Validate component attributes
   */
  private _validateAttributes(
    component: CEMComponentDeclaration,
    attributeNames: string[],
  ): ApiValidationResult[] {
    const attributes = component.attributes || [];

    return attributeNames.map(name => {
      const attribute = attributes.find(a => a.name === name);

      if (attribute) {
        return {
          name,
          isValid: true,
          apiType: 'attribute' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'attribute' as const,
      };
    });
  }

  /**
   * Validate component events
   */
  private _validateEvents(
    component: CEMComponentDeclaration,
    eventNames: string[],
  ): ApiValidationResult[] {
    const events = component.events || [];

    return eventNames.map(name => {
      const event = events.find(e => e.name === name);

      if (event) {
        return {
          name,
          isValid: true,
          apiType: 'event' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'event' as const,
      };
    });
  }

  /**
   * Validate component methods
   */
  private _validateMethods(
    component: CEMComponentDeclaration,
    methodNames: string[],
  ): ApiValidationResult[] {
    const publicMethods =
      component.members?.filter(
        m => m.privacy === 'public' && m.kind === 'method',
      ) || [];

    return methodNames.map(name => {
      const method = publicMethods.find(m => m.name === name);

      if (method) {
        return {
          name,
          isValid: true,
          isDeprecated: !!method.deprecated,
          deprecationMessage: method.deprecated,
          apiType: 'method' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'method' as const,
      };
    });
  }

  /**
   * Validate component slots
   */
  private _validateSlots(
    component: CEMComponentDeclaration,
    slotNames: string[],
  ): ApiValidationResult[] {
    const slots = component.slots || [];

    return slotNames.map(name => {
      const slot = slots.find(s => s.name === name);

      if (slot) {
        return {
          name,
          isValid: true,
          apiType: 'slot' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'slot' as const,
      };
    });
  }

  /**
   * Validate CSS custom properties
   */
  private _validateCssProperties(
    component: CEMComponentDeclaration,
    cssPropertyNames: string[],
  ): ApiValidationResult[] {
    const cssProperties = component.cssProperties || [];

    return cssPropertyNames.map(name => {
      const cssProperty = cssProperties.find(p => p.name === name);

      if (cssProperty) {
        return {
          name,
          isValid: true,
          apiType: 'cssProperty' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'cssProperty' as const,
      };
    });
  }

  /**
   * Validate CSS parts
   */
  private _validateCssParts(
    component: CEMComponentDeclaration,
    cssPartNames: string[],
  ): ApiValidationResult[] {
    const cssParts = component.cssParts || [];

    return cssPartNames.map(name => {
      const cssPart = cssParts.find(p => p.name === name);

      if (cssPart) {
        return {
          name,
          isValid: true,
          apiType: 'cssPart' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'cssPart' as const,
      };
    });
  }

  /**
   * Validate CSS classes
   */
  private _validateCssClasses(
    component: CEMComponentDeclaration,
    cssClassNames: string[],
  ): ApiValidationResult[] {
    const cssClasses = component.cssClasses || [];

    return cssClassNames.map(name => {
      const cssClass = cssClasses.find(c => c.name === name);

      if (cssClass) {
        return {
          name,
          isValid: true,
          apiType: 'cssClass' as const,
        };
      }

      return {
        name,
        isValid: false,
        apiType: 'cssClass' as const,
      };
    });
  }

  /**
   * Collect available APIs only for the categories that were requested for validation
   */
  private _collectRequestedAvailableApis(
    component: CEMComponentDeclaration,
    requestedApis: ComponentApiValidationInput,
  ): {
    properties: ApiItem[];
    attributes: ApiItem[];
    events: ApiItem[];
    methods: ApiItem[];
    slots: ApiItem[];
    cssProperties: ApiItem[];
    cssParts: ApiItem[];
    cssClasses: ApiItem[];
  } {
    const publicMembers =
      component.members?.filter(m => m.privacy === 'public') || [];

    const result = {
      properties: [] as ApiItem[],
      attributes: [] as ApiItem[],
      events: [] as ApiItem[],
      methods: [] as ApiItem[],
      slots: [] as ApiItem[],
      cssProperties: [] as ApiItem[],
      cssParts: [] as ApiItem[],
      cssClasses: [] as ApiItem[],
    };

    // Only collect APIs for categories that were actually requested
    if (requestedApis.properties?.length) {
      result.properties = publicMembers
        .filter(m => m.kind === 'field')
        .map(m => ({
          name: m.name,
          description: m.description,
        }));
    }
    if (requestedApis.attributes?.length) {
      result.attributes = (component.attributes || []).map(a => ({
        name: a.name,
        description: a.description,
      }));
    }
    if (requestedApis.events?.length) {
      result.events = (component.events || []).map(e => ({
        name: e.name,
        description: e.description,
      }));
    }
    if (requestedApis.methods?.length) {
      result.methods = publicMembers
        .filter(m => m.kind === 'method')
        .map(m => ({
          name: m.name,
          description: m.description,
        }));
    }
    if (requestedApis.slots?.length) {
      result.slots = (component.slots || []).map(s => ({
        name: s.name,
        description: s.description,
      }));
    }
    if (requestedApis.cssProperties?.length) {
      result.cssProperties = (component.cssProperties || []).map(p => ({
        name: p.name,
        description: p.description,
      }));
    }
    if (requestedApis.cssParts?.length) {
      result.cssParts = (component.cssParts || []).map(p => ({
        name: p.name,
        description: p.description,
      }));
    }
    if (requestedApis.cssClasses?.length) {
      result.cssClasses = (component.cssClasses || []).map(c => ({
        name: c.name,
        description: c.description,
      }));
    }

    return result;
  }
}

// Singleton instance
let apiValidationServiceInstance: ApiValidationService | null = null;

/**
 * Get the singleton API validation service instance
 */
export function getApiValidationService(): ApiValidationService {
  if (!apiValidationServiceInstance) {
    apiValidationServiceInstance = new ApiValidationService();
  }
  return apiValidationServiceInstance;
}

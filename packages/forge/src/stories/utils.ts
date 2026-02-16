import { ArgTypes, Args, type StoryObj } from '@storybook/web-components-vite';
import { type ControlType } from '@storybook/addon-docs/blocks';
import cem from '../../custom-elements.json';

/** Global theme options for components that support a `theme` attribute. */
export const GLOBAL_THEME_OPTIONS = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'];

export const DENSITY_OPTIONS = ['small', 'medium', 'large'];

export const OVERLAY_FLIP_OPTIONS = ['auto', 'main', 'cross', 'never'];
export const OVERLAY_PLACEMENT_OPTIONS = [
  'top',
  'right',
  'bottom',
  'left',
  'top-start',
  'top-end',
  'right-start',
  'right-end',
  'left-start',
  'left-end',
  'bottom-start',
  'bottom-end'
];

/**
 * Common default parameters for a standalone story.
 */
export const standaloneStoryParams: StoryObj = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true }
  }
};

export const removeSourceStyleTagParams: StoryObj = {
  parameters: {
    docs: {
      source: {
        transform: (source: string) => source.replace(/=""/g, '').replace(/<style[\s\S]*<\/style>/, '')
      }
    }
  }
};

/**
 * Transforms the CSS properties of a custom element into controls for Storybook.
 * @param tagName {string} - The tag name of the custom element
 * @returns {object} - The controls object for Storybook
 */
export function transformCssPropsToControls(tagName: string): object {
  const declaration = cem.modules.flatMap((module: any) => module.declarations).find((dec: any) => dec.tagName === tagName);
  return declaration.cssProperties.reduce((acc: object, prop: any) => {
    acc[prop.name] = { control: 'text' };
    return acc;
  }, {});
}

/**
 * Render a custom element story using the provided tag name and props.
 * @param tagName {keyof HTMLElementTagNameMap} - The tag name of the component to render
 * @param props {Partial<HTMLElementTagNameMap[T]>} - The props to pass to the component
 * @returns {HTMLElement} - The rendered element.
 */
export function customElementStoryRenderer<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  props: Partial<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
  const element = document.createElement(tagName);
  applyArgs(element, props);
  return element;
}

/**
 * Apply props to a custom element.
 * @param element {HTMLElement} - The element to apply props to
 * @param props {Partial<HTMLElement>} - The props to apply
 */
export function applyArgs(element: HTMLElement, props: Partial<HTMLElement>): void {
  Object.keys(props).forEach(key => {
    if (key.startsWith('--')) {
      // Set CSS custom properties via inline style
      element.style.setProperty(key, props[key]);
    } else if (key.includes('-')) {
      // Args with dashes in the name are considered HTML attributes
      element.setAttribute(key, props[key]);
    } else if (key in element) {
      // Everything else is considered a JavaScript property if it exists on the element
      element[key] = props[key];
    }
  });
}

/**
 * Get the CSS custom properties args from a full set of args (any arg that is prefixed with "--" is considered a CSS variable).
 */
export function getCssVariableArgs(args: Args): Args | null {
  const cssVarArgs = Object.entries(args).reduce((acc, [key, value]) => {
    if (key.startsWith('--') && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});
  return Object.entries(cssVarArgs).length ? cssVarArgs : null;
}

/**
 * Generates Storybook `argTypes` for a custom element based on its tag name from the custom elements manifest.
 */
export function generateCustomElementArgTypes({
  tagName,
  exclude,
  include,
  controls,
  category
}: {
  tagName: string;
  exclude?: string[] | RegExp;
  include?: string[] | RegExp;
  controls?: Partial<ArgTypes<Args>>;
  category?: string;
}): object {
  const declaration = getCustomElementsTagDeclaration(tagName);
  const argTypes: ArgTypes = {};

  let properties = declaration.members?.filter(member => member.kind === 'field' && member.privacy === 'public') ?? [];
  let cssProperties = declaration.cssProperties ?? [];

  if (exclude) {
    if (exclude instanceof RegExp) {
      properties = properties.filter(property => !exclude.test(property.name));
      cssProperties = cssProperties.filter(property => !exclude.test(property.name));
    } else {
      exclude.forEach(prop => {
        properties = properties.filter(property => property.name !== prop);
        cssProperties = cssProperties.filter(property => property.name !== prop);
      });
    }
  }

  if (include) {
    if (include instanceof RegExp) {
      properties = properties.filter(property => include.test(property.name));
      cssProperties = cssProperties.filter(property => include.test(property.name));
    } else {
      properties = properties.filter(property => include.includes(property.name));
      cssProperties = cssProperties.filter(property => include.includes(property.name));
    }
  }

  if (properties.length) {
    const propertyArgTypes = generateArgTypesFrom(properties, category ? `${category} properties` : 'properties');
    Object.assign(argTypes, propertyArgTypes);
  }

  if (cssProperties.length) {
    const cssPropertyArgTypes = generateArgTypesFrom(cssProperties, category ? `${category} css custom properties` : 'css custom properties', 'text');
    Object.assign(argTypes, cssPropertyArgTypes);
  }

  if (controls) {
    Object.entries(controls).forEach(([key, value]) => {
      if (argTypes[key]) {
        Object.assign(argTypes[key], value);
      }
    });
  }

  return argTypes;
}

function generateArgTypesFrom(items: TagItem[], category: string, controlType?: ControlType): object {
  return items.reduce((acc: object, property: any) => {
    acc[property.name] = {
      control: controlType ?? getControlFromType(property.type.text),
      defaultValue: property.default,
      table: { category }
    };
    return acc;
  }, {});
}

/** Gets the custom elements manifest module for the declaration matching the provided tag name. */
export function getCustomElementsTagModule(tagName: string): any {
  return cem.modules.find((module: any) => module.declarations.some((declaration: any) => declaration.tagName === tagName));
}

/** Gets the custom elements manifest declaration for the provided tag name. */
export function getCustomElementsTagDeclaration(tagName: string): Declaration {
  return cem.modules.flatMap((module: any) => module.declarations).find(declaration => declaration.tagName === tagName);
}

/** Attempts to retrieve the Forge type information for the provided type string. */
export function getCustomElementType(type: string): unknown {
  return cem.forgeTypes[type];
}

/** Gets the branch name that the custom elements manifest was generated with. */
export function getBranchName(): string {
  return cem.branchName;
}

export function htmlEncode(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getControlFromType(type: string): ControlType {
  return CONTROL_TYPE_MAP[type] ?? 'text';
}

/** Removes inline style tags from a string of HTML. */
export function removeInlineStyleTag(source: string): string {
  source = removeEmptyAttributes(source);
  return source.replace(/<style>[\s\S]*?<\/style>/g, '');
}

/** Removes empty attributes from a string of HTML. */
export function removeEmptyAttributes(source: string): string {
  return source.replace(/=""/g, '');
}

const CONTROL_TYPE_MAP: Record<string, ControlType> = {
  ['boolean']: 'boolean',
  ['string']: 'text',
  ['number']: 'number',
  ['object']: 'object',
  ['function']: 'object',
  ['array']: 'object',
  ['bigint']: 'number'
};

export interface TagItem {
  name: string;
  type: {
    text?: string;
  };
  description: string;
  default?: any;
  kind?: string;
  privacy?: string;
  defaultValue?: any;
}

export interface Module {
  kind: string;
  path: string;
  declarations: Declaration[];
}

export interface Declaration {
  tagName: string;
  name: string;
  description: string;
  attributes?: TagItem[];
  properties?: TagItem[];
  events?: TagItem[];
  methods?: TagItem[];
  members?: TagItem[];
  slots?: TagItem[];
  cssProperties?: TagItem[];
  cssParts?: TagItem[];
  dependencies?: DependencyItem[];
  cssFilePath?: TagItem;
  cssClasses?: TagItem[];
  globalConfigProperties?: GlobalConfigPropertyItem[];
  states?: TagItem[];
}

export interface DependencyItem {
  name: string;
  description: string;
}

export interface GlobalConfigPropertyItem {
  name: string;
  description: string;
}

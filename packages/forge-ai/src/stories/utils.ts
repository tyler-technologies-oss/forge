import cem from '../../custom-elements.json' with { type: 'json' };

const cemModules: any[] = cem.modules;
const cemForgeTypes = cem.forgeTypes as Record<string, { path: string; lineNumber: number }>;

/** Gets the custom elements manifest module for the declaration matching the provided tag name. */
export function getCustomElementsTagModule(tagName: string): any {
  return cemModules.find((module: any) => module.declarations.some((declaration: any) => declaration.tagName === tagName));
}

/** Gets the custom elements manifest declaration for the provided tag name. */
export function getCustomElementsTagDeclaration(tagName: string): Declaration {
  return cemModules.flatMap((module: any) => module.declarations).find((declaration: any) => declaration.tagName === tagName);
}

/** Attempts to retrieve the type information for the provided type string. */
export function getCustomElementType(type: string): { path: string; lineNumber: number } | undefined {
  return cemForgeTypes[type];
}

export function htmlEncode(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface TagItem {
  name: string;
  type: {
    text?: string;
  };
  description: string;
  default?: any;
  kind?: string;
  privacy?: string;
}

export interface Declaration {
  tagName: string;
  name: string;
  description: string;
  attributes?: TagItem[];
  members?: TagItem[];
  slots?: TagItem[];
  cssProperties?: TagItem[];
  cssParts?: TagItem[];
  events?: TagItem[];
  states?: TagItem[];
}

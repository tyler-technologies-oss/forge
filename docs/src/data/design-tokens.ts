/**
 * Design token data read at build time from the `design-tokens.json` manifest in @tylertech/forge.
 */

import forgeTokens from "@tylertech/forge/design-tokens.json";

export interface DesignToken {
  name: string;
  value: string;
  description?: string;
}

export interface DesignTokenCategory {
  name: string;
  description?: string;
  tokens: DesignToken[];
}

interface DesignTokensManifest {
  schemaVersion: string;
  categories: DesignTokenCategory[];
}

const manifest = forgeTokens as DesignTokensManifest;

export function getTokenCategories(): DesignTokenCategory[] {
  return manifest.categories;
}

export function getTokenCategory(name: string): DesignTokenCategory {
  const category = manifest.categories.find((c) => c.name === name);
  if (!category) {
    throw new Error(`Design token category "${name}" not found in design-tokens.json`);
  }
  return category;
}

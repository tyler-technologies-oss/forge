export interface DesignTokenValues {
  light: string;
  dark: string;
}

export interface DesignToken {
  name: string;
  value: string;
  values?: DesignTokenValues;
  description?: string;
}

export interface DesignTokenCategory {
  name: string;
  description?: string;
  tokens: DesignToken[];
}

export interface DesignTokensManifest {
  schemaVersion: string;
  categories: DesignTokenCategory[];
}

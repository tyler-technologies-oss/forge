export interface IConfigOptions {
  config?: string;
}

export interface ICliOptions {
  componentDependencies?: Record<string, string[]>;
  /** Dictionary keyed by tag name, overriding `importPath` for elements that aren't exported from it (e.g. subpath-only components). */
  importPathOverrides?: Record<string, string>;
  manifest: string;
  importPath: string;
  outDir: string;
  outDirExcludePrefix: string;
  exclude: string;
  modulePrefix: string;
  useDefineFunction: boolean;
}
export type IOptions = IConfigOptions | ICliOptions;

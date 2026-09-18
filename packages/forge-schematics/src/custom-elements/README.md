# Forge Schematics - Custom Elements

This schematic generates Angular components that act as proxies to native web components which eliminate the need to use `CUSTOM_ELEMENTS_SCHEMA`, restoring type-safety and IntelliSense to your Angular templates.

It takes a [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest) as an input, assumes that the library has implemented the web component as a TypeScript class, and has specified `HTMLElementTagNameMap` declarations. If a library does not meet these requirements, you will need to provide the types yourself, and can use [@custom-elements-manifest/analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer) to generate a manifest. Note that `tagName` must be specified in order for the proxy components to be generated.

This is used by the @tylertech/forge-angular repository to generate proxy components for @tylertech/forge. Version 1.0 was primarily designed around those specific libraries. PRs are welcome to add appropriate configuration where necessary.

## Usage

Run `ng generate @tylertech/forge-schematics:custom-elements`. The schematic will prompt for any parameters that are not provided. For the most up to date list of properties, view the [schema](./schema.json).

### Basic Usage

At minimum, a path to the manifest and import path for types must be provided:

```sh
ng g @tylertech/forge-schematics:custom-elements --manifest="./node_modules/@tylertech/forge/custom-elements.json" --import-path "@tylertech/forge"
```

This will generate a folder for each custom element matching the tag name in the current directory, and an Angular component and module in each folder corresponding to the custom element. If the directory already exists, and a module is present, the module will not be created and you will need to add the generated component to the `declarations` and `exports` manually.

### Additional Configuration

- `--outDir` will generate output files and folders in the specified directory
- `--outDirExcludePrefix` will exclude the specified prefix from tag names when generating folders (e.g. `text-field/` instead of `forge-text-field/`)
- `--exclude` accepts a comma-delimited list of tag names and will not generate proxy components for the corresponding web components
- `--modulePrefix` supplies an optional prefix for the NgModule name
- `--useDefineFunction` will use a library-provided `define*Component()` function instead of `window.customElements.define()`
- `--componentDependencies` (config file only) is a dictionary keyed by tag name, with values as an array of tag names whose modules should also be re-exported by the key's generated module (for components composed of sub-components)
- `--importPathOverrides` (config file only) is a dictionary keyed by tag name, overriding `--importPath` for elements that aren't exported from it (e.g. subpath-only exports)

## Migration Notes

After generating components and associated modules:

- Import relevant module(s) for all component used
- Remove `CUSTOM_ELEMENTS_SCHEMA`.
- It is also no longer necessary to call `customElements.define()` as the components register themselves.

If `strictTemplateChecking` is enabled, you may see errors on some bindings. You can always wrap the value in `$any()` and they'll behave exactly as before, though these should be evaluated for correctness. It may either reflect a gap in the custom element library's typings (e.g. allowing `null` but not `undefined`, or not allowing nullish values when they're actually valid), or it could represent an actual issue in your code you were not aware of. In the case of the former, fix the types, or raise an issue/submit a PR to the library that owns them. Once these are fixed, re-run the schematic, and you should be able to remove `$any()` and restore type-safety to those bindings.

If you were previously getting an `ElementRef` reference to a web component using `@ViewChild`, ensure that the `{ read: ElementRef }` option is being passed, otherwise you'll actually be getting a reference to the wrapper component instead of an `ElementRef` and `.nativeElement` will return undefined.

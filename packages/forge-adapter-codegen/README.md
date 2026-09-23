# @tylertech/forge-adapter-codegen

Shared framework adapter code generation for Tyler Forge™ web component packages. Private to this
monorepo — it is a build-time tool, not a published package.

Adapter packages generate their React or Angular surface from a web component package's
`custom-elements.json` rather than hand-maintaining it, so the adapter cannot drift from the
elements it wraps. This package holds that generation logic so it is not duplicated per adapter, and
so packages that are still hand-maintained have a path to adopt it.

## Layout

| Entry point | Contents                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `./core`    | Framework-agnostic: manifest loading, element enumeration, entry point resolution, and the manifest fixes both frameworks need |
| `./react`   | `generateReactAdapter`, wrapping `custom-element-react-wrappers`                                                               |
| `./angular` | `generateAngularAdapter`, wrapping the `@tylertech/forge-schematics:custom-elements` schematic                                 |

## Usage

A consuming package's `scripts/generate-proxies.mjs` is config only. `entryPoints` describes where
the source package exports its elements from, mapping manifest module path prefixes to export
subpaths.

```js
import { generateReactAdapter } from '@tylertech/forge-adapter-codegen/react';

generateReactAdapter({
  packageName: '@tylertech/forge-rich-text-editor',
  entryPoints: [
    { subpath: '', modulePrefix: 'src/lib/' },
    { subpath: 'features', modulePrefix: 'src/lib/features/' }
  ]
});
```

```js
import { generateAngularAdapter } from '@tylertech/forge-adapter-codegen/angular';

generateAngularAdapter({
  packageName: '@tylertech/forge-rich-text-editor',
  project: 'forge-angular-rich-text-editor',
  entryPoints: [
    /* as above */
  ],
  aggregateModule: { className: 'ForgeRteModule', fileName: 'rte.module.ts' }
});
```

A package that exports everything from its root, such as `@tylertech/forge`, needs only the one
root entry point. The longest matching module path prefix wins, so order does not matter.

## Why the manifest needs fixing first

`./core` applies two corrections before either generator reads the manifest. Both compensate for the
manifest, not for a framework, and both fail the build rather than emitting bad output.

- **Attributes with no `fieldName`.** An attribute documented with a manual `@attribute` JSDoc tag
  arrives with no link back to its class field. Generators that name props from `fieldName` then
  emit a prop literally named `undefined`. Fields are recovered by matching on a normalized name,
  which is necessary because the two do not always differ by dashes alone —
  `forge-rich-text-context` maps the `readonly` attribute to a `readOnly` property. This is not
  niche: `@tylertech/forge`'s own manifest has several hundred such attributes, so any package
  adopting a generator that reads attributes will hit it.
- **Double-wrapped event types.** An event documented `@event {CustomEvent<Detail>}` gets wrapped in
  `CustomEvent<...>` again by the React generator, and that generator also skips importing any type
  containing `<`, leaving the detail type referenced but never imported. Unwrapping the outer layer
  fixes both. `void` becomes `undefined`, because the generator's excluded-type list omits `void`
  and would otherwise emit `import { void }`.

## Verifying generated output

Generated output is easy to ship broken, because the runtime JavaScript can be correct while the
type declarations are not. Two failures are worth guarding against specifically.

`generateReactAdapter` renames manifest declarations so React components are named after their tag
(`ForgeRteBold`), but the generator derives the element type import from the same name — so the
generated declarations would import a class the source package does not export. The imports are
repointed to the real export name afterwards. **`@tylertech/forge-extended-react` has this bug
today**: every generated declaration file in the published package imports a nonexistent export.

Consuming packages should therefore type-check the generated declarations with `skipLibCheck` off.
With it on, TypeScript skips declaration files entirely and the check passes even when an import
resolves to nothing.

The Angular schematic has neither problem — it imports the real class name and reads class members
rather than attributes — but it emits no directory barrels and never touches the public API barrel,
which its own source notes as a TODO. `generateAngularAdapter` writes both, plus an optional
aggregate module. Leaving that to hand maintenance is how the rich text editor proxies in
`@tylertech/forge-extended-angular` ended up generated but unreachable.

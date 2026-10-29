# Installation

How to install Tyler Forge via npm or CDN.

Before we get into the details, you first need to determine what kind of installation you need. Forge is available in two formats:

- **NPM Package**: This is the recommended way to install Forge. It allows you to easily manage your dependencies and keep your project up-to-date.
- **CDN**: If you're just experimenting with Forge, or if you're working on a project that doesn't use a package manager, you can use the CDN version.

## NPM Package

To install Forge from npm, run the following command:

```bash
npm install @tylertech/forge
```

### Package Format

The `@tylertech/forge` package follows the following format:

- `dist/`: Contains all pre-built static distribution sources.
  - `<component-name>/`: pre-built CSS stylesheets for specific components.
    - Ex. `<component-name>/forge-<component-name>.css`: Contains the pre-built CSS stylesheets for CSS-only components.
  - `forge-core.css`: The optional Forge core stylesheet. Sets `height: 100dvh; width: 100dvw; margin: 0; background-color: var(--forge-theme-surface-dim)` on `<body>`. Full-page app shells (`<forge-app-layout>` or a root-level `<forge-scaffold>`) need these body styles to fill the window, so load this stylesheet or set them yourself.
  - `forge-tokens.css`: The optional Forge tokens stylesheet. Contains all design tokens used in the Forge components so your application has access to them as well.
  - `forge-dark.css`: The default Forge dark theme (must be loaded after `forge.css`).
  - `forge.css`: The pre-built Forge global stylesheet. Contains all global stylesheets. You should prefer to load individual stylesheets instead of this global stylesheet in production.
- `esm/`: Contains the unbundled ESM JavaScript sources as the main entry to the package (uses bare module specifiers).
- `sass/`: Contains all Sass stylesheets as a copy directly from the library. This allows you to utilize the same Sass utilities that Forge does within your own application and/or library.
- `custom-elements.json`: This is the custom elements manifest that describes the custom elements in the package. We use this to generate the docs and Angular adapters.
- `LICENSE`: The Apache 2.0 license.
- `package.json`: The package specification.
- `README.md`: This README.md file.

You can inspect the package contents by navigating to the `node_modules/@tylertech/forge` directory in your project.

### Framework Installation

If you're using a framework, you should jump to the framework-specific guide:

- [Angular](./frameworks/angular.md)
- [React](./frameworks/react.md)
- [Vue](./frameworks/vue.md)
- [Svelte](./frameworks/svelte.md)
- [Blazor](./frameworks/blazor.md)

### Import Components

You will then need to import the components you are using within your application to register them in the browser's custom element registry.

```javascript
import '@tylertech/forge/button';
import '@tylertech/forge/text-field';
```

If you're prototyping, it can be handy to pull in all components:

```javascript
import '@tylertech/forge';
```

**Not included in the root import**

`import '@tylertech/forge'` does not register these components. Each needs its own side-effect import (`import '@tylertech/forge/<name>'`): `app-launcher`, `app-layout`, `busy-indicator`, `confirmation-dialog`, `content-scaffold`, `count-card`, `footer`, `multi-select-header`, `quantity-field`, `responsive-toolbar`, `structured-card`, `theme-toggle`, and `user-profile`.

Note: make sure to import the components as early as possible in your application bootstrapping process to ensure they are
registered with the browser before your application is rendered to avoid FOUC (Flash of Unstyled Content).

## CDN

To use Forge via CDN, include the following script tag in your HTML:

```html
<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/index.js"></script>
```

Replace `<version>` with the version of Tyler Forge you want to use.

Note: The CDN distributes Forge components as ES modules. This means you need to use the `type="module"` attribute in your script tag.

Using the above `<script>` will automatically load **all** components into your page (except the subpath-only components listed under Import Components, which need their own `<component>/index.js` script). You can then use them anywhere in your HTML. While this is easy,
it is not recommended for production use as it will load all components, even if you only use a few. For production use, you should load only the components
you need. You can do this by referencing the individual component files directly:

```html
<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/<component>/index.js"></script>
```

Replace `<component>` with the name of the component you want to use.

For example, to use `<forge-button>`, you would include the following script tag:

```html
<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/button/index.js"></script>
```

You will also need to load required global styles. You can do this by including the following link tag in your HTML:

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/forge.css" />
```

Additionally, you can use the JSDelivr CDN to load Forge components if you prefer.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@tylertech/forge@<version>/dist/esm/index.js">
```

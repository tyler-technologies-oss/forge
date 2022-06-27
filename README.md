# Forge Components

Forge is a framework-agnostic library of Web Components adhering to [W3C Web Component Spec][2] and the [Forge Design System][1]. Originally derived from Google's [Material Components Web][3] project, this project aims to create a consistent UI/UX across applications regardless of choice in front-end frameworks. Theming is a core part of the library such that competing design objectives can be achieved while still providing UI/UX cohesion across product catalogs. Please visit the [Forge Design System website][1] for additional guidance and documentation.

## Important links

- [Storybook][4]
- [Contributing][5]
- [Changelog][6]
- [Forge design system][1]
- [Roadmap/Proposals](https://github.com/tyler-technologies-oss/forge/discussions/61)

## Using with a framework?

As noted above, Forge components are framework-agnostic. If you haven't used Web Components before just think of them as new HTML elements that the browser knows
about, just like any old `<div>`, `<button>`, `<input>`... etc. This means that any framework can already work with them natively without any work on your end.

The caveat to this is that many custom Web Components are enhanced to allow for more complex data (arrays and objects) to be provided, as well as custom event names
to get notified about changes within the element. This is where framework adapter libraries can help to make the usage more seamless.

Forge provides the following framework adapters:

- [Angular](https://github.com/tyler-technologies/forge-angular)
- [React](https://github.com/tyler-technologies/forge-react)
- [Blazor](https://github.com/tyler-technologies/tyler-forge-blazor)
- Svelte (coming soon)

> Keep in mind that these adapter libraries are **not** required by any means. They are only provided to make usage for certain components feel more native for
> developers using these frameworks.

## Getting started

The component library is distributed on npm and as static assets on the Forge CDN.

### Using via NPM

To install the library from npm:

```bash
npm install @tylertech/forge
```

You can then import the component definition functions to register them with the browser:

```typescript
import { defineTextFieldComponent, defineButtonComponent } from '@tylertech/forge';

defineTextFieldComponent();
defineButtonComponent();
```

> **Note:** the components are actually self-defining, but without something in your application referencing those components they could be left out during bundling.
> These definition functions ensure that the components are bundled within your application.

#### CSS

Forge expects a global stylesheet to be loaded to configure the theme and typography globally across your application, and some components may require additional css.

```scss
@use '@tylertech/forge/dist/forge.css';
```

The `forge.css` file contains other stylesheets that you may or may not need. We recommend you only include the stylesheets you need in your application:

```scss
/// Optionally include a minimal base set of styles commonly used with Forge-based applications
@use '@tylertech/forge/dist/forge-core.css';

/// Include the theme and typography styles
@use '@tylertech/forge/dist/theme/forge-theme.css';
@use '@tylertech/forge/dist/typography/forge-typography.css';

/// Include styles for <forge-button> elements
@use '@tylertech/forge/dist/button/forge-button.css';
```


Additionally apply the `forge-typography` class to a root element (typically the `<body>`):

```html
<body class="forge-typography">
```

### Using via CDN

The Forge CDN can provide components directly on demand.

As an example, the text-field and button components can be loaded directly like this:

```html
<!-- Optionally include a minimal base set of styles commonly used with Forge-based applications -->
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@v2/forge-core.css">

<!-- Always include the theme and typography styles -->
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@v2/theme/forge-theme.css">
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@v2/typography/forge-typography.css">

<!-- Some components (such as button) require the use of a global stylesheet (for now) -->
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@v2/button/forge-button.css">

<!-- Load the ES modules JavaScript for each component you need -->
<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@v2/text-field/index.js"></script>
<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@v2/button/index.js"></script>
```

> **Note:** the Forge CDN always contains the latest published changes on a per major version basis. If you need a specific version
> please use CDN services such as [unpkg](https://unpkg.com/@tylertech/forge@2.0.0/esm/index.js).
>
> Additionally, the components will automatically be defined within the custom element registry in the browser when loaded from the CDN.

### HTML

Now the text-field and button components can be used anywhere in the DOM:

```html
<forge-text-field>
  <label for="input">Label</label>
  <input type="text" id="input" />
</forge-text-field>

<forge-button type="raised">
  <button type="button">Button</button>
</forge-button>
```

Don't forget to also add the `forge-typography` class to the `<body>` element to ensure your application inherits the default typography styles:

```html
<body class="forge-typography">
```

## Need help?

Please [create](https://github.com/tyler-technologies-oss/forge/issues/new/choose) a GitHub issue with any questions and we'll be glad to help!

[1]: https://forge.tylertech.com/
[2]: https://www.w3.org/wiki/WebComponents/
[3]: https://material-components.github.io/material-components-web-catalog/
[4]: https://forge.tylerdev.io/
[5]: https://github.com/tyler-technologies/forge/blob/main/CONTRIBUTING.md
[6]: https://github.com/tyler-technologies/forge/blob/main/CHANGELOG.md

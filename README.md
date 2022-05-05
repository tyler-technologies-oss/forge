# Forge Components

Forge is a framework-agnostic library of Web Components adhering to [W3C Web Component Spec][2] and the [Forge Design System][1]. Originally derived from Google's [Material Components Web][3] project, this project aims to create a consistent UI/UX across applications regardless of choice in front-end frameworks. Theming is a core part of the library such that competing design objectives can be achieved while still providing UI/UX cohesion across product catalogs. Please visit the [Forge Design System website][1] for additional guidance and documentation.

## Important links

- [Storybook][4]
- [Contributing][5]
- [Changelog][6]
- [Forge design system][1]

## Getting started

The component library is distributed on npm and as static assets on the Forge CDN.

### Using via NPM

To install the library from npm:

```bash
npm install @tylertech/forge
```

> This package supports ES modules to ensure minimal application bundles.

You can then import the component definition functions to register them with the browser:

```typescript
import { defineTextFieldComponent, defineButtonComponent } from '@tylertech/forge';

defineTextFieldComponent();
defineButtonComponent();
```

### Using via CDN

The Forge CDN can provide components directly.

As an example, the text-field component can be loaded directly like this:

```html
<!-- Some components (such as button) require the use of a global stylesheet -->
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge/1.0.0/button/forge-button.css">

<!-- Load the JavaScript bundle for each component you need. -->
<script src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge/1.0.0/text-field/text-field.js"></script>
<script src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge/1.0.0/button/button.js"></script>

<!-- Register the components with the browser. -->
<script>
  // All components are added under the `window.Forge.<componentName>` global variable
  window.Forge.textField.defineTextFieldComponent();
  window.Forge.button.defineButtonComponent();
</script>
```

### HTML

Now the text-field component can be used anywhere in the html:

```html
<forge-text-field>
  <input type="text" id="input" />
  <label for="input">Label</label>
</forge-text-field>

<forge-button type="raised">
  <button type="button">Button</button>
</forge-button>
```

### CSS

Forge expects a global stylesheet to be loaded to configure the theme and typography globally across your application, and some components may require additional css.

```scss
@use '@tylertech/forge/dist/forge.css';
```

Additionally apply the `forge-typography` class to a root element (typically the `<body>`):

```html
<body class="forge-typography">
```

## Need help?

Please create a GitHub issue with any questions.

[1]: https://forge.tylertech.com/
[2]: https://www.w3.org/wiki/WebComponents/
[3]: https://material-components.github.io/material-components-web-catalog/
[4]: https://forge.tylerdev.io/
[5]: https://github.com/tyler-technologies/forge/blob/main/CONTRIBUTING.md
[6]: https://github.com/tyler-technologies/forge/blob/main/CHANGELOG.md

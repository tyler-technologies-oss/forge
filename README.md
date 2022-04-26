# Forge Components

Forge is a project that produces framework-agnostic Web Components for the browser. The components adhere to the standard W3C Web Components spec, and work seamlessly with the various front-end frameworks such as Angular, Vue, and React, as well as no framework at all.

The goal of this project is to create a set of high quality UI components for the browser platform that implement the Forge design system. The components can be shared across products and applications without requiring a specific version of a framework. This will help applications present themselves and function consistently, regardless of underlying architecture/technology.

The components within this library derive from Google's [Material Components Web](https://material-components.github.io/material-components-web-catalog/) project. This ensures that we are strictly following material guidelines while allowing us the flexibility to design for the specific needs of Tyler. With that being said, theming is built-in to the core of the library to make it easy to adapt design customizations, as well as use with other design systems as a whole.

To view more detailed information about the project, as well as the components that are currently available, please visit the [Forge design system website](https://forge.tylertech.com/).

## Important links

- [Storybook](https://tyler-technologies.github.io/forge/master/)
- [Contributing](https://github.com/tyler-technologies/forge/blob/master/CONTRIBUTING.md)
- [Changelog](https://github.com/tyler-technologies/forge/blob/master/CHANGELOG.md)
- [Forge design system](https://forge.tylertech.com)

## Getting started

The component library is distributed on npm and as static assets on the Forge CDN.

### Using via NPM

To install the library from npm:

```bash
npm install @tylertech/forge
```

> The package supports ES modules to ensure you only pull in the components you need within your application bundles.

You can then import the component definition functions to register them with the browser:

```typescript
import { defineTextFieldComponent, defineButtonComponent } from '@tylertech/forge';

defineTextFieldComponent();
defineButtonComponent();
```

### Using via CDN

If you need to use the library on a static website, or you do not have a build pipeline in place, you can also access the files from our Forge CDN.

For example, if you wanted to just load the text-field component, you could do so like this:

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

Now you can use the elements anywhere in your application:

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

Forge expects a global stylesheet to be loaded to configure the theme and typography globally across your application, as well as set up any
supplemental global styles required by certain components.

```scss
@use '@tylertech/forge/dist/forge.css';
```

## Need help?

Please feel free to reach out to us at any time, or create a GitHub issue with a question and we'll be glad to help!

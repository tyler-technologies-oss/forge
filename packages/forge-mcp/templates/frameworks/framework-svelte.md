# Svelte Framework Usage

ALWAYS refer to this resource when working with Tyler Forge in a Svelte application.

## Installation

To use Forge in your Svelte application, install the following package from npm:

```bash
npm install @tylertech/forge
```

## Loading the Tyler Font

Edit your `index.html` file and add the following `<link>` tag to the `<head>` section load the Tyler font:

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
```

This will configure the default font family for your application, and load the required font weights and styles.

## Importing Components

To use Forge components in your Svelte application, import the components you need from the `@tylertech/forge` package.

```svelte
<script>
  import { defineButtonComponent, defineCardComponent } from '@tylertech/forge';

  // Only import the components you need
  defineButtonComponent();
  defineCardComponent();
</script>

<div>
  <forge-card>
    <forge-button type="button" variant="primary">Click me</forge-button>
  </forge-card>
</div>
```

## Importing Styles

To use the default Forge styles in your Svelte application, import the `forge.css` file from the `@tylertech/forge` package.

```svelte
<style>
  @import '@tylertech/forge/dist/forge.css';
</style>
```

---

> 💡 **Related Resources:**
> - Other frameworks? Try `setup_framework` for Angular, React, or Vue integration
> - Icons integration? Check `setup_icons` for Tyler Forge icons setup with Svelte
> - General installation? Use `get_usage_guide` with `type=installation` for basic setup instructions
> - Component catalog? Use `list_components` to see all available Tyler Forge components

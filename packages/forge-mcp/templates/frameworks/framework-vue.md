# Vue Framework Usage

ALWAYS refer to this resource when working with Tyler Forge in a Vue application.

## Installation

To use Forge in your Vue application, install the following package from npm:

```bash
npm install @tylertech/forge
```

## Configure Vue

To make sure Vue plays nice with custom elements, you need to configure the compiler to allow certain elements:

### In-Browser Config

```js
// Only works if using in-browser compilation.
// If using build tools, see config examples below.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('forge-')
```

### Vite Config

If you're using the Vue plugin with Vite, you can use the following in your Vite config:

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('forge-')
        }
      }
    })
  ]
});
```

### Vue CLI Config

If you're using Vue CLI, you can use the following in your `vue.config.js` file:

```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => tag.includes('forge-')
        };
      });
  }
};
```

## Loading the Tyler Font

Edit your `index.html` file and add the following `<link>` tag to the `<head>` section load the Tyler font:

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
```

This will configure the default font family for your application, and load the required font weights and styles.

## Importing Components

To use Forge components in your Vue application, import the components you need from the `@tylertech/forge` package.

```html
<template>
  <div>
    <forge-scaffold>
      <forge-card slot="body">
        <forge-button type="button" variant="primary">Click me</forge-button>
      </forge-card>
    </forge-scaffold>
  </div>
</template>

<script setup>
  import { defineScaffoldComponent, defineButtonComponent, defineCardComponent } from '@tylertech/forge';

  // Only import the components you need
  defineScaffoldComponent();
  defineButtonComponent();
  defineCardComponent();
</script>
```

## Importing Styles

To use the default Forge styles in your Vue application, import the `forge.css` file from the `@tylertech/forge` package.

```vue
<style>
@import '@tylertech/forge/dist/forge-core.css';
@import '@tylertech/forge/dist/forge.css';
</style>
```

### Dark Theme

If you want to use the dark theme, import the `forge-dark.css` file:

```vue
<style>
@import '@tylertech/forge/dist/forge-dark.css';
</style>
```

---

> 💡 **Related Resources:**
> - Other frameworks? Try `setup_framework` for Angular, React, or Svelte integration
> - Icons integration? Check `setup_icons` for Tyler Forge icons setup with Vue
> - General installation? Use `get_usage_guide` with `type=installation` for basic setup instructions
> - Component catalog? Use `list_components` to see all available Tyler Forge components

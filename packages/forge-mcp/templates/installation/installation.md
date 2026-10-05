# Tyler Forge Installation

Tyler Forge is a comprehensive web component library that can be installed and used in various ways depending on your project setup.

Install Tyler Forge via npm:

```bash
npm install @tylertech/forge@latest
```

## ES Module Import

After installing via npm, you can import Tyler Forge components in your JavaScript/TypeScript files:

```javascript
// Import all components
import { defineButtonComponent } from '@tylertech/forge';

defineButtonComponent();
```

## CSS Styles

Tyler Forge requires CSS for proper styling. Include the CSS file in your project:

If you're using Sass, you can import the Sass files:

```scss
@import "@tylertech/forge/dist/forge-core";
@import "@tylertech/forge/dist/forge";
```

If you're project uses a bundler that supports CSS imports, you can import the CSS files directly:

```javascript
// In your main JavaScript file
import "@tylertech/forge/dist/forge-core.css";
import "@tylertech/forge/dist/forge.css";
```

## Next Steps

After installation, check out the [Usage Guide](forge://usage) to learn how to use Tyler Forge components in your application.

> 💡 **Related Resources:**
> - Framework-specific guidance? Use `setup_framework` for detailed setup instructions
> - Need basic usage examples? Use `get_forge_blocks` with `component={component-name}` for HTML structural examples
> - Need icons? Use `setup_icons` for Tyler Forge icons installation and setup
> - Want to see all components? Try `list_components` to explore what's available
> - Looking for design consistency? Check `get_design_tokens` for styling guidelines
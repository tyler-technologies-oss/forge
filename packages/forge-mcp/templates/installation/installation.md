# Tyler Forge Installation

Tyler Forge is a comprehensive web component library that can be installed and used in various ways depending on your project setup.

Install Tyler Forge via npm:

```bash
npm install @tylertech/forge@latest
```

## ES Module Import

After installing via npm, register each component you use with a side-effect import from its subpath. Importing the subpath registers the custom element automatically:

```javascript
import '@tylertech/forge/button';
import '@tylertech/forge/text-field';
import '@tylertech/forge/app-layout';
```

> ⚠️ Only import the components you use. Do not use definition functions (e.g. `defineButtonComponent()`, `defineComponents()`) or import all components at once.

Import components as early as possible in your application bootstrapping process so they are registered before your application renders, avoiding FOUC (Flash of Unstyled Content).

## CSS Styles

Tyler Forge requires its global stylesheet for proper styling. If your project uses a bundler that supports CSS imports, import it in your main JavaScript file:

```javascript
import "@tylertech/forge/dist/forge.css";
```

If you're using Sass:

```scss
@import "@tylertech/forge/dist/forge";
```

### Optional Stylesheets

- `forge-core.css`: The Forge core stylesheet. Typically useful when using `<forge-scaffold>` for your outer page layout.
- `forge-tokens.css`: All design tokens used in the Forge components, so your application has access to them as well.
- `forge-dark.css`: The default Forge dark theme (must be loaded after `forge.css`).

```javascript
import "@tylertech/forge/dist/forge-core.css";
```

## Next Steps

After installation, check out the [Usage Guide](forge://usage) to learn how to use Tyler Forge components in your application.

> 💡 **Related Resources:**
> - Framework-specific guidance? Use `setup_framework` for detailed setup instructions
> - Need basic usage examples? Use `get_forge_blocks` with `component={component-name}` for HTML structural examples
> - Need icons? Use `setup_icons` for Tyler Forge icons installation and setup
> - Want to see all components? Try `list_components` to explore what's available
> - Looking for design consistency? Check `get_design_tokens` for styling guidelines
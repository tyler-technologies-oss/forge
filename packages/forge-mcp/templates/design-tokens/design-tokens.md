# Design Tokens

Design tokens are the core building blocks of a design system. They are the variables that define the visual design of a product. These variables can be used
to define colors, typography, spacing, and much more.

Tyler Forge provides a set of design tokens that are used to style the components. These tokens are available as CSS custom properties and can be used to style
your own components as well to keep your design consistent and reduce the need to redefine styles.

## Disclaimer

**DO NOT** use these tokens directly in your application UNLESS you need to. Instead, use the Tyler Forge components which are already styled using these tokens,
and only make modifications if absolutely necessary. Tyler Forge is designed to be used as a complete design system, and using the components as they are will ensure that your application is consistent and follows best practices.

## Usage

When installing and using Tyler Forge, you also have access to a set of global CSS stylesheets that can be loaded into your application. These stylesheets include
the design tokens that are used to style the Tyler Forge components.

> Tyler Forge components do not rely on these tokens being loaded because they are included in the components themselves. However, if you are building your own
> components, you can use these tokens to style them and this will help keep your application consistent with the Tyler Forge design.

To use the design tokens in your application, you can include the following CSS file in your application:

```css
@use '@tylertech/forge/dist/forge';
```

This will include all of the design tokens that are available in Tyler Forge.

If you would like to instead only include specific design tokens, you can include the following CSS file in your application:

```css
// This will load only the theme design tokens
@use '@tylertech/forge/dist/theme/forge-theme';

// This will load only the typography design tokens
@use '@tylertech/forge/dist/typography/forge-typography';

// This will load all other tokens
@use '@tylertech/forge/dist/forge-tokens';
```

---

> 💡 **Related Resources:**
> - Specific token categories? Use `get_design_tokens` with category options: `color`, `spacing`, `typography`, `animation`, `border`, `elevation`, `layering`, `shape`
> - Component implementations? Try `list_components` to see which components use these tokens
> - Typography guidance? Check `setup_typography` for font usage with design tokens

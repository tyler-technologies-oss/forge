# REFERENCE: Tyler Forge Icons

**Tyler Forge Design System** | **Category:** Icons | **Type:** SVG Icon Library

**PURPOSE:** Comprehensive SVG icon set for Tyler Forge applications. Use with the `<forge-icon>` component for optimal integration.

**COMPONENT:** See [Icon component documentation](forge://component/forge-icon) for `<forge-icon>` API details.

## SETUP: Installation

**Install Tyler Icons package:**

```bash
npm install @tylertech/tyler-icons
```

## USAGE: Icon Registration Pattern

⚠️ **IMPORTANT:** Always use icons that exist in the Tyler Icons library rather than guessing names. Use the `find_icons` tool to discover available icons with their exact ESM import names.

**Import icons as ES modules:**

```javascript
import { tylIconFavorite, tylIconHeart, tylIconForgeLogo } from '@tylertech/tyler-icons';
```

**Icon Structure:** Each icon has `name` (string) and `data` (SVG string) properties.

**Register icons with IconRegistry BEFORE use:**

```javascript
import { IconRegistry } from '@tylertech/forge';

// Icons **must** be registered before they can be used with the component
IconRegistry.define([tylIconFavorite, tylIconHeart, tylIconForgeLogo]);
```

You can then use the icon in your HTML like so:

```html
<forge-icon name="favorite"></forge-icon>
<forge-icon name="heart"></forge-icon>
<forge-icon name="forge-logo"></forge-icon>
```

If you cannot statically determine the name of the icon to render at build time, you can also use the `external` attribute on the `<forge-icon>` element:

```html
<forge-icon name="favorite" external></forge-icon>
```

This instructs the `<forge-icon>` component to fetch the icon data from the CDN at runtime, and does not require the icons to be registered first. This is useful if you want to dynamically load icons based on dynamic data.

---

**INTEGRATION:** Framework and component resources:
- **🔍 Icon Discovery:** Use `find_icons` to search for icons with natural language queries and get exact ESM import names
- **Icon component:** Use `get_component_docs` with `component=forge-icon` for complete `<forge-icon>` API
- **Framework setup:** Use `setup_framework` for framework-specific icon integration patterns
- **Installation:** Use `get_usage_guide` with `type=installation` for Tyler Forge and icon setup instructions
- **Styling:** Use `get_design_tokens` with `category=color` for icon color tokens and theming

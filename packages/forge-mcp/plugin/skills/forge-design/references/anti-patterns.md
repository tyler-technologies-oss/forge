# Forge UI Anti-Patterns

**In this file:**
- [Typography classes used to fake hierarchy](#typography-classes-used-to-fake-hierarchy)
- [Choosing heading levels (`<h1>`–`<h6>`)](#choosing-heading-levels-h1h6)
- [Ad-hoc grid / flex CSS where a scaffold fits](#ad-hoc-grid--flex-css-where-a-scaffold-fits)
- [Inline styles overriding design tokens](#inline-styles-overriding-design-tokens)
- [Reinventing markup instead of adapting a block](#reinventing-markup-instead-of-adapting-a-block)
- [Copying a block's document scaffolding](#copying-a-blocks-document-scaffolding)
- [Using `<forge-stack>` for general layout](#using-forge-stack-for-general-layout)
- [Passing table rows as HTML children](#passing-table-rows-as-html-children)

These are patterns to avoid when building Forge UI. Each entry pairs the anti-pattern with the correct Forge-native approach. **Before writing UI, fetch a block with `get_forge_blocks` and follow the pattern shown there — most anti-patterns below come from reinventing structure a block already provides.**

---

## Typography classes used to fake hierarchy

**Anti-pattern:** Reaching for a typography class to create a subheading, caption, or label that the block/component already provides through a slot.

```html
<!-- ❌ Wrong: body2 pressed into service as a subheading -->
<forge-card>
  <div class="forge-typography--heading4">Users</div>
  <div class="forge-typography--body2">Manage roles and access</div>
  ...
</forge-card>
```

**Why it's wrong:** Typography classes describe *type scale*, not *document structure*. Blocks and structured components already expose the correct title/subtitle/caption regions with proper styling baked in.

**Do instead:** Use the block's dedicated slots. Fetch the block first so you're using the same pattern everyone else in the app uses.

```html
<!-- ✅ Right: use the structured card's slots -->
<forge-structured-card>
  <span slot="title">Users</span>
  <span slot="subtitle">Manage roles and access</span>
  ...
</forge-structured-card>
```

Fetch the block: `get_forge_blocks(component: "forge-structured-card")`.

---

## Choosing heading levels (`<h1>`–`<h6>`)

**Not an anti-pattern — a decision to make deliberately.** Blocks bake in the visual styling for headings; the only thing you decide when dropping a block into an app is which *level* (`h1`–`h6`) to use based on the app's document hierarchy.

- `h1` — the page's single primary heading (often owned by the app shell or page title).
- `h2` — top-level sections on the page.
- `h3` and below — nested subsections, card titles inside a section, etc.

**Read the surrounding page context before picking a level.** Don't copy the level verbatim from a block if the block was authored in isolation — adjust it to slot into the app's outline.

---

## Ad-hoc grid / flex CSS where a scaffold fits

**Anti-pattern:** Writing custom `display: grid` / `display: flex` to lay out content inside a card, drawer, dialog, or page region.

```html
<!-- ❌ Wrong -->
<forge-card>
  <div style="display: grid; grid-template-columns: 200px 1fr; gap: 16px;">
    <nav>...</nav>
    <section>...</section>
  </div>
</forge-card>
```

**Why it's wrong:** `forge-scaffold` (and scaffold-based blocks) are designed for exactly this — structured regions with headers, footers, sidebars, and body content. Rolling your own diverges from every other layout in the app.

**Do instead:** Use `forge-scaffold` inside the container.

```html
<!-- ✅ Right -->
<forge-card>
  <forge-scaffold>
    <aside slot="body-left">...</aside>
    <div slot="body">...</div>
  </forge-scaffold>
</forge-card>
```

Fetch scaffold-based blocks: `get_forge_blocks(component: "forge-scaffold")`.

---

## Inline styles overriding design tokens

**Anti-pattern:** Hardcoding colors, spacing, or type sizes inline instead of using Forge tokens.

```html
<!-- ❌ Wrong -->
<div style="padding: 24px; background: #f5f5f5; color: #333;">
  ...
</div>
```

**Why it's wrong:** Hardcoded values ignore theming (light/dark), density modes, and future token changes. They also drift silently from the rest of the app.

**Do instead:** Use design tokens or Forge utility classes.

```css
/* ✅ Right: regular CSS with Forge tokens */
.panel {
  padding: var(--forge-spacing-large);
  background-color: var(--forge-theme-surface-container);
  color: var(--forge-theme-on-surface);
}
```

Or Tailwind (when `@tylertech/forge-tailwind` is installed): `class="p-large bg-surface-container text-on-surface"`.

---

## Reinventing markup instead of adapting a block

**Anti-pattern:** Writing Forge component markup from memory or intuition without fetching a block first.

**Why it's wrong:** Blocks are the authoritative reference for slot names, composition, and layout patterns. Reinventing structure produces subtle-but-real inconsistencies (wrong slot names, missing wrappers, ad-hoc spacing) that accumulate across a codebase.

**Do instead:**

1. Call `get_forge_blocks` with a `query` (feature you're building) or a `component` (specific Forge element).
2. Read the block as a whole to understand how components compose.
3. Extract only the pattern you need and adapt content — do not rewrite structure.
4. If you need layout inside a container, also fetch a scaffold-based block.

The `PreToolUse` hook will block Forge markup writes that lack a `get_forge_blocks` call earlier in the turn.

---

## Copying a block's document scaffolding

**Anti-pattern:** Pasting a block's `<!doctype>`, `<html>`, `<head>`, `<base href="/blocks/...">`, theme stylesheet links, or `forge-register.js` / `theme-listener.js` script tags into the target app.

**Why it's wrong:** Blocks are served as complete, standalone HTML documents so they can render in the block preview harness. Everything outside `<body>…</body>` is preview scaffolding — the `<base>` tag rewrites URLs, the theme scripts wire the preview's light/dark toggle, and the stylesheet paths point at the blocks CDN. Dropping any of that into an app double-registers components, breaks routing, or pulls in styles that fight the app's own theme setup.

**Do instead:** Take only the content **between `<body>` and `</body>`** from the block. The app's own entry file handles component registration, theming, and styles — see [installation.md](installation.md).

---

## Using `<forge-stack>` for general layout

**Anti-pattern:** Reaching for `<forge-stack>` to lay out arbitrary rows or columns of content.

**Why it's wrong:** `<forge-stack>` is a niche primitive. General layout should use CSS flex/grid utility classes (or a scaffold — see the ad-hoc grid entry above).

**Do instead:** Use `flex`/`grid` utilities with Forge spacing tokens, or a scaffold-based block for structured regions. Only reach for `<forge-stack>` when the specific rendering it provides is what you want.

---

## Passing table rows as HTML children

**Anti-pattern:** Writing `<tr>`/`<td>` (or slotted children) inside `<forge-table>`.

**Why it's wrong:** `<forge-table>` renders rows from JavaScript, not markup. It has no default slot for row content.

**Do instead:** Set the element's `data` and `columnConfigurations` properties from JavaScript — see [tables.md](tables.md) for the pattern.

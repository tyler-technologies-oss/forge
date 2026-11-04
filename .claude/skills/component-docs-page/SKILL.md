---
name: component-docs-page
description: This skill should be used when the user asks to "add X to the docs site", "create the docs page for a new component", "document the new X component", "add a usage page for X", or otherwise discusses publishing a component (new, migrated, or undocumented) on the `docs/` site. It is the end-to-end checklist and hands off to component-docs-header, forge-blocks-authoring, and docs-anatomy-diagram for the individual pieces.
---

# Component Docs Page

A component is on the docs site when every item below is done. Work through them in order and report which are done, skipped (with the reason), or blocked. Reference pages: `tabs/` (Overview, variants, a11y with a keyboard table) and `structured-card/` (adds an anatomy diagram).

Everything lives in `docs/src/content/components/<slug>/`. The slug must be the primary tag name without `forge-`, because that's how the API tab finds the component in `custom-elements.json` (`forge-date-picker` → `date-picker`). A slug that doesn't match shows "coming soon" on the API tab; `tabs` (tag `forge-tab-bar`) currently has this problem.

## 1. Blocks first, on their own branch

Every demo on the page comes from a block, so the blocks have to exist and be deployed before the page can point at them.

- Use the **`forge-blocks-authoring`** skill: one block per Storybook story in `packages/forge/src/stories/components/<name>/`, starting with a `demo` block for "Basic usage".
- Branch off `main` for the blocks, separate from the docs branch. A `blockUrl` is checked against the live block manifest, so it only resolves once the blocks PR is merged and deployed.
- Until then, leave `blockUrl` off an `<Example>`. The skill generator derives the block ID from the section heading (`## Basic usage` → `components/<slug>/demo/demo`, `## Vertical` → `components/<slug>/vertical/vertical`) and reports it as PENDING instead of failing. Name variant headings so they derive the block IDs you created.

## 2. `usage.mdx`: frontmatter

Every field must match `docs/src/content.config.ts`:

```yaml
---
title: Tabs
description: One sentence, present tense, starting with the component name.
status: stable          # stable | beta | deprecated | planned
source: core            # core | block
category: navigation    # a key in docs/src/data/component-categories.ts
storybookId: components-tabs--demo   # optional; adds the Playground tab
---
```

`category` places the component in the sidenav and on the All components page. Nothing else needs registering for navigation.

## 3. `usage.mdx`: sections, in this order

| Section | Required | Contents |
| --- | --- | --- |
| Header | Yes | The live demo at the top, in its own `header.astro` rendered as `<Header />`. Use the **`component-docs-header`** skill. Never write `<ComponentHeader>` inline in the MDX: the All components page builds its thumbnail from `header.astro`, so an inline header leaves the card blank. |
| `## Overview` | Yes | One or two paragraphs: what it is, what it's for, and what it's typically paired with. No API names. |
| `## Usage` | Yes | One paragraph: the key elements and properties in backticks, when to use it, and when to use something else instead (link to that component's usage page). |
| `## Slot locations` | When it has named slots or regions | Numbered anatomy diagram. Use the **`docs-anatomy-diagram`** skill. |
| `## Rules` | Yes | `<Rules>` with a `do` and a `dont` `<Rule>`, 3–6 short imperative rules each. |
| `## Basic usage` | Yes | One sentence, then `<Example description="..." blockUrl="..." />` for the `demo` block. |
| `## <Variant>` | One per block | One or two sentences on when and how, then that block's `<Example>`. Plain fenced `html` code is fine for a pattern with no visual difference worth a live demo. |

- Every `<Example>` needs a string `description`. The skill build fails without one.
- Link other components with `` <a href={`${import.meta.env.BASE_URL}components/<slug>/usage/`}> ``, not root-relative markdown links.
- Card, drawer and other titles in prose follow the heading-style rules: page and dialog titles `text-heading4`, card and drawer titles `text-heading3`. Never prescribe the `h1`–`h6` element.

## 4. `accessibility.mdx`

Without this file the Accessibility tab shows "coming soon". It has no frontmatter and no header, just `##` sections. Include the ones that apply:

- `## Keyboard interaction`: a `| Key | Action |` table for anything focusable.
- `## Screen reader behavior`: roles, live regions, and what's announced.
- `## Labeling`: how to give it an accessible name, and the ARIA the consumer must still supply.
- Component-specific sections where they help (for example, `## Color and contrast` for a badge, `## Heading level` for a structured card).

Describe what the component handles automatically and what the consumer has to wire up. Get roles, keys and attributes from the component source and `get_component_docs`, not memory.

## 5. Register what the page renders

Add every Forge component and icon used in the header, the anatomy diagram, and any inline markup to `docs/src/scripts/forge-components.ts`: side-effect imports (`import "@tylertech/forge/<name>";`) and `IconRegistry.define([...])`. Unregistered components don't upgrade and unregistered icons render blank. Blocks render in their own iframe and don't need this.

## 6. Automatic, but check them

- **API tab:** generated from `@tylertech/forge/custom-elements.json`. If it's empty, the slug doesn't match the tag name, or the component isn't in the installed Forge build yet.
- **Playground tab:** appears when `storybookId` is set. Confirm the story ID exists.
- **Sidenav:** comes from the collection and `category`.

## 7. All components page

The card on `docs/src/pages/components/index.astro` takes its title and description from the frontmatter, and its thumbnail from `<slug>/header.astro`, loaded with `import.meta.glob`. The card still appears without a header file, but with no visual. Confirm:

- `docs/src/content/components/<slug>/header.astro` exists and forwards the `thumbnail` prop to `ComponentHeader`.
- Every component in the header is registered (step 5), or the thumbnail renders empty.
- The demo is still readable at the thumbnail's half scale. If it isn't, change the header, not the All components page.

## 8. Regenerate the Forge Design skill

`src/content/components/` feeds the plugin's `forge-design` skill (see `docs/CLAUDE.md`):

1. `pnpm --filter forge-docs build:forge-skill` and commit the changes under `plugin/skills/forge-design/`.
2. Add a changeset for `@tylertech/forge-plugin` (`minor` for a new component page, `patch` for wording fixes) by writing `.changeset/<slug>.md` directly.
3. `pnpm --filter forge-docs check:forge-skill` until it's clean apart from PENDING block IDs from step 1.

## 9. Verify

- `pnpm --filter forge-docs build` succeeds.
- `npx astro check` in `docs/` adds no new errors.
- Don't start the dev server (see `docs/CLAUDE.md`). Ask the user to check the usage, API, Playground and Accessibility tabs, and the card on the All components page.

## Done when

- [ ] Blocks exist for every story (merged and deployed, or PENDING with matching headings)
- [ ] Frontmatter complete and valid
- [ ] `header.astro` exists and is rendered as `<Header />` (no inline `<ComponentHeader>`)
- [ ] Overview, Usage, Rules, Basic usage, and one section per variant
- [ ] Anatomy diagram, if the component has named slots
- [ ] `accessibility.mdx`
- [ ] Components and icons registered
- [ ] API and Playground tabs populated
- [ ] All components page card shows the header thumbnail
- [ ] Forge Design skill regenerated and changeset added
- [ ] Build and type check pass

# CLAUDE.md

Astro documentation site for Tyler Forge (`forge-docs`, private). Root conventions (pnpm, turbo, conventional commits) apply; see the root CLAUDE.md.

## Commands

Run from the monorepo root or with `pnpm --filter forge-docs <script>`:

- `pnpm dev:docs` - Start the Astro dev server (builds workspace dependencies first)
- `pnpm --filter forge-docs build` - Build the static site to `docs/dist`, then regenerate the Forge Design skill
- `pnpm --filter forge-docs test` - Test the skill build and check scripts
- `pnpm --filter forge-docs build:forge-skill` - Regenerate the Forge Design skill into `plugin/skills/forge-design`
- `pnpm --filter forge-docs check:forge-skill` - Run the same skill and changeset check CI runs, and print what's missing

## Forge Design skill

The Claude Code plugin's `forge-design` skill is generated from the MDX in `src/content/components/`, `src/content/designing/`, and `src/content/developing/`, plus the template in `scripts/forge-skill-template/`. Users only receive it when the plugin version changes.

After editing any of those, before committing:

1. Run `pnpm --filter forge-docs build:forge-skill` and commit the changes under `plugin/skills/forge-design/`.
2. If that changed the skill, add a changeset for `@tylertech/forge-plugin`: `patch` for wording fixes, `minor` for new or changed guidance. `pnpm changeset` is interactive, so write the file directly instead, as `.changeset/<short-slug>.md`:

   ```md
   ---
   '@tylertech/forge-plugin': patch
   ---

   docs(button): clarify when to use the outlined variant
   ```
3. Run `pnpm --filter forge-docs check:forge-skill` to confirm.

Never edit `plugin/skills/forge-design/` by hand. Edits to other pages (tokens, FAQ, about) don't affect the skill.

### Published guidance

`pnpm --filter forge-docs build` also publishes the guidance to the site, for the Forge MCP server and other agents (FORGE-71). It writes these into `dist/`, and they aren't committed:

- `skill/forge-design/references/**` - the same reference files as the plugin skill
- `skill/forge-design/manifest.json` - the topic index, with a `schemaVersion`
- `skill/forge-design/rules.md` - the top-level rules, workflow and tool list from the template, with absolute links
- `skill/forge-design/rules.json` - data for hooks and tools. `subpathOnlyComponents` is derived from what `packages/forge/src/lib/index.ts` doesn't import
- `llms.txt` - an index of every page

Bump `SITE_SCHEMA_VERSION` in `build-forge-skill.mjs` when the shape of `manifest.json` or `rules.json` changes.

## Astro framework

Use the Astro docs MCP server (`mcp__Astro_docs__search_astro_docs`, registered in the root `.mcp.json`) for any Astro question: syntax, configuration, components, layouts, content collections, MDX, view transitions, SSR/SSG behavior, and integrations. Query it before assuming Astro APIs or patterns.

## Dev server

The user runs the dev server themselves. Never start or stop it to verify changes.

## Forge components & icons

Components and icons used in pages must be registered in `src/scripts/forge-components.ts`: side-effect imports for components (`@tylertech/forge/button`, `@tylertech/forge/app-layout`) and `IconRegistry.define([...])` for icons from `@tylertech/tyler-icons`.

## Styling

Do not write custom CSS. Prefer, in order: a Forge component, a `@tylertech/forge-tailwind` utility class, then a Forge CSS custom property. Custom CSS is only acceptable for `::part()` with no CSS variable, MDX-rendered elements with no class hook, or effects Tailwind can't express.

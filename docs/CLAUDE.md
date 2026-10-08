# CLAUDE.md

Astro documentation site for Tyler Forge (`forge-docs`, private). Root conventions (pnpm, turbo, conventional commits) apply; see the root CLAUDE.md.

## Commands

Run from the monorepo root or with `pnpm --filter forge-docs <script>`:

- `pnpm dev:docs` - Start the Astro dev server (builds workspace dependencies first)
- `pnpm --filter forge-docs build` - Build the static site to `docs/dist`
- `pnpm --filter forge-docs test` - Test the skill build script
- `pnpm --filter forge-docs build:forge-skill` - Generate the Forge Design skill bundle to `docs/skill`

## Astro framework

Use the Astro docs MCP server (`mcp__Astro_docs__search_astro_docs`, registered in the root `.mcp.json`) for any Astro question: syntax, configuration, components, layouts, content collections, MDX, view transitions, SSR/SSG behavior, and integrations. Query it before assuming Astro APIs or patterns.

## Dev server

The user runs the dev server themselves. Never start or stop it to verify changes.

## Forge components & icons

Components and icons used in pages must be registered in `src/scripts/forge-components.ts`: side-effect imports for components (`@tylertech/forge/button`, `@tylertech/forge/app-layout`) and `IconRegistry.define([...])` for icons from `@tylertech/tyler-icons`.

## Styling

Do not write custom CSS. Prefer, in order: a Forge component, a `@tylertech/forge-tailwind` utility class, then a Forge CSS custom property. Custom CSS is only acceptable for `::part()` with no CSS variable, MDX-rendered elements with no class hook, or effects Tailwind can't express.

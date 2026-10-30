# @tylertech/forge-mcp

## 1.4.0

### Features

- a4d4c99: **forge-mcp**: show which `@tylertech/forge` version `validate_component_api` checked against

  Validation results now name the package version and whether it came from the project's install, the latest published release, or the bundled snapshot. When an API is unmatched against an installed version, the response notes that it may have been added in a newer release, rather than presenting it as a typo.

### Bug Fixes

- a4d4c99: **forge-mcp**: default the `generate_ui_plan` template's `page_title` to `text-heading4`, matching the forge-design skill
- a4d4c99: **forge-mcp**: tailor `generate_ui_plan` import guidance to the framework, so Angular projects are told to import `ForgeXModule` from `@tylertech/forge-angular` instead of side-effect imports

## 1.3.2

### Bug Fixes

- 275a834: **forge-mcp**: point `validate_ui_plan` hints at the generated forge-design skill references (`references/design/typography.md`, `references/components/table.md`)

## 1.3.1

### Bug Fixes

- 61e5142: **forge-mcp**: recommend per-component side-effect imports instead of definition functions, and align installation CSS guidance with the Forge docs

## 1.3.0

### Minor Changes

- 201bee2: feat: require Node.js >=20.10 (Node 18 is no longer supported)

  fix: report the package version as the MCP server version instead of a hardcoded `0.1.0`

## 1.2.0

### Minor Changes

- 42986f7: Treat former `@tylertech/forge-extended` components as core Forge components. The bundled manifest and package discovery now only use `@tylertech/forge` (>=3.17.0), and side-effect imports point to `@tylertech/forge/<component>`.

## 1.1.0

### Minor Changes

- 7c38800: Block-first redesign of the Forge MCP server and `forge-design` skill:
  - Add `get_forge_blocks` tool for fetching and listing ready-made Forge UI code blocks, now the canonical source of Forge markup for both single components and larger patterns.
  - Rework `get_component_docs` to surface an API Quick Reference (events, properties, attributes, slots, CSS custom properties) instead of prose usage examples; remove the `usage-examples` resource and redundant reference stubs.
  - Add `generate_ui_plan` and `validate_ui_plan` tools for planning and validating UI composition before code is written.
  - Add a PreToolUse hook and anti-patterns reference that catch common Forge misuse (inline styles, wrong layout components, etc.).
  - Rework the `forge-design` skill around block-first routing with scope detection, consolidated dialog skills, and expanded references.
  - Add caching for Forge tool calls and fix `BLOCKS_BASE_URL`, icon import paths, and block-by-category lookup.

## 1.0.1

### Patch Changes

- 0a8b91d: update forge mode with rules for using forge vs forge-extended
- e847a70: Allow using bundled manifest if package is not installed
- 0a8b91d: fix usage examples for forge extended

## 1.0.0

### Major Changes

- b5eb80a: Initial release

### Minor Changes

- b840f3c: Added a new component API validation tool
- 600d627: Update dependencies
- b840f3c: Added new `validate_component_api` tool
- a15170f: Add support for MCP prompts and added initial `forge_mode` prompt
- 9e79b36: Expose CSS-only classes in component docs and update select usage example

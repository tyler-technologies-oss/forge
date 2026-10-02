# @tylertech/forge-mcp

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

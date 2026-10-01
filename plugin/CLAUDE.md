# Forge Claude Code Plugin

The Claude Code plugin for Tyler Forge (plugin name `forge`, marketplace `tyler-forge`, listed in the root `.claude-plugin/marketplace.json`). It is private and not published to npm; users install it through the marketplace.

## Contents

- `.claude-plugin/plugin.json` and `hooks.json` - plugin manifest and hook registration
- `.mcp.json` - registers the `@tylertech/forge-mcp` server (server name `forge`)
- `skills/forge-design/` - the routing skill and its reference files
- `hooks/` - the write-time (`forge-pretooluse.mjs`) and turn-end (`forge-stop.mjs`) gates
- `tests/` - hook tests

## Rules

- Do not rename the plugin (`forge`), the marketplace (`tyler-forge`), or the MCP server (`forge`). Users' settings store `forge@tyler-forge`, and the hooks match `mcp__plugin_forge_forge__*` tool names.
- Hooks must stay dependency-free: the plugin directory is copied as-is on install.
- Versions in `package.json`, `.claude-plugin/plugin.json`, the root `.claude-plugin/marketplace.json`, and `packages/forge-mcp/package.json` must match. `scripts/sync-version.mjs` copies the forge-mcp version into the others and runs as part of `changeset version`; a test fails if they drift.
- When a forge-mcp tool is renamed, update the hooks and skill references here.

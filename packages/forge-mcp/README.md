# Tyler Forge™ MCP Server

Access Tyler Forge™ web component documentation directly in AI clients. Discover components, generate framework-specific code, validate APIs, and use design tokens correctly.

## Features

- **Version-aware**: Detects your installed Tyler Forge version and provides matching documentation, falling back to the latest published version (fetched from npm) if Forge isn't installed yet, and to a bundled snapshot as a last resort
- **Forge Blocks**: Pre-built UI patterns showing components working together in context (forms, tables, layouts, dashboards)—the canonical source of Forge markup for both single components and larger patterns
- **API Quick Reference**: Component docs lead with exact events, properties, attributes, slots, and CSS custom properties
- **UI Plans**: Generate and validate a machine-checkable plan (scaffold, regions, typography roles, icons) before writing composition-scale markup
- **Component Validation**: Verify generated code against actual component APIs
- **Design Tokens**: Access colors, spacing, typography, and other design tokens
- **Framework Guides**: Setup instructions for Angular, React, Vue, Svelte, and Lit
- **Guardrails (plugin only)**: `PreToolUse`/`Stop` hooks block common anti-patterns (inline styles, hand-rolled layout, skipped validation) as code is written

## Setup

### Claude Code Plugin (Recommended)

The plugin bundles the MCP server with a `/forge-design` skill for expert UI guidance.

**Install:**
```bash
/plugin marketplace add tyler-technologies-oss/forge-mcp
/plugin install forge@tyler-forge
```

**Verify installation:**
```bash
/skills
```

> You may need to restart Claude or run `/reload-skills` if the skill doesn't appear.

**Update the plugin:**
```bash
claude plugin marketplace update tyler-forge
```

**For local development:**
```bash
claude --plugin-dir /path/to/forge-mcp/plugin
```

### Claude Code (MCP Only)

```bash
claude mcp add -t stdio -s [scope] forge -- npx -y @tylertech/forge-mcp@latest
```

> `[scope]` must be `user`, `project`, or `local`. See [Claude Code MCP docs](https://docs.claude.com/en/docs/claude-code/mcp).

### Codex CLI

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.forge]
command = "npx"
args = ["-y", "@tylertech/forge-mcp@latest"]
```

### Gemini CLI

```bash
gemini mcp add -t stdio -s [scope] forge npx -y @tylertech/forge-mcp@latest
```

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"],
      "type": "stdio"
    }
  }
}
```

Or use Command Palette → `MCP: Add Server...` → `Command (stdio)` → enter `npx -y @tylertech/forge-mcp@latest`.

### Claude Desktop

Edit `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"]
    }
  }
}
```

### Remote (Streamable HTTP)

For a centrally-hosted deployment that any MCP-compatible client (Claude.ai, third-party tools, etc.) can reach over a URL instead of spawning the server locally via `npx`, run the Streamable HTTP entrypoint:

```bash
pnpm run build
pnpm run start:http   # listens on PORT (default 3000), serving POST /mcp
```

A `Dockerfile` is included for containerized hosting on any platform that runs a Docker image (Cloud Run, Fly.io, Render, ECS, etc.):

```bash
docker build -t forge-mcp-http .
docker run -p 3000:3000 forge-mcp-http
```

The server is stateless (no `Mcp-Session-Id` is issued; a fresh server/transport pair handles each request), so it scales horizontally with no session affinity required. `GET /healthz` returns `200 ok` for platform health checks.

Once deployed, point any Streamable HTTP-capable client at `https://<your-deployed-url>/mcp`, e.g.:

```json
{
  "mcpServers": {
    "forge": {
      "type": "http",
      "url": "https://<your-deployed-url>/mcp"
    }
  }
}
```

> **Note**: Detection of your locally installed `@tylertech/forge` (see Features above) only works when the server runs on your own machine via stdio, since it inspects your project's `node_modules`. A remotely hosted instance has no access to your local filesystem, so it always falls through to the same latest-published-version fetch (from npm/unpkg) that stdio uses when Forge isn't installed locally yet. If that fetch fails too (e.g. npm/unpkg is unreachable), it falls back to the bundled documentation baked into the deployed build.

## Core Concepts

### Forge Blocks

Blocks are pre-built UI patterns that show Forge components working together in context. They demonstrate real-world scenarios like login forms, data tables, application layouts, and dashboards—complete with proper layout, typography, spacing, and component composition.

**Why use blocks?**
- See how multiple components work together in realistic scenarios
- Handcrafted examples following Forge design system best practices
- Prevent common mistakes and ensure consistent UI patterns

**How to use blocks:**

```
# Search for blocks by functionality
get_forge_blocks(query: "login form")
get_forge_blocks(query: "data table with sorting")

# Find blocks using a specific component
get_forge_blocks(component: "forge-card")
get_forge_blocks(component: "forge-table")

# Browse by category
get_forge_blocks(category: "forms")
get_forge_blocks(category: "application-layout")

# Get full code for a specific block
get_forge_blocks(blockId: "src/blocks/forms/login")
```

### Component Documentation

Access complete API documentation—led by an API Quick Reference showing exact events, properties, attributes, slots, and CSS custom properties—so generated code uses the real API instead of a remembered one.

```
# Full API documentation
get_component_docs(componentName: "forge-dialog")

# Summary overview
get_component_docs(componentName: "forge-dialog", format: "summary")
```

For HTML usage examples, use `get_forge_blocks(component: "forge-dialog")` instead—every component has a dedicated block demonstrating its usage.

### UI Plans

For anything larger than a single component, generate a machine-checkable plan—scaffold block, regions, typography roles, icons—and validate it before any `<forge-*>` markup is written.

```
# Get the plan template and schema/enums to fill in
generate_ui_plan(description: "customer dashboard with a data table and a summary sidebar")

# Validate the composed plan (page_type, regions, block IDs, typography roles, icons, spacing)
validate_ui_plan(plan: { ... })
```

`validate_ui_plan` catches structural mistakes early—illegal typography roles, non-token spacing, block IDs that don't exist, composition rules like "no page_title inside a card"—before you've written any code.

## Capabilities

### Tools

| Tool | Description |
|------|-------------|
| `get_forge_blocks` | Search and retrieve pre-built UI patterns (use FIRST before generating UI code) |
| `get_component_docs` | Get component API documentation (full or summary) |
| `list_components` | Browse all available components |
| `find_components` | Search components by name or functionality |
| `generate_ui_plan` | Get the plan template/schema for composition-scale UI (regions, typography roles, icons) |
| `validate_ui_plan` | Validate a composed UI plan before any markup is written |
| `validate_component_api` | Validate component API usage in generated code |
| `get_design_tokens` | Get design tokens (colors, spacing, typography, etc.) |
| `setup_typography` | Typography setup and usage guidelines |
| `setup_icons` | Icon system installation and usage |
| `find_icons` | Search icons by name or keywords |
| `setup_framework` | Framework-specific setup (Angular, React, Vue, Svelte, Lit) |
| `get_version_migration_guide` | Migration guides between Forge versions |
| `get_usage_guide` | General usage patterns and best practices |

### Resources

| URI | Description |
|-----|-------------|
| `forge://components` | All components overview |
| `forge://component/{tagName}` | Specific component documentation |
| `forge://installation` | Installation guide |
| `forge://usage` | Usage guide |
| `forge://framework/{name}` | Framework guides (angular, react, vue, svelte, lit) |
| `forge://design-tokens` | All design tokens |
| `forge://design-tokens/{category}` | Token categories (color, spacing, typography, animation, border, elevation, shape, layering) |
| `forge://icons` | Icons guide |

### Prompts

| Prompt | Description |
|--------|-------------|
| `forge_mode` | Sets baseline rules for Forge-specific tasks |

## Recommended Workflow

1. **Search blocks first** — Before writing any Forge UI code, call `get_forge_blocks` to find pre-built patterns and component-specific usage examples
2. **Check component API** — Use `get_component_docs` for full API details when needed
3. **Plan larger UIs** — For anything bigger than a single component, call `generate_ui_plan` then `validate_ui_plan`; only write markup once the plan validates
4. **Validate before finalizing** — Call `validate_component_api` to verify your code uses correct APIs

## Development

**Commands:**
```bash
pnpm run dev    # Watch mode
pnpm run debug  # Test with MCP inspector
pnpm run build  # Build for production
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Issues and PRs welcome.

## License

Apache-2.0 License - see [LICENSE](LICENSE) file for details.

---

> **Note**: Always validate AI output against [official documentation](https://forge.tylerdev.io).

**Part of the [Tyler Technologies](https://tylerforge.design) Open Source initiative**

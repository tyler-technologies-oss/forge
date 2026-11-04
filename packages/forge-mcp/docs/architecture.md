# Forge MCP — Architecture & Workflow

How the Claude Code plugin (skill + hooks) and the `forge-mcp` MCP server work together to ground Forge UI generation in real component/block data.

## 1. System map

Three moving parts, distributed across two packages:

- **`plugin/`** — the Claude Code plugin: registers the MCP server, ships the `forge-design` skill (routing/rules), and two enforcement hooks.
- **`src/`** — the `forge-mcp` MCP server itself: resources, tools, and the services/templates that back them.
- **Claude (the model)** — the consumer, driven by the skill's instructions and gated by the hooks.

```mermaid
flowchart TB
    subgraph CC["Claude Code"]
        MODEL["Claude<br/>(model + harness)"]
    end

    subgraph PLUGIN["plugin/ (Claude Code plugin)"]
        MCPJSON[".mcp.json<br/>registers the server"]
        SKILL["skills/forge-design/SKILL.md<br/>workflow ladder + rules"]
        REFS["skills/forge-design/references/*.md<br/>topic files (forms, tables, layout, a11y, ...)"]
        PRETOOL["hooks/forge-pretooluse.mjs<br/>PreToolUse: Edit/Write/MultiEdit"]
        STOP["hooks/forge-stop.mjs<br/>Stop hook"]
    end

    subgraph SERVER["src/ (forge-mcp server)"]
        ENTRY["src/index.ts, src/server.ts<br/>stdio entrypoint"]
        CORE["src/core/server.ts<br/>createForgeDocsServer"]
        RH["ResourcesHandler"]
        TH["ToolsHandler"]
        PH["PromptsHandler"]
        REG["ToolRegistry<br/>+ ToolCallCache"]

        subgraph TOOLS["14 registered tools"]
            T_PLAN["generate_ui_plan<br/>validate_ui_plan"]
            T_BLOCKS["get_forge_blocks"]
            T_COMP["get_component_docs<br/>list_components<br/>find_components<br/>validate_component_api"]
            T_DS["get_design_tokens<br/>find_icons<br/>setup_typography<br/>setup_icons"]
            T_SETUP["setup_framework<br/>get_usage_guide<br/>get_version_migration_guide"]
        end

        subgraph SERVICES["Services"]
            CEM["CEMLoader<br/>(custom-elements.json)"]
            BLOCKSVC["BlocksManifestService<br/>BundledManifestLoader"]
            APIVAL["ApiValidationService"]
            ICONSVC["IconSearchService"]
            TEMPLATE["HandlebarsTemplateEngine"]
            DISCOVERY["ProjectDiscovery<br/>PackageDiscovery"]
        end

        TEMPLATES["templates/*.md<br/>(Handlebars)"]
        RESOURCES["8 core resources<br/>(component docs/briefs/summaries)"]
    end

    MODEL -->|"loads on trigger<br/>(Forge keywords)"| SKILL
    SKILL --> REFS
    MODEL -->|"MCP tool calls"| REG
    MCPJSON -.->|"npx @tylertech/forge-mcp@next"| ENTRY

    ENTRY --> CORE
    CORE --> RH
    CORE --> TH
    CORE --> PH
    TH --> REG
    REG --> TOOLS
    RH --> RESOURCES

    T_PLAN --> CEM
    T_PLAN --> BLOCKSVC
    T_BLOCKS --> BLOCKSVC
    T_COMP --> CEM
    T_COMP --> APIVAL
    T_DS --> ICONSVC
    T_SETUP --> DISCOVERY

    TOOLS --> TEMPLATE
    TEMPLATE --> TEMPLATES
    RESOURCES --> TEMPLATE

    MODEL -->|"Edit / Write / MultiEdit"| PRETOOL
    PRETOOL -->|"exit 2 = block<br/>(missing get_forge_blocks / validate_ui_plan,<br/>or content anti-pattern)"| MODEL
    MODEL -->|"attempts to end turn"| STOP
    STOP -->|"exit 2 = block<br/>(forge tag written,<br/>never validate_component_api'd)"| MODEL
```

## 2. Request flow — building Forge UI

The skill's numbered ladder (`SKILL.md` steps 0–7), showing where each hook intervenes.

```mermaid
sequenceDiagram
    actor U as User
    participant M as Claude
    participant SK as forge-design skill
    participant MCP as forge-mcp tools
    participant PRE as PreToolUse hook
    participant STOP as Stop hook

    U->>M: "Build a dashboard with a table and a form"
    M->>SK: Trigger match (Forge keywords)
    SK->>M: Route: full app → Step 1 (layout), else Step 2 (clarify)

    M->>MCP: generate_ui_plan(description)
    MCP-->>M: plan template (scaffold, regions, typography, icons)
    M->>MCP: validate_ui_plan(plan)
    alt invalid
        MCP-->>M: valid: false + errors
        M->>MCP: fix + re-validate
    end
    MCP-->>M: valid: true

    M->>MCP: get_forge_blocks(component / query)
    MCP-->>M: structural HTML pattern
    M->>MCP: get_component_docs(component, format: summary)
    MCP-->>M: API contract (slots/attrs/events/CSS parts)

    M->>PRE: Edit/Write markup (<forge-*> tags)
    PRE->>PRE: was get_forge_blocks called this turn?<br/>did validate_ui_plan pass (if composition-scale)?<br/>any anti-pattern regex hits?
    alt gate fails
        PRE-->>M: exit 2 + reason, write blocked
        M->>MCP: (fetch missing block / plan, retry)
    else gate passes
        PRE-->>M: exit 0, write allowed
    end

    M->>MCP: validate_component_api(component, apis)
    MCP-->>M: pass/fail per API surface

    M->>STOP: attempt to end turn
    STOP->>STOP: every written <forge-*> tag validated this turn?
    alt missing validation
        STOP-->>M: exit 2, list missing tags (max 2 retries)
        M->>MCP: validate_component_api(missing tag)
    else all validated
        STOP-->>M: exit 0, turn ends
    end

    M->>U: Rendered Forge UI
```

## Key files

| Piece | Path |
|---|---|
| MCP server registration | `plugin/.mcp.json` |
| Skill (routing/rules) | `plugin/skills/forge-design/SKILL.md` |
| Skill reference files | `plugin/skills/forge-design/references/*.md` |
| Write-time gate | `plugin/hooks/forge-pretooluse.mjs` |
| Turn-end gate | `plugin/hooks/forge-stop.mjs` |
| Hook registration | `plugin/.claude-plugin/hooks.json` |
| Server entrypoint | `src/index.ts`, `src/server.ts` |
| Handler wiring | `src/core/server.ts` |
| Tool registry + cache | `src/tools/tool-registry.ts`, `src/services/tool-call-cache.ts` |
| Tool registration | `src/tools/index.ts` |
| Resource registration | `src/resources/index.ts` |
| Templates | `templates/**/*.md` |

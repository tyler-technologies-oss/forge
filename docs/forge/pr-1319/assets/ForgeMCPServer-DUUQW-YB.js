import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-BjnIcTYW.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Forge MCP Server`}),`
`,(0,c.jsx)(n.h1,{id:`forge-mcp-server`,children:`Forge MCP Server`}),`
`,(0,c.jsx)(`div`,{class:`banner banner--warn`,children:(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Important`}),`: Always validate AI-generated code and information for accuracy. LLMs can make assumptions and mistakes.`]})}),`
`,(0,c.jsx)(n.p,{children:`The Tyler Forge™ MCP Server provides AI clients with direct access to Forge component documentation, design tokens, and code generation capabilities.
It helps developers discover components, generate framework-specific examples, and follow best practices while building with Forge.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Key Principle`}),`: While the MCP server significantly enhances AI assistance, always verify generated code, validate component usage, and test
implementations thoroughly.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`quick-setup`,children:`Quick Setup`}),`
`,(0,c.jsx)(n.p,{children:`Get started with the Tyler Forge™ MCP server in your AI client:`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`The Tyler Forge™ MCP server is currently available as a stdio server only, and requires Node.js >=20.10 and npm to be installed on your system.`}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`claude-code-plugin-recommended`,children:`Claude Code Plugin (Recommended)`}),`
`,(0,c.jsxs)(n.p,{children:[`For Claude Code, installing the `,(0,c.jsx)(n.strong,{children:`Forge plugin`}),` is the recommended approach instead of adding the MCP server on its own. The plugin bundles the MCP server together with a `,(0,c.jsx)(n.code,{children:`/forge-design`}),` skill and enforcement hooks, so Forge UI is grounded in real component/block data end-to-end rather than relying on the model's memory.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`/plugin marketplace add tyler-technologies-oss/forge
/plugin install forge@tyler-forge
`})}),`
`,(0,c.jsx)(n.p,{children:`Verify it installed correctly:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`/skills
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`You may need to restart Claude Code or run `,(0,c.jsx)(n.code,{children:`/reload-skills`}),` if the skill doesn't appear.`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Update the plugin later with:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`claude plugin marketplace update tyler-forge
`})}),`
`,(0,c.jsx)(n.h4,{id:`why-the-plugin-over-the-mcp-server-alone`,children:`Why the plugin over the MCP server alone`}),`
`,(0,c.jsxs)(n.p,{children:[`The MCP server (`,(0,c.jsx)(n.code,{children:`@tylertech/forge-mcp`}),`) is fully standalone and works with any MCP client — it exposes tools like `,(0,c.jsx)(n.code,{children:`get_forge_blocks`}),`, `,(0,c.jsx)(n.code,{children:`generate_ui_plan`}),`, `,(0,c.jsx)(n.code,{children:`validate_ui_plan`}),`, and `,(0,c.jsx)(n.code,{children:`validate_component_api`}),` with no dependency on the skill or hooks. It's the grounding data source for Forge components, blocks, and design tokens.`]}),`
`,(0,c.jsx)(n.p,{children:`The Claude Code plugin adds two more pieces on top of that server:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`The `,(0,c.jsx)(n.code,{children:`forge-design`}),` skill`]}),` — a workflow/ruleset (not a standalone knowledge base) that tells the agent when to call `,(0,c.jsx)(n.code,{children:`get_forge_blocks`}),`, `,(0,c.jsx)(n.code,{children:`generate_ui_plan`}),`, `,(0,c.jsx)(n.code,{children:`validate_ui_plan`}),`, and `,(0,c.jsx)(n.code,{children:`validate_component_api`}),`, and enforces rules like "start from a block" and "never write Forge markup from memory."`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Enforcement hooks`}),` — a `,(0,c.jsx)(n.code,{children:`PreToolUse`}),` hook blocks any `,(0,c.jsx)(n.code,{children:`Edit`}),`/`,(0,c.jsx)(n.code,{children:`Write`}),` containing `,(0,c.jsx)(n.code,{children:`<forge-*>`}),` markup unless a `,(0,c.jsx)(n.code,{children:`get_forge_blocks`}),` call (and, for larger compositions, a passing `,(0,c.jsx)(n.code,{children:`validate_ui_plan`}),` call) already happened earlier in the same turn. A `,(0,c.jsx)(n.code,{children:`Stop`}),` hook blocks the turn from ending if any Forge tag was written but never checked with `,(0,c.jsx)(n.code,{children:`validate_component_api`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`Because the hooks scan the transcript specifically for MCP tool-call names, they only work when the MCP server is present — installing the skill without the MCP server would make it actively harmful (it would deadlock every Forge markup write, since the required tool calls could never appear). The plugin installs all three pieces together so this can't happen, which is why it's the recommended path for Claude Code specifically.`}),`
`,(0,c.jsx)(n.p,{children:`If you're using an AI client other than Claude Code, install the MCP server directly instead — see below.`}),`
`,(0,c.jsx)(n.h3,{id:`claude-code-mcp-server-only`,children:`Claude Code (MCP Server Only)`}),`
`,(0,c.jsx)(n.p,{children:`Use this if you want just the grounding data source without the skill/hook workflow (for example, wiring the server into a custom agent or client):`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`claude mcp add -t stdio -s [scope] forge -- npx -y @tylertech/forge-mcp@latest
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`[scope]`}),` must be `,(0,c.jsx)(n.code,{children:`user`}),`, `,(0,c.jsx)(n.code,{children:`project`}),` or `,(0,c.jsx)(n.code,{children:`local`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`codex-cli`,children:`Codex CLI`}),`
`,(0,c.jsxs)(n.p,{children:[`Add the following to your `,(0,c.jsx)(n.code,{children:`config.toml`}),` (which defaults to `,(0,c.jsx)(n.code,{children:`~/.codex/config.toml`}),`, but refer to the configuration documentation for more advanced setups):`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-toml`,children:`[mcp_servers.forge]
command = "npx"
args = ["-y", "@tylertech/forge-mcp@latest"]
`})}),`
`,(0,c.jsx)(n.h3,{id:`gemini-cli`,children:`Gemini CLI`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`gemini mcp add -t stdio -s [scope] forge npx -y @tylertech/forge-mcp@latest
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`[scope]`}),` must be `,(0,c.jsx)(n.code,{children:`user`}),`, `,(0,c.jsx)(n.code,{children:`project`}),` or `,(0,c.jsx)(n.code,{children:`local`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`vs-code`,children:`VS Code`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Open the Command Palette (`,(0,c.jsx)(n.code,{children:`Cmd+Shift+P`}),` or `,(0,c.jsx)(n.code,{children:`Ctrl+Shift+P`}),`)`]}),`
`,(0,c.jsxs)(n.li,{children:[`Choose `,(0,c.jsx)(n.code,{children:`MCP: Add Server...`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Choose `,(0,c.jsx)(n.code,{children:`Command (stdio)`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Enter `,(0,c.jsx)(n.code,{children:`npx -y @tylertech/forge-mcp@latest`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Name the server `,(0,c.jsx)(n.code,{children:`forge`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Choose if you want to use it as a `,(0,c.jsx)(n.code,{children:`Global`}),` or `,(0,c.jsx)(n.code,{children:`Workspace`}),` MCP server`]}),`
`]}),`
`,(0,c.jsx)(n.h4,{id:`manual-configuration`,children:`Manual Configuration`}),`
`,(0,c.jsxs)(n.p,{children:[`Create `,(0,c.jsx)(n.code,{children:`.vscode/mcp.json`}),`:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-json`,children:`{
  "servers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"],
      "type": "stdio"
    }
  }
}
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Note`}),`: You may need to manually start the MCP server after updating your configuration.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`claude-desktop`,children:`Claude Desktop`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Open `,(0,c.jsx)(n.code,{children:`Settings`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Choose `,(0,c.jsx)(n.code,{children:`Developer`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Click on `,(0,c.jsx)(n.code,{children:`Edit Config`})]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`This will open your file explorer to the directory where the `,(0,c.jsx)(n.code,{children:`claude_desktop_config.json`}),` file lives. Edit the file to include the following configuration:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-json`,children:`{
  "mcpServers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"]
    }
  }
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`using-the-forge-mcp-server`,children:`Using the Forge MCP Server`}),`
`,(0,c.jsx)(n.p,{children:`Once the Forge MCP server is set up in your AI client, you can start interacting with it using natural language prompts.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`If you installed the Claude Code plugin, the `,(0,c.jsx)(n.code,{children:`forge-design`}),` skill auto-activates whenever you mention Forge components or ask to build UI with them — you don't need to manually select the `,(0,c.jsx)(n.code,{children:`forge_mode`}),` prompt below.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`prompts`,children:`Prompts`}),`
`,(0,c.jsx)(n.p,{children:`Prompts are selected by the user and are sent as a message. They can be used to provide common instructions/rules to guide LLMs on how to properly use the MCP server.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`You can activate prompts in your AI client (if supported) by specifying the prompt name, typically via a slash command, or via prompt selection UI.`}),`
`]}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`forge_mode`}),`: Sets baseline rules when running Forge-specific task.`]}),`
`,(0,c.jsxs)(n.p,{children:[`This prompt accepts a `,(0,c.jsx)(n.code,{children:`[task]`}),` parameter where you can describe your specific request/query. This helps guide the LLM to use the correct MCP
server tools, as well as includes some rules and best practices when outputting Tyler Forge-related code.`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Learn more about MCP prompts `,(0,c.jsx)(n.a,{href:`https://modelcontextprotocol.io/specification/2025-06-18/server/prompts`,rel:`nofollow`,children:`here`}),`.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`essential-tools`,children:`Essential Tools`}),`
`,(0,c.jsx)(n.p,{children:`The MCP server provides these key capabilities:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Blocks`}),`: `,(0,c.jsx)(n.code,{children:`get_forge_blocks`}),` — pre-built UI patterns showing components working together; call this before writing any Forge markup`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Component Discovery`}),`: `,(0,c.jsx)(n.code,{children:`list_components`}),`, `,(0,c.jsx)(n.code,{children:`find_components`}),`, `,(0,c.jsx)(n.code,{children:`get_component_docs`}),`, `,(0,c.jsx)(n.code,{children:`find_icons`})]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`UI Planning`}),`: `,(0,c.jsx)(n.code,{children:`generate_ui_plan`}),`, `,(0,c.jsx)(n.code,{children:`validate_ui_plan`}),` — plan and validate larger compositions before generating markup`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Design System Access`}),`: `,(0,c.jsx)(n.code,{children:`get_design_tokens`}),`, `,(0,c.jsx)(n.code,{children:`setup_typography`}),`, `,(0,c.jsx)(n.code,{children:`setup_icons`})]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Framework Integration`}),`: `,(0,c.jsx)(n.code,{children:`setup_framework`}),` for Angular, React, Vue, etc.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Migration Guidance`}),`: `,(0,c.jsx)(n.code,{children:`get_version_migration_guide`})]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Validation`}),`: `,(0,c.jsx)(n.code,{children:`validate_component_api`})]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Usage Guidance`}),`: `,(0,c.jsx)(n.code,{children:`get_usage_guide`})]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Be Specific`}),`: Ask for specific components or use cases rather than general questions`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Validate Output`}),`: Always review and test AI-generated code before implementation`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Provide Context`}),`: Include your framework, version constraints, and specific requirements`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Break Down Complex Queries`}),`: Split large requests into smaller, focused questions`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Cross-Reference Documentation`}),`: Use the MCP server alongside official Forge documentation`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Manage Context`}),`: For lengthy conversations, periodically compact or clear context to maintain relevance.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`example-usage`,children:`Example Usage`}),`
`,(0,c.jsx)(n.p,{children:`To get started with the Forge MCP server, try these example prompts to explore its capabilities:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:`"What forge components should I use to create a navigation sidebar?"

"Find components for creating a responsive form in React."

"Help me add a forge data table with sorting, filtering, and pagination to this page."

"Help me upgrade this page from Forge v2 to v3."
`})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Important`}),`: The above prompts are just basic examples to get started. Tailor your queries to your needs and context, and `,(0,c.jsx)(n.strong,{children:`be specific`}),`. If you
know what you need and can provide details to guide the LLM, do so. The more information you provide, the better the results.`]}),`
`,(0,c.jsx)(n.h2,{id:`contributing`,children:`Contributing`}),`
`,(0,c.jsx)(n.p,{children:`Found issues or have suggestions? The Tyler Forge™ MCP Server is open source and welcomes contributions:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Repository`}),`: `,(0,c.jsx)(n.a,{href:`https://github.com/tyler-technologies-oss/forge`,rel:`nofollow`,children:`tyler-technologies-oss/forge`}),` (`,(0,c.jsx)(n.code,{children:`packages/forge-mcp`}),`)`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Issues`}),`: Report bugs and request features`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Pull Requests`}),`: Submit code changes and enhancements`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Discussions`}),`: Share best practices, usage patterns, and improvements`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`documentation`,children:`Documentation`}),`
`,(0,c.jsxs)(n.p,{children:[`The MCP server will only be as good as its documentation. If you find gaps or areas for improvement, please contribute to the docs via the MCP
`,(0,c.jsx)(n.a,{href:`https://github.com/tyler-technologies-oss/forge/tree/main/packages/forge-mcp/templates`,rel:`nofollow`,children:`markdown templates`}),`, or directly in the `,(0,c.jsx)(n.a,{href:`https://github.com/tyler-technologies-oss/forge`,rel:`nofollow`,children:`Forge repository`}),`
where the API docs are generated from.`]}),`
`,(0,c.jsx)(n.h2,{id:`resources`,children:`Resources`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://modelcontextprotocol.io/docs/getting-started/intro`,rel:`nofollow`,children:`What is the Model Context Protocol (MCP)?`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://code.visualstudio.com/docs/copilot/customization/mcp-servers`,rel:`nofollow`,children:`VS Code MCP documentation`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://docs.claude.com/en/docs/claude-code/mcp`,rel:`nofollow`,children:`Claude Code MCP documentation`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop`,rel:`nofollow`,children:`Claude Desktop MCP documentation`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`https://docs.claude.com/en/docs/claude-code/plugins`,rel:`nofollow`,children:`Claude Code plugins documentation`})}),`
`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};
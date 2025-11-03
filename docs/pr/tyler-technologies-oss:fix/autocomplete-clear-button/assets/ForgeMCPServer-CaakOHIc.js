import{j as e,M as t}from"./blocks-BA-X6Qjv.js";import{useMDXComponents as o}from"./index-Dqet-JBa.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DFzVZZcU.js";function r(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Getting Started/Forge MCP Server",tags:["experimental"]}),`
`,e.jsx(n.h1,{id:"forge-mcp-server",children:"Forge MCP Server"}),`
`,e.jsxs("div",{class:"banner banner--warn",children:[e.jsxs(n.p,{children:["🚧 ",e.jsx(n.strong,{children:"Experimental"})," 🚧"]}),e.jsx(n.p,{children:"The Tyler Forge™ MCP Server is experimental and currently in developer preview. Please use it and provide feedback to help us improve it."}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important"}),": Always validate AI-generated code and information for accuracy. LLMs can make assumptions and mistakes."]})]}),`
`,e.jsx(n.p,{children:`The Tyler Forge™ MCP Server provides AI clients with direct access to Forge component documentation, design tokens, and code generation capabilities.
This experimental tool helps developers discover components, generate framework-specific examples, and follow best practices while building with Forge.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Key Principle"}),`: While the MCP server significantly enhances AI assistance, always verify generated code, validate component usage, and test
implementations thoroughly.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"quick-setup",children:"Quick Setup"}),`
`,e.jsx(n.p,{children:"Get started with the Forge MCP server in your AI client:"}),`
`,e.jsx(n.h3,{id:"claude-code",children:"Claude Code"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`claude mcp add forge -- npx -y @tylertech/forge-mcp@latest
`})}),`
`,e.jsx(n.h3,{id:"vs-code",children:"VS Code"}),`
`,e.jsx(n.h4,{id:"command-palette",children:"Command Palette"}),`
`,e.jsxs(n.p,{children:["Open the Command Palette (",e.jsx(n.code,{children:"Cmd+Shift+P"})," or ",e.jsx(n.code,{children:"Ctrl+Shift+P"}),") and run ",e.jsx(n.code,{children:"MCP: Add Server..."})," and follow the instructions to add the ",e.jsx(n.code,{children:"@tylertech/forge-mcp"})," npm package."]}),`
`,e.jsx(n.h4,{id:"manual-configuration",children:"Manual Configuration"}),`
`,e.jsxs(n.p,{children:["Create ",e.jsx(n.code,{children:".vscode/mcp.json"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "servers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"],
      "type": "stdio"
    }
  }
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": You may need to manually start the MCP server after updating your configuration."]}),`
`]}),`
`,e.jsx(n.h3,{id:"claude-desktop",children:"Claude Desktop"}),`
`,e.jsx(n.p,{children:"Add to your Claude Desktop configuration:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "mcpServers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"]
    }
  }
}
`})}),`
`,e.jsx(n.h2,{id:"essential-tools",children:"Essential Tools"}),`
`,e.jsx(n.p,{children:"The MCP server provides these key capabilities:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Component Discovery"}),": ",e.jsx(n.code,{children:"list_components"}),", ",e.jsx(n.code,{children:"find_components"}),", ",e.jsx(n.code,{children:"get_component_docs"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Design System Access"}),": ",e.jsx(n.code,{children:"get_design_tokens"}),", ",e.jsx(n.code,{children:"setup_typography"}),", ",e.jsx(n.code,{children:"setup_icons"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Framework Integration"}),": ",e.jsx(n.code,{children:"setup_framework"})," for Angular, React, Vue, etc."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Migration Guidance"}),": ",e.jsx(n.code,{children:"get_version_migration_guide"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Be Specific"}),": Ask for specific components or use cases rather than general questions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Validate Output"}),": Always review and test AI-generated code before implementation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Provide Context"}),": Include your framework, version constraints, and specific requirements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Break Down Complex Queries"}),": Split large requests into smaller, focused questions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-Reference Documentation"}),": Use the MCP server alongside official Forge documentation"]}),`
`]}),`
`,e.jsx(n.h2,{id:"example-usage",children:"Example Usage"}),`
`,e.jsx(n.p,{children:"To get started with the Forge MCP server, try these example prompts to explore its capabilities:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`"What forge components should I use to create a navigation sidebar?"

"Find components for creating a responsive form in React."

"Help me add a forge data table with sorting, filtering, and pagination to this page."

"Help me upgrade this page from Forge v2 to v3."
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important"}),": The above prompts are just basic examples to get started. Tailor your queries to your needs and context, and ",e.jsx(n.strong,{children:"be specific"}),`. If you
know what you need and can provide details to guide the LLM, do so. The more information you provide, the better the results.`]}),`
`,e.jsx(n.h2,{id:"contributing",children:"Contributing"}),`
`,e.jsx(n.p,{children:"Found issues or have suggestions? The Tyler Forge™ MCP Server is open source and welcomes contributions:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Repository"}),": ",e.jsx(n.a,{href:"https://github.com/tyler-technologies-oss/forge-mcp",rel:"nofollow",children:"tyler-technologies-oss/forge-mcp"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issues"}),": Report bugs and request features"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pull Requests"}),": Submit code changes and enhancements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Discussions"}),": Share best practices, usage patterns, and improvements"]}),`
`]}),`
`,e.jsx(n.h3,{id:"documentation",children:"Documentation"}),`
`,e.jsxs(n.p,{children:[`The MCP server will only be as good as its documentation. If you find gaps or areas for improvement, please contribute to the docs via the MCP
`,e.jsx(n.a,{href:"https://github.com/tyler-technologies-oss/forge-mcp/tree/main/templates",rel:"nofollow",children:"markdown templates"}),", or directly in the ",e.jsx(n.a,{href:"https://github.com/tyler-technologies-oss/forge",rel:"nofollow",children:"Forge repository"}),`
where the API docs are generated from.`]}),`
`,e.jsx(n.h2,{id:"resources",children:"Resources"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://modelcontextprotocol.io/docs/getting-started/intro",rel:"nofollow",children:"What is the Model Context Protocol (MCP)?"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://code.visualstudio.com/docs/copilot/customization/mcp-servers",rel:"nofollow",children:"VS Code MCP documentation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://docs.claude.com/en/docs/claude-code/mcp",rel:"nofollow",children:"Claude Code MCP documentation"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop",rel:"nofollow",children:"Claude Desktop MCP documentation"})}),`
`]})]})}function h(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{h as default};

# Tyler Forge MCP Server

An MCP (Model Context Protocol) server that helps AI coding assistants understand and implement Tyler Technologies' Forge design system components correctly.

## Overview

This MCP server provides comprehensive access to the Tyler Forge design system, enabling AI assistants like Claude to:

- 🎨 Understand all Forge components and their APIs
- 🚀 Generate framework-specific component code
- 📚 Access complete documentation and examples
- ♿ Follow accessibility best practices
- 🎯 Suggest appropriate components for use cases

## Features

### Resources (Information Access)

- **Component Listing**: Browse all available Forge components organized by category
- **Component Details**: Get complete API information including props, events, slots, and CSS variables  
- **Documentation**: Access full MDX documentation for each component
- **Design Tokens**: Reference colors, typography, spacing, and other design system tokens
- **Examples**: Find real-world usage examples from stories and dev pages

### Tools (Code Generation)

- **Generate Component**: Create ready-to-use component code for React, Angular, Vue, or vanilla JS
- **Find Examples**: Discover usage patterns and examples for specific components
- **Suggest Components**: Get recommendations based on your use case description
- **Check Accessibility**: Ensure components meet WCAG guidelines

## Installation

```bash
# Clone the repository
git clone https://github.com/tyler-technologies-oss/forge.git
cd forge/forge-mcp-server

# Install dependencies
npm install

# Build the server
npm run build
```

## Usage

### With Claude Desktop

Add the server to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "forge": {
      "command": "node",
      "args": ["/path/to/forge/forge-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### With Other MCP Clients

```bash
# Run the server directly
node dist/index.js

# Or use npm script
npm start
```

## Example Usage in Claude

### Get Component Information
```
Can you show me the Button component from Forge?
```

### Generate React Component
```
Generate a React component using Forge Button with:
- Raised variant
- Primary theme
- Icon in the start slot
- Click handler
```

### Find Examples
```
Show me examples of using the Forge Dialog component
```

### Get Accessibility Guidelines
```
What are the accessibility requirements for Forge Select component?
```

## Supported Frameworks

- ✅ **Vanilla JavaScript/TypeScript** (Web Components)
- ✅ **React** (via @tylertech/forge-react)
- ✅ **Angular** (via @tylertech/forge-angular)
- ✅ **Vue** (Web Components with guides)
- ✅ **Svelte** (Web Components with guides)
- ✅ **Blazor** (Web Components with guides)

## Component Categories

- **Inputs**: text-field, select, checkbox, radio, switch, slider, date-picker, etc.
- **Buttons**: button, icon-button, floating-action-button, split-button
- **Navigation**: app-bar, drawer, tabs, stepper, paginator
- **Layout**: scaffold, card, accordion, divider, stack
- **Feedback**: dialog, toast, banner, tooltip, popover
- **Data Display**: table, list, avatar, badge, chip
- **Progress**: linear-progress, circular-progress, skeleton

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Watch for changes
npm run watch
```

## Architecture

The server is organized into:

- **Resources**: Read-only access to component information and documentation
- **Tools**: Active code generation and assistance functions
- **Adapters**: Framework-specific code generators
- **Parser**: MDX and TypeScript documentation extraction
- **Utils**: Shared utilities and type definitions

## Benefits

- 🎯 **Accurate Implementation**: Generate correct component code on the first try
- 🔄 **Framework Agnostic**: Support for all major frameworks
- 📖 **Complete Documentation**: Access to all component APIs and guidelines
- ♿ **Accessibility First**: Built-in accessibility best practices
- 🚀 **Productivity Boost**: Reduce time looking up documentation
- 🎨 **Design Consistency**: Ensure proper use of design tokens

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

Apache-2.0 © Tyler Technologies

## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/tyler-technologies-oss/forge/issues)
- Check the [Forge Documentation](https://forge.tylerdev.io/)
- Visit [Tyler Forge Design System](https://forge.tylertech.com/)
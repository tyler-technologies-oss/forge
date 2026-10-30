# @tylertech/forge-plugin

## 1.5.0

### Documentation

- afe63da: **structured-card**: add structured card component guidance, and drop anatomy diagram markup from the forge-design skill
- 25b6854: **app-bar**: point the profile section at forge-user-profile instead of the deprecated profile button
- 6811a90: **designing**: mark the color, getting started, iconography, and typography design guides as stable
- ad39d3e: **mcp-server**: fix the plugin marketplace source and document enabling auto-update
- ad39d3e: **mcp-server**: document the experimental remote MCP server
- 6811a90: **designing**: present the spacing don'ts as a single Don't list, note the adjustable app layout breakpoint, and link the layout patterns to their blocks
- 25b6854: **tree**: point the basic usage example at the tree demo block

## 1.4.1

### Documentation

- a4d4c99: **dialog**: prefer `labelledby` and `describedby` for labeling, note `label` and `description` for Forge versions before 3.24.0, and show how to handle the confirmation dialog's result

## 1.4.0

### Features

- 275a834: **plugin**: generate the forge-design skill from the Forge docs site

  The skill is now built from the docs site's component, design, and developer guide pages, so it stays in sync with the documentation and covers every component. The plugin is also versioned on its own, so skill updates reach users without waiting for a forge-mcp release.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Workflow
- `pnpm install` - Install dependencies
- `pnpm run build` - Compile TypeScript to dist/ and bundle manifests

### Code Quality
- `pnpm run lint` - Run ESLint to check code quality
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check if code is properly formatted

### Testing
- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

### Versioning & Release

When releasing a new version, update the version number in all three files:
- `package.json`
- `plugin/.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

### Data Flow

1. Server initialization loads CEM data from filesystem
2. **Optimized Resource Listing**: Returns streamlined set of 8 core resources plus individual components
3. **Consolidated Resource Reading**: Generates markdown documentation with intelligent consolidation
4. **Tool-Based Granular Access**: Tools provide filtered access to specific sections when needed

### Key Patterns

- **Singleton Services**: All services (ResourceManager, CEMLoader, TemplateEngine) use singleton pattern
- **Async Initialization**: ResourceManager.initialize() must be called before use
- **URI Validation**: All resource URIs validated before processing

### TypeScript Configuration

- ES modules (`"type": "module"` in package.json)
- Compiled output goes to `dist/`
- Uses `.js` extensions in imports for ES module compatibility

### Resource Templates

Templates are located in the `/templates/` directory, and written in markdown with optional Handlebars syntax.

## Guidelines for Claude

When suggesting code changes or additions, please adhere to the following guidelines:
- DO NOT run the debug command to test changes, only run the build command.
- Always use pnpm to run commands. DO NOT use npm or pntml
- DO NOT generate fallback content for tools unless instructed otherwise.
- ALWAYS run pnpm format before finalizing changes to ensure consistent formatting.
- When renaming tools or resources, ensure all references are updated accordingly.
- Avoid introducing new dependencies unless absolutely necessary.
- Avoid rendering markdown directly in the code unless its small snippets. Prefer templates instead.

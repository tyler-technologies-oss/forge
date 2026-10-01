// Base interfaces and registry
export * from './tool-handler.js';
export * from './tool-registry.js';

// Component tools
export * from './components/get-component-docs-tool.js';
export * from './components/list-components-tool.js';
export * from './components/find-components-tool.js';
export * from './components/validate-component-api-tool.js';

// Usage and framework tools
export * from './usage/get-usage-guide-tool.js';
export * from './framework/setup-framework-tool.js';

// Migration tools
export * from './migrate/index.js';

// Design system tools
export * from './design-system/get-design-tokens-tool.js';
export * from './design-system/setup-typography-tool.js';
export * from './design-system/setup-icons-tool.js';
export * from './design-system/find-icons-tool.js';

// Blocks tools
export * from './blocks/index.js';

// Plan tools
export * from './plan/index.js';

// Registry factory function
import { ToolRegistry } from './tool-registry.js';

// Component tools
import { ComponentDocumentationTool } from './components/get-component-docs-tool.js';
import { ListComponentsTool } from './components/list-components-tool.js';
import { SearchComponentsTool } from './components/find-components-tool.js';
import { ValidateComponentApiTool } from './components/validate-component-api-tool.js';

// Design system tools
import { DesignTokensTool } from './design-system/get-design-tokens-tool.js';
import { TypographySetupTool } from './design-system/setup-typography-tool.js';
import { IconsGuideTool } from './design-system/setup-icons-tool.js';
import { FindIconsTool } from './design-system/find-icons-tool.js';

// Usage and framework tools
import { UsageGuideTool } from './usage/get-usage-guide-tool.js';
import { FrameworkSetupTool } from './framework/setup-framework-tool.js';

// Migration tools
import { VersionMigrationTool } from './migrate/get-version-migration-tool.js';

// Blocks tools
import { GetBlocksTool } from './blocks/get-blocks-tool.js';

// Plan tools
import { GenerateUIPlanTool } from './plan/generate-ui-plan-tool.js';
import { ValidateUIPlanTool } from './plan/validate-ui-plan-tool.js';

/**
 * Create and configure the default tool registry with all available tools
 */
export function createToolRegistry(): ToolRegistry {
  const registry = new ToolRegistry();

  // Register component tools
  registry.register(new ComponentDocumentationTool());
  registry.register(new ListComponentsTool());
  registry.register(new SearchComponentsTool());
  registry.register(new ValidateComponentApiTool());

  // Register design system tools
  registry.register(new DesignTokensTool());
  registry.register(new TypographySetupTool());
  registry.register(new IconsGuideTool());
  registry.register(new FindIconsTool());

  // Register usage and setup tools
  registry.register(new UsageGuideTool());
  registry.register(new FrameworkSetupTool());

  // Register migration tools
  registry.register(new VersionMigrationTool());

  // Register blocks tools
  registry.register(new GetBlocksTool());

  // Register plan tools
  registry.register(new GenerateUIPlanTool());
  registry.register(new ValidateUIPlanTool());

  return registry;
}

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  Tool,
  Resource
} from '@modelcontextprotocol/sdk/types.js';

import { ComponentsResource } from './resources/components.js';
import { DesignTokensResource } from './resources/design-tokens.js';
import { MDXResourceManager } from './resources/mdx-resources.js';
import { ComponentGenerator } from './tools/component-generator.js';
import { ExampleFinder } from './tools/example-finder.js';
import { SetupGenerator } from './tools/setup-generator.js';
import { FormGenerator } from './tools/form-generator.js';
import { IconHelper } from './tools/icon-helper.js';
import { LayoutHelper } from './tools/layout-helper.js';
import { ValidationHelper } from './tools/validation-helper.js';

export class ForgeServerBase {
  protected server: Server;
  protected componentsResource: ComponentsResource;
  protected designTokensResource: DesignTokensResource;
  protected mdxResourceManager: MDXResourceManager;
  protected componentGenerator: ComponentGenerator;
  protected exampleFinder: ExampleFinder;
  protected setupGenerator: SetupGenerator;
  protected formGenerator: FormGenerator;
  protected iconHelper: IconHelper;
  protected layoutHelper: LayoutHelper;
  protected validationHelper: ValidationHelper;

  constructor() {
    this.server = new Server(
      {
        name: 'forge-mcp-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          resources: {},
          tools: {}
        }
      }
    );

    // Initialize resources and tools
    this.componentsResource = new ComponentsResource();
    this.designTokensResource = new DesignTokensResource();
    this.mdxResourceManager = new MDXResourceManager();
    this.componentGenerator = new ComponentGenerator();
    this.exampleFinder = new ExampleFinder();
    this.setupGenerator = new SetupGenerator();
    this.formGenerator = new FormGenerator();
    this.iconHelper = new IconHelper();
    this.layoutHelper = new LayoutHelper();
    this.validationHelper = new ValidationHelper();

    this.setupHandlers();
  }

  protected setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const resources: Resource[] = [
        {
          uri: 'forge://components',
          name: 'Tyler Forge Components',
          description: 'Complete list of all Tyler Forge components with their documentation',
          mimeType: 'application/json'
        },
        {
          uri: 'forge://design-tokens',
          name: 'Tyler Forge Design Tokens',
          description: 'Design tokens for theming and customization',
          mimeType: 'application/json'
        },
        {
          uri: 'forge://icon-setup-critical',
          name: '🚨 CRITICAL: Icon Setup Guide',
          description: 'MUST READ: Critical setup steps for icons including defineIconComponent() registration',
          mimeType: 'text/markdown'
        }
      ];

      // Add all discovered MDX documentation resources
      const mdxResources = await this.mdxResourceManager.listResources();
      for (const mdxResource of mdxResources) {
        resources.push({
          uri: mdxResource.uri,
          name: mdxResource.name,
          description: mdxResource.description,
          mimeType: mdxResource.mimeType
        });
      }

      // Add individual component resources
      const componentList = await this.componentsResource.list();
      const componentNames = [];
      for (const category of Object.values(componentList)) {
        for (const comp of category as any[]) {
          componentNames.push(comp.name);
        }
      }
      for (const component of componentNames) {
        resources.push({
          uri: `forge://components/${component}`,
          name: `${this.formatName(component)} Component`,
          description: `Documentation and examples for the ${component} component`,
          mimeType: 'application/json'
        });
        
        // Add accessibility guidelines for each component
        resources.push({
          uri: `forge://accessibility/${component}`,
          name: `${this.formatName(component)} Accessibility`,
          description: `Accessibility guidelines for the ${component} component`,
          mimeType: 'text/markdown'
        });
      }

      return { resources };
    });

    // Read resource content
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;

      if (uri === 'forge://components') {
        const components = await this.componentsResource.list();
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(components, null, 2)
          }]
        };
      }

      if (uri === 'forge://design-tokens') {
        const tokens = await this.designTokensResource.list();
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(tokens, null, 2)
          }]
        };
      }

      if (uri === 'forge://icon-setup-critical') {
        const setupGuide = await this.iconHelper.getIconSetup({ framework: 'react' });
        const checklist = await this.iconHelper.getSetupChecklist();
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: `# 🚨 CRITICAL: Tyler Forge Icon Setup

## THE MOST COMMON MISTAKE

**99% of icon issues are caused by missing this ONE line:**

\`\`\`typescript
import { defineIconComponent } from '@tylertech/forge';
defineIconComponent(); // ← THIS MUST BE CALLED!
\`\`\`

Without this, icons will show as text (e.g., "home" instead of 🏠).

---

${setupGuide}

---

${checklist}`
          }]
        };
      }

      // Handle dynamic MDX documentation resources
      if (uri.startsWith('forge://docs/')) {
        const content = await this.mdxResourceManager.getResource(uri);
        if (content) {
          return {
            contents: [{
              uri,
              mimeType: 'text/markdown',
              text: content
            }]
          };
        }
      }

      // Keep component-specific accessibility as a special case
      // (since it's generated, not from MDX files)
      if (uri.startsWith('forge://accessibility/')) {
        const component = uri.replace('forge://accessibility/', '');
        const guidelines = await this.getAccessibilityGuidelines(component);
        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: guidelines
          }]
        };
      }

      // Individual component documentation
      if (uri.startsWith('forge://components/')) {
        const componentName = uri.replace('forge://components/', '');
        const component = await this.componentsResource.get(componentName);
        
        if (component) {
          // Add setup instructions to component documentation
          const enhancedComponent = {
            ...component,
            setup: {
              installation: `npm install @tylertech/forge`,
              registration: `import { define${this.pascalCase(componentName)}Component } from '@tylertech/forge';\ndefine${this.pascalCase(componentName)}Component();`,
              styles: `import '@tylertech/forge/dist/${componentName}/forge-${componentName}.css';`,
              reactWrapper: `import { Forge${this.pascalCase(componentName)} } from '@tylertech/forge-react';`,
              angularModule: `import { Forge${this.pascalCase(componentName)}Module } from '@tylertech/forge-angular';`
            },
            examples: await this.componentGenerator.generate({
              component: componentName,
              framework: 'react',
              variant: component.variants?.[0],
              theme: 'primary'
            })
          };

          return {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(enhancedComponent, null, 2)
            }]
          };
        }
      }

      throw new Error(`Resource not found: ${uri}`);
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: 'generateComponent',
          description: 'Generate Tyler Forge component code with complete setup, registration, and framework-specific implementation',
          inputSchema: this.componentGenerator.getSchema()
        },
        {
          name: 'findExamples',
          description: 'Find examples and patterns for specific Tyler Forge components or use cases',
          inputSchema: this.exampleFinder.getSchema()
        },
        {
          name: 'setupProject',
          description: 'Generate complete Tyler Forge project setup with all necessary imports, registrations, and configuration',
          inputSchema: this.setupGenerator.getSchema()
        },
        {
          name: 'generateForm',
          description: 'Generate complete form implementations with validation, error handling, and accessibility',
          inputSchema: this.formGenerator.getSchema()
        },
        {
          name: 'suggestComponent',
          description: 'Get intelligent component suggestions based on your use case with implementation examples',
          inputSchema: {
            type: 'object',
            properties: {
              useCase: {
                type: 'string',
                description: 'Describe what you want to build or the UI problem you\'re solving'
              },
              context: {
                type: 'string',
                description: 'Additional context about your application',
                optional: true
              }
            },
            required: ['useCase']
          }
        },
        {
          name: 'getIconSetup',
          description: 'Get complete icon setup instructions with critical defineIconComponent() registration',
          inputSchema: this.iconHelper.getSetupSchema()
        },
        {
          name: 'validateIcon',
          description: 'Validate if an icon exists and get usage instructions',
          inputSchema: this.iconHelper.getValidateSchema()
        },
        {
          name: 'getIconSetupChecklist',
          description: 'Get a complete checklist for setting up Forge icons correctly',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'troubleshootIcons',
          description: 'Troubleshoot common icon issues with step-by-step solutions',
          inputSchema: this.iconHelper.getTroubleshootSchema()
        },
        {
          name: 'getLayoutDocumentation',
          description: 'Get complete documentation for Forge layout components with correct slot names, properties, and examples',
          inputSchema: this.layoutHelper.getLayoutSchema()
        },
        {
          name: 'validateLayoutSetup',
          description: 'Validate layout component setup and get troubleshooting guidance',
          inputSchema: this.layoutHelper.getValidateSetupSchema()
        },
        {
          name: 'debugComponent',
          description: 'Debug Forge component issues with comprehensive troubleshooting steps',
          inputSchema: this.layoutHelper.getDebugComponentSchema()
        },
        {
          name: 'validateSetup',
          description: '🚨 CRITICAL: Validate your complete Forge setup with checklist',
          inputSchema: this.validationHelper.getSetupSchema()
        },
        {
          name: 'validateSlots',
          description: 'Validate slot names for layout components (fixes body-left vs left issues)',
          inputSchema: this.validationHelper.getSlotsSchema()
        },
        {
          name: 'preFlightCheck',
          description: 'Run pre-flight check before starting development',
          inputSchema: this.validationHelper.getPreFlightSchema()
        },
        {
          name: 'decodeError',
          description: 'Decode error messages and get solutions',
          inputSchema: this.validationHelper.getDecodeErrorSchema()
        },
        {
          name: 'getComponentMapping',
          description: 'Get correct component names (fixes ForgeTabs vs ForgeTabBar confusion)',
          inputSchema: this.componentGenerator.getComponentMappingSchema()
        },
        {
          name: 'getReactImports',
          description: 'Generate complete React import statements with setup',
          inputSchema: this.componentGenerator.getReactImportsSchema()
        },
        {
          name: 'getComponentProps',
          description: 'Get typed component properties with examples',
          inputSchema: this.componentGenerator.getComponentPropsSchema()
        }
      ];

      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'generateComponent') {
        const result = await this.componentGenerator.generate(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'findExamples') {
        const result = await this.exampleFinder.find(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'setupProject') {
        const result = await this.setupGenerator.generate(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'generateForm') {
        const result = await this.formGenerator.generate(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'suggestComponent') {
        const result = await this.suggestComponent(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'getIconSetup') {
        const result = await this.iconHelper.getIconSetup(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'validateIcon') {
        const result = await this.iconHelper.validateIcon(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'getIconSetupChecklist') {
        const result = await this.iconHelper.getSetupChecklist();
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'troubleshootIcons') {
        const result = await this.iconHelper.troubleshoot(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'getLayoutDocumentation') {
        const result = await this.layoutHelper.getLayoutDocumentation(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'validateLayoutSetup') {
        const result = await this.layoutHelper.validateSetup(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'debugComponent') {
        const result = await this.layoutHelper.debugComponent(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'validateSetup') {
        const result = await this.validationHelper.validateSetup(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'validateSlots') {
        const result = await this.validationHelper.validateSlots(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'preFlightCheck') {
        const result = await this.validationHelper.preFlightCheck(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'decodeError') {
        const result = await this.validationHelper.decodeError(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'getComponentMapping') {
        const result = await this.componentGenerator.getComponentMapping(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'getReactImports') {
        const result = await this.componentGenerator.getReactImports(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      if (name === 'getComponentProps') {
        const result = await this.componentGenerator.getComponentProps(args as any);
        return {
          content: [{
            type: 'text',
            text: result
          }]
        };
      }

      throw new Error(`Tool not found: ${name}`);
    });
  }

  protected async suggestComponent(input: { useCase: string; context?: string }): Promise<string> {
    const { useCase, context } = input;
    
    // Component mapping for common use cases
    const suggestions: Record<string, any> = {
      'navigation': {
        primary: ['app-bar', 'drawer', 'bottom-navigation', 'tabs'],
        secondary: ['breadcrumb', 'stepper'],
        example: 'app-bar with drawer for main navigation'
      },
      'form': {
        primary: ['text-field', 'select', 'checkbox', 'radio', 'switch', 'datepicker'],
        secondary: ['autocomplete', 'chip-field', 'slider'],
        example: 'text-field with validation and select for dropdowns'
      },
      'data display': {
        primary: ['table', 'list', 'card', 'accordion'],
        secondary: ['avatar', 'badge', 'chip', 'tooltip'],
        example: 'table for tabular data, cards for grid layouts'
      },
      'feedback': {
        primary: ['dialog', 'toast', 'banner', 'inline-message'],
        secondary: ['circular-progress', 'linear-progress', 'skeleton'],
        example: 'toast for notifications, dialog for confirmations'
      },
      'actions': {
        primary: ['button', 'icon-button', 'floating-action-button'],
        secondary: ['menu', 'speed-dial'],
        example: 'button for primary actions, icon-button for toolbar actions'
      },
      'layout': {
        primary: ['scaffold', 'card', 'divider', 'expansion-panel'],
        secondary: ['stack', 'split-view'],
        example: 'scaffold for app structure, cards for content grouping'
      }
    };

    // Find matching category
    const useCaseLower = useCase.toLowerCase();
    let matchedCategory = null;
    let components = [];

    for (const [category, data] of Object.entries(suggestions)) {
      if (useCaseLower.includes(category) || category.split(' ').some(word => useCaseLower.includes(word))) {
        matchedCategory = category;
        components = data.primary;
        break;
      }
    }

    // If no exact match, suggest based on keywords
    if (!matchedCategory) {
      if (useCaseLower.includes('menu') || useCaseLower.includes('nav')) {
        components = suggestions.navigation.primary;
        matchedCategory = 'navigation';
      } else if (useCaseLower.includes('input') || useCaseLower.includes('field')) {
        components = suggestions.form.primary;
        matchedCategory = 'form';
      } else if (useCaseLower.includes('list') || useCaseLower.includes('table')) {
        components = suggestions['data display'].primary;
        matchedCategory = 'data display';
      } else if (useCaseLower.includes('modal') || useCaseLower.includes('alert')) {
        components = suggestions.feedback.primary;
        matchedCategory = 'feedback';
      } else if (useCaseLower.includes('button') || useCaseLower.includes('click')) {
        components = suggestions.actions.primary;
        matchedCategory = 'actions';
      } else {
        components = ['card', 'button', 'text-field', 'scaffold'];
        matchedCategory = 'general';
      }
    }

    let result = `# Component Suggestions for: ${useCase}\n\n`;
    
    if (context) {
      result += `## Context\n${context}\n\n`;
    }

    result += `## Recommended Components\n\n`;
    
    // Primary recommendations
    result += `### Primary Components\n`;
    for (const comp of components.slice(0, 3)) {
      const componentName = this.pascalCase(comp);
      result += `\n#### ${componentName} (\`forge-${comp}\`)\n`;
      result += `Perfect for ${this.getComponentUseCase(comp)}\n\n`;
      
      // Add quick example
      result += `**Quick Setup:**\n`;
      result += `\`\`\`javascript\n`;
      result += `import { define${componentName}Component } from '@tylertech/forge';\n`;
      result += `define${componentName}Component();\n`;
      result += `\`\`\`\n\n`;
      
      result += `**Usage:**\n`;
      result += `\`\`\`html\n`;
      result += this.getComponentQuickExample(comp);
      result += `\`\`\`\n`;
    }

    // Add implementation pattern
    if (matchedCategory && suggestions[matchedCategory]) {
      result += `\n### Common Pattern: ${suggestions[matchedCategory].example}\n\n`;
      result += `\`\`\`html\n`;
      result += this.getPatternExample(matchedCategory);
      result += `\`\`\`\n`;
    }

    // Add links to resources
    result += `\n## Next Steps\n\n`;
    result += `1. **Setup Project**: Use \`setupProject\` tool for complete initialization\n`;
    result += `2. **Generate Components**: Use \`generateComponent\` tool for framework-specific code\n`;
    result += `3. **Find Examples**: Use \`findExamples\` tool for more patterns\n`;
    result += `4. **View Docs**: Check \`forge://components/${components[0]}\` for detailed documentation\n`;

    return result;
  }

  protected getComponentUseCase(component: string): string {
    const useCases: Record<string, string> = {
      'button': 'triggering actions and submitting forms',
      'text-field': 'collecting text input from users',
      'select': 'choosing from a list of options',
      'card': 'grouping related content in a container',
      'dialog': 'displaying modal content and confirmations',
      'app-bar': 'providing top-level navigation and branding',
      'table': 'displaying structured data in rows and columns',
      'tabs': 'organizing content into switchable sections',
      'checkbox': 'selecting multiple options from a list',
      'radio': 'selecting a single option from a group',
      'toast': 'showing brief notification messages',
      'scaffold': 'creating the main application layout structure'
    };
    
    return useCases[component] || `implementing ${component} functionality`;
  }

  protected getComponentQuickExample(component: string): string {
    const examples: Record<string, string> = {
      'button': '<forge-button variant="raised" theme="primary">Click Me</forge-button>',
      'text-field': '<forge-text-field label="Email" type="email" required></forge-text-field>',
      'select': `<forge-select label="Choose Option">
  <forge-option value="1">Option 1</forge-option>
  <forge-option value="2">Option 2</forge-option>
</forge-select>`,
      'card': `<forge-card>
  <h2 class="forge-typography--heading6">Card Title</h2>
  <p>Card content goes here</p>
</forge-card>`,
      'dialog': `<forge-dialog>
  <h2 slot="title">Dialog Title</h2>
  <div slot="body">Dialog content</div>
  <forge-button slot="actions">Close</forge-button>
</forge-dialog>`,
      'app-bar': `<forge-app-bar title-text="My App">
  <forge-app-bar-profile-button slot="end"></forge-app-bar-profile-button>
</forge-app-bar>`
    };
    
    return examples[component] || `<forge-${component}></${component}>`;
  }

  protected getPatternExample(category: string): string {
    const patterns: Record<string, string> = {
      'navigation': `<forge-scaffold>
  <forge-app-bar slot="header" title-text="My Application">
    <forge-icon-button slot="start">
      <forge-icon name="menu"></forge-icon>
    </forge-icon-button>
  </forge-app-bar>
  <forge-drawer slot="left">
    <!-- Navigation items -->
  </forge-drawer>
  <main slot="body">
    <!-- Content -->
  </main>
</forge-scaffold>`,
      'form': `<form>
  <forge-text-field label="Name" required></forge-text-field>
  <forge-select label="Category">
    <forge-option value="1">Option 1</forge-option>
  </forge-select>
  <forge-button type="submit" variant="raised">Submit</forge-button>
</form>`,
      'feedback': `<!-- Toast notification -->
<forge-toast message="Action completed successfully"></forge-toast>

<!-- Confirmation dialog -->
<forge-dialog>
  <h2 slot="title">Confirm Action</h2>
  <div slot="body">Are you sure?</div>
  <forge-button slot="actions" variant="text">Cancel</forge-button>
  <forge-button slot="actions" variant="raised">Confirm</forge-button>
</forge-dialog>`
    };
    
    return patterns[category] || '<forge-card><!-- Your content --></forge-card>';
  }

  protected getCommonPatterns(): string {
    return `# Common Tyler Forge UI Patterns

## Form with Validation
\`\`\`html
<form id="myForm">
  <forge-text-field 
    label="Email" 
    type="email" 
    required
    helper-text="Enter your email address">
  </forge-text-field>
  
  <forge-text-field 
    label="Password" 
    type="password" 
    required
    minlength="8">
  </forge-text-field>
  
  <forge-checkbox>
    I agree to the terms
  </forge-checkbox>
  
  <forge-button type="submit" variant="raised" theme="primary">
    Submit
  </forge-button>
</form>

<script>
document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate and submit
});
</script>
\`\`\`

## Data Table with Actions
\`\`\`html
<forge-table>
  <forge-table-head>
    <forge-table-row>
      <forge-table-cell>Name</forge-table-cell>
      <forge-table-cell>Status</forge-table-cell>
      <forge-table-cell>Actions</forge-table-cell>
    </forge-table-row>
  </forge-table-head>
  <forge-table-body>
    <forge-table-row>
      <forge-table-cell>Item 1</forge-table-cell>
      <forge-table-cell>
        <forge-badge theme="success">Active</forge-badge>
      </forge-table-cell>
      <forge-table-cell>
        <forge-icon-button>
          <forge-icon name="edit"></forge-icon>
        </forge-icon-button>
        <forge-icon-button>
          <forge-icon name="delete"></forge-icon>
        </forge-icon-button>
      </forge-table-cell>
    </forge-table-row>
  </forge-table-body>
</forge-table>
\`\`\`

## Modal Dialog Pattern
\`\`\`javascript
function showConfirmDialog() {
  const dialog = document.createElement('forge-dialog');
  dialog.innerHTML = \`
    <h2 slot="title">Confirm Action</h2>
    <div slot="body">
      Are you sure you want to proceed with this action?
    </div>
    <forge-button slot="actions" variant="text">Cancel</forge-button>
    <forge-button slot="actions" variant="raised" theme="primary">Confirm</forge-button>
  \`;
  
  document.body.appendChild(dialog);
  dialog.open = true;
  
  // Handle button clicks
  dialog.addEventListener('forge-dialog-close', () => {
    dialog.remove();
  });
}
\`\`\`

## Loading States
\`\`\`html
<!-- Skeleton while loading -->
<forge-skeleton shape="rect" height="200px"></forge-skeleton>

<!-- Progress indicator -->
<forge-linear-progress indeterminate></forge-linear-progress>

<!-- Loading button -->
<forge-button disabled>
  <forge-circular-progress size="small"></forge-circular-progress>
  Loading...
</forge-button>
\`\`\`

## Navigation Drawer
\`\`\`html
<forge-scaffold>
  <forge-app-bar slot="header">
    <forge-icon-button slot="start" id="menuBtn">
      <forge-icon name="menu"></forge-icon>
    </forge-icon-button>
    <span slot="title">My App</span>
  </forge-app-bar>
  
  <forge-drawer slot="left" id="drawer">
    <forge-list>
      <forge-list-item>
        <forge-icon slot="start" name="home"></forge-icon>
        Home
      </forge-list-item>
      <forge-list-item>
        <forge-icon slot="start" name="settings"></forge-icon>
        Settings
      </forge-list-item>
    </forge-list>
  </forge-drawer>
  
  <main slot="body">
    <!-- Content -->
  </main>
</forge-scaffold>

<script>
document.getElementById('menuBtn').addEventListener('click', () => {
  const drawer = document.getElementById('drawer');
  drawer.open = !drawer.open;
});
</script>
\`\`\``;
  }

  protected getGeneralAccessibilityGuidelines(): string {
    return `# Tyler Forge Accessibility Guidelines

## Overview
Tyler Forge components are built with accessibility in mind, following WCAG 2.1 Level AA standards.

## Built-in Accessibility Features

### Keyboard Navigation
- All interactive components support keyboard navigation
- Tab order follows logical flow
- Focus indicators are clearly visible
- Escape key closes overlays (dialogs, menus, etc.)

### Screen Reader Support
- Semantic HTML elements used throughout
- ARIA attributes automatically applied
- Live regions for dynamic content updates
- Proper heading hierarchy

### Color and Contrast
- All color combinations meet WCAG contrast requirements
- Focus indicators have sufficient contrast
- Error states use multiple indicators (not just color)

## Component-Specific Guidelines

### Forms
- Always provide labels for form fields
- Use helper text for additional context
- Mark required fields appropriately
- Provide clear error messages

\`\`\`html
<forge-text-field 
  label="Email Address"
  type="email"
  required
  helper-text="We'll never share your email"
  aria-describedby="email-error">
</forge-text-field>
<forge-inline-message id="email-error" theme="error">
  Please enter a valid email address
</forge-inline-message>
\`\`\`

### Buttons and Actions
- Use descriptive button text
- Provide aria-label for icon-only buttons
- Indicate button states (loading, disabled)

\`\`\`html
<!-- Icon-only button needs aria-label -->
<forge-icon-button aria-label="Delete item">
  <forge-icon name="delete"></forge-icon>
</forge-icon-button>

<!-- Loading state -->
<forge-button disabled aria-busy="true">
  <forge-circular-progress size="small"></forge-circular-progress>
  Loading...
</forge-button>
\`\`\`

### Dialogs and Overlays
- Focus management handled automatically
- Escape key closes overlay
- Focus returns to trigger element on close
- Background content is inert when open

### Data Tables
- Use proper table structure
- Provide column headers
- Consider pagination for large datasets
- Support keyboard navigation

## Testing Checklist

### Keyboard Testing
- [ ] Can navigate using only keyboard
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Can activate all controls with keyboard
- [ ] Can escape from traps (modals, menus)

### Screen Reader Testing
- [ ] All content is announced
- [ ] Form labels are associated
- [ ] Error messages are announced
- [ ] Dynamic updates are communicated
- [ ] Images have appropriate alt text

### Visual Testing
- [ ] Sufficient color contrast (4.5:1 for normal text)
- [ ] Focus indicators are clear
- [ ] Errors indicated without color alone
- [ ] Content reflows at 200% zoom
- [ ] Animations can be paused/stopped

## Best Practices

1. **Progressive Enhancement**
   - Start with semantic HTML
   - Layer on Forge components
   - Ensure functionality without JavaScript

2. **Clear Labels**
   - Use descriptive, concise labels
   - Avoid placeholder text as labels
   - Provide instructions for complex interactions

3. **Error Handling**
   - Provide clear, actionable error messages
   - Associate errors with form fields
   - Announce errors to screen readers
   - Offer suggestions for correction

4. **Focus Management**
   - Set focus to appropriate elements
   - Trap focus in modals
   - Return focus after interactions
   - Skip links for navigation

5. **Alternative Formats**
   - Provide text alternatives for images
   - Captions for videos
   - Transcripts for audio
   - Multiple ways to complete tasks

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Tyler Forge Documentation](https://forge.tylerdev.io)`;
  }

  protected async getAccessibilityGuidelines(component: string): Promise<string> {
    // Enhanced accessibility guidelines
    const guidelines: Record<string, string> = {
      'button': `# Button Accessibility Guidelines

## Keyboard Navigation
- ✅ Tab key navigates to button
- ✅ Space/Enter activates button
- ✅ Visible focus indicator provided automatically

## ARIA Requirements
- Use \`aria-label\` for icon-only buttons
- Use \`aria-pressed\` for toggle buttons
- Use \`aria-expanded\` for buttons that open menus

## Best Practices
\`\`\`html
<!-- Text button - accessible by default -->
<forge-button>Submit</forge-button>

<!-- Icon-only button - needs aria-label -->
<forge-icon-button aria-label="Open menu">
  <forge-icon name="menu"></forge-icon>
</forge-icon-button>

<!-- Toggle button -->
<forge-button aria-pressed="false">
  Toggle Feature
</forge-button>

<!-- Button opening menu -->
<forge-button aria-expanded="false" aria-controls="menu-id">
  Options
</forge-button>
\`\`\``,

      'text-field': `# Text Field Accessibility Guidelines

## Labels and Instructions
- ✅ Always provide a label
- ✅ Use helper-text for additional instructions
- ✅ Mark required fields

## ARIA Support
- Labels automatically associated
- Error messages announced
- Live validation feedback

## Examples
\`\`\`html
<!-- Basic accessible text field -->
<forge-text-field 
  label="Email Address"
  type="email"
  required
  helper-text="Enter your work email">
</forge-text-field>

<!-- With error handling -->
<forge-text-field 
  label="Password"
  type="password"
  required
  minlength="8"
  invalid
  helper-text="Must be at least 8 characters">
</forge-text-field>

<!-- With prefix/suffix -->
<forge-text-field label="Price">
  <span slot="leading">$</span>
  <span slot="trailing">.00</span>
</forge-text-field>
\`\`\``,

      'dialog': `# Dialog Accessibility Guidelines

## Focus Management
- ✅ Focus trapped within dialog
- ✅ Focus returns to trigger on close
- ✅ First focusable element receives focus

## Keyboard Support
- Escape key closes dialog
- Tab cycles through focusable elements
- Shift+Tab for reverse navigation

## ARIA Implementation
\`\`\`html
<forge-dialog
  aria-labelledby="dialog-title"
  aria-describedby="dialog-body"
  role="dialog">
  <h2 slot="title" id="dialog-title">Confirm Action</h2>
  <div slot="body" id="dialog-body">
    Are you sure you want to proceed?
  </div>
  <forge-button slot="actions">Cancel</forge-button>
  <forge-button slot="actions">Confirm</forge-button>
</forge-dialog>
\`\`\``
    };

    return guidelines[component] || `# Accessibility Guidelines for ${this.formatName(component)}

## General Requirements
- Keyboard navigable
- Screen reader compatible
- WCAG 2.1 Level AA compliant
- Clear focus indicators

## Best Practices
- Provide appropriate ARIA labels
- Ensure sufficient color contrast
- Support keyboard navigation
- Test with screen readers

For detailed guidelines, consult the Tyler Forge documentation.`;
  }

  protected formatName(component: string): string {
    return component
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  protected pascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
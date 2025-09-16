import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ReactAdapter } from '../adapters/react.js';
import { AngularAdapter } from '../adapters/angular.js';
import { VanillaAdapter } from '../adapters/vanilla.js';
import { GenerateComponentOptions, Framework } from '../utils/types.js';

const GenerateComponentSchema = z.object({
  component: z.string().describe('The component name (e.g., "button", "text-field")'),
  framework: z.enum(['vanilla', 'react', 'angular', 'vue', 'svelte', 'blazor']).describe('Target framework'),
  variant: z.string().optional().describe('Component variant (e.g., "outlined", "filled")'),
  theme: z.string().optional().describe('Component theme (e.g., "primary", "secondary")'),
  props: z.record(z.any()).optional().describe('Component properties'),
  slots: z.record(z.string()).optional().describe('Slot content mapping'),
  events: z.array(z.string()).optional().describe('Event handlers to include'),
  cssOnly: z.boolean().optional().describe('Generate CSS-only version without JavaScript'),
  includeCommonErrors: z.boolean().optional().describe('Include comments about common mistakes')
});

const ComponentMappingSchema = z.object({
  requestedComponent: z.string().describe('The component name user is looking for'),
  framework: z.enum(['vanilla', 'react', 'angular', 'vue']).describe('Target framework')
});

const ReactImportsSchema = z.object({
  components: z.array(z.string()).describe('List of components to import'),
  includeSetup: z.boolean().optional().describe('Include setup code like defineIconComponent')
});

const ComponentPropsSchema = z.object({
  component: z.string().describe('The component name'),
  framework: z.enum(['vanilla', 'react', 'angular', 'vue']).describe('Target framework'),
  showRequired: z.boolean().optional().describe('Highlight required props')
});

export class ComponentGenerator {
  private adapters: Map<Framework, any>;
  
  // Component name mappings
  private componentMappings = {
    'tabs': { 
      react: { correct: 'ForgeTabBar', children: 'ForgeTab', note: 'No ForgeTabPanel - use conditional rendering' },
      vanilla: { correct: 'forge-tab-bar', children: 'forge-tab', note: 'No forge-tab-panel element' }
    },
    'progress': {
      react: { correct: 'ForgeLinearProgress', note: 'Not ForgeProgressBar' },
      vanilla: { correct: 'forge-linear-progress', note: 'Not forge-progress-bar' }
    },
    'select': {
      react: { correct: 'ForgeSelect', note: 'Uses HTML <option> elements, not ForgeOption' },
      vanilla: { correct: 'forge-select', note: 'Uses HTML <option> elements, not forge-option' }
    },
    'dialog': {
      react: { correct: 'ForgeDialog', note: 'Use ForgeDialog.show() method to open' },
      vanilla: { correct: 'forge-dialog', note: 'Use element.show() method to open' }
    }
  };
  
  // Component properties database
  private componentProps: Record<string, any> = {
    'button': {
      required: [],
      optional: ['variant', 'theme', 'disabled', 'type', 'dense'],
      types: {
        variant: "'text' | 'outlined' | 'tonal' | 'filled' | 'raised' | 'link'",
        theme: "'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info'",
        disabled: 'boolean',
        type: "'button' | 'submit' | 'reset'",
        dense: 'boolean'
      }
    },
    'text-field': {
      required: [],
      optional: ['value', 'label', 'placeholder', 'type', 'disabled', 'required', 'invalid', 'helperText'],
      types: {
        value: 'string',
        label: 'string',
        placeholder: 'string',
        type: "'text' | 'password' | 'email' | 'number' | 'tel' | 'url'",
        disabled: 'boolean',
        required: 'boolean',
        invalid: 'boolean',
        helperText: 'string'
      }
    },
    'scaffold': {
      required: [],
      optional: ['viewport'],
      types: {
        viewport: "'fixed' | 'full'"
      },
      slots: ['left', 'right', 'body', 'header', 'footer']
    },
    'drawer': {
      required: [],
      optional: ['open', 'modal', 'direction'],
      types: {
        open: 'boolean',
        modal: 'boolean',
        direction: "'left' | 'right'"
      },
      slots: ['header', 'body', 'footer']
    }
  };

  constructor() {
    this.adapters = new Map<Framework, any>();
    this.adapters.set('react', new ReactAdapter());
    this.adapters.set('angular', new AngularAdapter());
    this.adapters.set('vanilla', new VanillaAdapter());
  }

  getSchema() {
    return zodToJsonSchema(GenerateComponentSchema) as any;
  }
  
  getComponentMappingSchema() {
    return zodToJsonSchema(ComponentMappingSchema) as any;
  }
  
  getReactImportsSchema() {
    return zodToJsonSchema(ReactImportsSchema) as any;
  }
  
  getComponentPropsSchema() {
    return zodToJsonSchema(ComponentPropsSchema) as any;
  }

  async generate(input: z.infer<typeof GenerateComponentSchema>): Promise<string> {
    const options: GenerateComponentOptions = {
      component: input.component,
      framework: input.framework,
      variant: input.variant,
      theme: input.theme,
      props: input.props || {},
      slots: input.slots || {},
      events: input.events || [],
      cssOnly: input.cssOnly || false
    };
    
    const includeCommonErrors = input.includeCommonErrors || false;

    const adapter = this.adapters.get(options.framework);
    
    if (!adapter) {
      // For unsupported frameworks, provide guidance
      return this.generateUnsupportedFrameworkGuide(options);
    }

    try {
      let code = adapter.generate(options);
      
      // Add common pitfall comments if requested
      if (includeCommonErrors) {
        code = this.addCommonPitfallComments(code, options);
      }
      
      return this.wrapInCodeBlock(code, options.framework);
    } catch (error) {
      throw new Error(`Failed to generate component: ${error}`);
    }
  }

  private generateUnsupportedFrameworkGuide(options: GenerateComponentOptions): string {
    const { component, framework } = options;
    
    let guide = `# ${this.formatName(component)} Component for ${this.formatName(framework)}\n\n`;
    guide += `Tyler Forge components are Web Components that work with any framework.\n\n`;
    guide += `## Installation\n\n`;
    guide += `\`\`\`bash\nnpm install @tylertech/forge\n\`\`\`\n\n`;
    guide += `## Usage\n\n`;
    
    if (framework === 'vue') {
      guide += this.generateVueExample(options);
    } else if (framework === 'svelte') {
      guide += this.generateSvelteExample(options);
    } else if (framework === 'blazor') {
      guide += this.generateBlazorExample(options);
    }
    
    guide += `\n## Notes\n\n`;
    guide += `- Forge components are framework-agnostic Web Components\n`;
    guide += `- They work natively in any modern browser\n`;
    guide += `- Properties can be set as attributes or via JavaScript\n`;
    guide += `- Events are dispatched as CustomEvents\n`;
    
    return guide;
  }

  private generateVueExample(options: GenerateComponentOptions): string {
    const { component, variant, theme } = options;
    const tagName = `forge-${component}`;
    
    return `\`\`\`vue
<template>
  <${tagName}${variant ? ` variant="${variant}"` : ''}${theme ? ` theme="${theme}"` : ''}>
    ${this.formatName(component)}
  </${tagName}>
</template>

<script>
import '@tylertech/forge/${component}';

export default {
  name: '${this.pascalCase(component)}Component'
}
</script>
\`\`\``;
  }

  private generateSvelteExample(options: GenerateComponentOptions): string {
    const { component, variant, theme } = options;
    const tagName = `forge-${component}`;
    
    return `\`\`\`svelte
<script>
  import '@tylertech/forge/${component}';
</script>

<${tagName}${variant ? ` variant="${variant}"` : ''}${theme ? ` theme="${theme}"` : ''}>
  ${this.formatName(component)}
</${tagName}>
\`\`\``;
  }

  private generateBlazorExample(options: GenerateComponentOptions): string {
    const { component, variant, theme } = options;
    const tagName = `forge-${component}`;
    
    return `\`\`\`razor
@* Add to your _Host.cshtml or index.html *@
<script type="module" src="_content/Tyler.Forge/${component}.js"></script>

@* Use in your component *@
<${tagName}${variant ? ` variant="${variant}"` : ''}${theme ? ` theme="${theme}"` : ''}>
  ${this.formatName(component)}
</${tagName}>
\`\`\``;
  }

  private wrapInCodeBlock(code: string, framework: Framework): string {
    const language = framework === 'angular' ? 'typescript' : framework === 'react' ? 'jsx' : 'javascript';
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }

  private formatName(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private pascalCase(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  
  async getComponentMapping(input: z.infer<typeof ComponentMappingSchema>): Promise<string> {
    const { requestedComponent, framework } = input;
    const lowercaseRequested = requestedComponent.toLowerCase().replace('forge', '').replace(/-/g, '');
    
    let result = `# Component Name Mapping\n\n`;
    result += `**Requested:** ${requestedComponent}\n`;
    result += `**Framework:** ${framework}\n\n`;
    
    // Check if there's a specific mapping
    for (const [key, mapping] of Object.entries(this.componentMappings)) {
      if (lowercaseRequested.includes(key)) {
        const frameworkMapping = mapping[framework as 'react' | 'vanilla'];
        if (frameworkMapping) {
          result += `## ✅ Correct Component Names\n\n`;
          result += `- **Main Component:** \`${frameworkMapping.correct}\`\n`;
          if ('children' in frameworkMapping) {
            result += `- **Child Component:** \`${frameworkMapping.children}\`\n`;
          }
          if (frameworkMapping.note) {
            result += `\n⚠️ **Important:** ${frameworkMapping.note}\n`;
          }
          
          result += `\n### Example Usage\n`;
          if (framework === 'react') {
            result += `\`\`\`tsx\n`;
            if (key === 'tabs') {
              result += `<ForgeTabBar>\n`;
              result += `  <ForgeTab selected>Tab 1</ForgeTab>\n`;
              result += `  <ForgeTab>Tab 2</ForgeTab>\n`;
              result += `</ForgeTabBar>\n\n`;
              result += `{/* Content rendering - no ForgeTabPanel! */}\n`;
              result += `{selectedTab === 0 && <div>Content 1</div>}\n`;
              result += `{selectedTab === 1 && <div>Content 2</div>}\n`;
            } else if (key === 'select') {
              result += `<ForgeSelect>\n`;
              result += `  <option value="1">Option 1</option>\n`;
              result += `  <option value="2">Option 2</option>\n`;
              result += `</ForgeSelect>\n`;
            } else {
              result += `<${frameworkMapping.correct} />\n`;
            }
            result += `\`\`\`\n`;
          }
          return result;
        }
      }
    }
    
    // Default mapping for components without special cases
    const pascalName = this.pascalCase(requestedComponent.replace('forge-', ''));
    if (framework === 'react') {
      result += `## Standard Component Name\n\n`;
      result += `- **React Component:** \`Forge${pascalName}\`\n`;
      result += `- **Import:** \`import { Forge${pascalName} } from '@tylertech/forge-react';\`\n`;
    } else {
      result += `## Standard Component Name\n\n`;
      result += `- **Web Component:** \`forge-${requestedComponent.toLowerCase()}\`\n`;
      result += `- **Import:** \`import { define${pascalName}Component } from '@tylertech/forge';\`\n`;
    }
    
    return result;
  }
  
  async getReactImports(input: z.infer<typeof ReactImportsSchema>): Promise<string> {
    const { components, includeSetup } = input;
    
    let result = `# React Import Statements\n\n`;
    result += `## Component Imports\n\n`;
    result += `\`\`\`typescript\n`;
    
    // Group components for cleaner imports
    const forgeComponents: string[] = [];
    const forgeReactComponents: string[] = [];
    
    for (const component of components) {
      const pascalName = this.pascalCase(component);
      forgeReactComponents.push(`Forge${pascalName}`);
      
      // Special cases that need vanilla imports
      if (['icon', 'icon-button'].includes(component)) {
        forgeComponents.push(`defineIconComponent`);
      }
    }
    
    // React component imports
    if (forgeReactComponents.length > 0) {
      result += `// React wrapper components\n`;
      result += `import {\n`;
      forgeReactComponents.forEach((comp, i) => {
        result += `  ${comp}${i < forgeReactComponents.length - 1 ? ',' : ''}\n`;
      });
      result += `} from '@tylertech/forge-react';\n\n`;
    }
    
    // Setup imports if needed
    if (includeSetup || components.some(c => ['icon', 'icon-button'].includes(c))) {
      result += `// Required setup imports\n`;
      result += `import {\n`;
      if (components.some(c => ['icon', 'icon-button'].includes(c))) {
        result += `  defineIconComponent,\n`;
        result += `  IconRegistry\n`;
      }
      result += `} from '@tylertech/forge';\n\n`;
      
      result += `// Optional: Tyler icons\n`;
      result += `import { tylIconFace } from '@tylertech/tyler-icons/standard';\n`;
    }
    
    result += `\`\`\`\n\n`;
    
    // Setup code
    if (includeSetup || components.some(c => ['icon', 'icon-button'].includes(c))) {
      result += `## Setup Code (Call Once at App Start)\n\n`;
      result += `\`\`\`typescript\n`;
      result += `// In your App.tsx or index.tsx\n`;
      result += `export function setupForge() {\n`;
      if (components.some(c => ['icon', 'icon-button'].includes(c))) {
        result += `  // CRITICAL: Define icon component\n`;
        result += `  defineIconComponent();\n\n`;
        result += `  // Optional: Register Tyler icons\n`;
        result += `  IconRegistry.define(tylIconFace);\n`;
      }
      result += `}\n\n`;
      result += `// Call at app initialization\n`;
      result += `setupForge();\n`;
      result += `\`\`\`\n\n`;
    }
    
    // HTML requirements
    if (components.some(c => ['icon', 'icon-button'].includes(c))) {
      result += `## ⚠️ HTML Requirements\n\n`;
      result += `Add to your \`index.html\`:\n\n`;
      result += `\`\`\`html\n`;
      result += `<!-- Material Icons Font (REQUIRED for icons) -->\n`;
      result += `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n`;
      result += `\`\`\`\n\n`;
    }
    
    // Common mistakes
    result += `## Common Mistakes to Avoid\n\n`;
    if (components.includes('tabs')) {
      result += `- ❌ Don't import \`ForgeTabs\` - use \`ForgeTabBar\` and \`ForgeTab\`\n`;
      result += `- ❌ Don't look for \`ForgeTabPanel\` - use conditional rendering\n`;
    }
    if (components.includes('select')) {
      result += `- ❌ Don't import \`ForgeOption\` - use HTML \`<option>\` elements\n`;
    }
    if (components.includes('icon')) {
      result += `- ❌ Don't forget \`defineIconComponent()\` - icons will show as text\n`;
      result += `- ❌ Don't import from \`@tylertech/forge/icon\` - use \`@tylertech/forge\`\n`;
    }
    
    return result;
  }
  
  async getComponentProps(input: z.infer<typeof ComponentPropsSchema>): Promise<string> {
    const { component, framework, showRequired } = input;
    const props = this.componentProps[component.toLowerCase()];
    
    if (!props) {
      return `Component properties for '${component}' are not yet documented. Please refer to the official Forge documentation.`;
    }
    
    let result = `# ${this.formatName(component)} Component Properties\n\n`;
    result += `**Framework:** ${framework}\n\n`;
    
    if (showRequired && props.required.length > 0) {
      result += `## Required Properties\n\n`;
      for (const prop of props.required) {
        const type = props.types?.[prop] || 'any';
        result += `- \`${prop}\`: ${type}\n`;
      }
      result += `\n`;
    }
    
    result += `## Optional Properties\n\n`;
    result += `| Property | Type | Description |\n`;
    result += `|----------|------|-------------|\n`;
    
    for (const prop of props.optional) {
      const type = props.types?.[prop] || 'any';
      result += `| \`${prop}\` | \`${type}\` | ${this.getPropertyDescription(component, prop)} |\n`;
    }
    
    if (props.slots) {
      result += `\n## Available Slots\n\n`;
      for (const slot of props.slots) {
        result += `- \`${slot}\`${this.getSlotDescription(component, slot)}\n`;
      }
    }
    
    result += `\n## Example Usage\n\n`;
    
    if (framework === 'react') {
      result += `\`\`\`tsx\n`;
      const pascalName = this.pascalCase(component);
      result += `<Forge${pascalName}\n`;
      if (props.optional.includes('variant')) {
        result += `  variant="raised"\n`;
      }
      if (props.optional.includes('theme')) {
        result += `  theme="primary"\n`;
      }
      if (props.optional.includes('disabled')) {
        result += `  disabled={false}\n`;
      }
      result += `>\n`;
      if (props.slots) {
        result += `  {/* Slot content */}\n`;
      } else {
        result += `  Content\n`;
      }
      result += `</Forge${pascalName}>\n`;
      result += `\`\`\`\n`;
    } else {
      result += `\`\`\`html\n`;
      result += `<forge-${component}\n`;
      if (props.optional.includes('variant')) {
        result += `  variant="raised"\n`;
      }
      if (props.optional.includes('theme')) {
        result += `  theme="primary"\n`;
      }
      result += `>\n`;
      if (props.slots) {
        result += `  <!-- Slot content -->\n`;
      } else {
        result += `  Content\n`;
      }
      result += `</forge-${component}>\n`;
      result += `\`\`\`\n`;
    }
    
    return result;
  }
  
  private getPropertyDescription(component: string, prop: string): string {
    const descriptions: Record<string, Record<string, string>> = {
      'button': {
        'variant': 'Visual style of the button',
        'theme': 'Color theme',
        'disabled': 'Whether the button is disabled',
        'type': 'HTML button type attribute',
        'dense': 'Reduces padding for compact layouts'
      },
      'text-field': {
        'value': 'The input value',
        'label': 'Label text displayed above the field',
        'placeholder': 'Placeholder text',
        'type': 'HTML input type',
        'disabled': 'Whether the field is disabled',
        'required': 'Whether the field is required',
        'invalid': 'Whether the field is in an invalid state',
        'helperText': 'Helper text displayed below the field'
      }
    };
    
    return descriptions[component]?.[prop] || '';
  }
  
  private getSlotDescription(component: string, slot: string): string {
    const descriptions: Record<string, Record<string, string>> = {
      'scaffold': {
        'left': ' - Left drawer/navigation (NOT body-left!)',
        'right': ' - Right drawer/panel',
        'body': ' - Main content area (NOT body-content!)',
        'header': ' - Top header area',
        'footer': ' - Bottom footer area'
      },
      'drawer': {
        'header': ' - Drawer header content',
        'body': ' - Main drawer content',
        'footer': ' - Drawer footer content'
      }
    };
    
    return descriptions[component]?.[slot] || '';
  }
  
  private addCommonPitfallComments(code: string, options: GenerateComponentOptions): string {
    const { component, framework } = options;
    
    let commentedCode = code;
    
    // Add framework-specific comments
    if (framework === 'react') {
      if (component === 'scaffold') {
        commentedCode = `// ⚠️ COMMON MISTAKE: Using slot="body-left" instead of slot="left"\n` + commentedCode;
        commentedCode = commentedCode.replace(
          '<ForgeDrawer',
          '<ForgeDrawer // Use slot="left" NOT slot="body-left"!'
        );
      }
      
      if (component === 'icon') {
        commentedCode = `// ⚠️ CRITICAL: Must call defineIconComponent() at app startup!\n` +
                       `// Without it, icons will show as text like "menu" or "close"\n` + commentedCode;
      }
      
      if (component === 'select') {
        commentedCode = commentedCode.replace(
          '<ForgeSelect>',
          '<ForgeSelect> {/* Use <option> elements, NOT <ForgeOption>! */}'
        );
      }
    }
    
    return commentedCode;
  }
}
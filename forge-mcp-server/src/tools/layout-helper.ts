import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const GetLayoutSchema = z.object({
  component: z.enum(['scaffold', 'drawer', 'app-bar', 'split-view', 'expansion-panel']).describe('Layout component name'),
  framework: z.enum(['react', 'angular', 'vanilla']).optional().default('react')
});

const ValidateSetupSchema = z.object({
  framework: z.enum(['react', 'angular', 'vanilla']).optional().default('react')
});

const DebugComponentSchema = z.object({
  component: z.string().describe('Component name to debug'),
  issue: z.string().optional().describe('Specific issue description')
});

export class LayoutHelper {
  getLayoutSchema() {
    return zodToJsonSchema(GetLayoutSchema) as any;
  }

  getValidateSetupSchema() {
    return zodToJsonSchema(ValidateSetupSchema) as any;
  }

  getDebugComponentSchema() {
    return zodToJsonSchema(DebugComponentSchema) as any;
  }

  async getLayoutDocumentation(input: z.infer<typeof GetLayoutSchema>): Promise<string> {
    const { component, framework } = input;
    
    const layouts: Record<string, any> = {
      'scaffold': {
        slots: {
          'header': 'Top app bar/header area',
          'left': 'Left drawer/navigation (NOT body-left!)',
          'right': 'Right drawer/sidebar (NOT body-right!)',
          'body': 'Main content area (NOT body-content!)',
          'footer': 'Footer area'
        },
        react: `import { ForgeScaffold, ForgeAppBar, ForgeDrawer } from '@tylertech/forge-react';

function AppLayout() {
  return (
    <ForgeScaffold>
      {/* Header - App Bar */}
      <ForgeAppBar slot="header" titleText="My Application">
        <ForgeIconButton slot="start">
          <ForgeIcon name="menu" />
        </ForgeIconButton>
      </ForgeAppBar>
      
      {/* Left Drawer - Use slot="left" NOT "body-left" */}
      <ForgeDrawer slot="left" open={drawerOpen}>
        <ForgeList>
          <ForgeListItem>
            <ForgeIcon slot="start" name="home" />
            Dashboard
          </ForgeListItem>
        </ForgeList>
      </ForgeDrawer>
      
      {/* Main Content - Use slot="body" NOT "body-content" */}
      <main slot="body" style={{ padding: '24px' }}>
        <ForgeCard>
          <h2>Main Content Area</h2>
          <p>Your application content goes here</p>
        </ForgeCard>
      </main>
      
      {/* Optional Footer */}
      <footer slot="footer">
        © 2024 Your Company
      </footer>
    </ForgeScaffold>
  );
}`,
        vanilla: `<forge-scaffold>
  <!-- Header -->
  <forge-app-bar slot="header" title-text="My Application">
    <forge-icon-button slot="start">
      <forge-icon name="menu"></forge-icon>
    </forge-icon-button>
  </forge-app-bar>
  
  <!-- Left Drawer - Use slot="left" NOT "body-left" -->
  <forge-drawer slot="left">
    <forge-list>
      <forge-list-item>
        <forge-icon slot="start" name="home"></forge-icon>
        Dashboard
      </forge-list-item>
    </forge-list>
  </forge-drawer>
  
  <!-- Main Content - Use slot="body" NOT "body-content" -->
  <main slot="body" class="content-padding">
    <forge-card>
      <h2>Main Content</h2>
    </forge-card>
  </main>
</forge-scaffold>`,
        commonErrors: [
          '❌ slot="body-left" → ✅ slot="left"',
          '❌ slot="body-right" → ✅ slot="right"',
          '❌ slot="body-content" → ✅ slot="body"',
          '❌ Missing slot attribute → Components won\'t render in correct position'
        ]
      },
      
      'drawer': {
        slots: {
          'header': 'Drawer header (optional)',
          'default': 'Main drawer content (no slot needed)'
        },
        properties: {
          'open': 'boolean - Controls drawer visibility',
          'modal': 'boolean - Creates modal overlay',
          'direction': '"left" | "right" | "bottom" - Drawer position'
        },
        react: `import { ForgeDrawer, ForgeList, ForgeListItem } from '@tylertech/forge-react';

function NavigationDrawer({ open, onClose }) {
  return (
    <ForgeDrawer 
      open={open}
      modal={true}
      onForgeDrawerClose={onClose}>
      
      {/* Optional header */}
      <div slot="header" style={{ padding: '16px' }}>
        <h3>Navigation</h3>
      </div>
      
      {/* Main content - no slot needed */}
      <ForgeList>
        <ForgeListItem>
          <ForgeIcon slot="start" name="dashboard" />
          Dashboard
        </ForgeListItem>
        <ForgeListItem>
          <ForgeIcon slot="start" name="settings" />
          Settings
        </ForgeListItem>
      </ForgeList>
    </ForgeDrawer>
  );
}`,
        events: {
          'forge-drawer-open': 'Fired when drawer opens',
          'forge-drawer-close': 'Fired when drawer closes'
        }
      },
      
      'app-bar': {
        slots: {
          'start': 'Left side content (menu button, logo)',
          'center': 'Center content (search, title)',
          'end': 'Right side content (profile, actions)',
          'title': 'Alternative to titleText prop'
        },
        properties: {
          'titleText': 'string - Main title text',
          'fixed': 'boolean - Fixed to top',
          'raised': 'boolean - Show elevation'
        },
        react: `import { ForgeAppBar, ForgeIconButton, ForgeAppBarProfileButton } from '@tylertech/forge-react';

function AppHeader() {
  return (
    <ForgeAppBar titleText="My Application" fixed raised>
      {/* Left side - menu button */}
      <ForgeIconButton slot="start">
        <ForgeIcon name="menu" />
      </ForgeIconButton>
      
      {/* Center - search (optional) */}
      <ForgeTextField slot="center" placeholder="Search...">
        <ForgeIcon slot="leading" name="search" />
      </ForgeTextField>
      
      {/* Right side - profile */}
      <ForgeAppBarProfileButton 
        slot="end"
        fullName="John Doe"
        email="john@example.com"
      />
    </ForgeAppBar>
  );
}`
      },
      
      'expansion-panel': {
        slots: {
          'default': 'Panel header content',
          'content': 'Expandable content area'
        },
        properties: {
          'open': 'boolean - Expanded state',
          'disabled': 'boolean - Disable interaction'
        },
        react: `import { ForgeExpansionPanel } from '@tylertech/forge-react';

function ExpandableSection() {
  const [open, setOpen] = useState(false);
  
  return (
    <ForgeExpansionPanel 
      open={open}
      onForgeExpansionPanelToggle={(e) => setOpen(e.detail)}>
      
      {/* Header - default slot */}
      <div style={{ padding: '16px' }}>
        <h3>Section Title</h3>
        <p>Click to expand</p>
      </div>
      
      {/* Content - use slot="content" */}
      <div slot="content" style={{ padding: '16px' }}>
        <p>Expandable content goes here</p>
        <ForgeButton>Action</ForgeButton>
      </div>
    </ForgeExpansionPanel>
  );
}`,
        events: {
          'forge-expansion-panel-toggle': 'Fired when panel toggles (detail: boolean)'
        },
        commonErrors: [
          '❌ onToggle → ✅ onForgeExpansionPanelToggle',
          '❌ Missing slot="content" → Content won\'t be hidden/shown'
        ]
      },
      
      'split-view': {
        slots: {
          'start': 'Left/top panel',
          'end': 'Right/bottom panel'
        },
        properties: {
          'orientation': '"horizontal" | "vertical"',
          'resizable': 'boolean - Allow resizing',
          'initialSize': 'number - Initial size of start panel'
        },
        react: `import { ForgeSplitView } from '@tylertech/forge-react';

function SplitLayout() {
  return (
    <ForgeSplitView 
      orientation="horizontal"
      resizable
      initialSize={300}>
      
      {/* Left panel */}
      <div slot="start" style={{ padding: '16px' }}>
        <h3>Sidebar</h3>
        <ForgeList>
          <ForgeListItem>Item 1</ForgeListItem>
          <ForgeListItem>Item 2</ForgeListItem>
        </ForgeList>
      </div>
      
      {/* Right panel */}
      <div slot="end" style={{ padding: '16px' }}>
        <h3>Content</h3>
        <p>Main content area</p>
      </div>
    </ForgeSplitView>
  );
}`
      }
    };
    
    const layoutInfo = layouts[component];
    if (!layoutInfo) {
      return `# Component not found: ${component}`;
    }
    
    let doc = `# ${this.formatComponentName(component)} - Complete Layout Documentation\n\n`;
    
    // CRITICAL: Slot names
    doc += `## 🚨 CRITICAL: Correct Slot Names\n\n`;
    doc += `**USE THESE EXACT SLOT NAMES:**\n\n`;
    for (const [slot, description] of Object.entries(layoutInfo.slots)) {
      doc += `- \`slot="${slot}"\` - ${description}\n`;
    }
    doc += `\n`;
    
    // Common errors
    if (layoutInfo.commonErrors) {
      doc += `### ⚠️ Common Slot Errors\n\n`;
      layoutInfo.commonErrors.forEach((error: string) => {
        doc += `- ${error}\n`;
      });
      doc += `\n`;
    }
    
    // Properties
    if (layoutInfo.properties) {
      doc += `## Properties\n\n`;
      for (const [prop, description] of Object.entries(layoutInfo.properties)) {
        doc += `- \`${prop}\` - ${description}\n`;
      }
      doc += `\n`;
    }
    
    // Events
    if (layoutInfo.events) {
      doc += `## Events\n\n`;
      for (const [event, description] of Object.entries(layoutInfo.events)) {
        doc += `- \`${event}\` - ${description}\n`;
      }
      doc += `\n`;
    }
    
    // Complete example
    doc += `## Complete Working Example (${framework.toUpperCase()})\n\n`;
    doc += `\`\`\`${framework === 'react' ? 'typescript' : 'html'}\n`;
    doc += layoutInfo[framework] || layoutInfo.vanilla;
    doc += `\n\`\`\`\n`;
    
    return doc;
  }

  async validateSetup(input: z.infer<typeof ValidateSetupSchema>): Promise<string> {
    const { framework } = input;
    
    let validation = `# Forge Setup Validation Checklist\n\n`;
    validation += `## Framework: ${framework.toUpperCase()}\n\n`;
    
    validation += `### 1. Component Registration Check\n\n`;
    validation += `\`\`\`javascript\n`;
    validation += `// Run in browser console:\n`;
    validation += `const checks = {\n`;
    validation += `  icon: customElements.get('forge-icon') !== undefined,\n`;
    validation += `  button: customElements.get('forge-button') !== undefined,\n`;
    validation += `  scaffold: customElements.get('forge-scaffold') !== undefined,\n`;
    validation += `  card: customElements.get('forge-card') !== undefined\n`;
    validation += `};\n`;
    validation += `console.table(checks);\n`;
    validation += `// All should be true\n`;
    validation += `\`\`\`\n\n`;
    
    validation += `### 2. Icon Setup Check\n\n`;
    validation += `\`\`\`javascript\n`;
    validation += `// Check if icons are showing as text:\n`;
    validation += `const iconElement = document.querySelector('forge-icon');\n`;
    validation += `if (iconElement && iconElement.textContent === iconElement.getAttribute('name')) {\n`;
    validation += `  console.error('❌ Icons showing as text - defineIconComponent() not called!');\n`;
    validation += `} else {\n`;
    validation += `  console.log('✅ Icons configured correctly');\n`;
    validation += `}\n`;
    validation += `\`\`\`\n\n`;
    
    validation += `### 3. CSS Loading Check\n\n`;
    validation += `\`\`\`javascript\n`;
    validation += `// Check if Forge CSS is loaded:\n`;
    validation += `const styles = Array.from(document.styleSheets);\n`;
    validation += `const forgeCSS = styles.some(sheet => \n`;
    validation += `  sheet.href?.includes('forge.css') || \n`;
    validation += `  sheet.href?.includes('forge-core.css')\n`;
    validation += `);\n`;
    validation += `console.log(forgeCSS ? '✅ Forge CSS loaded' : '❌ Forge CSS missing');\n`;
    validation += `\`\`\`\n\n`;
    
    validation += `### 4. Material Icons Font Check\n\n`;
    validation += `\`\`\`javascript\n`;
    validation += `// Check if Material Icons font is loaded:\n`;
    validation += `const testIcon = document.createElement('i');\n`;
    validation += `testIcon.className = 'material-icons';\n`;
    validation += `testIcon.textContent = 'home';\n`;
    validation += `document.body.appendChild(testIcon);\n`;
    validation += `const computed = window.getComputedStyle(testIcon);\n`;
    validation += `const hasFont = computed.fontFamily.includes('Material Icons');\n`;
    validation += `document.body.removeChild(testIcon);\n`;
    validation += `console.log(hasFont ? '✅ Material Icons loaded' : '❌ Material Icons missing');\n`;
    validation += `\`\`\`\n\n`;
    
    if (framework === 'react') {
      validation += `### 5. React-Specific Checks\n\n`;
      validation += `\`\`\`typescript\n`;
      validation += `// Verify imports:\n`;
      validation += `import { ForgeButton, ForgeIcon, ForgeScaffold } from '@tylertech/forge-react';\n`;
      validation += `\n`;
      validation += `// Test component render:\n`;
      validation += `function TestComponent() {\n`;
      validation += `  return (\n`;
      validation += `    <div>\n`;
      validation += `      <ForgeButton>Test Button</ForgeButton>\n`;
      validation += `      <ForgeIcon name="home" />\n`;
      validation += `    </div>\n`;
      validation += `  );\n`;
      validation += `}\n`;
      validation += `// Should compile without TypeScript errors\n`;
      validation += `\`\`\`\n\n`;
    }
    
    validation += `### 6. Complete Setup Verification\n\n`;
    validation += `If all checks pass, your setup is complete! If any fail:\n\n`;
    validation += `1. ❌ Components undefined → Run \`defineComponents()\`\n`;
    validation += `2. ❌ Icons as text → Run \`defineIconComponent()\`\n`;
    validation += `3. ❌ No styles → Import Forge CSS files\n`;
    validation += `4. ❌ No icon font → Add Material Icons link to HTML\n`;
    validation += `5. ❌ TypeScript errors → Use React wrappers, not raw elements\n`;
    
    return validation;
  }

  async debugComponent(input: z.infer<typeof DebugComponentSchema>): Promise<string> {
    const { component, issue } = input;
    
    let debug = `# Debugging: ${component}\n\n`;
    
    if (issue) {
      debug += `## Reported Issue\n${issue}\n\n`;
    }
    
    debug += `## Diagnostic Steps\n\n`;
    
    debug += `### 1. Check Component Registration\n\n`;
    debug += `\`\`\`javascript\n`;
    debug += `// Is the component defined?\n`;
    debug += `const isDefined = customElements.get('forge-${component}') !== undefined;\n`;
    debug += `console.log('Component defined:', isDefined);\n`;
    debug += `\n`;
    debug += `// If false, you need to call:\n`;
    debug += `import { define${this.toPascalCase(component)}Component } from '@tylertech/forge';\n`;
    debug += `define${this.toPascalCase(component)}Component();\n`;
    debug += `\`\`\`\n\n`;
    
    debug += `### 2. Check Element in DOM\n\n`;
    debug += `\`\`\`javascript\n`;
    debug += `// Find all instances:\n`;
    debug += `const elements = document.querySelectorAll('forge-${component}');\n`;
    debug += `console.log('Found elements:', elements.length);\n`;
    debug += `\n`;
    debug += `// Check first element:\n`;
    debug += `if (elements.length > 0) {\n`;
    debug += `  const el = elements[0];\n`;
    debug += `  console.log('Element:', el);\n`;
    debug += `  console.log('Attributes:', Array.from(el.attributes).map(a => \`\${a.name}="\${a.value}"\`));\n`;
    debug += `  console.log('Has shadow root:', !!el.shadowRoot);\n`;
    debug += `  console.log('Child elements:', el.children.length);\n`;
    debug += `}\n`;
    debug += `\`\`\`\n\n`;
    
    debug += `### 3. Check Slots (if layout component)\n\n`;
    debug += `\`\`\`javascript\n`;
    debug += `// Check slotted content:\n`;
    debug += `const el = document.querySelector('forge-${component}');\n`;
    debug += `if (el) {\n`;
    debug += `  const slots = el.querySelectorAll('[slot]');\n`;
    debug += `  console.log('Slotted elements:');\n`;
    debug += `  slots.forEach(slot => {\n`;
    debug += `    console.log(\`  slot="\${slot.getAttribute('slot')}" - \${slot.tagName}\`);\n`;
    debug += `  });\n`;
    debug += `}\n`;
    debug += `\`\`\`\n\n`;
    
    debug += `### 4. Check Styling\n\n`;
    debug += `\`\`\`javascript\n`;
    debug += `// Check computed styles:\n`;
    debug += `const el = document.querySelector('forge-${component}');\n`;
    debug += `if (el) {\n`;
    debug += `  const computed = window.getComputedStyle(el);\n`;
    debug += `  console.log('Display:', computed.display);\n`;
    debug += `  console.log('Visibility:', computed.visibility);\n`;
    debug += `  console.log('Width:', computed.width);\n`;
    debug += `  console.log('Height:', computed.height);\n`;
    debug += `  console.log('Position:', computed.position);\n`;
    debug += `}\n`;
    debug += `\`\`\`\n\n`;
    
    debug += `### 5. Check Console Errors\n\n`;
    debug += `Look for these common errors:\n\n`;
    debug += `- \`Cannot read properties of undefined\` → Component not registered\n`;
    debug += `- \`Failed to execute 'define' on 'CustomElementRegistry'\` → Component already defined\n`;
    debug += `- \`The result is not a constructor\` → Import error\n`;
    debug += `- \`Slot not found\` → Using wrong slot name\n\n`;
    
    debug += `### 6. Common Fixes\n\n`;
    debug += this.getCommonFixes(component);
    
    return debug;
  }

  private getCommonFixes(component: string): string {
    const fixes: Record<string, string> = {
      'scaffold': `- **Nothing rendering**: Check slot names (use \`slot="left"\` not \`slot="body-left"\`)
- **Drawer not showing**: Ensure \`open\` prop is set on drawer
- **Content cut off**: Add height: 100vh to scaffold container
- **Scrolling issues**: Check overflow settings on body slot`,

      'drawer': `- **Not opening**: Check \`open\` prop binding
- **Not closing**: Listen for \`forge-drawer-close\` event
- **Behind content**: Check z-index and modal prop
- **Wrong position**: Set \`direction\` prop`,

      'expansion-panel': `- **Not expanding**: Check \`open\` prop and toggle event
- **Content always visible**: Use \`slot="content"\` for expandable part
- **Event not firing**: Use \`onForgeExpansionPanelToggle\` not \`onToggle\``,

      'icon': `- **Shows as text**: Call \`defineIconComponent()\` before use
- **Icon missing**: Register with \`IconRegistry.define()\`
- **Wrong icon**: Check exact name spelling
- **No icon font**: Add Material Icons link to HTML`,

      'button': `- **Not clickable**: Check \`disabled\` prop
- **No ripple**: Ensure CSS is loaded
- **Wrong color**: Check \`theme\` prop values
- **TypeScript error**: Import from \`@tylertech/forge-react\``
    };

    return fixes[component] || `- Check component registration
- Verify correct import path
- Ensure CSS is loaded
- Check browser console for errors`;
  }

  private formatComponentName(name: string): string {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  private toPascalCase(str: string): string {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
  }
}
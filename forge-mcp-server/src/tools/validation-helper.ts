import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Schemas for validation methods
const ValidateSetupSchema = z.object({
  framework: z.enum(['react', 'angular', 'vue', 'vanilla']).describe('The framework being used'),
  projectPath: z.string().optional().describe('Path to the project root (optional)')
});

const ValidateSlotsSchema = z.object({
  component: z.string().describe('The component name (e.g., scaffold, drawer)'),
  slots: z.array(z.string()).describe('The slot names being used in the code')
});

const PreFlightCheckSchema = z.object({
  framework: z.enum(['react', 'angular', 'vue', 'vanilla']).describe('The framework being used'),
  components: z.array(z.string()).describe('List of components being used'),
  projectPath: z.string().optional().describe('Path to the project root (optional)')
});

const DecodeErrorSchema = z.object({
  error: z.string().describe('The error message to decode'),
  context: z.string().optional().describe('Additional context about when the error occurred')
});

export class ValidationHelper {
  private componentSlotMap: Record<string, any> = {
    'scaffold': {
      correct: ['left', 'right', 'body', 'header', 'footer'],
      incorrect: {
        'body-left': 'left',
        'body-right': 'right',
        'body-content': 'body',
        'main': 'body',
        'content': 'body'
      }
    },
    'drawer': {
      correct: ['header', 'body', 'footer'],
      incorrect: {
        'content': 'body',
        'main': 'body'
      }
    },
    'app-bar': {
      correct: ['start', 'center', 'end', 'logo', 'search'],
      incorrect: {
        'left': 'start',
        'right': 'end',
        'middle': 'center'
      }
    },
    'expansion-panel': {
      correct: ['header', 'content'],
      incorrect: {
        'body': 'content',
        'panel-content': 'content'
      }
    },
    'split-view': {
      correct: ['primary', 'secondary'],
      incorrect: {
        'left': 'primary',
        'right': 'secondary',
        'main': 'primary'
      }
    }
  };

  private errorPatterns = [
    {
      pattern: /Cannot find module ['"]@tylertech\/forge\/icon['"]/,
      solution: "Icon imports should be from '@tylertech/forge', not '@tylertech/forge/icon'. Change your import to: import { IconRegistry } from '@tylertech/forge';"
    },
    {
      pattern: /TypeError: Cannot read property ['"]define['"] of undefined/,
      solution: "IconRegistry is not imported. Add: import { IconRegistry } from '@tylertech/forge'; at the top of your file."
    },
    {
      pattern: /defineIconComponent is not defined/,
      solution: "Missing icon component definition. Add: import { defineIconComponent } from '@tylertech/forge'; and call defineIconComponent(); in your setup."
    },
    {
      pattern: /forge-[\w-]+ is not a registered element/,
      solution: "Component not registered. You need to import and call the define function. Example: import { defineButtonComponent } from '@tylertech/forge'; defineButtonComponent();"
    },
    {
      pattern: /Icons? (showing|displaying|appearing) as (text|boxes|squares)/i,
      solution: "Icons showing as text means: 1) Material Icons font not loaded - add <link> to index.html, 2) defineIconComponent() not called - add to setup, 3) Wrong icon name - verify icon exists"
    },
    {
      pattern: /slot=['"]body-left['"]/,
      solution: "Incorrect slot name. Use slot='left' instead of slot='body-left' for ForgeScaffold drawer."
    },
    {
      pattern: /slot=['"]body-content['"]/,
      solution: "Incorrect slot name. Use slot='body' instead of slot='body-content' for ForgeScaffold main content."
    },
    {
      pattern: /ForgeTabs/,
      solution: "Component name has changed. Use 'ForgeTabBar' and 'ForgeTab' instead of 'ForgeTabs'. Note: There is no ForgeTabPanel component - use conditional rendering instead."
    },
    {
      pattern: /ForgeProgressBar/,
      solution: "Component name is 'ForgeLinearProgress' not 'ForgeProgressBar'."
    },
    {
      pattern: /ForgeSelect.*ForgeOption/,
      solution: "ForgeSelect uses <option> HTML elements, not ForgeOption components. Use: <ForgeSelect><option value='1'>Option 1</option></ForgeSelect>"
    }
  ];

  getSetupSchema() {
    return zodToJsonSchema(ValidateSetupSchema);
  }

  getSlotsSchema() {
    return zodToJsonSchema(ValidateSlotsSchema);
  }

  getPreFlightSchema() {
    return zodToJsonSchema(PreFlightCheckSchema);
  }

  getDecodeErrorSchema() {
    return zodToJsonSchema(DecodeErrorSchema);
  }

  async validateSetup(input: z.infer<typeof ValidateSetupSchema>): Promise<string> {
    const { framework } = input;
    
    let checklist = `# 🔍 Tyler Forge Setup Validation (${framework.toUpperCase()})\n\n`;
    checklist += `## Critical Setup Checklist\n\n`;

    // Check 1: Package Installation
    checklist += `### 1. Package Installation\n`;
    checklist += `❓ **Check:** Is @tylertech/forge installed?\n`;
    checklist += `   \`\`\`bash\n   npm list @tylertech/forge\n   \`\`\`\n`;
    checklist += `   ✅ Should show: @tylertech/forge@3.x.x\n`;
    checklist += `   ❌ If missing: \`npm install @tylertech/forge\`\n\n`;

    if (framework === 'react') {
      checklist += `❓ **Check:** Is @tylertech/forge-react installed?\n`;
      checklist += `   \`\`\`bash\n   npm list @tylertech/forge-react\n   \`\`\`\n`;
      checklist += `   ✅ Should show: @tylertech/forge-react@3.x.x\n`;
      checklist += `   ❌ If missing: \`npm install @tylertech/forge-react\`\n\n`;
    }

    // Check 2: Material Icons Font
    checklist += `### 2. Material Icons Font (CRITICAL!)\n`;
    checklist += `❓ **Check:** Is Material Icons font loaded in index.html?\n`;
    checklist += `   Look for this in your HTML <head>:\n`;
    checklist += `   \`\`\`html\n`;
    checklist += `   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n`;
    checklist += `   \`\`\`\n`;
    checklist += `   ✅ If present: Icons will render correctly\n`;
    checklist += `   ❌ If missing: Icons will show as text like "menu" or "close"\n\n`;

    // Check 3: Component Registration
    checklist += `### 3. Component Registration\n`;
    checklist += `❓ **Check:** Are components defined/registered?\n`;
    if (framework === 'vanilla') {
      checklist += `   In your main setup file:\n`;
      checklist += `   \`\`\`javascript\n`;
      checklist += `   import { defineButtonComponent, defineIconComponent } from '@tylertech/forge';\n`;
      checklist += `   \n`;
      checklist += `   // CRITICAL: Must call these functions!\n`;
      checklist += `   defineIconComponent();  // <-- Without this, icons show as text!\n`;
      checklist += `   defineButtonComponent();\n`;
      checklist += `   \`\`\`\n`;
    } else if (framework === 'react') {
      checklist += `   In your main App.tsx or index.tsx:\n`;
      checklist += `   \`\`\`typescript\n`;
      checklist += `   import { defineIconComponent } from '@tylertech/forge';\n`;
      checklist += `   \n`;
      checklist += `   // Call this ONCE at app startup\n`;
      checklist += `   defineIconComponent();  // <-- Without this, icons show as text!\n`;
      checklist += `   \`\`\`\n`;
      checklist += `   Note: Other components auto-register when using @tylertech/forge-react\n`;
    }
    checklist += `   ✅ Components render correctly\n`;
    checklist += `   ❌ If missing: "forge-xxx is not a registered element" errors\n\n`;

    // Check 4: Icon Registry
    checklist += `### 4. Icon Registry Setup\n`;
    checklist += `❓ **Check:** Is IconRegistry imported and configured?\n`;
    checklist += `   \`\`\`typescript\n`;
    checklist += `   import { IconRegistry } from '@tylertech/forge';\n`;
    checklist += `   import { tylIconFace } from '@tylertech/tyler-icons/standard';\n`;
    checklist += `   \n`;
    checklist += `   IconRegistry.define(tylIconFace);\n`;
    checklist += `   \`\`\`\n`;
    checklist += `   ✅ Custom Tyler icons work\n`;
    checklist += `   ❌ If missing: Tyler-specific icons won't render\n\n`;

    // Check 5: Styles
    checklist += `### 5. Component Styles\n`;
    checklist += `❓ **Check:** Are Forge styles imported?\n`;
    if (framework === 'react' || framework === 'vanilla') {
      checklist += `   \`\`\`css\n`;
      checklist += `   /* In your main CSS or component */\n`;
      checklist += `   @import '@tylertech/forge/dist/forge.css';\n`;
      checklist += `   \`\`\`\n`;
      checklist += `   Or for specific components:\n`;
      checklist += `   \`\`\`css\n`;
      checklist += `   @import '@tylertech/forge/dist/button/forge-button.css';\n`;
      checklist += `   \`\`\`\n`;
    }
    checklist += `   ✅ Components styled correctly\n`;
    checklist += `   ❌ If missing: Components render but look broken\n\n`;

    // Check 6: Common Pitfalls
    checklist += `### 6. Common Pitfalls to Check\n`;
    checklist += `- ❓ Using \`slot="body-left"\`? → Use \`slot="left"\`\n`;
    checklist += `- ❓ Using \`slot="body-content"\`? → Use \`slot="body"\`\n`;
    checklist += `- ❓ Looking for \`ForgeTabs\`? → Use \`ForgeTabBar\` and \`ForgeTab\`\n`;
    checklist += `- ❓ Looking for \`ForgeTabPanel\`? → Use conditional rendering\n`;
    checklist += `- ❓ Using \`ForgeOption\`? → Use HTML \`<option>\` elements\n`;
    checklist += `- ❓ Icons showing as text? → Check steps 2 and 3 above\n\n`;

    checklist += `## Quick Fix Commands\n\n`;
    checklist += `\`\`\`bash\n`;
    checklist += `# Install everything needed\n`;
    if (framework === 'react') {
      checklist += `npm install @tylertech/forge @tylertech/forge-react\n\n`;
    } else {
      checklist += `npm install @tylertech/forge\n\n`;
    }
    checklist += `# If using Tyler icons\n`;
    checklist += `npm install @tylertech/tyler-icons\n`;
    checklist += `\`\`\`\n\n`;

    checklist += `## Validation Result\n`;
    checklist += `Run through each check above. If all show ✅, your setup is complete!\n`;
    checklist += `If any show ❌, follow the fix instructions provided.\n`;

    return checklist;
  }

  async validateSlots(input: z.infer<typeof ValidateSlotsSchema>): Promise<string> {
    const { component, slots } = input;
    const componentSlots = this.componentSlotMap[component.toLowerCase()];
    
    if (!componentSlots) {
      return `Component '${component}' slot validation not available. Component may not use slots or is not a layout component.`;
    }

    let result = `# Slot Validation for ${component}\n\n`;
    const errors: string[] = [];
    const warnings: string[] = [];
    const correct: string[] = [];

    for (const slot of slots) {
      if (componentSlots.correct.includes(slot)) {
        correct.push(slot);
      } else if (componentSlots.incorrect[slot]) {
        errors.push(`❌ "${slot}" should be "${componentSlots.incorrect[slot]}"`);
      } else {
        warnings.push(`⚠️ "${slot}" is not a recognized slot for ${component}`);
      }
    }

    if (errors.length > 0) {
      result += `## Errors Found\n`;
      errors.forEach(error => result += `${error}\n`);
      result += `\n`;
    }

    if (warnings.length > 0) {
      result += `## Warnings\n`;
      warnings.forEach(warning => result += `${warning}\n`);
      result += `\n`;
    }

    if (correct.length > 0) {
      result += `## Correct Slots\n`;
      correct.forEach(slot => result += `✅ "${slot}"\n`);
      result += `\n`;
    }

    result += `## Valid Slots for ${component}\n`;
    componentSlots.correct.forEach((slot: string) => {
      result += `- \`${slot}\`\n`;
    });
    result += `\n`;

    if (errors.length > 0) {
      result += `## How to Fix\n`;
      result += `Replace the incorrect slot names in your code:\n\n`;
      errors.forEach(error => {
        const match = error.match(/"([^"]+)" should be "([^"]+)"/);
        if (match) {
          result += `\`\`\`diff\n`;
          result += `- slot="${match[1]}"\n`;
          result += `+ slot="${match[2]}"\n`;
          result += `\`\`\`\n`;
        }
      });
    }

    return result;
  }

  async preFlightCheck(input: z.infer<typeof PreFlightCheckSchema>): Promise<string> {
    const { framework, components } = input;
    
    let report = `# 🚀 Pre-Flight Check Report\n\n`;
    report += `**Framework:** ${framework}\n`;
    report += `**Components:** ${components.join(', ')}\n\n`;

    report += `## Required Dependencies\n\n`;
    report += `### NPM Packages\n`;
    report += `\`\`\`json\n`;
    report += `{\n`;
    report += `  "@tylertech/forge": "^3.0.0"`;
    if (framework === 'react') {
      report += `,\n  "@tylertech/forge-react": "^3.0.0"`;
    } else if (framework === 'angular') {
      report += `,\n  "@tylertech/forge-angular": "^3.0.0"`;
    }
    report += `\n}\n`;
    report += `\`\`\`\n\n`;

    report += `## Required HTML Setup\n\n`;
    report += `### index.html\n`;
    report += `\`\`\`html\n`;
    report += `<!DOCTYPE html>\n`;
    report += `<html>\n`;
    report += `<head>\n`;
    report += `  <!-- CRITICAL: Material Icons Font -->\n`;
    report += `  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n`;
    report += `  \n`;
    report += `  <!-- Optional: Roboto Font -->\n`;
    report += `  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">\n`;
    report += `</head>\n`;
    report += `</html>\n`;
    report += `\`\`\`\n\n`;

    report += `## Component-Specific Requirements\n\n`;

    // Check for specific components that need special setup
    const needsIconSetup = components.some(c => 
      ['icon', 'icon-button', 'app-bar', 'drawer', 'scaffold'].includes(c.toLowerCase())
    );

    if (needsIconSetup) {
      report += `### ⚠️ Icon Component Detected\n`;
      report += `You're using components with icons. Required setup:\n\n`;
      report += `\`\`\`${framework === 'react' ? 'typescript' : 'javascript'}\n`;
      report += `import { defineIconComponent } from '@tylertech/forge';\n`;
      report += `\n`;
      report += `// MUST be called once at app startup!\n`;
      report += `defineIconComponent();\n`;
      report += `\`\`\`\n\n`;
    }

    const needsScaffoldSetup = components.some(c => c.toLowerCase() === 'scaffold');
    if (needsScaffoldSetup) {
      report += `### ⚠️ Scaffold Component Detected\n`;
      report += `Critical slot names for ForgeScaffold:\n`;
      report += `- Use \`slot="left"\` (NOT "body-left")\n`;
      report += `- Use \`slot="body"\` (NOT "body-content")\n`;
      report += `- Use \`slot="right"\` (NOT "body-right")\n\n`;
    }

    const needsFormSetup = components.some(c => 
      ['text-field', 'select', 'checkbox', 'radio', 'switch'].includes(c.toLowerCase())
    );
    if (needsFormSetup) {
      report += `### ⚠️ Form Components Detected\n`;
      report += `Form components need field wrapper for proper styling:\n`;
      report += `\`\`\`${framework === 'react' ? 'tsx' : 'html'}\n`;
      if (framework === 'react') {
        report += `<ForgeField>\n`;
        report += `  <ForgeLabel>Label Text</ForgeLabel>\n`;
        report += `  <ForgeTextField />\n`;
        report += `</ForgeField>\n`;
      } else {
        report += `<forge-field>\n`;
        report += `  <forge-label>Label Text</forge-label>\n`;
        report += `  <forge-text-field></forge-text-field>\n`;
        report += `</forge-field>\n`;
      }
      report += `\`\`\`\n\n`;
    }

    report += `## Setup Script\n\n`;
    report += `Copy and run this complete setup:\n\n`;

    if (framework === 'react') {
      report += `\`\`\`typescript\n`;
      report += `// app-setup.ts\n`;
      report += `import { defineIconComponent } from '@tylertech/forge';\n`;
      if (components.some(c => c.toLowerCase() === 'icon')) {
        report += `import { IconRegistry } from '@tylertech/forge';\n`;
        report += `import { tylIconFace } from '@tylertech/tyler-icons/standard';\n`;
      }
      report += `\n`;
      report += `export function setupForge() {\n`;
      report += `  // Define icon component (critical!)\n`;
      report += `  defineIconComponent();\n`;
      if (components.some(c => c.toLowerCase() === 'icon')) {
        report += `  \n`;
        report += `  // Register Tyler icons (optional)\n`;
        report += `  IconRegistry.define(tylIconFace);\n`;
      }
      report += `}\n`;
      report += `\n`;
      report += `// Call in your index.tsx or App.tsx\n`;
      report += `setupForge();\n`;
      report += `\`\`\`\n`;
    } else {
      report += `\`\`\`javascript\n`;
      report += `// setup.js\n`;
      components.forEach(comp => {
        const pascalName = comp.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
        report += `import { define${pascalName}Component } from '@tylertech/forge';\n`;
      });
      report += `\n`;
      report += `// Register all components\n`;
      components.forEach(comp => {
        const pascalName = comp.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
        report += `define${pascalName}Component();\n`;
      });
      report += `\`\`\`\n`;
    }

    report += `\n## Verification Steps\n\n`;
    report += `1. ✓ Install packages: \`npm install\`\n`;
    report += `2. ✓ Add Material Icons font to HTML\n`;
    report += `3. ✓ Run setup script at app startup\n`;
    report += `4. ✓ Test a simple component:\n\n`;
    
    if (framework === 'react') {
      report += `\`\`\`tsx\n`;
      report += `<ForgeButton variant="raised">\n`;
      report += `  <ForgeIcon name="check" />\n`;
      report += `  Test Button\n`;
      report += `</ForgeButton>\n`;
      report += `\`\`\`\n`;
    } else {
      report += `\`\`\`html\n`;
      report += `<forge-button variant="raised">\n`;
      report += `  <forge-icon name="check"></forge-icon>\n`;
      report += `  Test Button\n`;
      report += `</forge-button>\n`;
      report += `\`\`\`\n`;
    }

    report += `\nIf the button renders with an icon, setup is complete! ✅\n`;

    return report;
  }

  async decodeError(input: z.infer<typeof DecodeErrorSchema>): Promise<string> {
    const { error, context } = input;
    
    let result = `# 🔍 Error Analysis\n\n`;
    result += `## Original Error\n\`\`\`\n${error}\n\`\`\`\n\n`;
    
    if (context) {
      result += `## Context\n${context}\n\n`;
    }

    let foundMatch = false;
    
    for (const errorPattern of this.errorPatterns) {
      if (errorPattern.pattern.test(error)) {
        foundMatch = true;
        result += `## ✅ Solution Found\n\n`;
        result += `${errorPattern.solution}\n\n`;
        
        // Add specific code examples based on the error
        if (error.includes('defineIconComponent')) {
          result += `### Complete Fix\n\`\`\`typescript\n`;
          result += `// At the top of your main file (App.tsx, index.tsx, main.ts)\n`;
          result += `import { defineIconComponent } from '@tylertech/forge';\n\n`;
          result += `// Call this ONCE at startup\n`;
          result += `defineIconComponent();\n`;
          result += `\`\`\`\n\n`;
        }
        
        if (error.includes('body-left') || error.includes('body-content')) {
          result += `### Correct Slot Names\n`;
          result += `\`\`\`diff\n`;
          result += `- <ForgeDrawer slot="body-left">  // WRONG\n`;
          result += `+ <ForgeDrawer slot="left">       // CORRECT\n\n`;
          result += `- <div slot="body-content">       // WRONG\n`;
          result += `+ <div slot="body">               // CORRECT\n`;
          result += `\`\`\`\n\n`;
        }
        
        if (error.includes('@tylertech/forge/icon')) {
          result += `### Correct Import\n`;
          result += `\`\`\`diff\n`;
          result += `- import { IconRegistry } from '@tylertech/forge/icon';  // WRONG\n`;
          result += `+ import { IconRegistry } from '@tylertech/forge';       // CORRECT\n`;
          result += `\`\`\`\n\n`;
        }
        
        break;
      }
    }
    
    if (!foundMatch) {
      // Try to provide generic guidance
      result += `## 🤔 No Exact Match Found\n\n`;
      result += `This error doesn't match known patterns, but here are common issues to check:\n\n`;
      
      if (error.toLowerCase().includes('icon')) {
        result += `### Icon-Related Issue Detected\n`;
        result += `1. Check Material Icons font is loaded in HTML\n`;
        result += `2. Ensure defineIconComponent() is called\n`;
        result += `3. Verify icon name exists in Material Icons\n\n`;
      }
      
      if (error.toLowerCase().includes('slot')) {
        result += `### Slot-Related Issue Detected\n`;
        result += `Common slot name corrections:\n`;
        result += `- "body-left" → "left"\n`;
        result += `- "body-content" → "body"\n`;
        result += `- "body-right" → "right"\n\n`;
      }
      
      if (error.toLowerCase().includes('not defined') || error.toLowerCase().includes('not found')) {
        result += `### Import/Registration Issue\n`;
        result += `1. Check component is imported correctly\n`;
        result += `2. Ensure define functions are called\n`;
        result += `3. Verify package is installed: \`npm list @tylertech/forge\`\n\n`;
      }
      
      result += `### General Debugging Steps\n`;
      result += `1. Check browser console for additional errors\n`;
      result += `2. Verify all packages are installed\n`;
      result += `3. Ensure setup code runs before components render\n`;
      result += `4. Check Network tab for failed resource loads\n`;
    }
    
    result += `## Need More Help?\n`;
    result += `If this doesn't resolve your issue, please provide:\n`;
    result += `1. Full error message\n`;
    result += `2. Relevant code snippet\n`;
    result += `3. Framework and Forge versions\n`;
    result += `4. Browser console output\n`;
    
    return result;
  }
}
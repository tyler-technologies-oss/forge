import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Common Material Icons that are available
const COMMON_MATERIAL_ICONS = [
  'menu', 'close', 'home', 'settings', 'search', 'favorite', 'delete', 'edit',
  'add', 'remove', 'arrow_back', 'arrow_forward', 'chevron_left', 'chevron_right',
  'expand_more', 'expand_less', 'check', 'clear', 'info', 'warning', 'error',
  'help', 'visibility', 'visibility_off', 'lock', 'lock_open', 'person', 'group',
  'calendar_today', 'schedule', 'done', 'refresh', 'more_vert', 'more_horiz',
  'file_download', 'file_upload', 'share', 'print', 'save', 'brightness_5',
  'brightness_4', 'notifications', 'notifications_off', 'email', 'phone'
];

// Tyler Icons available in the package
const TYLER_ICONS = [
  'forge-logo', 'tyler-logo', 'account', 'alert', 'calendar', 'check-circle',
  'chevron-down', 'chevron-up', 'close-circle', 'cloud', 'dashboard', 'document',
  'download', 'edit-pencil', 'folder', 'gear', 'globe', 'graph', 'heart',
  'help-circle', 'home-outline', 'info-circle', 'link', 'list', 'location',
  'lock-closed', 'mail', 'map', 'menu-hamburger', 'minus-circle', 'plus-circle',
  'refresh-circle', 'search-magnify', 'star', 'trash', 'upload', 'user', 'users'
];

const IconSetupSchema = z.object({
  framework: z.enum(['react', 'angular', 'vue', 'svelte', 'vanilla']).describe('Target framework')
});

const ValidateIconSchema = z.object({
  name: z.string().describe('Icon name to validate'),
  source: z.enum(['material', 'tyler', 'any']).optional().default('any').describe('Icon source')
});

const TroubleshootSchema = z.object({
  issue: z.enum([
    'icons_showing_as_text',
    'icons_not_found',
    'icons_not_displaying',
    'typescript_errors',
    'missing_fonts',
    'registration_issues'
  ]).describe('The issue to troubleshoot')
});

export class IconHelper {
  getSetupSchema() {
    return zodToJsonSchema(IconSetupSchema) as any;
  }

  getValidateSchema() {
    return zodToJsonSchema(ValidateIconSchema) as any;
  }

  getTroubleshootSchema() {
    return zodToJsonSchema(TroubleshootSchema) as any;
  }

  async getIconSetup(input: z.infer<typeof IconSetupSchema>): Promise<string> {
    const { framework } = input;
    
    let setup = `# 🚨 CRITICAL: Tyler Forge Icon Setup - ${framework.toUpperCase()}\n\n`;
    setup += `## ⚠️ MOST COMMON ISSUE: Icons Show as Text\n\n`;
    setup += `If your icons are displaying as text like "menu" or "close", you're missing one of these steps:\n`;
    setup += `1. **Material Icons font not loaded** (Step 1 below)\n`;
    setup += `2. **defineIconComponent() not called** (Step 3 below)\n\n`;
    setup += `---\n\n`;
    
    // CRITICAL: Material Icons Font FIRST
    setup += `## 🔴 Step 1: Add Material Icons Font (ABSOLUTELY REQUIRED)\n\n`;
    setup += `**WITHOUT THIS, ICONS WILL SHOW AS TEXT!**\n\n`;
    setup += `Add this to your \`index.html\` or main HTML file's \`<head>\` section:\n\n`;
    setup += `\`\`\`html\n`;
    setup += `<!DOCTYPE html>\n`;
    setup += `<html>\n`;
    setup += `<head>\n`;
    setup += `  <!-- 🚨 CRITICAL: Material Icons Font - WITHOUT THIS, ICONS = TEXT -->\n`;
    setup += `  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n`;
    setup += `  \n`;
    setup += `  <!-- Optional: Material Symbols (newer icons) -->\n`;
    setup += `  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">\n`;
    setup += `</head>\n`;
    setup += `</html>\n`;
    setup += `\`\`\`\n\n`;
    setup += `**Verify:** Check Network tab in DevTools - you should see Material Icons font loading.\n\n`;
    
    // Installation
    setup += `## Step 2: Install Packages\n\n`;
    setup += `\`\`\`bash\n`;
    if (framework === 'react') {
      setup += `npm install @tylertech/forge @tylertech/forge-react @tylertech/tyler-icons\n`;
    } else if (framework === 'angular') {
      setup += `npm install @tylertech/forge @tylertech/forge-angular @tylertech/tyler-icons\n`;
    } else {
      setup += `npm install @tylertech/forge @tylertech/tyler-icons\n`;
    }
    setup += `\`\`\`\n\n`;

    // Component Registration
    setup += `## 🔴 Step 3: Register Icon Component (CRITICAL!)\n\n`;
    setup += `**WITHOUT THIS, ICONS WILL SHOW AS TEXT!**\n\n`;
    setup += `⚠️ **This is the #1 missed step that causes icons to fail!**\n\n`;
    
    if (framework === 'react') {
      setup += `Create a \`forge-setup.ts\` file and import it at your app's entry point:\n\n`;
      setup += `\`\`\`typescript\n`;
      setup += `// forge-setup.ts\n`;
      setup += `import { defineIconComponent, IconRegistry } from '@tylertech/forge';\n`;
      setup += `import { tylIconHome, tylIconMenu, tylIconClose, tylIconSettings } from '@tylertech/tyler-icons';\n`;
      setup += `\n`;
      setup += `// CRITICAL: Define the icon component\n`;
      setup += `defineIconComponent(); // ← THIS IS REQUIRED!\n`;
      setup += `\n`;
      setup += `// Register Tyler icons you'll use\n`;
      setup += `IconRegistry.define([\n`;
      setup += `  tylIconHome,\n`;
      setup += `  tylIconMenu,\n`;
      setup += `  tylIconClose,\n`;
      setup += `  tylIconSettings\n`;
      setup += `]);\n`;
      setup += `\n`;
      setup += `// Register custom SVG icons if needed\n`;
      setup += `IconRegistry.define([{\n`;
      setup += `  name: 'custom-logo',\n`;
      setup += `  data: '<svg>...</svg>' // Your SVG string\n`;
      setup += `}]);\n`;
      setup += `\`\`\`\n\n`;
      
      setup += `Then import in your main file:\n\n`;
      setup += `\`\`\`typescript\n`;
      setup += `// App.tsx or index.tsx\n`;
      setup += `import './forge-setup'; // ← Import at the top!\n`;
      setup += `import { ForgeIcon } from '@tylertech/forge-react';\n`;
      setup += `\n`;
      setup += `function App() {\n`;
      setup += `  return (\n`;
      setup += `    <div>\n`;
      setup += `      {/* ✅ CORRECT: Use React wrapper */}\n`;
      setup += `      <ForgeIcon name="menu" />\n`;
      setup += `      \n`;
      setup += `      {/* ❌ WRONG: Don't use raw elements in React */}\n`;
      setup += `      {/* <forge-icon name="menu"></forge-icon> */}\n`;
      setup += `    </div>\n`;
      setup += `  );\n`;
      setup += `}\n`;
      setup += `\`\`\`\n\n`;
    } else if (framework === 'angular') {
      setup += `\`\`\`typescript\n`;
      setup += `// app.module.ts or main.ts\n`;
      setup += `import { defineIconComponent, IconRegistry } from '@tylertech/forge';\n`;
      setup += `import { ForgeIconModule } from '@tylertech/forge-angular';\n`;
      setup += `import { tylIconHome, tylIconMenu } from '@tylertech/tyler-icons';\n`;
      setup += `\n`;
      setup += `// Define icon component\n`;
      setup += `defineIconComponent();\n`;
      setup += `\n`;
      setup += `// Register icons\n`;
      setup += `IconRegistry.define([tylIconHome, tylIconMenu]);\n`;
      setup += `\n`;
      setup += `@NgModule({\n`;
      setup += `  imports: [ForgeIconModule]\n`;
      setup += `})\n`;
      setup += `export class AppModule { }\n`;
      setup += `\`\`\`\n\n`;
    } else {
      setup += `\`\`\`javascript\n`;
      setup += `import { defineIconComponent, IconRegistry } from '@tylertech/forge';\n`;
      setup += `import { tylIconHome, tylIconMenu } from '@tylertech/tyler-icons';\n`;
      setup += `\n`;
      setup += `// Define the icon component\n`;
      setup += `defineIconComponent();\n`;
      setup += `\n`;
      setup += `// Register icons\n`;
      setup += `IconRegistry.define([tylIconHome, tylIconMenu]);\n`;
      setup += `\`\`\`\n\n`;
    }

    // Usage Examples
    setup += `## 4. Usage Examples\n\n`;
    
    if (framework === 'react') {
      setup += `### React Components (RECOMMENDED)\n\n`;
      setup += `\`\`\`typescript\n`;
      setup += `import { ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';\n`;
      setup += `\n`;
      setup += `function MyComponent() {\n`;
      setup += `  return (\n`;
      setup += `    <>\n`;
      setup += `      {/* Material Icon */}\n`;
      setup += `      <ForgeIcon name="home" />\n`;
      setup += `      \n`;
      setup += `      {/* Tyler Icon (registered) */}\n`;
      setup += `      <ForgeIcon name="forge-logo" />\n`;
      setup += `      \n`;
      setup += `      {/* Icon Button */}\n`;
      setup += `      <ForgeIconButton>\n`;
      setup += `        <ForgeIcon name="menu" />\n`;
      setup += `      </ForgeIconButton>\n`;
      setup += `      \n`;
      setup += `      {/* External icon (loaded dynamically) */}\n`;
      setup += `      <ForgeIcon name="custom-icon" external />\n`;
      setup += `      \n`;
      setup += `      {/* Themed icon */}\n`;
      setup += `      <ForgeIcon name="favorite" theme="error" />\n`;
      setup += `    </>\n`;
      setup += `  );\n`;
      setup += `}\n`;
      setup += `\`\`\`\n\n`;
    } else if (framework === 'angular') {
      setup += `\`\`\`html\n`;
      setup += `<!-- Material Icon -->\n`;
      setup += `<forge-icon name="home"></forge-icon>\n`;
      setup += `\n`;
      setup += `<!-- Tyler Icon -->\n`;
      setup += `<forge-icon name="forge-logo"></forge-icon>\n`;
      setup += `\n`;
      setup += `<!-- Icon Button -->\n`;
      setup += `<forge-icon-button>\n`;
      setup += `  <forge-icon name="menu"></forge-icon>\n`;
      setup += `</forge-icon-button>\n`;
      setup += `\`\`\`\n\n`;
    } else {
      setup += `\`\`\`html\n`;
      setup += `<!-- Material Icon -->\n`;
      setup += `<forge-icon name="home"></forge-icon>\n`;
      setup += `\n`;
      setup += `<!-- Tyler Icon -->\n`;
      setup += `<forge-icon name="forge-logo"></forge-icon>\n`;
      setup += `\n`;
      setup += `<!-- External/Dynamic icon -->\n`;
      setup += `<forge-icon name="custom-icon" external></forge-icon>\n`;
      setup += `\`\`\`\n\n`;
    }

    // Common Issues
    setup += `## 5. Common Issues & Solutions\n\n`;
    setup += `### Icons showing as text (e.g., "home" instead of icon)\n`;
    setup += `**Cause:** Missing \`defineIconComponent()\` call\n`;
    setup += `**Fix:** Ensure \`defineIconComponent()\` is called BEFORE using any icons\n\n`;
    
    setup += `### Icons not displaying at all\n`;
    setup += `**Cause:** Missing Material Icons font\n`;
    setup += `**Fix:** Add the font link to your HTML head\n\n`;
    
    setup += `### TypeScript errors with forge-icon\n`;
    setup += `**Cause:** Using raw elements in React/TypeScript\n`;
    setup += `**Fix:** Use \`ForgeIcon\` from \`@tylertech/forge-react\`\n\n`;
    
    setup += `### Custom icons not found\n`;
    setup += `**Cause:** Icon not registered with IconRegistry\n`;
    setup += `**Fix:** Call \`IconRegistry.define([yourIcon])\` or use \`external\` attribute\n\n`;

    // TypeScript Declarations
    if (framework === 'react') {
      setup += `## 6. TypeScript Support\n\n`;
      setup += `The ForgeIcon component accepts these props:\n\n`;
      setup += `\`\`\`typescript\n`;
      setup += `interface ForgeIconProps {\n`;
      setup += `  name?: string;        // Icon name\n`;
      setup += `  src?: string;         // SVG source URL\n`;
      setup += `  lazy?: boolean;       // Lazy load the icon\n`;
      setup += `  external?: boolean;   // Load from external source\n`;
      setup += `  dense?: boolean;      // Use dense sizing\n`;
      setup += `  theme?: 'primary' | 'secondary' | 'tertiary' | 'success' | \n`;
      setup += `          'warning' | 'error' | 'info';\n`;
      setup += `}\n`;
      setup += `\`\`\`\n\n`;
    }

    return setup;
  }

  async validateIcon(input: z.infer<typeof ValidateIconSchema>): Promise<string> {
    const { name } = input;
    
    let result = `# Icon Validation: "${name}"\n\n`;
    
    // Check if it's a Material Icon
    const isMaterialIcon = COMMON_MATERIAL_ICONS.includes(name.toLowerCase());
    
    // Check if it's a Tyler Icon
    const isTylerIcon = TYLER_ICONS.includes(name.toLowerCase());
    
    // Convert name formats
    const materialName = name.replace(/-/g, '_').toLowerCase();
    const tylerName = name.replace(/_/g, '-').toLowerCase();
    
    if (isMaterialIcon || isTylerIcon) {
      result += `✅ **Valid Icon Found**\n\n`;
      
      if (isMaterialIcon) {
        result += `**Type:** Material Icon\n`;
        result += `**Usage:** \`<ForgeIcon name="${materialName}" />\`\n`;
        result += `**Requirements:** Material Icons font must be loaded\n\n`;
      }
      
      if (isTylerIcon) {
        result += `**Type:** Tyler Icon\n`;
        result += `**Import:** \`tylIcon${this.toPascalCase(tylerName)}\` from \`@tylertech/tyler-icons\`\n`;
        result += `**Usage:** \`<ForgeIcon name="${tylerName}" />\`\n`;
        result += `**Requirements:** Must be registered with \`IconRegistry.define()\`\n\n`;
      }
    } else {
      result += `❌ **Icon Not Found**\n\n`;
      result += `The icon "${name}" was not found in common icon sets.\n\n`;
      
      // Suggest similar icons
      result += `## Suggestions:\n\n`;
      
      // Find similar Material Icons
      const similarMaterial = COMMON_MATERIAL_ICONS.filter(icon => 
        icon.includes(materialName.substring(0, 3)) || 
        materialName.includes(icon.substring(0, 3))
      ).slice(0, 5);
      
      if (similarMaterial.length > 0) {
        result += `### Similar Material Icons:\n`;
        similarMaterial.forEach(icon => {
          result += `- \`${icon}\` - \`<ForgeIcon name="${icon}" />\`\n`;
        });
        result += `\n`;
      }
      
      // Find similar Tyler Icons
      const similarTyler = TYLER_ICONS.filter(icon => 
        icon.includes(tylerName.substring(0, 3)) || 
        tylerName.includes(icon.substring(0, 3))
      ).slice(0, 5);
      
      if (similarTyler.length > 0) {
        result += `### Similar Tyler Icons:\n`;
        similarTyler.forEach(icon => {
          result += `- \`${icon}\` - import \`tylIcon${this.toPascalCase(icon)}\`\n`;
        });
        result += `\n`;
      }
      
      result += `## How to use a custom icon:\n\n`;
      result += `\`\`\`javascript\n`;
      result += `// Register custom SVG\n`;
      result += `IconRegistry.define([{\n`;
      result += `  name: '${name}',\n`;
      result += `  data: '<svg>...</svg>' // Your SVG\n`;
      result += `}]);\n`;
      result += `\n`;
      result += `// Then use it\n`;
      result += `<ForgeIcon name="${name}" />\n`;
      result += `\`\`\`\n`;
    }
    
    return result;
  }

  async getSetupChecklist(): Promise<string> {
    return `# Tyler Forge Icon Setup Checklist

## ✅ Complete Setup Checklist

### 1. ☐ Install Required Packages
\`\`\`bash
npm install @tylertech/forge @tylertech/forge-react @tylertech/tyler-icons
\`\`\`

### 2. ☐ Add Material Icons Font to HTML
\`\`\`html
<!-- In index.html or main HTML file -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
\`\`\`

### 3. ☐ Create Setup File with Component Registration
\`\`\`typescript
// forge-setup.ts
import { defineIconComponent, IconRegistry } from '@tylertech/forge';
import { tylIconMenu, tylIconHome, tylIconSettings } from '@tylertech/tyler-icons';

// CRITICAL: This MUST be called!
defineIconComponent();

// Register Tyler icons
IconRegistry.define([tylIconMenu, tylIconHome, tylIconSettings]);
\`\`\`

### 4. ☐ Import Setup File at App Entry Point
\`\`\`typescript
// App.tsx, index.tsx, or main.tsx
import './forge-setup'; // Must be imported before using icons!
\`\`\`

### 5. ☐ Use React Wrappers (not raw elements)
\`\`\`typescript
// ✅ CORRECT for React
import { ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';

<ForgeIconButton>
  <ForgeIcon name="menu" />
</ForgeIconButton>

// ❌ WRONG for React (causes TypeScript errors)
<forge-icon-button>
  <forge-icon name="menu"></forge-icon>
</forge-icon-button>
\`\`\`

### 6. ☐ Verify Icons Display Correctly
- Icons should appear as graphics, not text
- No console errors about undefined components
- TypeScript compilation succeeds

## Quick Validation Test

Add this to a component to test all icon types:

\`\`\`typescript
import { ForgeIcon } from '@tylertech/forge-react';

function IconTest() {
  return (
    <div>
      {/* Material Icon (from font) */}
      <ForgeIcon name="home" />
      
      {/* Tyler Icon (registered) */}
      <ForgeIcon name="forge-logo" />
      
      {/* Themed Icon */}
      <ForgeIcon name="favorite" theme="error" />
      
      {/* If all three display correctly, setup is complete! */}
    </div>
  );
}
\`\`\`

## If Icons Don't Work

Run through this checklist:
1. Check browser console for errors
2. Verify defineIconComponent() is called
3. Check network tab for font loading
4. Ensure setup file is imported
5. Use React wrappers, not raw elements`;
  }

  async troubleshoot(input: z.infer<typeof TroubleshootSchema>): Promise<string> {
    const { issue } = input;
    
    const troubleshooting: Record<string, string> = {
      'icons_showing_as_text': `# 🚨 Troubleshooting: Icons Showing as Text

## Problem
Icons display as text (e.g., "home", "menu") instead of graphics.

## Root Causes (IN ORDER OF LIKELIHOOD)
1. **Material Icons font not loaded** (90% of cases)
2. **defineIconComponent() not called** (9% of cases)  
3. Other issues (1% of cases)

## Solution Steps (DO IN ORDER)

### 🔴 Step 1: CHECK MATERIAL ICONS FONT FIRST!
\`\`\`html
<!-- THIS MUST BE IN YOUR index.html -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
\`\`\`

**Quick Test:** Open DevTools → Network tab → Filter by "Font" → Refresh page
- ✅ You should see Material Icons font files loading
- ❌ If not, add the link above to your HTML

### Step 2: Verify Component Registration
\`\`\`typescript
// This MUST be called before using any icons
import { defineIconComponent } from '@tylertech/forge';
defineIconComponent();
\`\`\`

### 2. Check Import Order
Make sure your setup file is imported BEFORE rendering icons:
\`\`\`typescript
// App.tsx or index.tsx
import './forge-setup'; // ← Must be first!
import React from 'react';
import { ForgeIcon } from '@tylertech/forge-react';
\`\`\`

### 3. Verify in Browser Console
\`\`\`javascript
// Run this in console - should return true
customElements.get('forge-icon') !== undefined
\`\`\`

### 4. Complete Working Example
\`\`\`typescript
// forge-setup.ts
import { defineIconComponent } from '@tylertech/forge';
defineIconComponent(); // ← THE FIX

// App.tsx
import './forge-setup'; // Import first!
import { ForgeIcon } from '@tylertech/forge-react';

function App() {
  return <ForgeIcon name="home" />; // Now works!
}
\`\`\``,

      'icons_not_found': `# Troubleshooting: Icons Not Found

## Problem
Icons don't display or show a placeholder.

## Causes & Solutions

### 1. Material Icons - Missing Font
Add to your HTML:
\`\`\`html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
\`\`\`

### 2. Tyler Icons - Not Registered
\`\`\`typescript
import { IconRegistry } from '@tylertech/forge';
import { tylIconMenu, tylIconHome } from '@tylertech/tyler-icons';

// Register the icons you use
IconRegistry.define([tylIconMenu, tylIconHome]);

// Now you can use them
<ForgeIcon name="menu" />
<ForgeIcon name="home" />
\`\`\`

### 3. Custom Icons - Not Defined
\`\`\`typescript
IconRegistry.define([{
  name: 'custom-logo',
  data: '<svg>...</svg>' // Your SVG string
}]);
\`\`\`

### 4. Dynamic Icons - Use External
\`\`\`typescript
// For dynamically loaded icons
<ForgeIcon name="dynamic-icon" external />
\`\`\``,

      'typescript_errors': `# Troubleshooting: TypeScript Errors

## Problem
TypeScript errors when using forge-icon elements.

## Solution: Use React Wrappers

### ❌ WRONG - Causes TypeScript Errors
\`\`\`typescript
// TypeScript doesn't recognize custom elements
<forge-icon name="menu"></forge-icon>
<forge-icon-button>
  <forge-icon name="settings"></forge-icon>
</forge-icon-button>
\`\`\`

### ✅ CORRECT - TypeScript Happy
\`\`\`typescript
import { ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';

<ForgeIcon name="menu" />
<ForgeIconButton>
  <ForgeIcon name="settings" />
</ForgeIconButton>
\`\`\`

### Type Declarations
\`\`\`typescript
// If needed, add to a .d.ts file
declare module '@tylertech/forge-react' {
  export const ForgeIcon: React.FC<{
    name?: string;
    src?: string;
    external?: boolean;
    theme?: string;
    dense?: boolean;
  }>;
}
\`\`\``,

      'missing_fonts': `# Troubleshooting: Missing Fonts

## Problem
Material Icons not loading or displaying.

## Solutions

### 1. Add Font Link to HTML
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <!-- Add these lines -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>
</html>
\`\`\`

### 2. Verify Font Loading
Open browser DevTools → Network tab → Filter by "Font"
- Should see Material Icons font files loading
- Status should be 200 OK

### 3. Alternative: Install Locally
\`\`\`bash
npm install material-icons
\`\`\`

\`\`\`css
/* In your global CSS */
@import 'material-icons/iconfont/material-icons.css';
\`\`\`

### 4. Test Font Loading
\`\`\`html
<!-- This should show an icon, not text -->
<i class="material-icons">home</i>
\`\`\``,

      'registration_issues': `# Troubleshooting: Icon Registration Issues

## Problem
Custom or Tyler icons not working despite registration.

## Debugging Steps

### 1. Check Registration Timing
\`\`\`typescript
// WRONG - Registered after use
function App() {
  return <ForgeIcon name="custom" />;
}
IconRegistry.define([customIcon]); // Too late!

// CORRECT - Register before use
IconRegistry.define([customIcon]); // First
function App() {
  return <ForgeIcon name="custom" />;
}
\`\`\`

### 2. Verify Icon Name
\`\`\`typescript
import { tylIconMenu } from '@tylertech/tyler-icons';

console.log(tylIconMenu.name); // Check actual name

// Use the exact name
IconRegistry.define([tylIconMenu]);
<ForgeIcon name={tylIconMenu.name} />
\`\`\`

### 3. Check Icon Data
\`\`\`typescript
// Ensure SVG data is valid
const customIcon = {
  name: 'my-icon',
  data: '<svg viewBox="0 0 24 24">...</svg>' // Valid SVG
};

IconRegistry.define([customIcon]);
\`\`\`

### 4. Debug in Console
\`\`\`javascript
// Check if icon is registered
import { IconRegistry } from '@tylertech/forge';
console.log(IconRegistry.get('menu')); // Should return icon data
\`\`\``
    };

    return troubleshooting[issue] || `# Unknown Issue\n\nPlease specify a valid issue type.`;
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const SetupProjectSchema = z.object({
  framework: z.enum(['vanilla', 'react', 'angular', 'vue', 'svelte', 'blazor']).describe('Target framework'),
  components: z.array(z.string()).optional().describe('Specific components to include'),
  includeIcons: z.boolean().optional().default(true).describe('Include icon setup'),
  includeTheme: z.boolean().optional().default(true).describe('Include theme configuration'),
  includeLayout: z.boolean().optional().default(true).describe('Include scaffold layout'),
  cssStrategy: z.enum(['global', 'modular', 'cdn']).optional().default('global').describe('CSS loading strategy')
});

export class SetupGenerator {
  getSchema() {
    return zodToJsonSchema(SetupProjectSchema) as any;
  }

  async generate(input: z.infer<typeof SetupProjectSchema>): Promise<string> {
    const { framework, components = [], includeIcons, includeTheme, includeLayout, cssStrategy } = input;

    let setup = `# Tyler Forge Setup for ${this.capitalize(framework)}\n\n`;

    // Installation
    setup += this.generateInstallation(framework);

    // Main setup file
    setup += this.generateMainSetup(framework, components, includeIcons, cssStrategy);

    // Component registration
    setup += this.generateComponentRegistration(components);

    // Icon setup
    if (includeIcons) {
      setup += this.generateIconSetup();
    }

    // Theme configuration
    if (includeTheme) {
      setup += this.generateThemeSetup();
    }

    // Layout example
    if (includeLayout) {
      setup += this.generateLayoutExample(framework);
    }

    // Framework-specific configuration
    setup += this.generateFrameworkConfig(framework);

    // VS Code setup
    setup += this.generateVSCodeSetup();

    return setup;
  }

  private generateInstallation(framework: string): string {
    let packages = '@tylertech/forge';
    
    if (framework === 'react') {
      packages += ' @tylertech/forge-react';
    } else if (framework === 'angular') {
      packages += ' @tylertech/forge-angular';
    }

    return `## Installation

\`\`\`shell
npm install ${packages}

# Icons (optional but recommended)
npm install @tylertech/tyler-icons
\`\`\`

`;
  }

  private generateMainSetup(framework: string, components: string[], includeIcons: boolean, cssStrategy: string): string {
    let setup = `## Main Setup File\n\n`;

    if (framework === 'react') {
      setup += `### \`src/forge-setup.js\`
\`\`\`javascript
// This file should be imported once at the root of your React application
import { defineComponents } from '@tylertech/forge';
${includeIcons ? "import { IconRegistry } from '@tylertech/forge';" : ''}
${includeIcons ? "import { tylIconHome, tylIconMenu, tylIconClose, tylIconChevronRight } from '@tylertech/tyler-icons';" : ''}

// Define all Forge components (call once at app startup)
defineComponents();

${includeIcons ? `// Register commonly used icons
IconRegistry.define([
  tylIconHome,
  tylIconMenu, 
  tylIconClose,
  tylIconChevronRight
]);` : ''}

// Import global styles
${this.generateCSSImports(cssStrategy, components)}

// Export for use in components
export { 
  ForgeButton,
  ForgeCard,
  ForgeTextField,
  ForgeSelect,
  ForgeDialog,
  ForgeScaffold,
  ForgeAppBar
} from '@tylertech/forge-react';
\`\`\`

### \`src/App.jsx\`
\`\`\`javascript
import './forge-setup'; // Import at the top of your app
import { ForgeButton, ForgeCard } from './forge-setup';

function App() {
  return (
    <ForgeCard>
      <ForgeButton variant="raised" theme="primary">
        Get Started
      </ForgeButton>
    </ForgeCard>
  );
}
\`\`\`
`;
    } else if (framework === 'angular') {
      setup += `### \`src/app/forge.module.ts\`
\`\`\`typescript
import { NgModule } from '@angular/core';
import { defineComponents } from '@tylertech/forge';
${includeIcons ? "import { IconRegistry } from '@tylertech/forge';" : ''}
${includeIcons ? "import { tylIconHome, tylIconMenu, tylIconClose } from '@tylertech/tyler-icons';" : ''}
import {
  ForgeButtonModule,
  ForgeCardModule,
  ForgeTextFieldModule,
  ForgeSelectModule,
  ForgeDialogModule,
  ForgeScaffoldModule,
  ForgeAppBarModule
} from '@tylertech/forge-angular';

// Define components
defineComponents();

${includeIcons ? `// Register icons
IconRegistry.define([tylIconHome, tylIconMenu, tylIconClose]);` : ''}

@NgModule({
  imports: [
    ForgeButtonModule,
    ForgeCardModule,
    ForgeTextFieldModule,
    ForgeSelectModule,
    ForgeDialogModule,
    ForgeScaffoldModule,
    ForgeAppBarModule
  ],
  exports: [
    ForgeButtonModule,
    ForgeCardModule,
    ForgeTextFieldModule,
    ForgeSelectModule,
    ForgeDialogModule,
    ForgeScaffoldModule,
    ForgeAppBarModule
  ]
})
export class ForgeModule { }
\`\`\`

### \`src/styles.scss\`
\`\`\`scss
${this.generateCSSImports(cssStrategy, components)}
\`\`\`
`;
    } else {
      setup += `### \`src/forge-setup.js\`
\`\`\`javascript
import { defineComponents } from '@tylertech/forge';
${includeIcons ? "import { IconRegistry } from '@tylertech/forge';" : ''}
${includeIcons ? "import { tylIconHome, tylIconMenu, tylIconClose } from '@tylertech/tyler-icons';" : ''}

// Define all components
defineComponents();

${includeIcons ? `// Register icons
IconRegistry.define([tylIconHome, tylIconMenu, tylIconClose]);` : ''}

// Import styles
${this.generateCSSImports(cssStrategy, components)}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Add ready class to body to fade in content
  document.body.classList.add('ready');
}
\`\`\`
`;
    }

    return setup + '\n';
  }

  private generateComponentRegistration(components: string[]): string {
    if (components.length === 0) {
      return '';
    }

    let registration = `## Component Registration (Optimized)\n\n`;
    registration += `Instead of registering all components, only register what you use:\n\n`;

    registration += `\`\`\`javascript
import {
${components.map(c => `  define${this.pascalCase(c)}Component`).join(',\n')}
} from '@tylertech/forge';

// Register only needed components
${components.map(c => `define${this.pascalCase(c)}Component();`).join('\n')}
\`\`\`

`;

    return registration;
  }

  private generateIconSetup(): string {
    return `## Icon Setup

### Register Icons
\`\`\`javascript
import { IconRegistry } from '@tylertech/forge';
import { 
  tylIconHome,
  tylIconMenu,
  tylIconClose,
  tylIconSearch,
  tylIconSettings,
  tylIconAccount,
  tylIconChevronRight,
  tylIconCheck,
  tylIconError,
  tylIconWarning,
  tylIconInfo
} from '@tylertech/tyler-icons';

// Register all icons you'll use in your app
IconRegistry.define([
  tylIconHome,
  tylIconMenu,
  tylIconClose,
  tylIconSearch,
  tylIconSettings,
  tylIconAccount,
  tylIconChevronRight,
  tylIconCheck,
  tylIconError,
  tylIconWarning,
  tylIconInfo
]);
\`\`\`

### Usage
\`\`\`html
<forge-icon name="home"></forge-icon>
<forge-icon-button>
  <forge-icon name="settings"></forge-icon>
</forge-icon-button>
\`\`\`

`;
  }

  private generateThemeSetup(): string {
    return `## Theme Configuration

### \`src/styles/forge-theme.css\`
\`\`\`css
:root {
  /* Primary Colors */
  --forge-theme-primary: #1976d2;
  --forge-theme-primary-variant: #004ba0;
  --forge-theme-on-primary: #ffffff;
  
  /* Secondary Colors */
  --forge-theme-secondary: #424242;
  --forge-theme-secondary-variant: #1b1b1b;
  --forge-theme-on-secondary: #ffffff;
  
  /* Semantic Colors */
  --forge-theme-success: #2e7d32;
  --forge-theme-error: #d32f2f;
  --forge-theme-warning: #ed6c02;
  --forge-theme-info: #0288d1;
  
  /* Surface Colors */
  --forge-theme-background: #fafafa;
  --forge-theme-surface: #ffffff;
  --forge-theme-on-surface: rgba(0, 0, 0, 0.87);
  
  /* Typography */
  --forge-font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
}

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root {
    --forge-theme-background: #121212;
    --forge-theme-surface: #1e1e1e;
    --forge-theme-surface-variant: #2e2e2e;
    --forge-theme-on-surface: rgba(255, 255, 255, 0.87);
    --forge-theme-on-background: rgba(255, 255, 255, 0.87);
  }
}

/* Or use a class-based approach */
.forge-theme--dark {
  --forge-theme-background: #121212;
  --forge-theme-surface: #1e1e1e;
  /* ... other dark theme variables */
}
\`\`\`

`;
  }

  private generateLayoutExample(framework: string): string {
    let example = `## Basic App Layout\n\n`;

    if (framework === 'react') {
      example += `### \`src/components/AppLayout.jsx\`
\`\`\`jsx
import { ForgeScaffold, ForgeAppBar, ForgeCard, ForgeButton } from '@tylertech/forge-react';

export function AppLayout({ children }) {
  return (
    <ForgeScaffold>
      <ForgeAppBar slot="header" title-text="My Application">
        <ForgeAppBarProfileButton slot="end" />
      </ForgeAppBar>
      
      <main slot="body" style={{ padding: '24px' }}>
        {children}
      </main>
    </ForgeScaffold>
  );
}
\`\`\`
`;
    } else if (framework === 'angular') {
      example += `### \`src/app/components/app-layout.component.html\`
\`\`\`html
<forge-scaffold>
  <forge-app-bar slot="header" title-text="My Application">
    <forge-app-bar-profile-button slot="end"></forge-app-bar-profile-button>
  </forge-app-bar>
  
  <main slot="body" class="content-padding">
    <ng-content></ng-content>
  </main>
</forge-scaffold>
\`\`\`
`;
    } else {
      example += `### \`index.html\`
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Forge App</title>
  <link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css">
  <link rel="stylesheet" href="forge-theme.css">
  <style>
    body { 
      margin: 0; 
      opacity: 0;
      transition: opacity 200ms ease-in-out;
    }
    body.ready { opacity: 1; }
    .content-padding { padding: 24px; }
  </style>
</head>
<body>
  <forge-scaffold>
    <forge-app-bar slot="header" title-text="My Application">
      <forge-icon-button slot="start" aria-label="Menu">
        <forge-icon name="menu"></forge-icon>
      </forge-icon-button>
      <forge-app-bar-profile-button slot="end"></forge-app-bar-profile-button>
    </forge-app-bar>
    
    <forge-toolbar slot="body-header">
      <h2 slot="start" class="forge-typography--heading5">Dashboard</h2>
    </forge-toolbar>
    
    <main slot="body" class="content-padding">
      <forge-card>
        <h3 class="forge-typography--heading6">Welcome</h3>
        <p>Your content here</p>
        <forge-button variant="raised" theme="primary">
          Get Started
        </forge-button>
      </forge-card>
    </main>
  </forge-scaffold>
  
  <script type="module" src="forge-setup.js"></script>
</body>
</html>
\`\`\`
`;
    }

    return example + '\n';
  }

  private generateCSSImports(strategy: string, components: string[]): string {
    if (strategy === 'cdn') {
      return `// Using CDN - add to your HTML
// <link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@latest/forge.css">`;
    } else if (strategy === 'modular' && components.length > 0) {
      return components
        .map(c => `import '@tylertech/forge/dist/${c}/forge-${c}.css';`)
        .join('\n');
    } else {
      return `import '@tylertech/forge/dist/forge.css'; // All component styles
import '@tylertech/forge/dist/forge-core.css'; // Core utilities
import '@tylertech/forge/dist/forge-tokens.css'; // Design tokens`;
    }
  }

  private generateFrameworkConfig(framework: string): string {
    let config = `## Framework Configuration\n\n`;

    if (framework === 'react') {
      config += `### TypeScript Support
\`\`\`typescript
// types/forge.d.ts
declare module '@tylertech/forge-react';
\`\`\`

### Prevent FOUC (Flash of Unstyled Content)
\`\`\`javascript
// In your App.jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Wait for Forge components to be defined
    customElements.whenDefined('forge-button').then(() => {
      document.body.classList.add('ready');
    });
  }, []);
  
  return <YourApp />;
}
\`\`\`
`;
    } else if (framework === 'angular') {
      config += `### Angular Configuration
\`\`\`typescript
// angular.json
"styles": [
  "node_modules/@tylertech/forge/dist/forge.css",
  "src/styles.scss"
]
\`\`\`

### Prevent FOUC
\`\`\`typescript
// app.component.ts
export class AppComponent implements OnInit {
  ngOnInit() {
    customElements.whenDefined('forge-button').then(() => {
      document.body.classList.add('ready');
    });
  }
}
\`\`\`
`;
    }

    return config + '\n';
  }

  private generateVSCodeSetup(): string {
    return `## VS Code Integration

### \`.vscode/settings.json\`
\`\`\`json
{
  "html.customData": ["./node_modules/@tylertech/forge/dist/vscode.html-custom-data.json"],
  "css.customData": ["./node_modules/@tylertech/forge/dist/vscode.css-custom-data.json"]
}
\`\`\`

**Note:** Restart VS Code after adding these settings for IntelliSense to work.

`;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private pascalCase(str: string): string {
    return str.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
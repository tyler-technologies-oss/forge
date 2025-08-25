#!/usr/bin/env node

/**
 * Bundle all Forge documentation and component data into a static JSON database
 * This allows the MCP server to work without access to the source files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FORGE_ROOT = path.resolve(__dirname, '../../');
const STORIES_DIR = path.join(FORGE_ROOT, 'src/stories/components');
const LIB_DIR = path.join(FORGE_ROOT, 'src/lib');
const DEV_PAGES_DIR = path.join(FORGE_ROOT, 'src/dev/pages');
const OUTPUT_DIR = path.join(__dirname, '../dist/data');

interface BundledComponent {
  name: string;
  tagName: string;
  description: string;
  category: string;
  mdxContent: string;
  storiesContent: string;
  sourceContent: string;
  devPageContent?: string;
  scssContent?: string;
  properties: any[];
  events: any[];
  slots: any[];
  cssVariables: any[];
  variants?: string[];
  themes?: string[];
  hasCSSOnly?: boolean;
  dependencies?: string[];
}

interface BundledData {
  components: Record<string, BundledComponent>;
  designTokens: Record<string, any>;
  metadata: {
    version: string;
    buildDate: string;
    componentCount: number;
  };
}

class DataBundler {
  private components: Record<string, BundledComponent> = {};
  private designTokens: Record<string, any> = {};

  async bundle(): Promise<void> {
    console.log('🚀 Starting Forge data bundling...');
    
    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Bundle components
    await this.bundleComponents();
    
    // Bundle design tokens
    await this.bundleDesignTokens();
    
    // Create final bundle
    const bundledData: BundledData = {
      components: this.components,
      designTokens: this.designTokens,
      metadata: {
        version: '1.0.0',
        buildDate: new Date().toISOString(),
        componentCount: Object.keys(this.components).length
      }
    };

    // Write bundle to file
    const outputPath = path.join(OUTPUT_DIR, 'forge-bundle.json');
    await fs.writeFile(outputPath, JSON.stringify(bundledData, null, 2));
    
    // Also create component index
    const indexPath = path.join(OUTPUT_DIR, 'component-index.json');
    const index = Object.keys(this.components).map(name => ({
      name,
      tagName: this.components[name].tagName,
      description: this.components[name].description,
      category: this.components[name].category,
      hasCSSOnly: this.components[name].hasCSSOnly,
      variants: this.components[name].variants,
      themes: this.components[name].themes
    }));
    await fs.writeFile(indexPath, JSON.stringify(index, null, 2));

    console.log(`✅ Bundled ${Object.keys(this.components).length} components`);
    console.log(`📦 Output: ${outputPath}`);
    console.log(`📄 Index: ${indexPath}`);
  }

  private async bundleComponents(): Promise<void> {
    console.log('📚 Bundling components...');
    
    // Find all component directories
    const componentDirs = await this.findComponentDirectories();
    
    for (const componentName of componentDirs) {
      console.log(`  Processing ${componentName}...`);
      
      try {
        const component = await this.bundleComponent(componentName);
        if (component) {
          this.components[componentName] = component;
        }
      } catch (error) {
        console.warn(`  ⚠️  Failed to bundle ${componentName}:`, error);
      }
    }
  }

  private async bundleComponent(componentName: string): Promise<BundledComponent | null> {
    const component: BundledComponent = {
      name: this.formatName(componentName),
      tagName: `forge-${componentName}`,
      description: '',
      category: this.getCategory(componentName),
      mdxContent: '',
      storiesContent: '',
      sourceContent: '',
      properties: [],
      events: [],
      slots: [],
      cssVariables: [],
      variants: this.getVariants(componentName),
      themes: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'],
      hasCSSOnly: this.hasCSSOnly(componentName)
    };

    // Read MDX documentation
    try {
      const mdxPath = path.join(STORIES_DIR, componentName, `${this.pascalCase(componentName)}.mdx`);
      component.mdxContent = await fs.readFile(mdxPath, 'utf-8');
      
      // Extract description from MDX
      const descMatch = component.mdxContent.match(/<Title \/>\n\n(.+?)(?:\n\n|$)/);
      if (descMatch) {
        component.description = descMatch[1];
      }
    } catch {
      // No MDX file
    }

    // Read stories file
    try {
      const storiesPath = path.join(STORIES_DIR, componentName, `${this.pascalCase(componentName)}.stories.ts`);
      component.storiesContent = await fs.readFile(storiesPath, 'utf-8');
    } catch {
      // No stories file
    }

    // Read component source
    try {
      const sourcePath = path.join(LIB_DIR, componentName, `${componentName}.ts`);
      component.sourceContent = await fs.readFile(sourcePath, 'utf-8');
      
      // Extract properties, events, etc. from source
      component.properties = this.extractProperties(component.sourceContent);
      component.events = this.extractEvents(component.sourceContent);
    } catch {
      // No source file
    }

    // Read SCSS file
    try {
      const scssPath = path.join(LIB_DIR, componentName, `${componentName}.scss`);
      component.scssContent = await fs.readFile(scssPath, 'utf-8');
      component.cssVariables = this.extractCssVariables(component.scssContent);
    } catch {
      // No SCSS file
    }

    // Read dev page
    try {
      const devPath = path.join(DEV_PAGES_DIR, componentName, `${componentName}.html`);
      component.devPageContent = await fs.readFile(devPath, 'utf-8');
    } catch {
      // No dev page
    }

    return component;
  }

  private async findComponentDirectories(): Promise<string[]> {
    const dirs: string[] = [];
    
    try {
      const entries = await fs.readdir(STORIES_DIR, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          dirs.push(entry.name);
        }
      }
    } catch (error) {
      console.error('Failed to read stories directory:', error);
    }

    // Also check lib directory for components not in stories
    try {
      const libEntries = await fs.readdir(LIB_DIR, { withFileTypes: true });
      for (const entry of libEntries) {
        if (entry.isDirectory() && !dirs.includes(entry.name)) {
          // Check if it has a component file
          try {
            await fs.access(path.join(LIB_DIR, entry.name, `${entry.name}.ts`));
            dirs.push(entry.name);
          } catch {
            // Not a component directory
          }
        }
      }
    } catch (error) {
      console.error('Failed to read lib directory:', error);
    }

    return dirs.sort();
  }

  private extractProperties(source: string): any[] {
    const properties: any[] = [];
    
    // Extract from @property JSDoc comments
    const propertyRegex = /@property\s+{([^}]+)}\s+(?:\[)?(\w+)(?:=[^\]]+)?(?:\])?\s+-?\s*(.+)/gm;
    let match;
    
    while ((match = propertyRegex.exec(source)) !== null) {
      const [, type, name, description] = match;
      properties.push({
        name,
        type: type.trim(),
        description: description.trim(),
        required: !source.includes(`[${name}`)
      });
    }

    return properties;
  }

  private extractEvents(source: string): any[] {
    const events: any[] = [];
    
    // Look for event constant definitions
    const eventRegex = /EVENTS\s*=\s*{([^}]+)}/;
    const eventsMatch = source.match(eventRegex);
    
    if (eventsMatch) {
      const eventLines = eventsMatch[1].split(',');
      eventLines.forEach(line => {
        const match = line.match(/(\w+):\s*['"`]([^'"`]+)/);
        if (match) {
          events.push({
            name: match[2],
            description: `Event: ${match[1].replace(/_/g, ' ').toLowerCase()}`
          });
        }
      });
    }

    return events;
  }

  private extractCssVariables(scss: string): any[] {
    const variables: any[] = [];
    const varRegex = /(--forge-[^:]+):\s*([^;]+);/g;
    let match;
    
    while ((match = varRegex.exec(scss)) !== null) {
      variables.push({
        name: match[1],
        default: match[2].trim(),
        description: `CSS variable: ${match[1].replace('--forge-', '').replace(/-/g, ' ')}`
      });
    }

    return variables;
  }

  private getCategory(componentName: string): string {
    const categories: Record<string, string[]> = {
      'inputs': ['text-field', 'select', 'checkbox', 'radio', 'switch', 'slider', 'autocomplete', 'date-picker', 'time-picker', 'color-picker', 'file-picker'],
      'buttons': ['button', 'icon-button', 'button-toggle', 'split-button', 'floating-action-button'],
      'navigation': ['app-bar', 'drawer', 'tabs', 'stepper', 'paginator', 'bottom-sheet'],
      'layout': ['scaffold', 'card', 'accordion', 'expansion-panel', 'divider', 'stack', 'split-view'],
      'feedback': ['toast', 'banner', 'dialog', 'tooltip', 'popover', 'inline-message', 'backdrop'],
      'data-display': ['table', 'list', 'avatar', 'badge', 'chip', 'label', 'label-value'],
      'progress': ['linear-progress', 'circular-progress', 'skeleton', 'meter']
    };

    for (const [category, components] of Object.entries(categories)) {
      if (components.includes(componentName)) {
        return category;
      }
    }

    return 'utility';
  }

  private getVariants(componentName: string): string[] | undefined {
    if (componentName === 'button') {
      return ['text', 'outlined', 'tonal', 'filled', 'raised', 'link'];
    }
    return undefined;
  }

  private hasCSSOnly(componentName: string): boolean {
    const cssOnlyComponents = ['button', 'card', 'checkbox', 'switch', 'avatar', 'text-field'];
    return cssOnlyComponents.includes(componentName);
  }

  private async bundleDesignTokens(): Promise<void> {
    console.log('🎨 Bundling design tokens...');
    
    // For now, use predefined tokens. In production, these could be extracted from SCSS files
    this.designTokens = {
      color: [
        { name: 'Primary', value: '#1976d2', cssVariable: '--forge-theme-primary' },
        { name: 'Secondary', value: '#424242', cssVariable: '--forge-theme-secondary' },
        { name: 'Success', value: '#2e7d32', cssVariable: '--forge-theme-success' },
        { name: 'Error', value: '#d32f2f', cssVariable: '--forge-theme-error' },
        { name: 'Warning', value: '#ed6c02', cssVariable: '--forge-theme-warning' },
        { name: 'Info', value: '#0288d1', cssVariable: '--forge-theme-info' }
      ],
      typography: [
        { name: 'Font Family', value: 'Roboto, sans-serif', cssVariable: '--forge-font-family' },
        { name: 'Body', value: '14px', cssVariable: '--forge-body-font-size' },
        { name: 'Title', value: '20px', cssVariable: '--forge-title-font-size' }
      ],
      spacing: [
        { name: 'Small', value: '8px', cssVariable: '--forge-spacing-small' },
        { name: 'Medium', value: '16px', cssVariable: '--forge-spacing-medium' },
        { name: 'Large', value: '24px', cssVariable: '--forge-spacing-large' }
      ]
    };
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
}

// Run bundler
const bundler = new DataBundler();
bundler.bundle().catch(console.error);
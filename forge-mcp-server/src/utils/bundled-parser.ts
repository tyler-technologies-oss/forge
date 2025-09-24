import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ForgeComponent, ComponentExample, ComponentSlot } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/**
 * Parser that uses pre-bundled data instead of reading files
 * This is used for deployed environments where source files aren't available
 */
export class BundledDocumentationParser {
  private bundleData: BundledData | null = null;
  private bundlePath: string;

  constructor() {
    // Look for bundle in dist/data directory
    this.bundlePath = path.join(__dirname, '../../dist/data/forge-bundle.json');
  }

  async initialize(): Promise<void> {
    try {
      const bundleContent = await fs.readFile(this.bundlePath, 'utf-8');
      this.bundleData = JSON.parse(bundleContent);
      console.error(`Loaded bundled data: ${this.bundleData?.metadata.componentCount} components`);
    } catch (error) {
      console.error('Failed to load bundled data:', error);
      throw new Error('Bundled data not found. Run npm run bundle to generate it.');
    }
  }

  async parseComponent(componentName: string): Promise<ForgeComponent | null> {
    if (!this.bundleData) {
      await this.initialize();
    }

    const bundled = this.bundleData!.components[componentName];
    if (!bundled) {
      return null;
    }

    // Convert bundled component to ForgeComponent format
    const component: ForgeComponent = {
      name: bundled.name,
      tagName: bundled.tagName,
      description: bundled.description,
      category: bundled.category,
      properties: bundled.properties || [],
      events: bundled.events || [],
      slots: this.extractSlotsFromBundled(bundled),
      cssVariables: bundled.cssVariables || [],
      variants: bundled.variants,
      themes: bundled.themes,
      hasCSSOnly: bundled.hasCSSOnly,
      dependencies: bundled.dependencies,
      accessibility: this.extractAccessibilityFromBundled(bundled),
      examples: this.extractExamplesFromBundled(bundled)
    };

    return component;
  }

  private extractSlotsFromBundled(bundled: BundledComponent): ComponentSlot[] {
    const slots: ComponentSlot[] = [];
    
    // Extract from MDX content
    if (bundled.mdxContent) {
      const slotRegex = /slot=['"](\w+)['"]/g;
      const slotNames = new Set<string>();
      
      let match;
      while ((match = slotRegex.exec(bundled.mdxContent)) !== null) {
        slotNames.add(match[1]);
      }

      slotNames.forEach(name => {
        slots.push({
          name,
          description: `Content slot for ${name}`
        });
      });
    }

    // Also check if there are predefined slots
    if (bundled.slots && bundled.slots.length > 0) {
      return bundled.slots;
    }

    return slots;
  }

  private extractAccessibilityFromBundled(bundled: BundledComponent): string {
    if (bundled.mdxContent) {
      const accessibilitySection = bundled.mdxContent.match(/## Accessibility([\s\S]*?)(?=##|$)/);
      return accessibilitySection ? accessibilitySection[1].trim() : '';
    }
    return '';
  }

  private extractExamplesFromBundled(bundled: BundledComponent): ComponentExample[] {
    const examples: ComponentExample[] = [];
    
    if (bundled.storiesContent) {
      // Extract story names
      const storyRegex = /export const (\w+):[^=]+=\s*{/g;
      let match;
      
      while ((match = storyRegex.exec(bundled.storiesContent)) !== null) {
        examples.push({
          title: match[1],
          framework: 'vanilla',
          code: '', // Would need more parsing to extract
          description: undefined
        });
      }
    }

    return examples;
  }

  async getAllComponents(): Promise<string[]> {
    if (!this.bundleData) {
      await this.initialize();
    }

    return Object.keys(this.bundleData!.components);
  }

  async getDesignTokens(): Promise<Record<string, any>> {
    if (!this.bundleData) {
      await this.initialize();
    }

    return this.bundleData!.designTokens;
  }

  async getComponentDocumentation(componentName: string): Promise<string | null> {
    if (!this.bundleData) {
      await this.initialize();
    }

    const bundled = this.bundleData!.components[componentName];
    if (!bundled) {
      return null;
    }

    // Return the MDX content directly
    return bundled.mdxContent || null;
  }

  async getComponentExamples(componentName: string): Promise<string | null> {
    if (!this.bundleData) {
      await this.initialize();
    }

    const bundled = this.bundleData!.components[componentName];
    if (!bundled) {
      return null;
    }

    // Return relevant examples from stories and dev pages
    let examples = '';
    
    if (bundled.storiesContent) {
      examples += `// Stories Examples\n${bundled.storiesContent}\n\n`;
    }
    
    if (bundled.devPageContent) {
      examples += `<!-- Dev Page HTML -->\n${bundled.devPageContent}\n`;
    }

    return examples || null;
  }
}
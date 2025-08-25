import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MDXResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  path: string;
}

export class MDXResourceManager {
  private resources: Map<string, MDXResource> = new Map();
  private storiesPath: string;
  private initialized = false;
  private useBundled: boolean;

  constructor() {
    // Use bundled data if FORGE_BUNDLED env var is set or if stories directory doesn't exist
    this.useBundled = process.env.FORGE_BUNDLED === 'true';
    this.storiesPath = this.findStoriesPath();
    
    if (!existsSync(this.storiesPath)) {
      this.useBundled = true;
      console.error('Stories directory not found, will use bundled MDX data if available');
    }
  }

  private findStoriesPath(): string {
    // Try different possible paths relative to the compiled output
    const possiblePaths = [
      path.join(__dirname, '../../../../src/stories'),
      path.join(__dirname, '../../../src/stories'),
      path.join(__dirname, '../../src/stories'),
      path.join(process.cwd(), 'src/stories'),
      path.join(process.cwd(), '../../../src/stories')
    ];

    for (const p of possiblePaths) {
      if (existsSync(p)) {
        console.error(`Found stories directory at: ${p}`);
        return p;
      }
    }

    // Default path if none found
    const defaultPath = path.join(__dirname, '../../../src/stories');
    console.error(`Stories directory not found, using default: ${defaultPath}`);
    return defaultPath;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      if (this.useBundled) {
        await this.loadFromBundle();
      } else {
        await this.scanDirectory(this.storiesPath);
      }
      this.initialized = true;
      console.error(`Loaded ${this.resources.size} MDX resources (${this.useBundled ? 'bundled' : 'live'})`);
    } catch (error) {
      console.error('Failed to load MDX resources:', error);
      // Initialize with empty resources if loading fails
      this.initialized = true;
    }
  }

  private async loadFromBundle(): Promise<void> {
    try {
      const bundlePath = path.join(__dirname, '../../data/mdx-bundle.json');
      const bundleData = await fs.readFile(bundlePath, 'utf-8');
      const bundle = JSON.parse(bundleData);
      
      for (const resource of bundle.resources) {
        // For bundled resources, store content in the path field
        this.resources.set(resource.uri, {
          ...resource,
          path: '' // No file path for bundled resources
        });
      }
    } catch (error) {
      console.error('Failed to load MDX bundle:', error);
      throw error;
    }
  }

  private async scanDirectory(dir: string, baseDir?: string): Promise<void> {
    if (!existsSync(dir)) {
      console.error(`Directory does not exist: ${dir}`);
      return;
    }

    const base = baseDir || this.storiesPath;
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          await this.scanDirectory(fullPath, base);
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          // Create resource for MDX file
          const relativePath = path.relative(base, fullPath);
          const resource = this.createResourceFromPath(relativePath, fullPath);
          this.resources.set(resource.uri, resource);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  private createResourceFromPath(relativePath: string, fullPath: string): MDXResource {
    // Convert file path to URI format
    // e.g., "getting-started/Installation.mdx" -> "forge://docs/getting-started/installation"
    // e.g., "components/button/Button.mdx" -> "forge://docs/components/button"
    
    const parts = relativePath.replace(/\.mdx$/i, '').split(path.sep);
    
    // Clean up the URI parts
    const uriParts = parts.map(part => 
      part.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    );
    
    const uri = `forge://docs/${uriParts.join('/')}`;
    
    // Generate a friendly name
    const name = this.generateFriendlyName(relativePath);
    
    // Generate description based on path
    const description = this.generateDescription(relativePath);
    
    return {
      uri,
      name,
      description,
      mimeType: 'text/markdown',
      path: fullPath
    };
  }

  private generateFriendlyName(relativePath: string): string {
    // Extract the file name without extension
    const fileName = path.basename(relativePath, '.mdx');
    
    // Get the directory path
    const dirPath = path.dirname(relativePath);
    
    // Special handling for common patterns
    if (fileName.toLowerCase() === 'index' && dirPath !== '.') {
      // Use parent directory name for index files
      const parentDir = path.basename(dirPath);
      return this.titleCase(parentDir);
    }
    
    // Include parent directory for context if not in root
    if (dirPath !== '.' && dirPath !== '') {
      const parentDir = path.basename(dirPath);
      return `${this.titleCase(parentDir)} - ${this.titleCase(fileName)}`;
    }
    
    return this.titleCase(fileName);
  }

  private generateDescription(relativePath: string): string {
    const parts = relativePath.toLowerCase().replace(/\.mdx$/i, '').split(path.sep);
    
    // Generate contextual descriptions
    if (parts.includes('getting-started')) {
      return 'Getting started guide for Tyler Forge';
    }
    if (parts.includes('components')) {
      const componentName = parts[parts.length - 1];
      return `Documentation and examples for the ${componentName} component`;
    }
    if (parts.includes('frameworks')) {
      const framework = parts[parts.length - 1];
      return `Integration guide for using Tyler Forge with ${this.titleCase(framework)}`;
    }
    if (parts.includes('design')) {
      return 'Design guidelines and principles for Tyler Forge';
    }
    if (parts.includes('accessibility')) {
      return 'Accessibility guidelines and best practices';
    }
    if (parts.includes('api')) {
      return 'API documentation and reference';
    }
    
    // Default description
    const fileName = parts[parts.length - 1];
    return `Documentation for ${this.titleCase(fileName)}`;
  }

  private titleCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  async listResources(): Promise<MDXResource[]> {
    await this.initialize();
    const allResources = Array.from(this.resources.values());
    
    // Sort resources to prioritize getting-started
    return allResources.sort((a, b) => {
      // Priority order for categories
      const categoryPriority: Record<string, number> = {
        'getting-started': 1,
        'frameworks': 2,
        'components': 3,
        'design-tokens': 4,
        'recipes': 5,
        'faq': 6,
        'about': 7,
        'home': 8
      };
      
      // Extract category from URI
      const getCategoryFromUri = (uri: string) => {
        const parts = uri.replace('forge://docs/', '').split('/');
        return parts[0] || 'other';
      };
      
      const categoryA = getCategoryFromUri(a.uri);
      const categoryB = getCategoryFromUri(b.uri);
      
      const priorityA = categoryPriority[categoryA] || 99;
      const priorityB = categoryPriority[categoryB] || 99;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // Within same category, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  }

  async getResource(uri: string): Promise<string | null> {
    await this.initialize();
    
    const resource = this.resources.get(uri);
    if (!resource) {
      return null;
    }
    
    // If using bundled data, content is already stored in the resource
    if (this.useBundled) {
      return (resource as any).content || null;
    }
    
    // Otherwise, read from file
    try {
      const content = await fs.readFile(resource.path, 'utf-8');
      return this.cleanMDXContent(content);
    } catch (error) {
      console.error(`Failed to read resource ${uri}:`, error);
      return null;
    }
  }

  private cleanMDXContent(content: string): string {
    // Remove MDX-specific syntax
    return content
      // Remove import statements
      .replace(/^import\s+.*?from\s+['""].*?['""];?\s*$/gm, '')
      // Remove export statements
      .replace(/^export\s+.*?;\s*$/gm, '')
      // Remove Meta components
      .replace(/<Meta\s+[^>]*\/>\s*/g, '')
      // Remove Canvas/Story components (preserve content)
      .replace(/<Canvas[^>]*>([\s\S]*?)<\/Canvas>/g, '$1')
      .replace(/<Story[^>]*>([\s\S]*?)<\/Story>/g, '$1')
      // Remove ArgsTable components
      .replace(/<ArgsTable[^>]*\/>/g, '')
      // Convert JSX code blocks to regular markdown
      .replace(/```jsx/g, '```javascript')
      // Remove MDX comments
      .replace(/{\/\*[\s\S]*?\*\/}/g, '')
      // Clean up excessive whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  // Get resources by category for better organization
  async getResourcesByCategory(): Promise<Record<string, MDXResource[]>> {
    await this.initialize();
    
    const categorized: Record<string, MDXResource[]> = {};
    
    for (const resource of this.resources.values()) {
      // Extract category from URI
      const parts = resource.uri.replace('forge://docs/', '').split('/');
      const category = parts[0] || 'general';
      
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(resource);
    }
    
    // Sort resources within each category
    for (const category in categorized) {
      categorized[category].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return categorized;
  }

  // Search resources by keyword
  async searchResources(query: string): Promise<MDXResource[]> {
    await this.initialize();
    
    const lowerQuery = query.toLowerCase();
    const results: MDXResource[] = [];
    
    for (const resource of this.resources.values()) {
      if (
        resource.name.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.uri.toLowerCase().includes(lowerQuery)
      ) {
        results.push(resource);
      }
    }
    
    return results;
  }

  // Get related resources based on current resource
  async getRelatedResources(uri: string, limit = 5): Promise<MDXResource[]> {
    await this.initialize();
    
    const current = this.resources.get(uri);
    if (!current) return [];
    
    // Extract keywords from current resource
    const parts = uri.replace('forge://docs/', '').split('/');
    const category = parts[0];
    
    const related: MDXResource[] = [];
    
    // Find resources in the same category
    for (const resource of this.resources.values()) {
      if (resource.uri === uri) continue;
      
      if (resource.uri.includes(category)) {
        related.push(resource);
      }
      
      if (related.length >= limit) break;
    }
    
    return related;
  }
}
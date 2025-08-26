import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MDXResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  content?: string;
}

interface BundledMDXData {
  resources: MDXResource[];
  timestamp: string;
  version: string;
}

/**
 * Bundled MDX Resource Manager
 * Uses pre-bundled MDX content for production deployments
 */
export class BundledMDXResourceManager {
  private resources: Map<string, MDXResource> = new Map();
  private initialized = false;
  private bundlePath: string;

  constructor() {
    // Try different paths for the bundle
    const possiblePaths = [
      path.join(__dirname, '../../data/mdx-bundle.json'),
      path.join(__dirname, '../data/mdx-bundle.json'),
      path.join(__dirname, './mdx-bundle.json'),
      path.join(process.cwd(), 'data/mdx-bundle.json')
    ];

    // Use the first path that exists, or default to expected location
    this.bundlePath = possiblePaths[0];
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // In production, load from bundled JSON file
      const bundle = await this.loadBundle();
      
      for (const resource of bundle.resources) {
        this.resources.set(resource.uri, resource);
      }
      
      this.initialized = true;
      console.error(`Loaded ${this.resources.size} bundled MDX resources`);
    } catch (error) {
      console.error('Failed to load MDX bundle:', error);
      // Initialize with empty resources if bundle loading fails
      this.initialized = true;
    }
  }

  private async loadBundle(): Promise<BundledMDXData> {
    try {
      // Try to load the bundled data
      const bundleModule = await import(this.bundlePath);
      return bundleModule.default;
    } catch (error) {
      console.error(`Bundle not found at ${this.bundlePath}, returning empty bundle`);
      return {
        resources: [],
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      };
    }
  }

  async listResources(): Promise<MDXResource[]> {
    await this.initialize();
    const allResources = Array.from(this.resources.values());
    
    // Resources should already be sorted in the bundle,
    // but sort again to ensure getting-started is first
    return allResources.sort((a, b) => {
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
      
      return a.name.localeCompare(b.name);
    });
  }

  async getResource(uri: string): Promise<string | null> {
    await this.initialize();
    
    const resource = this.resources.get(uri);
    if (!resource) {
      return null;
    }
    
    // Content is embedded in the bundle
    return resource.content || null;
  }

  async getResourcesByCategory(): Promise<Record<string, MDXResource[]>> {
    await this.initialize();
    
    const categorized: Record<string, MDXResource[]> = {};
    
    for (const resource of this.resources.values()) {
      const parts = resource.uri.replace('forge://docs/', '').split('/');
      const category = parts[0] || 'general';
      
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(resource);
    }
    
    for (const category in categorized) {
      categorized[category].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return categorized;
  }

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

  async getRelatedResources(uri: string, limit = 5): Promise<MDXResource[]> {
    await this.initialize();
    
    const current = this.resources.get(uri);
    if (!current) return [];
    
    const parts = uri.replace('forge://docs/', '').split('/');
    const category = parts[0];
    
    const related: MDXResource[] = [];
    
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
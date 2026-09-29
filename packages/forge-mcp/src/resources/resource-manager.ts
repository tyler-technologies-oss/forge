import { ForgeResource } from '../types/index.js';
import { getCEMLoader } from '../services/cem-loader.js';
import { ComponentDocsResource } from './components/component-docs-resource.js';
import { ComponentsBriefResource } from './components/components-brief-resource.js';
import { STATIC_RESOURCES, readStaticResource } from './static-resources.js';

const RESOURCE_SCHEME = 'forge://';

/**
 * Central manager for Tyler Forge MCP resources.
 *
 * This class implements the streamlined resource model that exposes 8 core resource types
 * plus individual component resources, consolidating content to reduce LLM context overload
 * while maintaining comprehensive access through tools.
 */
export class ResourceManager {
  private _cemLoader = getCEMLoader();
  private _elementDocumentation = new ComponentDocsResource();
  private _componentsBrief = new ComponentsBriefResource();

  /**
   * Initialize the resource manager by loading CEM data
   */
  public async initialize(workingDirectory?: string): Promise<void> {
    if (!this._cemLoader.isLoaded()) {
      try {
        await this._cemLoader.loadCEM(workingDirectory);
      } catch (error) {
        // Failed to load Custom Elements Manifest
        throw new Error(
          `Resource initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }
  }

  /**
   * List all available resources according to the streamlined resource model.
   * @returns Promise resolving to array of available ForgeResource objects
   * @throws Error if CEM data cannot be loaded
   */
  public async listResources(): Promise<ForgeResource[]> {
    await this._ensureInitialized();

    const tagNames = this._cemLoader.getComponentTagNames();
    const resources: ForgeResource[] = [];

    // Add the components summary resource
    resources.push({
      uri: 'forge://components',
      name: 'Components',
      description:
        'Overview list of all Tyler Forge components with names and summaries',
      mimeType: 'text/markdown',
    });

    // Add the static, template-backed resources (installation, usage,
    // frameworks, icons, design tokens)
    resources.push(
      ...STATIC_RESOURCES.map(definition => ({
        uri: definition.uri,
        name: definition.name,
        description: definition.description,
        mimeType: 'text/markdown',
      })),
    );

    // Add individual component resources
    resources.push(
      ...tagNames.map(tagName => {
        const component = this._cemLoader.getComponent(tagName);
        return {
          uri: `forge://component/${tagName}`,
          name: tagName,
          description:
            component?.summary ||
            component?.description ||
            `Documentation for ${tagName} component`,
          mimeType: 'text/markdown',
        };
      }),
    );

    return resources;
  }

  /**
   * Read a resource by its URI and return the generated markdown content.
   *
   * @param uri - The resource URI (e.g., 'forge://components', 'forge://component/forge-button')
   * @returns Promise resolving to the markdown content for the resource
   * @throws Error if the URI is invalid or the resource cannot be found/generated
   */
  public async readResource(uri: string): Promise<string> {
    await this._ensureInitialized();

    if (uri === 'forge://components') {
      const components = this._cemLoader.getAllComponents();
      return this._componentsBrief.get(components);
    }

    const staticResource = STATIC_RESOURCES.find(
      definition => definition.uri === uri,
    );
    if (staticResource) {
      return await readStaticResource(uri);
    }

    // Handle component resources ex. 'forge://component/forge-button'
    const componentMatch = uri.match(
      /^forge:\/\/component\/([^/]+)(?:\/(.+))?$/,
    );

    if (!componentMatch) {
      throw new Error(`Invalid resource URI: ${uri}`);
    }

    const [, tagName] = componentMatch;
    const component = this._cemLoader.getComponent(tagName);

    if (!component) {
      throw new Error(`Component not found: ${tagName}`);
    }

    return await this._elementDocumentation.get(component);
  }

  /**
   * Check if a resource URI is valid
   */
  public async isValidResourceUri(uri: string): Promise<boolean> {
    try {
      await this._ensureInitialized();
      const resources = await this.listResources();
      return resources.some(resource => resource.uri === uri);
    } catch {
      return (
        uri.startsWith(RESOURCE_SCHEME) && uri.length > RESOURCE_SCHEME.length
      );
    }
  }

  /**
   * Extract component name from resource URI
   */
  public extractComponentName(uri: string): string | null {
    const match = uri.match(/^forge:\/\/component\/(.+)$/);
    return match ? match[1] : null;
  }

  /**
   * Ensure CEM data is loaded
   */
  private async _ensureInitialized(): Promise<void> {
    if (!this._cemLoader.isLoaded()) {
      await this.initialize();
    }
  }

  /**
   * Get Angular framework guide content
   */
  public async getFrameworkAngular(): Promise<string> {
    return this.readResource('forge://framework/angular');
  }

  /**
   * Get React framework guide content
   */
  public async getFrameworkReact(): Promise<string> {
    return this.readResource('forge://framework/react');
  }

  /**
   * Get Vue framework guide content
   */
  public async getFrameworkVue(): Promise<string> {
    return this.readResource('forge://framework/vue');
  }

  /**
   * Get Svelte framework guide content
   */
  public async getFrameworkSvelte(): Promise<string> {
    return this.readResource('forge://framework/svelte');
  }

  /**
   * Get Lit framework guide content
   */
  public async getFrameworkLit(): Promise<string> {
    return this.readResource('forge://framework/lit');
  }
}

// Singleton instance
let resourceManagerInstance: ResourceManager | null = null;

/**
 * Get the singleton resource manager instance
 */
export function getResourceManager(): ResourceManager {
  if (!resourceManagerInstance) {
    resourceManagerInstance = new ResourceManager();
  }
  return resourceManagerInstance;
}

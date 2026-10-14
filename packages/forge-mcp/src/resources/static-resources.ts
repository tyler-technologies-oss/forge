import { readTemplateResource } from './base/base-template-resource.js';

/**
 * A Forge resource backed by a single static markdown template, with no
 * per-request computation (installation guides, framework guides, typography,
 * icons). Dynamic resources (individual components, design tokens) are handled
 * separately by ResourceManager.
 */
export interface StaticResourceDefinition {
  uri: string;
  name: string;
  description: string;
  templatePath: string;
}

export const STATIC_RESOURCES: StaticResourceDefinition[] = [
  {
    uri: 'forge://installation',
    name: 'Tyler Forge Installation',
    description: 'Complete installation guide for Tyler Forge web components',
    templatePath: 'installation/installation.md'
  },
  {
    uri: 'forge://usage',
    name: 'Tyler Forge Usage Guide',
    description: 'Comprehensive usage guide for Tyler Forge web components',
    templatePath: 'usage/usage.md'
  },
  {
    uri: 'forge://framework/angular',
    name: 'Tyler Forge Angular Integration',
    description: 'Comprehensive framework-specific installation and usage instructions for Angular applications',
    templatePath: 'frameworks/framework-angular.md'
  },
  {
    uri: 'forge://framework/react',
    name: 'Tyler Forge React Integration',
    description: 'Comprehensive framework-specific installation and usage instructions for React applications',
    templatePath: 'frameworks/framework-react.md'
  },
  {
    uri: 'forge://framework/vue',
    name: 'Tyler Forge Vue Integration',
    description: 'Comprehensive framework-specific installation and usage instructions for Vue applications',
    templatePath: 'frameworks/framework-vue.md'
  },
  {
    uri: 'forge://framework/svelte',
    name: 'Tyler Forge Svelte Integration',
    description: 'Comprehensive framework-specific installation and usage instructions for Svelte applications',
    templatePath: 'frameworks/framework-svelte.md'
  },
  {
    uri: 'forge://framework/lit',
    name: 'Tyler Forge Lit Integration',
    description: 'Comprehensive framework-specific installation and usage instructions for Lit applications',
    templatePath: 'frameworks/framework-lit.md'
  },
  {
    uri: 'forge://icons',
    name: 'Tyler Forge Icons',
    description: 'Complete guide to installing and using Tyler Forge icons in your application',
    templatePath: 'icons/icons.md'
  },
  {
    uri: 'forge://design-tokens/typography',
    name: 'Tyler Forge Typography',
    description: 'Tyler Forge Design system typography guidelines and usage information',
    templatePath: 'design-tokens/typography.md'
  }
];

export function findStaticResource(uri: string): StaticResourceDefinition | undefined {
  return STATIC_RESOURCES.find(resource => resource.uri === uri);
}

export async function readStaticResource(uri: string): Promise<string> {
  const definition = findStaticResource(uri);
  if (!definition) {
    throw new Error(`Unknown static resource URI: ${uri}`);
  }
  return readTemplateResource(definition.templatePath);
}

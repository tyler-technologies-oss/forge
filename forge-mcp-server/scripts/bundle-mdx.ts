#!/usr/bin/env node

/**
 * Bundle all MDX documentation files into a static JSON database
 * This allows the MCP server to access documentation without the source files
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FORGE_ROOT = path.resolve(__dirname, '../../');
const STORIES_DIR = path.join(FORGE_ROOT, 'src/stories');
const OUTPUT_DIR = path.join(__dirname, '../dist/data');

interface MDXResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  content: string;
}

interface BundledMDXData {
  resources: MDXResource[];
  timestamp: string;
  version: string;
}

async function cleanMDXContent(content: string): Promise<string> {
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

function generateFriendlyName(relativePath: string): string {
  const fileName = path.basename(relativePath, '.mdx');
  const dirPath = path.dirname(relativePath);
  
  // Special handling for index files
  if (fileName.toLowerCase() === 'index' && dirPath !== '.') {
    const parentDir = path.basename(dirPath);
    return titleCase(parentDir);
  }
  
  // Include parent directory for context if not in root
  if (dirPath !== '.' && dirPath !== '') {
    const parentDir = path.basename(dirPath);
    return `${titleCase(parentDir)} - ${titleCase(fileName)}`;
  }
  
  return titleCase(fileName);
}

function generateDescription(relativePath: string): string {
  const parts = relativePath.toLowerCase().replace(/\.mdx$/i, '').split(path.sep);
  
  if (parts.includes('getting-started')) {
    return 'Getting started guide for Tyler Forge';
  }
  if (parts.includes('components')) {
    const componentName = parts[parts.length - 1];
    return `Documentation and examples for the ${componentName} component`;
  }
  if (parts.includes('frameworks')) {
    const framework = parts[parts.length - 1];
    return `Integration guide for using Tyler Forge with ${titleCase(framework)}`;
  }
  if (parts.includes('design-tokens')) {
    return 'Design system tokens and guidelines';
  }
  if (parts.includes('accessibility')) {
    return 'Accessibility guidelines and best practices';
  }
  if (parts.includes('recipes')) {
    return 'Example implementations and patterns';
  }
  
  const fileName = parts[parts.length - 1];
  return `Documentation for ${titleCase(fileName)}`;
}

function titleCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function bundleMDXFiles(): Promise<void> {
  console.log('Bundling MDX documentation files...');
  
  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Find all MDX files
  const mdxFiles = await glob('**/*.mdx', {
    cwd: STORIES_DIR,
    ignore: ['**/node_modules/**']
  });
  
  console.log(`Found ${mdxFiles.length} MDX files`);
  
  const resources: MDXResource[] = [];
  
  for (const mdxFile of mdxFiles) {
    const fullPath = path.join(STORIES_DIR, mdxFile);
    const relativePath = mdxFile;
    
    try {
      // Read and clean the MDX content
      const rawContent = await fs.readFile(fullPath, 'utf-8');
      const content = await cleanMDXContent(rawContent);
      
      // Generate URI
      const parts = relativePath.replace(/\.mdx$/i, '').split(path.sep);
      const uriParts = parts.map(part => 
        part.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
      );
      const uri = `forge://docs/${uriParts.join('/')}`;
      
      // Create resource
      const resource: MDXResource = {
        uri,
        name: generateFriendlyName(relativePath),
        description: generateDescription(relativePath),
        mimeType: 'text/markdown',
        content
      };
      
      resources.push(resource);
      console.log(`  ✓ ${resource.name} (${content.length} chars)`);
    } catch (error) {
      console.error(`  ✗ Failed to process ${mdxFile}:`, error);
    }
  }
  
  // Sort resources with getting-started first
  resources.sort((a, b) => {
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
  
  // Create bundle
  const bundle: BundledMDXData = {
    resources,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
  
  // Write bundle to file
  const outputPath = path.join(OUTPUT_DIR, 'mdx-bundle.json');
  await fs.writeFile(
    outputPath,
    JSON.stringify(bundle, null, 2)
  );
  
  // Get file size
  const stats = await fs.stat(outputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  
  console.log(`\n✅ Successfully bundled ${resources.length} MDX resources`);
  console.log(`📦 Bundle size: ${sizeMB} MB`);
  console.log(`📁 Output: ${outputPath}`);
  
  // Show category breakdown
  const categories: Record<string, number> = {};
  for (const resource of resources) {
    const category = resource.uri.replace('forge://docs/', '').split('/')[0];
    categories[category] = (categories[category] || 0) + 1;
  }
  
  console.log('\nCategory breakdown:');
  for (const [category, count] of Object.entries(categories)) {
    console.log(`  ${category}: ${count} files`);
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  bundleMDXFiles().catch(console.error);
}

export { bundleMDXFiles };
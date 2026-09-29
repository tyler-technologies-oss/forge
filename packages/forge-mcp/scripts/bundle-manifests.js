#!/usr/bin/env node
/* eslint-disable no-console */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Packages to bundle
const PACKAGES = [
  {
    name: '@tylertech/forge',
    outputName: '@tylertech-forge-custom-elements.json'
  }
];

/**
 * Bundle custom-elements.json files from Tyler Tech devDependencies
 */
async function bundleManifests() {
  // Create output directory
  const outputDir = join(projectRoot, 'dist', 'bundled-manifests');
  try {
    await mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create bundled-manifests directory:', error);
    process.exit(1);
  }

  // Copy and rename manifest files
  for (const pkg of PACKAGES) {
    try {
      const manifestPath = join(projectRoot, 'node_modules', pkg.name, 'custom-elements.json');

      let manifestContent;
      try {
        manifestContent = await readFile(manifestPath, 'utf-8');
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
        console.warn(`Warning: ${pkg.name} custom-elements.json not found, skipping...`);
        continue;
      }

      // Validate it's valid JSON
      try {
        JSON.parse(manifestContent);
      } catch {
        console.warn(`Warning: Invalid JSON in ${pkg.name} manifest, skipping...`);
        continue;
      }

      // Write to output directory with new name
      const outputPath = join(outputDir, pkg.outputName);
      await writeFile(outputPath, manifestContent, 'utf-8');

      console.log(`✓ Bundled ${pkg.name} → ${pkg.outputName}`);
    } catch (error) {
      console.error(`Failed to bundle ${pkg.name}:`, error);
    }
  }
}

// Run the bundling process
bundleManifests().catch(error => {
  console.error('Bundle manifests script failed:', error);
  process.exit(1);
});

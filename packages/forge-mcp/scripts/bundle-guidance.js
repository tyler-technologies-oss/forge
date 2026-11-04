#!/usr/bin/env node
/* eslint-disable no-console */

// Bundles the published Forge guidance (rules and index) into dist/ so the server still has the
// rules when the docs site is unreachable. Prefers the live site, then a local docs build.
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(projectRoot, 'dist', 'bundled-guidance');
const localDocsDir = join(projectRoot, '..', '..', 'docs', 'dist', 'skill', 'forge-design');
const SITE_URL = 'https://tylerforge.design/skill/forge-design';
const FILES = ['rules.md', 'rules.json', 'manifest.json'];
const FETCH_TIMEOUT_MS = 10_000;

async function fetchGuidanceFile(file) {
  const response = await fetch(`${SITE_URL}/${file}`, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function readGuidanceFile(file) {
  try {
    return { content: await fetchGuidanceFile(file), source: SITE_URL };
  } catch (error) {
    const local = await readFile(join(localDocsDir, file), 'utf-8').catch(() => null);
    if (local === null) {
      throw error;
    }
    return { content: local, source: 'local docs build' };
  }
}

async function bundleGuidance() {
  await mkdir(outputDir, { recursive: true });
  for (const file of FILES) {
    try {
      const { content, source } = await readGuidanceFile(file);
      if (file.endsWith('.json')) {
        JSON.parse(content);
      }
      await writeFile(join(outputDir, file), content, 'utf-8');
      console.log(`✓ Bundled guidance ${file} from ${source}`);
    } catch (error) {
      console.warn(`Warning: could not bundle guidance ${file} (${error.message}); the server will rely on the live site.`);
    }
  }
}

bundleGuidance().catch(error => {
  console.error('Bundle guidance script failed:', error);
  process.exit(1);
});

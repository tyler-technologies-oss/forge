/**
 * Standalone block build script.
 * Compiles all blocks with Handlebars and outputs to dist directory.
 */

import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { compileBlock } from './block-compiler.js';
import { createPartialRegistry } from './partial-registry.js';
import { generateManifest } from './generate-manifest.js';

const BLOCKS_PATH = 'src/blocks';
const LAYOUT_PATH = 'src/includes/base.html';
const PARTIALS_PATH = 'src/partials';
const DIST_DIR = 'dist';
const BASE_HREF = process.env.BASE_HREF || '/';

async function buildBlocks() {
  console.log('Building blocks...');
  console.log(`Base HREF: ${BASE_HREF}`);

  const partialRegistry = createPartialRegistry({ partialsPath: PARTIALS_PATH });
  partialRegistry.load();

  const blockFiles = await glob(`${BLOCKS_PATH}/**/*.html`, { nodir: true });

  for (const blockFile of blockFiles) {
    const blockHtml = fs.readFileSync(blockFile, 'utf-8');
    const scriptFile = blockFile.replace(/\.html$/, '.ts');
    const blockScriptSrc = fs.existsSync(scriptFile)
      ? `${BASE_HREF}${path.relative(BLOCKS_PATH, scriptFile).replace(/\\/g, '/').replace(/\.ts$/, '.js')}`
      : undefined;

    const result = compileBlock(blockHtml, {
      layoutPath: LAYOUT_PATH,
      partialRegistry,
      baseHref: BASE_HREF,
      blockScriptSrc
    });

    if (!result.success) {
      console.error(`Failed to compile ${blockFile}: ${result.error}`);
      continue;
    }

    const relativePath = path.relative(BLOCKS_PATH, blockFile);
    const outputPath = path.join(DIST_DIR, relativePath);
    const outputDir = path.dirname(outputPath);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, result.html);
    console.log(`Built: ${relativePath}`);
  }

  const screenshots = await glob(`${BLOCKS_PATH}/**/*.{webp,png}`, { nodir: true });
  for (const screenshot of screenshots) {
    const relativePath = path.relative(BLOCKS_PATH, screenshot);
    const destPath = path.join(DIST_DIR, relativePath);
    const destDir = path.dirname(destPath);
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(screenshot, destPath);
  }

  await generateManifest({
    blocksPath: BLOCKS_PATH,
    outputPath: `${DIST_DIR}/manifest.json`,
    silent: false
  });

  console.log('Build complete!');
}

buildBlocks().catch(console.error);

/**
 * Block screenshot generator.
 * Uses Playwright to capture screenshots of rendered block HTML files.
 * Only regenerates screenshots for blocks that have changed (unless --force is used).
 * Run via: pnpm generate-screenshots [--filter <name>] [--force] [--width <px>] [--height <px>]
 */

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { discoverBlocks } from './generate-manifest.js';
import { needsScreenshot, getArgValue, getArgNumber, hasArg } from './utils.js';
import type { Browser, Page } from 'playwright';
import type { ViteDevServer } from 'vite';
import type { Block } from './types.js';

export interface GenerateScreenshotsOptions {
  blocksPath: string;
  outputDir?: string;
  width?: number;
  height?: number;
  fullPage?: boolean;
  filter?: string;
  force?: boolean;
}

/**
 * Waits for Forge web components to fully render.
 * Ensures shadow DOMs are attached and fonts are loaded.
 */
async function waitForForgeComponents(page: Page): Promise<void> {
  // Wait for all forge- custom elements to have shadow roots
  await page.waitForFunction(() => {
    const forgeElements = document.querySelectorAll('forge-button, forge-card, forge-text-field, forge-checkbox, forge-divider, forge-table, forge-app-layout, forge-app-bar, forge-scaffold, forge-toolbar, forge-icon, forge-select, forge-switch, forge-radio, forge-dialog, forge-drawer, forge-tab-bar, forge-tab, forge-list, forge-list-item, forge-menu, forge-badge, forge-avatar, forge-chip, forge-expansion-panel, forge-stepper, forge-file-picker');
    if (forgeElements.length === 0) {
      return true;
    }
    return Array.from(forgeElements).every(el => el.shadowRoot !== null);
  }, { timeout: 15000 }).catch(() => {
    // Continue even if timeout
  });

  await page.evaluate(() => document.fonts.ready);

  // Ensure body is visible (template hides body until forge-scaffold loads)
  await page.evaluate(() => {
    document.body.classList.add('ready');
    document.body.style.opacity = '1';
  });

  // Additional wait for rendering and animations to settle
  await page.waitForTimeout(500);
}

/**
 * Generates screenshots for all blocks (or filtered subset).
 */
export async function generateScreenshots(options: GenerateScreenshotsOptions): Promise<void> {
  const {
    blocksPath,
    outputDir,
    width = 1280,
    height = 800,
    fullPage = true,
    filter,
    force = false
  } = options;

  console.log('Discovering blocks...');
  let blocks: Block[] = await discoverBlocks(blocksPath);

  if (filter) {
    const filterLower: string = filter.toLowerCase();
    blocks = blocks.filter((b: Block): boolean =>
      b.id.toLowerCase().includes(filterLower) ||
      b.name.toLowerCase().includes(filterLower)
    );
  }

  // Filter to only blocks that need screenshots (unless force is set)
  const blocksToCapture: Block[] = force
    ? blocks
    : blocks.filter((block: Block): boolean => {
        const srcPath: string = block.file.replace(/^blocks\//, 'src/blocks/');
        const htmlPath: string = srcPath;
        const pngPath: string = outputDir
          ? path.join(outputDir, `${block.id.replace('blocks/', '')}.png`)
          : srcPath.replace('.html', '.png');
        return needsScreenshot(htmlPath, pngPath);
      });

  if (blocksToCapture.length === 0) {
    console.log(`All ${blocks.length} screenshots are up to date`);
    return;
  }

  console.log(`Found ${blocksToCapture.length} blocks needing screenshots (${blocks.length - blocksToCapture.length} up to date)`);
  console.log('Starting Vite dev server...');

  const server: ViteDevServer = await createServer({
    root: process.cwd(),
    server: { port: 0 }
  });

  await server.listen();
  const serverUrl = server.resolvedUrls?.local?.[0];
  if (!serverUrl) {
    throw new Error('Failed to start Vite dev server');
  }
  console.log(`Dev server running at ${serverUrl}`);

  let browser: Browser | undefined;

  try {
    browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width, height }
    });
    const page = await context.newPage();

    for (const block of blocksToCapture) {
      // block.file is "blocks/..." for deployed URLs, but vite serves from "src/blocks/..."
      const srcPath = block.file.replace(/^blocks\//, 'src/blocks/');
      const blockUrl = `${serverUrl}/${srcPath}`;
      const screenshotPath = outputDir
        ? path.join(outputDir, `${block.id.replace('blocks/', '')}.png`)
        : srcPath.replace('.html', '.png');

      const screenshotDir = path.dirname(screenshotPath);
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      console.log(`Capturing: ${block.name}`);

      try {
        await page.goto(blockUrl, { waitUntil: 'networkidle' });
        await waitForForgeComponents(page);

        await page.screenshot({
          path: screenshotPath,
          fullPage
        });

        console.log(`  → ${screenshotPath}`);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`  ✗ Failed to capture ${block.name}:`, message);
      }
    }

    console.log(`\nGenerated ${blocksToCapture.length} screenshots`);
  } finally {
    await browser?.close();
    await server.close();
  }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const args: string[] = process.argv.slice(2);

  const options: GenerateScreenshotsOptions = {
    blocksPath: path.resolve(process.cwd(), 'src/blocks'),
    filter: getArgValue(args, '--filter'),
    width: getArgNumber(args, '--width'),
    height: getArgNumber(args, '--height'),
    outputDir: getArgValue(args, '--output'),
    fullPage: !hasArg(args, '--no-full-page'),
    force: hasArg(args, '--force')
  };

  generateScreenshots(options).catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}

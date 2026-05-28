/**
 * Block screenshot generator.
 * Uses Playwright to capture screenshots of rendered block HTML files.
 * Captures at full width (1280px) then resizes to thumbnail width (500px) for smaller file sizes.
 * Only regenerates screenshots for blocks that have changed (unless --force is used).
 * Run via: pnpm generate-screenshots [--filter <name>] [--force] [--width <px>] [--thumbnail-width <px>]
 */

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import sharp from 'sharp';
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
  thumbnailWidth?: number;
  fullPage?: boolean;
  filter?: string;
  force?: boolean;
}

/**
 * Waits for Forge web components to fully render.
 * Since all Forge components are registered together via defineComponents(),
 * checking a single component is sufficient to know Forge is loaded.
 */
async function waitForForgeComponents(page: Page): Promise<void> {
  // forge-scaffold is included in the base template (src/includes/base.html)
  await page.waitForFunction(() => {
    const scaffold = document.querySelector('forge-scaffold');
    return !scaffold || scaffold.shadowRoot !== null;
  }, { timeout: 15000 }).catch(() => {
    // Continue even if timeout
  });

  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    document.body.classList.add('ready');
    document.body.style.opacity = '1';
  });

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
    thumbnailWidth = 500,
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
        const jpgPath: string = outputDir
          ? path.join(outputDir, `${block.id.replace('blocks/', '')}.webp`)
          : srcPath.replace('.html', '.webp');
        return needsScreenshot(htmlPath, jpgPath);
      });

  if (blocksToCapture.length === 0) {
    console.log(`All ${blocks.length} screenshots are up to date`);
    return;
  }

  console.log(`Found ${blocksToCapture.length} blocks needing screenshots (${blocks.length - blocksToCapture.length} up to date)`);
  console.log('Starting Vite dev server...');

  const server: ViteDevServer = await createServer({
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
        ? path.join(outputDir, `${block.id.replace('blocks/', '')}.webp`)
        : srcPath.replace('.html', '.webp');

      const screenshotDir = path.dirname(screenshotPath);
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      console.log(`Capturing: ${block.name}`);

      try {
        await page.goto(blockUrl, { waitUntil: 'networkidle' });
        await waitForForgeComponents(page);

        // Wait for dynamic content (tables, etc.) to fully render
        await page.waitForTimeout(2500);

        // Capture at full size as PNG buffer
        const buffer = await page.screenshot({ fullPage, type: 'png' });

        // Resize to thumbnail width and save as WebP
        await sharp(buffer)
          .resize({ width: thumbnailWidth })
          .webp({ quality: 80 })
          .toFile(screenshotPath);

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
    thumbnailWidth: getArgNumber(args, '--thumbnail-width'),
    outputDir: getArgValue(args, '--output'),
    fullPage: !hasArg(args, '--no-full-page'),
    force: hasArg(args, '--force')
  };

  generateScreenshots(options).catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}

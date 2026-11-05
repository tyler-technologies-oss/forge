/**
 * Block screenshot generator.
 * Uses Playwright to capture screenshots of rendered block HTML files, then uses sharp to
 * resize and optimize them as WebP thumbnails for smaller file sizes.
 *
 * - Captures at 1280x800 viewport for proper UI rendering
 * - Resizes to 500px width (maintaining aspect ratio) using sharp
 * - Saves as WebP at quality 80 for optimal size/quality balance
 * - Blocks with a @screenshot-click annotation have that element clicked (with reduced motion)
 *   before capture, so overlays like dialogs are shown open
 *
 * Only regenerates screenshots for blocks that have changed (unless --force is used).
 * Run via: pnpm generate-screenshots [--filter <name>] [--force] [--width <px>] [--thumbnail-width <px>]
 */

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import sharp from 'sharp';
import { discoverBlocks } from './generate-manifest.js';
import { parseScreenshotOptions } from './block-metadata.js';
import { needsScreenshot, getArgValue, getArgNumber, hasArg } from './utils.js';
import type { Browser, Page } from 'playwright';
import type { ViteDevServer } from 'vite';
import type { Block, ScreenshotOptions } from './types.js';

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

/** Matches an open forge-dialog (including ones inside shadow roots) or native dialog. */
const DEFAULT_SCREENSHOT_WAIT_SELECTOR = 'forge-dialog[open], dialog[open]';
const SCREENSHOT_INTERACTION_TIMEOUT = 5000;

/**
 * Clicks the @screenshot-click target and waits for the resulting overlay to become visible.
 * Returns false (with a warning) if either step fails, so the caller can fall back to a plain screenshot.
 */
async function openScreenshotTarget(page: Page, { click, wait }: ScreenshotOptions, blockName: string): Promise<boolean> {
  if (!click) {
    return false;
  }

  try {
    await page.locator(click).first().click({ timeout: SCREENSHOT_INTERACTION_TIMEOUT });
    await page.locator(wait ?? DEFAULT_SCREENSHOT_WAIT_SELECTOR).first().waitFor({
      state: 'visible',
      timeout: SCREENSHOT_INTERACTION_TIMEOUT
    });
    return true;
  } catch (error: unknown) {
    const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
    console.warn(`  ⚠ ${blockName}: @screenshot-click "${click}" did not open an overlay (${reason}), using plain screenshot`);
    return false;
  }
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
        const srcPath: string = 'src/blocks/' + block.file;
        const htmlPath: string = srcPath;
        const webpPath: string = outputDir
          ? path.join(outputDir, `${block.id}.webp`)
          : srcPath.replace('.html', '.webp');
        return needsScreenshot(htmlPath, webpPath);
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
      // block.file is "category/name/name.html", vite serves from "src/blocks/category/name/name.html"
      const srcPath = 'src/blocks/' + block.file;
      const blockUrl = `${serverUrl}/${srcPath}`;
      const screenshotPath = outputDir
        ? path.join(outputDir, `${block.id}.webp`)
        : srcPath.replace('.html', '.webp');

      const screenshotDir = path.dirname(screenshotPath);
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      console.log(`Capturing: ${block.name}`);

      try {
        const screenshotOptions = parseScreenshotOptions(fs.readFileSync(srcPath, 'utf-8'));
        const isInteractive = !!screenshotOptions.click;

        // Reduced motion only for interactive blocks so animated blocks (spinners, skeletons) keep today's output
        await page.emulateMedia({ reducedMotion: isInteractive ? 'reduce' : 'no-preference' });
        await page.goto(blockUrl, { waitUntil: 'networkidle' });
        await waitForForgeComponents(page);

        // Wait for dynamic content (tables, etc.) to fully render
        await page.waitForTimeout(2500);

        const opened = await openScreenshotTarget(page, screenshotOptions, block.name);

        // Capture at full size as PNG buffer. Overlays are captured immediately with animations
        // finished, since some (toasts, busy indicators) dismiss themselves after a delay.
        const buffer = await page.screenshot({
          fullPage,
          type: 'png',
          animations: opened ? 'disabled' : 'allow'
        });

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

/**
 * Responsive block checker.
 * Loads every block flagged with @responsive at the docs viewer's tablet and phone widths
 * and fails if any visible content spills past the viewport edge.
 *
 * Content inside a horizontal scroll container that itself fits the viewport (e.g. a wide table)
 * is allowed, since the user can scroll to it. The base layout clips the body horizontally,
 * so overflow is measured per element instead of via document scroll width.
 *
 * Run via: pnpm check-responsive [--filter <name>] [--all]
 *   --all  check every block, not just @responsive ones (useful when deciding what to flag)
 */

import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { discoverBlocks } from './generate-manifest.js';
import { getArgValue, hasArg } from './utils.js';
import type { Page } from 'playwright';
import type { Block } from './types.js';

/** Keep in sync with the tablet/phone widths in docs/src/components/BlockViewer.svelte. */
export const RESPONSIVE_VIEWPORTS = [
  { name: 'tablet', width: 768 },
  { name: 'phone', width: 375 }
] as const;

const VIEWPORT_HEIGHT = 800;
const RENDER_SETTLE_MS = 1500;
const MAX_REPORTED_OFFENDERS = 5;

export interface OverflowOffender {
  selector: string;
  left: number;
  right: number;
}

export interface CheckResponsiveOptions {
  blocksPath: string;
  filter?: string;
  all?: boolean;
}

/**
 * Finds visible elements that extend past the viewport and are not clipped by a closer ancestor.
 * Walks open shadow roots so overflow inside Forge components is caught too.
 */
async function findOverflow(page: Page): Promise<OverflowOffender[]> {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const tolerance = 1;
    const clipsX = (el: Element): boolean => {
      const { overflowX } = getComputedStyle(el);
      return overflowX !== 'visible';
    };
    const parentOf = (el: Element): Element | null => {
      if (el.assignedSlot) {
        return el.assignedSlot;
      }
      if (el.parentElement) {
        return el.parentElement;
      }
      const root = el.getRootNode();
      return root instanceof ShadowRoot ? root.host : null;
    };
    const isClipped = (el: Element): boolean => {
      for (let ancestor = parentOf(el); ancestor; ancestor = parentOf(ancestor)) {
        if (ancestor === document.body || ancestor === document.documentElement) {
          return false;
        }
        if (!clipsX(ancestor)) {
          continue;
        }
        const rect = ancestor.getBoundingClientRect();
        return rect.left >= -tolerance && rect.right <= viewportWidth + tolerance;
      }
      return false;
    };
    const isFixedOffscreen = (el: Element): boolean => {
      for (let node: Element | null = el; node; node = parentOf(node)) {
        if (getComputedStyle(node).position === 'fixed') {
          const rect = node.getBoundingClientRect();
          return rect.right <= tolerance || rect.left >= viewportWidth - tolerance;
        }
      }
      return false;
    };
    const describe = (el: Element): string => {
      const id = el.id ? `#${el.id}` : '';
      const classes = typeof el.className === 'string' && el.className.trim() ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : '';
      const host = el.getRootNode() instanceof ShadowRoot ? `${(el.getRootNode() as ShadowRoot).host.localName} >>> ` : '';
      return `${host}${el.localName}${id}${classes}`;
    };

    const elements: Element[] = [];
    const collect = (root: Document | ShadowRoot): void => {
      for (const el of root.querySelectorAll('*')) {
        elements.push(el);
        if (el.shadowRoot) {
          collect(el.shadowRoot);
        }
      }
    };
    collect(document);

    const offenders: { selector: string; left: number; right: number; el: Element }[] = [];
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        continue;
      }
      const overflows = rect.right > viewportWidth + tolerance || rect.left < -tolerance;
      if (!overflows) {
        continue;
      }
      const style = getComputedStyle(el);
      if (style.visibility === 'hidden' || style.display === 'contents') {
        continue;
      }
      if (isClipped(el) || isFixedOffscreen(el)) {
        continue;
      }
      offenders.push({ selector: describe(el), left: Math.round(rect.left), right: Math.round(rect.right), el });
    }

    // Report only the outermost offenders; their descendants overflow for the same reason
    return offenders
      .filter(({ el }) => !offenders.some(other => other.el !== el && other.el.contains(el)))
      .map(({ selector, left, right }) => ({ selector, left, right }));
  });
}

async function waitForRender(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => document.body.classList.add('ready'));
  await page.waitForTimeout(RENDER_SETTLE_MS);
}

/**
 * Checks blocks for horizontal overflow at each responsive viewport.
 * Resolves to the number of blocks that failed.
 */
export async function checkResponsive(options: CheckResponsiveOptions): Promise<number> {
  const { blocksPath, filter, all = false } = options;

  const filterLower = filter?.toLowerCase();
  const blocks = (await discoverBlocks(blocksPath))
    .filter((block: Block) => all || block.responsive)
    .filter((block: Block) => !filterLower || block.id.toLowerCase().includes(filterLower) || block.name.toLowerCase().includes(filterLower))
    .sort((a: Block, b: Block) => a.id.localeCompare(b.id));

  if (blocks.length === 0) {
    console.log('No blocks to check');
    return 0;
  }

  const server = await createServer({ server: { port: 0 }, logLevel: 'error' });
  await server.listen();
  const serverUrl = server.resolvedUrls?.local?.[0];
  if (!serverUrl) {
    throw new Error('Failed to start Vite dev server');
  }

  const browser = await chromium.launch();
  let failures = 0;

  try {
    for (const { name, width } of RESPONSIVE_VIEWPORTS) {
      const context = await browser.newContext({ viewport: { width, height: VIEWPORT_HEIGHT } });
      // tsx (esbuild keepNames) wraps named functions in a __name() helper that doesn't exist in the page
      await context.addInitScript({ content: 'window.__name = fn => fn;' });
      const page = await context.newPage();

      for (const block of blocks) {
        await page.goto(`${serverUrl}src/blocks/${block.file}`, { waitUntil: 'networkidle' });
        await waitForRender(page);
        const offenders = await findOverflow(page);

        if (offenders.length === 0) {
          console.log(`  ✓ ${block.id} @ ${name} (${width}px)`);
          continue;
        }

        failures++;
        console.error(`  ✗ ${block.id} @ ${name} (${width}px): ${offenders.length} element(s) overflow`);
        for (const { selector, left, right } of offenders.slice(0, MAX_REPORTED_OFFENDERS)) {
          console.error(`      ${selector} [${left}, ${right}]`);
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }

  const checks = blocks.length * RESPONSIVE_VIEWPORTS.length;
  console.log(`\n${checks - failures}/${checks} checks passed`);
  return failures;
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const args = process.argv.slice(2);

  checkResponsive({
    blocksPath: path.resolve(process.cwd(), 'src/blocks'),
    filter: getArgValue(args, '--filter'),
    all: hasArg(args, '--all')
  })
    .then(failures => process.exit(failures > 0 ? 1 : 0))
    .catch((error: unknown) => {
      console.error(error);
      process.exit(1);
    });
}

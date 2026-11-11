/**
 * Visual A/B comparison for a built Storybook.
 *
 * Captures every story in light and dark, then compares two captures. Run both captures on the same machine so
 * identical renders are byte-identical.
 *
 *   node scripts/visual-ab.js capture <storybook-static-dir> <out-dir> [--filter <text>] [--themes light,dark] [--workers <n>]
 *   node scripts/visual-ab.js compare <capture-a> <capture-b> [--report <file>]
 */

import { createHash } from 'node:crypto';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const VIEWPORT = { width: 1280, height: 800 };
const DEFAULT_WORKERS = 4;
const SETTLE_FRAMES = 2;
const NAVIGATION_TIMEOUT_MS = 30000;
const DARK_CLASS = 'forge-storybook-dark';
const DEFAULT_THEMES = ['light', 'dark'];
const MANIFEST_FILE = 'manifest.json';
const DIFF_TOP_COUNT = 40;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

const log = message => process.stdout.write(`${message}\n`);

const getArg = (name, fallback) => {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
};

const serveDirectory = directory =>
  new Promise(resolvePromise => {
    const root = resolve(directory);
    const server = createServer((request, response) => {
      const requested = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const filePath = resolve(join(root, requested === '/' ? 'index.html' : requested));
      if (!filePath.startsWith(root + sep) || !existsSync(filePath) || !statSync(filePath).isFile()) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, { 'content-type': MIME_TYPES[extname(filePath)] ?? 'application/octet-stream' });
      createReadStream(filePath).pipe(response);
    });
    server.listen(0, '127.0.0.1', () => {
      resolvePromise({ origin: `http://127.0.0.1:${server.address().port}`, close: () => server.close() });
    });
  });

const readStories = (directory, filter) => {
  const index = JSON.parse(readFileSync(join(directory, 'index.json'), 'utf8'));
  return Object.values(index.entries)
    .filter(entry => entry.type === 'story')
    .filter(entry => !filter || `${entry.title}/${entry.name}`.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.id.localeCompare(b.id));
};

const settlePage = async (page, theme) => {
  await page.evaluate(
    async ({ darkClass, dark, frames }) => {
      document.body.classList.toggle(darkClass, dark);
      await document.fonts.ready;
      const pending = [...document.querySelectorAll('*')].map(element => element.updateComplete).filter(Boolean);
      await Promise.allSettled(pending);
      const images = [];
      const collectImages = root => {
        root.querySelectorAll('*').forEach(element => {
          if (element instanceof HTMLImageElement) {
            images.push(element);
          }
          if (element.shadowRoot) {
            collectImages(element.shadowRoot);
          }
        });
      };
      collectImages(document);
      await Promise.allSettled(images.map(image => image.decode()));
      for (let frame = 0; frame < frames; frame++) {
        await new Promise(resolveFrame => requestAnimationFrame(resolveFrame));
      }
    },
    { darkClass: DARK_CLASS, dark: theme === 'dark', frames: SETTLE_FRAMES }
  );
};

const captureStory = async (context, origin, entry, theme, outDirectory) => {
  const page = await context.newPage();
  const record = { id: entry.id, title: entry.title, name: entry.name, theme };
  try {
    await page.goto(`${origin}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`, {
      waitUntil: 'load',
      timeout: NAVIGATION_TIMEOUT_MS
    });
    await page.waitForSelector('body.sb-show-main, body.sb-show-errordisplay', { timeout: NAVIGATION_TIMEOUT_MS });
    if (await page.$('body.sb-show-errordisplay')) {
      record.error = 'story failed to render';
    }
    await page.waitForLoadState('networkidle', { timeout: NAVIGATION_TIMEOUT_MS }).catch(() => undefined);
    await settlePage(page, theme);
    const buffer = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
    record.file = join(theme, `${entry.id}.png`);
    record.sha256 = createHash('sha256').update(buffer).digest('hex');
    mkdirSync(join(outDirectory, theme), { recursive: true });
    writeFileSync(join(outDirectory, record.file), buffer);
  } catch (error) {
    record.error = String(error.message).split('\n')[0];
  } finally {
    await page.close();
  }
  return record;
};

const runPool = async (tasks, workers) => {
  const results = [];
  let next = 0;
  const worker = async () => {
    while (next < tasks.length) {
      const task = tasks[next++];
      results.push(await task());
      if (results.length % 50 === 0) {
        log(`  ${results.length}/${tasks.length}`);
      }
    }
  };
  await Promise.all(Array.from({ length: workers }, worker));
  return results;
};

const capture = async () => {
  const [, , , staticDirectory, outDirectory] = process.argv;
  const themes = getArg('themes', DEFAULT_THEMES.join(',')).split(',');
  const workers = Number(getArg('workers', DEFAULT_WORKERS));
  const stories = readStories(staticDirectory, getArg('filter'));
  const server = await serveDirectory(staticDirectory);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  await context.route('**/*', route => (route.request().url().startsWith(server.origin) ? route.continue() : route.abort()));

  log(`Capturing ${stories.length} stories x ${themes.length} themes from ${staticDirectory}`);
  mkdirSync(outDirectory, { recursive: true });
  const tasks = stories.flatMap(entry => themes.map(theme => () => captureStory(context, server.origin, entry, theme, outDirectory)));
  const records = (await runPool(tasks, workers)).sort((a, b) => `${a.theme}/${a.id}`.localeCompare(`${b.theme}/${b.id}`));
  writeFileSync(join(outDirectory, MANIFEST_FILE), `${JSON.stringify(records, null, 2)}\n`);

  await browser.close();
  server.close();
  const failed = records.filter(record => record.error);
  log(`Captured ${records.length - failed.length}/${records.length}. ${failed.length} errors.`);
  failed.slice(0, 10).forEach(record => log(`  ${record.theme}/${record.id}: ${record.error}`));
};

const diffImages = async (page, bufferA, bufferB) =>
  page.evaluate(
    async ([a, b]) => {
      const load = async base64 => {
        const blob = await (await fetch(`data:image/png;base64,${base64}`)).blob();
        const bitmap = await createImageBitmap(blob);
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(bitmap, 0, 0);
        return { width: bitmap.width, height: bitmap.height, data: canvasContext.getImageData(0, 0, bitmap.width, bitmap.height).data };
      };
      const imageA = await load(a);
      const imageB = await load(b);
      if (imageA.width !== imageB.width || imageA.height !== imageB.height) {
        return { sizeA: `${imageA.width}x${imageA.height}`, sizeB: `${imageB.width}x${imageB.height}`, resized: true };
      }
      let diffPixels = 0;
      let minX = imageA.width;
      let minY = imageA.height;
      let maxX = -1;
      let maxY = -1;
      for (let offset = 0; offset < imageA.data.length; offset += 4) {
        const differs =
          imageA.data[offset] !== imageB.data[offset] ||
          imageA.data[offset + 1] !== imageB.data[offset + 1] ||
          imageA.data[offset + 2] !== imageB.data[offset + 2] ||
          imageA.data[offset + 3] !== imageB.data[offset + 3];
        if (differs) {
          const pixel = offset / 4;
          const x = pixel % imageA.width;
          const y = Math.floor(pixel / imageA.width);
          diffPixels++;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
      const box = diffPixels ? `${minX},${minY}-${maxX},${maxY}` : null;
      return { diffPixels, totalPixels: imageA.width * imageA.height, box };
    },
    [bufferA.toString('base64'), bufferB.toString('base64')]
  );

const compare = async () => {
  const [, , , directoryA, directoryB] = process.argv;
  const reportFile = getArg('report', join(directoryB, 'report.json'));
  const read = directory => new Map(JSON.parse(readFileSync(join(directory, MANIFEST_FILE), 'utf8')).map(record => [`${record.theme}/${record.id}`, record]));
  const recordsA = read(directoryA);
  const recordsB = read(directoryB);

  const identical = [];
  const failedBoth = [];
  const changed = [];
  const onlyInA = [];
  const onlyInB = [];
  for (const [key, recordA] of recordsA) {
    const recordB = recordsB.get(key);
    if (!recordB) {
      onlyInA.push(key);
    } else if (recordA.error && recordB.error) {
      failedBoth.push(key);
    } else if (recordA.error || recordB.error) {
      changed.push({ key, error: `${recordA.error ? 'A' : 'B'} failed: ${recordA.error ?? recordB.error}` });
    } else if (recordA.sha256 === recordB.sha256) {
      identical.push(key);
    } else {
      changed.push({ key, a: join(directoryA, recordA.file), b: join(directoryB, recordB.file), title: recordA.title, name: recordA.name });
    }
  }
  [...recordsB.keys()].filter(key => !recordsA.has(key)).forEach(key => onlyInB.push(key));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const item of changed.filter(entry => entry.a)) {
    Object.assign(item, await diffImages(page, readFileSync(item.a), readFileSync(item.b)));
  }
  await browser.close();

  changed.sort((x, y) => (y.diffPixels ?? Infinity) - (x.diffPixels ?? Infinity));
  writeFileSync(reportFile, `${JSON.stringify({ identical: identical.length, failedBoth, changed, onlyInA, onlyInB }, null, 2)}\n`);

  log(
    `identical: ${identical.length}  changed: ${changed.length}  failed on both: ${failedBoth.length}  only in A: ${onlyInA.length}  only in B: ${onlyInB.length}`
  );
  changed.slice(0, DIFF_TOP_COUNT).forEach(item => {
    const detail = item.error ?? (item.resized ? `size ${item.sizeA} -> ${item.sizeB}` : `${item.diffPixels} px at ${item.box}`);
    log(`  ${item.key}  ${detail}`);
  });
  log(`Report: ${reportFile}`);
  process.exitCode = changed.length || onlyInA.length || onlyInB.length ? 1 : 0;
};

const command = process.argv[2];
if (command === 'capture') {
  await capture();
} else if (command === 'compare') {
  await compare();
} else {
  console.error('Usage: visual-ab.js <capture|compare> ...');
  process.exitCode = 2;
}

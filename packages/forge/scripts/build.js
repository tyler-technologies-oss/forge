import { rm } from 'fs/promises';
import ora from 'ora';
import { buildCem } from './build-cem.js';
import { buildEsm } from './build-esm.js';
import { buildTypes } from './build-types.js';
import { buildCdn } from './build-cdn.js';
import { buildCss } from './build-css.js';
import { buildPackage } from './build-package.js';

const startTime = Date.now();

async function step(text, fn) {
  const spinner = ora(`${text}...`).start();
  try {
    await fn();
    spinner.succeed(text);
  } catch (err) {
    spinner.fail(text);
    throw err;
  }
}

await step('Cleaning', async () => {
  await Promise.all([
    rm('dist', { recursive: true, force: true }),
    rm('cdn', { recursive: true, force: true }),
    rm('esm', { recursive: true, force: true }),
    rm('sass', { recursive: true, force: true }),
    rm('custom-elements.json', { force: true }),
    rm('vscode.html-custom-data.json', { force: true }),
    rm('vscode.css-custom-data.json', { force: true })
  ]);
});
await step('Generating CEM', buildCem);
await step('Building', buildEsm);
await step('Generating types', buildTypes);
await step('Bundling CDN assets', buildCdn);
await step('Building CSS', buildCss);
await step('Copying SCSS sources', buildPackage);

const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
ora().succeed(`Build complete in ${elapsed}s`);

import { rm } from 'fs/promises';
import ora from 'ora';
import { buildCem } from './build-cem.js';
import { buildEsm } from './build-esm.js';
import { buildTypes } from './build-types.js';

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
    rm('esm', { recursive: true, force: true }),
    rm('custom-elements.json', { force: true }),
    rm('vscode.html-custom-data.json', { force: true }),
    rm('vscode.css-custom-data.json', { force: true })
  ]);
});
await step('Generating CEM', buildCem);
await step('Building', buildEsm);
await step('Generating types', buildTypes);

const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
ora().succeed(`Build complete in ${elapsed}s`);

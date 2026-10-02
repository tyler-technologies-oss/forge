import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const resolve = path => fileURLToPath(new URL(path, import.meta.url));

export const SOURCE_PATH = resolve('../../packages/forge-mcp/package.json');
export const TARGET_PATHS = [resolve('../.claude-plugin/plugin.json'), resolve('../../.claude-plugin/marketplace.json')];

const VERSION_PATTERN = /("version":\s*")[^"]+(")/;

export const readSourceVersion = () => JSON.parse(readFileSync(SOURCE_PATH, 'utf8')).version;

export const syncVersions = () => {
  const version = readSourceVersion();
  for (const path of TARGET_PATHS) {
    const content = readFileSync(path, 'utf8');
    writeFileSync(path, content.replace(VERSION_PATTERN, `$1${version}$2`));
  }
  return version;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.write(`Synced plugin versions to ${syncVersions()}\n`);
}

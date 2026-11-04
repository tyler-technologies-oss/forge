#!/usr/bin/env node

import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(projectRoot, '.heroku-deploy');
const DEFAULT_APP = 'forge-mcp';
const NODE_VERSION = '22.x';

const args = process.argv.slice(2);
const shouldPush = args.includes('--push');
const skipBuild = args.includes('--skip-build');
const appFlagIndex = args.indexOf('--app');
const app = appFlagIndex === -1 ? DEFAULT_APP : args[appFlagIndex + 1];

const log = message => process.stdout.write(`${message}\n`);
const run = (command, commandArgs, cwd = projectRoot) => execFileSync(command, commandArgs, { cwd, stdio: 'inherit' });

const { name, version, dependencies } = JSON.parse(await readFile(join(projectRoot, 'package.json'), 'utf8'));

if (!app) {
  throw new Error('--app requires an app name');
}

if (!skipBuild) {
  run('pnpm', ['run', 'build']);
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(join(projectRoot, 'dist'), join(outputDir, 'dist'), { recursive: true });
await cp(join(projectRoot, 'templates'), join(outputDir, 'templates'), { recursive: true });

const deployPackage = {
  name,
  version,
  private: true,
  type: 'module',
  engines: { node: NODE_VERSION },
  scripts: { start: 'node dist/http.js' },
  dependencies
};
await writeFile(join(outputDir, 'package.json'), `${JSON.stringify(deployPackage, null, 2)}\n`);
await writeFile(join(outputDir, 'Procfile'), 'web: node dist/http.js\n');

log(`Assembled Heroku deploy artifact for ${name}@${version} in ${outputDir}`);

if (!shouldPush) {
  log(`Dry run only. Re-run with --push --app ${app} to deploy.`);
} else {
  run('git', ['init', '-q', '-b', 'main'], outputDir);
  run('git', ['add', '-A'], outputDir);
  run('git', ['commit', '-q', '-m', `Deploy ${name}@${version}`], outputDir);
  run('git', ['push', '--force', `https://git.heroku.com/${app}.git`, 'main:main'], outputDir);
}

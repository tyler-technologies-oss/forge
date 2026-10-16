import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const CLI_PATH = fileURLToPath(new URL('../index.mjs', import.meta.url));
const FORGE_EXTENDED_PACKAGE_JSON = {
  name: 'app',
  dependencies: { '@tylertech/forge-extended': '^1.0.0', '@tylertech/forge-extended-react': '^1.0.0' }
};

const runCli = (...args) => execFileAsync(process.execPath, [CLI_PATH, ...args]);

describe('forge-upgrade CLI', () => {
  let projectPath;

  beforeEach(async () => {
    projectPath = await mkdtemp(join(tmpdir(), 'forge-upgrade-'));
    await writeFile(join(projectPath, 'package.json'), JSON.stringify(FORGE_EXTENDED_PACKAGE_JSON, null, 2));
  });

  afterEach(() => rm(projectPath, { recursive: true, force: true }));

  it('should print usage when --usage is provided', async () => {
    const { stdout } = await runCli('--usage');

    expect(stdout).toContain('Usage: forge-upgrade');
  });

  it('should replace forge-extended dependencies when running the forge-extended-migration configuration', async () => {
    await runCli('--path', projectPath, '--configuration', 'forge-extended-migration', '--no-replace');

    const { dependencies } = JSON.parse(await readFile(join(projectPath, 'package.json'), 'utf-8'));
    expect(dependencies).toEqual({ '@tylertech/forge': '^1.0.0', '@tylertech/forge-react': '^1.0.0' });
  });

  it('should not modify any files when --dry-run is provided', async () => {
    const { stdout } = await runCli('--path', projectPath, '--configuration', 'forge-extended-migration', '--no-replace', '--dry-run');

    const { dependencies } = JSON.parse(await readFile(join(projectPath, 'package.json'), 'utf-8'));
    expect(dependencies).toEqual(FORGE_EXTENDED_PACKAGE_JSON.dependencies);
    expect(stdout).toContain('dry run');
  });
});

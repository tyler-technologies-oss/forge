import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { checkbox, confirm, input, select } from '@inquirer/prompts';
import { CHANGESET_TYPES } from './conventional-types.mjs';

const PACKAGES_DIR = fileURLToPath(new URL('../packages/', import.meta.url));
const CHANGESET_DIR = fileURLToPath(new URL('./', import.meta.url));
const SCOPE_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const MAX_SLUG_WORDS = 6;
const BUMPS = ['major', 'minor', 'patch'];

export const buildSummary = ({ type, scope, description }) => `${type}${scope ? `(${scope})` : ''}: ${description}`;

export const buildChangeset = ({ packages, bump, summary }) => `---\n${packages.map(name => `'${name}': ${bump}`).join('\n')}\n---\n\n${summary}\n`;

export const suggestBump = type => CHANGESET_TYPES.find(t => t.value === type)?.bump ?? 'patch';

export const slugify = text =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, MAX_SLUG_WORDS)
    .join('-');

const getPublishedPackageNames = () =>
  readdirSync(PACKAGES_DIR)
    .map(dir => `${PACKAGES_DIR}${dir}/package.json`)
    .filter(existsSync)
    .map(path => JSON.parse(readFileSync(path, 'utf8')))
    .filter(({ private: isPrivate }) => !isPrivate)
    .map(({ name }) => name)
    .sort();

const getUniqueFilePath = slug => {
  const base = slug || 'changeset';
  let candidate = `${CHANGESET_DIR}${base}.md`;
  for (let i = 2; existsSync(candidate); i++) {
    candidate = `${CHANGESET_DIR}${base}-${i}.md`;
  }
  return candidate;
};

const promptForChangeset = async () => {
  const type = await select({ message: 'What type of change is this?', choices: CHANGESET_TYPES });
  const scope = (
    await input({
      message: 'Which module does this change affect? (e.g. button, leave blank for none)',
      validate: value => !value.trim() || SCOPE_PATTERN.test(value.trim()) || 'Use lowercase letters, numbers and dashes (e.g. date-picker)'
    })
  ).trim();
  const packages = await checkbox({
    message: 'Which packages should be released?',
    choices: getPublishedPackageNames().map(name => ({ value: name })),
    required: true
  });
  const bump = await select({
    message: 'What semver bump is this?',
    choices: BUMPS.map(value => ({ value })),
    default: suggestBump(type)
  });
  const description = (
    await input({
      message: `Describe the change: ${buildSummary({ type, scope, description: '…' })}`,
      validate: value => !!value.trim() || 'A description is required'
    })
  ).trim();
  return { packages, bump, slug: slugify(`${scope} ${description}`), summary: buildSummary({ type, scope, description }) };
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length) {
    process.exit(spawnSync('changeset', args, { stdio: 'inherit' }).status ?? 1);
  }

  try {
    const { packages, bump, slug, summary } = await promptForChangeset();
    process.stdout.write(`\n${buildChangeset({ packages, bump, summary })}\n`);
    if (!(await confirm({ message: 'Create this changeset?', default: true }))) {
      return;
    }
    const path = getUniqueFilePath(slug);
    writeFileSync(path, buildChangeset({ packages, bump, summary }));
    process.stdout.write(`Changeset added: ${path.replace(CHANGESET_DIR, '.changeset/')}\n`);
  } catch (error) {
    if (error?.name === 'ExitPromptError') {
      process.exit(1);
    }
    throw error;
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}

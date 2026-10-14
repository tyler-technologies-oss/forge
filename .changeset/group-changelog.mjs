import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SECTIONS, TYPE_MARKER_PATTERN } from './conventional-types.mjs';

const PACKAGES_DIR = fileURLToPath(new URL('../packages/', import.meta.url));
const VERSION_HEADING = /^## /;
const SEMVER_HEADING = /^### (Major|Minor|Patch) Changes$/;
const LIST_ITEM = /^- /;

const splitFirstSection = markdown => {
  const lines = markdown.split('\n');
  const start = lines.findIndex(line => VERSION_HEADING.test(line));
  if (start === -1) {
    return undefined;
  }
  const next = lines.findIndex((line, index) => index > start && VERSION_HEADING.test(line));
  const end = next === -1 ? lines.length : next;
  return { before: lines.slice(0, start), section: lines.slice(start, end), after: lines.slice(end) };
};

const collectItems = bodyLines => {
  const items = [];
  let current;
  let pendingBlanks = [];
  for (const line of bodyLines) {
    if (LIST_ITEM.test(line)) {
      current = [line];
      items.push(current);
      pendingBlanks = [];
    } else if (SEMVER_HEADING.test(line)) {
      current = undefined;
      pendingBlanks = [];
    } else if (!line.trim()) {
      pendingBlanks.push('');
    } else if (current) {
      current.push(...pendingBlanks, line);
      pendingBlanks = [];
    }
  }
  return items;
};

export const groupChangelog = markdown => {
  const parts = splitFirstSection(markdown);
  if (!parts || !parts.section.some(line => TYPE_MARKER_PATTERN.test(line))) {
    return markdown;
  }

  const [heading, ...body] = parts.section;
  const unknownHeading = body.find(line => line.startsWith('### ') && !SEMVER_HEADING.test(line));
  if (unknownHeading) {
    throw new Error(`Unexpected heading in release section: ${unknownHeading}`);
  }

  const groups = new Map(SECTIONS.map(({ key }) => [key, []]));
  for (const item of collectItems(body)) {
    const key = TYPE_MARKER_PATTERN.exec(item[0])?.[1];
    item[0] = item[0].replace(TYPE_MARKER_PATTERN, '');
    (groups.get(key) ?? groups.get('other')).push(item.join('\n'));
  }

  const rendered = SECTIONS.filter(({ key }) => groups.get(key).length).map(({ key, title }) => `### ${title}\n\n${groups.get(key).join('\n')}\n`);
  const section = [heading, '', ...rendered.join('\n').split('\n')];
  return [...parts.before, ...section, ...parts.after].join('\n');
};

export const groupPackageChangelogs = () => {
  const grouped = [];
  for (const dir of readdirSync(PACKAGES_DIR)) {
    const path = `${PACKAGES_DIR}${dir}/CHANGELOG.md`;
    if (!existsSync(path)) {
      continue;
    }
    const original = readFileSync(path, 'utf8');
    const updated = groupChangelog(original);
    if (updated !== original) {
      writeFileSync(path, updated);
      grouped.push(path);
    }
  }
  return grouped;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const grouped = groupPackageChangelogs();
  process.stdout.write(`Grouped ${grouped.length} changelog(s) by conventional commit type\n`);
}

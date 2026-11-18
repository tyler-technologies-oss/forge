export const SECTIONS = [
  { key: 'breaking', title: 'Breaking Changes' },
  { key: 'feat', title: 'Features' },
  { key: 'fix', title: 'Bug Fixes' },
  { key: 'perf', title: 'Performance' },
  { key: 'refactor', title: 'Refactoring' },
  { key: 'docs', title: 'Documentation' },
  { key: 'deps', title: 'Dependencies' },
  { key: 'other', title: 'Other Changes' }
];

const TYPE_TO_SECTION = {
  feat: 'feat',
  fix: 'fix',
  perf: 'perf',
  refactor: 'refactor',
  docs: 'docs'
};

export const TYPE_MARKER_PATTERN = /<!--type:(\w+)-->/;

export const createTypeMarker = key => `<!--type:${key}-->`;

export const parseConventionalHeader = text => {
  const match = /^(\w+)(?:\(([^)]*)\))?(!)?:\s*/.exec(text);
  if (!match) {
    return undefined;
  }
  const [header, type, scope, bang] = match;
  return { header, type: type.toLowerCase(), scope, breaking: !!bang };
};

export const sectionKeyForType = type => TYPE_TO_SECTION[type] ?? 'other';

export const CHANGESET_TYPES = [
  { value: 'feat', name: 'feat: a new feature', bump: 'minor' },
  { value: 'fix', name: 'fix: a bug fix', bump: 'patch' },
  { value: 'perf', name: 'perf: a performance improvement', bump: 'patch' },
  { value: 'refactor', name: 'refactor: a code change that neither fixes a bug nor adds a feature', bump: 'patch' },
  { value: 'docs', name: 'docs: documentation only changes', bump: 'patch' },
  { value: 'chore', name: 'chore: other changes that affect the published package', bump: 'patch' }
];

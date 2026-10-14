import { execFileSync } from 'node:child_process';
import { createTypeMarker, parseConventionalHeader, sectionKeyForType } from './conventional-types.mjs';

const SHORT_HASH_LENGTH = 7;

const readCommitSubject = commit => {
  try {
    return execFileSync('git', ['show', '-s', '--format=%s', commit], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

const classify = (summaryHeader, commit, bumpType) => {
  const header = summaryHeader ?? parseConventionalHeader(commit ? readCommitSubject(commit) : '');
  if (bumpType === 'major' || header?.breaking) {
    return 'breaking';
  }
  return header ? sectionKeyForType(header.type) : 'other';
};

const getReleaseLine = async (changeset, bumpType) => {
  const [firstLine, ...futureLines] = changeset.summary.split('\n').map(line => line.trimEnd());
  const summaryHeader = parseConventionalHeader(firstLine);
  const key = classify(summaryHeader, changeset.commit, bumpType);
  const text = summaryHeader ? `${summaryHeader.scope ? `**${summaryHeader.scope}**: ` : ''}${firstLine.slice(summaryHeader.header.length)}` : firstLine;
  const hash = changeset.commit ? `${changeset.commit.slice(0, SHORT_HASH_LENGTH)}: ` : '';
  const continuation = futureLines.length ? `\n${futureLines.map(line => `  ${line}`).join('\n')}` : '';
  return `- ${createTypeMarker(key)}${hash}${text}${continuation}`;
};

const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (!dependenciesUpdated.length) {
    return '';
  }
  const hashes = changesets.flatMap(({ commit }) => (commit ? [commit.slice(0, SHORT_HASH_LENGTH)] : []));
  const heading = `- ${createTypeMarker('deps')}Updated dependencies${hashes.length ? ` [${hashes.join(', ')}]` : ''}`;
  const updated = dependenciesUpdated.map(({ name, newVersion }) => `  - ${name}@${newVersion}`);
  return [heading, ...updated].join('\n');
};

export default { getReleaseLine, getDependencyReleaseLine };

import { createTypeMarker, parseConventionalHeader, sectionKeyForType } from './conventional-types.mjs';

const SHORT_HASH_LENGTH = 7;

const classify = (header, bumpType) => {
  if (bumpType === 'major' || header?.breaking) {
    return 'breaking';
  }
  return header ? sectionKeyForType(header.type) : 'other';
};

const getReleaseLine = async (changeset, bumpType) => {
  const [firstLine, ...futureLines] = changeset.summary.split('\n').map(line => line.trimEnd());
  const summaryHeader = parseConventionalHeader(firstLine);
  const key = classify(summaryHeader, bumpType);
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

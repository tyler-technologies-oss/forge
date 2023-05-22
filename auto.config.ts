import { AutoRc } from 'auto';
import { INpmConfig } from '@auto-it/npm';

const npmOpts: INpmConfig = {
  setRcToken: false,
  publishFolder: 'dist/release/@tylertech/forge'
};

export default function rc(): AutoRc {
  return {
    shipit: {
      prerelease: true
    },
    versionBranches: true,
    prereleaseBranches: ['dev', 'beta', 'rc', 'next'],
    author: 'GitHub Actions <41898282+github-actions[bot]@users.noreply.github.com>',
    plugins: [
      ['npm', npmOpts],
      'conventional-commits',
      'released',
      'first-time-contributor',
      './plugins/auto/forge-prepare-publish'
    ]
  };
}

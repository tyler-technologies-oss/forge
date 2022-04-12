import { AutoRc } from 'auto';
import { INpmConfig } from '@auto-it/npm';
import { IExecPluginOptions } from '@auto-it/exec';

const npmOptions: INpmConfig = {
  setRcToken: false,
  publishFolder: 'dist/release/@tylertech/forge'
};

const execOptions: IExecPluginOptions = {
  afterVersion: `cd ${npmOptions.publishFolder} && npm version $npm_package_version --no-git-tag-version --no-commit-hooks --ignore-scripts`
};

export default function rc(): AutoRc {
  return {
    versionBranches: true,
    prereleaseBranches: ['dev', 'beta', 'rc', 'next'],
    author: 'GitHub Actions <41898282+github-actions[bot]@users.noreply.github.com>',
    canary: { target: 'pr-body' },
    plugins: [
      ['exec', execOptions],
      ['npm', npmOptions],
      'conventional-commits',
      'released',
      'first-time-contributor',
      'pr-body-labels'
    ]
  };
}

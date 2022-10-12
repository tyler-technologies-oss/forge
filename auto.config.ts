import { AutoRc } from 'auto';
import { INpmConfig } from '@auto-it/npm';
import { ISlackPluginOptions } from '@auto-it/slack';

const npmOpts: INpmConfig = {
  setRcToken: false,
  publishFolder: 'dist/release/@tylertech/forge'
};

const slackOpts: ISlackPluginOptions = {
  auth: 'app',
  channels: ['tyler-forge'],
  atTarget: 'here'
};

export default function rc(): AutoRc {
  return {
    versionBranches: true,
    prereleaseBranches: ['dev', 'beta', 'rc', 'next'],
    author: 'GitHub Actions <41898282+github-actions[bot]@users.noreply.github.com>',
    plugins: [
      ['npm', npmOpts],
      'conventional-commits',
      'released',
      'first-time-contributor',
      './plugins/auto/forge-prepare-publish',
      ['slack', slackOpts]
    ]
  };
}

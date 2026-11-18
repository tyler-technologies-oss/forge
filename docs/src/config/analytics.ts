import { execSync } from 'node:child_process';
import { version as forgeVersion } from '@tylertech/forge/package.json';
import { version as forgePluginVersion } from '../../../plugin/package.json';

export const PENDO_APP_ID = 'de603ec0-1dec-400e-8fe3-f0d3b4b9132f';

/** Every visitor shares one Pendo account; `environment` separates production from any other deployment. */
export const PENDO_ACCOUNT_ID = 'tylerforge.design';

const getCommitSha = (): string => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
};

/** Resolved once per build, so every page reports the versions it was built with. */
export const BUILD_INFO = {
  forgeVersion,
  forgePluginVersion,
  docsiteVersion: getCommitSha()
} as const;

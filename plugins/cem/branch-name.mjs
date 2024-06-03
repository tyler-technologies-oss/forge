import * as path from 'path';
import * as fs from 'fs';

/**
 * This plugin injects the git branch name that created the manifest.
 */
export default function forgeBranchNamePlugin() {
  return {
    name: 'FORGE - BRANCH-NAME',
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest.branchName = getCurrentBranchName();
    }
  };
}

function getCurrentBranchName(p = process.cwd()) {
  const gitHeadPath = `${p}/.git/HEAD`;
  return fs.existsSync(p) ?
      fs.existsSync(gitHeadPath) ?
          fs.readFileSync(gitHeadPath, 'utf-8').trim().split('/')[2] :
          getCurrentBranchName(path.resolve(p, '..')) : false;
}

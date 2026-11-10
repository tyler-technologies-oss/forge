import * as path from 'path';
import * as fs from 'fs';

const HEAD_REF_PREFIX = 'ref: refs/heads/';
const GITDIR_PREFIX = 'gitdir:';

/**
 * This plugin injects the git branch name that created the manifest.
 */
export default function forgeBranchNamePlugin() {
  return {
    name: 'FORGE - BRANCH-NAME',
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest.branchName = resolveBranchName();
    }
  };
}

/**
 * Resolves the branch name from, in order: `GIT_BRANCH_NAME`, GitHub Actions (`GITHUB_HEAD_REF` for pull requests,
 * then `GITHUB_REF_NAME`), the local git checkout, and finally `main`.
 */
export function resolveBranchName({ env = process.env, cwd = process.cwd() } = {}) {
  return env.GIT_BRANCH_NAME || env.GITHUB_HEAD_REF || env.GITHUB_REF_NAME || getCurrentBranchName(cwd) || 'main';
}

/**
 * Reads the branch from `.git/HEAD`, walking up from `p`. Handles slashed branch names, and worktrees where `.git` is a
 * file pointing at the real git directory. Returns `undefined` for a detached HEAD or when no repository is found.
 */
export function getCurrentBranchName(p = process.cwd()) {
  let dir = path.resolve(p);
  while (true) {
    const gitPath = path.join(dir, '.git');
    const gitFile = readText(gitPath);
    if (gitFile.kind !== 'missing') {
      return readBranch(resolveGitDir({ gitPath, dir, gitFile }));
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return undefined;
    }
    dir = parent;
  }
}

/**
 * Reads a file without a prior existence check (avoids a check-then-use race). The result `kind` is `file`,
 * `directory`, or `missing`.
 */
function readText(filePath) {
  try {
    return { kind: 'file', contents: fs.readFileSync(filePath, 'utf-8').trim() };
  } catch (error) {
    if (error.code === 'EISDIR') {
      return { kind: 'directory' };
    }
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      return { kind: 'missing' };
    }
    throw error;
  }
}

function resolveGitDir({ gitPath, dir, gitFile }) {
  if (gitFile.kind === 'directory') {
    return gitPath;
  }
  const { contents } = gitFile;
  return contents.startsWith(GITDIR_PREFIX) ? path.resolve(dir, contents.slice(GITDIR_PREFIX.length).trim()) : undefined;
}

function readBranch(gitDir) {
  if (!gitDir) {
    return undefined;
  }
  const head = readText(path.join(gitDir, 'HEAD'));
  if (head.kind !== 'file') {
    return undefined;
  }
  return head.contents.startsWith(HEAD_REF_PREFIX) ? head.contents.slice(HEAD_REF_PREFIX.length) : undefined;
}

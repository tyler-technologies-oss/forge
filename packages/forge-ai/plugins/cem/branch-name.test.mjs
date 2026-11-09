import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { getCurrentBranchName, resolveBranchName } from './branch-name.mjs';

const tempDirs = [];

function makeTempDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'branch-name-'));
  tempDirs.push(dir);
  return dir;
}

function makeRepo(head) {
  const root = makeTempDir();
  fs.mkdirSync(path.join(root, '.git'));
  fs.writeFileSync(path.join(root, '.git', 'HEAD'), `${head}\n`);
  return root;
}

afterEach(() => {
  tempDirs.splice(0).forEach(dir => fs.rmSync(dir, { recursive: true, force: true }));
});

describe('getCurrentBranchName', () => {
  it('should read a simple branch name', () => {
    assert.equal(getCurrentBranchName(makeRepo('ref: refs/heads/main')), 'main');
  });

  it('should keep slashes in branch names', () => {
    assert.equal(getCurrentBranchName(makeRepo('ref: refs/heads/feat/TAI-438-forge-ai-package')), 'feat/TAI-438-forge-ai-package');
  });

  it('should walk up from a nested directory', () => {
    const root = makeRepo('ref: refs/heads/feat/x');
    const nested = path.join(root, 'packages', 'forge-ai');
    fs.mkdirSync(nested, { recursive: true });
    assert.equal(getCurrentBranchName(nested), 'feat/x');
  });

  it('should follow the gitdir pointer in a worktree', () => {
    const root = makeTempDir();
    const worktreeGitDir = path.join(root, 'main-repo', '.git', 'worktrees', 'wt');
    fs.mkdirSync(worktreeGitDir, { recursive: true });
    fs.writeFileSync(path.join(worktreeGitDir, 'HEAD'), 'ref: refs/heads/fix/worktree-branch\n');
    const worktree = path.join(root, 'wt');
    fs.mkdirSync(worktree);
    fs.writeFileSync(path.join(worktree, '.git'), `gitdir: ${worktreeGitDir}\n`);
    assert.equal(getCurrentBranchName(worktree), 'fix/worktree-branch');
  });

  it('should resolve a relative gitdir pointer in a worktree', () => {
    const root = makeTempDir();
    const worktreeGitDir = path.join(root, 'main-repo', '.git', 'worktrees', 'wt');
    fs.mkdirSync(worktreeGitDir, { recursive: true });
    fs.writeFileSync(path.join(worktreeGitDir, 'HEAD'), 'ref: refs/heads/feat/relative\n');
    const worktree = path.join(root, 'wt');
    fs.mkdirSync(worktree);
    fs.writeFileSync(path.join(worktree, '.git'), `gitdir: ${path.relative(worktree, worktreeGitDir)}\n`);
    assert.equal(getCurrentBranchName(worktree), 'feat/relative');
  });

  it('should return undefined for a .git file without a gitdir pointer', () => {
    const root = makeTempDir();
    fs.writeFileSync(path.join(root, '.git'), 'not a pointer\n');
    assert.equal(getCurrentBranchName(root), undefined);
  });

  it('should return undefined for a detached HEAD', () => {
    assert.equal(getCurrentBranchName(makeRepo('0123456789abcdef0123456789abcdef01234567')), undefined);
  });
});

describe('resolveBranchName', () => {
  it('should prefer GIT_BRANCH_NAME', () => {
    const env = { GIT_BRANCH_NAME: 'a/b', GITHUB_HEAD_REF: 'c', GITHUB_REF_NAME: 'd' };
    assert.equal(resolveBranchName({ env, cwd: makeRepo('ref: refs/heads/git') }), 'a/b');
  });

  it('should prefer GITHUB_HEAD_REF over GITHUB_REF_NAME for pull requests', () => {
    const env = { GITHUB_HEAD_REF: 'feat/pr-branch', GITHUB_REF_NAME: '123/merge' };
    assert.equal(resolveBranchName({ env, cwd: makeRepo('ref: refs/heads/git') }), 'feat/pr-branch');
  });

  it('should use GITHUB_REF_NAME when there is no head ref', () => {
    assert.equal(resolveBranchName({ env: { GITHUB_REF_NAME: 'release/forge/v3.10.5' }, cwd: makeRepo('ref: refs/heads/git') }), 'release/forge/v3.10.5');
  });

  it('should fall back to git, then main', () => {
    assert.equal(resolveBranchName({ env: {}, cwd: makeRepo('ref: refs/heads/feat/git') }), 'feat/git');
    assert.equal(resolveBranchName({ env: {}, cwd: makeRepo('0123456789abcdef0123456789abcdef01234567') }), 'main');
  });
});

#!/usr/bin/env bash
set -euo pipefail

SOURCE_BRANCH="${SOURCE_BRANCH:-main}"
BASE_BRANCH="${BASE_BRANCH:-next}"
SYNC_BRANCH="${SYNC_BRANCH:-sync/main-into-next}"
REMOTE="${REMOTE:-origin}"

summary() {
  if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
    printf '%s\n' "$1" >> "$GITHUB_STEP_SUMMARY"
  fi
}

if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
  git fetch --quiet --unshallow "$REMOTE"
fi

git fetch --quiet "$REMOTE" \
  "+refs/heads/$SOURCE_BRANCH:refs/remotes/$REMOTE/$SOURCE_BRANCH" \
  "+refs/heads/$BASE_BRANCH:refs/remotes/$REMOTE/$BASE_BRANCH"

if git merge-base --is-ancestor "$REMOTE/$SOURCE_BRANCH" "$REMOTE/$BASE_BRANCH"; then
  echo "$BASE_BRANCH already contains $SOURCE_BRANCH. Nothing to sync."
  summary "$BASE_BRANCH already contains $SOURCE_BRANCH. Nothing to sync."
  exit 0
fi

open_pr="$(gh pr list --base "$BASE_BRANCH" --head "$SYNC_BRANCH" --state open --json number --jq '.[0].number // empty')"
if [ -n "$open_pr" ]; then
  echo "Sync PR #$open_pr is already open. Nothing to do."
  summary "Sync PR #$open_pr is already open. Nothing to do."
  exit 0
fi

commit_count="$(git rev-list --count "$REMOTE/$BASE_BRANCH..$REMOTE/$SOURCE_BRANCH")"

git checkout --quiet -B "$SYNC_BRANCH" "$REMOTE/$BASE_BRANCH"

if ! merge_output="$(git merge --no-ff --no-edit -m "chore: merge $SOURCE_BRANCH into $BASE_BRANCH" "$REMOTE/$SOURCE_BRANCH" 2>&1)"; then
  conflicts="$(git diff --name-only --diff-filter=U)"
  git merge --abort 2>/dev/null || true

  if [ -z "$conflicts" ]; then
    message="Merging $SOURCE_BRANCH into $BASE_BRANCH failed, and not because of conflicts:

$merge_output"
  else
    message="Merging $SOURCE_BRANCH into $BASE_BRANCH has conflicts in:

$(printf '%s\n' "$conflicts" | sed 's/^/- /')

Resolve them locally, then push the branch and open the PR:

    git fetch $REMOTE && git checkout -B $SYNC_BRANCH $REMOTE/$BASE_BRANCH
    git merge --no-ff $REMOTE/$SOURCE_BRANCH
    git push $REMOTE $SYNC_BRANCH

Keep $BASE_BRANCH's package versions and take $SOURCE_BRANCH's changelog entries. Merge the PR with a merge commit."
  fi

  echo "$message" >&2
  summary "$message"
  exit 1
fi

git push --force "$REMOTE" "$SYNC_BRANCH"

body="Merges $commit_count commit(s) from \`$SOURCE_BRANCH\` into \`$BASE_BRANCH\`.

**Merge with a merge commit. Do not squash or rebase**: that discards the shared history this flow depends on.

Opened by the Sync main into next workflow."

pr_url="$(gh pr create --base "$BASE_BRANCH" --head "$SYNC_BRANCH" --title "chore: merge $SOURCE_BRANCH into $BASE_BRANCH" --body "$body")"
echo "Opened $pr_url"
summary "Opened $pr_url"

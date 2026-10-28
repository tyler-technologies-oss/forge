#!/usr/bin/env node
/**
 * Checks that a branch ships its docs changes to plugin users:
 *
 * 1. plugin/skills/forge-design matches what the docs generate.
 * 2. Any change to what the plugin ships has a @tylertech/forge-plugin changeset,
 *    since users only receive the plugin when its version changes.
 *
 * Reports every problem at once with the commands that fix it. Runs in CI
 * (.github/workflows/forge-skill.yml) or locally with `pnpm --filter forge-docs check:forge-skill`.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SKILL_DIR = "plugin/skills/forge-design";
const PLUGIN_PACKAGE = "@tylertech/forge-plugin";
/** The release PR edits these itself, and tests don't change what users get. */
const NON_SHIPPED_PLUGIN_PATHS = [":!plugin/package.json", ":!plugin/CHANGELOG.md", ":!plugin/tests/**"];

const git = (...args) => execFileSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" }).trim();
const lines = (text) => (text ? text.split("\n") : []);

/** Files in the generated skill that differ from what's committed, including new untracked ones. */
function findStaleSkillFiles() {
  return [
    ...lines(git("diff", "--name-only", "--", SKILL_DIR)),
    ...lines(git("ls-files", "--others", "--exclude-standard", "--", SKILL_DIR)),
  ];
}

/** Plugin files this branch changes that users would receive. */
function findShippedPluginChanges(baseRef) {
  return lines(git("diff", "--name-only", `${baseRef}...HEAD`, "--", "plugin", ...NON_SHIPPED_PLUGIN_PATHS));
}

/** Whether a changeset added on this branch releases the plugin. */
function hasPluginChangeset(baseRef) {
  const output = path.join(tmpdir(), `forge-skill-changeset-status-${process.pid}.json`);
  // `changeset status` exits non-zero without writing output when the branch has no changesets at all.
  const result = spawnSync("pnpm", ["exec", "changeset", "status", `--since=${baseRef}`, `--output=${output}`], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    return false;
  }
  try {
    return JSON.parse(readFileSync(output, "utf8")).releases.some((r) => r.name === PLUGIN_PACKAGE);
  } finally {
    rmSync(output, { force: true });
  }
}

/** Builds the report from the check results. Returns an empty list when everything is in order. */
export function describeProblems({ staleSkillFiles, shippedPluginChanges, pluginChangeset }) {
  const problems = [];
  if (staleSkillFiles.length) {
    problems.push({
      title: "The forge-design skill is out of date with the docs.",
      files: staleSkillFiles,
      fix: "pnpm --filter forge-docs build:forge-skill   (then commit plugin/skills/forge-design)",
    });
  }
  const pluginChanges = shippedPluginChanges.length || staleSkillFiles.length;
  if (pluginChanges && !pluginChangeset) {
    problems.push({
      title: `This change updates the plugin but has no ${PLUGIN_PACKAGE} changeset, so users won't receive it.`,
      files: shippedPluginChanges,
      fix: `pnpm changeset   (select ${PLUGIN_PACKAGE}; use patch for wording fixes, minor for new guidance)`,
    });
  }
  return problems;
}

export function formatReport(problems, { pluginChanged = false } = {}) {
  if (!problems.length) {
    return pluginChanged
      ? "Forge skill is up to date, and the plugin change has a changeset."
      : "Forge skill is up to date. This change doesn't affect the plugin.";
  }
  const sections = problems.map(({ title, files, fix }, i) => {
    const shown = files.slice(0, 10).map((f) => `     - ${f}`);
    const more = files.length > 10 ? [`     - …and ${files.length - 10} more`] : [];
    return [`${i + 1}. ${title}`, ...shown, ...more, `   Fix: ${fix}`].join("\n");
  });
  return [`Found ${problems.length} problem(s) shipping this change to plugin users:`, "", ...sections].join("\n");
}

function run() {
  const baseRef = process.env.BASE_REF ?? "origin/main";
  // The generator's per-page progress output would bury the report, so only show it if it fails.
  const generate = spawnSync("pnpm", ["--filter", "forge-docs", "build:forge-skill"], { cwd: REPO_ROOT, encoding: "utf8" });
  if (generate.status !== 0) {
    console.error(`${generate.stdout}${generate.stderr}\nGenerating the forge-design skill failed; fix the errors above first.`);
    process.exitCode = 1;
    return;
  }

  const results = {
    staleSkillFiles: findStaleSkillFiles(),
    shippedPluginChanges: findShippedPluginChanges(baseRef),
    pluginChangeset: hasPluginChangeset(baseRef),
  };
  const problems = describeProblems(results);
  const report = formatReport(problems, { pluginChanged: results.shippedPluginChanges.length > 0 });
  if (problems.length) {
    console.error(`\n${report}`);
    process.exitCode = 1;
  } else {
    console.log(`\n${report}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) run();

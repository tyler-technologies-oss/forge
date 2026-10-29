import { test } from "node:test";
import assert from "node:assert/strict";
import { describeProblems, formatReport } from "./check-forge-skill.mjs";

const ok = { staleSkillFiles: [], shippedPluginChanges: [], pluginChangeset: false };

test("describeProblems: nothing to report when the plugin is untouched", () => {
  assert.deepEqual(describeProblems(ok), []);
});

test("describeProblems: a regenerated skill with a changeset passes", () => {
  assert.deepEqual(
    describeProblems({ ...ok, shippedPluginChanges: ["plugin/skills/forge-design/SKILL.md"], pluginChangeset: true }),
    [],
  );
});

test("describeProblems: a docs edit without regenerating reports both fixes at once", () => {
  const problems = describeProblems({ ...ok, staleSkillFiles: ["plugin/skills/forge-design/references/components/button.md"] });
  assert.equal(problems.length, 2);
  assert.match(problems[0].fix, /build:forge-skill/);
  assert.match(problems[1].fix, /pnpm changeset/);
});

test("describeProblems: a regenerated skill without a changeset asks only for the changeset", () => {
  const problems = describeProblems({ ...ok, shippedPluginChanges: ["plugin/skills/forge-design/SKILL.md"] });
  assert.equal(problems.length, 1);
  assert.match(problems[0].title, /no @tylertech\/forge-plugin changeset/);
});

test("formatReport: the passing message says whether the plugin changed", () => {
  assert.match(formatReport([], { pluginChanged: true }), /has a changeset/);
  assert.match(formatReport([]), /doesn't affect the plugin/);
});

test("formatReport: lists each problem with its fix and truncates long file lists", () => {
  const files = Array.from({ length: 12 }, (_, i) => `plugin/skills/forge-design/references/components/c${i}.md`);
  const report = formatReport(describeProblems({ ...ok, staleSkillFiles: files }));
  assert.match(report, /Found 2 problem\(s\)/);
  assert.match(report, /…and 2 more/);
  assert.equal((report.match(/Fix: /g) ?? []).length, 2);
});

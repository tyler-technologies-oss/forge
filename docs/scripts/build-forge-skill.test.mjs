import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  urlToBlockId,
  derivedBlockId,
  blockExists,
  cleanMdxBody,
  rewriteSiteLink,
  buildRulesMd,
  buildLlmsTxt,
  findSubpathOnlyComponents,
} from "./build-forge-skill.mjs";

const url = (p) => `https://forge.tylerdev.io/blocks/v1/${p}`;

test("urlToBlockId: flat path", () => {
  assert.equal(
    urlToBlockId(url("components/card/scaffold/scaffold.html")),
    "components/card/scaffold/scaffold",
  );
});

test("urlToBlockId: nested path", () => {
  assert.equal(
    urlToBlockId(url("components/drawer/modal-drawer/demo/demo.html")),
    "components/drawer/modal-drawer/demo/demo",
  );
});

test("urlToBlockId: rejects URLs that are not /blocks/v1/...html", () => {
  for (const bad of [
    "https://forge.tylerdev.io/blocks/v2/components/card/demo/demo.html",
    url("components/card/demo/demo"),
    url(".html"),
    url(""),
    undefined,
  ]) {
    assert.throws(() => urlToBlockId(bad), /blocks\/v1/, String(bad));
  }
});

test("derivedBlockId: 'Basic usage' is demo, other headings are kebab-cased", () => {
  assert.equal(derivedBlockId("tree", "Basic usage"), "components/tree/demo/demo");
  assert.equal(derivedBlockId("timeline", "Sidebar lines"), "components/timeline/sidebar-lines/sidebar-lines");
});

test("cleanMdxBody: drops <ComponentHeader> and its import, keeping surrounding prose", () => {
  const body = [
    'import ComponentHeader from "../../../components/ComponentHeader.astro";',
    "",
    "Intro copy.",
    "",
    "<ComponentHeader>",
    "  <forge-button>Button</forge-button>",
    "</ComponentHeader>",
    "",
    "## Overview",
    "Overview copy.",
  ].join("\n");
  const out = cleanMdxBody(body, { file: "test.mdx", slug: "button", lineOffset: 0, examples: [] });
  assert.doesNotMatch(out, /ComponentHeader|forge-button/);
  assert.match(out, /Intro copy\.\n\n## Overview\n\nOverview copy\./);
});

test("cleanMdxBody: drops the co-located <Header /> demo and its import", () => {
  const body = [
    'import Header from "./header.astro";',
    "",
    "<Header />",
    "",
    "## Usage",
    "Usage copy.",
  ].join("\n");
  const out = cleanMdxBody(body, { file: "test.mdx", slug: "button", lineOffset: 0, examples: [] });
  assert.doesNotMatch(out, /Header|header\.astro/);
  assert.match(out, /## Usage\n\nUsage copy\./);
});

test("cleanMdxBody: drops <AnatomyDemo> and a heading left with no content", () => {
  const body = [
    'import AnatomyDemo from "../../../components/docs/AnatomyDemo.astro";',
    'import AnatomyMarker from "../../../components/docs/AnatomyMarker.astro";',
    "",
    "## Anatomy",
    "",
    "<AnatomyDemo>",
    "  <forge-card>",
    '    <AnatomyMarker label={1} title="Body" description="Card content." />',
    "  </forge-card>",
    "</AnatomyDemo>",
    "",
    "## Rules",
    "Rules copy.",
  ].join("\n");
  const out = cleanMdxBody(body, { file: "test.mdx", slug: "card", lineOffset: 0, examples: [] });
  assert.doesNotMatch(out, /Anatomy|forge-card/);
  assert.equal(out, "## Rules\n\nRules copy.");
});

test("cleanMdxBody: keeps prose that follows an <AnatomyDemo> in the same section", () => {
  const body = ["## Containers", "", "<AnatomyDemo>", "  <forge-card></forge-card>", "</AnatomyDemo>", "", "Container copy."].join("\n");
  const out = cleanMdxBody(body, { file: "test.mdx", slug: "card", lineOffset: 0, examples: [] });
  assert.equal(out, "## Containers\n\nContainer copy.");
});

test("cleanMdxBody: keeps a heading whose content is a deeper subsection", () => {
  const body = ["## Layout", "", "### Headings", "Heading copy."].join("\n");
  const out = cleanMdxBody(body, { file: "test.mdx", slug: "card", lineOffset: 0, examples: [] });
  assert.match(out, /^## Layout\n\n### Headings/);
});

test("cleanMdxBody: renders backtick spans in <Rule> strings as inline code", () => {
  const body = '<Rules>\n  <Rule variant="do" rules={["Set `no-padding` on the card."]} />\n</Rules>';
  const out = cleanMdxBody(body, { file: "test.mdx", slug: "card", lineOffset: 0, examples: [] });
  assert.match(out, /- Set `no-padding` on the card\./);
  assert.doesNotMatch(out, /\\`/);
});

test("rewriteSiteLink: links to shipped pages resolve to reference files relative to the source", () => {
  assert.equal(rewriteSiteLink("/designing/color/#text", { outDir: "design" }), "./color.md#text");
  assert.equal(rewriteSiteLink("/designing/layout/", { outDir: "components" }), "../design/layout.md");
  assert.equal(rewriteSiteLink("/components/button/usage/#grouping", { outDir: "design" }), "../components/button.md#grouping");
  assert.equal(rewriteSiteLink("/developing/icons/", { outDir: "development/frameworks" }), "../icons.md");
});

test("rewriteSiteLink: site-only pages become absolute links, and external links are untouched", () => {
  assert.equal(rewriteSiteLink("/tokens/color/", { outDir: "design" }), "https://tylerforge.design/tokens/color/");
  assert.equal(rewriteSiteLink("/blocks/", { outDir: "design" }), "https://tylerforge.design/blocks/");
  assert.equal(rewriteSiteLink("https://example.com/x", { outDir: "design" }), "https://example.com/x");
  assert.equal(rewriteSiteLink("#local", { outDir: "design" }), "#local");
});

test("blockExists matches id, file, and file minus .html like get_forge_blocks", () => {
  const manifest = { blocks: [{ id: "forms/login/login", file: "forms/login/login.html" }] };
  assert.ok(blockExists(manifest, "forms/login/login"));
  assert.ok(blockExists(manifest, "forms/login/login.html"));
  assert.ok(!blockExists(manifest, "src/blocks/forms/login"));
});

const RULES_TEMPLATE = [
  "# Skill",
  "Skill intro.",
  "## Top-level rules (always apply)",
  "1. See [layout](references/design/layout.md).",
  "## Workflow",
  "Step one.",
  "## References",
  "- [card](references/components/card.md)",
].join("\n\n");

test("buildRulesMd: should keep the rules through the tool list and make reference links absolute", () => {
  const out = buildRulesMd(RULES_TEMPLATE);
  assert.match(out, /^# Tyler Forge rules and workflow/);
  assert.match(out, /\[layout\]\(https:\/\/tylerforge\.design\/skill\/forge-design\/references\/design\/layout\.md\)/);
  assert.match(out, /## Workflow\n\nStep one\./);
  assert.doesNotMatch(out, /## References|Skill intro|components\/card/);
});

test("buildRulesMd: should fail when the template no longer has the rules headings", () => {
  assert.throws(() => buildRulesMd("# Skill\n\nNo rules here."), /Top-level rules/);
});

test("buildLlmsTxt: should list every page as an absolute link under its section", () => {
  const page = (title, docsPath) => ({ title, description: `${title} page.`, docsPath });
  const out = buildLlmsTxt({
    components: [page("Card", "components/card.md"), page("Button", "components/button.md")],
    design: [page("Color", "design/color.md")],
    development: [page("Installation", "development/installation.md")],
  });
  assert.match(out, /^# Tyler Forge Design System\n\n> /);
  assert.match(out, /\[Rules and workflow\]\(https:\/\/tylerforge\.design\/skill\/forge-design\/rules\.md\)/);
  assert.match(out, /## Components\n\n- \[Button\]\(https:\/\/tylerforge\.design\/skill\/forge-design\/references\/components\/button\.md\): Button page\.\n- \[Card\]/);
  assert.match(out, /## Guides\n\n- \[Forge UI anti-patterns\]\([^)]+\/references\/anti-patterns\.md\)/);
});

test("findSubpathOnlyComponents: should return components the root entry never imports", async () => {
  const lib = await mkdtemp(path.join(tmpdir(), "forge-lib-"));
  try {
    const component = async (name, files) => {
      await mkdir(path.join(lib, name), { recursive: true });
      for (const [file, source] of Object.entries(files)) await writeFile(path.join(lib, name, file), source);
    };
    const tagConstant = (name) => `const elementName = \`\${COMPONENT_NAME_PREFIX}${name}\`;`;
    await writeFile(path.join(lib, "index.ts"), "import { defineButton } from './button/index.js';\nexport * from './list/index.js';\n");
    await component("button", { "index.ts": "", "button-constants.ts": tagConstant("button") });
    await component("list", { "index.ts": "export * from '../profile-card/index.js';" });
    await component("profile-card", { "index.ts": "", "profile-card-constants.ts": tagConstant("profile-card") });
    await component("app-layout", { "index.ts": "", "app-layout-constants.ts": tagConstant("app-layout") });
    await component("core", { "utils.ts": "" });
    await component("list-dropdown", { "index.ts": "export * from './list-dropdown.js';" });

    assert.deepEqual(await findSubpathOnlyComponents(lib), ["forge-app-layout"]);
  } finally {
    await rm(lib, { recursive: true, force: true });
  }
});

test("findSubpathOnlyComponents: should match the components Forge publishes only as subpaths", async () => {
  const tags = await findSubpathOnlyComponents();
  for (const tag of ["forge-app-layout", "forge-structured-card", "forge-theme-toggle"]) assert.ok(tags.includes(tag), tag);
  for (const tag of ["forge-button", "forge-card", "forge-split-button"]) assert.ok(!tags.includes(tag), tag);
});

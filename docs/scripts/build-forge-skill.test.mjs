import { test } from "node:test";
import assert from "node:assert/strict";
import { urlToBlockId, derivedBlockId, blockExists, cleanMdxBody, rewriteSiteLink } from "./build-forge-skill.mjs";

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

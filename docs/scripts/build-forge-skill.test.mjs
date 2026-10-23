import { test } from "node:test";
import assert from "node:assert/strict";
import { urlToBlockId, derivedBlockId, blockExists } from "./build-forge-skill.mjs";

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

test("blockExists matches id, file, and file minus .html like get_forge_blocks", () => {
  const manifest = { blocks: [{ id: "forms/login/login", file: "forms/login/login.html" }] };
  assert.ok(blockExists(manifest, "forms/login/login"));
  assert.ok(blockExists(manifest, "forms/login/login.html"));
  assert.ok(!blockExists(manifest, "src/blocks/forms/login"));
});

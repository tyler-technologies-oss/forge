#!/usr/bin/env node
/**
 * Builds the forge-design Agent Skill bundle (skill/forge-design/) straight
 * from the source MDX: strips the component docs (src/content/components)
 * and developer guide docs (src/content/developing) down to the prose an LLM
 * actually wants — headings, usage copy, do/don't rules, and accessibility
 * guidance (when a component has an accessibility.mdx) — then packages the
 * result as references/ under a SKILL.md generated from
 * scripts/forge-skill-template/SKILL.md. Callout wrappers like
 * <InlineMessage> and <Blockquote> are unwrapped to keep their prose without
 * the presentational tag, raw <table> markup becomes a markdown table, and
 * <StorybookEmbed> (a live preview only) is dropped. Each <Example> becomes a
 * one-line pointer — `Example (<description>): \`get_forge_blocks(blockId:
 * "<id>")\`` — since Forge markup must come from blocks, not the docs. The id
 * is derived from the example's blockUrl; an <Example> with no blockUrl
 * (block not published yet) falls back to
 * components/<slug>/<heading-as-kebab>/<same> ("Basic usage" -> demo), marked
 * pending. After writing, every id is checked against the live block
 * manifest (the same one the forge MCP's get_forge_blocks reads): a dangling
 * id from an explicit blockUrl exits non-zero, a dangling derived id is
 * reported as pending and only fails with --strict.
 *
 * Parses each MDX body into a real AST (remark + remark-mdx) instead of
 * scanning raw text for tag spans, so indentation and fenced code samples
 * (which contain their own `import` lines) can't confuse the cleanup.
 *
 * Run with `pnpm build:forge-skill [-- --strict]`. Not wired into `astro build`; run it
 * whenever the MDX docs change.
 */
import { readFile, writeFile, mkdir, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";

// Same catalogue get_forge_blocks reads (forge-MCP/src/services/blocks-manifest-service.ts).
const BLOCKS_BASE_URL = "https://forge.tylerdev.io/blocks/v1";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS_DIR = path.join(ROOT, "src/content/components");
const DEVELOPMENT_DIR = path.join(ROOT, "src/content/developing");
const TEMPLATE_PATH = path.join(ROOT, "scripts/forge-skill-template/SKILL.md");

const OUT_DIR = path.join(ROOT, "skill/forge-design");
const OUT_REFERENCES_DIR = path.join(OUT_DIR, "references");
const OUT_COMPONENTS_DIR = path.join(OUT_REFERENCES_DIR, "components");
const OUT_DEVELOPMENT_DIR = path.join(OUT_REFERENCES_DIR, "development");

const CATEGORY_LABELS = {
  layout: "Layout",
  navigation: "Navigation",
  forms: "Forms",
  "data-display": "Data display",
  feedback: "Feedback",
  actions: "Actions",
  utilities: "Utilities",
};

const mdxParser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);
const mdStringifier = unified()
  .use(remarkStringify, { bullet: "-", rule: "-", emphasis: "_" })
  .use(remarkMdx)
  .use(remarkGfm);

/** Flat frontmatter parser — schema in src/content.config.ts is all scalars. */
function parseFrontmatter(text) {
  const result = {};
  for (const line of text.split("\n")) {
    const match = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function isJsxElement(node) {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

function getAttr(node, name) {
  return (node.attributes ?? []).find((a) => a.type === "mdxJsxAttribute" && a.name === name);
}

/** A build-failing problem in the source MDX, reported as `file:line: message`. */
class BuildError extends Error {}

/**
 * `.../blocks/v1/components/card/scaffold/scaffold.html` -> `components/card/scaffold/scaffold`.
 * That id form is what get_forge_blocks resolves (it matches manifest `id`, `file`, or
 * `file` minus `.html`); the `src/blocks/...` form in the tool's usage hint does not resolve.
 */
export function urlToBlockId(url) {
  const marker = "/blocks/v1/";
  const at = typeof url === "string" ? url.indexOf(marker) : -1;
  const rest = at === -1 ? "" : url.slice(at + marker.length);
  if (!rest.endsWith(".html") || rest === ".html") {
    throw new Error(`blockUrl must match .../blocks/v1/<path>.html, got ${JSON.stringify(url)}`);
  }
  return rest.slice(0, -".html".length);
}

export function kebab(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Id for an <Example> that has no blockUrl yet, following the existing block naming:
 * components/<slug>/<variant>/<variant>, where the first section ("Basic usage") is `demo`.
 */
export function derivedBlockId(slug, heading) {
  const variant = kebab(heading) === "basic-usage" ? "demo" : kebab(heading);
  return `components/${slug}/${variant}/${variant}`;
}

/** Converts one <Example> node to its pointer paragraph, recording it on `ctx.examples`. */
function exampleToPointer(node, ctx) {
  const where = `${ctx.file}:${(node.position?.start.line ?? 0) + ctx.lineOffset}`;
  const descAttr = getAttr(node, "description");
  if (typeof descAttr?.value !== "string" || !descAttr.value.trim()) {
    throw new BuildError(`${where}: <Example> needs a string description`);
  }
  const urlAttr = getAttr(node, "blockUrl");

  let id;
  let pending = false;
  if (urlAttr) {
    if (typeof urlAttr.value !== "string") {
      throw new BuildError(`${where}: <Example> blockUrl must be a plain string`);
    }
    try {
      id = urlToBlockId(urlAttr.value);
    } catch (e) {
      throw new BuildError(`${where}: ${e.message}`);
    }
  } else {
    if (!ctx.slug || !ctx.heading) {
      throw new BuildError(`${where}: <Example> has no blockUrl and no component section to derive one from`);
    }
    id = derivedBlockId(ctx.slug, ctx.heading);
    pending = true;
  }

  ctx.examples.push({ file: ctx.file, line: where.split(":").pop(), id, description: descAttr.value, pending });
  return {
    type: "paragraph",
    children: [
      { type: "text", value: `Example (${descAttr.value}): ` },
      { type: "inlineCode", value: `get_forge_blocks(blockId: "${id}")` },
    ],
  };
}

/** The array/string literals JSX props carry here are hand-authored, plain JS — safe to eval. */
function evalExpression(raw) {
  return new Function(`return (${raw});`)();
}

function nodeToPlainText(nodes) {
  return (nodes ?? [])
    .map((n) => {
      if (n.type === "text" || n.type === "inlineCode") return n.value;
      if (n.children) return nodeToPlainText(n.children);
      return "";
    })
    .join("");
}

/**
 * Finds descendant JSX elements named `name`. Recurses through any wrapper
 * node (a plain `paragraph`, another JSX element) rather than assuming a
 * fixed depth — remark wraps a same-line `<tr>`/`<td>` run in an implicit
 * paragraph inconsistently depending on surrounding blank lines.
 */
function findChildElements(node, name) {
  const found = [];
  for (const child of node.children ?? []) {
    if (isJsxElement(child) && child.name === name) {
      found.push(child);
    } else {
      found.push(...findChildElements(child, name));
    }
  }
  return found;
}

/** Reduces a `<td>`/`<th>` cell to inline mdast nodes: `<code>` becomes real `inlineCode`,
 * other JSX wrappers (decorative swatch `<div>`/`<span>`) are unwrapped, and JSX's `{" "}`
 * literal-space idiom evaluates to a real space. */
function cellToInlineNodes(cellNode) {
  const out = [];
  for (const child of cellNode.children ?? []) {
    if (isJsxElement(child) && child.name === "code") {
      out.push({ type: "inlineCode", value: nodeToPlainText(child.children) });
    } else if (child.type === "mdxTextExpression" || child.type === "mdxFlowExpression") {
      let value;
      try {
        value = evalExpression(child.value);
      } catch {
        continue;
      }
      if (typeof value === "string") out.push({ type: "text", value });
    } else if (isJsxElement(child) || child.type === "paragraph") {
      out.push(...cellToInlineNodes(child));
    } else {
      out.push(child);
    }
  }
  return out;
}

/**
 * Drops any column that's empty in every data row — the color/typography
 * swatch cells in src/content/developing/tailwind.mdx render a `<div>` with no
 * text at all, purely decorative, so they carry zero information for a
 * text-only reader.
 */
function pruneEmptyColumns(header, bodyRows) {
  const columnCount = Math.max(header.length, ...bodyRows.map((r) => r.length), 0);
  if (bodyRows.length === 0 || columnCount === 0) return { header, bodyRows };

  const keepIndexes = [];
  for (let i = 0; i < columnCount; i++) {
    if (bodyRows.some((row) => nodeToPlainText(row[i] ?? []).trim() !== "")) keepIndexes.push(i);
  }
  if (keepIndexes.length === 0 || keepIndexes.length === columnCount) return { header, bodyRows };

  return {
    header: keepIndexes.map((i) => header[i] ?? []),
    bodyRows: bodyRows.map((row) => keepIndexes.map((i) => row[i] ?? [])),
  };
}

/** Renders a `<table>` JSX element as a real mdast `table` node — remark-gfm handles
 * pipe escaping and column padding at stringify time. */
function buildTableNode(tableNode) {
  const thead = findChildElements(tableNode, "thead")[0];
  const tbody = findChildElements(tableNode, "tbody")[0];

  const headerRow = thead ? findChildElements(thead, "tr")[0] : null;
  const header = headerRow
    ? findChildElements(headerRow, "th").map((cell) => cellToInlineNodes(cell))
    : [];

  const bodyRows = findChildElements(tbody ?? tableNode, "tr").map((row) =>
    findChildElements(row, "td").map((cell) => cellToInlineNodes(cell)),
  );

  const { header: prunedHeader, bodyRows: prunedRows } = pruneEmptyColumns(header, bodyRows);
  const columnCount = Math.max(prunedHeader.length, ...prunedRows.map((r) => r.length), 0);
  if (columnCount === 0) return null;

  const toRow = (cells) => ({
    type: "tableRow",
    children: Array.from({ length: columnCount }, (_, i) => ({
      type: "tableCell",
      children: cells[i] ?? [],
    })),
  });

  return {
    type: "table",
    align: Array.from({ length: columnCount }, () => null),
    children: [toRow(prunedHeader), ...prunedRows.map(toRow)],
  };
}

/** Renders a `<Rules><Rule variant="do" rules={[...]}/>...</Rules>` block as Do/Don't lists. */
function buildRulesNodes(rulesNode) {
  const nodes = [];
  for (const rule of findChildElements(rulesNode, "Rule")) {
    const variantAttr = getAttr(rule, "variant");
    const heading = variantAttr?.value === "dont" ? "Don't" : "Do";

    const rulesAttr = getAttr(rule, "rules");
    const items =
      rulesAttr?.value && typeof rulesAttr.value === "object"
        ? evalExpression(rulesAttr.value.value)
        : [];

    nodes.push({
      type: "paragraph",
      children: [{ type: "strong", children: [{ type: "text", value: heading }] }],
    });
    nodes.push({
      type: "list",
      ordered: false,
      spread: false,
      children: items.map((item) => ({
        type: "listItem",
        spread: false,
        children: [{ type: "paragraph", children: [{ type: "text", value: item }] }],
      })),
    });
  }
  return nodes;
}

/** InlineMessage's `title` prop is meaningful content, not styling — keep it as a lead-in. */
function unwrapInlineMessage(node) {
  const titleAttr = getAttr(node, "title");
  const title = typeof titleAttr?.value === "string" ? titleAttr.value : null;
  if (!title) return node.children;
  return [
    { type: "paragraph", children: [{ type: "strong", children: [{ type: "text", value: title }] }] },
    ...node.children,
  ];
}

/**
 * Component pages link to each other with the site's base-path-aware idiom —
 * `<a href={`${import.meta.env.BASE_URL}components/<slug>/<tab>/`}>text</a>` —
 * since this site's `base` config means a plain root-relative link would
 * 404. That JSX is meaningless outside the Astro build, so rewrite it into a
 * relative link between the generated docs themselves. The target file
 * doesn't need to exist yet — `<slug>.md` is deterministic from the
 * component's tag name, same as the source link was written ahead of the
 * page existing.
 */
const INTERNAL_LINK_PATTERN =
  /^`\$\{import\.meta\.env\.BASE_URL\}components\/([a-z0-9-]+)\/[a-z0-9-]+\/?`$/;

function transformInternalLink(node) {
  const hrefAttr = getAttr(node, "href");
  const raw = hrefAttr?.value && typeof hrefAttr.value === "object" ? hrefAttr.value.value : null;
  const match = raw ? raw.match(INTERNAL_LINK_PATTERN) : null;
  if (!match) return node;
  return { type: "link", url: `./${match[1]}.md`, children: node.children };
}

/** Post-order dispatcher: recurses into each node's children first, then rewrites or drops
 * recognized JSX. Anything unrecognized passes through untouched — remark-mdx's stringifier
 * round-trips it back to valid JSX text. */
function transformChildren(children, ctx) {
  const out = [];
  for (const child of children) {
    if (child.children) child.children = transformChildren(child.children, ctx);
    if (child.type === "heading") ctx.heading = nodeToPlainText(child.children);

    if (isJsxElement(child)) {
      if (child.name === "StorybookEmbed") continue;
      if (child.name === "Example") {
        out.push(exampleToPointer(child, ctx));
        continue;
      }
      if (child.name === "InlineMessage") {
        out.push(...unwrapInlineMessage(child));
        continue;
      }
      if (child.name === "Blockquote") {
        out.push(...child.children);
        continue;
      }
      if (child.name === "Rules") {
        out.push(...buildRulesNodes(child));
        continue;
      }
      if (child.name === "table") {
        const table = buildTableNode(child);
        if (table) out.push(table);
        continue;
      }
      if (child.name === "a") {
        out.push(transformInternalLink(child));
        continue;
      }
    }
    out.push(child);
  }
  return out;
}

function demoteHeadings(nodes) {
  for (const node of nodes) {
    if (node.type === "heading") node.depth = Math.min(node.depth + 1, 6);
    if (node.children) demoteHeadings(node.children);
  }
}

/** `ctx`: { file, slug (component pages only), lineOffset (frontmatter lines), examples: [] to collect into }. */
function buildCleanTree(body, ctx) {
  const tree = mdxParser.parse(body);
  ctx.heading = null;
  tree.children = transformChildren(tree.children.filter((node) => node.type !== "mdxjsEsm"), ctx);
  return tree;
}

function cleanMdxBody(body, ctx) {
  return mdStringifier.stringify(buildCleanTree(body, ctx)).trim();
}

const frontmatterLineCount = (match) => match[0].split("\n").length - 1;

/** Recursively lists `.mdx` files under `dir`, returning slugs relative to `dir` with no extension (e.g. "frameworks/react"). */
async function findMdxFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const slugs = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      slugs.push(...(await findMdxFiles(entryPath, base)));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      slugs.push(path.relative(base, entryPath).replace(/\.mdx$/, "").split(path.sep).join("/"));
    }
  }
  return slugs;
}

async function buildComponentDocs(examples) {
  const entries = await readdir(COMPONENTS_DIR, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  await mkdir(OUT_COMPONENTS_DIR, { recursive: true });

  const components = [];
  for (const slug of slugs) {
    const raw = await readFile(path.join(COMPONENTS_DIR, slug, "usage.mdx"), "utf8");

    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!frontmatterMatch) {
      console.warn(`Skipping ${slug}: no frontmatter found`);
      continue;
    }
    const frontmatter = parseFrontmatter(frontmatterMatch[1]);
    const body = raw.slice(frontmatterMatch[0].length);
    const cleanedBody = cleanMdxBody(body, {
      file: path.relative(ROOT, path.join(COMPONENTS_DIR, slug, "usage.mdx")),
      slug,
      lineOffset: frontmatterLineCount(frontmatterMatch),
      examples,
    });

    const accessibilityPath = path.join(COMPONENTS_DIR, slug, "accessibility.mdx");
    const hasAccessibilityDocs = await access(accessibilityPath).then(() => true, () => false);
    let accessibilitySection = "";
    if (hasAccessibilityDocs) {
      const accessibilityTree = buildCleanTree(await readFile(accessibilityPath, "utf8"), {
        file: path.relative(ROOT, accessibilityPath),
        slug,
        lineOffset: 0,
        examples,
      });
      demoteHeadings(accessibilityTree.children);
      const accessibilityBody = mdStringifier.stringify(accessibilityTree).trim();
      accessibilitySection = `\n\n## Accessibility\n\n${accessibilityBody}`;
    }

    const md = `# ${frontmatter.title}\n\n${frontmatter.description}\n\n${cleanedBody}${accessibilitySection}\n`;
    await writeFile(path.join(OUT_COMPONENTS_DIR, `${slug}.md`), md, "utf8");

    components.push({
      name: slug,
      title: frontmatter.title,
      description: frontmatter.description,
      status: frontmatter.status ?? "stable",
      source: frontmatter.source ?? "core",
      category: frontmatter.category,
      storybookId: frontmatter.storybookId,
      figmaUrl: frontmatter.figmaUrl,
      hasAccessibilityDocs,
      docsPath: `components/${slug}.md`,
    });
  }

  components.sort((a, b) => a.name.localeCompare(b.name));
  return components;
}

async function buildDevelopmentDocs(examples) {
  const developmentSlugs = await findMdxFiles(DEVELOPMENT_DIR);
  const development = [];
  for (const slug of developmentSlugs) {
    const raw = await readFile(path.join(DEVELOPMENT_DIR, `${slug}.mdx`), "utf8");

    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!frontmatterMatch) {
      console.warn(`Skipping developing/${slug}: no frontmatter found`);
      continue;
    }
    const frontmatter = parseFrontmatter(frontmatterMatch[1]);
    const body = raw.slice(frontmatterMatch[0].length);
    const cleanedBody = cleanMdxBody(body, {
      file: path.relative(ROOT, path.join(DEVELOPMENT_DIR, `${slug}.mdx`)),
      slug: null,
      lineOffset: frontmatterLineCount(frontmatterMatch),
      examples,
    });

    const md = `# ${frontmatter.title}\n\n${frontmatter.description}\n\n${cleanedBody}\n`;
    const outPath = path.join(OUT_DEVELOPMENT_DIR, `${slug}.md`);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, md, "utf8");

    development.push({
      name: slug,
      title: frontmatter.title,
      description: frontmatter.description,
      docsPath: `development/${slug}.md`,
    });
  }
  development.sort((a, b) => a.name.localeCompare(b.name));
  return development;
}

function replaceBetweenMarkers(template, marker, replacement) {
  const start = `<!-- ${marker}:START -->`;
  const end = `<!-- ${marker}:END -->`;
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(template)) {
    throw new Error(`Missing ${start} / ${end} markers in ${TEMPLATE_PATH}`);
  }
  return template.replace(pattern, `${start}\n${replacement}\n${end}`);
}

function buildComponentIndex(components) {
  const byCategory = new Map();
  for (const c of components) {
    const key = c.category ?? "utilities";
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(c);
  }

  const sections = [...byCategory.keys()].sort().map((category) => {
    const label = CATEGORY_LABELS[category] ?? category;
    const items = byCategory
      .get(category)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((c) => `- [${c.title}](references/${c.docsPath}) — ${c.description}`)
      .join("\n");
    return `### ${label}\n\n${items}`;
  });

  return sections.join("\n\n");
}

function buildDevelopmentIndex(development) {
  return development
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((d) => `- [${d.title}](references/${d.docsPath}) — ${d.description}`)
    .join("\n");
}

async function writeSkillMd(components, development) {
  const template = await readFile(TEMPLATE_PATH, "utf8");
  let skillMd = replaceBetweenMarkers(template, "COMPONENT-INDEX", buildComponentIndex(components));
  skillMd = replaceBetweenMarkers(skillMd, "DEVELOPMENT-INDEX", buildDevelopmentIndex(development));
  await writeFile(path.join(OUT_DIR, "SKILL.md"), skillMd, "utf8");
}

/** Mirrors get_forge_blocks' lookup: a block matches on `id`, `file`, or `file` minus `.html`. */
export function blockExists(manifest, blockId) {
  return manifest.blocks.some(
    (b) => b.id === blockId || b.file === blockId || b.file === `${blockId}.html`,
  );
}

async function fetchManifest() {
  const response = await fetch(`${BLOCKS_BASE_URL}/manifest.json`);
  if (!response.ok) {
    throw new BuildError(`Could not fetch block manifest to validate examples: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/** Prints the summary + dangling report; returns true when the build should fail. */
function reportExamples(examples, manifest, strict) {
  const byFile = new Map();
  for (const e of examples) byFile.set(e.file, (byFile.get(e.file) ?? 0) + 1);
  console.log(`Converted ${examples.length} <Example>(s) across ${byFile.size} page(s):`);
  for (const [file, count] of [...byFile].sort()) console.log(`  ${count}  ${file}`);

  const dangling = examples.filter((e) => !blockExists(manifest, e.id));
  const fatal = dangling.filter((e) => !e.pending || strict);
  const pending = dangling.filter((e) => e.pending && !strict);
  const fmt = (e) => `  ${e.file}:${e.line}  ${e.id}  — ${e.description}`;

  if (pending.length) {
    console.warn(`\n${pending.length} PENDING block id(s) (derived from the section heading; no blockUrl in the MDX, block not in the catalogue yet):`);
    pending.forEach((e) => console.warn(fmt(e)));
  }
  if (fatal.length) {
    console.error(`\n${fatal.length} DANGLING block id(s) not in the block catalogue:`);
    fatal.forEach((e) => console.error(fmt(e)));
  }
  return fatal.length > 0;
}

async function main() {
  await mkdir(OUT_REFERENCES_DIR, { recursive: true });

  const examples = [];
  const components = await buildComponentDocs(examples);
  const development = await buildDevelopmentDocs(examples);

  const manifest = { generatedAt: new Date().toISOString(), components, development };
  await writeFile(
    path.join(OUT_REFERENCES_DIR, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  await writeSkillMd(components, development);

  console.log(
    `Wrote skill bundle (${components.length} component doc(s), ${development.length} development doc(s)) to ${path.relative(ROOT, OUT_DIR)}/`,
  );
  return examples;
}

async function run() {
  try {
    const examples = await main();
    const manifest = await fetchManifest();
    if (reportExamples(examples, manifest, process.argv.includes("--strict"))) process.exitCode = 1;
  } catch (e) {
    if (!(e instanceof BuildError)) throw e;
    console.error(e.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) run();

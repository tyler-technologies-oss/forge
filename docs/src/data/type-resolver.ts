/**
 * Type resolver — build-time scan of Forge .d.ts files.
 *
 * Reads `export type Foo = 'a' | 'b'` declarations across @tylertech/forge and
 * resolves them (including one level of alias unwrapping, e.g.
 * `ButtonTheme = Theme | 'app-bar'`) into a Map<TypeName, string[]>.
 *
 * The CEM ships type names as bare strings; this map turns those names into
 * their possible values so the API table can show a value list on hover.
 *
 * Handled: string-literal unions, alias-of-union, single-file scans.
 * Not handled: generic types, function types, structural types, imports from
 * outside the Forge package. Anything unresolvable is silently omitted — the
 * consumer treats a missing entry as "no popover for this type".
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const FORGE_ESM_ROOT = new URL(
  "../../node_modules/@tylertech/forge/esm/",
  import.meta.url
).pathname;

const TYPE_ALIAS_RE = /^export\s+type\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([^;]+);/gm;

/** Recursively collect every .d.ts file under a directory. */
function collectDtsFiles(root: string): string[] {
  const out: string[] = [];
  const walk = (dir: string): void => {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      let stat;
      try {
        stat = statSync(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) walk(full);
      else if (entry.endsWith(".d.ts")) out.push(full);
    }
  };
  walk(root);
  return out;
}

/**
 * Parse the RHS of a `type Foo = ...` declaration into either a list of
 * string-literal values or a list of referenced type names. A mix returns
 * both — the resolver later expands the referenced names in place.
 */
function parseUnion(rhs: string): { literals: string[]; refs: string[] } {
  const literals: string[] = [];
  const refs: string[] = [];

  // Split on top-level `|`. RHS is small enough that we don't need a real
  // parser; string-literal unions and simple alias-of-union are the only two
  // shapes we care about, both flat.
  const parts = rhs
    .replace(/\s+/g, " ")
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    // Quoted string literal (single or double)
    const litMatch = part.match(/^['"]([^'"]*)['"]$/);
    if (litMatch) {
      literals.push(litMatch[1]);
      continue;
    }
    // Bare identifier — a reference to another type alias
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(part)) {
      refs.push(part);
      continue;
    }
    // Anything else (generics, function types, structural types) → give up on
    // this alias entirely. Signal by returning empty arrays; the resolver's
    // caller will treat that as "unresolvable".
    return { literals: [], refs: [] };
  }

  return { literals, refs };
}

/**
 * One-shot scan → { rawAliases, resolved }. `rawAliases` is the flat map from
 * name → parsed RHS; `resolved` is the map exposed to callers. Split so tests
 * (or a future re-resolve) can inspect the intermediate step.
 */
function buildTypeMap(): Map<string, string[]> {
  const rawAliases = new Map<string, { literals: string[]; refs: string[] }>();

  for (const file of collectDtsFiles(FORGE_ESM_ROOT)) {
    let source: string;
    try {
      source = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const match of source.matchAll(TYPE_ALIAS_RE)) {
      const [, name, rhs] = match;
      // Prefer the first declaration we see; skip if we already have one so a
      // later, less-informative alias doesn't overwrite a good match.
      if (rawAliases.has(name)) continue;
      const parsed = parseUnion(rhs);
      if (!parsed.literals.length && !parsed.refs.length) continue;
      rawAliases.set(name, parsed);
    }
  }

  // Resolve refs one level deep. `ButtonTheme = Theme | 'app-bar'` becomes
  // the union of Theme's literals + ['app-bar']. If a ref points to something
  // unresolvable, the containing alias is dropped — a partial value list
  // would be worse than showing nothing.
  const resolved = new Map<string, string[]>();
  for (const [name, { literals, refs }] of rawAliases) {
    const values = [...literals];
    let ok = true;
    for (const ref of refs) {
      const target = rawAliases.get(ref);
      if (!target || target.refs.length > 0) {
        // Missing ref, or a chain deeper than one level — bail on this alias.
        ok = false;
        break;
      }
      values.push(...target.literals);
    }
    if (ok && values.length >= 2) resolved.set(name, values);
  }

  return resolved;
}

const typeValues = buildTypeMap();

export function resolveTypeValues(typeText: string): string[] | undefined {
  // The CEM sometimes wraps the type text in parens or spaces; a bare
  // identifier is the only shape we resolve. `Foo | Bar` isn't a named type
  // we can look up, so callers should only hit this with names.
  const trimmed = typeText.trim();
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) return undefined;
  return typeValues.get(trimmed);
}

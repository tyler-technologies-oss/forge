#!/usr/bin/env node
// PreToolUse hook for Edit/Write/MultiEdit.
//
// Two layers of enforcement:
//   1. Gates — Forge markup writes require an earlier get_forge_blocks and,
//      for non-trivial UIs, a passing validate_ui_plan call this turn.
//   2. Content-level checks — regex-level rejections for the concrete
//      anti-patterns cataloged in references/anti-patterns.md
//      (typography-as-hierarchy, hN inside forge-card, non-token spacing,
//      div-playing-forge-component, wrong icon import, missing side-effect
//      imports for subpath-only components).
//
// Exit 2 = block (stderr message surfaces to the model); exit 0 = allow.
// Fail-open on malformed payloads so a future harness change doesn't wedge writes.
import { readFileSync } from 'node:fs';

const BLOCKS_TOOL_NAMES = [
  'mcp__plugin_forge_forge__get_forge_blocks',
  'get_forge_blocks',
];
const PLAN_VALIDATE_TOOL_NAMES = [
  'mcp__plugin_forge_forge__validate_ui_plan',
  'validate_ui_plan',
];
const FORGE_TAG_RE = /<forge-[a-z0-9-]+\b/i;
// Components published only via `@tylertech/forge/<name>` subpaths (not
// registered by the root barrel), so they need a side-effect import.
const SUBPATH_ONLY_TAGS = new Set([
  'forge-busy-indicator',
  'forge-confirmation-dialog',
  'forge-count-card',
  'forge-multi-select-header',
  'forge-quantity-field',
  'forge-responsive-toolbar',
  'forge-structured-card',
  'forge-app-layout',
  'forge-user-profile',
  'forge-app-launcher',
  'forge-content-scaffold',
  'forge-footer',
  'forge-theme-toggle',
]);

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function extractWriteContent(payload) {
  const tool = payload.tool_name || payload.tool || '';
  const input = payload.tool_input || payload.input || {};
  const parts = [];
  const filePath =
    input.file_path || input.path || input.filePath || input.filename || '';

  if (typeof input.content === 'string') {
    parts.push(input.content);
  }
  if (typeof input.new_string === 'string') {
    parts.push(input.new_string);
  }
  if (Array.isArray(input.edits)) {
    for (const edit of input.edits) {
      if (edit && typeof edit.new_string === 'string') {
        parts.push(edit.new_string);
      }
    }
  }
  return { tool, text: parts.join('\n'), filePath: String(filePath) };
}

// Load "this turn" of transcript: JSONL lines since the last user message.
function loadTurnLines(transcriptPath) {
  if (!transcriptPath) {
    return [];
  }
  let raw;
  try {
    raw = readFileSync(transcriptPath, 'utf8');
  } catch {
    return [];
  }

  const lines = raw.split('\n');
  let lastUserIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) {
      continue;
    }
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    const role = entry.role || entry.message?.role || entry.type;
    if (role === 'user' || entry.type === 'user') {
      lastUserIdx = i;
      break;
    }
  }
  return lines.slice(lastUserIdx >= 0 ? lastUserIdx : 0);
}

function scanForTool(turnLines, needles) {
  for (const line of turnLines) {
    if (!line) {
      continue;
    }
    for (const needle of needles) {
      if (line.includes(needle)) {
        return true;
      }
    }
  }
  return false;
}

// Look for a validate_ui_plan tool_result that contains {"valid": true}.
// The renderer emits a machine-readable JSON block including this key, so
// substring match is sufficient without a full parse.
function scanForPassingPlan(turnLines) {
  let sawCall = false;
  for (const line of turnLines) {
    if (!line) {
      continue;
    }
    const isCall = PLAN_VALIDATE_TOOL_NAMES.some(n => line.includes(n));
    if (isCall) {
      sawCall = true;
    }
    // Match either the JSON `"valid": true` block or the rendered header line.
    if (
      sawCall &&
      (line.includes('"valid": true') || line.includes('**Valid:** ✅ true'))
    ) {
      return true;
    }
  }
  return false;
}

// Rough tag-content extraction: for each opening <forge-*> tag, return the
// tag name plus a slice of text up to the matching closing tag or the next
// forge tag. Not a full HTML parser — sufficient for pattern-matching the
// specific anti-patterns we care about.
function extractForgeSpans(text) {
  const spans = [];
  const re = /<(forge-[a-z0-9-]+)\b([^>]*)>/gi;
  let match;
  while ((match = re.exec(text)) !== null) {
    const tag = match[1].toLowerCase();
    const attrs = match[2];
    const start = match.index + match[0].length;
    const closeRe = new RegExp(`</${tag}\\s*>`, 'i');
    closeRe.lastIndex = start;
    const rest = text.slice(start);
    const closeMatch = closeRe.exec(rest);
    const inner = closeMatch
      ? rest.slice(0, closeMatch.index)
      : rest.slice(0, 2000);
    spans.push({ tag, attrs, inner, openIdx: match.index });
  }
  return spans;
}

// The concrete checks.
function checkContent(text, filePath) {
  const violations = [];

  const isJsLike = /\.(ts|tsx|js|jsx|mjs|cjs)$/i.test(filePath);
  const isMarkupLike =
    /\.(html?|vue|svelte|astro|njk|hbs|jsx|tsx)$/i.test(filePath) ||
    /<forge-/i.test(text);

  // 1. Icon import path — wrong subpaths.
  const badIconImport =
    /from\s+['"]@tylertech\/tyler-icons\/(standard|extended|core)[^'"]*['"]/i;
  if (badIconImport.test(text)) {
    violations.push({
      rule: 'icon-import-path',
      msg: 'Icons must be imported from @tylertech/tyler-icons root only. Subpaths (/standard, /extended, /core) do not exist. See references/icon.md.',
    });
  }

  // 2. Subpath-only components require side-effect imports. If the file uses
  //    any of these tags and the file is JS/TS, look for a matching import.
  if (isJsLike) {
    for (const tag of SUBPATH_ONLY_TAGS) {
      const usedRe = new RegExp(`<${tag}\\b`, 'i');
      if (!usedRe.test(text)) {
        continue;
      }
      const subpath = tag.replace(/^forge-/, '');
      const sideEffectRe = new RegExp(
        `import\\s+['"]@tylertech\\/forge\\/${subpath}['"]`,
      );
      if (!sideEffectRe.test(text)) {
        violations.push({
          rule: 'subpath-side-effect-import',
          msg: `<${tag}> requires a side-effect import: import '@tylertech/forge/${subpath}'; — see references/installation.md.`,
        });
      }
    }
  }

  if (!isMarkupLike) {
    return violations;
  }

  const spans = extractForgeSpans(text);

  // 3. hN directly inside forge-card / forge-structured-card body.
  for (const span of spans) {
    if (span.tag !== 'forge-card' && span.tag !== 'forge-structured-card') {
      continue;
    }
    // h1/h2 inside cards violate hierarchy. h3+ is fine.
    const heavyHeadingRe = /<h[12]\b/i;
    if (heavyHeadingRe.test(span.inner)) {
      violations.push({
        rule: 'card-heading-hierarchy',
        msg: `<h1>/<h2> inside <${span.tag}> — cards must not host page-level headings. Use <h3> or lower and text-heading3. See references/typography.md and references/anti-patterns.md.`,
      });
    }
  }

  // 4. Typography classes used as pseudo-headings.
  //    Match: <div class="... body2 ...">Text</div> that looks like a title —
  //    heuristic: body2/caption/label{1..3} on a <div> or <span> immediately
  //    followed by another div with body-role text, all inside a forge-card.
  for (const span of spans) {
    if (span.tag !== 'forge-card') {
      continue;
    }
    const bodyAsHeading =
      /<(div|span)\b[^>]*class=["'][^"']*\b(forge-typography--(body|caption|label)|text-(body|caption|label))\d*\b[^"']*["'][^>]*>[^<]{2,80}<\/(div|span)>\s*<(div|span)\b[^>]*class=["'][^"']*\b(forge-typography--body|text-body)/i;
    if (bodyAsHeading.test(span.inner)) {
      violations.push({
        rule: 'typography-as-hierarchy',
        msg: `Typography class used as pseudo-heading inside <forge-card>. Use <forge-structured-card> with slot="title" and slot="subtitle" instead. See references/anti-patterns.md#typography-classes-used-to-fake-hierarchy.`,
      });
      break;
    }
  }

  // 5. Div playing card/dialog/drawer (no forge equivalent used in the file).
  const roleDialog = /<div\b[^>]*role=["']dialog["']/i;
  if (roleDialog.test(text) && !/<forge-dialog\b/i.test(text)) {
    violations.push({
      rule: 'div-playing-forge-component',
      msg: '<div role="dialog"> — use <forge-dialog> instead. See references/dialog.md.',
    });
  }
  const divCardClass =
    /<div\b[^>]*class=["'][^"']*\b(card|modal|drawer|sidesheet)\b[^"']*["']/i;
  if (
    divCardClass.test(text) &&
    !/<forge-(card|structured-card|dialog|drawer|modal-drawer|bottom-sheet)\b/i.test(
      text,
    )
  ) {
    violations.push({
      rule: 'div-playing-forge-component',
      msg: 'A <div> is styled as a card/modal/drawer without a matching <forge-*> component. Use the Forge component. See references/card.md, references/dialog.md, references/drawer.md.',
    });
  }

  // 6. No inline styles anywhere in Forge-touching markup. Strict rule —
  //    inline styles bypass theming, density, and token migrations. The only
  //    tolerated exception is the required <body> app-shell styles.
  const inlineStyleRe =
    /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\sstyle=["']([^"']+)["']/gi;
  let inlineMatch;
  while ((inlineMatch = inlineStyleRe.exec(text)) !== null) {
    const elTag = inlineMatch[1].toLowerCase();
    const styleValue = inlineMatch[2];
    // Allow the documented body app-shell styles (height/width/margin/background).
    if (elTag === 'body') {
      const bodyAllowed =
        /^(?:\s*(?:background(?:-color)?|height|width|margin)\s*:[^;]+;?\s*)+$/i;
      if (bodyAllowed.test(styleValue)) {
        continue;
      }
    }
    violations.push({
      rule: 'no-inline-styles',
      msg: `Inline style on <${elTag}>: "${styleValue.trim()}". NEVER use the style attribute — use a stylesheet class or Forge design tokens (var(--forge-spacing-*), var(--forge-theme-*)). See references/anti-patterns.md and references/spacing.md.`,
    });
    break;
  }

  // 7. CSS class on <forge-*> element (Shadow DOM: styling from outside is
  //    ineffective, indicates a misunderstanding).
  for (const span of spans) {
    const classAttr = /class=["']([^"']+)["']/i.exec(span.attrs);
    if (!classAttr) {
      continue;
    }
    // Allow utility classes for layout that DO work (positioning of the host).
    // Reject the common "trying to style internals" pattern: forge-*.
    const classes = classAttr[1].split(/\s+/);
    const shadowClasses = classes.filter(c =>
      /^(forge-button--|forge-card--|forge-typography--)/.test(c),
    );
    if (shadowClasses.length > 0) {
      violations.push({
        rule: 'css-class-on-forge-element',
        msg: `<${span.tag}> has class="${shadowClasses.join(' ')}" — Forge components use Shadow DOM; internal styling classes on the host element are ineffective. Use component props/slots or a wrapper div. See SKILL.md top-level rules.`,
      });
      break;
    }
  }

  return violations;
}

function block(messages) {
  process.stderr.write(messages.join('\n') + '\n');
  process.exit(2);
}

function allow() {
  process.exit(0);
}

function main() {
  const raw = readStdin();
  if (!raw.trim()) {
    allow();
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    allow();
    return;
  }

  const { tool, text, filePath } = extractWriteContent(payload);
  if (!/^(Edit|Write|MultiEdit)$/.test(tool)) {
    allow();
  }
  if (!text) {
    allow();
  }

  const hasForgeMarkup = FORGE_TAG_RE.test(text);
  const contentViolations = checkContent(text, filePath);

  // Only Forge-touching writes are gated by blocks/plan; content violations
  // may still fire for pure JS/TS (e.g. wrong icon import).
  if (!hasForgeMarkup && contentViolations.length === 0) {
    allow();
  }

  const messages = [];
  const transcriptPath = payload.transcript_path || payload.transcriptPath;
  const turnLines = loadTurnLines(transcriptPath);

  if (hasForgeMarkup) {
    const blocksFetched = scanForTool(turnLines, BLOCKS_TOOL_NAMES);
    if (!blocksFetched) {
      messages.push(
        "Forge UI rule violation: you're writing <forge-*> markup without first calling get_forge_blocks this turn.",
        '',
        'Before writing Forge UI, call get_forge_blocks to ground the markup in an existing block. Extract the specific pattern you need — do not reinvent structure.',
      );
    }

    // Composition-scale writes require a passing plan: >= 2 forge tags OR a
    // structural component (scaffold, app-bar, app-layout, drawer, dialog,
    // table, structured-card).
    const forgeTagCount = (text.match(/<forge-[a-z0-9-]+\b/gi) || []).length;
    const isCompositionScale =
      forgeTagCount >= 2 ||
      /<forge-(scaffold|app-bar|app-layout|drawer|dialog|table|structured-card)\b/i.test(
        text,
      );
    if (isCompositionScale) {
      const planPassed = scanForPassingPlan(turnLines);
      if (!planPassed) {
        messages.push(
          '',
          'Forge UI rule violation: composition-scale Forge markup requires a PASSING validate_ui_plan this turn.',
          '',
          'Before writing multi-component Forge UI:',
          '  1. Call generate_ui_plan(description: "...") to get the plan template.',
          '  2. Fill in the plan and call validate_ui_plan(plan: <object>).',
          '  3. If validate_ui_plan returns valid=false, fix the errors and re-validate.',
          '  4. Only after valid=true, fetch blocks and write markup.',
          '',
          'See references/ui-plan.md.',
        );
      }
    }
  }

  if (contentViolations.length > 0) {
    if (messages.length > 0) {
      messages.push('');
    }
    messages.push('Content-level violations:');
    for (const v of contentViolations) {
      messages.push(`  - [${v.rule}] ${v.msg}`);
    }
  }

  if (messages.length > 0) {
    block(messages);
  }

  allow();
}

main();

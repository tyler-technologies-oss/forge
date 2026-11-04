#!/usr/bin/env node
// Stop hook. Fires when the model tries to end its turn.
//
// Purpose: catch turns that wrote Forge markup but never called
// validate_component_api on it. Post-generation API validation is one of
// the "always" rules — this hook is the deterministic backstop for it.
//
// Behavior:
//   - Scan the transcript back to the last user message.
//   - Collect every Forge tag written by Edit/Write/MultiEdit this turn.
//   - Collect every component argument passed to validate_component_api this turn.
//   - If any tag was written but never validated, block the stop with a
//     specific list of tags still to validate.
//   - Cap the loop at 2 rounds via a marker in the transcript so a broken
//     validator can't wedge the turn indefinitely.
//
// Exit 2 = block; exit 0 = allow the stop.
// Fail-open on unusable input.

import { readFileSync } from 'node:fs';

const VALIDATE_TOOL_NAMES = new Set([
  'mcp__plugin_forge_forge__validate_component_api',
  'validate_component_api',
]);
const WRITE_TOOL_NAMES = new Set(['Edit', 'Write', 'MultiEdit']);
const FORGE_TAG_RE = /<(forge-[a-z0-9-]+)\b/gi;
const MAX_STOP_BLOCKS = 2;

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function block(message) {
  process.stderr.write(message + '\n');
  process.exit(2);
}

function allow() {
  process.exit(0);
}

function loadTranscript(transcriptPath) {
  if (!transcriptPath) {
    return null;
  }
  try {
    return readFileSync(transcriptPath, 'utf8').split('\n');
  } catch {
    return null;
  }
}

function findLastUserIdx(lines) {
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
      return i;
    }
  }
  return -1;
}

// Pull Forge tags out of Edit/Write/MultiEdit tool_use entries.
function collectWrittenTags(entry, tagsWritten) {
  const toolUses = extractToolUses(entry);
  for (const use of toolUses) {
    if (!WRITE_TOOL_NAMES.has(use.name)) {
      continue;
    }
    const input = use.input || {};
    const chunks = [];
    if (typeof input.content === 'string') {
      chunks.push(input.content);
    }
    if (typeof input.new_string === 'string') {
      chunks.push(input.new_string);
    }
    if (Array.isArray(input.edits)) {
      for (const e of input.edits) {
        if (e && typeof e.new_string === 'string') {
          chunks.push(e.new_string);
        }
      }
    }
    const text = chunks.join('\n');
    let m;
    FORGE_TAG_RE.lastIndex = 0;
    while ((m = FORGE_TAG_RE.exec(text)) !== null) {
      tagsWritten.add(m[1].toLowerCase());
    }
  }
}

function collectValidatedTags(entry, tagsValidated) {
  const toolUses = extractToolUses(entry);
  for (const use of toolUses) {
    if (!VALIDATE_TOOL_NAMES.has(use.name)) {
      continue;
    }
    const input = use.input || {};
    if (typeof input.component === 'string') {
      tagsValidated.add(input.component.toLowerCase());
    }
  }
}

// Tool-use call sites vary in shape between harness versions; try the
// common places without failing.
function extractToolUses(entry) {
  const out = [];
  const push = (name, input) => {
    if (typeof name === 'string' && name) {
      out.push({ name, input });
    }
  };

  if (entry.type === 'tool_use') {
    push(entry.name || entry.tool, entry.input);
  }
  if (entry.tool_name) {
    push(entry.tool_name, entry.tool_input);
  }

  const content = entry.message?.content;
  if (Array.isArray(content)) {
    for (const c of content) {
      if (c && c.type === 'tool_use') {
        push(c.name, c.input);
      }
    }
  }
  return out;
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

  const transcriptPath = payload.transcript_path || payload.transcriptPath;
  const lines = loadTranscript(transcriptPath);
  if (!lines) {
    allow();
  }

  const lastUserIdx = findLastUserIdx(lines);
  const start = lastUserIdx >= 0 ? lastUserIdx : 0;

  const tagsWritten = new Set();
  const tagsValidated = new Set();
  let stopBlocks = 0;

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trim()) {
      continue;
    }
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    collectWrittenTags(entry, tagsWritten);
    collectValidatedTags(entry, tagsValidated);
    // Count how many times this hook already blocked in this turn.
    if (
      typeof line === 'string' &&
      line.includes('forge-stop-hook-block-marker')
    ) {
      stopBlocks++;
    }
  }

  if (tagsWritten.size === 0) {
    allow();
  }

  const missing = [...tagsWritten].filter(t => !tagsValidated.has(t));
  if (missing.length === 0) {
    allow();
  }

  if (stopBlocks >= MAX_STOP_BLOCKS) {
    // Cap the loop. Emit a visible note but let the turn end so the user
    // can intervene if the validator itself is misbehaving.
    process.stderr.write(
      `forge-stop-hook: giving up after ${MAX_STOP_BLOCKS} attempts; unvalidated tags: ${missing.join(', ')}\n`,
    );
    allow();
  }

  block(
    [
      // The marker below lets this hook count its own past interventions.
      'forge-stop-hook-block-marker',
      'Forge validation gate: you wrote Forge markup but did not call validate_component_api for the following tags this turn:',
      ...missing.map(t => `  - ${t}`),
      '',
      'Call validate_component_api once per Forge tag before finishing. Pass the tag as `component` and the properties/attributes/events/methods/slots you used as `apis`.',
    ].join('\n'),
  );
}

main();

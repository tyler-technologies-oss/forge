# Forge Plugin — UI Consistency Guardrails Plan

**Goal:** Force the Forge plugin to produce 100% consistent UIs — same layout skeleton, same typography hierarchy, same component picks, same composition — across every generation, regardless of prompt wording.

**Approach:** The current plugin gives the model good *advice*; consistency needs *enforcement*. We layer three things on top of what already exists: (1) a skill re-architected around progressive disclosure and decision gates, (2) a plan-validate-execute flow that turns generation into a checkable artifact, and (3) hooks that reject non-conforming output at the tool boundary.

---

## 1. Current state — what we have and what's missing

### What the plugin already does well
- **12 MCP tools** covering components, tokens, blocks, icons, framework setup, and post-hoc validation (`validate_component_api`).
- **`get_forge_blocks`** — pre-built compositions fetched from the remote catalogue. This is the strongest single guardrail we ship.
- **`plugin/skills/forge-design/`** with ~100 sibling reference files (per-component + topical: `typography.md`, `spacing.md`, `layout.md`, `forms.md`, `tables.md`, `anti-patterns.md`, etc.). The reference set is comprehensive.
- **One PreToolUse hook** (`forge-pretooluse.mjs`) that blocks `Edit|Write|MultiEdit` on Forge markup unless `get_forge_blocks` was called earlier in the turn.
- **Anti-patterns doc** already catalogs the important failures (typography-classes-as-hierarchy, ad-hoc grids, inline styles, reinvented markup).

### Where consistency leaks in today
| Leak | Consequence |
|---|---|
| SKILL.md is 18 KB of prose — model reads it once, then drifts as the task grows. | Rules ignored on turn 3+. |
| The one hook only checks that `get_forge_blocks` was *called* — not that output *matches* a block, uses correct slots, or avoids raw typography classes. | Model calls the tool, then writes freehand markup anyway. |
| No planning artifact — the model goes from prompt → HTML in one step. | Nothing to validate against; each generation reinvents composition. |
| `validate_component_api` is post-hoc and manually invoked. | Nothing forces it to actually run before finalizing. |
| Typography, spacing, and layout rules are prose ("cards should never compete with page-level headings"), not machine-checkable. | Rules survive as vibes, not constraints. |
| No enforced page skeleton. Every generation freehand-picks page structure. | Two similar prompts produce structurally different pages. |
| SKILL.md itself is loaded per-turn once triggered — 18 KB is ~4,500 tokens of recurring cost, but the leaf files (~100 more) still get loaded ad hoc. | High baseline cost with low enforcement per token. |

---

## 2. Techniques worth stealing (from research)

### From the Angular skill (progressive disclosure done right)
- **SKILL.md as a router, not a manual.** ~130 lines, all bullets ending in `Read [x.md]`. Every domain has a labeled one-liner and a leaf file.
- **Conditional load gates** — "When building X, consult Y." e.g. "Only load `angular-aria.md` when building an Accordion, Listbox, Combobox, Menu, Tabs, Toolbar, Tree, Grid."
- **Numbered `Step N / IF / Command:` execution ladders** — no LLM inference on procedural choices.
- **Verification gate at the end** — `ng build` after generation, "do not skip this step."
- **Per-reference file structure**: intro → canonical example → options table → best practices → core-concepts glossary. Consistency in the *references themselves* means the model learns to skim them predictably.

### From Anthropic's skill-authoring docs
- **Three-tier loading**: metadata → SKILL.md → bundled files. SKILL.md should be **under 500 lines**; every line is a recurring per-turn cost.
- **References must be one level deep** — deeper chains get `head -100`'d and silently truncated.
- **Files >100 lines need a table of contents** at the top.
- **Split by domain, not by size.**
- **Bundle scripts, not generated code** — script output is cheap; the script body doesn't consume tokens.
- **Skill descriptions max 1,536 chars, truncated from the end** — front-load the trigger vocab.

### From other design-system MCPs
- **shadcn/ui** — registry + CLI-mediated writes: the LLM picks what, deterministic code writes the file. Delegates composition to blocks.
- **MUI MCP** — **URL-only chaining rule**: agent may only fetch docs for identifiers returned by a previous tool call. Cuts hallucinated component names to zero.
- **Figma Dev Mode MCP** — **variable code syntax**: token names map to the exact codebase identifier. "The context we exclude is just as important as what we provide."
- **Anthropic frontend-design skill** — names AI-default clichés explicitly ("cream + serif + terracotta", "acid-green on black") so the model can recognize its own defaults and reject them.

### General guardrail patterns
- **Plan → validate → execute** — model emits a machine-checkable plan first, validator confirms, then render.
- **`disable-model-invocation: true`** on high-stakes skills — forces `/skill` invocation instead of ambient calls.
- **Explicit strict/flexible split** — "ALWAYS use exactly this template" vs "sensible default, use judgment." Both are legitimate; conflation is the failure mode.
- **Feedback loop pattern** — validator → fix → repeat. Documented as "greatly improves output quality."
- **"MUST" language + hook backstop** — stronger prose + deterministic enforcement, not longer rule lists. Anthropic: "if a skill seems to stop influencing behavior, the fix is a hook, not more rules."

### Anti-patterns to avoid
- Big rule lists — get ignored.
- Deep reference nesting — silently truncated.
- Too many options ("you can use A, B, or C") — worse picks than "use A. For X, use B."
- Time-sensitive prose ("before August 2025…") — rots.
- First-person descriptions ("I can help you…") — hurts trigger matching.
- Voodoo constants — magic numbers the model can't reason about.
- Writing skills from imagination — Anthropic recommends **eval-first**: build 3 evals, measure baseline, then write the minimum to close the gap.

---

## 3. Target architecture

Three layers, each independently useful, together giving 100% consistency:

```
   Layer 1: SKILL as router  →  narrow, always-loaded guidance
   Layer 2: Plan-validate-execute  →  generation becomes a checkable artifact
   Layer 3: Hook enforcement  →  deterministic backstop at the tool boundary
```

### Layer 1 — Rewrite `SKILL.md` as a router

Cut SKILL.md from 18 KB to **≤200 lines**. Every bullet ends in `Read references/x.md`. Group by decision, not topic:

- **Kickoff decision tree** (numbered steps): full-app vs feature → styling mode (Tailwind vs CSS vars) → pick a scaffold block. Written as `Step N / IF / Command:` blocks — no inference.
- **Domain routers**: Layout, Typography, Components, Composition, Forms, Tables, Icons, Framework setup. One line each, one leaf file each.
- **Conditional load gates**:
  - "When building a data table, read `references/tables.md`."
  - "When building an app shell, read `references/app-layout.md` and pick a scaffold block *before* writing markup."
  - "When picking heading levels inside a card, read `references/typography.md#card-hierarchy`."
- **Anti-pattern catalog inlined at the top** — the "Forge defaults to avoid" list (custom flex row of divs, hand-rolled dialog, `body2` class as subheading, arbitrary margins in place of spacing tokens). Named, quotable, short.
- **Ends with the verification gate** — mandatory `validate_component_api` + hook contract, "do not skip."

Each leaf reference file follows the Angular skill's per-file template: intro → canonical block → options table → best practices → glossary. TOC at the top of any file >100 lines.

### Layer 2 — Plan-validate-execute

New MCP tool: **`generate_ui_plan`**. Input: user's UI request. Output: a JSON artifact:

```json
{
  "page_type": "list-detail",
  "scaffold_block_id": "app-scaffold-with-side-nav",
  "regions": {
    "header": { "component": "forge-app-bar", "slots": {...} },
    "nav":    { "component": "forge-drawer", "items": [...] },
    "main":   { "block_id": "data-list", "components": [...] }
  },
  "typography": {
    "page_title": "text-heading5",
    "section_headings": "text-heading3"
  },
  "spacing_scale": "tokens-only",
  "icons": ["tyler-icons:filter_list", "tyler-icons:search"]
}
```

New tool: **`validate_ui_plan`** — runs deterministic checks against the plan:
- Every component name exists in the CEM.
- Every scaffold/block ID exists in the block catalogue.
- Typography roles come from a fixed enum (no `body2` as a heading).
- Spacing values are tokens, not raw px/rem.
- Icon names exist in `@tylertech/tyler-icons`.
- Composition rules: no `<h1>` inside a card, forms use `forge-field`, tables use `forge-table` not custom `<table>`.

Only after `validate_ui_plan` passes does the model write markup. The **plan is the contract**; the markup must derive from it.

The SKILL.md kickoff decision tree ends with: "Call `generate_ui_plan`. Then `validate_ui_plan`. Only then write code."

### Layer 3 — Hook enforcement

Expand the existing PreToolUse hook (`forge-pretooluse.mjs`) from "did the model call `get_forge_blocks`?" to content-level checks. Also add a PostToolUse / Stop hook.

**PreToolUse checks on `Edit|Write|MultiEdit`** (rejects if):
- Forge markup present AND no validated plan in the transcript.
- Raw pixel/rem values inside inline `style=` attributes on Forge components (accept only `var(--forge-*)` tokens).
- Bare `<h1>`/`<h2>`/`<h3>` immediately inside `<forge-card>` (violates card hierarchy).
- Typography utility classes (`body2`, `caption`, etc.) used as pseudo-headings on `<h*>` or heading-role elements.
- `<div>` styled as a card/dialog/drawer (heuristic: `role="dialog"` or class names matching `card|modal|dialog|drawer` when no `<forge-*>` equivalent used).
- Icons imported from anywhere other than `@tylertech/tyler-icons` root.
- Missing `@tylertech/forge/<name>` side-effect imports when using subpath-only components.
- Missing required body styles (`height:100dvh; width:100dvw`) in generated app shells.

**PostToolUse / Stop hook**: after generation finishes, auto-invoke `validate_component_api` on the touched files. If violations, feed them back into the loop (validator → fix → repeat pattern).

Hook design principle: **fail with an actionable message**. Not "invalid markup" but "`<h1>` inside `<forge-card>` — cards should not host page-level headings; use `text-heading3` on an `<h3>` slot; see `references/typography.md#card-hierarchy`."

### The URL-only chaining rule

Add to SKILL.md, top-level: "You may only use component tag names, block IDs, and icon names that were returned by a prior tool call in this turn. Do not invent names. If you need a component you haven't seen, call `list_components` or `find_components` first."

This is the MUI MCP rule; it costs nothing and eliminates hallucinated components.

---

## 4. Enforcement matrix — what catches what

| Consistency axis | Layer 1 (skill) | Layer 2 (plan) | Layer 3 (hook) |
|---|---|---|---|
| Correct component choice | Router points to `list_components` / `find_components` | Plan lists components by tag, validator confirms they exist | Hook rejects unknown `<forge-*>` tags |
| Layout skeleton | "Start from a scaffold block" step | Plan requires `scaffold_block_id` | Hook rejects Forge markup without a plan citing a scaffold |
| Typography hierarchy | Load `typography.md` on any heading decision | Plan pins `page_title` / `section_headings` to enum values | Hook rejects `<h1>` in card, `body2` on headings |
| Spacing tokens | "Never use raw px/rem" in anti-pattern list | Plan's `spacing_scale: tokens-only` flag | Hook rejects raw px/rem in `style=` |
| Component composition | Load `composition.md` on multi-component features | Plan captures slot/child relationships | Hook rejects `<div class="card">` when `<forge-card>` fits |
| Icon usage | `setup_icons` / `find_icons` step | Plan lists icon names, validator confirms | Hook rejects non-`@tylertech/tyler-icons` imports |
| Reinvented markup | Anti-pattern list inlined | Validator flags block-adjacent freehand | Hook heuristics on `role="dialog"` etc. |

Every axis has coverage at ≥2 layers — no single-point failure.

---

## 5. Phased rollout

**Phase 0 — Evals first (per Anthropic best-practice).**
- Pick 5–10 representative prompts ("build a dashboard", "make a settings form", "show me a data table with filters", "app shell with side nav", …).
- Run each with the current plugin, save the output HTML.
- Score by hand against the consistency axes above. This baseline is what we're improving.
- Time cost: ~1 day. Everything after this is measurable.

**Phase 1 — SKILL.md rewrite (router pattern).**
- Reshape `plugin/skills/forge-design/SKILL.md` from 18 KB prose to ≤200-line router.
- No new tools, no new hooks. Existing references stay in place; SKILL.md just links them better.
- Add TOCs to any leaf file >100 lines.
- Add the URL-only chaining rule.
- Add the named anti-pattern list up top.
- Re-run evals; measure delta.

**Phase 2 — Hook expansion.**
- Extend `plugin/hooks/forge-pretooluse.mjs` with the content-level checks listed in Layer 3.
- Add a Stop hook that runs `validate_component_api` and re-prompts on failure.
- Each check ships with a specific error message pointing to a reference file.
- Re-run evals.

**Phase 3 — Plan-validate-execute.**
- Add `generate_ui_plan` and `validate_ui_plan` MCP tools (`src/tools/plan/`).
- Update SKILL.md kickoff to require the plan step before markup.
- Wire the plan into the PreToolUse hook (reject Forge markup without a validated plan in transcript).
- Re-run evals.

**Phase 4 — Optional: `disable-model-invocation` for `/forge:generate-block`.**
- User has to type the slash command for high-stakes generation.
- Ambient mentions still get advisory guidance via the skill; only explicit invocation triggers the full guarded pipeline.

---

## 6. Open questions to resolve during Phase 0

- Should the plan artifact live in the transcript, or in a scratch file (`plan.forge.json`) the model writes and the validator reads? File is easier for the hook to inspect.
- How strict is "tokens-only" — do we allow `0` and `100%`, or only `var(--forge-*)`?
- What's the exact list of allowed typography roles? (Needs cross-check with `templates/design-tokens/typography.md`.)
- Do we ship a `/forge:validate` slash command as a manual escape hatch?
- Do we support "override" comments (`{/* forge-lint-disable: card-heading */}`) or is that a slippery slope?

---

## 7. Explicit non-goals

- **Not** shipping a linter for hand-written non-Forge HTML in the codebase — scope is only markup the model generates via Edit/Write/MultiEdit.
- **Not** trying to enforce design creativity or "taste" — we're enforcing conformance to the system, not aesthetics beyond it.
- **Not** blocking the model from ever writing custom CSS — only from writing custom CSS *in place of* a Forge component or token that fits.
- **Not** rewriting the existing reference files unless a Phase 0 eval flags a specific one as unclear.

---

## Appendix — Key references consulted

- Angular skill: `/Users/nick.andrews@tylertech.com/.agents/skills/angular-developer/SKILL.md` and its 37 `references/*.md` files.
- Forge skill: `plugin/skills/forge-design/SKILL.md` + `references/`, `plugin/hooks/forge-pretooluse.mjs`.
- Anthropic Skills docs: `code.claude.com/docs/en/skills`, `platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices`.
- shadcn MCP: `ui.shadcn.com/docs/mcp`.
- MUI MCP: `mui.com/material-ui/getting-started/mcp/`.
- Figma Dev Mode MCP: `figma.com/blog/introducing-figmas-dev-mode-mcp-server/`.
- Anthropic `frontend-design` skill (single-file, anti-pattern-named).

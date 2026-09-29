# UI Plan Contract

**In this file:**
- [Purpose](#purpose)
- [When to use](#when-to-use)
- [Plan shape](#plan-shape)
- [Field reference](#field-reference)
- [Validation rules](#validation-rules)
- [Failure modes and how to fix them](#failure-modes-and-how-to-fix-them)
- [Worked example](#worked-example)

## Purpose

The UI plan is the **contract your markup must match**. It pins the scaffold block, region components, typography roles, spacing scale, and icon names before you write a single line of HTML. This turns generation from "prose → markup" into "plan → validate → markup," which is the only way to get 100% consistency across turns.

Two MCP tools own this contract:

- `generate_ui_plan` — takes a description of the target UI and returns a plan JSON.
- `validate_ui_plan` — verifies every field against the component-explorer manifest (CEM), the block catalogue, the token roles, and the icon set.

**Markup must not be written until `validate_ui_plan` returns `{ valid: true }`.** The PreToolUse hook will reject `<forge-*>` writes that are not preceded by a passing plan this turn.

## When to use

- **Any full-page UI** (dashboard, list-detail, settings screen, form flow).
- **Any UI with more than one Forge component** in composition.
- **Any UI that uses a scaffold block** — the plan pins which block.

Skip the plan step for **single-component edits** (e.g. "change this button label", "swap the icon"). One-line changes do not benefit from the contract.

## Plan shape

```json
{
  "page_type": "list-detail",
  "scaffold_block_id": "src/blocks/application-layout/app-scaffold-with-side-nav",
  "regions": {
    "header": {
      "component": "forge-app-bar",
      "children": [
        { "component": "forge-app-bar-menu-button" },
        { "component": "forge-app-bar-profile-button" }
      ]
    },
    "nav": {
      "component": "forge-drawer",
      "children": [{ "component": "forge-list" }]
    },
    "main": {
      "block_id": "src/blocks/tables/data-list",
      "components": ["forge-table", "forge-paginator", "forge-toolbar"]
    }
  },
  "typography": {
    "page_title": "text-heading5",
    "section_headings": "text-heading3",
    "body": "text-body1"
  },
  "spacing_scale": "tokens-only",
  "icons": ["filter_list", "search", "more_vert"]
}
```

## Field reference

| Field | Purpose | Constraint |
|---|---|---|
| `page_type` | Category of screen (`dashboard`, `list-detail`, `form`, `settings`, `single-feature`). | Fixed enum. |
| `scaffold_block_id` | The block that owns the outer structure. | Must exist in the manifest. |
| `regions.header/nav/main/footer` | Which Forge component owns each region. | Each `component` must exist in the CEM. |
| `regions.*.block_id` | Optional: nested block for that region. | Must exist in the manifest. |
| `regions.*.components` | All Forge tags used inside that region. | Must all exist in the CEM. |
| `typography.page_title` | Type role for the primary page heading. | Fixed enum (`text-heading{1..8}`, `text-display{1..8}`). |
| `typography.section_headings` | Type role for section headings inside main. | Same enum. |
| `typography.body` | Body text role. | `text-body{1..4}`. |
| `spacing_scale` | `tokens-only` (required for production UIs). | Fixed enum. |
| `icons` | Icon names, without the `tylIcon`/`forge-icon` prefix. | Each must exist in `@tylertech/tyler-icons`. |

## Validation rules

`validate_ui_plan` runs these checks:

1. **Component existence** — every `component` in every region resolves to a CEM entry.
2. **Block existence** — every `block_id` / `scaffold_block_id` resolves in the block manifest.
3. **Typography role enum** — every typography value is a known Forge type role. `body2`, `caption`, and raw font-sizes are rejected.
4. **Spacing scale** — `spacing_scale` must be `tokens-only`. Freehand pixel/rem plans are rejected.
5. **Icon existence** — every icon name resolves in `@tylertech/tyler-icons`.
6. **Composition sanity** — cards must not host `page_title` (would violate card hierarchy). Tables must be composed via `forge-table` + `forge-paginator`, not hand-rolled `<table>`.

On failure, the tool returns `{ valid: false, errors: [{ path, message, hint }] }`. Fix the plan and re-validate — do not proceed to markup until valid.

## Failure modes and how to fix them

| Error | Fix |
|---|---|
| `components.forge-foo not found in CEM` | Call `find_components` for what you actually want. Do not invent tag names. |
| `block_id not in manifest` | Call `get_forge_blocks(query: ...)` and pick a real block ID. |
| `typography.page_title = "body2" is not a heading role` | Pick from `text-heading{1..8}`; card headers default to `text-heading3`, page titles to `text-heading4` or `text-heading5`. |
| `spacing_scale = "custom" is not allowed` | Use `tokens-only`. Freehand pixels are an anti-pattern. |
| `icon "filter" not found` | Call `find_icons` and use the exact name (e.g. `filter_list`). |
| `page_title inside forge-card region` | Move the page title to `header` region or a `forge-toolbar` above the card. |

## Worked example

**User request:** "Build me a settings page with a nav sidebar and a form for account preferences."

1. Call `generate_ui_plan` with that description.
2. Tool returns a plan pinning `scaffold_block_id: "src/blocks/application-layout/app-scaffold-with-side-nav"`, `main.block_id: "src/blocks/forms/settings-form"`, `page_title: "text-heading5"`, `section_headings: "text-heading3"`.
3. Call `validate_ui_plan` — passes.
4. Call `get_forge_blocks(blockId: "src/blocks/forms/settings-form")` to fetch the concrete markup.
5. Write the markup, adapting content only.
6. Call `validate_component_api` for `forge-field`, `forge-select`, `forge-button`, `forge-toolbar`.
7. Deliver.

Any step that fails loops back to the previous step. The plan is the single source of truth for structural decisions the rest of the pipeline depends on.

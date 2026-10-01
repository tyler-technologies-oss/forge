# ADR-0001: generate_ui_plan returns a template, not a composed plan

## Status

Accepted

## Context

`generate_ui_plan` (src/tools/plan/generate-ui-plan-tool.ts) takes a
`description` of the UI the caller wants and is expected, by its name, to
produce a UI plan for it. In practice its `execute` method returns a
hardcoded template plus the legal enum values (`plan-types.ts`) and never
inspects `description` beyond echoing it back for display.

This looks shallow — a "generate" tool whose output doesn't depend on its
main input — and was flagged as such in an architecture review. But the
tool's caller is always an LLM inside an active MCP session: only the model
knows what UI the user actually wants, from context this tool has no access
to (the conversation, the rest of the codebase, prior tool calls this turn).
There is no server-side computation that could turn `description` into a
correct plan; composing the plan is inherently the model's job.

## Decision

`generate_ui_plan` stays a template + enum dispenser. It does not attempt to
parse or act on `description`. The model is expected to fill in the
returned template itself and validate the result with `validate_ui_plan`
before writing markup.

## Consequences

Future reviews should not re-flag "generate_ui_plan doesn't use its input"
as a bug to fix by adding description-parsing logic — that would be
duplicating what the calling model already does, for no benefit.

This does NOT excuse drift between this tool's hardcoded template and the
canonical enums in `plan-types.ts` (e.g. `REGION_NAMES`) — that drift is a
real bug and is guarded by a test (see
`src/tools/plan/generate-ui-plan-tool.test.ts`).

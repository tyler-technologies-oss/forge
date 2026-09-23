# Agent Instructions

This repo's coding standards, stack, and workflow live in `CLAUDE.md` at the repo root — read it first.

## Skills

Reusable skills live in `.claude/skills/<name>/SKILL.md`. Each file starts with YAML frontmatter (`name`, `description`) describing when the skill applies. Before starting a task, scan the `description` fields under `.claude/skills/*/SKILL.md` — if one matches the task, open and follow that skill's full content before proceeding.

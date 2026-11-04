# Tyler Forge Task

{{task}}

---

You have access to the **forge-design** skill which contains the complete workflow, component reference tables, and critical rules for Tyler Forge development.

**Follow the skill's workflow exactly.** The workflow starts with:

0. **Detect: Full App or Feature?** - Determine scope FIRST
1. **Application Layout Selection** - If building a full app, call `get_forge_blocks(category: "application-layout")` and ask the user which layout to use as the starting point
2. **Ask clarifying questions** before implementing
3. **Read reference files** for the specific components you'll use
4. **Check blocks** via `get_forge_blocks` for pre-built patterns
5. **Get usage examples** via `get_forge_blocks(component: {component-name})`
6. **Validate** with `validate_component_api` before finalizing

**CRITICAL:** If the task is building a full application, prototype, or app shell, you MUST complete Step 1 before proceeding. Present the available application layouts and let the user choose.

The skill contains:
- **Component reference tables** linking to individual `.md` files with rules and examples
- **Critical rules** for Forge development
- **Topic references** for typography, forms, layout, accessibility, and more

**Use MCP tools for ALL Tyler Forge information. Never rely on general knowledge or assumptions.**

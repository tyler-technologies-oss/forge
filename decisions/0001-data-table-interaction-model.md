# ADR-0001: Interaction model for forge-data-table (ARIA table vs. grid)

## Status

Accepted

## Context

`forge-data-table` renders a native `<table>` inside Shadow DOM. Column headers sort on click, but they expose no `aria-sort` and are not focusable, so keyboard users can only sort through the column menu's icon button.

The existing Forge table (`forge-table`) uses native table semantics, `aria-sort`, and Enter/Space on headers. The new table must not be a step back from it.

Two upcoming capabilities pull in different directions:

- Read-only tables, the majority case, need the simplest model: native semantics, with Tab moving between interactive elements.
- Cell editing and cell-level keyboard navigation need a spreadsheet-style model. With Tab alone, the number of tab stops grows with rows × interactive cells, which is unusable at scale.

Two implementation facts constrain the design:

- Virtualization positions rows absolutely and renders only the visible rows, so assistive technology cannot derive the row count from the DOM.
- Custom cell content is projected from light DOM through slots, so focusable content lives outside the shadow root.

## Options considered

### A. ARIA table pattern only

Native table semantics; Tab moves through interactive elements in cells and headers.

- Simplest, and matches the existing table and read-only use cases.
- A poor fit for editing: tab stops scale with the size of the table.

### B. ARIA grid pattern always

`role="grid"`, a single tab stop, arrow keys move between cells (roving tabindex).

- The required model for spreadsheet-style editing; matches other data grids.
- More complex, and adds overhead and a changed keyboard model for simple read-only tables.

### C. Table by default, grid when interactive

The `table` pattern unless cell editing or cell navigation is turned on, in which case the `grid` pattern.

- Fits both read-only and editing use cases.
- Two keyboard models to build, test and document.

## Decision

Option C. `forge-data-table` uses the ARIA `table` pattern by default and switches to the ARIA `grid` pattern when cell editing or cell navigation is enabled.

**Table mode (default)**

- Native table semantics. Tab and Shift+Tab move between interactive elements in headers and cells in DOM order.
- Sortable headers are focusable and activate with Enter or Space.
- Header actions (column menu, resize) are reachable with Tab.

**Grid mode (editing or cell navigation enabled)**

- The table gets `role="grid"`. The grid is a single tab stop; focus is managed with roving tabindex.
- Arrow keys move one cell; Home/End move to the first/last cell in a row; Ctrl+Home/Ctrl+End move to the first/last cell in the grid; Page Up/Page Down move by a page of rows.
- Enter or F2 enters edit mode on an editable cell; Escape leaves edit mode and returns focus to the cell. Tab and Shift+Tab move between interactive elements inside a cell when its contents are being operated.
- Header cells are part of the navigation order. Enter or Space on a sortable header sorts; header actions are reached by moving focus to the header cell.
- Row selection and expanders are cells (or controls inside cells) in the navigation order and activate with Space and Enter respectively.

**Both modes**

- Sort state is announced with `aria-sort` on the sorted column header (`ascending`, `descending`), and omitted on unsorted columns.
- With virtualization, the table sets `aria-rowcount` to the total row count (including header rows) and `aria-rowindex` on each rendered row, so screen readers announce position within the full data set.
- The focused cell is never removed from the DOM while it holds focus: rows with focus stay rendered when scrolled out of view. When data changes, focus stays on the same row identity if it still exists, otherwise on the nearest remaining row.
- Slotted (light DOM) cell content participates in focus through the cell: in grid mode, the cell owns the roving tabindex and moves focus into slotted content only on explicit entry (Enter/F2 or Tab into the cell).

**Screen reader test matrix**

- NVDA with Firefox and Chrome
- JAWS with Chrome
- VoiceOver with Safari (macOS)

## Consequences

- Read-only tables keep the simpler model and stay at parity with the existing table. Adding `aria-sort` and focusable sortable headers is required in table mode as well.
- Cell editing and keyboard navigation build on the grid model. Their public API (the opt-in property names) is decided with those features, not here.
- We accept two keyboard models to build, test and document. Tests and documentation must cover both modes, and the mode switch must update `role` and tab-stop behavior together.
- Reviewers should not "fix" the mode difference by forcing one model everywhere: arrow-key navigation in read-only tables would remove Tab access to interactive cell content, and per-cell tab stops in editable tables would not scale.
- Virtualization must keep the focused row rendered, and must keep `aria-rowcount` / `aria-rowindex` accurate as the window scrolls. This is an ongoing constraint on any change to the virtualizer.
- Behaviors not fixed above (for example focus handling when columns are reordered or hidden) are decided with the cell-editing and keyboard-navigation work and recorded there.

## References

- [WAI-ARIA APG: Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [WAI-ARIA APG: Table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [WAI-ARIA APG: Developing a keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

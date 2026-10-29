# Lit Migration Tracker

Tracks the components in `packages/forge/src/lib` that still use the legacy component/core/adapter/template architecture and need to move to Lit (`BaseLitElement`). See the `lit-migration` skill (`.claude/skills/lit-migration`) for the migration workflow.

- **Remaining:** 54 custom elements (view-switcher and view migrated on `feat/view-switcher-lit`, page-state on `feat/page-state-lit`, scaffold on `feat/scaffold-lit`, inline-message on `feat/inline-message-lit`)
- **Last audited:** 2026-10-29
- **Effort basis:** source size (component, core, adapter, delegate), property count, test size, and dependence on shared infrastructure. Estimates were made without reading every file, so adjust tiers as components are opened.
- **Sizes** are total source lines in the component folder, including constants and delegates. **Tests** are lines in the component's own `*.test.ts` files. Components with no test count keep their tests in a shared file (`chips.test.ts`, `list.test.ts`, `button-toggle.test.ts`, `stepper.test.ts`, `view-switcher.test.ts`).

## In flight

| Done | Component                         | State                                                                                                                              |
| ---- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [ ]  | drawer, mini-drawer, modal-drawer | `feat/drawer-lit` is pushed to origin and looks nearly complete (28 files changed). Not merged.                                    |
| [ ]  | calendar                          | `feat/calendar-lit` is local only with 2 commits. Partial: contains a committed `calendar.ts.backup`. Also covers `calendar-menu`. |

## Tier 1: Trivial

Little or no core/adapter, no shared-infrastructure dependencies.

| Done | Component           | Size | Notes                                      |
| ---- | ------------------- | ---- | ------------------------------------------ |
| [x]  | view-switcher/view  | 30   |                                            |
| [x]  | page-state          | 75   | No core.                                   |
| [x]  | scaffold            | 114  | No core.                                   |
| [x]  | inline-message      | 126  | 2 properties.                              |
| [ ]  | chip-set            | 196  | No core.                                   |
| [ ]  | app-bar/help-button | 265  |                                            |
| [ ]  | app-bar/menu-button | 302  | No core.                                   |
| [ ]  | label-value         | 310  | Uses a component delegate.                 |
| [ ]  | backdrop            | 338  | No core. Lit `dialog` already consumes it. |

## Tier 2: Small

Has a core and adapter, but few properties and no heavy template logic.

| Done | Component                   | Size | Notes                                             |
| ---- | --------------------------- | ---- | ------------------------------------------------- |
| [ ]  | button-toggle               | 339  |                                                   |
| [ ]  | list                        | 329  | 25 properties, mixins. 39 dependents.             |
| [ ]  | circular-progress           | 385  | Mixins.                                           |
| [ ]  | linear-progress             | 397  | Mixins.                                           |
| [ ]  | app-bar/search              | 393  |                                                   |
| [ ]  | app-bar/notification-button | 477  | 17 properties.                                    |
| [ ]  | split-button                | 550  |                                                   |
| [ ]  | banner                      | 619  |                                                   |
| [ ]  | label                       | 714  |                                                   |
| [ ]  | stepper                     | 733  |                                                   |
| [ ]  | step                        | 708  | 30 properties.                                    |
| [ ]  | profile-card                | 786  |                                                   |
| [ ]  | split-view                  | 779  |                                                   |
| [ ]  | file-picker                 | 818  |                                                   |
| [ ]  | bottom-sheet                | 884  | Mixins, animation.                                |
| [x]  | view-switcher               | 919  | Adapter is heavy on DOM manipulation (328 lines). |

## Tier 3: Medium

Shared infrastructure, form association, or a wide blast radius.

| Done | Component              | Size  | Notes                              |
| ---- | ---------------------- | ----- | ---------------------------------- |
| [ ]  | list-item              | 803   | 30 properties. No dedicated tests. |
| [ ]  | chip                   | 904   | 36 properties.                     |
| [ ]  | state-layer            | 944   | Small, but 52 files depend on it.  |
| [ ]  | button-toggle-group    | 580   | Form-associated, 31 properties.    |
| [ ]  | checkbox               | 1,195 | Form-associated. Tests: 522.       |
| [ ]  | switch                 | 1,239 | Form-associated. Tests: 445.       |
| [ ]  | radio                  | 1,706 | Form-associated. Tests: 993.       |
| [ ]  | radio-group            | 427   | Form-associated. Tests: 243.       |
| [ ]  | text-field             | 1,074 | Built on legacy `BaseField`.       |
| [ ]  | field                  | 1,456 | 57 properties. Tests: 677.         |
| [ ]  | chip-field             | 1,482 |                                    |
| [ ]  | toast                  | 1,334 | Uses overlay.                      |
| [ ]  | app-bar/profile-button | 1,179 | 38 properties, uses popover.       |

## Tier 4: Large

Overlay or list-dropdown stack, or a very large core.

| Done | Component        | Size  | Notes                                                        |
| ---- | ---------------- | ----- | ------------------------------------------------------------ |
| [ ]  | overlay          | 1,543 | Underpins popover, tooltip, menu. 26 dependents.             |
| [ ]  | tooltip          | 1,919 | 36 dependents. Tests: 995.                                   |
| [ ]  | popover          | 2,874 | 30 dependents. Tests: 1,778.                                 |
| [ ]  | menu             | 2,425 | Tests: 1,163.                                                |
| [ ]  | color-picker     | 1,910 | 178-line template.                                           |
| [ ]  | slider           | 2,076 | 53 properties, form-associated. Tests: 926.                  |
| [ ]  | select           | 2,201 | 49 properties, form-associated, list-dropdown. Tests: 1,452. |
| [ ]  | select-dropdown  | 695   | Overlay and list-dropdown.                                   |
| [ ]  | split-view-panel | 3,064 | 793-line core.                                               |
| [ ]  | calendar-menu    | 711   | Coupled to `calendar`; migrate together.                     |

## Tier 5: Very large

| Done | Component         | Size  | Notes                     |
| ---- | ----------------- | ----- | ------------------------- |
| [ ]  | date-picker       | 2,688 | Tests: 2,179.             |
| [ ]  | date-range-picker | 2,732 | Tests: 1,719.             |
| [ ]  | time-picker       | 3,862 | Tests: 1,859.             |
| [ ]  | autocomplete      | 4,264 | Tests: 2,268.             |
| [ ]  | calendar          | 5,397 | 94 properties. In flight. |
| [ ]  | table             | 6,987 | Tests: 2,671.             |

## Decide before migrating

| Component              | Size | Question                                                    |
| ---------------------- | ---- | ----------------------------------------------------------- |
| deprecated/button      | 597  | Marked `@deprecated`. Migrate, or remove in the next major? |
| deprecated/icon-button | 733  | Marked `@deprecated`. Migrate, or remove in the next major? |

## Cross-cutting concerns

- **Form association is the main shared blocker.** Checkbox, switch, radio, slider, button-toggle-group and select use the legacy `BaseFormComponent` and `WithFormAssociated` mixins. The only Lit precedents are `listbox`, `base-button` and `meter`. Migrating `switch` or `checkbox` first should establish a reusable pattern (see `.claude/skills/lit-migration/references/form-association.md`).
- **The overlay stack is a chain:** overlay, then popover, then tooltip, menu and toast, then the list-dropdown consumers (select, autocomplete, date and time pickers). Lit components such as `app-launcher`, `user-profile`, `paginator`, `count-card`, `secret`, `breadcrumb` and `dialog` already consume the legacy popover, tooltip, select, list and backdrop, so keep their public APIs stable.
- **The field family shares a base:** `field`, `text-field`, `chip-field`, the pickers and `select` build on `BaseField` / `with-base-field`. Migrate them together or in a deliberate order.
- **Base classes go last.** `BaseComponent`, the core mixins, `BaseField`, `overlay-aware`, `list-dropdown-aware`, `base-date-picker`, `base-drawer` and `base-select-adapter` can only be removed once everything above is migrated.

## Suggested order

1. Tier 1, plus the in-flight drawer and calendar work.
2. Tier 2.
3. The form pattern (switch, checkbox, radio, button-toggle-group, slider), then the field family.
4. The overlay stack (overlay, then popover, tooltip, menu, toast).
5. select, the pickers, autocomplete and table.

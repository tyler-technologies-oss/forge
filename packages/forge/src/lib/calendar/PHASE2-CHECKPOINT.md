# Calendar Lit Migration - Phase 2 Checkpoint 🚧

## Status: IN PROGRESS (Checkpoint - Not Complete)

Phase 2 (Template Conversion) has been started but is not yet complete. This document captures progress, learnings, and next steps.

## Phase 2 Goal

Replace legacy HTML template and adapter DOM manipulation with Lit's declarative `render()` method. This phase keeps CalendarCore for business logic but replaces the 24KB adapter with declarative Lit templates.

## What Was Attempted

### 1. Set Up Lit Rendering Infrastructure ✅

**Added imports:**

```typescript
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
```

**Added internal state properties:**

```typescript
@state() private _dateConfigs: ICalendarDateConfig[] = [];
@state() private _currentView: CalendarView = 'date';
```

**Updated imports:**

- Removed `attachShadowTemplate` import
- Removed `template` import from `calendar.html`
- Added `ICalendarDateConfig` to type imports

### 2. Implemented Basic Render Structure ✅

Created `render()` method with:

- Root container with dynamic classes using `classMap`
- Conditional header rendering based on `showHeader`
- Date view container (when view === 'date')
- Calendar menu
- Footer with today/clear buttons

**Code implemented:**

```typescript
public override render(): TemplateResult {
  const classes = {
    'forge-calendar': true,
    'forge-calendar--fixed-height': this.fixedHeight,
    'forge-calendar--readonly': this.readonly,
    'forge-calendar--prevent-focus': this.preventFocus,
    'forge-calendar--show-today': this.showToday,
    'forge-calendar--show-other-months': this.showOtherMonths
  };

  return html`
    <div class=${classMap(classes)} part="root">
      ${this.showHeader ? this.#renderHeader() : nothing}
      <div class="forge-calendar__view" part="view">
        ${this._currentView === 'date' ? this.#renderDateView() : nothing}
        ${this.#renderMenu()}
      </div>
      ${this.#renderFooter()}
    </div>
  `;
}
```

### 3. Implemented Partial Rendering Methods ⚠️

**Completed:**

- `#renderDateView()` - Date grid container with proper role attributes
- `#renderDayRow()` - Day header row placeholder
- `#renderDateGrid()` - Splits dates into weeks, renders rows
- `#renderDate()` - Individual date cell with:
  - ✅ Dynamic classes (`selected`, `today`, `other-month`)
  - ✅ **`aria-disabled` instead of `disabled` attribute** (keeps dates focusable)
  - ✅ `aria-selected` for selection state
  - ✅ `data-date` attribute with ISO string
  - ✅ Basic date number display
  - ⚠️ No event handlers yet
  - ⚠️ No focus management (all tabindex=-1)
  - ⚠️ No date builder support
  - ⚠️ No event rendering
  - ⚠️ No range rendering
  - ⚠️ No tooltip rendering
- `#renderMenu()` - Basic calendar-menu element
- `#renderFooter()` - Today/Clear buttons with slot support

**Not implemented:**

- `#renderHeader()` - Just a placeholder div
- Day headers rendering
- Event handlers for any interactions
- Builder function support (dateBuilder, dayBuilder, eventBuilder)
- Range selection visualization
- Event indicators on dates
- Tooltip rendering
- Focus management
- Keyboard navigation

### 4. Updated Lifecycle Methods ⚠️

**Added `willUpdate()` logic:**

```typescript
public override willUpdate(changedProperties: PropertyValues<this>): void {
  // Update custom states based on view changes
  if (changedProperties.has('view')) {
    const oldView = changedProperties.get('view') as CalendarView | undefined;
    if (oldView) {
      toggleState(this.#internals, `view-${oldView}`, false);
    }
    toggleState(this.#internals, `view-${this.view}`, true);
    this._currentView = this.view;
  }

  // Update date configs when month/year changes for rendering
  if (changedProperties.has('month') || changedProperties.has('year') || changedProperties.has('value')) {
    this.#updateDateConfigs();
  }
}
```

**Added helper method:**

```typescript
#updateDateConfigs(): void {
  // For Phase 2, get date configs from core
  // TODO Phase 3: Build date configs directly without core
  if (this._core) {
    // Access the internal dates from core (this is temporary for Phase 2)
    this._dateConfigs = (this._core as any)._dates?.map((d: Date) =>
      (this._core as any)._getDateConfig(d)) ?? [];
  }
}
```

**Modified initialization flow:**

```typescript
public override firstUpdated(): void {
  // Initialize core+adapter after first render so DOM exists for adapter queries
  this._core = new CalendarCore(new CalendarAdapter(this));
  this._core.initialize();

  // Trigger initial date config update
  this.#updateDateConfigs();
  this.requestUpdate(); // Force re-render with date configs
}
```

## Critical Issues Discovered 🚨

### Issue 1: Adapter Constructor DOM Queries

**Problem:** The `CalendarAdapter` constructor queries DOM elements via `getShadowElement()`:

```typescript
constructor(component: ICalendarComponent) {
  super(component);
  this._container = getShadowElement(component, CALENDAR_CONSTANTS.selectors.CALENDAR);
  this._dateView = getShadowElement(component, CALENDAR_CONSTANTS.selectors.DATE_VIEW);
  this._dayRow = getShadowElement(component, CALENDAR_CONSTANTS.selectors.DAY_ROW);
  this._dateGrid = getShadowElement(component, CALENDAR_CONSTANTS.selectors.DATE_GRID);
  this._menu = getShadowElement(component, CALENDAR_CONSTANTS.selectors.MENU) as ICalendarMenuComponent;
}
```

When initialized in the component constructor, these queries fail because Lit hasn't rendered yet.

**Solution attempted:** Move core/adapter initialization to `firstUpdated()` lifecycle method, which runs after the first render.

**Result:** This works but creates a chicken-and-egg problem where properties can't be accessed before core exists.

### Issue 2: Core/Adapter Interference

**Problem:** The adapter expects to manipulate DOM imperatively (adding/removing elements, toggling classes). The Lit template now controls the DOM declaratively. Both systems are trying to manage the same DOM, causing conflicts.

**Example conflicts:**

- Adapter tries to `setDates()` by manipulating date elements
- Lit render creates date elements from `_dateConfigs`
- Changes from one system don't sync with the other

**Why this is a blocker:** We can't have a hybrid approach where Lit renders AND adapter manipulates. We need to pick one.

### Issue 3: Date Configs Not Available Until After Core Init

**Problem:** The `_dateConfigs` state is populated from `_core._dates`, but core isn't initialized until `firstUpdated()`. This means the first render has no dates.

**Current workaround:** Call `requestUpdate()` after core initializes to trigger a second render with dates. This works but is inefficient.

**Proper solution (Phase 3):** Build date configs directly in the component without relying on core.

### Issue 4: Incomplete Rendering Methods

**Problem:** Only basic structure is rendered. Missing:

- Header with navigation buttons
- Day headers
- Event handlers
- Builder functions
- Events display
- Range visualization
- Tooltips

**Impact:** Tests fail because they expect interactive elements that don't exist yet.

## Test Results

**Before Phase 2 (Phase 1 complete):**

```
✓ 94 tests passing
```

**Current state (Phase 2 in progress):**

```
✓ 1 test passing (should instantiate component with shadow dom)
✗ 93 tests failing
```

Failures are expected because:

1. Header buttons not rendered (month button, year button, prev/next)
2. No event handlers attached
3. Date interaction not implemented
4. Builder functions not called

## File Changes Made

### Modified: `calendar.ts`

**Lines added:**

- Imports: `state`, `classMap`, `ICalendarDateConfig`
- Internal state: `_dateConfigs`, `_currentView`
- Render methods: `render()`, `#renderHeader()`, `#renderDateView()`, `#renderDayRow()`, `#renderDateGrid()`, `#renderDate()`, `#renderMenu()`, `#renderFooter()`
- Helper: `#updateDateConfigs()`
- Lifecycle: Modified `firstUpdated()`, `willUpdate()`

**Lines removed:**

- Import: `attachShadowTemplate`, `template`
- Constructor: `attachShadowTemplate(this, template, styles)` call

### Not Modified:

- `calendar-core.ts` - Still contains all business logic
- `calendar-adapter.ts` - Still contains DOM manipulation
- `calendar.html` - Legacy template file (could be deleted but kept for reference)

## What Remains for Phase 2 Completion

### Step 2.3: Implement Header Rendering ❌

Need to implement `#renderHeader()` with:

- Previous/next navigation buttons
- Month button (opens month picker)
- Year button (opens year picker)
- Proper icon usage
- Tooltip support via slots
- Click event handlers
- Disabled state management (min/max date boundaries)

**Reference adapter methods:**

- `setHeader()`
- `setMonth()`
- `setYear()`
- `setNextButtonDisabled()`
- `setPreviousButtonDisabled()`
- `setNextButtonLabel()`
- `setPreviousButtonLabel()`

### Step 2.4: Implement Day Headers ❌

Need to implement `#renderDayRow()` with:

- Day of week labels (Sun, Mon, etc.)
- Localized labels based on `locale` property
- First day of week configuration
- Day builder function support

**Reference adapter methods:**

- `setDays()`

### Step 2.5: Complete Date Rendering ❌

Need to enhance `#renderDate()` with:

- Focus management (one date has tabindex=0)
- Click event handler
- Keydown event handler (keyboard navigation)
- Mouseenter event handler (range preview)
- Date builder function support
- Weekend class
- Disabled date handling (already has aria-disabled ✅)

**Reference adapter methods:**

- `replaceDate()`
- `setDateDisabled()`
- `setDateSelected()`
- `setActiveDate()`
- `setWeekend()`

### Step 2.6: Implement Event Rendering ❌

Need to add to date rendering:

- Event wrapper element
- Event indicator dots (max 3)
- Overflow indicator (+N)
- Event builder function support
- Event color styling

**Reference adapter methods:**

- `setEvent()`
- `setEventWrapperOnDate()`

### Step 2.7: Implement Range Rendering ❌

Need to add to date rendering:

- Range background element
- Range start/end styling
- Range preview (on hover)
- Range classes

**Reference adapter methods:**

- `setRange()`
- `setRangeStart()`
- `setRangeEnd()`

### Step 2.8: Implement Tooltip Support ❌

Need to add tooltip rendering:

- Tooltip builder function support
- Conditional tooltip creation
- Tooltip content

**Reference adapter methods:**

- `setDateTooltip()`

### Step 2.9: Add Event Handlers ❌

Need to implement interaction handlers:

- `#handleDateClick(config: ICalendarDateConfig)`
- `#handleDateKeydown(evt: KeyboardEvent, config: ICalendarDateConfig)`
- `#handleDateHover(config: ICalendarDateConfig)`
- `#handlePreviousButtonClick()`
- `#handleNextButtonClick()`
- `#handleMonthButtonClick()`
- `#handleYearButtonClick()`
- `#handleTodayClick()`
- `#handleClearClick()`
- `#handleMenuSelect(evt: CustomEvent)`
- `#handleMenuFocusChange(evt: CustomEvent)`

These should delegate to core methods temporarily:

- `this._core.selectDate(date)`
- `this._core.handleKeyEvent(evt)`
- `this._core.nextMonth()`
- `this._core.previousMonth()`
- etc.

### Step 2.10: Remove Adapter Dependencies ❌

Once all rendering is complete in Lit:

1. Stop calling adapter methods from core
2. Update core to emit events instead of calling adapter
3. Listen to core events and trigger `requestUpdate()`
4. Verify all tests pass
5. Remove adapter instantiation (keep core for Phase 3)

## Architecture Decision: Two Possible Paths

### Path A: Incremental Hybrid (Current Attempt)

**Approach:** Keep core/adapter, gradually replace adapter calls with Lit rendering.

**Pros:**

- Smaller incremental changes
- Can test along the way
- Business logic stays in core (Phase 3 work)

**Cons:**

- Complex coordination between Lit and adapter
- Hard to debug conflicts
- Adapter still manipulates Lit-rendered DOM
- Requires careful sequencing

### Path B: Full Template Replacement (Recommended)

**Approach:** Complete ALL Lit rendering methods before removing adapter.

**Steps:**

1. ✅ Implement all render methods (even if incomplete)
2. ✅ Add all event handlers
3. ✅ Test each piece in isolation
4. Remove adapter completely in one step
5. Fix any remaining integration issues

**Pros:**

- Cleaner separation
- No hybrid conflicts
- Easier to reason about
- Follows implementation guide

**Cons:**

- Larger upfront work
- Tests broken until complete
- Harder to checkpoint

## Recommended Next Steps

### Option 1: Complete Phase 2 Properly

Follow Path B and implement all rendering methods:

1. Implement header rendering (Step 2.3)
2. Implement day headers (Step 2.4)
3. Complete date rendering with events/range/tooltip (Steps 2.5-2.8)
4. Add all event handlers (Step 2.9)
5. Test incrementally with dev server
6. Remove adapter once rendering is complete (Step 2.10)
7. Run full test suite
8. Fix any issues

**Estimated time:** 3-4 days of focused work

### Option 2: Revert and Plan Smaller Increments

Revert Phase 2 changes and plan a different approach:

1. Keep `attachShadowTemplate` for now
2. Create a parallel Lit component for testing
3. Build up Lit rendering in isolation
4. Switch over when complete

**Estimated time:** Similar to Option 1, but safer

### Option 3: Defer Phase 2, Move to Simpler Component

Practice the migration pattern on a simpler component first:

- Migrate `calendar-menu` (smaller, fewer interactions)
- Learn the patterns
- Apply to main calendar

**Estimated time:** 1 day for calendar-menu, then restart calendar

## Code Snapshot (Current State)

The current code is in a broken state with:

- Lit render() implemented but incomplete
- Core/adapter initialized in firstUpdated()
- 1 test passing, 93 failing
- Build succeeds

**To restore Phase 1 stable state:**

```bash
git checkout feat/calendar-lit packages/forge/src/lib/calendar/calendar.ts
```

Or manually revert:

1. Add back `attachShadowTemplate` import
2. Add back `template` import
3. In constructor, add: `attachShadowTemplate(this, template, styles);`
4. In constructor, add: `this._core = new CalendarCore(new CalendarAdapter(this));`
5. Remove `firstUpdated()` override
6. In `connectedCallback`, add: `this._core.initialize();`
7. Keep `willUpdate()` custom states logic
8. Change `render()` to return `html``

## Key Learnings for Next Attempt

1. **Do NOT remove `attachShadowTemplate` until ALL render methods are complete**
2. **Implement render methods incrementally but keep legacy template working**
3. **Test each render method in isolation using Storybook/dev server**
4. **Use adapter code as reference for what to render**
5. **Focus on one area at a time** (header, then dates, then events, etc.)
6. **Add event handlers as you implement each section**
7. **Don't initialize core/adapter until ready to fully switch over**

## Files to Reference During Phase 2

- **Legacy template:** `calendar.html` - Shows what structure is expected
- **Adapter:** `calendar-adapter.ts` - Shows what DOM manipulation happens
- **Core:** `calendar-core.ts` - Shows business logic and state
- **Constants:** `calendar-constants.ts` - Types and selectors
- **DOM utils:** `calendar-dom-utils.ts` - Element creation helpers (can adapt for Lit)
- **Locale utils:** `calendar-locale-utils.ts` - Localization helpers
- **Tests:** `calendar.test.ts` - Expected behavior

## Success Criteria for Phase 2 Completion

- ✅ All 94 tests passing
- ✅ Build succeeds
- ✅ No adapter methods called (core can stay)
- ✅ All render methods implemented
- ✅ All event handlers working
- ✅ All builder functions supported
- ✅ Visual testing in Storybook confirms:
  - Header navigation works
  - Date selection works
  - Keyboard navigation works
  - Events display
  - Range selection visualizes correctly
  - Tooltips appear
  - Min/max dates respected
  - Disabled dates are focusable but not selectable

---

**Checkpoint Date:** 2026-06-22  
**Branch:** feat/calendar-lit  
**Phase Status:** Phase 1 ✅ Complete | Phase 2 🚧 In Progress (20% complete)  
**Next Milestone:** Complete Phase 2 render methods before removing adapter

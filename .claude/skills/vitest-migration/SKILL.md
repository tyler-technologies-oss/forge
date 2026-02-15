---
name: Vitest Migration
description: This skill should be used when the user asks to "migrate test to vitest", "convert test to vitest", "migrate WTR test", "move test from mocha to vitest", or discusses migrating test files from Web Test Runner + Mocha + Chai + Sinon to Vitest browser mode.
version: 1.0.0
---

# Vitest Test Migration

Migrate test files from Web Test Runner (WTR) + Mocha + Chai + Sinon to Vitest browser mode.

## When to Use

- Migrating `.test.ts` files from WTR/Mocha/Chai/Sinon stack
- Converting browser-based web component tests to Vitest browser mode
- Files using `@open-wc/testing` fixtures and `@web/test-runner-commands`

## Migration Workflow

### Phase 1: Structure & First Test

**Goal**: Get the test file structure migrated with ONE test passing.

1. **Read the source test file** completely to understand:
   - Test structure (describe/it blocks)
   - Whether it uses a TestHarness class
   - Which browser commands are used (sendMouse, sendKeys)
   - Fixture creation patterns

2. **Create new test file** - rename from `.test.ts` to `.vitest.ts`

3. **Migrate test structure** - copy all `describe()` and `it()` blocks verbatim:

   ```typescript
   describe('Component', () => {
     it.skip('should initialize', async () => {});
     it.skip('should be accessible', async () => {});
     // ... all other tests as it.skip
   });
   ```

   It's important to keep all original tests and make sure it's a 1:1 mapping to ensure we don't miss any tests.

4. **Pick ONE simple test** (usually "should initialize") and un-skip it

5. **Update imports for that test**:

   ```typescript
   // Before
   import { expect } from '@esm-bundle/chai';
   import { spy } from 'sinon';
   import { fixture, html } from '@open-wc/testing';
   import { sendMouse } from '@web/test-runner-commands';
   import { IMyComponent } from './my-component';

   // After
   import { describe, it, expect, vi } from 'vitest';
   import { render } from 'vitest-browser-lit';
   import { html } from 'lit';
   import { userEvent } from 'vitest/browser';
   import type { IMyComponent } from './my-component.js';
   ```

   **Important**: Always use `.js` extensions for local imports (e.g., `'./my-component.js'`). This is required for ESM compatibility since TypeScript compiles to JavaScript.

6. **Update fixture pattern** - for simple components, use inline render:

   ```typescript
   // Before
   const el = await fixture<IMyComponent>(html`<forge-my-component></forge-my-component>`);

   // After
   const screen = render(html`<forge-my-component></forge-my-component>`);
   const el = screen.container.querySelector('forge-my-component') as IMyComponent;
   ```

   For **composite components** with nested children, keep `createFixture` helpers - see "Composite Component Fixtures" section below.

7. **Run test** and fix any assertion failures (see Quick Reference below)

8. **Iterate** until that single test passes

### Phase 2: Test Harness & Fixtures

**Goal**: Establish patterns for TestHarness and browser interactions.

1. **If TestHarness exists**, migrate it:
   - Keep the class structure
   - Update browser command helpers to use `userEvent`:

   ```typescript
   // Before (in harness)
   public async clickElement(el: HTMLElement): Promise<void> {
     const { x, y, width, height } = el.getBoundingClientRect();
     await sendMouse({ type: 'click', position: [...] });
   }

   // After
   public async clickElement(el: HTMLElement): Promise<void> {
     await userEvent.click(el);
   }
   ```

2. **Update element waiting patterns**:

   ```typescript
   // Before
   import { elementUpdated } from '@open-wc/testing';
   await elementUpdated(el);

   // After - for Lit-based components
   await el.updateComplete;

   // After - for Forge components (extend BaseComponent, not LitElement)
   import { frame } from '../core/utils/utils';
   await frame();
   ```

3. **Un-skip 3-5 representative tests** covering:
   - Basic initialization
   - Property/attribute tests
   - User interaction (click, keyboard)
   - Form association (if applicable)

4. **Establish patterns** - once these pass, remaining tests follow same approach

### Phase 3: Bulk Migration & Test Review

**Goal**: Complete migration while improving test quality.

For each remaining test:

1. **Un-skip in batches** (5-10 tests at a time)

2. **Apply established patterns** from Phase 2

3. **Review each test** - ask these questions:
   - **Necessary?** Does this test catch real bugs or verify critical behavior?
   - **Duplicative?** Is this testing the same thing as another test?
   - **Useful?** Does this test provide value or is it testing framework/browser behavior?

4. **Actions based on review**:
   - **Remove**: Delete tests that are duplicative or test obvious behavior
   - **Update**: Fix tests that are testing the wrong thing or have outdated assertions
   - **Keep**: Maintain tests that verify critical component behavior
   - **Add**: If critical functionality is untested, add new tests

5. **Missing test categories** to consider adding:
   - Accessibility (a11y) if not covered
   - Edge cases in user interaction
   - Error states and validation
   - Component lifecycle (connect/disconnect)

### Phase 4: Cleanup

1. Remove all remaining `.skip` markers (no tests should be skipped at this point)
2. Verify that there is a 1:1 mapping of tests from old file to new file (unless some were removed/modified based on review)
3. Delete the old WTR test file
4. Run full test suite to verify coverage
5. Run TypeScript type checks to ensure no type errors
6. Run ESLint on the new file and fix any issues
7. Run Prettier on the new file for consistent formatting
8. Update any test scripts/configs if needed

## Quick Reference: Assertion Mappings

| Chai (before)                   | Vitest (after)                |
| ------------------------------- | ----------------------------- |
| `expect(x).to.equal(y)`         | `expect(x).toBe(y)`           |
| `expect(x).to.deep.equal(y)`    | `expect(x).toEqual(y)`        |
| `expect(x).to.be.true`          | `expect(x).toBe(true)`        |
| `expect(x).to.be.false`         | `expect(x).toBe(false)`       |
| `expect(x).to.be.null`          | `expect(x).toBeNull()`        |
| `expect(x).not.to.be.null`      | `expect(x).not.toBeNull()`    |
| `expect(x).to.be.undefined`     | `expect(x).toBeUndefined()`   |
| `expect(x).to.be.ok`            | `expect(x).toBeTruthy()`      |
| `expect(x).not.to.be.ok`        | `expect(x).toBeFalsy()`       |
| `expect(x).to.be.empty`         | `expect(x).toHaveLength(0)`   |
| `expect(x).to.have.lengthOf(n)` | `expect(x).toHaveLength(n)`   |
| `expect(x).to.contain(y)`       | `expect(x).toContain(y)`      |
| `expect(x).to.be.instanceOf(Y)` | `expect(x).toBeInstanceOf(Y)` |
| `expect(fn).to.throw()`         | `expect(fn).toThrow()`        |

## Quick Reference: Spy/Mock Mappings

| Sinon (before)                         | Vitest (after)                      |
| -------------------------------------- | ----------------------------------- |
| `spy()`                                | `vi.fn()`                           |
| `spy(obj, 'method')`                   | `vi.spyOn(obj, 'method')`           |
| `expect(s).to.have.been.called`        | `expect(s).toHaveBeenCalled()`      |
| `expect(s).to.have.been.calledOnce`    | `expect(s).toHaveBeenCalledOnce()`  |
| `expect(s).to.have.been.calledWith(x)` | `expect(s).toHaveBeenCalledWith(x)` |
| `expect(s).not.to.have.been.called`    | `expect(s).not.toHaveBeenCalled()`  |
| `stub().returns(x)`                    | `vi.fn().mockReturnValue(x)`        |
| `stub().resolves(x)`                   | `vi.fn().mockResolvedValue(x)`      |
| `spy.restore()`                        | `spy.mockRestore()`                 |

## Quick Reference: Browser Commands

| WTR Commands (before)                           | Vitest Browser (after)                       |
| ----------------------------------------------- | -------------------------------------------- |
| `sendKeys({ press: ' ' })`                      | `await userEvent.keyboard(' ')`              |
| `sendKeys({ press: 'Enter' })`                  | `await userEvent.keyboard('{Enter}')`        |
| `sendKeys({ type: 'text' })`                    | `await userEvent.keyboard('text')`           |
| `sendMouse({ type: 'click', position: [x,y] })` | `await userEvent.click(element)`             |
| Click disabled element                          | `await userEvent.click(el, { force: true })` |
| `setViewport({ width, height })`                | `await page.viewport(width, height)`         |

Import for Vitest browser:

```typescript
import { page, userEvent } from 'vitest/browser';
```

## Accessibility Testing

```typescript
// Custom matcher already configured
await expect(el).toBeAccessible();
```

## Test Review Guidelines

When reviewing tests during migration:

**Remove tests that**:

- Test default values that are obvious from type definitions
- Duplicate coverage from other tests
- Test framework behavior rather than component behavior
- Are flaky and don't test real user scenarios

**Update tests that**:

- Have outdated assertions or expectations
- Use deprecated APIs
- Test implementation details instead of behavior
- Have unclear test names

**Add tests for**:

- Accessibility if not already covered
- User interaction sequences not covered
- Error handling and edge cases
- Component cleanup/disconnection behavior

## Additional Resources

For detailed API mappings and advanced patterns, see:

- **`references/mappings.md`** - Complete assertion, mock, and browser command mappings

## Running Tests

```bash
# Run specific test file
pnpm --filter @tylertech/forge run test:vitest:run src/lib/path/to/component.vitest.ts

# Run all vitest tests
pnpm --filter @tylertech/forge run test:vitest:run

# Lint specific test file
pnpm --filter @tylertech/forge exec eslint src/lib/path/to/component.vitest.ts

# Format specific test file
pnpm --filter @tylertech/forge exec prettier --write src/lib/path/to/component.vitest.ts
```

## Timeouts and Animation Delays

Avoid arbitrary magic number timeouts. When tests need to wait for animations or transitions:

1. **Define a named constant** at the top of the test file with a comment explaining the value:

   ```typescript
   // Dismiss animation duration (200ms from duration-short4 token) + buffer for transitionend event
   const DISMISS_ANIMATION_TIMEOUT = 500;
   ```

2. **Reference component constants** when available - check the component's `*-constants.ts` file or token definitions for animation durations.

3. **Use the constant** throughout the test file:

   ```typescript
   await task(DISMISS_ANIMATION_TIMEOUT);
   ```

4. **For one-off timeouts**, add an inline comment explaining why or try to avoid them if possible:

   ```typescript
   await task(100); // wait for popover positioning calculation
   ```

## Mocking Global `fetch`

In vitest browser mode, `vi.spyOn(window, 'fetch')` does NOT work because component code uses bare `fetch()` which is a different reference than `window.fetch`. Use `vi.stubGlobal` instead:

```typescript
// WRONG - won't intercept fetch calls
const fetchSpy = vi.spyOn(window, 'fetch');
fetchSpy.mockResolvedValue(new Response(data));

// CORRECT - properly stubs the global fetch
const fetchMock = vi.fn().mockResolvedValue(new Response(data));
vi.stubGlobal('fetch', fetchMock);

// ... test code ...

vi.unstubAllGlobals(); // cleanup
```

## Polling Helpers for Async DOM Changes

### vi.waitFor() - Wait for Conditions

Use Vitest's built-in `vi.waitFor()` to wait for async conditions. **Important**: Don't put `expect` inside `vi.waitFor()` - use it to wait for a condition, then assert afterwards.

```typescript
import { vi } from 'vitest';

// Wait for condition to become true, then assert
await vi.waitFor(() => el.classList.contains('active'));
expect(el.getAttribute('aria-expanded')).toBe('true');

// Wait for negation
await vi.waitFor(() => !el.classList.contains('loading'));
expect(el.textContent).toBe('Loaded');

// Custom timeout
await vi.waitFor(() => overlay.open, { timeout: 2000 });
```

**When to use `vi.waitFor()`:**
- Hover/pointer state changes that depend on coordinate matching
- Animation state transitions
- Any condition that becomes true asynchronously
- Tests that are flaky in parallel execution but pass when run alone

### Custom Polling Helpers

For waiting on DOM elements (not assertions), use custom helpers:

```typescript
async function waitForElement(
  container: Element,
  selector: string,
  timeout = 500
): Promise<Element | null> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const el = container.querySelector(selector);
    if (el) {
      return el;
    }
    await frame();
  }
  return null;
}

async function waitForRemoval(
  container: Element,
  selector: string,
  timeout = 500
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (!container.querySelector(selector)) {
      return;
    }
    await frame();
  }
}
```

This pattern:
- Polls until the expected DOM state is reached
- Returns as soon as condition is met (fast)
- Has a timeout to prevent infinite loops
- More reliable than fixed delays

## Common Issues

**"Cannot find module"**: Ensure vitest config includes proper aliases and browser mode setup.

**Fixture not rendering**: Import component side-effect before test: `import './component';`

**Async timing issues**: The `render()` function waits for initial render, so `updateComplete` is NOT needed immediately after render. Only use `await el.updateComplete` after programmatically setting a property that triggers a re-render, before checking the resulting DOM changes.

Do NOT add `updateComplete`:

- After `render()` for property checks (`el.checked`, `el.value`, etc.)
- After `render()` before creating TestHarness or accessing shadow DOM
- After `render()` before checking `:state()` matchers

**Browser commands not working**: Ensure `userEvent` is imported from `vitest/browser`.

**Viewport-dependent behavior failing**: Vitest's default viewport may be smaller than WTR's. Components with responsive thresholds (fullscreen, etc.) may behave differently. Use `await page.viewport(width, height)` to set appropriate sizes before tests.

**Feature not initializing**: If a component conditionally initializes features based on viewport (e.g., MoveController only when `!fullscreen`), the viewport size may be triggering a responsive mode. Check component constants for threshold values.

## Viewport Control

```typescript
import { page } from 'vitest/browser';

// Set viewport larger than fullscreen threshold for move/drag tests
await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 100, 1000);
```

## Backdrop Click Handling

For "click outside" on modals, dispatch directly on the backdrop element:

```typescript
public clickOutside(): void {
  if (this.backdropElement.visible) {
    this.backdropElement.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
  }
}
```

## Synthetic Pointer Events for Drag/Move

```typescript
// pointerdown on handle element
this.moveHandleElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX, clientY }));

// pointermove/pointerup on document
document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX, clientY }));
document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
```

## Testing Internal Properties (Migration Only)

**Avoid accessing private/internal properties in tests.** Test observable behavior instead.

If migrating a test that already accesses internals and there's no alternative:

```typescript
interface IComponentInternal extends IComponent {
  _core: { _moveController: unknown };
}

class ComponentHarness extends TestHarness<IComponentInternal> {}
```

Do NOT add new tests that access internal properties.

## Composite Component Fixtures

For components with nested children (e.g., `forge-button-toggle-group` containing `forge-button-toggle` elements), keep the `createFixture` helper pattern from the original test. This is appropriate when:

- Parent component contains slotted child components
- Tests need consistent child element structure
- Multiple fixture variants exist (e.g., with/without form wrapper)

### Fixture Helper Pattern

```typescript
import { html, nothing } from 'lit';

interface FixtureConfig {
  value?: unknown;
  disabled?: boolean;
  // ... other options
}

async function createFixture({ value, disabled }: FixtureConfig = {}): Promise<ComponentHarness> {
  const screen = render(html`
    <forge-parent-component .value=${value} ?disabled=${disabled}>
      <forge-child value="one">One</forge-child>
      <forge-child value="two">Two</forge-child>
    </forge-parent-component>
  `);
  const el = screen.container.querySelector('forge-parent-component') as IParentComponent;
  return new ComponentHarness(el);
}
```

### Using `nothing` for Optional Attributes

When an attribute should be omitted (not set to empty string), use Lit's `nothing`:

```typescript
import { html, nothing } from 'lit';

// Value attribute only rendered when value is truthy
render(html`<forge-component value="${value || nothing}"></forge-component>`);
```

This prevents empty string values from being set, which can cause test failures when testing null/undefined defaults.

### TestHarness Pattern

Keep TestHarness classes for composite components - they provide:

- Typed access to child elements
- Reusable interaction helpers
- Cleaner test code

```typescript
class ComponentHarness extends TestHarness<IParentComponent> {
  public get childElements(): IChildComponent[] {
    return Array.from(this.element.querySelectorAll('forge-child'));
  }

  public async selectChild(index: number): Promise<void> {
    await userEvent.click(this.childElements[index]);
  }

  public async selectChildViaKeyboard(index: number): Promise<void> {
    this.childElements[index].focus();
    await userEvent.keyboard(' ');
  }
}
```

### Accessing Event Details

When testing custom events with `vi.fn()`:

```typescript
const changeSpy = vi.fn();
element.addEventListener('forge-change', changeSpy);

await userEvent.click(childElement);

expect(changeSpy).toHaveBeenCalledOnce();
expect(changeSpy.mock.calls[0][0].detail).toBe('expected-value');
```

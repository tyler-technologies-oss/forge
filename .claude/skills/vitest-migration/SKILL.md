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
   import type { IMyComponent } from './my-component';
   ```

6. **Update fixture pattern** - use inline render calls, avoid helper functions:

   ```typescript
   // Before
   const el = await fixture<IMyComponent>(html`<forge-my-component></forge-my-component>`);

   // After
   const screen = render(html`<forge-my-component></forge-my-component>`);
   const el = screen.container.querySelector('forge-my-component') as IMyComponent;
   ```

   Avoid render helper functions that accept options objects with defaults - they can mask component defaults and cause test failures.

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

   // After - for non-Lit or general render waiting
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

1. Remove all remaining `.skip` markers
2. Delete the old WTR test file
3. Run full test suite to verify coverage
4. Run ESLint on the new file and fix any issues
5. Run Prettier on the new file for consistent formatting
6. Update any test scripts/configs if needed

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

Import for Vitest browser:

```typescript
import { userEvent } from 'vitest/browser';
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

## Common Issues

**"Cannot find module"**: Ensure vitest config includes proper aliases and browser mode setup.

**Fixture not rendering**: Import component side-effect before test: `import './component';`

**Async timing issues**: Use `await el.updateComplete` for Lit components or `await frame()` for general render waiting.

**Browser commands not working**: Ensure `userEvent` is imported from `vitest/browser`.

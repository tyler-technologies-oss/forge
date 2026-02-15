# Vitest Migration: Complete API Mappings

## Import Transformations

```typescript
// BEFORE
import { expect } from '@esm-bundle/chai';
import { spy, stub } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { IAvatarComponent } from './avatar';

// AFTER
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { page, userEvent } from 'vitest/browser';
import type { IAvatarComponent } from './avatar.js';
```

**Important**: Always use `.js` extensions for local imports. ESM requires explicit file extensions.

## Fixture/Render Pattern

```typescript
// BEFORE
import { fixture, html } from '@open-wc/testing';
const el = await fixture<IComponent>(html`<forge-component></forge-component>`);

// AFTER
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
const screen = render(html`<forge-component></forge-component>`);
const el = screen.container.querySelector('forge-component') as IComponent;
```

## Element Update Patterns

| WTR                        | Vitest                    | When to use                           |
| -------------------------- | ------------------------- | ------------------------------------- |
| `await elementUpdated(el)` | `await el.updateComplete` | Lit-based components                  |
| `await elementUpdated(el)` | `await frame()`           | Non-Lit components or wait for render |

Note: `frame()` is from `../core/utils/utils.js`

## Chai → Vitest Assertions

| Chai                     | Vitest                 |
| ------------------------ | ---------------------- |
| `.to.equal(x)`           | `.toBe(x)`             |
| `.to.deep.equal(x)`      | `.toEqual(x)`          |
| `.to.be.true`            | `.toBe(true)`          |
| `.to.be.false`           | `.toBe(false)`         |
| `.to.be.null`            | `.toBeNull()`          |
| `.not.to.be.null`        | `.not.toBeNull()`      |
| `.to.be.undefined`       | `.toBeUndefined()`     |
| `.to.be.ok`              | `.toBeTruthy()`        |
| `.not.to.be.ok`          | `.toBeFalsy()`         |
| `.to.be.empty`           | `.toHaveLength(0)`     |
| `.to.have.lengthOf(n)`   | `.toHaveLength(n)`     |
| `.to.contain(x)`         | `.toContain(x)`        |
| `.to.be.instanceOf(X)`   | `.toBeInstanceOf(X)`   |
| `.to.have.property('k')` | `.toHaveProperty('k')` |
| `.to.throw()`            | `.toThrow()`           |
| `.to.be.above(n)`        | `.toBeGreaterThan(n)`  |
| `.to.be.below(n)`        | `.toBeLessThan(n)`     |

## Sinon → Vitest Mocking

| Sinon                         | Vitest                         |
| ----------------------------- | ------------------------------ |
| `spy()`                       | `vi.fn()`                      |
| `spy(obj, 'method')`          | `vi.spyOn(obj, 'method')`      |
| `stub().returns(x)`           | `vi.fn().mockReturnValue(x)`   |
| `stub().resolves(x)`          | `vi.fn().mockResolvedValue(x)` |
| `.to.have.been.called`        | `.toHaveBeenCalled()`          |
| `.to.have.been.calledOnce`    | `.toHaveBeenCalledOnce()`      |
| `.to.have.been.calledWith(x)` | `.toHaveBeenCalledWith(x)`     |
| `.not.to.have.been.called`    | `.not.toHaveBeenCalled()`      |
| `match.any`                   | `expect.anything()`            |
| `match.string`                | `expect.any(String)`           |
| `sinon.restore()`             | `vi.restoreAllMocks()`         |
| `spy.restore()`               | `spy.mockRestore()`            |
| `stub(window, 'fetch')`       | `vi.stubGlobal('fetch', ...)`  |

## Browser Commands

| WTR                                 | Vitest Browser                         |
| ----------------------------------- | -------------------------------------- |
| `sendKeys({ press: ' ' })`          | `userEvent.keyboard(' ')`              |
| `sendKeys({ press: 'Enter' })`      | `userEvent.keyboard('{Enter}')`        |
| `sendKeys({ press: 'Tab' })`        | `userEvent.keyboard('{Tab}')`          |
| `sendKeys({ press: 'Escape' })`     | `userEvent.keyboard('{Escape}')`       |
| `sendKeys({ type: 'text' })`        | `userEvent.keyboard('text')`           |
| `sendMouse({ type: 'click', ... })` | `userEvent.click(el)`                  |
| Click disabled element              | `userEvent.click(el, { force: true })` |
| `setViewport({ width, height })`    | `page.viewport(width, height)`         |

## Test Harness Migration

```typescript
// BEFORE - clickElement helper
async clickElement(el: HTMLElement): Promise<void> {
  const { x, y, width, height } = el.getBoundingClientRect();
  await sendMouse({
    type: 'click',
    position: [Math.floor(x + width/2), Math.floor(y + height/2)]
  });
}

// AFTER
async clickElement(el: HTMLElement): Promise<void> {
  await userEvent.click(el);
}
```

## Accessibility Testing

```typescript
// Custom matcher already configured in project
await expect(el).toBeAccessible();
```

## Complete Example

```typescript
// BEFORE
import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';

it('should emit click', async () => {
  const el = await fixture(html`<forge-button>Click</forge-button>`);
  const clickSpy = spy();
  el.addEventListener('click', clickSpy);

  const { x, y, width, height } = el.getBoundingClientRect();
  await sendMouse({ type: 'click', position: [Math.floor(x + width / 2), Math.floor(y + height / 2)] });

  expect(clickSpy).to.have.been.calledOnce;
});

// AFTER
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';

it('should emit click', async () => {
  const screen = render(html`<forge-button>Click</forge-button>`);
  const el = screen.container.querySelector('forge-button')!;
  const clickSpy = vi.fn();
  el.addEventListener('click', clickSpy);

  await userEvent.click(el);

  expect(clickSpy).toHaveBeenCalledOnce();
});
```

## Mocking Global `fetch`

In vitest browser mode, `vi.spyOn(window, 'fetch')` won't intercept fetch calls because code uses bare `fetch()`. Use `vi.stubGlobal`:

```typescript
// Setup
const fetchMock = vi.fn().mockResolvedValue(new Response(svgData));
vi.stubGlobal('fetch', fetchMock);

// ... test code ...

// Cleanup
vi.unstubAllGlobals();

// Assertions
expect(fetchMock).toHaveBeenCalledOnce();
expect(fetchMock).toHaveBeenCalledWith('expected-url');
```

## Drag/Move Pointer Events

For drag/move operations that don't use `draggable`, use synthetic PointerEvents:

```typescript
// pointerdown on the drag handle element
el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX, clientY }));

// pointermove/pointerup on document (matching real browser behavior)
document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX, clientY }));
document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
```

## Polling with vi.waitFor()

For flaky timing-dependent conditions, use `vi.waitFor()` to poll until a condition is true. **Don't put `expect` inside** - wait for the condition, then assert.

```typescript
// BEFORE - fragile timing
ctx.simulateHover();
await frame();
expect(el.classList.contains('hover')).toBe(true); // May fail under CPU load

// AFTER - wait for condition, then assert
ctx.simulateHover();
await vi.waitFor(() => el.classList.contains('hover'));
expect(el.classList.contains('hover')).toBe(true);

// Wait for negation
await vi.waitFor(() => !el.classList.contains('loading'));
```

Options:
- Default timeout: 1000ms
- Default interval: 50ms
- Custom: `await vi.waitFor(fn, { timeout: 2000, interval: 100 })`

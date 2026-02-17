import { expect, describe, it, beforeEach, vi } from 'vitest';
import { ForgeResizeObserver } from './resize-observer.js';

describe('ForgeResizeObserver', () => {
  let element: Element;

  beforeEach(() => {
    ForgeResizeObserver['_targets'].clear();
    ForgeResizeObserver['_observer']?.disconnect();
    ForgeResizeObserver['_observer'] = undefined;

    element = document.createElement('div');
  });

  it('should instantiate the observer when a target is added', () => {
    ForgeResizeObserver.observe(element, () => {});
    expect(ForgeResizeObserver['_observer']).toBeTruthy();
  });

  it('should destroy the observer when all targets are removed', () => {
    ForgeResizeObserver.observe(element, () => {});
    ForgeResizeObserver.unobserve(element);
    expect(ForgeResizeObserver['_observer']).toBeUndefined();
  });

  it('should overwrite the callback of a target that is already observed', () => {
    const callbackOne = (): void => {};
    const callbackTwo = (): void => {};
    ForgeResizeObserver.observe(element, callbackOne);
    ForgeResizeObserver.observe(element, callbackTwo);
    expect(ForgeResizeObserver['_targets'].size).toBe(1);
    expect(ForgeResizeObserver['_targets'].get(element)).toBe(callbackTwo);
  });

  it('should invoke the callback when the target is resized', () => {
    const cb = vi.fn();
    const entry = { target: element } as ResizeObserverEntry;
    ForgeResizeObserver.observe(element, cb);
    ForgeResizeObserver['_handleResize']([entry], ForgeResizeObserver['_observer']!);
    expect(cb).toHaveBeenCalled();
  });
});

import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { ScrollAxisObserver, IScrollAxisObserver } from './scroll-axis-observer.js';

describe('ScrollAxisObserver', () => {
  let container: HTMLElement;
  let observer: IScrollAxisObserver | undefined;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.height = '250px';
    container.style.width = '250px';
    container.style.overflow = 'auto';

    const content = document.createElement('div');
    container.style.height = '500px';
    container.style.width = '500px';

    container.appendChild(content);
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (observer) {
      observer.destroy();
    }
    document.body.removeChild(container);
  });

  it('should throw if no element is provided', () => {
    expect(() => new ScrollAxisObserver(undefined as any)).toThrow();
  });
});

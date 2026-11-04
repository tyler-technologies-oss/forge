import { expect, describe, it, afterEach } from 'vitest';
import React from 'react';
import ReactDOM from 'react-dom';
import { useDynamicForgeComponent, UseDynamicComponentResult } from './useDynamicForgeComponent.js';

describe('useDynamicForgeComponent', () => {
  let container: HTMLDivElement;

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
    }
    document.querySelectorAll('div[data-test-dynamic-element]').forEach(el => el.remove());
  });

  function renderHarness(onReady: (controller: UseDynamicComponentResult<'div', any>) => void): void {
    function Harness(): null {
      const controller = useDynamicForgeComponent('div', undefined, undefined, {
        show: instance => {
          instance.setAttribute('data-test-dynamic-element', '');
          document.body.appendChild(instance);
        },
        hide: instance => {
          instance.remove();
        }
      });
      onReady(controller);
      return null;
    }

    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(React.createElement(Harness), container);
  }

  it('should create and show the underlying element via the show delegate', () => {
    let controller!: UseDynamicComponentResult<'div', any>;
    renderHarness(c => (controller = c));

    controller.show();

    expect(document.querySelector('div[data-test-dynamic-element]')).not.toBeNull();
  });

  it('should remove the underlying element via the hide delegate', async () => {
    let controller!: UseDynamicComponentResult<'div', any>;
    renderHarness(c => (controller = c));

    controller.show();
    await controller.hide();

    expect(document.querySelector('div[data-test-dynamic-element]')).toBeNull();
  });
});

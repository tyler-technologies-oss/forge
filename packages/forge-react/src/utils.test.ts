import { expect, describe, it, afterEach } from 'vitest';
import React from 'react';
import ReactDOM from 'react-dom';
import { createElementProxy } from './utils.js';

class TestProxyElement extends HTMLElement {
  public label?: string;
}
customElements.define('test-proxy-element', TestProxyElement);

declare global {
  interface HTMLElementTagNameMap {
    'test-proxy-element': TestProxyElement;
  }
}

describe('createElementProxy', () => {
  let container: HTMLDivElement;

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
    }
  });

  it('should render the underlying custom element when mounted', () => {
    const TestProxy = createElementProxy('test-proxy-element');
    container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(React.createElement(TestProxy), container);

    expect(container.querySelector('test-proxy-element')).not.toBeNull();
  });

  it('should forward props to the underlying element as properties', () => {
    const TestProxy = createElementProxy('test-proxy-element');
    container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(React.createElement(TestProxy, { label: 'hello' }), container);

    const element = container.querySelector('test-proxy-element') as TestProxyElement;
    expect(element.label).toBe('hello');
  });
});

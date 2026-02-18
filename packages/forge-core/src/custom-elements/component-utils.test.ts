import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { getClosestShadowRoot, hasDefinedCustomElement } from './component-utils.js';

describe('ComponentUtils', () => {
  describe('hasDefinedCustomElement', () => {
    class TestCustomElement extends HTMLElement {
      constructor() {
        super();
      }
    }

    it('should return true if custom element is defined', () => {
      window.customElements.define('test-component-that-returns-true-when-checked', TestCustomElement);
      expect(hasDefinedCustomElement('test-component-that-returns-true-when-checked')).toBe(true);
    });

    it('should return false if custom element is not defined', () => {
      expect(hasDefinedCustomElement('test-component-that-returns-false-when-checked')).toBe(false);
    });
  });

  describe('getClosestShadowRoot', () => {
    let lightElement: HTMLElement;
    let shadowHostElement: HTMLElement;
    let shadowElement: HTMLElement;
    let nestedShadowElement: HTMLElement;
    let shadowRoot: ShadowRoot;

    beforeEach(() => {
      lightElement = document.createElement('div');
      shadowHostElement = document.createElement('forge-core-test-component');
      shadowRoot = shadowHostElement.attachShadow({ mode: 'open' });
      shadowElement = document.createElement('div');
      nestedShadowElement = document.createElement('div');
      shadowElement.appendChild(nestedShadowElement);
      shadowRoot.appendChild(shadowElement);
    });

    afterEach(() => {
      lightElement.remove();
      shadowElement.remove();
    });

    it('should return null if not inside a shadow root', () => {
      expect(getClosestShadowRoot(lightElement)).toBeNull();
    });

    it('should not return null if inside a shadow root', () => {
      const node = getClosestShadowRoot(shadowElement);
      expect(node).not.toBeNull();
      expect(node).toBe(shadowRoot);
    });

    it('should find shadow root if nested', () => {
      const node = getClosestShadowRoot(nestedShadowElement);
      expect(node).toBe(shadowRoot);
    });
  });
});

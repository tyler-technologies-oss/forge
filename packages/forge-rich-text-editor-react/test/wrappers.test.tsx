import { describe, it, expect, afterEach } from 'vitest';
import React from 'react';
import ReactDOM from 'react-dom';
import { ForgeRteToolButton } from '../dist/index.js';

/**
 * Every element the generated wrappers cover. The wrappers register elements purely through the
 * side-effect import of their barrel, so this doubles as a check that the generated module paths
 * point at barrels that actually exist.
 */
const TAG_NAMES = [
  'forge-rich-text-content',
  'forge-rich-text-context',
  'forge-rich-text-editor',
  'forge-rich-text-renderer',
  'forge-rte-align',
  'forge-rte-bold',
  'forge-rte-bullet-list',
  'forge-rte-code',
  'forge-rte-divider',
  'forge-rte-heading',
  'forge-rte-italic',
  'forge-rte-link',
  'forge-rte-ordered-list',
  'forge-rte-standard-tools',
  'forge-rte-strike',
  'forge-rte-tool-button',
  'forge-rte-underline',
  'forge-rte-undo-redo'
];

// The feature elements only render inside a `forge-rich-text-editor`, so every render assertion
// uses `forge-rte-tool-button`, the one element with no editor context dependency.
describe('generated react wrappers', () => {
  let container: HTMLDivElement | undefined;

  const render = (element: React.ReactElement): HTMLElement => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(element, container);
    return container.firstElementChild as HTMLElement;
  };

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = undefined;
    }
  });

  it.each(TAG_NAMES)('should register %s when the package is imported', tagName => {
    expect(customElements.get(tagName)).toBeDefined();
  });

  it('should render the underlying custom element', () => {
    const element = render(<ForgeRteToolButton />);

    expect(element.tagName.toLowerCase()).toBe('forge-rte-tool-button');
    expect(element).toBeInstanceOf(customElements.get('forge-rte-tool-button')!);
  });

  it('should forward a camelCased prop to its kebab-cased attribute', () => {
    const element = render(<ForgeRteToolButton keyboardShortcut="Control+B" />);

    expect(element.getAttribute('keyboard-shortcut')).toBe('Control+B');
  });

  it('should forward a boolean prop to the underlying element', () => {
    const element = render(<ForgeRteToolButton disabled />);

    expect(element.hasAttribute('disabled')).toBe(true);
  });

  it('should pass children through to the custom element', () => {
    const element = render(<ForgeRteToolButton>Bold</ForgeRteToolButton>);

    expect(element.textContent).toContain('Bold');
  });
});

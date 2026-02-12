import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IScaffoldComponent } from './scaffold.js';
import { SCAFFOLD_CONSTANTS } from './scaffold-constants.js';

import './scaffold.js';

describe('Scaffold', () => {
  it('should create shadow root', async () => {
    const screen = render(html`<forge-scaffold></forge-scaffold>`);
    const el = screen.container.querySelector('forge-scaffold') as IScaffoldComponent;

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should reflect viewport attribute when set via property', async () => {
    const screen = render(html`<forge-scaffold></forge-scaffold>`);
    const el = screen.container.querySelector('forge-scaffold') as IScaffoldComponent;

    el.viewport = true;

    expect(el.viewport).toBe(true);
    expect(el.hasAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT)).toBe(true);
  });

  it('should reflect viewport property when set via attribute', async () => {
    const screen = render(html`<forge-scaffold viewport></forge-scaffold>`);
    const el = screen.container.querySelector('forge-scaffold') as IScaffoldComponent;

    expect(el.viewport).toBe(true);
    expect(el.hasAttribute(SCAFFOLD_CONSTANTS.attributes.VIEWPORT)).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { IPageStateComponent, PageStateComponent } from './page-state.js';

import './page-state.js';

describe('PageStateComponent', () => {
  it('should instantiate component instance', async () => {
    const screen = render(html`<forge-page-state></forge-page-state>`);
    const el = screen.container.querySelector('forge-page-state') as IPageStateComponent;
    expect(el).toBeInstanceOf(PageStateComponent);
    expect(el.shadowRoot).not.toBeNull();
  });
});

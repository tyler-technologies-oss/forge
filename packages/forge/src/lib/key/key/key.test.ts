import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { KeyComponent } from './key.js';

import './key.js';

describe('Key', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-key></forge-key>`);
    const el = screen.container.querySelector('forge-key') as KeyComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-key></forge-key>`);
    const el = screen.container.querySelector('forge-key') as KeyComponent;

    await expect(el).toBeAccessible();
  });
});

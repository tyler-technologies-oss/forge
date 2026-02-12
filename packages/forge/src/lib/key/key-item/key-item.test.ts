import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { KeyItemComponent } from './key-item.js';

import './key-item.js';

describe('Key Item', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-key-item></forge-key-item>`);
    const el = screen.container.querySelector('forge-key-item') as KeyItemComponent;

    expect(el.shadowRoot).not.toBeNull();
  });
});

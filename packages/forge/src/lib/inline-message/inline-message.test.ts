import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { IInlineMessageComponent } from './inline-message.js';
import { InlineMessageTheme, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants.js';
import { frame } from '../core/utils/utils.js';

import './inline-message.js';

describe('Inline Message', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-inline-message>Test content</forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-inline-message>Test content</forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    await expect(el).toBeAccessible();
  });

  it('should be accessible in all theme colors', async () => {
    const screen = render(html`
      <forge-inline-message>
        <span slot="icon">X</span>
        <span slot="title">Test title</span>
        <span>Test content</span>
      </forge-inline-message>
    `);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;

    const themes: InlineMessageTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
    for (const theme of themes) {
      el.theme = theme;
      await frame();
      await expect(el).toBeAccessible();
    }
  });

  it('should be accessible if role="alert" is provided', async () => {
    const screen = render(html`<forge-inline-message role="alert">Test content</forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    await expect(el).toBeAccessible();
  });

  it('should set theme attribute when theme property is set', async () => {
    const screen = render(html`<forge-inline-message></forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    el.theme = 'error';
    expect(el.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.THEME)).toBe('error');
  });

  it('should set theme property when theme attribute is set', async () => {
    const screen = render(html`<forge-inline-message theme="error"></forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    expect(el.theme).toBe('error');
  });
});

import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { IInlineMessageComponent } from './inline-message';
import { InlineMessageTheme, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants';

import './inline-message';

describe('Inline Message', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-inline-message>Test content</forge-inline-message>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`<forge-inline-message>Test content</forge-inline-message>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible in all theme colors', async () => {
    const el = await fixture<IInlineMessageComponent>(html`
      <forge-inline-message>
        <span slot="icon">X</span>
        <span slot="title">Test title</span>
        <span>Test content</span>
      </forge-inline-message>
    `);
    
    const themes: InlineMessageTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
    for (const theme of themes) {
      el.theme = theme;
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    }
  });

  it('should be accessible if role="alert" is provided', async () => {
    const el = await fixture(html`<forge-inline-message role="alert">Test content</forge-inline-message>`);
    await expect(el).to.be.accessible();
  });

  it('should set theme attribute when theme property is set', async () => {
    const el = await fixture<IInlineMessageComponent>(html`<forge-inline-message></forge-inline-message>`);
    el.theme = 'error';
    expect(el.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.THEME)).to.equal('error');
  });

  it('should set theme property when theme attribute is set', async () => {
    const el = await fixture<IInlineMessageComponent>(html`<forge-inline-message theme="error"></forge-inline-message>`);
    expect(el.theme).to.equal('error');
  });
});

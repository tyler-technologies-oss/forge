import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { IInlineMessageComponent } from './inline-message.js';
import { InlineMessageTheme, InlineMessageVariant, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants.js';
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

    const themes: InlineMessageTheme[] = [
      'default',
      'info',
      'success',
      'warning',
      'error',
      'critical',
      'primary',
      'secondary',
      'tertiary',
      'info-secondary',
      'danger'
    ];
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

  it('should default the theme to default', async () => {
    const screen = render(html`<forge-inline-message></forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    expect(el.theme).toBe('default');
  });

  it('should remove the theme attribute when set to default', async () => {
    const screen = render(html`<forge-inline-message theme="info"></forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    el.theme = 'default';
    expect(el.hasAttribute(INLINE_MESSAGE_CONSTANTS.attributes.THEME)).toBe(false);
  });

  it('should use a different background for the info theme than the default', async () => {
    expect(await getBackground('info')).not.toBe(await getBackground());
  });

  (['primary', 'secondary', 'tertiary', 'info-secondary'] as InlineMessageTheme[]).forEach(theme => {
    it(`should render the deprecated ${theme} theme as default`, async () => {
      expect(await getBackground(theme)).toBe(await getBackground());
    });
  });

  it('should default the variant to tonal', async () => {
    const screen = render(html`<forge-inline-message></forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    expect(el.variant).toBe('tonal');
  });

  it('should set the variant attribute when the variant property is set', async () => {
    const screen = render(html`<forge-inline-message></forge-inline-message>`);
    const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
    el.variant = 'outlined';
    expect(el.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.VARIANT)).toBe('outlined');
    el.variant = 'tonal';
    expect(el.hasAttribute(INLINE_MESSAGE_CONSTANTS.attributes.VARIANT)).toBe(false);
  });

  it('should keep the same height in the tonal and outlined variants', async () => {
    expect((await getRootStyle(undefined, 'outlined')).height).toBe((await getRootStyle()).height);
  });

  it('should draw an inset border ring only in the outlined variant', async () => {
    expect((await getRootStyle()).boxShadow).toBe('none');
    expect((await getRootStyle(undefined, 'outlined')).boxShadow).toContain('inset');
  });

  it('should use a lighter background in the outlined variant', async () => {
    expect((await getRootStyle('info', 'outlined')).backgroundColor).not.toBe((await getRootStyle('info')).backgroundColor);
  });

  it('should use the theme color for the outlined border', async () => {
    expect((await getRootStyle('error', 'outlined')).boxShadow).not.toBe((await getRootStyle(undefined, 'outlined')).boxShadow);
  });

  it('should tint the text with the theme color', async () => {
    expect((await getRootStyle('success')).color).not.toBe((await getRootStyle()).color);
  });

  (['critical', 'danger'] as InlineMessageTheme[]).forEach(theme => {
    it(`should render the ${theme} theme as error`, async () => {
      expect(await getBackground(theme)).toBe(await getBackground('error'));
    });
  });
});

async function getBackground(theme?: InlineMessageTheme): Promise<string> {
  return (await getRootStyle(theme)).backgroundColor;
}

async function getRootStyle(theme?: InlineMessageTheme, variant?: InlineMessageVariant): Promise<CSSStyleDeclaration> {
  const screen = render(html`<forge-inline-message theme=${theme ?? nothing} variant=${variant ?? nothing}>Test content</forge-inline-message>`);
  const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
  await frame();
  const root = el.shadowRoot?.querySelector('.forge-inline-message') as HTMLElement;
  return getComputedStyle(root);
}

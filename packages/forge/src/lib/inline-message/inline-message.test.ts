import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { IInlineMessageComponent } from './inline-message.js';
import { InlineMessageTheme, InlineMessageVariant, INLINE_MESSAGE_CONSTANTS } from './inline-message-constants.js';
import { frame } from '../core/utils/utils.js';

import './inline-message.js';

const THEME_TOKENS = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info', 'surface'].flatMap(role => [
  `${role}-container`,
  `${role}-container-low`,
  `${role}-container-minimum`,
  `on-${role}-container`,
  `on-${role}-container-low`,
  'text-high'
]);
const TOKEN_COLORS = Object.fromEntries(
  THEME_TOKENS.map((name, index) => [`--forge-theme-${name}`, `rgb(${(index * 7) % 250}, ${(index * 11 + 5) % 250}, ${(index * 13 + 9) % 250})`])
);
const TOKEN_STYLE = Object.entries(TOKEN_COLORS)
  .map(([name, color]) => `${name}: ${color}`)
  .join('; ');

const resolveColor = (token: string): string => {
  const probe = document.createElement('div');
  probe.style.color = TOKEN_COLORS[token];
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
};

const getRoot = (el: IInlineMessageComponent): HTMLElement => el.shadowRoot?.querySelector('.forge-inline-message') as HTMLElement;

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

  describe('theme colors', () => {
    const expectedBackgrounds: Array<[InlineMessageTheme, string]> = [
      ['info', '--forge-theme-info-container-low'],
      ['primary', '--forge-theme-primary-container-low'],
      ['secondary', '--forge-theme-secondary-container'],
      ['tertiary', '--forge-theme-tertiary-container-low'],
      ['success', '--forge-theme-success-container-low'],
      ['warning', '--forge-theme-warning-container-low'],
      ['error', '--forge-theme-error-container-low'],
      ['danger', '--forge-theme-error-container-low'],
      ['critical', '--forge-theme-error-container-low'],
      ['info-secondary', '--forge-theme-surface-container-low'],
      ['default', '--forge-theme-surface-container-low']
    ];

    for (const [theme, token] of expectedBackgrounds) {
      it(`should render the ${theme} theme with the ${token} background`, async () => {
        const screen = render(html`<forge-inline-message style=${TOKEN_STYLE} theme=${theme}>Test</forge-inline-message>`);
        const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
        await frame();
        expect(getComputedStyle(getRoot(el)).backgroundColor).toBe(resolveColor(token));
      });
    }

    it('should render the unthemed inline message as info', async () => {
      const screen = render(html`<forge-inline-message style=${TOKEN_STYLE}>Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      await frame();
      expect(el.theme).toBe('info');
      expect(getComputedStyle(getRoot(el)).backgroundColor).toBe(resolveColor('--forge-theme-info-container-low'));
    });
  });

  describe('variant', () => {
    it('should be tonal by default', async () => {
      const screen = render(html`<forge-inline-message>Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      expect(el.variant).toBe('tonal');
      expect(el.hasAttribute(INLINE_MESSAGE_CONSTANTS.attributes.VARIANT)).toBe(false);
    });

    it('should set variant attribute when variant property is set', async () => {
      const screen = render(html`<forge-inline-message>Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      el.variant = 'outlined';
      expect(el.getAttribute(INLINE_MESSAGE_CONSTANTS.attributes.VARIANT)).toBe('outlined');

      el.variant = 'tonal' as InlineMessageVariant;
      expect(el.hasAttribute(INLINE_MESSAGE_CONSTANTS.attributes.VARIANT)).toBe(false);
    });

    it('should set variant property when variant attribute is set', async () => {
      const screen = render(html`<forge-inline-message variant="outlined">Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      expect(el.variant).toBe('outlined');
    });

    it('should draw an inset border ring and use the outlined background when outlined', async () => {
      const screen = render(html`<forge-inline-message style=${TOKEN_STYLE} variant="outlined">Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      await frame();
      const styles = getComputedStyle(getRoot(el));
      expect(styles.boxShadow).toContain('inset');
      expect(styles.backgroundColor).toBe(resolveColor('--forge-theme-info-container-minimum'));
    });

    it('should not draw a border ring when tonal', async () => {
      const screen = render(html`<forge-inline-message>Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      await frame();
      expect(getComputedStyle(getRoot(el)).boxShadow).toBe('none');
    });

    it('should be accessible when outlined in all themes', async () => {
      const screen = render(html`<forge-inline-message variant="outlined">Test</forge-inline-message>`);
      const el = screen.container.querySelector('forge-inline-message') as IInlineMessageComponent;
      for (const theme of ['default', 'info', 'success', 'warning', 'error', 'critical'] as InlineMessageTheme[]) {
        el.theme = theme;
        await frame();
        await expect(el).toBeAccessible();
      }
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import type { IBadgeComponent } from './badge.js';
import type { BadgeColor, BadgeTheme, BadgeVariant } from './badge-constants.js';

import './badge.js';

describe('Badge', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-badge>Test</forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-badge>Test</forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible in all theme colors', async () => {
    const screen = render(html`<forge-badge>Test</forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    const themes: BadgeTheme[] = [
      'default',
      'info',
      'success',
      'warning',
      'error',
      'critical',
      'primary',
      'secondary',
      'tertiary',
      'info-primary',
      'info-secondary',
      'danger'
    ];
    for (const theme of themes) {
      el.theme = theme;
      await el.updateComplete;
      await expect(el).toBeAccessible();
    }
  });

  it('should set theme attribute when theme property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.theme = 'error';
    await el.updateComplete;

    expect(el.getAttribute('theme')).toBe('error');
  });

  it('should set theme property when theme attribute is set', async () => {
    const screen = render(html`<forge-badge theme="error"></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    expect(el.theme).toBe('error');
  });

  it('should get default theme when no theme attribute is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;

    expect(el.theme).toBe('default');
  });

  it('should set dot attribute when dot property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.dot = true;
    await el.updateComplete;

    expect(el.hasAttribute('dot')).toBe(true);
    expect(el.matches(':state(dot)')).toBe(true);
  });

  it('should set dot property when dot attribute is set', async () => {
    const screen = render(html`<forge-badge dot></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;

    expect(el.dot).toBe(true);
    expect(el.matches(':state(dot)')).toBe(true);
  });

  it('should set strong attribute when strong property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.strong = true;
    await el.updateComplete;

    expect(el.hasAttribute('strong')).toBe(true);
    expect(el.matches(':state(strong)')).toBe(true);
  });

  it('should set strong property when strong attribute is set', async () => {
    const screen = render(html`<forge-badge strong></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;

    expect(el.strong).toBe(true);
    expect(el.matches(':state(strong)')).toBe(true);
  });

  it('should set hide attribute when hide property is set', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    el.hide = true;
    await el.updateComplete;

    expect(el.hasAttribute('hide')).toBe(true);
    expect(el.matches(':state(hide)')).toBe(true);
  });

  it('should set hide property when hide attribute is set', async () => {
    const screen = render(html`<forge-badge hide></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;

    expect(el.hide).toBe(true);
    expect(el.matches(':state(hide)')).toBe(true);
  });

  it('should set transform when hide attribute is set', async () => {
    const screen = render(html`<forge-badge hide></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;
    const rootEl = el.shadowRoot?.querySelector('.forge-badge') as HTMLElement;

    expect(getComputedStyle(rootEl).transform).toBe('matrix(0, 0, 0, 0, 0, 0)');
  });

  it('should be accessible in every color and appearance', async () => {
    const screen = render(html`
      <div>
        ${BADGE_COLORS.map(
          color => html`
            <forge-badge color=${color}>${color}</forge-badge>
            <forge-badge color=${color} variant="outlined">${color}</forge-badge>
            <forge-badge color=${color} strong>${color}</forge-badge>
          `
        )}
      </div>
    `);
    const badges = Array.from(screen.container.querySelectorAll('forge-badge')) as IBadgeComponent[];
    await Promise.all(badges.map(badge => badge.updateComplete));
    await expect(screen.container.firstElementChild as HTMLElement).toBeAccessible();
  });

  it('should default the variant to tonal', async () => {
    const screen = render(html`<forge-badge></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    expect(el.variant).toBe('tonal');
  });

  it('should turn off strong when the variant is set to outlined', async () => {
    const screen = render(html`<forge-badge strong></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;
    el.variant = 'outlined';
    await el.updateComplete;
    expect(el.strong).toBe(false);
    expect(el.variant).toBe('outlined');
  });

  it('should reset the variant to tonal when strong is set', async () => {
    const screen = render(html`<forge-badge variant="outlined"></forge-badge>`);
    const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
    await el.updateComplete;
    el.strong = true;
    await el.updateComplete;
    expect(el.variant).toBe('tonal');
    expect(el.strong).toBe(true);
  });

  it('should draw an inset border ring only in the outlined variant', async () => {
    expect((await getBadgeStyle()).boxShadow).toBe('none');
    expect((await getBadgeStyle({ variant: 'outlined' })).boxShadow).toContain('inset');
  });

  it('should use a different background when strong', async () => {
    expect((await getBadgeStyle({ theme: 'info', strong: true })).backgroundColor).not.toBe((await getBadgeStyle({ theme: 'info' })).backgroundColor);
  });

  it('should use a different background for a color than the default', async () => {
    expect((await getBadgeStyle({ color: 'plum' })).backgroundColor).not.toBe((await getBadgeStyle()).backgroundColor);
  });

  it('should give color precedence over theme', async () => {
    expect((await getBadgeStyle({ theme: 'error', color: 'plum' })).backgroundColor).toBe((await getBadgeStyle({ color: 'plum' })).backgroundColor);
  });

  (['primary', 'secondary', 'tertiary', 'info-secondary'] as BadgeTheme[]).forEach(theme => {
    it(`should render the deprecated ${theme} theme as default`, async () => {
      expect((await getBadgeStyle({ theme })).backgroundColor).toBe((await getBadgeStyle()).backgroundColor);
    });
  });

  (
    [
      ['info-primary', 'info'],
      ['critical', 'error'],
      ['danger', 'error']
    ] as [BadgeTheme, BadgeTheme][]
  ).forEach(([alias, theme]) => {
    it(`should render the ${alias} theme as ${theme}`, async () => {
      expect((await getBadgeStyle({ theme: alias })).backgroundColor).toBe((await getBadgeStyle({ theme })).backgroundColor);
    });
  });
});

const BADGE_COLORS: BadgeColor[] = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'lime',
  'mint',
  'sky'
];

interface BadgeStyleConfig {
  theme?: BadgeTheme;
  color?: BadgeColor;
  variant?: BadgeVariant;
  strong?: boolean;
}

async function getBadgeStyle({ theme, color, variant, strong }: BadgeStyleConfig = {}): Promise<CSSStyleDeclaration> {
  const screen = render(
    html`<forge-badge theme=${theme ?? nothing} color=${color ?? nothing} variant=${variant ?? nothing} ?strong=${strong}>Test</forge-badge>`
  );
  const el = screen.container.querySelector('forge-badge') as IBadgeComponent;
  await el.updateComplete;
  const root = el.shadowRoot?.querySelector('.forge-badge') as HTMLElement;
  return getComputedStyle(root);
}

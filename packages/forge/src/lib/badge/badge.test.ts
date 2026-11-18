import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import type { IBadgeComponent } from './badge.js';
import type { BadgeTheme } from './badge-constants.js';

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

    const themes: BadgeTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
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

  describe('critical theme', () => {
    it('should render the critical theme the same as the error theme', async () => {
      for (const strong of [false, true]) {
        const screen = render(html`
          <forge-badge theme="error" ?strong=${strong}>Error</forge-badge>
          <forge-badge theme="critical" ?strong=${strong}>Critical</forge-badge>
        `);
        const [errorEl, criticalEl] = await rendered(screen.container);
        const errorStyle = getComputedStyle(getRoot(errorEl));
        const criticalStyle = getComputedStyle(getRoot(criticalEl));

        expect(criticalStyle.backgroundColor).toBe(errorStyle.backgroundColor);
        expect(criticalStyle.color).toBe(errorStyle.color);
      }
    });

    it('should render the legacy danger theme the same as the error theme', async () => {
      const screen = render(html`
        <forge-badge theme="error">Error</forge-badge>
        <forge-badge theme="danger">Danger</forge-badge>
      `);
      const [errorEl, dangerEl] = await rendered(screen.container);

      expect(getComputedStyle(getRoot(dangerEl)).backgroundColor).toBe(getComputedStyle(getRoot(errorEl)).backgroundColor);
    });
  });

  describe('existing appearance', () => {
    const palette = [
      'secondary',
      'on-secondary',
      'primary',
      'on-primary',
      'success',
      'on-success',
      'warning',
      'on-warning',
      'error',
      'on-error',
      'info',
      'on-info',
      'primary-container',
      'on-primary-container',
      'secondary-container',
      'on-secondary-container',
      'tertiary-container',
      'on-tertiary-container',
      'success-container',
      'on-success-container',
      'warning-container',
      'on-warning-container',
      'surface-container-low'
    ];
    const themeStyle = palette.map((name, index) => `--forge-theme-${name}: rgb(${index + 1}, ${index + 2}, ${index + 3})`).join('; ');
    const colorOf = (name: string): string => {
      const index = palette.indexOf(name);
      return `rgb(${index + 1}, ${index + 2}, ${index + 3})`;
    };

    it('should render the default badge with the secondary solid colors', async () => {
      const screen = render(html`<forge-badge style=${themeStyle}>Default</forge-badge>`);
      const [el] = await rendered(screen.container);
      const style = getComputedStyle(getRoot(el));

      expect(style.backgroundColor).toBe(colorOf('secondary'));
      expect(style.color).toBe(colorOf('on-secondary'));
      expect(style.boxShadow).toBe('none');
    });

    it('should render themed badges with their container colors', async () => {
      const screen = render(html`<forge-badge style=${themeStyle}></forge-badge>`);
      const [el] = await rendered(screen.container);

      for (const theme of ['primary', 'secondary', 'tertiary', 'success', 'warning'] as const) {
        el.theme = theme;
        await el.updateComplete;
        const style = getComputedStyle(getRoot(el));

        expect(style.backgroundColor).toBe(colorOf(`${theme}-container`));
        expect(style.color).toBe(colorOf(`on-${theme}-container`));
      }
    });

    it('should render strong themed badges with their solid colors', async () => {
      const screen = render(html`<forge-badge strong style=${themeStyle}></forge-badge>`);
      const [el] = await rendered(screen.container);

      for (const theme of ['primary', 'success', 'warning', 'error', 'info'] as const) {
        el.theme = theme;
        await el.updateComplete;
        const style = getComputedStyle(getRoot(el));

        expect(style.backgroundColor).toBe(colorOf(theme));
        expect(style.color).toBe(colorOf(`on-${theme}`));
      }
    });

    it('should render an unthemed strong badge the same as an unthemed badge', async () => {
      const screen = render(html`
        <forge-badge style=${themeStyle}>Default</forge-badge>
        <forge-badge strong style=${themeStyle}>Strong</forge-badge>
      `);
      const [baseEl, strongEl] = await rendered(screen.container);

      expect(getComputedStyle(getRoot(strongEl)).backgroundColor).toBe(getComputedStyle(getRoot(baseEl)).backgroundColor);
      expect(getComputedStyle(getRoot(strongEl)).color).toBe(getComputedStyle(getRoot(baseEl)).color);
    });
  });

  describe('variant', () => {
    it('should default to the tonal variant', async () => {
      const screen = render(html`<forge-badge></forge-badge>`);
      const [el] = await rendered(screen.container);

      expect(el.variant).toBe('tonal');
      expect(el.getAttribute('variant')).toBe('tonal');
    });

    it('should set variant attribute when variant property is set', async () => {
      const screen = render(html`<forge-badge></forge-badge>`);
      const [el] = await rendered(screen.container);
      el.variant = 'outlined';
      await el.updateComplete;

      expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('should draw an inset ring and a transparent background when outlined', async () => {
      const screen = render(html`<forge-badge variant="outlined" theme="success">Test</forge-badge>`);
      const [el] = await rendered(screen.container);
      const style = getComputedStyle(getRoot(el));

      expect(style.boxShadow).not.toBe('none');
      expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    });

    it('should keep the same size when outlined', async () => {
      const screen = render(html`
        <forge-badge theme="success">Test</forge-badge>
        <forge-badge theme="success" variant="outlined">Test</forge-badge>
      `);
      const [tonalEl, outlinedEl] = await rendered(screen.container);

      expect(outlinedEl.getBoundingClientRect().width).toBe(tonalEl.getBoundingClientRect().width);
      expect(outlinedEl.getBoundingClientRect().height).toBe(tonalEl.getBoundingClientRect().height);
    });

    it('should turn off strong when variant is set to outlined', async () => {
      const screen = render(html`<forge-badge strong></forge-badge>`);
      const [el] = await rendered(screen.container);
      el.variant = 'outlined';
      await el.updateComplete;
      await el.updateComplete;

      expect(el.strong).toBe(false);
      expect(el.variant).toBe('outlined');
    });

    it('should reset variant to tonal when strong is set', async () => {
      const screen = render(html`<forge-badge variant="outlined"></forge-badge>`);
      const [el] = await rendered(screen.container);
      el.strong = true;
      await el.updateComplete;
      await el.updateComplete;

      expect(el.variant).toBe('tonal');
      expect(el.strong).toBe(true);
    });

    it('should use the outlined custom properties', async () => {
      const screen = render(html`<forge-badge variant="outlined" style="--forge-badge-outlined-background: rgb(1, 2, 3)">Test</forge-badge>`);
      const [el] = await rendered(screen.container);

      expect(getComputedStyle(getRoot(el)).backgroundColor).toBe('rgb(1, 2, 3)');
    });
  });

  describe('color', () => {
    it('should have no color by default', async () => {
      const screen = render(html`<forge-badge></forge-badge>`);
      const [el] = await rendered(screen.container);

      expect(el.color).toBeUndefined();
    });

    it('should set color attribute when color property is set', async () => {
      const screen = render(html`<forge-badge></forge-badge>`);
      const [el] = await rendered(screen.container);
      el.color = 'plum';
      await el.updateComplete;

      expect(el.getAttribute('color')).toBe('plum');
    });

    it('should use the hue custom properties when they are provided', async () => {
      const screen = render(html`
        <forge-badge color="plum" style="--forge-color-plum-a3: rgb(10, 20, 30); --forge-color-plum-a12: rgb(200, 210, 220)">Test</forge-badge>
      `);
      const [el] = await rendered(screen.container);
      const style = getComputedStyle(getRoot(el));

      expect(style.backgroundColor).toBe('rgb(10, 20, 30)');
      expect(style.color).toBe('rgb(200, 210, 220)');
    });

    it('should render a neutral badge when the hue custom properties are not provided', async () => {
      const screen = render(html`<forge-badge color="plum" style="--forge-theme-surface-container-low: rgb(9, 8, 7)">Test</forge-badge>`);
      const [el] = await rendered(screen.container);

      expect(getComputedStyle(getRoot(el)).backgroundColor).toBe('rgb(9, 8, 7)');
    });

    it('should take precedence over theme', async () => {
      const screen = render(html` <forge-badge color="plum" theme="error" style="--forge-color-plum-a3: rgb(10, 20, 30)">Test</forge-badge> `);
      const [el] = await rendered(screen.container);

      expect(getComputedStyle(getRoot(el)).backgroundColor).toBe('rgb(10, 20, 30)');
    });

    it('should use the solid hue colors when strong', async () => {
      const screen = render(html`
        <forge-badge strong color="plum" style="--forge-color-plum-solid: rgb(40, 50, 60); --forge-color-plum-contrast: rgb(250, 250, 250)">Test</forge-badge>
      `);
      const [el] = await rendered(screen.container);
      const style = getComputedStyle(getRoot(el));

      expect(style.backgroundColor).toBe('rgb(40, 50, 60)');
      expect(style.color).toBe('rgb(250, 250, 250)');
    });
  });
});

function getRoot(el: IBadgeComponent): HTMLElement {
  return el.shadowRoot?.querySelector('.forge-badge') as HTMLElement;
}

async function rendered(container: Element): Promise<IBadgeComponent[]> {
  const els = Array.from(container.querySelectorAll('forge-badge')) as IBadgeComponent[];
  await Promise.all(els.map(el => el.updateComplete));
  return els;
}

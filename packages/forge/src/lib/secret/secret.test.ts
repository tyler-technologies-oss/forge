import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import type { IStateLayerComponent } from '../state-layer/index.js';
import type { ITooltipComponent } from '../tooltip/index.js';
import type { SecretComponent } from './secret.js';

import './secret.js';

class SecretHarness {
  public rootElement: HTMLElement;
  public button: HTMLButtonElement;
  public contentElement: HTMLElement;
  public liveRegion: HTMLElement;
  public stateLayer: IStateLayerComponent;
  public focusIndicator: IFocusIndicatorComponent;

  constructor(public element: SecretComponent) {
    this.rootElement = getShadowElement(this.element, '.forge-secret');
    this.button = getShadowElement(this.element, 'button') as HTMLButtonElement;
    this.contentElement = getShadowElement(this.element, '.content');
    this.liveRegion = getShadowElement(this.element, '[aria-live="polite"]');
    this.stateLayer = getShadowElement(this.element, 'forge-state-layer') as IStateLayerComponent;
    this.focusIndicator = getShadowElement(this.element, 'forge-focus-indicator') as IFocusIndicatorComponent;
  }

  public async clickButton(): Promise<void> {
    this.button.click();
  }

  public async pressEnter(): Promise<void> {
    this.button.focus();
    await userEvent.keyboard('{Enter}');
  }

  public async pressSpace(): Promise<void> {
    this.button.focus();
    await userEvent.keyboard(' ');
  }

  public async pressEscape(): Promise<void> {
    await userEvent.keyboard('{Escape}');
  }

  public getTooltip(): ITooltipComponent | null {
    return this.element.shadowRoot?.querySelector('forge-tooltip') as ITooltipComponent | null;
  }

  public getIcon(): HTMLElement | null {
    return this.element.shadowRoot?.querySelector('forge-icon') || null;
  }

  public getSlot(name?: string): HTMLSlotElement | null {
    if (name) {
      return this.element.shadowRoot?.querySelector(`slot[name="${name}"]`) as HTMLSlotElement | null;
    }
    return this.element.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
  }
}

describe('Secret', () => {
  describe('initialization', () => {
    it('should contain shadow root', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should be accessible', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should have default property values', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.visible).toBe(false);
      expect(el.variant).toBe('blur');
      expect(el.showOnHover).toBe(false);
      expect(el.noLabel).toBe(false);
      expect(el.name).toBe('');
    });

    it('should not contain forge-state-layer for blur variant when hidden', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).toBeNull();
    });

    it('should contain forge-state-layer for dots variant', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
    });

    it('should contain forge-state-layer when visible', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
    });

    it('should contain forge-focus-indicator', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.focusIndicator).toBeTruthy();
    });

    it('should have role group and default aria-label', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      expect(el.getAttribute('role')).toBe('group');
      expect(el.getAttribute('aria-label')).toBe('secret');
    });

    it('should allow setting aria-label programmatically', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      expect(el.getAttribute('aria-label')).toBe('secret');

      el.setAttribute('aria-label', 'Custom label');
      await el.updateComplete;

      expect(el.getAttribute('aria-label')).toBe('Custom label');
    });
  });

  describe('visibility toggle', () => {
    it('should toggle visible state on click', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.visible).toBe(false);

      await ctx.clickButton();

      expect(el.visible).toBe(true);

      await ctx.clickButton();

      expect(el.visible).toBe(false);
    });

    it('should toggle visible state on Enter key', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.visible).toBe(false);

      await ctx.pressEnter();

      expect(el.visible).toBe(true);
    });

    it('should toggle visible state on Space key', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.visible).toBe(false);

      await ctx.pressSpace();

      expect(el.visible).toBe(true);
    });

    it('should update custom state when visible changes', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.matches(':state(visible)')).toBe(false);

      el.visible = true;
      await el.updateComplete;

      expect(el.matches(':state(visible)')).toBe(true);
    });

    it('should update aria-expanded when visible changes', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.button.getAttribute('aria-expanded')).toBe('false');

      el.visible = true;
      await el.updateComplete;

      expect(ctx.button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle inert attribute on content', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.inert).toBe(true);

      el.visible = true;
      await el.updateComplete;

      expect(ctx.contentElement.inert).toBe(false);
    });

    it('should dispatch forge-secret-change event on toggle', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);
      const changeSpy = vi.fn();

      el.addEventListener('forge-secret-change', changeSpy);

      await ctx.clickButton();

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ visible: true });
    });

    it('should maintain focus on button after toggle', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      ctx.button.focus();
      await ctx.clickButton();

      expect(document.activeElement).toBe(el);
    });
  });

  describe('Escape key handling', () => {
    it('should hide visible content when Escape is pressed on button', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.visible).toBe(true);

      ctx.button.focus();
      await ctx.pressEscape();

      expect(el.visible).toBe(false);
    });

    it('should not affect already hidden content when Escape is pressed', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.visible).toBe(false);

      ctx.button.focus();
      await ctx.pressEscape();

      expect(el.visible).toBe(false);
    });

    it('should dispatch forge-secret-change event when hiding via Escape', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);
      const changeSpy = vi.fn();

      el.addEventListener('forge-secret-change', changeSpy);

      ctx.button.focus();
      await ctx.pressEscape();

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ visible: false });
    });
  });

  describe('variant', () => {
    it('should show blur variant by default', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.variant).toBe('blur');
    });

    it('should apply dots variant when set', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.variant).toBe('dots');
    });

    it('should change variant dynamically', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.variant).toBe('blur');

      el.variant = 'dots';
      await el.updateComplete;

      expect(el.variant).toBe('dots');
    });

    it('should render icon for dots variant when hidden', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('name')).toBe('eye');
    });

    it('should render icon for dots variant when visible', async () => {
      const screen = render(html`<forge-secret variant="dots" visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('name')).toBe('eye_off');
    });

    it('should not render icon for blur variant', async () => {
      const screen = render(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).toBeNull();
    });
  });

  describe('showOnHover', () => {
    it('should set showOnHover property', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.showOnHover).toBe(false);

      el.showOnHover = true;
      await el.updateComplete;

      expect(el.showOnHover).toBe(true);
    });

    it('should add show-on-hover class to root when showOnHover is true', async () => {
      const screen = render(html`<forge-secret show-on-hover>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.rootElement.classList.contains('show-on-hover')).toBe(true);
    });

    it('should not add show-on-hover class when showOnHover is false', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.rootElement.classList.contains('show-on-hover')).toBe(false);
    });
  });

  describe('noLabel', () => {
    it('should set noLabel property', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.noLabel).toBe(false);

      el.noLabel = true;
      await el.updateComplete;

      expect(el.noLabel).toBe(true);
    });

    it('should add label--hidden class when noLabel is true', async () => {
      const screen = render(html`<forge-secret no-label>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const labelElement = el.shadowRoot?.querySelector('.label') as HTMLElement;

      expect(labelElement.classList.contains('label--hidden')).toBe(true);
    });

    it('should be accessible when noLabel is true', async () => {
      const screen = render(html`<forge-secret no-label>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });
  });

  describe('tooltip', () => {
    it('should not render tooltip for blur variant when hidden and not showOnHover and not noLabel', async () => {
      const screen = render(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).toBeNull();
    });

    it('should render tooltip for dots variant when hidden', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).toBeTruthy();
      expect(tooltip?.textContent?.trim()).toBe('Show');
    });

    it('should render tooltip with "Hide" text when visible', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).toBeTruthy();
      expect(tooltip?.textContent?.trim()).toBe('Hide');
    });

    it('should render tooltip when showOnHover is true', async () => {
      const screen = render(html`<forge-secret show-on-hover>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).toBeTruthy();
    });

    it('should render tooltip when noLabel is true', async () => {
      const screen = render(html`<forge-secret no-label>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).toBeTruthy();
    });
  });

  describe('slots', () => {
    it('should render label slot in button', async () => {
      const screen = render(html`
        <forge-secret>
          <span slot="label">Custom Label</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const labelSlot = ctx.getSlot('label');
      const defaultSlot = ctx.getSlot();

      expect(labelSlot).toBeTruthy();
      expect(defaultSlot).toBeTruthy();

      const buttonLabelSlot = ctx.button.querySelector('slot[name="label"]');
      expect(buttonLabelSlot).toBe(labelSlot);

      const contentDefaultSlot = ctx.contentElement.querySelector('slot:not([name])');
      expect(contentDefaultSlot).toBe(defaultSlot);
    });

    it('should render custom hidden icon from slot', async () => {
      const screen = render(html`
        <forge-secret variant="dots">
          <span slot="hidden-icon">🔒</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const slot = ctx.getSlot('hidden-icon');
      const slottedContent = slot?.assignedNodes()[0] as HTMLElement;

      expect(slottedContent?.textContent).toBe('🔒');
    });

    it('should render custom visible icon from slot', async () => {
      const screen = render(html`
        <forge-secret variant="dots" visible>
          <span slot="visible-icon">🔓</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const slot = ctx.getSlot('visible-icon');
      const slottedContent = slot?.assignedNodes()[0] as HTMLElement;

      expect(slottedContent?.textContent).toBe('🔓');
    });
  });

  describe('radio group behavior', () => {
    it('should hide other secrets with same name when revealed', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
          <forge-secret name="group2">Secret 3</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;
      const secret3 = screen.container.querySelector('forge-secret:nth-child(3)') as SecretComponent;

      secret1.visible = true;
      await secret1.updateComplete;

      expect(secret1.visible).toBe(true);
      expect(secret2.visible).toBe(false);
      expect(secret3.visible).toBe(false);

      secret2.visible = true;
      await secret2.updateComplete;

      expect(secret1.visible).toBe(false);
      expect(secret2.visible).toBe(true);
      expect(secret3.visible).toBe(false);

      secret3.visible = true;
      await secret3.updateComplete;

      expect(secret1.visible).toBe(false);
      expect(secret2.visible).toBe(true);
      expect(secret3.visible).toBe(true);
    });

    it('should not affect other secrets without same name', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret>Secret 2</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      secret1.visible = true;
      await secret1.updateComplete;

      secret2.visible = true;
      await secret2.updateComplete;

      expect(secret1.visible).toBe(true);
      expect(secret2.visible).toBe(true);
    });

    it('should handle multiple secrets in the same group', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
          <forge-secret name="group1">Secret 3</forge-secret>
          <forge-secret name="group1">Secret 4</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;
      const secret3 = screen.container.querySelector('forge-secret:nth-child(3)') as SecretComponent;
      const secret4 = screen.container.querySelector('forge-secret:nth-child(4)') as SecretComponent;

      secret2.visible = true;
      await secret2.updateComplete;

      expect(secret1.visible).toBe(false);
      expect(secret2.visible).toBe(true);
      expect(secret3.visible).toBe(false);
      expect(secret4.visible).toBe(false);

      secret4.visible = true;
      await secret4.updateComplete;

      expect(secret1.visible).toBe(false);
      expect(secret2.visible).toBe(false);
      expect(secret3.visible).toBe(false);
      expect(secret4.visible).toBe(true);
    });

    it('should allow multiple secrets without names to be visible simultaneously', async () => {
      const screen = render(html`
        <div>
          <forge-secret>Secret 1</forge-secret>
          <forge-secret>Secret 2</forge-secret>
          <forge-secret>Secret 3</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;
      const secret3 = screen.container.querySelector('forge-secret:nth-child(3)') as SecretComponent;

      secret1.visible = true;
      await secret1.updateComplete;
      secret2.visible = true;
      await secret2.updateComplete;
      secret3.visible = true;
      await secret3.updateComplete;

      expect(secret1.visible).toBe(true);
      expect(secret2.visible).toBe(true);
      expect(secret3.visible).toBe(true);
    });
  });

  describe('aria-live announcements', () => {
    it('should have aria-live region for announcements', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion).toBeTruthy();
      expect(ctx.liveRegion.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-atomic on live region', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion.getAttribute('aria-atomic')).toBe('true');
    });

    it('should announce content when revealed', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion.textContent).toBe('');

      el.visible = true;
      await el.updateComplete;

      expect(ctx.liveRegion.textContent).toBe('Secret content');
    });

    it('should clear live region when hidden', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion.textContent).toBe('Secret content');

      el.visible = false;
      await el.updateComplete;

      expect(ctx.liveRegion.textContent).toBe('');
    });

    it('should announce complex content', async () => {
      const screen = render(html`
        <forge-secret>
          <span>Username: </span>
          <strong>admin</strong>
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      el.visible = true;
      await el.updateComplete;

      const liveText = ctx.liveRegion.textContent || '';
      expect(liveText).toContain('Username');
      expect(liveText).toContain('admin');
    });
  });

  describe('accessibility', () => {
    it('should be accessible in blur variant', async () => {
      const screen = render(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should be accessible in dots variant', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should be accessible when visible', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should be accessible with label slot', async () => {
      const screen = render(html`
        <forge-secret>
          <span slot="label">Password: </span>
          secret123
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should be accessible with custom aria-label', async () => {
      const screen = render(html`<forge-secret>abc123xyz</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      // Set custom aria-label after component initialization
      el.setAttribute('aria-label', 'API Key');
      await el.updateComplete;

      // Verify custom aria-label is applied
      expect(el.getAttribute('aria-label')).toBe('API Key');
      expect(el.getAttribute('role')).toBe('group');
    });

    it('should be accessible in all variants and states', async () => {
      const variants: Array<'blur' | 'dots'> = ['blur', 'dots'];
      const states = [false, true];

      for (const variant of variants) {
        for (const visible of states) {
          const screen = render(html`<forge-secret variant=${variant} ?visible=${visible}>Secret content</forge-secret>`);
          const el = screen.container.querySelector('forge-secret') as SecretComponent;
          await expect(el).toBeAccessible();
        }
      }
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', async () => {
      const screen = render(html`<forge-secret></forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      await ctx.clickButton();

      expect(el.visible).toBe(true);
      expect(ctx.liveRegion.textContent).toBe('');
    });

    it('should handle content with only whitespace', async () => {
      const screen = render(html`<forge-secret> </forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      await ctx.clickButton();

      expect(el.visible).toBe(true);
    });

    it('should handle multiple rapid toggles', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      await ctx.clickButton();
      expect(el.visible).toBe(true);

      await ctx.clickButton();
      expect(el.visible).toBe(false);

      await ctx.clickButton();
      expect(el.visible).toBe(true);

      await ctx.clickButton();
      expect(el.visible).toBe(false);
    });

    it('should handle programmatic visibility changes', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      el.visible = true;
      await el.updateComplete;

      expect(ctx.button.getAttribute('aria-expanded')).toBe('true');
      expect(ctx.contentElement.inert).toBe(false);
      expect(ctx.liveRegion.textContent).toBe('Secret content');

      el.visible = false;
      await el.updateComplete;

      expect(ctx.button.getAttribute('aria-expanded')).toBe('false');
      expect(ctx.contentElement.inert).toBe(true);
      expect(ctx.liveRegion.textContent).toBe('');
    });

    it('should handle mixed text and element content', async () => {
      const screen = render(html`
        <forge-secret>
          Text before
          <span>Element content</span>
          Text after
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      el.visible = true;
      await el.updateComplete;

      const liveText = ctx.liveRegion.textContent || '';
      expect(liveText).toContain('Text before');
      expect(liveText).toContain('Element content');
      expect(liveText).toContain('Text after');
    });

    it('should maintain state when variant changes', async () => {
      const screen = render(html`<forge-secret visible>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.visible).toBe(true);

      el.variant = 'dots';
      await el.updateComplete;

      expect(el.visible).toBe(true);
      expect(el.variant).toBe('dots');
    });

    it('should handle name changes in radio groups', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1" visible>Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      expect(secret1.visible).toBe(true);
      expect(secret2.visible).toBe(false);

      secret1.name = 'group2';
      await secret1.updateComplete;

      secret2.visible = true;
      await secret2.updateComplete;

      expect(secret1.visible).toBe(true);
      expect(secret2.visible).toBe(true);
    });
  });
});

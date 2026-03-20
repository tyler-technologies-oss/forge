import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import type { SecretComponent } from './secret.js';

import './secret.js';

class SecretHarness {
  public button: HTMLElement;
  public contentElement: HTMLElement;

  constructor(public element: SecretComponent) {
    this.button = getShadowElement(this.element, ':is(forge-button, forge-icon-button)');
    this.contentElement = getShadowElement(this.element, '.content');
  }

  public async clickButton(): Promise<void> {
    this.button.click();
  }

  public async clickContent(): Promise<void> {
    this.contentElement.click();
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
    this.button.focus();
    await userEvent.keyboard('{Escape}');
  }

  public getButtonType(): 'icon' | 'text' {
    return this.button.tagName.toLowerCase() === 'forge-icon-button' ? 'icon' : 'text';
  }

  public getIcon(): HTMLElement | null {
    return this.element.shadowRoot?.querySelector('forge-icon') || null;
  }

  public getTooltip(): HTMLElement | null {
    return this.element.shadowRoot?.querySelector('forge-tooltip') || null;
  }

  public hasClass(className: string): boolean {
    const root = getShadowElement(this.element, '.forge-secret');
    return root.classList.contains(className);
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

      expect(el.open).toBe(false);
      expect(el.variant).toBe('blur');
      expect(el.showOnHover).toBe(false);
      expect(el.block).toBe(false);
      expect(el.buttonPosition).toBe('end');
      expect(el.name).toBe('');
      expect(el.mask).toBe('');
      expect(el.maskCharacter).toBe('●');
      expect(el.allow).toBe('');
    });

    it('should have role group and default aria-label', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      expect(el.getAttribute('role')).toBe('group');
      expect(el.getAttribute('aria-label')).toBe('secret');
    });

    it('should set role to group', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      expect(el.getAttribute('role')).toBe('group');
    });

    it('should render icon button by default when inline', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.getButtonType()).toBe('icon');
    });

    it('should render text button when block is true', async () => {
      const screen = render(html`<forge-secret block>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.getButtonType()).toBe('text');
    });
  });

  describe('open property', () => {
    it('should toggle open state on button click', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(false);

      await ctx.clickButton();

      expect(el.open).toBe(true);

      await ctx.clickButton();

      expect(el.open).toBe(false);
    });

    it('should toggle open state on Enter key', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(false);

      await ctx.pressEnter();

      expect(el.open).toBe(true);
    });

    it('should toggle open state on Space key', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(false);

      await ctx.pressSpace();

      expect(el.open).toBe(true);
    });

    it('should update :state(open) custom state when open changes', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.matches(':state(open)')).toBe(false);

      el.open = true;
      await el.updateComplete;

      expect(el.matches(':state(open)')).toBe(true);
    });

    it('should update aria-expanded when open changes', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.button.getAttribute('aria-expanded')).toBe('false');

      el.open = true;
      await el.updateComplete;

      expect(ctx.button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle inert attribute on content', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.inert).toBe(true);

      el.open = true;
      await el.updateComplete;

      expect(ctx.contentElement.inert).toBe(false);
    });

    it('should ignore clicks on content when open', async () => {
      const screen = render(html`<forge-secret open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(true);

      await ctx.clickContent();

      expect(el.open).toBe(true);
    });

    it('should toggle on clicks on content when closed', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(false);

      await ctx.clickContent();

      expect(el.open).toBe(true);
    });
  });

  describe('toggle event', () => {
    it('should dispatch toggle event on button click', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);
      const toggleSpy = vi.fn();

      el.addEventListener('toggle', toggleSpy);

      await ctx.clickButton();

      expect(toggleSpy).toHaveBeenCalledOnce();
      expect(toggleSpy.mock.calls[0][0]).toBeInstanceOf(ToggleEvent);
    });

    it('should have correct oldState in toggle event', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);
      const toggleSpy = vi.fn();

      el.addEventListener('toggle', toggleSpy);

      await ctx.clickButton();

      const event = toggleSpy.mock.calls[0][0] as ToggleEvent;
      expect(event.oldState).toBe('false');
      expect(el.open).toBe(true);
    });

    it('should bubble and compose toggle event', async () => {
      const screen = render(html`<div><forge-secret>Secret content</forge-secret></div>`);
      const container = screen.container.querySelector('div')!;
      const el = container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);
      const toggleSpy = vi.fn();

      container.addEventListener('toggle', toggleSpy);

      await ctx.clickButton();

      expect(toggleSpy).toHaveBeenCalledOnce();
    });
  });

  describe('Escape key handling', () => {
    it('should close when Escape is pressed and open', async () => {
      const screen = render(html`<forge-secret open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(true);

      await ctx.pressEscape();

      expect(el.open).toBe(false);
    });

    it('should not affect closed state when Escape is pressed', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(el.open).toBe(false);

      await ctx.pressEscape();

      expect(el.open).toBe(false);
    });

    it('should dispatch toggle event when closing via Escape', async () => {
      const screen = render(html`<forge-secret open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);
      const toggleSpy = vi.fn();

      el.addEventListener('toggle', toggleSpy);

      await ctx.pressEscape();

      expect(toggleSpy).toHaveBeenCalledOnce();
    });
  });

  describe('variant property', () => {
    it('should have blur variant by default', async () => {
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

    it('should apply blur class when variant is blur and closed', async () => {
      const screen = render(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.classList.contains('blur')).toBe(true);
      expect(ctx.contentElement.classList.contains('dots')).toBe(false);
    });

    it('should apply dots class when variant is dots and closed', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.classList.contains('dots')).toBe(true);
      expect(ctx.contentElement.classList.contains('blur')).toBe(false);
    });

    it('should not apply variant classes when open', async () => {
      const screen = render(html`<forge-secret variant="blur" open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.classList.contains('blur')).toBe(false);
      expect(ctx.contentElement.classList.contains('dots')).toBe(false);
    });

    it('should render eye_outline icon for dots variant when closed', async () => {
      const screen = render(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('name')).toBe('eye_outline');
    });

    it('should render eye_closed icon when open', async () => {
      const screen = render(html`<forge-secret open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('name')).toBe('eye_closed');
    });
  });

  describe('block property', () => {
    it('should render icon button when block is false', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.getButtonType()).toBe('icon');
    });

    it('should render text button when block is true', async () => {
      const screen = render(html`<forge-secret block>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.getButtonType()).toBe('text');
    });

    it('should update :state(block) custom state', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.matches(':state(block)')).toBe(false);

      el.block = true;
      await el.updateComplete;

      expect(el.matches(':state(block)')).toBe(true);
    });

    it('should render tooltip when block is false', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.getTooltip()).toBeTruthy();
    });

    it('should not render tooltip when block is true', async () => {
      const screen = render(html`<forge-secret block>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.getTooltip()).toBeNull();
    });

    it('should apply blur when block and closed', async () => {
      const screen = render(html`<forge-secret block>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.classList.contains('blur')).toBe(true);
    });
  });

  describe('buttonPosition property', () => {
    it('should have end position by default', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.buttonPosition).toBe('end');
    });

    it('should apply reverse class when buttonPosition is start', async () => {
      const screen = render(html`<forge-secret button-position="start">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.hasClass('reverse')).toBe(true);
    });

    it('should not apply reverse class when buttonPosition is end', async () => {
      const screen = render(html`<forge-secret button-position="end">Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.hasClass('reverse')).toBe(false);
    });
  });

  describe('showOnHover property', () => {
    it('should set showOnHover property', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.showOnHover).toBe(false);

      el.showOnHover = true;
      await el.updateComplete;

      expect(el.showOnHover).toBe(true);
    });

    it('should add show-on-hover class when showOnHover is true', async () => {
      const screen = render(html`<forge-secret show-on-hover>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.hasClass('show-on-hover')).toBe(true);
    });

    it('should not add show-on-hover class when showOnHover is false', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.hasClass('show-on-hover')).toBe(false);
    });
  });

  describe('mask properties', () => {
    it('should have default mask properties', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.mask).toBe('');
      expect(el.maskCharacter).toBe('●');
      expect(el.allow).toBe('');
    });

    it('should apply mask to content in dots variant', async () => {
      const screen = render(html`<forge-secret variant="dots">test123</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      // Wait for slotted content to be processed
      await new Promise(resolve => setTimeout(resolve, 0));
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const maskAttr = ctx.contentElement.getAttribute('data-mask');
      expect(maskAttr).toBe('●●●●●●●');
    });

    it('should use custom mask character', async () => {
      const screen = render(html`<forge-secret variant="dots" mask-character="*">test</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      // Wait for slotted content to be processed
      await new Promise(resolve => setTimeout(resolve, 0));
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const maskAttr = ctx.contentElement.getAttribute('data-mask');
      expect(maskAttr).toBe('****');
    });

    it('should use custom mask pattern', async () => {
      const screen = render(html`<forge-secret variant="dots" mask="xxxx-xxxx">1234-5678</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      // Wait for mask to be computed
      await new Promise(resolve => setTimeout(resolve, 0));
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const maskAttr = ctx.contentElement.getAttribute('data-mask');
      expect(maskAttr).toBe('●●●●●●●●●');
    });

    it('should preserve allowed characters', async () => {
      const screen = render(html`<forge-secret variant="dots" allow="-">test-123</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      // Wait for slotted content to be processed
      await new Promise(resolve => setTimeout(resolve, 0));
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const maskAttr = ctx.contentElement.getAttribute('data-mask');
      expect(maskAttr).toBe('●●●●-●●●');
    });

    it('should not apply mask in blur variant', async () => {
      const screen = render(html`<forge-secret variant="blur">test123</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.hasAttribute('data-mask')).toBe(false);
    });

    it('should not apply mask when block is true', async () => {
      const screen = render(html`<forge-secret variant="dots" block>test123</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.hasAttribute('data-mask')).toBe(false);
    });
  });

  describe('slots', () => {
    it('should render default slot content', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      expect(el.textContent).toBe('Secret content');
    });

    it('should render label slot in tooltip when inline', async () => {
      const screen = render(html`
        <forge-secret>
          <span slot="label">Custom Label</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      const labelSlot = tooltip?.querySelector('slot[name="label"]');
      expect(labelSlot).toBeTruthy();
    });

    it('should render label slot in button when block', async () => {
      const screen = render(html`
        <forge-secret block>
          <span slot="label">Custom Label</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const labelSlot = ctx.button.querySelector('slot[name="label"]');
      expect(labelSlot).toBeTruthy();
    });

    it('should render custom hidden icon from slot', async () => {
      const screen = render(html`
        <forge-secret>
          <span slot="hidden-icon">🔒</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      const slot = el.shadowRoot?.querySelector('slot[name="hidden-icon"]');
      const slottedContent = (slot as HTMLSlotElement)?.assignedNodes()[0] as HTMLElement;

      expect(slottedContent?.textContent).toBe('🔒');
    });

    it('should render custom visible icon from slot', async () => {
      const screen = render(html`
        <forge-secret open>
          <span slot="visible-icon">🔓</span>
          Secret content
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;

      const slot = el.shadowRoot?.querySelector('slot[name="visible-icon"]');
      const slottedContent = (slot as HTMLSlotElement)?.assignedNodes()[0] as HTMLElement;

      expect(slottedContent?.textContent).toBe('🔓');
    });
  });

  describe('radio group behavior (name property)', () => {
    it('should close other secrets with same name when opened', async () => {
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

      secret1.open = true;
      await secret1.updateComplete;

      expect(secret1.open).toBe(true);
      expect(secret2.open).toBe(false);
      expect(secret3.open).toBe(false);

      secret2.open = true;
      await secret2.updateComplete;

      expect(secret1.open).toBe(false);
      expect(secret2.open).toBe(true);
      expect(secret3.open).toBe(false);

      secret3.open = true;
      await secret3.updateComplete;

      expect(secret1.open).toBe(false);
      expect(secret2.open).toBe(true);
      expect(secret3.open).toBe(true);
    });

    it('should not affect secrets without same name', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret>Secret 2</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      secret1.open = true;
      await secret1.updateComplete;

      secret2.open = true;
      await secret2.updateComplete;

      expect(secret1.open).toBe(true);
      expect(secret2.open).toBe(true);
    });

    it('should handle multiple secrets in same group', async () => {
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

      secret2.open = true;
      await secret2.updateComplete;

      expect(secret1.open).toBe(false);
      expect(secret2.open).toBe(true);
      expect(secret3.open).toBe(false);
      expect(secret4.open).toBe(false);

      secret4.open = true;
      await secret4.updateComplete;

      expect(secret1.open).toBe(false);
      expect(secret2.open).toBe(false);
      expect(secret3.open).toBe(false);
      expect(secret4.open).toBe(true);
    });

    it('should allow multiple secrets without names to be open simultaneously', async () => {
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

      secret1.open = true;
      await secret1.updateComplete;
      secret2.open = true;
      await secret2.updateComplete;
      secret3.open = true;
      await secret3.updateComplete;

      expect(secret1.open).toBe(true);
      expect(secret2.open).toBe(true);
      expect(secret3.open).toBe(true);
    });

    it('should dispatch toggle events when closing grouped secrets', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1" open>Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      // Wait for both secrets to be fully initialized
      await secret1.updateComplete;
      await secret2.updateComplete;

      const toggleSpy = vi.fn();
      secret1.addEventListener('toggle', toggleSpy);

      secret2.open = true;
      await secret2.updateComplete;

      expect(secret1.open).toBe(false);
      expect(toggleSpy).toHaveBeenCalledOnce();
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

    it('should be accessible when open', async () => {
      const screen = render(html`<forge-secret open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should be accessible with label slot', async () => {
      const screen = render(html`
        <forge-secret>
          <span slot="label">Password</span>
          secret123
        </forge-secret>
      `);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });

    it('should be accessible when block', async () => {
      const screen = render(html`<forge-secret block>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await expect(el).toBeAccessible();
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', async () => {
      const screen = render(html`<forge-secret></forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      await ctx.clickButton();

      expect(el.open).toBe(true);
    });

    it('should handle content with only whitespace', async () => {
      const screen = render(html`<forge-secret> </forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      await ctx.clickButton();

      expect(el.open).toBe(true);
    });

    it('should handle multiple rapid toggles', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      await ctx.clickButton();
      expect(el.open).toBe(true);

      await ctx.clickButton();
      expect(el.open).toBe(false);

      await ctx.clickButton();
      expect(el.open).toBe(true);

      await ctx.clickButton();
      expect(el.open).toBe(false);
    });

    it('should handle programmatic open changes', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      el.open = true;
      await el.updateComplete;

      expect(ctx.button.getAttribute('aria-expanded')).toBe('true');
      expect(ctx.contentElement.inert).toBe(false);

      el.open = false;
      await el.updateComplete;

      expect(ctx.button.getAttribute('aria-expanded')).toBe('false');
      expect(ctx.contentElement.inert).toBe(true);
    });

    it('should maintain open state when variant changes', async () => {
      const screen = render(html`<forge-secret open>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;

      expect(el.open).toBe(true);

      el.variant = 'dots';
      await el.updateComplete;

      expect(el.open).toBe(true);
      expect(el.variant).toBe('dots');
    });

    it('should handle name changes in radio groups', async () => {
      const screen = render(html`
        <div>
          <forge-secret name="group1" open>Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
        </div>
      `);

      const secret1 = screen.container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = screen.container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      expect(secret1.open).toBe(true);
      expect(secret2.open).toBe(false);

      secret1.name = 'group2';
      await secret1.updateComplete;

      secret2.open = true;
      await secret2.updateComplete;

      expect(secret1.open).toBe(true);
      expect(secret2.open).toBe(true);
    });

    it('should handle switching from inline to block', async () => {
      const screen = render(html`<forge-secret>Secret content</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      let ctx = new SecretHarness(el);

      expect(ctx.getButtonType()).toBe('icon');

      el.block = true;
      await el.updateComplete;
      ctx = new SecretHarness(el);

      expect(ctx.getButtonType()).toBe('text');
    });

    it('should escape special regex characters in allow property', async () => {
      const screen = render(html`<forge-secret variant="dots" allow=".-[]">test-[123]</forge-secret>`);
      const el = screen.container.querySelector('forge-secret') as SecretComponent;
      await el.updateComplete;
      // Wait for slotted content to be processed
      await new Promise(resolve => setTimeout(resolve, 0));
      await el.updateComplete;
      const ctx = new SecretHarness(el);

      const maskAttr = ctx.contentElement.getAttribute('data-mask');
      expect(maskAttr).not.toBeNull();
      expect(maskAttr!).toContain('-');
      expect(maskAttr!).toContain('[');
      expect(maskAttr!).toContain(']');
    });
  });
});

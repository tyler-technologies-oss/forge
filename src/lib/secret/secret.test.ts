import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { sendKeys } from '@web/test-runner-commands';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent } from '../state-layer';
import { ITooltipComponent } from '../tooltip';
import { SecretComponent } from './secret';

import './secret';

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
    await elementUpdated(this.element);
  }

  public async pressEnter(): Promise<void> {
    this.button.focus();
    await sendKeys({ press: 'Enter' });
    await elementUpdated(this.element);
  }

  public async pressSpace(): Promise<void> {
    this.button.focus();
    await sendKeys({ press: ' ' });
    await elementUpdated(this.element);
  }

  public async pressEscape(): Promise<void> {
    await sendKeys({ press: 'Escape' });
    await elementUpdated(this.element);
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
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      expect(el.shadowRoot).not.to.be.null;
    });

    it('should be accessible', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      await expect(el).to.be.accessible();
    });

    it('should have default property values', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.visible).to.be.false;
      expect(el.variant).to.equal('blur');
      expect(el.showOnHover).to.be.false;
      expect(el.noLabel).to.be.false;
      expect(el.name).to.equal('');
    });

    it('should not contain forge-state-layer for blur variant when hidden', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).to.be.null;
    });

    it('should contain forge-state-layer for dots variant', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).to.exist;
    });

    it('should contain forge-state-layer when visible', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
      const stateLayer = el.shadowRoot?.querySelector('forge-state-layer');

      expect(stateLayer).to.exist;
    });

    it('should contain forge-focus-indicator', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.focusIndicator).to.exist;
    });

    it('should have role group and default aria-label', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.getAttribute('role')).to.equal('group');
      expect(el.getAttribute('aria-label')).to.equal('secret');
    });

    it('should allow setting aria-label programmatically', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.getAttribute('aria-label')).to.equal('secret');

      el.setAttribute('aria-label', 'Custom label');
      await elementUpdated(el);

      expect(el.getAttribute('aria-label')).to.equal('Custom label');
    });
  });

  describe('visibility toggle', () => {
    it('should toggle visible state on click', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(el.visible).to.be.false;

      await ctx.clickButton();

      expect(el.visible).to.be.true;

      await ctx.clickButton();

      expect(el.visible).to.be.false;
    });

    it('should toggle visible state on Enter key', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(el.visible).to.be.false;

      await ctx.pressEnter();

      expect(el.visible).to.be.true;
    });

    it('should toggle visible state on Space key', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(el.visible).to.be.false;

      await ctx.pressSpace();

      expect(el.visible).to.be.true;
    });

    it('should update custom state when visible changes', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.matches(':state(visible)')).to.be.false;

      el.visible = true;
      await elementUpdated(el);

      expect(el.matches(':state(visible)')).to.be.true;
    });

    it('should update aria-expanded when visible changes', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.button.getAttribute('aria-expanded')).to.equal('false');

      el.visible = true;
      await elementUpdated(el);

      expect(ctx.button.getAttribute('aria-expanded')).to.equal('true');
    });

    it('should toggle inert attribute on content', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.contentElement.inert).to.be.true;

      el.visible = true;
      await elementUpdated(el);

      expect(ctx.contentElement.inert).to.be.false;
    });

    it('should dispatch forge-secret-change event on toggle', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);
      let eventDetail: any;

      el.addEventListener('forge-secret-change', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      await ctx.clickButton();

      expect(eventDetail).to.deep.equal({ visible: true });
    });

    it('should maintain focus on button after toggle', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      ctx.button.focus();
      await ctx.clickButton();

      expect(document.activeElement).to.equal(el);
    });
  });

  describe('Escape key handling', () => {
    it('should hide visible content when Escape is pressed on button', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(el.visible).to.be.true;

      // Focus the button first, then press Escape
      ctx.button.focus();
      await ctx.pressEscape();

      expect(el.visible).to.be.false;
    });

    it('should not affect already hidden content when Escape is pressed', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(el.visible).to.be.false;

      ctx.button.focus();
      await ctx.pressEscape();

      expect(el.visible).to.be.false;
    });

    it('should dispatch forge-secret-change event when hiding via Escape', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);
      let eventDetail: any;

      el.addEventListener('forge-secret-change', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      ctx.button.focus();
      await ctx.pressEscape();

      expect(eventDetail).to.deep.equal({ visible: false });
    });
  });

  describe('variant', () => {
    it('should show blur variant by default', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.variant).to.equal('blur');
    });

    it('should apply dots variant when set', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="dots">Secret content</forge-secret>`);

      expect(el.variant).to.equal('dots');
    });

    it('should change variant dynamically', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.variant).to.equal('blur');

      el.variant = 'dots';
      await elementUpdated(el);

      expect(el.variant).to.equal('dots');
    });

    it('should render icon for dots variant when hidden', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).to.exist;
      expect(icon?.getAttribute('name')).to.equal('eye');
    });

    it('should render icon for dots variant when visible', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="dots" visible>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).to.exist;
      expect(icon?.getAttribute('name')).to.equal('eye_off');
    });

    it('should not render icon for blur variant', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const icon = ctx.getIcon();
      expect(icon).to.be.null;
    });
  });

  describe('showOnHover', () => {
    it('should set showOnHover property', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.showOnHover).to.be.false;

      el.showOnHover = true;
      await elementUpdated(el);

      expect(el.showOnHover).to.be.true;
    });

    it('should add show-on-hover class to root when showOnHover is true', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret show-on-hover>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.rootElement.classList.contains('show-on-hover')).to.be.true;
    });

    it('should not add show-on-hover class when showOnHover is false', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.rootElement.classList.contains('show-on-hover')).to.be.false;
    });
  });

  describe('noLabel', () => {
    it('should set noLabel property', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);

      expect(el.noLabel).to.be.false;

      el.noLabel = true;
      await elementUpdated(el);

      expect(el.noLabel).to.be.true;
    });

    it('should add label--hidden class when noLabel is true', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret no-label>Secret content</forge-secret>`);
      const labelElement = el.shadowRoot?.querySelector('.label') as HTMLElement;

      expect(labelElement.classList.contains('label--hidden')).to.be.true;
    });

    it('should be accessible when noLabel is true', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret no-label>Secret content</forge-secret>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('tooltip', () => {
    it('should not render tooltip for blur variant when hidden and not showOnHover and not noLabel', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      // According to implementation: if (this.visible || this.variant === 'dots' || this.showOnHover || this.noLabel)
      // For blur variant, hidden, not showOnHover, not noLabel -> tooltip should NOT render
      const tooltip = ctx.getTooltip();
      expect(tooltip).to.be.null;
    });

    it('should render tooltip for dots variant when hidden', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).to.exist;
      expect(tooltip?.textContent?.trim()).to.equal('Show');
    });

    it('should render tooltip with "Hide" text when visible', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).to.exist;
      expect(tooltip?.textContent?.trim()).to.equal('Hide');
    });

    it('should render tooltip when showOnHover is true', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret show-on-hover>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).to.exist;
    });

    it('should render tooltip when noLabel is true', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret no-label>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      const tooltip = ctx.getTooltip();
      expect(tooltip).to.exist;
    });
  });

  describe('slots', () => {
    it('should render label slot in button', async () => {
      const el = await fixture<SecretComponent>(html`
        <forge-secret>
          <span slot="label">Custom Label</span>
          Secret content
        </forge-secret>
      `);
      const ctx = new SecretHarness(el);

      const labelSlot = ctx.getSlot('label');
      const defaultSlot = ctx.getSlot();

      expect(labelSlot).to.exist;
      expect(defaultSlot).to.exist;

      // Label slot should be inside the button
      const buttonLabelSlot = ctx.button.querySelector('slot[name="label"]');
      expect(buttonLabelSlot).to.equal(labelSlot);

      // Default slot should be in the content element
      const contentDefaultSlot = ctx.contentElement.querySelector('slot:not([name])');
      expect(contentDefaultSlot).to.equal(defaultSlot);
    });

    it('should render custom hidden icon from slot', async () => {
      const el = await fixture<SecretComponent>(html`
        <forge-secret variant="dots">
          <span slot="hidden-icon">🔒</span>
          Secret content
        </forge-secret>
      `);
      const ctx = new SecretHarness(el);

      const slot = ctx.getSlot('hidden-icon');
      const slottedContent = slot?.assignedNodes()[0] as HTMLElement;

      expect(slottedContent?.textContent).to.equal('🔒');
    });

    it('should render custom visible icon from slot', async () => {
      const el = await fixture<SecretComponent>(html`
        <forge-secret variant="dots" visible>
          <span slot="visible-icon">🔓</span>
          Secret content
        </forge-secret>
      `);
      const ctx = new SecretHarness(el);

      const slot = ctx.getSlot('visible-icon');
      const slottedContent = slot?.assignedNodes()[0] as HTMLElement;

      expect(slottedContent?.textContent).to.equal('🔓');
    });
  });

  describe('radio group behavior', () => {
    it('should hide other secrets with same name when revealed', async () => {
      const container = await fixture(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
          <forge-secret name="group2">Secret 3</forge-secret>
        </div>
      `);

      const secret1 = container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = container.querySelector('forge-secret:nth-child(2)') as SecretComponent;
      const secret3 = container.querySelector('forge-secret:nth-child(3)') as SecretComponent;

      // Reveal secret 1
      secret1.visible = true;
      await elementUpdated(secret1);

      expect(secret1.visible).to.be.true;
      expect(secret2.visible).to.be.false;
      expect(secret3.visible).to.be.false;

      // Reveal secret 2 (should hide secret 1)
      secret2.visible = true;
      await elementUpdated(secret2);

      expect(secret1.visible).to.be.false;
      expect(secret2.visible).to.be.true;
      expect(secret3.visible).to.be.false;

      // Reveal secret 3 (should not affect group1)
      secret3.visible = true;
      await elementUpdated(secret3);

      expect(secret1.visible).to.be.false;
      expect(secret2.visible).to.be.true;
      expect(secret3.visible).to.be.true;
    });

    it('should not affect other secrets without same name', async () => {
      const container = await fixture(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret>Secret 2</forge-secret>
        </div>
      `);

      const secret1 = container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      secret1.visible = true;
      await elementUpdated(secret1);

      secret2.visible = true;
      await elementUpdated(secret2);

      expect(secret1.visible).to.be.true;
      expect(secret2.visible).to.be.true;
    });

    it('should handle multiple secrets in the same group', async () => {
      const container = await fixture(html`
        <div>
          <forge-secret name="group1">Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
          <forge-secret name="group1">Secret 3</forge-secret>
          <forge-secret name="group1">Secret 4</forge-secret>
        </div>
      `);

      const secret1 = container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = container.querySelector('forge-secret:nth-child(2)') as SecretComponent;
      const secret3 = container.querySelector('forge-secret:nth-child(3)') as SecretComponent;
      const secret4 = container.querySelector('forge-secret:nth-child(4)') as SecretComponent;

      // Reveal secret 2
      secret2.visible = true;
      await elementUpdated(secret2);

      expect(secret1.visible).to.be.false;
      expect(secret2.visible).to.be.true;
      expect(secret3.visible).to.be.false;
      expect(secret4.visible).to.be.false;

      // Reveal secret 4 (should hide secret 2)
      secret4.visible = true;
      await elementUpdated(secret4);

      expect(secret1.visible).to.be.false;
      expect(secret2.visible).to.be.false;
      expect(secret3.visible).to.be.false;
      expect(secret4.visible).to.be.true;
    });

    it('should allow multiple secrets without names to be visible simultaneously', async () => {
      const container = await fixture(html`
        <div>
          <forge-secret>Secret 1</forge-secret>
          <forge-secret>Secret 2</forge-secret>
          <forge-secret>Secret 3</forge-secret>
        </div>
      `);

      const secret1 = container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = container.querySelector('forge-secret:nth-child(2)') as SecretComponent;
      const secret3 = container.querySelector('forge-secret:nth-child(3)') as SecretComponent;

      secret1.visible = true;
      await elementUpdated(secret1);
      secret2.visible = true;
      await elementUpdated(secret2);
      secret3.visible = true;
      await elementUpdated(secret3);

      expect(secret1.visible).to.be.true;
      expect(secret2.visible).to.be.true;
      expect(secret3.visible).to.be.true;
    });
  });

  describe('aria-live announcements', () => {
    it('should have aria-live region for announcements', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion).to.exist;
      expect(ctx.liveRegion.getAttribute('aria-live')).to.equal('polite');
    });

    it('should have aria-atomic on live region', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion.getAttribute('aria-atomic')).to.equal('true');
    });

    it('should announce content when revealed', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      expect(ctx.liveRegion.textContent).to.equal('');

      el.visible = true;
      await elementUpdated(el);

      expect(ctx.liveRegion.textContent).to.equal('Secret content');
    });

    it('should clear live region when hidden', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      await elementUpdated(el);
      expect(ctx.liveRegion.textContent).to.equal('Secret content');

      el.visible = false;
      await elementUpdated(el);

      expect(ctx.liveRegion.textContent).to.equal('');
    });

    it('should announce complex content', async () => {
      const el = await fixture<SecretComponent>(html`
        <forge-secret>
          <span>Username: </span>
          <strong>admin</strong>
        </forge-secret>
      `);
      const ctx = new SecretHarness(el);

      el.visible = true;
      await elementUpdated(el);

      // The live region should contain the text content
      expect(ctx.liveRegion.textContent).to.include('Username');
      expect(ctx.liveRegion.textContent).to.include('admin');
    });
  });

  describe('accessibility', () => {
    it('should be accessible in blur variant', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="blur">Secret content</forge-secret>`);
      await expect(el).to.be.accessible();
    });

    it('should be accessible in dots variant', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret variant="dots">Secret content</forge-secret>`);
      await expect(el).to.be.accessible();
    });

    it('should be accessible when visible', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);
      await expect(el).to.be.accessible();
    });

    it('should be accessible with label slot', async () => {
      const el = await fixture<SecretComponent>(html`
        <forge-secret>
          <span slot="label">Password: </span>
          secret123
        </forge-secret>
      `);
      await expect(el).to.be.accessible();
    });

    it('should be accessible with custom aria-label', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret aria-label="API Key">abc123xyz</forge-secret>`);
      await expect(el).to.be.accessible();
    });

    it('should be accessible in all variants and states', async () => {
      const variants: Array<'blur' | 'dots'> = ['blur', 'dots'];
      const states = [false, true];

      for (const variant of variants) {
        for (const visible of states) {
          const el = await fixture<SecretComponent>(html`<forge-secret variant=${variant} ?visible=${visible}>Secret content</forge-secret>`);
          await expect(el).to.be.accessible();
        }
      }
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret></forge-secret>`);
      const ctx = new SecretHarness(el);

      await ctx.clickButton();

      expect(el.visible).to.be.true;
      expect(ctx.liveRegion.textContent).to.equal('');
    });

    it('should handle content with only whitespace', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret> </forge-secret>`);
      const ctx = new SecretHarness(el);

      await ctx.clickButton();

      expect(el.visible).to.be.true;
    });

    it('should handle multiple rapid toggles', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      // Rapidly toggle multiple times
      await ctx.clickButton();
      expect(el.visible).to.be.true;

      await ctx.clickButton();
      expect(el.visible).to.be.false;

      await ctx.clickButton();
      expect(el.visible).to.be.true;

      await ctx.clickButton();
      expect(el.visible).to.be.false;
    });

    it('should handle programmatic visibility changes', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret>Secret content</forge-secret>`);
      const ctx = new SecretHarness(el);

      // Programmatic changes should work the same as user interactions
      el.visible = true;
      await elementUpdated(el);

      expect(ctx.button.getAttribute('aria-expanded')).to.equal('true');
      expect(ctx.contentElement.inert).to.be.false;
      expect(ctx.liveRegion.textContent).to.equal('Secret content');

      el.visible = false;
      await elementUpdated(el);

      expect(ctx.button.getAttribute('aria-expanded')).to.equal('false');
      expect(ctx.contentElement.inert).to.be.true;
      expect(ctx.liveRegion.textContent).to.equal('');
    });

    it('should handle mixed text and element content', async () => {
      const el = await fixture<SecretComponent>(html`
        <forge-secret>
          Text before
          <span>Element content</span>
          Text after
        </forge-secret>
      `);
      const ctx = new SecretHarness(el);

      el.visible = true;
      await elementUpdated(el);

      const liveText = ctx.liveRegion.textContent || '';
      expect(liveText).to.include('Text before');
      expect(liveText).to.include('Element content');
      expect(liveText).to.include('Text after');
    });

    it('should maintain state when variant changes', async () => {
      const el = await fixture<SecretComponent>(html`<forge-secret visible>Secret content</forge-secret>`);

      expect(el.visible).to.be.true;

      el.variant = 'dots';
      await elementUpdated(el);

      expect(el.visible).to.be.true;
      expect(el.variant).to.equal('dots');
    });

    it('should handle name changes in radio groups', async () => {
      const container = await fixture(html`
        <div>
          <forge-secret name="group1" visible>Secret 1</forge-secret>
          <forge-secret name="group1">Secret 2</forge-secret>
        </div>
      `);

      const secret1 = container.querySelector('forge-secret:nth-child(1)') as SecretComponent;
      const secret2 = container.querySelector('forge-secret:nth-child(2)') as SecretComponent;

      expect(secret1.visible).to.be.true;
      expect(secret2.visible).to.be.false;

      // Change secret1's name so they're no longer in the same group
      secret1.name = 'group2';
      await elementUpdated(secret1);

      // Both should be able to be visible now
      secret2.visible = true;
      await elementUpdated(secret2);

      expect(secret1.visible).to.be.true;
      expect(secret2.visible).to.be.true;
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { ICountCardComponent } from './count-card.js';

import './count-card.js';

describe('Count Card', () => {
  it('should render', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
    expect(harness.cardElement).toBeTruthy();
  });

  it('should define sub-component dependencies', async () => {
    expect(window.customElements.get('forge-card')).toBeTruthy();
    expect(window.customElements.get('forge-tooltip')).toBeTruthy();
  });

  it('should have all slots available', async () => {
    const harness = await createFixture();

    expect(harness.iconSlot).toBeTruthy();
    expect(harness.labelSlot).toBeTruthy();
    expect(harness.headerEndSlot).toBeTruthy();
    expect(harness.actionSlot).toBeTruthy();
    expect(harness.countSlot).toBeTruthy();
    expect(harness.countEndSlot).toBeTruthy();
    expect(harness.fullWidthSlot).toBeTruthy();
    expect(harness.bodySlot).toBeTruthy();
  });

  it('should have header structure', async () => {
    const harness = await createFixture();

    expect(harness.headerElement).toBeTruthy();
    expect(harness.iconContainerElement).toBeTruthy();
    expect(harness.labelElement).toBeTruthy();
  });

  it('should have count element', async () => {
    const harness = await createFixture();

    expect(harness.countElement).toBeTruthy();
  });

  describe('slots', () => {
    it('should project content into icon slot', async () => {
      const harness = await createFixture(html`<span slot="icon">$</span>`);

      expect(harness.iconSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into label slot', async () => {
      const harness = await createFixture(html`<span slot="label">Label</span>`);

      expect(harness.labelSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into count slot', async () => {
      const harness = await createFixture(html`<span slot="count">$100.00</span>`);

      expect(harness.countSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into count-end slot', async () => {
      const harness = await createFixture(html`<span slot="count-end">/mo</span>`);

      expect(harness.countEndSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into full-width slot', async () => {
      const harness = await createFixture(html`<div slot="full-width">Sparkline content</div>`);

      expect(harness.fullWidthSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into header-end slot', async () => {
      const harness = await createFixture(html`<span slot="header-end">Badge</span>`);

      expect(harness.headerEndSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into action slot', async () => {
      const harness = await createFixture(html`<button slot="action">Action</button>`);

      expect(harness.actionSlot.assignedNodes().length).toBeGreaterThan(0);
    });
  });

  describe('theme', () => {
    it('should have none theme by default', async () => {
      const harness = await createFixture();

      expect(harness.element.theme).toBe('none');
      expect(harness.element.matches(':state(none)')).toBe(true);
    });

    it('should apply theme state when theme property is set', async () => {
      const harness = await createFixture(undefined, { theme: 'primary' });

      expect(harness.element.theme).toBe('primary');
      expect(harness.element.matches(':state(primary)')).toBe(true);
    });

    it('should apply info-secondary theme state', async () => {
      const harness = await createFixture(undefined, { theme: 'info-secondary' });

      expect(harness.element.theme).toBe('info-secondary');
      expect(harness.element.matches(':state(info-secondary)')).toBe(true);
    });

    it('should toggle theme state dynamically', async () => {
      const harness = await createFixture();

      harness.element.theme = 'success';
      await harness.element.updateComplete;

      expect(harness.element.matches(':state(success)')).toBe(true);

      harness.element.theme = 'error';
      await harness.element.updateComplete;

      expect(harness.element.matches(':state(error)')).toBe(true);
      expect(harness.element.matches(':state(success)')).toBe(false);
    });
  });

  describe('noBorder', () => {
    it('should not have no-border state by default', async () => {
      const harness = await createFixture();

      expect(harness.element.noBorder).toBe(false);
      expect(harness.element.matches(':state(no-border)')).toBe(false);
    });

    it('should apply no-border state when noBorder property is true', async () => {
      const harness = await createFixture(undefined, { noBorder: true });

      expect(harness.element.noBorder).toBe(true);
      expect(harness.element.matches(':state(no-border)')).toBe(true);
    });

    it('should toggle no-border state dynamically', async () => {
      const harness = await createFixture();

      harness.element.noBorder = true;
      await harness.element.updateComplete;

      expect(harness.element.matches(':state(no-border)')).toBe(true);

      harness.element.noBorder = false;
      await harness.element.updateComplete;

      expect(harness.element.matches(':state(no-border)')).toBe(false);
    });
  });

  describe('has-action state', () => {
    it('should not have has-action state by default', async () => {
      const harness = await createFixture();

      expect(harness.element.matches(':state(has-action)')).toBe(false);
    });

    it('should apply has-action state when content is slotted into action slot', async () => {
      const harness = await createFixture(html`<button slot="action">Action</button>`);

      expect(harness.element.matches(':state(has-action)')).toBe(true);
    });

    it('should toggle has-action state when action slot content changes dynamically', async () => {
      const harness = await createFixture();

      expect(harness.element.matches(':state(has-action)')).toBe(false);

      const button = document.createElement('button');
      button.slot = 'action';
      button.textContent = 'Action';
      harness.element.appendChild(button);
      await harness.element.updateComplete;

      expect(harness.element.matches(':state(has-action)')).toBe(true);

      harness.element.removeChild(button);
      await harness.element.updateComplete;

      expect(harness.element.matches(':state(has-action)')).toBe(false);
    });
  });

  describe('tooltips', () => {
    it('should render label tooltip with slot content', async () => {
      const harness = await createFixture(html`<span slot="label">Test Label</span>`);

      expect(harness.labelTooltip).toBeTruthy();
      expect(harness.labelTooltip?.textContent).toBe('Test Label');
    });

    it('should render count tooltip with slot content', async () => {
      const harness = await createFixture(html`<span slot="count">$1,234.56</span>`);

      expect(harness.countTooltip).toBeTruthy();
      expect(harness.countTooltip?.textContent).toBe('$1,234.56');
    });

    it('should update label tooltip when slot content changes dynamically', async () => {
      const harness = await createFixture(html`<span slot="label">Initial Label</span>`);
      const labelSpan = harness.element.querySelector('[slot="label"]') as HTMLSpanElement;

      expect(harness.labelTooltip?.textContent).toBe('Initial Label');

      labelSpan.textContent = 'Updated Label';
      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.labelTooltip?.textContent).toBe('Updated Label');
    });

    it('should update count tooltip when slot content changes dynamically', async () => {
      const harness = await createFixture(html`<span slot="count">100</span>`);
      const countSpan = harness.element.querySelector('[slot="count"]') as HTMLSpanElement;

      expect(harness.countTooltip?.textContent).toBe('100');

      countSpan.textContent = '200';
      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.countTooltip?.textContent).toBe('200');
    });
  });
});

class CountCardHarness extends TestHarness<ICountCardComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get cardElement(): HTMLElement {
    return getShadowElement(this.element, 'forge-card') as HTMLElement;
  }

  public get headerElement(): HTMLElement {
    return getShadowElement(this.element, '.header') as HTMLElement;
  }

  public get iconContainerElement(): HTMLElement {
    return getShadowElement(this.element, '.icon-container') as HTMLElement;
  }

  public get labelElement(): HTMLElement {
    return getShadowElement(this.element, '.label') as HTMLElement;
  }

  public get countElement(): HTMLElement {
    return getShadowElement(this.element, '.count') as HTMLElement;
  }

  public get iconSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="icon"]') as HTMLSlotElement;
  }

  public get labelSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="label"]') as HTMLSlotElement;
  }

  public get countSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="count"]') as HTMLSlotElement;
  }

  public get countEndSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="count-end"]') as HTMLSlotElement;
  }

  public get bodySlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="body"]') as HTMLSlotElement;
  }

  public get fullWidthSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="full-width"]') as HTMLSlotElement;
  }

  public get headerEndSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="header-end"]') as HTMLSlotElement;
  }

  public get actionSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="action"]') as HTMLSlotElement;
  }

  public get labelTooltip(): HTMLElement | null {
    return getShadowElement(this.element, '.header-start > forge-tooltip') as HTMLElement | null;
  }

  public get countTooltip(): HTMLElement | null {
    return getShadowElement(this.element, '.count-container > forge-tooltip') as HTMLElement | null;
  }
}

interface CountCardFixtureConfig {
  theme?: string;
  noBorder?: boolean;
}

async function createFixture(slotted?: ReturnType<typeof html>, { theme, noBorder }: CountCardFixtureConfig = {}): Promise<CountCardHarness> {
  const screen = render(html`<forge-count-card theme=${theme ?? 'none'} ?no-border=${noBorder}>${slotted}</forge-count-card>`);
  const el = screen.container.querySelector('forge-count-card') as ICountCardComponent;
  await el.updateComplete;

  return new CountCardHarness(el);
}

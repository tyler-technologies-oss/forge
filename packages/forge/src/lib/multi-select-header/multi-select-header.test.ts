import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IButtonComponent } from '../button/index.js';
import type { IMultiSelectHeaderComponent } from './multi-select-header.js';

import './multi-select-header.js';

describe('Multi Select Header', () => {
  it('should render', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
    expect(harness.toolbarElement).toBeTruthy();
  });

  it('should have expected default state', async () => {
    const harness = await createFixture();

    expect(harness.element.text).toBe('');
    expect(harness.element.noBorder).toBe(true);
    expect(harness.displayText).toBe('');
  });

  describe('text property', () => {
    it('should display custom text', async () => {
      const harness = await createFixture({ text: '3 items selected' });

      expect(harness.element.text).toBe('3 items selected');
      expect(harness.displayText).toBe('3 items selected');
    });

    it('should display different text formats', async () => {
      const harness = await createFixture({ text: '5 rows selected for processing' });

      expect(harness.element.text).toBe('5 rows selected for processing');
      expect(harness.displayText).toBe('5 rows selected for processing');
    });

    it('should display empty text when not provided', async () => {
      const harness = await createFixture();

      expect(harness.element.text).toBe('');
      expect(harness.displayText).toBe('');
    });

    it('should update display when text property changes', async () => {
      const harness = await createFixture({ text: '2 items selected' });

      expect(harness.displayText).toBe('2 items selected');

      harness.element.text = '5 items selected';
      await harness.element.updateComplete;

      expect(harness.displayText).toBe('5 items selected');
    });
  });

  describe('noBorder property', () => {
    it('should set no-divider on toolbar when noBorder is true', async () => {
      const harness = await createFixture({ noBorder: true });

      expect(harness.element.noBorder).toBe(true);
      expect(harness.toolbarElement.hasAttribute('no-divider')).toBe(true);
    });

    it('should not set no-divider on toolbar when noBorder is false', async () => {
      const harness = await createFixture({ noBorder: false });

      expect(harness.element.noBorder).toBe(false);
      expect(harness.toolbarElement.hasAttribute('no-divider')).toBe(false);
    });

    it('should update toolbar when noBorder changes', async () => {
      const harness = await createFixture({ noBorder: false });

      expect(harness.toolbarElement.hasAttribute('no-divider')).toBe(false);

      harness.element.noBorder = true;
      await harness.element.updateComplete;

      expect(harness.toolbarElement.hasAttribute('no-divider')).toBe(true);
    });
  });

  describe('slots', () => {
    it('should have actions slot available', async () => {
      const harness = await createFixture();

      expect(harness.actionsSlot).toBeTruthy();
      expect(harness.actionsSlot.name).toBe('actions');
    });

    it('should display action buttons when provided', async () => {
      const screen = render(html`
        <forge-multi-select-header text="2 items selected">
          <div slot="actions">
            <button class="test-button">Test Action</button>
          </div>
        </forge-multi-select-header>
      `);
      const el = screen.container.querySelector('forge-multi-select-header') as IMultiSelectHeaderComponent;
      await el.updateComplete;

      const actionButton = el.querySelector('.test-button');
      expect(actionButton).toBeTruthy();
      expect(actionButton?.textContent).toBe('Test Action');
    });

    it('content should project into the select-all-button-text slot', async () => {
      const harness = await createFixture();

      expect(harness.selectAllButtonTextSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
    });

    it('should dispatch select-all event when select-all button is clicked', async () => {
      const harness = await createFixture({ selectAllButtonText: 'Select All' });
      const spy = vi.fn();

      harness.element.addEventListener('forge-multi-select-header-select-all', spy);

      await userEvent.click(harness.selectAllButton);

      expect(spy).toHaveBeenCalledOnce();
    });
  });
});

class MultiSelectHeaderHarness extends TestHarness<IMultiSelectHeaderComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get toolbarElement(): HTMLElement {
    return getShadowElement(this.element, 'forge-toolbar') as HTMLElement;
  }

  public get displayText(): string {
    const span = getShadowElement(this.element, 'span.selected-text');
    return span?.textContent?.trim() || '';
  }

  public get actionsSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="actions"]') as HTMLSlotElement;
  }

  public get selectAllButton(): IButtonComponent {
    return getShadowElement(this.element, '#select-all-button') as IButtonComponent;
  }

  public get selectAllButtonTextSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="select-all-button-text"]') as HTMLSlotElement;
  }
}

interface MultiSelectHeaderFixtureConfig {
  text?: string;
  noBorder?: boolean;
  selectAllButtonText?: string;
}

async function createFixture({ text, noBorder, selectAllButtonText = 'Select all' }: MultiSelectHeaderFixtureConfig = {}): Promise<MultiSelectHeaderHarness> {
  const screen = render(html`
    <forge-multi-select-header .text=${text ?? ''} .noBorder=${noBorder ?? true}>
      <div slot="select-all-button-text">${ifDefined(selectAllButtonText)}</div>
    </forge-multi-select-header>
  `);
  const el = screen.container.querySelector('forge-multi-select-header') as IMultiSelectHeaderComponent;
  await el.updateComplete;

  return new MultiSelectHeaderHarness(el);
}

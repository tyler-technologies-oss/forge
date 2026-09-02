import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IStructuredCardComponent } from './structured-card.js';

import './structured-card.js';

describe('Structured Card', () => {
  it('should render', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
    expect(harness.cardElement).toBeTruthy();
    expect(harness.contentScaffoldElement).toBeTruthy();
  });

  it('should define sub-component dependencies', async () => {
    expect(window.customElements.get('forge-card')).toBeTruthy();
    expect(window.customElements.get('forge-content-scaffold')).toBeTruthy();
  });

  it('should have all slots available', async () => {
    const harness = await createFixture();

    expect(harness.beforeTitleSlot).toBeTruthy();
    expect(harness.titleSlot).toBeTruthy();
    expect(harness.headerActionsSlot).toBeTruthy();
    expect(harness.afterHeaderActionsSlot).toBeTruthy();
    expect(harness.bodySlot).toBeTruthy();
    expect(harness.footerStartSlot).toBeTruthy();
    expect(harness.footerSecondaryActionSlot).toBeTruthy();
    expect(harness.footerPrimaryActionSlot).toBeTruthy();
  });

  describe('properties', () => {
    it('should have default heading level of 2', async () => {
      const harness = await createFixture();

      expect(harness.element.headingLevel).toBe(2);
      expect(harness.titleElement.getAttribute('aria-level')).toBe('2');
    });

    it('should set heading level via property', async () => {
      const harness = await createFixture();

      harness.element.headingLevel = 3;
      await harness.element.updateComplete;

      expect(harness.element.headingLevel).toBe(3);
      expect(harness.titleElement.getAttribute('aria-level')).toBe('3');
    });

    it('should set heading level via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('heading-level', '4');
      await harness.element.updateComplete;

      expect(harness.element.headingLevel).toBe(4);
      expect(harness.titleElement.getAttribute('aria-level')).toBe('4');
    });

    it('should have default bodySpacing value of default', async () => {
      const harness = await createFixture();

      expect(harness.element.bodySpacing).toBe('default');
    });

    it('should set bodySpacing via property', async () => {
      const harness = await createFixture();

      harness.element.bodySpacing = 'none';
      await harness.element.updateComplete;

      expect(harness.element.bodySpacing).toBe('none');
    });

    it('should set bodySpacing via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('body-spacing', 'none');
      await harness.element.updateComplete;

      expect(harness.element.bodySpacing).toBe('none');
    });

    it('should apply body-spacing-none state when bodySpacing is none', async () => {
      const harness = await createFixture();

      harness.element.bodySpacing = 'none';
      await harness.element.updateComplete;

      expect(harness.hasState('body-spacing-none')).toBe(true);
    });

    it('should not apply body-spacing-none state when bodySpacing is default', async () => {
      const harness = await createFixture();

      harness.element.bodySpacing = 'default';
      await harness.element.updateComplete;

      expect(harness.hasState('body-spacing-none')).toBe(false);
    });

    it('should add body-spacing-none state when toggling bodySpacing from default to none', async () => {
      const harness = await createFixture();

      expect(harness.hasState('body-spacing-none')).toBe(false);

      harness.element.bodySpacing = 'none';
      await harness.element.updateComplete;

      expect(harness.hasState('body-spacing-none')).toBe(true);
    });

    it('should remove body-spacing-none state when toggling bodySpacing from none to default', async () => {
      const harness = await createFixture();

      harness.element.bodySpacing = 'none';
      await harness.element.updateComplete;

      expect(harness.hasState('body-spacing-none')).toBe(true);

      harness.element.bodySpacing = 'default';
      await harness.element.updateComplete;

      expect(harness.hasState('body-spacing-none')).toBe(false);
    });
  });

  describe('slots', () => {
    it('should project content into before-title slot', async () => {
      const harness = await createFixture(html`<div slot="before-title">Before Title</div>`);

      expect(harness.beforeTitleSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into title slot', async () => {
      const harness = await createFixture(html`<div slot="title">Title</div>`);

      expect(harness.titleSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into header-actions slot', async () => {
      const harness = await createFixture(html`<button slot="header-actions">Action</button>`);

      expect(harness.headerActionsSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into after-header-actions slot', async () => {
      const harness = await createFixture(html`<div slot="after-header-actions">After Actions</div>`);

      expect(harness.afterHeaderActionsSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into body slot', async () => {
      const harness = await createFixture(html`<div slot="body">Body Content</div>`);

      expect(harness.bodySlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into footer-start slot', async () => {
      const harness = await createFixture(html`<div slot="footer-start">Footer Start</div>`);

      expect(harness.footerStartSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into footer-secondary-action slot', async () => {
      const harness = await createFixture(html`<button slot="footer-secondary-action">Cancel</button>`);

      expect(harness.footerSecondaryActionSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it('should project content into footer-primary-action slot', async () => {
      const harness = await createFixture(html`<button slot="footer-primary-action">Save</button>`);

      expect(harness.footerPrimaryActionSlot.assignedNodes().length).toBeGreaterThan(0);
    });
  });

  describe('footer actions conditional rendering', () => {
    it('should hide footer-actions wrapper when footer action slots are empty', async () => {
      const harness = await createFixture();

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(true);
    });

    it('should show footer-actions wrapper when footer-secondary-action slot has content', async () => {
      const harness = await createFixture(html`<button slot="footer-secondary-action">Cancel</button>`);

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);
    });

    it('should show footer-actions wrapper when footer-primary-action slot has content', async () => {
      const harness = await createFixture(html`<button slot="footer-primary-action">Save</button>`);

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);
    });

    it('should show footer-actions wrapper when both footer action slots have content', async () => {
      const harness = await createFixture(html`
        <button slot="footer-secondary-action">Cancel</button>
        <button slot="footer-primary-action">Save</button>
      `);

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);
    });

    it('should show footer-actions wrapper when content is dynamically added to footer-secondary-action', async () => {
      const harness = await createFixture();

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(true);

      const button = document.createElement('button');
      button.slot = 'footer-secondary-action';
      button.textContent = 'Cancel';
      harness.element.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);
    });

    it('should show footer-actions wrapper when content is dynamically added to footer-primary-action', async () => {
      const harness = await createFixture();

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(true);

      const button = document.createElement('button');
      button.slot = 'footer-primary-action';
      button.textContent = 'Save';
      harness.element.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);
    });

    it('should hide footer-actions wrapper when content is dynamically removed from footer-secondary-action', async () => {
      const harness = await createFixture(html`<button slot="footer-secondary-action" id="cancel-btn">Cancel</button>`);

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);

      const button = harness.element.querySelector('#cancel-btn');
      button?.remove();

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(true);
    });

    it('should hide footer-actions wrapper when content is dynamically removed from footer-primary-action', async () => {
      const harness = await createFixture(html`<button slot="footer-primary-action" id="save-btn">Save</button>`);

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);

      const button = harness.element.querySelector('#save-btn');
      button?.remove();

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(true);
    });

    it('should keep footer-actions wrapper visible when one action is removed but another remains', async () => {
      const harness = await createFixture(html`
        <button slot="footer-secondary-action" id="cancel-btn">Cancel</button>
        <button slot="footer-primary-action">Save</button>
      `);

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);

      const button = harness.element.querySelector('#cancel-btn');
      button?.remove();

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.footerActionsElement).toBeTruthy();
      expect(harness.isElementHidden(harness.footerActionsElement)).toBe(false);
    });
  });

  describe('conditional title margin', () => {
    it('should apply margin to title when before-title slot is empty', async () => {
      const harness = await createFixture();

      expect(harness.titleElement.classList.contains('title-with-margin')).toBe(true);
    });

    it('should not apply margin to title when before-title slot has content', async () => {
      const harness = await createFixture(html`<button slot="before-title">Back</button>`);

      expect(harness.titleElement.classList.contains('title-with-margin')).toBe(false);
    });

    it('should add margin when before-title content is dynamically removed', async () => {
      const harness = await createFixture(html`<button slot="before-title" id="back-btn">Back</button>`);

      expect(harness.titleElement.classList.contains('title-with-margin')).toBe(false);

      const button = harness.element.querySelector('#back-btn');
      button?.remove();

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.titleElement.classList.contains('title-with-margin')).toBe(true);
    });

    it('should remove margin when before-title content is dynamically added', async () => {
      const harness = await createFixture();

      expect(harness.titleElement.classList.contains('title-with-margin')).toBe(true);

      const button = document.createElement('button');
      button.slot = 'before-title';
      button.textContent = 'Back';
      harness.element.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));
      await harness.element.updateComplete;

      expect(harness.titleElement.classList.contains('title-with-margin')).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('should have proper heading role', async () => {
      const harness = await createFixture();

      expect(harness.titleElement.getAttribute('role')).toBe('heading');
    });

    it('should have proper aria-level attribute on title', async () => {
      const harness = await createFixture();

      expect(harness.titleElement.getAttribute('aria-level')).toBe('2');
    });

    it('should update aria-level when headingLevel changes', async () => {
      const harness = await createFixture();

      harness.element.headingLevel = 1;
      await harness.element.updateComplete;

      expect(harness.titleElement.getAttribute('aria-level')).toBe('1');
    });
  });
});

class StructuredCardHarness extends TestHarness<IStructuredCardComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get cardElement(): HTMLElement {
    return getShadowElement(this.element, 'forge-card') as HTMLElement;
  }

  public get contentScaffoldElement(): HTMLElement {
    return getShadowElement(this.element, 'forge-content-scaffold') as HTMLElement;
  }

  public get titleElement(): HTMLElement {
    return getShadowElement(this.element, '#title') as HTMLElement;
  }

  public get footerActionsElement(): HTMLElement | null {
    return getShadowElement(this.element, '.footer-actions') as HTMLElement | null;
  }

  public isElementHidden(element: HTMLElement | null): boolean {
    return element?.style.display === 'none';
  }

  public hasState(state: string): boolean {
    return this.element.matches(`:state(${state})`);
  }

  public get beforeTitleSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="before-title"]') as HTMLSlotElement;
  }

  public get titleSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="title"]') as HTMLSlotElement;
  }

  public get headerActionsSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="header-actions"]') as HTMLSlotElement;
  }

  public get afterHeaderActionsSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="after-header-actions"]') as HTMLSlotElement;
  }

  public get bodySlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="body"]') as HTMLSlotElement;
  }

  public get footerStartSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="footer-start"]') as HTMLSlotElement;
  }

  public get footerSecondaryActionSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="footer-secondary-action"]') as HTMLSlotElement;
  }

  public get footerPrimaryActionSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="footer-primary-action"]') as HTMLSlotElement;
  }
}

async function createFixture(slotted?: ReturnType<typeof html>): Promise<StructuredCardHarness> {
  const screen = render(html`<forge-structured-card>${slotted ?? nothing}</forge-structured-card>`);
  const el = screen.container.querySelector('forge-structured-card') as IStructuredCardComponent;
  await el.updateComplete;

  return new StructuredCardHarness(el);
}

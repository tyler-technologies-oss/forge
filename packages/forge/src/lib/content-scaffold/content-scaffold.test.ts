import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { ContentScaffoldComponent } from './content-scaffold.js';

import './content-scaffold.js';

describe('Content Scaffold', () => {
  it('should render', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
    expect(harness.outerContainerElement).toBeTruthy();
  });

  it('should have all slots available', async () => {
    const harness = await createFixture();

    expect(harness.headerSlot).toBeTruthy();
    expect(harness.beforeHeaderStartSlot).toBeTruthy();
    expect(harness.headerStartSlot).toBeTruthy();
    expect(harness.headerEndSlot).toBeTruthy();
    expect(harness.bodySlot).toBeTruthy();
    expect(harness.footerSlot).toBeTruthy();
    expect(harness.footerStartSlot).toBeTruthy();
    expect(harness.footerEndSlot).toBeTruthy();
  });

  describe('conditional rendering', () => {
    describe('header', () => {
      it('should hide header wrapper when all header slots are empty', async () => {
        const harness = await createFixture();

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(true);
      });

      it('should show header wrapper when before-header-start slot has content', async () => {
        const harness = await createFixture(html`<div slot="before-header-start">Before Header Start</div>`);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
      });

      it('should show header wrapper when header-start slot has content', async () => {
        const harness = await createFixture(html`<div slot="header-start">Header Start</div>`);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
      });

      it('should show header wrapper when header-end slot has content', async () => {
        const harness = await createFixture(html`<div slot="header-end">Header End</div>`);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
      });

      it('should show header wrapper when any header slot has content', async () => {
        const harness = await createFixture(html`
          <div slot="before-header-start">Before</div>
          <div slot="header-start">Start</div>
          <div slot="header-end">End</div>
        `);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
      });

      it('should show header wrapper when content is dynamically added', async () => {
        const harness = await createFixture();

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(true);

        const headerContent = document.createElement('div');
        headerContent.slot = 'header-start';
        headerContent.textContent = 'Dynamic Header';
        harness.element.appendChild(headerContent);

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
      });

      it('should hide header wrapper when content is dynamically removed', async () => {
        const harness = await createFixture(html`<div slot="header-start" id="header-content">Header</div>`);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);

        const headerContent = harness.element.querySelector('#header-content');
        headerContent?.remove();

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(true);
      });
    });

    describe('body', () => {
      it('should hide body wrapper when body slot is empty', async () => {
        const harness = await createFixture();

        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(true);
      });

      it('should show body wrapper when body slot has content', async () => {
        const harness = await createFixture(html`<div slot="body">Body Content</div>`);

        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);
      });

      it('should show body wrapper when content is dynamically added', async () => {
        const harness = await createFixture();

        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(true);

        const bodyContent = document.createElement('div');
        bodyContent.slot = 'body';
        bodyContent.textContent = 'Dynamic Body';
        harness.element.appendChild(bodyContent);

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);
      });

      it('should hide body wrapper when content is dynamically removed', async () => {
        const harness = await createFixture(html`<div slot="body" id="body-content">Body</div>`);

        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);

        const bodyContent = harness.element.querySelector('#body-content');
        bodyContent?.remove();

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(true);
      });
    });

    describe('footer', () => {
      it('should hide footer wrapper when all footer slots are empty', async () => {
        const harness = await createFixture();

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(true);
      });

      it('should show footer wrapper when footer-start slot has content', async () => {
        const harness = await createFixture(html`<div slot="footer-start">Footer Start</div>`);

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
      });

      it('should show footer wrapper when footer-end slot has content', async () => {
        const harness = await createFixture(html`<div slot="footer-end">Footer End</div>`);

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
      });

      it('should show footer wrapper when any footer slot has content', async () => {
        const harness = await createFixture(html`
          <div slot="footer-start">Start</div>
          <div slot="footer-end">End</div>
        `);

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
      });

      it('should show footer wrapper when content is dynamically added', async () => {
        const harness = await createFixture();

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(true);

        const footerContent = document.createElement('div');
        footerContent.slot = 'footer-start';
        footerContent.textContent = 'Dynamic Footer';
        harness.element.appendChild(footerContent);

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
      });

      it('should hide footer wrapper when content is dynamically removed', async () => {
        const harness = await createFixture(html`<div slot="footer-start" id="footer-content">Footer</div>`);

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);

        const footerContent = harness.element.querySelector('#footer-content');
        footerContent?.remove();

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(true);
      });
    });

    describe('combined sections', () => {
      it('should show only sections with content', async () => {
        const harness = await createFixture(html`
          <div slot="header-start">Header</div>
          <div slot="footer-end">Footer</div>
        `);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(true);
        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
      });

      it('should show all sections when all have content', async () => {
        const harness = await createFixture(html`
          <div slot="header-start">Header</div>
          <div slot="body">Body</div>
          <div slot="footer-start">Footer</div>
        `);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);
        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
      });

      it('should hide all sections when all slots are empty', async () => {
        const harness = await createFixture();

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(true);
        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(true);
        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(true);
      });
    });
  });

  describe('slot detection for full-width modes', () => {
    describe('full-width header via slot detection', () => {
      it('should render full-width header when header slot has content', async () => {
        const harness = await createFixture(html`<div slot="header">Full Width Header</div>`);

        expect(harness.headerFullWidthElement).toBeTruthy();
        expect(harness.headerElement).toBeNull();
      });

      it('should render multi-slot header when header slot is empty', async () => {
        const harness = await createFixture(html`<div slot="header-start">Standard Header</div>`);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.headerElement)).toBe(false);
        expect(harness.headerFullWidthElement).toBeNull();
      });

      it('should switch to full-width header when content is added to header slot', async () => {
        const harness = await createFixture();

        expect(harness.headerElement).toBeTruthy();
        expect(harness.headerFullWidthElement).toBeNull();

        const headerContent = document.createElement('div');
        headerContent.slot = 'header';
        headerContent.textContent = 'Full Width Header';
        harness.element.appendChild(headerContent);

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.headerElement).toBeNull();
        expect(harness.headerFullWidthElement).toBeTruthy();
      });

      it('should switch to multi-slot header when content is removed from header slot', async () => {
        const harness = await createFixture(html`
          <div slot="header" id="header-content">Full Width Header</div>
          <div slot="header-start">Standard Header</div>
        `);

        expect(harness.headerFullWidthElement).toBeTruthy();
        expect(harness.headerElement).toBeNull();

        const headerContent = harness.element.querySelector('#header-content');
        headerContent?.remove();

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.headerElement).toBeTruthy();
        expect(harness.headerFullWidthElement).toBeNull();
      });
    });

    describe('full-width footer via slot detection', () => {
      it('should render full-width footer when footer slot has content', async () => {
        const harness = await createFixture(html`<div slot="footer">Full Width Footer</div>`);

        expect(harness.footerFullWidthElement).toBeTruthy();
        expect(harness.footerElement).toBeNull();
      });

      it('should render multi-slot footer when footer slot is empty', async () => {
        const harness = await createFixture(html`<div slot="footer-start">Standard Footer</div>`);

        expect(harness.footerElement).toBeTruthy();
        expect(harness.isElementHidden(harness.footerElement)).toBe(false);
        expect(harness.footerFullWidthElement).toBeNull();
      });

      it('should switch to full-width footer when content is added to footer slot', async () => {
        const harness = await createFixture();

        expect(harness.footerElement).toBeTruthy();
        expect(harness.footerFullWidthElement).toBeNull();

        const footerContent = document.createElement('div');
        footerContent.slot = 'footer';
        footerContent.textContent = 'Full Width Footer';
        harness.element.appendChild(footerContent);

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.footerElement).toBeNull();
        expect(harness.footerFullWidthElement).toBeTruthy();
      });

      it('should switch to multi-slot footer when content is removed from footer slot', async () => {
        const harness = await createFixture(html`
          <div slot="footer" id="footer-content">Full Width Footer</div>
          <div slot="footer-start">Standard Footer</div>
        `);

        expect(harness.footerFullWidthElement).toBeTruthy();
        expect(harness.footerElement).toBeNull();

        const footerContent = harness.element.querySelector('#footer-content');
        footerContent?.remove();

        await new Promise(resolve => setTimeout(resolve, 0));
        await harness.element.updateComplete;

        expect(harness.footerElement).toBeTruthy();
        expect(harness.footerFullWidthElement).toBeNull();
      });
    });

    describe('combined full-width modes', () => {
      it('should render both full-width header and footer when both slots have content', async () => {
        const harness = await createFixture(html`
          <div slot="header">Full Width Header</div>
          <div slot="body">Body</div>
          <div slot="footer">Full Width Footer</div>
        `);

        expect(harness.headerFullWidthElement).toBeTruthy();
        expect(harness.headerElement).toBeNull();
        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);
        expect(harness.footerFullWidthElement).toBeTruthy();
        expect(harness.footerElement).toBeNull();
      });

      it('should render multi-slot header with full-width footer', async () => {
        const harness = await createFixture(html`
          <div slot="header-start">Standard Header</div>
          <div slot="body">Body</div>
          <div slot="footer">Full Width Footer</div>
        `);

        expect(harness.headerElement).toBeTruthy();
        expect(harness.headerFullWidthElement).toBeNull();
        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);
        expect(harness.footerFullWidthElement).toBeTruthy();
        expect(harness.footerElement).toBeNull();
      });

      it('should render full-width header with multi-slot footer', async () => {
        const harness = await createFixture(html`
          <div slot="header">Full Width Header</div>
          <div slot="body">Body</div>
          <div slot="footer-start">Standard Footer</div>
        `);

        expect(harness.headerFullWidthElement).toBeTruthy();
        expect(harness.headerElement).toBeNull();
        expect(harness.bodyElement).toBeTruthy();
        expect(harness.isElementHidden(harness.bodyElement)).toBe(false);
        expect(harness.footerElement).toBeTruthy();
        expect(harness.footerFullWidthElement).toBeNull();
      });
    });
  });
});

class ContentScaffoldHarness extends TestHarness<ContentScaffoldComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get outerContainerElement(): HTMLElement {
    return getShadowElement(this.element, '.outer-container') as HTMLElement;
  }

  public get headerElement(): HTMLElement | null {
    return getShadowElement(this.element, '.header') as HTMLElement | null;
  }

  public get headerFullWidthElement(): HTMLElement | null {
    return getShadowElement(this.element, '.header-full-content') as HTMLElement | null;
  }

  public get bodyElement(): HTMLElement | null {
    return getShadowElement(this.element, '.body') as HTMLElement | null;
  }

  public get footerElement(): HTMLElement | null {
    return getShadowElement(this.element, '.footer') as HTMLElement | null;
  }

  public get footerFullWidthElement(): HTMLElement | null {
    return getShadowElement(this.element, '.footer-full-content') as HTMLElement | null;
  }

  public isElementHidden(element: HTMLElement | null): boolean {
    return element?.style.display === 'none';
  }

  public get headerSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="header"]') as HTMLSlotElement;
  }

  public get beforeHeaderStartSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="before-header-start"]') as HTMLSlotElement;
  }

  public get headerStartSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="header-start"]') as HTMLSlotElement;
  }

  public get headerEndSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="header-end"]') as HTMLSlotElement;
  }

  public get bodySlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="body"]') as HTMLSlotElement;
  }

  public get footerSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="footer"]') as HTMLSlotElement;
  }

  public get footerStartSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="footer-start"]') as HTMLSlotElement;
  }

  public get footerEndSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="footer-end"]') as HTMLSlotElement;
  }
}

async function createFixture(slotted?: ReturnType<typeof html>): Promise<ContentScaffoldHarness> {
  const screen = render(html`<forge-content-scaffold>${slotted ?? nothing}</forge-content-scaffold>`);
  const el = screen.container.querySelector('forge-content-scaffold') as ContentScaffoldComponent;
  await el.updateComplete;

  return new ContentScaffoldHarness(el);
}

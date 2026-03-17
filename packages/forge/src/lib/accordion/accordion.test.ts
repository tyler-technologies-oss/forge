import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import type { AccordionComponent } from './accordion.js';
import type { IExpansionPanelComponent } from '../expansion-panel/index.js';
import { ACCORDION_CONSTANTS } from './accordion-constants.js';
import { frame } from '../core/utils/utils.js';

import './accordion.js';

describe('Accordion', () => {
  it('should not have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.accordionElement.shadowRoot).toBeNull();
  });

  it('should not affect the default open state of the panels', async () => {
    const harness = await createFixture();

    expect(harness.expansionPanels.every(panel => panel.open)).toBe(false);
  });

  it('should open a panel when clicked', async () => {
    const harness = await createFixture();

    const [panel] = harness.expansionPanels;
    panel.querySelector('button')?.click();

    await frame();

    expect(panel.open).toBe(true);
    expect(harness.expansionPanels.filter(p => p !== panel).every(p => !p.open)).toBe(true);
  });

  it('should close open panel when closed panel is clicked', async () => {
    const harness = await createFixture();

    const [firstPanel, secondPanel] = harness.expansionPanels;

    expect(firstPanel.open).toBe(false);
    expect(secondPanel.open).toBe(false);

    firstPanel.querySelector('button')?.click();
    await frame();

    expect(firstPanel.open).toBe(true);
    expect(secondPanel.open).toBe(false);

    secondPanel.querySelector('button')?.click();
    await frame();

    expect(firstPanel.open).toBe(false);
    expect(secondPanel.open).toBe(true);
    expect(harness.expansionPanels.filter(p => p !== secondPanel).every(p => !p.open)).toBe(true);
  });

  it('should ignore events from nested panels', async () => {
    const harness = await createNestedFixture();

    const [firstPanel, secondPanel] = harness.expansionPanels;

    secondPanel.querySelector('button')?.click();

    const nestedPanel = secondPanel.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    nestedPanel.querySelector('button')?.click();
    await frame();

    expect(firstPanel.open).toBe(false);
  });

  it('should handle keyboard events', async () => {
    const harness = await createFixture();

    const [panel] = harness.expansionPanels;
    const button = panel.querySelector('button');

    button?.focus();
    await userEvent.keyboard('{Enter}');
    await frame();

    expect(panel.open).toBe(true);

    button?.focus();
    await userEvent.keyboard(' ');
    await frame();

    expect(panel.open).toBe(false);
  });

  it('should set panel selector via property and attribute', async () => {
    const harness = await createFixture();

    expect(harness.accordionElement.panelSelector).toBeUndefined();

    harness.accordionElement.panelSelector = '.test-selector';
    expect(harness.accordionElement.panelSelector).toBe('.test-selector');
    await frame();
    expect(harness.accordionElement.getAttribute('panel-selector')).toBe('.test-selector');

    harness.accordionElement.setAttribute('panel-selector', '.test2-selector');
    expect(harness.accordionElement.panelSelector).toBe('.test2-selector');
    await frame();
    expect(harness.accordionElement.getAttribute('panel-selector')).toBe('.test2-selector');
  });

  it("should ignore panels that don't match the panel selector", async () => {
    const harness = await createFixture({ panelSelector: '.test-class' });

    const panels = harness.expansionPanels;
    const [firstPanel, secondPanel, thirdPanel] = panels;

    expect(firstPanel.classList.contains('test-class')).toBe(true);
    expect(secondPanel.classList.contains('test-class')).toBe(true);
    expect(thirdPanel.classList.contains('test-class')).toBe(false);

    firstPanel.querySelector('button')?.click();
    await frame();

    thirdPanel.querySelector('button')?.click();
    await frame();

    expect(firstPanel.open).toBe(true);
    expect(secondPanel.open).toBe(false);
    expect(thirdPanel.open).toBe(true);
  });

  it('should dispatch toggle event', async () => {
    const harness = await createFixture();

    const [panel] = harness.expansionPanels;
    const button = panel.querySelector('button');

    const toggleSpy = vi.fn();
    harness.accordionElement.addEventListener(ACCORDION_CONSTANTS.events.TOGGLE, toggleSpy);

    button?.click();
    await frame();

    expect(toggleSpy).toHaveBeenCalledOnce();
  });
});

class AccordionHarness {
  constructor(public accordionElement: AccordionComponent) {}

  public get expansionPanels(): IExpansionPanelComponent[] {
    return Array.from(this.accordionElement.querySelectorAll('forge-expansion-panel'));
  }
}

interface IAccordionFixtureConfig {
  panelSelector?: string;
}

async function createFixture({ panelSelector }: IAccordionFixtureConfig = {}): Promise<AccordionHarness> {
  const screen = render(html`
    <forge-accordion .panelSelector=${panelSelector as string}>
      <forge-expansion-panel class="test-class">
        <button type="button" slot="header"></button>
        <div slot="content">Content</div>
      </forge-expansion-panel>
      <forge-expansion-panel class="test-class">
        <button type="button" slot="header"></button>
        <div slot="content">Content</div>
      </forge-expansion-panel>
      <forge-expansion-panel>
        <button type="button" slot="header"></button>
        <div slot="content">Content</div>
      </forge-expansion-panel>
    </forge-accordion>
  `);
  const accordion = screen.container.querySelector('forge-accordion')!;
  return new AccordionHarness(accordion);
}

async function createNestedFixture(): Promise<AccordionHarness> {
  const screen = render(html`
    <forge-accordion>
      <forge-expansion-panel>
        <button type="button" slot="header"></button>
        <div slot="content">Content</div>
      </forge-expansion-panel>

      <forge-expansion-panel>
        <button type="button" slot="header"></button>
        <div slot="content">
          <forge-expansion-panel>
            <button type="button" slot="header"></button>
            <div slot="content">Content</div>
          </forge-expansion-panel>
        </div>
      </forge-expansion-panel>
    </forge-accordion>
  `);
  const accordion = screen.container.querySelector('forge-accordion')!;
  return new AccordionHarness(accordion);
}

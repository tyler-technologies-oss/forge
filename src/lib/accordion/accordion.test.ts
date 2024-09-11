import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { IAccordionComponent } from './accordion';

import './accordion';
import { IExpansionPanelComponent } from '../expansion-panel';

describe('Accordion', () => {
  it('should not have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.accordionElement.shadowRoot).to.be.null;
  });

  it('should not affect the default open state of the panels', async () => {
    const harness = await createFixture();

    expect(harness.expansionPanels.every(panel => panel.open)).to.be.false;
  });

  it('should open a panel when clicked', async () => {
    const harness = await createFixture();

    const [panel] = harness.expansionPanels;
    panel.querySelector('button')?.click();

    await elementUpdated(panel);

    expect(panel.open).to.be.true;
    expect(harness.expansionPanels.filter(p => p !== panel).every(p => !p.open)).to.be.true;
  });

  it('should close open panel when closed panel is clicked', async () => {
    const harness = await createFixture();

    const [firstPanel, secondPanel] = harness.expansionPanels;

    expect(firstPanel.open).to.be.false;
    expect(secondPanel.open).to.be.false;

    firstPanel.querySelector('button')?.click();
    await elementUpdated(firstPanel);

    expect(firstPanel.open).to.be.true;
    expect(secondPanel.open).to.be.false;

    secondPanel.querySelector('button')?.click();
    await elementUpdated(secondPanel);

    expect(firstPanel.open).to.be.false;
    expect(secondPanel.open).to.be.true;
    expect(harness.expansionPanels.filter(p => p !== secondPanel).every(p => !p.open)).to.be.true;
  });

  it('should ignore events from nested panels', async () => {
    const harness = await createNestedFixture();

    const [firstPanel, secondPanel] = harness.expansionPanels;

    secondPanel.querySelector('button')?.click();

    const nestedPanel = secondPanel.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    nestedPanel.querySelector('button')?.click();
    await elementUpdated(nestedPanel);

    expect(firstPanel.open).to.be.false;
  });

  it('should handle keyboard events', async () => {
    const harness = await createFixture();

    const [panel] = harness.expansionPanels;
    const button = panel.querySelector('button');

    button?.focus();
    await sendKeys({ press: 'Enter' });
    await elementUpdated(panel);

    expect(panel.open).to.be.true;

    button?.focus();
    await sendKeys({ press: 'Space' });
    await elementUpdated(panel);

    expect(panel.open).to.be.false;
  });

  it('should set panel selector via property and attribute', async () => {
    const harness = await createFixture();

    expect(harness.accordionElement.panelSelector).to.be.undefined;

    harness.accordionElement.panelSelector = '.test-selector';
    expect(harness.accordionElement.panelSelector).to.equal('.test-selector');
    expect(harness.accordionElement.getAttribute('panel-selector')).to.equal('.test-selector');

    harness.accordionElement.setAttribute('panel-selector', '.test2-selector');
    expect(harness.accordionElement.panelSelector).to.equal('.test2-selector');
    expect(harness.accordionElement.getAttribute('panel-selector')).to.equal('.test2-selector');
  });

  it("should ignore panels that don't match the panel selector", async () => {
    const harness = await createFixture({ panelSelector: '.test-class' });

    const panels = harness.expansionPanels;
    const [firstPanel, secondPanel, thirdPanel] = panels;

    expect(firstPanel.classList.contains('test-class')).to.be.true;
    expect(secondPanel.classList.contains('test-class')).to.be.true;
    expect(thirdPanel.classList.contains('test-class')).to.be.false;

    firstPanel.querySelector('button')?.click();
    await elementUpdated(firstPanel);

    thirdPanel.querySelector('button')?.click();
    await elementUpdated(thirdPanel);

    expect(firstPanel.open).to.be.true;
    expect(secondPanel.open).to.be.false;
    expect(thirdPanel.open).to.be.true;
  });
});

class AccordionHarness {
  constructor(public accordionElement: IAccordionComponent) {}

  public get expansionPanels(): IExpansionPanelComponent[] {
    return Array.from(this.accordionElement.querySelectorAll('forge-expansion-panel'));
  }
}

interface IAccordionFixtureConfig {
  panelSelector?: string;
}

async function createFixture({ panelSelector }: IAccordionFixtureConfig = {}): Promise<AccordionHarness> {
  const accordion = await fixture<IAccordionComponent>(html`
    <forge-accordion .panelSelector=${panelSelector}>
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
  return new AccordionHarness(accordion);
}

async function createNestedFixture(): Promise<AccordionHarness> {
  const accordion = await fixture<IAccordionComponent>(html`
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
  return new AccordionHarness(accordion);
}

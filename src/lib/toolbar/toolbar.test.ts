import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';

import './toolbar'
import { IToolbarComponent } from './toolbar';
import { TOOLBAR_CONSTANTS } from './toolbar-constants';
import { getShadowElement } from '@tylertech/forge-core';

describe('Toolbar', () => {
  it('should initialize', async () => {
    const el = await fixture<IToolbarComponent>(html`<forge-toolbar></forge-toolbar>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IToolbarComponent>(html`<forge-toolbar></forge-toolbar>`);
    await expect(el).to.be.accessible();
  });

  it('should update the inverted attribute when the property is set ', async () => {
   const el = await fixture<IToolbarComponent>(html`<forge-toolbar></forge-toolbar>`);
   el.inverted = true;
   expect(el.hasAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED)).to.be.true;
 });

  it('content should project into the before start slot', async () => {
   const el = await fixture<IToolbarComponent>(html`<forge-toolbar><div slot="before-start">text content</div></forge-toolbar>`);
   const beforeStartSlot = getShadowElement(el, TOOLBAR_CONSTANTS.selectors.BEFORE_START) as HTMLSlotElement;
   await elementUpdated(el);
   expect(beforeStartSlot.assignedNodes().length).to.equal(1);
  });

  it('content should project into the start slot', async () => {
   const el = await fixture<IToolbarComponent>(html`<forge-toolbar><div slot="start">text content</div></forge-toolbar>`);
   const startSlot = getShadowElement(el, TOOLBAR_CONSTANTS.selectors.START_SLOT) as HTMLSlotElement;
   await elementUpdated(el);
   expect(startSlot.assignedNodes().length).to.equal(1);
  });

  it('content should project into the center slot', async () => {
   const el = await fixture<IToolbarComponent>(html`<forge-toolbar><div slot="center">text content</div></forge-toolbar>`);
   const centerSlot = getShadowElement(el, TOOLBAR_CONSTANTS.selectors.CENTER_SLOT) as HTMLSlotElement;
   await elementUpdated(el);
   expect(centerSlot.assignedNodes().length).to.equal(1);
  });

  it('content should project into the end slot', async () => {
   const el = await fixture<IToolbarComponent>(html`<forge-toolbar><div slot="end">text content</div></forge-toolbar>`);
   const endSlot = getShadowElement(el, TOOLBAR_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
   await elementUpdated(el);
   expect(endSlot.assignedNodes().length).to.equal(1);
  });

  it('content should project into the after-end slot', async () => {
   const el = await fixture<IToolbarComponent>(html`<forge-toolbar><div slot="after-end">text content</div></forge-toolbar>`);
   const afterEndSlot = getShadowElement(el, TOOLBAR_CONSTANTS.selectors.AFTER_END) as HTMLSlotElement;
   await elementUpdated(el);
   expect(afterEndSlot.assignedNodes().length).to.equal(1);
  });

  it('should set default inverted property when no attributes are applied', async () => {
    const el = await fixture<IToolbarComponent>(html`<forge-toolbar></forge-toolbar>`);
    expect(el.inverted).to.be.false; 
  });
});
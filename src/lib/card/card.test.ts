import { expect } from '@esm-bundle/chai';
import { fixture } from '@open-wc/testing';
import type { ICardComponent } from './card';
import { TestHarness } from '../../test/utils/test-harness';
import { getShadowElement } from '@tylertech/forge-core';

import './card';

describe('Card', () => {
  it('should instantiate component with shadow dom', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');

    await expect(el).to.be.accessible();
  });

  it('should be outlined by default', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');

    expect(el.raised).to.be.false;
    expect(el.hasAttribute('raised')).to.be.false;
    expect(el.matches(':state(raised)')).to.be.false;
  });

  it('should have padding by default', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');
    const ctx = new CardHarness(el);

    expect(getComputedStyle(ctx.rootElement).padding).to.equal('16px');
  });

  it('should set raised', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');

    el.raised = true;
    await el.updateComplete;

    expect(el.raised).to.be.true;
    expect(el.hasAttribute('raised')).to.be.true;
    expect(el.matches(':state(raised)')).to.be.true;
  });

  it('should set raised by default via attribute', async () => {
    const el = await fixture<ICardComponent>('<forge-card raised></forge-card>');

    expect(el.raised).to.be.true;
    expect(el.hasAttribute('raised')).to.be.true;
    expect(el.matches(':state(raised)')).to.be.true;
  });

  it('should unset raised', async () => {
    const el = await fixture<ICardComponent>('<forge-card raised></forge-card>');

    expect(el.raised).to.be.true;

    el.raised = false;
    await el.updateComplete;

    expect(el.raised).to.be.false;
    expect(el.hasAttribute('raised')).to.be.false;
    expect(el.matches(':state(raised)')).to.be.false;
  });

  it('should project content into default slot', async () => {
    const el = await fixture<ICardComponent>('<forge-card><div>some content</div></forge-card>');
    const ctx = new CardHarness(el);
    const nodes = ctx.defaultSlot.assignedNodes();

    expect(nodes.length).to.equal(1);
    expect(nodes[0].textContent).to.equal('some content');
  });

  it('should set padding via CSS variable', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');
    const ctx = new CardHarness(el);

    expect(getComputedStyle(ctx.rootElement).padding).to.equal('16px');

    el.style.setProperty('--forge-card-padding', '8px');

    expect(getComputedStyle(ctx.rootElement).padding).to.equal('8px');
  });

  it('should remove padding when no-padding attribute is applied', async () => {
    const el = await fixture<ICardComponent>('<forge-card no-padding></forge-card>');
    const ctx = new CardHarness(el);

    expect(getComputedStyle(ctx.rootElement).padding).to.equal('0px');
  });
});

class CardHarness extends TestHarness<ICardComponent> {
  public rootElement: HTMLElement;
  public defaultSlot: HTMLSlotElement;

  constructor(el: ICardComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, '.forge-card') as HTMLElement;
    this.defaultSlot = getShadowElement(this.element, 'slot:not([name])') as HTMLSlotElement;
  }
}

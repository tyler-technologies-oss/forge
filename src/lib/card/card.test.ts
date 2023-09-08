import { expect } from '@esm-bundle/chai';
import { fixture } from '@open-wc/testing';
import type { ICardComponent } from './card';
import { TestHarness } from '../../test/utils/test-harness';

import './card';
import { getShadowElement } from '@tylertech/forge-core';
import { CARD_CONSTANTS } from './card-constants';

describe('Card', () => {
  it('should instantiate component with shadow dom', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be outlined by default', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');
    const ctx = new CardHarness(el);

    expect(el.raised).to.be.false;
    expect(ctx.rootElement.classList.contains(CARD_CONSTANTS.classes.RAISED)).to.be.false;
  });

  it('should have padding by default', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');
    const ctx = new CardHarness(el);

    expect(getComputedStyle(ctx.rootElement).padding).to.equal('16px');
  });

  it('should set raised', async () => {
    const el = await fixture<ICardComponent>('<forge-card></forge-card>');
    const ctx = new CardHarness(el);

    el.raised = true;
    expect(ctx.rootElement.classList.contains(CARD_CONSTANTS.classes.RAISED)).to.be.true;
  });

  it('should set raised by default via attribute', async () => {
    const el = await fixture<ICardComponent>('<forge-card raised></forge-card>');
    const ctx = new CardHarness(el);

    expect(el.raised).to.be.true;
    expect(ctx.rootElement.classList.contains(CARD_CONSTANTS.classes.RAISED)).to.be.true;
  });

  it('should unset raised', async () => {
    const el = await fixture<ICardComponent>('<forge-card raised></forge-card>');
    const ctx = new CardHarness(el);

    expect(ctx.element.raised).to.equal(true);

    el.raised = false;

    expect(el.hasAttribute(CARD_CONSTANTS.attributes.RAISED)).to.be.false;
    expect(el.raised).to.be.false;
    expect(ctx.rootElement.classList.contains(CARD_CONSTANTS.classes.RAISED)).to.be.false;
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
});

class CardHarness extends TestHarness<ICardComponent> {
  public rootElement: HTMLElement;
  public defaultSlot: HTMLSlotElement;

  constructor(el: ICardComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, CARD_CONSTANTS.selectors.ROOT) as HTMLElement;
    this.defaultSlot = getShadowElement(this.element, 'slot:not([name])') as HTMLSlotElement;
  }
}

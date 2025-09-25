import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { TestHarness } from '../core/testing/test-harness';
import { ILabelAware, ILabelComponent, LABEL_CONSTANTS } from '../label';

import './label';

class LabelHarness extends TestHarness<ILabelComponent> {
  public labelAwareElement: HTMLElement & ILabelAware;

  constructor(el: ILabelComponent) {
    super(el);
  }

  public initElementRefs(): void {
    const element = document.createElement(LABEL_CONSTANTS.labelableChildSelectors[0]);
    element.id = 'label-aware';
    (element as any).labelClickedCallback = () => {};
    (element as any).labelChangedCallback = () => {};
    this.labelAwareElement = element as any as HTMLElement & ILabelAware;
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();

    await sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }
}

describe('Label', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label></forge-label>`);
    expect(el.shadowRoot).to.not.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label></forge-label>`);
    await expect(el).to.be.accessible();
  });

  it('should render with correct default values', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label></forge-label>`);

    expect(el.for).to.be.undefined;
    expect(el.forElement).to.be.undefined;
    expect(el.dynamic).to.be.false;
  });

  it('should accept for', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label for="test"></forge-label>`);
    expect(el.for).to.equal('test');
  });

  it('should accept forElement', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label></forge-label>`);
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.forElement = ctx.labelAwareElement;

    expect(el.forElement).to.be.equal(ctx.labelAwareElement);
  });

  it('should accept dynamic', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label dynamic></forge-label>`);
    expect(el.dynamic).to.be.true;
  });

  it('should locate target element by id', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label>Label</forge-label>`);
    const ctx = new LabelHarness(el);
    const connectedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    expect(connectedSpy).to.have.been.calledOnce;
  });

  it('should locate target element by reference', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label>Label</forge-label>`);
    const ctx = new LabelHarness(el);
    const connectedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.forElement = ctx.labelAwareElement;

    expect(connectedSpy).to.have.been.calledOnce;
  });

  it('should locate slotted target element', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label>Label</forge-label>`);
    const ctx = new LabelHarness(el);
    const connectedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');

    el.append(ctx.labelAwareElement);
    await elementUpdated(el);

    expect(connectedSpy).to.have.been.called;
  });

  it('should update manually', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label>Label</forge-label>`);
    const ctx = new LabelHarness(el);

    el.append(ctx.labelAwareElement);
    await elementUpdated(el);

    const updatedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');
    el.update();

    expect(updatedSpy).to.have.been.calledOnce;
  });

  it('should not update automatically by default', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label>Label</forge-label>`);
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    const changedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');
    el.innerText = 'New Label';

    expect(changedSpy).to.not.have.been.called;
  });

  it('should update automatically when dynamic', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label dynamic>Label</forge-label>`);
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    const changedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');
    el.innerText = 'New Label';

    await elementUpdated(el);

    expect(changedSpy).to.have.been.calledWith('New Label');
  });

  it('should stop updating automatically when dynamic is removed', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label dynamic>Label</forge-label>`);
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;
    el.innerText = 'New Label';

    await elementUpdated(el);
    el.dynamic = false;

    const changedSpy = spy(ctx.labelAwareElement, 'labelChangedCallback');
    el.innerText = 'New Label 2';

    expect(changedSpy).to.not.have.been.called;
  });

  it('should handle click', async () => {
    const el = await fixture<ILabelComponent>(html`<forge-label>Label</forge-label>`);
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    const clickedSpy = spy(ctx.labelAwareElement, 'labelClickedCallback');
    await ctx.clickElement(el);

    expect(clickedSpy).to.have.been.calledOnce;
  });
});

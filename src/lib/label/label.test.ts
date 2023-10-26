import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { sendMouse } from '@web/test-runner-commands';
import { TestHarness } from '../../test/utils/test-harness';
import { ILabelComponent } from './label';
import { ILabelAware } from './label-aware';
import { LABEL_CONSTANTS } from './label-constants';

import './label';

class LabelHarness extends TestHarness<ILabelComponent> {
  public rootElement: HTMLElement;
  public labelAwareElement: HTMLElement & ILabelAware;

  constructor(el: ILabelComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, LABEL_CONSTANTS.selectors.ROOT);
    this.labelAwareElement = Object.create(document.createElement('div'), {
      id: {
        value: 'test'
      },
      labelClickedCallback: {
        value: () => { },
      },
      labelChangedCallback: {
        value: () => { }
      }
    }) as HTMLElement & ILabelAware;
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();

    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2)
    ]})
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

    

    expect(el.forElement).to.not.be.null;
  });
})
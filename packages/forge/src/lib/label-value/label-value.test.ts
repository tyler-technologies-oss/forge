import { expect, fixture, html } from '@open-wc/testing';
import { ILabelValueComponent } from './label-value';

import './label-value';
import { LABEL_VALUE_CONSTANTS } from './label-value-constants';

describe('Label Value', () => {
  it('should use shadow DOM', async () => {
    const el = await createFixture();

    expect(el.shadowRoot).to.not.be.null;
  });

  it('should be accessible', async () => {
    const el = await createFixture();

    await expect(el).to.be.accessible();
  });

  it('should have expected default state', async () => {
    const el = await createFixture();

    expect(el.empty).to.be.false;
    expect(el.ellipsis).to.be.false;
    expect(el.inline).to.be.false;
    expect(el.dense).to.be.false;
  });

  it('should set empty via attribute', async () => {
    const el = await createFixture({ empty: true });

    expect(el.empty).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY)).to.be.true;
  });

  it('should set empty via property', async () => {
    const el = await createFixture();

    el.empty = true;

    expect(el.empty).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY)).to.be.true;
  });

  it('should set ellipsis via attribute', async () => {
    const el = await createFixture({ ellipsis: true });

    expect(el.ellipsis).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS)).to.be.true;
  });

  it('should set ellipsis via property', async () => {
    const el = await createFixture();

    el.ellipsis = true;

    expect(el.ellipsis).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS)).to.be.true;
  });

  it('should set inline via attribute', async () => {
    const el = await createFixture({ inline: true });

    expect(el.dense).to.be.true;
    expect(el.inline).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).to.be.true;
  });

  it('should set inline via property', async () => {
    const el = await createFixture();

    el.inline = true;

    expect(el.inline).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).to.be.true;
  });

  it('should set inline via deprecated dense property', async () => {
    const el = await createFixture();

    el.dense = true;

    expect(el.dense).to.be.true;
    expect(el.inline).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).to.be.true;
  });

  it('should set inline via deprecated dense attribute', async () => {
    const el = await createFixture();

    el.setAttribute(LABEL_VALUE_CONSTANTS.attributes.DENSE, '');

    expect(el.dense).to.be.true;
    expect(el.inline).to.be.true;
    expect(el.hasAttribute(LABEL_VALUE_CONSTANTS.attributes.INLINE)).to.be.true;
  });
});

function createFixture({ empty = false, ellipsis = false, inline = false } = {}): Promise<ILabelValueComponent> {
  return fixture<ILabelValueComponent>(html`
    <forge-label-value ?empty=${empty} ?ellipsis=${ellipsis} ?inline=${inline}>
      <span slot="label">Label</span>
      <span slot="value">Value</span>
    </forge-label-value>
  `);
}

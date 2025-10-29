import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { ILabelValueComponent } from './label-value';

import './label-value';

describe('Label Value', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-label-value>Test</forge-label-value>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`<forge-label-value>Test</forge-label-value>`);

    await expect(el).to.be.accessible();
  });

  it('should have expected default state', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value></forge-label-value>`);

    expect(el.empty).to.be.false;
    expect(el.ellipsis).to.be.false;
    expect(el.inline).to.be.false;
    expect(el.dense).to.be.false;
  });

  it('should set empty attribute when empty property is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value></forge-label-value>`);
    el.empty = true;
    await elementUpdated(el);

    expect(el.hasAttribute('empty')).to.be.true;
    expect(el.matches(':state(empty)')).to.be.true;
  });

  it('should set empty property when empty attribute is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value empty></forge-label-value>`);

    expect(el.empty).to.be.true;
    expect(el.matches(':state(empty)')).to.be.true;
  });

  it('should set ellipsis attribute when ellipsis property is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value></forge-label-value>`);
    el.ellipsis = true;
    await elementUpdated(el);

    expect(el.hasAttribute('ellipsis')).to.be.true;
    expect(el.matches(':state(ellipsis)')).to.be.true;
  });

  it('should set ellipsis property when ellipsis attribute is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value ellipsis></forge-label-value>`);

    expect(el.ellipsis).to.be.true;
    expect(el.matches(':state(ellipsis)')).to.be.true;
  });

  it('should set inline attribute when inline property is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value></forge-label-value>`);
    el.inline = true;
    await elementUpdated(el);

    expect(el.hasAttribute('inline')).to.be.true;
    expect(el.matches(':state(inline)')).to.be.true;
  });

  it('should set inline property when inline attribute is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value inline></forge-label-value>`);

    expect(el.inline).to.be.true;
    expect(el.matches(':state(inline)')).to.be.true;
  });

  it('should set inline attribute when dense deprecated property is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value></forge-label-value>`);
    el.dense = true;
    await elementUpdated(el);

    expect(el.hasAttribute('inline')).to.be.true;
    expect(el.matches(':state(inline)')).to.be.true;
  });

  it('should set inline property when dense deprecated attribute is set', async () => {
    const el = await fixture<ILabelValueComponent>(html`<forge-label-value dense></forge-label-value>`);

    expect(el.inline).to.be.true;
    expect(el.matches(':state(inline)')).to.be.true;
  });
});

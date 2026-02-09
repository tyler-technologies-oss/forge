import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { MeterGroupComponent } from './meter-group.js';

import './meter-group.js';
import '../meter/meter.js';

describe('Meter Group', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<MeterGroupComponent>(html`<forge-meter-group></forge-meter-group>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<MeterGroupComponent>(html`<forge-meter-group><forge-meter aria-label="Test"></forge-meter></forge-meter-group>`);

    await expect(el).to.be.accessible();
  });

  it('should recieve label', async () => {
    const el = await fixture<MeterGroupComponent>(html`
      <label>
        <span>Test</span>
        <forge-meter-group></forge-meter-group>
      </label>
    `);
    const meter = el.querySelector('forge-meter-group');

    await expect(meter?.labels[0]).to.equal(el);
  });

  it('should attach to form', async () => {
    const el = await fixture<MeterGroupComponent>(html`<forge-meter-group></forge-meter-group>`);
    const form = document.createElement('form');
    form.appendChild(el);
    await expect(el.form).to.equal(form);
  });

  it('should sync properties with child meters', async () => {
    const el = await fixture<MeterGroupComponent>(html`
      <forge-meter-group>
        <forge-meter></forge-meter>
      </forge-meter-group>
    `);
    const meter = el.querySelector('forge-meter')!;
    el.direction = 'vertical';
    el.min = 0.1;
    el.max = 0.9;
    await elementUpdated(meter);

    await expect(meter.direction).to.equal('vertical');
    await expect(meter.min).to.equal(0.1);
    await expect(meter.max).to.equal(0.9);
  });

  it('should detect when label or value is slotted', async () => {
    const el = await fixture<MeterGroupComponent>(html`<forge-meter-group></forge-meter-group>`);
    const label = document.createElement('span');
    label.slot = 'label';
    label.textContent = 'Test';
    el.appendChild(label);

    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('.heading.not-empty')).to.not.be.null;

    el.removeChild(label);
    const value = document.createElement('span');
    value.slot = 'value';
    value.textContent = '0';
    el.appendChild(value);

    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('.heading.not-empty')).to.not.be.null;
  });

  it('should correctly set vertical state', async () => {
    const el = await fixture<MeterGroupComponent>(html`<forge-meter></forge-meter>`);
    expect(el.matches(':state(vertical)')).to.be.false;

    el.direction = 'vertical';
    await elementUpdated(el);
    expect(el.matches(':state(vertical)')).to.be.true;
  });
});

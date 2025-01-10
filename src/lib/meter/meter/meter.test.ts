import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { MeterComponent } from './meter';

import './meter';

describe('Meter', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<MeterComponent>(html`<forge-meter></forge-meter>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<MeterComponent>(html`<forge-meter aria-label="Test"></forge-meter>`);

    await expect(el).to.be.accessible();
  });

  it('should recieve label', async () => {
    const el = await fixture<MeterComponent>(html`
      <label>
        <span>Test</span>
        <forge-meter></forge-meter>
      </label>
    `);
    const meter = el.querySelector('forge-meter');

    await expect(meter?.labels[0]).to.equal(el);
  });

  it('should attach to form', async () => {
    const el = await fixture<MeterComponent>(html`<forge-meter></forge-meter>`);
    const form = document.createElement('form');
    form.appendChild(el);
    await expect(el.form).to.equal(form);
  });

  it('should set percentage to 0 in case of an error', async () => {
    const el = await fixture<MeterComponent>(html`<forge-meter></forge-meter>`);
    el.max = 'char' as any as number;
    await expect(el.percentage).to.equal(0);
  });

  describe('Segmented', () => {
    it('should be optimal when optimum and value less than low', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="0" low="0.5" optimum="0"></forge-meter>`);
      await expect(el.matches(':state(optimum-value)')).to.be.true;
    });

    it('should be optimal when optimum and value are between low and high', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="0.5" low="0" high="1" optimum="0.5"></forge-meter>`);
      await expect(el.matches(':state(optimum-value)')).to.be.true;
    });

    it('should be optimal when optimum and value are greater than high', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="1" high="0.5" optimum="1"></forge-meter>`);
      await expect(el.matches(':state(optimum-value)')).to.be.true;
    });

    it('should be suboptimal when optimum is less than low and value is between low and high', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="0.5" low="0.2" high="0.8" optimum="0"></forge-meter>`);
      await expect(el.matches(':state(suboptimum-value)')).to.be.true;
    });

    it('should be suboptimal when optimum is greater than high and value is between low and high', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="0.5" low="0.2" high="0.8" optimum="1"></forge-meter>`);
      await expect(el.matches(':state(suboptimum-value)')).to.be.true;
    });

    it('should be suboptimal when optimum is between low and high and value is less than low', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="0" low="0.2" high="0.8" optimum="0.5"></forge-meter>`);
      await expect(el.matches(':state(suboptimum-value)')).to.be.true;
    });

    it('should be suboptimal when optimum is between low and high and value is greater than high', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="1" low="0.2" high="0.8" optimum="0.5"></forge-meter>`);
      await expect(el.matches(':state(suboptimum-value)')).to.be.true;
    });

    it('should be least optimal when optimum is greater than high and value is less than low', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="0" low="0.5" high="0.8" optimum="1"></forge-meter>`);
      await expect(el.matches(':state(least-optimum-value)')).to.be.true;
    });

    it('should be least optimal when optimum is less than low and value is greater than high', async () => {
      const el = await fixture<MeterComponent>(html`<forge-meter value="1" low="0.5" high="0.8" optimum="0"></forge-meter>`);
      await expect(el.matches(':state(least-optimum-value)')).to.be.true;
    });
  });

  it('should detect when label or value is slotted', async () => {
    const el = await fixture<MeterComponent>(html`<forge-meter></forge-meter>`);
    const label = document.createElement('span');
    label.textContent = 'Test';
    el.appendChild(label);

    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('.heading.not-empty')).to.not.be.null;

    el.removeChild(label);
    const value = document.createElement('span');
    value.textContent = '0';
    el.appendChild(value);

    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('.heading.not-empty')).to.not.be.null;
  });

  it('should correctly have vertical state', async () => {
    const el = await fixture<MeterComponent>(html`<forge-meter></forge-meter>`);
    expect(el.matches(':state(vertical)')).to.be.false;

    el.direction = 'vertical';
    await elementUpdated(el);
    expect(el.matches(':state(vertical)')).to.be.true;
  });
});

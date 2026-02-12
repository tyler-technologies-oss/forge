import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { MeterComponent } from './meter.js';
import { frame } from '../../core/utils/utils.js';

import './meter.js';

describe('Meter', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-meter></forge-meter>`);
    const el = screen.container.querySelector('forge-meter') as MeterComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-meter aria-label="Test"></forge-meter>`);
    const el = screen.container.querySelector('forge-meter') as MeterComponent;

    await expect(el).toBeAccessible();
  });

  it('should recieve label', async () => {
    const screen = render(html`
      <label>
        <span>Test</span>
        <forge-meter></forge-meter>
      </label>
    `);
    const label = screen.container.querySelector('label') as HTMLLabelElement;
    const meter = label.querySelector('forge-meter') as MeterComponent;

    expect(meter?.labels[0]).toBe(label);
  });

  it('should attach to form', async () => {
    const screen = render(html`<forge-meter></forge-meter>`);
    const el = screen.container.querySelector('forge-meter') as MeterComponent;
    const form = document.createElement('form');
    form.appendChild(el);
    expect(el.form).toBe(form);
  });

  it('should set percentage to 0 in case of an error', async () => {
    const screen = render(html`<forge-meter></forge-meter>`);
    const el = screen.container.querySelector('forge-meter') as MeterComponent;
    el.value = 'char' as any as number;
    expect(el.percentage).toBe(0);
  });

  describe('Segmented', () => {
    it('should be optimal when optimum and value less than low', async () => {
      const screen = render(html`<forge-meter value="0" low="0.5" optimum="0"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(optimum-value)')).toBe(true);
    });

    it('should be optimal when optimum and value are between low and high', async () => {
      const screen = render(html`<forge-meter value="0.5" low="0" high="1" optimum="0.5"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(optimum-value)')).toBe(true);
    });

    it('should be optimal when optimum and value are greater than high', async () => {
      const screen = render(html`<forge-meter value="1" high="0.5" optimum="1"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(optimum-value)')).toBe(true);
    });

    it('should be suboptimal when optimum is less than low and value is between low and high', async () => {
      const screen = render(html`<forge-meter value="0.5" low="0.2" high="0.8" optimum="0"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(suboptimum-value)')).toBe(true);
    });

    it('should be suboptimal when optimum is greater than high and value is between low and high', async () => {
      const screen = render(html`<forge-meter value="0.5" low="0.2" high="0.8" optimum="1"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(suboptimum-value)')).toBe(true);
    });

    it('should be suboptimal when optimum is between low and high and value is less than low', async () => {
      const screen = render(html`<forge-meter value="0" low="0.2" high="0.8" optimum="0.5"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(suboptimum-value)')).toBe(true);
    });

    it('should be suboptimal when optimum is between low and high and value is greater than high', async () => {
      const screen = render(html`<forge-meter value="1" low="0.2" high="0.8" optimum="0.5"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(suboptimum-value)')).toBe(true);
    });

    it('should be least optimal when optimum is greater than high and value is less than low', async () => {
      const screen = render(html`<forge-meter value="0" low="0.5" high="0.8" optimum="1"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(least-optimum-value)')).toBe(true);
    });

    it('should be least optimal when optimum is less than low and value is greater than high', async () => {
      const screen = render(html`<forge-meter value="1" low="0.5" high="0.8" optimum="0"></forge-meter>`);
      const el = screen.container.querySelector('forge-meter') as MeterComponent;
      await el.updateComplete;
      expect(el.matches(':state(least-optimum-value)')).toBe(true);
    });
  });

  it('should detect when label or value is slotted', async () => {
    const screen = render(html`<forge-meter></forge-meter>`);
    const el = screen.container.querySelector('forge-meter') as MeterComponent;
    const label = document.createElement('span');
    label.textContent = 'Test';
    el.appendChild(label);

    await el.updateComplete;
    await frame();
    expect(el.shadowRoot?.querySelector('.heading.not-empty')).not.toBeNull();

    el.removeChild(label);
    const value = document.createElement('span');
    value.slot = 'value';
    value.textContent = '0';
    el.appendChild(value);

    await el.updateComplete;
    await frame();
    expect(el.shadowRoot?.querySelector('.heading.not-empty')).not.toBeNull();
  });

  it('should correctly set vertical state', async () => {
    const screen = render(html`<forge-meter></forge-meter>`);
    const el = screen.container.querySelector('forge-meter') as MeterComponent;
    expect(el.matches(':state(vertical)')).toBe(false);

    el.direction = 'vertical';
    await el.updateComplete;
    expect(el.matches(':state(vertical)')).toBe(true);
  });
});

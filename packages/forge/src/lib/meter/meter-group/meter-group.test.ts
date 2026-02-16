import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { MeterGroupComponent } from './meter-group.js';
import { frame } from '../../core/utils/utils.js';

import './meter-group.js';
import '../meter/meter.js';

describe('Meter Group', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-meter-group></forge-meter-group>`);
    const el = screen.container.querySelector('forge-meter-group') as MeterGroupComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-meter-group><forge-meter aria-label="Test"></forge-meter></forge-meter-group>`);
    const el = screen.container.querySelector('forge-meter-group') as MeterGroupComponent;

    await expect(el).toBeAccessible();
  });

  it('should recieve label', async () => {
    const screen = render(html`
      <label>
        <span>Test</span>
        <forge-meter-group></forge-meter-group>
      </label>
    `);
    const label = screen.container.querySelector('label') as HTMLLabelElement;
    const meter = label.querySelector('forge-meter-group') as MeterGroupComponent;

    expect(meter?.labels[0]).toBe(label);
  });

  it('should attach to form', async () => {
    const screen = render(html`<forge-meter-group></forge-meter-group>`);
    const el = screen.container.querySelector('forge-meter-group') as MeterGroupComponent;
    const form = document.createElement('form');
    form.appendChild(el);
    expect(el.form).toBe(form);
  });

  it('should sync properties with child meters', async () => {
    const screen = render(html`
      <forge-meter-group>
        <forge-meter></forge-meter>
      </forge-meter-group>
    `);
    const el = screen.container.querySelector('forge-meter-group') as MeterGroupComponent;
    const meter = el.querySelector('forge-meter')!;
    el.direction = 'vertical';
    el.min = 0.1;
    el.max = 0.9;
    await meter.updateComplete;

    expect(meter.direction).toBe('vertical');
    expect(meter.min).toBe(0.1);
    expect(meter.max).toBe(0.9);
  });

  it('should detect when label or value is slotted', async () => {
    const screen = render(html`<forge-meter-group></forge-meter-group>`);
    const el = screen.container.querySelector('forge-meter-group') as MeterGroupComponent;
    const label = document.createElement('span');
    label.slot = 'label';
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
    const screen = render(html`<forge-meter-group></forge-meter-group>`);
    const el = screen.container.querySelector('forge-meter-group') as MeterGroupComponent;
    expect(el.matches(':state(vertical)')).toBe(false);

    el.direction = 'vertical';
    await el.updateComplete;
    expect(el.matches(':state(vertical)')).toBe(true);
  });
});

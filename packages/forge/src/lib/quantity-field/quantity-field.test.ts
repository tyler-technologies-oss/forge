import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IIconButtonComponent } from '../icon-button/index.js';
import type { ITextFieldComponent } from '../text-field/index.js';
import type { IQuantityFieldComponent } from './quantity-field.js';

import './quantity-field.js';

describe('Quantity Field', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
    expect(harness.element.shadowRoot?.childNodes.length).toBeGreaterThan(0);
  });

  it('should have expected default state', async () => {
    const harness = await createFixture();

    expect(harness.element.required).toBe(false);
    expect(harness.element.invalid).toBe(false);
    expect(harness.element.matches(':state(required)')).toBe(false);
    expect(harness.element.matches(':state(invalid)')).toBe(false);
    expect(harness.element.decrementLabel).toBe('Decrement');
    expect(harness.element.incrementLabel).toBe('Increment');
  });

  it('should increment the input value', async () => {
    const harness = await createFixture();
    const startValue = harness.inputElement.valueAsNumber;

    await userEvent.click(harness.incrementButton);

    expect(harness.inputElement.valueAsNumber).toBe(startValue + 1);
  });

  it('should decrement the input value', async () => {
    const harness = await createFixture();
    const startValue = harness.inputElement.valueAsNumber;

    await userEvent.click(harness.decrementButton);

    expect(harness.inputElement.valueAsNumber).toBe(startValue - 1);
  });

  it('should not decrement below the minimum value', async () => {
    const harness = await createFixture({ min: 1 });
    const startValue = harness.inputElement.valueAsNumber;

    await userEvent.click(harness.decrementButton);

    expect(harness.inputElement.valueAsNumber).toBe(startValue);
  });

  it('should not increment above the maximum value', async () => {
    const harness = await createFixture({ max: 1 });
    const startValue = harness.inputElement.valueAsNumber;

    await userEvent.click(harness.incrementButton);

    expect(harness.inputElement.valueAsNumber).toBe(startValue);
  });

  it('should set required', async () => {
    const harness = await createFixture({ required: true });

    expect(harness.element.required).toBe(true);
    expect(harness.element.matches(':state(required)')).toBe(true);
    expect(harness.textFieldElement.required).toBe(true);
  });

  it('should set invalid', async () => {
    const harness = await createFixture({ invalid: true });

    expect(harness.element.invalid).toBe(true);
    expect(harness.element.matches(':state(invalid)')).toBe(true);
    expect(harness.textFieldElement.invalid).toBe(true);
  });

  it('should set decrement label', async () => {
    const harness = await createFixture({ decrementLabel: 'Custom Decrement Label' });

    expect(harness.decrementButton.getAttribute('aria-label')).toBe('Custom Decrement Label');
  });

  it('should set increment label', async () => {
    const harness = await createFixture({ incrementLabel: 'Custom Increment Label' });

    expect(harness.incrementButton.getAttribute('aria-label')).toBe('Custom Increment Label');
  });

  it('should dispatch input and change event on decrement', async () => {
    const harness = await createFixture();
    const inputSpy = vi.fn();
    const changeSpy = vi.fn();

    harness.inputElement.addEventListener('input', inputSpy);
    harness.inputElement.addEventListener('change', changeSpy);

    await userEvent.click(harness.decrementButton);

    expect(inputSpy).toHaveBeenCalledOnce();
    expect(changeSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch input and change event on increment', async () => {
    const harness = await createFixture();
    const inputSpy = vi.fn();
    const changeSpy = vi.fn();

    harness.inputElement.addEventListener('input', inputSpy);
    harness.inputElement.addEventListener('change', changeSpy);

    await userEvent.click(harness.incrementButton);

    expect(inputSpy).toHaveBeenCalledOnce();
    expect(changeSpy).toHaveBeenCalledOnce();
  });
});

class QuantityFieldHarness extends TestHarness<IQuantityFieldComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get inputElement(): HTMLInputElement {
    return this.element.querySelector('input') as HTMLInputElement;
  }

  public get textFieldElement(): ITextFieldComponent {
    return getShadowElement(this.element, 'forge-text-field') as ITextFieldComponent;
  }

  public get decrementButton(): IIconButtonComponent {
    return getShadowElement(this.element, 'slot[name="decrement-button"] > forge-icon-button') as IIconButtonComponent;
  }

  public get incrementButton(): IIconButtonComponent {
    return getShadowElement(this.element, 'slot[name="increment-button"] > forge-icon-button') as IIconButtonComponent;
  }
}

interface QuantityFieldFixtureConfig {
  required?: boolean;
  invalid?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  decrementLabel?: string;
  incrementLabel?: string;
}

async function createFixture({
  required,
  invalid,
  min,
  max,
  value = 1,
  step = 1,
  decrementLabel,
  incrementLabel
}: QuantityFieldFixtureConfig = {}): Promise<QuantityFieldHarness> {
  const screen = render(html`
    <forge-quantity-field ?required=${required} ?invalid=${invalid} decrement-label=${ifDefined(decrementLabel)} increment-label=${ifDefined(incrementLabel)}>
      <label slot="label">Quantity</label>
      <input type="number" value=${ifDefined(value)} step=${ifDefined(step)} min=${ifDefined(min)} max=${ifDefined(max)} />
    </forge-quantity-field>
  `);
  const el = screen.container.querySelector('forge-quantity-field') as IQuantityFieldComponent;
  await el.updateComplete;

  return new QuantityFieldHarness(el);
}

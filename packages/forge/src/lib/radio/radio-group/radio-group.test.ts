import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { TestHarness } from '../../core/testing/test-harness.js';
import { LABEL_CONSTANTS } from '../../label/index.js';
import { type IRadioComponent, RADIO_CONSTANTS } from '../radio/index.js';
import type { IRadioGroupComponent } from './radio-group.js';
import { RADIO_GROUP_CONSTANTS } from './radio-group-constants.js';
import { frame, task } from '../../core/utils/utils.js';

import './radio-group.js';
import '../radio/radio.js';
import '../../label/label.js';

class RadioGroupHarness extends TestHarness<HTMLElement> {
  public radioElements: IRadioComponent[];

  constructor(el: HTMLElement) {
    super(el);
  }

  public initElementRefs(): void {
    this.radioElements = Array.from(this.element.querySelectorAll(RADIO_CONSTANTS.elementName));
  }
}

describe('Radio group', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-radio-group></forge-radio-group>`);
    const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-radio-group></forge-radio-group>`);
    const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
    await expect(el).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const screen = render(html`<forge-radio-group></forge-radio-group>`);
    const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
    expect(el.disabled).toBe(false);
  });

  describe('attributes', () => {
    it('should set disabled', async () => {
      const screen = render(html`<forge-radio-group disabled></forge-radio-group>`);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      expect(el.disabled).toBe(true);

      el.removeAttribute('disabled');
      expect(el.disabled).toBe(false);
    });
  });

  describe('form association', () => {
    it('should form associate', async () => {
      const screen = render(html`<form></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const radioGroup = document.createElement(RADIO_GROUP_CONSTANTS.elementName);

      form.appendChild(radioGroup);

      expect(radioGroup.form).toBe(form);
    });

    it('should accept a label', async () => {
      const screen = render(html`<label>Label</label>`);
      const label = screen.container.querySelector('label') as HTMLLabelElement;
      const radioGroup = document.createElement(RADIO_GROUP_CONSTANTS.elementName);

      label.appendChild(radioGroup);

      expect(radioGroup.labels.length).toBe(1);
      expect(radioGroup.labels[0]).toBe(label);
    });

    it('should accept a name', async () => {
      const screen = render(html`<forge-radio-group name="test"></forge-radio-group>`);
      const radioGroup = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      expect(radioGroup.name).toBe('test');

      radioGroup.name = 'new-test';
      expect(radioGroup.name).toBe('new-test');

      radioGroup.removeAttribute('name');
      expect(radioGroup.name).toBe('');
    });
  });

  describe('label aware', () => {
    it('should connect to nested forge label', async () => {
      const screen = render(html`<forge-radio-group></forge-radio-group>`);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;

      const label = document.createElement('forge-label');
      label.legend = true;
      label.textContent = 'Label';
      el.appendChild(label);

      await task();

      expect(el.ariaLabel).toBe('Label');
    });

    it('should stop forge label connected event from propagating', async () => {
      const screen = render(html`<div><forge-radio-group></forge-radio-group></div>`);
      const el = screen.container.querySelector('div') as HTMLElement;
      const radioGroupEl = el.querySelector(RADIO_GROUP_CONSTANTS.elementName) as IRadioGroupComponent;
      const connectedSpy = vi.fn();

      el.addEventListener(LABEL_CONSTANTS.events.CONNECTED, connectedSpy);

      const label = document.createElement('forge-label');
      label.legend = true;
      label.innerText = 'Label';
      radioGroupEl.appendChild(label);

      await frame();

      expect(connectedSpy).not.toHaveBeenCalled();
    });

    it('should accept forge label change', async () => {
      const screen = render(html`<forge-radio-group></forge-radio-group>`);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      el.labelChangedCallback?.('Test label');
      expect(el.ariaLabel).toBe('Test label');

      el.labelChangedCallback?.(null);
      expect(el.ariaLabel).toBeNull();
    });
  });

  describe('radio', () => {
    it('should disable descendant radios', async () => {
      const screen = render(html`
        <forge-radio-group disabled>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      const ctx = new RadioGroupHarness(el);

      ctx.radioElements.forEach(radio => {
        expect(radio.disabled).toBe(true);
      });
    });

    it('should enable descendant radios', async () => {
      const screen = render(html`
        <forge-radio-group disabled>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      const ctx = new RadioGroupHarness(el);

      el.disabled = false;

      ctx.radioElements.forEach(radio => {
        expect(radio.disabled).toBe(false);
      });
    });

    it('should prevent descendant radios from enabling when disabled', async () => {
      const screen = render(html`
        <forge-radio-group disabled>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      const ctx = new RadioGroupHarness(el);

      ctx.radioElements.forEach(radio => {
        radio.disabled = false;
        expect(radio.disabled).toBe(true);
      });
    });

    it('should not prevent descendant radios from disabling when enabled', async () => {
      const screen = render(html`
        <forge-radio-group>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;
      const ctx = new RadioGroupHarness(el);

      ctx.radioElements.forEach(radio => {
        radio.disabled = true;
        expect(radio.disabled).toBe(true);
      });
    });

    it('should set required when a descendant radio is required', async () => {
      const screen = render(html`
        <forge-radio-group>
          <forge-radio required>One</forge-radio>
          <forge-radio>Two</forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;

      expect(el.ariaRequired).toBe('true');
      await expect(el).toBeAccessible();
    });

    it('should not set required when no descendant radios are required', async () => {
      const screen = render(html`
        <forge-radio-group>
          <forge-radio>One</forge-radio>
          <forge-radio>Two</forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;

      expect(el.ariaRequired).toBeNull();
      await expect(el).toBeAccessible();
    });

    it('should set required to false when a change to descendant radios results in none being required', async () => {
      const screen = render(html`
        <forge-radio-group>
          <forge-radio required>One</forge-radio>
          <forge-radio>Two</forge-radio>
        </forge-radio-group>
      `);
      const el = screen.container.querySelector('forge-radio-group') as IRadioGroupComponent;

      const radio = el.querySelector(RADIO_CONSTANTS.elementName) as IRadioComponent;
      radio.required = false;

      expect(el.ariaRequired).toBe('false');
      await expect(el).toBeAccessible();
    });
  });
});

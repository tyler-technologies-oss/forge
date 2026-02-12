import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { frame } from '../core/utils/utils.js';
import { TestHarness } from '../core/testing/test-harness.js';
import type { ITextFieldComponent } from './text-field.js';
import { TEXT_FIELD_CONSTANTS } from './text-field-constants.js';
import type { IFieldComponent } from '../field/index.js';
import { FIELD_CONSTANTS } from '../field/field-constants.js';
import type { IIconButtonComponent } from '../icon-button/index.js';
import { ICON_BUTTON_CONSTANTS } from '../icon-button/icon-button-constants.js';
import { LABEL_CONSTANTS } from '../label/label-constants.js';

import './text-field.js';

class TextFieldHarness extends TestHarness<ITextFieldComponent> {
  public fieldElement: IFieldComponent;

  public get inputElement(): HTMLInputElement {
    return this.element.querySelector('input')!;
  }

  public get labelElement(): HTMLLabelElement {
    return this.element.querySelector('label')!;
  }

  public get clearButtonElement(): IIconButtonComponent | null {
    return getShadowElement(this.element, ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
  }

  constructor(el: ITextFieldComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.fieldElement = getShadowElement(this.element, FIELD_CONSTANTS.elementName) as IFieldComponent;
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    await userEvent.click(el);
  }
}

interface TextFieldFixtureConfig {
  type?: string;
  showClear?: boolean;
}

async function createFixture({ type = 'text', showClear }: TextFieldFixtureConfig = {}): Promise<TextFieldHarness> {
  const screen = render(html`
    <forge-text-field .showClear=${!!showClear}>
      <label slot="label" for="input">Label</label>
      <input id="input" .type=${type} />
    </forge-text-field>
  `);
  const el = screen.container.querySelector('forge-text-field') as ITextFieldComponent;
  return new TextFieldHarness(el);
}

async function createEmptyFixture(): Promise<TextFieldHarness> {
  const screen = render(html`<forge-text-field></forge-text-field>`);
  const el = screen.container.querySelector('forge-text-field') as ITextFieldComponent;
  return new TextFieldHarness(el);
}

describe('Text field', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();
    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const harness = await createFixture();
    await expect(harness.element).toBeAccessible();
  });

  describe('properties', () => {
    it('should set show-clear attribute', async () => {
      const harness = await createFixture({ showClear: true });
      expect(harness.element.hasAttribute('show-clear')).toBe(true);
    });

    it('should set showClear property from attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute('show-clear', '');
      expect(harness.element.showClear).toBe(true);
    });

    it('should set disabled attribute', async () => {
      const harness = await createFixture();
      harness.element.disabled = true;
      expect(harness.element.hasAttribute('disabled')).toBe(true);
    });

    it('should set disabled property from attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute('disabled', '');
      expect(harness.element.disabled).toBe(true);
    });

    it('should set label-position attribute', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'block-start';
      expect(harness.element.getAttribute('label-position')).toBe('block-start');
    });

    it('should set labelPosition property from attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute('label-position', 'block-start');
      expect(harness.element.labelPosition).toBe('block-start');
    });

    it('should disable input when disabled is true', async () => {
      const harness = await createFixture();
      harness.element.disabled = true;
      expect(harness.inputElement.disabled).toBe(true);
    });

    it('should enable input when disabled is false', async () => {
      const harness = await createFixture();
      harness.inputElement.disabled = true;
      await frame();
      harness.element.disabled = false;
      expect(harness.inputElement.disabled).toBe(false);
    });

    it('should enable text field when input is not disabled', async () => {
      const harness = await createFixture();
      harness.element.disabled = true;
      harness.inputElement.disabled = false;
      await frame();
      expect(harness.element.disabled).toBe(false);
    });

    it('should disable text field when input is disabled', async () => {
      const harness = await createFixture();
      harness.inputElement.disabled = true;
      await frame();
      expect(harness.element.disabled).toBe(true);
    });

    it('should set aria-invalid attribute on input when invalid is true', async () => {
      const harness = await createFixture();
      harness.element.invalid = true;
      expect(harness.inputElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should remove aria-invalid attribute from input when invalid is false', async () => {
      const harness = await createFixture();

      harness.element.invalid = true;
      expect(harness.inputElement.getAttribute('aria-invalid')).toBe('true');

      harness.element.invalid = false;
      expect(harness.inputElement.hasAttribute('aria-invalid')).toBe(false);
    });
  });

  describe('clear button', () => {
    it('should not render clear button by default', async () => {
      const harness = await createFixture();
      expect(harness.clearButtonElement).toBeNull();
    });

    it('should not render clear button when showClear is true but input is empty', async () => {
      const harness = await createFixture({ showClear: true });
      expect(harness.clearButtonElement).toBeNull();
    });

    it('should render clear button when showClear is true and input is not empty', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      expect(harness.clearButtonElement).not.toBeNull();
    });

    it('should not render clear button when disabled', async () => {
      const harness = await createFixture({ showClear: true });
      harness.element.disabled = true;
      harness.inputElement.value = 'test';
      await frame();
      expect(harness.clearButtonElement).toBeNull();
    });

    it('should clear input and dispatch an input event when clear button is clicked', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      const eventSpy = vi.fn();
      harness.inputElement.addEventListener('input', eventSpy);
      harness.clearButtonElement!.click();
      await frame();
      expect(harness.inputElement.value).toBe('');
      expect(eventSpy).toHaveBeenCalled();
    });

    it('should emit event when clear button is pressed', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      const eventSpy = vi.fn();
      harness.element.addEventListener(TEXT_FIELD_CONSTANTS.events.CLEAR, eventSpy);
      harness.clearButtonElement!.click();
      await frame();
      expect(eventSpy).toHaveBeenCalled();
    });

    it('should not clear text field when clear button is clicked and event is canceled', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      harness.element.addEventListener(TEXT_FIELD_CONSTANTS.events.CLEAR, evt => evt.preventDefault());
      harness.clearButtonElement!.click();
      await frame();
      expect(harness.inputElement.value).toBe('test');
    });
  });

  describe('label', () => {
    it('should connect slotted label to input', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      input.id = 'input';
      harness.element.append(input);
      harness.element.append(label);
      await frame();
      expect(label.htmlFor).toBe(input.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should add id to input if no id is present', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      harness.element.append(input);
      harness.element.append(label);
      await frame();
      const id = input.id;
      expect(id).not.toBeUndefined();
      expect(label.htmlFor).toBe(id);
      await expect(harness.element).toBeAccessible();
    });

    it('should connect slotted forge label to input', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      harness.element.append(input);
      harness.element.append(label);
      await frame();
      expect(label.forElement).toBe(harness.element);
      expect(input.ariaLabel).toBe(label.textContent);
      await expect(harness.element).toBeAccessible();
    });

    it('should update input label when forge label text changes', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      label.dynamic = true;
      harness.element.append(input);
      harness.element.append(label);
      await frame();
      label.textContent = 'New label';
      await frame();
      expect(input.ariaLabel).toBe(label.textContent);
    });

    it('should focus text field when forge label is clicked', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      harness.element.append(input);
      harness.element.append(label);

      const focusSpy = vi.spyOn(harness.inputElement, 'focus');
      await frame();
      label.click();
      await frame();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('floating label', () => {
    it('should float label when input has value', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.inputElement.value = 'test';
      await frame();
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should float label when input has placeholder', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.inputElement.placeholder = 'test';
      await frame();
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should float label when input type number has non-numeric characters', async () => {
      const harness = await createFixture({ type: 'number' });
      harness.element.labelPosition = 'inset';
      harness.inputElement.focus();
      await userEvent.keyboard('e');
      await frame();
      expect(harness.inputElement.value).toBe('');
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should not float label when input has no value or placeholder', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      expect(harness.fieldElement.floatLabel).toBe(false);
    });

    it('should always float label when floatLabel is true', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = true;
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should float label when input has value and floatLabel is false', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = false;
      harness.inputElement.value = 'test';
      expect(harness.fieldElement.floatLabel).toBe(true);
    });
  });
});

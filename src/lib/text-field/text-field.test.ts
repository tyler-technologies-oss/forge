import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { sendMouse } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { ITextFieldComponent, TEXT_FIELD_CONSTANTS } from '.';
import { TestHarness } from '../../test/utils/test-harness';
import { FIELD_CONSTANTS, IFieldComponent } from '../field';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../icon-button';
import { LABEL_CONSTANTS } from '../label';

import './text-field';

describe('Text field', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();
    expect(harness.element.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const harness = await createFixture();
    await expect(harness.element).to.be.accessible();
  });

  describe('properties', () => {
    it('should set show-clear attribute', async () => {
      const harness = await createFixture({ showClear: true });
      expect(harness.element.hasAttribute('show-clear')).to.be.true;
    });

    it('should set showClear property from attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute('show-clear', '');
      expect(harness.element.showClear).to.be.true;
    });

    it('should set disabled attribute', async () => {
      const harness = await createFixture();
      harness.element.disabled = true;
      expect(harness.element.hasAttribute('disabled')).to.be.true;
    });

    it('should set disabled property from attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute('disabled', '');
      expect(harness.element.disabled).to.be.true;
    });

    it('should set label-position attribute', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'block-start';
      expect(harness.element.getAttribute('label-position')).to.equal('block-start');
    });

    it('should set labelPosition property from attribute', async () => {
      const harness = await createFixture();
      harness.element.setAttribute('label-position', 'block-start');
      expect(harness.element.labelPosition).to.equal('block-start');
    });

    it('should disable input when disabled is true', async () => {
      const harness = await createFixture();
      harness.element.disabled = true;
      expect(harness.inputElement.disabled).to.be.true;
    });

    it('should enable input when disabled is false', async () => {
      const harness = await createFixture();
      harness.inputElement.disabled = true;
      await tick();
      harness.element.disabled = false;
      expect(harness.inputElement.disabled).to.be.false;
    });

    it('should enable text field when input is not disabled', async () => {
      const harness = await createFixture();
      harness.element.disabled = true;
      harness.inputElement.disabled = false;
      await tick();
      expect(harness.element.disabled).to.be.false;
    });

    it('should disable text field when input is disabled', async () => {
      const harness = await createFixture();
      harness.inputElement.disabled = true;
      await tick();
      expect(harness.element.disabled).to.be.true;
    });
  });

  describe('clear button', () => {
    it('should not render clear button by default', async () => {
      const harness = await createFixture();
      expect(harness.clearButtonElement).to.be.null;
    });

    it('should not render clear button when showClear is true but input is empty', async () => {
      const harness = await createFixture({ showClear: true });
      expect(harness.clearButtonElement).to.be.null;
    });

    it('should render clear button when showClear is true and input is not empty', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      expect(harness.clearButtonElement).to.not.be.null;
    });

    it('should not render clear button when disabled', async () => {
      const harness = await createFixture({ showClear: true });
      harness.element.disabled = true;
      harness.inputElement.value = 'test';
      await tick();
      expect(harness.clearButtonElement).to.be.null;
    });

    it('should clear input when clear button is clicked', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      harness.clearButtonElement!.click();
      await tick();
      expect(harness.inputElement.value).to.equal('');
    });

    it('should emit event when clear button is pressed', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      const eventSpy = spy();
      harness.element.addEventListener(TEXT_FIELD_CONSTANTS.events.CLEAR, eventSpy);
      harness.clearButtonElement!.click();
      await tick();
      expect(eventSpy).to.have.been.called;
    });

    it('should not clear text field when clear button is clicked and event is canceled', async () => {
      const harness = await createFixture({ showClear: true });
      harness.inputElement.value = 'test';
      harness.element.addEventListener(TEXT_FIELD_CONSTANTS.events.CLEAR, (evt) => evt.preventDefault());
      harness.clearButtonElement!.click();
      await tick();
      expect(harness.inputElement.value).to.equal('test');
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
      await tick();
      expect(label.htmlFor).to.equal(input.id);
      await expect(harness.element).to.be.accessible();
    });

    it('should add id to input if no id is present', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      harness.element.append(input);
      harness.element.append(label);
      await tick();
      const id = input.id;
      expect(id).to.not.be.undefined;
      expect(label.htmlFor).to.equal(id);
      await expect(harness.element).to.be.accessible();
    });

    it('should connect slotted forge label to input', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      harness.element.append(input);
      harness.element.append(label);
      await tick();
      expect(label.forElement).to.equal(harness.element);
      expect(input.ariaLabel).to.equal(label.textContent);
      await expect(harness.element).to.be.accessible();
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
      await tick();
      label.textContent = 'New label';
      await tick();
      expect(input.ariaLabel).to.equal(label.textContent);
    });

    it('should focus text field when forge label is clicked', async () => {
      const harness = await createEmptyFixture();
      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      harness.element.append(input);
      harness.element.append(label);

      const focusSpy = spy(harness.inputElement, 'focus');
      await tick();
      label.click();
      await tick();
      expect(focusSpy).to.have.been.called;
    });
  });

  describe('floating label', () => {
    it('should float label when input has value', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.inputElement.value = 'test';
      await tick();
      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should float label when input has placeholder', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.inputElement.placeholder = 'test';
      await tick();
      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should not float label when input has no value or placeholder', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      expect(harness.fieldElement.floatLabel).to.be.false;
    });

    it('should always float label when floatLabel is true', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = true;
      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should float label when input has value and floatLabel is false', async () => {
      const harness = await createFixture();
      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = false;
      harness.inputElement.value = 'test';
      expect(harness.fieldElement.floatLabel).to.be.true;
    });
  });
});

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
    const { x, y, width, height} = el.getBoundingClientRect();

    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2)
    ]});
  }
}

interface TextFieldFixtureConfig {
  showClear?: boolean;
}

async function createFixture({ showClear }: TextFieldFixtureConfig = {}): Promise<TextFieldHarness> {
  const el = await fixture<ITextFieldComponent>(html`
    <forge-text-field
      .showClear=${showClear}
    >
      <label slot="label" for="input">Label</label>
      <input id="input" type="text" />
    </forge-text-field>
  `);
  return new TextFieldHarness(el);
}

async function createEmptyFixture(): Promise<TextFieldHarness> {
  const el = await fixture<ITextFieldComponent>(html`<forge-text-field></forge-text-field>`);
  return new TextFieldHarness(el);
}

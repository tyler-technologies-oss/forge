import { removeElement } from '@tylertech/forge-core';
import {
  QUANTITY_FIELD_CONSTANTS,
  IQuantityFieldComponent,
  defineQuantityFieldComponent,
  QuantityFieldComponent
} from '@tylertech/forge/quantity-field';
import { tick } from '@tylertech/forge-testing';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent, ITextFieldComponent, TEXT_FIELD_CONSTANTS } from '@tylertech/forge';

interface ITestContext {
  context: ITestQuantityFieldContext
}

interface ITestQuantityFieldContext {
  component: IQuantityFieldComponent;
  getNativeInput(): HTMLInputElement;
  getNativeDecrementButton(): HTMLButtonElement;
  getNativeIncrementButton(): HTMLButtonElement;
  requiredAsteriskIsDisplayed(): boolean;
  invalidStyleIsDisplayedOnLabel(): boolean;
  invalidStyleIsDisplayedOnHelperText(): boolean;
  destroy(): void;
}

describe('QuantityFieldComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineQuantityFieldComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('With unslotted component', function(this: ITestContext) {
    it('should not error while no elements are present', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      await tick();
      expect(this.context.component.isConnected).toBeTrue();
    });

    it('it should allow controls to work when slots are added after instantiation', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      const input = document.createElement('input');
      input.setAttribute('type', 'number');
      input.value = '0';

      const decrementButton = document.createElement('button');
      decrementButton.setAttribute('slot', QUANTITY_FIELD_CONSTANTS.slots.DECREMENT_BUTTON);
      decrementButton.setAttribute('type', 'button');

      const incrementButton = document.createElement('button');
      incrementButton.setAttribute('slot', QUANTITY_FIELD_CONSTANTS.slots.INCREMENT_BUTTON);
      incrementButton.setAttribute('type', 'button');

      this.context.component.appendChild(input);
      this.context.component.appendChild(decrementButton);
      this.context.component.appendChild(incrementButton);

      await tick();
      incrementButton.click();
      await tick();
      expect(input.value).toBe('1');
      await tick();
      decrementButton.click();
      await tick();
      decrementButton.click();
      await tick();
      expect(input.value).toBe('-1');
    });
  });

  describe('With complete/slotted component', function(this: ITestContext) {
    describe('Instantiation', function(this: ITestContext) {
      it('should be connected', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.isConnected).toBe(true);
      });

      it('should instantiate component with shadow dom', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.shadowRoot).toBeDefined();
      });

      it('should instantiate component as QuantityFieldComponent', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component instanceof QuantityFieldComponent).toBe(true);
      });

    });

    describe('API (Properties) - required', function(this: ITestContext) {
      it('should not display the required asterisk on the label when required property is set to false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.required = true;
        await tick();
        this.context.component.required = false;
        expect(!this.context.component.required).toBe(true, 'required property should be false');
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED)).toBe(false, 'required attribute should not be present');
        expect(this.context.requiredAsteriskIsDisplayed()).toBe(false, 'required asterisk should not be visible');
      });

      it('should display the required asterisk on the label when required property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.required = false;
        await tick();
        this.context.component.required = true;
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true, 'required attribute should be present');
        expect(this.context.component.required).toBe(true, 'required property should be true');
        expect(this.context.requiredAsteriskIsDisplayed()).toBe(true, 'required asterisk should be visible');
      });
    });

    describe('API (Attributes) - required', function(this: ITestContext) {
      it('should not display the required asterisk on the label when required attribute is not present', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED);
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED)).toBe(false, 'required attribute should not be present');
        expect(!this.context.component.required).toBe(true, 'required property should be false');
        expect(this.context.requiredAsteriskIsDisplayed()).toBe(false, 'required asterisk should not be visible');
      });

      it('should display the required asterisk on the label when required property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED);
        await tick();
        this.context.component.setAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED, '');
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true, 'required attribute should be present');
        expect(this.context.component.required).toBe(true, 'required property should be true');
        expect(this.context.requiredAsteriskIsDisplayed()).toBe(true, 'required asterisk should be visible');
      });
    });

    describe('API (Properties) - invalid', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid property is set to false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.invalid = true;
        await tick();
        this.context.component.invalid = false;
        expect(!this.context.component.invalid).toBe(true, 'invalid property should be false');
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID)).toBe(false, 'invalid attribute should not be present');
        expect(this.context.invalidStyleIsDisplayedOnLabel()).toBe(false, 'invalid style should not be present on label');
        expect(this.context.invalidStyleIsDisplayedOnHelperText()).toBe(false, 'invalid style should not be present on helper-text');
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.invalid = false;
        await tick();
        this.context.component.invalid = true;
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID)).toBe(true, 'invalid attribute should be present');
        expect(this.context.component.invalid).toBe(true, 'invalid property should be true');
        expect(this.context.invalidStyleIsDisplayedOnLabel()).toBe(true, 'invalid style should be present on label');
        expect(this.context.invalidStyleIsDisplayedOnHelperText()).toBe(true, 'invalid style should be present on helper-text');
      });
    });

    describe('API (attributes) - invalid', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid attribute is set to false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        this.context.component.removeAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID);
        expect(!this.context.component.invalid).toBe(true, 'invalid property should be false');
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID)).toBe(false, 'invalid attribute should not be present');
        expect(this.context.invalidStyleIsDisplayedOnLabel()).toBe(false, 'invalid style should not be present on label');
        expect(this.context.invalidStyleIsDisplayedOnHelperText()).toBe(false, 'invalid style should not be present on helper-text');
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        this.context.component.setAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID, '');
        expect(this.context.component.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.INVALID)).toBe(true, 'invalid attribute should be present');
        expect(this.context.component.invalid).toBe(true, 'invalid property should be true');
        expect(this.context.invalidStyleIsDisplayedOnLabel()).toBe(true, 'invalid style should be present on label');
        expect(this.context.invalidStyleIsDisplayedOnHelperText()).toBe(true, 'invalid style should be present on helper-text');
      });
    });

    describe('Disable quantity field', function(this: ITestContext) {
      it('should disable both buttons when the slotted input has a disabled attribute applied', async function(this: ITestContext) {
        this.context = setupTestContext();
        const input = this.context.getNativeInput();
        const decrementButton = this.context.getNativeDecrementButton();
        const incrementButton = this.context.getNativeIncrementButton();

        input.removeAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        await tick();
        let decrementButtonIsDisabled = decrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(decrementButtonIsDisabled).toBe(false, 'decrement button should not be disabled');
        let incrementButtonIsDisabled = incrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(incrementButtonIsDisabled).toBe(false, 'increment button should not be disabled');

        input.setAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED, '');
        await tick();
        decrementButtonIsDisabled = decrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(decrementButtonIsDisabled).toBe(true, 'decrement button should be disabled');
        incrementButtonIsDisabled = incrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(incrementButtonIsDisabled).toBe(true, 'increment button should be disabled');
      });

      it('should enable both buttons when the slotted input has its disabled attribute removed', async function(this: ITestContext) {
        this.context = setupTestContext();
        const input = this.context.getNativeInput();
        const decrementButton = this.context.getNativeDecrementButton();
        const incrementButton = this.context.getNativeIncrementButton();

        input.setAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED, '');
        await tick();
        let decrementButtonIsDisabled = decrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(decrementButtonIsDisabled).toBe(true, 'decrement button should be disabled');
        let incrementButtonIsDisabled = incrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(incrementButtonIsDisabled).toBe(true, 'increment button should be disabled');

        input.removeAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        await tick();
        decrementButtonIsDisabled = decrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(decrementButtonIsDisabled).toBe(false, 'decrement button should not be disabled');
        incrementButtonIsDisabled = incrementButton.hasAttribute(QUANTITY_FIELD_CONSTANTS.attributes.DISABLED);
        expect(incrementButtonIsDisabled).toBe(false, 'increment button should not be disabled');
      });
    });

    describe('Increment button', function(this: ITestContext) {
      it('should increment the input\'s value by the step attribute\'s value when the increment button is clicked', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        const input = this.context.getNativeInput();
        const incrementButton = this.context.getNativeIncrementButton();
        const inputStepValue = input.step;
        const beginningInputValue = input.value;
        incrementButton.click();
        await tick();
        const resultingInputValue = input.value;
        const difference = +resultingInputValue - +beginningInputValue;
        expect(difference).toBe(+inputStepValue, 'increment button should increment the input value by the step value');
      });

      it('should increment the input\'s value up to the input\'s max attribute value when the increment button is clicked', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        const input = this.context.getNativeInput();
        const incrementButton = this.context.getNativeIncrementButton();
        const inputMaxValue = input.max;
        const beginningInputValue = input.value;
        incrementButton.click();
        await tick();
        incrementButton.click();
        await tick();
        incrementButton.click();
        await tick();
        incrementButton.click();
        await tick();
        const resultingInputValue = input.value;
        const difference = +resultingInputValue - +beginningInputValue;
        expect(difference).toBe(+inputMaxValue, 'increment button should not increment the input value beyond the allowable max');
      });

      it('should increment by floating point', async function(this: ITestContext) {
        this.context = setupTestContext(true, 0.1, '1.1');
        
        await tick();
        const incrementButton = this.context.getNativeIncrementButton();
        incrementButton.click();

        const input = this.context.getNativeInput();
        expect(input.value).toBe('1.2', 'Expected to increment by 0.1');
      });

      it('should increment by floating point with matching precision', async function(this: ITestContext) {
        this.context = setupTestContext(true, 0.0001, '1.1');
        
        await tick();
        const incrementButton = this.context.getNativeIncrementButton();
        incrementButton.click();

        const input = this.context.getNativeInput();
        expect(input.value).toBe('1.1001', 'Expected to increment by 0.0001');
      });
    });

    describe('Decrement button', function(this: ITestContext) {
      it('should decrement the input\'s value by the step attribute\'s value when the decrement button is clicked', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        const input = this.context.getNativeInput();
        const decrementButton = this.context.getNativeDecrementButton();
        const inputStepValue = input.step;
        const beginningInputValue = input.value;
        decrementButton.click();
        await tick();
        const resultingInputValue = input.value;
        const difference = +resultingInputValue - +beginningInputValue;
        expect(difference).toBe(-(+inputStepValue), 'decrement button should decrement the input value by the step value');
      });

      it('should decrement the input\'s value down to the input\'s min attribute value when the decrement button is clicked', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        const input = this.context.getNativeInput();
        const decrementButton = this.context.getNativeDecrementButton();
        const inputMinValue = input.min;
        const beginningInputValue = input.value;
        await tick();
        decrementButton.click();
        await tick();
        decrementButton.click();
        await tick();
        decrementButton.click();
        await tick();
        decrementButton.click();
        await tick();
        const resultingInputValue = input.value;
        const difference = +resultingInputValue - +beginningInputValue;
        expect(difference).toBe(+inputMinValue, 'decrement button should not decrement the input value below the allowable min');
      });


      it('should decrement by floating point', async function(this: ITestContext) {
        this.context = setupTestContext(true, 0.1, '1.2');
        
        await tick();
        const decrementButton = this.context.getNativeDecrementButton();
        decrementButton.click();

        const input = this.context.getNativeInput();
        expect(input.value).toBe('1.1', 'Expected to decrement by 0.1');
      });

      it('should decrement by floating point with matching precision', async function(this: ITestContext) {
        this.context = setupTestContext(true, 0.0001, '1.2');
        
        await tick();
        const decrementButton = this.context.getNativeDecrementButton();
        decrementButton.click();

        const input = this.context.getNativeInput();
        expect(input.value).toBe('1.1999', 'Expected to decrement by 0.0001');
      });
    });
  });

  function setupTestContext(hasInput = true, step = 5, value = '0'): ITestQuantityFieldContext {
    const fixture = document.createElement('div');
    fixture.id = 'quantity-field-test-fixture';
    const component = document.createElement(QUANTITY_FIELD_CONSTANTS.elementName) as IQuantityFieldComponent;
    if (hasInput) {
      const labelElement = document.createElement('label') as HTMLLabelElement;
      labelElement.slot = 'label';
      labelElement.textContent = 'Test label';
      component.appendChild(labelElement);
      const decrementIconButton = document.createElement(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
      decrementIconButton.slot = 'decrement-button';
      const decrementButton = document.createElement('button') as HTMLButtonElement;
      decrementButton.type = 'button';
      decrementButton.classList.add('tyler-icons');
      decrementButton.textContent = 'remove_circle_outline';
      decrementIconButton.appendChild(decrementButton);
      component.appendChild(decrementIconButton);
      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      const inputElement = document.createElement('input') as HTMLInputElement;
      inputElement.type = 'number';
      inputElement.setAttribute('style', 'text-align: center; width: 64px');
      inputElement.step = step.toString();
      inputElement.value = value;
      inputElement.min = '-10';
      inputElement.max = '10';
      textField.appendChild(inputElement);
      component.appendChild(textField);
      const incrementIconButton = document.createElement(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
      incrementIconButton.slot = 'increment-button';
      const incrementButton = document.createElement('button') as HTMLButtonElement;
      incrementButton.type = 'button';
      incrementButton.classList.add('tyler-icons');
      incrementButton.textContent = 'control_point';
      incrementIconButton.appendChild(incrementButton);
      component.appendChild(incrementIconButton);
      const helperText = document.createElement('div');
      helperText.slot = 'helper-text';
      helperText.textContent = 'This is helpful text';
      component.appendChild(helperText);
    }
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      getNativeInput: () =>  component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.INPUT) as HTMLInputElement,
      getNativeDecrementButton: () => component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.DECREMENT_BUTTON) as HTMLButtonElement,    
      getNativeIncrementButton: () => component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.INCREMENT_BUTTON) as HTMLButtonElement,
      requiredAsteriskIsDisplayed: () => {
        const labelElement = component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
        const asteriskIsPresent = getComputedStyle(labelElement, ':after').getPropertyValue('content').includes('*');
        return asteriskIsPresent;
      },
      invalidStyleIsDisplayedOnLabel: (): boolean => {
        const labelElement = component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
        const invalidStyleIsPresent = getComputedStyle(labelElement).getPropertyValue('color').includes('rgb(176, 0, 32)');
        return invalidStyleIsPresent;
      },
      invalidStyleIsDisplayedOnHelperText: (): boolean => {
        const helperTextElement = component.querySelector(QUANTITY_FIELD_CONSTANTS.selectors.HELPER_TEXT) as HTMLLabelElement;
        const invalidStyleIsPresent = getComputedStyle(helperTextElement).getPropertyValue('color').includes('rgb(176, 0, 32)');
        return invalidStyleIsPresent;
      },
      destroy: () => removeElement(fixture)
    };
  }
});

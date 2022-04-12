import { getShadowElement, removeElement, getActiveElement } from '@tylertech/forge-core';
import {
  CHIP_FIELD_CONSTANTS,
  IChipFieldComponent,
  defineChipFieldComponent,
  ChipFieldComponent,
  IChipFieldFoundation,
  ChipFieldComponentDelegate,
  ChipFieldComponentDelegateProps,
  IChipFieldComponentDelegateOptions,
} from '@tylertech/forge/chip-field';
import { tick, timer } from '@tylertech/forge-testing';
import { ChipComponent, defineChipComponent, FLOATING_LABEL_CONSTANTS } from '@tylertech/forge';
import { expectFloatingLabelState, testFloatingLabelState } from '../../utils/text-field';
import { FIELD_CONSTANTS } from '@tylertech/forge/field/field-constants';

interface ITestContext {
  context: ITestChipFieldContext;
}

interface ITestChipFieldContext {
  delegate: ChipFieldComponentDelegate;
  component: IChipFieldComponent;
  root: HTMLElement;
  input: HTMLInputElement;
  label: HTMLLabelElement;
  foundation: IChipFieldFoundation;
  leadingIcon?: HTMLElement;
  trailingIcon?: HTMLElement;
  destroy(): void;
}

describe('ChipFieldComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineChipFieldComponent();
    defineChipComponent();
  });

  describe('Imperative creation', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should allow for interaction before initialization', function(this: ITestContext) {
      this.context = setupTestContext(false);
      const catchSpy = jasmine.createSpy('caught exception');

      try {
        this.context.component.density = 'dense';
        this.context.component.floatLabelType = 'always';
        this.context.component.shape = 'rounded';
        this.context.component.invalid = true;
        this.context.component.required = true;
        this.context.component.floatLabel(true);
      } catch {
        catchSpy();
      }
      
      expect(catchSpy).not.toHaveBeenCalled();
    });

    it('should not initialize until input element is added', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      // Remove the input and label elements from the text-field before adding to DOM
      this.context.component.removeChild(this.context.label as HTMLLabelElement);
      this.context.component.removeChild(this.context.input as HTMLInputElement);
      
      document.body.appendChild(this.context.component);
      await tick();
  
      // Make sure that the component doesn't initialize when added to DOM
      expect(this.context.foundation['_isInitialized']).toBe(false);
  
      // Add the input and label elements to the text-field component
      this.context.component.appendChild(this.context.input as HTMLInputElement);
      this.context.component.appendChild(this.context.label as HTMLLabelElement);
      await tick();
  
      // Now the component should initialize
      expect(this.context.foundation['_isInitialized']).toBe(true);
    });


    it('should float label if value is set before adding to DOM', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      this.context.input.value = 'text';
      document.body.appendChild(this.context.component);
      await tick();

      expectFloatingLabelState(this.context, true);
    });

    it('should float label if float label type is set to "always"', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.floatLabelType = 'always';
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.component.floatLabelType).toBe('always');
      expectFloatingLabelState(this.context, true);
    });

    it('should float label if float label type is changed to "always" after initial render', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      document.body.appendChild(this.context.component);
      await tick();
      this.context.component.floatLabelType = 'always';
      await tick();

      expectFloatingLabelState(this.context, true);
    });

    it('should float label always if placeholder is set', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      this.context.input.placeholder = 'placeholder text';
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.component.floatLabelType).toBe('always');
      expectFloatingLabelState(this.context, true);
    });

    it('should be disabled if set by default', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      this.context.input.disabled = true;
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.input.disabled).toBe(true);
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should be readonly if set by default', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      this.context.input.readOnly = true;
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.input.readOnly).toBe(true);
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBe(true);
    });

    it('should detect addon-end content when connecting', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      const element = document.createElement('div');
      element.textContent = 'end';
      element.slot = 'addon-end';
      this.context.component.appendChild(element);
      document.body.appendChild(this.context.component);

      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ADDON_END)).toBeTrue();
    });
  });

  describe('Basic functionality', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should not float label when no value is specified', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();

      expectFloatingLabelState(this.context, false);
    });

    it('should float label when value is set', async function(this: ITestContext) {
      this.context = setupTestContext();

      await tick();
      this.context.input.value = 'test';
      await tick();
      
      expectFloatingLabelState(this.context, true);
    });

    it('should float label when invoked programmatically', async function(this: ITestContext) {
      this.context = setupTestContext();

      await tick();
      this.context.component.floatLabel(true);
      await tick();

      expectFloatingLabelState(this.context, true);
    });

    it('should un-float label when invoked programmatically', async function(this: ITestContext) {
      this.context = setupTestContext();

      await tick();
      this.context.component.floatLabel(true);
      await tick();
      this.context.component.floatLabel(false);
      await tick();

      expectFloatingLabelState(this.context, false);
    });

    it('should float label when value is set by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.value = 'test';
      await tick();

      expectFloatingLabelState(this.context, true);
    });

    it('should float label when focused', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      this.context.input.dispatchEvent(new Event('focus'));
      await tick();

      expectFloatingLabelState(this.context, true);
    });

    it('should set proper state when focused', async function(this: ITestContext) {
      this.context = setupTestContext();

      await tick();
      this.context.input.dispatchEvent(new Event('focus'));
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.FOCUSED)).toBe(true);
      expect(this.context.input.classList.contains(FIELD_CONSTANTS.classes.INPUT_FOCUSED)).toBe(true);
    });

    it('should not float label when blurred', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();

      this.context.input.dispatchEvent(new Event('focus'));
      expectFloatingLabelState(this.context, true);

      this.context.input.dispatchEvent(new Event('blur'));
      expectFloatingLabelState(this.context, false);
    });

    it('should set dense via property', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'dense';

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should set dense via attribute', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'dense');

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should set roomy via property', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'roomy';

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBe(true);
    });

    it('should set roomy via attribute', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'roomy');

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBe(true);
    });

    it('should be disabled when the input is', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.disabled = true;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should not be disabled when the input is not', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.disabled = false;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should be readonly when the input is', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.readOnly = true;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBe(true);
    });

    it('should not be readonly when the input is not', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.readOnly = false;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBe(false);
    });

    it('should correctly remove disabled if removed from the DOM and re-added', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.disabled = true;
      await timer();
      this.context.component.remove();
      this.context.input.disabled = false;
      document.body.appendChild(this.context.component);

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should correctly remove readonly if removed from the DOM and re-added', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.readOnly = true;
      await timer();
      this.context.component.remove();
      this.context.input.readOnly = false;
      document.body.appendChild(this.context.component);

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBe(false);
    });

    it('should set invalid', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.invalid = true;
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBe(true);
    });

    it('should set invalid via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, 'true');
      await tick();

      expect(this.context.component.invalid).toBe(true);
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBe(true);
    });

    it('should set required', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.required = true;
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBe(true);
    });

    it('should set required via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.REQUIRED, 'true');
      await tick();

      expect(this.context.component.required).toBe(true);
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBe(true);
    });

    it('should toggle required attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.required = true;
      await tick();
      this.context.component.required = false;
      await tick();

      expect(this.context.component.required).toBe(false);
      expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBe(false);
    });

    it('should set shape to rounded', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.shape = 'rounded';
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.SHAPE_ROUNDED)).toBe(true);
    });

    it('should set rounded shape via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.SHAPE, 'rounded');
      await tick();

      expect(this.context.component.shape).toBe('rounded');
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.SHAPE_ROUNDED)).toBe(true);
    });

    it('should set density to dense', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'dense';
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should set density to dense via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'dense');
      await tick();

      expect(this.context.component.density).toBe('dense');
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should set density to roomy', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'roomy';
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBe(true);
    });

    it('should set density to roomy via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'roomy');
      await tick();

      expect(this.context.component.density).toBe('roomy');
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBe(true);
    });

    it('should un-float label if value is removed when input is not focused', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.value = 'test';
      await tick();
      expectFloatingLabelState(this.context, true);
      this.context.input.value = '';
      await tick();

      expectFloatingLabelState(this.context, false);
    });

    it('should set floating label state when input attribute value changes', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.setAttribute('value', 'test');
      await tick();

      expectFloatingLabelState(this.context, true);

      this.context.input.setAttribute('value', '');
      await tick();

      expectFloatingLabelState(this.context, false);
    });

    it('should not show addon-end content by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ADDON_END)).toBeFalse();
    });

    it('should detect addon-end content', async function(this: ITestContext) {
      this.context = setupTestContext();

      const element = document.createElement('div');
      element.textContent = 'end';
      element.slot = 'addon-end';
      this.context.component.appendChild(element);

      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ADDON_END)).toBeTrue();
    });

    it('should hide addon-on end content if element is removed', async function(this: ITestContext) {
      this.context = setupTestContext();

      const element = document.createElement('div');
      element.textContent = 'end';
      element.slot = 'addon-end';
      this.context.component.appendChild(element);

      await tick();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ADDON_END)).toBeTrue();

      this.context.component.removeChild(element);
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ADDON_END)).toBeFalse();
    });

    it('should set focus state when toggling input readonly attribute while focused', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      
      this.context.input.focus();
      await tick();

      this.context.input.setAttribute('readonly', '');
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.FOCUSED)).toBeTrue();
      expect(this.context.input.classList.contains(FIELD_CONSTANTS.classes.INPUT_FOCUSED)).toBeTrue();
      expect(this.context.label.classList.contains(FIELD_CONSTANTS.classes.LABEL_FOCUSED)).toBeTrue();
    });
  });

  describe('with icon', function(this: ITestContext) {
    beforeEach(function(this: ITestContext) {
      const leadingElement = document.createElement('i');
      const trailingElement = document.createElement('i');

      this.context = setupTestContext(true, {}, { leadingElement, trailingElement });
    });

    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should render leading icon class', async function(this: ITestContext) {
      await tick();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBe(true);
    });

    it('should render trailing icon class', async function(this: ITestContext) {
      await tick();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBe(true);
    });
  });

  describe('ChipFieldComponentDelegate', function(this: ITestContext) {
    describe('without being in DOM', function(this: ITestContext) {
      it('should create input without label with default configuration', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();
        
        expect(delegate.element.querySelector('input')).not.toBeNull();
        expect(delegate.element.querySelector('label')).toBeNull();
      });

      it('should have correct default configuration', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();
        expect(delegate.element.required).toBe(false);
        expect(delegate.element.invalid).toBe(false);
        expect(delegate.element.floatLabelType).toBe('auto');
      });

      it('should create label', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { label: 'Label' }});
        const label = delegate.element.querySelector('label') as HTMLLabelElement;

        expect(label).not.toBeNull();
        expect(label.innerText).toBe('Label');
      });

      it('should create helper text', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { helperText: 'Helper text' }});
        const span = delegate.element.querySelector('[slot="helper-text"]') as HTMLSpanElement;

        expect(span).not.toBeNull();
        expect(span.innerText).toBe('Helper text');
      });

      it('should not add helper text if set to null', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        delegate.setHelperText(null);

        const span = delegate.element.querySelector('[slot="helper-text"]') as HTMLSpanElement;
        expect(span).toBeNull();
      });

      it('should change label', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { label: 'Initial label' }});

        delegate.setLabel('New label');

        const label = delegate.element.querySelector('label') as HTMLLabelElement;
        expect(label.innerText).toBe('New label');
      });

      it('should remove label', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { label: 'Initial label' }});

        delegate.setLabel(null);

        const label = delegate.element.querySelector('label') as HTMLLabelElement;
        expect(label).toBeNull();
      });

      it('should create label after initialization', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        delegate.setLabel('Label text');

        const label = delegate.element.querySelector('label') as HTMLLabelElement;
        expect(label).not.toBeNull();
        expect(label.innerText).toBe('Label text');
      });

      it('should expose reference for input element', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        expect(delegate.element).not.toBeNull();
      });

      it('should expose reference for label element', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        expect(delegate.element).not.toBeNull();
      });

      it('should set disabled', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        delegate.disabled = true

        expect(delegate.inputElement.disabled).toBe(true);
      });

      it('should set disabled', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        delegate.disabled = true;
        delegate.disabled = false;

        expect(delegate.inputElement.disabled).toBe(false);
      });

      it('should set initial value', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { value: 'val' }});

        expect(delegate.inputElement.value).toBe('val');
        expect(delegate.value).toBe('val');
      });

      it('should change value', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { value: 'val' }});

        delegate.value = 'new val';

        expect(delegate.inputElement.value).toBe('new val');
        expect(delegate.value).toBe('new val');
      });

      it('should initialize required', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ props: { required: true }});

        expect(delegate.element.required).toBe(true);
      });

      it('should initialize invalid', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({props: { invalid: true }});

        expect(delegate.element.invalid).toBe(true);
      });

      it('should initialize float label type', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ props: { floatLabelType: 'always' }});

        expect(delegate.element.floatLabelType).toBe('always');
      });

      it('should initialize placeholder', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { placeholder: 'placeholder text' }});

        expect(delegate.inputElement.placeholder).toBe('placeholder text');
      });

      it('should pass validation after input value set', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ options: { value: 'val' }});

        expect(delegate.invalid).toBeFalse();
      });

      it('should set density', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({ props: { density: 'dense' }});

        expect(delegate.element.density).toBe('dense');
      });
    });
  });

  describe('in DOM', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should remove helper text element', async function(this: ITestContext) {
      this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
      
      await tick();
      this.context.delegate.setHelperText(null);
      await tick();

      const span = this.context.component.querySelector('[slot="helper-text"]') as HTMLSpanElement;
      expect(span).toBeNull();
    });

    it('should float label', async function(this: ITestContext) {
      this.context = setupTestContext(true, {}, { label: 'Test' });

      await tick();
      this.context.delegate.floatLabel(true);
      await tick();

      testFloatingLabelState(this.context.delegate.labelElement as HTMLLabelElement, true);
    });

    it('should un-float label', async function(this: ITestContext) {
      this.context = setupTestContext(true, {}, { label: 'Test' });

      await tick();
      this.context.delegate.floatLabel(true);
      await tick();
      this.context.delegate.floatLabel(false);
      await tick();

      testFloatingLabelState(this.context.delegate.labelElement as HTMLLabelElement, false);
    });

    it('should notify when input value changes', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      const listener = jasmine.createSpy('onChange listener');
      this.context.delegate.onChange(listener);

      document.body.appendChild(this.context.component);
      await tick();
      this.context.delegate.inputElement.value = 'a';
      this.context.delegate.inputElement.dispatchEvent(new Event('input'));

      expect(listener).toHaveBeenCalledWith('a');
    });

    it('should notify when input receives focus', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      const listener = jasmine.createSpy('onFocus listener');
      this.context.delegate.onFocus(listener);

      document.body.appendChild(this.context.delegate.element);
      await tick();
      this.context.delegate.inputElement.dispatchEvent(new Event('focus'));

      expect(listener).toHaveBeenCalled();
    });

    it('should notify when input loses focus', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      const listener = jasmine.createSpy('onBlur listener');
      this.context.delegate.onBlur(listener);

      document.body.appendChild(this.context.component);
      await tick();
      this.context.delegate.inputElement.dispatchEvent(new Event('blur'));
      
      expect(listener).toHaveBeenCalled();
    });
  });

  // afterEach(function(this: ITestContext) {
  //   this.context.destroy();
  // });

  describe('With unslotted component', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should not error while no elements are present', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      expect(this.context.component.isConnected).toBeTrue();
    });
  });

  describe('With complete/slotted component', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    describe('Instantiation', function(this: ITestContext) {
      it('should be connected', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.isConnected).toBe(true);
      });

      it('should instantiate component with shadow dom', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.shadowRoot).toBeDefined();
      });

      it('should instantiate component as ChipFieldComponent', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component instanceof ChipFieldComponent).toBe(true);
      });
    });

    describe('Adding new members', function(this: ITestContext) {
      it('should set all new members to have a tabindex of -1', function(this: ITestContext) {
        this.context = setupTestContext();
        const member = addMember(this.context.component, 'test1');
        expect(member.tabIndex === -1).toBe(true);
      });
    });

    describe('API (Properties) - required', function(this: ITestContext) {
      it('should not display the required asterisk on the label when required property is set to false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.required = true;
        await tick();
        this.context.component.required = false;
        expect(!this.context.component.required).toBe(true, 'required property should be false');
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBe(false, 'required attribute should not be present');
        expect(requiredAsteriskIsDisplayed(this.context.component)).toBe(false, 'required asterisk should not be visible');
      });

      it('should display the required asterisk on the label when required property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.required = false;
        await tick();
        this.context.component.required = true;
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true, 'required attribute should be present');
        expect(this.context.component.required).toBe(true, 'required property should be true');
        expect(requiredAsteriskIsDisplayed(this.context.component)).toBe(true, 'required asterisk should be visible');
      });
    });

    describe('API (Attributes) - required', function(this: ITestContext) {
      it('should not display the required asterisk on the label when required attribute is not present', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.REQUIRED);
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBe(false, 'required attribute should not be present');
        expect(!this.context.component.required).toBe(true, 'required property should be false');
        expect(requiredAsteriskIsDisplayed(this.context.component)).toBe(false, 'required asterisk should not be visible');
      });

      it('should display the required asterisk on the label when required property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.REQUIRED);
        await tick();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.REQUIRED, '');
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true, 'required attribute should be present');
        expect(this.context.component.required).toBe(true, 'required property should be true');
        expect(requiredAsteriskIsDisplayed(this.context.component)).toBe(true, 'required asterisk should be visible');
      });
    });

    describe('API (Properties) - invalid', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid property is set to false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.invalid = true;
        await tick();
        this.context.component.invalid = false;
        await tick();
        expect(this.context.component.invalid).toBe(false, 'invalid property should be false');
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).toBe(false, 'invalid style should not be present on label');
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).toBe(false, 'invalid style should not be present on helper-text');
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.invalid = false;
        await tick();
        this.context.component.invalid = true;
        await tick();
        expect(this.context.component.invalid).toBe(true, 'invalid property should be true');
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).toBe(true, 'invalid style should be present on label');
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).toBe(true, 'invalid style should be present on helper-text');
      });
    });

    describe('API (attributes) - invalid', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid attribute is set to false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        expect(this.context.component.invalid).toBe(false, 'invalid property should be false');
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).toBe(false, 'invalid attribute should not be present');
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).toBe(false, 'invalid style should not be present on label');
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).toBe(false, 'invalid style should not be present on helper-text');
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).toBe(true, 'invalid attribute should be present');
        expect(this.context.component.invalid).toBe(true, 'invalid property should be true');
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).toBe(true, 'invalid style should be present on label');
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).toBe(true, 'invalid style should be present on helper-text');
      });
    });

    describe('API (Properties) - floatLabelType', function(this: ITestContext) {
      it('should float the label when floatLabelType property is set to "always"', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { label: 'Test' });
        this.context.component.floatLabelType = 'always';
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(true, 'floating attribute should be present when label is floating');
        expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE)).toBe('always', 'float-label-type attribute should be "always"');
      });

      it('should not float the label when floatLabelType property is set from "always" to auto (while input has no value)', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { label: 'Test' });
        this.context.component.floatLabelType = 'always';
        await tick();

        this.context.component.floatLabelType = 'auto';
        await tick();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(false, 'floating attribute should not be present when label is not floating');
        expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE)).toBe('auto', 'float-label-type attribute should be "auto"');
      });
    });

    describe('API (attributes) - float-label-type', function(this: ITestContext) {
      it('should not float the label when float-label-type attribute is not applied (default value)', async function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(false, 'floating attribute should not be present when label is not floating');
        expect(this.context.component.floatLabelType).toBe('auto', 'floatLabelType property should be "auto" by default');
      });

      it('should float the label when float-label-type attribute is set to "always"', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'always');
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(true, 'floating attribute should be present when label is floating');
        expect(this.context.component.floatLabelType).toBe('always', 'floatLabelType property should be "always"');
      });

      it('should not float the label when float-label-type attribute is set from "always" to auto (while input has no value)', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'always');
        await tick();

        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'auto');
        await tick();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(false, 'floating attribute should not be present when label is not floating');
        expect(this.context.component.floatLabelType).toBe('auto', 'floatLabelType property should be "auto"');
      });
    });

    describe('API (attributes) - float-label-type', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid attribute is set to false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        expect(!this.context.component.invalid).toBe(true, 'invalid property should be false');
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).toBe(false, 'invalid attribute should not be present');
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).toBe(false, 'invalid style should not be present on label');
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).toBe(false, 'invalid style should not be present on helper-text');
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).toBe(true, 'invalid attribute should be present');
        expect(this.context.component.invalid).toBe(true, 'invalid property should be true');
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).toBe(true, 'invalid style should be present on label');
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).toBe(true, 'invalid style should be present on helper-text');
      });
    });

    describe('Disable chip field', function(this: ITestContext) {
      it('should set the disabled class on root when the native input disabled property is set to true', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).disabled = true;

        await tick();
        expect(getRootElement(this.context.component).classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true, 'disabled class should be applied');
      });

      it('should set the disabled class on root when the native input disabled attribute is applied', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).setAttribute('disabled', '');

        await tick();
        expect(getRootElement(this.context.component).classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true, 'disabled class should be applied');
      });

      it('should set the disabled class on root when the native input disabled attribute is applied', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).setAttribute('disabled', '');

        await tick();
        getNativeInput(this.context.component).removeAttribute('disabled');

        await tick();
        expect(getRootElement(this.context.component).classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(false, 'disabled class should not be applied');
      });
    });

    describe('Input focus / blur', function(this: ITestContext) {
      it('should float label when empty input is focused', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        getNativeInput(this.context.component).focus();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(true, 'floating attribute should be present when label is floating');
      });

      it('should not float label when empty input is blurred', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).focus();

        await tick();
        getNativeInput(this.context.component).blur();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(false, 'floating attribute should not be present when label is not floating');
      });
    });

    describe('Keydown events', function(this: ITestContext) {
      it('should emit member-added event when user hits "Enter" key', function(this: ITestContext) {
        this.context = setupTestContext();
        let eventDetail = '';
        const spy = jasmine.createSpy('change event');
        this.context.component.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, (event: CustomEvent) => {
          eventDetail = event.detail;
          spy();
        });

        getNativeInput(this.context.component).value = '  test  ';
        dispatchKeydownEvent(getNativeInput(this.context.component), 'Enter');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(eventDetail).toBe('test', 'the event payload should be present and trimmed');
      });

      it('should clear input when "Esc" key is pressed', function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).value = '  test  ';
        dispatchKeydownEvent(getNativeInput(this.context.component), 'Escape');

        expect(getNativeInput(this.context.component).value).toBe('', 'the input value should have been cleared');
      });

      it('should clear input when "Tab" key is pressed', function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).value = '  test  ';
        dispatchKeydownEvent(getNativeInput(this.context.component), 'Tab');

        expect(getNativeInput(this.context.component).value).toBe('', 'the input value should have been cleared');
      });

      it('should emit member-removed event when user hits "Backspace" key while the input value is empty', function(this: ITestContext) {
        this.context = setupTestContext();
        const spy = jasmine.createSpy('change event');
        this.context.component.addEventListener(
          CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, () => {
          spy();
        });

        addMember(this.context.component, 'test');

        dispatchKeydownEvent(getNativeInput(this.context.component), 'Backspace');

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should not emit member-removed event when user hits "Backspace" key while the input value is not empty', function(this: ITestContext) {
        this.context = setupTestContext();
        const spy = jasmine.createSpy('change event');
        this.context.component.addEventListener(
          CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, () => {
          spy();
        });

        getNativeInput(this.context.component).value = 'test';
        dispatchKeydownEvent(getNativeInput(this.context.component), 'Backspace');

        expect(spy).toHaveBeenCalledTimes(0);
      });

    });

    describe('Member navigation', function(this: ITestContext) {
      it('should focus the last element when the left arrow key is pressed while the input is focused', function(this: ITestContext) {
        this.context = setupTestContext();
        const chip1 = addMember(this.context.component, 'test1');
        const chip2 = addMember(this.context.component, 'test2');
        getNativeInput(this.context.component).focus();
        dispatchKeydownEvent(getNativeInput(this.context.component), 'ArrowLeft');
        const chip2IsActive = chip2.hasAttribute('focused');
        expect(chip2IsActive).toBeTrue();
      });

      it('should focus the previous member when the left arrow key is pressed while the last member is focused', function(this: ITestContext) {
        this.context = setupTestContext();
        const chip1 = addMember(this.context.component, 'test1');
        const chip2 = addMember(this.context.component, 'test2');
        chip2.focus();
        dispatchKeydownEvent(chip2, 'ArrowLeft');
        const chip1IsActive = chip1.hasAttribute('focused');
        expect(chip1IsActive).toBeTrue();
      });

      it('should focus the next member when the right arrow key is pressed while the first member is focused', function(this: ITestContext) {
        this.context = setupTestContext();
        const chip1 = addMember(this.context.component, 'test1');
        const chip2 = addMember(this.context.component, 'test2');
        chip1.focus();
        dispatchKeydownEvent(chip1, 'ArrowRight');
        const chip2IsActive = chip2.hasAttribute('focused');
        expect(chip2IsActive).toBeTrue();
      });

      it('should focus the input when the right arrow key is pressed while the last member is focused', function(this: ITestContext) {
        this.context = setupTestContext();
        const chip1 = addMember(this.context.component, 'test1');
        const chip2 = addMember(this.context.component, 'test2');
        chip2.focus();
        dispatchKeydownEvent(chip2, 'ArrowRight');
        const inputIsActive = getActiveElement() === getNativeInput(this.context.component);
        expect(inputIsActive).toBeTrue();
      });
    });

  });

  describe('With no label', function(this: ITestContext) {
    it('should not apply attributes for a floated label when a label element does not exist', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBe(false, 'floating attribute should not be present when label is not floating');
    });
  });

  function setupTestContext(append = true, props: ChipFieldComponentDelegateProps = {}, options: IChipFieldComponentDelegateOptions = { label: 'Label text', id: 'chip-field-01' }): ITestChipFieldContext {
    const delegate = new ChipFieldComponentDelegate({ props, options })
    const label = delegate.element.querySelector('label') as HTMLLabelElement;
    const input = delegate.element.querySelector('input') as HTMLInputElement;
    const root = getShadowElement(delegate.element, CHIP_FIELD_CONSTANTS.selectors.ROOT);

    if (append) {
      document.body.appendChild(delegate.element);
    }

    return {
      delegate,
      component: delegate.element,
      label,
      input,
      root,
      foundation: delegate.element['_foundation'],
      destroy: () => removeElement(delegate.element)
    };
  }

  function getRootElement(component: IChipFieldComponent): HTMLElement {
    return getShadowElement(component, CHIP_FIELD_CONSTANTS.selectors.ROOT);
  }

  function requiredAsteriskIsDisplayed(component: IChipFieldComponent) {
    return getComputedStyle(getLabelElement(component), ':before').getPropertyValue('content').includes('*');
  }

  function invalidStyleIsDisplayedOnHelperText(component: IChipFieldComponent): boolean {
    const helperTextElement = getHelperTextElement(component);
    return getComputedStyle(helperTextElement).getPropertyValue('color').includes('rgb(176, 0, 32)');
  }

  function getNativeInput(component: IChipFieldComponent): HTMLInputElement {
    return component.querySelector(CHIP_FIELD_CONSTANTS.selectors.INPUT) as HTMLInputElement;
  }

  function getLabelElement(component: IChipFieldComponent) {
    return component.querySelector(CHIP_FIELD_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
  }

  function getHelperTextElement(component: IChipFieldComponent) {
    return component.querySelector(CHIP_FIELD_CONSTANTS.selectors.HELPER_TEXT) as HTMLElement;
  }

  function dispatchKeydownEvent(ele: HTMLElement, key: string) {
    const keyboardEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key,
    });
    ele.dispatchEvent(keyboardEvent);
  }

  function addMember(component: IChipFieldComponent, value: string): ChipComponent {
    const chip = document.createElement('forge-chip') as ChipComponent;
    chip.setAttribute('slot', 'member');
    chip.setAttribute('type', 'field');
    chip.setAttribute('dense', '');
    chip.value = value;
    chip.textContent = value;
    component.append(chip);
    return chip;
  }
});

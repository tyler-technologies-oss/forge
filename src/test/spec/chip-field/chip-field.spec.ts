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
import { ChipComponent, defineChipComponent } from '@tylertech/forge';
import { expectFloatingLabelState, floatTick, testFloatingLabelState } from '../../utils/floating-label-utils';
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
      expect(this.context.foundation['_isInitialized']).toBeFalse();
  
      const inputContainer = document.createElement('div');
      // Add the input and label elements to the text-field component
      inputContainer.appendChild(this.context.input as HTMLInputElement);
      inputContainer.appendChild(this.context.label as HTMLLabelElement);
      this.context.component.appendChild(inputContainer)
      await tick();
  
      // Now the component should initialize
      expect(this.context.foundation['_isInitialized']).toBeTrue();
    });

    it('should set the addMemberOnBlur property to false when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();

      expect(this.context.component.addMemberOnBlur).toBeFalse();
    });

    it('should set the addMemberOnBlur property to true when the attribute is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_MEMBER_ON_BLUR, '');

      expect(this.context.component.addMemberOnBlur).toBe(true);
    });

    it('should float label if value is set before adding to DOM', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.input.value = 'text';
      document.body.appendChild(this.context.component);
      await floatTick();

      expectFloatingLabelState(this.context, true);
    });

    it('should float label if float label type is set to "always"', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.floatLabelType = 'always';
      document.body.appendChild(this.context.component);
      await floatTick();

      expect(this.context.component.floatLabelType).toBe('always');
      expectFloatingLabelState(this.context, true);
    });

    it('should float label if float label type is changed to "always" after initial render', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      document.body.appendChild(this.context.component);
      this.context.component.floatLabelType = 'always';
      await floatTick();

      expectFloatingLabelState(this.context, true);
    });

    it('should float label always if placeholder is set', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.input.placeholder = 'placeholder text';
      document.body.appendChild(this.context.component);
      await floatTick();

      expect(this.context.component.floatLabelType).toBe('always');
      expectFloatingLabelState(this.context, true);
    });

    it('should be disabled if set by default', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.input.disabled = true;
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.input.disabled).toBeTrue();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBeTrue();
    });

    it('should be readonly if set by default', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.input.readOnly = true;
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.input.readOnly).toBeTrue();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBeTrue();
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
      await floatTick();
      
      expectFloatingLabelState(this.context, true);
    });

    it('should float label when invoked programmatically', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.floatLabel(true);
      await floatTick();

      expectFloatingLabelState(this.context, true);
    });

    it('should un-float label when invoked programmatically', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.floatLabel(true);
      await floatTick();
      this.context.component.floatLabel(false);
      await tick();

      expectFloatingLabelState(this.context, false);
    });

    it('should float label when value is set by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.value = 'test';
      await floatTick();

      expectFloatingLabelState(this.context, true);
    });

    it('should float label when focused', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.dispatchEvent(new Event('focus'));
      await floatTick();

      expectFloatingLabelState(this.context, true);
    });


    it('should not un-float label when blurred if placeholder exists', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.placeholder = 'Some placeholder text...';
      await tick();

      this.context.input.focus();
      await floatTick();

      expectFloatingLabelState(this.context, true);

      this.context.input.blur();
      await floatTick();

      expectFloatingLabelState(this.context, true);
    });

    it('should set proper state when focused', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.dispatchEvent(new Event('focus'));
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.FOCUSED)).toBeTrue();
      expect(this.context.input.classList.contains(FIELD_CONSTANTS.classes.INPUT_FOCUSED)).toBeTrue();
    });

    it('should not float label when blurred', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();

      this.context.input.dispatchEvent(new Event('focus'));
      await floatTick();
      expectFloatingLabelState(this.context, true);

      this.context.input.dispatchEvent(new Event('blur'));
      await tick();
      expectFloatingLabelState(this.context, false);
    });

    it('should set dense via property', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'dense';

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBeTrue();
    });

    it('should set dense via attribute', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'dense');

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBeTrue();
    });

    it('should set roomy via property', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'roomy';

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBeTrue();
    });

    it('should set roomy via attribute', function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'roomy');

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBeTrue();
    });

    it('should be disabled when the input is', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.disabled = true;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBeTrue();
    });

    it('should not be disabled when the input is not', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.disabled = false;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBeFalse();
    });

    it('should be readonly when the input is', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.readOnly = true;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBeTrue();
    });

    it('should not be readonly when the input is not', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.readOnly = false;
      await timer();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBeFalse();
    });

    it('should correctly remove disabled if removed from the DOM and re-added', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.disabled = true;
      await timer();
      this.context.component.remove();
      this.context.input.disabled = false;
      document.body.appendChild(this.context.component);

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBeFalse();
    });

    it('should correctly remove readonly if removed from the DOM and re-added', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.readOnly = true;
      await timer();
      this.context.component.remove();
      this.context.input.readOnly = false;
      document.body.appendChild(this.context.component);

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.READONLY)).toBeFalse();
    });

    it('should set invalid', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.invalid = true;
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBeTrue();
    });

    it('should set invalid via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, 'true');
      await tick();

      expect(this.context.component.invalid).toBeTrue();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBeTrue();
    });

    it('should set required', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.required = true;
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBeTrue();
    });

    it('should set required via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.REQUIRED, 'true');
      await tick();

      expect(this.context.component.required).toBeTrue();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBeTrue();
    });

    it('should toggle required attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.required = true;
      await tick();
      this.context.component.required = false;
      await tick();

      expect(this.context.component.required).toBeFalse();
      expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBeFalse();
    });

    it('should set shape to rounded', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.shape = 'rounded';
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.SHAPE_ROUNDED)).toBeTrue();
    });

    it('should set rounded shape via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.SHAPE, 'rounded');
      await tick();

      expect(this.context.component.shape).toBe('rounded');
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.SHAPE_ROUNDED)).toBeTrue();
    });

    it('should set density to dense', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'dense';
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBeTrue();
    });

    it('should set density to dense via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'dense');
      await tick();

      expect(this.context.component.density).toBe('dense');
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBeTrue();
    });

    it('should set density to roomy', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.density = 'roomy';
      await tick();

      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBeTrue();
    });

    it('should set density to roomy via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'roomy');
      await tick();

      expect(this.context.component.density).toBe('roomy');
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBeTrue();
    });

    it('should un-float label if value is removed when input is not focused', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.value = 'test';
      await tick();
      await floatTick();
      expectFloatingLabelState(this.context, true);
      this.context.input.value = '';
      await tick();

      expectFloatingLabelState(this.context, false);
    });

    it('should set floating label state when input attribute value changes', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.setAttribute('value', 'test');
      await tick();
      await floatTick();
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
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBeTrue();
    });

    it('should render trailing icon class', async function(this: ITestContext) {
      await tick();
      expect(this.context.root.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBeTrue();
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
        expect(delegate.element.required).toBeFalse();
        expect(delegate.element.invalid).toBeFalse();
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

        expect(delegate.inputElement.disabled).toBeTrue();
      });

      it('should set disabled', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate();

        delegate.disabled = true;
        delegate.disabled = false;

        expect(delegate.inputElement.disabled).toBeFalse();
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

        expect(delegate.element.required).toBeTrue();
      });

      it('should initialize invalid', function(this: ITestContext) {
        const delegate = new ChipFieldComponentDelegate({props: { invalid: true }});

        expect(delegate.element.invalid).toBeTrue();
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
      this.context.delegate.floatLabel(true);
      await floatTick();

      testFloatingLabelState(this.context.delegate.labelElement as HTMLLabelElement, true);
    });

    it('should un-float label', async function(this: ITestContext) {
      this.context = setupTestContext(true, {}, { label: 'Test' });
      this.context.delegate.floatLabel(true);
      await floatTick();
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
        expect(this.context.component.isConnected).toBeTrue();
      });

      it('should instantiate component with shadow dom', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.shadowRoot).toBeDefined();
      });

      it('should instantiate component as ChipFieldComponent', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component instanceof ChipFieldComponent).toBeTrue();
      });
    });

    describe('Adding new members', function(this: ITestContext) {
      it('should set all new members to have a tabindex of -1', function(this: ITestContext) {
        this.context = setupTestContext();
        const member = addMember(this.context.component, 'test1');
        expect(member.tabIndex === -1).toBeTrue();
      });
    });

    describe('API (Properties) - required', function(this: ITestContext) {
      it('should not display the required asterisk on the label when required property is set to false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.required = true;
        await tick();
        this.context.component.required = false;
        expect(!this.context.component.required).withContext('required property should be false').toBeTrue();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).withContext('required attribute should not be present').toBeFalse();
        expect(requiredAsteriskIsDisplayed(this.context.component)).withContext('required asterisk should not be visible').toBeFalse();
      });

      it('should display the required asterisk on the label when required property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.required = false;
        await tick();
        this.context.component.required = true;
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).withContext('required attribute should be present').toBeTrue();
        expect(this.context.component.required).withContext('required property should be true').toBeTrue();
        expect(requiredAsteriskIsDisplayed(this.context.component)).withContext('required asterisk should be visible').toBeTrue();
      });
    });

    describe('API (Attributes) - required', function(this: ITestContext) {
      it('should not display the required asterisk on the label when required attribute is not present', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.REQUIRED);
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).withContext('required attribute should not be present').toBeFalse();
        expect(!this.context.component.required).withContext('required property should be false').toBeTrue();
        expect(requiredAsteriskIsDisplayed(this.context.component)).withContext('required asterisk should not be visible').toBeFalse();
      });

      it('should display the required asterisk on the label when required property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.REQUIRED);
        await tick();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.REQUIRED, '');
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).withContext('required attribute should be present').toBeTrue();
        expect(this.context.component.required).withContext('required property should be true').toBeTrue();
        expect(requiredAsteriskIsDisplayed(this.context.component)).withContext('required asterisk should be visible').toBeTrue();
      });
    });

    describe('API (Properties) - invalid', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid property is set to false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.invalid = true;
        await tick();
        this.context.component.invalid = false;
        await tick();
        expect(this.context.component.invalid).withContext('invalid property should be false').toBeFalse();
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).withContext('invalid style should not be present on label').toBeFalse();
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).withContext('invalid style should not be present on helper-text').toBeFalse();
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.invalid = false;
        await tick();
        this.context.component.invalid = true;
        await tick();
        expect(this.context.component.invalid).withContext('invalid property should be true').toBeTrue();
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).withContext('invalid style should be present on label').toBeTrue();
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).withContext('invalid style should be present on helper-text').toBeTrue();
      });
    });

    describe('API (attributes) - invalid', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid attribute is set to false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        expect(this.context.component.invalid).withContext('invalid property should be false').toBeFalse();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).withContext('invalid attribute should not be present').toBeFalse();
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).withContext('invalid style should not be present on label').toBeFalse();
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).withContext('invalid style should not be present on helper-text').toBeFalse();
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).withContext('invalid attribute should be present').toBeTrue();
        expect(this.context.component.invalid).withContext('invalid property should be true').toBeTrue();
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).withContext('invalid style should be present on label').toBeTrue();
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).withContext('invalid style should be present on helper-text').toBeTrue();
      });
    });

    describe('API (Properties) - floatLabelType', function(this: ITestContext) {
      it('should float the label when floatLabelType property is set to "always"', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { label: 'Test' });
        this.context.component.floatLabelType = 'always';
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should be present when label is floating').toBeTrue();
        expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE)).withContext('float-label-type attribute should be "always"').toBe('always');
      });

      it('should float the label when floatLabelType property is set to "always" after being moved in the DOM', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { label: 'Test' });
        this.context.component.floatLabelType = 'always';
        await tick();
        
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBeTrue();

        const parent = this.context.component.parentElement as HTMLElement;
        this.context.destroy();
        await tick();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBeFalse();

        parent.appendChild(this.context.component);
        await tick();

        expect((this.context.foundation as any)._floatingLabel.isFloating).withContext('label should be floating').toBeTrue();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBeTrue();
      });

      it('should not float the label when floatLabelType property is set from "always" to auto (while input has no value)', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { label: 'Test' });
        this.context.component.floatLabelType = 'always';
        await floatTick();

        this.context.component.floatLabelType = 'auto';
        await tick();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should not be present when label is not floating').toBeFalse();
        expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE)).withContext('float-label-type attribute should be "auto"').toBe('auto');
      });
    });

    describe('API (attributes) - float-label-type', function(this: ITestContext) {
      it('should not float the label when float-label-type attribute is not applied (default value)', async function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should not be present when label is not floating').toBeFalse();
        expect(this.context.component.floatLabelType).withContext('floatLabelType property should be "auto" by default').toBe('auto');
      });

      it('should float the label when float-label-type attribute is set to "always"', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'always');
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should be present when label is floating').toBeTrue();
        expect(this.context.component.floatLabelType).withContext('floatLabelType property should be "always"').toBe('always');
      });

      it('should not float the label when float-label-type attribute is set from "always" to auto (while input has no value)', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'always');
        await floatTick();

        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'auto');
        await tick();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should not be present when label is not floating').toBeFalse();
        expect(this.context.component.floatLabelType).withContext('floatLabelType property should be "auto"').toBe('auto');
      });
    });

    describe('API (attributes) - float-label-type', function(this: ITestContext) {
      it('should not display the invalid style on the label and helper-text when invalid attribute is set to false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        expect(!this.context.component.invalid).withContext('invalid property should be false').toBeTrue();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).withContext('invalid attribute should not be present').toBeFalse();
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).withContext('invalid style should not be present on label').toBeFalse();
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).withContext('invalid style should not be present on helper-text').toBeFalse();
      });

      it('should display the invalid style on the label and helper-text when invalid property is set to true from false', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { helperText: 'Helper text' });
        this.context.component.removeAttribute(FIELD_CONSTANTS.attributes.INVALID);
        await tick();
        this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, '');
        await tick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).withContext('invalid attribute should be present').toBeTrue();
        expect(this.context.component.invalid).withContext('invalid property should be true').toBeTrue();
        // expect(invalidStyleIsDisplayedOnLabel(this.context.component)).withContext('invalid style should be present on label').toBeTrue();
        expect(invalidStyleIsDisplayedOnHelperText(this.context.component)).withContext('invalid style should be present on helper-text').toBeTrue();
      });
    });

    describe('Disable chip field', function(this: ITestContext) {
      it('should set the disabled class on root when the native input disabled property is set to true', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).disabled = true;

        await tick();
        expect(getRootElement(this.context.component).classList.contains(FIELD_CONSTANTS.classes.DISABLED)).withContext('disabled class should be applied').toBeTrue();
      });

      it('should set the disabled class on root when the native input disabled attribute is applied', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).setAttribute('disabled', '');

        await tick();
        expect(getRootElement(this.context.component).classList.contains(FIELD_CONSTANTS.classes.DISABLED)).withContext('disabled class should be applied').toBeTrue();
      });

      it('should set the disabled class on root when the native input disabled attribute is applied', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).setAttribute('disabled', '');

        await tick();
        getNativeInput(this.context.component).removeAttribute('disabled');

        await tick();
        expect(getRootElement(this.context.component).classList.contains(FIELD_CONSTANTS.classes.DISABLED)).withContext('disabled class should not be applied').toBeFalse();
      });
    });

    describe('Input focus / blur', function(this: ITestContext) {
      it('should float label when empty input is focused', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        getNativeInput(this.context.component).focus();
        await floatTick();
        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should be present when label is floating').toBeTrue();
      });

      it('should not float label when empty input is blurred', async function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).focus();

        await tick();
        getNativeInput(this.context.component).blur();

        expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should not be present when label is not floating').toBeFalse();
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
        expect(eventDetail).withContext('the event payload should be present and trimmed').toBe('test');
      });

      it('should clear input when "Esc" key is pressed', function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).value = '  test  ';
        dispatchKeydownEvent(getNativeInput(this.context.component), 'Escape');

        expect(getNativeInput(this.context.component).value).withContext('the input value should have been cleared').toBe('');
      });

      it('should clear input when "Tab" key is pressed', function(this: ITestContext) {
        this.context = setupTestContext();
        getNativeInput(this.context.component).value = '  test  ';
        dispatchKeydownEvent(getNativeInput(this.context.component), 'Tab');

        expect(getNativeInput(this.context.component).value).withContext('the input value should have been cleared').toBe('');
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

   describe('Click events', function (this: ITestContext) {
      it('should emit a click event from the input if the container is clicked', function(this: ITestContext) {
        this.context = setupTestContext();
        const clickSpy = jasmine.createSpy('inputClick');
        const inputEl =  getNativeInput(this.context.component);
        inputEl.addEventListener('click', clickSpy);
        
        const containerEl = getInputContainerElement(this.context.component);
        containerEl.dispatchEvent(new MouseEvent('mousedown'));
        
        expect(clickSpy).toHaveBeenCalledTimes(1);
        
        inputEl.removeEventListener('click', clickSpy);
      });

      it('should not emit a click event from a disabled input if the container is clicked', function(this: ITestContext) {
        this.context = setupTestContext();
        const clickSpy = jasmine.createSpy('inputClick');
        const inputEl =  getNativeInput(this.context.component);
        inputEl.addEventListener('click', clickSpy);
        inputEl.disabled = true;
        
        const containerEl = getInputContainerElement(this.context.component);
        containerEl.dispatchEvent(new MouseEvent('mousedown'));
        
        expect(clickSpy).not.toHaveBeenCalled();
        
        inputEl.removeEventListener('click', clickSpy);
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

      it('should set the addMemberOnBlur property to true when the attribute is set to true', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_MEMBER_ON_BLUR, '');

        expect(this.context.component.addMemberOnBlur).toBe(true);
      });
  
      it('should set the addMemberOnBlur property to false when the attribute is set to false', function(this: ITestContext) {
        this.context = setupTestContext();

        this.context.component.addMemberOnBlur = true;
        expect(this.context.component.addMemberOnBlur).toBeTrue();

        this.context.component.setAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_MEMBER_ON_BLUR, 'false');
        expect(this.context.component.addMemberOnBlur).toBe(false);
      });

      it('chips should not be added when addMemberOnBlur is set to false and the "Tab" key is pressed', function(this: ITestContext) {
        this.context = setupTestContext();
        
        expect(this.context.component.addMemberOnBlur).toBeFalse();

        const listener = jasmine.createSpy('add member listener');
        this.context.component.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, listener);

        const inputEl = getNativeInput(this.context.component);
        inputEl.focus();
        inputEl.value = 'test';
        dispatchKeydownEvent(inputEl, 'Tab');

        expect(listener).toHaveBeenCalledTimes(0);
        expect(inputEl.value).withContext('the input value should have been cleared').toBe('');
      });

      it('chips should be added when addMemberOnBlur is set to true and the mouse is clicked outside of the input', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_MEMBER_ON_BLUR, 'true');
        const listener = jasmine.createSpy('add member listener');
        this.context.component.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, listener);
        getNativeInput(this.context.component).value = 'test';
        getNativeInput(this.context.component).focus();
        getNativeInput(this.context.component).blur();
        expect(listener).toHaveBeenCalledTimes(1)
      });
    });
  });

  describe('With no label', function(this: ITestContext) {
    it('should not apply attributes for a floated label when a label element does not exist', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).withContext('floating attribute should not be present when label is not floating').toBeFalse();
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

  function getInputContainerElement(component: IChipFieldComponent) {
    return getShadowElement(component, CHIP_FIELD_CONSTANTS.selectors.INPUT_CONTAINER) as HTMLDivElement;
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

import {
  defineTextFieldComponent,
  ITextFieldComponent,
  TEXT_FIELD_CONSTANTS,
  TextFieldComponentDelegate,
  TextFieldComponentDelegateProps,
  ITextFieldFoundation,
  ITextFieldComponentDelegateOptions
} from '@tylertech/forge/text-field';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { FLOATING_LABEL_CONSTANTS } from '@tylertech/forge/floating-label';
import { expectFloatingLabelState, testFloatingLabelState } from '../../utils/text-field';
import { FIELD_CONSTANTS } from '@tylertech/forge/field/field-constants';

interface ITestContext {
  context: ITextFieldTestContext;
}

interface ITextFieldTestContext { 
  delegate: TextFieldComponentDelegate;
  component: ITextFieldComponent;
  root: HTMLElement;
  input: HTMLInputElement;
  label: HTMLLabelElement;
  foundation: ITextFieldFoundation;
  leadingIcon?: HTMLElement;
  trailingIcon?: HTMLElement;
  destroy(): void;
}

describe('TextFieldComponent', function(this: ITestContext) {  
  beforeAll(function(this: ITestContext) {
    defineTextFieldComponent();
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
      this.context.component.removeChild(this.context.label);
      this.context.component.removeChild(this.context.input);
      
      document.body.appendChild(this.context.component);
      await tick();

      // Make sure that the component doesn't initialize when added to DOM
      expect(this.context.foundation['_isInitialized']).toBe(false);

      // Add the input and label elements to the text-field component
      this.context.component.appendChild(this.context.input);
      this.context.component.appendChild(this.context.label);
      await tick();

      // Now the component should initialize
      expect(this.context.foundation['_isInitialized']).toBe(true);
    });

    it('should float label if value is set before adding to DOM', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      this.context.input.value = 'text';
      document.body.appendChild(this.context.component);
      await timer(150);

      expectFloatingLabelState(this.context, true);
    });

    it('should float label if float label type is set to "always"', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.floatLabelType = 'always';
      document.body.appendChild(this.context.component);
      await timer(150);

      expect(this.context.component.floatLabelType).toBe('always');
      expectFloatingLabelState(this.context, true);
    });

    it('should float label if float label type is changed to "always" after initial render', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      document.body.appendChild(this.context.component);
      await tick();
      this.context.component.floatLabelType = 'always';
      await timer(150);

      expectFloatingLabelState(this.context, true);
    });

    it('should float label always if placeholder is set', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      this.context.input.placeholder = 'placeholder text';
      document.body.appendChild(this.context.component);
      await timer(150);

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

    it('should initialize with textarea', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      removeElement(this.context.input);
      const textarea = document.createElement('textarea');
      this.context.component.appendChild(textarea);
      document.body.appendChild(this.context.component);
      await tick();

      expect(this.context.root.classList.contains(TEXT_FIELD_CONSTANTS.classes.TEXTAREA)).toBe(true);
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
      await timer(150);
      
      expectFloatingLabelState(this.context, true);
    });

    it('should float label when invoked programmatically', async function(this: ITestContext) {
      this.context = setupTestContext();

      await tick();
      this.context.component.floatLabel(true);
      await timer(150);

      expectFloatingLabelState(this.context, true);
    });

    it('should un-float label when invoked programmatically', async function(this: ITestContext) {
      this.context = setupTestContext();

      await tick();
      this.context.component.floatLabel(true);
      await timer(150);
      this.context.component.floatLabel(false);
      await timer(150);

      expectFloatingLabelState(this.context, false);
    });

    it('should float label when value is set by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.input.value = 'test';
      await timer(150);

      expectFloatingLabelState(this.context, true);
    });

    it('should float label when focused', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      this.context.input.dispatchEvent(new Event('focus'));
      await timer(150);

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
      await timer(150);
      expectFloatingLabelState(this.context, true);

      this.context.input.dispatchEvent(new Event('blur'));
      await timer(150);
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
      await timer(150);
      expectFloatingLabelState(this.context, true);
      this.context.input.value = '';
      await timer(150);

      expectFloatingLabelState(this.context, false);
    });

    it('should set floating label state when input attribute value changes', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.input.setAttribute('value', 'test');
      await timer(150);

      expectFloatingLabelState(this.context, true);

      this.context.input.setAttribute('value', '');
      await timer(150);

      expectFloatingLabelState(this.context, false);
    });

    it('should float label if label text is empty', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.label.textContent = '';
      this.context.input.value = 'test';
      await timer(150);

      expect(this.context.label.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE)).toBe(true);
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

  describe('with leading icon', function(this: ITestContext) {
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

  describe('with multiple inputs', function(this: ITestContext) {
    beforeEach(function(this: ITestContext) {
      const inputElement = document.createElement('input');
      this.context = setupTestContext(false);
      this.context.component.appendChild(inputElement);
      document.body.appendChild(this.context.component);
    });

    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should handle multiple inputs', function(this: ITestContext) {
      expect(this.context.root.classList.contains(TEXT_FIELD_CONSTANTS.classes.MULTI_INPUT)).toBeTruthy();
    });
  });

  describe('TextFieldComponentDelegate', function(this: ITestContext) {
    describe('without being in DOM', function(this: ITestContext) {
      it('should create input without label with default configuration', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        expect(delegate.element.querySelector('input')).not.toBeNull();
        expect(delegate.element.querySelector('label')).toBeNull();
      });

      it('should have correct default configuration', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        expect(delegate.element.required).toBe(false);
        expect(delegate.element.invalid).toBe(false);
        expect(delegate.element.floatLabelType).toBe('auto');
        expect(delegate.inputElement.placeholder).toBe('');
      });
  
      it('should create label', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { label: 'Label' }});
        const label = delegate.element.querySelector('label') as HTMLLabelElement;

        expect(label).not.toBeNull();
        expect(label.innerText).toBe('Label');
      });
  
      it('should create helper text', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { helperText: 'Helper text' }});
        const span = delegate.element.querySelector('[slot="helper-text"]') as HTMLSpanElement;

        expect(span).not.toBeNull();
        expect(span.innerText).toBe('Helper text');
      });
  
      it('should change helper text content', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { helperText: 'Helper text' }});

        delegate.setHelperText('New helper text');

        const span = delegate.element.querySelector('[slot="helper-text"]') as HTMLSpanElement;
        expect(span.innerText).toBe('New helper text');
      });
  
      it('should not add helper text if set to null', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        delegate.setHelperText(null);

        const span = delegate.element.querySelector('[slot="helper-text"]') as HTMLSpanElement;
        expect(span).toBeNull();
      });
  
      it('should change label', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { label: 'Initial label' }});

        delegate.setLabel('New label');

        const label = delegate.element.querySelector('label') as HTMLLabelElement;
        expect(label.innerText).toBe('New label');
      });
  
      it('should remove label', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { label: 'Initial label' }});

        delegate.setLabel(null);

        const label = delegate.element.querySelector('label') as HTMLLabelElement;
        expect(label).toBeNull();
      });
  
      it('should create label after initialization', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        delegate.setLabel('Label text');

        const label = delegate.element.querySelector('label') as HTMLLabelElement;
        expect(label).not.toBeNull();
        expect(label.innerText).toBe('Label text');
      });

      it('should expose reference for input element', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        expect(delegate.inputElement).not.toBeNull();
      });

      it('should expose reference for label element', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        expect(delegate.labelElement).not.toBeNull();
      });

      it('should set disabled', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        delegate.disabled = true;

        expect(delegate.inputElement.disabled).toBe(true);
      });

      it('should set disabled', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate();

        delegate.disabled = true;
        delegate.disabled = false;

        expect(delegate.inputElement.disabled).toBe(false);
      });

      it('should set initial value', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { value: 'val' }});

        expect(delegate.inputElement.value).toBe('val');
        expect(delegate.value).toBe('val');
      });

      it('should change value', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { value: 'val' }});

        delegate.value = 'new val';

        expect(delegate.inputElement.value).toBe('new val');
        expect(delegate.value).toBe('new val');
      });

      it('should initialize required', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ props: { required: true }});

        expect(delegate.element.required).toBe(true);
      });

      it('should initialize invalid', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ props: { invalid: true }});

        expect(delegate.invalid).toBe(true);
      });

      it('should initialize float label type', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ props: { floatLabelType: 'always' }});

        expect(delegate.element.floatLabelType).toBe('always');
      });

      it('should initialize placeholder', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { placeholder: 'placeholder text' }});

        expect(delegate.inputElement.placeholder).toBe('placeholder text');
      });

      it('should pass validation after input value set', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ options: { value: 'val' }});

        expect(delegate.invalid).toBeFalse();
      });

      it('should set density', function(this: ITestContext) {
        const delegate = new TextFieldComponentDelegate({ props: { density: 'dense' }});

        expect(delegate.element.density).toBe('dense');
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
        await timer(150);

        testFloatingLabelState(this.context.delegate.labelElement as HTMLLabelElement, true);
      });

      it('should un-float label', async function(this: ITestContext) {
        this.context = setupTestContext(true, {}, { label: 'Test' });

        await tick();
        this.context.delegate.floatLabel(true);
        await timer(150);
        this.context.delegate.floatLabel(false);
        await timer(150);

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
  });

  function setupTestContext(append = true, props: TextFieldComponentDelegateProps = {}, options: ITextFieldComponentDelegateOptions = { label: 'Label text', id: 'text-field-01' }): ITextFieldTestContext {
    const delegate = new TextFieldComponentDelegate({ props, options });
    const label = delegate.element.querySelector('label') as HTMLLabelElement;
    const input = delegate.element.querySelector('input') as HTMLInputElement;
    const root = getShadowElement(delegate.element, TEXT_FIELD_CONSTANTS.selectors.ROOT);

    if (append) {
      document.body.appendChild(delegate.element);
    }

    return {
      delegate,
      component: delegate.element,
      input,
      label,
      root,
      foundation: delegate.element['_foundation'],
      destroy: () => removeElement(delegate.element)
    };
  }
});

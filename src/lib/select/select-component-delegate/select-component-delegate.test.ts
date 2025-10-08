import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { removeElement } from '@tylertech/forge-core';
import { ISelectComponent, defineSelectComponent, ISelectOption } from '../';
import {
  ISelectComponentDelegateOptions,
  SelectComponentDelegate,
  SelectComponentDelegateProps,
  ISelectComponentDelegateConfig
} from '../select-component-delegate';

const DEFAULT_OPTIONS: ISelectOption[] = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' }
];

class SelectComponentDelegateHarness {
  public delegate: SelectComponentDelegate;
  public component: ISelectComponent;
  private _fixture: HTMLElement;

  constructor(props?: SelectComponentDelegateProps, options?: ISelectComponentDelegateOptions) {
    const delegateConfig: ISelectComponentDelegateConfig = {
      props: {
        ...props,
        options: DEFAULT_OPTIONS
      },
      options
    };

    this.delegate = new SelectComponentDelegate(delegateConfig);
    this.component = this.delegate.element;
    this._fixture = this._createFixture();
  }

  private _createFixture(): HTMLElement {
    const fixture = document.createElement('div');
    fixture.id = 'select-component-delegate-fixture';
    fixture.appendChild(this.delegate.element);
    document.body.appendChild(fixture);
    return fixture;
  }

  public getHelperTextElement(): HTMLElement | null {
    return this.component.querySelector('[slot=helper-text]') as HTMLElement;
  }

  public destroy(): void {
    removeElement(this._fixture);
    this.delegate.destroy();
  }
}

describe('SelectComponentDelegate', () => {
  let harness: SelectComponentDelegateHarness;

  before(() => {
    defineSelectComponent();
  });

  afterEach(() => {
    harness?.destroy();

    // Clean up any remaining fixtures
    const fixtures = document.querySelectorAll('#select-component-delegate-fixture');
    fixtures.forEach(fixture => {
      if (fixture.isConnected) {
        fixture.remove();
      }
    });
  });

  describe('instantiation', () => {
    it('should create delegate and component instances', () => {
      harness = new SelectComponentDelegateHarness();

      expect(harness.delegate).to.exist;
      expect(harness.component).to.exist;
    });
  });

  describe('property configuration', () => {
    it('should set options', () => {
      harness = new SelectComponentDelegateHarness();

      const actualOptions = (harness.component.options as ISelectOption[]).map(({ label, value }) => ({ label, value }));

      expect(actualOptions).to.deep.equal(DEFAULT_OPTIONS);
    });

    it('should set placeholder', () => {
      const placeholder = 'Choose...';
      harness = new SelectComponentDelegateHarness({ placeholder });

      expect(harness.component.placeholder).to.equal(placeholder);
    });

    it('should set disabled', () => {
      harness = new SelectComponentDelegateHarness({ disabled: true });

      expect(harness.component.disabled).to.be.true;
    });

    it('should set multiple', () => {
      harness = new SelectComponentDelegateHarness({ multiple: true });

      expect(harness.component.multiple).to.be.true;
    });

    it('should set required', () => {
      harness = new SelectComponentDelegateHarness({ required: true });

      expect(harness.component.required).to.be.true;
    });

    it('should set invalid', () => {
      harness = new SelectComponentDelegateHarness({ invalid: true });

      expect(harness.component.invalid).to.be.true;
    });

    it('should set label', () => {
      const label = 'Label text';
      harness = new SelectComponentDelegateHarness({ label });

      expect(harness.component.label).to.equal(label);
    });

    it('should set floatLabel', () => {
      harness = new SelectComponentDelegateHarness({ floatLabel: true });

      expect(harness.component.floatLabel).to.be.true;
    });
  });

  describe('helper text functionality', () => {
    it('should set helper text from options', () => {
      const helperText = 'Choose an option';
      harness = new SelectComponentDelegateHarness({}, { helperText });

      const helperTextElement = harness.getHelperTextElement();

      expect(helperTextElement).to.exist;
      expect(helperTextElement!.innerText).to.equal(helperText);
    });

    it('should remove helper text via method', () => {
      harness = new SelectComponentDelegateHarness({}, { helperText: 'Choose an option.' });

      harness.delegate.setHelperText(null);

      const helperTextElement = harness.getHelperTextElement();
      expect(helperTextElement).to.not.exist;
    });
  });

  describe('value management', () => {
    it('should set initial value', () => {
      const { value } = DEFAULT_OPTIONS[1];
      harness = new SelectComponentDelegateHarness({ value });

      expect(harness.delegate.value).to.equal(value);
    });

    it('should set value dynamically', () => {
      harness = new SelectComponentDelegateHarness();

      const value = DEFAULT_OPTIONS[0].value;
      harness.delegate.value = value;

      expect(harness.delegate.value).to.equal(value);
    });
  });

  describe('event handling', () => {
    it('should notify value changes', () => {
      harness = new SelectComponentDelegateHarness();
      const changeSpy = spy();
      harness.delegate.onChange(changeSpy);

      const expectedValue = DEFAULT_OPTIONS[0].value;
      harness.component.open = true;
      harness.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy.calledOnceWith(expectedValue)).to.be.true;
    });

    it('should notify focus events', () => {
      harness = new SelectComponentDelegateHarness();
      const focusSpy = spy();
      harness.delegate.onFocus(focusSpy);

      harness.component.focus();

      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should notify blur events', () => {
      harness = new SelectComponentDelegateHarness();
      const blurSpy = spy();
      harness.delegate.onBlur(blurSpy);

      harness.component.focus();
      harness.component.blur();

      expect(blurSpy.calledOnce).to.be.true;
    });
  });

  describe('dynamic property updates', () => {
    it('should update disabled state via delegate method', () => {
      harness = new SelectComponentDelegateHarness();

      harness.delegate.disabled = true;

      expect(harness.component.disabled).to.be.true;
    });
  });
});

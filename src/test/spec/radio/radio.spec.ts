import { defineRadioComponent, RADIO_CONSTANTS, IRadioComponent } from '@tylertech/forge/radio';
import { removeElement, getShadowElement, getLightElement, getActiveElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestRadioContext
}

interface ITestRadioContext {
  component: IRadioComponent;
  components: IRadioComponent[];
  getRootElement(): HTMLElement;
  getNativeElement(): HTMLInputElement;
  getNativeLabelElement(): HTMLLabelElement;
  destroy(): void;
}

describe('RadioComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    defineRadioComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with multiple radios', function(this: ITestContext) {
    it('should be connected', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.components.every(c => c.isConnected)).toBe(true);
    });

    it('should not be checked by default', function(this: ITestContext) {
      this.context = setupTestContext();
      const allUnchecked = !this.context.components.every(c => {
        const input = c.querySelector('input') as HTMLInputElement;
        return input.checked;
      });
      expect(allUnchecked).toBe(true);
    });

    it('should add the "label" slot to label elements', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      const labelElement = getLightElement(this.context.components[0], RADIO_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
      expect(labelElement).toBeDefined('label element was expected to be defined');
      expect(labelElement.getAttribute('slot')).toBeDefined('label element\'s slot attribute should be defined');
      expect(labelElement.getAttribute('slot')).toBe('label', 'label element\'s slot attribute should be set to "label"');
    });
  });

  describe('incremental rendering', function(this: ITestContext) {
    it('should instantiate component with shadow dom', function(this: ITestContext) {
      this.context = setupTestContext(false, false);
      const component = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
      expect(component.shadowRoot).toBeDefined();
      removeElement(component);
    });
  });

  describe('when there is no input', function(this: ITestContext) {
    it('should not initialize if input not specified', async function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.ENABLED)).toBe(false, 'should not have enabled class applied');
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.DISABLED)).toBe(false, 'should not have disabled class applied');
    });

    describe('then when input is added', function(this: ITestContext) {
      it('should initialize', async function(this: ITestContext) {
        this.context = setupTestContext(true, false);
        const input = document.createElement('input');
        input.type = 'radio';
        this.context.component.appendChild(input);
        await tick();
        expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.ENABLED)).toBe(true, 'should not have enabled class applied');
        expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.DISABLED)).toBe(false, 'should not have disabled class applied');
        expect(this.context.component.isConnected).toBeTrue();
      });
    });
  });

  describe('density', function(this: ITestContext) {
    it('should be non-dense by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.dense).toBe(false, 'Property was not set to false');
      expect(this.context.component.hasAttribute(RADIO_CONSTANTS.attributes.DENSE)).toBe(false, 'Attribute was not set to false');
    });

    it('should set dense property and attribute to true when dense property is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.dense = true;
      expect(this.context.component.dense).toBe(true, 'Property was not set to true');
      expect(this.context.component.hasAttribute(RADIO_CONSTANTS.attributes.DENSE)).toBe(true, 'Attribute was not set to true');
    });

    it('should set dense property and attribute to true when dense attribute is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(RADIO_CONSTANTS.attributes.DENSE, '');
      expect(this.context.component.dense).toBe(true, 'Property was not set to true');
      expect(this.context.component.hasAttribute(RADIO_CONSTANTS.attributes.DENSE)).toBe(true, 'Attribute was not set to true');
    });
  });

  describe('checked', function(this: ITestContext) {
    it('should set checked property and class to true by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      const isChecked = true;
      await tick();
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.CHECKED)).toBe(isChecked, 'Checked class was not applied');
      expect(this.context.getNativeElement().checked).toBe(isChecked, `Input checked state does not match ${isChecked}`);
    });

    it('should set checked property and class when checked property is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      const isChecked = false;
      const nativeInput = this.context.getNativeElement();
      nativeInput.checked = isChecked;
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.CHECKED)).toBe(isChecked, 'Checked class was applied');
      expect(nativeInput.checked).toBe(isChecked, `Input checked state does not match ${isChecked}`);
    });

    it('should set checked property and class when checked property is set to false and then true', async function(this: ITestContext) {
      this.context = setupTestContext();
      let isChecked = false;
      const nativeInput = this.context.getNativeElement();
      nativeInput.checked = isChecked;
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.CHECKED)).toBe(isChecked, 'Checked class was applied');
      expect(nativeInput.checked).toBe(isChecked, `Input checked state does not match ${isChecked}`);
      await tick();
      isChecked = true;
      nativeInput.checked = isChecked;
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.CHECKED)).toBe(isChecked, 'Checked class was not applied');
      expect(nativeInput.checked).toBe(isChecked, `Input checked state does not match ${isChecked}`);
    });
  });

  describe('disabled', function(this: ITestContext) {
    const disabledColor = 'rgba(0, 0, 0, 0.38)';

    it('should set disabled property and class to false by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      const isDisabled = false;
      await tick();
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.DISABLED)).toBe(isDisabled, 'Disabled class was applied');
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.ENABLED)).toBe(!isDisabled, 'Enabled class was not applied');
      expect(this.context.getNativeElement().disabled).toBe(isDisabled, `Input disabled state does not match ${isDisabled}`);
    });

    it('should set disabled property and class when disabled property is set to true', async function(this: ITestContext) {
      this.context = setupTestContext();
      const isDisabled = true;
      const nativeInput = this.context.getNativeElement();
      nativeInput.disabled = isDisabled;
      await tick();
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.DISABLED)).toBe(isDisabled, 'Disabled class was not applied');
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.ENABLED)).toBe(!isDisabled, 'Enabled class was applied');
      expect(window.getComputedStyle(this.context.getNativeLabelElement()).color).toBe(disabledColor, 'Label does not have the correct disabled color');
      expect(nativeInput.disabled).toBe(isDisabled, `Input disabled state does not match ${isDisabled}`);
    });

    it('should set disabled property and class when disabled property is set to false and then true', async function(this: ITestContext) {
      this.context = setupTestContext();
      let isDisabled = false;
      const nativeInput = this.context.getNativeElement();
      const rootElement = this.context.getRootElement();
      const nativeLabel = this.context.getNativeLabelElement();
      nativeInput.disabled = isDisabled;
      await tick();
      expect(rootElement.classList.contains(RADIO_CONSTANTS.classes.DISABLED)).toBe(isDisabled, 'Disabled class was applied');
      expect(rootElement.classList.contains(RADIO_CONSTANTS.classes.ENABLED)).toBe(!isDisabled, 'Enabled class was not applied');
      expect(window.getComputedStyle(nativeLabel).color).not.toBe(disabledColor, 'Label does not have the correct disabled color');
      expect(nativeInput.disabled).toBe(isDisabled, `Input disabled state does not match ${isDisabled}`);

      isDisabled = true;
      nativeInput.disabled = isDisabled;
      await tick();
      expect(rootElement.classList.contains(RADIO_CONSTANTS.classes.DISABLED)).toBe(isDisabled, 'Disabled class was not applied');
      expect(rootElement.classList.contains(RADIO_CONSTANTS.classes.ENABLED)).toBe(!isDisabled, 'Enabled class was applied');
      expect(window.getComputedStyle(nativeLabel).color).toBe(disabledColor, 'Label does not have the correct disabled color');
      expect(nativeInput.disabled).toBe(isDisabled, `Input disabled state does not match ${isDisabled}`);
    });
  });

  describe('focus/blur', function(this: ITestContext) {
    it('should add focused class on root when component is focused', async function(this: ITestContext) {
      this.context = setupTestContext();
      const nativeInput = this.context.getNativeElement();
      nativeInput.blur();
      await tick();
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.FOCUSED)).toBe(false, `Root has focused class`);
      nativeInput.focus();
      await tick();
      const activeElement = getActiveElement();
      expect(activeElement).toBe(nativeInput, 'Native input was not the focused element');
      expect(this.context.getRootElement().classList.contains('forge-radio--focused')).toBe(true, `Root does not have focused class`);
    });

    it('should remove focused class on root when component is blurred', async function(this: ITestContext) {
      this.context = setupTestContext();
      const nativeInput = this.context.getNativeElement();
      nativeInput.focus();
      await tick();
      const activeElement = getActiveElement();
      expect(activeElement).toBe(nativeInput, 'Native input was not the focused element');
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.FOCUSED)).toBe(true, `Root does not have focused class`);
      nativeInput.blur();
      await tick();
      expect(this.context.getRootElement().classList.contains(RADIO_CONSTANTS.classes.FOCUSED)).toBe(false, `Root has focused class`);
    });
  });

  function setupTestContext(hasGroup = true, hasInput = true): ITestRadioContext {
    const fixture = document.createElement('div');
    fixture.id = 'radio-no-input-test-fixture';
    let radios: IRadioComponent[];
    if (hasGroup) {
      const group = createGroup();    
      radios = createRadioList(hasInput);
      radios.forEach(r => group.appendChild(r));
      fixture.appendChild(group);
    } else {
      radios = createRadioList(hasInput);
      radios.forEach(r => fixture.appendChild(r));
    }
    document.body.appendChild(fixture);
    return {
      component: radios[0],
      components: radios,
      getRootElement: () => getShadowElement(radios[0], RADIO_CONSTANTS.selectors.RADIO),
      getNativeElement: () => radios[0].querySelector(RADIO_CONSTANTS.selectors.RADIO_INPUT) as HTMLInputElement,
      getNativeLabelElement: () => radios[0].querySelector(RADIO_CONSTANTS.selectors.LABEL) as HTMLLabelElement,
      destroy: () => removeElement(fixture)
    };
  }
  
  function createGroup(): HTMLElement {
    const group = document.createElement('div');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', 'Choose radio option');
    return group;
  }

  function createRadioList(hasInput = true): IRadioComponent[] {
    const list: IRadioComponent[] = [];
    for (let i = 0; i < 3; i++) {
      const num = i + 1;
      const radio = createRadio(`input-radio-0${num}`, `Option 0${num}`, i === 0, hasInput);
      list.push(radio);
    }
    return list;
  }

  function createRadio(id: string, text: string, isChecked = false, hasInput = true) {
    const radio = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
    if (hasInput) {
      const input = document.createElement('input') as HTMLInputElement;
      input.type = 'radio';
      input.id = id;
      input.name = 'radios';
      if (isChecked) {
        input.setAttribute('checked', '');
      }
      radio.appendChild(input);
    }
    const label = document.createElement('label') as HTMLLabelElement;
    label.setAttribute('for', id);
    label.textContent = text;
    radio.appendChild(label);
    return radio;
  }

});

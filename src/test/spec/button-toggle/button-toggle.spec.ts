import {
  defineButtonToggleGroupComponent,
  defineButtonToggleComponent,
  BUTTON_TOGGLE_GROUP_CONSTANTS,
  BUTTON_TOGGLE_CONSTANTS,
  IButtonToggleGroupComponent,
  IButtonToggleComponent,
  ButtonToggleGroupComponent,
  ButtonToggleComponent,
  IButtonToggleOption
} from '@tylertech/forge/button-toggle';
import { removeElement, getShadowElement, getActiveElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';

const DEFAULT_OPTIONS: IButtonToggleOption[] = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
];

interface ITestContext {
  context: ITestButtonToggleContext;
}

interface ITestButtonToggleContext {
  component: IButtonToggleGroupComponent;
  append(): void;
  destroy(): void;
}

describe('ButtonToggleComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineButtonToggleGroupComponent();
    defineButtonToggleComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with dynamic toggle-button', function(this: ITestContext) {
    it('should toggle dynamically added buttons', async function(this: ITestContext) {
      this.context = setupPartialTestContext(false);
      this.context.component.setAttribute('value', 'one');
      this.context.append();
      await tick();
      const toggleOne = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
      toggleOne.setAttribute('value', 'one');
      const toggleTwo = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
      toggleTwo.setAttribute('value', 'two');
      this.context.component.appendChild(toggleOne);
      this.context.component.appendChild(toggleTwo);
      await tick();

      expect(toggleOne.selected).toBe(true);
      expect(toggleTwo.selected).toBe(false);
    });
  })

  describe('with imperative instantiation', function(this: ITestContext) {
    it('should create toggle elements via options property', function(this: ITestContext) {
      this.context = setupPartialTestContext(true);
      this.context.component.options = DEFAULT_OPTIONS;
      const toggles = _getButtonToggles(this.context.component);

      expect(this.context.component.options).toEqual(DEFAULT_OPTIONS);
      expect(toggles.length).toBe(3);
      _expectButtonState(toggles[0], false);
      _expectButtonState(toggles[1], false);
      _expectButtonState(toggles[2], false);
      expect(toggles[0].value).toBe('one');
      expect(toggles[1].value).toBe('two');
      expect(toggles[2].value).toBe('three');
    });

    it('should create button toggles if set before connecting', function(this: ITestContext) {
      this.context = setupPartialTestContext();
      this.context.component.options = DEFAULT_OPTIONS;
      this.context.append();
      const toggles = _getButtonToggles(this.context.component);

      expect(this.context.component.options).toEqual(DEFAULT_OPTIONS);
      expect(toggles.length).toBe(3);
    });

    it('should create button toggles with leading icon', function(this: ITestContext) {
      this.context = setupPartialTestContext(true);
      this.context.component.options = [
        { ...DEFAULT_OPTIONS[0], leadingIcon: 'heart' }
      ];
      const toggles = _getButtonToggles(this.context.component);
      const icon = toggles[0].querySelector('i[slot=leading]') as HTMLElement;

      expect(icon).not.toBeNull();
      expect(icon.textContent).toBe('heart');
    });

    it('should create button toggles with trailing icon', function(this: ITestContext) {
      this.context = setupPartialTestContext(true);
      this.context.component.options = [
        { ...DEFAULT_OPTIONS[0], trailingIcon: 'settings' }
      ];
      const toggles = _getButtonToggles(this.context.component);
      const icon = toggles[0].querySelector('i[slot=trailing]') as HTMLElement;

      expect(icon).not.toBeNull();
      expect(icon.textContent).toBe('settings');
    });

    it('should create icon in place of label', function(this: ITestContext) {
      this.context = setupPartialTestContext(true);
      this.context.component.options = [
        { value: 'one', icon: 'settings' }
      ];
      const toggles = _getButtonToggles(this.context.component);
      const icon = toggles[0].querySelector('i:not([slot])') as HTMLElement;

      expect(icon).not.toBeNull();
      expect(icon.textContent).toBe('settings');
    });

    it('should set stretch attribute by default on dynamic button-toggle elements', function(this: ITestContext) {
      this.context = setupPartialTestContext(false);
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH, '');
      this.context.append();

      const toggleOne = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
      const toggleTwo = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
      this.context.component.appendChild(toggleOne);
      this.context.component.appendChild(toggleTwo);

      expect(this.context.component.stretch).toBe(true);
      expect(toggleOne.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH)).toBe(true);
      expect(toggleTwo.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH)).toBe(true);
    });

    it('should set selected by default via attribute', async function(this: ITestContext) {
      this.context = setupPartialTestContext(false);
      this.context.append();
      
      await tick();
      
      const toggleOne = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
      toggleOne.value = 1;
      toggleOne.setAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED, '');
      this.context.component.appendChild(toggleOne);
      
      const toggleTwo = document.createElement(BUTTON_TOGGLE_CONSTANTS.elementName) as IButtonToggleComponent;
      this.context.component.appendChild(toggleTwo);

      await tick();
      
      expect(this.context.component.value).toBe(1);
      expect(toggleOne.hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED)).toBeTrue();
    });

    it('should emit change event', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const changeSpy = jasmine.createSpy('forge-button-toggle-group-change spy');
      this.context.component.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

      const toggles = _getButtonToggles(this.context.component);
      _clickToggle(toggles[1]);

      expect(changeSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: DEFAULT_OPTIONS[1].value }));
    });

    it('should emit change event when toggling button', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const changeSpy = jasmine.createSpy('forge-button-toggle-group-change spy');
      this.context.component.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

      const toggles = _getButtonToggles(this.context.component);
      _clickToggle(toggles[1]);
      _clickToggle(toggles[1]);

      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: DEFAULT_OPTIONS[1].value }));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
    });

    it('should emit change event with multiple', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.multiple = true;

      const changeSpy = jasmine.createSpy('forge-button-toggle-group-change spy');
      this.context.component.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

      const toggles = _getButtonToggles(this.context.component);
      _clickToggle(toggles[1]);
      _clickToggle(toggles[2]);

      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: [DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value] }));
    });

    it('should emit select event', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const selectSpy = jasmine.createSpy('forge-button-toggle-select spy');
      this.context.component.addEventListener(BUTTON_TOGGLE_CONSTANTS.events.SELECT, selectSpy);

      const toggles = _getButtonToggles(this.context.component);
      _clickToggle(toggles[1]);

      expect(selectSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: { value: DEFAULT_OPTIONS[1].value, selected: true }}));
    });

    it('should emit select event when toggling button', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const selectSpy = jasmine.createSpy('forge-button-toggle-select spy');
      this.context.component.addEventListener(BUTTON_TOGGLE_CONSTANTS.events.SELECT, selectSpy);

      const toggles = _getButtonToggles(this.context.component);
      _clickToggle(toggles[1]);
      _clickToggle(toggles[1]);

      expect(selectSpy).toHaveBeenCalledTimes(2);
      expect(selectSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: { value: DEFAULT_OPTIONS[1].value, selected: true }}));
      expect(selectSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: { value: DEFAULT_OPTIONS[1].value, selected: false }}));
    });
  });

  describe('as static HTML', function(this: ITestContext) {
    beforeEach(function(this: ITestContext) {
      this.context = setupTestContext(true);
    });

    it('should connect', function(this: ITestContext) {
      expect(this.context.component instanceof ButtonToggleGroupComponent).toBe(true);
      const buttonToggles = _getButtonToggles(this.context.component);
      expect(buttonToggles.every(bt => bt instanceof ButtonToggleComponent)).toBe(true);
    });


    it('should have initial values set', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      expect(buttonToggles[0].value).toBe('one');
      expect(buttonToggles[1].value).toBe('two');
      expect(buttonToggles[2].value).toBe('three');
    });

    it('should select button when setting group value', function(this: ITestContext) {
      this.context.component.value = 'one';
      const buttonToggles = _getButtonToggles(this.context.component);

      _expectButtonState(buttonToggles[0], true);
      _expectButtonState(buttonToggles[1], false);
      _expectButtonState(buttonToggles[2], false);
    });

    it('should select button individually', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].selected = true;

      _expectButtonState(buttonToggles[0], true);
      expect(this.context.component.value).toBe('one');
    });

    it('should select button when clicked', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      _clickToggle(buttonToggles[0]);

      _expectButtonState(buttonToggles[0], true);
      expect(this.context.component.value).toBe('one');
    });

    it('should toggle button individually', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].selected = true;
      _expectButtonState(buttonToggles[0], true);

      buttonToggles[0].selected = false;
      _expectButtonState(buttonToggles[0], false);
    });

    it('should toggle button when clicked', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      _clickToggle(buttonToggles[0]);
      _expectButtonState(buttonToggles[0], true);

      _clickToggle(buttonToggles[0]);
      _expectButtonState(buttonToggles[0], false);
    });

    it('should select multiple buttons via group', function(this: ITestContext) {
      this.context.component.multiple = true;
      const buttonToggles = _getButtonToggles(this.context.component);
      this.context.component.value = [buttonToggles[0].value, buttonToggles[1].value];
      
      expect(this.context.component.multiple).toBe(true);
      expect(this.context.component.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE)).toBe('true');
      _expectButtonState(buttonToggles[0], true);
      _expectButtonState(buttonToggles[1], true);
    });

    it('should select multiple buttons when clicked', function(this: ITestContext) {
      this.context.component.multiple = true;
      const buttonToggles = _getButtonToggles(this.context.component);

      _clickToggle(buttonToggles[0]);
      _clickToggle(buttonToggles[1]);

      expect(this.context.component.value).toEqual([buttonToggles[0].value, buttonToggles[1].value]);
      _expectButtonState(buttonToggles[0], true);
      _expectButtonState(buttonToggles[1], true);
    });

    it('should disallow unselecting button when mandatory is on', function(this: ITestContext) {
      this.context.component.mandatory = true;
      const buttonToggles = _getButtonToggles(this.context.component);
      _clickToggle(buttonToggles[0]);
      expect(this.context.component.mandatory).toBe(true);
      _expectButtonState(buttonToggles[0], true);

      _clickToggle(buttonToggles[0]);
      _expectButtonState(buttonToggles[0], true);
    });

    it('should disable button', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      const buttonElement = _getButtonElement(buttonToggles[0]);
      expect(buttonElement.disabled).toBe(false);

      buttonToggles[0].disabled = true;
      expect(buttonElement.disabled).toBe(true);

      _clickToggle(buttonToggles[0]);
      _expectButtonState(buttonToggles[0], false);
    });

    it('should toggle disabled', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].disabled = true;
      buttonToggles[0].disabled = false;

      const buttonElement = _getButtonElement(buttonToggles[0]);
      expect(buttonElement.disabled).toBe(false);
      expect(buttonToggles[0].disabled).toBe(false);
    });

    it('should set dense via attribute', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].setAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.DISABLED, 'true');

      const buttonElement = _getButtonElement(buttonToggles[0]);
      expect(buttonElement.disabled).toBe(true);
      expect(buttonToggles[0].hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(buttonToggles[0].disabled).toBe(true);
    });

    it('should set dense', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].dense = true;
      const buttonElement = _getButtonElement(buttonToggles[0]);
      expect(buttonElement.classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
      expect(buttonToggles[0].dense).toBe(true);
    });

    it('should toggle dense', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].dense = true;
      buttonToggles[0].dense = false;
      const buttonElement = _getButtonElement(buttonToggles[0]);
      expect(buttonElement.classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(false);
      expect(buttonToggles[0].dense).toBe(false);
    });

    it('should set dense via attribute', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[0].setAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.DENSE, 'true');

      const buttonElement = _getButtonElement(buttonToggles[0]);
      expect(buttonElement.classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
      expect(buttonToggles[0].hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(buttonToggles[0].dense).toBe(true);
    });

    it('should set focus to internal button element', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[1].focus();
      const activeElement = getActiveElement();
      expect(activeElement).toBe(_getButtonElement(buttonToggles[1]));
    });

    it('should set aria-label on internal button element', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      buttonToggles[1].setAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.BUTTON_ARIA_LABEL, 'test');
      const buttonElement = _getButtonElement(buttonToggles[1]);
      expect(buttonElement.getAttribute('aria-label')).toBe('test');
    });

    it('should toggle between buttons', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);
      _clickToggle(buttonToggles[0]);
      _clickToggle(buttonToggles[2]);

      _expectButtonState(buttonToggles[0], false);
      _expectButtonState(buttonToggles[2], true);
    });

    it('should apply disabled state to all buttons via group', function(this: ITestContext) {
      this.context.component.disabled = true;

      expect(this.context.component.disabled).toBe(true);
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED)).toBe(true);
      const buttonToggles = _getButtonToggles(this.context.component);
      expect(buttonToggles[0].disabled).toBe(true);
      expect(_getButtonElement(buttonToggles[0]).disabled).toBe(true);
      expect(buttonToggles[1].disabled).toBe(true);
      expect(_getButtonElement(buttonToggles[1]).disabled).toBe(true);
      expect(buttonToggles[2].disabled).toBe(true);
      expect(_getButtonElement(buttonToggles[2]).disabled).toBe(true);

      this.context.component.disabled = false;

      expect(this.context.component.disabled).toBe(false);
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED)).toBe(false);
      expect(buttonToggles[0].disabled).toBe(false);
      expect(buttonToggles[1].disabled).toBe(false);
      expect(buttonToggles[2].disabled).toBe(false);
    });

    it('should apply disabled state to all buttons via group attribute', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED, 'true');
      const buttonToggles = _getButtonToggles(this.context.component);

      expect(this.context.component.disabled).toBe(true);
      expect(buttonToggles[0].disabled).toBe(true);
      expect(_getButtonElement(buttonToggles[0]).disabled).toBe(true);
      expect(buttonToggles[1].disabled).toBe(true);
      expect(_getButtonElement(buttonToggles[1]).disabled).toBe(true);
      expect(buttonToggles[2].disabled).toBe(true);
      expect(_getButtonElement(buttonToggles[2]).disabled).toBe(true);
    });

    it('should apply dense state to all buttons via group', function(this: ITestContext) {
      this.context.component.dense = true;
      const buttonToggles = _getButtonToggles(this.context.component);

      expect(this.context.component.dense).toBe(true);
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(buttonToggles[0].dense).toBe(true);
      expect(_getButtonElement(buttonToggles[0]).classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
      expect(buttonToggles[1].dense).toBe(true);
      expect(_getButtonElement(buttonToggles[1]).classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
      expect(buttonToggles[2].dense).toBe(true);
      expect(_getButtonElement(buttonToggles[2]).classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);

      this.context.component.dense = false;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE)).toBe(false);
      expect(buttonToggles[0].dense).toBe(false);
      expect(buttonToggles[1].dense).toBe(false);
      expect(buttonToggles[2].dense).toBe(false);
    });

    it('should set group to dense via attribute', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE, 'true');
      const buttonToggles = _getButtonToggles(this.context.component);

      expect(this.context.component.dense).toBe(true);
      expect(buttonToggles[0].dense).toBe(true);
      expect(_getButtonElement(buttonToggles[0]).classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
      expect(buttonToggles[1].dense).toBe(true);
      expect(_getButtonElement(buttonToggles[1]).classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
      expect(buttonToggles[2].dense).toBe(true);
      expect(_getButtonElement(buttonToggles[2]).classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should stretch button toggle group to 100% width', function(this: ITestContext) {
      this.context.component.stretch = true;
      const rootElement = getShadowElement(this.context.component, BUTTON_TOGGLE_GROUP_CONSTANTS.selectors.ROOT);

      expect(this.context.component.stretch).toBe(true);
      expect(rootElement.classList.contains(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.STRETCH)).toBe(true);
    });

    it('should set group to stretch via attribute', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH, 'true');
      const rootElement = getShadowElement(this.context.component, BUTTON_TOGGLE_GROUP_CONSTANTS.selectors.ROOT);

      expect(this.context.component.stretch).toBe(true);
      expect(rootElement.classList.contains(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.STRETCH)).toBe(true);
    });

    it('should set group to vertical', function(this: ITestContext) {
      this.context.component.vertical = true;
      const rootElement = getShadowElement(this.context.component, BUTTON_TOGGLE_GROUP_CONSTANTS.selectors.ROOT);

      expect(this.context.component.vertical).toBe(true);
      expect(rootElement.classList.contains(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.VERTICAL)).toBe(true);
    });

    it('should set group to vertical via attribute', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL, 'true');
      const rootElement = getShadowElement(this.context.component, BUTTON_TOGGLE_GROUP_CONSTANTS.selectors.ROOT);

      expect(this.context.component.vertical).toBe(true);
      expect(rootElement.classList.contains(BUTTON_TOGGLE_GROUP_CONSTANTS.classes.VERTICAL)).toBe(true);
    });

    it('should set value of group via attribute', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE, 'one');
      const buttonToggles = _getButtonToggles(this.context.component);

      expect(this.context.component.value).toBe('one');
      expect(buttonToggles[0].selected).toBe(true);
    });

    it('should set value of group via attribute when using multiple', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE, 'one');
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE, 'one');
      const buttonToggles = _getButtonToggles(this.context.component);

      expect(this.context.component.value).toEqual(['one']);
      expect(buttonToggles[0].selected).toBe(true);
    });

    it('should take first value in array if multiple is off when setting value', function(this: ITestContext) {
      const buttonToggles = _getButtonToggles(this.context.component);;
      this.context.component.value = [buttonToggles[0].value, buttonToggles[1].value]

      expect(this.context.component.value).toEqual(buttonToggles[0].value);
      expect(buttonToggles[0].selected).toBe(true);
    });

    it('should set mandatory via group attribute', function(this: ITestContext) {
      this.context.component.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY, 'true');

      expect(this.context.component.mandatory).toEqual(true);
    });

    it('should mirror multiple group property/attribute', function(this: ITestContext) {
      this.context.component.multiple = true;
      expect(this.context.component.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE)).toBe('true');

      this.context.component.multiple = false;
      expect(this.context.component.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE)).toBe('false');
    });

    it('should mirror mandatory group property/attribute', function(this: ITestContext) {
      this.context.component.mandatory = true;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY)).toBe(true);

      this.context.component.mandatory = false;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY)).toBe(false);
    });

    it('should mirror vertical group property/attribute', function(this: ITestContext) {
      this.context.component.vertical = true;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL)).toBe(true);

      this.context.component.vertical = false;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL)).toBe(false);
    });

    it('should mirror stretch group property/attribute', function(this: ITestContext) {
      this.context.component.stretch = true;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH)).toBe(true);

      this.context.component.stretch = false;
      expect(this.context.component.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH)).toBe(false);
    });

    it('should ensure that adjacent selections receive properly styling', function(this: ITestContext) {
      this.context.component.multiple = true;
      const buttonToggles = _getButtonToggles(this.context.component);

      _clickToggle(buttonToggles[0]);
      _clickToggle(buttonToggles[1]);

      expect(buttonToggles[0].hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT)).toBe(false);
      expect(buttonToggles[1].hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT)).toBe(true);
    });

    it('should ensure that adjacent selections receive properly styling when vertical', function(this: ITestContext) {
      this.context.component.multiple = true;
      this.context.component.vertical = true;
      const buttonToggles = _getButtonToggles(this.context.component);

      _clickToggle(buttonToggles[0]);
      _clickToggle(buttonToggles[1]);

      expect(buttonToggles[0].hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT_VERTICAL)).toBe(false);
      expect(buttonToggles[1].hasAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED_ADJACENT_VERTICAL)).toBe(true);
    });
  });

  function setupPartialTestContext(append = false): ITestButtonToggleContext {
    const fixture = document.createElement('div');
    fixture.id = 'button-toggle-test-fixture';
    const component = document.createElement(BUTTON_TOGGLE_GROUP_CONSTANTS.elementName) as IButtonToggleGroupComponent;
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    }
  }

  function setupTestContext(append = false): ITestButtonToggleContext {
    const fixture = document.createElement('div');
    fixture.id = 'button-toggle-test-fixture';
    const component = document.createElement(BUTTON_TOGGLE_GROUP_CONSTANTS.elementName) as IButtonToggleGroupComponent;
    component.options = DEFAULT_OPTIONS;
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    }
  }

  function _expectButtonState(toggle: IButtonToggleComponent, isSelected: boolean): void {
    const buttonElement = _getButtonElement(toggle);
    expect(toggle.selected).toBe(isSelected);
    expect(buttonElement.getAttribute('aria-pressed')).toBe(isSelected.toString());
    expect(buttonElement.classList.contains(BUTTON_TOGGLE_CONSTANTS.classes.SELECTED)).toBe(isSelected);
  }

  function _getButtonElement(toggle: IButtonToggleComponent): HTMLButtonElement {
    return getShadowElement(toggle, BUTTON_TOGGLE_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
  }

  function _clickToggle(toggle: IButtonToggleComponent): void {
    const buttonElement = _getButtonElement(toggle);
    buttonElement.click();
  }

  function _getButtonToggles(group: IButtonToggleGroupComponent): IButtonToggleComponent[] {
    return Array.from(group.querySelectorAll(BUTTON_TOGGLE_CONSTANTS.elementName));
  }
});
import {
  ISelectComponent,
  SELECT_CONSTANTS,
  IOption,
  OPTION_CONSTANTS,
  defineSelectComponent,
  ISelectFoundation,
  IOptionComponent,
  IOptionGroup,
  SelectOptionBuilder,
  defineOptionComponent,
  defineOptionGroupComponent,
  BASE_SELECT_CONSTANTS,
  OPTION_GROUP_CONSTANTS
} from '@tylertech/forge/select';
import { POPUP_CONSTANTS, IPopupComponent } from '@tylertech/forge/popup';
import { LIST_ITEM_CONSTANTS, IListItemComponent } from '@tylertech/forge/list/list-item';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { tick, dispatchNativeEvent, dispatchKeyEvent, timer, deepCopy } from '@tylertech/forge-testing';
import { FLOATING_LABEL_CONSTANTS } from '@tylertech/forge/floating-label';
import { LIST_DROPDOWN_CONSTANTS, ListDropdownHeaderBuilder, ListDropdownFooterBuilder } from '@tylertech/forge/list-dropdown/list-dropdown-constants';
import { tryCleanupPopups } from '../../utils';
import { FIELD_CONSTANTS } from '@tylertech/forge/field/field-constants';
import { floatTick } from '../../utils/floating-label-utils';

const DEFAULT_OPTIONS: IOption[] = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
];

const DEFAULT_OPTION_GROUPS: IOptionGroup[] = [
  {
    text: 'Group one',
    options: [
      { value: 'one', label: 'One' }
    ]
  },
  {
    text: 'Group two',
    options: [
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' }
    ]
  }
];

interface ITestContext {
  context: ITestSelectContext;
}

interface ITestSelectContext {
  fixture: HTMLElement;
  component: ISelectComponent;
  selectedTextElement: HTMLElement;
  label: HTMLLabelElement;
  foundation: ISelectFoundation;
  rootElement: HTMLElement;
  optionElements: IOptionComponent[];
  destroy(): void;
}

interface ITestOptionContext {
  activeOption: IListItemComponent | null;
  activeIndex: number | null;
  selectedOptions: IListItemComponent[];
  selectedIndexes: number[];
  options: IListItemComponent[];
}

interface ITestSelectGroup {
  text: string;
  optionElements: IListItemComponent[];
  options: IOption[];
}

describe('SelectComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineSelectComponent();
    defineOptionComponent();
    defineOptionGroupComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with imperative creation', function(this: ITestContext) {
    it('should connect with disabled set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.disabled = true;
      document.body.appendChild(this.context.component);

      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should connect with invalid set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.invalid = true;
      document.body.appendChild(this.context.component);

      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBe(true);
    });

    it('should float label if connected with always set', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.floatLabelType = 'always';
      document.body.appendChild(this.context.component);
      await floatTick();

      _expectLabelFloatState(this.context.component, true);
    });

    it('should create label and float it properly after connecting', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.label = '';
      document.body.appendChild(this.context.component);
      await tick();

      this.context.component.label = 'Test';
      this.context.component.value = DEFAULT_OPTIONS[0].value;
      await floatTick();

      expect(this.context.foundation['_floatingLabelInstance']).not.toBeUndefined();
      expect(this.context.label.textContent).toBe('Test');
      _expectLabelFloatState(this.context.component, true);
    });

    it('should set proper aria attribute if multiple by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.multiple = true;
      document.body.appendChild(this.context.component);

      expect(this.context.component.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should set proper aria attribute if required by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.required = true;
      document.body.appendChild(this.context.component);

      expect(this.context.component.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('as static HTML', function(this: ITestContext) {
    it('should have default option elements', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const optionElements = Array.from(this.context.component.querySelectorAll(OPTION_CONSTANTS.elementName)) as IOptionComponent[];
      const options = (<IOption[]>this.context.component.options)
                          .map((o: IOption) => ({ label: o.label, value: o.value }));

      expect(options).toEqual(DEFAULT_OPTIONS);
      expect(optionElements.length).toBe(DEFAULT_OPTIONS.length);
      expect(optionElements[0].value).toBe(DEFAULT_OPTIONS[0].value);
      expect(optionElements[1].value).toBe(DEFAULT_OPTIONS[1].value);
      expect(optionElements[2].value).toBe(DEFAULT_OPTIONS[2].value);
      expect(optionElements[0].textContent).toBe(DEFAULT_OPTIONS[0].label);
      expect(optionElements[1].textContent).toBe(DEFAULT_OPTIONS[1].label);
      expect(optionElements[2].textContent).toBe(DEFAULT_OPTIONS[2].label);
    });

    it('should float label when type set to always', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();

      this.context.component.floatLabelType = 'always';
      await floatTick();
      
      expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE)).toBe('always');
      expect(this.context.component.floatLabelType).toBe('always');
      _expectLabelFloatState(this.context.component, true);
    });

    it('should float label when type set to always via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();

      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL_TYPE, 'always');
      await floatTick();
      
      expect(this.context.component.floatLabelType).toBe('always');
      _expectLabelFloatState(this.context.component, true);
    });

    it('should set placeholder text via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();

      this.context.component.placeholder = 'test';
      
      expect(this.context.component.placeholder).toBe('test');
      expect(this.context.selectedTextElement.getAttribute('placeholder')).toBe('test');
    });
    
    it('should set placeholder text', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.PLACEHOLDER, 'test placeholder');
      
      expect(this.context.component.placeholder).toBe('test placeholder');
      expect(this.context.selectedTextElement.getAttribute('placeholder')).toBe('test placeholder');
    });

    it('should detect and render icon in leading slot by default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const leadingIcon = document.createElement('i');
      leadingIcon.textContent = 'face';
      leadingIcon.classList.add('material-icons');
      leadingIcon.slot = 'leading';
      this.context.component.appendChild(leadingIcon);
      
      const leadingSlot = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.LEADING_SLOT) as HTMLSlotElement;

      expect(leadingSlot.assignedNodes().length).toBe(1);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.LEADING));
    });

    it('should listen for leading slot change', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const selectElement = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.ROOT);
      const leadingSlot = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.LEADING_SLOT) as HTMLSlotElement;

      expect(leadingSlot.assignedNodes().length).toBe(0);
      expect(selectElement.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBe(false);

      await tick();

      const leadingIcon = document.createElement('i');
      leadingIcon.textContent = 'face';
      leadingIcon.classList.add('material-icons');
      leadingIcon.slot = 'leading';
      this.context.component.appendChild(leadingIcon);

      await tick();

      expect(leadingSlot.assignedNodes().length).toBe(1);
      expect(selectElement.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBe(true);
      
      removeElement(leadingIcon);
      await tick();

      expect(leadingSlot.assignedNodes().length).toBe(0);
      expect(selectElement.classList.contains(FIELD_CONSTANTS.classes.LEADING)).toBe(false);
    });

    it('should float label when focused', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      
      await tick();
      dispatchNativeEvent(this.context.component, 'focus');
      await floatTick();
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.FOCUSED)).toBe(true);
      expect(this.context.label.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE)).toBe(true);
    });

    it('should not open popup when options aren\'t defined', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.options = [];
      await tick();
      _openDropdown(this.context.component);
      await tick();
      expect(this.context.component.popupElement).toBeUndefined();
    });

    ['Space'].forEach(key => {
      it(`should open dropdown when ${key} key is pressed when focused`, async function(this: ITestContext) {
        this.context = setupTestContext(true);
        await tick();
      
        this.context.component.options = DEFAULT_OPTIONS;
        await tick();
        dispatchNativeEvent(this.context.component, 'focus');
        await tick();
        dispatchKeyEvent(this.context.component, 'keydown', key);
        await tick();
        expect(this.context.component.popupElement).toBeDefined();
        expect(this.context.component.popupElement!.isConnected).toBe(true);
      });
    });

    it('should open dropdown when down arrow is pressed while focused in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.options = DEFAULT_OPTIONS;
      this.context.component.multiple = true;
      await tick();
      dispatchNativeEvent(this.context.component, 'focus');
      await tick();
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      await tick();
      expect(this.context.component.open).toBe(true);
      expect(this.context.component.popupElement).toBeDefined();
      expect(this.context.component.popupElement!.isConnected).toBe(true);
    });

    it('should disable component', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.disabled = true;
      
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should disable component via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.DISABLED, 'true');
      
      expect(this.context.component.disabled).toBe(true);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should toggle disabled', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.disabled = true;
      this.context.component.disabled = false;
      
      expect(this.context.component.disabled).toBe(false);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should set required', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.required = true;
      
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBe(true);
    });

    it('should set required via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.REQUIRED, 'true');
      
      expect(this.context.component.required).toBe(true);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBe(true);
    });

    it('should toggle required', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.required = true;
      this.context.component.required = false;
      
      expect(this.context.component.required).toBe(false);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.REQUIRED)).toBe(false);
    });

    it('should set invalid', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.invalid = true;
      
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBe(true);
    });

    it('should set invalid via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.INVALID, 'true');
      
      expect(this.context.component.invalid).toBe(true);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBe(true);
    });

    it('should toggle invalid', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.invalid = true;
      this.context.component.invalid = false;
      
      expect(this.context.component.invalid).toBe(false);
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.INVALID)).toBe(false);
    });

    it('should set density to dense', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.density = 'dense';
      
      expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.DENSITY)).toBe('dense');
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should set density to dense via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'dense');
      
      expect(this.context.component.density).toBe('dense');
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should set density to roomy', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.density = 'roomy';
      
      expect(this.context.component.getAttribute(FIELD_CONSTANTS.attributes.DENSITY)).toBe('roomy');
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBe(true);
    });

    it('should set density to roomy via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(FIELD_CONSTANTS.attributes.DENSITY, 'roomy');
      
      expect(this.context.component.density).toBe('roomy');
      expect(this.context.rootElement.classList.contains(FIELD_CONSTANTS.classes.ROOMY)).toBe(true);
    });

    it('should set multiple via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.MULTIPLE, 'true');
      
      expect(this.context.component.multiple).toBe(true);
    });

    it('should set focus to internal element', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.focus();
      
      expect(document.activeElement).toBe(this.context.component);
    });

    it('should handle removing label by destroying floating label instance', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.label = '';

      expect(this.context.foundation['_floatingLabelInstance']).toBeUndefined();
      expect(this.context.label.textContent).toBe('');
    });

    it('should not focus element if clicked when disabled', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.disabled = true;
      this.context.component.click();

      expect(document.activeElement).not.toBe(this.context.component);
    });

    it('should close dropdown if escape key is pressed while focused', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);

      dispatchKeyEvent(this.context.component, 'keydown', 'Escape');
      await _popupAnimation();
      
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should open popup when space is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.focus();
      dispatchKeyEvent(this.context.component, 'keydown', 'Space');
      await _popupAnimation();

      _expectPopupVisibility(this.context.component.popupElement, true);
    });

    it('should close popup when space is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);

      dispatchKeyEvent(this.context.component, 'keydown', 'Space');
      await _popupAnimation();

      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should select active option when enter key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toBeUndefined();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();

      expect(this.context.component.value).toBe(DEFAULT_OPTIONS[0].value);
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should select active option when the tab key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toBeUndefined();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Tab');
      await _popupAnimation();

      expect(this.context.component.value).toBe(DEFAULT_OPTIONS[0].value);
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should not select active option when the tab key is pressed in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.multiple = true;
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toEqual([]);

      dispatchKeyEvent(this.context.component, 'keydown', 'Tab');
      this.context.component.blur();
      await _popupAnimation();

      expect(this.context.component.value).toEqual([]);
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should not select active option when blurred', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toBeUndefined();

      this.context.component.blur();
      await _popupAnimation();

      expect(this.context.component.value).toBeUndefined();
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should not select option if change event is cancelled', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.addEventListener(BASE_SELECT_CONSTANTS.events.CHANGE, evt => evt.preventDefault());
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toBeUndefined();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();

      expect(this.context.component.value).toBeUndefined();
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should be able to retrieve value from change event target', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      let eventTargetValue: any;
      const changeSpy = jasmine.createSpy('change target value spy', evt => eventTargetValue = evt.target.value).and.callThrough();
      this.context.component.addEventListener(BASE_SELECT_CONSTANTS.events.CHANGE, changeSpy);
      await _triggerPopupOpen(this.context.component);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();

      expect(eventTargetValue).toBe(DEFAULT_OPTIONS[0].value);
    });

    it('should not select option if returning false from before change callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.beforeValueChange = value => false;
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toBeUndefined();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();

      expect(this.context.component.value).toBeUndefined();
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should not toggle option in multiple mode if returning false from before change callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.beforeValueChange = value => false;
      this.context.component.multiple = true;
      await _triggerPopupOpen(this.context.component);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();

      expect(this.context.component.value).toEqual([]);
      _expectPopupVisibility(this.context.component.popupElement, true);

      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      expect(listItems[0].selected).toBe(false);
    });

    it('should select option if returning true from before change callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.beforeValueChange = value => true;
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toBeUndefined();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();
      await timer();

      expect(this.context.component.value).toBe(DEFAULT_OPTIONS[0].value);
      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should pass desired value to change event', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const beforeChangeSpy = jasmine.createSpy('beforeValueChange spy', evt => {}).and.callThrough();
      this.context.component.addEventListener(BASE_SELECT_CONSTANTS.events.CHANGE, beforeChangeSpy);
      await _triggerPopupOpen(this.context.component);
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');

      expect(beforeChangeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: DEFAULT_OPTIONS[0].value }));
    });

    it('should pass desired value to before change callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const beforeChangeSpy = jasmine.createSpy('beforeValueChange spy', value => true).and.callThrough();
      this.context.component.beforeValueChange = beforeChangeSpy;
      await _triggerPopupOpen(this.context.component);
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');

      expect(beforeChangeSpy).toHaveBeenCalledWith(DEFAULT_OPTIONS[0].value);
    });

    it('should close popup programatically', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      await _popupAnimation();

      this.context.component.open = false;
      await _popupAnimation();

      _expectPopupVisibility(this.context.component.popupElement, false);
    });

    it('should toggle active item if enter is pressed while popup is open in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      await _triggerPopupOpen(this.context.component);
      expect(this.context.component.value).toEqual([]);
      
      // First we check to see if pressing enter selects the active option and keeps the popup open
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();
      
      expect(this.context.component.value).toEqual([DEFAULT_OPTIONS[0].value]);
      _expectPopupVisibility(this.context.component.popupElement, true);
      
      // Now we check to see if pressing enter deselects the active option
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowUp');
      dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
      await _popupAnimation();

      expect(this.context.component.value).toEqual([]);
      _expectPopupVisibility(this.context.component.popupElement, true);
    });

    it('should highlight next item when down arrow key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      _expectActiveOption(this.context.component.popupElement!, -1);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      _expectActiveOption(this.context.component.popupElement!, 0);
    });

    it('should highlight previous item when up arrow key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      _expectActiveOption(this.context.component.popupElement!, 0);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowUp');
      _expectActiveOption(this.context.component.popupElement!, DEFAULT_OPTIONS.length - 1);
    });

    it('should highlight last item when up arrow key is pressed on first item', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();

      await _triggerPopupOpen(this.context.component);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowUp');

      const optionContext = _getOptionContext(this.context.component.popupElement);
      _expectActiveOption(this.context.component.popupElement, optionContext.options.length - 1);
    });

    it('should highlight first item when down arrow key is pressed on last item', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      dispatchKeyEvent(this.context.component, 'keydown', 'End');
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');

      _expectActiveOption(this.context.component.popupElement, 0);
    });

    it('should highlight last item when end key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'End');

      const optionContext = _getOptionContext(this.context.component.popupElement);
      _expectActiveOption(this.context.component.popupElement, optionContext.options.length - 1);
    });

    it('should highlight first item when home key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      dispatchKeyEvent(this.context.component, 'keydown', 'End');
      _expectActiveOption(this.context.component.popupElement, 2);
      
      dispatchKeyEvent(this.context.component, 'keydown', 'Home');

      _expectActiveOption(this.context.component.popupElement, 0);
    });

    it('should skip disabled items when using down arrow key to highlight next item', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      // Replace curent options, but disable the second option
      const opts = deepCopy(DEFAULT_OPTIONS);
      opts[1].disabled = true;
      this.context.component.options = opts;

      await _triggerPopupOpen(this.context.component);
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      
      _expectActiveOption(this.context.component.popupElement, 2);
    });
    
    it('should skip disabled items when using up arrow key to highlight previous item', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      // Replace curent options, but disable the second option
      const opts = deepCopy(DEFAULT_OPTIONS);
      opts[1].disabled = true;
      this.context.component.options = opts;

      await _triggerPopupOpen(this.context.component);
      dispatchKeyEvent(this.context.component, 'keydown', 'End');
      _expectActiveOption(this.context.component.popupElement, 2);

      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowUp');      
      _expectActiveOption(this.context.component.popupElement, 0);
    });

    it('should highlight first match when filtering while popup is open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      
      _sendFilterKey(this.context.component, 't', 84);
      await timer();

      _expectActiveOption(this.context.component.popupElement, 1);
      _expectPopupVisibility(this.context.component.popupElement, true);
    });

    it('should highlight first match when filtering with uppercase characters', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      
      _sendFilterKey(this.context.component, 'T', 84);
      await timer();

      _expectActiveOption(this.context.component.popupElement, 1);
      _expectPopupVisibility(this.context.component.popupElement, true);
    });
    
    it('should highlight match when filtering quickly while popup is open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      
      _sendFilterKey(this.context.component, 't', 84);
      _sendFilterKey(this.context.component, 'h', 72);
      await timer();

      _expectActiveOption(this.context.component.popupElement, 2);
    });

    it('should select first match when filtering with popup closed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      _sendFilterKey(this.context.component, 't', 84);
      await timer();
      
      expect(this.context.component.value).toBe(DEFAULT_OPTIONS[1].value);
    });

    it('should stop filtering if non-filterable character entered after filterable character', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      _sendFilterKey(this.context.component, 't', 84);
      dispatchKeyEvent(this.context.component, 'keydown', 'End');
      await timer();
      
      expect(this.context.foundation['_filterTimeout']).toBeUndefined();
    });

    it('should open popup if arrow down key is pressed while popup is closed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      await timer();
      
      _expectPopupVisibility(this.context.component.popupElement, true);
      expect(this.context.component.open).toBeTrue();
      expect(this.context.component.value).toBeUndefined();
    });

    it('should open popup if arrow up key is pressed while popup is closed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowUp');
      await timer();
      
      _expectPopupVisibility(this.context.component.popupElement, true);
      expect(this.context.component.open).toBeTrue();
      expect(this.context.component.value).toBeUndefined();
    });

    it('should not select item if arrow key is pressed while popup is closed in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowUp');
      dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
      await timer();
      
      expect(this.context.component.value).toEqual([]);
    });

    it('should change selected value properly', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.value = DEFAULT_OPTIONS[1].value;
      this.context.component.value = DEFAULT_OPTIONS[2].value;
      
      expect(this.context.component.value).toBe(DEFAULT_OPTIONS[2].value);
    });

    it('should change selected value properly in multiple', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      this.context.component.value = DEFAULT_OPTIONS[1].value;
      this.context.component.value = [DEFAULT_OPTIONS[0].value];
      this.context.component.value = [DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value];
      
      expect(this.context.component.value).toEqual([DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value]);
    });

    it('should set selected values while popup is open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      await _triggerPopupOpen(this.context.component);
      this.context.component.value = DEFAULT_OPTIONS[1].value;
      const optionContext = _getOptionContext(this.context.component.popupElement);

      expect(optionContext.selectedIndexes).toEqual([1]);
      expect(optionContext.selectedOptions[0].selected).toEqual(true);
      expect(this.context.component.value).toEqual(DEFAULT_OPTIONS[1].value);
    });

    it('should set selected values while popup is open in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      await _triggerPopupOpen(this.context.component);
      this.context.component.value = [DEFAULT_OPTIONS[0].value, DEFAULT_OPTIONS[1].value];
      const optionContext = _getOptionContext(this.context.component.popupElement);

      expect(optionContext.selectedIndexes).toEqual([0, 1]);
      expect(optionContext.selectedOptions[0].selected).toEqual(true);
      expect(optionContext.selectedOptions[1].selected).toEqual(true);
      expect(this.context.component.value).toEqual([DEFAULT_OPTIONS[0].value, DEFAULT_OPTIONS[1].value]);
    });

    it('should render group headers', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.options = DEFAULT_OPTION_GROUPS;
      await _triggerPopupOpen(this.context.component);
      const groups = _getPopupGroups(this.context.component.popupElement);

      expect(groups.length).toBe(2);
      expect(groups[0].text).toBe(DEFAULT_OPTION_GROUPS[0].text as string);
      expect(groups[0].options).toEqual(DEFAULT_OPTION_GROUPS[0].options);
      expect(groups[1].text).toBe(DEFAULT_OPTION_GROUPS[1].text as string);
      expect(groups[1].options).toEqual(DEFAULT_OPTION_GROUPS[1].options);
    });

    it('should set value based on selected index in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      this.context.component.selectedIndex = [1, 2];

      expect(this.context.component.value).toEqual([DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value]);
    });

    it('should set generic selected text in multiple mode when more than one option is selected', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      this.context.component.selectedIndex = [1, 2];

      expect(this.context.selectedTextElement.innerText).toBe('2 options selected');
    });

    it('should set selected text to option label when one option is selected in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.multiple = true;
      this.context.component.selectedIndex = [1];

      expect(this.context.selectedTextElement.innerText).toBe(DEFAULT_OPTIONS[1].label);
    });

    it('should use option builder', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const optionBuilderSpy = jasmine.createSpy<SelectOptionBuilder>('optionBuilder', (option, listItemElement) => {
        const div = document.createElement('div');
        div.textContent = `Custom option: ${option.label}`;
        return div;
      }).and.callThrough();

      this.context.component.options = DEFAULT_OPTIONS;
      this.context.component.optionBuilder = optionBuilderSpy;
      _openDropdown(this.context.component);

      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];

      expect(optionBuilderSpy).toHaveBeenCalledTimes(3);

      listItems.forEach((li, index) => {
        expect(li.textContent).toBe(`Custom option: ${DEFAULT_OPTIONS[index].label}`);
      });
    });

    it('should close dropdown on blur', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.focus();
      _openDropdown(this.context.component);
      
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      _expectPopupVisibility(this.context.component.popupElement, true);

      this.context.component.blur();
      this.context.component.dispatchEvent(new Event('blur'));
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      _expectPopupVisibility(this.context.component.popupElement, false);
    });
  
    it('should not sync popup width by default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.style.width = '50px';
      _openDropdown(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      const popupWidth = getComputedStyle(this.context.component.popupElement!).width;
      const componentWidth = getComputedStyle(this.context.component).width;

      expect(this.context.component.syncPopupWidth).toBeFalse();
      expect(popupWidth).not.toBe(componentWidth);
    });

    it('should sync popup width', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.syncPopupWidth = true;
      _openDropdown(this.context.component);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      const popupWidth = getComputedStyle(this.context.component.popupElement!).width;
      const componentWidth = getComputedStyle(this.context.component).width;

      expect(this.context.component.syncPopupWidth).toBeTrue();
      expect(popupWidth).toBe(componentWidth);
    });

    it('should set optionLimit', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.optionLimit = 1;
      _openDropdown(this.context.component);
      
      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      expect(this.context.component.optionLimit).toBe(1);
      expect(listItems.length).toBe(1);
    });

    it('should set popupClasses', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const popupClasses = ['class-1', 'class-2'];
      this.context.component.popupClasses = popupClasses;
      _openDropdown(this.context.component);
      
      expect(Array.from(this.context.component.popupElement!.classList)).toEqual(popupClasses);
      expect(this.context.component.popupClasses).toEqual(popupClasses);
    });

    it('should set popup header', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const headerBuilder: ListDropdownHeaderBuilder = () => {
        const div = document.createElement('div');
        div.id = 'select-popup-header';
        div.textContent = 'Header!';
        return div;
      };
      this.context.component.popupHeaderBuilder = headerBuilder;
      _openDropdown(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      
      const headerElement = this.context.component.popupElement!.querySelector('#select-popup-header');
      expect(headerElement).toBeTruthy();
    });

    it('should set popup footer', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      const footerBuilder: ListDropdownFooterBuilder = () => {
        const div = document.createElement('div');
        div.id = 'select-popup-footer';
        div.textContent = 'Footer!';
        return div;
      };
      this.context.component.popupFooterBuilder = footerBuilder;
      _openDropdown(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      
      const footerElement = this.context.component.popupElement!.querySelector('#select-popup-footer');
      expect(footerElement).toBeTruthy();
    });

    it('should replace options while open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      _openDropdown(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      
      const opts = [
        { label: 'New option 1', value: 'new-1' },
        { label: 'New option 2', value: 'new-2' }
      ];
      this.context.component.options = opts;
      await tick();
      
      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      expect(listItems.length).toBe(opts.length);
      expect(listItems[0].value).toBe(opts[0].value);
      expect(listItems[1].value).toBe(opts[1].value);
    });

    it('should close popup if switching to multiple mode while open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      _openDropdown(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      
      this.context.component.multiple = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      expect(this.context.component.open).toBeFalse();
      expect(this.context.component.popupElement).toBeFalsy();
    });

    it('should set observeScroll', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.observeScroll = true;
      _openDropdown(this.context.component);
      
      expect(this.context.component.observeScroll).toBeTrue();
    });
  });

  describe('static with default value', function(this: ITestContext) {
    it('should render with default value', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      const selectedText = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.SELECTED_TEXT);
      await tick();
      expect(selectedText.innerText).toBe('One');
    });
    
    it('should float label', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await floatTick();

      _expectLabelFloatState(this.context.component, true);
    }); 

    it('should not float label when value is removed', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      this.context.component.value = '';

      _expectLabelFloatState(this.context.component, false);
    });

    it('should show popup when clicked', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      await tick();
      const element = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.SELECTED_TEXT);
      element.click();
      expect(this.context.component.popupElement).toBeDefined();
      expect(this.context.component.popupElement!.isConnected).toBe(true);
      removeElement(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      expect(this.context.component.popupElement).toBeUndefined();
      expect(document.querySelector(POPUP_CONSTANTS.elementName)).toBeNull();
    });

    it('should retrieve correct open state', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      expect(this.context.component.open).toBe(false);
      await tick();
      const element = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.SELECTED_TEXT);
      element.click();
      expect(this.context.component.open).toBe(true);
    });

    it('should close dropdown when clicking on other element', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      const element = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.SELECTED_TEXT);
      await tick();
      element.click();
      await tick();
      element.click();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      expect(this.context.component.open).toBe(false);
      expect(this.context.component.popupElement).toBeUndefined();
    });

    it('should retrieve value via getter', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      await tick();
      expect(this.context.component.value).toBe('one');
    });

    it('should retrieve selectedIndex via getter', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      await tick();
      expect(this.context.component.selectedIndex).toBe(0);
    });

    it('should retrieve label via getter', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      await tick();
      expect(this.context.component.label).toBe('Label text');
    });

    it('should set selected option via selectedIndex', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute(SELECT_CONSTANTS.attributes.VALUE, 'one');
      document.body.appendChild(this.context.fixture);
      await tick();

      await tick();
      this.context.component.selectedIndex = 1;
      expect(this.context.component.value).toBe('two');
      expect(this.context.selectedTextElement.innerText).toBe('Two');
    });
  });

  describe('dynamic options', function(this: ITestContext) {
    const options: IOption[] = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' }
    ];

    it('should set value when options are added after first render', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = 'one';
      await tick();

      const selectedText = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.SELECTED_TEXT);        
      await tick();
      options.forEach(o => {
        const option = document.createElement(OPTION_CONSTANTS.elementName);
        option.setAttribute(OPTION_CONSTANTS.attributes.VALUE, o.value);
        option.textContent = o.label;
        this.context.component.append(option);
      });
      await tick();
      expect(selectedText.innerText).toBe('One');
    });

    it('should create option elements when setting options via property', async function(this: ITestContext) {        
      this.context = setupTestContext(true);
      this.context.component.value = 'one';
      await tick();
      
      await tick();
      this.context.component.options = options;
      await tick();
      expect(this.context.component.querySelectorAll(OPTION_CONSTANTS.elementName).length).toBe(3);
    });

    it('should apply option and option-group configuration to elements when setting options via property', async function(this: ITestContext) {        
      this.context = setupTestContext(true);
      this.context.component.value = 'one';
      await tick();
      
      await tick();

      function optionGroupBuilder() {
        return '<div>Custom group header</div>';
      }

      this.context.component.options = [
        {
          text: '',
          builder: optionGroupBuilder,
          options: [
            { label: 'option-1', value: 1, disabled: true, leadingBuilder: () => document.createElement('div'), metadata: 'test-meta' } as any,
          ]
        },
        {
          text: 'group',
          options: [
            { label: 'option-2', value: 2 },
            { label: 'option-3', value: 3, optionClass: 'test-cls' }
          ]
        }
      ];
      await tick();

      const optionGroupElements = this.context.component.querySelectorAll(OPTION_GROUP_CONSTANTS.elementName);
      const optionElements = this.context.component.querySelectorAll(OPTION_CONSTANTS.elementName);

      expect(optionGroupElements[0].label).toBe('');
      expect(optionGroupElements[0].builder).toBe(optionGroupBuilder);
      expect(optionGroupElements[1].label).toBe('group');

      expect(optionElements[0].label).toBe('option-1');
      expect(optionElements[0].disabled).toBeTrue();
      expect(optionElements[0].leadingBuilder).toBeTruthy();
      expect('metadata' in optionElements[0]).toBeTrue();

      expect(optionElements[2].label).toBe('option-3');
      expect(optionElements[2].optionClass).toEqual(['test-cls']);
    });

    it('should set value and selected text correctly when options are set via property', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = 'one';
      await tick();
      
      const selectedText = getShadowElement(this.context.component, SELECT_CONSTANTS.selectors.SELECTED_TEXT);
      await tick();
      this.context.component.options = options;
      await tick();
      expect(selectedText.innerText).toBe('One');
    });

    it('should append options', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = 'one';
      await tick();
      
      this.context.component.options = options;

      await tick();
      _openDropdown(this.context.component);

      this.context.component.appendOptions([
        { label: 'New option', value: 999 }
      ]);

      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      expect(listItems.length).toBe(options.length + 1);
      expect(listItems[listItems.length - 1].textContent).toBe('New option');
    });

    it('should set selected option if select component value is set before option values are set', async function(this: ITestContext) {
      // Don't append to DOM yet
      this.context = setupTestContext(false);

      // Unset all option values to simulate the options not having a value yet
      const optionElements = this.context.component.querySelectorAll('forge-option');
      optionElements.forEach(o => {
        o.removeAttribute(OPTION_CONSTANTS.attributes.VALUE);
        o.value = undefined;
      });

      // Now we can append to DOM and start the test
      document.body.appendChild(this.context.fixture);

      await tick();

      // Set the select value first **before** any option elements receive their correct values
      this.context.component.value = 0;

      expect(this.context.component.value).withContext('Expected component value to be 0').toBe(0); // There are no matching options to select, but we've stored the value internally...
      expect(this.context.foundation['_value']).withContext('Expected foundation _value to be []').toEqual([0]); // Checking if the value is stored
      expect(this.context.foundation['_selectedValues']).withContext('Expected foundation _selectedValues to be []').toEqual([]); // Checking if options have been selected
      expect(this.context.selectedTextElement.textContent).withContext('Expected selected text to be empty string').toBe(''); // Checking if the selected text is set or not yet

      // Now we can update the values of our options
      optionElements.forEach((o, i) => o.value = i);

      expect(this.context.component.value).withContext('Expected component value to be 0').toBe(0); // Our value is now available because there are matching options
      expect(this.context.foundation['_value']).withContext('Expected foundation _value to be [0]').toEqual([0]); // Internal state is set
      expect(this.context.foundation['_selectedValues']).withContext('Expected foundation _selectedValues to be [0]').toEqual([0]); // Internal state identifying that matching options are set
      expect(this.context.selectedTextElement.textContent).withContext('Expected selected text to be first option label').toBe(DEFAULT_OPTIONS[0].label); // Ensure label matches option text
    });
  });  

  describe('multiselect', function(this: ITestContext) {
    const options: IOption[] = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' }
    ];

    it('should render checkboxes in dropdown', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.options = options;
      this.context.component.multiple = true;

      await tick();

      _openDropdown(this.context.component);
      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName));
      expect(this.context.component.multiple).toBe(true);
      expect(listItems.every(li => li.querySelector('forge-icon') !== null)).toBe(true);
    });

    it('should select multiple options when clicked', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.options = options;
      this.context.component.multiple = true;

      await tick();

      _openDropdown(this.context.component);
      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      getShadowElement(listItems[0], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM).click();
      getShadowElement(listItems[1], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM).click();
      expect(this.context.component.value).toEqual(['one', 'two']);
      expect(this.context.component.selectedIndex).toEqual([0, 1]);
      expect(listItems[0].selected).toBe(true);
      expect(listItems[1].selected).toBe(true);
    });

    it('should select multiple options when value is set to array', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.options = options;
      this.context.component.multiple = true;

      await tick();

      const newValue = ['one', 'two', 'three'];
      this.context.component.value = newValue;
      expect(this.context.component.value).toEqual(newValue);
      expect(this.context.component.selectedIndex).toEqual([0, 1, 2]);
      _openDropdown(this.context.component);

      await tick();

      const listItems = Array.from(this.context.component.popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      expect(listItems.every(li => li.selected)).toBe(true);
    });

    it('should select all options', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      
      this.context.component.options = options;
      this.context.component.multiple = true;

      await tick();
      this.context.component.selectAll();

      expect(this.context.component.value.length).toBe(options.length);
    });

    it('should deselect all options', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();

      this.context.component.options = options;
      this.context.component.multiple = true;

      await tick();
      this.context.component.selectAll();
      expect(this.context.component.value.length).toBe(options.length);

      this.context.component.deselectAll();
      expect(this.context.component.value.length).toBe(0);
    });
  });

  function _createFixture(): HTMLElement {
    const fixture = document.createElement('div');
    fixture.id = 'select-test-fixture';
    return fixture;
  }

  function _openDropdown(component: ISelectComponent): void {
    component.click();
  }

  function setupTestContext(append = false): ITestSelectContext {
    const fixture = _createFixture();
    
    const component = document.createElement('forge-select');
    component.label = 'Label text';

    const optionElements: IOptionComponent[] = [];
    DEFAULT_OPTIONS.forEach(o => {
      const option = document.createElement('forge-option');
      option.setAttribute(OPTION_CONSTANTS.attributes.VALUE, o.value);
      option.textContent = o.label;
      optionElements.push(option);
      component.appendChild(option);
    });

    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      fixture,
      component,
      foundation: component['_foundation'] as ISelectFoundation,
      label: getShadowElement(component, SELECT_CONSTANTS.selectors.LABEL) as HTMLLabelElement,
      selectedTextElement: getShadowElement(component, SELECT_CONSTANTS.selectors.SELECTED_TEXT) as HTMLElement,
      rootElement: getShadowElement(component, SELECT_CONSTANTS.selectors.ROOT) as HTMLElement,
      optionElements,
      destroy: () => {
        tryCleanupPopups();
        removeElement(fixture);
        if (component.isConnected) {
          removeElement(component);
        }
      }
    };
  }

  function _expectLabelFloatState(selectElement: ISelectComponent, isFloating: boolean): void {
    const labelElement = getShadowElement(selectElement, SELECT_CONSTANTS.selectors.LABEL);
    expect(labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE)).toBe(isFloating);
  }

  function _popupAnimation(): Promise<void> {
    return timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
  }

  async function _triggerPopupOpen(component: ISelectComponent): Promise<void> {
    _openDropdown(component);
    await _popupAnimation();
    
    _expectPopupVisibility(component.popupElement, true);
  }
  
  function _expectPopupVisibility(popupElement: IPopupComponent | undefined, isVisible: boolean): void {
    const domPopup = document.querySelector(POPUP_CONSTANTS.elementName);
    if (isVisible) {
      expect(popupElement).toBeTruthy();
      expect(domPopup).toBe(popupElement as IPopupComponent);
    } else {
      expect(popupElement).toBeFalsy();
      expect(domPopup).toBeNull();
    }
  }

  function _getOptionContext(popupElement: IPopupComponent | undefined): ITestOptionContext {
    const options = Array.from(popupElement!.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
    const activeOption = options.find(li => li.active) || null;
    const activeIndex = activeOption ? options.indexOf(activeOption) : -1;
    const selectedOptions = options.filter(li => li.selected);
    const selectedIndexes = selectedOptions.map(so => options.indexOf(so));
    return { activeIndex, activeOption, options, selectedOptions, selectedIndexes };
  }

  function _expectActiveOption(popupElement: IPopupComponent | undefined, index: number): void {
    const optionContext = _getOptionContext(popupElement as IPopupComponent);

    expect(optionContext.activeIndex).toBe(index);
    if (optionContext.activeOption) {
      expect(optionContext.activeOption.active).toBe(true);
    }
  }

  function _sendFilterKey(element: HTMLElement, key: string, keyCode: number): void {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, keyCode } as Partial<KeyboardEventInit>));
  }

  function _getPopupGroups(popupElement: IPopupComponent | undefined): ITestSelectGroup[] {
    const groups = Array.from(popupElement!.querySelectorAll(`.${LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER}`)) as HTMLElement[];
    return groups.map(groupElement => {
      const options = Array.from(groupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const groupHeader = groupElement.querySelector('div') as HTMLElement;
      return {
        text: groupHeader.textContent || '',
        optionElements: options,
        options: options.map(o => ({ label: o.innerText, value: o.value }))
      };
    });
  }
});

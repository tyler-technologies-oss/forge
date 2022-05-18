import { removeElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { cssClasses as MDC_LINEAR_PROGRESS_CLASSES } from '@material/linear-progress';
import {
  defineAutocompleteComponent,
  IAutocompleteComponent,
  AUTOCOMPLETE_CONSTANTS,
  AutocompleteComponent,
  AutocompleteMode,
  AutocompleteOptionBuilder,
  AutocompleteComponentDelegate,
  AutocompleteComponentDelegateProps,
  AutocompleteFilterCallback,
  IAutocompleteOptionGroup,
  IAutocompleteComponentDelegateConfig,
  IAutocompleteComponentDelegateOptions
} from '@tylertech/forge/autocomplete';
import { POPUP_CONSTANTS } from '@tylertech/forge/popup';
import { LIST_ITEM_CONSTANTS, IListItemComponent, LIST_CONSTANTS } from '@tylertech/forge/list';
import { IOption, IOptionComponent, OPTION_CONSTANTS } from '@tylertech/forge/select';
import { SKELETON_CONSTANTS, ISkeletonComponent } from '@tylertech/forge/skeleton';
import { LINEAR_PROGRESS_CONSTANTS, ILinearProgressComponent } from '@tylertech/forge/linear-progress';
import { TEXT_FIELD_CONSTANTS, ITextFieldComponent, ITextFieldComponentDelegateOptions } from '@tylertech/forge/text-field';
import { AVATAR_CONSTANTS, IAvatarComponent } from '@tylertech/forge/avatar';
import { ICON_CONSTANTS, IconComponent } from '@tylertech/forge/icon';
import { LIST_DROPDOWN_CONSTANTS } from '@tylertech/forge/list-dropdown';
import { tryCleanupPopups } from '../../utils';

const DEFAULT_FILTER_OPTIONS = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 }
];

const DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG: AutocompleteComponentDelegateProps = {
  filter: () => DEFAULT_FILTER_OPTIONS,
  multiple: false,
  debounce: AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME,
  filterOnFocus: true,
  allowUnmatched: false
};

const DEFAULT_TEXT_FIELD_DELEGATE_CONFIG: ITextFieldComponentDelegateOptions = {
  label: 'Label',
  type: 'text',
  id: 'autocomplete-id'
};

const DEFAULT_AUTOCOMPLETE_TEXTFIELD_DELEGATE_CONFIG: IAutocompleteComponentDelegateConfig = {
  props: { ...DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG },
  options: {
    useDropdownIcon: true,
    textFieldDelegateConfig: {
      options: { ...DEFAULT_TEXT_FIELD_DELEGATE_CONFIG }
    }
  }
};

interface ITestContext {
  context: ITestAutocompleteContext 
  | ITestAutocompleteDynamicContext 
  | ITestAutocompleteTextFieldContext 
  | ITestAutoCompleteDelegateContext;
}

interface ITestAutocompleteContext {
  component: IAutocompleteComponent;
  input: HTMLInputElement;
  optionElements: IOptionComponent[];
  destroy(): void;
}

interface ITestAutocompleteDynamicContext {
  component: IAutocompleteComponent;
  input: HTMLInputElement;
  destroy(): void;
}

interface ITestAutocompleteTextFieldContext {
  component: IAutocompleteComponent;
  label: HTMLLabelElement;
  input: HTMLInputElement;
  iconElement: HTMLElement;
  destroy(): void;
}

interface ITestAutoCompleteDelegateContext {
  component: IAutocompleteComponent;
  delegate: AutocompleteComponentDelegate;
  input: HTMLInputElement;
  optionElements: IOptionComponent[];
  append(): void;
  destroy(): void;
}

describe('AutocompleteComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAutocompleteComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with static <input> element', function(this: ITestContext) {
    it('should call filter callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const filterCb = jasmine.createSpy('filter callback');
      this.context.component.filter = () => {
        filterCb();
        return [];
      };
      _triggerDropdownClick(this.context.input);
      await tick();
      expect(filterCb).toHaveBeenCalledTimes(1);
    });

    it('should not call filter callback if filter on focus is turned off', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const filterCb = jasmine.createSpy('filter callback');
      this.context.component.filter = () => {
        filterCb();
        return [];
      };
      this.context.component.filterOnFocus = false;
      _triggerDropdownClick(this.context.input);
      await tick();
      expect(this.context.component.filterOnFocus).toBe(false);
      expect(filterCb).not.toHaveBeenCalled();
    });

    it('should not show popup if no filter options are provided', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => [];
      _triggerDropdownClick(this.context.input);
      await tick();

      expect(this.context.component.popupElement).toBeNull();
    });

    it('should show popup if filter options are provided', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => [{ label: 'One', value: 1 }];
      _triggerDropdownClick(this.context.input);
      await tick();

      expect(this.context.component.popupElement).not.toBeNull();
    });

    it('should show popup programatically', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.openDropdown();
      await tick();

      expect(this.context.component.open).toBe(true);
      expect(this.context.component.popupElement).not.toBeNull();
    });

    it('should close popup programatically', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.openDropdown();
      await timer();
      this.context.component.closeDropdown();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      expect(this.context.component.open).toBe(false);
      expect(this.context.component.popupElement).toBeNull();
    });

    it('should not highlight first option in popup by default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(this.context.input);

      await tick();
      const listItems = _getListItems(this.context.component.popupElement);

      expect(listItems.every(li => !li.active)).toBeTrue();
    });

    it('should not close popup when programmatically adding values', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.multiple = true;

      _triggerDropdownClick(this.context.input);
      await tick();

      _clickListItem(0, this.context.component.popupElement);
      _clickListItem(1, this.context.component.popupElement);
      this.context.component.value = [DEFAULT_FILTER_OPTIONS[2]];

      expect(this.context.input.value).toBe('1 option selected');
      expect(this.context.component.open).toBe(true);
    });

    it('should append options while dropdown is open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(this.context.input);
      await tick();
      this.context.component.appendOptions([{ label: 'New option', value: 'new' }]);
      await tick();
      const listItems = _getListItems(this.context.component.popupElement);
      expect(listItems[listItems.length - 1].value).toBe('new');
    });

    it('should use default debounce value', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.debounce).toBe(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
    });

    it('should call filter after debounce elapses', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const filterSpy = jasmine.createSpy('debounced filter callback');

      this.context.component.filter = () => {
        filterSpy();
        return [];
      };
      _sendInputValue(this.context.input, 'a');

      expect(filterSpy).not.toHaveBeenCalled();
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      expect(filterSpy).toHaveBeenCalled();
    });

    it('should use custom debounce time', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const filterSpy = jasmine.createSpy('debounced filter callback');

      this.context.component.debounce = 200;
      this.context.component.filter = () => {
        filterSpy();
        return [];
      };
      _sendInputValue(this.context.input, 'a');

      expect(filterSpy).not.toHaveBeenCalled();
      await timer(200);
      expect(filterSpy).toHaveBeenCalled();
    });

    it('should not use debounce if set to 0', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const filterSpy = jasmine.createSpy('debounced filter callback');

      this.context.component.debounce = 0;
      this.context.component.filter = () => {
        filterSpy();
        return [];
      };
      _sendInputValue(this.context.input, 'a');

      expect(filterSpy).toHaveBeenCalled();
    });

    it('should display filtered options in dropdown on initial click', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.debounce = 0;
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(this.context.input);
      await tick();
      const popupOptions = _getPopupOptions(this.context.component.popupElement);
      expect(popupOptions).toEqual(DEFAULT_FILTER_OPTIONS);
    });

    it('should display filtered options in dropdown after entering character', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.debounce = 0;
      this.context.component.filter = () => [DEFAULT_FILTER_OPTIONS[0]];
      _sendInputValue(this.context.input, 'one');
      await tick();
      const popupOptions = _getPopupOptions(this.context.component.popupElement);
      expect(popupOptions).toEqual([DEFAULT_FILTER_OPTIONS[0]]);
    });

    it('should emit change event when clicking option in dropdown', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      this.context.component.open = true;
      await tick();
      _clickListItem(0, this.context.component.popupElement);
      expect(this.context.input.value).toBe(DEFAULT_FILTER_OPTIONS[0].label);
      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[0].value);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: DEFAULT_FILTER_OPTIONS[0].value }));
    });

    it('should emit change event when clicking option in dropdown in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      this.context.component.multiple = true;
      _triggerDropdownClick(this.context.input);
      await tick();
      _clickListItem(0, this.context.component.popupElement);
      _clickListItem(1, this.context.component.popupElement);
      expect(this.context.input.value).toBe('2 options selected');
      expect(this.context.component.value).toEqual([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(changeSpy).toHaveBeenCalledTimes(2);
    });

    it('should emit select event when clicking option in dropdown in stateless mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      const selectSpy = jasmine.createSpy('select event');
      this.context.component.mode = AutocompleteMode.Stateless;
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SELECT, selectSpy);
      this.context.component.open = true;

      await tick();
      _clickListItem(0, this.context.component.popupElement);

      expect(this.context.input.value).toBe('');
      expect(this.context.component.value).toBeNull();
      expect(changeSpy).toHaveBeenCalledTimes(0);
      expect(selectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not close dropdown if select event is canceled in stateless mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const selectSpy = jasmine.createSpy('select event', evt => evt.preventDefault()).and.callThrough();
      this.context.component.mode = AutocompleteMode.Stateless;
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SELECT, selectSpy);
      this.context.component.open = true;

      const filterText = 'o';
      _sendInputValue(this.context.input, filterText);
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      await tick();
      _clickListItem(0, this.context.component.popupElement);

      expect(this.context.input.value).toBe(filterText);
      expect(this.context.component.open).toBeTrue();
    });

    it('should set value', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.value = DEFAULT_FILTER_OPTIONS[0].value;
      await tick();
      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[0].value);
      expect(this.context.input.value).toBe(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should set value when multiple is allowed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.multiple = true;
      this.context.component.value = [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value];
      await tick();
      expect(this.context.component.value).toEqual([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(this.context.input.value).toBe('2 options selected');
    });

    it('should set label via match key', async function (this: ITestContext) {
      const filterOptions = [
        { label: 'One', value: {id: 'one', value: 1}},
        { label: 'Two', value: {id: 'two', value: 2}},
        { label: 'Three', value: {id: 'three', value: 3}}
      ];

      this.context = setupTestContext(true);
      this.context.component.matchKey = 'id';
      this.context.component.filter = () => filterOptions;
      this.context.component.value = { id: 'one', value: null };
      await tick();

      expect(this.context.input.value).toBe(filterOptions[0].label);
    });

    it('should close dropdown when input is blurred', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(this.context.input);
      await tick();

      expect(this.context.component.popupElement).not.toBeNull();

      this.context.input.dispatchEvent(new Event('blur'));
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      expect(this.context.component.popupElement).toBeNull();
    });

    it('should not open dropdown when receiving focus in input', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.input.focus();
      await tick();
      expect(this.context.component.popupElement).toBeNull();
    });

    it('should highlight next option when arrow down key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(0);
    });

    it('should highlight previous option when arrow up key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // 0
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // 1
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' })); // 0

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(0);
    });

    it('should wrap active element highlight previous', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(2);
    });

    it('should wrap active element highlight next', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      
      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      // We have 3 options
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 0
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 1
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 2
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 0

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(0);
    });

    it('should highlight last item if end key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(2);
    });

    it('should highlight first item if home key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(0);
    });

    it('should close the dropdown if escape key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      expect(this.context.component.popupElement).toBeNull();
    });

    it('should emit change event if backspace is pressed to clear text', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.value = 1;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await timer();
      this.context.input.value = '';
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
      expect(this.context.component.value).toBeNull();
    });

    it('should clear value if input text is removed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.value = 1;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await timer();
      _sendInputValue(this.context.input, '');

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
      expect(this.context.component.value).toBeNull();
    });

    it('should clear value if input text is changed with allow unmatched turned on', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.allowUnmatched = true;
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.value = 1;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await timer();
      _sendInputValue(this.context.input, 'test');

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
      expect(this.context.component.value).toBeNull();
    });

    it('should select active option if enter key is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: DEFAULT_FILTER_OPTIONS[0].value }));
      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[0].value);
      expect(this.context.input.value).toBe(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should not emit change event if enter key is pressed in multiple mode when only one disabled option exists in the filtered options', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.multiple = true;
      function filter(filterText: string, value: any): Promise<IOption[]> {
        return new Promise<IOption[]>(resolve => {
          resolve([{ label: 'No results', value: undefined, disabled: true }]);
        });
      }
      const filterSpy = jasmine.createSpy('filter callback', filter).and.callThrough();
      this.context.component.filter = filterSpy;
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      _sendInputValue(this.context.input, 'other');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await tick();

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(filterSpy).toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not select active option if input is blurred', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.blur();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(this.context.component.value).toBeNull();
      expect(this.context.input.value).toBe('');
    });

    it('should select active option if input is blurred via tab key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await tick();
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: DEFAULT_FILTER_OPTIONS[0].value }));
      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[0].value);
      expect(this.context.input.value).toBe(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should not select active option if input is blurred in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.multiple = true;
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      this.context.input.blur();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(this.context.component.value).toEqual([]);
      expect(this.context.input.value).toBe('');
    });

    it('should select multiple options when enter key is pressed in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.multiple = true;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      _triggerDropdownClick(this.context.input);
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      const listItems = _getListItems(this.context.component.popupElement);
      expect(listItems[0].selected).toBe(true);
      expect((<IconComponent>listItems[0].querySelector(ICON_CONSTANTS.elementName)).name).toBe('check_box');
      expect(listItems[1].selected).toBe(true);
      expect((<IconComponent>listItems[1].querySelector(ICON_CONSTANTS.elementName)).name).toBe('check_box');
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: [DEFAULT_FILTER_OPTIONS[0].value] }));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value] }));
      expect(this.context.component.value).toEqual([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(this.context.input.value).toBe('2 options selected');
    });

    it('should toggle option when in multiple mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.multiple = true;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      _triggerDropdownClick(this.context.input);
      await tick();

      _clickListItem(1, this.context.component.popupElement);
      await tick();      
      _clickListItem(1, this.context.component.popupElement);
      await tick();
      
      const listItems = _getListItems(this.context.component.popupElement);
      expect(listItems[1].selected).toBe(false);
      expect((<IconComponent>listItems[1].querySelector(ICON_CONSTANTS.elementName))!.name).toBe('check_box_outline_blank');
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: [DEFAULT_FILTER_OPTIONS[1].value] }));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: [] }));
      expect(this.context.component.value).toEqual([]);
      expect(this.context.input.value).toBe('');
    });

    it('should not select any options if enter key is pressed when no item is highlighted', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change event');
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await timer();
      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).toHaveBeenCalledTimes(0);
      expect(this.context.component.value).toBeNull();
      expect(this.context.input.value).toBe('');
    });

    it('should open popup if down arrow is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.input.focus();

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      expect(this.context.component.popupElement).not.toBeNull();
    });

    it('should activate first option if opened via down arrow key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.input.focus();

      this.context.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(0);
    });

    it('should activate first option when filtering', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.input.focus();
      this.context.component.openDropdown();

      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      this.context.input.value = 'o';
      this.context.input.dispatchEvent(new Event('input'));
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await tick();

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(0);
    });

    it('should not activate first option when clearing filter text', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.value = DEFAULT_FILTER_OPTIONS[2].value;

      await tick();

      this.context.input.focus();
      this.context.input.value = '';
      this.context.input.dispatchEvent(new Event('input'));

      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const activeListItemIndex = _getActiveListItemIndex(this.context.component.popupElement);
      expect(activeListItemIndex).toBe(-1);
    });

    it('should set CSS class on popup', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.popupClasses = 'test-class';
      this.context.component.openDropdown();
      await tick();

      expect(this.context.component.popupClasses).toEqual(['test-class']);
      expect(this.context.component.popupElement!.classList.contains('test-class')).toBe(true);
    });

    it('should sync popup width to popup target', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.syncPopupWidth = true;
      this.context.component.popupTarget = 'input';
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.openDropdown();
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      const popup = this.context.component.popupElement;

      expect(this.context.component.syncPopupWidth).toBe(true);
      expect(popup!.getBoundingClientRect().width).toBe(this.context.input.getBoundingClientRect().width);
    });

    it('should set popup target', async function(this: ITestContext) {
      const expectedTargetElement = document.createElement('div');
      expectedTargetElement.id = 'test-popup-target';

      this.context = setupTestContext(true);
      this.context.component.appendChild(expectedTargetElement);
      this.context.component.popupTarget = '#test-popup-target';
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      await tick();

      this.context.component.openDropdown();
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      const targetElement = this.context.component['_foundation']['_adapter']['_targetElement'];

      expect(targetElement).toBe(expectedTargetElement);
    });

    it('should call option builder and display custom option template for each item', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const builder: AutocompleteOptionBuilder = (option, filterText, parentElement) => {
        const div = document.createElement('div');
        div.id = `custom-option-${option.value}`;
        div.textContent = option.label;
        return div;
      };
      const builderSpy = jasmine.createSpy('builder spy', builder).and.callThrough();
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.optionBuilder = builderSpy;
      this.context.component.openDropdown();
      await tick();
      const listItems = _getListItems(this.context.component.popupElement);
      const allOptionsUseBuilder = listItems.every((li, index) => {
        const div = li.firstElementChild;
        return div && div.id === `custom-option-${li.value}`;
      });
      expect(builderSpy).toHaveBeenCalledTimes(3);
      expect(allOptionsUseBuilder).toBe(true);
    });

    it('should emit scroll bottom event', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.observeScroll = true;
      this.context.component.observeScrollThreshold = 100;
      this.context.component.filter = () => {
        const items: IOption[] = [];
        for (let i = 0; i < 100; i++) {
          items.push({ label: `Option #${i}`, value: i });
        }
        return items;
      };
      this.context.component.openDropdown();
      const scrolledBottomSpy = jasmine.createSpy('scrolled bottom');
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM, scrolledBottomSpy);
      await tick();
      const popup = this.context.component.popupElement;
      const scrollElement = popup!.shadowRoot!.querySelector(POPUP_CONSTANTS.selectors.CONTAINER) as HTMLElement;
      scrollElement.scrollTop = scrollElement.scrollHeight - this.context.component.observeScrollThreshold;
      await tick();
      expect(scrolledBottomSpy).toHaveBeenCalledTimes(1);
    });

    it('should set scroll observer if set while popup is open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => {
        const items: IOption[] = [];
        for (let i = 0; i < 100; i++) {
          items.push({ label: `Option #${i}`, value: i });
        }
        return items;
      };
      this.context.component.observeScroll = true;
      this.context.component.openDropdown();
      const scrolledBottomSpy = jasmine.createSpy('scrolled bottom');
      this.context.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM, scrolledBottomSpy);
      await tick();

      const popup = this.context.component.popupElement;
      const scrollElement = popup!.shadowRoot!.querySelector(POPUP_CONSTANTS.selectors.CONTAINER) as HTMLElement;
      scrollElement.scrollTop = scrollElement.scrollHeight;

      await tick();
      expect(scrolledBottomSpy).toHaveBeenCalledTimes(1);
    });

    it('should set configuration via attributes', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.MODE, AutocompleteMode.Stateless);
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.MULTIPLE, 'true');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.DEBOUNCE, '1000');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.FILTER_ON_FOCUS, 'false');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.ALLOW_UNMATCHED, 'true');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.POPUP_TARGET, 'input');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.POPUP_CLASSES, 'test-class');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OPTION_LIMIT, '10');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL, '10');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD, '100');
      this.context.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.SYNC_POPUP_WIDTH, 'true');

      expect(this.context.component.mode).toBe(AutocompleteMode.Stateless);
      expect(this.context.component.multiple).toBe(true);
      expect(this.context.component.debounce).toBe(1000);
      expect(this.context.component.filterOnFocus).toBe(false);
      expect(this.context.component.allowUnmatched).toBe(true);
      expect(this.context.component.popupTarget).toBe('input');
      expect(this.context.component.popupClasses).toEqual(['test-class']);
      expect(this.context.component.optionLimit).toBe(10);
      expect(this.context.component.observeScroll).toBe(true);
      expect(this.context.component.observeScrollThreshold).toBe(100);
      expect(this.context.component.syncPopupWidth).toBe(true);
    });

    it('should use selected text builder', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      function builder(selectedOptions: IOption[]): string {
        return selectedOptions.map(o => o.label).join(', ');
      }
      const selectedTextBuilderSpy = jasmine.createSpy('selected text builder', builder).and.callThrough();
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.selectedTextBuilder = selectedTextBuilderSpy;
      this.context.component.multiple = true;
      this.context.component.open = true;
      await tick();
      _clickListItem(0, this.context.component.popupElement);
      await tick();
      _clickListItem(1, this.context.component.popupElement);
      await tick();
      expect(selectedTextBuilderSpy).toHaveBeenCalledTimes(2);
      expect(this.context.input.value).toBe(`${DEFAULT_FILTER_OPTIONS[0].label}, ${DEFAULT_FILTER_OPTIONS[1].label}`);
    });

    it('should show skeleton loader when initially opened', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => {
        return new Promise<IOption[]>(resolve => {
          setTimeout(() => {
            resolve(DEFAULT_FILTER_OPTIONS);
          }, 1000);
        });
      };
      this.context.component.open = true;
      await tick();

      const popup = this.context.component.popupElement;
      const skeletons = Array.from(popup!.querySelectorAll(SKELETON_CONSTANTS.elementName)) as ISkeletonComponent[];
      const listItems = _getListItems(this.context.component.popupElement);
      const linearProgress = popup!.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;

      expect(skeletons.length).toBe(3);
      expect(listItems.length).toBe(0);
      expect(getComputedStyle(linearProgress).display).toBe('none');
    });

    it('should toggle linear progress when filtering', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const timeout = 200;
      this.context.component.filter = () => {
        return new Promise<IOption[]>(resolve => {
          setTimeout(() => {
            resolve(DEFAULT_FILTER_OPTIONS);
          }, timeout);
        });
      };
      this.context.component.open = true;
      await timer(timeout);
      _sendInputValue(this.context.input, 'e');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      const popup = this.context.component.popupElement;
      const skeletons = Array.from(popup!.querySelectorAll(SKELETON_CONSTANTS.elementName)) as ISkeletonComponent[];
      const linearProgress = popup!.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;
      const linearProgressContainer = linearProgress.shadowRoot!.querySelector(LINEAR_PROGRESS_CONSTANTS.selectors.ROOT) as HTMLElement;

      expect(skeletons.length).toBe(0);
      expect(getComputedStyle(linearProgress).display).not.toBe('none');
      expect(linearProgressContainer.classList.contains(MDC_LINEAR_PROGRESS_CLASSES.CLOSED_CLASS)).toBe(false);

      await timer(timeout);
      expect(linearProgressContainer.classList.contains(MDC_LINEAR_PROGRESS_CLASSES.CLOSED_CLASS)).toBe(true);
    });

    it('should handle multiple filter requests in proper order', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      function filter(filterText: string, value: any): Promise<IOption[]> {
        return new Promise<IOption[]>(resolve => {
          resolve(DEFAULT_FILTER_OPTIONS);
        });
      }
      const filterSpy = jasmine.createSpy('filter callback', filter).and.callThrough();
      this.context.component.filter = filterSpy;
      this.context.component.filterOnFocus = false;

      _sendInputValue(this.context.input, 'o');
      _sendInputValue(this.context.input, 'on');
      _sendInputValue(this.context.input, 'e');

      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(filterSpy).toHaveBeenCalledTimes(1);
      expect(filterSpy).toHaveBeenCalledWith('e', null);
    });

    it('should execute initial filter callback with selected value', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      function filter(filterText: string, value: any): Promise<IOption[]> {
        return new Promise<IOption[]>(resolve => {
          resolve(DEFAULT_FILTER_OPTIONS);
        });
      }
      const filterSpy = jasmine.createSpy('filter callback', filter).and.callThrough();
      this.context.component.filter = filterSpy;
      this.context.component.value = 1;

      _triggerDropdownClick(this.context.input);
      await tick();

      expect(filterSpy).toHaveBeenCalledTimes(2);
      expect(filterSpy).toHaveBeenCalledWith('', 1);
      expect(filterSpy).toHaveBeenCalledWith('', null);
    });

    it('should close dropdown if filter completes without the input having focus anymore', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => {
        return new Promise<IOption[]>(resolve => {
          setTimeout(() => {
            resolve(DEFAULT_FILTER_OPTIONS);
          }, 1000);
        });
      };
      this.context.component.allowUnmatched = true;
      this.context.component.filterOnFocus = false;
      _sendInputValue(this.context.input, 'e');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      this.context.input.dispatchEvent(new Event('blur'));
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      expect(this.context.component.popupElement).toBeNull();
    });

    it('should keep selected options at top of list in popup', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.multiple = true;
      this.context.component.openDropdown();
      await tick();

      _clickListItem(1, this.context.component.popupElement);
      _clickListItem(2, this.context.component.popupElement);

      this.context.component.closeDropdown();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      this.context.component.openDropdown();
      await tick();

      const listItems = _getListItems(this.context.component.popupElement);

      expect(listItems[0].value).toBe(DEFAULT_FILTER_OPTIONS[1].value);
      expect(listItems[0].selected).toBe(true);
      expect(listItems[1].value).toBe(DEFAULT_FILTER_OPTIONS[2].value);
      expect(listItems[1].selected).toBe(true);
      expect(listItems[2].value).toBe(DEFAULT_FILTER_OPTIONS[0].value);
      expect(listItems[2].selected).toBe(false);
    });

    it('should handle cancelling filter requests if focus is lost after filter has been triggered', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.openDropdown();
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      _sendInputValue(this.context.input, 'a');
      this.context.input.dispatchEvent(new Event('blur'));
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      expect(this.context.component.popupElement).toBeNull();
      expect(this.context.component['_foundation']._pendingFilterPromises).toEqual([]);
    });

    it('should cancel all pending filters if an exception is thrown in filter callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => {
        return new Promise((resolve, reject) => {
          reject('Fake rejection');
        });
      };
      await tick();
      _sendInputValue(this.context.input, 'a');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      expect(this.context.component.popupElement).toBeNull();
      expect(this.context.component['_foundation']._pendingFilterPromises).toEqual([]);
    });

    it('should handle subsequent out of order filters', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      // This filter simulates a request for filterText = a finishing before filterText = b
      this.context.component.filter = filterText => {
        return new Promise(resolve => {
          if (filterText === 'a') {
            setTimeout(() => resolve([{ label: 'A', value: 'a' }]), 200);
          } else if (filterText === 'b') {
            setTimeout(() => resolve([{ label: 'B', value: 'b' }]), 100);
          } else {
            resolve(DEFAULT_FILTER_OPTIONS);
          }
        });
      };
      this.context.component.filterOnFocus = false;
      this.context.component.open = true;
      await tick();

      // Send a filter request for 'a' then send filter request for 'b' immediately after
      _sendInputValue(this.context.input, 'a');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      _sendInputValue(this.context.input, 'b');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      // We need to wait for the simulated filter to return due to setTimeout above, then check for the options in the dropdown
      await timer(300);
      await tick();

      const options = _getPopupOptions(this.context.component.popupElement);
      expect(options).toEqual([{ label: 'B', value: 'b' }]);
    });

    it('should reset filter function', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const initialFilter = () => DEFAULT_FILTER_OPTIONS;
      const newFilter = () => DEFAULT_FILTER_OPTIONS;
      const initialFilterSpy = jasmine.createSpy('initial filter spy', initialFilter).and.callThrough();
      const newFilterSpy = jasmine.createSpy('new filter spy', newFilter).and.callThrough();

      this.context.component.filter = initialFilterSpy;
      await tick();

      this.context.component.filter = newFilterSpy;
      _sendInputValue(this.context.input, 'a');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(initialFilterSpy).toHaveBeenCalledTimes(0);
      expect(newFilterSpy).toHaveBeenCalledTimes(1);
    });

    it('should update selected text if selectedTextBuilder is set after a value is selected', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.multiple = true;
      this.context.component.open = true;
      this.context.component.value = [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value];
      await tick();

      expect(this.context.input.value).toBe('2 options selected');

      this.context.component.selectedTextBuilder = selectedOptions => selectedOptions.map(o => o.label).join(', ');
      await tick();

      expect(this.context.input.value).toBe(`${DEFAULT_FILTER_OPTIONS[0].label}, ${DEFAULT_FILTER_OPTIONS[1].label}`);
    });

    it('should accept grouped options', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => {
        return [
          { text: 'Group one', options: [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]] },
          { text: 'Group two', options: [DEFAULT_FILTER_OPTIONS[2]] }
        ];
      };
      this.context.component.open = true;
      await tick();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);

      const popupGroups = _getPopupGroups(this.context.component.popupElement);
      expect(popupGroups.length).toBe(2);
      expect(popupGroups[0].headerElement.textContent).toBe('Group one');
      expect(popupGroups[0].options.length).toBe(2);
      expect(popupGroups[1].headerElement.textContent).toBe('Group two');
      expect(popupGroups[1].options.length).toBe(1);
    });

    it('should render custom header for option groups', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      function optionGroupBuilder(option: IAutocompleteOptionGroup): HTMLElement {
        const avatar = document.createElement(AVATAR_CONSTANTS.elementName) as IAvatarComponent;
        avatar.text = option.text!;
        return avatar;
      }

      this.context.component.filter = () => {
        return [
          { text: 'One', builder: optionGroupBuilder, options: [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]] },
          { text: 'Two', builder: optionGroupBuilder, options: [DEFAULT_FILTER_OPTIONS[2]] }
        ];
      };
      this.context.component.open = true;
      await tick();

      const popupGroups = _getPopupGroups(this.context.component.popupElement);
      expect((<IAvatarComponent>popupGroups[0].headerElement).text).toBe('One');
      expect((<IAvatarComponent>popupGroups[1].headerElement).text).toBe('Two');
    });

    it('should highlight filter text in options by default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.open = true;
      await tick();

      _sendInputValue(this.context.input, 'e');
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await tick();

      const listItems = _getListItems(this.context.component.popupElement);
      const firstListItemSpan = listItems[0].querySelector('span > span') as HTMLElement;
      expect(firstListItemSpan.innerText).toBe('e');
    });

    it('should use first value in array as value is multiple values passed in single selection mode', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.value = [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]];
      await tick();

      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[0].value);
    });

    it('should set value after initial filter via IOption or regular data type', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      this.context.component.debounce = 0;
      this.context.component.open = true;
      await tick();

      this.context.component.value = DEFAULT_FILTER_OPTIONS[0];
      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[0].value);

      await tick();

      this.context.component.value = DEFAULT_FILTER_OPTIONS[1].value;
      expect(this.context.component.value).toBe(DEFAULT_FILTER_OPTIONS[1].value);
    });

    it('should be connected', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.isConnected).toBe(true, 'Expected component to be connected to the DOM');
      expect(this.context.component instanceof AutocompleteComponent).toBe(true, 'Expected component to be instance of AutocompleteComponent');
    });
  });

  describe('with dynamic <input> element', function(this: ITestContext) {
    it('should not initialize if input element is not provided', async function(this: ITestContext) {
      this.context = setupDynamicTestContext(true);
      await tick();
      expect(this.context.component.isInitialized).toBe(false);
    });

    it('should initialize if input is provided', async function(this: ITestContext) {
      this.context = setupDynamicTestContext(true);
      this.context.component.appendChild(this.context.input);
      await tick();
      expect(this.context.component.isInitialized).toBe(true);
    });

    it('should be connected', function(this: ITestContext) {
      this.context = setupDynamicTestContext(true);
      expect(this.context.component.isConnected).toBe(true, 'Expected component to be connected to the DOM');
      expect(this.context.component instanceof AutocompleteComponent).toBe(true, 'Expected component to be instance of AutocompleteComponent');
    });
  });

  describe('with text-field and icon', function(this: ITestContext) {
    it('should open dropdown if icon clicked', async function(this: ITestContext) {
      this.context = setupTextFieldTestContext(true);
      this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
      await tick();
      (this.context as ITestAutocompleteTextFieldContext).iconElement.click();
      await tick();
      await tick(); // There is another rAF that is run when clicking the icon so we need to wait twice
      expect(document.activeElement).toBe(this.context.input);
      expect(this.context.component.popupElement).not.toBeNull();
    });
  });

  describe('AutocompleteComponentDelegate', function(this: ITestContext) {
    it('should create text field and set value', function(this: ITestContext) {
      this.context = setupDelegateTestContext(true);
      const textField = this.context.component.querySelector(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      expect(textField).not.toBeNull();
    });

    it('should set value', async function(this: ITestContext) {
      this.context = setupDelegateTestContext(true);
      const delegate = (this.context as ITestAutoCompleteDelegateContext).delegate;
      delegate.value = 1;
      await tick();
      expect(delegate.textFieldDelegate.value).toBe('One');
      expect(delegate.value).toBe(1);
    });

    it('should set dropdown icon', async function(this: ITestContext) {
      const { props, options } = DEFAULT_AUTOCOMPLETE_TEXTFIELD_DELEGATE_CONFIG;
      this.context = setupDelegateTestContext(true, props, options);
      await tick();
      const icon = this.context.component.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.DROPDOWN_ICON);
      expect(icon).not.toBeNull();
    });

    it('should not set dropdown icon', async function(this: ITestContext) {
      this.context = setupDelegateTestContext(true, {}, { useDropdownIcon: false });
      await tick();
      const icon = this.context.component.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.DROPDOWN_ICON);
      expect(icon).toBeNull();
    });

    it('should set input value and call filter function', async function(this: ITestContext) {
      const filterSpy = jasmine.createSpy('filter spy');
      const filter: AutocompleteFilterCallback = text => {
        filterSpy();
        return [];
      };
      this.context = setupDelegateTestContext(true, { filter } );
      await tick();

      this.context.input.focus();
      const delegate = (this.context as ITestAutoCompleteDelegateContext).delegate;
      delegate.textFieldDelegate.value = 'test';
      this.context.input.dispatchEvent(new Event('input'));
      await timer(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(delegate.textFieldDelegate.value).toBe('test');
      expect(filterSpy).toHaveBeenCalledTimes(1);
    });

    it('should call onChange handler', async function(this: ITestContext) {
      this.context = setupDelegateTestContext(true);
      const onChangeSpy = jasmine.createSpy('onChange');
      const delegate = (this.context as ITestAutoCompleteDelegateContext).delegate;
      delegate.onChange(onChangeSpy);
      await tick();

      delegate.element.open = true;
      await tick();
      _clickListItem(0, this.context.component.popupElement);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should render with selected value text if value set before connecting', async function(this: ITestContext) {
      const filterSpy = jasmine.createSpy('filter spy');
      const filter: AutocompleteFilterCallback = text => {
        filterSpy();
        return [DEFAULT_FILTER_OPTIONS[0]];
      };
      this.context = setupDelegateTestContext(false, { filter } );
      const delegate = (this.context as ITestAutoCompleteDelegateContext).delegate;
      delegate.value = DEFAULT_FILTER_OPTIONS[0].value;
      (this.context as ITestAutoCompleteDelegateContext).append();
      await tick();
      expect(delegate.textFieldDelegate.value).toBe(DEFAULT_FILTER_OPTIONS[0].label);
      expect(filterSpy).toHaveBeenCalledTimes(1);
    });

    it('should render with selected value text if value set before connecting via IOption', async function(this: ITestContext) {
      this.context = setupDelegateTestContext(false, DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG);
      const delegate = (this.context as ITestAutoCompleteDelegateContext).delegate;
      delegate.value = { ...DEFAULT_FILTER_OPTIONS[0] };
      (this.context as ITestAutoCompleteDelegateContext).append();
      await tick();
      expect(delegate.textFieldDelegate.value).toBe(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should call new filter function if reset with value selected', async function(this: ITestContext) {
      const initialFilter = () => [];
      const newFilter = () => DEFAULT_FILTER_OPTIONS;
      const newFilterSpy = jasmine.createSpy('new filter spy', newFilter).and.callThrough();

      this.context = setupDelegateTestContext(false, { filter: initialFilter });
      const delegate = (this.context as ITestAutoCompleteDelegateContext).delegate;
      delegate.value = 1;
      (this.context as ITestAutoCompleteDelegateContext).append();

      await tick();
      this.context.component.filter = newFilterSpy;

      expect(newFilterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('events',  function(this: ITestContext) {
    describe('beforeValueChange', function(this: ITestContext) {
      it('should not select item if resolves to false', async function(this: ITestContext) {
        this.context = setupTestContext(true);
        this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
        this.context.component.beforeValueChange = () => new Promise(resolve => resolve(false));

        _triggerDropdownClick(this.context.input);

        await tick();
        _clickListItem(2, this.context.component.popupElement);
        await tick();

        expect(this.context.component.value).toBe(null);
      });

      it('should select item if resolves to true', async function(this: ITestContext) {
        this.context = setupTestContext(true);
        this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
        this.context.component.beforeValueChange = () => new Promise(resolve => resolve(true));

        _triggerDropdownClick(this.context.input);

        await tick();
        const listItems = _getListItems(this.context.component.popupElement);
        _clickListItem(2, this.context.component.popupElement);
        await tick();

        expect(this.context.component.value).toBe(listItems[2].value);
      });

      it('should select item if beforeValueChange resolves to true only after a period of time', async function(this: ITestContext) {
        this.context = setupTestContext(true);
        this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
        this.context.component.beforeValueChange = () => new Promise(resolve => {
          setTimeout(() => resolve(true), 1000);
        });

        _triggerDropdownClick(this.context.input);

        await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
        await tick();
        const listItems = _getListItems(this.context.component.popupElement);
        _clickListItem(2, this.context.component.popupElement);
        expect(this.context.component.value).toBe(null);
        await timer(1000);
        await tick();

        expect(this.context.component.value).toBe(listItems[2].value);
      });

       it('should pass in to-be new value in beforeValueChange', async function(this: ITestContext) {
        this.context = setupTestContext(true);
        let newValue = '';
        this.context.component.filter = () => DEFAULT_FILTER_OPTIONS;
        this.context.component.beforeValueChange = value => {
          newValue = value;
          return new Promise(resolve => resolve(true));
        };

        _triggerDropdownClick(this.context.input);

        await tick();
        const listItems = _getListItems(this.context.component.popupElement);
        _clickListItem(2, this.context.component.popupElement);
        await tick();

        expect(newValue).toBe(listItems[2].value);
      });
    });

  });

  interface ITestAutocompleteGroup {
    headerElement: HTMLElement;
    options: IOption[];
  }

  function setupDelegateTestContext(append = false, props: AutocompleteComponentDelegateProps = DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG, options: IAutocompleteComponentDelegateOptions = {}): ITestAutoCompleteDelegateContext {
    const fixture = document.createElement('div');
    fixture.id = 'autocomplete-test-fixture';
    const delegate = new AutocompleteComponentDelegate({ props, options });
    const input = delegate.element.querySelector('input') as HTMLInputElement;
    const optionElements: IOptionComponent[] = [];
    fixture.appendChild(delegate.element);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      delegate,
      component: delegate.element,
      input,
      optionElements,
      append: () => {
        document.body.appendChild(fixture);
      },
      destroy: () => {
        tryCleanupPopups();
        removeElement(fixture);
      }
    };
  }

  function setupTestContext(append = false): ITestAutocompleteContext {
    const fixture = document.createElement('div');
    fixture.id = 'autocomplete-test-fixture';
    const component = document.createElement(AUTOCOMPLETE_CONSTANTS.elementName) as IAutocompleteComponent;
    const input = document.createElement('input') as HTMLInputElement;
    component.appendChild(input);
    const optionElements: IOptionComponent[] = [];
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      input,
      optionElements,
      destroy: () => {
        tryCleanupPopups();
        removeElement(fixture);
      }
    }
  }

  function setupTextFieldTestContext(
    append = false
  ): ITestAutocompleteTextFieldContext {
    const fixture = document.createElement('div');
    fixture.id = 'autocomplete-test-fixture';
    const component = document.createElement(AUTOCOMPLETE_CONSTANTS.elementName) as IAutocompleteComponent;
    const textFieldElement = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
    const input = document.createElement('input') as HTMLInputElement;
    input.type = 'text';
    input.id = 'autocomplete-id';
    const label = document.createElement('label') as HTMLLabelElement;
    label.setAttribute('for', input.id);
    const iconElement = document.createElement('i') as HTMLElement;
    iconElement.slot = 'trailing';
    iconElement.classList.add('tyler-icons');
    iconElement.classList.add('forge-dropdown-icon');
    iconElement.setAttribute('data-forge-dropdown-icon', '');
    iconElement.setAttribute('aria-hidden', 'true');
    iconElement.textContent = 'arrow_drop_down';
    textFieldElement.appendChild(input);
    textFieldElement.appendChild(label);
    textFieldElement.appendChild(iconElement);
    component.appendChild(textFieldElement);
    const optionElements: IOptionComponent[] = [];
    DEFAULT_FILTER_OPTIONS.forEach(o => {
      const list = document.createElement(LIST_CONSTANTS.elementName) as HTMLElement;
      const option = document.createElement(OPTION_CONSTANTS.elementName);
      option.setAttribute(LIST_ITEM_CONSTANTS.attributes.VALUE, o.value.toString());
      option.textContent = o.label;
      optionElements.push(option);
      list.appendChild(option);
      component.appendChild(list);
    });
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      input,
      label,
      iconElement,
      destroy: () => {
        tryCleanupPopups();
        removeElement(fixture);
      }
    }
  }

  function setupDynamicTestContext(
    append = false
  ): ITestAutocompleteDynamicContext {
    const fixture = document.createElement('div');
    fixture.id = 'autocomplete-test-fixture';
    const component = document.createElement(AUTOCOMPLETE_CONSTANTS.elementName) as IAutocompleteComponent;
    const input = document.createElement('input') as HTMLInputElement;
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      input,
      destroy: () => {
        tryCleanupPopups();
        removeElement(fixture);
      }
    };
  }

  function _getPopupOptions(popupElement: HTMLElement | null): IOption[] {
    if (!popupElement) {
      return [];
    }
    const listItems = Array.from(popupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
    return listItems.map(li => ({ label: li.innerText, value: li.value } as IOption));
  }

  function _getListItems(popupElement: HTMLElement | null): IListItemComponent[] {
    if (!popupElement) {
      return [];
    }
    return Array.from(popupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
  }

  function _triggerDropdownClick(input: HTMLInputElement): void {
    input.focus();
    input.click();
  }

  function _sendInputValue(input: HTMLInputElement, value: string): void {
    input.focus();
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  function _clickListItem(index: number, popupElement: HTMLElement | null): void {
    const listItems = _getListItems(popupElement);
    if (index >= 0 && index < listItems.length) {
      const shadowEl = listItems[index].shadowRoot!.firstElementChild as IListItemComponent;
      shadowEl.click();
    }
  }

  function _getActiveListItemIndex(popupElement: HTMLElement | null): number {
    const listItems = _getListItems(popupElement);
    return listItems.findIndex(li => li.active);
  }

  function _getPopupGroups(popupElement: HTMLElement | null): ITestAutocompleteGroup[] {
    const groups = Array.from(popupElement!.querySelectorAll(`.${LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER}`)) as HTMLElement[];
    return groups.map(groupElement => {
      const headerElement = groupElement.firstElementChild as HTMLElement;
      const options = Array.from(groupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      return {
        headerElement,
        options: options.map(o => ({ label: o.innerText, value: o.value }))
      };
    });
  }
});

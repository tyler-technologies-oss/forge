import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import {
  AUTOCOMPLETE_CONSTANTS,
  AutocompleteComponent,
  AutocompleteComponentDelegate,
  AutocompleteComponentDelegateProps,
  AutocompleteFilterCallback,
  AutocompleteMode,
  AutocompleteOptionBuilder,
  defineAutocompleteComponent,
  IAutocompleteAdapter,
  IAutocompleteComponent,
  IAutocompleteComponentDelegateConfig,
  IAutocompleteComponentDelegateOptions,
  IAutocompleteCore,
  IAutocompleteOptionGroup
} from './index';
import { AVATAR_CONSTANTS, IAvatarComponent } from '../avatar';
import { frame, task } from '../core/utils/utils';
import { FIELD_CONSTANTS } from '../field';
import { ICON_CONSTANTS, IconComponent } from '../icon';
import { ILinearProgressComponent, LINEAR_PROGRESS_CONSTANTS } from '../linear-progress';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list';
import { LIST_DROPDOWN_CONSTANTS } from '../list-dropdown';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../popover';
import { IOption, IOptionComponent } from '../select';
import { ISkeletonComponent, SKELETON_CONSTANTS } from '../skeleton';
import { ITextFieldComponent, ITextFieldComponentDelegateOptions, TEXT_FIELD_CONSTANTS } from '../text-field';

import './autocomplete';

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

const POPOVER_ANIMATION_DURATION = 200;

type AutocompleteAdapterInternal = IAutocompleteAdapter & { _component: AutocompleteComponentInternal; _targetElement: HTMLElement };
type AutocompleteCoreInternal = IAutocompleteCore & { _adapter: AutocompleteAdapterInternal; _pendingFilterPromises: Promise<IOption[]>[] };
type AutocompleteComponentInternal = IAutocompleteComponent & { _core: AutocompleteCoreInternal };

class AutocompleteHarness {
  public component: AutocompleteComponentInternal;
  public input: HTMLInputElement;
  public optionElements: IOptionComponent[] = [];

  constructor(component: AutocompleteComponentInternal, input: HTMLInputElement, optionElements: IOptionComponent[] = []) {
    this.component = component;
    this.input = input;
    this.optionElements = optionElements;
  }

  public destroy(): void {
    this._tryCleanupPopovers();
    if (this.component.isConnected) {
      this.component.remove();
    }
  }

  private _tryCleanupPopovers(): void {
    const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popovers.forEach(popover => popover.remove());
  }
}

class AutocompleteDynamicHarness {
  public component: AutocompleteComponentInternal;
  public input: HTMLInputElement;

  constructor(component: AutocompleteComponentInternal, input: HTMLInputElement) {
    this.component = component;
    this.input = input;
  }

  public destroy(): void {
    this._tryCleanupPopovers();
    if (this.component.isConnected) {
      this.component.remove();
    }
  }

  private _tryCleanupPopovers(): void {
    const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popovers.forEach(popover => popover.remove());
  }
}

class AutocompleteTextFieldHarness {
  public component: AutocompleteComponentInternal;
  public label: HTMLLabelElement;
  public input: HTMLInputElement;
  public iconElement: HTMLElement;

  constructor(component: AutocompleteComponentInternal, label: HTMLLabelElement, input: HTMLInputElement, iconElement: HTMLElement) {
    this.component = component;
    this.label = label;
    this.input = input;
    this.iconElement = iconElement;
  }

  public destroy(): void {
    this._tryCleanupPopovers();
    if (this.component.isConnected) {
      this.component.remove();
    }
  }

  private _tryCleanupPopovers(): void {
    const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popovers.forEach(popover => popover.remove());
  }
}

class AutocompleteDelegateHarness {
  public component: IAutocompleteComponent;
  public delegate: AutocompleteComponentDelegate;
  public input: HTMLInputElement;
  public optionElements: IOptionComponent[] = [];

  constructor(component: IAutocompleteComponent, delegate: AutocompleteComponentDelegate, input: HTMLInputElement, optionElements: IOptionComponent[] = []) {
    this.component = component;
    this.delegate = delegate;
    this.input = input;
    this.optionElements = optionElements;
  }

  public destroy(): void {
    this._tryCleanupPopovers();
    if (this.component.isConnected) {
      this.component.remove();
    }
  }

  private _tryCleanupPopovers(): void {
    const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popovers.forEach(popover => popover.remove());
  }
}

interface ITestAutocompleteGroup {
  headerElement: HTMLElement;
  options: IOption[];
}

async function createFixture(): Promise<AutocompleteHarness> {
  const el = await fixture<AutocompleteComponentInternal>(html`
    <forge-autocomplete>
      <input type="text" />
    </forge-autocomplete>
  `);

  const input = el.querySelector('input') as HTMLInputElement;
  return new AutocompleteHarness(el, input);
}

async function createDynamicFixture(): Promise<AutocompleteDynamicHarness> {
  const el = await fixture<AutocompleteComponentInternal>(html` <forge-autocomplete></forge-autocomplete> `);

  const input = document.createElement('input') as HTMLInputElement;
  return new AutocompleteDynamicHarness(el, input);
}

async function createTextFieldFixture(includeIconElement = true): Promise<AutocompleteTextFieldHarness> {
  const template = html`
    <forge-autocomplete>
      <forge-text-field popover-icon="${!includeIconElement}">
        <input type="text" id="autocomplete-id" />
        <label for="autocomplete-id">Label</label>
        ${includeIconElement
          ? html`<i slot="trailing" class="tyler-icons forge-dropdown-icon" data-forge-dropdown-icon aria-hidden="true">arrow_drop_down</i>`
          : ''}
      </forge-text-field>
    </forge-autocomplete>
  `;

  const el = await fixture<AutocompleteComponentInternal>(template);
  const textField = el.querySelector(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
  const input = textField.querySelector('input') as HTMLInputElement;
  const label = textField.querySelector('label') as HTMLLabelElement;
  const iconElement = textField.querySelector('i') as HTMLElement;

  return new AutocompleteTextFieldHarness(el, label, input, iconElement);
}

function createDelegateFixture(
  props: AutocompleteComponentDelegateProps = DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG,
  options: IAutocompleteComponentDelegateOptions = {}
): AutocompleteDelegateHarness {
  const delegate = new AutocompleteComponentDelegate({ props, options });
  const input = delegate.element.querySelector('input') as HTMLInputElement;
  const optionElements: IOptionComponent[] = [];
  document.body.appendChild(delegate.element);

  return new AutocompleteDelegateHarness(delegate.element, delegate, input, optionElements);
}

function getPopoverIcon(component: IAutocompleteComponent): HTMLElement | null | undefined {
  return component
    .querySelector(TEXT_FIELD_CONSTANTS.elementName)
    ?.shadowRoot?.querySelector(FIELD_CONSTANTS.elementName)
    ?.shadowRoot?.querySelector(FIELD_CONSTANTS.selectors.POPOVER_ICON);
}

function _getPopupOptions(popupElement: HTMLElement | null): (IOption & { selected?: boolean })[] {
  if (!popupElement) {
    return [];
  }
  const listItems = Array.from(popupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
  return listItems.map(li => ({ label: li.innerText, value: li.value, selected: li.selected }));
}

function _toLabelValue(options: IOption[]): Array<{ label: IOption['label']; value: IOption['value'] }> {
  return options.map(({ label, value }) => ({ label, value }));
}

function _getListItems(popupElement: HTMLElement | null): IListItemComponent<any>[] {
  if (!popupElement) {
    return [];
  }
  return Array.from(popupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent<any>[];
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

describe('AutocompleteComponent', () => {
  before(() => {
    defineAutocompleteComponent();
  });

  describe('with static <input> element', () => {
    let harness: AutocompleteHarness;

    afterEach(() => {
      harness?.destroy();
    });

    it('should call filter callback', async () => {
      harness = await createFixture();
      const filterCb = spy();
      harness.component.filter = () => {
        filterCb();
        return [];
      };
      _triggerDropdownClick(harness.input);
      await frame();
      expect(filterCb).to.have.been.calledOnce;
    });

    it('should not call filter callback if filter on focus is turned off', async () => {
      harness = await createFixture();
      const filterCb = spy();
      harness.component.filter = () => {
        filterCb();
        return [];
      };
      harness.component.filterOnFocus = false;
      _triggerDropdownClick(harness.input);
      await frame();
      expect(harness.component.filterOnFocus).to.be.false;
      expect(filterCb).to.not.have.been.called;
    });

    it('should not show popup if no filter options are provided', async () => {
      harness = await createFixture();
      harness.component.filter = () => [];
      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION + 100); // Extra delay to allow for cleanup

      expect(harness.component.popupElement).to.be.null;
    });

    it('should show popup if filter options are provided', async () => {
      harness = await createFixture();
      harness.component.filter = () => [{ label: 'One', value: 1 }];
      _triggerDropdownClick(harness.input);
      await frame();

      expect(harness.component.popupElement).to.not.be.null;
    });

    it('should show popup programatically', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.openDropdown();
      await frame();

      expect(harness.component.open).to.be.true;
      expect(harness.component.popupElement).to.not.be.null;
    });

    it('should close popup programatically', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.openDropdown();
      await task();
      harness.component.closeDropdown();
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.component.open).to.be.false;
      expect(harness.component.popupElement).to.be.null;
    });

    it('aria-controls attribute should be present when the popup is opened and closed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      expect(harness.input.hasAttribute('aria-controls')).to.be.true;
      harness.component.openDropdown();
      await task();
      harness.component.closeDropdown();
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.component.open).to.be.false;
      expect(harness.component.popupElement).to.be.null;
      expect(harness.input.hasAttribute('aria-controls')).to.be.true;
    });

    it('should not highlight first option in popup by default', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(harness.input);

      await frame();
      const listItems = _getListItems(harness.component.popupElement);

      expect(listItems.every(li => !li.active)).to.be.true;
    });

    it('should not close popup when programmatically adding values', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;

      _triggerDropdownClick(harness.input);
      await frame();

      _clickListItem(0, harness.component.popupElement);
      _clickListItem(1, harness.component.popupElement);
      harness.component.value = [DEFAULT_FILTER_OPTIONS[2]];

      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[2].label);
      expect(harness.component.open).to.be.true;
    });

    it('should append options while dropdown is open', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(harness.input);
      await frame();
      harness.component.appendOptions([{ label: 'New option', value: 'new' }]);
      await frame();
      const listItems = _getListItems(harness.component.popupElement);
      expect(listItems[listItems.length - 1].value).to.equal('new');
    });

    it('should use default debounce value', async () => {
      harness = await createFixture();
      expect(harness.component.debounce).to.equal(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
    });

    it('should call filter after debounce elapses', async () => {
      harness = await createFixture();
      const filterSpy = spy();

      harness.component.filter = () => {
        filterSpy();
        return [];
      };
      _sendInputValue(harness.input, 'a');

      expect(filterSpy).to.not.have.been.called;
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      expect(filterSpy).to.have.been.called;
    });

    it('should use custom debounce time', async () => {
      harness = await createFixture();
      const filterSpy = spy();

      harness.component.debounce = 200;
      harness.component.filter = () => {
        filterSpy();
        return [];
      };
      _sendInputValue(harness.input, 'a');

      expect(filterSpy).to.not.have.been.called;
      await task(200);
      expect(filterSpy).to.have.been.called;
    });

    it('should not use debounce if set to 0', async () => {
      harness = await createFixture();
      const filterSpy = spy();

      harness.component.debounce = 0;
      harness.component.filter = () => {
        filterSpy();
        return [];
      };
      _sendInputValue(harness.input, 'a');

      expect(filterSpy).to.have.been.called;
    });

    it('should display filtered options in dropdown on initial click', async () => {
      harness = await createFixture();
      harness.component.debounce = 0;
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(harness.input);
      await frame();
      const popupOptions = _toLabelValue(_getPopupOptions(harness.component.popupElement));
      expect(popupOptions).to.deep.equal(DEFAULT_FILTER_OPTIONS);
    });

    it('should display filtered options in dropdown after entering character', async () => {
      harness = await createFixture();
      harness.component.debounce = 0;
      harness.component.filter = () => [DEFAULT_FILTER_OPTIONS[0]];
      _sendInputValue(harness.input, 'one');
      await frame();
      const popupOptions = _toLabelValue(_getPopupOptions(harness.component.popupElement));
      expect(popupOptions).to.deep.equal([DEFAULT_FILTER_OPTIONS[0]]);
    });

    it('should update selected options in dropdown after filtering', async () => {
      harness = await createFixture();
      harness.component.allowUnmatched = true;
      harness.component.debounce = 0;
      harness.component.value = 1;
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.open = true;

      await frame();

      let popupOptions = _getPopupOptions(harness.component.popupElement);
      expect(popupOptions[0].selected).to.be.true;

      await _sendInputValue(harness.input, 'o');
      await frame();
      popupOptions = _getPopupOptions(harness.component.popupElement);

      expect(popupOptions.every(o => !o.selected)).to.be.true;
    });

    it('should emit change event when clicking option in dropdown', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.open = true;
      await frame();
      _clickListItem(0, harness.component.popupElement);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0]).to.be.instanceOf(CustomEvent);
      expect(changeSpy.firstCall.args[0].detail).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
    });

    it('should emit change event when clicking option in dropdown in multiple mode', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.multiple = true;
      _triggerDropdownClick(harness.input);
      await frame();
      _clickListItem(0, harness.component.popupElement);
      _clickListItem(1, harness.component.popupElement);
      expect(harness.input.value).to.equal('2 options selected');
      expect(harness.component.value).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(changeSpy).to.have.been.calledTwice;
    });

    it('should emit select event when clicking option in dropdown in stateless mode', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      const selectSpy = spy();
      harness.component.mode = AutocompleteMode.Stateless;
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SELECT, selectSpy);
      harness.component.open = true;

      await frame();
      _clickListItem(0, harness.component.popupElement);

      expect(harness.input.value).to.equal('');
      expect(harness.component.value).to.be.null;
      expect(changeSpy).to.not.have.been.called;
      expect(selectSpy).to.have.been.calledOnce;
    });

    it('should not close dropdown if select event is canceled in stateless mode', async () => {
      harness = await createFixture();
      const selectSpy = spy((evt: Event) => evt.preventDefault());
      harness.component.mode = AutocompleteMode.Stateless;
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SELECT, selectSpy);
      harness.component.open = true;

      const filterText = 'o';
      _sendInputValue(harness.input, filterText);
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      await frame();
      _clickListItem(0, harness.component.popupElement);

      expect(harness.input.value).to.equal(filterText);
      expect(harness.component.open).to.be.true;
    });

    it('should set value', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.value = DEFAULT_FILTER_OPTIONS[0].value;
      await frame();
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should set value when multiple is allowed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value];
      await frame();
      expect(harness.component.value).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(harness.input.value).to.equal('2 options selected');
    });

    it('should set single option value when one option is selected in multiple mode', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0].value];
      await frame();
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should set label via match key', async () => {
      const filterOptions = [
        { label: 'One', value: { id: 'one', value: 1 } },
        { label: 'Two', value: { id: 'two', value: 2 } },
        { label: 'Three', value: { id: 'three', value: 3 } }
      ];

      harness = await createFixture();
      harness.component.matchKey = 'id';
      harness.component.filter = () => filterOptions;
      harness.component.value = { id: 'one', value: null };
      await frame();

      expect(harness.input.value).to.equal(filterOptions[0].label);
    });

    it('should close dropdown when input is blurred', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(harness.input);
      await frame();

      expect(harness.component.popupElement).to.not.be.null;

      harness.input.dispatchEvent(new Event('blur'));
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.component.popupElement).to.be.null;
    });

    it('should not open dropdown when receiving focus in input', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.input.focus();
      await frame();
      expect(harness.component.popupElement).to.be.null;
    });

    it('should highlight next option when arrow down key is pressed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should highlight previous option when arrow up key is pressed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // 0
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // 1
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' })); // 0

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should wrap active element highlight previous', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(2);
    });

    it('should wrap active element highlight next', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      // We have 3 options
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 0
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 1
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 2
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 0

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should highlight last item if end key is pressed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(2);
    });

    it('should highlight first item if home key is pressed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should close the dropdown if escape key is pressed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.component.popupElement).to.be.null;
    });

    it('should emit change event if backspace is pressed to clear text', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.value = 1;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      harness.input.value = '';
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.be.null;
      expect(harness.component.value).to.be.null;
    });

    it('should clear value if input text is removed', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.value = 1;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      _sendInputValue(harness.input, '');

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.be.null;
      expect(harness.component.value).to.be.null;
    });

    it('should clear value if input text is changed with allow unmatched turned on', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.allowUnmatched = true;
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.value = 1;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      _sendInputValue(harness.input, 'test');

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.be.null;
      expect(harness.component.value).to.be.null;
    });

    it('should select active option if enter key is pressed', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should not emit change event if enter key is pressed in multiple mode when only one disabled option exists in the filtered options', async () => {
      harness = await createFixture();
      harness.component.multiple = true;
      function filter(filterText: string, value: any): Promise<IOption[]> {
        return new Promise<IOption[]>(resolve => {
          resolve([{ label: 'No results', value: undefined, disabled: true }]);
        });
      }
      const filterSpy = spy(filter);
      harness.component.filter = filterSpy;
      const changeSpy = spy();
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      _sendInputValue(harness.input, 'other');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(filterSpy).to.have.been.called;
      expect(changeSpy).to.not.have.been.called;
    });

    it('should not select active option if input is blurred', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.blur();

      expect(changeSpy).to.not.have.been.called;
      expect(harness.component.value).to.be.null;
      expect(harness.input.value).to.equal('');
    });

    it('should select active option if input is blurred via tab key', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should not select active option if input is blurred in multiple mode', async () => {
      harness = await createFixture();
      harness.component.multiple = true;
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.blur();

      expect(changeSpy).to.not.have.been.called;
      expect(harness.component.value).to.deep.equal([]);
      expect(harness.input.value).to.equal('');
    });

    it('should select multiple options when enter key is pressed in multiple mode', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      _triggerDropdownClick(harness.input);
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      const listItems = _getListItems(harness.component.popupElement);
      expect(listItems[0].selected).to.be.true;
      expect((listItems[0].querySelector(ICON_CONSTANTS.elementName) as IconComponent).name).to.equal('check_box');
      expect(listItems[1].selected).to.be.true;
      expect((listItems[1].querySelector(ICON_CONSTANTS.elementName) as IconComponent).name).to.equal('check_box');
      expect(changeSpy).to.have.been.calledTwice;
      expect(changeSpy.firstCall.args[0].detail).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value]);
      expect(changeSpy.secondCall.args[0].detail).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(harness.component.value).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(harness.input.value).to.equal('2 options selected');
    });

    it('should toggle option when in multiple mode', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      _triggerDropdownClick(harness.input);
      await frame();

      _clickListItem(1, harness.component.popupElement);
      await frame();
      _clickListItem(1, harness.component.popupElement);
      await frame();

      const listItems = _getListItems(harness.component.popupElement);
      expect(listItems[1].selected).to.be.false;
      expect((listItems[1].querySelector(ICON_CONSTANTS.elementName) as IconComponent)!.name).to.equal('check_box_outline_blank');
      expect(changeSpy).to.have.been.calledTwice;
      expect(changeSpy.firstCall.args[0].detail).to.deep.equal([DEFAULT_FILTER_OPTIONS[1].value]);
      expect(changeSpy.secondCall.args[0].detail).to.deep.equal([]);
      expect(harness.component.value).to.deep.equal([]);
      expect(harness.input.value).to.equal('');
    });

    it('should not select any options if enter key is pressed when no item is highlighted', async () => {
      harness = await createFixture();
      const changeSpy = spy();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).to.not.have.been.called;
      expect(harness.component.value).to.be.null;
      expect(harness.input.value).to.equal('');
    });

    it('should open popup if down arrow is pressed', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.input.focus();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.component.popupElement).to.not.be.null;
    });

    it('should activate first option if opened via down arrow key when there is no option selected', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.input.focus();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should activate selected option if opened via down arrow key when there is a selected option', async () => {
      const expectedSelectedIndex = 1;
      harness = await createFixture();
      harness.component.value = DEFAULT_FILTER_OPTIONS[expectedSelectedIndex].value;
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.input.focus();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(expectedSelectedIndex);
    });

    it('should activate first option when filtering', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.input.focus();
      harness.component.openDropdown();

      await task(POPOVER_ANIMATION_DURATION);

      harness.input.value = 'o';
      harness.input.dispatchEvent(new Event('input'));
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(0);
    });

    it('should not activate first option if filterFocusFirst is false', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.filterFocusFirst = false;
      harness.input.focus();
      harness.component.openDropdown();

      await task(POPOVER_ANIMATION_DURATION);

      harness.input.value = 'o';
      harness.input.dispatchEvent(new Event('input'));
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(-1);
    });

    it('should not activate first option when clearing filter text', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.value = DEFAULT_FILTER_OPTIONS[2].value;

      await frame();

      harness.input.focus();
      harness.input.value = '';
      harness.input.dispatchEvent(new Event('input'));

      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const activeListItemIndex = _getActiveListItemIndex(harness.component.popupElement);
      expect(activeListItemIndex).to.equal(-1);
    });

    it('should set CSS class on popup', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.popupClasses = 'test-class';
      harness.component.openDropdown();
      await frame();

      expect(harness.component.popupClasses).to.deep.equal(['test-class']);
      expect(harness.component.popupElement!.classList.contains('test-class')).to.be.true;
    });

    it('should sync popup width to popup target', async () => {
      harness = await createFixture();
      harness.component.syncPopupWidth = true;
      harness.component.popupTarget = 'input';
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.openDropdown();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      const popup = harness.component.popupElement as HTMLElement;
      const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

      expect(harness.component.syncPopupWidth).to.be.true;
      expect(container!.getBoundingClientRect().width).to.equal(harness.input.getBoundingClientRect().width);
    });

    it('should set popup target', async () => {
      const expectedTargetElement = document.createElement('div');
      expectedTargetElement.id = 'test-popup-target';

      harness = await createFixture();
      harness.component.appendChild(expectedTargetElement);
      harness.component.popupTarget = '#test-popup-target';
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      await frame();

      harness.component.openDropdown();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      const targetElement = harness.component['_core']['_adapter']['_targetElement'];

      expect(targetElement).to.equal(expectedTargetElement);
    });

    it('should call option builder and display custom option template for each item', async () => {
      harness = await createFixture();
      const builder: AutocompleteOptionBuilder = (option, filterText, parentElement) => {
        const div = document.createElement('div');
        div.id = `custom-option-${option.value}`;
        div.textContent = option.label;
        return div;
      };
      const builderSpy = spy(builder);
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.optionBuilder = builderSpy;
      harness.component.openDropdown();
      await frame();
      const listItems = _getListItems(harness.component.popupElement);
      const allOptionsUseBuilder = listItems.every((li, index) => {
        const div = li.querySelector('button')?.firstElementChild;
        return div && div.id === `custom-option-${li.value}`;
      });
      expect(builderSpy).to.have.callCount(3);
      expect(allOptionsUseBuilder).to.be.true;
    });

    it('should emit scroll bottom event', async () => {
      harness = await createFixture();
      harness.component.observeScroll = true;
      harness.component.observeScrollThreshold = 100;
      harness.component.filter = () => {
        const items: IOption[] = [];
        for (let i = 0; i < 100; i++) {
          items.push({ label: `Option #${i}`, value: i });
        }
        return items;
      };
      harness.component.openDropdown();
      const scrolledBottomSpy = spy();
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM, scrolledBottomSpy);
      await frame();
      const popup = harness.component.popupElement as HTMLElement;
      const scrollElement = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);
      scrollElement.scrollTop = scrollElement.scrollHeight - harness.component.observeScrollThreshold;
      await frame();
      expect(scrolledBottomSpy).to.have.been.calledOnce;
    });

    it('should set scroll observer if set while popup is open', async () => {
      harness = await createFixture();
      harness.component.filter = () => {
        const items: IOption[] = [];
        for (let i = 0; i < 100; i++) {
          items.push({ label: `Option #${i}`, value: i });
        }
        return items;
      };
      harness.component.observeScroll = true;
      harness.component.openDropdown();
      const scrolledBottomSpy = spy();
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM, scrolledBottomSpy);
      await frame();

      const popup = harness.component.popupElement as HTMLElement;
      const scrollElement = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);
      scrollElement.scrollTop = scrollElement.scrollHeight;

      await frame();
      expect(scrolledBottomSpy).to.have.been.calledOnce;
    });

    it('should set configuration via attributes', async () => {
      harness = await createFixture();
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.MODE, AutocompleteMode.Stateless);
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.MULTIPLE, 'true');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.DEBOUNCE, '1000');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.FILTER_ON_FOCUS, 'false');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.ALLOW_UNMATCHED, 'true');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.POPUP_TARGET, 'input');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.POPUP_CLASSES, 'test-class');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OPTION_LIMIT, '10');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL, '10');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OBSERVE_SCROLL_THRESHOLD, '100');
      harness.component.setAttribute(AUTOCOMPLETE_CONSTANTS.attributes.SYNC_POPUP_WIDTH, 'true');

      expect(harness.component.mode).to.equal(AutocompleteMode.Stateless);
      expect(harness.component.multiple).to.be.true;
      expect(harness.component.debounce).to.equal(1000);
      expect(harness.component.filterOnFocus).to.be.false;
      expect(harness.component.allowUnmatched).to.be.true;
      expect(harness.component.popupTarget).to.equal('input');
      expect(harness.component.popupClasses).to.deep.equal(['test-class']);
      expect(harness.component.optionLimit).to.equal(10);
      expect(harness.component.observeScroll).to.be.true;
      expect(harness.component.observeScrollThreshold).to.equal(100);
      expect(harness.component.syncPopupWidth).to.be.true;
    });

    it('should use selected text builder', async () => {
      harness = await createFixture();
      function builder(selectedOptions: IOption[]): string {
        return selectedOptions.map(o => o.label).join(', ');
      }
      const selectedTextBuilderSpy = spy(builder);
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.selectedTextBuilder = selectedTextBuilderSpy;
      harness.component.multiple = true;
      harness.component.open = true;
      await frame();
      _clickListItem(0, harness.component.popupElement);
      await frame();
      _clickListItem(1, harness.component.popupElement);
      await frame();
      expect(selectedTextBuilderSpy).to.have.been.calledTwice;
      expect(harness.input.value).to.equal(`${DEFAULT_FILTER_OPTIONS[0].label}, ${DEFAULT_FILTER_OPTIONS[1].label}`);
    });

    it('should show skeleton loader when initially opened', async () => {
      harness = await createFixture();
      harness.component.filter = () =>
        new Promise<IOption[]>(resolve => {
          setTimeout(() => {
            resolve(DEFAULT_FILTER_OPTIONS);
          }, 1000);
        });
      harness.component.open = true;
      await frame();

      const popup = harness.component.popupElement;
      const skeletons = Array.from(popup!.querySelectorAll(SKELETON_CONSTANTS.elementName)) as ISkeletonComponent[];
      const listItems = _getListItems(harness.component.popupElement);
      const linearProgress = popup!.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;

      expect(skeletons.length).to.equal(3);
      expect(listItems.length).to.equal(0);
      expect(getComputedStyle(linearProgress).display).to.equal('none');
    });

    it('should toggle linear progress when filtering', async () => {
      harness = await createFixture();
      const timeout = 200;
      harness.component.filter = () =>
        new Promise<IOption[]>(resolve => {
          setTimeout(() => {
            resolve(DEFAULT_FILTER_OPTIONS);
          }, timeout);
        });
      harness.component.open = true;
      await task(timeout);
      _sendInputValue(harness.input, 'e');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      const popup = harness.component.popupElement;
      const skeletons = Array.from(popup!.querySelectorAll(SKELETON_CONSTANTS.elementName)) as ISkeletonComponent[];
      const linearProgress = popup!.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;

      expect(skeletons.length).to.equal(0);
      expect(getComputedStyle(linearProgress).display).to.not.equal('none');

      await task(timeout);
      expect(getComputedStyle(linearProgress).display).to.equal('none');
    });

    it('should handle multiple filter requests in proper order', async () => {
      harness = await createFixture();
      function filter(filterText: string, value: any): Promise<IOption[]> {
        return new Promise<IOption[]>(resolve => {
          resolve(DEFAULT_FILTER_OPTIONS);
        });
      }
      const filterSpy = spy(filter);
      harness.component.filter = filterSpy;
      harness.component.filterOnFocus = false;

      _sendInputValue(harness.input, 'o');
      _sendInputValue(harness.input, 'on');
      _sendInputValue(harness.input, 'e');

      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(filterSpy).to.have.been.calledOnce;
      expect(filterSpy).to.have.been.calledWith('e', null);
    });

    it('should execute initial filter callback with selected value', async () => {
      harness = await createFixture();
      function filter(filterText: string, value: any): Promise<IOption[]> {
        return new Promise<IOption[]>(resolve => {
          resolve(DEFAULT_FILTER_OPTIONS);
        });
      }
      const filterSpy = spy(filter);
      harness.component.filter = filterSpy;
      harness.component.value = 1;

      _triggerDropdownClick(harness.input);
      await frame();

      expect(filterSpy).to.have.been.calledTwice;
      expect(filterSpy).to.have.been.calledWith('', 1);
      expect(filterSpy).to.have.been.calledWith('', null);
    });

    it('should close dropdown if filter completes without the input having focus anymore', async () => {
      harness = await createFixture();
      harness.component.filter = () =>
        new Promise<IOption[]>(resolve => {
          setTimeout(() => {
            resolve(DEFAULT_FILTER_OPTIONS);
          }, 1000);
        });
      harness.component.allowUnmatched = true;
      harness.component.filterOnFocus = false;
      _sendInputValue(harness.input, 'e');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      harness.input.dispatchEvent(new Event('blur'));
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.component.popupElement).to.be.null;
    });

    it('should keep selected options at top of list in popup', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;
      harness.component.openDropdown();
      await frame();

      _clickListItem(1, harness.component.popupElement);
      _clickListItem(2, harness.component.popupElement);

      harness.component.closeDropdown();
      await task(POPOVER_ANIMATION_DURATION);

      harness.component.openDropdown();
      await frame();

      const listItems = _getListItems(harness.component.popupElement);

      expect(listItems[0].value).to.equal(DEFAULT_FILTER_OPTIONS[1].value);
      expect(listItems[0].selected).to.be.true;
      expect(listItems[1].value).to.equal(DEFAULT_FILTER_OPTIONS[2].value);
      expect(listItems[1].selected).to.be.true;
      expect(listItems[2].value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(listItems[2].selected).to.be.false;
    });

    it('should handle cancelling filter requests if focus is lost after filter has been triggered', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.openDropdown();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      _sendInputValue(harness.input, 'a');
      harness.input.dispatchEvent(new Event('blur'));
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(harness.component.popupElement).to.be.null;
      expect(harness.component['_core']._pendingFilterPromises).to.deep.equal([]);
    });

    it('should cancel all pending filters if an exception is thrown in filter callback', async () => {
      harness = await createFixture();
      harness.component.filter = () =>
        new Promise((resolve, reject) => {
          reject('Fake rejection');
        });
      await frame();
      _sendInputValue(harness.input, 'a');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(harness.component.popupElement).to.be.null;
      expect(harness.component['_core']._pendingFilterPromises).to.deep.equal([]);
    });

    it('should handle subsequent out of order filters', async () => {
      harness = await createFixture();
      // This filter simulates a request for filterText = a finishing before filterText = b
      harness.component.filter = filterText =>
        new Promise(resolve => {
          if (filterText === 'a') {
            setTimeout(() => resolve([{ label: 'A', value: 'a' }]), 200);
          } else if (filterText === 'b') {
            setTimeout(() => resolve([{ label: 'B', value: 'b' }]), 100);
          } else {
            resolve(DEFAULT_FILTER_OPTIONS);
          }
        });
      harness.component.filterOnFocus = false;
      harness.component.open = true;
      await frame();

      // Send a filter request for 'a' then send filter request for 'b' immediately after
      _sendInputValue(harness.input, 'a');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      _sendInputValue(harness.input, 'b');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      // We need to wait for the simulated filter to return due to setTimeout above, then check for the options in the dropdown
      await task(300);
      await frame();

      const options = _toLabelValue(_getPopupOptions(harness.component.popupElement));
      expect(options).to.deep.equal([{ label: 'B', value: 'b' }]);
    });

    it('should reset filter function', async () => {
      harness = await createFixture();
      const initialFilter = (): IOption[] => DEFAULT_FILTER_OPTIONS;
      const newFilter = (): IOption[] => DEFAULT_FILTER_OPTIONS;
      const initialFilterSpy = spy(initialFilter);
      const newFilterSpy = spy(newFilter);

      harness.component.filter = initialFilterSpy;
      await frame();

      harness.component.filter = newFilterSpy;
      _sendInputValue(harness.input, 'a');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(initialFilterSpy).to.not.have.been.called;
      expect(newFilterSpy).to.have.been.calledOnce;
    });

    it('should update selected text if selectedTextBuilder is set after a value is selected', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.multiple = true;
      harness.component.open = true;
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value];
      await frame();

      expect(harness.input.value).to.equal('2 options selected');

      harness.component.selectedTextBuilder = selectedOptions => selectedOptions.map(o => o.label).join(', ');
      await frame();

      expect(harness.input.value).to.equal(`${DEFAULT_FILTER_OPTIONS[0].label}, ${DEFAULT_FILTER_OPTIONS[1].label}`);
    });

    it('should accept grouped options', async () => {
      harness = await createFixture();
      harness.component.filter = () => [
        { text: 'Group one', options: [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]] },
        { text: 'Group two', options: [DEFAULT_FILTER_OPTIONS[2]] }
      ];
      harness.component.open = true;
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      const popupGroups = _getPopupGroups(harness.component.popupElement);
      expect(popupGroups.length).to.equal(2);
      expect(popupGroups[0].headerElement.textContent).to.equal('Group one');
      expect(popupGroups[0].options.length).to.equal(2);
      expect(popupGroups[1].headerElement.textContent).to.equal('Group two');
      expect(popupGroups[1].options.length).to.equal(1);
    });

    it('should render custom header for option groups', async () => {
      harness = await createFixture();
      function optionGroupBuilder(option: IAutocompleteOptionGroup): HTMLElement {
        const avatar = document.createElement(AVATAR_CONSTANTS.elementName) as IAvatarComponent;
        avatar.text = option.text!;
        return avatar;
      }

      harness.component.filter = () => [
        { text: 'One', builder: optionGroupBuilder, options: [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]] },
        { text: 'Two', builder: optionGroupBuilder, options: [DEFAULT_FILTER_OPTIONS[2]] }
      ];
      harness.component.open = true;
      await frame();

      const popupGroups = _getPopupGroups(harness.component.popupElement);
      expect((popupGroups[0].headerElement as IAvatarComponent).text).to.equal('One');
      expect((popupGroups[1].headerElement as IAvatarComponent).text).to.equal('Two');
    });

    it('should highlight filter text in options by default', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.open = true;
      await frame();

      _sendInputValue(harness.input, 'e');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      const listItems = _getListItems(harness.component.popupElement);
      const firstListItemSpan = listItems[0].querySelector('span > span') as HTMLElement;
      expect(firstListItemSpan.innerText).to.equal('e');
    });

    it('should use first value in array as value is multiple values passed in single selection mode', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]];
      await frame();

      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
    });

    it('should set value after initial filter via IOption or regular data type', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.debounce = 0;
      harness.component.open = true;
      await frame();

      harness.component.value = DEFAULT_FILTER_OPTIONS[0];
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);

      await frame();

      harness.component.value = DEFAULT_FILTER_OPTIONS[1].value;
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[1].value);
    });

    it('should be connected', async () => {
      harness = await createFixture();
      expect(harness.component.isConnected).to.be.true;
      expect(harness.component instanceof AutocompleteComponent).to.be.true;
    });

    it('should remove popover when removed from DOM while open', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.open = true;
      await frame();

      harness.component.remove();
      await frame();

      expect(harness.component.popupElement).to.be.null;
    });
  });

  describe('with dynamic <input> element', () => {
    let harness: AutocompleteDynamicHarness;

    afterEach(() => {
      harness?.destroy();
    });

    it('should wait for input element to initialize', async () => {
      harness = await createDynamicFixture();
      await task(100);
      harness.component.appendChild(harness.input);
      await frame();

      expect(harness.component.isInitialized).to.be.true;
    });

    it('should initialize if input is provided', async () => {
      harness = await createDynamicFixture();
      harness.component.appendChild(harness.input);
      await frame();
      expect(harness.component.isInitialized).to.be.true;
    });

    it('should be connected', async () => {
      harness = await createDynamicFixture();
      expect(harness.component.isConnected).to.be.true;
      expect(harness.component instanceof AutocompleteComponent).to.be.true;
    });

    it('should keep dropdown open when selecting options in stateless + multiple mode', async () => {
      const staticHarness = await createFixture();
      staticHarness.component.mode = 'stateless';
      staticHarness.component.multiple = true;
      staticHarness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(staticHarness.input);
      await frame();

      expect(staticHarness.component.popupElement).to.not.be.null;

      _clickListItem(0, staticHarness.component.popupElement);
      expect(staticHarness.component.popupElement).to.not.be.null;

      _clickListItem(1, staticHarness.component.popupElement);
      expect(staticHarness.component.popupElement).to.not.be.null;

      staticHarness.destroy();
    });
  });

  describe('with text-field and icon', () => {
    let harness: AutocompleteTextFieldHarness;

    afterEach(() => {
      harness?.destroy();
    });

    it('should open dropdown if icon clicked', async () => {
      harness = await createTextFieldFixture(true);
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      await frame();
      harness.iconElement.click();
      await frame();
      await frame(); // There is another rAF that is run when clicking the icon so we need to wait twice
      expect(document.activeElement).to.equal(harness.input);
      expect(harness.component.popupElement).to.not.be.null;
    });

    it('should open dropdown if popover icon clicked', async () => {
      harness = await createTextFieldFixture(false);
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      await frame();
      const popoverIcon = getPopoverIcon(harness.component);
      expect(popoverIcon).to.not.be.undefined;

      harness.input.focus();
      const mousedownEvent = new MouseEvent('mousedown', { cancelable: true });
      popoverIcon?.dispatchEvent(mousedownEvent);
      popoverIcon?.dispatchEvent(new MouseEvent('click'));
      expect(mousedownEvent.defaultPrevented).to.be.true;

      await frame();
      expect(document.activeElement).to.equal(harness.input);
      expect(harness.component.popupElement).to.not.be.null;
    });

    it('should close dropdown if popover icon clicked while open', async () => {
      harness = await createTextFieldFixture(false);
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(harness.input);
      await frame();
      expect(harness.component.popupElement).to.not.be.null;
      const popoverIcon = getPopoverIcon(harness.component);
      expect(popoverIcon).to.not.be.undefined;

      popoverIcon?.dispatchEvent(new MouseEvent('click'));

      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.component.popupElement).to.be.null;
    });
  });

  describe('AutocompleteComponentDelegate', () => {
    let harness: AutocompleteDelegateHarness;

    afterEach(() => {
      harness?.destroy();
    });

    it('should create text field and set value', () => {
      harness = createDelegateFixture();
      const textField = harness.component.querySelector(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      expect(textField).to.not.be.null;
    });

    it('should set value', async () => {
      harness = createDelegateFixture();
      harness.delegate.value = 1;
      await frame();
      expect(harness.delegate.textFieldDelegate.value).to.equal('One');
      expect(harness.delegate.value).to.equal(1);
    });

    it('should set dropdown icon', async () => {
      const { props, options } = DEFAULT_AUTOCOMPLETE_TEXTFIELD_DELEGATE_CONFIG;
      harness = createDelegateFixture(props, options);
      await frame();
      const icon = harness.component.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.DROPDOWN_ICON);
      expect(icon).to.not.be.null;
    });

    it('should not set dropdown icon', async () => {
      harness = createDelegateFixture({}, { useDropdownIcon: false });
      await frame();
      const icon = harness.component.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.DROPDOWN_ICON);
      expect(icon).to.be.null;
    });

    it('should set input value and call filter function', async () => {
      const filterSpy = spy();
      const filter: AutocompleteFilterCallback = text => {
        filterSpy();
        return [];
      };
      harness = createDelegateFixture({ filter });
      await frame();

      harness.input.focus();
      harness.delegate.textFieldDelegate.value = 'test';
      harness.input.dispatchEvent(new Event('input'));
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(harness.delegate.textFieldDelegate.value).to.equal('test');
      expect(filterSpy).to.have.been.calledOnce;
    });

    it('should call onChange handler', async () => {
      harness = createDelegateFixture();
      const onChangeSpy = spy();
      harness.delegate.onChange(onChangeSpy);
      await frame();

      harness.delegate.element.open = true;
      await frame();
      _clickListItem(0, harness.component.popupElement);

      expect(onChangeSpy).to.have.been.calledOnce;
    });

    it('should render with selected value text if value set before connecting', async () => {
      const filterSpy = spy();
      const filter: AutocompleteFilterCallback = text => {
        filterSpy();
        return [DEFAULT_FILTER_OPTIONS[0]];
      };

      const delegate = new AutocompleteComponentDelegate({ props: { filter }, options: {} });
      const input = delegate.element.querySelector('input') as HTMLInputElement;
      harness = new AutocompleteDelegateHarness(delegate.element, delegate, input, []);

      delegate.value = DEFAULT_FILTER_OPTIONS[0].value;
      document.body.appendChild(delegate.element);
      await frame();
      expect(delegate.textFieldDelegate.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
      expect(filterSpy).to.have.been.calledOnce;
    });

    it('should render with selected value text if value set before connecting via IOption', async () => {
      const delegate = new AutocompleteComponentDelegate({ props: DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG, options: {} });
      const input = delegate.element.querySelector('input') as HTMLInputElement;
      harness = new AutocompleteDelegateHarness(delegate.element, delegate, input, []);

      delegate.value = { ...DEFAULT_FILTER_OPTIONS[0] };
      document.body.appendChild(delegate.element);
      await frame();
      expect(delegate.textFieldDelegate.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should call new filter function if reset with value selected', async () => {
      const initialFilter = (): IOption[] => [];
      const newFilter = (): IOption[] => DEFAULT_FILTER_OPTIONS;
      const newFilterSpy = spy(newFilter);

      const delegate = new AutocompleteComponentDelegate({ props: { filter: initialFilter }, options: {} });
      const input = delegate.element.querySelector('input') as HTMLInputElement;
      harness = new AutocompleteDelegateHarness(delegate.element, delegate, input, []);

      delegate.value = 1;
      document.body.appendChild(delegate.element);

      await frame();
      harness.component.filter = newFilterSpy;

      expect(newFilterSpy).to.have.been.calledOnce;
    });
  });

  describe('events', () => {
    describe('beforeValueChange', () => {
      let harness: AutocompleteHarness;

      afterEach(() => {
        harness?.destroy();
      });

      it('should not select item if resolves to false', async () => {
        harness = await createFixture();
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
        harness.component.beforeValueChange = () => new Promise(resolve => resolve(false));

        _triggerDropdownClick(harness.input);

        await frame();
        _clickListItem(2, harness.component.popupElement);
        await frame();

        expect(harness.component.value).to.be.null;
      });

      it('should select item if resolves to true', async () => {
        harness = await createFixture();
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
        harness.component.beforeValueChange = () => new Promise(resolve => resolve(true));

        _triggerDropdownClick(harness.input);

        await frame();
        const listItems = _getListItems(harness.component.popupElement);
        _clickListItem(2, harness.component.popupElement);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);
      });

      it('should select item if beforeValueChange resolves to true only after a period of time', async () => {
        harness = await createFixture();
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
        harness.component.beforeValueChange = () =>
          new Promise(resolve => {
            setTimeout(() => resolve(true), 1000);
          });

        _triggerDropdownClick(harness.input);

        await task(POPOVER_ANIMATION_DURATION);
        await frame();
        const listItems = _getListItems(harness.component.popupElement);
        _clickListItem(2, harness.component.popupElement);
        expect(harness.component.value).to.be.null;
        await task(1000);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);
      });

      it('should pass in to-be new value in beforeValueChange', async () => {
        harness = await createFixture();
        let newValue = '';
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
        harness.component.beforeValueChange = value => {
          newValue = value;
          return new Promise(resolve => resolve(true));
        };

        _triggerDropdownClick(harness.input);

        await frame();
        const listItems = _getListItems(harness.component.popupElement);
        _clickListItem(2, harness.component.popupElement);
        await frame();

        expect(newValue).to.equal(listItems[2].value);
      });

      it('should force filter callback to execute and update selected value', async () => {
        harness = await createFixture();
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

        _triggerDropdownClick(harness.input);

        await frame();
        const listItems = _getListItems(harness.component.popupElement);
        _clickListItem(2, harness.component.popupElement);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);

        harness.component.filter = () => [
          { label: `${DEFAULT_FILTER_OPTIONS[2].label} UPDATED`, value: DEFAULT_FILTER_OPTIONS[2].value },
          { label: 'New', value: 'new' }
        ];
        harness.component.forceFilter();

        await frame();

        expect(harness.input.value).to.equal(`${DEFAULT_FILTER_OPTIONS[2].label} UPDATED`);
        expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[2].value);
      });

      it('should force filter callback to execute and remove selected value', async () => {
        harness = await createFixture();
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

        _triggerDropdownClick(harness.input);

        await frame();
        const listItems = _getListItems(harness.component.popupElement);
        _clickListItem(2, harness.component.popupElement);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);

        harness.component.filter = () => [{ label: 'New', value: 'new' }];
        harness.component.forceFilter();

        await frame();

        expect(harness.input.value).to.equal('');
        expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[2].value);
      });

      it('should force filter callback to execute and preserve selected value if not present in new filtered options', async () => {
        harness = await createFixture();
        harness.component.filter = () => DEFAULT_FILTER_OPTIONS;

        _triggerDropdownClick(harness.input);

        await frame();
        const listItems = _getListItems(harness.component.popupElement);
        _clickListItem(2, harness.component.popupElement);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);

        harness.component.filter = () => [{ label: 'New', value: 'new' }];
        harness.component.forceFilter({ preserveValue: true });

        await frame();

        expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[2].label);
        expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[2].value);
      });
    });
  });

  describe('list dropdown API', () => {
    let harness: AutocompleteHarness;

    afterEach(() => {
      harness?.destroy();
    });

    it('should set popover flip', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.popoverFlip = 'never';
      harness.component.openDropdown();
      await task();

      const popover = harness.component.popupElement as IPopoverComponent;

      expect(harness.component.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover flip from attribute', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.setAttribute('popover-flip', 'never');
      harness.component.openDropdown();
      await task();

      const popover = harness.component.popupElement as IPopoverComponent;

      expect(harness.component.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover shift', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.popoverShift = 'never';
      harness.component.openDropdown();
      await task();

      const popover = harness.component.popupElement as IPopoverComponent;

      expect(harness.component.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });

    it('should set popover shift from attribute', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.setAttribute('popover-shift', 'never');
      harness.component.openDropdown();
      await task();

      const popover = harness.component.popupElement as IPopoverComponent;

      expect(harness.component.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });

    it('should set popover fallback placements', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.popoverFallbackPlacements = ['top'];
      harness.component.openDropdown();
      await task();

      const popover = harness.component.popupElement as IPopoverComponent;

      expect(harness.component.popoverFallbackPlacements).to.deep.equal(['top']);
      expect(popover.fallbackPlacements).to.deep.equal(['top']);
    });

    it('should set popover offset', async () => {
      harness = await createFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      harness.component.popoverOffset = { mainAxis: 10, crossAxis: 10 };
      harness.component.openDropdown();
      await task();

      const popover = harness.component.popupElement as IPopoverComponent;

      expect(harness.component.popoverOffset).to.deep.equal({ mainAxis: 10, crossAxis: 10 });
      expect(popover.offset).to.deep.equal({ mainAxis: 10, crossAxis: 10 });
    });
  });

  it('should update open status if popup dismissed via click inside the anchor element', async () => {
    const harness = await createFixture();
    harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
    harness.component.openDropdown();
    await task();
    harness.input.click();
    await task(POPOVER_ANIMATION_DURATION);
    expect(harness.component.open).to.be.false;
    expect(harness.component.popupElement).to.be.null;
    harness.destroy();
  });
});

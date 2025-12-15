import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { nothing } from 'lit';
import { spy } from 'sinon';
import { AVATAR_CONSTANTS, IAvatarComponent } from '../avatar';
import { frame, task } from '../core/utils/utils';
import { FIELD_CONSTANTS } from '../field';
import { ICON_CONSTANTS, IconComponent } from '../icon';
import { ILinearProgressComponent, LINEAR_PROGRESS_CONSTANTS } from '../linear-progress';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list';
import { LIST_DROPDOWN_CONSTANTS } from '../list-dropdown';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../popover';
import { IOption } from '../select';
import { ISkeletonComponent, SKELETON_CONSTANTS } from '../skeleton';
import { ITextFieldComponent, ITextFieldComponentDelegateOptions, TEXT_FIELD_CONSTANTS } from '../text-field';
import {
  AUTOCOMPLETE_CONSTANTS,
  AutocompleteComponent,
  AutocompleteComponentDelegate,
  AutocompleteComponentDelegateProps,
  AutocompleteFilterCallback,
  AutocompleteMode,
  AutocompleteOptionBuilder,
  IAutocompleteAdapter,
  IAutocompleteComponent,
  IAutocompleteComponentDelegateConfig,
  IAutocompleteComponentDelegateOptions,
  IAutocompleteCore,
  IAutocompleteOption,
  IAutocompleteOptionGroup
} from './';

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

interface ITestAutocompleteGroup {
  headerElement: HTMLElement;
  options: IOption[];
}

describe('AutocompleteComponent', () => {
  describe('with static <input> element', () => {
    it('should call filter callback', async () => {
      const filterCb = spy();
      const harness = await createFixture({
        filter: () => {
          filterCb();
          return [];
        }
      });
      harness.triggerDropdownClick();
      await frame();
      expect(filterCb).to.have.been.calledOnce;
    });

    it('should not call filter callback if filter on focus is turned off', async () => {
      const filterCb = spy();
      const harness = await createFixture({
        filter: () => {
          filterCb();
          return [];
        },
        filterOnFocus: false
      });
      harness.triggerDropdownClick();
      await frame();
      expect(harness.component.filterOnFocus).to.be.false;
      expect(filterCb).to.not.have.been.called;
    });

    it('should not show popup if no filter options are provided', async () => {
      const harness = await createFixture({
        filter: () => []
      });
      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.popupElement).to.be.null;
    });

    it('should show popup if filter options are provided', async () => {
      const harness = await createFixture({
        filter: () => [{ label: 'One', value: 1 }]
      });
      harness.triggerDropdownClick();
      await frame();

      expect(harness.popupElement).to.not.be.null;
    });

    it('should show popup programatically', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.openDropdown();
      await frame();

      expect(harness.component.open).to.be.true;
      expect(harness.popupElement).to.not.be.null;
    });

    it('should close popup programatically', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.openDropdown();
      await task();
      harness.component.closeDropdown();
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.component.open).to.be.false;
      expect(harness.popupElement).to.be.null;
    });

    it('aria-controls attribute should be present when the popup is opened and closed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      expect(harness.input.hasAttribute('aria-controls')).to.be.true;
      harness.component.openDropdown();
      await task();
      harness.component.closeDropdown();
      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.component.open).to.be.false;
      expect(harness.popupElement).to.be.null;
      expect(harness.input.hasAttribute('aria-controls')).to.be.true;
    });

    it('should not highlight first option in popup by default', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.triggerDropdownClick();

      await frame();
      const listItems = harness.getListItems();

      expect(listItems.every(li => !li.active)).to.be.true;
    });

    it('should not close popup when programmatically adding values', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });

      harness.triggerDropdownClick();
      await frame();

      harness.clickListItem(0);
      harness.clickListItem(1);
      harness.component.value = [DEFAULT_FILTER_OPTIONS[2]];

      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[2].label);
      expect(harness.component.open).to.be.true;
    });

    it('should append options while dropdown is open', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.triggerDropdownClick();
      await frame();
      harness.component.appendOptions([{ label: 'New option', value: 'new' }]);
      await frame();
      const listItems = harness.getListItems();
      expect(listItems[listItems.length - 1].value).to.equal('new');
    });

    it('should use default debounce value', async () => {
      const harness = await createFixture();
      expect(harness.component.debounce).to.equal(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
    });

    it('should call filter after debounce elapses', async () => {
      const filterSpy = spy();
      const harness = await createFixture({
        filter: () => {
          filterSpy();
          return [];
        }
      });
      harness.sendInputValue('a');

      expect(filterSpy).to.not.have.been.called;
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      expect(filterSpy).to.have.been.called;
    });

    it('should use custom debounce time', async () => {
      const filterSpy = spy();
      const harness = await createFixture({
        debounce: 200,
        filter: () => {
          filterSpy();
          return [];
        }
      });
      harness.sendInputValue('a');

      expect(filterSpy).to.not.have.been.called;
      await task(200);
      expect(filterSpy).to.have.been.called;
    });

    it('should not use debounce if set to 0', async () => {
      const filterSpy = spy();
      const harness = await createFixture({
        debounce: 0,
        filter: () => {
          filterSpy();
          return [];
        }
      });
      harness.sendInputValue('a');

      expect(filterSpy).to.have.been.called;
    });

    it('should display filtered options in dropdown on initial click', async () => {
      const harness = await createFixture({
        debounce: 0,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.triggerDropdownClick();
      await frame();
      const popupOptions = _toLabelValue(harness.getPopupOptions());
      expect(popupOptions).to.deep.equal(DEFAULT_FILTER_OPTIONS);
    });

    it('should display filtered options in dropdown after entering character', async () => {
      const harness = await createFixture({
        debounce: 0,
        filter: () => [DEFAULT_FILTER_OPTIONS[0]]
      });
      harness.sendInputValue('one');
      await frame();
      const popupOptions = _toLabelValue(harness.getPopupOptions());
      expect(popupOptions).to.deep.equal([DEFAULT_FILTER_OPTIONS[0]]);
    });

    it('should update selected options in dropdown after filtering', async () => {
      const harness = await createFixture({
        allowUnmatched: true,
        debounce: 0,
        value: 1,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.open = true;

      await frame();

      let popupOptions = harness.getPopupOptions();
      expect(popupOptions[0].selected).to.be.true;

      harness.sendInputValue('o');
      await frame();
      popupOptions = harness.getPopupOptions();

      expect(popupOptions.every(o => !o.selected)).to.be.true;
    });

    it('should emit change event when clicking option in dropdown', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.open = true;
      await frame();
      harness.clickListItem(0);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0]).to.be.instanceOf(CustomEvent);
      expect(changeSpy.firstCall.args[0].detail).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
    });

    it('should emit change event when clicking option in dropdown in multiple mode', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.triggerDropdownClick();
      await frame();
      harness.clickListItem(0);
      harness.clickListItem(1);
      expect(harness.input.value).to.equal('2 options selected');
      expect(harness.component.value).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(changeSpy).to.have.been.calledTwice;
    });

    it('should emit select event when clicking option in dropdown in stateless mode', async () => {
      const changeSpy = spy();
      const selectSpy = spy();
      const harness = await createFixture({
        mode: AutocompleteMode.Stateless,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SELECT, selectSpy);
      harness.component.open = true;

      await frame();
      harness.clickListItem(0);

      expect(harness.input.value).to.equal('');
      expect(harness.component.value).to.be.null;
      expect(changeSpy).to.have.callCount(0);
      expect(selectSpy).to.have.been.calledOnce;
    });

    it('should not close dropdown if select event is canceled in stateless mode', async () => {
      const selectSpy = spy((evt: CustomEvent) => evt.preventDefault());
      const harness = await createFixture({
        mode: AutocompleteMode.Stateless,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SELECT, selectSpy);
      harness.component.open = true;

      const filterText = 'o';
      harness.sendInputValue(filterText);
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      await frame();
      harness.clickListItem(0);

      expect(harness.input.value).to.equal(filterText);
      expect(harness.component.open).to.be.true;
    });

    it('should set value', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        value: DEFAULT_FILTER_OPTIONS[0].value
      });
      await frame();
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should set value when multiple is allowed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value];
      await frame();
      expect(harness.component.value).to.deep.equal([DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value]);
      expect(harness.input.value).to.equal('2 options selected');
    });

    it('should set single option value when one option is selected in multiple mode', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true,
        value: [DEFAULT_FILTER_OPTIONS[0].value]
      });
      await frame();
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should set label via match key', async () => {
      const filterOptions = [
        { label: 'One', value: { id: 'one', value: 1 } },
        { label: 'Two', value: { id: 'two', value: 2 } },
        { label: 'Three', value: { id: 'three', value: 3 } }
      ];

      const harness = await createFixture({
        matchKey: 'id',
        filter: () => filterOptions,
        value: { id: 'one', value: null }
      });
      await frame();

      expect(harness.input.value).to.equal(filterOptions[0].label);
    });

    it('should close dropdown when input is blurred', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.triggerDropdownClick();
      await frame();

      expect(harness.popupElement).to.not.be.null;

      harness.input.dispatchEvent(new Event('blur'));
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.popupElement).to.be.null;
    });

    it('should not open dropdown when receiving focus in input', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.input.focus();
      await frame();
      expect(harness.popupElement).to.be.null;
    });

    it('should highlight next option when arrow down key is pressed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(0);
    });

    it('should highlight previous option when arrow up key is pressed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // 0
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // 1
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' })); // 0

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(0);
    });

    it('should wrap active element highlight previous', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(2);
    });

    it('should wrap active element highlight next', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 0
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 1
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 2
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })); // Index 0

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(0);
    });

    it('should highlight last item if end key is pressed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(2);
    });

    it('should highlight first item if home key is pressed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(0);
    });

    it('should close the dropdown if escape key is pressed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.popupElement).to.be.null;
    });

    it('should emit change event if backspace is pressed to clear text', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        value: 1
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      harness.input.value = '';
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.be.null;
      expect(harness.component.value).to.be.null;
    });

    it('should clear value if input text is removed', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        value: 1
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      harness.sendInputValue('');

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.be.null;
      expect(harness.component.value).to.be.null;
    });

    it('should clear value if input text is changed with allow unmatched turned on', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        allowUnmatched: true,
        filter: () => DEFAULT_FILTER_OPTIONS,
        value: 1
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      harness.sendInputValue('test');

      expect(changeSpy).to.have.been.calledOnce;
      expect(changeSpy.firstCall.args[0].detail).to.be.null;
      expect(harness.component.value).to.be.null;
    });

    it('should select active option if enter key is pressed', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      harness.triggerDropdownClick();
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
      const filterSpy = spy(() => Promise.resolve([{ label: 'No results', value: undefined, disabled: true }]));
      const changeSpy = spy();
      const harness = await createFixture({
        multiple: true,
        filter: filterSpy
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.sendInputValue('other');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(filterSpy).to.have.been.called;
      expect(changeSpy).to.not.have.been.called;
    });

    it('should not select active option if input is blurred', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.blur();

      expect(changeSpy).to.not.have.been.called;
      expect(harness.component.value).to.be.null;
      expect(harness.input.value).to.equal('');
    });

    it('should select active option if input is blurred via tab key', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      harness.triggerDropdownClick();
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
      const changeSpy = spy();
      const harness = await createFixture({
        multiple: true,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      harness.input.blur();

      expect(changeSpy).to.not.have.been.called;
      expect(harness.component.value).to.deep.equal([]);
      expect(harness.input.value).to.equal('');
    });

    it('should select first option on blur after pending filter resolves', async () => {
      const filterSpy = spy();
      const harness = await createFixture({
        selectFirstOptionOnBlur: true,
        debounce: 100,
        filter: () =>
          new Promise(resolve => {
            filterSpy();
            setTimeout(() => resolve(DEFAULT_FILTER_OPTIONS), 50);
          })
      });

      harness.sendInputValue('o');
      harness.input.blur();

      await task(200);
      await frame();

      expect(filterSpy).to.have.been.calledOnce;
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(harness.input.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should select multiple options when enter key is pressed in multiple mode', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.triggerDropdownClick();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      const listItems = harness.getListItems();
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
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);
      harness.triggerDropdownClick();
      await frame();

      harness.clickListItem(1);
      await frame();
      harness.clickListItem(1);
      await frame();

      const listItems = harness.getListItems();
      expect(listItems[1].selected).to.be.false;
      expect((listItems[1].querySelector(ICON_CONSTANTS.elementName) as IconComponent)!.name).to.equal('check_box_outline_blank');
      expect(changeSpy).to.have.been.calledTwice;
      expect(changeSpy.firstCall.args[0].detail).to.deep.equal([DEFAULT_FILTER_OPTIONS[1].value]);
      expect(changeSpy.secondCall.args[0].detail).to.deep.equal([]);
      expect(harness.component.value).to.deep.equal([]);
      expect(harness.input.value).to.equal('');
    });

    it('should not select any options if enter key is pressed when no item is highlighted', async () => {
      const changeSpy = spy();
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.CHANGE, changeSpy);

      await task();
      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).to.have.callCount(0);
      expect(harness.component.value).to.be.null;
      expect(harness.input.value).to.equal('');
    });

    it('should open popup if down arrow is pressed', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.input.focus();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.popupElement).to.not.be.null;
    });

    it('should activate first option if opened via down arrow key when there is no option selected', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.input.focus();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(0);
    });

    it('should activate selected option if opened via down arrow key when there is a selected option', async () => {
      const expectedSelectedIndex = 1;
      const harness = await createFixture({
        value: DEFAULT_FILTER_OPTIONS[expectedSelectedIndex].value,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.input.focus();

      harness.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(expectedSelectedIndex);
    });

    it('should activate first option when filtering', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.input.focus();
      harness.component.openDropdown();

      await task(POPOVER_ANIMATION_DURATION);

      harness.input.value = 'o';
      harness.input.dispatchEvent(new Event('input'));
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(0);
    });

    it('should not activate first option if filterFocusFirst is false', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        filterFocusFirst: false
      });
      harness.input.focus();
      harness.component.openDropdown();

      await task(POPOVER_ANIMATION_DURATION);

      harness.input.value = 'o';
      harness.input.dispatchEvent(new Event('input'));
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(-1);
    });

    it('should not activate first option when clearing filter text', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        value: DEFAULT_FILTER_OPTIONS[2].value
      });

      await frame();

      harness.input.focus();
      harness.input.value = '';
      harness.input.dispatchEvent(new Event('input'));

      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const activeListItemIndex = harness.getActiveListItemIndex();
      expect(activeListItemIndex).to.equal(-1);
    });

    it('should set CSS class on popup', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        popupClasses: 'test-class'
      });
      harness.component.openDropdown();
      await frame();

      expect(harness.component.popupClasses).to.deep.equal(['test-class']);
      expect(harness.popupElement!.classList.contains('test-class')).to.be.true;
    });

    it('should sync popup width to popup target', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.syncPopupWidth = true;
      harness.component.popupTarget = 'input';
      harness.component.openDropdown();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      const popup = harness.popupElement as HTMLElement;
      const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

      expect(harness.component.syncPopupWidth).to.be.true;
      expect(container!.getBoundingClientRect().width).to.equal(harness.input.getBoundingClientRect().width);
    });

    it('should set popup target', async () => {
      const expectedTargetElement = document.createElement('div');
      expectedTargetElement.id = 'test-popup-target';

      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.appendChild(expectedTargetElement);
      harness.component.popupTarget = '#test-popup-target';
      await frame();

      harness.component.openDropdown();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);
      const targetElement = harness.component['_core']['_adapter']['_targetElement'];

      expect(targetElement).to.equal(expectedTargetElement);
    });

    it('should call option builder and display custom option template for each item', async () => {
      const builder: AutocompleteOptionBuilder = (option, filterText, parentElement) => {
        const div = document.createElement('div');
        div.id = `custom-option-${option.value}`;
        div.textContent = option.label;
        return div;
      };
      const builderSpy = spy(builder);
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.optionBuilder = builderSpy;
      harness.component.openDropdown();
      await frame();
      const listItems = harness.getListItems();
      const allOptionsUseBuilder = listItems.every((li, index) => {
        const div = li.querySelector('button')?.firstElementChild;
        return div && div.id === `custom-option-${li.value}`;
      });
      expect(builderSpy).to.have.been.calledThrice;
      expect(allOptionsUseBuilder).to.be.true;
    });

    it('should emit scroll bottom event', async () => {
      const harness = await createFixture({
        observeScroll: true,
        observeScrollThreshold: 100,
        filter: () => {
          const items: IOption[] = [];
          for (let i = 0; i < 100; i++) {
            items.push({ label: `Option #${i}`, value: i });
          }
          return items;
        }
      });
      harness.component.openDropdown();
      const scrolledBottomSpy = spy();
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM, scrolledBottomSpy);
      await frame();
      const popup = harness.popupElement as HTMLElement;
      const scrollElement = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
      scrollElement.scrollTop = scrollElement.scrollHeight - harness.component.observeScrollThreshold;
      await frame();
      expect(scrolledBottomSpy).to.have.been.calledOnce;
    });

    it('should set scroll observer if set while popup is open', async () => {
      const harness = await createFixture({
        filter: () => {
          const items: IOption[] = [];
          for (let i = 0; i < 100; i++) {
            items.push({ label: `Option #${i}`, value: i });
          }
          return items;
        }
      });
      harness.component.observeScroll = true;
      harness.component.openDropdown();
      const scrolledBottomSpy = spy();
      harness.component.addEventListener(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM, scrolledBottomSpy);
      await frame();

      const popup = harness.popupElement as HTMLElement;
      const scrollElement = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
      scrollElement.scrollTop = scrollElement.scrollHeight;

      await frame();
      expect(scrolledBottomSpy).to.have.been.calledOnce;
    });

    it('should set configuration via attributes', async () => {
      const harness = await createFixture();
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
      const builder = (selectedOptions: IOption[]): string => selectedOptions.map(o => o.label).join(', ');
      const selectedTextBuilderSpy = spy(builder);
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.selectedTextBuilder = selectedTextBuilderSpy;
      harness.component.open = true;
      await frame();
      harness.clickListItem(0);
      await frame();
      harness.clickListItem(1);
      await frame();
      expect(selectedTextBuilderSpy).to.have.been.calledTwice;
      expect(harness.input.value).to.equal(`${DEFAULT_FILTER_OPTIONS[0].label}, ${DEFAULT_FILTER_OPTIONS[1].label}`);
    });

    it('should show skeleton loader when initially opened', async () => {
      const harness = await createFixture({
        filter: () =>
          new Promise<IOption[]>(resolve => {
            setTimeout(() => {
              resolve(DEFAULT_FILTER_OPTIONS);
            }, 1000);
          })
      });
      harness.component.open = true;
      await frame();

      const popup = harness.popupElement;
      const skeletons = Array.from(popup!.querySelectorAll(SKELETON_CONSTANTS.elementName)) as ISkeletonComponent[];
      const listItems = harness.getListItems();
      const linearProgress = popup!.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;

      expect(skeletons.length).to.equal(3);
      expect(listItems.length).to.equal(0);
      expect(getComputedStyle(linearProgress).display).to.equal('none');
    });

    it('should toggle linear progress when filtering', async () => {
      const timeout = 200;
      const harness = await createFixture({
        filter: () =>
          new Promise<IOption[]>(resolve => {
            setTimeout(() => {
              resolve(DEFAULT_FILTER_OPTIONS);
            }, timeout);
          })
      });
      harness.component.open = true;
      await task(timeout);
      harness.sendInputValue('e');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      const popup = harness.popupElement;
      const skeletons = Array.from(popup!.querySelectorAll(SKELETON_CONSTANTS.elementName)) as ISkeletonComponent[];
      const linearProgress = popup!.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;

      expect(skeletons.length).to.equal(0);
      expect(getComputedStyle(linearProgress).display).to.not.equal('none');

      await task(timeout);
      expect(getComputedStyle(linearProgress).display).to.equal('none');
    });

    it('should handle multiple filter requests in proper order', async () => {
      const filterSpy = spy(() => Promise.resolve(DEFAULT_FILTER_OPTIONS));
      const harness = await createFixture({
        filter: filterSpy,
        filterOnFocus: false
      });

      harness.sendInputValue('o');
      harness.sendInputValue('on');
      harness.sendInputValue('e');

      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(filterSpy).to.have.been.calledOnce;
      expect(filterSpy).to.have.been.calledWith('e', null);
    });

    it('should execute initial filter callback with selected value', async () => {
      const filterSpy = spy(() => Promise.resolve(DEFAULT_FILTER_OPTIONS));
      const harness = await createFixture({
        filter: filterSpy,
        value: 1
      });

      harness.triggerDropdownClick();
      await frame();

      expect(filterSpy).to.have.been.calledTwice;
      expect(filterSpy).to.have.been.calledWith('', 1);
      expect(filterSpy).to.have.been.calledWith('', null);
    });

    it('should close dropdown if filter completes without the input having focus anymore', async () => {
      const harness = await createFixture({
        filter: () =>
          new Promise<IOption[]>(resolve => {
            setTimeout(() => {
              resolve(DEFAULT_FILTER_OPTIONS);
            }, 1000);
          }),
        allowUnmatched: true,
        filterOnFocus: false
      });
      harness.sendInputValue('e');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      harness.input.dispatchEvent(new Event('blur'));
      await task(POPOVER_ANIMATION_DURATION);

      expect(harness.popupElement).to.be.null;
    });

    it('should keep selected options at top of list in popup', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.openDropdown();
      await frame();

      harness.clickListItem(1);
      harness.clickListItem(2);

      harness.component.closeDropdown();
      await task(POPOVER_ANIMATION_DURATION);

      harness.component.openDropdown();
      await frame();

      const listItems = harness.getListItems();

      expect(listItems[0].value).to.equal(DEFAULT_FILTER_OPTIONS[1].value);
      expect(listItems[0].selected).to.be.true;
      expect(listItems[1].value).to.equal(DEFAULT_FILTER_OPTIONS[2].value);
      expect(listItems[1].selected).to.be.true;
      expect(listItems[2].value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
      expect(listItems[2].selected).to.be.false;
    });

    it('should handle cancelling filter requests if focus is lost after filter has been triggered', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.openDropdown();
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      harness.sendInputValue('a');
      harness.input.dispatchEvent(new Event('blur'));
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(harness.popupElement).to.be.null;
      expect(harness.component['_core']._pendingFilterPromises).to.deep.equal([]);
    });

    it('should cancel all pending filters if an exception is thrown in filter callback', async () => {
      const harness = await createFixture({
        filter: () =>
          new Promise((resolve, reject) => {
            reject('Fake rejection');
          })
      });
      await frame();
      harness.sendInputValue('a');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(harness.popupElement).to.be.null;
      expect(harness.component['_core']._pendingFilterPromises).to.deep.equal([]);
    });

    it('should handle subsequent out of order filters', async () => {
      const harness = await createFixture({
        filter: filterText =>
          new Promise(resolve => {
            if (filterText === 'a') {
              setTimeout(() => resolve([{ label: 'A', value: 'a' }]), 200);
            } else if (filterText === 'b') {
              setTimeout(() => resolve([{ label: 'B', value: 'b' }]), 100);
            } else {
              resolve(DEFAULT_FILTER_OPTIONS);
            }
          }),
        filterOnFocus: false
      });
      harness.component.open = true;
      await frame();

      harness.sendInputValue('a');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      harness.sendInputValue('b');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      await task(300);
      await frame();

      const options = _toLabelValue(harness.getPopupOptions());
      expect(options).to.deep.equal([{ label: 'B', value: 'b' }]);
    });

    it('should reset filter function', async () => {
      const initialFilter = (): IAutocompleteOption[] => DEFAULT_FILTER_OPTIONS;
      const newFilter = (): IAutocompleteOption[] => DEFAULT_FILTER_OPTIONS;
      const initialFilterSpy = spy(initialFilter);
      const newFilterSpy = spy(newFilter);

      const harness = await createFixture({
        filter: initialFilterSpy
      });
      await frame();

      harness.component.filter = newFilterSpy;
      harness.sendInputValue('a');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(initialFilterSpy).to.have.callCount(0);
      expect(newFilterSpy).to.have.been.calledOnce;
    });

    it('should update selected text if selectedTextBuilder is set after a value is selected', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        multiple: true
      });
      harness.component.open = true;
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0].value, DEFAULT_FILTER_OPTIONS[1].value];
      await frame();

      expect(harness.input.value).to.equal('2 options selected');

      harness.component.selectedTextBuilder = selectedOptions => selectedOptions.map(o => o.label).join(', ');
      await frame();

      expect(harness.input.value).to.equal(`${DEFAULT_FILTER_OPTIONS[0].label}, ${DEFAULT_FILTER_OPTIONS[1].label}`);
    });

    it('should accept grouped options', async () => {
      const harness = await createFixture({
        filter: () => [
          { text: 'Group one', options: [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]] },
          { text: 'Group two', options: [DEFAULT_FILTER_OPTIONS[2]] }
        ]
      });
      harness.component.open = true;
      await frame();
      await task(POPOVER_ANIMATION_DURATION);

      const popupGroups = _getPopupGroups(harness.popupElement);
      expect(popupGroups.length).to.equal(2);
      expect(popupGroups[0].headerElement.textContent).to.equal('Group one');
      expect(popupGroups[0].options.length).to.equal(2);
      expect(popupGroups[1].headerElement.textContent).to.equal('Group two');
      expect(popupGroups[1].options.length).to.equal(1);
    });

    it('should render custom header for option groups', async () => {
      const optionGroupBuilder = (option: IAutocompleteOptionGroup): HTMLElement => {
        const avatar = document.createElement(AVATAR_CONSTANTS.elementName) as IAvatarComponent;
        avatar.text = option.text!;
        return avatar;
      };

      const harness = await createFixture({
        filter: () => [
          { text: 'One', builder: optionGroupBuilder, options: [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]] },
          { text: 'Two', builder: optionGroupBuilder, options: [DEFAULT_FILTER_OPTIONS[2]] }
        ]
      });
      harness.component.open = true;
      await frame();

      const popupGroups = _getPopupGroups(harness.popupElement);
      expect((popupGroups[0].headerElement as IAvatarComponent).text).to.equal('One');
      expect((popupGroups[1].headerElement as IAvatarComponent).text).to.equal('Two');
    });

    it('should highlight filter text in options by default', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.open = true;
      await frame();

      harness.sendInputValue('e');
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);
      await frame();

      const listItems = harness.getListItems();
      const firstListItemSpan = listItems[0].querySelector('span > span') as HTMLElement;
      expect(firstListItemSpan.innerText).to.equal('e');
    });

    it('should use first value in array as value is multiple values passed in single selection mode', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.value = [DEFAULT_FILTER_OPTIONS[0], DEFAULT_FILTER_OPTIONS[1]];
      await frame();

      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);
    });

    it('should set value after initial filter via IOption or regular data type', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS,
        debounce: 0
      });
      harness.component.open = true;
      await frame();

      harness.component.value = DEFAULT_FILTER_OPTIONS[0];
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[0].value);

      await frame();

      harness.component.value = DEFAULT_FILTER_OPTIONS[1].value;
      expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[1].value);
    });

    it('should be connected', async () => {
      const harness = await createFixture();
      expect(harness.component.isConnected).to.be.true;
      expect(harness.component instanceof AutocompleteComponent).to.be.true;
    });

    it('should remove popover when removed from DOM while open', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.open = true;
      await frame();

      harness.component.remove();
      await frame();

      expect(harness.component.popupElement).to.be.null;
    });
  });

  describe('with dynamic <input> element', () => {
    it('should wait for input element to initialize', async () => {
      const container = await fixture<HTMLElement>(html`
        <div>
          <forge-autocomplete></forge-autocomplete>
        </div>
      `);

      const component = container.querySelector('forge-autocomplete') as AutocompleteComponentInternal;
      const input = document.createElement('input');
      input.type = 'text';

      await task(100);
      component.appendChild(input);
      await frame();

      expect(component.isInitialized).to.be.true;
    });

    it('should initialize if input is provided', async () => {
      const container = await fixture<HTMLElement>(html`
        <div>
          <forge-autocomplete></forge-autocomplete>
        </div>
      `);

      const component = container.querySelector('forge-autocomplete') as AutocompleteComponentInternal;
      const input = document.createElement('input');
      input.type = 'text';

      component.appendChild(input);
      await frame();
      expect(component.isInitialized).to.be.true;
    });

    it('should be connected', async () => {
      const container = await fixture<HTMLElement>(html`
        <div>
          <forge-autocomplete></forge-autocomplete>
        </div>
      `);

      const component = container.querySelector('forge-autocomplete') as AutocompleteComponentInternal;
      expect(component.isConnected).to.be.true;
      expect(component instanceof AutocompleteComponent).to.be.true;
    });

    it('should keep dropdown open when selecting options in stateless + multiple mode', async () => {
      const harness = await createFixture({
        mode: AutocompleteMode.Stateless,
        multiple: true,
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.triggerDropdownClick();
      await frame();

      expect(harness.popupElement).to.not.be.null;

      harness.clickListItem(0);
      expect(harness.popupElement).to.not.be.null;

      harness.clickListItem(1);
      expect(harness.popupElement).to.not.be.null;
    });
  });

  describe('with text-field and icon', () => {
    it('should open dropdown if icon clicked', async () => {
      const harness = await createTextFieldFixture();
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      await frame();
      harness.iconElement!.click();
      await frame();
      await frame();
      expect(document.activeElement).to.equal(harness.input);
      expect(harness.popupElement).to.not.be.null;
    });

    it('should open dropdown if popover icon clicked', async () => {
      const harness = await createTextFieldFixture(false);
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
      expect(harness.popupElement).to.not.be.null;
    });

    it('should close dropdown if popover icon clicked while open', async () => {
      const harness = await createTextFieldFixture(false);
      harness.component.filter = () => DEFAULT_FILTER_OPTIONS;
      _triggerDropdownClick(harness.input);
      await frame();
      expect(harness.popupElement).to.not.be.null;
      const popoverIcon = getPopoverIcon(harness.component);
      expect(popoverIcon).to.not.be.null;
      expect(popoverIcon).to.not.be.undefined;

      popoverIcon!.dispatchEvent(new MouseEvent('click'));

      await task(POPOVER_ANIMATION_DURATION);
      expect(harness.component.popupElement).to.be.null;
    });
  });

  describe('AutocompleteComponentDelegate', () => {
    it('should create text field and set value', async () => {
      const { delegate } = await createDelegateFixture();
      const textField = delegate.element.querySelector(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      expect(textField).to.not.be.null;
    });

    it('should set value', async () => {
      const { delegate } = await createDelegateFixture();
      delegate.value = 1;
      await frame();
      expect(delegate.textFieldDelegate.value).to.equal('One');
      expect(delegate.value).to.equal(1);
    });

    it('should set dropdown icon', async () => {
      const { delegate } = await createDelegateFixture(DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG, DEFAULT_AUTOCOMPLETE_TEXTFIELD_DELEGATE_CONFIG.options);
      await frame();
      const icon = delegate.element.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.DROPDOWN_ICON);
      expect(icon).to.not.be.null;
    });

    it('should not set dropdown icon', async () => {
      const { delegate } = await createDelegateFixture({}, { useDropdownIcon: false });
      await frame();
      const icon = delegate.element.querySelector(AUTOCOMPLETE_CONSTANTS.selectors.DROPDOWN_ICON);
      expect(icon).to.be.null;
    });

    it('should set input value and call filter function', async () => {
      const filterSpy = spy();
      const filter: AutocompleteFilterCallback = text => {
        filterSpy();
        return [];
      };
      const { delegate, input } = await createDelegateFixture({ filter });
      await frame();

      input.focus();
      delegate.textFieldDelegate.value = 'test';
      input.dispatchEvent(new Event('input'));
      await task(AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME);

      expect(delegate.textFieldDelegate.value).to.equal('test');
      expect(filterSpy).to.have.been.calledOnce;
    });

    it('should call onChange handler', async () => {
      const onChangeSpy = spy();
      const { delegate } = await createDelegateFixture();
      delegate.onChange(onChangeSpy);
      await frame();

      delegate.element.open = true;
      await frame();
      _clickListItem(0, delegate.element.popupElement);

      expect(onChangeSpy).to.have.been.calledOnce;
    });

    it('should render with selected value text if value set before connecting', async () => {
      const filterSpy = spy(() => [DEFAULT_FILTER_OPTIONS[0]]);
      const delegate = new AutocompleteComponentDelegate({ props: { filter: filterSpy } });
      delegate.value = DEFAULT_FILTER_OPTIONS[0].value;
      await fixture(html`<div>${delegate.element}</div>`);
      await frame();
      expect(delegate.textFieldDelegate.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
      expect(filterSpy).to.have.been.calledOnce;
    });

    it('should render with selected value text if value set before connecting via IOption', async () => {
      const delegate = new AutocompleteComponentDelegate({ props: DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG });
      delegate.value = { ...DEFAULT_FILTER_OPTIONS[0] };
      await fixture(html`<div>${delegate.element}</div>`);
      await frame();
      expect(delegate.textFieldDelegate.value).to.equal(DEFAULT_FILTER_OPTIONS[0].label);
    });

    it('should call new filter function if reset with value selected', async () => {
      const initialFilter = (): IAutocompleteOption[] => [];
      const newFilter = (): IAutocompleteOption[] => DEFAULT_FILTER_OPTIONS;
      const newFilterSpy = spy(newFilter);

      const delegate = new AutocompleteComponentDelegate({ props: { filter: initialFilter } });
      delegate.value = 1;
      await fixture(html`<div>${delegate.element}</div>`);

      await frame();
      delegate.element.filter = newFilterSpy;

      expect(newFilterSpy).to.have.been.calledOnce;
    });
  });

  describe('events', () => {
    describe('beforeValueChange', () => {
      it('should not select item if resolves to false', async () => {
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });
        harness.component.beforeValueChange = () => new Promise(resolve => resolve(false));

        harness.triggerDropdownClick();

        await frame();
        harness.clickListItem(2);
        await frame();

        expect(harness.component.value).to.be.null;
      });

      it('should select item if resolves to true', async () => {
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });
        harness.component.beforeValueChange = () => new Promise(resolve => resolve(true));

        harness.triggerDropdownClick();

        await frame();
        const listItems = harness.getListItems();
        harness.clickListItem(2);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);
      });

      it('should select item if beforeValueChange resolves to true only after a period of time', async () => {
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });
        harness.component.beforeValueChange = () =>
          new Promise(resolve => {
            setTimeout(() => resolve(true), 1000);
          });

        harness.triggerDropdownClick();

        await task(POPOVER_ANIMATION_DURATION);
        await frame();
        const listItems = harness.getListItems();
        harness.clickListItem(2);
        expect(harness.component.value).to.be.null;
        await task(1000);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);
      });

      it('should pass in to-be new value in beforeValueChange', async () => {
        let newValue = '';
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });
        harness.component.beforeValueChange = value => {
          newValue = value;
          return new Promise(resolve => resolve(true));
        };

        harness.triggerDropdownClick();

        await frame();
        const listItems = harness.getListItems();
        harness.clickListItem(2);
        await frame();

        expect(newValue).to.equal(listItems[2].value);
      });

      it('should force filter callback to execute and update selected value', async () => {
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });

        harness.triggerDropdownClick();

        await frame();
        const listItems = harness.getListItems();
        harness.clickListItem(2);
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
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });

        harness.triggerDropdownClick();

        await frame();
        const listItems = harness.getListItems();
        harness.clickListItem(2);
        await frame();

        expect(harness.component.value).to.equal(listItems[2].value);

        harness.component.filter = () => [{ label: 'New', value: 'new' }];
        harness.component.forceFilter();

        await frame();

        expect(harness.input.value).to.equal('');
        expect(harness.component.value).to.equal(DEFAULT_FILTER_OPTIONS[2].value);
      });

      it('should force filter callback to execute and preserve selected value if not present in new filtered options', async () => {
        const harness = await createFixture({
          filter: () => DEFAULT_FILTER_OPTIONS
        });

        harness.triggerDropdownClick();

        await frame();
        const listItems = harness.getListItems();
        harness.clickListItem(2);
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
    it('should set popover flip', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.popoverFlip = 'never';
      harness.component.openDropdown();
      await task();

      const popover = harness.popupElement as IPopoverComponent;

      expect(harness.component.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover flip from attribute', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.setAttribute('popover-flip', 'never');
      harness.component.openDropdown();
      await task();

      const popover = harness.popupElement as IPopoverComponent;

      expect(harness.component.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover shift', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.popoverShift = 'never';
      harness.component.openDropdown();
      await task();

      const popover = harness.popupElement as IPopoverComponent;

      expect(harness.component.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });

    it('should set popover shift from attribute', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.setAttribute('popover-shift', 'never');
      harness.component.openDropdown();
      await task();

      const popover = harness.popupElement as IPopoverComponent;

      expect(harness.component.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });

    it('should set popover fallback placements', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.popoverFallbackPlacements = ['top'];
      harness.component.openDropdown();
      await task();

      const popover = harness.popupElement as IPopoverComponent;

      expect(harness.component.popoverFallbackPlacements).to.deep.equal(['top']);
      expect(popover.fallbackPlacements).to.deep.equal(['top']);
    });

    it('should set popover offset', async () => {
      const harness = await createFixture({
        filter: () => DEFAULT_FILTER_OPTIONS
      });
      harness.component.popoverOffset = { mainAxis: 10, crossAxis: 10 };
      harness.component.openDropdown();
      await task();

      const popover = harness.popupElement as IPopoverComponent;

      expect(harness.component.popoverOffset).to.deep.equal({ mainAxis: 10, crossAxis: 10 });
      expect(popover.offset).to.deep.equal({ mainAxis: 10, crossAxis: 10 });
    });
  });

  it('should update open status if popup dismissed via click inside the anchor element', async () => {
    const harness = await createFixture({
      filter: () => DEFAULT_FILTER_OPTIONS
    });
    harness.component.openDropdown();
    await task();
    harness.input.click();
    await task(POPOVER_ANIMATION_DURATION);
    expect(harness.component.open).to.be.false;
    expect(harness.popupElement).to.be.null;
  });
});

// Test harness
class AutocompleteHarness {
  constructor(
    public component: AutocompleteComponentInternal,
    public input: HTMLInputElement,
    public container: HTMLElement
  ) {}

  public get popupElement(): HTMLElement | null {
    return this.component.popupElement;
  }

  public get isOpen(): boolean {
    return this.component.open;
  }

  public triggerDropdownClick(): void {
    _triggerDropdownClick(this.input);
  }

  public sendInputValue(value: string): void {
    _sendInputValue(this.input, value);
  }

  public clickListItem(index: number): void {
    _clickListItem(index, this.popupElement);
  }

  public getListItems(): IListItemComponent<any>[] {
    return _getListItems(this.popupElement);
  }

  public getActiveListItemIndex(): number {
    return _getActiveListItemIndex(this.popupElement);
  }

  public getPopupOptions(): (IOption & { selected?: boolean })[] {
    return _getPopupOptions(this.popupElement);
  }

  public async waitForPopoverClose(): Promise<void> {
    await task(POPOVER_ANIMATION_DURATION);
  }
}

interface IAutocompleteFixtureConfig {
  filter?: AutocompleteFilterCallback;
  value?: any;
  multiple?: boolean;
  debounce?: number;
  filterOnFocus?: boolean;
  allowUnmatched?: boolean;
  mode?: AutocompleteMode;
  popupTarget?: string;
  popupClasses?: string | string[];
  optionLimit?: number;
  observeScroll?: boolean;
  observeScrollThreshold?: number;
  syncPopupWidth?: boolean;
  matchKey?: string;
  filterFocusFirst?: boolean;
  selectFirstOptionOnBlur?: boolean;
}

async function createFixture(config: IAutocompleteFixtureConfig = {}): Promise<AutocompleteHarness> {
  const container = await fixture<HTMLElement>(html`
    <div>
      <forge-autocomplete>
        <input type="text" />
      </forge-autocomplete>
    </div>
  `);

  const component = container.querySelector('forge-autocomplete') as AutocompleteComponentInternal;
  const input = component.querySelector('input') as HTMLInputElement;

  if (config.filter) {
    component.filter = config.filter;
  }
  if (config.value !== undefined) {
    component.value = config.value;
  }
  if (config.multiple !== undefined) {
    component.multiple = config.multiple;
  }
  if (config.debounce !== undefined) {
    component.debounce = config.debounce;
  }
  if (config.filterOnFocus !== undefined) {
    component.filterOnFocus = config.filterOnFocus;
  }
  if (config.allowUnmatched !== undefined) {
    component.allowUnmatched = config.allowUnmatched;
  }
  if (config.mode) {
    component.mode = config.mode;
  }
  if (config.popupTarget) {
    component.popupTarget = config.popupTarget;
  }
  if (config.popupClasses) {
    component.popupClasses = config.popupClasses;
  }
  if (config.optionLimit !== undefined) {
    component.optionLimit = config.optionLimit;
  }
  if (config.observeScroll !== undefined) {
    component.observeScroll = config.observeScroll;
  }
  if (config.observeScrollThreshold !== undefined) {
    component.observeScrollThreshold = config.observeScrollThreshold;
  }
  if (config.syncPopupWidth !== undefined) {
    component.syncPopupWidth = config.syncPopupWidth;
  }
  if (config.matchKey) {
    component.matchKey = config.matchKey;
  }
  if (config.filterFocusFirst !== undefined) {
    component.filterFocusFirst = config.filterFocusFirst;
  }
  if (config.selectFirstOptionOnBlur !== undefined) {
    component.selectFirstOptionOnBlur = config.selectFirstOptionOnBlur;
  }

  return new AutocompleteHarness(component, input, container);
}

async function createTextFieldFixture(includeIconElement = true): Promise<AutocompleteHarness & { iconElement?: HTMLElement; label: HTMLLabelElement }> {
  const container = await fixture<HTMLElement>(html`
    <div>
      <forge-autocomplete>
        <forge-text-field .popoverIcon=${!includeIconElement}>
          <input type="text" id="autocomplete-id" />
          <label for="autocomplete-id">Label</label>
          ${includeIconElement
            ? html`<i slot="trailing" class="tyler-icons forge-dropdown-icon" data-forge-dropdown-icon aria-hidden="true">arrow_drop_down</i>`
            : nothing}
        </forge-text-field>
      </forge-autocomplete>
    </div>
  `);

  const component = container.querySelector('forge-autocomplete') as AutocompleteComponentInternal;
  const input = component.querySelector('input') as HTMLInputElement;
  const label = component.querySelector('label') as HTMLLabelElement;
  const iconElement = component.querySelector('[data-forge-dropdown-icon]') as HTMLElement | undefined;

  const harness = new AutocompleteHarness(component, input, container);
  return { ...harness, iconElement, label } as AutocompleteHarness & { iconElement?: HTMLElement; label: HTMLLabelElement };
}

function getPopoverIcon(component: IAutocompleteComponent): HTMLElement | null | undefined {
  return component
    .querySelector(TEXT_FIELD_CONSTANTS.elementName)
    ?.shadowRoot?.querySelector(FIELD_CONSTANTS.elementName)
    ?.shadowRoot?.querySelector(FIELD_CONSTANTS.selectors.POPOVER_ICON);
}

async function createDelegateFixture(
  props: AutocompleteComponentDelegateProps = DEFAULT_AUTOCOMPLETE_DELEGATE_CONFIG,
  options: IAutocompleteComponentDelegateOptions = {}
): Promise<{ delegate: AutocompleteComponentDelegate; container: HTMLElement; input: HTMLInputElement }> {
  const delegate = new AutocompleteComponentDelegate({ props, options });
  const container = await fixture<HTMLElement>(html`<div>${delegate.element}</div>`);
  const input = delegate.element.querySelector('input') as HTMLInputElement;
  return { delegate, container, input };
}

// Helper functions
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

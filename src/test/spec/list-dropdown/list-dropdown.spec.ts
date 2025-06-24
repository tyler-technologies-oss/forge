import { task, frame } from '@tylertech/forge/core/utils/utils';
import { getShadowElement } from '@tylertech/forge-core';
import { IListDropdownTestContext, createListDropdown, getListItems, getListDropdownPopup, clickListItem, delayPopupAnimation, getBusyVisibility, generateScrollableOptions } from './list-dropdown-test-utils';
import { IListDropdownConfig, IListDropdownOption, ListDropdownAsyncStyle, ListDropdownHeaderBuilder, IListDropdownOptionGroup, LIST_DROPDOWN_CONSTANTS, ListDropdownFooterBuilder, ListDropdownType, ListDropdownOptionBuilder, ListDropdownTransformCallback } from '@tylertech/forge/list-dropdown';
import { defineOptionComponent, defineOptionGroupComponent } from '@tylertech/forge/select';
import { defineListComponent, IListComponent, IListItemComponent, LIST_CONSTANTS } from '@tylertech/forge/list';
import { defineLinearProgressComponent, SKELETON_CONSTANTS, DIVIDER_CONSTANTS, IIconComponent, CIRCULAR_PROGRESS_CONSTANTS } from '@tylertech/forge';
import { definePopoverComponent, IPopoverComponent, POPOVER_CONSTANTS } from '@tylertech/forge/popover';
import { tryCleanupPopovers, isVisibleInScrollContainer } from '../../utils';

const POPOVER_ANIMATION_DURATION = 200;

interface ITestContext {
  context: IListDropdownTestContext;
}

function createDummyInputElement(): HTMLInputElement {
  let input = document.createElement('input');
  input.id = 'dummy-input';
  return input;
}

describe('ListDropdown', function(this: ITestContext) {
  const BASIC_OPTIONS: IListDropdownOption[] = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3, elementAttributes: new Map<string, string>([['data-test-attr', 'test-value']]) }
  ];
  const DEFAULT_CONFIG: IListDropdownConfig = {
    options: BASIC_OPTIONS,
    id: 'list-dropdown',
    referenceElement: createDummyInputElement(),
    activeChangeCallback: (id: string) => {},
    selectCallback: (value: any) => {}
  };

  beforeAll(function(this: ITestContext) {
    definePopoverComponent();
    defineListComponent();
    defineOptionComponent();
    defineOptionGroupComponent();
    defineLinearProgressComponent();
  });

  afterEach(function(this: ITestContext) {
    if (this.context.listDropdown) {
      this.context.listDropdown.destroy();
    }
    
    tryCleanupPopovers();

    if (this.context.targetElement.isConnected) {
      this.context.remove();
    }
  });

  it('should be instantiated', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();

    expect(this.context.listDropdown.dropdownElement).toBeTruthy();
  });

  it('should display options', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const listItems = getListItems();
    expect(listItems.length).toBe(BASIC_OPTIONS.length, 'Expected same number of options to be displayed');
    BASIC_OPTIONS.forEach((o, index) => {
      expect(listItems[index].value).toBe(o.value, `Expected option ${index} to match value`);
      expect(listItems[index].innerText).toBe(o.label as string, `Expected option ${index} to match label`);
    });
  });

  it('should call select callback when clicking option', async function(this: ITestContext) {
    const selectCallback = jasmine.createSpy('selectCallback') as any;
    this.context = createListDropdown({ ...DEFAULT_CONFIG, selectCallback });
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    clickListItem(0);

    expect(selectCallback).toHaveBeenCalledOnceWith(BASIC_OPTIONS[0].value);
  });

  it('should call active change callback when using arrow keys', async function(this: ITestContext) {
    const activeChangeCallback = jasmine.createSpy('activeChangeCallback') as any;
    this.context = createListDropdown({ ...DEFAULT_CONFIG, activeChangeCallback });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    expect(activeChangeCallback).not.toHaveBeenCalled();

    this.context.listDropdown.handleKey('ArrowDown');
    expect(activeChangeCallback).toHaveBeenCalledWith('list-dropdown-option-list-dropdown-0');
  });

  it('should close', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);

    this.context.listDropdown.open();
    await delayPopupAnimation();
    expect(getListDropdownPopup()).toBeTruthy();

    this.context.listDropdown.close();
    await delayPopupAnimation();
    expect(getListDropdownPopup()).toBeFalsy();
  });
  
  it('should get active index', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(-1);
    
    this.context.listDropdown.handleKey('ArrowDown');
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(0);
  });
  
  it('should set active option to last option if arrow up is pressed on first option', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    this.context.listDropdown.handleKey('ArrowUp');
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(DEFAULT_CONFIG.options.length - 1);
  });
  
  it('should set active option to first option if arrow down is pressed on last option', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    this.context.listDropdown.handleKey('ArrowDown');
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(0);

    this.context.listDropdown.handleKey('ArrowDown');
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(1);

    this.context.listDropdown.handleKey('ArrowDown');
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(2);
  });
  
  it('should not activate any options by default', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(-1);
  });
  
  it('should not highlight first option', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    expect(this.context.listDropdown.getActiveOptionIndex()).toBe(-1);
  });
  
  it('should not show spinner when no options are provided by default', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [] });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    expect(getBusyVisibility(this.context)).toBeFalse();
  });
  
  it('should show spinner when no options are provided', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const skeleton = this.context.listDropdown.dropdownElement!.querySelector(SKELETON_CONSTANTS.elementName);
    expect(skeleton).toBeFalsy();

    const spinner = this.context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).toBeTruthy();
  });
  
  it('should show skeleton when no options are provided', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, asyncStyle: ListDropdownAsyncStyle.Skeleton });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const spinner = this.context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).toBeFalsy();

    const skeleton = this.context.listDropdown.dropdownElement!.querySelector(SKELETON_CONSTANTS.elementName);
    expect(skeleton).toBeTruthy();
  });
  
  it('should set options', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [] });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    let listItems = getListItems();
    expect(listItems.length).toBe(0);

    this.context.listDropdown.setOptions(BASIC_OPTIONS);
    listItems = getListItems();

    expect(listItems.length).toBe(BASIC_OPTIONS.length);
  });

  it('should append options', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    const extraOptions: IListDropdownOption[] = [
      { label: 'Extra 1', value: 'extra-1' },
      { label: 'Extra 2', value: 'extra-2' }
    ];
    this.context.listDropdown.appendOptions(extraOptions);
    
    const listItems = getListItems();

    expect(listItems.length).toBe(DEFAULT_CONFIG.options.length + extraOptions.length);
    expect(listItems[listItems.length - 2].value).toBe(extraOptions[0].value);
    expect(listItems[listItems.length - 1].value).toBe(extraOptions[1].value);
  });

  it('should set busy visibility', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, allowBusy: true });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    expect(getBusyVisibility(this.context)).toBeFalse();
    
    this.context.listDropdown.setBusyVisibility(true);
    expect(getBusyVisibility(this.context)).toBeTrue();
    
    this.context.listDropdown.setBusyVisibility(false);
    expect(getBusyVisibility(this.context)).toBeFalse();
  });

  it('should set selected value by default', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, selectedValues: [BASIC_OPTIONS[1].value] });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const selectedIndex = listItems.findIndex(li => li.selected);
  
    expect(selectedIndex).toBe(1);
  });

  it('should set selected value dynamically', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.listDropdown.setSelectedValues([BASIC_OPTIONS[0].value]);
    const listItems = getListItems();
    const selectedIndex = listItems.findIndex(li => li.selected);

    expect(selectedIndex).toBe(0);
  });

  it('should not allow multiple selections when in single select mode', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.listDropdown.setSelectedValues([BASIC_OPTIONS[1].value, BASIC_OPTIONS[2].value]);
    const listItems = getListItems();

    expect(listItems[0].selected).toBeFalse();
    expect(listItems[1].selected).toBeTrue();
    expect(listItems[2].selected).toBeFalse();
  });

  it('should select multiple options', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, multiple: true });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.listDropdown.setSelectedValues([BASIC_OPTIONS[1].value, BASIC_OPTIONS[2].value]);
    const listItems = getListItems();

    expect(listItems[0].selected).toBeFalse();
    expect(listItems[1].selected).toBeTrue();
    expect(listItems[2].selected).toBeTrue();
  });

  it('should toggle selection state in multiple mode', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, multiple: true, selectedValues: [BASIC_OPTIONS[1].value, BASIC_OPTIONS[2].value]  });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems[1].selected).toBeTrue();

    this.context.listDropdown.toggleOptionMultiple(1, false);

    expect(listItems[0].selected).toBeFalse();
    expect(listItems[1].selected).toBeFalse();
    expect(listItems[2].selected).toBeTrue();
  });

  it('should toggle selection in multiple mode of deselected option', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, multiple: true, selectedValues: [BASIC_OPTIONS[1].value]  });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems[2].selected).toBeFalse();

    this.context.listDropdown.toggleOptionMultiple(2, true);

    expect(listItems[0].selected).toBeFalse();
    expect(listItems[0].active).toBeFalse();
    expect(listItems[1].selected).toBeTrue();
    expect(listItems[1].active).toBeFalse();
    expect(listItems[2].selected).toBeTrue();
    expect(listItems[2].active).toBeFalse();
  });

  it('should activate selected option', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, selectedValues: [BASIC_OPTIONS[2].value]  });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();

    this.context.listDropdown.handleKey('ArrowDown');
    expect(listItems[0].active).toBeTrue();

    this.context.listDropdown.activateSelectedOption();

    expect(listItems[0].active).toBeFalse();
    expect(listItems[2].active).toBeTrue();
  });

  it('should set active start index', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, activeStartIndex: 2 });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();

    expect(listItems[0].active).toBeFalse();
    expect(listItems[2].active).toBeTrue();
  });

  it('should activate first option', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, selectedValues: [BASIC_OPTIONS[2].value]  });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems[2].active).toBeFalse();

    this.context.listDropdown.activateFirstOption();

    expect(listItems[0].active).toBeTrue();
  });

  it('should activate specific option', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems.some(li => li.active)).toBeFalse();

    this.context.listDropdown.activateOption(2);

    expect(listItems[2].active).toBeTrue();
  });

  it('should not allow a disabled option to be activated', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, ... { options: [{ label: 'One', value: 1, disabled: true }] } });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    const listItems = getListItems();

    this.context.listDropdown.activateOption(0);

    expect(listItems[0].active).toBeFalse();
  });

  it('should activate last option when end key is pressed', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.listDropdown.handleKey('End');
    const listItems = getListItems();
    expect(listItems[0].active).toBeFalse();
    expect(listItems[listItems.length - 1].active).toBeTrue();
  });

  it('should activate first option when home key is pressed', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    this.context.listDropdown.activateOption(listItems.length - 1);
    expect(listItems[listItems.length - 1].active).toBeTrue();
    
    this.context.listDropdown.handleKey('Home');

    expect(listItems[0].active).toBeTrue();
    expect(listItems[listItems.length - 1].active).toBeFalse();
  });

  it('should select active option when enter key is pressed', async function(this: ITestContext) {
    const selectCallback = jasmine.createSpy('selectCallback') as any;
    this.context = createListDropdown({ ...DEFAULT_CONFIG, selectCallback });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    this.context.listDropdown.activateOption(BASIC_OPTIONS.length - 1);
    this.context.listDropdown.handleKey('Enter');
    
    expect(selectCallback).toHaveBeenCalledOnceWith(BASIC_OPTIONS[BASIC_OPTIONS.length - 1].value);
  });

  it('should select active option when numpadenter key is pressed', async function(this: ITestContext) {
    const selectCallback = jasmine.createSpy('selectCallback') as any;
    this.context = createListDropdown({ ...DEFAULT_CONFIG, selectCallback });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    this.context.listDropdown.activateOption(BASIC_OPTIONS.length - 1);
    this.context.listDropdown.handleKey('NumpadEnter');
    
    expect(selectCallback).toHaveBeenCalledOnceWith(BASIC_OPTIONS[BASIC_OPTIONS.length - 1].value);
  });

  it('should scroll selected option into view when opened', async function(this: ITestContext) {
    const options = generateScrollableOptions();
    const selectedValue = options[99].value;
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options, selectedValues: [selectedValue] });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const selectedListItem = listItems.find(li => li.value === selectedValue) as IListItemComponent;
    const scrollContainer = getShadowElement(this.context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(isVisibleInScrollContainer(scrollContainer, selectedListItem)).toBeTrue();
  });

  it('should scroll selected option into view on demand', async function(this: ITestContext) {
    const options = generateScrollableOptions();
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    const listItems = getListItems();
    const selectedValue = options[99].value;
    const selectedListItem = listItems[99];
    const scrollContainer = getShadowElement(this.context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(isVisibleInScrollContainer(scrollContainer, selectedListItem)).toBeFalse();

    this.context.listDropdown.setSelectedValues(selectedValue);
    this.context.listDropdown.scrollSelectedOptionIntoView(false);
    await task(1000);
    await frame();

    expect(isVisibleInScrollContainer(scrollContainer, selectedListItem)).toBeTrue();
  });

  it('should call scroll bottom listener', async function(this: ITestContext) {
    const options = generateScrollableOptions(50);
    const scrollEndListener = jasmine.createSpy('scroll bottom spy');
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options, observeScroll: true, scrollEndListener });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const popup = this.context.listDropdown.dropdownElement as HTMLElement;
    const scrollContainer = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await task(1000); // Wait for scroll animation (flaky?)

    expect(scrollEndListener).toHaveBeenCalledTimes(1);
  });

  it('should set scroll bottom listener', async function(this: ITestContext) {
    const options = generateScrollableOptions(50);
    const scrollEndListener = jasmine.createSpy('scroll bottom spy');
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.listDropdown.setScrollBottomListener(scrollEndListener);

    const popup = this.context.listDropdown.dropdownElement as HTMLElement;
    const scrollContainer = getShadowElement(this.context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await task(1000); // Wait for scroll animation (flaky?)

    expect(scrollEndListener).toHaveBeenCalledTimes(1);
  });

  it('should remove scroll bottom listener', async function(this: ITestContext) {
    const options = generateScrollableOptions(50);
    const scrollEndListener = jasmine.createSpy('scroll bottom spy');
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.listDropdown.setScrollBottomListener(scrollEndListener);
    this.context.listDropdown.removeScrollBottomListener();

    const popup = this.context.listDropdown.dropdownElement as HTMLElement;
    const scrollContainer = getShadowElement(this.context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await task(1000); // Wait for scroll animation (flaky?)

    expect(scrollEndListener).not.toHaveBeenCalled();
  });

  it('should skip over disabled options when using down arrow key', async function(this: ITestContext) {
    const options = [...BASIC_OPTIONS];
    options.splice(1, 0, { label: 'Disabled option', value: 999, disabled: true });
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    this.context.listDropdown.handleKey('ArrowDown');
    expect(listItems[0].active).toBeTrue();
    
    this.context.listDropdown.handleKey('ArrowDown');
    
    expect(listItems[0].active).toBeFalse();
    expect(listItems[1].active).toBeFalse();
    expect(listItems[2].active).toBeTrue();
    expect(listItems[3].active).toBeFalse();
  });

  it('should skip over disabled options when using up arrow key', async function(this: ITestContext) {
    const options = [...BASIC_OPTIONS];
    options.splice(1, 0, { label: 'Disabled option', value: 999, disabled: true });
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    this.context.listDropdown.activateOption(2);
    this.context.listDropdown.handleKey('ArrowUp');

    expect(listItems[0].active).toBeTrue();
    expect(listItems[1].active).toBeFalse();
    expect(listItems[2].active).toBeFalse();
    expect(listItems[3].active).toBeFalse();
  });

  it('should display header element', async function(this: ITestContext) {
    const headerBuilder: ListDropdownHeaderBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-header';
      div.textContent = 'Header element!';
      return div;
    };
    this.context = createListDropdown({ ...DEFAULT_CONFIG, headerBuilder });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const headerElement = this.context.listDropdown.dropdownElement!.querySelector('#test-header');
    expect(headerElement).toBeTruthy();
  });

  it('should display footer element', async function(this: ITestContext) {
    const footerBuilder: ListDropdownFooterBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-footer';
      div.textContent = 'Footer element!';
      return div;
    };
    this.context = createListDropdown({ ...DEFAULT_CONFIG, footerBuilder });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const footerElement = this.context.listDropdown.dropdownElement!.querySelector('#test-footer');
    expect(footerElement).toBeTruthy();
  });

  it('should display group elements', async function(this: ITestContext) {
    const group2Options: IListDropdownOption[] = [
      { label: 'One', value: 'group-2-option-1' }
    ];
    const group3Options: IListDropdownOption[] = [
      { label: 'One', value: 'group-3-option-1' },
      { label: 'Two', value: 'group-3-option-2' }
    ];
    const builder = () => {
      const div = document.createElement('div');
      div.textContent = 'Custom group 2';
      return div;
    };
    const options: Array<IListDropdownOption | IListDropdownOptionGroup> = [
      { text: 'Group 1', options: BASIC_OPTIONS },
      { builder, options: group2Options },
      { text: 'Group 3', options: group3Options }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const popup = this.context.listDropdown.dropdownElement!;
    const groups = popup.querySelectorAll(`.${LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER} > div`);
    const listItems = getListItems();

    expect(listItems.length).toBe(6);
    expect(groups.length).toBe(3);
    expect(groups[0].textContent).toBe('Group 1');
    expect(groups[1].textContent).toBe('Custom group 2');
    expect(groups[2].textContent).toBe('Group 3');
  });

  it('should display dividers', async function(this: ITestContext) {
    const options = [...BASIC_OPTIONS];
    options.splice(1, 0, { divider: true } as any);
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const divider = this.context.listDropdown.dropdownElement!.querySelector(DIVIDER_CONSTANTS.elementName);

    expect(divider).toBeTruthy();
  });

  it('should call custom callback for determining target element width to set min-width of dropdown', async function(this: ITestContext) {
    const width = 500;
    const targetWidthCallback = jasmine.createSpy('target width callback', () => width).and.callThrough();
    this.context = createListDropdown({ ...DEFAULT_CONFIG, targetWidthCallback });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const popup = getListDropdownPopup();
    const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(getComputedStyle(container).minWidth).toBe(`${width}px`);
    expect(targetWidthCallback).toHaveBeenCalledTimes(1);
  });

  it('should sync width with custom target width', async function(this: ITestContext) {
    const width = 500;
    const targetWidthCallback = jasmine.createSpy('target width callback', () => width).and.callThrough();
    this.context = createListDropdown({ ...DEFAULT_CONFIG, targetWidthCallback, syncWidth: true });
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    const popup = getListDropdownPopup();
    const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(getComputedStyle(container).width).toBe(`${width}px`);
    expect(targetWidthCallback).toHaveBeenCalledTimes(1);
  });

  it('should sync width with default target element width', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, syncWidth: true });
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    const targetElementWidth = getComputedStyle(this.context.targetElement).width;
    const popup = getListDropdownPopup();
    const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(getComputedStyle(container).width).toBe(targetElementWidth);
  });

  it('should show remove async element options are set', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, asyncStyle: ListDropdownAsyncStyle.Spinner });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    let spinner = this.context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).toBeTruthy();

    this.context.listDropdown.setOptions(BASIC_OPTIONS);

    spinner = this.context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).toBeFalsy();
  });

  it('should add header element after async options are loaded', async function(this: ITestContext) {
    const headerBuilder: ListDropdownHeaderBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-header';
      div.textContent = 'Header element!';
      return div;
    };

    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, headerBuilder });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    let headerElement = this.context.listDropdown.dropdownElement!.querySelector('#test-header');
    expect(headerElement).toBeFalsy();

    this.context.listDropdown.setOptions(BASIC_OPTIONS);
    
    headerElement = this.context.listDropdown.dropdownElement!.querySelector('#test-header');
    expect(headerElement).toBeTruthy();
  });

  it('should add footer element after async options are loaded', async function(this: ITestContext) {
    const footerBuilder: ListDropdownFooterBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-footer';
      div.textContent = 'Footer element!';
      return div;
    };

    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, footerBuilder });
    this.context.listDropdown.open();
    await delayPopupAnimation();
    
    let footerElement = this.context.listDropdown.dropdownElement!.querySelector('#test-footer');
    expect(footerElement).toBeFalsy();

    this.context.listDropdown.setOptions(BASIC_OPTIONS);
    
    footerElement = this.context.listDropdown.dropdownElement!.querySelector('#test-footer');
    expect(footerElement).toBeTruthy();
  });

  it('should not change focus when clicking into popup', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await delayPopupAnimation();

    this.context.targetElement.focus();
    this.context.listDropdown.dropdownElement!.dispatchEvent(new MouseEvent('mousedown'));
    await frame();

    expect(document.activeElement).toBe(this.context.targetElement);
  });

  it('should use menu type', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, type: ListDropdownType.Menu });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listElement = this.context.listDropdown.dropdownElement!.querySelector(LIST_CONSTANTS.elementName) as IListComponent;
    expect(listElement.getAttribute('role')).toBe('menu');
  });

  it('should set popup classes', async function(this: ITestContext) {
    const popupClasses = ['test-class-1', 'test-class-2'];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, popupClasses });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    expect(Array.from(this.context.listDropdown.dropdownElement!.classList)).toEqual(popupClasses);
  });

  it('should use no animation type on popup', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, type: ListDropdownType.None });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    expect((<IPopoverComponent>this.context.listDropdown.dropdownElement).animationType).toBe('none');
  });

  it('should limit dropdown options', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, optionLimit: 1 });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems.length).toBe(1);
    expect(listItems[0].value).toBe(BASIC_OPTIONS[0].value);
  });

  it('should set dense options', async function(this: ITestContext) {
    this.context = createListDropdown({ ...DEFAULT_CONFIG, dense: true });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    listItems.forEach(li => {
      expect(li.dense).toBe(true);
    });
  });

  it('should use custom option builder', async function(this: ITestContext) {
    const optionBuilder: ListDropdownOptionBuilder = (option, listItemElement) => {
      listItemElement.style.backgroundColor = 'red';

      const index = BASIC_OPTIONS.findIndex(o => o.value === option.value);
      const div = document.createElement('div');
      div.id = `custom-option-${index}`;
      div.textContent = `Custom option: ${option.label}`;
      
      return div;
    };
    this.context = createListDropdown({ ...DEFAULT_CONFIG, optionBuilder });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    listItems.forEach((li, index) => {
      const customDiv = li.querySelector(`#custom-option-${index}`) as HTMLElement;
      expect(customDiv).toBeTruthy();
      expect(customDiv.textContent).toBe(`Custom option: ${BASIC_OPTIONS[index].label}`);
      expect(li.style.backgroundColor).toBe('red');
    });
  });

  it('should use custom option builder with HTML string', async function(this: ITestContext) {
    const optionBuilder: ListDropdownOptionBuilder = option => {
      const index = BASIC_OPTIONS.findIndex(o => o.value === option.value);
      return `<div id="custom-option-${index}">Custom option: ${BASIC_OPTIONS[index].label}</div>`;
    };
    this.context = createListDropdown({ ...DEFAULT_CONFIG, optionBuilder });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    listItems.forEach((li, index) => {
      const customDiv = li.querySelector(`#custom-option-${index}`) as HTMLElement;
      expect(customDiv.textContent).toBe(`Custom option: ${BASIC_OPTIONS[index].label}`);
    });
  });

  it('should use transform callback', async function(this: ITestContext) {
    const transform: ListDropdownTransformCallback = label => `Custom: ${label}`;
    this.context = createListDropdown({ ...DEFAULT_CONFIG, transform });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    listItems.forEach((li, index) => {
      expect(li.textContent).toBe(`Custom: ${BASIC_OPTIONS[index].label}`);
    });
  });

  it('should use leading builder callback', async function(this: ITestContext) {
    const leadingBuilder = () => {
      const div = document.createElement('div');
      div.id = 'list-dropdown-leading';
      div.textContent = 'leading!';
      return div;
    };
    const options: IListDropdownOption[] = [
      { ...BASIC_OPTIONS[0], leadingBuilder },
      { ...BASIC_OPTIONS[1] },
      { ...BASIC_OPTIONS[2] }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = getListItems();
    const leadingElement = listItems[0].querySelector('#list-dropdown-leading');

    expect(leadingElement).toBeTruthy();
  });

  it('should use trailing builder callback', async function(this: ITestContext) {
    const trailingBuilder = () => {
      const div = document.createElement('div');
      div.id = 'list-dropdown-trailing';
      div.textContent = 'trailing!';
      return div;
    };
    const options: IListDropdownOption[] = [
      { ...BASIC_OPTIONS[0] },
      { ...BASIC_OPTIONS[1], trailingBuilder },
      { ...BASIC_OPTIONS[2] }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    const listItems = getListItems();
    const trailingElement = listItems[1].querySelector('#list-dropdown-trailing');

    expect(trailingElement).toBeTruthy();
  });

  it('should set leading icon as font', async function(this: ITestContext) {
    const options: IListDropdownOption[] = [
      { ...BASIC_OPTIONS[0], leadingIcon: 'heart', leadingIconClass: 'test-leading-icon', leadingIconType: 'font' },
      { ...BASIC_OPTIONS[1] },
      { ...BASIC_OPTIONS[2] }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const leadingIcon = listItems[0].querySelector('i[slot=leading]') as HTMLElement;

    expect(leadingIcon).toBeTruthy();
    expect(leadingIcon.textContent).toBe('heart');
    expect(leadingIcon.classList.contains('test-leading-icon')).toBeTrue();
  });

  it('should set leading icon as component', async function(this: ITestContext) {
    const options: IListDropdownOption[] = [
      { ...BASIC_OPTIONS[0] },
      { ...BASIC_OPTIONS[1], leadingIcon: 'heart', leadingIconClass: 'test-leading-icon' },
      { ...BASIC_OPTIONS[2] }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const leadingIcon = listItems[1].querySelector('forge-icon[slot=leading]') as IIconComponent;

    expect(leadingIcon).toBeTruthy();
    expect(leadingIcon.name).toBe('heart');
    expect(leadingIcon.classList.contains('test-leading-icon')).toBeTrue();
  });

  it('should set trailing icon as font', async function(this: ITestContext) {
    const options: IListDropdownOption[] = [
      { ...BASIC_OPTIONS[0], trailingIcon: 'heart', trailingIconClass: 'test-trailing-icon', trailingIconType: 'font' },
      { ...BASIC_OPTIONS[1] },
      { ...BASIC_OPTIONS[2] }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const trailingIcon = listItems[0].querySelector('i[slot=trailing]') as HTMLElement;

    expect(trailingIcon).toBeTruthy();
    expect(trailingIcon.textContent).toBe('heart');
    expect(trailingIcon.classList.contains('test-trailing-icon')).toBeTrue();
  });

  it('should set trailing icon as component', async function(this: ITestContext) {
    const options: IListDropdownOption[] = [
      { ...BASIC_OPTIONS[0] },
      { ...BASIC_OPTIONS[1], trailingIcon: 'heart', trailingIconClass: 'test-trailing-icon', trailingIconType: 'component' },
      { ...BASIC_OPTIONS[2] }
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options });
    this.context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const trailingIcon = listItems[1].querySelector('forge-icon[slot=trailing]') as IIconComponent;

    expect(trailingIcon).toBeTruthy();
    expect(trailingIcon.name).toBe('heart');
    expect(trailingIcon.classList.contains('test-trailing-icon')).toBeTrue();
  });

  it('should set element attributes on options', async function(this: ITestContext) {
    this.context = createListDropdown(DEFAULT_CONFIG);
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const listItems = getListItems();
    const attrValue = listItems[2].getAttribute('data-test-attr');
    expect(attrValue).toBeTruthy();
    expect(attrValue).toBe('test-value');
  });

  it('should display options with secondary label', async function(this: ITestContext) {
    const opts: IListDropdownOption[] = [
      { label: 'Label', secondaryLabel: 'Secondary label', value: 'value' },
    ];
    this.context = createListDropdown({ ...DEFAULT_CONFIG, options: opts });
    this.context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const listItems = getListItems();
    expect(listItems[0].querySelector('span[slot=secondary-text]')?.textContent).toBe('Secondary label');
  });
});

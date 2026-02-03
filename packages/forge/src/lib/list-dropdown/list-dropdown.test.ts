import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils';
import {
  ListDropdown,
  IListDropdownConfig,
  IListDropdown,
  IListDropdownCore,
  IListDropdownOption,
  LIST_DROPDOWN_CONSTANTS,
  ListDropdownHeaderBuilder,
  ListDropdownFooterBuilder,
  IListDropdownOptionGroup
} from './index';
import { defineOptionComponent, defineOptionGroupComponent } from '../select';
import { defineListComponent, IListItemComponent, LIST_ITEM_CONSTANTS } from '../list';
import { defineLinearProgressComponent, LINEAR_PROGRESS_CONSTANTS, ILinearProgressComponent } from '../linear-progress';
import { SKELETON_CONSTANTS } from '../skeleton';
import { CIRCULAR_PROGRESS_CONSTANTS } from '../circular-progress';
import { DIVIDER_CONSTANTS } from '../divider';
import { definePopoverComponent, IPopoverComponent, POPOVER_CONSTANTS } from '../popover';

const POPOVER_ANIMATION_DURATION = 200;

interface IListDropdownTestContext {
  targetElement: HTMLElement;
  listDropdown: IListDropdown;
  core: IListDropdownCore;
  append(): void;
  remove(): void;
}

type ListDropdownInternal = IListDropdown & { _core: IListDropdownCore };

function createDummyInputElement(): HTMLInputElement {
  const input = document.createElement('input');
  input.id = 'dummy-input';
  return input;
}

function createListDropdown(config: IListDropdownConfig, targetElement?: HTMLElement, append = true): IListDropdownTestContext {
  if (!targetElement) {
    targetElement = document.createElement('button');
    targetElement.textContent = 'Choose...';
  }

  if (append) {
    document.body.appendChild(targetElement);
  }

  const listDropdown = new ListDropdown(targetElement, config) as unknown as ListDropdownInternal;

  return {
    targetElement,
    listDropdown,
    core: listDropdown._core,
    append: () => document.body.appendChild(targetElement),
    remove: () => document.body.removeChild(targetElement)
  };
}

function getListDropdownPopup(): IPopoverComponent {
  return document.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
}

function delayPopupAnimation(): Promise<void> {
  return task(POPOVER_ANIMATION_DURATION);
}

function getListItems(): IListItemComponent[] {
  const popup = getListDropdownPopup();
  if (!popup) {
    return [];
  }
  return Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
}

function clickListItem(index: number): void {
  const listItems = getListItems();
  if (index >= 0 && index < listItems.length) {
    const shadowEl = listItems[index].shadowRoot!.firstElementChild as IListItemComponent;
    shadowEl.click();
  }
}

function getBusyVisibility(context: IListDropdownTestContext): boolean {
  const popup = context.listDropdown.dropdownElement;
  if (!popup) {
    return false;
  }

  const linearProgress = popup.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;
  if (!linearProgress) {
    return false;
  }

  return linearProgress.style.display !== 'none';
}

function generateScrollableOptions(num = 100): IListDropdownOption[] {
  const options: IListDropdownOption[] = [];
  for (let i = 0; i < num; i++) {
    options.push({ label: `Option: ${i + 1}`, value: i });
  }
  return options;
}

function isVisibleInScrollContainer(scrollContainer: Element, element: Element): boolean {
  const containerRect = scrollContainer.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  return (
    elementRect.top >= containerRect.top &&
    elementRect.bottom <= containerRect.bottom &&
    elementRect.left >= containerRect.left &&
    elementRect.right <= containerRect.right
  );
}

function tryCleanupPopovers(): void {
  const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
  popovers.forEach(popover => popover.remove());
}

describe('ListDropdown', () => {
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

  before(() => {
    definePopoverComponent();
    defineListComponent();
    defineOptionComponent();
    defineOptionGroupComponent();
    defineLinearProgressComponent();
  });

  afterEach(() => {
    tryCleanupPopovers();
  });

  // All tests from original list-dropdown.spec.ts - implemented in batches
  it('should be instantiated', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(context.listDropdown.dropdownElement).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should display options', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const listItems = getListItems();
    expect(listItems.length).to.equal(BASIC_OPTIONS.length);
    BASIC_OPTIONS.forEach((o, index) => {
      expect(listItems[index].value).to.equal(o.value);
      expect(listItems[index].innerText).to.equal(o.label as string);
    });

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should call select callback when clicking option', async () => {
    const selectCallback = spy() as any;
    const context = createListDropdown({ ...DEFAULT_CONFIG, selectCallback });
    context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    clickListItem(0);

    expect(selectCallback.callCount).to.equal(1);
    expect(selectCallback.firstCall.args[0]).to.equal(BASIC_OPTIONS[0].value);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should call active change callback when using arrow keys', async () => {
    const activeChangeCallback = spy() as any;
    const context = createListDropdown({ ...DEFAULT_CONFIG, activeChangeCallback });
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(activeChangeCallback.callCount).to.equal(0);

    context.listDropdown.handleKey('ArrowDown');
    expect(activeChangeCallback.callCount).to.equal(1);
    expect(activeChangeCallback.firstCall.args[0]).to.equal('list-dropdown-option-list-dropdown-0');

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should close', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);

    context.listDropdown.open();
    await delayPopupAnimation();
    expect(getListDropdownPopup()).to.not.be.null;

    context.listDropdown.close();
    await delayPopupAnimation();
    expect(getListDropdownPopup()).to.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should get active index', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(context.listDropdown.getActiveOptionIndex()).to.equal(-1);

    context.listDropdown.handleKey('ArrowDown');
    expect(context.listDropdown.getActiveOptionIndex()).to.equal(0);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set active option to last option if arrow up is pressed on first option', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.handleKey('ArrowUp');
    expect(context.listDropdown.getActiveOptionIndex()).to.equal(DEFAULT_CONFIG.options.length - 1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set active option to first option if arrow down is pressed on last option', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.handleKey('ArrowDown');
    expect(context.listDropdown.getActiveOptionIndex()).to.equal(0);

    context.listDropdown.handleKey('ArrowDown');
    expect(context.listDropdown.getActiveOptionIndex()).to.equal(1);

    context.listDropdown.handleKey('ArrowDown');
    expect(context.listDropdown.getActiveOptionIndex()).to.equal(2);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should not activate any options by default', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(context.listDropdown.getActiveOptionIndex()).to.equal(-1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should not highlight first option', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG });
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(context.listDropdown.getActiveOptionIndex()).to.equal(-1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should not show spinner when no options are provided by default', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [] });
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(getBusyVisibility(context)).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should show spinner when no options are provided', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true });
    context.listDropdown.open();
    await delayPopupAnimation();

    const skeleton = context.listDropdown.dropdownElement!.querySelector(SKELETON_CONSTANTS.elementName);
    expect(skeleton).to.be.null;

    const spinner = context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should show skeleton when no options are provided', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, asyncStyle: 'skeleton' as any });
    context.listDropdown.open();
    await delayPopupAnimation();

    const spinner = context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).to.be.null;

    const skeleton = context.listDropdown.dropdownElement!.querySelector(SKELETON_CONSTANTS.elementName);
    expect(skeleton).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set options', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [] });
    context.listDropdown.open();
    await delayPopupAnimation();

    let listItems = getListItems();
    expect(listItems.length).to.equal(0);

    context.listDropdown.setOptions(BASIC_OPTIONS);
    listItems = getListItems();

    expect(listItems.length).to.equal(BASIC_OPTIONS.length);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should append options', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    const extraOptions: IListDropdownOption[] = [
      { label: 'Extra 1', value: 'extra-1' },
      { label: 'Extra 2', value: 'extra-2' }
    ];
    context.listDropdown.appendOptions(extraOptions);

    const listItems = getListItems();

    expect(listItems.length).to.equal(DEFAULT_CONFIG.options.length + extraOptions.length);
    expect(listItems[listItems.length - 2].value).to.equal(extraOptions[0].value);
    expect(listItems[listItems.length - 1].value).to.equal(extraOptions[1].value);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set busy visibility', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, allowBusy: true });
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(getBusyVisibility(context)).to.be.false;

    context.listDropdown.setBusyVisibility(true);
    expect(getBusyVisibility(context)).to.be.true;

    context.listDropdown.setBusyVisibility(false);
    expect(getBusyVisibility(context)).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set selected value by default', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, selectedValues: [BASIC_OPTIONS[1].value] });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const selectedIndex = listItems.findIndex(li => li.selected);

    expect(selectedIndex).to.equal(1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set selected value dynamically', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.setSelectedValues([BASIC_OPTIONS[0].value]);
    const listItems = getListItems();
    const selectedIndex = listItems.findIndex(li => li.selected);

    expect(selectedIndex).to.equal(0);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should not allow multiple selections when in single select mode', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.setSelectedValues([BASIC_OPTIONS[1].value, BASIC_OPTIONS[2].value]);
    const listItems = getListItems();

    expect(listItems[0].selected).to.be.false;
    expect(listItems[1].selected).to.be.true;
    expect(listItems[2].selected).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should select multiple options', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, multiple: true });
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.setSelectedValues([BASIC_OPTIONS[1].value, BASIC_OPTIONS[2].value]);
    const listItems = getListItems();

    expect(listItems[0].selected).to.be.false;
    expect(listItems[1].selected).to.be.true;
    expect(listItems[2].selected).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should toggle selection state in multiple mode', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, multiple: true, selectedValues: [BASIC_OPTIONS[1].value, BASIC_OPTIONS[2].value] });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems[1].selected).to.be.true;

    context.listDropdown.toggleOptionMultiple(1, false);

    expect(listItems[0].selected).to.be.false;
    expect(listItems[1].selected).to.be.false;
    expect(listItems[2].selected).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should toggle selection in multiple mode of deselected option', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, multiple: true, selectedValues: [BASIC_OPTIONS[1].value] });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems[2].selected).to.be.false;

    context.listDropdown.toggleOptionMultiple(2, true);

    expect(listItems[0].selected).to.be.false;
    expect(listItems[0].active).to.be.false;
    expect(listItems[1].selected).to.be.true;
    expect(listItems[1].active).to.be.false;
    expect(listItems[2].selected).to.be.true;
    expect(listItems[2].active).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should activate selected option', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, selectedValues: [BASIC_OPTIONS[2].value] });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();

    context.listDropdown.handleKey('ArrowDown');
    expect(listItems[0].active).to.be.true;

    context.listDropdown.activateSelectedOption();

    expect(listItems[0].active).to.be.false;
    expect(listItems[2].active).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set active start index', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, activeStartIndex: 2 });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();

    expect(listItems[0].active).to.be.false;
    expect(listItems[2].active).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should activate first option', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, selectedValues: [BASIC_OPTIONS[2].value] });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems[2].active).to.be.false;

    context.listDropdown.activateFirstOption();

    expect(listItems[0].active).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should activate specific option', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems.some(li => li.active)).to.be.false;

    context.listDropdown.activateOption(2);

    expect(listItems[2].active).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should not allow a disabled option to be activated', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [{ label: 'One', value: 1, disabled: true }] });
    context.listDropdown.open();
    await delayPopupAnimation();
    const listItems = getListItems();

    context.listDropdown.activateOption(0);

    expect(listItems[0].active).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should activate last option when end key is pressed', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG });
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.handleKey('End');
    const listItems = getListItems();
    expect(listItems[0].active).to.be.false;
    expect(listItems[listItems.length - 1].active).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should activate first option when home key is pressed', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    context.listDropdown.activateOption(listItems.length - 1);
    expect(listItems[listItems.length - 1].active).to.be.true;

    context.listDropdown.handleKey('Home');

    expect(listItems[0].active).to.be.true;
    expect(listItems[listItems.length - 1].active).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should select active option when enter key is pressed', async () => {
    const selectCallback = spy() as any;
    const context = createListDropdown({ ...DEFAULT_CONFIG, selectCallback });
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.activateOption(BASIC_OPTIONS.length - 1);
    context.listDropdown.handleKey('Enter');

    expect(selectCallback.callCount).to.equal(1);
    expect(selectCallback.firstCall.args[0]).to.equal(BASIC_OPTIONS[BASIC_OPTIONS.length - 1].value);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should select active option when numpadenter key is pressed', async () => {
    const selectCallback = spy() as any;
    const context = createListDropdown({ ...DEFAULT_CONFIG, selectCallback });
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.activateOption(BASIC_OPTIONS.length - 1);
    context.listDropdown.handleKey('NumpadEnter');

    expect(selectCallback.callCount).to.equal(1);
    expect(selectCallback.firstCall.args[0]).to.equal(BASIC_OPTIONS[BASIC_OPTIONS.length - 1].value);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should scroll selected option into view when opened', async () => {
    const options = generateScrollableOptions();
    const selectedValue = options[99].value;
    const context = createListDropdown({ ...DEFAULT_CONFIG, options, selectedValues: [selectedValue] });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const selectedListItem = listItems.find(li => li.value === selectedValue) as IListItemComponent;
    const scrollContainer = getShadowElement(context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(isVisibleInScrollContainer(scrollContainer, selectedListItem)).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should scroll selected option into view on demand', async () => {
    const options = generateScrollableOptions();
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    const selectedValue = options[99].value;
    const selectedListItem = listItems[99];
    const scrollContainer = getShadowElement(context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(isVisibleInScrollContainer(scrollContainer, selectedListItem)).to.be.false;

    context.listDropdown.setSelectedValues(selectedValue);
    context.listDropdown.scrollSelectedOptionIntoView(false);
    await task(1000);
    await frame();

    expect(isVisibleInScrollContainer(scrollContainer, selectedListItem)).to.be.true;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should call scroll bottom listener', async () => {
    const options = generateScrollableOptions(50);
    const scrollEndListener = spy();
    const context = createListDropdown({ ...DEFAULT_CONFIG, options, observeScroll: true, scrollEndListener });
    context.listDropdown.open();
    await delayPopupAnimation();

    const popup = context.listDropdown.dropdownElement as HTMLElement;
    const scrollContainer = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await task(1000); // Wait for scroll animation (flaky?)

    expect(scrollEndListener.callCount).to.equal(1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set scroll bottom listener', async () => {
    const options = generateScrollableOptions(50);
    const scrollEndListener = spy();
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.setScrollBottomListener(scrollEndListener);

    const scrollContainer = getShadowElement(context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await task(1000); // Wait for scroll animation (flaky?)

    expect(scrollEndListener.callCount).to.equal(1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should remove scroll bottom listener', async () => {
    const options = generateScrollableOptions(50);
    const scrollEndListener = spy();
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    context.listDropdown.setScrollBottomListener(scrollEndListener);
    context.listDropdown.removeScrollBottomListener();

    const scrollContainer = getShadowElement(context.listDropdown.dropdownElement!, POPOVER_CONSTANTS.selectors.SURFACE);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await task(1000); // Wait for scroll animation (flaky?)

    expect(scrollEndListener.callCount).to.equal(0);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should skip over disabled options when using down arrow key', async () => {
    const options = [...BASIC_OPTIONS];
    options.splice(1, 0, { label: 'Disabled option', value: 999, disabled: true });
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    context.listDropdown.handleKey('ArrowDown');
    expect(listItems[0].active).to.be.true;

    context.listDropdown.handleKey('ArrowDown');

    expect(listItems[0].active).to.be.false;
    expect(listItems[1].active).to.be.false;
    expect(listItems[2].active).to.be.true;
    expect(listItems[3].active).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should skip over disabled options when using up arrow key', async () => {
    const options = [...BASIC_OPTIONS];
    options.splice(1, 0, { label: 'Disabled option', value: 999, disabled: true });
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    context.listDropdown.activateOption(2);
    context.listDropdown.handleKey('ArrowUp');

    expect(listItems[0].active).to.be.true;
    expect(listItems[1].active).to.be.false;
    expect(listItems[2].active).to.be.false;
    expect(listItems[3].active).to.be.false;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should display header element', async () => {
    const headerBuilder: ListDropdownHeaderBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-header';
      div.textContent = 'Header element!';
      return div;
    };
    const context = createListDropdown({ ...DEFAULT_CONFIG, headerBuilder });
    context.listDropdown.open();
    await delayPopupAnimation();

    const headerElement = context.listDropdown.dropdownElement!.querySelector('#test-header');
    expect(headerElement).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should display footer element', async () => {
    const footerBuilder: ListDropdownFooterBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-footer';
      div.textContent = 'Footer element!';
      return div;
    };
    const context = createListDropdown({ ...DEFAULT_CONFIG, footerBuilder });
    context.listDropdown.open();
    await delayPopupAnimation();

    const footerElement = context.listDropdown.dropdownElement!.querySelector('#test-footer');
    expect(footerElement).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should display group elements', async () => {
    const group2Options: IListDropdownOption[] = [{ label: 'One', value: 'group-2-option-1' }];
    const group3Options: IListDropdownOption[] = [
      { label: 'One', value: 'group-3-option-1' },
      { label: 'Two', value: 'group-3-option-2' }
    ];
    const builder = (): HTMLElement => {
      const div = document.createElement('div');
      div.textContent = 'Custom group 2';
      return div;
    };
    const options: Array<IListDropdownOption | IListDropdownOptionGroup> = [
      { text: 'Group 1', options: BASIC_OPTIONS },
      { builder, options: group2Options },
      { text: 'Group 3', options: group3Options }
    ];
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    const popup = context.listDropdown.dropdownElement!;
    const groups = popup.querySelectorAll(`.${LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER} > div`);
    const listItems = getListItems();

    expect(listItems.length).to.equal(6);
    expect(groups.length).to.equal(3);
    expect(groups[0].textContent).to.equal('Group 1');
    expect(groups[1].textContent).to.equal('Custom group 2');
    expect(groups[2].textContent).to.equal('Group 3');

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should display dividers', async () => {
    const options = [...BASIC_OPTIONS];
    options.splice(1, 0, { divider: true } as any);
    const context = createListDropdown({ ...DEFAULT_CONFIG, options });
    context.listDropdown.open();
    await delayPopupAnimation();

    const divider = context.listDropdown.dropdownElement!.querySelector(DIVIDER_CONSTANTS.elementName);

    expect(divider).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should call custom callback for determining target element width to set min-width of dropdown', async () => {
    const width = 500;
    const targetWidthCallback = spy(() => width);
    const context = createListDropdown({ ...DEFAULT_CONFIG, targetWidthCallback });
    context.listDropdown.open();
    await delayPopupAnimation();

    const popup = getListDropdownPopup();
    const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(getComputedStyle(container).minWidth).to.equal(`${width}px`);
    expect(targetWidthCallback.callCount).to.equal(1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should sync width with custom target width', async () => {
    const width = 500;
    const targetWidthCallback = spy(() => width);
    const context = createListDropdown({ ...DEFAULT_CONFIG, targetWidthCallback, syncWidth: true });
    context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    const popup = getListDropdownPopup();
    const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(getComputedStyle(container).width).to.equal(`${width}px`);
    expect(targetWidthCallback.callCount).to.equal(1);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should sync width with default target element width', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, syncWidth: true });
    context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);

    const targetElementWidth = getComputedStyle(context.targetElement).width;
    const popup = getListDropdownPopup();
    const container = getShadowElement(popup, POPOVER_CONSTANTS.selectors.SURFACE);

    expect(getComputedStyle(container).width).to.equal(targetElementWidth);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should show remove async element options are set', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, asyncStyle: 'spinner' as any });
    context.listDropdown.open();
    await delayPopupAnimation();

    let spinner = context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).to.not.be.null;

    context.listDropdown.setOptions(BASIC_OPTIONS);

    spinner = context.listDropdown.dropdownElement!.querySelector(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    expect(spinner).to.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should add header element after async options are loaded', async () => {
    const headerBuilder: ListDropdownHeaderBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-header';
      div.textContent = 'Header element!';
      return div;
    };

    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, headerBuilder });
    context.listDropdown.open();
    await delayPopupAnimation();

    let headerElement = context.listDropdown.dropdownElement!.querySelector('#test-header');
    expect(headerElement).to.be.null;

    context.listDropdown.setOptions(BASIC_OPTIONS);

    headerElement = context.listDropdown.dropdownElement!.querySelector('#test-header');
    expect(headerElement).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should add footer element after async options are loaded', async () => {
    const footerBuilder: ListDropdownFooterBuilder = () => {
      const div = document.createElement('div');
      div.id = 'test-footer';
      div.textContent = 'Footer element!';
      return div;
    };

    const context = createListDropdown({ ...DEFAULT_CONFIG, options: [], allowBusy: true, footerBuilder });
    context.listDropdown.open();
    await delayPopupAnimation();

    let footerElement = context.listDropdown.dropdownElement!.querySelector('#test-footer');
    expect(footerElement).to.be.null;

    context.listDropdown.setOptions(BASIC_OPTIONS);

    footerElement = context.listDropdown.dropdownElement!.querySelector('#test-footer');
    expect(footerElement).to.not.be.null;

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should not change focus when clicking into popup', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await delayPopupAnimation();

    context.targetElement.focus();
    context.listDropdown.dropdownElement!.dispatchEvent(new MouseEvent('mousedown'));
    await frame();

    expect(document.activeElement).to.equal(context.targetElement);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should use menu type', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, type: 'menu' as any });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listElement = context.listDropdown.dropdownElement!.querySelector(LIST_ITEM_CONSTANTS.elementName.replace('-item', ''));
    expect(listElement!.getAttribute('role')).to.equal('menu');

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set popup classes', async () => {
    const popupClasses = ['test-class-1', 'test-class-2'];
    const context = createListDropdown({ ...DEFAULT_CONFIG, popupClasses });
    context.listDropdown.open();
    await delayPopupAnimation();

    expect(Array.from(context.listDropdown.dropdownElement!.classList)).to.deep.equal(popupClasses);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should use no animation type on popup', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, type: 'none' as any });
    context.listDropdown.open();
    await delayPopupAnimation();

    expect((context.listDropdown.dropdownElement as any).animationType).to.equal('none');

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should limit dropdown options', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, optionLimit: 1 });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    expect(listItems.length).to.equal(1);
    expect(listItems[0].value).to.equal(BASIC_OPTIONS[0].value);

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should set dense options', async () => {
    const context = createListDropdown({ ...DEFAULT_CONFIG, dense: true });
    context.listDropdown.open();
    await delayPopupAnimation();

    const listItems = getListItems();
    listItems.forEach(li => {
      expect(li.dense).to.be.true;
    });

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should use custom option builder', () => {
    // TODO: Implement test
  });

  it('should use custom option builder with HTML string', () => {
    // TODO: Implement test
  });

  it('should use transform callback', () => {
    // TODO: Implement test
  });

  it('should use leading builder callback', () => {
    // TODO: Implement test
  });

  it('should use trailing builder callback', () => {
    // TODO: Implement test
  });

  it('should set leading icon', () => {
    // TODO: Implement test
  });

  it('should set leading icon as component', () => {
    // TODO: Implement test
  });

  it('should set trailing icon', () => {
    // TODO: Implement test
  });

  it('should set trailing icon as component', () => {
    // TODO: Implement test
  });

  it('should set element attributes on options', async () => {
    const context = createListDropdown(DEFAULT_CONFIG);
    context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const listItems = getListItems();
    const attrValue = listItems[2].getAttribute('data-test-attr');
    expect(attrValue).to.not.be.null;
    expect(attrValue).to.equal('test-value');

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });

  it('should display options with secondary label', async () => {
    const opts: IListDropdownOption[] = [{ label: 'Label', secondaryLabel: 'Secondary label', value: 'value' }];
    const context = createListDropdown({ ...DEFAULT_CONFIG, options: opts });
    context.listDropdown.open();
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const listItems = getListItems();
    expect(listItems[0].querySelector('span[slot=secondary-text]')?.textContent).to.equal('Secondary label');

    context.listDropdown.destroy();
    if (context.targetElement.isConnected) {
      context.remove();
    }
  });
});

import { tick, timer } from '@tylertech/forge-testing';
import {
  SELECT_DROPDOWN_CONSTANTS,
  defineSelectDropdownComponent,
  ISelectDropdownComponent,
  ISelectDropdownFoundation,
  IOptionComponent,
  OPTION_CONSTANTS
} from '@tylertech/forge/select';
import { ISelectOption, BASE_SELECT_CONSTANTS } from '@tylertech/forge/select/core';
import { removeElement } from '@tylertech/forge-core';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '@tylertech/forge/list';
import { POPOVER_CONSTANTS, IPopoverComponent } from '@tylertech/forge/popover';
import { tryCleanupPopovers } from '../../utils';

const DEFAULT_OPTIONS: ISelectOption[] = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
];

const POPOVER_ANIMATION_DURATION = 200;

interface ITestContext {
  context: ITestSelectDropdownContext;
}
interface ITestSelectDropdownContext {
  fixture: HTMLElement;
  component: ISelectDropdownComponent;
  targetElement: HTMLElement;
  foundation: ISelectDropdownFoundation;
  optionElements: IOptionComponent[];
  isAttached(): boolean;
  append(): void;
  destroy(): void;
}

describe('SelectDropdownComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineSelectDropdownComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  it('should not attach if no target is set', function(this: ITestContext) {
    this.context = setupTestContext();
    
    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  it('should set target via attribute', function(this: ITestContext) {
    this.context = setupTestContext();

    const expectedTarget = '#test-target';
    this.context.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.TARGET, expectedTarget);

    expect(this.context.component.target).toBe(expectedTarget);
  });

  it('should change target after initializing without a target set', async function(this: ITestContext) {
    this.context = setupTestContext(true, false);

    await tick();
    this.context.component.target = '#select-dropdown-target';
    
    expect(this.context.isAttached()).toBeTrue();
  });

  it('should set selectedTextTarget via attribute', function(this: ITestContext) {
    this.context = setupTestContext();

    expect(this.context.component.syncSelectedText).toBeFalse();
    this.context.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.SYNC_SELECTED_TEXT, 'true');

    expect(this.context.component.syncSelectedText).toBeTrue();
  });

  it('should set selectedTextTarget via attribute', function(this: ITestContext) {
    this.context = setupTestContext();

    const expected = '#test-ele';
    this.context.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.SELECTED_TEXT_TARGET, expected);

    expect(this.context.component.selectedTextTarget).toBe(expected);
  });

  it('should set value via attribute', function(this: ITestContext) {
    this.context = setupTestContext();

    const expected = DEFAULT_OPTIONS[0].value;
    this.context.component.setAttribute(BASE_SELECT_CONSTANTS.attributes.VALUE, expected);

    expect(this.context.component.value).toBe(expected);
  });

  it('should detach if target is disconnected', async function(this: ITestContext) {
    this.context = setupTestContext();

    removeElement(this.context.targetElement);
    await tick();

    expect(this.context.isAttached()).toBeFalse();
  });

  it('should not be attached if intialized with invalid target selector', async function(this: ITestContext) {
    this.context = setupTestContext(false);

    this.context.component.target = '#invalid-selector';
    this.context.append();
    await tick();

    expect(this.context.isAttached()).toBeFalse();
  });

  it('should not initialize if no target is set', async function(this: ITestContext) {
    this.context = setupTestContext(false);

    this.context.component.target = undefined as any;
    this.context.append();
    await tick();

    expect(this.context.isAttached()).toBeFalse();
  });

  it('should emit a scrolled bottom event when scrolling popup to bottom', async function(this: ITestContext) {
    const callback = jasmine.createSpy('scrolled-bottom spy');
    this.context = setupTestContext();

    const options: ISelectOption[] = [];
    for (let i = 0; i < 100; i++) {
      options.push({ label: `Option #${i}`, value: i });
    }

    this.context.component.options = options;
    this.context.component.observeScroll = true;
    this.context.component.observeScrollThreshold = 100;
    this.context.component.addEventListener(SELECT_DROPDOWN_CONSTANTS.events.SCROLLED_BOTTOM, callback);
    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    await tick();
    
    const popup = _getPopup();
    const scrollElement = popup.shadowRoot!.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
    scrollElement.scrollTop = scrollElement.scrollHeight;
    await tick();
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should select option', async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    await tick();
    _clickListItem(0);

    expect(this.context.component.value).toBe(DEFAULT_OPTIONS[0].value);
    expect(this.context.targetElement.innerText).not.toContain(DEFAULT_OPTIONS[0].label);
  });

  it('should select multiple options', async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.multiple = true;
    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    await tick();
    _clickListItem(1);
    _clickListItem(2);

    expect(this.context.component.value).toEqual([DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value]);
  });
  
  it('should sync selected text when option is selected', async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.syncSelectedText = true;
    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    _clickListItem(0);

    expect(this.context.targetElement.innerText).toBe(DEFAULT_OPTIONS[0].label);
  });
  
  it('should sync selected text when value property is set', async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.syncSelectedText = true;
    this.context.component.value = DEFAULT_OPTIONS[1].value;

    expect(this.context.targetElement.innerText).toBe(DEFAULT_OPTIONS[1].label);
  });
  
  it('should call selected text builder when synchronizing selected text', async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.syncSelectedText = true;
    this.context.component.selectedTextBuilder = options => `Chose: ${options[0].label}`;
    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    await tick();
    _clickListItem(0);

    expect(this.context.targetElement.innerText).toBe(`Chose: ${DEFAULT_OPTIONS[0].label}`);
  });
  
  it('should set selected text to alternate element', async function(this: ITestContext) {
    this.context = setupTestContext();

    const someEle = document.createElement('div');
    someEle.id = 'some-ele';
    this.context.targetElement.appendChild(someEle);

    this.context.component.syncSelectedText = true;
    this.context.component.selectedTextTarget = `#${someEle.id}`;
    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    await tick();
    _clickListItem(1);

    expect(someEle.innerText).toBe(DEFAULT_OPTIONS[1].label);
  });

  it('should set active descenadant', async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);
    this.context.targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(this.context.targetElement.hasAttribute('aria-activedescendant')).toBeTrue();
    expect(this.context.targetElement.getAttribute('aria-activedescendant')).toBe(`list-dropdown-option-${this.context.foundation['_identifier']}-0`);
  });

  it('should update active descendant when using keyboard navigation',  async function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.component.open = true;
    await timer(POPOVER_ANIMATION_DURATION);

    const originalValue = this.context.targetElement.getAttribute('aria-activedescendant');
    this.context.targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(originalValue).toBeFalsy();
    expect(this.context.targetElement.getAttribute('aria-activedescendant')).toBeTruthy();
    expect(this.context.targetElement.getAttribute('aria-activedescendant')).not.toBe(originalValue);
  });

  it('should remove popover when removed from DOM while open', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;

    await timer(POPOVER_ANIMATION_DURATION);
    expect(_getPopup()).toBeTruthy();
    
    this.context.fixture.remove();

    expect(_getPopup()).toBeFalsy();
  });

  function _createFixture(): HTMLElement {
    const fixture = document.createElement('div');
    fixture.id = 'select-dropdown-test-fixture';
    return fixture;
  }

  function setupTestContext(append = true, setTarget = true): ITestSelectDropdownContext {
    const fixture = _createFixture();

    const targetElement = document.createElement('button');
    targetElement.id = 'select-dropdown-target';
    targetElement.textContent = 'Choose...';

    const component = document.createElement('forge-select-dropdown');
    if (setTarget) {
      component.target = `#${targetElement.id}`;
    }

    const optionElements: IOptionComponent[] = [];
    DEFAULT_OPTIONS.forEach(o => {
      const option = document.createElement('forge-option');
      option.setAttribute(OPTION_CONSTANTS.attributes.VALUE, o.value);
      option.textContent = o.label;
      optionElements.push(option);
      component.appendChild(option);
    });

    fixture.appendChild(targetElement);
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      fixture,
      component,
      targetElement,
      foundation: component['_foundation'] as ISelectDropdownFoundation,
      optionElements,
      isAttached: () => component['_foundation']['_adapter'].isAttached(),
      append: () => document.body.appendChild(fixture),
      destroy: () => {
        tryCleanupPopovers();
        if (fixture.isConnected) {
          document.body.removeChild(fixture);
        }
      }
    };
  }

  function _getPopup(): IPopoverComponent {
    return document.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
  }

  function _getListItems(): IListItemComponent[] {
    const popup = _getPopup();
    if (!popup) {
      return [];
    }
    return Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
  }

  function _clickListItem(index: number): void {
    const listItems = _getListItems();
    if (index >= 0 && index < listItems.length) {
      const shadowEl = listItems[index].shadowRoot!.firstElementChild as IListItemComponent;
      shadowEl.click();
    }
  }
});

import { expect } from '@open-wc/testing';
import { spy } from 'sinon';
import { removeElement } from '@tylertech/forge-core';
import { task, frame } from '../../core/utils/utils';
import { SELECT_DROPDOWN_CONSTANTS } from './select-dropdown-constants';
import type { ISelectDropdownComponent } from './select-dropdown';
import type { ISelectDropdownCore } from './select-dropdown-core';
import type { ISelectDropdownAdapter } from './select-dropdown-adapter';
import { IOptionComponent, OPTION_CONSTANTS } from '../option';
import { ISelectOption, BASE_SELECT_CONSTANTS } from '../core';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../../list';
import { POPOVER_CONSTANTS, IPopoverComponent } from '../../popover';
import { tryCleanupPopovers } from '../../core/testing/utils';

import './select-dropdown';

const DEFAULT_OPTIONS: ISelectOption[] = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
];

const POPOVER_ANIMATION_DURATION = 200;

type SelectDropdownCoreInternal = ISelectDropdownCore & { _adapter: ISelectDropdownAdapter; _identifier: string };
type SelectDropdownComponentInternal = ISelectDropdownComponent & { _core: SelectDropdownCoreInternal };

interface ITestSelectDropdownContext {
  fixture: HTMLElement;
  component: SelectDropdownComponentInternal;
  targetElement: HTMLElement;
  core: SelectDropdownCoreInternal;
  optionElements: IOptionComponent[];
  isAttached(): boolean;
  append(): void;
  destroy(): void;
}

describe('SelectDropdownComponent', () => {
  let context: ITestSelectDropdownContext;

  afterEach(() => {
    context?.destroy();
  });

  it('should instantiate component instance', () => {
    context = setupTestContext();
    expect(context.component.shadowRoot).to.exist;
  });

  it('should not attach if no target is set', () => {
    context = setupTestContext();

    expect(context.component.shadowRoot).to.exist;
  });

  it('should set target via attribute', () => {
    context = setupTestContext();

    const expectedTarget = '#test-target';
    context.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.TARGET, expectedTarget);

    expect(context.component.target).to.equal(expectedTarget);
  });

  it('should change target after initializing without a target set', async () => {
    context = setupTestContext(true, false);

    await frame();
    context.component.target = '#select-dropdown-target';

    expect(context.isAttached()).to.be.true;
  });

  it('should set selectedTextTarget via attribute', () => {
    context = setupTestContext();

    expect(context.component.syncSelectedText).to.be.false;
    context.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.SYNC_SELECTED_TEXT, 'true');

    expect(context.component.syncSelectedText).to.be.true;
  });

  it('should set selectedTextTarget via attribute', () => {
    context = setupTestContext();

    const expected = '#test-ele';
    context.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.SELECTED_TEXT_TARGET, expected);

    expect(context.component.selectedTextTarget).to.equal(expected);
  });

  it('should set value via attribute', () => {
    context = setupTestContext();

    const expected = DEFAULT_OPTIONS[0].value;
    context.component.setAttribute(BASE_SELECT_CONSTANTS.attributes.VALUE, expected);

    expect(context.component.value).to.equal(expected);
  });

  it('should detach if target is disconnected', async () => {
    context = setupTestContext();

    removeElement(context.targetElement);
    await frame();

    expect(context.isAttached()).to.be.false;
  });

  it('should not be attached if intialized with invalid target selector', async () => {
    context = setupTestContext(false);

    context.component.target = '#invalid-selector';
    context.append();
    await frame();

    expect(context.isAttached()).to.be.false;
  });

  it('should not initialize if no target is set', async () => {
    context = setupTestContext(false);

    context.component.target = undefined as any;
    context.append();
    await frame();

    expect(context.isAttached()).to.be.false;
  });

  it('should emit a scrolled bottom event when scrolling popup to bottom', async () => {
    const callback = spy();
    context = setupTestContext();

    const options: ISelectOption[] = [];
    for (let i = 0; i < 100; i++) {
      options.push({ label: `Option #${i}`, value: i });
    }

    context.component.options = options;
    context.component.observeScroll = true;
    context.component.observeScrollThreshold = 100;
    context.component.addEventListener(SELECT_DROPDOWN_CONSTANTS.events.SCROLLED_BOTTOM, callback);
    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const popup = _getPopup();
    const scrollElement = popup.shadowRoot!.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
    scrollElement.scrollTop = scrollElement.scrollHeight;
    await frame();

    expect(callback).to.have.been.calledOnce;
  });

  it('should select option', async () => {
    context = setupTestContext();

    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    _clickListItem(0);

    expect(context.component.value).to.equal(DEFAULT_OPTIONS[0].value);
    expect(context.targetElement.innerText).not.to.contain(DEFAULT_OPTIONS[0].label);
  });

  it('should select multiple options', async () => {
    context = setupTestContext();

    context.component.multiple = true;
    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    _clickListItem(1);
    _clickListItem(2);

    expect(context.component.value).to.deep.equal([DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value]);
  });

  it('should sync selected text when option is selected', async () => {
    context = setupTestContext();

    context.component.syncSelectedText = true;
    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    _clickListItem(0);

    expect(context.targetElement.innerText).to.equal(DEFAULT_OPTIONS[0].label);
  });

  it('should sync selected text when value property is set', async () => {
    context = setupTestContext();

    context.component.syncSelectedText = true;
    context.component.value = DEFAULT_OPTIONS[1].value;

    expect(context.targetElement.innerText).to.equal(DEFAULT_OPTIONS[1].label);
  });

  it('should call selected text builder when synchronizing selected text', async () => {
    context = setupTestContext();

    context.component.syncSelectedText = true;
    context.component.selectedTextBuilder = options => `Chose: ${options[0].label}`;
    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    _clickListItem(0);

    expect(context.targetElement.innerText).to.equal(`Chose: ${DEFAULT_OPTIONS[0].label}`);
  });

  it('should set selected text to alternate element', async () => {
    context = setupTestContext();

    const someEle = document.createElement('div');
    someEle.id = 'some-ele';
    context.targetElement.appendChild(someEle);

    context.component.syncSelectedText = true;
    context.component.selectedTextTarget = `#${someEle.id}`;
    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    _clickListItem(1);

    expect(someEle.innerText).to.equal(DEFAULT_OPTIONS[1].label);
  });

  it('should set active descenadant', async () => {
    context = setupTestContext();

    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    context.targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(context.targetElement.hasAttribute('aria-activedescendant')).to.be.true;
    expect(context.targetElement.getAttribute('aria-activedescendant')).to.equal(`list-dropdown-option-${context.core['_identifier']}-0`);
  });

  it('should update active descendant when using keyboard navigation', async () => {
    context = setupTestContext();

    context.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const originalValue = context.targetElement.getAttribute('aria-activedescendant');
    context.targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(originalValue).to.not.exist;
    expect(context.targetElement.getAttribute('aria-activedescendant')).to.exist;
    expect(context.targetElement.getAttribute('aria-activedescendant')).not.to.equal(originalValue);
  });

  it('should remove popover when removed from DOM while open', async () => {
    context = setupTestContext();
    context.component.open = true;

    await task(POPOVER_ANIMATION_DURATION);
    expect(_getPopup()).to.exist;

    context.fixture.remove();

    expect(_getPopup()).to.not.exist;
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

    const component = document.createElement('forge-select-dropdown') as SelectDropdownComponentInternal;
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
      core: component['_core'],
      optionElements,
      isAttached: () => component['_core']['_adapter'].isAttached(),
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

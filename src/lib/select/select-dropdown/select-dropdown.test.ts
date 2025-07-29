import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { ifDefined } from 'lit/directives/if-defined.js';
import { removeElement } from '@tylertech/forge-core';
import { task, frame } from '../../core/utils/utils';
import { SELECT_DROPDOWN_CONSTANTS, ISelectDropdownComponent, ISelectDropdownCore, ISelectDropdownAdapter } from '../select-dropdown';
import { ISelectOption, BASE_SELECT_CONSTANTS } from '../core';
import { IOptionComponent } from '../option';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../../list';
import { POPOVER_CONSTANTS, IPopoverComponent } from '../../popover';

import '../select-dropdown';
import '../option';

const DEFAULT_OPTIONS: ISelectOption[] = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
];

const POPOVER_ANIMATION_DURATION = 200;

type SelectDropdownCoreInternal = ISelectDropdownCore & { _adapter: ISelectDropdownAdapter; _identifier: string };
type SelectDropdownComponentInternal = ISelectDropdownComponent & { _core: SelectDropdownCoreInternal };

class SelectDropdownHarness {
  constructor(
    public container: HTMLElement,
    public component: SelectDropdownComponentInternal,
    public targetElement: HTMLElement,
    public optionElements: IOptionComponent[]
  ) {}

  public get core(): SelectDropdownCoreInternal {
    return this.component._core;
  }

  public isAttached(): boolean {
    return this.component._core._adapter.isAttached();
  }

  public get popup(): IPopoverComponent {
    return document.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
  }

  public get listItems(): IListItemComponent[] {
    const popup = this.popup;
    if (!popup) {
      return [];
    }
    return Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
  }

  public clickListItem(index: number): void {
    const listItems = this.listItems;
    if (index >= 0 && index < listItems.length) {
      const shadowEl = listItems[index].shadowRoot!.firstElementChild as IListItemComponent;
      shadowEl.click();
    }
  }

  public destroy(): void {
    // Clean up any popovers
    const existingPopovers = document.querySelectorAll(POPOVER_CONSTANTS.elementName);
    existingPopovers.forEach(popover => {
      if (popover.isConnected) {
        popover.remove();
      }
    });

    if (this.container.isConnected) {
      this.container.remove();
    }
  }
}

async function createFixture(setTarget = true): Promise<SelectDropdownHarness> {
  const container = await fixture(html`
    <div id="select-dropdown-test-fixture">
      <button id="select-dropdown-target">Choose...</button>
      <forge-select-dropdown target=${ifDefined(setTarget ? '#select-dropdown-target' : undefined)}>
        ${DEFAULT_OPTIONS.map(option => html` <forge-option value="${option.value}">${option.label}</forge-option> `)}
      </forge-select-dropdown>
    </div>
  `);

  const targetElement = container.querySelector('#select-dropdown-target') as HTMLElement;
  const component = container.querySelector('forge-select-dropdown') as SelectDropdownComponentInternal;
  const optionElements = Array.from(container.querySelectorAll('forge-option')) as IOptionComponent[];

  return new SelectDropdownHarness(container as HTMLElement, component, targetElement, optionElements);
}

describe('SelectDropdownComponent', () => {
  afterEach(async () => {
    // Clean up any remaining popovers
    const existingPopovers = document.querySelectorAll(POPOVER_CONSTANTS.elementName);
    existingPopovers.forEach(popover => {
      if (popover.isConnected) {
        popover.remove();
      }
    });
  });

  it('should instantiate component instance', async () => {
    const harness = await createFixture();

    expect(harness.component.shadowRoot).not.to.be.null;

    harness.destroy();
  });

  it('should not attach if no target is set', async () => {
    const harness = await createFixture(false);

    expect(harness.component.shadowRoot).not.to.be.null;

    harness.destroy();
  });

  it('should set target via attribute', async () => {
    const harness = await createFixture();

    const expectedTarget = '#test-target';
    harness.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.TARGET, expectedTarget);

    expect(harness.component.target).to.equal(expectedTarget);

    harness.destroy();
  });

  it('should change target after initializing without a target set', async () => {
    const harness = await createFixture(false);

    await frame();
    harness.component.target = '#select-dropdown-target';

    expect(harness.isAttached()).to.be.true;

    harness.destroy();
  });

  it('should set syncSelectedText via attribute', async () => {
    const harness = await createFixture();

    expect(harness.component.syncSelectedText).to.be.false;
    harness.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.SYNC_SELECTED_TEXT, 'true');

    expect(harness.component.syncSelectedText).to.be.true;

    harness.destroy();
  });

  it('should set selectedTextTarget via attribute', async () => {
    const harness = await createFixture();

    const expected = '#test-ele';
    harness.component.setAttribute(SELECT_DROPDOWN_CONSTANTS.attributes.SELECTED_TEXT_TARGET, expected);

    expect(harness.component.selectedTextTarget).to.equal(expected);

    harness.destroy();
  });

  it('should set value via attribute', async () => {
    const harness = await createFixture();

    const expected = DEFAULT_OPTIONS[0].value;
    harness.component.setAttribute(BASE_SELECT_CONSTANTS.attributes.VALUE, expected);

    expect(harness.component.value).to.equal(expected);

    harness.destroy();
  });

  it('should detach if target is disconnected', async () => {
    const harness = await createFixture();

    removeElement(harness.targetElement);
    await frame();

    expect(harness.isAttached()).to.be.false;

    harness.destroy();
  });

  it('should not be attached if initialized with invalid target selector', async () => {
    const harness = await createFixture(false);

    harness.component.target = '#invalid-selector';
    await frame();

    expect(harness.isAttached()).to.be.false;

    harness.destroy();
  });

  it('should not initialize if no target is set', async () => {
    const harness = await createFixture(false);

    harness.component.target = undefined as any;
    await frame();

    expect(harness.isAttached()).to.be.false;

    harness.destroy();
  });

  it('should emit a scrolled bottom event when scrolling popup to bottom', async () => {
    const harness = await createFixture();
    const callback = spy();

    const options: ISelectOption[] = [];
    for (let i = 0; i < 100; i++) {
      options.push({ label: `Option #${i}`, value: i });
    }

    harness.component.options = options;
    harness.component.observeScroll = true;
    harness.component.observeScrollThreshold = 100;
    harness.component.addEventListener(SELECT_DROPDOWN_CONSTANTS.events.SCROLLED_BOTTOM, callback);
    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();

    const popup = harness.popup;
    const scrollElement = popup.shadowRoot!.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
    scrollElement.scrollTop = scrollElement.scrollHeight;
    await frame();

    expect(callback).to.have.been.calledOnce;

    harness.destroy();
  });

  it('should select option', async () => {
    const harness = await createFixture();

    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    harness.clickListItem(0);

    expect(harness.component.value).to.equal(DEFAULT_OPTIONS[0].value);
    expect(harness.targetElement.innerText).not.to.contain(DEFAULT_OPTIONS[0].label);

    harness.destroy();
  });

  it('should select multiple options', async () => {
    const harness = await createFixture();

    harness.component.multiple = true;
    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    harness.clickListItem(1);
    harness.clickListItem(2);

    expect(harness.component.value).to.deep.equal([DEFAULT_OPTIONS[1].value, DEFAULT_OPTIONS[2].value]);

    harness.destroy();
  });

  it('should sync selected text when option is selected', async () => {
    const harness = await createFixture();

    harness.component.syncSelectedText = true;
    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    harness.clickListItem(0);

    expect(harness.targetElement.innerText).to.equal(DEFAULT_OPTIONS[0].label);

    harness.destroy();
  });

  it('should sync selected text when value property is set', async () => {
    const harness = await createFixture();

    harness.component.syncSelectedText = true;
    harness.component.value = DEFAULT_OPTIONS[1].value;

    expect(harness.targetElement.innerText).to.equal(DEFAULT_OPTIONS[1].label);

    harness.destroy();
  });

  it('should call selected text builder when synchronizing selected text', async () => {
    const harness = await createFixture();

    harness.component.syncSelectedText = true;
    harness.component.selectedTextBuilder = options => `Chose: ${options[0].label}`;
    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    harness.clickListItem(0);

    expect(harness.targetElement.innerText).to.equal(`Chose: ${DEFAULT_OPTIONS[0].label}`);

    harness.destroy();
  });

  it('should set selected text to alternate element', async () => {
    const harness = await createFixture();

    const someEle = document.createElement('div');
    someEle.id = 'some-ele';
    harness.targetElement.appendChild(someEle);

    harness.component.syncSelectedText = true;
    harness.component.selectedTextTarget = `#${someEle.id}`;
    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    await frame();
    harness.clickListItem(1);

    expect(someEle.innerText).to.equal(DEFAULT_OPTIONS[1].label);

    harness.destroy();
  });

  it('should set active descendant', async () => {
    const harness = await createFixture();

    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);
    harness.targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(harness.targetElement.hasAttribute('aria-activedescendant')).to.be.true;
    expect(harness.targetElement.getAttribute('aria-activedescendant')).to.equal(`list-dropdown-option-${harness.core._identifier}-0`);

    harness.destroy();
  });

  it('should update active descendant when using keyboard navigation', async () => {
    const harness = await createFixture();

    harness.component.open = true;
    await task(POPOVER_ANIMATION_DURATION);

    const originalValue = harness.targetElement.getAttribute('aria-activedescendant');
    harness.targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(originalValue).to.be.null;
    expect(harness.targetElement.getAttribute('aria-activedescendant')).not.to.be.null;
    expect(harness.targetElement.getAttribute('aria-activedescendant')).not.to.equal(originalValue);

    harness.destroy();
  });

  it('should remove popover when removed from DOM while open', async () => {
    const harness = await createFixture();
    harness.component.open = true;

    await task(POPOVER_ANIMATION_DURATION);
    expect(harness.popup).not.to.be.null;

    harness.container.remove();

    expect(document.querySelector(POPOVER_CONSTANTS.elementName)).to.be.null;

    // No need to call harness.destroy() since we removed the container already
  });
});

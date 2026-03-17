import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import type { IStateLayerComponent } from '../state-layer/index.js';
import type { ISwitchComponent } from './switch.js';
import { SWITCH_CONSTANTS } from './switch-constants.js';
import { internals } from '../constants.js';

import './switch.js';

class SwitchHarness extends TestHarness<ISwitchComponent> {
  public rootElement: HTMLElement;
  public trackElement: HTMLElement;
  public handleElement: HTMLElement;
  public iconOffElement: HTMLElement;
  public iconOffPathElement: HTMLElement;
  public iconOnElement: HTMLElement;
  public iconOnPathElement: HTMLElement;
  public labelElement: HTMLElement;
  public stateLayer: IStateLayerComponent;
  public focusIndicator: IFocusIndicatorComponent;

  constructor(el: ISwitchComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ROOT);
    this.trackElement = getShadowElement(this.element, '[part="track"]');
    this.handleElement = getShadowElement(this.element, '[part="handle"]');
    this.iconOffElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ICON_OFF);
    this.iconOffPathElement = getShadowElement(this.element, '[part="icon-off-path"]');
    this.iconOnElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ICON_ON);
    this.iconOnPathElement = getShadowElement(this.element, '[part="icon-on-path"]');
    this.labelElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.LABEL);
    this.stateLayer = getShadowElement(this.element, '[part="state-layer"]') as IStateLayerComponent;
    this.focusIndicator = getShadowElement(this.element, '[part="focus-indicator"]') as IFocusIndicatorComponent;
  }

  public async pressSpaceKey(): Promise<void> {
    await userEvent.keyboard(' ');
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    await userEvent.click(el);
  }
}

describe('Switch', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-switch aria-label="Active"></forge-switch>`);
    const ariaEl = screen.container.querySelector('forge-switch') as ISwitchComponent;
    await expect(ariaEl).toBeAccessible();

    const labelScreen = render(html`<forge-switch>Active</forge-switch>`);
    const labelEl = labelScreen.container.querySelector('forge-switch') as ISwitchComponent;
    await expect(labelEl).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const ctx = new SwitchHarness(el);

    await expect(el).not.toBeAccessible();
    expect(el.checked).toBe(false);
    expect(el.on).toBe(false);
    expect(el.selected).toBe(false);
    expect(el.defaultChecked).toBe(false);
    expect(el.defaultOn).toBe(false);
    expect(el.value).toBe('on');
    expect(el.dense).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.readonly).toBe(false);
    expect(el.icon).toBe('both');
    expect(el.labelPosition).toBe('end');
    expect(window.getComputedStyle(ctx.iconOffElement).display).toBe('flex');
    expect(window.getComputedStyle(ctx.iconOnElement).display).not.toBe('none');
    expect(ctx.rootElement.lastElementChild).toBe(ctx.labelElement);
  });

  it('should accept checked', async () => {
    const screen = render(html`<forge-switch checked></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);
  });

  it('should accept on', async () => {
    const screen = render(html`<forge-switch on></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);
  });

  it('should accept selected', async () => {
    const screen = render(html`<forge-switch selected></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);
  });

  it('should accept default-checked', async () => {
    const screen = render(html`<forge-switch default-checked></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.defaultChecked).toBe(true);
    expect(el.defaultOn).toBe(true);
  });

  it('should accept default-on', async () => {
    const screen = render(html`<forge-switch default-on></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.defaultChecked).toBe(true);
    expect(el.defaultOn).toBe(true);
  });

  it('should accept value', async () => {
    const screen = render(html`<forge-switch value="test"></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.value).toBe('test');
  });

  it('should accept disabled', async () => {
    const screen = render(html`<forge-switch disabled aria-label="Active"></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.disabled).toBe(true);
    await expect(el).toBeAccessible();
  });

  it('should accept required', async () => {
    const screen = render(html`<forge-switch required></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.required).toBe(true);
  });

  it('should accept readonly', async () => {
    const screen = render(html`<forge-switch readonly></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const ctx = new SwitchHarness(el);
    const changeSpy = vi.fn();

    el.addEventListener('forge-switch-change', changeSpy);
    await ctx.clickElement(el);

    expect(el.readonly).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should accept dense', async () => {
    const screen = render(html`<forge-switch dense></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.dense).toBe(true);
  });

  it('should accept icon', async () => {
    const offScreen = render(html`<forge-switch icon="off"></forge-switch>`);
    const offEl = offScreen.container.querySelector('forge-switch') as ISwitchComponent;
    const offCtx = new SwitchHarness(offEl);

    expect(offEl.icon).toBe('off');
    expect(window.getComputedStyle(offCtx.iconOffElement).display).not.toBe('none');
    expect(window.getComputedStyle(offCtx.iconOnElement).display).toBe('none');

    const bothScreen = render(html`<forge-switch icon="on"></forge-switch>`);
    const bothEl = bothScreen.container.querySelector('forge-switch') as ISwitchComponent;
    const bothCtx = new SwitchHarness(bothEl);

    expect(bothEl.icon).toBe('on');
    expect(window.getComputedStyle(bothCtx.iconOffElement).display).toBe('none');
    expect(window.getComputedStyle(bothCtx.iconOnElement).display).not.toBe('none');

    const noneScreen = render(html`<forge-switch icon="none"></forge-switch>`);
    const noneEl = noneScreen.container.querySelector('forge-switch') as ISwitchComponent;
    const noneCtx = new SwitchHarness(noneEl);

    expect(noneEl.icon).toBe('none');
    expect(window.getComputedStyle(noneCtx.iconOffElement).display).toBe('none');
    expect(window.getComputedStyle(noneCtx.iconOnElement).display).toBe('none');
  });

  it('should accept label position', async () => {
    const screen = render(html`<forge-switch label-position="start"></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const ctx = new SwitchHarness(el);

    expect(el.labelPosition).toBe('start');
    expect(ctx.rootElement.firstElementChild).toBe(ctx.labelElement);

    el.labelPosition = 'end';

    expect(el.labelPosition).toBe('end');
    expect(ctx.rootElement.lastElementChild).toBe(ctx.labelElement);
  });

  it('should not set non-string value as attribute', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const value = { value: 'value' } as any;
    el.value = value;
    expect(el.value).toBe(value);
    expect(el.getAttribute('value')).toBeNull();
  });

  it('should toggle', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    el.toggle();

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);
  });

  it('should toggle on', async () => {
    const screen = render(html`<forge-switch aria-label="Active"></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.checked).toBe(false);
    expect(el.on).toBe(false);
    expect(el.selected).toBe(false);

    el.toggle(true);

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);
    await expect(el).toBeAccessible();
  });

  it('should toggle off', async () => {
    const screen = render(html`<forge-switch aria-label="Active" checked></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);

    el.toggle(false);

    expect(el.checked).toBe(false);
    expect(el.on).toBe(false);
    expect(el.selected).toBe(false);
    await expect(el).toBeAccessible();
  });

  it('should set on when clicked', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const ctx = new SwitchHarness(el);
    const changeSpy = vi.fn();
    el.addEventListener('forge-switch-change', changeSpy);

    await ctx.clickElement(el);

    expect(el.checked).toBe(true);
    expect(el.on).toBe(true);
    expect(el.selected).toBe(true);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBe(true);
  });

  it('should set on when space is pressed', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const ctx = new SwitchHarness(el);
    const changeSpy = vi.fn();
    el.addEventListener('forge-switch-change', changeSpy);

    el.focus();
    await ctx.pressSpaceKey();

    expect(el.on).toBe(true);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBe(true);
  });

  it('should cancel change event', async () => {
    const screen = render(html`<forge-switch></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const ctx = new SwitchHarness(el);
    el.addEventListener('forge-switch-change', (event: Event) => {
      event.preventDefault();
    });

    await ctx.clickElement(el);

    expect(el.checked).toBe(false);
    expect(el.on).toBe(false);
    expect(el.selected).toBe(false);
  });

  it('should return form element and name', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('name', 'test-switch');
    form.appendChild(switchEl);

    expect(switchEl.form).toBe(form);
    expect(switchEl.name).toBe('test-switch');
    expect(switchEl.labels).toHaveLength(0);

    switchEl.name = 'new-name';
    expect(switchEl.name).toBe('new-name');

    switchEl.name = null as any;
    expect(switchEl.name).toBe('');
  });

  it('should return associated form labels', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('id', 'test-switch');
    form.appendChild(switchEl);

    const labelText = 'Test Label';
    const label = document.createElement('label');
    label.setAttribute('for', 'test-switch');
    label.textContent = labelText;
    form.appendChild(label);

    expect(switchEl.labels).toHaveLength(1);
    expect(switchEl.labels[0].textContent).toBe(labelText);
  });

  it('should set form value when value is set', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('name', 'test-switch');
    form.appendChild(switchEl);

    let formData = new FormData(form);
    expect(formData.get('test-switch')).toBeNull();

    switchEl.checked = true;
    formData = new FormData(form);
    expect(formData.get('test-switch')).toBe('on');
  });

  it('should reset value when form is reset', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('name', 'test-switch');
    form.appendChild(switchEl);

    switchEl.checked = true;
    let formData = new FormData(form);
    expect(formData.get('test-switch')).toBe('on');

    form.reset();
    formData = new FormData(form);

    expect(switchEl.checked).toBe(false);
    expect(switchEl.on).toBe(false);
    expect(switchEl.selected).toBe(false);
    expect(formData.get('test-switch')).toBeNull();
  });

  it('should restore form state', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const switchEl = document.createElement('forge-switch');
    const setFormValueSpy = vi.spyOn(switchEl[internals], 'setFormValue');
    switchEl.name = 'test-switch';
    switchEl.toggleAttribute('checked', true);
    form.appendChild(switchEl);

    const [value, state] = setFormValueSpy.mock.calls[0] ?? [null, null];
    const newSwitchEl = document.createElement('forge-switch');
    switchEl.remove();
    form.appendChild(newSwitchEl);

    let restoreState: any = state ?? value;
    if (restoreState instanceof FormData) {
      restoreState = Array.from((restoreState as any).entries());
    }

    (newSwitchEl as any).formStateRestoreCallback(restoreState, 'restore');

    expect(switchEl.checked).toBe(true);
    expect(switchEl.on).toBe(true);
    expect(switchEl.selected).toBe(true);
  });

  it('should validate', async () => {
    const screen = render(html`<forge-switch required></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;

    expect(el[internals].validity.valid).toBe(false);
    expect(el[internals].validationMessage).not.toBe('');
    expect(el[internals].checkValidity()).toBe(false);
    expect(el[internals].reportValidity()).toBe(false);

    el.checked = true;

    expect(el[internals].willValidate).toBe(true);
    expect(el[internals].validity.valid).toBe(true);
    expect(el[internals].validationMessage).toBe('');
    expect(el[internals].checkValidity()).toBe(true);
    expect(el[internals].reportValidity()).toBe(true);
  });

  it('should set custom validity', async () => {
    const screen = render(html`<forge-switch required></forge-switch>`);
    const el = screen.container.querySelector('forge-switch') as ISwitchComponent;
    const message = 'Custom error message';

    el[internals].setValidity({ customError: true }, message);

    expect(el[internals].validationMessage).toBe(message);
  });
});

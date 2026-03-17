import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { frame } from '../core/utils/utils.js';
import type { ILabelAware, ILabelComponent } from '../label/index.js';
import { LABEL_CONSTANTS } from '../label/index.js';

import './label.js';

class LabelHarness {
  public labelAwareElement: HTMLElement & ILabelAware;

  constructor(public readonly element: ILabelComponent) {
    this.initElementRefs();
  }

  public initElementRefs(): void {
    const element = document.createElement(LABEL_CONSTANTS.labelableChildSelectors[0]);
    element.id = 'label-aware';
    (element as any).labelClickedCallback = () => {};
    (element as any).labelChangedCallback = () => {};
    this.labelAwareElement = element as any as HTMLElement & ILabelAware;
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    await userEvent.click(el);
  }
}

describe('Label', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-label></forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-label></forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    await expect(el).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const screen = render(html`<forge-label></forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;

    expect(el.for).toBeUndefined();
    expect(el.forElement).toBeUndefined();
    expect(el.dynamic).toBe(false);
  });

  it('should accept for', async () => {
    const screen = render(html`<forge-label for="test"></forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    expect(el.for).toBe('test');
  });

  it('should accept forElement', async () => {
    const screen = render(html`<forge-label></forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.forElement = ctx.labelAwareElement;

    expect(el.forElement).toBe(ctx.labelAwareElement);
  });

  it('should accept dynamic', async () => {
    const screen = render(html`<forge-label dynamic></forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    expect(el.dynamic).toBe(true);
  });

  it('should locate target element by id', async () => {
    const screen = render(html`<forge-label>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);
    const connectedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    expect(connectedSpy).toHaveBeenCalledOnce();
  });

  it('should locate target element by reference', async () => {
    const screen = render(html`<forge-label>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);
    const connectedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.forElement = ctx.labelAwareElement;

    expect(connectedSpy).toHaveBeenCalledOnce();
  });

  it('should locate slotted target element', async () => {
    const screen = render(html`<forge-label>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);
    const connectedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');

    el.append(ctx.labelAwareElement);
    await frame();

    expect(connectedSpy).toHaveBeenCalled();
  });

  it('should update manually', async () => {
    const screen = render(html`<forge-label>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);

    el.append(ctx.labelAwareElement);
    await frame();

    const updatedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');
    el.update();

    expect(updatedSpy).toHaveBeenCalledOnce();
  });

  it('should not update automatically by default', async () => {
    const screen = render(html`<forge-label>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    const changedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');
    el.innerText = 'New Label';

    expect(changedSpy).not.toHaveBeenCalled();
  });

  it('should update automatically when dynamic', async () => {
    const screen = render(html`<forge-label dynamic>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    const changedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');
    el.innerText = 'New Label';

    await frame();

    expect(changedSpy).toHaveBeenCalledWith('New Label');
  });

  it('should stop updating automatically when dynamic is removed', async () => {
    const screen = render(html`<forge-label dynamic>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;
    el.innerText = 'New Label';

    await frame();
    el.dynamic = false;

    const changedSpy = vi.spyOn(ctx.labelAwareElement, 'labelChangedCallback');
    el.innerText = 'New Label 2';

    expect(changedSpy).not.toHaveBeenCalled();
  });

  it('should handle click', async () => {
    const screen = render(html`<forge-label>Label</forge-label>`);
    const el = screen.container.querySelector('forge-label') as ILabelComponent;
    const ctx = new LabelHarness(el);

    el.insertAdjacentElement('afterend', ctx.labelAwareElement);
    el.for = ctx.labelAwareElement.id;

    const clickedSpy = vi.spyOn(ctx.labelAwareElement, 'labelClickedCallback');
    await ctx.clickElement(el);

    expect(clickedSpy).toHaveBeenCalledOnce();
  });
});

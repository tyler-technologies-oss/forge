import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { frame, task } from '../core/utils/utils.js';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop/index.js';
import type { IButtonComponent } from '../button/index.js';
import type { ICircularProgressComponent } from '../circular-progress/index.js';
import type { IDialogComponent } from '../dialog/index.js';
import type { ILinearProgressComponent } from '../linear-progress/index.js';
import type { IBusyIndicatorComponent } from './busy-indicator.js';
import type { BusyIndicatorMode, BusyIndicatorVariant } from './busy-indicator-constants.js';

import './busy-indicator.js';

// Enter/exit animation duration + buffer for the underlying forge-dialog transition
const ANIMATION_TIMEOUT = 500;

describe('Busy Indicator', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
    expect(harness.forgeDialogElement).toBeTruthy();
  });

  it('should have expected default state', async () => {
    const harness = await createFixture();

    expect(harness.isOpen).toBe(false);
    expect(harness.forgeDialogElement.mode).toBe('modal');
    expect(harness.titleElement).toBeFalsy();
    expect(harness.messageElement).toBeFalsy();
    expect(harness.spinnerElement).toBeTruthy();
    expect(harness.cancelButtonElement).toBeFalsy();
    expect(harness.progressBarElement).toBeFalsy();
    expect(harness.element.progress).toBe(0);
    expect(harness.element.buffer).toBe(0);
    expect(harness.element.mode).toBe('fullscreen');
    expect(harness.element.label).toBeFalsy();
    expect(harness.element.description).toBeFalsy();
    expect(harness.element.headingLevel).toBe(1);
  });

  it('should define sub-component dependencies', async () => {
    expect(window.customElements.get('forge-dialog')).toBeTruthy();
    expect(window.customElements.get('forge-circular-progress')).toBeTruthy();
    expect(window.customElements.get('forge-button')).toBeTruthy();
    expect(window.customElements.get('forge-linear-progress')).toBeTruthy();
  });

  it('should set open', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);
  });

  it('should set open via attribute', async () => {
    const harness = await createFixture();

    harness.element.setAttribute('open', '');
    await harness.element.updateComplete;

    expect(harness.isOpen).toBe(true);
  });

  it('should close when open is set to false', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    harness.element.open = false;
    await harness.element.updateComplete;

    expect(harness.isOpen).toBe(false);
  });

  it('should set title text', async () => {
    const harness = await createFixture({ titleText: 'Loading...' });

    expect(harness.element.titleText).toBe('Loading...');
    expect(harness.titleElement).toBeTruthy();
    expect(harness.titleElement.innerText).toBe('Loading...');
  });

  it('should set title text via slot', async () => {
    const harness = await createFixture({ titleTextSlot: 'Loading...' });

    await harness.element.updateComplete;

    expect(harness.titleElement).toBeTruthy();
    expect(harness.slottedTitleElement.innerText).toBe('Loading...');
  });

  it('should set title heading level', async () => {
    const harness = await createFixture({ titleText: 'Title', headingLevel: 2 });

    expect(harness.titleElement).toBeTruthy();
    expect(harness.titleElement.ariaLevel).toBe('2');

    harness.element.headingLevel = 3;

    await harness.element.updateComplete;

    expect(harness.titleElement.ariaLevel).toBe('3');
  });

  it('should set message', async () => {
    const harness = await createFixture({ message: 'Please wait while we load your data' });

    expect(harness.messageElement).toBeTruthy();
    expect(harness.messageElement.innerText).toBe('Please wait while we load your data');
  });

  it('should set mode', async () => {
    const harness = await createFixture({ mode: 'inline' });

    expect(harness.forgeDialogElement.mode).toBe('inline-modal');
    expect(harness.element.mode).toBe('inline');
  });

  it('should set accessible label', async () => {
    const harness = await createFixture({ label: 'Loading' });

    expect(harness.element.label).toBe('Loading');
    expect(harness.forgeDialogElement.label).toBe('Loading');
    await expect(harness.element).toBeAccessible();
  });

  it('should set accessible description', async () => {
    const harness = await createFixture({ description: 'Please wait while we load your data' });

    expect(harness.element.description).toBe('Please wait while we load your data');
    expect(harness.forgeDialogElement.description).toBe('Please wait while we load your data');
    await expect(harness.element).toBeAccessible();
  });

  it('should set accessible label from slotted title', async () => {
    const title = 'Loading';
    const harness = await createFixture({ titleTextSlot: title });

    expect(harness.forgeDialogElement.label).toBe(title);
    await expect(harness.element).toBeAccessible();
  });

  it('should set accessible description from message when message is visible', async () => {
    const message = 'Please wait while we load your data';
    const harness = await createFixture({ variant: 'message-only', messageTextSlot: message });

    expect(harness.forgeDialogElement.description).toBe(message);
    await expect(harness.element).toBeAccessible();
  });

  it('should show spinner when variant is spinner', async () => {
    const harness = await createFixture({ variant: 'spinner' });

    expect(harness.spinnerElement).toBeTruthy();
  });

  it('should not show spinner when using progress variant', async () => {
    const harness = await createFixture({ variant: 'progress' });

    expect(harness.spinnerElement).toBeFalsy();
  });

  it('should show progress bar when variant is progress', async () => {
    const harness = await createFixture({ variant: 'progress' });

    expect(harness.progressBarElement).toBeTruthy();
  });

  it('should not show progress bar when using spinner variant', async () => {
    const harness = await createFixture();

    expect(harness.progressBarElement).toBeFalsy();
  });

  it('should not show progress bar or spinner when using message-only variant', async () => {
    const harness = await createFixture({ variant: 'message-only' });

    expect(harness.spinnerElement).toBeFalsy();
    expect(harness.progressBarElement).toBeFalsy();
  });

  it('should set progress bar determinate attribute', async () => {
    const harness = await createFixture({ variant: 'progress', determinate: true });

    expect(harness.progressBarElement.determinate).toBe(true);
  });

  it('should set determinate progress', async () => {
    const harness = await createFixture({ variant: 'progress', determinate: true });

    expect(harness.progressBarElement.progress).toBe(0);

    harness.element.progress = 0.75;
    await harness.element.updateComplete;

    expect(harness.progressBarElement.progress).toBe(0.75);
  });

  it('should set determinate progress buffer', async () => {
    const harness = await createFixture({ variant: 'progress', determinate: true });

    expect(harness.progressBarElement.buffer).toBe(0);

    harness.element.buffer = 0.5;
    await harness.element.updateComplete;

    expect(harness.progressBarElement.buffer).toBe(0.5);
  });

  it('should dispatch cancel event', async () => {
    const harness = await createFixture({ open: true, cancelable: true });

    expect(harness.isOpen).toBe(true);

    const spy = vi.fn();
    harness.element.addEventListener('forge-busy-indicator-cancel', spy);

    await userEvent.click(harness.cancelButtonElement);

    expect(spy).toHaveBeenCalledOnce();
    expect(harness.isOpen).toBe(false);
  });

  it('should not close when cancel event is prevented', async () => {
    const harness = await createFixture({ open: true, cancelable: true });

    expect(harness.isOpen).toBe(true);

    const spy = vi.fn((evt: Event) => evt.preventDefault());
    harness.element.addEventListener('forge-busy-indicator-cancel', spy);

    await userEvent.click(harness.cancelButtonElement);

    expect(spy).toHaveBeenCalledOnce();
    expect(harness.isOpen).toBe(true);
  });

  it('should not close when clicking outside', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    harness.clickOutside();

    expect(harness.isOpen).toBe(true);
  });

  it('should not close when pressing escape key', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    await harness.pressEscapeKey();

    expect(harness.isOpen).toBe(true);
  });

  it('should capture and reset focused element when fullscreen', async () => {
    const harness = await createFixture();

    expect(harness.isOpen).toBe(false);
    expect(harness.element.mode).toBe('fullscreen');
    expect(document.activeElement).toBe(document.body);

    harness.element.open = true;
    await harness.element.updateComplete;

    await harness.focusDelay();

    expect(harness.isOpen).toBe(true);
    expect(document.activeElement).toBe(harness.element);

    harness.element.open = false;
    await harness.element.updateComplete;
    await task(ANIMATION_TIMEOUT);

    expect(harness.isOpen).toBe(false);
    expect(document.activeElement).toBe(document.body);
  });

  it('should not capture and reset focused element when inline', async () => {
    const harness = await createFixture({ mode: 'inline' });

    expect(harness.isOpen).toBe(false);
    expect(harness.element.mode).toBe('inline');
    expect(document.activeElement).toBe(document.body);

    harness.element.open = true;
    await harness.element.updateComplete;

    await harness.focusDelay();

    expect(harness.isOpen).toBe(true);
    expect(document.activeElement).toBe(document.body);

    harness.element.open = false;
    await harness.element.updateComplete;

    expect(harness.isOpen).toBe(false);
    expect(document.activeElement).toBe(document.body);
  });
});

class BusyIndicatorHarness extends TestHarness<IBusyIndicatorComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get forgeDialogElement(): IDialogComponent {
    return getShadowElement(this.element, 'forge-dialog') as IDialogComponent;
  }

  public get titleElement(): HTMLHeadingElement {
    return getShadowElement(this.element, '#title') as HTMLHeadingElement;
  }

  public get slottedTitleElement(): HTMLSpanElement {
    return this.element.querySelector('[slot="title"]') as HTMLSpanElement;
  }

  public get messageElement(): HTMLParagraphElement {
    return getShadowElement(this.element, '#message') as HTMLParagraphElement;
  }

  public get spinnerElement(): ICircularProgressComponent {
    return getShadowElement(this.element, '.spinner') as ICircularProgressComponent;
  }

  public get cancelButtonElement(): IButtonComponent {
    return getShadowElement(this.element, '.cancel-button') as IButtonComponent;
  }

  public get progressBarElement(): ILinearProgressComponent {
    return getShadowElement(this.element, '.progress-container > forge-linear-progress') as ILinearProgressComponent;
  }

  public get isOpen(): boolean {
    return this.element.open && this.forgeDialogElement.open;
  }

  public clickOutside(): void {
    const backdropElement = getShadowElement(this.forgeDialogElement, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
    if (backdropElement.visible) {
      backdropElement.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    }
  }

  public async pressEscapeKey(): Promise<void> {
    await userEvent.keyboard('{Escape}');
  }

  public async focusDelay(): Promise<void> {
    // Wait for two frames to ensure focus is captured by the <forge-dialog> element
    await frame();
    await frame();
  }
}

interface BusyIndicatorFixtureConfig {
  open?: boolean;
  mode?: BusyIndicatorMode;
  titleText?: string;
  titleTextSlot?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  message?: string;
  messageTextSlot?: string;
  cancelable?: boolean;
  variant?: BusyIndicatorVariant;
  determinate?: boolean;
  label?: string;
  description?: string;
}

async function createFixture({
  open = false,
  mode,
  titleText,
  titleTextSlot,
  headingLevel,
  messageTextSlot,
  message,
  cancelable,
  variant,
  determinate,
  label,
  description
}: BusyIndicatorFixtureConfig = {}): Promise<BusyIndicatorHarness> {
  const screen = render(html`
    <forge-busy-indicator
      label=${ifDefined(label)}
      description=${ifDefined(description)}
      title-text=${ifDefined(titleText)}
      message=${ifDefined(message)}
      ?cancelable=${cancelable}
      variant=${ifDefined(variant)}
      ?determinate=${determinate}
      .open=${open}
      mode=${ifDefined(mode)}
      heading-level=${ifDefined(headingLevel)}>
      ${titleTextSlot ? html`<span slot="title">${titleTextSlot}</span>` : nothing}
      ${messageTextSlot ? html`<span slot="message">${messageTextSlot}</span>` : nothing}
    </forge-busy-indicator>
  `);
  const el = screen.container.querySelector('forge-busy-indicator') as IBusyIndicatorComponent;
  await el.updateComplete;

  return new BusyIndicatorHarness(el);
}

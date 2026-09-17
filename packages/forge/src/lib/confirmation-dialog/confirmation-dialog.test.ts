import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop/index.js';
import type { IButtonComponent } from '../button/index.js';
import type { ICircularProgressComponent } from '../circular-progress/index.js';
import type { IDialogComponent } from '../dialog/index.js';
import type { IConfirmationDialogComponent } from './confirmation-dialog.js';

import './confirmation-dialog.js';

describe('Confirmation Dialog', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should have expected default state', async () => {
    const harness = await createFixture();

    expect(harness.isOpen).toBe(false);
    expect(harness.isBusy).toBe(false);
  });

  it('should define sub-component dependencies', async () => {
    expect(window.customElements.get('forge-dialog')).toBeTruthy();
    expect(window.customElements.get('forge-circular-progress')).toBeTruthy();
    expect(window.customElements.get('forge-button')).toBeTruthy();
    expect(window.customElements.get('forge-icon')).toBeTruthy();
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

  it('should set the aria-label of the circular progress to the busyLabel property', async () => {
    const harness = await createFixture({ open: true, isBusy: true });

    harness.element.busyLabel = 'Loading images';
    await harness.element.updateComplete;

    expect(harness.circularProgressElement.ariaLabel).toBe('Loading images');
  });

  it('should set the aria-label of the circular progress to the busy-label attribute', async () => {
    const harness = await createFixture({ open: true, isBusy: true });

    harness.element.setAttribute('busy-label', 'Loading more images');
    await harness.element.updateComplete;

    expect(harness.circularProgressElement.ariaLabel).toBe('Loading more images');
  });

  it('should close when open is set to false', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    harness.element.open = false;
    await harness.element.updateComplete;

    expect(harness.isOpen).toBe(false);
  });

  it('content should project into the title slot', async () => {
    const harness = await createFixture();

    expect(harness.titleSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('content should project into the message slot', async () => {
    const harness = await createFixture();

    expect(harness.messageSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('content should project into the secondary-button-text slot', async () => {
    const harness = await createFixture();

    expect(harness.secondaryButtonTextSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('content should project into the primary-button-text slot', async () => {
    const harness = await createFixture();

    expect(harness.primaryButtonTextSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should dispatch value=true forge-confirmation-dialog-action event when clicking the primary action', async () => {
    const harness = await createFixture({ open: true });
    const spy = vi.fn();

    harness.element.addEventListener('forge-confirmation-dialog-action', spy);

    await userEvent.click(harness.primaryButton);

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.value).toBe(true);
  });

  it('should dispatch value=false forge-confirmation-dialog-action event when clicking the secondary action', async () => {
    const harness = await createFixture({ open: true });
    const spy = vi.fn();

    harness.element.addEventListener('forge-confirmation-dialog-action', spy);

    await userEvent.click(harness.secondaryButton);

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.value).toBe(false);
  });

  it('should reset the isBusy state of the dialog when closed', async () => {
    const harness = await createFixture({ open: true });
    harness.element.isBusy = true;

    expect(harness.isOpen).toBe(true);
    expect(harness.isBusy).toBe(true);

    harness.element.open = false;
    await harness.element.updateComplete;

    expect(harness.isOpen).toBe(false);
    expect(harness.isBusy).toBe(false);
  });

  it('busy indicator should be present when isBusy is set to true', async () => {
    const harness = await createFixture({ open: true });
    harness.element.isBusy = true;
    await harness.element.updateComplete;

    expect(harness.circularProgressElement).toBeTruthy();
  });

  it('busy indicator should be removed when isBusy is set to false', async () => {
    const harness = await createFixture({ open: true, isBusy: true });

    expect(harness.circularProgressElement).toBeTruthy();

    harness.element.isBusy = false;
    await harness.element.updateComplete;

    expect(harness.circularProgressElement).toBeFalsy();
  });

  it('secondary button should be removed if the secondary-button-text slot is removed', async () => {
    const harness = await createFixture({ open: true, secondaryActionText: 'Cancel' });
    harness.secondaryButtonTextSlot.assignedElements().forEach(el => el.remove());

    await harness.element.updateComplete;
    await harness.element.updateComplete;

    expect(harness.secondaryButton).toBeFalsy();
  });

  it('heading element should be removed if the title slot is removed', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.headingElement).toBeTruthy();

    harness.titleSlot.assignedElements().forEach(el => el.remove());

    await harness.element.updateComplete;
    await harness.element.updateComplete;

    expect(harness.headingElement).toBeFalsy();
  });

  it('should not close when action event is prevented', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    const spy = vi.fn((evt: Event) => evt.preventDefault());
    harness.element.addEventListener('forge-confirmation-dialog-action', spy);

    await userEvent.click(harness.secondaryButton);

    expect(spy).toHaveBeenCalledOnce();
    expect(harness.isOpen).toBe(true);
  });

  it('should close the dialog when secondary action is clicked and event is not prevented', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    const spy = vi.fn();
    harness.element.addEventListener('forge-confirmation-dialog-action', spy);

    await userEvent.click(harness.secondaryButton);

    expect(spy).toHaveBeenCalledOnce();
    expect(harness.isOpen).toBe(false);
  });

  it('should not close when the backdrop is clicked', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    harness.clickOutside();

    expect(harness.isOpen).toBe(true);
  });

  it('should set accessible label from slotted title', async () => {
    const title = 'Loading';
    const harness = await createFixture({ title });

    expect(harness.forgeDialogElement.label).toBe(title);
    await expect(harness.element).toBeAccessible();
  });

  it('should set accessible description from message when message is visible', async () => {
    const message = 'Please wait while we load your data';
    const harness = await createFixture({ message });

    expect(harness.forgeDialogElement.description).toBe(message);
    await expect(harness.element).toBeAccessible();
  });

  it('primary button should default to say "confirm" if the primary-button-text slot is removed', async () => {
    const harness = await createFixture({ open: true, primaryActionText: 'Yes' });
    harness.primaryButtonTextSlot.assignedElements().forEach(el => el.remove());

    await harness.element.updateComplete;
    await harness.element.updateComplete;

    expect(harness.primaryButton).toBeTruthy();
    expect(harness.primaryButton.textContent?.trim()).toBe('Confirm');
  });
});

class ConfirmationDialogHarness extends TestHarness<IConfirmationDialogComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get forgeDialogElement(): IDialogComponent {
    return getShadowElement(this.element, 'forge-dialog') as IDialogComponent;
  }

  public get secondaryButtonTextSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="secondary-button-text"]') as HTMLSlotElement;
  }

  public get primaryButtonTextSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="primary-button-text"]') as HTMLSlotElement;
  }

  public get secondaryButton(): IButtonComponent {
    return getShadowElement(this.element, '#secondary-button') as IButtonComponent;
  }

  public get headingElement(): HTMLElement {
    return getShadowElement(this.element, 'h1') as HTMLElement;
  }

  public get primaryButton(): IButtonComponent {
    return getShadowElement(this.element, '#primary-button') as IButtonComponent;
  }

  public get circularProgressElement(): ICircularProgressComponent {
    return getShadowElement(this.element, 'forge-circular-progress') as ICircularProgressComponent;
  }

  public get titleSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="title"]') as HTMLSlotElement;
  }

  public get messageSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="message"]') as HTMLSlotElement;
  }

  public get isOpen(): boolean {
    return this.element.open && this.forgeDialogElement.open;
  }

  public get isBusy(): boolean {
    return this.element.isBusy && this.forgeDialogElement.open;
  }

  public clickOutside(): void {
    const backdropElement = getShadowElement(this.forgeDialogElement, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
    if (backdropElement.visible) {
      backdropElement.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    }
  }
}

interface ConfirmationDialogFixtureConfig {
  title?: string;
  message?: string;
  open?: boolean;
  isBusy?: boolean;
  secondaryActionText?: string;
  primaryActionText?: string;
}

async function createFixture({
  title = 'Title',
  message = 'Message',
  open = false,
  isBusy = false,
  secondaryActionText = 'Cancel',
  primaryActionText = 'Yes'
}: ConfirmationDialogFixtureConfig = {}): Promise<ConfirmationDialogHarness> {
  const screen = render(html`
    <forge-confirmation-dialog .open=${open} .isBusy=${isBusy}>
      <div slot="title">${ifDefined(title)}</div>
      <div slot="message">${ifDefined(message)}</div>
      <div slot="secondary-button-text">${ifDefined(secondaryActionText)}</div>
      <div slot="primary-button-text">${ifDefined(primaryActionText)}</div>
    </forge-confirmation-dialog>
  `);
  const el = screen.container.querySelector('forge-confirmation-dialog') as IConfirmationDialogComponent;
  await el.updateComplete;

  return new ConfirmationDialogHarness(el);
}

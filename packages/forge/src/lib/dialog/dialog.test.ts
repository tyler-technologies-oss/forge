import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { page, userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop/index.js';
import { frame, task } from '../core/utils/utils.js';
import type { IDialogComponent } from './dialog.js';
import {
  DIALOG_CONSTANTS,
  DialogAnimationType,
  DialogMode,
  DialogPlacement,
  DialogPositionStrategy,
  DialogPreset,
  DialogSizeStrategy,
  DialogType
} from './dialog-constants.js';
import './dialog.js';

// Animation duration + buffer for open/close transitions
const ANIMATION_TIMEOUT = 500;

// TODO: Consider refactoring tests to avoid accessing internal properties and methods of the dialog component.
interface IDialogComponentInternal extends IDialogComponent {
  _core: {
    _moveController: unknown;
  };
}

class DialogHarness extends TestHarness<IDialogComponentInternal> {
  public triggerElement: HTMLButtonElement;
  public altTriggerElement: HTMLButtonElement;
  public formCloseButton: HTMLButtonElement;
  public formSubmitButton: HTMLButtonElement;

  constructor(
    el: IDialogComponentInternal,
    triggerEl: HTMLButtonElement,
    altTriggerEl: HTMLButtonElement,
    formCloseBtn: HTMLButtonElement,
    formSubmitBtn: HTMLButtonElement
  ) {
    super(el);
    this.triggerElement = triggerEl;
    this.altTriggerElement = altTriggerEl;
    this.formCloseButton = formCloseBtn;
    this.formSubmitButton = formSubmitBtn;
  }

  public initElementRefs(): void {}

  public get nativeDialogElement(): HTMLDialogElement {
    return getShadowElement(this.element, DIALOG_CONSTANTS.selectors.DIALOG) as HTMLDialogElement;
  }

  public get surfaceElement(): HTMLElement {
    return getShadowElement(this.element, DIALOG_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  public get moveHandleElement(): HTMLElement {
    return getShadowElement(this.element, DIALOG_CONSTANTS.selectors.MOVE_HANDLE) as HTMLElement;
  }

  public get backdropElement(): IBackdropComponent {
    return getShadowElement(this.element, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public get isOpen(): boolean {
    return (
      this.element.open &&
      this.element.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN) &&
      this.element.hasAttribute(DIALOG_CONSTANTS.attributes.VISIBLE) &&
      this.nativeDialogElement.open &&
      this.nativeDialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN) &&
      getComputedStyle(this.nativeDialogElement).display !== 'none'
    );
  }

  public showAsync(): Promise<void> {
    this.element.show();
    return this.enterAnimation();
  }

  public hideAsync(): Promise<void> {
    this.element.hide();
    return this.exitAnimation();
  }

  public clickOutside(): void {
    if (this.backdropElement.visible) {
      this.backdropElement.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    }
  }

  public async clickTrigger(el: HTMLButtonElement = this.triggerElement): Promise<void> {
    await userEvent.click(el);
  }

  public async clickSurface(): Promise<void> {
    await userEvent.click(this.surfaceElement);
  }

  public async clickFormCloseButton(): Promise<void> {
    await userEvent.click(this.formCloseButton);
  }

  public async clickFormSubmitButton(): Promise<void> {
    await userEvent.click(this.formSubmitButton);
  }

  public simulateMoveHandleDown(): void {
    const { x, y, width, height } = this.moveHandleElement.getBoundingClientRect();
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    this.moveHandleElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: centerX, clientY: centerY }));
  }

  public simulateMoveHandleMove(clientX: number, clientY: number): void {
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX, clientY }));
  }

  public simulateMoveHandleUp(): void {
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
  }

  public async pressEscapeKey(): Promise<void> {
    await userEvent.keyboard('{Escape}');
  }

  public enterAnimation(): Promise<void> {
    return task(ANIMATION_TIMEOUT);
  }

  public exitAnimation(): Promise<void> {
    return task(ANIMATION_TIMEOUT);
  }

  public async focusDelay(): Promise<void> {
    await frame();
    await frame();
  }
}

interface IDialogFixtureConfig {
  open?: boolean;
  type?: DialogType;
  mode?: DialogMode;
  animationType?: DialogAnimationType;
  preset?: DialogPreset;
  persistent?: boolean;
  fullscreen?: boolean;
  fullscreenThreshold?: number;
  positionStrategy?: DialogPositionStrategy;
  sizeStrategy?: DialogSizeStrategy;
  placement?: DialogPlacement;
  moveable?: boolean;
  autofocus?: boolean;
}

async function createFixture({
  open = false,
  type,
  mode,
  animationType,
  preset,
  persistent,
  fullscreen,
  fullscreenThreshold,
  positionStrategy,
  sizeStrategy,
  placement,
  moveable,
  autofocus
}: IDialogFixtureConfig = {}): Promise<DialogHarness> {
  const screen = render(html`
    <div>
      <button type="button" id="test-trigger">Dialog Trigger</button>
      <button type="button" id="alt-test-trigger">Dialog Trigger</button>
      <forge-dialog
        trigger="test-trigger"
        label="My dialog title"
        description="My dialog description"
        ?open=${open}
        type=${type ?? nothing}
        mode=${mode ?? nothing}
        animation-type=${animationType ?? nothing}
        preset=${preset ?? nothing}
        ?persistent=${persistent}
        ?fullscreen=${fullscreen}
        fullscreen-threshold=${fullscreenThreshold ?? nothing}
        position-strategy=${positionStrategy ?? nothing}
        size-strategy=${sizeStrategy ?? nothing}
        placement=${placement ?? nothing}
        ?moveable=${moveable}>
        <h1 id="dialog-title">Dialog Title</h1>
        <p id="dialog-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <form>
          <button id="form-close-button" type="submit" formmethod=${'dialog' as any} ?autofocus=${autofocus}>Form button close</button>
        </form>
        <form method="dialog">
          <button id="form-submit-button" type="submit">Form close</button>
        </form>
      </forge-dialog>
    </div>
  `);

  const container = screen.container;
  const dialogEl = container.querySelector('forge-dialog') as IDialogComponentInternal;
  const triggerEl = container.querySelector('#test-trigger') as HTMLButtonElement;
  const altTriggerEl = container.querySelector('#alt-test-trigger') as HTMLButtonElement;
  const formCloseButton = container.querySelector('#form-close-button') as HTMLButtonElement;
  const formSubmitButton = container.querySelector('#form-submit-button') as HTMLButtonElement;

  return new DialogHarness(dialogEl, triggerEl, altTriggerEl, formCloseButton, formSubmitButton);
}

describe('Dialog', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
  });

  describe('API', () => {
    it('should have expected default values', async () => {
      const harness = await createFixture();

      expect(harness.element.type).toBe(DIALOG_CONSTANTS.defaults.TYPE);
      expect(harness.element.mode).toBe(DIALOG_CONSTANTS.defaults.MODE);
      expect(harness.element.animationType).toBe(DIALOG_CONSTANTS.defaults.ANIMATION_TYPE);
      expect(harness.element.preset).toBe(DIALOG_CONSTANTS.defaults.PRESET);
      expect(harness.element.persistent).toBe(false);
      expect(harness.element.fullscreen).toBe(false);
      expect(harness.element.fullscreenThreshold).toBe(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD);
      expect(harness.element.positionStrategy).toBe(DIALOG_CONSTANTS.defaults.POSITION_STRATEGY);
      expect(harness.element.sizeStrategy).toBe(DIALOG_CONSTANTS.defaults.SIZE_STRATEGY);
      expect(harness.element.placement).toBe(DIALOG_CONSTANTS.defaults.PLACEMENT);
      expect(harness.element.moveable).toBe(false);
    });

    it('should set mode by default', async () => {
      const harness = await createFixture({ mode: 'nonmodal' });

      expect(harness.element.mode).toBe('nonmodal');
    });

    it('should set mode via property', async () => {
      const harness = await createFixture();

      harness.element.mode = 'modal';

      expect(harness.element.mode).toBe('modal');
    });

    it('should set mode via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.MODE, 'modal');

      expect(harness.element.mode).toBe('modal');
    });

    it('should set to default mode if attribute is removed', async () => {
      const harness = await createFixture({ mode: 'nonmodal' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.MODE);

      expect(harness.element.mode).toBe(DIALOG_CONSTANTS.defaults.MODE);
    });

    it('should set type by default', async () => {
      const harness = await createFixture({ type: 'alertdialog' });

      expect(harness.element.type).toBe('alertdialog');
    });

    it('should set type via property', async () => {
      const harness = await createFixture();

      harness.element.type = 'alertdialog';

      expect(harness.element.type).toBe('alertdialog');
    });

    it('should set type via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.TYPE, 'alertdialog');

      expect(harness.element.type).toBe('alertdialog');
    });

    it('should set to default type if attribute is removed', async () => {
      const harness = await createFixture({ type: 'alertdialog' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.TYPE);

      expect(harness.element.type).toBe(DIALOG_CONSTANTS.defaults.TYPE);
    });

    it('should set animation type by default', async () => {
      const harness = await createFixture({ animationType: 'fade' });

      expect(harness.element.animationType).toBe('fade');
    });

    it('should set animation type via property', async () => {
      const harness = await createFixture();

      harness.element.animationType = 'fade';

      expect(harness.element.animationType).toBe('fade');
    });

    it('should set animation type via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.ANIMATION_TYPE, 'fade');

      expect(harness.element.animationType).toBe('fade');
    });

    it('should set to default animation type if attribute is removed', async () => {
      const harness = await createFixture({ animationType: 'fade' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.ANIMATION_TYPE);

      expect(harness.element.animationType).toBe(DIALOG_CONSTANTS.defaults.ANIMATION_TYPE);
    });

    it('should set preset by default', async () => {
      const harness = await createFixture({ preset: 'right-sheet' });

      expect(harness.element.preset).toBe('right-sheet');
    });

    it('should set preset via property', async () => {
      const harness = await createFixture();

      harness.element.preset = 'right-sheet';

      expect(harness.element.preset).toBe('right-sheet');
    });

    it('should set preset via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.PRESET, 'right-sheet');

      expect(harness.element.preset).toBe('right-sheet');
    });

    it('should set to default preset if attribute is removed', async () => {
      const harness = await createFixture({ preset: 'right-sheet' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.PRESET);

      expect(harness.element.preset).toBe(DIALOG_CONSTANTS.defaults.PRESET);
    });

    it('should set persistent by default', async () => {
      const harness = await createFixture({ persistent: true });

      expect(harness.element.persistent).toBe(true);
    });

    it('should set dismissible via property', async () => {
      const harness = await createFixture();

      harness.element.persistent = true;

      expect(harness.element.persistent).toBe(true);
    });

    it('should set persistent via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.PERSISTENT, '');

      expect(harness.element.persistent).toBe(true);
    });

    it('should set fullscreen by default', async () => {
      const harness = await createFixture({ fullscreen: true });

      expect(harness.element.fullscreen).toBe(true);
    });

    it('should set fullscreen via property', async () => {
      const harness = await createFixture();

      harness.element.fullscreen = true;

      expect(harness.element.fullscreen).toBe(true);
    });

    it('should set fullscreen via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN, '');

      expect(harness.element.fullscreen).toBe(true);
    });

    it('should set fullscreen threshold by default', async () => {
      const harness = await createFixture({ fullscreenThreshold: 800 });

      expect(harness.element.fullscreenThreshold).toBe(800);
    });

    it('should set fullscreen threshold via property', async () => {
      const harness = await createFixture();

      harness.element.fullscreenThreshold = 800;

      expect(harness.element.fullscreenThreshold).toBe(800);
    });

    it('should set fullscreen threshold via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN_THRESHOLD, '800');

      expect(harness.element.fullscreenThreshold).toBe(800);
    });

    it('should set to default fullscreen threshold if attribute is removed', async () => {
      const harness = await createFixture({ fullscreenThreshold: 800 });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN_THRESHOLD);

      expect(harness.element.fullscreenThreshold).toBe(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD);
    });

    it('should set position strategy by default', async () => {
      const harness = await createFixture({ positionStrategy: 'container' });

      expect(harness.element.positionStrategy).toBe('container');
    });

    it('should set position strategy via property', async () => {
      const harness = await createFixture();

      harness.element.positionStrategy = 'container';

      expect(harness.element.positionStrategy).toBe('container');
    });

    it('should set position strategy via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_STRATEGY, 'container');

      expect(harness.element.positionStrategy).toBe('container');
    });

    it('should set to default position strategy if attribute is removed', async () => {
      const harness = await createFixture({ positionStrategy: 'container' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.POSITION_STRATEGY);

      expect(harness.element.positionStrategy).toBe(DIALOG_CONSTANTS.defaults.POSITION_STRATEGY);
    });

    it('should set size strategy by default', async () => {
      const harness = await createFixture({ sizeStrategy: 'container-inline' });

      expect(harness.element.sizeStrategy).toBe('container-inline');
    });

    it('should set size strategy via property', async () => {
      const harness = await createFixture();

      harness.element.sizeStrategy = 'container-inline';

      expect(harness.element.sizeStrategy).toBe('container-inline');
    });

    it('should set size strategy via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.SIZE_STRATEGY, 'container-inline');

      expect(harness.element.sizeStrategy).toBe('container-inline');
    });

    it('should set to default size strategy if attribute is removed', async () => {
      const harness = await createFixture({ sizeStrategy: 'container-inline' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.SIZE_STRATEGY);

      expect(harness.element.sizeStrategy).toBe(DIALOG_CONSTANTS.defaults.SIZE_STRATEGY);
    });

    it('should set placement by default', async () => {
      const harness = await createFixture({ placement: 'bottom' });

      expect(harness.element.placement).toBe('bottom');
    });

    it('should set placement via property', async () => {
      const harness = await createFixture();

      harness.element.placement = 'bottom';

      expect(harness.element.placement).toBe('bottom');
    });

    it('should set placement via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.PLACEMENT, 'bottom');

      expect(harness.element.placement).toBe('bottom');
    });

    it('should set to default placement if attribute is removed', async () => {
      const harness = await createFixture({ placement: 'bottom' });

      harness.element.removeAttribute(DIALOG_CONSTANTS.attributes.PLACEMENT);

      expect(harness.element.placement).toBe(DIALOG_CONSTANTS.defaults.PLACEMENT);
    });

    it('should set moveable by default', async () => {
      const harness = await createFixture({ moveable: true });

      expect(harness.element.moveable).toBe(true);
    });

    it('should set moveable via property', async () => {
      const harness = await createFixture();

      harness.element.moveable = true;

      expect(harness.element.moveable).toBe(true);
    });

    it('should set moveable via attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, '');

      expect(harness.element.moveable).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should be accessible when closed', async () => {
      const harness = await createFixture();

      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when type is set to alertdialog', async () => {
      const harness = await createFixture({ type: 'alertdialog' });

      await harness.showAsync();

      expect(harness.nativeDialogElement.role).toBe('alertdialog');
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when mode is set to nonmodal', async () => {
      const harness = await createFixture({ mode: 'nonmodal' });

      await harness.showAsync();

      expect(harness.nativeDialogElement.getAttribute('aria-modal')).toBe('false');
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when label is set', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      const labelElement = harness.nativeDialogElement.querySelector(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL) as HTMLElement;

      expect(labelElement).toBeTruthy();
      expect(labelElement.isConnected).toBe(true);
      expect(labelElement.textContent).toBe('My dialog title');
      expect(labelElement.id).toBe('forge-dialog-label');
      expect(harness.nativeDialogElement.getAttribute('aria-labelledby')).toBe('forge-dialog-label');
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when description is set', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      const descriptionElement = harness.nativeDialogElement.querySelector(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION) as HTMLElement;

      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.isConnected).toBe(true);
      expect(descriptionElement.textContent).toBe('My dialog description');
      expect(descriptionElement.id).toBe('forge-dialog-description');
      expect(harness.nativeDialogElement.getAttribute('aria-describedby')).toBe('forge-dialog-description');
      await expect(harness.element).toBeAccessible();
    });

    it('should not add multiple visually hidden elements when label or description is updated dynamically', async () => {
      const harness = await createFixture();

      await harness.showAsync();

      const labelElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL);
      const descriptionElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION);

      expect(labelElements.length).toBe(1);
      expect(descriptionElements.length).toBe(1);
      expect(labelElements[0].textContent).toBe('My dialog title');
      expect(descriptionElements[0].textContent).toBe('My dialog description');

      harness.element.label = 'My new dialog title';
      harness.element.description = 'My new dialog description';

      await frame();

      const newLabelElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL);
      const newDescriptionElements = harness.nativeDialogElement.querySelectorAll<HTMLElement>(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION);

      expect(newLabelElements.length).toBe(1);
      expect(newDescriptionElements.length).toBe(1);
      expect(newLabelElements[0].textContent).toBe('My new dialog title');
      expect(newDescriptionElements[0].textContent).toBe('My new dialog description');
    });
  });

  describe('open state', () => {
    it('should be hidden by default', async () => {
      const harness = await createFixture();

      expect(harness.isOpen).toBe(false);
    });

    it('should be open by default when setting open attribute', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).toBe(true);
    });

    it('should open when open property set dynamically', async () => {
      const harness = await createFixture();

      harness.element.open = true;

      expect(harness.isOpen).toBe(true);
    });

    it('should open when open attribute set dynamically', async () => {
      const harness = await createFixture();

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.OPEN, '');

      expect(harness.isOpen).toBe(true);
    });

    it('should open when show() method is called', async () => {
      const harness = await createFixture();

      harness.element.show();

      expect(harness.isOpen).toBe(true);
    });

    it('should close when hide() method is called', async () => {
      const harness = await createFixture({ open: true });

      harness.element.hide();

      expect(harness.isOpen).toBe(false);
    });

    it('should close when open property set dynamically', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.isOpen).toBe(true);

      harness.element.open = false;

      expect(harness.isOpen).toBe(false);
    });

    it('should open when clicking trigger element', async () => {
      const harness = await createFixture();

      expect(harness.element.trigger).toBe(harness.triggerElement.id);

      await harness.clickTrigger();

      expect(harness.isOpen).toBe(true);
    });

    it('should close when button with formmethod="dialog" is clicked', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      const submitSpy = vi.fn();
      const formEl = harness.element.querySelector('form') as HTMLFormElement;
      formEl.addEventListener('submit', submitSpy);

      expect(harness.isOpen).toBe(true);

      await harness.clickFormCloseButton();

      expect(submitSpy).toHaveBeenCalledOnce();
      expect(harness.isOpen).toBe(false);
      expect(beforeCloseSpy).toHaveBeenCalledOnce();
      expect(beforeCloseSpy.mock.calls[0][0].detail).toEqual({ reason: 'submit' });
    });

    it('should close when submit button is clicked within a form that has method="dialog"', async () => {
      const harness = await createFixture({ open: true });

      const submitSpy = vi.fn();
      const formEl = harness.element.querySelector('form[method="dialog"]') as HTMLFormElement;
      formEl.addEventListener('submit', submitSpy);

      expect(harness.isOpen).toBe(true);

      await harness.clickFormSubmitButton();

      expect(submitSpy).toHaveBeenCalledOnce();
      expect(harness.isOpen).toBe(false);
    });

    it('should set focus to element with autofocus attribute when modal', async () => {
      const harness = await createFixture({ open: true, autofocus: true });

      await harness.focusDelay();

      expect(harness.formCloseButton).toBe(document.activeElement);
    });

    it('should set focus to element with autofocus attribute when inline-modal', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal', autofocus: true });

      await harness.focusDelay();

      expect(harness.formCloseButton).toBe(document.activeElement);
    });

    it('should set focus to element with autofocus attribute when nonmodal', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal', autofocus: true });

      await harness.focusDelay();

      expect(harness.formCloseButton).toBe(document.activeElement);
    });

    it('should set focus to <dialog> element when modal and no autofocus element is present', async () => {
      const harness = await createFixture({ open: true });

      await harness.focusDelay();

      expect(harness.element.matches(':focus-within')).toBe(true);
    });

    it('should not set focus to dialog when inline-modal', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      await harness.focusDelay();

      expect(harness.element.matches(':focus-within')).toBe(false);
    });

    it('should not set focus to dialog when nonmodal', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      await harness.focusDelay();

      expect(harness.element.matches(':focus-within')).toBe(false);
    });

    it('should open immediately when animation type is set to none', async () => {
      const harness = await createFixture({ animationType: 'none' });

      harness.element.show();

      expect(harness.isOpen).toBe(true);
    });

    it('should close immediately when animation type is set to none', async () => {
      const harness = await createFixture({ open: true, animationType: 'none' });

      harness.element.hide();

      expect(harness.isOpen).toBe(false);
    });
  });

  describe('events', () => {
    it('should fire open event when opened', async () => {
      const harness = await createFixture();

      const openSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.OPEN, openSpy);

      harness.element.show();

      expect(openSpy).toHaveBeenCalledOnce();
    });

    it('should fire close event when closed', async () => {
      const harness = await createFixture({ open: true });

      const closeSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);

      await harness.hideAsync();

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should fire before close event when closing via click outside', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      harness.clickOutside();

      expect(beforeCloseSpy).toHaveBeenCalledOnce();
    });

    it('should fire before close event when closing via escape key', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      await harness.pressEscapeKey();

      expect(beforeCloseSpy).toHaveBeenCalledOnce();
      expect(beforeCloseSpy.mock.calls[0][0].detail).toEqual({ reason: 'escape' });
    });
  });

  describe('modal', () => {
    it('should show backdrop', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.backdropElement.visible).toBe(true);
    });

    it('should show in top layer', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.nativeDialogElement.matches(':modal')).toBe(true);
    });

    it('should not close when clicking outside dialog when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      harness.clickOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should not close when clicking outside dialog when persistent set after open', async () => {
      const harness = await createFixture({ open: true });

      harness.element.persistent = true;

      harness.clickOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should not close when pressing escape key when persistent', async () => {
      const harness = await createFixture({ open: true, persistent: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(true);
    });

    it('should not close when pressing escape key when persistent set after open', async () => {
      const harness = await createFixture({ open: true });

      harness.element.persistent = true;

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(true);
    });

    it('should close when clicking outside dialog', async () => {
      const harness = await createFixture({ open: true });

      harness.clickOutside();

      expect(harness.isOpen).toBe(false);
    });

    it('should close when pressing escape key', async () => {
      const harness = await createFixture({ open: true });

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close when clicking surface', async () => {
      const harness = await createFixture({ open: true });

      await harness.clickSurface();

      expect(harness.isOpen).toBe(true);
    });

    it('should fire before close event when closed via backdrop', async () => {
      const harness = await createFixture({ open: true });

      const beforeCloseSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

      harness.clickOutside();

      expect(beforeCloseSpy).toHaveBeenCalledOnce();
      expect(beforeCloseSpy.mock.calls[0][0].detail).toEqual({ reason: 'backdrop' });
    });
  });

  describe('inline-modal', () => {
    it('should show with backdrop', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      expect(harness.backdropElement.visible).toBe(true);
    });

    it('should not be in top layer', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      expect(harness.nativeDialogElement.matches(':modal')).toBe(false);
    });

    it('should close when escape key is pressed', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(false);
    });

    it('should close when clicking outside dialog', async () => {
      const harness = await createFixture({ open: true, mode: 'inline-modal' });

      harness.clickOutside();

      expect(harness.isOpen).toBe(false);
    });

    it('should not close if escape is pressed while a nested element in the dismissible stack is open', async () => {
      const screen = render(html`
        <forge-dialog mode="inline-modal">
          <div>Parent dialog</div>
          <forge-dialog mode="inline-modal">
            <div>Nested dialog</div>
          </forge-dialog>
        </forge-dialog>
      `);

      const parentDialog = screen.container.querySelector('forge-dialog') as IDialogComponent;
      const nestedDialog = parentDialog.querySelector('forge-dialog') as IDialogComponent;

      parentDialog.show();
      await task(400);

      nestedDialog.show();
      await task(400);

      await userEvent.keyboard('{Escape}');

      await task(400);

      expect(parentDialog.open).toBe(true);
      expect(nestedDialog.open).toBe(false);
    });
  });

  describe('nonmodal', () => {
    it('should not show backdrop', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      expect(harness.backdropElement.visible).toBe(false);
    });

    it('should not close when clicking outside dialog', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      harness.clickOutside();

      expect(harness.isOpen).toBe(true);
    });

    it('should not close when pressing escape key', async () => {
      const harness = await createFixture({ open: true, mode: 'nonmodal' });

      await harness.pressEscapeKey();

      expect(harness.isOpen).toBe(true);
    });
  });

  describe('trigger', () => {
    it('should be attached to trigger element when trigger attribute is set', async () => {
      const harness = await createFixture();

      expect(harness.element.trigger).toBe(harness.triggerElement.id);
      expect(harness.element.triggerElement).toBe(harness.triggerElement);
    });

    it('should dynamically attach to trigger element when trigger property is set', async () => {
      const harness = await createFixture();

      harness.element.trigger = harness.altTriggerElement.id;

      expect(harness.element.trigger).toBe(harness.altTriggerElement.id);
      expect(harness.element.triggerElement).toBe(harness.altTriggerElement);

      await harness.clickTrigger(harness.triggerElement);

      expect(harness.isOpen).toBe(false);

      await harness.clickTrigger(harness.altTriggerElement);

      expect(harness.isOpen).toBe(true);
    });

    it('should dynamically attach to trigger element when new trigger element is set', async () => {
      const harness = await createFixture();

      harness.element.triggerElement = harness.altTriggerElement;

      expect(harness.element.trigger).toBe('');
      expect(harness.element.triggerElement).toBe(harness.altTriggerElement);

      await harness.clickTrigger(harness.triggerElement);

      expect(harness.isOpen).toBe(false);

      await harness.clickTrigger(harness.altTriggerElement);

      expect(harness.isOpen).toBe(true);
    });

    it('should detach from trigger element if no id is set', async () => {
      const harness = await createFixture();

      expect(harness.element.triggerElement).not.toBeNull();

      harness.element.trigger = '';

      expect(harness.element.trigger).toBe('');
      expect(harness.element.triggerElement).toBeNull();
    });
  });

  describe('moveable', () => {
    it('should not be moveable by default', async () => {
      const harness = await createFixture({ open: true });

      expect(getComputedStyle(harness.moveHandleElement).display).toBe('none');
    });

    it('should be moveable when moveable attribute is set', async () => {
      const harness = await createFixture({ open: true, moveable: true });

      expect(getComputedStyle(harness.moveHandleElement).display).not.toBe('none');
    });

    it('should be moveable when moveable property is set', async () => {
      const harness = await createFixture({ open: true });

      harness.element.moveable = true;

      expect(getComputedStyle(harness.moveHandleElement).display).not.toBe('none');
    });

    it('should be moveable when moveable attribute is set dynamically', async () => {
      const harness = await createFixture({ open: true });

      harness.element.setAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, '');

      expect(getComputedStyle(harness.moveHandleElement).display).not.toBe('none');
    });

    it('should move dialog when move handle is dragged', async () => {
      // Ensure viewport is larger than fullscreen threshold so MoveController gets initialized
      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 100, 1000);

      const harness = await createFixture({ moveable: true });
      await harness.showAsync();
      await frame();

      const moveStartSpy = vi.fn();
      const moveSpy = vi.fn();
      const moveEndSpy = vi.fn();

      harness.element.addEventListener(DIALOG_CONSTANTS.events.MOVE_START, moveStartSpy);
      harness.element.addEventListener(DIALOG_CONSTANTS.events.MOVE, moveSpy);
      harness.element.addEventListener(DIALOG_CONSTANTS.events.MOVE_END, moveEndSpy);

      const { x: origX, y: origY } = harness.surfaceElement.getBoundingClientRect();
      const { x, y, height, width } = harness.moveHandleElement.getBoundingClientRect();
      const [handleX, handleY]: [number, number] = [x + width / 2, y + height / 2];
      const amountToMove = 50;

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).toBe(false);
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).toBe(false);

      harness.simulateMoveHandleDown();
      harness.simulateMoveHandleMove(handleX + amountToMove, handleY + amountToMove);

      expect(moveStartSpy).toHaveBeenCalledOnce();
      expect(moveSpy).toHaveBeenCalledOnce();
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).toBe(true);
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).toBe(true);

      harness.simulateMoveHandleUp();

      expect(moveEndSpy).toHaveBeenCalledOnce();

      await frame();

      const { x: newX, y: newY } = harness.surfaceElement.getBoundingClientRect();

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).toBe(true);
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).toBe(false);
      expect(harness.surfaceElement.style.top).toBeTruthy();
      expect(harness.surfaceElement.style.left).toBeTruthy();
      expect(newX).not.toBe(origX);
      expect(newY).not.toBe(origY);

      await harness.hideAsync();

      expect(harness.element._core._moveController).toBeUndefined();
    });

    it('should not move dialog if setting moveable=false while open', async () => {
      const harness = await createFixture({ moveable: true });

      await harness.showAsync();
      harness.element.moveable = false;

      const { x: origX, y: origY } = harness.surfaceElement.getBoundingClientRect();
      const amountToMove = 50;

      harness.simulateMoveHandleDown();
      harness.simulateMoveHandleMove(origX + amountToMove, origY + amountToMove);

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).toBe(false);
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).toBe(false);

      harness.simulateMoveHandleUp();

      await frame();

      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).toBe(false);
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVING)).toBe(false);
      expect(harness.surfaceElement.style.top).toBeFalsy();
      expect(harness.surfaceElement.style.left).toBeFalsy();
      expect(harness.surfaceElement.getBoundingClientRect().x).toBe(origX);
      expect(harness.surfaceElement.getBoundingClientRect().y).toBe(origY);
    });

    it('should move dialog back into view when clipped by viewport after drag', async () => {
      // Ensure viewport is larger than fullscreen threshold so MoveController gets initialized
      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 100, 1000);

      const harness = await createFixture({ moveable: true });
      await harness.showAsync();
      await frame();

      const { x, y, height, width } = harness.moveHandleElement.getBoundingClientRect();
      const [handleX, handleY]: [number, number] = [x + width / 2, y + height / 2];

      const moveAmount = -2000;

      harness.simulateMoveHandleDown();
      harness.simulateMoveHandleMove(handleX + moveAmount, handleY + moveAmount);
      harness.simulateMoveHandleUp();

      await frame();

      const topValue = parseFloat(harness.surfaceElement.style.top);
      const leftValue = parseFloat(harness.surfaceElement.style.left);
      expect(topValue).toBeCloseTo(8, 0);
      expect(leftValue).toBeCloseTo(8, 0);
      expect(harness.surfaceElement.classList.contains(DIALOG_CONSTANTS.classes.MOVED)).toBe(true);
    });
  });

  describe('fullscreen', () => {
    it('should set fullscreen when opened if threshold is already reached', async () => {
      const harness = await createFixture();

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, 1000);
      await harness.showAsync();

      expect(harness.element.fullscreen).toBe(true);
    });

    it('should set full screen when threshold is reached', async () => {
      const harness = await createFixture({ open: true });

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, 1000);

      expect(harness.element.fullscreen).toBe(true);
    });

    it('should unset full screen when threshold is no longer reached', async () => {
      const harness = await createFixture();

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, 1000);

      await harness.showAsync();

      expect(harness.element.fullscreen).toBe(true);

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 1, 1000);

      expect(harness.element.fullscreen).toBe(false);
    });

    it('should fire fullscreen-change event when fullscreen threshold changes', async () => {
      const harness = await createFixture({ open: true });

      expect(harness.element.fullscreen).toBe(false);

      const fullscreenChangeSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, fullscreenChangeSpy);

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, 1000);
      await frame();

      expect(harness.element.fullscreen).toBe(true);
      expect(fullscreenChangeSpy).toHaveBeenCalledOnce();
      expect(fullscreenChangeSpy.mock.calls[0][0].detail).toBe(true);

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD + 1, 1000);
      await frame();

      expect(harness.element.fullscreen).toBe(false);
      expect(fullscreenChangeSpy).toHaveBeenCalledTimes(2);
      expect(fullscreenChangeSpy.mock.calls[1][0].detail).toBe(false);
    });

    it('should not fire fullscreen-change event when fullscreen property is set already when opened', async () => {
      const harness = await createFixture({ fullscreen: true });

      const fullscreenChangeSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, fullscreenChangeSpy);

      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, 1000);

      await harness.showAsync();

      expect(harness.element.fullscreen).toBe(true);
      expect(fullscreenChangeSpy).not.toHaveBeenCalled();
    });

    it('should not listen for fullscreen change if threshold is set to 0', async () => {
      const harness = await createFixture({ fullscreenThreshold: 0 });

      await harness.showAsync();

      const fullscreenChangeSpy = vi.fn();
      harness.element.addEventListener(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, fullscreenChangeSpy);

      expect(harness.element.fullscreen).toBe(false);
      expect(fullscreenChangeSpy).not.toHaveBeenCalled();
    });

    it('should reset fullscreen value to original value dialog opened with if media query changes while open', async () => {
      const harness = await createFixture();

      expect(harness.element.fullscreen).toBe(false);

      await harness.showAsync();
      await page.viewport(DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD - 1, 1000);

      expect(harness.element.fullscreen).toBe(true);

      await harness.hideAsync();

      expect(harness.element.fullscreen).toBe(false);
    });
  });
});

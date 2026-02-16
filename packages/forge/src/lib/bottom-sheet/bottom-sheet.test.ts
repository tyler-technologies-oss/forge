import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { IBottomSheetComponent } from './bottom-sheet.js';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop/index.js';
import { task } from '../core/utils/utils.js';
import { BOTTOM_SHEET_CONSTANTS, BottomSheetMode } from './bottom-sheet-constants.js';
import { DIALOG_CONSTANTS } from '../dialog/dialog-constants.js';
import { IDialogComponent } from '../dialog/index.js';

import './bottom-sheet.js';

const ANIMATION_TIMEOUT = 500;

class BottomSheetHarness extends TestHarness<IBottomSheetComponent> {
  public initElementRefs(): void {}

  public get dialogElement(): IDialogComponent {
    return getShadowElement(this.element, BOTTOM_SHEET_CONSTANTS.selectors.DIALOG) as IDialogComponent;
  }

  public get nativeDialogElement(): HTMLDialogElement {
    return getShadowElement(this.dialogElement, 'dialog') as HTMLDialogElement;
  }

  public get surfaceElement(): HTMLElement {
    return getShadowElement(this.element, BOTTOM_SHEET_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  public get backdropElement(): IBackdropComponent {
    return getShadowElement(this.dialogElement, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public get isOpen(): boolean {
    return (
      this.element.open &&
      this.element.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN) &&
      this.dialogElement.open &&
      this.dialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN) &&
      this.dialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.VISIBLE) &&
      getComputedStyle(this.nativeDialogElement).display !== 'none'
    );
  }

  public showAsync(): Promise<void> {
    this.element.open = true;
    return this.enterAnimation();
  }

  public hideAsync(): Promise<void> {
    this.element.open = false;
    return this.exitAnimation();
  }

  public clickOutside(): void {
    if (this.backdropElement.visible) {
      this.backdropElement.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    }
  }

  public async clickSurface(): Promise<void> {
    await userEvent.click(this.surfaceElement);
  }

  public async dragSurfaceUp(): Promise<void> {
    const { x, y, width } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + 1);

    this.surfaceElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: mouseX, clientY: mouseY }));
    document.body.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: mouseX, clientY: mouseY - 1 }));
    document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
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
}

interface IBottomSheetFixtureConfig {
  open?: boolean;
  mode?: BottomSheetMode;
  persistent?: boolean;
  fullscreen?: boolean;
}

async function createFixture({ open = false, mode, persistent, fullscreen }: IBottomSheetFixtureConfig = {}): Promise<BottomSheetHarness> {
  const screen = render(html`
    <forge-bottom-sheet
      aria-labelledby="bottom-sheet-title"
      aria-describedby="bottom-sheet-desc"
      ?open=${open}
      mode=${mode ?? nothing}
      ?persistent=${persistent ?? nothing}
      ?fullscreen=${fullscreen ?? nothing}>
      <h1 id="bottom-sheet-title">Bottom Sheet Title</h1>
      <div forge-bottom-sheet-body style="overflow-y: auto;" tabindex="0">
        <div style="height: 1000vh;"></div>
      </div>
    </forge-bottom-sheet>
  `);

  const bottomSheetEl = screen.container.querySelector('forge-bottom-sheet') as IBottomSheetComponent;
  return new BottomSheetHarness(bottomSheetEl);
}

describe('Bottom Sheet', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.dialogElement.shadowRoot).not.toBeNull();
  });

  it('should be closed by default', async () => {
    const harness = await createFixture();

    expect(harness.isOpen).toBe(false);
  });

  it('should open when the open attribute is set', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);
  });

  it('should close when the open attribute is removed', async () => {
    const harness = await createFixture({ open: true });

    harness.element.open = false;

    expect(harness.isOpen).toBe(false);
  });

  it('should open dynamically via open property', async () => {
    const harness = await createFixture();

    harness.element.open = true;

    expect(harness.isOpen).toBe(true);
  });

  it('should close dynamically via open property', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).toBe(true);

    harness.element.open = false;

    expect(harness.isOpen).toBe(false);
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.element.open).toBe(false);
    expect(harness.element.mode).toBe('nonmodal');
    expect(harness.element.persistent).toBe(false);
    expect(harness.element.fullscreen).toBe(false);
  });

  it('should be accessible when closed', async () => {
    const harness = await createFixture();

    await expect(harness.element).toBeAccessible();
  });

  it('should be accessible when open', async () => {
    const harness = await createFixture({ open: true });
    await harness.enterAnimation();

    await expect(harness.element).toBeAccessible();
  });

  it('should set the mode attribute', async () => {
    const harness = await createFixture({ mode: 'modal' });

    expect(harness.element.mode).toBe('modal');
    expect(harness.element.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.MODE)).toBe(true);
    expect(harness.dialogElement.mode).toBe('modal');
  });

  it('should set the persistent attribute', async () => {
    const harness = await createFixture({ persistent: true });

    expect(harness.element.persistent).toBe(true);
    expect(harness.element.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.PERSISTENT)).toBe(true);
    expect(harness.dialogElement.persistent).toBe(true);
  });

  it('should set the fullscreen attribute', async () => {
    const harness = await createFixture({ fullscreen: true });

    expect(harness.element.fullscreen).toBe(true);
    expect(harness.element.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN)).toBe(true);
    expect(harness.dialogElement.fullscreen).toBe(true);
  });

  it('should close on backdrop click when not persistent', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });

    expect(harness.dialogElement.persistent).toBe(false);

    harness.clickOutside();

    expect(harness.isOpen).toBe(false);
  });

  it('should not close on backdrop click when persistent', async () => {
    const harness = await createFixture({ open: true, mode: 'modal', persistent: true });

    harness.clickOutside();

    expect(harness.isOpen).toBe(true);
  });

  it('should not close on backdrop click when not modal', async () => {
    const harness = await createFixture({ open: true });

    harness.clickOutside();

    expect(harness.isOpen).toBe(true);
  });

  it('should close on escape key press when not persistent and modal', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });

    expect(harness.dialogElement.persistent).toBe(false);

    await harness.pressEscapeKey();

    expect(harness.isOpen).toBe(false);
  });

  it('should not close on escape key press when persistent', async () => {
    const harness = await createFixture({ open: true, mode: 'modal', persistent: true });

    expect(harness.dialogElement.persistent).toBe(true);

    await harness.pressEscapeKey();

    expect(harness.isOpen).toBe(true);
  });

  it('should not close on escape key press when not modal', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.dialogElement.persistent).toBe(false);
    expect(harness.dialogElement.mode).toBe('nonmodal');

    await harness.pressEscapeKey();

    expect(harness.isOpen).toBe(true);
  });

  it('should not close on surface click', async () => {
    const harness = await createFixture({ open: true });

    await harness.clickSurface();

    expect(harness.isOpen).toBe(true);
  });

  it('should hide backdrop when nonmodal', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.backdropElement.visible).toBe(false);
  });

  it('should make scrollable sheet fullscreen if dragged up via mouse', async () => {
    const harness = await createFixture();
    harness.element.style.setProperty('--forge-bottom-sheet-animation-duration', '0');

    const fullscreenSpy = vi.fn();
    harness.element.addEventListener(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, fullscreenSpy);

    await harness.showAsync();
    await harness.dragSurfaceUp();

    expect(fullscreenSpy).toHaveBeenCalledOnce();
    expect(harness.dialogElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(true);
  });

  it('should dispatch open event when opened', async () => {
    const harness = await createFixture();

    const openSpy = vi.fn();
    harness.element.addEventListener(BOTTOM_SHEET_CONSTANTS.events.OPEN, openSpy);

    harness.element.open = true;

    expect(openSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch close event when closed', async () => {
    const harness = await createFixture({ open: true });

    const closeSpy = vi.fn();
    harness.element.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);

    harness.element.open = false;

    expect(closeSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch before close event when closed via backdrop click', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });
    await harness.enterAnimation();

    const beforeCloseSpy = vi.fn();
    harness.element.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    harness.clickOutside();

    expect(beforeCloseSpy).toHaveBeenCalledOnce();
  });

  it('should dispatch before close event when closed via escape key press', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });
    await harness.enterAnimation();

    const beforeCloseSpy = vi.fn();
    harness.element.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    await harness.pressEscapeKey();

    expect(beforeCloseSpy).toHaveBeenCalledOnce();
  });

  it('should cancel close when before close event is prevented', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });
    await harness.enterAnimation();

    const beforeCloseSpy = vi.fn((evt: Event) => evt.preventDefault());
    harness.element.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    harness.clickOutside();

    expect(beforeCloseSpy).toHaveBeenCalledOnce();
    expect(harness.isOpen).toBe(true);
  });
});

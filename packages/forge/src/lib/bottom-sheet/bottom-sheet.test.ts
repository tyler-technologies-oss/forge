import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { nothing } from 'lit';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { getShadowElement } from '@tylertech/forge-core';
import { IBottomSheetComponent } from './bottom-sheet';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { task } from '../core/utils/utils';
import { BOTTOM_SHEET_CONSTANTS, BottomSheetMode } from './bottom-sheet-constants';
import { DIALOG_CONSTANTS } from '../dialog/dialog-constants';
import { IDialogComponent } from '../dialog';

import './bottom-sheet';

describe('Bottom Sheet', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.dialogElement.shadowRoot).to.not.be.null;
  });

  it('should be closed by default', async () => {
    const harness = await createFixture();

    expect(harness.isOpen).to.be.false;
  });

  it('should open when the open attribute is set', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).to.be.true;
  });

  it('should close when the open attribute is removed', async () => {
    const harness = await createFixture({ open: true });

    harness.bottomSheetElement.open = false;
    await elementUpdated(harness.bottomSheetElement);

    expect(harness.isOpen).to.be.false;
  });

  it('should open dynamically via open property', async () => {
    const harness = await createFixture();

    harness.bottomSheetElement.open = true;
    await elementUpdated(harness.bottomSheetElement);

    expect(harness.isOpen).to.be.true;
  });

  it('should close dynamically via open property', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isOpen).to.be.true;

    harness.bottomSheetElement.open = false;
    await elementUpdated(harness.bottomSheetElement);

    expect(harness.isOpen).to.be.false;
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.bottomSheetElement.open).to.be.false;
    expect(harness.bottomSheetElement.mode).to.equal('nonmodal');
    expect(harness.bottomSheetElement.persistent).to.be.false;
    expect(harness.bottomSheetElement.fullscreen).to.be.false;
  });

  it('should be accessible when closed', async () => {
    const harness = await createFixture();

    await expect(harness.bottomSheetElement).to.be.accessible();
  });

  it('should be accessible when open', async () => {
    const harness = await createFixture({ open: true });
    await harness.enterAnimation();

    await expect(harness.bottomSheetElement).to.be.accessible();
  });

  it('should set the mode attribute', async () => {
    const harness = await createFixture({ mode: 'modal' });

    expect(harness.bottomSheetElement.mode).to.equal('modal');
    expect(harness.bottomSheetElement).to.have.attribute(BOTTOM_SHEET_CONSTANTS.attributes.MODE);
    expect(harness.dialogElement.mode).to.equal('modal');
  });

  it('should set the persistent attribute', async () => {
    const harness = await createFixture({ persistent: true });

    expect(harness.bottomSheetElement.persistent).to.be.true;
    expect(harness.bottomSheetElement).to.have.attribute(BOTTOM_SHEET_CONSTANTS.attributes.PERSISTENT);
    expect(harness.dialogElement.persistent).to.be.true;
  });

  it('should set the fullscreen attribute', async () => {
    const harness = await createFixture({ fullscreen: true });

    expect(harness.bottomSheetElement.fullscreen).to.be.true;
    expect(harness.bottomSheetElement).to.have.attribute(BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN);
    expect(harness.dialogElement.fullscreen).to.be.true;
  });

  it('should close on backdrop click when not persistent', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });

    expect(harness.dialogElement.persistent).to.be.false;

    await harness.clickOutside();

    expect(harness.isOpen).to.be.false;
  });

  it('should not close on backdrop click when persistent', async () => {
    const harness = await createFixture({ open: true, persistent: true });

    await harness.clickOutside();

    expect(harness.isOpen).to.be.true;
  });

  it('should not close on backdrop click when not modal', async () => {
    const harness = await createFixture({ open: true });

    await harness.clickOutside();

    expect(harness.isOpen).to.be.true;
  });

  it('should close on escape key press when not persistent and modal', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });

    expect(harness.dialogElement.persistent).to.be.false;

    await harness.pressEscapeKey();

    expect(harness.isOpen).to.be.false;
  });

  it('should not close on escape key press when persistent', async () => {
    const harness = await createFixture({ open: true, persistent: true });

    expect(harness.dialogElement.persistent).to.be.true;
    expect(harness.dialogElement.mode).to.equal('nonmodal');

    await harness.pressEscapeKey();

    expect(harness.isOpen).to.be.true;
  });

  it('should not close on escape key press when not modal', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.dialogElement.persistent).to.be.false;
    expect(harness.dialogElement.mode).to.equal('nonmodal');

    await harness.pressEscapeKey();

    expect(harness.isOpen).to.be.true;
  });

  it('should not close on surface click', async () => {
    const harness = await createFixture({ open: true });

    await harness.clickSurface();

    expect(harness.isOpen).to.be.true;
  });

  it('should hide backdrop when nonmodal', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.backdropElement.visible).to.be.false;
  });

  it('should make scrollable sheet fullscreen if dragged up via mouse', async () => {
    const harness = await createFixture();
    harness.bottomSheetElement.style.setProperty('--forge-bottom-sheet-animation-duration', '0');

    const fullscreenSpy = spy();
    harness.bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, fullscreenSpy);

    await harness.showAsync();
    await harness.dragSurfaceUp();

    expect(fullscreenSpy.calledOnce).to.be.true;
    expect(harness.dialogElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).to.be.true;
  });

  it('should dispatch open event when opened', async () => {
    const harness = await createFixture();

    const openSpy = spy();
    harness.bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.OPEN, openSpy);

    harness.bottomSheetElement.open = true;
    await elementUpdated(harness.bottomSheetElement);

    expect(openSpy.calledOnce).to.be.true;
  });

  it('should dispatch close event when closed', async () => {
    const harness = await createFixture({ open: true });

    const closeSpy = spy();
    harness.bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);

    harness.bottomSheetElement.open = false;
    await elementUpdated(harness.bottomSheetElement);

    expect(closeSpy.calledOnce).to.be.true;
  });

  it('should dispatch before close event when closed via backdrop click', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });
    await harness.enterAnimation();

    const beforeCloseSpy = spy();
    harness.bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    await harness.clickOutside();

    expect(beforeCloseSpy.calledOnce).to.be.true;
  });

  it('should dispatch before close event when closed via escape key press', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });
    await harness.enterAnimation();

    const beforeCloseSpy = spy();
    harness.bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    await harness.pressEscapeKey();

    expect(beforeCloseSpy.calledOnce).to.be.true;
  });

  it('should cancel close when before close event is prevented', async () => {
    const harness = await createFixture({ open: true, mode: 'modal' });
    await harness.enterAnimation();

    const beforeCloseSpy = spy(evt => evt.preventDefault());
    harness.bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    await harness.clickOutside();

    expect(beforeCloseSpy.calledOnce).to.be.true;
    expect(harness.isOpen).to.be.true;
  });
});

class BottomSheetHarness {
  constructor(public bottomSheetElement: IBottomSheetComponent) {}

  public get dialogElement(): IDialogComponent {
    return getShadowElement(this.bottomSheetElement, BOTTOM_SHEET_CONSTANTS.selectors.DIALOG) as IDialogComponent;
  }

  public get nativeDialogElement(): HTMLDialogElement {
    return getShadowElement(this.dialogElement, 'dialog') as HTMLDialogElement;
  }

  public get surfaceElement(): HTMLElement {
    return getShadowElement(this.bottomSheetElement, BOTTOM_SHEET_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  public get backdropElement(): IBackdropComponent {
    return getShadowElement(this.dialogElement, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public get isOpen(): boolean {
    return (
      this.bottomSheetElement.open &&
      this.bottomSheetElement.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN) &&
      this.dialogElement.open &&
      this.dialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN) &&
      this.dialogElement.hasAttribute(DIALOG_CONSTANTS.attributes.VISIBLE) &&
      getComputedStyle(this.nativeDialogElement).display !== 'none'
    );
  }

  public showAsync(): Promise<void> {
    this.bottomSheetElement.open = true;
    return this.enterAnimation();
  }

  public hideAsync(): Promise<void> {
    this.bottomSheetElement.open = false;
    return this.exitAnimation();
  }

  public async clickOutside(): Promise<void> {
    await sendMouse({ type: 'click', position: [0, 0], button: 'left' });
  }

  public async clickSurface(): Promise<void> {
    const { x, y, height, width } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + height / 2);
    await sendMouse({ type: 'click', position: [mouseX, mouseY], button: 'left' });
  }

  public async dragSurfaceUp(): Promise<void> {
    const { x, y, width } = this.surfaceElement.getBoundingClientRect();
    const mouseX = Math.round(x + width / 2);
    const mouseY = Math.round(y + 1);
    await sendMouse({ type: 'move', position: [mouseX, mouseY] });
    await sendMouse({ type: 'down', button: 'left' });
    await sendMouse({ type: 'move', position: [mouseX, Math.round(mouseY - 1)] });
    await sendMouse({ type: 'up', button: 'left' });
  }

  public async pressEscapeKey(): Promise<void> {
    await sendKeys({ press: 'Escape' });
  }

  public enterAnimation(): Promise<void> {
    return task(500);
  }

  public exitAnimation(): Promise<void> {
    return task(500);
  }
}

interface IBottomSheetFixtureConfig {
  open?: boolean;
  mode?: BottomSheetMode;
  persistent?: boolean;
  fullscreen?: boolean;
}

async function createFixture({ open = false, mode, persistent, fullscreen }: IBottomSheetFixtureConfig = {}): Promise<BottomSheetHarness> {
  const bottomSheetEl = await fixture<IBottomSheetComponent>(html`
    <forge-bottom-sheet
      aria-labelledby="bottom-sheet-title"
      aria-describedby="bottom-sheet-desc"
      ?open=${open}
      mode=${mode}
      ?persistent=${persistent ?? nothing}
      ?fullscreen=${fullscreen ?? nothing}>
      <h1 id="bottom-sheet-title">Bottom Sheet Title</h1>
      <div forge-bottom-sheet-body style="overflow-y: auto;" tabindex="0">
        <div style="height: 1000vh;"></div>
      </div>
    </forge-bottom-sheet>
  `);
  return new BottomSheetHarness(bottomSheetEl);
}

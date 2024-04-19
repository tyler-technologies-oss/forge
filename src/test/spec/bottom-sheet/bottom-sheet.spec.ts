import { getShadowElement, removeElement, getActiveElement } from '@tylertech/forge-core';
import { dispatchKeyEvent, tick, timer } from '@tylertech/forge-testing';
import { BACKDROP_CONSTANTS } from '@tylertech/forge/backdrop/backdrop-constants';
import { BOTTOM_SHEET_CONSTANTS, defineBottomSheetComponent, IBottomSheetComponent } from '@tylertech/forge/bottom-sheet';
import { IBackdropComponent, IDialogComponent } from '@tylertech/forge';

const DIALOG_ANIMATION_DURATION = 500;

interface ITestContext {
  context: IBottomSheetTestContext;
}

interface IBottomSheetTestContext {
  component: IBottomSheetComponent;
  dialog: IDialogComponent;
  nativeDialog: HTMLDialogElement;
  backdrop: IBackdropComponent;
  surfaceElement: HTMLElement;
  open(): Promise<void>;
  clickBackdrop(): void;
  destroy(): void;
}

describe('BottomSheetComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineBottomSheetComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should not be connected when opened', function(this: ITestContext) {
    this.context = setupTestContext();
    
    expect(this.context.component.isConnected).toBe(false);

    this.context.component.open = true;
    expect(this.context.component.isConnected).toBe(false);
  });

  it('should open by default when connected to DOM', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;
    document.body.appendChild(this.context.component);

    expect(this.context.component.open).toBe(true);
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should have proper default values', function(this: ITestContext) {
    this.context = setupTestContext();

    expect(this.context.component.open).toBe(false, 'Expected open to be false');
    expect(this.context.component.persistent).toBe(false, 'Expected persistent to be false');
  });

  it('should have proper accessibility attributes', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    expect(this.context.component.getAttribute('role')).toBe('dialog');
    expect(this.context.component.getAttribute('aria-modal')).toBe('false');
  });

  it('should have proper accessibility attributes when modal', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.mode = 'modal';
    await this.context.open();

    expect(this.context.component.getAttribute('role')).toBe('dialog');
    expect(this.context.component.getAttribute('aria-modal')).toBe('true');
  });

  it('should mirror properties as attributes', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.persistent = false;
    this.context.component.open = true;

    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN)).toBe(true, 'Expected open attribute to be "true"');
    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.PERSISTENT)).toBe(false, 'Expected backdrop close attribute to be "false"');
  });

  it('should add attribute to body when opened', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;

    expect(document.body.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN)).toBe(true);
  });

  it('should open and close', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    expect(this.context.component.open).toBe(true);

    this.context.component.open = false;

    expect(this.context.component.open).toBe(false);
  });

  it('should close on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.mode = 'modal';
    await this.context.open();
  
    const closeSpy = jasmine.createSpy('close');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);
    this.context.clickBackdrop();
    await timer(500);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not close on backdrop click when persistent', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.persistent = true;
    await this.context.open();

    const spy = jasmine.createSpy('callback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, spy);

    this.context.clickBackdrop();

    await timer(500);
    expect(spy).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('[BEFORE_CLOSE] should prevent closing the bottom sheet when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);

    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    this.context.component.mode = 'modal';
    await this.context.open();
    await timer(500);
    this.context.nativeDialog.dispatchEvent(new Event('cancel'));
    await timer(500);

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(this.context.component.open).toBe(true);
    expect(this.context.component.isConnected).toBe(true);
  });

  it('[BEFORE_CLOSE] should prevent bottom sheet from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, evt => evt.preventDefault());

    const closeCallback = jasmine.createSpy('callback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeCallback);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    await this.context.open();
    this.context.clickBackdrop();
    await timer(500);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeCallback).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should close on escape keydown when modal and not persistent', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.mode = 'modal';
    await this.context.open();

    expect(this.context.component.persistent).toBe(false);

    this.context.nativeDialog.dispatchEvent(new Event('cancel'));
    await timer(500);

    expect(this.context.component.isConnected).toBe(true);
    expect(this.context.component.open).toBe(false);
  });

  it('should not close on backdrop escape keydown when persistent', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.persistent = true;
    await this.context.open();

    dispatchKeyEvent(this.context.backdrop, 'keydown', 'Escape');
    await timer(500);

    expect(this.context.component.isConnected).toBe(true);
  });

  it('should hide backdrop by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    expect(this.context.backdrop.visible).toBeFalse();
  });

  it('should hide backdrop when nonmodal', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    expect(this.context.component.mode).toBe('nonmodal');
    expect(getComputedStyle(this.context.backdrop).display).toBe('none');
  });

  it('should project the content into the correct slot', async function(this: ITestContext) {
    this.context = setupTestContext();
    const content = document.createElement('div');
    this.context.component.appendChild(content);
    await this.context.open();

    const slotElement = getShadowElement(this.context.component, 'slot') as HTMLSlotElement;

    expect(slotElement.assignedNodes().length).toBe(1);
    expect(slotElement.assignedNodes()[0]).toBe(content);
    expect(content.assignedSlot).toBe(slotElement);
  });

  it('should set focus to a button with autofocus attribute set', async function(this: ITestContext) {
    this.context = setupTestContext();
    const button = document.createElement('button');
    button.setAttribute('autofocus', '');
    this.context.component.appendChild(button);
    await this.context.open();
    await tick();
    await tick();

    expect(getActiveElement()).toBe(button);
  });

  it('should set focus to the body by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    const button = document.createElement('button');
    this.context.component.appendChild(button);
    this.context.open();

    expect(getActiveElement()).toBe(document.body);
  });

  it('should set full screen', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.fullscreen = true;
    await this.context.open();

    expect(this.context.component.fullscreen).toBe(true);
    expect(this.context.dialog.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(true);
  });

  it('should set full screen via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    this.context.component.setAttribute(BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN, '');

    expect(this.context.component.fullscreen).toBe(true);
    expect(this.context.dialog.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(true);
  });

  it('should toggle full screen', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    this.context.component.fullscreen = true;
    this.context.component.fullscreen = false;

    expect(this.context.component.fullscreen).toBe(false);
    expect(this.context.surfaceElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(false);
  });

  it('should make scrollable sheet fullscreen if dragged up via mouse', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.style.setProperty('--forge-bottom-sheet-animation-duration', '0');
    addScrollableContent(this.context.component);
    await this.context.open();
    
    this.context.surfaceElement.dispatchEvent(new MouseEvent('mousedown', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 + 1 }));
    document.body.dispatchEvent(new MouseEvent('mousemove', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 - 1 }));
    document.body.dispatchEvent(new MouseEvent('mouseup'));

    expect(this.context.dialog.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(true);
  });

  function setupTestContext(): IBottomSheetTestContext {
    const component = document.createElement('forge-bottom-sheet');
    const surfaceElement = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.SURFACE);
    const dialog = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.DIALOG) as IDialogComponent;
    return {
      component,
      get backdrop() {
        return getShadowElement(dialog, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
      },
      dialog,
      get nativeDialog() {
        return getShadowElement(dialog, 'dialog') as HTMLDialogElement;
      },
      surfaceElement,
      open: async () => {
        document.body.appendChild(component);
        component.open = true;
        await timer(DIALOG_ANIMATION_DURATION);
        return tick();
      },
      clickBackdrop: function() {
        this.backdrop.click();
      },
      destroy: () => removeElement(component)
    };
  }

  function addScrollableContent(component: IBottomSheetComponent): void {
    const content = document.createElement('div');
    content.setAttribute('forge-bottom-sheet-body', '');
    content.style.overflowY = 'auto';
    const innerContent = document.createElement('div');
    innerContent.style.height = `${document.body.offsetHeight + 500}px`;
    content.appendChild(innerContent);
    component.appendChild(content);
  }
});

import { getShadowElement, removeElement, getActiveElement } from '@tylertech/forge-core';
import { dispatchKeyEvent, tick, timer } from '@tylertech/forge-testing';
import { BACKDROP_CONSTANTS } from '@tylertech/forge/backdrop/backdrop-constants';
import { BOTTOM_SHEET_CONSTANTS, defineBottomSheetComponent, IBottomSheetComponent, IBottomSheetFoundation } from '@tylertech/forge/bottom-sheet';
import { IBackdropComponent } from '@tylertech/forge';

interface ITestContext {
  context: IBottomSheetTestContext;
}

interface IBottomSheetTestContext {
  component: IBottomSheetComponent;
  backdrop: IBackdropComponent;
  containerElement: HTMLElement;
  foundation: IBottomSheetFoundation;
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

  it('should be connected when opened', function(this: ITestContext) {
    this.context = setupTestContext();
    
    expect(this.context.component.isConnected).toBe(false);

    this.context.component.open = true;
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should have proper default values', function(this: ITestContext) {
    this.context = setupTestContext();

    expect(this.context.component.open).toBe(false, 'Expected open to be false');
    expect(this.context.component.backdropClose).toBe(true, 'Expected backdropClose to be true');
    expect(this.context.component.escapeClose).toBe(true, 'Expected escapeClose to be true');
  });

  it('should have proper accessibility attributes', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;

    expect(this.context.component.getAttribute('role')).toBe('dialog');
    expect(this.context.component.getAttribute('aria-modal')).toBe('true');
  });

  it('should mirror properties as attributes', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.backdropClose = false;
    this.context.component.escapeClose = false;
    this.context.component.showBackdrop = true;
    this.context.component.open = true;

    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN)).toBe(true, 'Expected open attribute to be "true"');
    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.BACKDROP_CLOSE)).toBe(false, 'Expected backdrop close attribute to be "false"');
    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.ESCAPE_CLOSE)).toBe(false, 'Expected escape close attribute to be "false"');
    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.SHOW_BACKDROP)).toBe(true, 'Expected show backdrop attribute to be present');
  });

  it('should add attribute to body when opened', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;

    expect(document.body.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN)).toBe(true);
  });

  it('should open and close', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.open();

    expect(this.context.component.isConnected).toBe(true);

    this.context.component.open = false;
    simulateTransition(this.context);

    expect(this.context.component.isConnected).toBe(false);
  });

  it('should close on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.showBackdrop = true;
    this.context.open();

    const closeSpy = jasmine.createSpy('close');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);
    this.context.clickBackdrop();
    simulateTransition(this.context);

    expect(closeSpy).toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(false);
  });

  it('should not close on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.showBackdrop = true;
    this.context.component.backdropClose = false;
    this.context.open();

    const spy = jasmine.createSpy('callback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, spy);

    this.context.clickBackdrop();

    simulateTransition(this.context);
    expect(spy).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('[beforeCloseCallback] should prevent bottom sheet from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => false;

    const closeCallback = jasmine.createSpy('callback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeCallback);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    this.context.open();
    this.context.clickBackdrop();
    await tick();
    simulateTransition(this.context);

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeCallback).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('[beforeCloseCallback] should allow bottom sheet from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => true;

    const closeSpy = jasmine.createSpy('closeEvent');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseEvent');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    this.context.open();
    this.context.clickBackdrop();
    await tick();
    simulateTransition(this.context);

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(false);
  });

  it('[beforeCloseCallback] should prevent closing the bottom sheet when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => false;

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    this.context.open();
    dispatchKeyEvent(document, 'keydown', 'Escape');
    simulateTransition(this.context);
    await tick();
    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('[beforeCloseCallback] should allow closing the bottom sheet when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => true;

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    this.context.open();
    dispatchKeyEvent(document, 'keydown', 'Escape');
    await tick();
    simulateTransition(this.context);

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(false);
  });

  it('[BEFORE_CLOSE] should prevent closing the bottom sheet when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, evt => evt.preventDefault());

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeSpy);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    this.context.open();
    dispatchKeyEvent(document, 'keydown', 'Escape');
    simulateTransition(this.context);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('[BEFORE_CLOSE] should prevent bottom sheet from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, evt => evt.preventDefault());

    const closeCallback = jasmine.createSpy('callback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, closeCallback);
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    this.context.open();
    this.context.clickBackdrop();
    simulateTransition(this.context);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeCallback).not.toHaveBeenCalled();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should close on backdrop escape keydown', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.open();

    dispatchKeyEvent(document, 'keydown', 'Escape');
    simulateTransition(this.context);

    expect(this.context.component.isConnected).toBe(false);
  });

  it('should not close on backdrop escape keydown', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.escapeClose = false;
    this.context.open();

    dispatchKeyEvent(this.context.backdrop, 'keydown', 'Escape');
    simulateTransition(this.context);

    expect(this.context.component.isConnected).toBe(true);
  });

  it('should hide backdrop by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.open();

    expect(this.context.backdrop.visible).toBeFalse();
  });

  it('should set show backdrop via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(BOTTOM_SHEET_CONSTANTS.attributes.SHOW_BACKDROP, '');
    this.context.open();

    expect(this.context.component.showBackdrop).toBe(true);
    expect(this.context.component.hidden).toBe(false);
  });

  it('should project the content into the correct slot', function(this: ITestContext) {
    this.context = setupTestContext();
    const content = document.createElement('div');
    this.context.component.appendChild(content);
    this.context.open();

    const slotElement = getShadowElement(this.context.component, 'slot') as HTMLSlotElement;

    expect(slotElement.assignedNodes().length).toBe(1);
    expect(slotElement.assignedNodes()[0]).toBe(content);
    expect(content.assignedSlot).toBe(slotElement);
  });

  it('should call openCallback before opening', async function(this: ITestContext) {
    this.context = setupTestContext();
    const spy = jasmine.createSpy('openCallback');
    this.context.component.openCallback = spy;
    this.context.open();

    expect(spy).toHaveBeenCalledTimes(1);

    // When setting the openCallback it causes a microtask (uses a promise) to be queued 
    // so we need to wait a frame before checking for existence.
    await tick();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should call closeCallback before closing', async function(this: ITestContext) {
    this.context = setupTestContext();
    const spy = jasmine.createSpy('closeCallback');
    this.context.component.closeCallback = spy;
    this.context.open();

    // When setting the closeCallback it causes a microtask (uses a promise) to be queued 
    // so we need to wait a frame before checking for existence.
    this.context.component.open = false;
    await tick();
    simulateTransition(this.context);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(this.context.component.isConnected).toBe(false);
  });

  it('should set focus to a button with initial focus attribute set', async function(this: ITestContext) {
    this.context = setupTestContext();
    const button = document.createElement('button');
    button.setAttribute(BOTTOM_SHEET_CONSTANTS.attributes.INITIAL_FOCUS, '');
    this.context.component.appendChild(button);
    this.context.open();
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
    this.context.open();

    expect(this.context.component.fullscreen).toBe(true);
    expect(this.context.containerElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(true);
  });

  it('should set full screen via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.open();

    this.context.component.setAttribute(BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN, '');

    expect(this.context.component.fullscreen).toBe(true);
    expect(this.context.containerElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(true);
  });

  it('should toggle full screen', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.open();

    this.context.component.fullscreen = true;
    this.context.component.fullscreen = false;

    expect(this.context.component.fullscreen).toBe(false);
    expect(this.context.containerElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN)).toBe(false);
  });

  it('should emit ready event after bottom sheet animates open', async function(this: ITestContext) {
    this.context = setupTestContext();
    const readySpy = jasmine.createSpy('ready event listener');
    this.context.component.addEventListener(BOTTOM_SHEET_CONSTANTS.events.READY, readySpy);

    await this.context.open();

    expect(readySpy).toHaveBeenCalled();
  });

  it('should indicate if content is scrollable', async function(this: ITestContext) {
    this.context = setupTestContext();
    addScrollableContent(this.context.component);

    await this.context.open();
    await tick();

    expect(this.context.component.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.SCROLLABLE)).toBe(true);
  });

  it('should make scrollable sheet fullscreen if dragged up via mouse', async function(this: ITestContext) {
    document.documentElement.style.setProperty('--forge-bottom-sheet-transition-duration', '0');
    this.context = setupTestContext();
    addScrollableContent(this.context.component);
    await this.context.open();

    // Even setting transition duration to zero, need to wait for double-nested `requestAnimationFrame`.
    await tick();
    await tick();

    const dragStartSpy = spyOn<any>(this.context.foundation, '_onDragStart').and.callThrough();
    const dragMoveSpy = spyOn<any>(this.context.foundation, '_onDragMove').and.callThrough();
    const dragEndSpy = spyOn<any>(this.context.foundation, '_onDragEnd').and.callThrough();
    this.context.containerElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: window.innerHeight / 2 + 1 }));
    document.body.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: window.innerHeight / 2 - 1 } as any));
    document.body.dispatchEvent(new MouseEvent('mouseup'));

    expect(dragStartSpy).toHaveBeenCalledTimes(1);
    expect(dragMoveSpy).toHaveBeenCalledTimes(1);
    expect(dragEndSpy).toHaveBeenCalledTimes(1);
    expect(this.context.component.hasAttribute(BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN)).toBe(true);
  });

  function setupTestContext(): IBottomSheetTestContext {
    const component = document.createElement('forge-bottom-sheet');
    const containerElement = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.CONTAINER);
    const foundation = component['_foundation'];
    const backdrop = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.BACKDROP) as IBackdropComponent;
    return {
      component,
      backdrop,
      containerElement,
      foundation,
      open: async () => {
        component.open = true;
        simulateTransition({containerElement});
        return await tick();
      },
      clickBackdrop: () => backdrop.click(),
      destroy: () => removeElement(component)
    };
  }

  function simulateTransition(context: Pick<IBottomSheetTestContext, 'containerElement'>): void {
    context.containerElement.dispatchEvent(new TransitionEvent('transitionend', { propertyName: 'transform' }));
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

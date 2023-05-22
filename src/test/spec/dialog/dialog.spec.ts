import { DIALOG_CONSTANTS, IDialogComponent, defineDialogComponent } from '@tylertech/forge/dialog';
import { BACKDROP_CONSTANTS } from '@tylertech/forge/backdrop/backdrop-constants';
import { removeElement, getShadowElement, getActiveElement } from '@tylertech/forge-core';
import { dispatchKeyEvent, tick, timer } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestDialogContext;
}

interface ITestDialogContext {
  component: IDialogComponent;
  open(): void;
  close(): void;
  append(): void;
  destroy(): void;
  isVisible: boolean;
}

describe('DialogComponent', function(this: ITestContext) {
  
  beforeAll(function(this: ITestContext) {
    defineDialogComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be visible when opened', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.isVisible).toBeFalse();
    await this.context.open();
    expect(this.context.isVisible).toBeTrue();
  });

  it('should have proper default values', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.open).withContext('Expected open to be false').toBeFalse();
    expect(this.context.component.backdropClose).withContext('Expected backdropClose to be true').toBeTrue();
    expect(this.context.component.escapeClose).withContext('Expected escapeClose to be true').toBeTrue();
  });

  it('should have proper accessibility attributes', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    expect(this.context.component.getAttribute('role')).toBe('dialog');
    expect(this.context.component.getAttribute('aria-modal')).toBe('true');
  });

  it('should mirror properties as attributes', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.backdropClose = false;
    this.context.component.escapeClose = false;
    await this.context.open();

    expect(this.context.component.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN)).withContext('Expected open attribute to be "true"').toBeTrue();
    expect(this.context.component.getAttribute(DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE)).withContext('Expected backdrop close attribute to be "false"').toBe('false');
    expect(this.context.component.getAttribute(DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE)).withContext('Expected escape close attribute to be "false"').toBe('false');
  });

  it('should add attribute to body when opened', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();
    expect(document.body.hasAttribute(DIALOG_CONSTANTS.attributes.OPEN)).toBeTrue();
  });

  it('should open and close', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();
    await tick();
    expect(this.context.isVisible).toBeTrue();
    await this.context.close();
    await tick();
    expect(this.context.isVisible).toBeFalse();
  });

  it('should close on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    const closeSpy = jasmine.createSpy('close');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);

    const backdropComponent = getShadowElement(this.context.component, DIALOG_CONSTANTS.selectors.BACKDROP);
    getShadowElement(backdropComponent, BACKDROP_CONSTANTS.selectors.CONTAINER).click();
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);

    expect(closeSpy).toHaveBeenCalled();
    expect(this.context.isVisible).toBeFalse();
  });

  it('should not close on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.backdropClose = false;
    await this.context.open();

    const spy = jasmine.createSpy('callback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, spy);
    
    const backdropComponent = getShadowElement(this.context.component, DIALOG_CONSTANTS.selectors.BACKDROP);
    getShadowElement(backdropComponent, BACKDROP_CONSTANTS.selectors.CONTAINER).click();
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);

    expect(spy).not.toHaveBeenCalled();
    expect(this.context.isVisible).toBeTrue();
  });

  it('[beforeCloseCallback] should prevent dialog from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => false;

    const closeCallback = jasmine.createSpy('callback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeCallback);

    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    this.context.append();
    await this.context.open();

    const backdropComponent = getShadowElement(this.context.component, DIALOG_CONSTANTS.selectors.BACKDROP);
    getShadowElement(backdropComponent, BACKDROP_CONSTANTS.selectors.CONTAINER).click();
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeCallback).not.toHaveBeenCalled();
    expect(this.context.isVisible).toBeTrue();
  });

  it('[beforeCloseCallback] should allow dialog from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => true;

    const closeSpy = jasmine.createSpy('closeEvent');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);

    const beforeCloseSpy = jasmine.createSpy('beforeCloseEvent');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    this.context.append();
    await this.context.open();

    const backdropComponent = getShadowElement(this.context.component, DIALOG_CONSTANTS.selectors.BACKDROP);
    getShadowElement(backdropComponent, BACKDROP_CONSTANTS.selectors.CONTAINER).click();
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(this.context.isVisible).toBeFalse();
  });

  it('[beforeCloseCallback] should prevent closing the dialog when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => false;

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);

    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    this.context.append();
    await this.context.open();

    dispatchKeyEvent(document, 'keydown', 'Escape');
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(this.context.isVisible).toBeTrue();
  });

  it('[beforeCloseCallback] should allow closing the dialog when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.beforeCloseCallback = () => true;

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);

    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    this.context.append();
    await this.context.open();

    dispatchKeyEvent(document, 'keydown', 'Escape');
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(this.context.isVisible).toBeFalse();
  });

  it('[BEFORE_CLOSE] should prevent closing the dialog when escape is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, (evt) => evt.preventDefault());

    const closeSpy = jasmine.createSpy('closeCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeSpy);
    
    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);

    this.context.append();
    await this.context.open();

    dispatchKeyEvent(document, 'keydown', 'Escape');
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    await tick();

    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(this.context.isVisible).toBeTrue();
  });

  it('[BEFORE_CLOSE] should prevent dialog from closing on backdrop click', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, (evt) => evt.preventDefault());

    const closeCallback = jasmine.createSpy('callback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.CLOSE, closeCallback);

    const beforeCloseSpy = jasmine.createSpy('beforeCloseCallback');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, beforeCloseSpy);
    
    this.context.append();
    await this.context.open();

    const backdropComponent = getShadowElement(this.context.component, DIALOG_CONSTANTS.selectors.BACKDROP);
    getShadowElement(backdropComponent, BACKDROP_CONSTANTS.selectors.CONTAINER).click();
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    await tick();
    
    expect(beforeCloseSpy).toHaveBeenCalled();
    expect(closeCallback).not.toHaveBeenCalled();
    expect(this.context.isVisible).toBeTrue();
  });

  it('should close on backdrop escape keydown', async function(this: ITestContext) {
    this.context = setupTestContext();
    await this.context.open();

    dispatchKeyEvent(document, 'keydown', 'Escape');
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    expect(this.context.isVisible).toBeFalse();
  });

  it('should not close on backdrop escape keydown', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.escapeClose = false;
    await this.context.append();
    await this.context.open();
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    dispatchKeyEvent(getShadowElement(this.context.component, DIALOG_CONSTANTS.selectors.BACKDROP), 'keydown', 'Escape');
    await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    expect(this.context.isVisible).toBeTrue();
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

  it('should call openCallback before opening', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    const spy = jasmine.createSpy('openCallback');
    this.context.component.openCallback = spy;
    await this.context.open();
    expect(spy).toHaveBeenCalledTimes(1);

    // When setting the openCallback it causes a microtask (uses a promise) to be queued 
    // so we need to wait a frame before checking for existence.
    await tick();
    expect(this.context.isVisible).toBeTrue();
  });

  it('should not open if openCallback returns false', async function(this: ITestContext) {
    this.context = setupTestContext();
    const spy = jasmine.createSpy('openCallback', () => false).and.callThrough();
    this.context.component.openCallback = spy;
    await this.context.open();
    expect(spy).toHaveBeenCalledTimes(1);
    await tick();
    
    expect(this.context.isVisible).toBeFalse();
  });

  it('should not open if openCallback returns a promise that resolves to false', async function(this: ITestContext) {
    this.context = setupTestContext();
    const spy = jasmine.createSpy('openCallback', () => new Promise<boolean>(resolve => resolve(false))).and.callThrough();
    this.context.component.openCallback = spy;
    await this.context.open();
    expect(spy).toHaveBeenCalledTimes(1);
    await tick();

    expect(this.context.isVisible).toBeFalse();
  });

  it('should call closeCallback before closing', async function(this: ITestContext) {
    this.context = setupTestContext();
    const spy = jasmine.createSpy('closeCallback');
    this.context.component.closeCallback = spy;

    this.context.append();
    await this.context.open();
    await this.context.close();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(this.context.isVisible).toBeFalse();
  });

  it('should not close if closeCallback returns false', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    const spy = jasmine.createSpy('closeCallback', () => false).and.callThrough();
    this.context.component.closeCallback = spy;

    this.context.append();
    await this.context.open();

    await this.context.close();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(this.context.isVisible).toBeTrue();
  });

  it('should not close if closeCallback returns a promise that resolves to false', async function(this: ITestContext) {
    this.context = setupTestContext(true);

    const spy = jasmine.createSpy('closeCallback', () => new Promise<boolean>(resolve => resolve(false))).and.callThrough();
    this.context.component.closeCallback = spy;
    
    await this.context.open();
    await this.context.close();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(this.context.isVisible).toBeTrue();
  });

  it('should set focus to a button with initial focus attribute set', async function(this: ITestContext) {
    this.context = setupTestContext();
    const button = document.createElement('button');
    button.setAttribute(DIALOG_CONSTANTS.attributes.INITIAL_FOCUS, '');
    this.context.component.appendChild(button);
    await this.context.append();
    await this.context.open();
    expect(getActiveElement()).toBe(button);
  });

  it('should set focus to the body by default', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    const button = document.createElement('button');
    this.context.component.appendChild(button);
    await this.context.open();

    expect(getActiveElement()).toBe(document.body);
  });

  it('should set full screen', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.fullscreen = true;
    this.context.append();
    await this.context.open();

    expect(this.context.component.fullscreen).toBeTrue();
    expect(getContainerElement(this.context.component).classList.contains(DIALOG_CONSTANTS.classes.FULLSCREEN)).toBeTrue();
  });

  it('should set full screen via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN, '');

    expect(this.context.component.fullscreen).toBeTrue();
    expect(getContainerElement(this.context.component).classList.contains(DIALOG_CONSTANTS.classes.FULLSCREEN)).toBeTrue();
  });

  it('should toggle full screen', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();
    
    this.context.component.fullscreen = true;
    this.context.component.fullscreen = false;

    expect(this.context.component.fullscreen).toBeFalse();
    expect(getContainerElement(this.context.component).classList.contains(DIALOG_CONSTANTS.classes.FULLSCREEN)).toBeFalse();
  });

  it('should set moveable', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();
    
    expect(this.context.component.moveable).toBeTrue();
    expect(getContainerElement(this.context.component).classList.contains(DIALOG_CONSTANTS.classes.MOVEABLE)).toBeTrue();
  });

  it('should set moveable via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, '');
    
    expect(this.context.component.moveable).toBeTrue();
    expect(getContainerElement(this.context.component).classList.contains(DIALOG_CONSTANTS.classes.MOVEABLE)).toBeTrue();
  });

  it('should attach mousedown event when moveable', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    moveTarget.dispatchEvent(new Event('mousedown'));
    
    expect(mousedownSpy).toHaveBeenCalledTimes(1);
  });

  it('should attach mousedown event when moveable using custom move target', async function(this: ITestContext) {
    this.context = setupTestContext();
    const customId = 'custom-move-target';
    const moveTarget = attachMoveTarget(this.context.component);
    moveTarget.removeAttribute(DIALOG_CONSTANTS.attributes.DFEAULT_MOVE_TARGET);
    moveTarget.id = customId;

    const moveTargeSelected = `#${customId}`;
    this.context.component.moveTarget = moveTargeSelected;
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    moveTarget.dispatchEvent(new Event('mousedown'));
    
    expect(this.context.component.moveTarget).toBe(moveTargeSelected);
    expect(mousedownSpy).toHaveBeenCalledTimes(1);
  });

  it('should set move target via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.MOVE_TARGET, 'test');

    expect(this.context.component.moveTarget).toBe('test');
  });

  it('should not attach mousedown event when moveable if no move target attribute is specified', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    moveTarget.removeAttribute(DIALOG_CONSTANTS.attributes.DFEAULT_MOVE_TARGET);

    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    moveTarget.dispatchEvent(new Event('mousedown'));
    
    expect(mousedownSpy).toHaveBeenCalledTimes(0);
  });

  it('should move dialog surface via mouse', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    const mousemoveSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseMove').and.callThrough();
    const mouseupSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseUp').and.callThrough();
    moveTarget.dispatchEvent(new MouseEvent('mousedown', { pageX: 100, pageY: 100 } as any));
    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 150, pageY: 150 } as any));
    document.dispatchEvent(new MouseEvent('mouseup'));
    
    expect(mousedownSpy).toHaveBeenCalledTimes(1);
    expect(mousemoveSpy).toHaveBeenCalledTimes(1);
    expect(mouseupSpy).toHaveBeenCalledTimes(1);
    expect(getSurfaceElement(this.context.component).style.top).toContain('px');
    expect(getSurfaceElement(this.context.component).style.top).not.toBe('');
    expect(getSurfaceElement(this.context.component).style.left).not.toBe('');
    expect(getSurfaceElement(this.context.component).style.left).toContain('px');
  });

  it('should not move surface if move event is prevented', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const movedSpy = jasmine.createSpy('moved listener', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.MOVED, movedSpy);

    moveTarget.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 } as any));
    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 150, pageY: 150 } as any));

    expect(getSurfaceElement(this.context.component).style.top).toBe('');
    expect(getSurfaceElement(this.context.component).style.left).toBe('');
    expect(movedSpy).toHaveBeenCalledTimes(1);
  });

  it('should not move surface if move-start event is prevented', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const moveStartSpy = jasmine.createSpy('move start listener', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.MOVE_START, moveStartSpy);

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    const mousemoveSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseMove').and.callThrough();
    const mouseupSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseUp').and.callThrough();
    moveTarget.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 } as any));
    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 150, pageY: 150 } as any));
    document.dispatchEvent(new MouseEvent('mouseup'));
    
    expect(mousedownSpy).toHaveBeenCalledTimes(1);
    expect(mousemoveSpy).toHaveBeenCalledTimes(1);
    expect(mouseupSpy).toHaveBeenCalledTimes(1);
    expect(getSurfaceElement(this.context.component).style.top).toBe('');
    expect(getSurfaceElement(this.context.component).style.left).toBe('');
    expect(moveStartSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit move end event', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();

    const moveEndSpy = jasmine.createSpy('move end listener', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.MOVE_END, moveEndSpy);

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    const mousemoveSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseMove').and.callThrough();
    const mouseupSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseUp').and.callThrough();
    moveTarget.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 } as any));
    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 150, pageY: 150 } as any));
    document.dispatchEvent(new MouseEvent('mouseup'));
    
    expect(mousedownSpy).toHaveBeenCalledTimes(1);
    expect(mousemoveSpy).toHaveBeenCalledTimes(1);
    expect(mouseupSpy).toHaveBeenCalledTimes(1);
    expect(moveEndSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit ready event after dialog animates open', async function(this: ITestContext) {
    this.context = setupTestContext();
    const readySpy = jasmine.createSpy('ready event listener');
    this.context.component.addEventListener(DIALOG_CONSTANTS.events.READY, readySpy);

    this.context.append();
    await this.context.open();

    expect(readySpy).toHaveBeenCalled();
  });

  it('should set custom x position', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.positionX = 100;
    this.context.append();
    await this.context.open();
    
    expect(getSurfaceElement(this.context.component).style.position).toBe('absolute');
    expect(getSurfaceElement(this.context.component).style.left).toBe('100px');
  });

  it('should set custom y position', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.positionY = 100;
    this.context.append();
    await this.context.open();
    
    expect(getSurfaceElement(this.context.component).style.position).toBe('absolute');
    expect(getSurfaceElement(this.context.component).style.top).toBe('100px');
  });

  it('should set relative position', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.positionType = 'relative';
    this.context.component.positionX = 100;
    this.context.component.positionY = 100;
    this.context.append();
    await this.context.open();
    
    expect(getSurfaceElement(this.context.component).style.position).toBe('relative');
    expect(getSurfaceElement(this.context.component).style.top).toBe('100px');
    expect(getSurfaceElement(this.context.component).style.left).toBe('100px');
  });

  it('should change position dynamically', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    this.context.component.positionX = 100;
    this.context.component.positionY = 100;
    
    expect(getSurfaceElement(this.context.component).style.position).toBe('absolute');
    expect(getSurfaceElement(this.context.component).style.top).toBe('100px');
    expect(getSurfaceElement(this.context.component).style.left).toBe('100px');
  });

  it('should set position via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_X, '100px');
    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_Y, '100px');
    
    expect(this.context.component.positionX).toBe('100px');
    expect(this.context.component.positionY).toBe('100px');
    expect(getSurfaceElement(this.context.component).style.position).toBe('absolute');
    expect(getSurfaceElement(this.context.component).style.top).toBe('100px');
    expect(getSurfaceElement(this.context.component).style.left).toBe('100px');
  });

  it('should set position type via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await this.context.open();

    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_TYPE, 'relative');
    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_X, '100px');
    this.context.component.setAttribute(DIALOG_CONSTANTS.attributes.POSITION_Y, '100px');
    
    expect(this.context.component.positionType).toBe('relative');
    expect(getSurfaceElement(this.context.component).style.position).toBe('relative');
    expect(getSurfaceElement(this.context.component).style.top).toBe('100px');
    expect(getSurfaceElement(this.context.component).style.left).toBe('100px');
  });

  it('should reset position after move', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.positionX = 100;
    this.context.component.positionY = 100;
    this.context.component.moveable = true;

    this.context.append();
    await this.context.open();

    moveTarget.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 } as any));
    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 150, pageY: 150 } as any));
    document.dispatchEvent(new MouseEvent('mouseup'));

    this.context.component.resetPosition();
    
    expect(getSurfaceElement(this.context.component).style.top).toBe('100px');
    expect(getSurfaceElement(this.context.component).style.left).toBe('100px');
  });

  it('should manually initialize move target', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();
    
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.initializeMoveTarget();
    
    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    moveTarget.dispatchEvent(new MouseEvent('mousedown'));
    
    expect(mousedownSpy).toHaveBeenCalledTimes(1);
  });

  it('should set moveable to false after attaching listeners', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();
    
    this.context.component.moveable = false;

    const mousedownSpy = spyOn(this.context.component['_foundation'], '_onMoveTargetMouseDown').and.callThrough();
    moveTarget.dispatchEvent(new MouseEvent('mousedown'));
    
    expect(mousedownSpy).not.toHaveBeenCalled();
  });

  it('should capture and restore active element focus when moving', async function(this: ITestContext) {
    this.context = setupTestContext();
    const moveTarget = attachMoveTarget(this.context.component);
    this.context.component.moveable = true;
    this.context.append();
    await this.context.open();
    
    const button = document.createElement('button');
    button.textContent = 'Button';
    this.context.component.appendChild(button);
    button.focus();
    
    await tick();
    expect(document.activeElement).toBe(button);

    moveTarget.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 } as any));
    await tick();
    
    expect(document.activeElement).not.toBe(button);

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 150, pageY: 150 } as any));
    document.dispatchEvent(new MouseEvent('mouseup'));
    
    await tick();

    expect(document.activeElement).toBe(button);
  });

  function setupTestContext(append = false): ITestDialogContext {
    const component = document.createElement(DIALOG_CONSTANTS.elementName) as IDialogComponent;
    const rootEl = component.shadowRoot?.querySelector(DIALOG_CONSTANTS.selectors.CONTAINER) as HTMLElement;
    const surfaceEl = component.shadowRoot?.querySelector(DIALOG_CONSTANTS.selectors.SURFACE) as HTMLElement;
    if (append) {
      document.body.appendChild(component);
    }
    return {
      component,
      open: async () => {
        component.open = true;
        await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
        surfaceEl.dispatchEvent(new TransitionEvent('transitionend'));
        await tick();
        component['_foundation']['_onTransitionEnd']();
      },
      close: async () => {
        component.open = false;
        await timer(DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
        surfaceEl.dispatchEvent(new TransitionEvent('transitionend'));
        await tick();
      },
      append: () => document.body.appendChild(component),
      destroy: () => removeElement(component),
      get isVisible() {
        return component.isConnected &&
               (rootEl?.classList.contains(DIALOG_CONSTANTS.classes.OPEN) ||
               rootEl?.classList.contains(DIALOG_CONSTANTS.classes.ANIMATING));
      }
    };
  }

  function getContainerElement(component: IDialogComponent): HTMLElement {
    return component.shadowRoot!.querySelector(DIALOG_CONSTANTS.selectors.CONTAINER) as HTMLElement;
  }

  function getSurfaceElement(component: IDialogComponent): HTMLElement {
    return component.shadowRoot!.querySelector(DIALOG_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  function attachMoveTarget(dialog: IDialogComponent): HTMLElement {
    const moveTarget = document.createElement('h1');
    moveTarget.textContent = 'Header';
    moveTarget.setAttribute(DIALOG_CONSTANTS.attributes.DFEAULT_MOVE_TARGET, '');
    dialog.appendChild(moveTarget);
    return moveTarget;
  }
});

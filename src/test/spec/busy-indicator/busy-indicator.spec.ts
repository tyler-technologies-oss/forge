import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '@tylertech/forge';
import { BusyIndicatorComponent, BUSY_INDICATOR_CONSTANTS, defineBusyIndicatorComponent, IBusyIndicatorComponent } from '@tylertech/forge/busy-indicator';
import { ICircularProgressComponent } from '@tylertech/forge/circular-progress';
import { ILinearProgressComponent } from '@tylertech/forge/linear-progress';

interface ITestContext {
  context: ITestBusyIndicatorContext;
}

interface ITestBusyIndicatorContext {
  component: IBusyIndicatorComponent;
  append(): void;
  destroy(): void;
}

describe('BusyIndicatorComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    defineBusyIndicatorComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.isConnected).toBe(true);
    expect(this.context.component instanceof BusyIndicatorComponent).toBe(true);
  });

  it('should hide title element if not set', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const titleElement = getTitleElement(this.context.component);
    expect(titleElement).toBeNull();
  });

  it('should hide message element if not set', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const messageElement = getMessageElement(this.context.component);
    expect(messageElement).toBeNull();
  });

  it('should set title via property after connected', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const title = 'Title Text';
    this.context.component.titleText = title;
    const titleElement = getTitleElement(this.context.component);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT)).toBe(title);
    expect(titleElement.innerText).toBe(title);
  });

  it('should set title via attribute after connected', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const title = 'Title Text';
    this.context.component.setAttribute(BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT, title);
    const titleElement = getTitleElement(this.context.component);
    expect(this.context.component.titleText).toBe(title);
    expect(titleElement.innerText).toBe(title);
  });

  it('should set title via default property', function(this: ITestContext) {
    this.context = setupTestContext();
    const title = 'Title Text';
    this.context.component.titleText = title;
    this.context.append();
    const titleElement = getTitleElement(this.context.component);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT)).toBe(title);
    expect(titleElement.innerText).toBe(title);
  });

  it('should set title via default attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    const title = 'Title Text';
    this.context.component.setAttribute(BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT, title);
    this.context.append();
    const titleElement = getTitleElement(this.context.component);
    expect(this.context.component.titleText).toBe(title);
    expect(titleElement.innerText).toBe(title);
  });

  it('should set message via property after connected', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const message = 'Message Text';
    this.context.component.message = message;
    const messageElement = getMessageElement(this.context.component);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.MESSAGE)).toBe(message);
    expect(messageElement.innerText).toBe(message);
  });  

  it('should set message via attribute after connected', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const message = 'Message Text';
    this.context.component.setAttribute(BUSY_INDICATOR_CONSTANTS.attributes.MESSAGE, message);
    const messageElement = getMessageElement(this.context.component);
    expect(this.context.component.message).toBe(message);
    expect(messageElement.innerText).toBe(message);
  });

  it('should hide message element if value is falsy', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.message = 'Some message';
    this.context.append();
    this.context.component.message = '';
    const messageElement = getMessageElement(this.context.component);
    expect(messageElement).toBeNull();
  });

  it('should remove component when hide is called', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.hide();
    await timer(BUSY_INDICATOR_CONSTANTS.numbers.TRANSITION_LENGTH);
    expect(this.context.component.isConnected).toBe(false, 'Expected component to not be connected');
  });

  it('should show cancel button', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.cancel = true;
    this.context.append();    

    const cancelButton = getCancelButtonElement(this.context.component);

    expect(this.context.component.cancel).toBe(true);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.CANCEL)).toBe('true');
    expect(cancelButton).not.toBeNull();
  });

  it('should not show cancel button by default', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const cancelButton = getCancelButtonElement(this.context.component);
    expect(this.context.component.cancel).toBe(false);
    expect(cancelButton).toBeNull();
  });

  it('should emit event when cancel button is clicked', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(BUSY_INDICATOR_CONSTANTS.attributes.CANCEL, 'true');
    this.context.append();
    const cancelListener = jasmine.createSpy('cancel listener');
    this.context.component.addEventListener(BUSY_INDICATOR_CONSTANTS.events.CANCEL, cancelListener);
    const cancelButton = getCancelButtonElement(this.context.component);
    cancelButton.click();
    expect(cancelListener).toHaveBeenCalledTimes(1);
  });

  it('should update message', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.message = 'Message one';
    this.context.append();

    const messageElement = getMessageElement(this.context.component);
    this.context.component.message = 'Message two';
    expect(messageElement.innerText).toBe('Message two');
  });

  it('should remove message element when no message is set', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.message = 'Message one';
    this.context.append();
    this.context.component.message = '';

    const messageElement = getMessageElement(this.context.component);
    expect(messageElement).toBeNull();
  });

  it('should show progress spinner by default', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const progressSpinner = getProgressSpinnerElement(this.context.component);
    expect(progressSpinner).not.toBeNull();
  });

  it('should hide progress spinner', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.spinner = false;
    this.context.append();
    const progressSpinner = getProgressSpinnerElement(this.context.component);
    expect(this.context.component.spinner).toBe(false);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.SPINNER)).toBe('false');
    expect(progressSpinner).toBeNull();
  });

  it('should set width', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.width = 500;
    this.context.append();
    const rootElement = getShadowElement(this.context.component, BUSY_INDICATOR_CONSTANTS.selectors.SURFACE);
    expect(this.context.component.width).toBe(500);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.WIDTH)).toBe('500');
    expect(rootElement.style.width).toBe('500px');
  });

  it('should show progress bar', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.progressBar = true;
    this.context.append();
    const progressBar = getProgressBarElement(this.context.component);
    expect(this.context.component.progressBar).not.toBeNull();
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.PROGRESS_BAR)).toBe('true');
    expect(progressBar).not.toBeNull();
  });

  it('should set progress on progress bar', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.progressBar = true;
    this.context.component.progressBarDeterminate = true;
    this.context.append();
    this.context.component.progress = 50;
    const progressBar = getProgressBarElement(this.context.component);
    expect(this.context.component.progressBarDeterminate).toBe(true);
    expect(this.context.component.progress).toBe(50);
    expect(progressBar.progress).toBe(50);
  });

  it('should set progress bar buffer', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.progressBar = true;
    this.context.component.progressBarDeterminate = true;
    this.context.component.buffer = 0.5;
    this.context.append();
    const progressBar = getShadowElement(this.context.component, BUSY_INDICATOR_CONSTANTS.selectors.PROGRESS_BAR) as ILinearProgressComponent;
    expect(this.context.component.buffer).toBe(0.5);
    expect(this.context.component.getAttribute(BUSY_INDICATOR_CONSTANTS.attributes.BUFFER)).toBe('0.5');
    expect(progressBar.buffer).toBe(0.5);
  });

  it('should set focus back to previously focused element when closed', async function(this: ITestContext) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    this.context = setupTestContext(true);

    expect(document.activeElement).not.toEqual(input);
    this.context.component.hide();

    await timer(BUSY_INDICATOR_CONSTANTS.numbers.TRANSITION_LENGTH);

    expect(document.activeElement).toEqual(input);
    removeElement(input);
  });

  it('should use fixed positioning by default', async function(this: ITestContext) {
    this.context = setupTestContext(true);

    await tick();

    const backdropElement = getBackdropElement(this.context.component);
    expect(backdropElement.hasAttribute(BACKDROP_CONSTANTS.attributes.FIXED)).toBeTrue();

    const surfaceElement = getSurfaceElement(this.context.component);
    const surfaceStyles = getComputedStyle(surfaceElement);
    expect(surfaceStyles.position).toBe('fixed');
  });

  it('should use absolute positioning when fixed is false', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.fixed = false;

    await tick();

    const backdropElement = getBackdropElement(this.context.component);
    expect(backdropElement.hasAttribute(BACKDROP_CONSTANTS.attributes.FIXED)).toBeFalse();

    const surfaceElement = getSurfaceElement(this.context.component);
    const surfaceStyles = getComputedStyle(surfaceElement);
    expect(surfaceStyles.position).toBe('absolute');
  });

  function setupTestContext(append = false): ITestBusyIndicatorContext {
    const component = document.createElement(BUSY_INDICATOR_CONSTANTS.elementName) as IBusyIndicatorComponent;
    if (append) {
      document.body.appendChild(component);
    }
    return {
      component,
      append: () => document.body.appendChild(component),
      destroy: () => removeElement(component)
    }
  }

  function getTitleElement(component: IBusyIndicatorComponent): HTMLElement {
    return getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.TITLE);
  }
  
  function getMessageElement(component: IBusyIndicatorComponent): HTMLElement {
    return getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.MESSAGE);
  }

  function getCancelButtonElement(component: IBusyIndicatorComponent): HTMLButtonElement {
    return getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.CANCEL) as HTMLButtonElement;
  }

  function getProgressSpinnerElement(component: IBusyIndicatorComponent): ICircularProgressComponent {
    return getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.SPINNER) as ICircularProgressComponent;
  }

  function getProgressBarElement(component: IBusyIndicatorComponent): ILinearProgressComponent {
    return getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.PROGRESS_BAR) as ILinearProgressComponent;
  }

  function getSurfaceElement(component: IBusyIndicatorComponent): HTMLElement {
    return getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.SURFACE) as HTMLElement;
  }

  function getBackdropElement(component: IBusyIndicatorComponent): IBackdropComponent {
    return getShadowElement(component, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }
});

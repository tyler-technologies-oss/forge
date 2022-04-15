import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { defineFloatingActionButtonComponent, FLOATING_ACTION_BUTTON_CONSTANTS, IFloatingActionButtonComponent } from '@tylertech/forge/floating-action-button';
import { COLOR_CONSTANTS } from '@tylertech/forge/theme';

interface ITestContext {
  context: ITestFloatingActionButtonContext
}

interface ITestFloatingActionButtonContext {
  component: IFloatingActionButtonComponent;
  getButtonElement(): HTMLButtonElement;
  getIconElement(): HTMLElement;
  addButtonElement(): void;
  append(): void;
  destroy(): void;
}

describe('FloatingActionButtonComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    defineFloatingActionButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be connected', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should receive MDC class', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON)).toBe(true);
  });

  it('should not be mini by default', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.mini).toBe(false);
  });

  it('should not be extended by default', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.extended).toBe(false);
  });

  it('should not be exited by default', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.exited).toBe(false);
  });

  it('should not have a color theme set by default', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.style.getPropertyValue('--mdc-theme-secondary')).toBe('');
  });

  it('should set MDC class on icon', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.getIconElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.ICON)).toBe(true);
  });

  it('should wait until button element is present to initialize', async function(this: ITestContext) {
    this.context = setupTestContext(true, false);
    await tick();
    expect(this.context.component['_rippleInstance']).toBeUndefined();
    this.context.addButtonElement();
    await tick();
    expect(this.context.component['_rippleInstance']).toBeDefined();
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON)).toBe(true);
  });

  it('should not initialize if a button is not provided', async function(this: ITestContext) {
    this.context = setupTestContext(true, false);
    await tick();
    this.context.component.appendChild(document.createElement('div'));
    await tick();
    expect(this.context.component['_rippleInstance']).toBeUndefined();
  });

  it('should set mini class via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.MINI, 'true');
    this.context.append();
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON_MINI)).toBe(true);
  });

  it('should set mini class via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.mini = true;
    this.context.append();
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON_MINI)).toBe(true);
  });

  it('should set extended class via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    const label = document.createElement('span');
    this.context.getButtonElement().textContent = 'extended';
    this.context.component.appendChild(label);

    this.context.component.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXTENDED, 'true');
    this.context.append();

    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON_EXTENDED)).toBe(true);
    expect(label.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.LABEL)).toBe(true);
  });

  it('should set extended class via property', function(this: ITestContext) {
    this.context = setupTestContext();
    const label = document.createElement('span');
    label.textContent = 'extended';
    this.context.getButtonElement().appendChild(label);

    this.context.component.extended = true;
    this.context.append();

    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.BUTTON_EXTENDED)).toBe(true);
    expect(label.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.LABEL)).toBe(true);
  });

  it('should set color class via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute('theme', 'primary');
    this.context.append();
    await tick();
    const style = getComputedStyle(this.context.component.querySelector('button') as HTMLElement);
    expect(style.getPropertyValue('--mdc-theme-secondary').trim()).toBe(COLOR_CONSTANTS.themeColors.primary);
  });

  it('should exit via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await tick();
    this.context.component.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED, 'true');
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED)).toBe(true);
  });

  it('should exit via property', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await tick();
    this.context.component.exited = true;
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED)).toBe(true);
  });

  it('should render exited via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED, 'true');
    this.context.append();
    await tick();
    expect(this.context.component.exited).toBe(true);
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED)).toBe(true);
  });

  it('should render exited via property', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.exited = true;
    this.context.append();
    await tick();
    expect(this.context.component.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED)).toBe('true');
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED)).toBe(true);
  });

  it('should enter after initially rendering exited', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.exited = true;
    this.context.append();
    await tick();
    this.context.component.exited = false;
    await tick();
    expect(this.context.component.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED)).toBe('false');
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED)).toBe(false);
  });

  it('should exit then enter', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await tick();
    this.context.component.exited = true;
    await tick();
    this.context.component.exited = false;
    expect(this.context.component.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.EXITED)).toBe('false');
    expect(this.context.getButtonElement().classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXITED)).toBe(false);
  });

  function setupTestContext(append = false, hasButton = true): ITestFloatingActionButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'floating-action-button-test-fixture';
    const component = document.createElement(FLOATING_ACTION_BUTTON_CONSTANTS.elementName) as IFloatingActionButtonComponent;
    const addButtonElement = () => {
      const button = document.createElement('button');
      const icon = document.createElement('i');
      icon.classList.add('tyler-icons');
      icon.textContent = 'add';
      button.appendChild(icon);
      component.appendChild(button);
    }; 
    if (hasButton) addButtonElement();
    fixture.appendChild(component);
    if (append) document.body.appendChild(fixture);
    return {
      component,
      getButtonElement: () => component.querySelector('button') as HTMLButtonElement,
      getIconElement: () => component.querySelector('i') as HTMLElement,
      addButtonElement,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

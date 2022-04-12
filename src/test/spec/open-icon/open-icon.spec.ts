import { defineOpenIconComponent, IOpenIconComponent, OPEN_ICON_CONSTANTS } from '@tylertech/forge/open-icon';
import { IIconComponent } from '@tylertech/forge/icon';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { ICON_CONSTANTS } from '@tylertech/forge';

interface ITestContext {
  context: ITestOpenIconContext;
}

interface ITestOpenIconContext {
  component: IOpenIconComponent;
  destroy(): void;
}


describe('OpenIconComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    defineOpenIconComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be connected', function(this: ITestContext) {
    this.context = setupTestContext();
    document.body.appendChild(this.context.component);
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should have a shadow root', function(this: ITestContext) {
    this.context = setupTestContext();
    document.body.appendChild(this.context.component);
    expect(this.context.component.shadowRoot).toBeDefined();
  });

  it('should not be open by default', function (this: ITestContext) {
    this.context = setupTestContext();
    document.body.appendChild(this.context.component);
    const root = getShadowElement(this.context.component, `.${OPEN_ICON_CONSTANTS.classes.ICON}`);
    expect(this.context.component.open).toBe(false);
    expect(root.classList.contains(OPEN_ICON_CONSTANTS.classes.ICON_OPEN)).toBe(false);
  });

  it('should be vertical orientation by default', function(this: ITestContext) {
    this.context = setupTestContext();
    document.body.appendChild(this.context.component);
    const iconElement = getShadowElement(this.context.component, ICON_CONSTANTS.elementName) as IIconComponent;
    expect(this.context.component.orientation).toBe(OPEN_ICON_CONSTANTS.strings.ORIENTATION_VERTICAL);
    expect(iconElement.name).toBe('keyboard_arrow_down');
  });

  it('should render open when property set by default', async function (this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;
    document.body.appendChild(this.context.component);
    await tick();
    const root = getShadowElement(this.context.component, `.${OPEN_ICON_CONSTANTS.classes.ICON}`);
    expect(root.classList.contains(OPEN_ICON_CONSTANTS.classes.ICON_OPEN)).toBe(true);
  });

  it('should render open when attribute set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN, 'true');
    document.body.appendChild(this.context.component);
    await tick();
    const root = getShadowElement(this.context.component, `.${OPEN_ICON_CONSTANTS.classes.ICON}`);
    expect(root.classList.contains(OPEN_ICON_CONSTANTS.classes.ICON_OPEN)).toBe(true);
  });

  it('should render in alternate orientation when property set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.orientation = OPEN_ICON_CONSTANTS.strings.ORIENTATION_HORIZONTAL;
    document.body.appendChild(this.context.component);
    await tick();
    const iconElement = getShadowElement(this.context.component, ICON_CONSTANTS.elementName) as IIconComponent;
    expect(iconElement.name).toBe('keyboard_arrow_right');
  });
  
  it('should render in alternate orientation when attribute set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(OPEN_ICON_CONSTANTS.attributes.ORIENTATION, OPEN_ICON_CONSTANTS.strings.ORIENTATION_HORIZONTAL);
    document.body.appendChild(this.context.component);
    await tick();
    const iconElement = getShadowElement(this.context.component, ICON_CONSTANTS.elementName) as IIconComponent;
    expect(iconElement.name).toBe('keyboard_arrow_right');
  });

  it('should not render open if open is set to false via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN, 'false');
    document.body.appendChild(this.context.component);
    await tick();
    const root = getShadowElement(this.context.component, `.${OPEN_ICON_CONSTANTS.classes.ICON}`);
    expect(this.context.component.open).toBe(false);
    expect(root.classList.contains(OPEN_ICON_CONSTANTS.classes.ICON_OPEN)).toBe(false);
  });

  function setupTestContext(): ITestOpenIconContext {
    let component = document.createElement('forge-open-icon') as IOpenIconComponent;    
    return {
      component,
      destroy: () => removeElement(component)
    };
  }
});

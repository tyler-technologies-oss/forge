import { removeElement } from '@tylertech/forge-core';
import { APP_BAR_MENU_BUTTON_CONSTANTS, defineAppBarMenuButtonComponent, IAppBarMenuButtonComponent } from '@tylertech/forge/app-bar/menu-button';

interface ITestContext {
  context: IAppBarTestMenuButtonContext;
}

interface IAppBarTestMenuButtonContext {
  component: IAppBarMenuButtonComponent;
  fixture: HTMLElement;
  destroy(): void;
}

describe('MenuButtonComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAppBarMenuButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should bubble click event through to parent', function(this: ITestContext) {
    this.context = setupTestContext();
    const callback = jasmine.createSpy('callback');
    this.context.fixture.addEventListener('click', callback);
    this.context.component.click();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  function setupTestContext(): IAppBarTestMenuButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'menu-button-test-fixture';
    const component = document.createElement(APP_BAR_MENU_BUTTON_CONSTANTS.elementName) as IAppBarMenuButtonComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      fixture,
      destroy: () => removeElement(fixture)
    };
  }
  
});

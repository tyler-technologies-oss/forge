import { APP_BAR_HELP_BUTTON_CONSTANTS, defineAppBarHelpButtonComponent, IAppBarHelpButtonComponent } from '@tylertech/forge/app-bar/help-button';
import { IMenuOption } from '@tylertech/forge';
import { removeElement } from '@tylertech/forge-core';

const options: IMenuOption<string>[] = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2' },
  { label: 'three', value: '3' }
];

interface ITestContext {
  context: ITestAppBarHelpButtonContext;
}

interface ITestAppBarHelpButtonContext {
  component: IAppBarHelpButtonComponent;
  destroy(): void;
}

describe('AppBarHelpButtonComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAppBarHelpButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should set options via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.options = options;
    expect(this.context.component['_foundation']['_options'].length).toBe(3);
  })

  function setupTestContext(): ITestAppBarHelpButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'app-bar-help-button-test-fixture';
    const component = document.createElement(APP_BAR_HELP_BUTTON_CONSTANTS.elementName) as IAppBarHelpButtonComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
  
});

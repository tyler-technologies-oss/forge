import { PageStateComponent, PAGE_STATE_CONSTANTS, definePageStateComponent } from '@tylertech/forge/page-state';
import { removeElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestPageStateContext
}

interface ITestPageStateContext {
  component: PageStateComponent;
  destroy(): void;
}


describe('PageStateComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    definePageStateComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();

    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  function setupTestContext(): ITestPageStateContext {
    const fixtureContainer = document.createElement('div');
    const component = document.createElement(PAGE_STATE_CONSTANTS.elementName);
    
    fixtureContainer.appendChild(component);
    document.body.appendChild(fixtureContainer);

    return {
      component,
      destroy: () => removeElement(fixtureContainer)
    };
  }
});

import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { defineDividerComponent, DividerComponent, DIVIDER_CONSTANTS, IDividerComponent } from '@tylertech/forge';

interface ITestContext {
  context: ITestDividerContext;
}

interface ITestDividerContext {
  component: IDividerComponent;
  destroy(): void;
}

describe('DividerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineDividerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should connect when attache', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should connect when attach', function(this: ITestContext) {
    this.context = setupTestContext();
    
    const component = new DividerComponent();
    document.body.appendChild(component);
    expect(component.isConnected).toBe(true);
    removeElement(component);
  });

  it('should change border-bottom-width if --forge-divider-width property set', function(this: ITestContext) {
    this.context = setupTestContext();
    const width = '10px';
    document.body.style.setProperty('--forge-divider-width', width);
    const dividerWidth = getComputedStyle(getShadowElement(this.context.component, DIVIDER_CONSTANTS.classes.ROOT)).borderBottomWidth;

    expect(dividerWidth).toBe(width);
  });

  it('should change margin if --forge-divider-width property set', function(this: ITestContext) {
    this.context = setupTestContext();
    const margin = '10px';
    document.body.style.setProperty('--forge-divider-margin', margin);
    const dividermargin = getComputedStyle(getShadowElement(this.context.component, DIVIDER_CONSTANTS.classes.ROOT)).margin;

    expect(dividermargin).toBe(margin);
  });

  function setupTestContext(): ITestDividerContext {
    const fixture = document.createElement('div');
    fixture.id = 'divider-test-fixture';
    const component = document.createElement(DIVIDER_CONSTANTS.elementName);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
});

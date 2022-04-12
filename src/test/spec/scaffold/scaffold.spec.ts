import { defineScaffoldComponent, IScaffoldComponent, SCAFFOLD_CONSTANTS } from '@tylertech/forge/scaffold';
import { removeElement, getShadowElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestScaffoldContext
}

interface ITestScaffoldContext {
  component: IScaffoldComponent;
  append(): void;
  destroy(): void;
}

describe('ScaffoldComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineScaffoldComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be connected', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should attach shadow template', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.shadowRoot).toBeDefined();
    expect(this.context.component.shadowRoot!.childNodes.length).toBeGreaterThan(0);
  });

  it('should contains all slots', function(this: ITestContext) {
    this.context = setupTestContext();
    const headerSlot = getShadowElement(this.context.component, 'slot[name=header]') as HTMLSlotElement;
    const bodyLeftSlot = getShadowElement(this.context.component, 'slot[name=body-left]') as HTMLSlotElement;
    const bodySlot = getShadowElement(this.context.component, 'slot[name=body]') as HTMLSlotElement;
    const bodyRightSlot = getShadowElement(this.context.component, 'slot[name=body-right]') as HTMLSlotElement;
    const bodyFooterSlot = getShadowElement(this.context.component, 'slot[name=body-footer]') as HTMLSlotElement;
    const footerSlot = getShadowElement(this.context.component, 'slot[name=footer]') as HTMLSlotElement;

    expect(headerSlot).not.toBeNull();
    expect(bodyLeftSlot).not.toBeNull();
    expect(bodySlot).not.toBeNull();
    expect(bodyRightSlot).not.toBeNull();
    expect(bodyFooterSlot).not.toBeNull();
    expect(footerSlot).not.toBeNull();
  });

  function setupTestContext(append = false): ITestScaffoldContext {
    const fixture = document.createElement('div');
    fixture.id = 'scaffold-test-fixture';
    const component = document.createElement(SCAFFOLD_CONSTANTS.elementName) as IScaffoldComponent;
    fixture.appendChild(component);
    if (append) document.body.appendChild(fixture);
    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

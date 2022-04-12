import { tick } from '@tylertech/forge-testing';
import { CardComponent, CARD_CONSTANTS, defineCardComponent, ICardComponent } from '@tylertech/forge/card';
import { getShadowElement, removeElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestCardContext;
}

interface ITestCardContext {
  component: ICardComponent;
  destroy(): void;
}

describe('CardComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineCardComponent();
  });

  beforeEach(function(this: ITestContext) {    
    this.context = setupTestContext();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component with shadow dom', function(this: ITestContext) {
    expect(this.context.component.shadowRoot).toBeDefined();
  });

  it('should be raised by default', function(this: ITestContext) {
    expect(this.context.component.outlined).toBe(false);
    expect(getRootElement(this.context.component).classList.contains(CARD_CONSTANTS.classes.OUTLINED)).toBe(false);
  });

  it('should have padding by default', function(this: ITestContext) {
    const rootElement = getRootElement(this.context.component);
    expect(getComputedStyle(rootElement).padding).toBe('16px');
  });

  it('should set outlined class', function(this: ITestContext) {
    this.context.component.outlined = true;
    expect(getRootElement(this.context.component).classList.contains(CARD_CONSTANTS.classes.OUTLINED)).toBe(true);
  });

  it('should set outlined class when attribute is set', function(this: ITestContext) {
    this.context.component.setAttribute(CARD_CONSTANTS.attributes.OUTLINED, 'true');
    expect(this.context.component.outlined).toBe(true);
    expect(getRootElement(this.context.component).classList.contains(CARD_CONSTANTS.classes.OUTLINED)).toBe(true);
  });

  it('should project content into default slot', function(this: ITestContext) {
    const div = document.createElement('div');
    div.textContent = 'some content';
    this.context.component.appendChild(div);
    
    const defaultSlot = getShadowElement(this.context.component, 'slot:not([name])') as HTMLSlotElement;
    const nodes = defaultSlot.assignedNodes();

    expect(nodes.length).toBe(1);
    expect(nodes[0].textContent).toBe(div.textContent);
  });

  it('should remove outlined attribute if invalid value is provided', async function(this: ITestContext) {
    this.context.component.outlined = true;
    expect(this.context.component.getAttribute(CARD_CONSTANTS.attributes.OUTLINED)).toBe('true');

    await tick();

    this.context.component.outlined = undefined as any;
    expect(this.context.component.hasAttribute(CARD_CONSTANTS.attributes.OUTLINED)).toBe(false);
    expect(this.context.component.outlined).toBe(false);
  });

  function setupTestContext(): ITestCardContext {
    const fixture = document.createElement('div');
    fixture.id = 'card-test-fixture';
    const component = document.createElement(CARD_CONSTANTS.elementName) as ICardComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function getRootElement(component: ICardComponent): HTMLElement {
    return getShadowElement(component, CARD_CONSTANTS.selectors.ROOT);
  }
});

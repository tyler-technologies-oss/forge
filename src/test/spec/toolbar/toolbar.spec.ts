import { IToolbarComponent, TOOLBAR_CONSTANTS, defineToolbarComponent } from '@tylertech/forge/toolbar';
import { removeElement, getShadowElement } from '@tylertech/forge-core';

interface ITestContext {
  context: IToolbarTestContext;
}

interface IToolbarTestContext {
  fixture: HTMLElement;
  component: IToolbarComponent;
  append(): void;
  destroy(): void;
}

describe('ToolbarComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineToolbarComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component with shadow dom', function(this: ITestContext) {
    this.context = setupTestContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  describe('with default attribute values', function(this: ITestContext) {
    it('should set the inverted property to false when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();

      expect(this.context.component.inverted).toBe(false);
    });
  });

  describe('without default values', function(this: ITestContext) {
    it('should set the inverted property to true when the attribute is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED, 'true');

      expect(this.context.component.inverted).toBe(true);
    });

    it('should set the inverted property to false when the attribute is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(TOOLBAR_CONSTANTS.attributes.INVERTED, 'false');

      expect(this.context.component.inverted).toBe(false);
    });
  });

  describe('should project', function(this: ITestContext) {
    it('start content into start slot', function(this: ITestContext) {
      this.context = setupTestContext();
      const div = document.createElement('div');
      div.slot = 'start';
      div.textContent = 'test content';
      this.context.component.appendChild(div);
      const startSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.START_SLOT) as HTMLSlotElement;
      const centerSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.CENTER_SLOT) as HTMLSlotElement;
      const endSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
  
      expect(startSlot.assignedNodes().length).toBe(1);
      expect(centerSlot.assignedNodes().length).toBe(0);
      expect(endSlot.assignedNodes().length).toBe(0);
      expect(startSlot.assignedNodes()[0].textContent).toBe(div.textContent);
    });
  
    it('center content into center slot', function(this: ITestContext) {
      this.context = setupTestContext();
      const div = document.createElement('div');
      div.slot = 'center';
      div.textContent = 'test content';
      this.context.component.appendChild(div);
      const startSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.START_SLOT) as HTMLSlotElement;
      const centerSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.CENTER_SLOT) as HTMLSlotElement;
      const endSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
  
      expect(startSlot.assignedNodes().length).toBe(0);
      expect(centerSlot.assignedNodes().length).toBe(1);
      expect(endSlot.assignedNodes().length).toBe(0);
      expect(centerSlot.assignedNodes()[0].textContent).toBe(div.textContent);
    });
  
    it('end content into end slot', function(this: ITestContext) {
      this.context = setupTestContext();
      const div = document.createElement('div');
      div.slot = 'end';
      div.textContent = 'test content';
      this.context.component.appendChild(div);
      const startSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.START_SLOT) as HTMLSlotElement;
      const centerSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.CENTER_SLOT) as HTMLSlotElement;
      const endSlot = getShadowElement(this.context.component, TOOLBAR_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
  
      expect(startSlot.assignedNodes().length).toBe(0);
      expect(centerSlot.assignedNodes().length).toBe(0);
      expect(endSlot.assignedNodes().length).toBe(1);
      expect(endSlot.assignedNodes()[0].textContent).toBe(div.textContent);
    });
  });

  function setupTestContext(append = true): IToolbarTestContext {
    const fixture = document.createElement('div');
    const component = document.createElement('forge-toolbar');
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      fixture,
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

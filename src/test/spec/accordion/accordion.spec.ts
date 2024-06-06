import { IAccordionComponent, ACCORDION_CONSTANTS, defineAccordionComponent, IAccordionCore } from '@tylertech/forge/accordion';
import { EXPANSION_PANEL_CONSTANTS, IExpansionPanelComponent } from '@tylertech/forge/expansion-panel';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestAccordionContext;
}

interface ITestAccordionContext {
  fixture: HTMLElement;
  component: IAccordionComponent;
  core: IAccordionCore;
  expansionPanelElements: IExpansionPanelComponent[];
  destroy(): void;
}

describe('AccordionComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAccordionComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('panel selector', function(this: ITestContext) {
    it('should set panel selector via property', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.panelSelector = '.test-selector';
      expect(this.context.component.panelSelector).toBe('.test-selector');
      this.context.component.panelSelector = '.test2-selector';
      expect(this.context.component.panelSelector).toBe('.test2-selector');
    });

    it('should get panels by selector when the accordion listens for interaction', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.panelSelector = '.test-selector';
      expect(this.context.component.panelSelector).toBe('.test-selector');
      const hostInteractionSpy = spyOn(this.context.component['_core'], '_hostInteraction');
      
      expect(hostInteractionSpy.calls.count()).toBe(0);

      const panels = getPanels(this.context.component);
      const firstPanel = panels[0];

      await tick();
      (<HTMLElement>firstPanel.querySelector('[slot=header]')).click();
      expect(hostInteractionSpy.calls.count()).toBeGreaterThan(0);
      expect(firstPanel.open).toBe(true);
      expect(firstPanel.classList.contains('test-selector'));
      expect(panels.filter(p => p !== firstPanel).every(p => p.open)).toBe(false);
    });
  });

  describe('defaults with panels all closed', function(this: ITestContext) {
    it('should render with all panels closed', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(getPanels(this.context.component).every(p => p.open)).toBe(false);
    });

    it('should open a single panel when clicked', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const panels = getPanels(this.context.component);
      const firstPanel = panels[0];

      (<HTMLElement>firstPanel.querySelector('[slot=header]')).click();
      expect(firstPanel.open).toBe(true);
      expect(panels.filter(p => p !== firstPanel).every(p => p.open)).toBe(false);
    });

    it('should close open panel when closed panel is clicked', async function(this: ITestContext) {
      this.context = setupTestContext(true);

      const panels = getPanels(this.context.component);

      clickPanel(panels[0]);
      clickPanel(panels[1]);

      expect(panels[0].open).toBe(false);
      expect(panels[1].open).toBe(true);
      expect(panels.filter(p => p !== panels[1]).every(p => p.open)).toBe(false);
    });

    it('should ignore events from nested panels', async function(this: ITestContext) {
      this.context = setupTestContext(true);

      // Add a nested panel to the first child panel
      const nestedPanel = _createPanel();
      const firstPanel = getPanels(this.context.component)[0];
      firstPanel.appendChild(nestedPanel);
      await tick();

      // Click the first child panel to expand it
      clickPanel(firstPanel);
      await tick();
      await timer(500);
      
      // Ensure we're in the proper state to run the test from here
      expect(firstPanel.open).toBe(true, 'Expected the first panel to be open before testing inner panel');

      // Click the inner panel and evaluate result
      clickPanel(nestedPanel);

      await tick();
      await timer(500);

      expect(firstPanel.open).toBe(true, 'Expected the first panel to still be open after clicking nested panel');
    });
  });

  function _createFixture(): HTMLElement {
    const fixture = document.createElement('div');
    fixture.id = 'accordion-test-fixture';
    return fixture;
  }

  function _createPanel(): IExpansionPanelComponent {
    const panel = document.createElement(EXPANSION_PANEL_CONSTANTS.elementName) as IExpansionPanelComponent;
      
    const header = document.createElement('div');
    header.slot = 'header';
    header.textContent = 'Header';
    panel.appendChild(header);
    
    const content = document.createElement('div');
    content.textContent = 'Content';
    panel.appendChild(content);

    return panel;
  }

  function setupTestContext(append?: boolean): ITestAccordionContext {
    const fixture = _createFixture();
    const component = document.createElement(ACCORDION_CONSTANTS.elementName) as IAccordionComponent;
    const expansionPanelElements: IExpansionPanelComponent[] = [];
    for (let i = 0; i < 3; i++) {
      const expansionPanel = _createPanel();
      expansionPanelElements.push(expansionPanel);
      component.appendChild(expansionPanel);
    }
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      fixture,
      component,
      core: component['_core'] as IAccordionCore,
      expansionPanelElements,
      destroy: () => removeElement(fixture)
    };
  }

  function clickPanel(panel: IExpansionPanelComponent): void {
    const panelHeader = getShadowElement(panel, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);
    if (panelHeader) {
      panelHeader.click();
    }
  }

  function getPanels(accordion: IAccordionComponent): IExpansionPanelComponent[] {
    const children = Array.from(accordion.children) as HTMLElement[];
    return children.filter(child => child.tagName.toLocaleLowerCase() === EXPANSION_PANEL_CONSTANTS.elementName) as IExpansionPanelComponent[];
  }
});

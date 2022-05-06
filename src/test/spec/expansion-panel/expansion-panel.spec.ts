import { defineExpansionPanelComponent, IExpansionPanelComponent, EXPANSION_PANEL_CONSTANTS, ExpansionPanelComponent } from '@tylertech/forge/expansion-panel';
import { defineOpenIconComponent, OPEN_ICON_CONSTANTS, IOpenIconComponent } from '@tylertech/forge/open-icon';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { timer, dispatchKeyEvent, tick } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestExpansionPanelContext
}

interface ITestExpansionPanelContext {
  component: IExpansionPanelComponent;
  headerElement: HTMLElement;
  append(): void;
  destroy(): void;
}


describe('ExpansionPanelComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineExpansionPanelComponent();
    defineOpenIconComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('default values for component when inserted into DOM', function(this: ITestContext) {
    it('should render expanded via property', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.open = true;
      this.context.append();
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should render expanded via attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN, 'true');
      this.context.append();
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should use horizontal orientation', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(EXPANSION_PANEL_CONSTANTS.attributes.ORIENTATION, EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL);
      this.context.append();
      expect(this.context.component.open).toBe(false);
      expect(getInternalPanelContent(this.context.component).clientWidth).toBe(0);
    });

    it('should render open in horizontal orientation', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.orientation = EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL;
      this.context.component.open = true;
      this.context.append();
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientWidth).toBeGreaterThan(0);
    });

    it('should open horizontally', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.orientation = EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_HORIZONTAL;
      this.context.append();
      expect(getInternalPanelContent(this.context.component).clientWidth).toBe(0);
      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(getInternalPanelContent(this.context.component).clientWidth).toBeGreaterThan(0);
    });

    it('should set hidden visibility style by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.append();
      await tick();

      expect(getInternalPanelContent(this.context.component).style.visibility).toBe('hidden');
    });

    it('should remove hidden visibility style when expanded', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.append();
      await tick();

      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      await tick();

      expect(getInternalPanelContent(this.context.component).style.visibility).not.toBe('hidden');
    });

    it('should remove visibility style if open by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN, '');
      this.context.append();
      await tick();

      expect(getInternalPanelContent(this.context.component).style.visibility).not.toBe('hidden');
    });

    it('should set hidden visibility style when collapsed after being expanded', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.append();
      await tick();

      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      await tick();

      expect(getInternalPanelContent(this.context.component).style.visibility).not.toBe('hidden');

      this.context.component.open = false;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      await tick();

      expect(getInternalPanelContent(this.context.component).style.visibility).toBe('hidden');
    });
  });

  describe('interaction with component in DOM already', function(this: ITestContext) {
    it('should be connected', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.isConnected).toBe(true);
    });

    it('should be instantiated', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component instanceof ExpansionPanelComponent).toBe(true);
    });

    it('should be collapsed by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.open).toBe(false);
    });

    it('should set aria-expanded by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.headerElement.hasAttribute('aria-expanded')).toBe(true);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not display content by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
      expect(getInternalPanelContent(this.context.component).style.opacity).toBe('0');
    });

    it('should be vertical orientation by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.orientation).toBe(EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_VERTICAL);
    });

    it('should expand when set to open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });
    
    it('should collapse after being opened', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      this.context.component.open = false;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(false);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
    });
    
    it('should expand using toggle method', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.toggle();
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);    
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should call open callback before opening', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const callback = jasmine.createSpy('openCallback');
      this.context.component.openCallback = callback;
      this.context.component.open = true;
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not open if open callback promise is rejected', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.openCallback = () => Promise.reject();
      this.context.component.open = true;
      expect(this.context.component.open).toBe(false);
    });

    it('should call close callback before closing', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const callback = jasmine.createSpy('openCallback');
      this.context.component.closeCallback = callback;
      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      this.context.component.open = false;
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not close if close callback promise is rejected', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.closeCallback = () => Promise.reject();
      this.context.component.open = true;
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      this.context.component.open = false;
      expect(this.context.component.open).toBe(true);
    });

    it('should open when clicking the panel header element', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      getPanelHeader(this.context.component).click();
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should close when clicking the panel header element', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const panelHeader = getPanelHeader(this.context.component);
      panelHeader.click();
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      panelHeader.click();
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(false);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
    });

    it('should open when pressing enter key while header element is focused', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      dispatchKeyEvent(getPanelHeader(this.context.component), 'keydown', 'Enter');
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should open when pressing space key while header element is focused', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      dispatchKeyEvent(getPanelHeader(this.context.component), 'keydown', 'Space');
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(true);
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should emit toggle event when expanded', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const listener = jasmine.createSpy('toggle listener');
      this.context.component.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, listener);
      getPanelHeader(this.context.component).click();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit toggle event when collapsed', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const listener = jasmine.createSpy('toggle listener');
      this.context.component.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, listener);
      const panelHeader = getPanelHeader(this.context.component);
      panelHeader.click();
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      panelHeader.click();
      expect(listener).toHaveBeenCalledTimes(2);
    });

    it('should set aria-expanded', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.open = true;
      await tick();
      await tick();
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should hide header element if nothing is slotted in', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const internalHeader = getShadowElement(this.context.component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);
      await tick();
      removeElement(getPanelHeader(this.context.component));
      await tick();
      expect(getComputedStyle(internalHeader).display).toBe('none');
    });

    it('should expand even if there is no slotted content', async function(this: ITestContext) {      
      this.context = setupTestContext(true);
      removeElement(getPanelContent(this.context.component));
      await tick();
      this.context.component.open = true;
      await tick();

      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
    });

    it('should collapse even if there is no slotted content', async function(this: ITestContext) {      
      this.context = setupTestContext(true);
      removeElement(getPanelContent(this.context.component));
      await tick();
      this.context.component.open = true;
      await tick();
      this.context.component.open = false;
      await tick();

      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('false');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
    });

    it('should handle double clicks to only toggle once', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const panelHeader = getPanelHeader(this.context.component);
      panelHeader.click();
      panelHeader.click();
      await timer(EXPANSION_PANEL_CONSTANTS.numbers.COLLAPSE_ANIMATION_DURATION);
      expect(this.context.component.open).toBe(true);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });
  });

  describe('without animations', function(this: ITestContext) {
    it('should be set to not use animations', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      expect(this.context.component.useAnimations).toBeFalse();
      expect(this.context.component.getAttribute(EXPANSION_PANEL_CONSTANTS.attributes.USE_ANIMATIONS)).toBe('false');
    });

    it('should set use animations via attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.useAnimations = true;
      this.context.component.setAttribute(EXPANSION_PANEL_CONSTANTS.attributes.USE_ANIMATIONS, 'false');
      expect(this.context.component.useAnimations).toBeFalse();
      expect(this.context.component.getAttribute(EXPANSION_PANEL_CONSTANTS.attributes.USE_ANIMATIONS)).toBe('false');
    });

    it('should open immediately', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();

      getPanelHeader(this.context.component).click();
      expect(this.context.component.open).toBe(true);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should open immediately horizontal', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.orientation = 'horizontal';
      getPanelHeader(this.context.component).click();

      expect(this.context.component.open).toBe(true);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
      expect(getInternalPanelContent(this.context.component).clientWidth).toBeGreaterThan(0);
    });

    it('should close immediately', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.setOpenImmediate(true);
      getPanelHeader(this.context.component).click();

      expect(this.context.component.open).toBe(false);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('false');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
    });

    it('should close immediately horizontal', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.orientation = 'horizontal';
      this.context.component.setOpenImmediate(true);

      getPanelHeader(this.context.component).click();

      expect(this.context.component.open).toBe(false);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('false');
      expect(getInternalPanelContent(this.context.component).clientWidth).toBe(0);
    });

    it('should open immediately via method', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.setOpenImmediate(true);

      expect(this.context.component.open).toBe(true);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBeGreaterThan(0);
    });

    it('should close immediately via method', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.setOpenImmediate(true);
      await tick();
      this.context.component.setOpenImmediate(false);

      expect(this.context.component.open).toBe(false);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('false');
      expect(getInternalPanelContent(this.context.component).clientHeight).toBe(0);
    });

    it('should open and close immediately using horizontal orientation', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.useAnimations = false;
      this.context.append();
      this.context.component.orientation = 'horizontal';

      this.context.component.setOpenImmediate(true);
      expect(this.context.component.open).toBe(true);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('true');
      expect(getInternalPanelContent(this.context.component).clientWidth).toBeGreaterThan(0);

      await tick();

      this.context.component.setOpenImmediate(false);
      expect(this.context.component.open).toBe(false);
      expect(this.context.headerElement.getAttribute('aria-expanded')).toBe('false');
      expect(getInternalPanelContent(this.context.component).clientWidth).toBe(0);
    });
  });

  function setupTestContext(append = false): ITestExpansionPanelContext {
    const fixture = document.createElement('div');
    fixture.id = 'expansion-panel-test-fixture';
    const component = document.createElement(EXPANSION_PANEL_CONSTANTS.elementName) as IExpansionPanelComponent;

    const header = document.createElement('div');
    header.slot = 'header';
    header.textContent = 'Click me';
    
    const openIcon = document.createElement(OPEN_ICON_CONSTANTS.elementName) as IOpenIconComponent;
    header.appendChild(openIcon);

    const content = document.createElement('div');
    content.id = 'panel-content';
    content.textContent = 'Expandable content';

    component.appendChild(header);
    component.appendChild(content);

    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }
  
    const headerElement = getShadowElement(component, EXPANSION_PANEL_CONSTANTS.selectors.HEADER);

    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture),
      headerElement
    };
  }

  function getInternalPanelContent(component: IExpansionPanelComponent): HTMLElement {
    return getShadowElement(component, EXPANSION_PANEL_CONSTANTS.selectors.CONTENT);
  }

  function getPanelHeader(component: IExpansionPanelComponent): HTMLElement {
    return component.querySelector('[slot=header]') as HTMLElement;
  }

  function getPanelContent(component: IExpansionPanelComponent): HTMLElement {
    return component.querySelector('#panel-content') as HTMLElement;
  }

});

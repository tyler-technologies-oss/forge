import { AppBarSearchComponent, defineAppBarSearchComponent, APP_BAR_SEARCH_CONSTANTS, defineAppBarComponent, IAppBarSearchComponent } from '@tylertech/forge';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { dispatchKeyEvent } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestAppBarSearchContext;
}

interface ITestAppBarSearchContext {
  component: IAppBarSearchComponent;
  getRootElement(): HTMLElement;
  getInputElement(): HTMLInputElement;
  destroy(): void;
}

describe('AppBarSearchComponent', function(this: ITestContext) {  
  beforeAll(function(this: ITestContext) {
    defineAppBarComponent();
    defineAppBarSearchComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.isConnected).toBe(true, 'Component should be connected.');
    expect(this.context.component instanceof AppBarSearchComponent).toBe(true, 'Component should be an instance of SearchFieldComponent.');
  });

  it('should contain a shadow root', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  describe('disabled', function(this: ITestContext) {
    it('should not be disabled by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.disabled).toBe(false, 'component is disabled');
      expect(this.context.getInputElement().disabled).toBe(false, 'this.context.getInputElement() is disabled');
    });

    it('should set disabled state when component disabled property set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.disabled = true;
      expect(this.context.component.disabled).toBe(true, 'component was not disabled');
      expect(this.context.getInputElement().disabled).toBe(true, 'this.context.getInputElement() was not disabled');
      expect(this.context.getRootElement().classList.contains(APP_BAR_SEARCH_CONSTANTS.classes.DISABLED)).toBe(true, 'root does not contain disabled class');
    });

    it('should remove disabled state when component disabled property set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.disabled = true;
      expect(this.context.component.disabled).toBe(true, 'component was not disabled');
      expect(this.context.getInputElement().disabled).toBe(true, 'this.context.getInputElement() was not disabled');

      this.context.component.disabled = false;
      expect(this.context.component.disabled).toBe(false, 'component is disabled');
      expect(this.context.getInputElement().disabled).toBe(false, 'this.context.getInputElement() is disabled');
      expect(this.context.getRootElement().classList.contains(APP_BAR_SEARCH_CONSTANTS.classes.DISABLED)).toBe(false, 'root contains disabled class');
    });

    it('should set disabled state when component disabled attribute set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED, '');
      expect(this.context.component.disabled).toBe(true, 'component was not disabled');
      expect(this.context.getInputElement().disabled).toBe(true, 'this.context.getInputElement() was not disabled');
      expect(this.context.getRootElement().classList.contains(APP_BAR_SEARCH_CONSTANTS.classes.DISABLED)).toBe(true, 'root does not contain disabled class');
    });

    it('should remove disabled state when component disabled attribute set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED, '');
      expect(this.context.component.disabled).toBe(true, 'component was not disabled');
      expect(this.context.getInputElement().disabled).toBe(true, 'this.context.getInputElement() was not disabled');
      
      this.context.component.removeAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED);
      expect(this.context.component.disabled).toBe(false, 'component is disabled');
      expect(this.context.getInputElement().disabled).toBe(false, 'this.context.getInputElement() is disabled');
      expect(this.context.getRootElement().classList.contains(APP_BAR_SEARCH_CONSTANTS.classes.DISABLED)).toBe(false, 'root contains disabled class');
    });
  });

  describe('value', function(this: ITestContext) {
    it('should have no value by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.value).toBe('', 'component has non-empty value');
      expect(this.context.getInputElement().value).toBe('', 'this.context.getInputElement() has non-empty value');
    });

    it('should set input value when component value property is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const expectedValue = 'test value';
      this.context.component.value = expectedValue;
      expect(this.context.component.value).toBe(expectedValue, 'component value does not match expected value');
      expect(this.context.getInputElement().value).toBe(expectedValue, 'this.context.getInputElement() value does not match expected value');
    });

    it('should set input value when component value attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const expectedValue = 'test value';
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.VALUE, expectedValue);
      expect(this.context.component.value).toBe(expectedValue, 'component value does not match expected value');
      expect(this.context.getInputElement().value).toBe(expectedValue, 'this.context.getInputElement() value does not match expected value');
    });
  });

  describe('placeholder', function(this: ITestContext) {
    it('should have no placeholder by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.getInputElement().placeholder).toBe('', 'this.context.getInputElement() has non-empty placeholder');
    });

    it('should set input placeholder when component placeholder property is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const expectedPlaceholder = 'test placeholder';
      this.context.component.placeholder = expectedPlaceholder;
      expect(this.context.getInputElement().placeholder).toBe(expectedPlaceholder, 'this.context.getInputElement() placeholder does not match expected placeholder');
    });

    it('should set input placeholder when component placeholder attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const expectedPlaceholder = 'test placeholder';
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.PLACEHOLDER, expectedPlaceholder);
      expect(this.context.getInputElement().placeholder).toBe(expectedPlaceholder, 'this.context.getInputElement() placeholder does not match expected placeholder');
    });
  });

  describe('combined', function(this: ITestContext) {
    it('should not enable combined by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.combined).toBe(false, 'combined is enabled');
      const contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).toBeNull('context element exists');
    });

    it('should add the context element to dom when component combined property set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.combined = true;
      expect(this.context.component.combined).toBe(true, 'combined is not enabled');
      const contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).not.toBeNull('context element does not exists');
    });

    it('should remove the context element from the dom when component combined property set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.combined = true;
      expect(this.context.component.combined).toBe(true, 'combined is not enabled');
      let contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).not.toBeNull('context element does not exists');

      this.context.component.combined = false;
      expect(this.context.component.combined).toBe(false, 'combined is enabled');
      contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).toBeNull('context element does exists');
    });

    it('should add the context element to dom when component combined attribute set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.COMBINED, '');
      expect(this.context.component.combined).toBe(true, 'combined is not enabled');
      const contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).not.toBeNull('context element does not exists');
    });

    it('should remove the context element from the dom when component combined attribute set to false/removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.COMBINED, '');
      expect(this.context.component.combined).toBe(true, 'combined is not enabled');
      let contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).not.toBeNull('context element does not exists');

      this.context.component.removeAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.COMBINED);
      expect(this.context.component.combined).toBe(false, 'combined is enabled');
      contextElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
      expect(contextElement).toBeNull('context element does exists');
    });

    it('should only set unique values', function(this: ITestContext) {
      this.context = setupTestContext();
      const setContextVisibilitySpy = spyOn(this.context.component['_foundation']['_adapter'], 'setContextVisibility');
      this.context.component.combined = true;
      this.context.component.combined = true;
      expect(setContextVisibilitySpy.calls.count()).toBe(1);
    });
  });

  describe('combinedOptions', function(this: ITestContext) {
    it('should have empty collection of combined options by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.combinedOptions).toEqual([], 'combinedOptions not an empty collection');
    });

    it('should set component\'s combinedOptions property', function(this: ITestContext) {
      this.context = setupTestContext();
      const expectedCombinedOptions = [
        {
          label: 'test label',
          value: 'test value',
        }
      ];

      this.context.component.combinedOptions = expectedCombinedOptions;
      expect(this.context.component.combinedOptions).toEqual(expectedCombinedOptions, 'combinedOptions not an empty collection');
    });
  });

  describe('selectedCombinedOption', function(this: ITestContext) {
    it('should have undefined value by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.selectedCombinedOption).toBeUndefined('selectedCombinedOption not undefined');
    });

    it('should set component\'s selectedCombinedOption property', function(this: ITestContext) {
      this.context = setupTestContext();
      const expectedSelectedCombinedOption = 'test value';
      this.context.component.selectedCombinedOption = expectedSelectedCombinedOption;
      expect(this.context.component.selectedCombinedOption).toBe(expectedSelectedCombinedOption, 'selectedCombinedOption does not have the expecteed value');
    });
  });

  describe('global', function(this: ITestContext) {
    it('should not enable global by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.global).toBe(false, 'global is enabled');
      const globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).toBeNull('global icon element exists');
    });

    it('should add the global icon element to dom when component global property set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.global = true;
      expect(this.context.component.global).toBe(true, 'global is not enabled');
      const globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).not.toBeNull('global icon element does not exists');
    });

    it('should remove the global icon element from the dom when component global property set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.global = true;
      expect(this.context.component.global).toBe(true, 'global is not enabled');
      let globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).not.toBeNull('global icon element does not exists');

      this.context.component.global = false;
      expect(this.context.component.global).toBe(false, 'global is enabled');
      globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).toBeNull('global icon element does exists');
    });

    it('should add the global icon element to dom when component global attribute set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.GLOBAL, '');
      expect(this.context.component.global).toBe(true, 'global is not enabled');
      const globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).not.toBeNull('global icon element does not exists');
    });

    it('should remove the global icon element from the dom when component global attribute set to false/removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.GLOBAL, '');
      expect(this.context.component.global).toBe(true, 'global is not enabled');
      let globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).not.toBeNull('global icon element does not exists');

      this.context.component.removeAttribute(APP_BAR_SEARCH_CONSTANTS.attributes.GLOBAL);
      expect(this.context.component.global).toBe(false, 'global is enabled');
      globalIconElement = getShadowElement(this.context.component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
      expect(globalIconElement).toBeNull('global icon element does exists');
    });

    it('should only set unique values', function(this: ITestContext) {
      this.context = setupTestContext();
      const setGlobalIconVisibilitySpy = spyOn(this.context.component['_foundation']['_adapter'], 'setGlobalIconVisibility');
      this.context.component.global = true;
      this.context.component.global = true;
      expect(setGlobalIconVisibilitySpy.calls.count()).toBe(1);
    });
  });

  describe('submit', function(this: ITestContext) {
    it('should emit submit event when enter is pressed', function(this: ITestContext) {
      this.context = setupTestContext();
      const emitHostEventSpy = spyOn(this.context.component['_foundation']['_adapter'], 'emitHostEvent');
      const input = this.context.getInputElement();
      input.focus();
      dispatchKeyEvent(input, 'keydown', 'h');
      dispatchKeyEvent(input, 'keydown', 'e');
      dispatchKeyEvent(input, 'keydown', 'l');
      dispatchKeyEvent(input, 'keydown', 'l');
      dispatchKeyEvent(input, 'keydown', 'o');
      dispatchKeyEvent(input, 'keydown', 'Enter');
      expect(emitHostEventSpy.calls.count()).toBe(1);
    });
  })

  function setupTestContext(): ITestAppBarSearchContext {
    const fixture = document.createElement('div');
    fixture.id = 'search-bar-test-fixture';
    const appBar = document.createElement('forge-app-bar');
    appBar.titleText = 'Title text';
    const component = document.createElement(APP_BAR_SEARCH_CONSTANTS.elementName) as IAppBarSearchComponent;
    component.slot = 'center';
    const inputElement = document.createElement('input') as HTMLInputElement;
    inputElement.type = 'text';
    component.appendChild(inputElement);
    appBar.appendChild(component);
    fixture.appendChild(appBar);
    document.body.appendChild(fixture);
    return {
      component,
      getRootElement: () => getShadowElement(component, APP_BAR_SEARCH_CONSTANTS.selectors.ROOT),
      getInputElement: () => component.querySelector('input') as HTMLInputElement,
      destroy: () => removeElement(fixture)
    };
  }
});

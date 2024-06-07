import { ForgeRippleFoundation } from '@tylertech/forge/ripple';
import { getShadowElement, removeAllChildren, removeElement, getActiveElement } from '@tylertech/forge-core';
import { dispatchKeyEvent, dispatchNativeEvent, tick, timer } from '@tylertech/forge-testing';
import { defineTabBarComponent, defineTabComponent, ITabBarComponent, ITabComponent, TabBarComponent, TAB_BAR_CONSTANTS, TAB_CONSTANTS } from '@tylertech/forge/tabs';

interface ITestContext {
  context: ITabBarTestContext;
}

interface ITabBarTestContext {
  component: ITabBarComponent;
  tabs: ITabComponent[];
  attach(): void;
  destroy(): void;
}

describe('TabBarComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineTabBarComponent();
    defineTabComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    expect(this.context.component.isConnected).toBe(true);
    expect(this.context.component instanceof TabBarComponent).toBe(true);
  });

  it('should initialize with proper default values', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    expect(this.context.component.activeTab).toBe(-1);
    expect(this.context.component.layoutMode).toBe('fixed');
    expect(this.context.component.layoutAlign).toBe('start');
    expect(this.context.component.underline).toBeFalse();
    expect(this.context.component.autoActivate).toBeFalse();
    expect(this.context.component.stacked).toBeFalse();
    expect(this.context.component.scrollButtons).toBeTrue();
    expect(this.context.component.forceScrollButtons).toBeFalse();
  });

  it('should initialize with tabs in fixed layout', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    expect(this.context.component.layoutMode).toBe('fixed');
    this.context.tabs.forEach(tab => {
      expect(tab.stretch).toBeTrue();
      expect(tab.hasAttribute(TAB_CONSTANTS.attributes.STRETCH)).toBeTrue();
    });
  });

  it('should initialize with underline', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.underline = true;
    this.context.attach();

    const rootElement = _getRootTabBarElement(this.context.component);
    expect(this.context.component.underline).toBeTrue();
    expect(this.context.component.hasAttribute(TAB_BAR_CONSTANTS.attributes.UNDERLINE)).toBeTrue();
    expect(rootElement.classList.contains(TAB_BAR_CONSTANTS.classes.UNDERLINED)).toBeTrue();
  });

  it('should toggle underline via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.underline = true;
    this.context.attach();

    this.context.component.removeAttribute(TAB_BAR_CONSTANTS.attributes.UNDERLINE);

    const rootElement = _getRootTabBarElement(this.context.component);
    expect(this.context.component.underline).toBeFalse();
    expect(this.context.component.hasAttribute(TAB_BAR_CONSTANTS.attributes.UNDERLINE)).toBeFalse();
    expect(rootElement.classList.contains(TAB_BAR_CONSTANTS.classes.UNDERLINED)).toBeFalse();
  });

  it('should not force a default active tab if one is not set', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    expect(this.context.component.activeTab).toBe(-1, 'Expect default active tab to be null');
    this.context.tabs.every(tab => {
      expect(tab.active).toBe(false);
      expect(tab.getAttribute('aria-selected')).toBe('false');
    });
    const otherTabs = this.context.tabs.slice(1);
    
    expect(this.context.tabs[0].tabIndex).toBe(0);
    otherTabs.every(t => expect(t.tabIndex).toBe(-1));
  });

  it('should set active tab via property', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    this.context.component.activeTab = 1;
    await tick();

    expect(this.context.component.activeTab).toBe(1);
    expect(this.context.component.getAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).toBe('1');
    _expectActiveTab(this.context.tabs[0], false);
    _expectActiveTab(this.context.tabs[1], true);
  });

  it('should set active tab via attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB, '1');
    await tick();

    expect(this.context.component.activeTab).toBe(1);
    _expectActiveTab(this.context.tabs[0], false);
    _expectActiveTab(this.context.tabs[1], true);
  });

  it('should set active tab via default attribute', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB, '1');
    this.context.attach();

    await tick();

    expect(this.context.component.activeTab).toBe(1, 'Expected active tab to match default attribute value');
    _expectActiveTab(this.context.tabs[0], false);
    _expectActiveTab(this.context.tabs[1], true);
  });

  it('should set active tab via default property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.activeTab = 1;
    this.context.attach();

    expect(this.context.component.activeTab).toBe(1, 'Expected active tab to match default property');
    expect(this.context.component.getAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).toBe('1', 'Expected host attribute to be added that matches active tab property');
    _expectActiveTab(this.context.tabs[0], false);
    _expectActiveTab(this.context.tabs[1], true);
  });

  it('should activate tab when clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    this.context.tabs[1].click();
    _expectActiveTab(this.context.tabs[1], true);
  });

  it('should deactivate previous tab when clicking new tab', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    this.context.tabs[2].click();

    await tick();

    this.context.tabs[0].click();

    _expectActiveTab(this.context.tabs[0], true);
    _expectActiveTab(this.context.tabs[2], false);
  });

  it('should initialize with no active tab, but first tab in tab order', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    expect(this.context.tabs[0].tabIndex).not.toBe(-1);
  });

  it('should initialize all tabs with proper role', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    this.context.tabs.forEach(tab => expect(tab.getAttribute('role')).toBe('tab'));
  });

  it('should set role on all tabs', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    expect(this.context.tabs.every(t => t.hasAttribute('role') && t.getAttribute('role') === 'tab')).toBe(true);
  });

  it('should detect new tabs', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    const newTab = createTab('Tab 4');
    this.context.component.appendChild(newTab);

    await tick();
    const newTabs = _getTabs(this.context.component);

    expect(newTabs.length).toBe(4, 'Expected to find 4 tabs after dynamically adding new tab');
    _expectActiveTab(newTabs[3], false);
  });

  it('should detect removed tabs', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    removeElement(this.context.tabs[1]);
    await tick();
    const newTabs = _getTabs(this.context.component);

    expect(newTabs.length).toBe(2);
  });

  it('should await tabs to be added if no children exist when connected', async function(this: ITestContext) {
    this.context = setupTestContext();
    removeAllChildren(this.context.component);
    this.context.attach();
    await tick();

    const newTab = createTab('New tab');
    this.context.component.appendChild(newTab);
    await tick();
    const newTabs = _getTabs(this.context.component);

    expect(newTabs.length).toBe(1);
  });

  it('should navigate to next tab with arrow key', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    await tick();

    _expectActiveTab(this.context.tabs[0], true, 'Expected first tab to be active');
    _expectActiveTab(this.context.tabs[1], false, 'Expected second tab not to be active');
    _expectFocusedTab(this.context.tabs[0], false, 'Expected first tab not to be focused');
    _expectFocusedTab(this.context.tabs[1], true, 'Expected second tab to be active');
    _expectHighlightedTab(this.context.tabs[0], false, 'Expected first tab not to be highlighted');
    _expectHighlightedTab(this.context.tabs[1], true, 'Expected second tab to be highlighted');
  });

  it('should navigate to previous tab with arrow key', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 1;
    this.context.tabs[1].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowLeft');
    await tick();

    _expectActiveTab(this.context.tabs[0], false, 'Expected first tab not to be active');
    _expectActiveTab(this.context.tabs[1], true, 'Expected second tab to be active');
    _expectFocusedTab(this.context.tabs[0], true, 'Expected first tab to be focused');
    _expectFocusedTab(this.context.tabs[1], false, 'Expected second tab not to be active');
    _expectHighlightedTab(this.context.tabs[0], true, 'Expected first tab to be highlighted');
    _expectHighlightedTab(this.context.tabs[1], false, 'Expected second tab not to be highlighted');
  });

  it('should wrap to end of tabs if left arrow is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowLeft');
    await tick();

    _expectHighlightedTab(this.context.tabs[0], false);
    _expectHighlightedTab(this.context.tabs[2], true);
  });

  it('should wrap to first tab if right arrow is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();

    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    await tick();
    _expectHighlightedTab(this.context.tabs[1], true);

    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    await tick();
    _expectHighlightedTab(this.context.tabs[2], true);

    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    await tick();

    _expectHighlightedTab(this.context.tabs[0], true);
    _expectHighlightedTab(this.context.tabs[1], false);
    _expectHighlightedTab(this.context.tabs[2], false);
  });

  it('should auto activate with arrow keys', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE, 'true');
    this.context.attach();

    this.context.component.activateTab(0);
    await tick();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');

    expect(this.context.component.autoActivate).toBeTrue();
    _expectActiveTab(this.context.tabs[0], false, 'Expected first tab not to be active');
    _expectActiveTab(this.context.tabs[1], true, 'Expected second tab to be active');
  });

  it('should skip disabled tabs when using keyboard navigation', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE, 'true');
    this.context.attach();

    this.context.tabs[1].disabled = true;
    this.context.component.activateTab(0);
    await tick();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    await tick();

    expect(this.context.tabs[1].disabled).toBeTrue();
    _expectActiveTab(this.context.tabs[0], false, 'Expected first tab not to be active');
    _expectActiveTab(this.context.tabs[1], false, 'Expected second tab not to be active');
    _expectActiveTab(this.context.tabs[2], true, 'Expected last tab to be active');
  });

  it('should ignore arrow keys if only one tab is enabled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE, 'true');
    this.context.attach();

    this.context.tabs[0].disabled = true;
    this.context.tabs[2].disabled = true;
    this.context.component.activateTab(1);
    await tick();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');
    await tick();

    _expectActiveTab(this.context.tabs[0], false, 'Expected first tab not to be active');
    _expectActiveTab(this.context.tabs[1], true, 'Expected second tab to be active');
    _expectActiveTab(this.context.tabs[2], false, 'Expected last tab not to be active');
  });

  it('should activate last tab if end key is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    this.context.component.autoActivate = true;
    dispatchKeyEvent(this.context.component, 'keydown', 'End');
    await tick();

    _expectActiveTab(this.context.tabs[2], true);
    _expectHighlightedTab(this.context.tabs[2], true);
  });

  it('should highlight to last tab if end key is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'End');
    await tick();

    _expectHighlightedTab(this.context.tabs[2], true);
  });

  it('should activate first tab if home key is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 2;
    this.context.component.autoActivate = true;
    dispatchKeyEvent(this.context.component, 'keydown', 'Home');
    await tick();

    _expectActiveTab(this.context.tabs[0], true);
    _expectHighlightedTab(this.context.tabs[0], true);
  });

  it('should highlight to last tab if home key is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 2;
    this.context.tabs[2].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'Home');
    await tick();

    _expectHighlightedTab(this.context.tabs[0], true);
  });

  it('should not activate tab with keyboard if event is cancelled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.autoActivate = true;
    this.context.attach();
    await tick();

    const activateEventSpy = jasmine.createSpy('activate listener', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventSpy);

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');

    await tick();

    _expectActiveTab(this.context.tabs[0], true);
    _expectHighlightedTab(this.context.tabs[1], false);
  });

  it('should activate tab when activation key is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');

    await tick();
    dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
    await tick();

    _expectActiveTab(this.context.tabs[1], true);
  });

  it('should not activate tab when activation key is pressed and event is canclled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    const activateEventSpy = jasmine.createSpy('activate listener', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventSpy);

    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowRight');

    await tick();
    dispatchKeyEvent(this.context.component, 'keydown', 'Enter');
    await tick();

    expect(activateEventSpy).toHaveBeenCalledTimes(1);
    _expectActiveTab(this.context.tabs[0], true);
  });

  it('should not activate a tab when auto activation is on and an activation key is pressed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.autoActivate = true;
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    dispatchKeyEvent(this.context.component, 'keydown', 'Space');

    await tick();

    _expectActiveTab(this.context.tabs[0], true);
  });

  it('should ignore unknown keys', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.activeTab = 0;
    dispatchKeyEvent(this.context.component, 'keydown', 'Escape');

    await tick();

    _expectActiveTab(this.context.tabs[0], true);
  });

  it('should set tab disabled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.tabs[1].disabled = true;

    expect(this.context.tabs[1].disabled).toBeTrue();
    expect(this.context.tabs[1].hasAttribute(TAB_CONSTANTS.attributes.DISABLED)).toBeTrue();
    expect(this.context.tabs[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('should toggle tab disabled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.tabs[1].disabled = true;
    await tick();
    this.context.tabs[1].disabled = false;
    await tick();

    const tab = this.context.tabs[1];
    expect(tab.disabled).toBeFalse();
    expect(tab.hasAttribute(TAB_CONSTANTS.attributes.DISABLED)).toBeFalse();
    expect(tab.getAttribute('aria-disabled')).toBe('false');
  });

  it('should not set focus when activated programmatically', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    await tick();
    this.context.component.activateTab(1);
    await tick();

    _expectActiveTab(this.context.tabs[1], true);
    _expectFocusedTab(this.context.tabs[1], false);
  });

  it('should set focus when clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    await tick();
    const tab = this.context.tabs[1];
    tab.click();
    await tick();

    _expectActiveTab(tab, true);
    _expectFocusedTab(tab, true);
  });

  it('should not set activate or focus when clicked if activate event is cancelled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();

    const interactedEventSpy = jasmine.createSpy('interacted event spy', (evt: CustomEvent) => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(TAB_BAR_CONSTANTS.events.ACTIVATE, interactedEventSpy);

    await tick();
    const tab = this.context.tabs[1];
    tab.click();
    await tick();

    _expectActiveTab(tab, false);
    _expectFocusedTab(tab, false);
  });

  it('should set default clustered layout mode', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.LAYOUT_MODE, 'clustered');
    this.context.attach();
    await tick();

    const root = _getRootTabBarElement(this.context.component);
    expect(this.context.component.layoutMode).toBe('clustered');
    expect(root.classList.contains(TAB_BAR_CONSTANTS.classes.FIXED)).toBeFalse();
    expect(this.context.tabs.every(tab => tab.stretch === false)).toBeTrue();
  });

  it('should toggle layout mode', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.layoutMode = 'clustered';
    await tick();
    this.context.component.layoutMode = 'fixed';

    const root = _getRootTabBarElement(this.context.component);
    expect(this.context.component.layoutMode).toBe('fixed');
    expect(root.classList.contains(TAB_BAR_CONSTANTS.classes.FIXED)).toBeTrue();
    expect(this.context.tabs.every(tab => tab.stretch === true)).toBeTrue();
  });

  it('should set default clustered layout align', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.LAYOUT_ALIGN, 'center');
    this.context.attach();
    await tick();

    const root = _getRootTabBarElement(this.context.component);
    expect(this.context.component.layoutAlign).toBe('center');
    expect(root.classList.contains(TAB_BAR_CONSTANTS.classes.ALIGN_CENTER)).toBeTrue();
  });

  it('should toggle layout align', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.layoutAlign = 'center';
    await tick();
    this.context.component.layoutAlign = 'end';

    const root = _getRootTabBarElement(this.context.component);
    expect(this.context.component.layoutAlign).toBe('end');
    expect(root.classList.contains(TAB_BAR_CONSTANTS.classes.ALIGN_END)).toBeTrue();
  });

  it('should set stacked by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.STACKED, '');
    this.context.attach();
    await tick();

    const root = _getRootTabBarElement(this.context.component);
    const rootBounds = root.getBoundingClientRect();
    expect(this.context.component.stacked).toBeTrue();
    expect(root.classList.contains(TAB_BAR_CONSTANTS.classes.STACKED)).toBeTrue();
    expect(rootBounds.height).toBe(72);
  });

  it('should toggle stacked', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.stacked = true;
    await tick();
    this.context.component.stacked = false;

    const root = _getRootTabBarElement(this.context.component);
    const rootBounds = root.getBoundingClientRect();
    expect(this.context.component.stacked).toBe(false);
    expect(root.classList.contains(TAB_BAR_CONSTANTS.classes.STACKED)).toBeFalse();
    expect(rootBounds.height).toBe(48);
  });

  it('should force scroll buttons to show', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.FORCE_SCROLL_BUTTONS, 'true');
    this.context.attach();
    await tick();

    const prevButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON_CONTAINER);
    const nextButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON_CONTAINER);

    expect(getComputedStyle(prevButtonContainer).display).toBe('block');
    expect(getComputedStyle(nextButtonContainer).display).toBe('block');
  });

  it('should toggle scroll buttons', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.component.forceScrollButtons = true;
    await tick();
    this.context.component.forceScrollButtons = false;

    const prevButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON_CONTAINER);
    const nextButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON_CONTAINER);

    expect(getComputedStyle(prevButtonContainer).display).toBe('none');
    expect(getComputedStyle(nextButtonContainer).display).toBe('none');
  });

  it('should show scroll buttons dynamically', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.scrollButtons = false;
    this.context.attach();
    await tick();

    const prevButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON_CONTAINER);
    const nextButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON_CONTAINER);

    expect(getComputedStyle(prevButtonContainer).display).toBe('none');
    expect(getComputedStyle(nextButtonContainer).display).toBe('none');

    _addScrollableTabs(this.context.component);
    this.context.component.scrollButtons = true;
    await tick();

    expect(getComputedStyle(prevButtonContainer).display).toBe('block');
    expect(getComputedStyle(nextButtonContainer).display).toBe('block');
  });

  it('should automatically show scroll buttons if scrollable', async function(this: ITestContext) {
    this.context = setupTestContext();
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    const prevButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON_CONTAINER);
    const nextButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON_CONTAINER);

    expect(getComputedStyle(prevButtonContainer).display).toBe('block');
    expect(getComputedStyle(nextButtonContainer).display).toBe('block');
  });

  it('should not allow scroll buttons', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS, 'false');
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    expect(this.context.component.scrollButtons).toBeFalse();

    const prevButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON_CONTAINER);
    const nextButtonContainer = getShadowElement(this.context.component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON_CONTAINER);

    expect(getComputedStyle(prevButtonContainer).display).toBe('none');
    expect(getComputedStyle(nextButtonContainer).display).toBe('none');
  });

  it('should scroll tab into view', async function(this: ITestContext) {
    this.context = setupTestContext();
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    let isScrolledEnd = _isScrolledEnd(this.context.component);
    const allTabs = _getTabs(this.context.component);
    this.context.component.scrollTabIntoView(allTabs.length - 1);

    isScrolledEnd = _isScrolledEnd(this.context.component);
    expect(isScrolledEnd).toBeTrue();
  });

  it('should scroll to next set of tabs if next button is clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    const nextButton = _getNextButton(this.context.component);
    nextButton.click();

    await tick();
    await timer(1000); // to allow for scroll animation to complete

    const isScrolledEnd = _isScrolledEnd(this.context.component);
    expect(isScrolledEnd).toBeFalse();

    const scrollPosition = _getScrollPosition(this.context.component);
    expect(scrollPosition).toBeGreaterThan(0);
  });

  it('should scroll to previous via previous button click', async function(this: ITestContext) {
    this.context = setupTestContext();
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    const nextButton = _getNextButton(this.context.component);
    nextButton.click();

    await tick();
    await timer(1000); // to allow for scroll animation to complete

    const prevButton = _getPrevButton(this.context.component);
    prevButton.click();

    await tick();
    await timer(1000); // to allow for scroll animation to complete

    const scrollPosition = _getScrollPosition(this.context.component);
    expect(scrollPosition).toBe(0);
  });

  it('should not change focus if scroll buttons are clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    this.context.component.activeTab = 1;
    this.context.tabs[1].focus();

    const nextButton = _getNextButton(this.context.component);
    dispatchNativeEvent(nextButton, 'mousedown');

    const prevButton = _getPrevButton(this.context.component);
    dispatchNativeEvent(prevButton, 'mousedown');

    await tick();

    _expectFocusedTab(this.context.tabs[1], true);
  });

  it('should auto scroll when activating non-visible tab', async function(this: ITestContext) {
    this.context = setupTestContext();
    _addScrollableTabs(this.context.component);
    this.context.attach();
    await tick();

    const allTabs = _getTabs(this.context.component);
    this.context.component.activateTab(allTabs.length - 1);

    await tick();
    await timer(1000); // to allow for scroll animation to complete

    const scrollPosition = _getScrollPosition(this.context.component);
    expect(scrollPosition).toBeGreaterThan(0);
  });

  it('should emit activation event when clicking tab', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    const activateEventSpy = jasmine.createSpy('activate listener');
    this.context.component.addEventListener(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventSpy);

    const tab = this.context.tabs[1];
    tab.click();

    await tick();

    expect(activateEventSpy).toHaveBeenCalledTimes(1);
    _expectActiveTab(tab, true);
  });

  it('should not activate tab if event is cancelled', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    const activateEventSpy = jasmine.createSpy('activate listener', evt => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventSpy);

    const tab = this.context.tabs[1];
    tab.click();

    await tick();
    
    _expectActiveTab(tab, false);
  });
  
  it('should not set focus to tab if index changed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();
    
    this.context.component.activeTab = 0;
    this.context.tabs[0].focus();
    await tick();

    this.context.component.activeTab = 1;
    await tick();
    
    _expectActiveTab(this.context.tabs[1], true);
    _expectFocusedTab(this.context.tabs[1], false);
  });

  it('should not activate disabled tab when clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.attach();
    await tick();

    this.context.tabs[1].disabled = true;
    this.context.tabs[1].click();

    await tick();
    
    _expectActiveTab(this.context.tabs[1], false);
  });

  function setupTestContext(): ITabBarTestContext {
    const component = createTabBarComponent();
    const tabs = _getTabs(component);
    return {
      component,
      tabs,
      attach: () => document.body.appendChild(component),
      destroy: () => removeElement(component)
    }
  }

  function createTabBarComponent(): ITabBarComponent {
    const tabBar = document.createElement(TAB_BAR_CONSTANTS.elementName) as ITabBarComponent;

    const tab1 = createTab('Tab 1');
    const tab2 = createTab('Tab 2');
    const tab3 = createTab('Tab 3');

    tabBar.appendChild(tab1);
    tabBar.appendChild(tab2);
    tabBar.appendChild(tab3);

    return tabBar;
  }

  function createTab(label: string): ITabComponent {
    const tab = document.createElement(TAB_CONSTANTS.elementName) as ITabComponent;
    tab.textContent = label;
    return tab;
  }

  function _getRootTabBarElement(el: ITabBarComponent): HTMLElement {
    return getShadowElement(el, TAB_BAR_CONSTANTS.selectors.ROOT);
  }

  function _expectActiveTab(tab: ITabComponent, isActive: boolean, expectFailureResult = ''): void {
    expect(tab.active).withContext(expectFailureResult).toBe(isActive);
    expect(tab.getAttribute('aria-selected')).toBe(isActive.toString());

    const hasTabIndex = tab.hasAttribute('tabindex');
    const expectedTabIndex = hasTabIndex ? (isActive ? '0' : '-1') : null;
    expect(tab.getAttribute('tabindex')).toBe(expectedTabIndex);
  }

  function _expectFocusedTab(tab: ITabComponent, isFocused: boolean, expectFailureResult = ''): void {
    expect(getActiveElement() === tab).withContext(expectFailureResult).toBe(isFocused);
  }

  function _expectHighlightedTab(tab: ITabComponent, isHighlighted: boolean, expectFailureResult = ''): void {
    const ripple = _getTabRipple(tab);
    expect(ripple.classList.contains(ForgeRippleFoundation.cssClasses.BG_FOCUSED)).withContext(expectFailureResult).toBe(isHighlighted);
  }

  function _getTabs(component: ITabBarComponent): ITabComponent[] {
    return Array.from(component.querySelectorAll(TAB_CONSTANTS.elementName));
  }

  function _getTabRipple(tab: ITabComponent): HTMLElement {
    return tab.shadowRoot!.querySelector(TAB_CONSTANTS.selectors.RIPPLE) as HTMLElement;
  }

  function _addScrollableTabs(tabBar: ITabBarComponent): void {
    tabBar.layoutMode = 'clustered';
    for (let i = 0; i < 50; i++) {
      const tab = createTab(`Dynamic tab ${i}`);
      tabBar.appendChild(tab);
    }
  }

  function _isScrolledEnd(tabBar: ITabBarComponent): boolean {
    return tabBar['_foundation']['_adapter'].isScrolledEnd();
  }

  function _getScrollPosition(tabBar: ITabBarComponent): number {
    return tabBar['_foundation']['_adapter'].getScrollPosition();
  }

  function _getNextButton(tabBar: ITabBarComponent): HTMLButtonElement {
    return getShadowElement(tabBar, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON) as HTMLButtonElement;
  }

  function _getPrevButton(tabBar: ITabBarComponent): HTMLButtonElement {
    return getShadowElement(tabBar, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON) as HTMLButtonElement;
  }
});

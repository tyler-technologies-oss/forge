import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { task } from '../core/utils/utils.js';
import type { IOpenIconComponent } from '../open-icon/open-icon.js';
import { EXPANSION_PANEL_CONSTANTS, emulateUserToggle } from './expansion-panel-constants.js';
import type { IExpansionPanelComponent } from './expansion-panel.js';

import '../open-icon/open-icon.js';
import './expansion-panel.js';

// Animation duration + buffer for transitionend event
const ANIMATION_TIMEOUT = 500;

describe('Expansion Panel', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    await expect(el).toBeAccessible();
  });

  it('should be accessible with expected structure and ARIA attributes', async () => {
    const screen = render(html`
      <forge-expansion-panel trigger="button-id">
        <button slot="header" id="button-id" aria-labelledby="label">
          <span id="label">Header</span>
        </button>
        <div>Content</div>
      </forge-expansion-panel>
    `);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    await expect(el).toBeAccessible();

    const button = el.querySelector('button') as HTMLElement;
    const content = el.querySelector('forge-expansion-panel>div') as HTMLElement;
    expect(button.getAttribute('aria-controls')).not.toBeNull();
    expect(button.getAttribute('aria-controls')).toBe(content?.getAttribute('id'));
    expect(button.getAttribute('aria-expanded')).toBe('false');
    el.open = true;
    await task();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    await expect(el).toBeAccessible();
    el.open = false;
    await task();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('should have expected default values', async () => {
    const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    expect(el.open).toBe(false);
    expect(el.orientation).toBe('vertical');
    expect(el.animationType).toBe('default');
  });

  it('should set open by default', async () => {
    const screen = render(html`<forge-expansion-panel open></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    expect(el.open).toBe(true);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
  });

  it('should set open via attribute', async () => {
    const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    expect(el.open).toBe(false);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(false);
    expect(contentEl.classList.contains('hidden')).toBe(true);

    el.setAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN, '');
    await task();

    expect(el.open).toBe(true);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
    expect(contentEl.classList.contains('hidden')).toBe(false);
  });

  it('should set open via property', async () => {
    const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    expect(el.open).toBe(false);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(false);
    expect(contentEl.classList.contains('hidden')).toBe(true);

    el.open = true;
    await task();

    expect(el.open).toBe(true);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
    expect(contentEl.classList.contains('hidden')).toBe(false);
  });

  it('should set open attribute to true when toggle() is called', async () => {
    const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    el.toggle();
    await task();

    expect(el.open).toBe(true);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
    expect(contentEl.classList.contains('hidden')).toBe(false);
  });

  it('should set open attribute to false when toggle() is called', async () => {
    const screen = render(html`<forge-expansion-panel open></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    el.toggle();
    await task();

    expect(el.open).toBe(false);
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(false);
    expect(contentEl.classList.contains('hidden')).toBe(true);
  });

  it('should set opening state attribute while toggle animation is in progress', async () => {
    const screen = render(html`<forge-expansion-panel><div style="height: 100px;">Test</div></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    const animationCompleteSpy = vi.fn();
    el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, animationCompleteSpy);
    mockTransitionEvent(contentEl, 'start', 'grid-template-rows');

    await vi.waitFor(() => {
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).toBe(true);
    });

    mockTransitionEvent(contentEl, 'end', 'grid-template-rows');

    expect(animationCompleteSpy).toHaveBeenCalledOnce();
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).toBe(false);
  });

  it('should not set opening state attribute when animation type is set to none', async () => {
    const screen = render(html`<forge-expansion-panel animation-type="none"><div>Test</div></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    el.toggle();

    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).toBe(false);

    await task(ANIMATION_TIMEOUT);

    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).toBe(false);
  });

  it('should dispatch animation-complete event when toggle animation is complete', async () => {
    const screen = render(html`<forge-expansion-panel><div>Test</div></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    const animationCompleteSpy = vi.fn();
    el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, animationCompleteSpy);
    mockTransitionEvent(contentEl, 'end', 'grid-template-rows');

    expect(animationCompleteSpy).toHaveBeenCalledOnce();
  });

  it('should not dispatch animation-complete event when animation type is set to none', async () => {
    const screen = render(html`<forge-expansion-panel animation-type="none"><div>Test</div></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

    const animationCompleteSpy = vi.fn();
    el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, animationCompleteSpy);

    el.toggle();

    await task(ANIMATION_TIMEOUT);

    expect(animationCompleteSpy).not.toHaveBeenCalled();
  });

  it('should set content visibility to hidden when toggled close', async () => {
    const screen = render(html`<forge-expansion-panel open></forge-expansion-panel>`);
    const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
    await task();
    const contentEl = getContentElement(el);

    el.toggle();

    await task(ANIMATION_TIMEOUT);

    expect(contentEl.classList.contains('hidden')).toBe(true);
  });

  describe('orientation', () => {
    it('should set orientation via attribute', async () => {
      const screen = render(html`<forge-expansion-panel orientation="horizontal"></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.orientation).toBe('horizontal');
    });

    it('should set orientation via property', async () => {
      const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.orientation).toBe('vertical');

      el.orientation = 'horizontal';

      expect(el.orientation).toBe('horizontal');
    });
  });

  describe('states', () => {
    it('should apply open state when panel is open', async () => {
      const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.matches(':state(open)')).toBe(false);

      el.open = true;
      await task();

      expect(el.matches(':state(open)')).toBe(true);
    });

    it('should remove open state when panel is closed', async () => {
      const screen = render(html`<forge-expansion-panel open></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      expect(el.matches(':state(open)')).toBe(true);

      el.open = false;
      await task();

      expect(el.matches(':state(open)')).toBe(false);
    });

    it('should apply horizontal state when orientation is horizontal', async () => {
      const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.matches(':state(horizontal)')).toBe(false);

      el.orientation = 'horizontal';
      await task();

      expect(el.matches(':state(horizontal)')).toBe(true);
    });

    it('should remove horizontal state when orientation is vertical', async () => {
      const screen = render(html`<forge-expansion-panel orientation="horizontal"></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      expect(el.matches(':state(horizontal)')).toBe(true);

      el.orientation = 'vertical';
      await task();

      expect(el.matches(':state(horizontal)')).toBe(false);
    });

    it('should have open state when opened by default', async () => {
      const screen = render(html`<forge-expansion-panel open></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      expect(el.matches(':state(open)')).toBe(true);
    });

    it('should have horizontal state when set via attribute', async () => {
      const screen = render(html`<forge-expansion-panel orientation="horizontal"></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      expect(el.matches(':state(horizontal)')).toBe(true);
    });

    it('should toggle open state when toggled via toggle method', async () => {
      const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.matches(':state(open)')).toBe(false);

      el.toggle();
      await task();

      expect(el.matches(':state(open)')).toBe(true);

      el.toggle();
      await task();

      expect(el.matches(':state(open)')).toBe(false);
    });

    it('should apply both open and horizontal states simultaneously', async () => {
      const screen = render(html`<forge-expansion-panel open orientation="horizontal"></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      expect(el.matches(':state(open)')).toBe(true);
      expect(el.matches(':state(horizontal)')).toBe(true);
    });
  });

  describe('animation type', () => {
    it('should set animation type via attribute', async () => {
      const screen = render(html`<forge-expansion-panel animation-type="none"></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.animationType).toBe('none');
    });

    it('should set animation type via property', async () => {
      const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expect(el.animationType).toBe('default');

      el.animationType = 'none';

      expect(el.animationType).toBe('none');
    });
  });

  describe('interactions', () => {
    it('should open when clicking header element', async () => {
      const screen = render(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const header = el.querySelector('button') as HTMLButtonElement;
      await task();
      const contentEl = getContentElement(el);

      await userEvent.click(header);

      expect(el.open).toBe(true);
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(contentEl.classList.contains('hidden')).toBe(false);
    });

    it('should close when clicking header element', async () => {
      const screen = render(html`
        <forge-expansion-panel open>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const header = el.querySelector('button') as HTMLButtonElement;
      await task();
      const contentEl = getContentElement(el);

      await userEvent.click(header);
      await task(ANIMATION_TIMEOUT);

      expect(el.open).toBe(false);
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(false);
      expect(contentEl.classList.contains('hidden')).toBe(true);
    });

    it('should dispatch toggle event when clicking header element', async () => {
      const screen = render(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const header = el.querySelector('button') as HTMLButtonElement;

      const toggleSpy = vi.fn();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      await userEvent.click(header);

      expect(el.open).toBe(true);
      expect(toggleSpy).toHaveBeenCalledOnce();

      await userEvent.click(header);

      expect(el.open).toBe(false);
      expect(toggleSpy).toHaveBeenCalledTimes(2);
    });

    it('should not toggle when clicking header element if ignore attribute is set', async () => {
      const screen = render(html`
        <forge-expansion-panel>
          <button slot="header" forge-ignore>Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const header = el.querySelector('button') as HTMLButtonElement;

      const toggleSpy = vi.fn();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      await userEvent.click(header);

      expect(el.open).toBe(false);
      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should toggle when pressing enter key on header element', async () => {
      const screen = render(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const header = el.querySelector('button') as HTMLButtonElement;
      await task();
      const contentEl = getContentElement(el);

      const toggleSpy = vi.fn();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      header.focus();
      await userEvent.keyboard('{Enter}');

      expect(el.open).toBe(true);
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(contentEl.classList.contains('hidden')).toBe(false);
      expect(toggleSpy).toHaveBeenCalledOnce();
    });

    it('should toggle when pressing space key on header element', async () => {
      const screen = render(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const header = el.querySelector('button') as HTMLButtonElement;
      await task();
      const contentEl = getContentElement(el);

      const toggleSpy = vi.fn();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      header.focus();
      await userEvent.keyboard(' ');

      expect(el.open).toBe(true);
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(contentEl.classList.contains('hidden')).toBe(false);
      expect(toggleSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch toggle event when calling internal emulateUserToggle symbol method', async () => {
      const screen = render(html`<forge-expansion-panel></forge-expansion-panel>`);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      const toggleSpy = vi.fn();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      el[emulateUserToggle](true);
      expect(toggleSpy).toHaveBeenCalledOnce();

      el[emulateUserToggle](false);
      expect(toggleSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('open icon', () => {
    it('should toggle internal open icon when toggled', async () => {
      const screen = render(html`
        <forge-expansion-panel>
          <button slot="header">
            <span>Header</span>
            <forge-open-icon></forge-open-icon>
          </button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const openIcon = el.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(openIcon.open).toBe(false);

      el.toggle();
      await task();

      expect(openIcon.open).toBe(true);
    });

    it('should toggle external open icon when toggled', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-open-icon id="open-icon-id"></forge-open-icon>
          <forge-expansion-panel trigger="button-id" open-icon="open-icon-id">
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const openIcon = container.querySelector('#open-icon-id') as IOpenIconComponent;
      const trigger = container.querySelector('#button-id') as HTMLButtonElement;

      expect(openIcon.open).toBe(false);
      await userEvent.click(trigger);
      expect(openIcon.open).toBe(true);
    });

    it('should toggle trigger open icon when toggled', async () => {
      const screen = render(html`
        <div>
          <div role="button" id="button-id">
            <forge-open-icon id="open-icon-id"></forge-open-icon>
          </div>
          <forge-expansion-panel trigger="button-id">
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const openIcon = container.querySelector('#open-icon-id') as IOpenIconComponent;
      const trigger = container.querySelector('#button-id') as HTMLButtonElement;

      expect(openIcon.open).toBe(false);
      await userEvent.click(trigger);
      expect(openIcon.open).toBe(true);
    });

    it('should set open icon by reference', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-open-icon id="open-icon-id"></forge-open-icon>
          <forge-expansion-panel trigger="button-id">
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const openIcon = container.querySelector('#open-icon-id') as IOpenIconComponent;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      expansionPanel.openIconElement = openIcon;
      await task();
      expect(openIcon.open).toBe(false);
      await userEvent.click(trigger);
      expect(openIcon.open).toBe(true);
    });
  });

  describe('nested panels', () => {
    it('should not toggle parent panel when child panel is toggled', async () => {
      const screen = render(html`
        <forge-expansion-panel open>
          <button slot="header">Header</button>
          <div>
            <forge-expansion-panel>
              <button slot="header">Header</button>
              <div>Content</div>
            </forge-expansion-panel>
          </div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();
      const contentEl = getContentElement(el);

      const childEl = el.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const childHeader = childEl.querySelector('button') as HTMLButtonElement;
      await task();
      const childContentEl = getContentElement(childEl);

      expect(el.open).toBe(true);
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(contentEl.classList.contains('hidden')).toBe(false);

      expect(childEl.open).toBe(false);
      expect(childEl.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(false);
      expect(childContentEl.classList.contains('hidden')).toBe(true);

      await userEvent.click(childHeader);
      await task();

      expect(childEl.open).toBe(true);
      expect(childEl.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(childContentEl.classList.contains('hidden')).toBe(false);

      expect(el.open).toBe(true);
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).toBe(true);
      expect(contentEl.classList.contains('hidden')).toBe(false);
    });
  });

  describe('trigger', () => {
    it('should be toggled by nested trigger', async () => {
      const screen = render(html`
        <div>
          <forge-expansion-panel trigger="button-id">
            <button id="button-id"></button>
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      await task();

      trigger.click();
      expect(expansionPanel.open).toBe(true);
      trigger.click();
      expect(expansionPanel.open).toBe(false);
    });

    it('should be toggled by external trigger', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel trigger="button-id">
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(true);
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);
    });

    it('should manage ARIA attributes of trigger button', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel trigger="button-id">
            <div id="content">Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const content = container.querySelector('#content') as HTMLElement;
      await task();

      expect(trigger.getAttribute('aria-controls')).not.toBeNull();
      expect(trigger.getAttribute('aria-controls')).toBe(content.getAttribute('id'));
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expansionPanel.open = true;
      await task();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      expansionPanel.open = false;
      await task();
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expansionPanel.remove();
      expect(trigger.getAttribute('aria-controls')).toBeNull();
      expect(trigger.getAttribute('aria-expanded')).toBeNull();
    });

    it('should not overwrite existing id of slotted content', async () => {
      const screen = render(html`
        <forge-expansion-panel trigger="button-id">
          <button slot="header" id="button-id"></button>
          <div id="foo">Content</div>
        </forge-expansion-panel>
      `);
      const el = screen.container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const button = el.querySelector('button') as HTMLElement;
      const content = el.querySelector('#foo') as HTMLElement;
      await task();

      expect(content.getAttribute('id')).toBe('foo');
      expect(button.getAttribute('aria-controls')).toBe(content.getAttribute('id'));
    });

    it('should update old and new triggers on trigger change', async () => {
      const screen = render(html`
        <div>
          <button id="button-id1"></button>
          <button id="button-id2"></button>
          <forge-expansion-panel trigger="button-id1">
            <div id="content">Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger1 = container.querySelector('#button-id1') as HTMLElement;
      const trigger2 = container.querySelector('#button-id2') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const content = container.querySelector('#content') as HTMLElement;
      await task();

      await userEvent.click(trigger1);
      expect(expansionPanel.open).toBe(true);

      expansionPanel.trigger = 'button-id2';
      await task();
      expect(trigger1.getAttribute('aria-controls')).toBeNull();
      expect(trigger1.getAttribute('aria-expanded')).toBeNull();
      await userEvent.click(trigger1);
      expect(expansionPanel.open).toBe(true);
      expect(trigger2.getAttribute('aria-controls')).not.toBeNull();
      expect(trigger2.getAttribute('aria-controls')).toBe(content.getAttribute('id'));
      expect(trigger2.getAttribute('aria-expanded')).toBe('true');
      await userEvent.click(trigger2);
      await task();
      expect(trigger2.getAttribute('aria-expanded')).toBe('false');
      expect(expansionPanel.open).toBe(false);
    });

    it('should update trigger aria on content change', async () => {
      const screen = render(html`
        <div>
          <div>
            <button id="button-id"></button>
            <forge-expansion-panel trigger="button-id">
              <div id="content1">Content 1</div>
            </forge-expansion-panel>
          </div>
          <div id="content2">Content 2</div>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const content1 = container.querySelector('#content1') as HTMLElement;
      const content2 = container.querySelector('#content2') as HTMLElement;
      await task();

      expect(trigger.getAttribute('aria-controls')).toBe(content1.getAttribute('id'));
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      content1.remove();
      await task();
      expect(trigger.getAttribute('aria-controls')).toBeNull();
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expansionPanel.appendChild(content2);
      await task();
      expect(trigger.getAttribute('aria-controls')).toBe(content2.getAttribute('id'));
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set trigger by element reference', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel>
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expansionPanel.triggerElement = trigger;
      await task();
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(true);
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);
    });

    it('should handle null trigger element reference', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel>
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expansionPanel.triggerElement = null;
      await task();

      expansionPanel.triggerElement = trigger;
      await task();
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(true);
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);

      expansionPanel.triggerElement = null;
      await task();
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);
    });

    it('should not error if no slotted content', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel trigger="button-id"></forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(true);
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);
    });

    it('should handle trigger element not found by id', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel trigger="foo"></forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger = container.querySelector('#button-id') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);

      expansionPanel.trigger = 'button-id';
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(true);
      await userEvent.click(trigger);
      expect(expansionPanel.open).toBe(false);
    });

    it('should remove a disconnected triggerElement', async () => {
      const screen = render(html`
        <div>
          <button id="button-id1"></button>
          <button id="button-id2"></button>
          <forge-expansion-panel>
            <div id="content">Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const trigger2 = container.querySelector('#button-id2') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;

      expansionPanel.triggerElement = trigger2;
      await task();

      trigger2.click();
      expect(expansionPanel.open).toBe(true);
      trigger2.click();
      expect(expansionPanel.open).toBe(false);

      container.querySelector('#button-id2')!.remove();
      expansionPanel.triggerElement = null;
      await task();
      expansionPanel.triggerElement = trigger2;
      await task();
      trigger2.click();
      expect(expansionPanel.open).toBe(false);
      expect(trigger2.getAttribute('aria-controls')).toBeNull();
    });

    it('should remove triggerElement on disconnect', async () => {
      const screen = render(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel trigger="button-id">
            <div id="content">Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const container = screen.container.querySelector('div') as HTMLElement;
      const expansionPanel = container.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const button = container.querySelector('#button-id') as HTMLElement;
      await task();

      expect(button.getAttribute('aria-controls')).not.toBeNull();
      expansionPanel.remove();
      expect(button.getAttribute('aria-controls')).toBeNull();
    });
  });

  function getContentElement(el: IExpansionPanelComponent): HTMLElement {
    return el.shadowRoot?.querySelector(EXPANSION_PANEL_CONSTANTS.selectors.CONTENT) as HTMLElement;
  }

  function mockTransitionEvent(element: HTMLElement, type: 'start' | 'end', propertyName: string): void {
    const event = new TransitionEvent(`transition${type}`, {
      propertyName
    });
    element.dispatchEvent(event);
  }
});

import { getShadowElement } from '@tylertech/forge-core';
import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { TestHarness } from '../core/testing/test-harness.js';
import { frame, task } from '../core/utils/utils.js';
import type { IIconComponent } from '../icon/icon.js';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer/index.js';
import { TAB_BAR_CONSTANTS } from './tab-bar/index.js';
import type { TabBarComponent } from './tab-bar/tab-bar.js';
import { TAB_CONSTANTS } from './tab/tab-constants.js';
import { TabComponent } from './tab/tab.js';

import './tab-bar/tab-bar.js';
import './tab/tab.js';

describe('Tabs', () => {
  it('should contain shadow root', async () => {
    const ctx = await createFixture();
    expect(ctx.element.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const ctx = await createFixture();
    // Note: Accessibility checker doesn't recognize slotted tabs as children in test environment
    await expect(ctx.element).toBeAccessible({ rules: { 'aria-required-children': { enabled: false } } });
  });

  it('should set default active tab', async () => {
    const ctx = await createFixture({ activeTab: 1 });

    expect(ctx.element.activeTab).toBe(1);
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should update active tab', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    ctx.element.activeTab = 1;
    await frame();

    expect(ctx.element.activeTab).toBe(1);
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should not set focus on tab when active tab is set', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    expect(ctx.tabs[0].matches(':focus')).toBe(false);

    ctx.element.activeTab = 1;

    expect(ctx.tabs[1].matches(':focus')).toBe(false);
  });

  it('should set focus on tab when user clicks on tab', async () => {
    const ctx = await createFixture();

    await ctx.clickTab(0);

    expect(ctx.tabs[0].matches(':focus')).toBe(true);
  });

  it.skip('should handle activeTab set to undefined (currently logs warning but does not deselect)', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);

    ctx.element.activeTab = undefined;
    await ctx.element.updateComplete;
    await frame();

    // Currently this logs a warning but does not deselect
    // TODO: Fix component to properly handle undefined/null activeTab
    expect(ctx.element.activeTab).toBeNull();
    expect(ctx.selectedTabCount).toBe(0);
  });

  it.skip('should handle activeTab set to null (currently logs warning but does not deselect)', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);

    ctx.element.activeTab = null;
    await ctx.element.updateComplete;
    await frame();

    // Currently this logs a warning but does not deselect
    // TODO: Fix component to properly handle undefined/null activeTab
    expect(ctx.element.activeTab).toBeNull();
    expect(ctx.selectedTabCount).toBe(0);
  });

  it('should set disabled', async () => {
    const ctx = await createFixture({ disabled: true });

    await expect(ctx.element).toBeAccessible({ rules: { 'aria-required-children': { enabled: false } } });
    expect(ctx.element.disabled).toBe(true);
    expect(
      ctx.tabs.every(tab => {
        const stateLayer = getShadowElement(tab, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
        return tab.disabled && tab.hasAttribute('disabled') && stateLayer.disabled;
      })
    ).toBe(true);
  });

  it('should not override tab disabled if disabled is false', async () => {
    const ctx = await createFixture({ disabled: false, tabDisabled: [true, true, true] });

    await expect(ctx.element).toBeAccessible({ rules: { 'aria-required-children': { enabled: false } } });
    expect(ctx.element.disabled).toBe(false);
    expect(
      ctx.tabs.every(tab => {
        const stateLayer = getShadowElement(tab, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
        return tab.disabled && tab.hasAttribute('disabled') && stateLayer.disabled;
      })
    ).toBe(true);
  });

  it('should set stacked', async () => {
    const ctx = await createFixture({ stacked: true });

    expect(ctx.element.stacked).toBe(true);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.STACKED)).toBe(true);
    expect(ctx.tabs.every(tab => tab.stacked && tab.hasAttribute(TAB_CONSTANTS.attributes.STACKED))).toBe(true);
  });

  it('should set clustered', async () => {
    const ctx = await createFixture({ clustered: true });

    expect(ctx.element.clustered).toBe(true);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.CLUSTERED)).toBe(true);
  });

  it('should set inverted', async () => {
    const ctx = await createFixture({ inverted: true });

    expect(ctx.element.inverted).toBe(true);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.INVERTED)).toBe(true);
    expect(ctx.tabs.every(tab => tab.inverted && tab.hasAttribute(TAB_CONSTANTS.attributes.INVERTED))).toBe(true);
  });

  it('should set auto activate', async () => {
    const ctx = await createFixture({ autoActivate: true });

    expect(ctx.element.autoActivate).toBe(true);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE)).toBe(true);
  });

  it('should auto-select first tab on mount when no active tab set', async () => {
    const ctx = await createFixture();

    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should select tab when clicked', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

    await ctx.clickTab(1);

    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should not select tab if disabled tab clicked', async () => {
    const ctx = await createFixture({ disabled: true });

    await ctx.forceClickTab(1);

    expect(ctx.tabs[1].selected).toBe(false);
  });

  it('should select tab with enter key', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{Enter}');

    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should select tab with space key', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard(' ');

    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should navigate to next tab when right arrow is pressed', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
  });

  it('should navigate to previous tab when left arrow is pressed', async () => {
    const ctx = await createFixture({ activeTab: 1 });

    await ctx.clickTab(1);
    await userEvent.keyboard('{ArrowLeft}');

    expect(ctx.tabs[0].matches(':focus')).toBe(true);
  });

  it('should not navigate if up or down arrow key is pressed when not in vertical mode', async () => {
    const ctx = await createFixture({ activeTab: 1 });

    await ctx.clickTab(1);
    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{ArrowDown}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
  });

  it('should not select tab when navigating via keyboard', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.tabs[1].selected).toBe(false);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should select tab when navigating via keyboard and auto activate is enabled', async () => {
    const ctx = await createFixture({ activeTab: 0, autoActivate: true });

    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);

    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should navigate to last tab when end is pressed', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    await ctx.clickTab(0);
    await userEvent.keyboard('{End}');

    expect(ctx.tabs[2].matches(':focus')).toBe(true);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should navigate to first tab when home is pressed', async () => {
    const ctx = await createFixture({ activeTab: 2 });

    await ctx.clickTab(2);
    await userEvent.keyboard('{Home}');

    expect(ctx.tabs[0].matches(':focus')).toBe(true);
    expect(ctx.tabs[2].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
  });

  it('should skip disabled tabs when navigating via keyboard', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    ctx.tabs[1].disabled = true;
    await frame();
    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(false);
    expect(ctx.tabs[2].matches(':focus')).toBe(true);
  });

  it('should not wrap to first tab when navigating via keyboard from last tab', async () => {
    const ctx = await createFixture({ activeTab: 2 });

    await ctx.clickTab(2);
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[2].matches(':focus')).toBe(true);
  });

  it('should not wrap to last tab when navigating via keyboard from first tab', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    await ctx.clickTab(0);
    await userEvent.keyboard('{ArrowLeft}');

    expect(ctx.tabs[0].matches(':focus')).toBe(true);
  });

  it('should blur tab', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    ctx.tabs[0].focus();
    expect(ctx.tabs[0].matches(':focus')).toBe(true);

    ctx.tabs[0].blur();

    expect(ctx.tabs[0].matches(':focus')).toBe(false);
  });

  it('should not dispatch selected or change event when tab is clicked while selected', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    const selectSpy = vi.fn();
    ctx.tabs[0].addEventListener(TAB_CONSTANTS.events.SELECT, selectSpy);

    const changeSpy = vi.fn();
    ctx.element.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    await ctx.clickTab(0);

    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(selectSpy).not.toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch selected or change event when tab is clicked while disabled', async () => {
    const ctx = await createFixture({ activeTab: 0, disabled: true });

    const selectSpy = vi.fn();
    ctx.tabs[0].addEventListener(TAB_CONSTANTS.events.SELECT, selectSpy);

    const changeSpy = vi.fn();
    ctx.element.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    await ctx.forceClickTab(0);

    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.tabs[0].disabled).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(selectSpy).not.toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should cancel change event', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    const changeSpy = vi.fn(evt => evt.preventDefault());
    ctx.element.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    await ctx.clickTab(1);
    await ctx.element.updateComplete;
    await ctx.element.updateComplete;

    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.tabs[1].selected).toBe(false);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
  });

  it('should not dispatch change event when setting active tab', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    const changeSpy = vi.fn();
    ctx.element.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    ctx.element.activeTab = 1;
    await frame();

    expect(ctx.tabs[0].selected).toBe(false);
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  describe('selectedIndex', () => {
    it('should set selected tab by index', async () => {
      const ctx = await createFixture({ activeTab: 0 });

      ctx.element.selectedIndex = 1;
      await frame();

      expect(ctx.element.selectedIndex).toBe(1);
      expect(ctx.tabs[1].selected).toBe(true);
      expect(ctx.selectedTabCount).toBe(1);
    });

    it('should get selected tab index', async () => {
      const ctx = await createFixture({ activeTab: 2 });

      expect(ctx.element.selectedIndex).toBe(2);
    });

    it('should return index when first tab auto-selected', async () => {
      const ctx = await createFixture();

      expect(ctx.element.selectedIndex).toBe(0);
    });

    it('should warn when setting out of bounds index', async () => {
      const ctx = await createFixture({ activeTab: 1 });
      const consoleWarnSpy = vi.spyOn(console, 'warn');

      ctx.element.selectedIndex = -1;
      await ctx.element.updateComplete;

      expect(consoleWarnSpy).toHaveBeenCalledWith('Out of bounds index provided for selected-index, no tab selected.');
      // Tab remains selected when invalid index provided
      expect(ctx.element.selectedIndex).toBe(1);
      expect(ctx.selectedTabCount).toBe(1);
    });

    it('should deselect when using selectedTabElement = null', async () => {
      const ctx = await createFixture({ activeTab: 1 });

      ctx.element.selectedTabElement = null;
      await ctx.element.updateComplete;
      await ctx.element.updateComplete;

      expect(ctx.element.selectedIndex).toBeNull();
      expect(ctx.selectedTabCount).toBe(0);
    });
  });

  describe('selectedTab', () => {
    it('should set selected tab by name', async () => {
      const ctx = await createFixture({ tabNames: ['first', 'second', 'third'] });

      ctx.element.selectedTab = 'second';
      await frame();

      expect(ctx.element.selectedTab).toBe('second');
      expect(ctx.tabs[1].selected).toBe(true);
      expect(ctx.selectedTabCount).toBe(1);
    });

    it('should get selected tab name', async () => {
      const ctx = await createFixture({ activeTab: 1, tabNames: ['first', 'second', 'third'] });

      expect(ctx.element.selectedTab).toBe('second');
    });

    it('should return first tab name when auto-selected', async () => {
      const ctx = await createFixture({ tabNames: ['first', 'second', 'third'] });

      expect(ctx.element.selectedTab).toBe('first');
    });
  });

  describe('selectedTabElement', () => {
    it('should set selected tab by element', async () => {
      const ctx = await createFixture();

      ctx.element.selectedTabElement = ctx.tabs[2];
      await frame();

      expect(ctx.element.selectedTabElement).toBe(ctx.tabs[2]);
      expect(ctx.tabs[2].selected).toBe(true);
      expect(ctx.selectedTabCount).toBe(1);
    });

    it('should get selected tab element', async () => {
      const ctx = await createFixture({ activeTab: 1 });

      expect(ctx.element.selectedTabElement).toBe(ctx.tabs[1]);
    });

    it('should return first tab element when auto-selected', async () => {
      const ctx = await createFixture();

      expect(ctx.element.selectedTabElement).toBe(ctx.tabs[0]);
    });

    it('should deselect when set to null', async () => {
      const ctx = await createFixture({ activeTab: 1 });

      ctx.element.selectedTabElement = null;
      await ctx.element.updateComplete;
      await ctx.element.updateComplete;

      expect(ctx.element.selectedTabElement).toBeNull();
      expect(ctx.selectedTabCount).toBe(0);
    });
  });

  describe('removable', () => {
    it('should set removable on all tabs', async () => {
      const ctx = await createFixture({ removable: true });

      expect(ctx.element.removable).toBe(true);
      expect(ctx.tabs.every(tab => tab.removable)).toBe(true);
    });

    it('should dispatch remove event when delete key pressed on removable tab', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 0 });

      const removeSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_REMOVE, removeSpy);

      await ctx.clickTab(0);
      await userEvent.keyboard('{Delete}');

      expect(removeSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch remove event when backspace key pressed on removable tab', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 0 });

      const removeSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_REMOVE, removeSpy);

      await ctx.clickTab(0);
      await userEvent.keyboard('{Backspace}');

      expect(removeSpy).toHaveBeenCalledOnce();
    });

    it('should not dispatch remove event when delete key pressed on non-removable tab', async () => {
      const ctx = await createFixture({ removable: false, activeTab: 0 });

      const removeSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_REMOVE, removeSpy);

      await ctx.clickTab(0);
      await userEvent.keyboard('{Delete}');

      expect(removeSpy).not.toHaveBeenCalled();
    });

    it('should prevent remove event', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 0 });

      const removeSpy = vi.fn(evt => evt.preventDefault());
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_REMOVE, removeSpy);

      const tabCount = ctx.tabs.length;
      await ctx.clickTab(0);
      await userEvent.keyboard('{Delete}');
      await frame();

      expect(removeSpy).toHaveBeenCalledOnce();
      expect(ctx.tabs.length).toBe(tabCount);
    });

    it('should remove tab from DOM when remove event not prevented', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 0 });

      const removeSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_REMOVE, removeSpy);

      const tabToRemove = ctx.tabs[0];
      await ctx.clickTab(0);
      await userEvent.keyboard('{Delete}');
      await frame();

      expect(removeSpy).toHaveBeenCalledOnce();
      expect(ctx.tabs).not.toContain(tabToRemove);
      expect(ctx.tabs.length).toBe(2);
    });

    it('should move focus to next tab when removing focused tab', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 0 });

      const nextTab = ctx.tabs[1];
      await ctx.clickTab(0);
      await userEvent.keyboard('{Delete}');
      await frame();

      expect(nextTab.matches(':focus')).toBe(true);
    });

    it('should move focus to previous tab when removing last focused tab', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 2 });

      const previousTab = ctx.tabs[1];
      await ctx.clickTab(2);
      await userEvent.keyboard('{Delete}');
      await frame();

      expect(previousTab.matches(':focus')).toBe(true);
    });

    it('should select next tab when removing selected tab', async () => {
      const ctx = await createFixture({ removable: true, activeTab: 1 });

      const changeSpy = vi.fn();
      ctx.element.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

      const nextTab = ctx.tabs[2];
      await ctx.clickTab(1);
      await userEvent.keyboard('{Delete}');
      await frame();

      expect(nextTab.selected).toBe(true);
      expect(ctx.selectedTabCount).toBe(1);
      expect(changeSpy).toHaveBeenCalledOnce();
    });
  });

  describe('menu event', () => {
    it('should dispatch menu event when Shift+F10 pressed', async () => {
      const ctx = await createFixture({ activeTab: 0 });

      const menuSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_MENU, menuSpy);

      await ctx.clickTab(0);
      await userEvent.keyboard('{Shift>}{F10}{/Shift}');

      expect(menuSpy).toHaveBeenCalledOnce();
    });
  });

  describe('theme', () => {
    it('should set default theme by default', async () => {
      const ctx = await createFixture();

      expect(ctx.element.theme).toBe('default');
    });

    it('should set app-bar theme', async () => {
      const ctx = await createFixture({ theme: 'app-bar' });

      expect(ctx.element.theme).toBe('app-bar');
      expect(ctx.containerElement.classList.contains('app-bar')).toBe(true);
    });

    it('should update theme dynamically', async () => {
      const ctx = await createFixture();

      ctx.element.theme = 'app-bar';
      await frame();

      expect(ctx.element.theme).toBe('app-bar');
      expect(ctx.containerElement.classList.contains('app-bar')).toBe(true);
    });
  });

  describe('when vertical', () => {
    it('should be accessible', async () => {
      const ctx = await createFixture({ vertical: true });
      await expect(ctx.element).toBeAccessible({ rules: { 'aria-required-children': { enabled: false } } });
    });

    it('should set vertical attribute', async () => {
      const ctx = await createFixture({ vertical: true });
      expect(ctx.element.vertical).toBe(true);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.VERTICAL)).toBe(true);
    });

    it('should set vertical dynamically', async () => {
      const ctx = await createFixture({ activeTab: 0 });

      expect(ctx.element.vertical).toBe(false);

      ctx.element.vertical = true;
      await frame();

      expect(ctx.element.vertical).toBe(true);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.VERTICAL)).toBe(true);
    });

    it('should update scroll button icons when vertical set dynamically', async () => {
      const ctx = await createFixture({ scrollButtons: true, activeTab: 0, width: '1px' });

      expect(ctx.backwardScrollButtonIcon.name).toBe('keyboard_arrow_left');
      expect(ctx.forwardScrollButtonIcon.name).toBe('keyboard_arrow_right');

      ctx.element.vertical = true;
      ctx.element.style.width = 'auto';
      ctx.element.style.height = '1px';
      await frame();

      expect(ctx.backwardScrollButtonIcon.name).toBe('keyboard_arrow_up');
      expect(ctx.forwardScrollButtonIcon.name).toBe('keyboard_arrow_down');

      ctx.element.vertical = false;
      ctx.element.style.width = '1px';
      ctx.element.style.height = 'auto';
      await frame();

      expect(ctx.backwardScrollButtonIcon.name).toBe('keyboard_arrow_left');
      expect(ctx.forwardScrollButtonIcon.name).toBe('keyboard_arrow_right');
    });

    it('should not navigate if left or right arrow key is pressed', async () => {
      const ctx = await createFixture({ vertical: true, activeTab: 1 });

      await ctx.clickTab(1);
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowRight}');

      expect(ctx.tabs[1].matches(':focus')).toBe(true);
    });

    it('should select tab when clicked', async () => {
      const ctx = await createFixture({ vertical: true, activeTab: 0 });

      const changeSpy = vi.fn();
      ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

      await ctx.clickTab(1);

      expect(ctx.tabs[1].selected).toBe(true);
      expect(ctx.selectedTabCount).toBe(1);
      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
    });

    it('should show scroll buttons when scrollable', async () => {
      const ctx = await createFixture({ vertical: true, scrollButtons: true, activeTab: 0, height: '1px' });

      expect(ctx.element.scrollButtons).toBe(true);
      expect(ctx.hasScrollButtons).toBe(true);
      expect(ctx.backwardScrollButton).toBeTruthy();
      expect(ctx.forwardScrollButton).toBeTruthy();
    });
  });

  describe('scroll buttons', () => {
    it('should not show scroll buttons by default', async () => {
      const ctx = await createFixture({ width: '9999px' });

      expect(ctx.element.scrollButtons).toBe(false);
      expect(ctx.hasScrollButtons).toBe(false);
    });

    it('should show scroll buttons when scrollable', async () => {
      const ctx = await createFixture({ scrollButtons: true, activeTab: 0 });

      expect(ctx.hasScrollButtons).toBe(false);

      ctx.element.style.width = '1px';
      await frame();

      await expect(ctx.element).toBeAccessible({ rules: { 'aria-required-children': { enabled: false }, 'aria-hidden-focus': { enabled: false } } });
      expect(ctx.element.scrollButtons).toBe(true);
      expect(ctx.hasScrollButtons).toBe(true);
      expect(ctx.backwardScrollButton).toBeTruthy();
      expect(ctx.forwardScrollButton).toBeTruthy();
    });

    it('should hide scroll buttons when not scrollable', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '1px' });

      expect(ctx.hasScrollButtons).toBe(true);

      ctx.element.style.width = '9999px';
      await frame();
      await frame();
      expect(ctx.hasScrollButtons).toBe(false);
    });

    it('should show scroll buttons when scrollable dynamically', async () => {
      const ctx = await createFixture({ scrollButtons: false });

      expect(ctx.hasScrollButtons).toBe(false);

      ctx.element.style.width = '1px';
      ctx.element.scrollButtons = true;
      await frame();

      expect(ctx.element.scrollButtons).toBe(true);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).toBe(true);
      expect(ctx.hasScrollButtons).toBe(true);
      expect(ctx.backwardScrollButton).toBeTruthy();
      expect(ctx.forwardScrollButton).toBeTruthy();
    });

    it('should disable scroll button behavior when scrollButtons set to false', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '1px' });

      expect(ctx.hasScrollButtons).toBe(true);

      ctx.element.scrollButtons = false;
      await ctx.element.updateComplete;

      expect(ctx.hasScrollButtons).toBe(false);
      expect(ctx.element.scrollButtons).toBe(false);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).toBe(false);
    });

    it('should show scroll buttons when new tabs are added that cause scrolling', async () => {
      const ctx = await createFixture({ scrollButtons: true, clustered: true, width: '250px' });

      expect(ctx.hasScrollButtons).toBe(false);

      const tab = new TabComponent();
      tab.textContent = 'Fourth';
      ctx.element.appendChild(tab);
      await ctx.element.updateComplete;
      await ctx.element.updateComplete;

      expect(ctx.hasScrollButtons).toBe(true);
    });

    it('should hide scroll buttons when scrollable tabs are removed causing no overflow', async () => {
      const ctx = await createFixture({ scrollButtons: true, clustered: true, width: '215px' });

      expect(ctx.hasScrollButtons).toBe(true);

      ctx.tabs[0].remove();
      ctx.tabs[0].remove();
      await frame();

      expect(ctx.hasScrollButtons).toBe(false);
    });

    it.skip('should scroll forward when forward scroll button is clicked', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '150px' });

      const scrollBySpy = vi.spyOn(ctx.scrollContainer, 'scrollBy');

      expect(ctx.scrollContainer.scrollLeft).toBe(0);

      await userEvent.click(ctx.forwardScrollButton);
      await task(500);

      expect(scrollBySpy).toHaveBeenCalledOnce();
      expect(ctx.scrollContainer.scrollLeft).toBeGreaterThan(0);
    });

    it.skip('should scroll back when backward scroll button is clicked', async () => {
      const ctx = await createFixture({ activeTab: 2, scrollButtons: true, width: '150px' });

      await frame();
      await frame();

      const startScrollLeft = ctx.scrollContainer.scrollLeft;
      const scrollBySpy = vi.spyOn(ctx.scrollContainer, 'scrollBy');
      expect(ctx.scrollContainer.scrollLeft).toBeGreaterThan(0);

      await userEvent.click(ctx.backwardScrollButton);
      await task(500);

      expect(scrollBySpy).toHaveBeenCalledOnce();
      expect(ctx.scrollContainer.scrollLeft).toBeLessThan(startScrollLeft);
    });
  });
});

class TabsHarness extends TestHarness<TabBarComponent> {
  public containerElement!: HTMLElement;
  public scrollContainer!: HTMLElement;

  constructor(el: TabBarComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.containerElement = getShadowElement(this.element, TAB_BAR_CONSTANTS.selectors.ROOT);
    this.scrollContainer = getShadowElement(this.element, TAB_BAR_CONSTANTS.selectors.SCROLL_CONTAINER);
  }

  public get tabs(): TabComponent[] {
    return Array.from(this.element.querySelectorAll<TabComponent>(TAB_CONSTANTS.elementName));
  }

  public get selectedTabCount(): number {
    return this.tabs.reduce((count, tab) => (count += tab.selected ? 1 : 0), 0);
  }

  public async clickTab(index: number): Promise<void> {
    await userEvent.click(this.tabs[index]);
  }

  public async forceClickTab(index: number): Promise<void> {
    await userEvent.click(this.tabs[index], { force: true });
  }

  public get hasScrollButtons(): boolean {
    return !!this.containerElement.querySelector(`.${TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON}`);
  }

  public get backwardScrollButton(): HTMLButtonElement {
    return this.containerElement.querySelector(`.${TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON}:first-child`) as HTMLButtonElement;
  }

  public get forwardScrollButton(): HTMLButtonElement {
    return this.containerElement.querySelector(`.${TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON}:last-child`) as HTMLButtonElement;
  }

  public get backwardScrollButtonIcon(): IIconComponent {
    return this.containerElement.querySelector(`.${TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON}:first-child forge-icon`) as IIconComponent;
  }

  public get forwardScrollButtonIcon(): IIconComponent {
    return this.containerElement.querySelector(`.${TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON}:last-child forge-icon`) as IIconComponent;
  }
}

interface TabsFixtureConfig {
  activeTab?: number | null;
  disabled?: boolean;
  clustered?: boolean;
  vertical?: boolean;
  stacked?: boolean;
  inverted?: boolean;
  scrollButtons?: boolean;
  autoActivate?: boolean;
  removable?: boolean;
  theme?: 'default' | 'app-bar';
  width?: string;
  height?: string;
  tabDisabled?: [boolean, boolean, boolean];
  tabNames?: [string, string, string];
}

async function createFixture({
  activeTab,
  disabled,
  clustered,
  vertical,
  stacked,
  inverted,
  scrollButtons,
  autoActivate,
  removable,
  theme,
  width,
  height,
  tabDisabled,
  tabNames
}: TabsFixtureConfig = {}): Promise<TabsHarness> {
  const screen = render(html`
    <forge-tab-bar
      ?disabled=${disabled}
      .vertical=${!!vertical}
      .clustered=${!!clustered}
      .stacked=${!!stacked}
      .inverted=${!!inverted}
      .autoActivate=${!!autoActivate}
      .scrollButtons=${!!scrollButtons}
      .removable=${!!removable}
      .theme=${theme ?? 'default'}
      style="width: ${width ?? 'auto'}; height: ${height ?? 'auto'}">
      <forge-tab ?disabled=${tabDisabled?.[0]} .name=${tabNames?.[0] ?? ''}>${tabNames?.[0] ?? 'First'}</forge-tab>
      <forge-tab ?disabled=${tabDisabled?.[1]} .name=${tabNames?.[1] ?? ''}>${tabNames?.[1] ?? 'Second'}</forge-tab>
      <forge-tab ?disabled=${tabDisabled?.[2]} .name=${tabNames?.[2] ?? ''}>${tabNames?.[2] ?? 'Third'}</forge-tab>
    </forge-tab-bar>
  `);
  const el = screen.container.querySelector('forge-tab-bar') as TabBarComponent;

  // Wait for tab bar to render and connect
  await el.updateComplete;
  // Wait for tabs to connect and context to propagate
  await frame();
  await frame();

  // Set active tab after initial render when tabs exist
  if (activeTab !== undefined) {
    el.activeTab = activeTab;
    await el.updateComplete;
    await frame();
  }

  return new TabsHarness(el);
}

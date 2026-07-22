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
import type { ITabBarComponent } from './tab-bar/tab-bar.js';
import { TAB_CONSTANTS } from './tab/tab-constants.js';
import { TabComponent, type ITabComponent } from './tab/tab.js';
import { TabPanelComponent } from './tab-panel/tab-panel.js';

import './tab-bar/tab-bar.js';
import './tab-panel/tab-panel.js';

describe('Tabs', () => {
  it('should contain shadow root', async () => {
    const ctx = await createFixture();
    expect(ctx.element.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const ctx = await createFixture();
    await expect(ctx.element).toBeAccessible();
  });

  it('should set default active tab', async () => {
    const ctx = await createFixture({ activeTab: 1 });
    expect(ctx.element.activeTab).toBe(1);
    expect(ctx.tabs[1].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should set active tab from child tab with active property', async () => {
    const ctx = await createFixture({ tabActive: [false, true, false] });
    expect(ctx.tabs[1].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should not set active tab when no active tab or active tab name set and no child tabs are active', async () => {
    const ctx = await createFixture();
    expect(ctx.element.activeTab).toBeNullable();
    expect(ctx.activeTabCount).toBe(0);
  });

  it('should override child tab active property when activeTab is set', async () => {
    const ctx = await createFixture({ activeTab: 0, tabActive: [false, true, false] });
    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].active).toBe(true);
    expect(ctx.tabs[1].active).toBe(false);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should override child tab active property when activeTabName is set', async () => {
    const ctx = await createFixture({ activeTabName: 'first', tabNames: ['first', 'second', 'third'], tabActive: [false, true, false] });
    expect(ctx.element.activeTabName).toBe('first');
    expect(ctx.tabs[0].active).toBe(true);
    expect(ctx.tabs[1].active).toBe(false);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should update active tab', async () => {
    const ctx = await createFixture({ activeTab: 0 });
    ctx.element.activeTab = 1;
    await ctx.updateComplete;
    expect(ctx.element.activeTab).toBe(1);
    expect(ctx.tabs[1].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
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

  it('should deselect tab when active tab set to undefined', async () => {
    const ctx = await createFixture({ activeTab: 0 });
    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);

    ctx.element.activeTab = undefined;
    await ctx.updateComplete;
    expect(ctx.element.activeTab).toBeNullable();
    expect(ctx.activeTabCount).toBe(0);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).toBe(false);
  });

  it('should deselect tab when active tab set to null', async () => {
    const ctx = await createFixture({ activeTab: 0 });
    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);

    ctx.element.activeTab = null;
    await ctx.updateComplete;
    expect(ctx.element.activeTab).toBeNullable();
    expect(ctx.activeTabCount).toBe(0);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).toBe(false);
  });

  it('should set active tab by name', async () => {
    const ctx = await createFixture({ tabNames: ['first', 'second', 'third'] });
    ctx.element.activeTabName = 'second';
    await ctx.updateComplete;
    expect(ctx.element.activeTabName).toBe('second');
    expect(ctx.tabs[1].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should set active tab by name via fixture config', async () => {
    const ctx = await createFixture({ activeTabName: 'third', tabNames: ['first', 'second', 'third'] });
    expect(ctx.element.activeTabName).toBe('third');
    expect(ctx.tabs[2].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should prioritize activeTabName over activeTab when both change', async () => {
    const ctx = await createFixture({ tabNames: ['first', 'second', 'third'] });
    ctx.element.activeTab = 0;
    ctx.element.activeTabName = 'third';
    await ctx.updateComplete;
    expect(ctx.element.activeTabName).toBe('third');
    expect(ctx.tabs[2].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
  });

  it('should warn when activeTabName does not match any tab', async () => {
    const ctx = await createFixture({ tabNames: ['first', 'second', 'third'] });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    ctx.element.activeTabName = 'nonexistent';
    await ctx.updateComplete;
    expect(warnSpy).toHaveBeenCalledWith('No tab found with name "nonexistent", no tab made active.');
    expect(ctx.activeTabCount).toBe(0);
    warnSpy.mockRestore();
  });

  it('should handle switching between tabs by name', async () => {
    const ctx = await createFixture({ activeTabName: 'first', tabNames: ['first', 'second', 'third'] });
    expect(ctx.tabs[0].active).toBe(true);

    ctx.element.activeTabName = 'second';
    await ctx.updateComplete;
    expect(ctx.tabs[0].active).toBe(false);
    expect(ctx.tabs[1].active).toBe(true);

    ctx.element.activeTabName = 'third';
    await ctx.updateComplete;
    expect(ctx.tabs[1].active).toBe(false);
    expect(ctx.tabs[2].active).toBe(true);
  });

  it('should handle empty activeTabName', async () => {
    const ctx = await createFixture({ activeTabName: 'second', tabNames: ['first', 'second', 'third'] });
    expect(ctx.tabs[1].active).toBe(true);
    ctx.element.activeTabName = '';
    await ctx.updateComplete;
    expect(ctx.activeTabCount).toBe(0);
  });

  it('should update activeTabName from attribute', async () => {
    const ctx = await createFixture({ tabNames: ['first', 'second', 'third'] });
    ctx.element.setAttribute('active-tab-name', 'third');
    await ctx.updateComplete;
    expect(ctx.element.activeTabName).toBe('third');
    expect(ctx.tabs[2].active).toBe(true);
  });

  it('should preserve activeTabName when a non-active tab is removed', async () => {
    const ctx = await createFixture({ activeTabName: 'second', tabNames: ['first', 'second', 'third'] });
    expect(ctx.element.activeTabName).toBe('second');

    ctx.tabs[2].remove();
    expect(ctx.element.activeTabName).toBe('second');
    expect(ctx.tabs[1].active).toBe(true);
  });

  it('should warn when multiple tabs have the same name', async () => {
    const ctx = await createFixture();
    await ctx.updateComplete;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    ctx.tabs[0].name = 'duplicate';
    await ctx.tabs[0].updateComplete;
    ctx.tabs[1].name = 'duplicate';
    await ctx.tabs[1].updateComplete;
    expect(warnSpy).toHaveBeenCalledWith('Multiple tabs with the name "duplicate" found. Each tab should have a unique name.');
    warnSpy.mockRestore();
  });

  it('should warn when a tab name is changed to match an existing tab name', async () => {
    const ctx = await createFixture();
    ctx.tabs[0].name = 'first';
    await ctx.tabs[0].updateComplete;
    ctx.tabs[1].name = 'second';
    await ctx.tabs[1].updateComplete;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    ctx.tabs[2].name = 'first';
    await ctx.tabs[2].updateComplete;
    expect(warnSpy).toHaveBeenCalledWith('Multiple tabs with the name "first" found. Each tab should have a unique name.');
    warnSpy.mockRestore();
  });

  it('should not warn when tabs have unique names', async () => {
    const ctx = await createFixture();
    await ctx.updateComplete;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    ctx.tabs[0].name = 'first';
    await ctx.tabs[0].updateComplete;
    ctx.tabs[1].name = 'second';
    await ctx.tabs[1].updateComplete;
    ctx.tabs[2].name = 'third';
    await ctx.tabs[2].updateComplete;
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should not warn when tab name is empty', async () => {
    const ctx = await createFixture();
    await ctx.updateComplete;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    ctx.tabs[0].name = '';
    await ctx.tabs[0].updateComplete;
    ctx.tabs[1].name = '';
    await ctx.tabs[1].updateComplete;
    ctx.tabs[2].name = '';
    await ctx.tabs[2].updateComplete;
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should set disabled', async () => {
    const ctx = await createFixture({ disabled: true });
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

  it('should select tab when clicked', async () => {
    const ctx = await createFixture();
    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
    expect(ctx.activeTabCount).toBe(0);

    await ctx.clickTab(1);
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should not select tab if disabled tab clicked', async () => {
    const ctx = await createFixture({ disabled: true });
    expect(ctx.activeTabCount).toBe(0);

    await ctx.forceClickTab(1);
    expect(ctx.activeTabCount).toBe(0);
  });

  it('should select tab with enter key', async () => {
    const ctx = await createFixture();
    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
    expect(ctx.activeTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{Enter}');
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should select tab with space key', async () => {
    const ctx = await createFixture();
    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
    expect(ctx.activeTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard(' ');
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should navigate to next tab when right arrow is pressed', async () => {
    const ctx = await createFixture();
    expect(ctx.activeTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(ctx.tabs[1].matches(':focus')).toBe(true);
  });

  it('should navigate to previous tab when left arrow is pressed', async () => {
    const ctx = await createFixture();
    expect(ctx.activeTabCount).toBe(0);

    ctx.tabs[1].focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(ctx.tabs[0].matches(':focus')).toBe(true);
  });

  it('should not navigate if up or down arrow key is pressed when not in vertical mode', async () => {
    const ctx = await createFixture();
    expect(ctx.activeTabCount).toBe(0);

    ctx.tabs[1].focus();
    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{ArrowDown}');
    expect(ctx.tabs[1].matches(':focus')).toBe(true);
  });

  it('should not select tab when navigating via keyboard', async () => {
    const ctx = await createFixture();
    expect(ctx.activeTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.activeTabCount).toBe(0);
  });

  it('should select tab when navigating via keyboard and auto activate is enabled', async () => {
    const ctx = await createFixture({ activeTab: 0, autoActivate: true });
    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
    expect(ctx.tabs[0].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.tabs[1].active).toBe(true);
    expect(ctx.activeTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should navigate to last tab when end is pressed', async () => {
    const ctx = await createFixture();
    ctx.tabs[0].focus();
    await userEvent.keyboard('{End}');
    expect(ctx.tabs[2].matches(':focus')).toBe(true);
    expect(ctx.activeTabCount).toBe(0);
  });

  it('should navigate to first tab when home is pressed', async () => {
    const ctx = await createFixture();
    ctx.tabs[2].focus();
    await userEvent.keyboard('{Home}');
    expect(ctx.tabs[0].matches(':focus')).toBe(true);
    expect(ctx.activeTabCount).toBe(0);
  });

  it('should not skip disabled tabs when navigating via keyboard', async () => {
    const ctx = await createFixture();
    ctx.tabs[1].disabled = true;
    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.tabs[2].matches(':focus')).toBe(false);
  });

  it('should not activate disabled tab when focused and auto activate is enabled', async () => {
    const ctx = await createFixture({ autoActivate: true });
    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
    ctx.tabs[1].disabled = true;
    ctx.tabs[1].focus();
    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.tabs[1].active).toBe(false);
    expect(ctx.activeTabCount).toBe(0);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should not activate disabled tab when clicked', async () => {
    const ctx = await createFixture();
    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
    ctx.tabs[1].disabled = true;
    await ctx.forceClickTab(1);
    expect(ctx.tabs[1].active).toBe(false);
    expect(ctx.activeTabCount).toBe(0);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should focus first tab when navigating via keyboard from last tab', async () => {
    const ctx = await createFixture();
    ctx.tabs[2].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(ctx.tabs[0].matches(':focus')).toBe(true);
  });

  it('should focus last tab when navigating via keyboard from first tab', async () => {
    const ctx = await createFixture();
    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(ctx.tabs[2].matches(':focus')).toBe(true);
  });

  it('should blur tab', async () => {
    const ctx = await createFixture();
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
    expect(ctx.activeTabCount).toBe(1);
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
    expect(ctx.activeTabCount).toBe(1);
    expect(selectSpy).not.toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should cancel change event', async () => {
    const ctx = await createFixture({ activeTab: 0 });
    const changeSpy = vi.fn(evt => evt.preventDefault());
    ctx.element.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);
    await ctx.clickTab(1);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.tabs[1].selected).toBe(false);
    expect(ctx.activeTabCount).toBe(1);
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
    expect(ctx.activeTabCount).toBe(1);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  describe('when vertical', () => {
    it('should be accessible', async () => {
      const ctx = await createFixture({ vertical: true });
      await expect(ctx.element).toBeAccessible();
    });

    it('should set vertical attribute', async () => {
      const ctx = await createFixture({ vertical: true });
      expect(ctx.element.vertical).toBe(true);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.VERTICAL)).toBe(true);
    });

    it('should set vertical dynamically', async () => {
      const ctx = await createFixture();
      expect(ctx.element.vertical).toBe(false);

      ctx.element.vertical = true;
      await frame();
      expect(ctx.element.vertical).toBe(true);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.VERTICAL)).toBe(true);
    });

    it('should update scroll button icons when vertical set dynamically', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '1px' });
      expect(ctx.backwardScrollButtonIcon.name).toBe('keyboard_arrow_left');
      expect(ctx.forwardScrollButtonIcon.name).toBe('keyboard_arrow_right');

      ctx.element.vertical = true;
      ctx.element.style.width = 'auto';
      ctx.element.style.height = '1px';
      await ctx.updateComplete;
      expect(ctx.backwardScrollButtonIcon.name).toBe('keyboard_arrow_up');
      expect(ctx.forwardScrollButtonIcon.name).toBe('keyboard_arrow_down');

      ctx.element.vertical = false;
      ctx.element.style.width = '1px';
      ctx.element.style.height = 'auto';
      await ctx.updateComplete;
      expect(ctx.backwardScrollButtonIcon.name).toBe('keyboard_arrow_left');
      expect(ctx.forwardScrollButtonIcon.name).toBe('keyboard_arrow_right');
    });

    it('should not navigate if left or right arrow key is pressed', async () => {
      const ctx = await createFixture({ vertical: true });
      expect(ctx.activeTabCount).toBe(0);

      ctx.tabs[1].focus();
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowRight}');
      expect(ctx.tabs[1].matches(':focus')).toBe(true);
    });

    it('should select tab when clicked', async () => {
      const ctx = await createFixture({ vertical: true });
      const changeSpy = vi.fn();
      ctx.element.addEventListener('forge-tab-bar-change', changeSpy);
      expect(ctx.activeTabCount).toBe(0);

      await ctx.clickTab(1);
      expect(ctx.tabs[1].selected).toBe(true);
      expect(ctx.activeTabCount).toBe(1);
      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
    });

    it('should show scroll buttons when scrollable', async () => {
      const ctx = await createFixture({ vertical: true, scrollButtons: true, height: '1px' });
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
      await ctx.waitForScrollableUpdate(true);
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
      await ctx.waitForScrollableUpdate(true);
      expect(ctx.element.scrollButtons).toBe(true);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).toBe(true);
      expect(ctx.hasScrollButtons).toBe(true);
      expect(ctx.backwardScrollButton).toBeTruthy();
      expect(ctx.forwardScrollButton).toBeTruthy();
    });

    it('should hide scroll buttons dynamically', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '1px' });
      expect(ctx.hasScrollButtons).toBe(true);

      ctx.element.scrollButtons = false;
      await frame();
      expect(ctx.element.scrollButtons).toBe(false);
      expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).toBe(false);
      expect(ctx.hasScrollButtons).toBe(false);
      expect(ctx.backwardScrollButton).toBeFalsy();
      expect(ctx.forwardScrollButton).toBeFalsy();
    });

    it('should show scroll buttons when new tabs are added that cause scrolling', async () => {
      const ctx = await createFixture({ scrollButtons: true, clustered: true, width: '250px' });
      expect(ctx.hasScrollButtons).toBe(false);

      const tab = new TabComponent();
      tab.textContent = 'Fourth';
      ctx.element.appendChild(tab);
      // Wait for ResizeObserver to detect overflow after tab is added
      await frame();
      await frame();
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

    it('should scroll forward when forward scroll button is clicked', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '150px' });
      const scrollBySpy = vi.spyOn(ctx.scrollContainer, 'scrollBy');
      expect(ctx.scrollContainer.scrollLeft).toBe(0);

      await userEvent.click(ctx.forwardScrollButton);
      await task(500);
      expect(scrollBySpy).toHaveBeenCalledOnce();
      expect(ctx.scrollContainer.scrollLeft).toBeGreaterThan(0);
    });

    it('should scroll back when backward scroll button is clicked', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '150px' });
      // First scroll forward to ensure we have space to scroll back
      await userEvent.click(ctx.forwardScrollButton);
      await task(500);
      const startScrollLeft = ctx.scrollContainer.scrollLeft;
      const scrollBySpy = vi.spyOn(ctx.scrollContainer, 'scrollBy');
      expect(ctx.scrollContainer.scrollLeft).toBeGreaterThan(0);

      await userEvent.click(ctx.backwardScrollButton);
      await task(500);
      expect(scrollBySpy).toHaveBeenCalledOnce();
      expect(ctx.scrollContainer.scrollLeft).toBeLessThan(startScrollLeft);
    });
  });

  describe('closable', () => {
    it('should not close tab by default when delete key is pressed', async () => {
      const ctx = await createFixture({ activeTab: 0 });
      ctx.tabs[0].focus();
      await userEvent.keyboard('{Delete}');
      expect(ctx.tabs.length).toBe(3);
    });

    it('should close tab when delete key is pressed and closable is enabled on tab bar', async () => {
      const ctx = await createFixture({ activeTab: 0, closable: true });
      const closeSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_CLOSE, closeSpy);
      ctx.tabs[0].focus();
      await userEvent.keyboard('{Delete}');
      expect(closeSpy).toHaveBeenCalledOnce();
      expect(ctx.tabs.length).toBe(2);
    });

    it('should close tab when backspace key is pressed and closable is enabled on tab bar', async () => {
      const ctx = await createFixture({ activeTab: 1, closable: true });
      const closeSpy = vi.fn();
      ctx.tabs[1].addEventListener(TAB_BAR_CONSTANTS.events.TAB_CLOSE, closeSpy);
      ctx.tabs[1].focus();
      await userEvent.keyboard('{Backspace}');
      expect(closeSpy).toHaveBeenCalledOnce();
      expect(ctx.tabs.length).toBe(2);
    });

    it('should close tab when delete key is pressed and closable is enabled on individual tab', async () => {
      const ctx = await createFixture({ activeTab: 1 });
      ctx.tabs[1].closable = true;
      const closeSpy = vi.fn();
      ctx.tabs[1].addEventListener(TAB_BAR_CONSTANTS.events.TAB_CLOSE, closeSpy);
      ctx.tabs[1].focus();
      await userEvent.keyboard('{Delete}');
      expect(closeSpy).toHaveBeenCalledOnce();
      expect(ctx.tabs.length).toBe(2);
    });

    it('should not close tab if closable is only set on tab bar but overridden on individual tab', async () => {
      const ctx = await createFixture({ activeTab: 0, closable: true });
      ctx.tabs[0].closable = false;
      const closeSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_CLOSE, closeSpy);
      ctx.tabs[0].focus();
      await userEvent.keyboard('{Delete}');
      expect(closeSpy).not.toHaveBeenCalled();
      expect(ctx.tabs.length).toBe(3);
    });

    it('should prevent tab close when close event is cancelled', async () => {
      const ctx = await createFixture({ activeTab: 2, closable: true });
      const closeSpy = vi.fn(evt => evt.preventDefault());
      ctx.tabs[2].addEventListener(TAB_BAR_CONSTANTS.events.TAB_CLOSE, closeSpy);
      ctx.tabs[2].focus();
      await userEvent.keyboard('{Delete}');
      expect(closeSpy).toHaveBeenCalledOnce();
      expect(ctx.tabs.length).toBe(3);
    });

    it('should move focus to next tab after closing a tab', async () => {
      const ctx = await createFixture({ activeTab: 0, closable: true });
      ctx.tabs[0].focus();
      await userEvent.keyboard('{Delete}');
      expect(ctx.tabs.length).toBe(2);
      expect(ctx.tabs[0].matches(':focus')).toBe(true);
    });

    it('should move focus to previous tab when closing the last tab', async () => {
      const ctx = await createFixture({ activeTab: 2, closable: true });
      ctx.tabs[2].focus();
      await userEvent.keyboard('{Delete}');
      expect(ctx.tabs.length).toBe(2);
      expect(ctx.tabs[1].matches(':focus')).toBe(true);
    });

    it('should activate next tab when closing an active tab', async () => {
      const ctx = await createFixture({ activeTab: 1, closable: true });
      expect(ctx.tabs[1].active).toBe(true);

      ctx.tabs[1].focus();
      await userEvent.keyboard('{Delete}');
      expect(ctx.tabs.length).toBe(2);
      expect(ctx.tabs[1].active).toBe(true);
    });

    it('should activate previous tab when closing the last active tab', async () => {
      const ctx = await createFixture({ activeTab: 2, closable: true });
      expect(ctx.tabs[2].active).toBe(true);

      ctx.tabs[2].focus();
      await userEvent.keyboard('{Delete}');
      expect(ctx.tabs.length).toBe(2);
      expect(ctx.tabs[1].active).toBe(true);
    });

    it('should not activate another tab when closing an inactive tab', async () => {
      const ctx = await createFixture({ activeTab: 0, closable: true });
      expect(ctx.tabs[0].active).toBe(true);
      expect(ctx.tabs[1].active).toBe(false);

      ctx.tabs[1].focus();
      await userEvent.keyboard('{Delete}');
      expect(ctx.tabs.length).toBe(2);
      expect(ctx.tabs[0].active).toBe(true);
    });
  });

  describe('menu event', () => {
    it('should dispatch forge-tab-menu event when Shift+F10 is pressed', async () => {
      const ctx = await createFixture({ activeTab: 0 });
      const menuSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_MENU, menuSpy);
      ctx.tabs[0].focus();
      await userEvent.keyboard('{Shift>}{F10}{/Shift}');
      expect(menuSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch forge-tab-menu event on the focused tab', async () => {
      const ctx = await createFixture();
      const menuSpy0 = vi.fn();
      const menuSpy1 = vi.fn();
      const menuSpy2 = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_MENU, menuSpy0);
      ctx.tabs[1].addEventListener(TAB_BAR_CONSTANTS.events.TAB_MENU, menuSpy1);
      ctx.tabs[2].addEventListener(TAB_BAR_CONSTANTS.events.TAB_MENU, menuSpy2);
      ctx.tabs[1].focus();
      await userEvent.keyboard('{Shift>}{F10}{/Shift}');
      expect(menuSpy0).not.toHaveBeenCalled();
      expect(menuSpy1).toHaveBeenCalledOnce();
      expect(menuSpy2).not.toHaveBeenCalled();
    });

    it('should dispatch forge-tab-menu event even when tab is disabled', async () => {
      const ctx = await createFixture({ disabled: true });
      const menuSpy = vi.fn();
      ctx.tabs[0].addEventListener(TAB_BAR_CONSTANTS.events.TAB_MENU, menuSpy);
      ctx.tabs[0].focus({ focusVisible: true });
      await userEvent.keyboard('{Shift>}{F10}{/Shift}');
      expect(menuSpy).toHaveBeenCalledOnce();
    });
  });

  describe('custom CSS states', () => {
    it('should apply active state when tab is active', async () => {
      const ctx = await createFixture({ activeTab: 1 });
      await ctx.tabs[0].updateComplete;
      expect(ctx.tabs[0].matches(':state(active)')).toBe(false);
      await ctx.tabs[1].updateComplete;
      expect(ctx.tabs[1].matches(':state(active)')).toBe(true);
      await ctx.tabs[2].updateComplete;
      expect(ctx.tabs[2].matches(':state(active)')).toBe(false);
    });

    it('should update active state dynamically', async () => {
      const ctx = await createFixture({ activeTab: 0 });
      await ctx.tabs[0].updateComplete;
      expect(ctx.tabs[0].matches(':state(active)')).toBe(true);
      await ctx.tabs[1].updateComplete;
      expect(ctx.tabs[1].matches(':state(active)')).toBe(false);

      ctx.element.activeTab = 1;
      await ctx.updateComplete;
      await ctx.tabs[0].updateComplete;
      expect(ctx.tabs[0].matches(':state(active)')).toBe(false);
      await ctx.tabs[1].updateComplete;
      expect(ctx.tabs[1].matches(':state(active)')).toBe(true);
    });

    it('should apply disabled state when tab is disabled', async () => {
      const ctx = await createFixture({ disabled: true });
      expect(ctx.tabs[0].matches(':state(disabled)')).toBe(true);
      expect(ctx.tabs[1].matches(':state(disabled)')).toBe(true);
      expect(ctx.tabs[2].matches(':state(disabled)')).toBe(true);
    });

    it('should apply disabled state to individual tab', async () => {
      const ctx = await createFixture();
      ctx.tabs[1].disabled = true;
      await ctx.updateComplete;
      expect(ctx.tabs[0].matches(':state(disabled)')).toBe(false);
      expect(ctx.tabs[1].matches(':state(disabled)')).toBe(true);
      expect(ctx.tabs[2].matches(':state(disabled)')).toBe(false);
    });

    it('should update disabled state dynamically', async () => {
      const ctx = await createFixture({ disabled: false });
      expect(ctx.tabs[0].matches(':state(disabled)')).toBe(false);

      ctx.element.disabled = true;
      await ctx.updateComplete;
      expect(ctx.tabs[0].matches(':state(disabled)')).toBe(true);
      expect(ctx.tabs[1].matches(':state(disabled)')).toBe(true);
      expect(ctx.tabs[2].matches(':state(disabled)')).toBe(true);
    });

    it('should apply vertical state when tab bar is vertical', async () => {
      const ctx = await createFixture({ vertical: true });
      expect(ctx.tabs[0].matches(':state(vertical)')).toBe(true);
      expect(ctx.tabs[1].matches(':state(vertical)')).toBe(true);
      expect(ctx.tabs[2].matches(':state(vertical)')).toBe(true);
    });

    it('should update vertical state dynamically', async () => {
      const ctx = await createFixture({ vertical: false });
      expect(ctx.tabs[0].matches(':state(vertical)')).toBe(false);

      ctx.element.vertical = true;
      await ctx.updateComplete;
      expect(ctx.tabs[0].matches(':state(vertical)')).toBe(true);
      expect(ctx.tabs[1].matches(':state(vertical)')).toBe(true);
      expect(ctx.tabs[2].matches(':state(vertical)')).toBe(true);
    });

    it('should apply disabled state to tab bar', async () => {
      const ctx = await createFixture({ disabled: true });
      expect(ctx.element.matches(':state(disabled)')).toBe(true);
    });

    it('should apply vertical state to tab bar', async () => {
      const ctx = await createFixture({ vertical: true });
      expect(ctx.element.matches(':state(vertical)')).toBe(true);
    });

    it('should update tab bar states dynamically', async () => {
      const ctx = await createFixture();
      expect(ctx.element.matches(':state(disabled)')).toBe(false);
      expect(ctx.element.matches(':state(vertical)')).toBe(false);

      ctx.element.disabled = true;
      ctx.element.vertical = true;
      await ctx.updateComplete;
      expect(ctx.element.matches(':state(disabled)')).toBe(true);
      expect(ctx.element.matches(':state(vertical)')).toBe(true);
    });
  });
});

class TabsHarness extends TestHarness<ITabBarComponent> {
  public containerElement!: HTMLElement;
  public scrollContainer!: HTMLElement;

  constructor(el: ITabBarComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.containerElement = getShadowElement(this.element, TAB_BAR_CONSTANTS.selectors.ROOT);
    this.scrollContainer = getShadowElement(this.element, TAB_BAR_CONSTANTS.selectors.SCROLL_CONTAINER);
  }

  public get tabs(): ITabComponent[] {
    return Array.from(this.element.querySelectorAll(TAB_CONSTANTS.elementName));
  }

  public get activeTabCount(): number {
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

  public updateComplete = this.element.updateComplete;

  public async waitForScrollableUpdate(expectedScrollable: boolean, timeout = 1000): Promise<void> {
    const startTime = Date.now();
    while ((this.element as any)._scrollable !== expectedScrollable) {
      if (Date.now() - startTime > timeout) {
        throw new Error(`Timeout waiting for _scrollable to be ${expectedScrollable}`);
      }
      await frame();
    }
  }
}

interface TabsFixtureConfig {
  activeTab?: number | null;
  activeTabName?: string;
  disabled?: boolean;
  clustered?: boolean;
  vertical?: boolean;
  stacked?: boolean;
  inverted?: boolean;
  closable?: boolean;
  scrollButtons?: boolean;
  autoActivate?: boolean;
  width?: string;
  height?: string;
  tabDisabled?: [boolean, boolean, boolean];
  tabNames?: [string?, string?, string?];
  tabActive?: [boolean, boolean, boolean];
}

async function createFixture({
  activeTab,
  activeTabName,
  disabled,
  clustered,
  vertical,
  stacked,
  inverted,
  closable,
  scrollButtons,
  autoActivate,
  width,
  height,
  tabDisabled,
  tabNames,
  tabActive
}: TabsFixtureConfig = {}): Promise<TabsHarness> {
  const screen = render(html`
    <forge-tab-bar
      .activeTab=${activeTab}
      .activeTabName=${activeTabName ?? ''}
      ?disabled=${disabled}
      .vertical=${!!vertical}
      .clustered=${!!clustered}
      .stacked=${!!stacked}
      .inverted=${!!inverted}
      .closable=${!!closable}
      .autoActivate=${!!autoActivate}
      .scrollButtons=${!!scrollButtons}
      style="width: ${width ?? 'auto'}; height: ${height ?? 'auto'}">
      <forge-tab ?disabled=${tabDisabled?.[0]} .name=${tabNames?.[0] ?? ''} .active=${!!tabActive?.[0]}>First</forge-tab>
      <forge-tab ?disabled=${tabDisabled?.[1]} .name=${tabNames?.[1] ?? ''} .active=${!!tabActive?.[1]}>Second</forge-tab>
      <forge-tab ?disabled=${tabDisabled?.[2]} .name=${tabNames?.[2] ?? ''} .active=${!!tabActive?.[2]}>Third</forge-tab>
    </forge-tab-bar>
  `);
  const el = screen.container.querySelector('forge-tab-bar') as ITabBarComponent;
  const harness = new TabsHarness(el);
  await el.updateComplete;
  harness.initElementRefs();
  return harness;
}

describe('TabPanel', () => {
  it('should render with shadow root', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector('forge-tab-panel');
    expect(panel?.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-tab-panel>Content</forge-tab-panel>`);
    const panel = screen.container.querySelector('forge-tab-panel');
    await expect(panel).toBeAccessible();
  });

  it('should have role="tabpanel"', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector('forge-tab-panel');
    expect(panel?.getAttribute('role')).toBe('tabpanel');
  });

  it('should have tabindex="-1"', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector('forge-tab-panel');
    expect(panel?.tabIndex).toBe(-1);
  });

  it('should be closed by default', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector('forge-tab-panel');
    expect(panel?.open).toBe(false);
    const styles = panel && window.getComputedStyle(panel);
    expect(styles?.display).toBe('none');
  });

  it('should apply open state when open is set', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');
    await panel?.updateComplete;

    panel!.open = true;
    await panel?.updateComplete;

    expect(panel?.open).toBe(true);
    expect(panel?.matches(':state(open)')).toBe(true);
    const styles = panel && window.getComputedStyle(panel);
    expect(styles?.display).toBe('block');
  });

  it('should update open state dynamically', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');
    await panel?.updateComplete;

    expect(panel?.open).toBe(false);
    expect(panel?.matches(':state(open)')).toBe(false);

    if (panel) {
      panel.open = true;
    }
    await panel?.updateComplete;

    expect(panel?.open).toBe(true);
    expect(panel?.matches(':state(open)')).toBe(true);
  });

  it('should connect to tab with matching id', async () => {
    const screen = render(html`
      <forge-tab-bar>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
    `);

    const panel = screen.container.querySelector('forge-tab-panel');
    const tab = screen.container.querySelector('forge-tab[name="tab1"]') as ITabComponent;

    await frame();

    expect(panel?.getAttribute('aria-labelledby')).toBe('tab1');
    expect(tab?.getAttribute('aria-controls')).toBeTruthy();
  });

  it('should not connect when for attribute is empty', async () => {
    const screen = render(html`
      <forge-tab-bar>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="">Panel 1</forge-tab-panel>
    `);

    const panel = screen.container.querySelector('forge-tab-panel');
    const tab = screen.container.querySelector('forge-tab[name="tab1"]') as ITabComponent;

    await frame();
    await frame();

    expect(panel?.open).toBe(false);
    expect(panel?.getAttribute('aria-labelledby')).toBeNullable();
    expect(tab?.getAttribute('aria-controls')).toBeNullable();
  });

  it('should close when no matching tab is found', async () => {
    const screen = render(html`
      <forge-tab-bar>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="nonexistent">Panel 1</forge-tab-panel>
    `);

    const panel = screen.container.querySelector('forge-tab-panel');

    await frame();

    expect(panel?.open).toBe(false);
  });

  it('should be open when connected tab is active', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
    `);

    const panel = screen.container.querySelector('forge-tab-panel');

    await frame();

    expect(panel?.open).toBe(true);
    const styles = panel && window.getComputedStyle(panel);
    expect(styles?.display).toBe('block');
  });

  it('should update visibility when tab changes', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
      <forge-tab-panel for="tab2">Panel 2</forge-tab-panel>
    `);

    const panel1 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab1"]');
    const panel2 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab2"]');
    const tab2 = screen.container.querySelector('forge-tab[name="tab2"]') as ITabComponent;

    await frame();

    expect(panel1?.open).toBe(true);
    expect(panel2?.open).toBe(false);

    await userEvent.click(tab2);
    await frame();

    expect(panel1?.open).toBe(false);
    expect(panel2?.open).toBe(true);
  });

  it('should receive focus when tab is activated', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
      <forge-tab-panel for="tab2">Panel 2</forge-tab-panel>
    `);

    const panel2 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab2"]');
    const tab2 = screen.container.querySelector('forge-tab[name="tab2"]') as ITabComponent;

    await userEvent.click(tab2);
    await frame();

    expect(panel2?.matches(':focus')).toBe(true);
  });

  it('should not receive focus when tab is activated if focus-mode is off', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
      <forge-tab-panel for="tab2" focus-mode="off">Panel 2</forge-tab-panel>
    `);

    const panel2 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab2"]');
    const tab2 = screen.container.querySelector('forge-tab[name="tab2"]') as ITabComponent;

    await userEvent.click(tab2);
    await frame();

    expect(panel2?.matches(':focus')).toBe(false);
  });

  it('should reconnect when for property changes', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel</forge-tab-panel>
    `);

    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');
    const tab1 = screen.container.querySelector('forge-tab[name="tab1"]') as ITabComponent;
    const tab2 = screen.container.querySelector('forge-tab[name="tab2"]') as ITabComponent;

    await frame();
    await frame();

    expect(panel?.open).toBe(true);
    expect(panel?.getAttribute('aria-labelledby')).toBe('tab1');
    expect(tab1?.getAttribute('aria-controls')).toBeTruthy();
    expect(tab2?.getAttribute('aria-controls')).toBeNullable();

    if (panel) {
      panel.for = 'tab2';
    }
    await frame();

    expect(panel?.open).toBe(false);
    expect(panel?.getAttribute('aria-labelledby')).toBe('tab2');
    expect(tab1?.getAttribute('aria-controls')).toBeNullable();
    expect(tab2?.getAttribute('aria-controls')).toBeTruthy();
  });

  it('should disconnect and close when tab is removed', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
    `);

    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');
    const tab1 = screen.container.querySelector('forge-tab[name="tab1"]') as ITabComponent;

    await frame();

    expect(panel?.open).toBe(true);

    tab1.remove();
    await frame();

    expect(panel?.open).toBe(false);
  });

  it('should auto-connect when tab with matching id registers after panel', async () => {
    const screen = render(html` <forge-tab-panel for="tab1">Panel 1</forge-tab-panel> `);

    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');

    await frame();

    expect(panel?.open).toBe(false);

    const tabBar = new (customElements.get('forge-tab-bar') as any)();
    const tab = new (customElements.get('forge-tab') as any)();
    tab.id = 'tab1';
    tab.name = 'tab1';
    tab.textContent = 'Tab 1';
    tab.active = true;
    tabBar.appendChild(tab);
    screen.container.appendChild(tabBar);

    await frame();
    await frame();

    expect(panel?.open).toBe(true);
    expect(panel?.getAttribute('aria-labelledby')).toBe('tab1');
  });

  it('should clear ARIA relationships when disconnected', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
    `);

    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');
    const tab = screen.container.querySelector('forge-tab[name="tab1"]') as ITabComponent;

    await frame();

    expect(panel?.getAttribute('aria-labelledby')).toBe('tab1');
    expect(tab?.getAttribute('aria-controls')).toBeTruthy();

    panel?.remove();
    await frame();

    expect(tab?.getAttribute('aria-controls')).toBeNullable();
  });

  it('should read for property from attribute', async () => {
    const screen = render(html`<forge-tab-panel for="tab1"></forge-tab-panel>`);
    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');

    expect(panel?.for).toBe('tab1');
    expect(panel?.getAttribute('for')).toBe('tab1');
  });

  it('should update for property and attribute', async () => {
    const screen = render(html`<forge-tab-panel></forge-tab-panel>`);
    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');

    if (panel) {
      panel.setAttribute('for', 'tab2');
    }
    await frame();

    expect(panel?.for).toBe('tab2');
  });

  it('should close when tab is not found', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${0}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
    `);
    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');
    await frame();

    expect(panel?.open).toBe(true);

    panel!.for = 'nonexistent';
    await frame();

    expect(panel?.open).toBe(false);
  });

  it('should read focus-mode property from attribute', async () => {
    const screen = render(html`<forge-tab-panel focus-mode="off"></forge-tab-panel>`);
    const panel = screen.container.querySelector<TabPanelComponent>('forge-tab-panel');

    expect(panel?.focusMode).toBe('off');
    expect(panel?.getAttribute('focus-mode')).toBe('off');
  });

  it('should render slotted content', async () => {
    const screen = render(html`<forge-tab-panel><div id="test-content">Test Content</div></forge-tab-panel>`);
    const panel = screen.container.querySelector('forge-tab-panel');
    const content = panel?.querySelector('#test-content');

    expect(content?.textContent).toBe('Test Content');
  });

  it('should handle multiple panels for different tabs', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTab=${1}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
        <forge-tab id="tab3" name="tab3">Tab 3</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
      <forge-tab-panel for="tab2">Panel 2</forge-tab-panel>
      <forge-tab-panel for="tab3">Panel 3</forge-tab-panel>
    `);

    const panel1 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab1"]');
    const panel2 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab2"]');
    const panel3 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab3"]');

    await frame();

    expect(panel1?.open).toBe(false);
    expect(panel2?.open).toBe(true);
    expect(panel3?.open).toBe(false);
  });

  it('should handle tab activation by id with panels', async () => {
    const screen = render(html`
      <forge-tab-bar .activeTabName=${'tab2'}>
        <forge-tab id="tab1" name="tab1">Tab 1</forge-tab>
        <forge-tab id="tab2" name="tab2">Tab 2</forge-tab>
        <forge-tab id="tab3" name="tab3">Tab 3</forge-tab>
      </forge-tab-bar>
      <forge-tab-panel for="tab1">Panel 1</forge-tab-panel>
      <forge-tab-panel for="tab2">Panel 2</forge-tab-panel>
      <forge-tab-panel for="tab3">Panel 3</forge-tab-panel>
    `);

    const panel1 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab1"]');
    const panel2 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab2"]');
    const panel3 = screen.container.querySelector<TabPanelComponent>('forge-tab-panel[for="tab3"]');

    await frame();

    expect(panel1?.open).toBe(false);
    expect(panel2?.open).toBe(true);
    expect(panel3?.open).toBe(false);
  });
});

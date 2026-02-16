import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { frame, task } from '../core/utils/utils.js';
import { TestHarness } from '../core/testing/test-harness.js';
import { TAB_CONSTANTS } from './tab/tab-constants.js';
import { TAB_BAR_CONSTANTS } from './tab-bar/index.js';
import type { ITabBarComponent } from './tab-bar/tab-bar.js';
import type { ITabComponent } from './tab/tab.js';
import type { IIconComponent } from '../icon/icon.js';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer/index.js';

import './tab-bar/tab-bar.js';

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

  it('should deselect tab when active tab set to undefined', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);

    ctx.element.activeTab = undefined;

    expect(ctx.element.activeTab).toBeUndefined();
    expect(ctx.selectedTabCount).toBe(0);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).toBe(false);
  });

  it('should deselect tab when active tab set to null', async () => {
    const ctx = await createFixture({ activeTab: 0 });

    expect(ctx.element.activeTab).toBe(0);
    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);

    ctx.element.activeTab = null;

    expect(ctx.element.activeTab).toBeUndefined();
    expect(ctx.selectedTabCount).toBe(0);
    expect(ctx.element.hasAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).toBe(false);
  });

  it('should set disabled', async () => {
    const ctx = await createFixture({ disabled: true });

    await expect(ctx.element).toBeAccessible();
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

    await expect(ctx.element).toBeAccessible();
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

    expect(ctx.selectedTabCount).toBe(0);

    await ctx.clickTab(1);

    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should not select tab if disabled tab clicked', async () => {
    const ctx = await createFixture({ disabled: true });

    expect(ctx.selectedTabCount).toBe(0);

    await ctx.forceClickTab(1);

    expect(ctx.selectedTabCount).toBe(0);
  });

  it('should select tab with enter key', async () => {
    const ctx = await createFixture();

    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.selectedTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{Enter}');

    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should select tab with space key', async () => {
    const ctx = await createFixture();

    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.selectedTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard(' ');

    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should navigate to next tab when right arrow is pressed', async () => {
    const ctx = await createFixture();

    expect(ctx.selectedTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
  });

  it('should navigate to previous tab when left arrow is pressed', async () => {
    const ctx = await createFixture();

    expect(ctx.selectedTabCount).toBe(0);

    ctx.tabs[1].focus();
    await userEvent.keyboard('{ArrowLeft}');

    expect(ctx.tabs[0].matches(':focus')).toBe(true);
  });

  it('should not navigate if up or down arrow key is pressed when not in vertical mode', async () => {
    const ctx = await createFixture();

    expect(ctx.selectedTabCount).toBe(0);

    ctx.tabs[1].focus();
    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{ArrowDown}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
  });

  it('should not select tab when navigating via keyboard', async () => {
    const ctx = await createFixture();

    expect(ctx.selectedTabCount).toBe(0);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.selectedTabCount).toBe(0);
  });

  it('should select tab when navigating via keyboard and auto activate is enabled', async () => {
    const ctx = await createFixture({ activeTab: 0, autoActivate: true });

    const changeSpy = vi.fn();
    ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.tabs[0].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);

    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(true);
    expect(ctx.tabs[1].selected).toBe(true);
    expect(ctx.selectedTabCount).toBe(1);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ index: 1 });
  });

  it('should navigate to last tab when end is pressed', async () => {
    const ctx = await createFixture();

    ctx.tabs[0].focus();
    await userEvent.keyboard('{End}');

    expect(ctx.tabs[2].matches(':focus')).toBe(true);
    expect(ctx.selectedTabCount).toBe(0);
  });

  it('should navigate to first tab when home is pressed', async () => {
    const ctx = await createFixture();

    ctx.tabs[2].focus();
    await userEvent.keyboard('{Home}');

    expect(ctx.tabs[0].matches(':focus')).toBe(true);
    expect(ctx.selectedTabCount).toBe(0);
  });

  it('should skip disabled tabs when navigating via keyboard', async () => {
    const ctx = await createFixture();

    ctx.tabs[1].disabled = true;
    ctx.tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(ctx.tabs[1].matches(':focus')).toBe(false);
    expect(ctx.tabs[2].matches(':focus')).toBe(true);
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
      const ctx = await createFixture({ vertical: true });

      expect(ctx.selectedTabCount).toBe(0);

      ctx.tabs[1].focus();
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowRight}');

      expect(ctx.tabs[1].matches(':focus')).toBe(true);
    });

    it('should select tab when clicked', async () => {
      const ctx = await createFixture({ vertical: true });

      const changeSpy = vi.fn();
      ctx.element.addEventListener('forge-tab-bar-change', changeSpy);

      expect(ctx.selectedTabCount).toBe(0);

      await ctx.clickTab(1);

      expect(ctx.tabs[1].selected).toBe(true);
      expect(ctx.selectedTabCount).toBe(1);
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
      await frame();

      await expect(ctx.element).toBeAccessible();
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

    it('should hide scroll buttons dynamically', async () => {
      const ctx = await createFixture({ scrollButtons: true, width: '1px' });

      expect(ctx.hasScrollButtons).toBe(true);

      ctx.element.scrollButtons = false;
      await frame();

      expect(ctx.element.scrollButtons).toBe(false);
      expect(ctx.element.getAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).toBe('false');
      expect(ctx.hasScrollButtons).toBe(false);
      expect(ctx.backwardScrollButton).toBeFalsy();
      expect(ctx.forwardScrollButton).toBeFalsy();
    });

    it('should show scroll buttons when new tabs are added that cause scrolling', async () => {
      const ctx = await createFixture({ scrollButtons: true, clustered: true, width: '250px' });

      expect(ctx.hasScrollButtons).toBe(false);

      const tab = document.createElement('forge-tab');
      tab.textContent = 'Fourth';
      ctx.element.appendChild(tab);
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

class TabsHarness extends TestHarness<ITabBarComponent> {
  public containerElement: HTMLElement;
  public scrollContainer: HTMLElement;

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
  width?: string;
  height?: string;
  tabDisabled?: [boolean, boolean, boolean];
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
  width,
  height,
  tabDisabled
}: TabsFixtureConfig = {}): Promise<TabsHarness> {
  const screen = render(html`
    <forge-tab-bar
      .activeTab=${activeTab}
      ?disabled=${disabled}
      .vertical=${!!vertical}
      .clustered=${!!clustered}
      .stacked=${!!stacked}
      .inverted=${!!inverted}
      .autoActivate=${!!autoActivate}
      .scrollButtons=${!!scrollButtons}
      style="width: ${width ?? 'auto'}; height: ${height ?? 'auto'}">
      <forge-tab ?disabled=${tabDisabled?.[0]}>First</forge-tab>
      <forge-tab ?disabled=${tabDisabled?.[1]}>Second</forge-tab>
      <forge-tab ?disabled=${tabDisabled?.[2]}>Third</forge-tab>
    </forge-tab-bar>
  `);
  const el = screen.container.querySelector('forge-tab-bar') as ITabBarComponent;
  return new TabsHarness(el);
}

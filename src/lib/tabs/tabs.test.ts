import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { task } from '../core/utils/utils';
import { TestHarness } from '../../test/utils/test-harness';
import { TAB_CONSTANTS } from './tab/tab-constants';
import { TAB_BAR_CONSTANTS } from './tab-bar';
import type { ITabBarComponent } from './tab-bar/tab-bar';
import type { ITabComponent } from './tab/tab';
import type { IIconComponent } from '../icon/icon';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer';

import './tab-bar/tab-bar';

describe('Tabs', () => {
  it('should contain shadow root', async () => {
    const el = await createFixture();
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await createFixture();
    await expect(el).to.be.accessible();
  });

  it('should forward aria-label to internal tablist element', async () => {
    const el = await createFixture();
    const scrollContainerEl = getShadowElement(el, TAB_BAR_CONSTANTS.selectors.SCROLL_CONTAINER);

    expect(scrollContainerEl.hasAttribute('aria-label')).to.be.false;

    el.setAttribute('data-aria-label', 'Test');
    await elementUpdated(el);

    expect(scrollContainerEl.getAttribute('aria-label')).to.equal('Test');
    await expect(el).to.be.accessible();
  });

  it('should set default active tab', async () => {
    const el = await createFixture({ activeTab: 1 });
    const ctx = new TabsHarness(el);

    expect(el.activeTab).to.equal(1);
    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
  });

  it('should update active tab', async () => {
    const el = await createFixture({ activeTab: 0 });
    const ctx = new TabsHarness(el);

    el.activeTab = 1;
    await elementUpdated(el);

    expect(el.activeTab).to.equal(1);
    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.be.equal(1);
  });

  it('should deselect tab when active tab set to undefined', async () => {
    const el = await createFixture({ activeTab: 0 });
    const ctx = new TabsHarness(el);

    expect(el.activeTab).to.equal(0);
    expect(ctx.tabs[0].selected).to.be.true;
    expect(ctx.selectedTabCount).to.be.equal(1);

    el.activeTab = undefined;
    await elementUpdated(el);

    expect(el.activeTab).to.equal(undefined);
    expect(ctx.selectedTabCount).to.be.equal(0);
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).to.be.false;
  });

  it('should deselect tab when active tab set to null', async () => {
    const el = await createFixture({ activeTab: 0 });
    const ctx = new TabsHarness(el);

    expect(el.activeTab).to.equal(0);
    expect(ctx.tabs[0].selected).to.be.true;
    expect(ctx.selectedTabCount).to.be.equal(1);

    el.activeTab = null;
    await elementUpdated(el);

    expect(el.activeTab).to.equal(undefined);
    expect(ctx.selectedTabCount).to.be.equal(0);
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB)).to.be.false;
  });

  it('should set disabled class', async () => {
    const el = await createFixture({ disabled: true });
    const ctx = new TabsHarness(el);

    await expect(el).to.be.accessible();
    expect(el.disabled).to.be.true;
    expect(
      ctx.tabs.every(tab => {
        const stateLayer = getShadowElement(tab, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
        return tab.classList.contains(TAB_CONSTANTS.classes.DISABLED) && stateLayer.disabled;
      })
    ).to.be.true;
  });

  it('should set stacked', async () => {
    const el = await createFixture({ stacked: true });
    const ctx = new TabsHarness(el);

    expect(el.stacked).to.be.true;
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.STACKED)).to.be.true;
    expect(ctx.tabs.every(tab => tab.stacked && tab.hasAttribute(TAB_CONSTANTS.attributes.STACKED))).to.be.true;
  });

  it('should set secondary', async () => {
    const el = await createFixture({ secondary: true });
    const ctx = new TabsHarness(el);

    expect(el.secondary).to.be.true;
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.SECONDARY)).to.be.true;
    expect(ctx.tabs.every(tab => tab.secondary && tab.hasAttribute(TAB_CONSTANTS.attributes.SECONDARY))).to.be.true;
  });

  it('should set clustered', async () => {
    const el = await createFixture({ clustered: true });

    expect(el.clustered).to.be.true;
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.CLUSTERED)).to.be.true;
  });

  it('should set inverted', async () => {
    const el = await createFixture({ inverted: true });
    const ctx = new TabsHarness(el);

    expect(el.inverted).to.be.true;
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.INVERTED)).to.be.true;
    expect(ctx.tabs.every(tab => tab.inverted && tab.hasAttribute(TAB_CONSTANTS.attributes.INVERTED))).to.be.true;
  });

  it('should set auto activate', async () => {
    const el = await createFixture({ autoActivate: true });

    expect(el.autoActivate).to.be.true;
    expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE)).to.be.true;
  });

  it('should select tab when clicked', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    const changeSpy = spy();
    el.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.clickTab(1);
    await elementUpdated(el);

    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-tab-bar-change', { detail: { index: 1 } }))).to.be.true;
  });

  it('should not select tab if disabled tab clicked', async () => {
    const el = await createFixture({ disabled: true });
    const ctx = new TabsHarness(el);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.clickTab(1);
    await elementUpdated(el);

    expect(ctx.selectedTabCount).to.equal(0);
  });

  it('should select tab with enter key', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    const changeSpy = spy();
    el.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.keydownTab(0, 'ArrowRight');
    await elementUpdated(el);

    ctx.keydownTab(1, 'Enter');
    await elementUpdated(el);

    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-tab-bar-change', { detail: { index: 1 } }))).to.be.true;
  });

  it('should select tab with space key', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    const changeSpy = spy();
    el.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.keydownTab(0, 'ArrowRight');
    await elementUpdated(el);

    ctx.keydownTab(1, ' ');
    await elementUpdated(el);

    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-tab-bar-change', { detail: { index: 1 } }))).to.be.true;
  });

  it('should navigate to next tab when right arrow is pressed', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.tabs[0].focus();
    ctx.keydownTab(0, 'ArrowRight');
    await elementUpdated(el);

    expect(ctx.tabs[1].matches(':focus')).to.be.true;
  });

  it('should navigate to previous tab when left arrow is pressed', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.tabs[1].focus();
    ctx.keydownTab(1, 'ArrowLeft');
    await elementUpdated(el);

    expect(ctx.tabs[0].matches(':focus')).to.be.true;
  });

  it('should not navigate if up or down arrow key is pressed when not in vertical mode', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.tabs[1].focus();
    ctx.keydownTab(1, 'ArrowUp');
    ctx.keydownTab(1, 'ArrowDown');
    await elementUpdated(el);

    expect(ctx.tabs[1].matches(':focus')).to.be.true;
  });

  it('should not select tab when navigating via keyboard', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    expect(ctx.selectedTabCount).to.equal(0);

    ctx.tabs[0].focus();
    ctx.keydownTab(0, 'ArrowRight');
    await elementUpdated(el);

    expect(ctx.tabs[1].matches(':focus')).to.be.true;
    expect(ctx.selectedTabCount).to.equal(0);
  });

  it('should select tab when navigating via keyboard and auto activate is enabled', async () => {
    const el = await createFixture({ activeTab: 0, autoActivate: true });
    const ctx = new TabsHarness(el);

    const changeSpy = spy();
    el.addEventListener('forge-tab-bar-change', changeSpy);

    expect(ctx.tabs[0].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);

    ctx.tabs[0].focus();
    ctx.keydownTab(0, 'ArrowRight');
    await elementUpdated(el);

    expect(ctx.tabs[1].matches(':focus')).to.be.true;
    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-tab-bar-change', { detail: { index: 1 } }))).to.be.true;
  });

  it('should navigate to last tab when end is pressed', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    ctx.tabs[0].focus();
    ctx.keydownTab(0, 'End');
    await elementUpdated(el);

    expect(ctx.tabs[2].matches(':focus')).to.be.true;
    expect(ctx.selectedTabCount).to.equal(0);
  });

  it('should navigate to first tab when home is pressed', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    ctx.tabs[2].focus();
    ctx.keydownTab(2, 'Home');
    await elementUpdated(el);

    expect(ctx.tabs[0].matches(':focus')).to.be.true;
    expect(ctx.selectedTabCount).to.equal(0);
  });

  it('should skip disabled tabs when navigating via keyboard', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    ctx.tabs[1].disabled = true;
    ctx.tabs[0].focus();
    ctx.keydownTab(0, 'ArrowRight');
    await elementUpdated(el);

    expect(ctx.tabs[1].matches(':focus')).to.be.false;
    expect(ctx.tabs[2].matches(':focus')).to.be.true;
  });

  it('should focus first tab when navigating via keyboard from last tab', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    ctx.tabs[2].focus();
    ctx.keydownTab(2, 'ArrowRight');
    await elementUpdated(el);

    expect(ctx.tabs[0].matches(':focus')).to.be.true;
  });

  it('should focus last tab when navigating via keyboard from first tab', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    ctx.tabs[0].focus();
    ctx.keydownTab(0, 'ArrowLeft');
    await elementUpdated(el);

    expect(ctx.tabs[2].matches(':focus')).to.be.true;
  });

  it('should blur tab', async () => {
    const el = await createFixture();
    const ctx = new TabsHarness(el);

    ctx.tabs[0].focus();
    await elementUpdated(el);
    expect(ctx.tabs[0].matches(':focus')).to.be.true;

    ctx.tabs[0].blur();
    await elementUpdated(el);

    expect(ctx.tabs[0].matches(':focus')).to.be.false;
  });

  it('should not dispatch selected or change event when tab is clicked while selected', async () => {
    const el = await createFixture({ activeTab: 0 });
    const ctx = new TabsHarness(el);

    const selectSpy = spy();
    ctx.tabs[0].addEventListener(TAB_CONSTANTS.events.SELECT, selectSpy);

    const changeSpy = spy();
    el.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    ctx.clickTab(0);

    expect(ctx.tabs[0].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(selectSpy.called).to.be.false;
    expect(changeSpy.called).to.be.false;
  });

  it('should not dispatch selected or change event when tab is clicked while disabled', async () => {
    const el = await createFixture({ activeTab: 0, disabled: true });
    const ctx = new TabsHarness(el);

    const selectSpy = spy();
    ctx.tabs[0].addEventListener(TAB_CONSTANTS.events.SELECT, selectSpy);

    const changeSpy = spy();
    el.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    ctx.clickTab(0);

    expect(ctx.tabs[0].selected).to.be.true;
    expect(ctx.tabs[0].className).to.contain(TAB_CONSTANTS.classes.DISABLED);
    expect(ctx.selectedTabCount).to.equal(1);
    expect(selectSpy.called).to.be.false;
    expect(changeSpy.called).to.be.false;
  });

  it('should cancel change event', async () => {
    const el = await createFixture({ activeTab: 0 });
    const ctx = new TabsHarness(el);

    const changeSpy = spy(evt => evt.preventDefault());
    el.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    ctx.clickTab(1);

    expect(ctx.tabs[0].selected).to.be.true;
    expect(ctx.tabs[1].selected).to.be.false;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(changeSpy.calledOnce).to.be.true;
  });

  it('should not dispatch change event when setting active tab', async () => {
    const el = await createFixture({ activeTab: 0 });
    const ctx = new TabsHarness(el);

    const changeSpy = spy();
    el.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, changeSpy);

    el.activeTab = 1;
    await elementUpdated(el);

    expect(ctx.tabs[0].selected).to.be.false;
    expect(ctx.tabs[1].selected).to.be.true;
    expect(ctx.selectedTabCount).to.equal(1);
    expect(changeSpy.called).to.be.false;
  });

  describe('when vertical', () => {
    it('should be accessible', async () => {
      const el = await createFixture({ vertical: true });
      await expect(el).to.be.accessible();
    });

    it('should set vertical attribute', async () => {
      const el = await createFixture({ vertical: true });
      expect(el.vertical).to.be.true;
      expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.VERTICAL)).to.be.true;
    });

    it('should set vertical dynamically', async () => {
      const el = await createFixture();

      expect(el.vertical).to.be.false;

      await elementUpdated(el);

      el.vertical = true;
      await elementUpdated(el);

      expect(el.vertical).to.be.true;
      expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.VERTICAL)).to.be.true;
    });

    it('should update scroll button icons when vertical set dynamically', async () => {
      const el = await createFixture({ scrollButtons: true, width: '1px' });
      const ctx = new TabsHarness(el);

      await elementUpdated(el);

      expect(ctx.backwardScrollButtonIcon.name).to.equal('keyboard_arrow_left');
      expect(ctx.forwardScrollButtonIcon.name).to.equal('keyboard_arrow_right');

      el.vertical = true;
      el.style.width = 'auto';
      el.style.height = '1px';
      await elementUpdated(el);

      expect(ctx.backwardScrollButtonIcon.name).to.equal('keyboard_arrow_up');
      expect(ctx.forwardScrollButtonIcon.name).to.equal('keyboard_arrow_down');

      el.vertical = false;
      el.style.width = '1px';
      el.style.height = 'auto';
      await elementUpdated(el);

      expect(ctx.backwardScrollButtonIcon.name).to.equal('keyboard_arrow_left');
      expect(ctx.forwardScrollButtonIcon.name).to.equal('keyboard_arrow_right');
    });

    it('should not navigate if left or right arrow key is pressed', async () => {
      const el = await createFixture({ vertical: true });
      const ctx = new TabsHarness(el);

      expect(ctx.selectedTabCount).to.equal(0);

      ctx.tabs[1].focus();
      ctx.keydownTab(1, 'ArrowLeft');
      ctx.keydownTab(1, 'ArrowRight');
      await elementUpdated(el);

      expect(ctx.tabs[1].matches(':focus')).to.be.true;
    });

    it('should select tab when clicked', async () => {
      const el = await createFixture({ vertical: true });
      const ctx = new TabsHarness(el);

      const changeSpy = spy();
      el.addEventListener('forge-tab-bar-change', changeSpy);

      expect(ctx.selectedTabCount).to.equal(0);

      ctx.clickTab(1);
      await elementUpdated(el);

      expect(ctx.tabs[1].selected).to.be.true;
      expect(ctx.selectedTabCount).to.equal(1);
      expect(changeSpy.calledOnce).to.be.true;
      expect(changeSpy.calledWith(new CustomEvent('forge-tab-bar-change', { detail: { index: 1 } }))).to.be.true;
    });

    it('should show scroll buttons when scrollable', async () => {
      const el = await createFixture({ vertical: true, scrollButtons: true, height: '1px' });
      const ctx = new TabsHarness(el);

      await elementUpdated(el);

      expect(el.scrollButtons).to.be.true;
      expect(ctx.hasScrollButtons).to.be.true;
      expect(ctx.backwardScrollButton).to.be.ok;
      expect(ctx.forwardScrollButton).to.be.ok;
    });
  });

  describe('scroll buttons', () => {
    it('should not show scroll buttons by default', async () => {
      const el = await createFixture({ width: '9999px' }); // Forcing an unreachable width
      const ctx = new TabsHarness(el);

      expect(el.scrollButtons).to.be.false;
      expect(ctx.hasScrollButtons).to.be.false;
    });

    it('should show scroll buttons when scrollable', async () => {
      const el = await createFixture({ scrollButtons: true, activeTab: 0 });
      const ctx = new TabsHarness(el);

      expect(ctx.hasScrollButtons).to.be.false;

      el.style.width = '1px';
      await elementUpdated(el);

      await expect(el).to.be.accessible();
      expect(el.scrollButtons).to.be.true;
      expect(ctx.hasScrollButtons).to.be.true;
      expect(ctx.backwardScrollButton).to.be.ok;
      expect(ctx.forwardScrollButton).to.be.ok;
    });

    it('should hide scroll buttons when not scrollable', async () => {
      const el = await createFixture({ scrollButtons: true, width: '1px' });
      const ctx = new TabsHarness(el);

      await elementUpdated(el);
      expect(ctx.hasScrollButtons).to.be.true;

      el.style.width = '9999px';
      await elementUpdated(el);
      expect(ctx.hasScrollButtons).to.be.false;
    });

    it('should show scroll buttons when scrollable dynamically', async () => {
      const el = await createFixture({ scrollButtons: false });
      const ctx = new TabsHarness(el);

      expect(ctx.hasScrollButtons).to.be.false;

      el.style.width = '1px';
      el.scrollButtons = true;
      await elementUpdated(el);

      expect(el.scrollButtons).to.be.true;
      expect(el.hasAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).to.be.true;
      expect(ctx.hasScrollButtons).to.be.true;
      expect(ctx.backwardScrollButton).to.be.ok;
      expect(ctx.forwardScrollButton).to.be.ok;
    });

    it('should hide scroll buttons dynamically', async () => {
      const el = await createFixture({ scrollButtons: true, width: '1px' });
      const ctx = new TabsHarness(el);

      await elementUpdated(el);
      expect(ctx.hasScrollButtons).to.be.true;

      el.scrollButtons = false;
      await elementUpdated(el);

      expect(el.scrollButtons).to.be.false;
      expect(el.getAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS)).to.equal('false');
      expect(ctx.hasScrollButtons).to.be.false;
      expect(ctx.backwardScrollButton).not.to.be.ok;
      expect(ctx.forwardScrollButton).not.to.be.ok;
    });

    it('should scroll forward when forward scroll button is clicked', async () => {
      const el = await createFixture({ scrollButtons: true, width: '150px' });
      const ctx = new TabsHarness(el);

      // Must wait two animation frames for scroll state to be updated
      await elementUpdated(el);
      await elementUpdated(el);

      const scrollBySpy = spy(ctx.scrollContainer, 'scrollBy');

      expect(ctx.scrollContainer.scrollLeft).to.equal(0);

      ctx.forwardScrollButton.click();
      await task(500);
      await elementUpdated(el);

      expect(scrollBySpy.calledOnce).to.be.true;
      expect(ctx.scrollContainer.scrollLeft).to.be.greaterThan(0);
    });

    it('should scroll back when backward scroll button is clicked', async () => {
      const el = await createFixture({ activeTab: 2, scrollButtons: true, width: '150px' });
      const ctx = new TabsHarness(el);

      // Must wait two animation frames for scroll state to be updated
      await elementUpdated(el);
      await elementUpdated(el);

      const startScrollLeft = ctx.scrollContainer.scrollLeft;
      const scrollBySpy = spy(ctx.scrollContainer, 'scrollBy');
      expect(ctx.scrollContainer.scrollLeft).to.be.greaterThan(0);

      ctx.backwardScrollButton.click();
      await task(500);
      await elementUpdated(el);

      expect(scrollBySpy.calledOnce).to.be.true;
      expect(ctx.scrollContainer.scrollLeft).to.be.lessThan(startScrollLeft);
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

  public clickTab(index: number): void {
    this.tabs[index]?.click();
  }

  public keydownTab(index: number, key: string): void {
    this.tabs[index]?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
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
  secondary?: boolean;
  inverted?: boolean;
  scrollButtons?: boolean;
  autoActivate?: boolean;
  width?: string;
  height?: string;
}

async function createFixture({
  activeTab,
  disabled,
  clustered,
  vertical,
  stacked,
  secondary,
  inverted,
  scrollButtons,
  autoActivate,
  width,
  height
}: TabsFixtureConfig = {}): Promise<ITabBarComponent> {
  return fixture(html`
    <forge-tab-bar
      .activeTab=${activeTab}
      .disabled=${disabled}
      .vertical=${vertical}
      .clustered=${clustered}
      .stacked=${stacked}
      .secondary=${secondary}
      .inverted=${inverted}
      .autoActivate=${autoActivate}
      .scrollButtons=${scrollButtons}
      style="width: ${width ?? 'auto'}; height: ${height ?? 'auto'}">
      <forge-tab>First</forge-tab>
      <forge-tab>Second</forge-tab>
      <forge-tab>Third</forge-tab>
    </forge-tab-bar>
  `);
}

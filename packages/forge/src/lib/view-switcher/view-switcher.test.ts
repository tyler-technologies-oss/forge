import { expect } from '@esm-bundle/chai';
import { nothing } from 'lit';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { IViewSwitcherComponent } from './view-switcher.js';
import { IViewComponent } from './view/view.js';
import { VIEW_SWITCHER_CONSTANTS } from './view-switcher-constants.js';
import { task } from '../core/utils/utils.js';

import './view-switcher.js';

describe('View Switcher', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.viewSwitcher.shadowRoot).to.not.be.null;
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.viewSwitcher.animationType).to.equal('none');
  });

  it('should show first view by default', async () => {
    const harness = await createFixture();

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should show view based on index attribute', async () => {
    const harness = await createFixture({ index: 1 });

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;
  });

  it('should show specific view with slide animation', async () => {
    const harness = await createFixture({ index: 1, animationType: 'slide' });

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;
  });

  it('should show specific view with fade animation', async () => {
    const harness = await createFixture({ index: 1, animationType: 'fade' });

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;
  });

  it('should handle new view being added dynamically', async () => {
    const harness = await createFixture();

    expect(harness.views.length).to.equal(3);

    harness.addView();
    await elementUpdated(harness.viewSwitcher);

    expect(harness.views.length).to.equal(4);
    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.index = harness.views.length - 1;
    expect(harness.viewSwitcher.index).to.equal(harness.views.length - 1);
    expect(harness.isViewVisible(harness.views.length - 1)).to.be.true;
  });

  it('should handle views being removed dynamically', async () => {
    const harness = await createFixture();

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.views.length).to.equal(3);

    harness.views[1].remove();
    await elementUpdated(harness.viewSwitcher);

    expect(harness.views.length).to.equal(2);
    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.index = 1;
    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;
  });

  it('should slide to next view', async () => {
    const harness = await createFixture({ animationType: 'slide' });

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.next();
    await harness.animationComplete;

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;
  });

  it('should slide to previous view', async () => {
    const harness = await createFixture({ index: 1, animationType: 'slide' });

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;

    harness.viewSwitcher.previous();
    await harness.animationComplete;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should slide to first view', async () => {
    const harness = await createFixture({ index: 2, animationType: 'slide' });

    expect(harness.viewSwitcher.index).to.equal(2);
    expect(harness.isViewVisible(2)).to.be.true;

    harness.viewSwitcher.goToStart();
    await harness.animationComplete;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should fade to next view', async () => {
    const harness = await createFixture({ animationType: 'fade' });

    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.next();
    await harness.animationComplete;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.isViewVisible(1)).to.be.true;
  });

  it('should fade to previous view', async () => {
    const harness = await createFixture({ index: 1, animationType: 'fade' });

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;

    harness.viewSwitcher.previous();
    await harness.animationComplete;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should go to last view', async () => {
    const harness = await createFixture({ index: 0, animationType: 'fade' });

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.goToEnd();
    await harness.animationComplete;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(2);
    expect(harness.isViewVisible(2)).to.be.true;
  });

  it('should go to first view', async () => {
    const harness = await createFixture({ index: 2, animationType: 'fade' });

    expect(harness.viewSwitcher.index).to.equal(2);
    expect(harness.isViewVisible(2)).to.be.true;

    harness.viewSwitcher.goToStart();
    await harness.animationComplete;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should not change view if negative index is specified', async () => {
    const harness = await createFixture();

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.index = -1;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(-1);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should not switch to view if index is out of range', async () => {
    const harness = await createFixture();

    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.index = 3;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(3);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should toggle views synchronously without a transition', async () => {
    const harness = await createFixture({ animationType: 'none' });

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;

    harness.viewSwitcher.index = 1;
    await elementUpdated(harness.viewSwitcher);
    harness.viewSwitcher.index = 0;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(0);
    expect(harness.isViewVisible(0)).to.be.true;
  });

  it('should show last view if new views are added where current view index is outside bounds', async () => {
    const harness = await createFixture({ index: 2 });

    expect(harness.viewSwitcher.index).to.equal(2);
    expect(harness.isViewVisible(2)).to.be.true;

    harness.views[2].remove();
    harness.addView();
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(2);
    expect(harness.isViewVisible(2)).to.be.true;
  });

  it('should adjust height of container to match that of active view', async () => {
    const harness = await createFixture();

    const originalViewSwitcherHeight = harness.viewSwitcher.offsetHeight;

    harness.viewSwitcher.index = 1;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.offsetHeight).to.be.greaterThan(originalViewSwitcherHeight);

    harness.viewSwitcher.index = 0;
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.offsetHeight).to.equal(originalViewSwitcherHeight);
  });

  it('should set view index to 0 if all views are removed', async () => {
    const harness = await createFixture({ index: 1 });

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;

    harness.views.forEach(v => v.remove());
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(0);
  });

  it('should set view index to last view if views are added that are less than the current view index', async () => {
    const harness = await createFixture({ index: 2 });

    expect(harness.viewSwitcher.index).to.equal(2);
    expect(harness.isViewVisible(2)).to.be.true;

    harness.views[2].remove();
    await elementUpdated(harness.viewSwitcher);

    expect(harness.viewSwitcher.index).to.equal(1);
    expect(harness.isViewVisible(1)).to.be.true;
  });
});

class ViewSwitcherHarness {
  constructor(public readonly viewSwitcher: IViewSwitcherComponent) {}

  public get views(): NodeListOf<IViewComponent> {
    return this.viewSwitcher.querySelectorAll('forge-view');
  }

  public addView(): void {
    const view = document.createElement('forge-view');
    view.textContent = 'New view';
    this.viewSwitcher.appendChild(view);
  }

  public get animationComplete(): Promise<void> {
    return task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
  }

  public isViewVisible(index: number): boolean {
    const visibilityProperty = this.viewSwitcher.animationType === 'none' ? 'display' : 'visibility';
    const expectedVisibleValue = this.viewSwitcher.animationType === 'none' ? 'block' : 'visible';
    const expectedHiddenValue = this.viewSwitcher.animationType === 'none' ? 'none' : 'hidden';
    const views = Array.from(this.views);

    // Check for expected view to be visible
    const visibleViewStyle = getComputedStyle(views[index]);
    const isVisible =
      !views[index].classList.contains(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN) &&
      visibleViewStyle.getPropertyValue(visibilityProperty) === expectedVisibleValue;

    // Ensure other views aren't visible
    const otherViewsHidden = views
      .filter(view => view !== views[index])
      .every(view => {
        const hiddenViewStyle = getComputedStyle(view);
        return (
          hiddenViewStyle.getPropertyValue(visibilityProperty) === expectedHiddenValue && view.classList.contains(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN)
        );
      });

    return isVisible && otherViewsHidden;
  }
}

interface IViewSwitcherFixtureConfig extends Partial<IViewSwitcherComponent> {}

async function createFixture({ index, animationType }: IViewSwitcherFixtureConfig = {}): Promise<ViewSwitcherHarness> {
  // prettier-ignore
  const viewSwitcherEl = await fixture<IViewSwitcherComponent>(html`
    <forge-view-switcher index=${index ?? nothing} animation-type=${animationType ?? nothing}>
      <forge-view>View one</forge-view>
      <forge-view>
        <div style="height: 500px;">View two</div>
      </forge-view>
      <forge-view>View three</forge-view>
    </forge-view-switcher>
  `);
  return new ViewSwitcherHarness(viewSwitcherEl);
}

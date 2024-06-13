import {
  IViewSwitcherComponent,
  defineViewSwitcherComponent,
  ViewSwitcherComponent,
  VIEW_CONSTANTS,
  IViewComponent,
  VIEW_SWITCHER_CONSTANTS,
  ViewSwitcherAnimationType,
  defineViewComponent
} from '@tylertech/forge/view-switcher';
import { removeElement, removeAllChildren, Platform, getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '@tylertech/forge/core/utils/utils';

interface ITestContext {
  context: IViewSwitcherTestContext;
}

interface IViewSwitcherTestContext {
  viewSwitcher: IViewSwitcherComponent;
  views: IViewComponent[];
  destroy(): void;
}

describe('ViewSwitcherComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineViewSwitcherComponent();
    defineViewComponent();
  });

  describe('imperative instantiation', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should show first view by default', function(this: ITestContext) {
      this.context = setupTestContext();

      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.None);
    });

    it('should show alternative view by default', async function(this: ITestContext) {
      this.context = setupTestContext(true, { index: 1 });

      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.None);
    });

    it('should show alternative view by default with slide animation', async function(this: ITestContext) {
      this.context = setupTestContext(true, { index: 1, animationType: ViewSwitcherAnimationType.Slide });

      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.Slide);
    });

    it('should show alternative view by default with fade animation', async function(this: ITestContext) {
      this.context = setupTestContext(true, { index: 1, animationType: ViewSwitcherAnimationType.Fade });

      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.Fade);
    });

    it('should handle new views being added', async function(this: ITestContext) {
      this.context = setupTestContext(false, { index: 1, animationType: ViewSwitcherAnimationType.Slide });

      // Remove all views then add to DOM
      removeAllChildren(this.context.viewSwitcher);
      document.body.appendChild(this.context.viewSwitcher);

      await frame();

      // Add all views and make sure first view is visible
      this.context.viewSwitcher.appendChild(this.context.views[0]);
      this.context.viewSwitcher.appendChild(this.context.views[1]);
      this.context.viewSwitcher.appendChild(this.context.views[2]);

      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.Slide);
    });

    it('should handle views being removed while using slide animation type', async function(this: ITestContext) {
      this.context = setupTestContext(false, { index: 0, animationType: ViewSwitcherAnimationType.Slide });
      document.body.appendChild(this.context.viewSwitcher);
      await frame();

      this.context.viewSwitcher.index = 2;
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);

      removeElement(this.context.views[2]);
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
      expect(this.context.viewSwitcher.index).toBe(1);

      removeElement(this.context.views[1]);
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
      expect(this.context.viewSwitcher.index).toBe(0);

      removeElement(this.context.views[0]);
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
      expect(this.context.viewSwitcher.index).toBe(0);
    });

    it('should handle views being removed while using fade animation type', async function(this: ITestContext) {
      this.context = setupTestContext(false, { index: 0, animationType: ViewSwitcherAnimationType.Fade });
      document.body.appendChild(this.context.viewSwitcher);
      await frame();

      this.context.viewSwitcher.index = 2;
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);

      removeElement(this.context.views[2]);
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
      expect(this.context.viewSwitcher.index).toBe(1);

      removeElement(this.context.views[1]);
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
      expect(this.context.viewSwitcher.index).toBe(0);

      removeElement(this.context.views[0]);
      await task(VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION);
      expect(this.context.viewSwitcher.index).toBe(0);
    });

    it('should show last view if new views are added where current view index is outside bounds', async function(this: ITestContext) {
      // Start with last view visible
      this.context = setupTestContext(true, { index: 2, animationType: ViewSwitcherAnimationType.None });

      await frame();
      // Remove the last view so that the view switcher will transition to the new last view (view 2);
      this.context.viewSwitcher.removeChild(this.context.views[2]);
      this.context.views.splice(2, 1);
      await frame();

      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.None);
    });

    it('should adjust height of container to match that of active view', async function(this: ITestContext) {
      this.context = setupTestContext(true, { animationType: ViewSwitcherAnimationType.Slide });
      const rootElement = getShadowElement(this.context.viewSwitcher, VIEW_SWITCHER_CONSTANTS.selectors.ROOT);
      
      await frame();

      // Store original height of first view
      const originalRootHeight = rootElement.getBoundingClientRect().height;

      // Change height of div within the second view
      const secondViewDiv = this.context.views[1].firstElementChild as HTMLDivElement;
      secondViewDiv.style.height = '500px';

      // Transition to the second view and make sure that the height actually changed
      await transitionToView(this.context.viewSwitcher, 1);
      expect(rootElement.getBoundingClientRect().height).not.toBe(originalRootHeight);
      expect(rootElement.getBoundingClientRect().height).toBe(500);

      // Transition back to the first view and make sure that the height changed back accordingly
      await transitionToView(this.context.viewSwitcher, 0);
      expect(rootElement.getBoundingClientRect().height).toBe(originalRootHeight);
    });
  });

  describe('static instantiation', function(this: ITestContext) {   
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should instantiate properly with default values', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      expect(this.context.viewSwitcher.isConnected).toBe(true);
      expect(this.context.viewSwitcher instanceof ViewSwitcherComponent).toBe(true);
      expect(this.context.viewSwitcher.index).toBe(0);
      expect(this.context.viewSwitcher.animationType).toBe(ViewSwitcherAnimationType.None);
    });

    it('should show first view by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.None);
    });

    it('should change view', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.index = 1;
      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.None);
    });

    it('should change view using slide animation', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.animationType = ViewSwitcherAnimationType.Slide;
      await transitionToView(this.context.viewSwitcher, 1);
      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.Slide);
    });

    it('should skip views when sliding in both directions', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.animationType = ViewSwitcherAnimationType.Slide;
      await transitionToView(this.context.viewSwitcher, 2);
      await transitionToView(this.context.viewSwitcher, 0);
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.Slide);
    });

    it('should change view using fade animation', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.animationType = ViewSwitcherAnimationType.Fade;
      await transitionToView(this.context.viewSwitcher, 1);
      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.Fade);
    });

    it('should toggle views', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.animationType = ViewSwitcherAnimationType.Fade;
      await transitionToView(this.context.viewSwitcher, 1);
      await transitionToView(this.context.viewSwitcher, 0);
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.Fade);
    });

    it('should toggle views synchronously', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.animationType = ViewSwitcherAnimationType.Fade;
      this.context.viewSwitcher.index = 1;
      await transitionToView(this.context.viewSwitcher, 0);
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.Fade);
    });

    it('should toggle views synchronously without a transition', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.index = 1;
      await frame();
      this.context.viewSwitcher.index = 0;
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.None);
    });

    it('should set view via next() method', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.next();
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.None);
    });

    it('should set view via previous() method', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.index = 1;
      await frame();
      this.context.viewSwitcher.previous();
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.None);
    });

    it('should go to last view', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.goToEnd();
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 2, ViewSwitcherAnimationType.None);
    });

    it('should go to first view', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.goToEnd();
      await frame();
      this.context.viewSwitcher.goToStart();
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.None);
    });

    it('should not change view if index outside bounds is specified', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.index = 10;
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 0, ViewSwitcherAnimationType.None, 10);
    });

    it('should not change view if negative index is specified', async function(this: ITestContext) {
      this.context = setupTestContext();
      await frame();
      
      this.context.viewSwitcher.index = 1;
      await frame();
      this.context.viewSwitcher.index = -10;
      await frame();
      expectVisibleView(this.context.viewSwitcher, this.context.views, 1, ViewSwitcherAnimationType.None, -10);
    });
  });

  function setupTestContext(append = true, config?: Partial<IViewSwitcherComponent>, attrs?: Map<string, string>): IViewSwitcherTestContext {
    const viewSwitcher = document.createElement(VIEW_SWITCHER_CONSTANTS.elementName) as IViewSwitcherComponent;

    const view1 = document.createElement(VIEW_CONSTANTS.elementName) as IViewComponent;
    const div1 = document.createElement('div');
    div1.textContent = 'View one';
    view1.appendChild(div1);

    const view2 = document.createElement(VIEW_CONSTANTS.elementName) as IViewComponent;
    const div2 = document.createElement('div');
    div2.textContent = 'View two';
    view2.appendChild(div2);

    const view3 = document.createElement(VIEW_CONSTANTS.elementName) as IViewComponent;
    const div3 = document.createElement('div');
    div3.textContent = 'View three';
    view3.appendChild(div3);
    
    viewSwitcher.appendChild(view1);
    viewSwitcher.appendChild(view2);
    viewSwitcher.appendChild(view3);

    if (config) {
      Object.assign(viewSwitcher, config);
    }
    
    if (attrs && attrs.size) {
      attrs.forEach((value, key) => {
        viewSwitcher.setAttribute(key, value);
      });
    }

    if (append) {
      document.body.appendChild(viewSwitcher);
    }

    return {
      viewSwitcher,
      views: [view1, view2, view3],
      destroy: () => removeElement(viewSwitcher)
    };
  }

  async function transitionToView(viewSwitcher: IViewSwitcherComponent, index: number, duration = VIEW_SWITCHER_CONSTANTS.numbers.DEFAULT_TRANSITION_DURATION): Promise<void> {
    await frame();
    viewSwitcher.index = index;
    await frame();
    // TODO(kieran.nichols): This is brittle, use transitionend listener instead?
    await task(duration + 500);
  }

  function expectVisibleView(viewSwitcher: IViewSwitcherComponent, views: IViewComponent[], index: number, animationType: ViewSwitcherAnimationType, expectedViewIndex?: number): void {
    const visibilityProperty = animationType === ViewSwitcherAnimationType.None ? 'display' : 'visibility';
    const expectedVisibleValue = animationType === ViewSwitcherAnimationType.None ? 'block' : 'visible';
    const expectedHiddenValue = animationType === ViewSwitcherAnimationType.None ? 'none' : 'hidden';

    // Check for expected view to be visible
    const visibleViewStyle = getComputedStyle(views[index]);
    expect(viewSwitcher.index).toBe(expectedViewIndex !== undefined ? expectedViewIndex : index);
    expect(views[index].classList.contains(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN)).toBe(false);
    expect(visibleViewStyle.getPropertyValue(visibilityProperty)).toBe(expectedVisibleValue);

    // Ensure other views aren't visible
    const copyViews = [...views];
    copyViews.splice(index, 1);
    copyViews.forEach(view => {
      const hiddenViewStyle = getComputedStyle(view);
      expect(hiddenViewStyle.getPropertyValue(visibilityProperty)).toBe(expectedHiddenValue);
      expect(view.classList.contains(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN)).toBe(true);
    });
  }
});

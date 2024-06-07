import { getShadowElement, removeClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IViewSwitcherComponent } from './view-switcher';
import { ViewAnimationDirection, ViewSwitcherAnimationType, VIEW_SWITCHER_CONSTANTS } from './view-switcher-constants';

export interface IViewSwitcherAdapter extends IBaseAdapter {
  getViewCount(): number;
  startViewObserver(callback: MutationCallback): void;
  stopViewObserver(): void;
  initializeSlideViews(index: number): void;
  initializeFadeViews(index: number): void;
  setActiveView(index: number): void;
  hideInactiveViews(index: number): void;
  transitionToView(fromIndex: number, toIndex: number, animationType: ViewSwitcherAnimationType, direction?: ViewAnimationDirection): Promise<void>;
  setAnimationType(type: ViewSwitcherAnimationType): void;
}

export class ViewSwitcherAdapter extends BaseAdapter<IViewSwitcherComponent> implements IViewSwitcherAdapter {
  private _rootElement: HTMLElement;
  private _slotElement: HTMLSlotElement;
  private _viewObserver: MutationObserver;

  constructor(component: IViewSwitcherComponent) {
    super(component);
    this._rootElement = getShadowElement(component, VIEW_SWITCHER_CONSTANTS.selectors.ROOT);
    this._slotElement = getShadowElement(component, VIEW_SWITCHER_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
  }

  public getViewCount(): number {
    return this._getViews().length;
  }

  public startViewObserver(callback: MutationCallback): void {
    this._viewObserver = new MutationObserver(callback);
    this._viewObserver.observe(this._component, { childList: true });
  }

  public stopViewObserver(): void {
    if (this._viewObserver) {
      this._viewObserver.disconnect();
    }
  }

  /**
   * Initializes the views with styles for a slide transition.
   * @param index The active view index.
   */
  public initializeSlideViews(index: number): void {
    let views = this._getViews();
    views.forEach((view, i) => {
      // Make sure that we remove properties if they were set from another animation type
      view.style.removeProperty('opacity');
      view.style.removeProperty('display');

      // Ensure that the currently active view is visible
      if (i === index) {
        views[index].classList.remove(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
        view.style.removeProperty('visibility');
        return;
      }

      // We disable the transition when resetting the hidden views so that the animation doesn't occur
      view.style.transition = 'none';

      // Ensure the view is hidden
      view.classList.add(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
      view.style.visibility = 'hidden';

      // Reset the position of the view to the left or right of the switcher
      if (i > index) {
        view.style.transform = 'translate3d(100%, 0, 0)';
      } else {
        view.style.transform = 'translate3d(-100%, 0, 0)';
      }
    });

    // Wait a frame for the views to reposition, then re-enable the transition for all hidden views
    window.requestAnimationFrame(() => {
      views = this._getViews();
      views.forEach((v, i) => {
        if (i === index) {
          return;
        }
        v.style.removeProperty('transition');
      });
    });
  }

  /**
   * Initializes the view styles when using a fade transition.
   * @param index The active view index.
   */
  public initializeFadeViews(index: number): void {
    const views = this._getViews();
    views.forEach((view, i) => {
      // Make sure that we remove properties if they were set from another animation type
      view.style.removeProperty('transform');
      view.style.removeProperty('display');

      // Ensure that the visible view doesn't have the hidden class
      if (i === index) {
        view.classList.remove(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
        view.style.removeProperty('visibility');
        return;
      }

      // Ensure the hidden views have the proper class
      view.classList.add(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
      view.style.visibility = 'hidden';
    });

    // Ensure that the visible view has the proper opacity
    if (views[index]) {
      views[index].style.opacity = '1';
    }
  }

  /**
   * This is used when no animation type is set to allow for snapping the view into place.
   * @param index The currently active view index.
   */
  public setActiveView(index: number): void {
    const views = this._getViews();

    views.forEach((view, i) => {
      if (i === index) {
        return;
      }
      // Hide all non-visible views
      view.classList.add(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
      view.style.display = 'none';
    });

    // Ensure that the active view is visible
    if (views[index]) {
      views[index].classList.remove(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
      views[index].style.removeProperty('display');
    }
  }

  /**
   * This is used when no animation type is specific to hide all non-visible views.
   * @param index The currently active view index.
   */
  public hideInactiveViews(index: number): void {
    const views = this._getViews();
    views.forEach((view, i) => {
      // Make sure that we remove properties if they were set from another animation type
      view.style.removeProperty('opacity');
      view.style.removeProperty('transform');
      view.style.removeProperty('visibility');

      // Ensure the active view is visible
      if (i === index) {
        view.classList.remove(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
        return;
      }

      // Ensure all non-active views are hidden
      view.classList.add(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
      view.style.display = 'none';
    });
  }

  /**
   * Initiates a slide transition from one view to another.
   * @param fromIndex The view index to transition from.
   * @param toIndex The view index to transition to.
   * @param direction The transition animation direction.
   */
  public async transitionToView(
    fromIndex: number,
    toIndex: number,
    animationType: ViewSwitcherAnimationType,
    direction?: ViewAnimationDirection
  ): Promise<void> {
    const views = this._getViews();
    const fromView = views[fromIndex];
    const toView = views[toIndex];

    return new Promise<void>(resolve => {
      // Show the view so we can calculate the height and start the transition in the next frame
      toView.style.removeProperty('visibility');

      window.requestAnimationFrame(() => {
        let transitionProp: string;
        switch (animationType) {
          case ViewSwitcherAnimationType.Slide:
            this._slideToView(fromView, toView, direction as ViewAnimationDirection);
            transitionProp = 'transform';
            break;
          case ViewSwitcherAnimationType.Fade:
            this._fadeToView(fromView, toView);
            transitionProp = 'opacity';
            break;
          default:
            return;
        }

        // Start the height transition (this will not animate if the height doesn't change)
        this._animateHeight(fromView, toView);

        if (fromView) {
          // Wait for the transform transition to complete before resolving and completing transition
          fromView.addEventListener('transitionend', transitionEndHandler);
        } else {
          toView.classList.remove(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
        }

        function transitionEndHandler(evt: TransitionEvent): void {
          if (evt.propertyName === transitionProp) {
            fromView.removeEventListener('transitionend', transitionEndHandler);
            toView.classList.remove(VIEW_SWITCHER_CONSTANTS.classes.VIEW_HIDDEN);
            resolve();
          }
        }
      });
    });
  }

  /**
   * Initiates a slide transition from one view to another.
   * @param fromIndex The view index to transition from.
   * @param toIndex The view index to transition to.
   * @param direction The transition animation direction.
   */
  private _slideToView(fromView: HTMLElement | null, toView: HTMLElement, direction: ViewAnimationDirection): void {
    // Use a CSS transform on the view to slide it in the requested direction
    if (direction === ViewAnimationDirection.Left) {
      if (fromView) {
        fromView.style.transform = 'translate3d(-100%, 0, 0)';
      }
      toView.style.transform = 'translate3d(0, 0, 0)';
    } else {
      if (fromView) {
        fromView.style.transform = 'translate3d(100%, 0, 0)';
      }
      toView.style.transform = 'translate3d(0, 0, 0)';
    }
  }

  private _fadeToView(fromView: HTMLElement | null, toView: HTMLElement): void {
    if (fromView) {
      fromView.style.opacity = '0';
    }
    toView.style.opacity = '1';
  }

  /**
   * Attempts to animate the height of our container element to match that of the next view.
   * @param fromIndex The view index we are transitioning from.
   * @param toIndex The view index we are transitioning to.
   */
  private _animateHeight(fromView: HTMLElement | null, toView: HTMLElement): void {
    const fromViewHeight = fromView ? this._getViewHeight(fromView) : 0;
    const toViewHeight = this._getViewHeight(toView);

    // We only animate the height if it is different...
    if (fromViewHeight !== toViewHeight) {
      this._rootElement.addEventListener('transitionend', this._onRootTransitionEnd.bind(this));

      // Set to the height of the current view so we can animate the height from something static
      this._setHeight(fromViewHeight);

      // We need to wait two frames before animating to the new height due to event loop
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          // Start the transition to the new view height
          this._setHeight(toViewHeight);
        });
      });
    }
  }

  /**
   * Handles the root container transitionend event.
   * @param evt The transition event.
   */
  private _onRootTransitionEnd(evt: TransitionEvent): void {
    if (evt.propertyName === 'height') {
      this._rootElement.removeEventListener('transitionend', this._onRootTransitionEnd);
      // Removes the static height from the root element so that it can grow with content
      this._rootElement.style.removeProperty('height');
    }
  }

  /**
   * Resets the animation type on the root element.
   * @param type The animation type.
   */
  public setAnimationType(type: ViewSwitcherAnimationType): void {
    removeClass([VIEW_SWITCHER_CONSTANTS.classes.VIEW_SWITCHER_SLIDE, VIEW_SWITCHER_CONSTANTS.classes.VIEW_SWITCHER_FADE], this._component);

    switch (type) {
      case ViewSwitcherAnimationType.Slide:
        this._component.classList.add(VIEW_SWITCHER_CONSTANTS.classes.VIEW_SWITCHER_SLIDE);
        break;
      case ViewSwitcherAnimationType.Fade:
        this._component.classList.add(VIEW_SWITCHER_CONSTANTS.classes.VIEW_SWITCHER_FADE);
        break;
    }
  }

  /**
   * Get all view elements.
   */
  private _getViews(): HTMLElement[] {
    return this._slotElement.assignedNodes().filter(n => n.nodeType === 1) as HTMLElement[];
  }

  /**
   * Sets the height on the root container element.
   * @param viewHeight The new height.
   */
  private _setHeight(viewHeight: number): void {
    this._rootElement.style.height = `${viewHeight}px`;
  }

  /**
   * Calculate the absolute height of a view.
   * @param view The view to calculate height from.
   */
  private _getViewHeight(view: HTMLElement): number {
    let height = 0;
    const elements = view.children.length ? (Array.from(view.children) as HTMLElement[]) : [view];

    for (const element of elements) {
      const styles = window.getComputedStyle(element);
      const margin = parseFloat(styles.marginTop as string) + parseFloat(styles.marginBottom as string);
      height += Math.ceil(element.offsetHeight + margin);
    }

    return height;
  }
}

import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/index.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { frame } from '../core/utils/utils.js';
import { VIEW_SWITCHER_CONSTANTS, ViewAnimationDirection, ViewSwitcherAnimation, ViewSwitcherAnimationType } from './view-switcher-constants.js';
import { ViewComponent } from './view/view.js';

import styles from './view-switcher.scss';

const { VIEW_HIDDEN } = VIEW_SWITCHER_CONSTANTS.classes;

/** @deprecated - This will be removed in the future. Please switch to using ViewSwitcherComponent. */
export interface IViewSwitcherComponent extends BaseLitElement {
  index: number;
  animationType: `${ViewSwitcherAnimationType}` | ViewSwitcherAnimation;
  next(): void;
  previous(): void;
  goToStart(): void;
  goToEnd(): void;
}

/**
 * @tag forge-view-switcher
 *
 * @summary A container component that manages switching between multiple child `<forge-view>` elements with configurable animations and programmatic navigation controls.
 *
 * @dependency forge-view
 *
 * @slot - The `<forge-view>` elements to switch between.
 *
 * @state slide - Applied when the animation type is `slide`.
 * @state fade - Applied when the animation type is `fade`.
 *
 * @cssproperty --forge-view-switcher-height - The `height` of the view switcher.
 * @cssproperty --forge-view-switcher-width - The `width` of the view switcher.
 * @cssproperty --forge-view-switcher-animation-duration - The duration of view switching animations.
 * @cssproperty --forge-view-switcher-animation-easing - The timing function of view switching animations.
 *
 * @csspart root - The root container element.
 */
export class ViewSwitcherComponent extends BaseLitElement implements IViewSwitcherComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = VIEW_SWITCHER_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ViewComponent];

  readonly #internals: ElementInternals;

  @query(VIEW_SWITCHER_CONSTANTS.selectors.ROOT)
  private _rootElement!: HTMLElement;

  @queryAssignedElements()
  private _views!: HTMLElement[];

  /**
   * Gets/sets the currently visible view index.
   * @default 0
   * @attribute
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => Number(value),
      toAttribute: (value: number) => (value ? String(value) : null)
    }
  })
  public index = 0;

  /**
   * Gets/sets the animation type.
   * @default "none"
   * @attribute animation-type
   */
  @property({
    attribute: 'animation-type',
    reflect: true,
    converter: { toAttribute: (value: ViewSwitcherAnimation) => removeDefaultAttribute(value, 'none') }
  })
  public animationType: `${ViewSwitcherAnimationType}` | ViewSwitcherAnimation = 'none';

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('animationType')) {
      toggleState(this.#internals, 'slide', this.animationType === 'slide');
      toggleState(this.#internals, 'fade', this.animationType === 'fade');
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('animationType')) {
      this.#initializeViews();
    } else if (changedProperties.has('index')) {
      void this.#goToView(changedProperties.get('index') as number);
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-view-switcher" part="root">
        <slot @slotchange=${this.#onSlotChange}></slot>
      </div>
    `;
  }

  /** Transitions to the next view. */
  public next(): void {
    this.index++;
  }

  /** Transitions to the previous view. */
  public previous(): void {
    this.index--;
  }

  /** Transitions to the first view. */
  public goToStart(): void {
    this.index = 0;
  }

  /** Transitions to the last view. */
  public goToEnd(): void {
    this.index = this._views.length - 1;
  }

  readonly #rootTransitionEndListener = (evt: TransitionEvent): void => {
    if (evt.propertyName === 'height') {
      this._rootElement.removeEventListener('transitionend', this.#rootTransitionEndListener);
      this._rootElement.style.removeProperty('height');
    }
  };

  #onSlotChange(): void {
    const viewCount = this._views.length;

    if (!viewCount) {
      this.index = 0;
      return;
    }

    this.#initializeViews();

    if (this.index >= viewCount) {
      this.index = viewCount - 1;
    }
  }

  #initializeViews(): void {
    switch (this.animationType) {
      case 'slide':
        this.#initializeSlideViews();
        break;
      case 'fade':
        this.#initializeFadeViews();
        break;
      default:
        this.#hideInactiveViews();
        break;
    }
  }

  async #goToView(fromIndex: number): Promise<void> {
    const isValidIndex = this.index >= 0 && this.index < this._views.length;
    if (!isValidIndex || fromIndex === this.index) {
      return;
    }

    switch (this.animationType) {
      case 'slide': {
        const direction = this.index > fromIndex ? ViewAnimationDirection.Left : ViewAnimationDirection.Right;
        await this.#transitionToView(fromIndex, this.index, 'slide', direction);
        this.#initializeSlideViews();
        break;
      }
      case 'fade':
        await this.#transitionToView(fromIndex, this.index, 'fade');
        this.#initializeFadeViews();
        break;
      default:
        this.#setActiveView();
        break;
    }
  }

  /** Initializes the views with styles for a slide transition. */
  #initializeSlideViews(): void {
    const activeIndex = this.index;

    this._views.forEach((view, i) => {
      // Make sure that we remove properties if they were set from another animation type
      view.style.removeProperty('opacity');
      view.style.removeProperty('display');

      if (i === activeIndex) {
        view.classList.remove(VIEW_HIDDEN);
        view.style.removeProperty('visibility');
        return;
      }

      // We disable the transition when resetting the hidden views so that the animation doesn't occur
      view.style.transition = 'none';
      view.classList.add(VIEW_HIDDEN);
      view.style.visibility = 'hidden';
      view.style.transform = `translate3d(${i > activeIndex ? '100%' : '-100%'}, 0, 0)`;
    });

    // Wait a frame for the views to reposition, then re-enable the transition for all hidden views
    void frame().then(() => {
      this._views.forEach((view, i) => {
        if (i !== activeIndex) {
          view.style.removeProperty('transition');
        }
      });
    });
  }

  /** Initializes the views with styles for a fade transition. */
  #initializeFadeViews(): void {
    const views = this._views;
    const activeIndex = this.index;

    views.forEach((view, i) => {
      // Make sure that we remove properties if they were set from another animation type
      view.style.removeProperty('transform');
      view.style.removeProperty('display');

      if (i === activeIndex) {
        view.classList.remove(VIEW_HIDDEN);
        view.style.removeProperty('visibility');
        return;
      }

      view.classList.add(VIEW_HIDDEN);
      view.style.visibility = 'hidden';
    });

    const activeView = views[activeIndex];
    if (activeView) {
      activeView.style.opacity = '1';
    }
  }

  /** Hides all views except the active one when no animation type is set. */
  #hideInactiveViews(): void {
    const activeIndex = this.index;

    this._views.forEach((view, i) => {
      // Make sure that we remove properties if they were set from another animation type
      view.style.removeProperty('opacity');
      view.style.removeProperty('transform');
      view.style.removeProperty('visibility');

      if (i === activeIndex) {
        view.classList.remove(VIEW_HIDDEN);
        return;
      }

      view.classList.add(VIEW_HIDDEN);
      view.style.display = 'none';
    });
  }

  /** Snaps the active view into place when no animation type is set. */
  #setActiveView(): void {
    const views = this._views;
    const activeView = views[this.index];

    views.forEach(view => {
      if (view === activeView) {
        return;
      }
      view.classList.add(VIEW_HIDDEN);
      view.style.display = 'none';
    });

    if (activeView) {
      activeView.classList.remove(VIEW_HIDDEN);
      activeView.style.removeProperty('display');
    }
  }

  async #transitionToView(fromIndex: number, toIndex: number, animationType: 'slide' | 'fade', direction?: ViewAnimationDirection): Promise<void> {
    const views = this._views;
    const fromView = views[fromIndex] as HTMLElement | undefined;
    const toView = views[toIndex];

    // Show the view so we can calculate the height and start the transition in the next frame
    toView.style.removeProperty('visibility');
    await frame();

    if (animationType === 'slide') {
      this.#slideToView(fromView, toView, direction as ViewAnimationDirection);
    } else {
      this.#fadeToView(fromView, toView);
    }

    // Start the height transition (this will not animate if the height doesn't change)
    void this.#animateHeight(fromView, toView);

    if (!fromView) {
      toView.classList.remove(VIEW_HIDDEN);
      return;
    }

    // Wait for the transition on the outgoing view to complete before completing the transition
    const transitionProperty = animationType === 'slide' ? 'transform' : 'opacity';
    await new Promise<void>(resolve => {
      const transitionEndListener = (evt: TransitionEvent): void => {
        if (evt.propertyName === transitionProperty) {
          fromView.removeEventListener('transitionend', transitionEndListener);
          toView.classList.remove(VIEW_HIDDEN);
          resolve();
        }
      };
      fromView.addEventListener('transitionend', transitionEndListener);
    });
  }

  #slideToView(fromView: HTMLElement | undefined, toView: HTMLElement, direction: ViewAnimationDirection): void {
    if (fromView) {
      fromView.style.transform = `translate3d(${direction === ViewAnimationDirection.Left ? '-100%' : '100%'}, 0, 0)`;
    }
    toView.style.transform = 'translate3d(0, 0, 0)';
  }

  #fadeToView(fromView: HTMLElement | undefined, toView: HTMLElement): void {
    if (fromView) {
      fromView.style.opacity = '0';
    }
    toView.style.opacity = '1';
  }

  /** Animates the height of the root element to match that of the next view. */
  async #animateHeight(fromView: HTMLElement | undefined, toView: HTMLElement): Promise<void> {
    const fromViewHeight = fromView ? this.#getViewHeight(fromView) : 0;
    const toViewHeight = this.#getViewHeight(toView);

    // We only animate the height if it is different
    if (fromViewHeight === toViewHeight) {
      return;
    }

    this._rootElement.addEventListener('transitionend', this.#rootTransitionEndListener);

    // Set to the height of the current view so we can animate the height from something static
    this._rootElement.style.height = `${fromViewHeight}px`;

    // We need to wait two frames before animating to the new height due to event loop
    await frame();
    await frame();
    this._rootElement.style.height = `${toViewHeight}px`;
  }

  #getViewHeight(view: HTMLElement): number {
    const elements = view.children.length ? Array.from(view.children) : [view];

    return elements.reduce((height, element) => {
      const { marginTop, marginBottom } = window.getComputedStyle(element);
      const margin = parseFloat(marginTop) + parseFloat(marginBottom);
      return height + Math.ceil((element as HTMLElement).offsetHeight + margin);
    }, 0);
  }
}

tryDefine(VIEW_SWITCHER_CONSTANTS.elementName, ViewSwitcherComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-view-switcher': IViewSwitcherComponent;
  }
}

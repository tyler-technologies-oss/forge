import { CustomElement, attachShadowTemplate, coerceNumber, FoundationProperty, upgradeProperty } from '@tylertech/forge-core';
import { ViewSwitcherAdapter } from './view-switcher-adapter';
import { ViewSwitcherFoundation } from './view-switcher-foundation';
import { VIEW_SWITCHER_CONSTANTS, ViewSwitcherAnimationType } from './view-switcher-constants';
import { ViewComponent } from './view/view';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './view-switcher.html';
import styles from './view-switcher.scss?inline';

export interface IViewSwitcherComponent extends IBaseComponent {
  index: number;
  animationType: `${ViewSwitcherAnimationType}`;
  next(): void;
  previous(): void;
  goToStart(): void;
  goToEnd(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-view-switcher': IViewSwitcherComponent;
  }
}

/**
 * The web component class behind the `<forge-view-switcher>` custom element.
 * 
 * @tag forge-view-switcher
 */
@CustomElement({
  name: VIEW_SWITCHER_CONSTANTS.elementName,
  dependencies: [ViewComponent]
})
export class ViewSwitcherComponent extends BaseComponent implements IViewSwitcherComponent {
  public static get observedAttributes(): string[] {
    return [
      VIEW_SWITCHER_CONSTANTS.attributes.INDEX,
      VIEW_SWITCHER_CONSTANTS.attributes.ANIMATION_TYPE
    ];
  }

  private _foundation: ViewSwitcherFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ViewSwitcherFoundation(new ViewSwitcherAdapter(this));
  }

  public connectedCallback(): void {
    // upgradeProperty(this, 'index');
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case VIEW_SWITCHER_CONSTANTS.attributes.INDEX:
        this.index = coerceNumber(newValue);
        break;
      case VIEW_SWITCHER_CONSTANTS.attributes.ANIMATION_TYPE:
        this.animationType = newValue as ViewSwitcherAnimationType;
        break;
    }
  }

  /** Gets/sets the currently visible view index. */
  @FoundationProperty()
  public declare index: number;
  
  /** Gets/sets the animation type. */
  @FoundationProperty()
  public declare animationType: `${ViewSwitcherAnimationType}`;

  /** Transitions to the next view. */
  public next(): void {
    this._foundation.next();
  }

  /** Transitions to the previous view. */
  public previous(): void {
    this._foundation.previous();
  }

  /** Transitions to the first view. */
  public goToStart(): void {
    this._foundation.goToStart();
  }

  /** Transitions to the last view. */
  public goToEnd(): void {
    this._foundation.goToEnd();
  }
}

import { customElement, attachShadowTemplate, coerceNumber, coreProperty, upgradeProperty } from '@tylertech/forge-core';
import { ViewSwitcherAdapter } from './view-switcher-adapter';
import { ViewSwitcherCore } from './view-switcher-core';
import { VIEW_SWITCHER_CONSTANTS, ViewSwitcherAnimationType } from './view-switcher-constants';
import { ViewComponent } from './view/view';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './view-switcher.html';
import styles from './view-switcher.scss';

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
 * @tag forge-view-switcher
 */
@customElement({
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

  private _core: ViewSwitcherCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ViewSwitcherCore(new ViewSwitcherAdapter(this));
  }

  public connectedCallback(): void {
    // upgradeProperty(this, 'index');
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
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
  @coreProperty()
  public declare index: number;
  
  /** Gets/sets the animation type. */
  @coreProperty()
  public declare animationType: `${ViewSwitcherAnimationType}`;

  /** Transitions to the next view. */
  public next(): void {
    this._core.next();
  }

  /** Transitions to the previous view. */
  public previous(): void {
    this._core.previous();
  }

  /** Transitions to the first view. */
  public goToStart(): void {
    this._core.goToStart();
  }

  /** Transitions to the last view. */
  public goToEnd(): void {
    this._core.goToEnd();
  }
}

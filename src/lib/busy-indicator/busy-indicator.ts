import { attachShadowTemplate, coerceNumber, CustomElement, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BackdropComponent } from '../backdrop';
import { ButtonComponent } from '../button';
import { CircularProgressComponent } from '../circular-progress';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { LinearProgressComponent } from '../linear-progress';
import { BusyIndicatorAdapter } from './busy-indicator-adapter';
import { BUSY_INDICATOR_CONSTANTS, BusyIndicatorLayoutDirection } from './busy-indicator-constants';
import { BusyIndicatorFoundation } from './busy-indicator-foundation';

import template from './busy-indicator.html';
import styles from './busy-indicator.scss';

export interface IBusyIndicatorComponent extends IBaseComponent {
  titleText: string;
  message: string;
  cancel: boolean;
  spinner: boolean;
  progressBar: boolean;
  progressBarDeterminate: boolean;
  progress: number;
  buffer: number;
  width: number | 'auto';
  direction: BusyIndicatorLayoutDirection;
  manageFocus: boolean;
  fixed: boolean;
  hide(force?: boolean): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-busy-indicator': IBusyIndicatorComponent;
  }

  interface HTMLElementEventMap {
    'forge-busy-indicator-cancel': CustomEvent<void>;
  }
}

/**
 * A web component that renders a busy indicator covering its parent container.
 * 
 * @tag forge-busy-indicator
 */
@CustomElement({
  name: BUSY_INDICATOR_CONSTANTS.elementName,
  dependencies: [BackdropComponent, CircularProgressComponent, LinearProgressComponent, ButtonComponent]
})
export class BusyIndicatorComponent extends BaseComponent implements IBusyIndicatorComponent {
  public static get observedAttributes(): string[] {
    return [
      BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT,
      BUSY_INDICATOR_CONSTANTS.attributes.MESSAGE,
      BUSY_INDICATOR_CONSTANTS.attributes.CANCEL,
      BUSY_INDICATOR_CONSTANTS.attributes.MINIMUM_VISIBLE_LIFETIME,
      BUSY_INDICATOR_CONSTANTS.attributes.DIRECTION,
      BUSY_INDICATOR_CONSTANTS.attributes.MANAGE_FOCUS,
      BUSY_INDICATOR_CONSTANTS.attributes.FIXED
    ];
  }

  private _foundation: BusyIndicatorFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new BusyIndicatorFoundation(new BusyIndicatorAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.show();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT:
        this.titleText = newValue;
        break;
      case BUSY_INDICATOR_CONSTANTS.attributes.MESSAGE:
        this.message = newValue;
        break;
      case BUSY_INDICATOR_CONSTANTS.attributes.CANCEL:
        this.cancel = newValue === 'true';
        break;
      case BUSY_INDICATOR_CONSTANTS.attributes.MANAGE_FOCUS:
        this.manageFocus = coerceBoolean(newValue);
        break;
      case BUSY_INDICATOR_CONSTANTS.attributes.FIXED:
        this.fixed = coerceBoolean(newValue);
        break;
    }
  }

  /** The title to be displayed. */
  @FoundationProperty()
  public titleText: string;

  /** The message to be displayed. */
  @FoundationProperty()
  public message: string;

  /** Controls whether the cancel button is visible or not. */
  @FoundationProperty()
  public cancel: boolean;

  /** Controls whether the progress spinner is visible or not. */
  @FoundationProperty()
  public spinner: boolean;

  /** Controls whether the progres bar is visible or not. */
  @FoundationProperty()
  public progressBar: boolean;

  /** Sets the progress bar determinate state. */
  @FoundationProperty()
  public progressBarDeterminate: boolean;

  /** The progress amount of the progress bar. */
  @FoundationProperty()
  public progress: number;

  /** The buffer amount of the progress bar. */
  @FoundationProperty()
  public buffer: number;

  /** Sets the width of the busy indicator element. */
  @FoundationProperty()
  public width: number | 'auto';

  /** The layout direction for alternative designs. */
  @FoundationProperty()
  public direction: BusyIndicatorLayoutDirection;

  /** Controls whether the component will manage capturing and relasing focus when opened/closed. */
  @FoundationProperty()
  public manageFocus: boolean;

  /**
   * Controls the `position` of the backdrop and surface element between `fixed` and `absolute` positioning. Default is `true`.
   * 
   * Note: use this property when you want to render the busy indicator within a specific element where it doesn't fill the
   *       full viewport heigth/width to only cover the parent element bounds.
   */
  @FoundationProperty()
  public fixed: boolean;

  /**
   * Removes the element from the DOM.
   * @param {boolean} [force=false] Whether to force removal of the busy indicator or not.
   */
  public hide(force = true): void {
    this._foundation.hide(force);
  }
}

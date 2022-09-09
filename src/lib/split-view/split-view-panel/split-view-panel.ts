import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';
import { tylIconDragVerticalVariant } from '@tylertech/tyler-icons/extended';
import { tylIconDragHandle } from '@tylertech/tyler-icons/standard';

import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { SplitViewPanelResizable, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { SplitViewPanelFoundation } from './split-view-panel-foundation';
import { SplitViewPanelAdapter } from './split-view-panel-adapter';
import { ISplitViewUpdateConfig } from '../split-view/split-view-constants';
import { ISplitViewBase } from '../core/split-view-base';
import { IconComponent, IconRegistry } from '../../icon';
import { RippleComponent } from '../../ripple';

import template from './split-view-panel.html';
import styles from './split-view-panel.scss';

export interface ISplitViewPanelComponent extends Partial<ISplitViewBase>, IBaseComponent {
  resizable: SplitViewPanelResizable;
  size: number | string;
  min: number | string;
  max: number | string | undefined;
  accessibleLabel: string;
  open: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  update(config: ISplitViewUpdateConfig): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view-panel': ISplitViewPanelComponent;
  }

  interface HTMLElementEventMap {
    'forge-split-view-panel-resize-start': CustomEvent<null>;
    'forge-split-view-panel-resize-end': CustomEvent<null>;
    'forge-split-view-panel-resize': CustomEvent<number>;
    'forge-split-view-panel-did-open': CustomEvent<null>;
    'forge-split-view-panel-did-close': CustomEvent<null>;
  }
}

@CustomElement({
  name: SPLIT_VIEW_PANEL_CONSTANTS.elementName,
  dependencies: [
    IconComponent,
    RippleComponent
  ]
})
export class SplitViewPanelComponent extends BaseComponent implements ISplitViewPanelComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.RESIZABLE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.MIN,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.MAX,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.ACCESSIBLE_LABEL,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.OPEN,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLED,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLE_CLOSE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD
    ];
  }

  private _foundation: SplitViewPanelFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconDragVerticalVariant, tylIconDragHandle]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new SplitViewPanelFoundation(new SplitViewPanelAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.RESIZABLE:
        this.resizable = newValue as SplitViewPanelResizable;
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE:
        this.size = newValue;
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.MIN:
        this.min = newValue;
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.MAX:
        if (newValue) {
          this.max = newValue;
        } else {
          this.max = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.ACCESSIBLE_LABEL:
        this.accessibleLabel = newValue;
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLED:
        if (newValue) {
          this.disabled = coerceBoolean(newValue);
        } else {
          this.disabled = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLE_CLOSE:
        if (newValue) {
          this.disableClose = coerceBoolean(newValue);
        } else {
          this.disableClose = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE:
        if (newValue) {
          this.autoClose = coerceBoolean(newValue);
        } else {
          this.autoClose = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD:
        if (newValue) {
          this.autoCloseThreshold = coerceNumber(newValue);
        } else {
          this.autoCloseThreshold = undefined;
        }
        break;
    }
  }

  /**
   * Controls which side of the panel the resize handle appears on.
   */
  @FoundationProperty()
  public resizable: SplitViewPanelResizable;

  /**
   * The initial size along the axis of orientation.
   */
  @FoundationProperty()
  public size: number | string;

  /**
   * The smallest size the panel can take along its axis of orientation.
   */
  @FoundationProperty()
  public min: number | string;

  /**
   * The largest size the panel can take along its axis of orientation.
   */
  @FoundationProperty()
  public max: number | string | undefined;

  /**
   * The ARIA label given to the resize handle.
   */
  @FoundationProperty()
  public accessibleLabel: string;

  /**
   * Controls the open state of the panel.
   */
  @FoundationProperty()
  public open: boolean;

  /**
   * Whether resize interactions are disabled or enabled.
   */
  @FoundationProperty()
  public disabled?: boolean;

  /**
   * Whether the panel can be closed via keyboard interaction.
   */
  @FoundationProperty()
  public disableClose?: boolean;

  /**
   * Whether the panel automatically closes when it reaches a size of 0.
   */
  @FoundationProperty()
  public autoClose?: boolean;

  /**
   * The size at which the panel auto closes.
   */
  @FoundationProperty()
  public autoCloseThreshold?: number;

  /**
   * Gets the size of content along the axis of orientation.
   * @returns The size of content in pixels.
   */
  public getContentSize(): number {
    return this._foundation.getContentSize();
  }

  /**
   * Gets the amount that the content can shrink along the axis of orientation before reaching its
   * min size.
   * @returns The amount that content can shrink in pixels.
   */
  public getCollapsibleSize(): number {
    return this._foundation.getCollapsibleSize();
  }

  /**
   * Sets the size of content along the axis of orientation.
   * @param size The new size of content in pixels.
   */
  public setContentSize(size: number): void {
    this._foundation.setContentSize(size);
  }

  /**
   * Updates the provided characteristics.
   * @param config An update configuration.
   */
  public update(config: ISplitViewUpdateConfig): void {
    this._foundation.update(config);
  }
}

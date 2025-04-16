import { customElement, attachShadowTemplate, coreProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';
import { tylIconDragHandle, tylIconDragVerticalVariant } from '@tylertech/tyler-icons';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ISplitViewPanelOpenEvent, ISplitViewPanelWillResizeEvent, SplitViewPanelResizable, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { SplitViewPanelCore } from './split-view-panel-core';
import { SplitViewPanelAdapter } from './split-view-panel-adapter';
import { ISplitViewUpdateConfig } from '../split-view/split-view-constants';
import { ISplitViewBase } from '../core/split-view-base';
import { IconComponent, IconRegistry } from '../../icon';
import { StateLayerComponent } from '../../state-layer';
import { FocusIndicatorComponent } from '../../focus-indicator';

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
    'forge-split-view-panel-will-resize': CustomEvent<ISplitViewPanelWillResizeEvent>;
    'forge-split-view-panel-resize-start': CustomEvent<number>;
    'forge-split-view-panel-resize-end': CustomEvent<number>;
    'forge-split-view-panel-resize': CustomEvent<number>;
    'forge-split-view-panel-will-open': CustomEvent<ISplitViewPanelOpenEvent>;
    'forge-split-view-panel-will-close': CustomEvent<ISplitViewPanelOpenEvent>;
    'forge-split-view-panel-did-open': CustomEvent<ISplitViewPanelOpenEvent>;
    'forge-split-view-panel-did-close': CustomEvent<ISplitViewPanelOpenEvent>;
  }
}

/**
 * @tag forge-split-view-panel
 *
 * @dependency forge-icon
 * @dependency forge-state-layer
 * @dependency forge-focus-indicator
 *
 * @property {SplitViewPanelResizable} [resizable="off"] - Controls which side of the panel the resize handle appears on.
 * @property {number | string} [size=200] - The initial size along the axis of orientation.
 * @property {number | string} [min=0] - The smallest size the panel can take along its axis of orientation.
 * @property {number | string | undefined} max - The largest size the panel can take along its axis of orientation.
 * @property {string} accessibleLabel - The ARIA label given to the resize handle.
 * @property {boolean} [open=true] - Controls the open state of the panel.
 * @property {boolean} [disabled=false] - Whether resize interactions are disabled or enabled.
 * @property {boolean} [allowClose=false] - Whether the panel can be closed via keyboard interaction.
 * @property {boolean} [autoClose=false] - Whether the panel automatically closes when it reaches a size of 0.
 * @property {number} [autoCloseThreshold=0] - The size at which the panel auto closes.
 *
 * @attribute {SplitViewPanelResizable} [resizable="off"] - Controls which side of the panel the resize handle appears on.
 * @attribute {number | string} [size=200] - The initial size along the axis of orientation.
 * @attribute {number | string} [min=0] - The smallest size the panel can take along its axis of orientation.
 * @attribute {number | string | undefined} max - The largest size the panel can take along its axis of orientation.
 * @attribute {string} accessible-label - The ARIA label given to the resize handle.
 * @attribute {boolean} [open=true] - Controls the open state of the panel.
 * @attribute {boolean} [disabled=false] - Whether resize interactions are disabled or enabled.
 * @attribute {boolean} [allow-close=false] - Whether the panel can be closed via keyboard interaction.
 * @attribute {boolean} [auto-close=false] - Whether the panel automatically closes when it reaches a size of 0.
 * @attribute {number} [auto-close-threshold=0] - The size at which the panel auto closes.
 *
 * @event {CustomEvent<ISplitViewPanelWillResizeEvent>} forge-split-view-panel-will-resize - Emitted before the panel resizes.
 * @event {CustomEvent<number>} forge-split-view-panel-resize-start - Emitted when the panel starts resizing.
 * @event {CustomEvent<number>} forge-split-view-panel-resize-end - Emitted when the panel stops resizing.
 * @event {CustomEvent<number>} forge-split-view-panel-resize - Emitted when the panel resizes.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-will-open - Emitted before the panel opens.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-will-close - Emitted before the panel closes.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-did-open - Emitted after the panel opens.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-did-close - Emitted after the panel closes.
 *
 * @cssproperty --forge-split-view-panel-size - The size of the panel along the axis of orientation.
 * @cssproperty --forge-split-view-panel-cursor - The cursor to display when hovering over the panel.
 */
@customElement({
  name: SPLIT_VIEW_PANEL_CONSTANTS.elementName,
  dependencies: [IconComponent, StateLayerComponent, FocusIndicatorComponent]
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
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.ALLOW_CLOSE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD
    ];
  }

  private _core: SplitViewPanelCore;

  constructor() {
    super();
    IconRegistry.define([tylIconDragVerticalVariant, tylIconDragHandle]);
    attachShadowTemplate(this, template, styles);
    this._core = new SplitViewPanelCore(new SplitViewPanelAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
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
        if (this.hasAttribute(name)) {
          this.disabled = coerceBoolean(newValue);
        } else {
          this.disabled = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.ALLOW_CLOSE:
        if (this.hasAttribute(name)) {
          this.allowClose = coerceBoolean(newValue);
        } else {
          this.allowClose = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE:
        if (this.hasAttribute(name)) {
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
  @coreProperty()
  public resizable: SplitViewPanelResizable;

  /**
   * The initial size along the axis of orientation.
   */
  @coreProperty()
  public size: number | string;

  /**
   * The smallest size the panel can take along its axis of orientation.
   */
  @coreProperty()
  public min: number | string;

  /**
   * The largest size the panel can take along its axis of orientation.
   */
  @coreProperty()
  public max: number | string | undefined;

  /**
   * The ARIA label given to the resize handle.
   */
  @coreProperty()
  public accessibleLabel: string;

  /**
   * Controls the open state of the panel.
   */
  @coreProperty()
  public open: boolean;

  /**
   * Whether resize interactions are disabled or enabled.
   */
  @coreProperty()
  public disabled?: boolean;

  /**
   * Whether the panel can be closed via keyboard interaction.
   */
  @coreProperty()
  public allowClose?: boolean;

  /**
   * Whether the panel automatically closes when it reaches a size of 0.
   */
  @coreProperty()
  public autoClose?: boolean;

  /**
   * The size at which the panel auto closes.
   */
  @coreProperty()
  public autoCloseThreshold?: number;

  /**
   * Gets the size of content along the axis of orientation.
   * @returns The size of content in pixels.
   */
  public getContentSize(): number {
    return this._core.getContentSize();
  }

  /**
   * Gets the amount that the content can shrink along the axis of orientation before reaching its
   * min size.
   * @returns The amount that content can shrink in pixels.
   */
  public getCollapsibleSize(): number {
    return this._core.getCollapsibleSize();
  }

  /**
   * Sets the size of content along the axis of orientation.
   * @param size The new size of content in pixels.
   */
  public setContentSize(size: number): void {
    this._core.setContentSize(size);
  }

  /**
   * Updates the provided characteristics.
   * @param config An update configuration.
   */
  public update(config: ISplitViewUpdateConfig): void {
    this._core.update(config);
  }
}

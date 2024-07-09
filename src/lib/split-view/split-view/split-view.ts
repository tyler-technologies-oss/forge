import { customElement, attachShadowTemplate, coreProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';

import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { SplitViewAdapter } from './split-view-adapter';
import { SplitViewCore } from './split-view-core';
import { ISplitViewUpdateConfig, SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';
import { ISplitViewPanelComponent, SplitViewPanelComponent } from '../split-view-panel';
import { ISplitViewBase } from '../core/split-view-base';

import template from './split-view.html';
import styles from './split-view.scss';

export interface ISplitViewComponent extends ISplitViewBase, IBaseComponent {
  orientation: SplitViewOrientation;
  layerSlottedPanels(target: ISplitViewPanelComponent): void;
  unlayerSlottedPanels(): void;
  update(config: ISplitViewUpdateConfig): void;
  refit(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view': ISplitViewComponent;
  }
}

/**
 * @tag forge-split-view
 */
@customElement({
  name: SPLIT_VIEW_CONSTANTS.elementName,
  dependencies: [SplitViewPanelComponent]
})
export class SplitViewComponent extends BaseComponent implements ISplitViewComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_VIEW_CONSTANTS.attributes.ORIENTATION,
      SPLIT_VIEW_CONSTANTS.attributes.DISABLED,
      SPLIT_VIEW_CONSTANTS.attributes.ALLOW_CLOSE,
      SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE,
      SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD
    ];
  }

  private _core: SplitViewCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new SplitViewCore(new SplitViewAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SPLIT_VIEW_CONSTANTS.attributes.ORIENTATION:
        this.orientation = newValue as SplitViewOrientation;
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.ALLOW_CLOSE:
        this.allowClose = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE:
        this.autoClose = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD:
        this.autoCloseThreshold = coerceNumber(newValue);
        break;
    }
  }

  /**
   * Whether child split view panels are laid out and resize horizontally or vertically.
   * @attribute
   * @default "horizontal"
   */
  @coreProperty()
  public orientation: SplitViewOrientation;

  /**
   * Whether child split view panels have resize interactions disabled or enabled.
   * @attribute
   * @default false
   */
  @coreProperty()
  public disabled: boolean;

  /**
   * Whether child split view panels can be closed via keyboard interaction.
   * @attribute allow-close
   * @default false
   */
  @coreProperty()
  public allowClose: boolean;

  /**
   * Whether child split view panels automatically close when they reach a size of 0.
   * @attribute auto-close
   * @default false
   */
  @coreProperty()
  public autoClose: boolean;

  /**
   * The size at which panels auto close.
   * @attribute auto-close-threshold
   * @default 0
   */
  @coreProperty()
  public autoCloseThreshold: number;

  /**
   * Arranges split view panels to avoid overlapping during animations.
   * @param target The originating split view panel component.
   */
  public layerSlottedPanels(target: ISplitViewPanelComponent): void {
    this._core.layerSlottedPanels(target);
  }

  /**
   * Removes presentation data set during an animation.
   */
  public unlayerSlottedPanels(): void {
    this._core.unlayerSlottedPanels();
  }

  /**
   * Updates the provided characteristics of each slotted panel.
   * @param config An update configuration.
   */
  public update(config: ISplitViewUpdateConfig): void {
    this._core.update(config);
  }

  /**
   * Resizes panels within the split view to avoid overflow.
   */
  public refit(): void {
    this._core.refitSlottedPanels();
  }
}

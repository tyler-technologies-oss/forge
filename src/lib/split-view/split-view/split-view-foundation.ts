import { ForgeResizeObserverCallback, ICustomElementFoundation, throttle } from '@tylertech/forge-core';

import { ISplitViewBase } from '../core/split-view-base';
import { ISplitViewPanelComponent, SplitViewAnimatingLayer, SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel';
import { ISplitViewAdapter } from './split-view-adapter';
import { ISplitViewUpdateConfig, SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';

export interface ISplitViewFoundation extends ISplitViewBase, ICustomElementFoundation {
  orientation: SplitViewOrientation;
  layerSlottedPanels(target: ISplitViewPanelComponent): void;
  unlayerSlottedPanels(): void;
  update(config: ISplitViewUpdateConfig): void;
}

export class SplitViewFoundation implements ISplitViewFoundation {
  private _orientation: SplitViewOrientation = 'horizontal';
  private _disabled = false;
  private _disableClose = false;
  private _autoClose = false;
  private _autoCloseThreshold = 0;
  private _slotListener: (evt: Event) => void;
  private _resizeObserverCallback: ForgeResizeObserverCallback;

  constructor(private _adapter: ISplitViewAdapter) {
    this._slotListener = evt => this._onSlotChange(evt);
    this._resizeObserverCallback = throttle((entry: ResizeObserverEntry) => this._onResize(entry), SPLIT_VIEW_CONSTANTS.numbers.RESIZE_THROTTLE_THRESHOLD);
  }

  public initialize(): void {
    this._adapter.registerSlotListener(this._slotListener);
    this._adapter.observeResize(this._resizeObserverCallback);
    
    this._applyOrientation();
  }

  public disconnect(): void {
    this._adapter.unobserveResize();
  }

  private _onSlotChange(evt: Event): void {
    this._adapter.detectSlottedPanels();
    this._adapter.setOrientation(this._orientation);
    this._layoutSlottedPanels();
    this.update({ accessibility: true, cursor: true });
  }

  private _onResize(entry: ResizeObserverEntry): void {
    this.update({ accessibility: true, cursor: true });
  }

  /**
   * Sets the position of slotted panels with no positions.
   */
  private _layoutSlottedPanels(): void {
    const panels = this._adapter.getSlottedPanels();

    // A single panel should have a position of default. Just leave it alone.
    if (panels.length < 2) {
      return;
    }

    // Don't change any panels if positions are already set.
    if (panels.some(panel => panel.position !== 'default')) {
      return;
    }

    // All panels after the first are set to a position of end.
    panels.slice(1).forEach(panel => panel.position = 'end');
  }

  /**
   * Get/set whether panels are arranged horizontally or vertically.
   */
  public get orientation(): SplitViewOrientation {
    return this._orientation;
  }
  public set orientation(value: SplitViewOrientation) {
    if (this._orientation !== value) {
      this._orientation = value;
      this._applyOrientation();
    }
  }

  private _applyOrientation(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.ORIENTATION, this._orientation);
    this._adapter.setOrientation(this._orientation);
  }

  /**
   * Get/set whether interactions are disabled.
   */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._applyDisabled();
    }
  }

  private _applyDisabled(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.DISABLED, this._disabled);
    this._adapter.setSlottedPanelProperty<boolean>('disabled', this._disabled);
  }

  /**
   * Get/set whether closing the panel is disabled.
   */
  public get disableClose(): boolean {
    return this._disableClose;
  }
  public set disableClose(value: boolean) {
    if (this._disableClose !== value) {
      this._disableClose = value;
      this._applyDisableClose();
    }
  }

  private _applyDisableClose(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.DISABLE_CLOSE, this._disableClose);
    this._adapter.setSlottedPanelProperty<boolean>('disableClose', this._disableClose);
  }

  /**
   * Get/set whether the panel closes when a threshold size is reached.
   */
  public get autoClose(): boolean {
    return this._autoClose;
  }
  public set autoClose(value: boolean) {
    if (this._autoClose !== value) {
      this._autoClose = value;
      this._applyAutoClose();
    }
  }

  private _applyAutoClose(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE, this._autoClose);
    this._adapter.setSlottedPanelProperty<boolean>('autoClose', this._autoClose);
  }

  /**
   * Get/set the size at which panels auto close.
   */
  public get autoCloseThreshold(): number {
    return this._autoCloseThreshold;
  }
  public set autoCloseThreshold(value: number) {
    if (this._autoCloseThreshold !== value) {
      this._autoCloseThreshold = value;
      this._applyAutoCloseThreshold();
    }
  }

  private _applyAutoCloseThreshold(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD, this._autoCloseThreshold.toString());
    // TODO: perform auto close threshold logic
  }

  /**
   * Layers panels in a set order during an animation. Panels that the target is animating toward
   * stack above it and other layers stack under it.
   * @param target The animating panel.
   */
  public layerSlottedPanels(target: ISplitViewPanelComponent): void {
    const panels = this._adapter.getSlottedPanels();
    const increment = target.position === 'end' ? 1 : -1;
    let layer = target.position === 'end' ? SplitViewAnimatingLayer.Under : SplitViewAnimatingLayer.Above;

    panels.forEach(panel => {
      // Increment the layer if moving into or out of the target panel
      if (panel === target || layer === SplitViewAnimatingLayer.Active) {
        layer += increment;
      }
      panel.style.setProperty(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER, layer.toString());
    });
  }

  /**
   * Removes layering after an animation.
   */
  public unlayerSlottedPanels(): void {
    const panels = this._adapter.getSlottedPanels();
    panels.forEach(panel => {
      panel.style.removeProperty(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
    });
  }

  /**
   * Updates the provided characteristics of each panel.
   * @param config An update configuration.
   */
  public update(config: ISplitViewUpdateConfig): void {
    const panels = this._adapter.getSlottedPanels();
    panels.forEach(panel => {
      panel.update(config);
    });
  }
}

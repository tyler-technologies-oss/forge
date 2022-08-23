import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';

import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { SplitViewAdapter } from './split-view-adapter';
import { SplitViewFoundation } from './split-view-foundation';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';
import { ISplitViewPanelComponent, SplitViewPanelComponent } from '../split-view-panel';
import { ISplitViewBase } from '../core/split-view-base';

import template from './split-view.html';
import styles from './split-view.scss';

export interface ISplitViewComponent extends ISplitViewBase, IBaseComponent {
  orientation: SplitViewOrientation;
  layerSlottedPanels(target: ISplitViewPanelComponent): void;
  unlayerSlottedPanels(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view': ISplitViewComponent;
  }
}

@CustomElement({
  name: SPLIT_VIEW_CONSTANTS.elementName,
  dependencies: [SplitViewPanelComponent]
})
export class SplitViewComponent extends BaseComponent implements ISplitViewComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_VIEW_CONSTANTS.attributes.ORIENTATION,
      SPLIT_VIEW_CONSTANTS.attributes.DISABLED,
      SPLIT_VIEW_CONSTANTS.attributes.DISABLE_CLOSE,
      SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE
    ];
  }

  private _foundation: SplitViewFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new SplitViewFoundation(new SplitViewAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SPLIT_VIEW_CONSTANTS.attributes.ORIENTATION:
        this.orientation = newValue as SplitViewOrientation;
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.DISABLE_CLOSE:
        this.disableClose = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE:
        this.autoClose = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public orientation: SplitViewOrientation;

  @FoundationProperty()
  public disabled: boolean;

  @FoundationProperty()
  public disableClose: boolean;

  @FoundationProperty()
  public autoClose: boolean;

  public layerSlottedPanels(target: ISplitViewPanelComponent): void {
    this._foundation.layerSlottedPanels(target);
  }

  public unlayerSlottedPanels(): void {
    this._foundation.unlayerSlottedPanels();
  }
}

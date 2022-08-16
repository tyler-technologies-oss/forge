import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';

import { SplitViewAdapter } from './split-view-adapter';
import { SplitViewFoundation } from './split-view-foundation';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';
import { SplitViewPanelComponent } from '../split-view-panel';

import template from './split-view.html';
import styles from './split-view.scss';
import { ISplitViewBase } from '../core/split-view-base';

export interface ISplitViewComponent extends ISplitViewBase, ICustomElement {
  orientation: SplitViewOrientation;
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
export class SplitViewComponent extends HTMLElement implements ISplitViewComponent {
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
}

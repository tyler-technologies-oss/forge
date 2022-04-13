import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { tylIconDragVerticalVariant } from '@tylertech/tyler-icons/extended';
import { tylIconDragHandle } from '@tylertech/tyler-icons/standard';

import { SplitViewPaneDirection, SPLIT_VIEW_PANE_CONSTANTS } from './split-view-pane-constants';
import { SplitViewPaneFoundation } from './split-view-pane-foundation';
import { SplitViewPaneAdapter } from './split-view-pane-adapter';
import { IconComponent, IconRegistry } from '../../icon';
import { RippleComponent } from '../../ripple';

import template from './split-view-pane.html';
import styles from './split-view-pane.scss';

export interface ISplitViewPaneComponent extends ICustomElement {
  direction: SplitViewPaneDirection;
  label: string;
  open: boolean;
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view-pane': ISplitViewPaneComponent;
  }

  interface HTMLElementEventMap {
    'forge-split-view-pane-drag-start': CustomEvent<null>;
    'forge-split-view-pane-drag-end': CustomEvent<null>;
    'forge-split-view-pane-resize': CustomEvent<number>;
    'forge-split-view-pane-did-open': CustomEvent<null>;
    'forge-split-view-pane-did-close': CustomEvent<null>;
  }
}

@CustomElement({
  name: SPLIT_VIEW_PANE_CONSTANTS.elementName,
  dependencies: [
    IconComponent,
    RippleComponent
  ]
})
export class SplitViewPaneComponent extends HTMLElement implements ISplitViewPaneComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_VIEW_PANE_CONSTANTS.attributes.DIRECTION,
      SPLIT_VIEW_PANE_CONSTANTS.attributes.LABEL,
      SPLIT_VIEW_PANE_CONSTANTS.attributes.OPEN,
      SPLIT_VIEW_PANE_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: SplitViewPaneFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconDragVerticalVariant, tylIconDragHandle]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new SplitViewPaneFoundation(new SplitViewPaneAdapter(this));
  }

  public initializedCallback(): void {
    // TODO: Upgrade all public properties here
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SPLIT_VIEW_PANE_CONSTANTS.attributes.DIRECTION:
        this.direction = newValue as SplitViewPaneDirection;
        break;
      case SPLIT_VIEW_PANE_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        break;
      case SPLIT_VIEW_PANE_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_PANE_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public direction: SplitViewPaneDirection;

  @FoundationProperty()
  public label: string;

  @FoundationProperty()
  public open: boolean;

  @FoundationProperty()
  public disabled: boolean;
}

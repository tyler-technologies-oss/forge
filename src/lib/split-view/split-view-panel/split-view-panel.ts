import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';
import { tylIconDragVerticalVariant } from '@tylertech/tyler-icons/extended';
import { tylIconDragHandle } from '@tylertech/tyler-icons/standard';

import { SplitViewPanelPosition, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { SplitViewPanelFoundation } from './split-view-panel-foundation';
import { SplitViewPanelAdapter } from './split-view-panel-adapter';
import { SplitViewOrientation } from '../split-view/split-view-constants';
import { ISplitViewBase } from '../core/split-view-base';
import { IconComponent, IconRegistry } from '../../icon';
import { RippleComponent } from '../../ripple';

import template from './split-view-panel.html';
import styles from './split-view-panel.scss';

export interface ISplitViewPanelComponent extends ISplitViewBase, ICustomElement {
  position: SplitViewPanelPosition;
  min: number;
  max: number | undefined;
  label: string;
  open: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  setOrientation(value: SplitViewOrientation): void;
  updateAccessibility(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view-panel': ISplitViewPanelComponent;
  }

  interface HTMLElementEventMap {
    'forge-split-view-panel-drag-start': CustomEvent<null>;
    'forge-split-view-panel-drag-end': CustomEvent<null>;
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
export class SplitViewPanelComponent extends HTMLElement implements ISplitViewPanelComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.POSITION,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.MIN,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.MAX,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.LABEL,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.OPEN,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLED,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLE_CLOSE,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE
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
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.POSITION:
        this.position = newValue as SplitViewPanelPosition;
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.MIN:
        this.min = coerceNumber(newValue);
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.MAX:
        if (newValue) {
          this.max = coerceNumber(newValue);
        } else {
          this.max = undefined;
        }
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLE_CLOSE:
        this.disableClose = coerceBoolean(newValue);
        break;
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE:
        this.autoClose = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public position: SplitViewPanelPosition;

  @FoundationProperty()
  public min: number;

  @FoundationProperty()
  public max: number | undefined;

  @FoundationProperty()
  public label: string;

  @FoundationProperty()
  public open: boolean;

  @FoundationProperty()
  public disabled: boolean;

  @FoundationProperty()
  public disableClose: boolean;

  @FoundationProperty()
  public autoClose: boolean;

  public getContentSize(): number {
    return this._foundation.getContentSize();
  }

  public getCollapsibleSize(): number {
    return this._foundation.getCollapsibleSize();
  }

  public setContentSize(size: number): void {
    this._foundation.setContentSize(size);
  }

  public setOrientation(value: SplitViewOrientation): void {
    this._foundation.setOrientation(value);
  }

  public updateAccessibility(): void {
    this._foundation.updateAccessibility();
  }
}

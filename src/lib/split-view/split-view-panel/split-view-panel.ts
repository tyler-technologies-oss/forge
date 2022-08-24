import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';
import { tylIconDragVerticalVariant } from '@tylertech/tyler-icons/extended';
import { tylIconDragHandle } from '@tylertech/tyler-icons/standard';

import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { SplitViewPanelPosition, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { SplitViewPanelFoundation } from './split-view-panel-foundation';
import { SplitViewPanelAdapter } from './split-view-panel-adapter';
import { SplitViewOrientation } from '../split-view/split-view-constants';
import { ISplitViewBase } from '../core/split-view-base';
import { IconComponent, IconRegistry } from '../../icon';
import { RippleComponent } from '../../ripple';

import template from './split-view-panel.html';
import styles from './split-view-panel.scss';

export interface ISplitViewPanelComponent extends ISplitViewBase, IBaseComponent {
  position: SplitViewPanelPosition;
  size: number | string;
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
export class SplitViewPanelComponent extends BaseComponent implements ISplitViewPanelComponent {
  public static get observedAttributes(): string[] {
    return [
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.POSITION,
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE,
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
      case SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE:
        this.size = newValue;
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

  /**
   * Controls behavior related to the panel's position in the split view.
   */
  @FoundationProperty()
  public position: SplitViewPanelPosition;

  /**
   * The initial size along the axis of orientation.
   */
  @FoundationProperty()
  public size: number | string;

  /**
   * The smallest size the panel can take along its axis of orientation.
   */
  @FoundationProperty()
  public min: number;

  /**
   * The largest size the panel can take along its axis of orientation.
   */
  @FoundationProperty()
  public max: number | undefined;

  /**
   * The accessible label given to the resize handle.
   */
  @FoundationProperty()
  public label: string;

  /**
   * Controls the open state of the panel.
   */
  @FoundationProperty()
  public open: boolean;

  /**
   * Whether resize interactions are disabled or enabled.
   */
  @FoundationProperty()
  public disabled: boolean;

  /**
   * Whether the panel can be closed via keyboard interaction.
   */
  @FoundationProperty()
  public disableClose: boolean;

  /**
   * Whether the panel automatically closes when it reaches a size of 0.
   */
  @FoundationProperty()
  public autoClose: boolean;

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
   * Sets the axis that the panel resizes on. Used internally by the parent split view component.
   * @param value `'horizontal'` or `'vertical'`.
   */
  public setOrientation(value: SplitViewOrientation): void {
    this._foundation.setOrientation(value);
  }

  /**
   * Recalculates and resets accessibility attributes to reflect the current size of the panel and
   * its neighbors. Used internally by the parent split view component.
   */
  public updateAccessibility(): void {
    this._foundation.updateAccessibility();
  }
}

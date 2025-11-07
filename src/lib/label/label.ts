import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';
import { updateTarget } from '../constants';
import { BaseComponent, IBaseComponent } from '../core';
import { LabelAdapter } from './label-adapter';
import { ILabelAware } from './label-aware';
import { LABEL_CONSTANTS } from './label-constants';
import { LabelCore } from './label-core';

import template from './label.html';
import style from './label.scss';

export interface ILabelComponent extends IBaseComponent {
  for: string | null | undefined;
  forElement: HTMLElement | null | undefined;
  dynamic: boolean;
  nonInteractive: boolean;
  legend: boolean;
  update(): void;
  [updateTarget](target: HTMLElement & ILabelAware): boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-label': ILabelComponent;
  }
}

/**
 * @tag forge-label
 *
 * @summary The Label component is used to associate a text label with a compatible Forge component.
 *
 * @cssclass forge-label - Apply to the root element of the label to align the label and associated element horizontally.
 * @cssclass forge-label-block - Apply to the root element instead of `forge-label` to align the label and associated element vertically.
 * @cssclass forge-label-inline - Alias for `forge-label`.
 * @cssclass forge-label--large - Uses the large typography style typically applied to inset field labels.
 * @cssclass forge-support-text - Applies the support text typography style and a top margin.
 */
@customElement({
  name: LABEL_CONSTANTS.elementName
})
export class LabelComponent extends BaseComponent implements ILabelComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LABEL_CONSTANTS.observedAttributes);
  }

  private _core: LabelCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, style);
    this._core = new LabelCore(new LabelAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LABEL_CONSTANTS.attributes.FOR:
        this.for = newValue;
        break;
      case LABEL_CONSTANTS.attributes.DYNAMIC:
        this.dynamic = coerceBoolean(newValue);
        break;
      case LABEL_CONSTANTS.attributes.NON_INTERACTIVE:
        this.nonInteractive = coerceBoolean(newValue);
        break;
      case LABEL_CONSTANTS.attributes.LEGEND:
        this.legend = coerceBoolean(newValue);
        break;
    }
  }

  /**
   * The id of the associated element.
   * @default null
   * @attribute
   */
  @coreProperty()
  declare public for: string | null | undefined;

  /**
   * The associated element.
   * @default null
   */
  @coreProperty()
  declare public forElement: HTMLElement | null | undefined;

  /**
   * The element that a click should be simulated on. If not defined clicks act on the associated element.
   * @default null
   */
  @coreProperty()
  declare public clickTarget: HTMLElement | null | undefined;

  /**
   * Propagates changes in the label's text content to the associated element.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public dynamic: boolean;

  /**
   * Removes click handling from the label.
   * @default false
   * @attribute non-interactive
   */
  @coreProperty()
  declare public nonInteractive: boolean;

  /**
   * Whether or not the label should be associated with an ancestor element.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public legend: boolean;

  /**
   * Updates the targeted element with the label's current text content.
   */
  public update(): void {
    this._core.update();
  }

  /**
   * Attempts to locate and connect to the target element.
   *
   * @internal
   * @returns Whether the target element was located.
   */
  public [updateTarget](target: HTMLElement & ILabelAware): boolean {
    return this._core.updateTarget(target);
  }
}

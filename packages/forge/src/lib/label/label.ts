import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { DEFERRED_LABEL_TARGET, forgeLabelRef, updateTarget } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { removeEmptyAttribute } from '../core/utils/lit-utils.js';
import { task } from '../core/utils/utils.js';
import { ILabelAware, isLabelAware } from './label-aware.js';
import { LABEL_CONSTANTS } from './label-constants.js';

import styles from './label.scss';

/** @deprecated - This will be removed in the future. Please switch to using LabelComponent. */
export interface ILabelComponent extends BaseLitElement {
  for: string | null | undefined;
  forElement: HTMLElement | null | undefined;
  dynamic: boolean;
  nonInteractive: boolean;
  legend: boolean;
  updateTargetLabel(): void;
  [updateTarget](target: HTMLElement & ILabelAware): boolean;
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
export class LabelComponent extends BaseLitElement implements ILabelComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LABEL_CONSTANTS.elementName;

  /**
   * The id of the associated element.
   * @default null
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public for: string | null | undefined;

  /**
   * The associated element.
   * @default null
   */
  @property({ attribute: false })
  public forElement: HTMLElement | null | undefined;

  /**
   * The element that a click should be simulated on. If not defined clicks act on the associated element.
   * @default null
   */
  @property({ attribute: false })
  public clickTarget: HTMLElement | null | undefined;

  /**
   * Propagates changes in the label's text content to the associated element.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dynamic = false;

  /**
   * Removes click handling from the label.
   * @default false
   * @attribute non-interactive
   */
  @property({ attribute: LABEL_CONSTANTS.attributes.NON_INTERACTIVE, type: Boolean, reflect: true })
  public nonInteractive = false;

  /**
   * Whether or not the label should be associated with an ancestor element.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public legend = false;

  #targetElement: (ILabelAware & HTMLElement) | null = null;
  #mutationObserver?: MutationObserver;
  #isTargetConnected = false;
  #isLegend = false;
  #clickListener = (evt: Event): void => this.#handleClick(evt as PointerEvent);

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#initialize();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#disconnect();
    this.#targetElement?.labelChangedCallback(null);
    this.#targetElement = null;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }

    if (this.legend !== this.#isLegend) {
      this.#handleLegendChange();
    }

    if (changedProperties.has('for') || changedProperties.has('forElement')) {
      this.#locateTarget();
      this.#tryConnect();
    }

    if (changedProperties.has('dynamic')) {
      this.#handleDynamicChange();
    }

    if (changedProperties.has('nonInteractive')) {
      this.#handleNonInteractiveChange();
    }
  }

  public render(): TemplateResult {
    return html`<slot @slotchange=${this.#handleSlotChange}></slot>`;
  }

  /**
   * Updates the targeted element with the label's current text content.
   */
  public updateTargetLabel(): void {
    if (!this.#targetElement) {
      return;
    }

    let textContent = this.textContent ?? '';

    // If the target element is a child of the label, remove its text content from the label text
    if (this.contains(this.#targetElement)) {
      const targetTextContent = this.#targetElement.textContent ?? '';
      textContent = textContent.replace(targetTextContent, '');
    }

    this.#targetElement.labelChangedCallback(textContent.trim());
  }

  /**
   * Attempts to locate and connect to the target element.
   *
   * @internal
   * @returns Whether the target element was located.
   */
  public [updateTarget](target: HTMLElement & ILabelAware): boolean {
    this.#setTargetElement(target);
    if (this.#targetElement) {
      this.#connect();
      return true;
    }
    return false;
  }

  #initialize(): void {
    this.#isLegend = this.legend;

    if (this.legend) {
      this.#initializeAsLegend();
      return;
    }

    this.#locateTarget();
    if (this.#targetElement) {
      this.#connect();
    }
  }

  async #initializeAsLegend(): Promise<void> {
    // Give ancestor elements a chance to connect to the DOM
    await task();
    this.#dispatchConnected();
  }

  #dispatchConnected(): void {
    this.dispatchEvent(new CustomEvent(LABEL_CONSTANTS.events.CONNECTED, { bubbles: true }));
  }

  #handleLegendChange(): void {
    this.#isLegend = this.legend;

    if (this.legend) {
      this.#dispatchConnected();
      return;
    }

    this.#locateTarget();
    this.#tryConnect();
  }

  #handleDynamicChange(): void {
    if (!this.dynamic) {
      this.#removeMutationObserver();
    } else if (this.#targetElement) {
      this.#addMutationObserver();
    }
  }

  #handleNonInteractiveChange(): void {
    // The click listener is only added if the label is connected to a target
    if (!this.#isTargetConnected) {
      return;
    }

    if (this.nonInteractive) {
      this.removeEventListener('click', this.#clickListener);
    } else {
      this.addEventListener('click', this.#clickListener);
    }
  }

  #handleSlotChange(): void {
    if (this.legend || this.for || this.forElement) {
      return;
    }
    this.#locateTarget();
    this.#tryConnect();
  }

  #handleClick(evt: PointerEvent): void {
    // Prevent duplicate clicks from a nested target element or if the event originates from within the target element
    const targetEl = this.clickTarget ?? this.#targetElement;
    if (evt.target === targetEl || targetEl?.contains(evt.target as Node)) {
      return;
    }
    this.#targetElement?.labelClickedCallback?.();
  }

  #connect(): void {
    if (!this.nonInteractive) {
      this.addEventListener('click', this.#clickListener);
    }
    this.updateTargetLabel();
    if (this.dynamic) {
      this.#addMutationObserver();
    }
    this.#isTargetConnected = true;
  }

  #disconnect(): void {
    this.removeEventListener('click', this.#clickListener);
    this.#removeMutationObserver();
    this.#isTargetConnected = false;
  }

  #tryConnect(): void {
    if (!this.#targetElement) {
      this.#disconnect();
    } else if (!this.#isTargetConnected) {
      this.#connect();
    }
  }

  #locateTarget(): void {
    if (this.forElement) {
      this.#setTargetElement(this.forElement);
      return;
    }
    this.#targetElement = this.#queryTargetElement(this.for ?? null);
  }

  #setTargetElement(el: HTMLElement | null): void {
    this.#targetElement = el && this.#checkLabelAwareness(el) ? el : null;
  }

  #addMutationObserver(): void {
    this.#removeMutationObserver();
    this.#mutationObserver = new MutationObserver(() => this.updateTargetLabel());
    this.#mutationObserver.observe(this, { subtree: true, characterData: true, childList: true });

    // Run once to capture the current state of the label
    this.updateTargetLabel();
  }

  #removeMutationObserver(): void {
    this.#mutationObserver?.disconnect();
    this.#mutationObserver = undefined;
  }

  /**
   * Returns `true` if the provided element is label aware, `false` otherwise. If `false` a warning is logged to the console.
   */
  #checkLabelAwareness(el: HTMLElement): el is ILabelAware & HTMLElement {
    if (!isLabelAware(el)) {
      console.warn('Label target element is not label aware.', el);
      return false;
    }
    return true;
  }

  /**
   * Returns a label aware element queried from the provided id or a child element of the component or `null` if none exists.
   */
  #queryTargetElement(id: string | null): (ILabelAware & HTMLElement) | null {
    let targetEl: (HTMLElement & { [forgeLabelRef]: HTMLElement }) | null;

    if (id) {
      const rootNode = this.getRootNode() as Document | ShadowRoot;
      targetEl = rootNode.querySelector(`#${id}`);
    } else {
      // Used for nested elements within the label component
      targetEl = this.querySelector(LABEL_CONSTANTS.labelableChildSelectors.join(','));
    }

    if (targetEl && !targetEl.shadowRoot) {
      // If the target element has not been upgraded, mark it to connect later
      targetEl.setAttribute(DEFERRED_LABEL_TARGET, '');
      targetEl[forgeLabelRef] = this;
      return null;
    }

    if (targetEl && !this.#checkLabelAwareness(targetEl)) {
      return null;
    }

    return targetEl;
  }
}

tryDefine(LABEL_CONSTANTS.elementName, LabelComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-label': ILabelComponent;
  }
}

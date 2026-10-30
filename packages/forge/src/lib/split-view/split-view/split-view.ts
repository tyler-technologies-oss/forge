import { provide } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver, throttle, tryDefine } from '@tylertech/forge-core';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { ISplitViewBase } from '../core/split-view-base.js';
import { booleanAttributeConverter, numberAttributeConverter } from '../core/split-view-converters.js';
import { ISplitViewPanelComponent, SplitViewAnimatingLayer, SplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '../split-view-panel/index.js';
import { ISplitViewContext, ISplitViewUpdateConfig, SplitViewOrientation, SPLIT_VIEW_CONSTANTS, SPLIT_VIEW_CONTEXT } from './split-view-constants.js';

import styles from './split-view.scss';

/** @deprecated - This will be removed in the future. Please switch to using SplitViewComponent. */
export interface ISplitViewComponent extends ISplitViewBase, BaseLitElement {
  orientation: SplitViewOrientation;
  layerSlottedPanels(target: ISplitViewPanelComponent): void;
  unlayerSlottedPanels(): void;
  updatePanels(config: ISplitViewUpdateConfig): void;
  refit(): void;
}

/**
 * @tag forge-split-view
 *
 * @summary Split views create resizable panels that allow users to adjust the space between content areas.
 *
 * @dependency forge-split-view-panel
 *
 * @csspart root - The root container element.
 *
 * @slot - The split view panels.
 */
export class SplitViewComponent extends BaseLitElement implements ISplitViewComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SPLIT_VIEW_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [SplitViewPanelComponent];

  /**
   * Whether child split view panels are laid out and resize horizontally or vertically.
   * @default 'horizontal'
   * @attribute
   */
  @property({ reflect: true })
  public orientation: SplitViewOrientation = 'horizontal';

  /**
   * Whether child split view panels have resize interactions disabled or enabled.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanAttributeConverter })
  public disabled = false;

  /**
   * Whether child split view panels can be closed via keyboard interaction.
   * @default false
   * @attribute allow-close
   */
  @property({ attribute: SPLIT_VIEW_CONSTANTS.attributes.ALLOW_CLOSE, reflect: true, converter: booleanAttributeConverter })
  public allowClose = false;

  /**
   * Whether child split view panels automatically close when they reach a size of 0.
   * @default false
   * @attribute auto-close
   */
  @property({ attribute: SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE, reflect: true, converter: booleanAttributeConverter })
  public autoClose = false;

  /**
   * The size at which panels auto close.
   * @default 0
   * @attribute auto-close-threshold
   */
  @property({ attribute: SPLIT_VIEW_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD, reflect: true, converter: numberAttributeConverter })
  public autoCloseThreshold = 0;

  @provide({ context: SPLIT_VIEW_CONTEXT })
  private _context: ISplitViewContext = {
    orientation: 'horizontal',
    disabled: false,
    allowClose: false,
    autoClose: false,
    autoCloseThreshold: 0
  };

  @query(SPLIT_VIEW_CONSTANTS.selectors.ROOT, true) private _root?: HTMLElement;

  readonly #resizeCallback = throttle(
    () => this.updatePanels({ accessibility: true, cursor: true, size: true }),
    SPLIT_VIEW_CONSTANTS.numbers.RESIZE_THROTTLE_THRESHOLD
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) {
      this.#observeResize();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._root) {
      ForgeResizeObserver.unobserve(this._root);
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has('orientation') ||
      changedProperties.has('disabled') ||
      changedProperties.has('allowClose') ||
      changedProperties.has('autoClose') ||
      changedProperties.has('autoCloseThreshold')
    ) {
      this._context = {
        orientation: this.orientation ?? 'horizontal',
        disabled: this.disabled,
        allowClose: this.allowClose,
        autoClose: this.autoClose,
        autoCloseThreshold: this.autoCloseThreshold
      };
    }
  }

  public override firstUpdated(): void {
    this.#observeResize();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('orientation') && changedProperties.get('orientation') !== undefined) {
      this.#refitAfterOrientationChange();
    }
  }

  public render(): TemplateResult {
    return html`
      <div
        class="forge-split-view"
        id="root"
        part="root"
        @slotchange=${this.#handleSlotChange}
        @forge-split-view-panel-did-open=${this.#handlePanelToggled}
        @forge-split-view-panel-did-close=${this.#handlePanelToggled}>
        <slot></slot>
      </div>
    `;
  }

  /**
   * Arranges split view panels to avoid overlapping during animations.
   * @param target The originating split view panel component.
   */
  public layerSlottedPanels(target: ISplitViewPanelComponent): void {
    const panels = this.#getSlottedPanels();
    const increment = target.resizable === 'start' ? 1 : -1;
    let layer = target.resizable === 'start' ? SplitViewAnimatingLayer.Under : SplitViewAnimatingLayer.Above;

    panels.forEach(panel => {
      // Increment the layer if moving into or out of the target panel
      if (panel === target || layer === SplitViewAnimatingLayer.Active) {
        layer += increment;
      }
      panel.style.setProperty(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER, layer.toString());
    });
  }

  /**
   * Removes presentation data set during an animation.
   */
  public unlayerSlottedPanels(): void {
    this.#getSlottedPanels().forEach(panel => panel.style.removeProperty(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER));
  }

  /**
   * Updates the provided characteristics of each slotted panel.
   * @param config An update configuration.
   */
  public updatePanels(config: ISplitViewUpdateConfig): void {
    this.#getSlottedPanels().forEach(panel => panel.updatePanel(config));
  }

  /**
   * Resizes panels within the split view to avoid overflow.
   */
  public refit(): void {
    // Check if the combined panel size is greater than the split view size along the relevant axis
    const root = this._root;
    if (!root) {
      return;
    }

    const orientation = this.orientation;
    const size = orientation === 'horizontal' ? root.clientWidth : root.clientHeight;
    const panels = this.#getSlottedPanels();
    const combinedPanelSize = panels
      .map(panel => {
        const panelRoot = panel.shadowRoot?.querySelector(SPLIT_VIEW_PANEL_CONSTANTS.selectors.ROOT);
        const panelSize = orientation === 'horizontal' ? panelRoot?.clientWidth : panelRoot?.clientHeight;
        return panelSize ?? 0;
      })
      .reduce((cur, acc) => cur + acc, 0);

    // Do nothing if all the panels fit
    if (combinedPanelSize <= size) {
      return;
    }

    // Get the size adjustment needed to fit
    let diff = combinedPanelSize - size;

    // Size down the panels as needed in reverse order, adjusting diff accordingly
    panels
      .slice()
      .reverse()
      .filter(panel => panel.open)
      .forEach(panel => {
        if (diff <= 0) {
          return;
        }

        const panelSize = panel.getContentSize();
        const collapsibleSize = panel.getCollapsibleSize();
        const reduceBy = Math.min(diff, collapsibleSize);
        panel.setContentSize(panelSize - reduceBy);

        diff -= reduceBy;
      });

    // If there's still overflow nothing else can be done
  }

  #observeResize(): void {
    if (this._root) {
      ForgeResizeObserver.observe(this._root, this.#resizeCallback);
    }
  }

  /**
   * Gets all immediate child panels.
   */
  #getSlottedPanels(): ISplitViewPanelComponent[] {
    return Array.from(this.querySelectorAll<ISplitViewPanelComponent>(SPLIT_VIEW_CONSTANTS.selectors.PANEL)).filter(panel => panel.parentElement === this);
  }

  #handleSlotChange(): void {
    this.#layoutSlottedPanels();
    this.updatePanels({ accessibility: true, cursor: true });
  }

  #handlePanelToggled(): void {
    this.refit();
    this.updatePanels({ accessibility: true, cursor: true, size: true });
  }

  /**
   * Panels apply the new orientation as part of their own update, so they have to finish before they can be measured.
   */
  async #refitAfterOrientationChange(): Promise<void> {
    await Promise.all(this.#getSlottedPanels().map(panel => panel.updateComplete));
    this.refit();
    this.updatePanels({ accessibility: true, cursor: true });
  }

  /**
   * Sets the resizable value of slotted panels with no resizable value set.
   */
  #layoutSlottedPanels(): void {
    const panels = this.#getSlottedPanels();

    // A single panel should have resizable set to off. Just leave it alone.
    if (panels.length < 2) {
      return;
    }

    // Don't change any panels if resizable is already set.
    if (panels.some(panel => panel.resizable !== 'off')) {
      return;
    }

    // All panels after the first have resizable set to start.
    panels.slice(1).forEach(panel => (panel.resizable = 'start'));
  }
}

tryDefine(SPLIT_VIEW_CONSTANTS.elementName, SplitViewComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view': ISplitViewComponent;
  }
}

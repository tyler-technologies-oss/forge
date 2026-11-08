import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

import { AI_ARTIFACT_CARD_COLLAPSED_ATTRIBUTE, type AiArtifactCardComponent } from '../ai-artifact-card/ai-artifact-card.js';

import styles from './ai-artifact-card-group.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-artifact-card-group': AiArtifactCardGroupComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-artifact-card-group-toggle': CustomEvent<ForgeAiArtifactCardGroupToggleEventData>;
  }
}

export interface ForgeAiArtifactCardGroupToggleEventData {
  expanded: boolean;
}

export const AiArtifactCardGroupComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-artifact-card-group';

const DEFAULT_VISIBLE_COUNT = 3;

/**
 * @tag forge-ai-artifact-card-group
 *
 * @summary Presents several artifact cards as a single list that collapses past a set count.
 *
 * @description
 * Wraps `forge-ai-artifact-card` elements in one bordered container with dividers between them.
 * Cards inside a group switch to a flatter row style on their own. When there are more cards than
 * `visibleCount`, the extras are collapsed behind a toggle that expands and collapses the list. Each
 * card still emits its own open event. Cards a consumer has set `hidden` on stay hidden and are not
 * counted; collapsing uses a separate marker so the two never clobber each other.
 *
 * @slot - The `forge-ai-artifact-card` elements to list. Other elements are not styled as rows and
 * break the list semantics, so keep the slot to cards.
 *
 * @event {CustomEvent<ForgeAiArtifactCardGroupToggleEventData>} forge-ai-artifact-card-group-toggle -
 * Fired when the user expands or collapses the list with the toggle.
 *
 * @cssproperty --forge-ai-artifact-card-group-border-radius - Corner radius of the group
 */
@customElement(AiArtifactCardGroupComponentTagName)
export class AiArtifactCardGroupComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * How many cards show while the list is collapsed. Values below 1 are treated as 1, and
   * non-numeric values fall back to the default of 3.
   */
  @property({ type: Number, attribute: 'visible-count' })
  public visibleCount = DEFAULT_VISIBLE_COUNT;

  /**
   * Whether every card is showing.
   */
  @property({ type: Boolean, reflect: true })
  public expanded = false;

  /**
   * Label of the toggle while collapsed. `{count}` is replaced with the number of hidden cards.
   */
  @property({ attribute: 'show-more-text' })
  public showMoreText = '{count} more';

  /**
   * Label of the toggle while expanded.
   */
  @property({ attribute: 'show-less-text' })
  public showLessText = 'Show less';

  @queryAssignedElements({ selector: 'forge-ai-artifact-card', flatten: true })
  private _cards!: AiArtifactCardComponent[];

  get #visibleCards(): AiArtifactCardComponent[] {
    return this._cards.filter(card => !card.hidden);
  }

  get #collapsedCount(): number {
    if (!Number.isFinite(this.visibleCount)) {
      return DEFAULT_VISIBLE_COUNT;
    }
    return Math.max(1, Math.floor(this.visibleCount));
  }

  get #overflowCount(): number {
    return Math.max(0, this.#visibleCards.length - this.#collapsedCount);
  }

  readonly #chevronDownIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  readonly #chevronUpIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M13.5 11.25L9 6.75L4.5 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    this.#syncCardVisibility();
  }

  #syncCardVisibility(): void {
    this.#visibleCards.forEach((card, index) => {
      card.toggleAttribute(AI_ARTIFACT_CARD_COLLAPSED_ATTRIBUTE, !this.expanded && index >= this.#collapsedCount);
    });
  }

  #handleSlotChange(): void {
    this.requestUpdate();
  }

  #handleToggle(): void {
    this.expanded = !this.expanded;

    this.dispatchEvent(
      new CustomEvent<ForgeAiArtifactCardGroupToggleEventData>('forge-ai-artifact-card-group-toggle', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true
      })
    );
  }

  get #toggle(): TemplateResult | typeof nothing {
    if (this.#overflowCount === 0) {
      return nothing;
    }

    const label = this.expanded ? this.showLessText : this.showMoreText.replace('{count}', String(this.#overflowCount));

    return html`
      <button class="toggle" type="button" aria-expanded=${this.expanded} @click=${this.#handleToggle}>
        ${this.expanded ? this.#chevronUpIcon : this.#chevronDownIcon}
        <span>${label}</span>
        <span class="focus-indicator"></span>
      </button>
    `;
  }

  public override render(): TemplateResult {
    return html`
      <div class="artifact-card-group">
        <div class="list" role="list">
          <slot @slotchange=${this.#handleSlotChange}></slot>
        </div>
        ${this.#toggle}
      </div>
    `;
  }
}

import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FocusGroupBehavior, FocusGroupDirection } from './focus-group-controller';
import { FocusGroupController } from './focus-group-controller';

import styles from './focus-group.scss';

/**
 * @tag forge-focus-group
 *
 * @summary Focus groups provide standardized keyboard navigation for composite widgets.
 *
 * @slot - The default slot for focusable children.
 */
@customElement('forge-focus-group')
export class FocusGroupComponent extends LitElement {
  public static styles = unsafeCSS(styles);

  /**
   * Behavior token defining keyboard interaction pattern.
   * @default undefined
   * @attribute
   */
  @property({ type: String })
  public behavior?: FocusGroupBehavior;

  /**
   * Direction of arrow key navigation.
   * @default 'both'
   * @attribute
   */
  @property({ type: String })
  public direction: FocusGroupDirection = 'both';

  /**
   * Whether navigation wraps at boundaries.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public wrap = false;

  /**
   * Disable last-focused memory restoration.
   *
   * When enabled, the first element (or element with `focusgroupstart`) will
   * always be made tabbable when focus enters the group, instead of restoring
   * the last focused element. Roving tabindex continues to work normally during
   * active keyboard navigation.
   *
   * @default false
   * @attribute no-memory
   */
  @property({ type: Boolean, attribute: 'no-memory' })
  public noMemory = false;

  #internals: ElementInternals;
  #controller: FocusGroupController;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#controller = new FocusGroupController(this, this.#internals);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.#controller.connect();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#controller.disconnect();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('behavior')) {
      this.#controller.setBehavior(this.behavior);
    }
    if (changedProperties.has('direction')) {
      this.#controller.setDirection(this.direction);
    }
    if (changedProperties.has('wrap')) {
      this.#controller.setWrap(this.wrap);
    }
    if (changedProperties.has('noMemory')) {
      this.#controller.setNoMemory(this.noMemory);
    }
  }

  public render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-focus-group': FocusGroupComponent;
  }
}

import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { tylIconMoreHoriz } from '@tylertech/tyler-icons';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { query } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { IconRegistry } from '../../icon/index.js';
import { PopoverComponent } from '../../popover/popover.js';

import '../../icon-button/icon-button.js';
import '../../popover/popover.js';
import '../../tooltip/tooltip.js';

import styles from './breadcrumb-overflow-menu.scss';

export const BREADCRUMB_OVERFLOW_MENU_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-breadcrumb-overflow-menu';

const TRIGGER_ID = 'trigger';
const TOOLTIP_CONTENT = 'More breadcrumbs';

/**
 * @tag forge-breadcrumb-overflow-menu
 *
 * @summary Collapses breadcrumb items into a popover menu that is opened by an ellipsis button.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-popover
 * @dependency forge-tooltip
 *
 * @slot - The default slot for the breadcrumb items to display in the popover.
 * @slot tooltip - The slot for the tooltip content. Text placed in this slot labels the button.
 *
 * @csspart root - The root element.
 * @csspart button - The ellipsis button.
 * @csspart popover - The popover element.
 */
export class BreadcrumbOverflowMenuComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BREADCRUMB_OVERFLOW_MENU_TAG_NAME;

  static {
    IconRegistry.define([tylIconMoreHoriz]);
  }

  @query('forge-popover', true) private _popover!: PopoverComponent;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'listitem'
    });
  }

  /* @internal */
  public render(): TemplateResult {
    return html`
      <div part="root" class="forge-breadcrumb-overflow-menu">
        <forge-icon-button part="button" class="button" id=${TRIGGER_ID} type="button" dense shape="squared">
          <forge-icon name="more_horiz"></forge-icon>
        </forge-icon-button>
        <forge-tooltip anchor=${TRIGGER_ID} type="label" placement="bottom"><slot name="tooltip">${TOOLTIP_CONTENT}</slot></forge-tooltip>
        <forge-popover
          part="popover"
          class="popover"
          anchor=${TRIGGER_ID}
          placement="bottom-start"
          preset="list"
          @click=${this._handleClick}
          @focusout=${this._handleFocusOut}>
          <div class="list" role="list"><slot></slot></div>
        </forge-popover>
      </div>
    `;
  }

  private _handleClick(evt: Event): void {
    if (evt.composedPath().some(el => el instanceof HTMLAnchorElement)) {
      this._popover.open = false;
    }
  }

  private _handleFocusOut(evt: FocusEvent): void {
    const { relatedTarget } = evt;
    if (relatedTarget instanceof Node && this.contains(relatedTarget)) {
      return;
    }
    this._popover.open = false;
  }
}

tryDefine(BREADCRUMB_OVERFLOW_MENU_TAG_NAME, BreadcrumbOverflowMenuComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-breadcrumb-overflow-menu': BreadcrumbOverflowMenuComponent;
  }
}

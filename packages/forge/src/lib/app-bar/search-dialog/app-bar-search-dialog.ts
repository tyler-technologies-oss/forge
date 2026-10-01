import { html, nothing, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { tylIconClose, tylIconSearch } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { DialogComponent } from '../../dialog/index.js';
import { ButtonComponent } from '../../button/index.js';
import { IconButtonComponent } from '../../icon-button/index.js';
import { IconComponent, IconRegistry } from '../../icon/index.js';
import { TextFieldComponent } from '../../text-field/index.js';
import { ToolbarComponent } from '../../toolbar/index.js';
import { APP_BAR_SEARCH_DIALOG_CONSTANTS, AppBarSearchDialogSubmitEventData } from './app-bar-search-dialog-constants.js';

import '../../button/button.js';
import '../../dialog/dialog.js';
import '../../icon-button/icon-button.js';
import '../../icon/icon.js';
import '../../text-field/text-field.js';
import '../../toolbar/toolbar.js';

import styles from './app-bar-search-dialog.scss';

export interface IAppBarSearchDialogComponent extends BaseLitElement {
  open: boolean;
  value: string;
  label: string;
  heading: string;
  buttonText: string;
  closeLabel: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-search-dialog': IAppBarSearchDialogComponent;
  }

  interface HTMLElementEventMap {
    'forge-app-bar-search-dialog-submit': CustomEvent<AppBarSearchDialogSubmitEventData>;
  }
}

/**
 * @tag forge-app-bar-search-dialog
 *
 * @summary A search icon button for the app bar that opens a dialog containing a search field. Designed for the app bar's `end` or `mobile-end` slots.
 *
 * @dependency forge-button
 * @dependency forge-dialog
 * @dependency forge-icon-button
 * @dependency forge-icon
 * @dependency forge-text-field
 * @dependency forge-toolbar
 *
 * @event {CustomEvent<AppBarSearchDialogSubmitEventData>} forge-app-bar-search-dialog-submit - Dispatched when the user presses Enter in the search field or clicks the search button. Cancelable; the dialog closes unless the event is canceled.
 */
export class AppBarSearchDialogComponent extends BaseLitElement implements IAppBarSearchDialogComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = APP_BAR_SEARCH_DIALOG_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [
    ButtonComponent,
    DialogComponent,
    IconButtonComponent,
    IconComponent,
    TextFieldComponent,
    ToolbarComponent
  ];

  static {
    IconRegistry.define([tylIconClose, tylIconSearch]);
  }

  public static styles = unsafeCSS(styles);

  /** Whether the search dialog is open. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** The current value of the search field. */
  @property()
  public value = '';

  /** The accessible label applied to the trigger button, dialog, and search field. */
  @property()
  public label = 'Search';

  /** The title displayed in the dialog toolbar. */
  @property()
  public heading = 'App search';

  /** The text of the button that submits the search. */
  @property({ attribute: 'button-text' })
  public buttonText = 'Search';

  /** The accessible label applied to the button that closes the dialog. */
  @property({ attribute: 'close-label' })
  public closeLabel = 'Close search';

  readonly #inputRef: Ref<HTMLInputElement> = createRef();

  public render(): TemplateResult {
    return html`
      <forge-icon-button theme="app-bar" aria-label=${this.label} aria-haspopup="dialog" @click=${this.#openDialog}>
        <forge-icon name="search"></forge-icon>
      </forge-icon-button>
      <forge-dialog fullscreen-threshold="0" label=${ifDefined(this.heading || undefined)} .open=${this.open} @forge-dialog-close=${this.#handleDialogClose}>
        <div class="content">
          <forge-toolbar no-divider>
            <h1 slot="start">${this.heading}</h1>
            <forge-icon-button slot="end" aria-label=${this.closeLabel} @click=${this.#handleClose}>
              <forge-icon name="close"></forge-icon>
            </forge-icon-button>
          </forge-toolbar>
          <div class="search">
            <forge-text-field density="large">
              <forge-icon slot="leading" name="search"></forge-icon>
              <input
                ${ref(this.#inputRef)}
                type="search"
                autocomplete="off"
                aria-label=${this.label || nothing}
                autofocus
                .value=${this.value}
                @input=${this.#handleInput}
                @keydown=${this.#handleKeydown} />
            </forge-text-field>
          </div>
          <forge-toolbar inverted>
            <forge-button slot="end" variant="filled" @click=${this.#submit}>${this.buttonText}</forge-button>
          </forge-toolbar>
        </div>
      </forge-dialog>
    `;
  }

  #openDialog = (): void => {
    this.open = true;
  };

  #handleClose = (): void => {
    this.open = false;
  };

  #handleDialogClose = (): void => {
    this.open = false;
  };

  #handleInput = (evt: Event): void => {
    this.value = (evt.target as HTMLInputElement).value;
  };

  #handleKeydown = (evt: KeyboardEvent): void => {
    if (evt.key === 'Enter') {
      this.#submit();
    }
  };

  #submit = (): void => {
    const event = new CustomEvent<AppBarSearchDialogSubmitEventData>(APP_BAR_SEARCH_DIALOG_CONSTANTS.events.SUBMIT, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { value: this.value }
    });
    if (this.dispatchEvent(event)) {
      this.open = false;
    }
  };
}

tryDefine(APP_BAR_SEARCH_DIALOG_CONSTANTS.elementName, AppBarSearchDialogComponent);

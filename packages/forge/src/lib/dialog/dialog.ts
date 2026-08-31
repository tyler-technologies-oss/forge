import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, getFirstFocusableElement, playKeyframeAnimation } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BACKDROP_CONSTANTS, BackdropComponent, IBackdropComponent } from '../backdrop/index.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { GlobalConfiguration } from '../core/configuration/global-configuration.js';
import { MoveController } from '../core/controllers/move-controller.js';
import { DismissibleStack, IDismissible, IDismissibleStackState, tryDismiss } from '../core/utils/dismissible-stack.js';
import { isElementClipped, moveElementIntoViewport } from '../core/utils/utils.js';
import {
  DIALOG_CONSTANTS,
  DialogAnimationType,
  DialogCloseReason,
  DialogMode,
  DialogPlacement,
  DialogPositionStrategy,
  DialogPreset,
  DialogSizeStrategy,
  dialogStack,
  DialogType,
  hideBackdrop,
  IDialogBeforeCloseEventData,
  IDialogMoveEventData,
  IDialogMoveStartEventData,
  showBackdrop
} from './dialog-constants.js';

import styles from './dialog.scss';

export interface IDialogProperties {
  open: boolean;
  mode: DialogMode;
  type: DialogType;
  animationType: DialogAnimationType;
  preset: DialogPreset;
  persistent: boolean;
  fullscreen: boolean;
  fullscreenThreshold: number;
  trigger: string;
  triggerElement: HTMLElement | null;
  positionStrategy: DialogPositionStrategy;
  sizeStrategy: DialogSizeStrategy;
  placement: DialogPlacement;
  moveable: boolean;
  label: string;
  description: string;
}

/** @deprecated - This will be removed in the future. Please switch to using DialogComponent. */
export interface IDialogComponent extends IDialogProperties, BaseLitElement, IDismissible {
  show(): void;
  hide(): void;
  [hideBackdrop](): void;
  [showBackdrop](): void;
}

/**
 * @tag forge-dialog
 *
 * @summary Dialogs are temporary UI elements that are used to display information, ask for input, or confirm actions. Dialogs can be modal or non-modal.
 *
 * @dependency forge-backdrop
 *
 * @globalconfig mode
 * @globalconfig animationType
 * @globalconfig positionStrategy
 * @globalconfig sizeStrategy
 * @globalconfig persistent
 * @globalconfig moveable
 * @globalconfig fullscreenThreshold
 *
 * @fires {CustomEvent<void>} forge-dialog-open - Dispatched when the dialog is opened.
 * @fires {CustomEvent<void>} forge-dialog-close - Dispatched when the dialog is closed.
 * @fires {CustomEvent<IDialogBeforeCloseEventData>} forge-dialog-before-close - Dispatched before the dialog is closed. This event is cancelable.
 * @fires {CustomEvent<IDialogMoveStartEventData>} forge-dialog-move-start - Dispatched when the dialog is first moved.
 * @fires {CustomEvent<IDialogMoveEventData>} forge-dialog-move - Dispatched when the dialog is being moved.
 * @fires {CustomEvent<void>} forge-dialog-move-end - Dispatched when the dialog is done being moved.
 * @fires {CustomEvent<boolean>} forge-dialog-fullscreen-change - Dispatched when the dialog's fullscreen state changes.
 *
 * @cssproperty --forge-dialog-background - The background color of the dialog.
 * @cssproperty --forge-dialog-shape - The shape of the dialog.
 * @cssproperty --forge-dialog-elevation - The elevation of the dialog.
 * @cssproperty --forge-dialog-spacing - The spacing between elements inside the dialog.
 * @cssproperty --forge-dialog-block-start-spacing - The spacing at the start of the dialog block.
 * @cssproperty --forge-dialog-block-end-spacing - The spacing at the end of the dialog block.
 * @cssproperty --forge-dialog-inline-start-spacing - The spacing at the start of the dialog inline.
 * @cssproperty --forge-dialog-inline-end-spacing - The spacing at the end of the dialog inline.
 * @cssproperty --forge-dialog-padding - The padding of the dialog.
 * @cssproperty --forge-dialog-width - The width of the dialog.
 * @cssproperty --forge-dialog-height - The height of the dialog.
 * @cssproperty --forge-dialog-min-width - The minimum width of the dialog.
 * @cssproperty --forge-dialog-max-width - The maximum width of the dialog.
 * @cssproperty --forge-dialog-min-height - The minimum height of the dialog.
 * @cssproperty --forge-dialog-max-height - The maximum height of the dialog.
 * @cssproperty --forge-dialog-z-index - The z-index of the dialog.
 * @cssproperty --forge-dialog-move-handle-color - The color of the move handle.
 * @cssproperty --forge-dialog-move-handle-size - The size of the move handle.
 * @cssproperty --forge-dialog-move-handle-hover-cursor - The cursor style when hovering over the move handle.
 * @cssproperty --forge-dialog-move-handle-active-cursor - The cursor style when the move handle is active.
 * @cssproperty --forge-dialog-move-handle-spacing - The spacing around the move handle.
 * @cssproperty --forge-dialog-move-transition-duration - The duration of the move transition.
 * @cssproperty --forge-dialog-move-transition-easing - The easing function of the move transition.
 * @cssproperty --forge-dialog-moving-opacity - The opacity of the dialog when it is being moved.
 * @cssproperty --forge-dialog-enter-animation-duration - The duration of the enter animation.
 * @cssproperty --forge-dialog-enter-animation-easing - The easing function of the enter animation.
 * @cssproperty --forge-dialog-exit-animation-duration - The duration of the exit animation.
 * @cssproperty --forge-dialog-exit-animation-easing - The easing function of the exit animation.
 * @cssproperty --forge-dialog-zoom-opacity - The opacity of the dialog during zoom animation.
 * @cssproperty --forge-dialog-zoom-scale - The scale of the dialog during zoom animation.
 * @cssproperty --forge-dialog-fade-opacity - The opacity of the dialog during fade animation.
 * @cssproperty --forge-dialog-slide-opacity - The opacity of the dialog during slide animation.
 * @cssproperty --forge-dialog-slide-translate - The translation distance of the dialog during slide animation.
 * @cssproperty --forge-dialog-backdrop-opacity - The opacity of the dialog backdrop.
 * @cssproperty --forge-dialog-nonmodal-elevation - The elevation of non-modal dialogs.
 * @cssproperty --forge-dialog-fullscreen-enter-animation-duration - The duration of the enter animation for fullscreen dialogs.
 * @cssproperty --forge-dialog-fullscreen-exit-animation-duration - The duration of the exit animation for fullscreen dialogs.
 * @cssproperty --forge-dialog-position-x - The x-axis position of the dialog.
 * @cssproperty --forge-dialog-position-y - The y-axis position of the dialog.
 * @cssproperty --forge-dialog-preset-sheet-enter-animation-duration - The duration of the enter animation for preset sheet dialogs.
 * @cssproperty --forge-dialog-preset-sheet-exit-animation-duration - The duration of the exit animation for preset sheet dialogs.
 *
 * @csspart root - The dialog container element.
 * @csspart backdrop - The backdrop element.
 * @csspart surface - The dialog surface element.
 * @csspart move-handle-container - The alignment container for the move handle.
 * @csspart move-handle - The move handle element.
 * @csspart move-handle-icon - The move handle icon element.
 *
 * @slot - The content of the dialog.
 * @slot move-handle - The move handle content.
 *
 * @cssclass forge-dialog - Apply to the root `<dialog>` element _(required)_.
 * @cssclass forge-dialog--fullscreen - Renders the dialog in fullscreen mode.
 * @cssclass forge-dialog--top - Places the dialog at the top of the screen.
 * @cssclass forge-dialog--top-right - Places the dialog at the top right of the screen.
 * @cssclass forge-dialog--top-left - Places the dialog at the top left of the screen.
 * @cssclass forge-dialog--right - Places the dialog at the right of the screen.
 * @cssclass forge-dialog--left - Places the dialog at the left of the screen.
 * @cssclass forge-dialog--bottom - Places the dialog at the bottom of the screen.
 * @cssclass forge-dialog--bottom-right - Places the dialog at the bottom right of the screen.
 * @cssclass forge-dialog--bottom-left - Places the dialog at the bottom left of the screen.
 * @cssclass forge-dialog--custom - Allows for custom placement of the dialog.
 * @cssclass forge-dialog--bottom-sheet - Renders the dialog as a bottom sheet.
 * @cssclass forge-dialog--top-sheet - Renders the dialog as a top sheet.
 * @cssclass forge-dialog--left-sheet - Renders the dialog as a left sheet.
 * @cssclass forge-dialog--right-sheet - Renders the dialog as a right sheet.
 * @cssclass forge-dialog--animation-fade - Sets to dialog to open and close with a fade animation.
 * @cssclass forge-dialog--animation-slide - Sets to dialog to open and close with a slide animation.
 * @cssclass forge-dialog--animation-none - Sets to dialog to open and close without any animation.
 * @cssclass forge-dialog--moveable - Applies moveable dialog styles.
 * @cssclass forge-dialog--moving - Apply to the dialog when it is being moved.
 * @cssclass forge-dialog--moved - Apply to the dialog after it has been moved.
 * @cssclass forge-dialog__move-handle - Apply to the move handle element.
 * @cssclass forge-dialog__move-handle-container - Apply to the parent of the move handle element.
 */
@customElement(DIALOG_CONSTANTS.elementName)
export class DialogComponent extends BaseLitElement implements IDialogComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DIALOG_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [BackdropComponent];

  /**
   * @internal
   * Contains all the dialogs that are currently open.
   */
  public static readonly [dialogStack]: Set<IDialogComponent> = new Set();

  @query(DIALOG_CONSTANTS.selectors.DIALOG) private _dialogElement!: HTMLDialogElement;
  @query(DIALOG_CONSTANTS.selectors.SURFACE) private _surfaceElement!: HTMLElement;
  @query(DIALOG_CONSTANTS.selectors.MOVE_HANDLE) private _moveHandleElement!: HTMLElement;
  @query(BACKDROP_CONSTANTS.elementName) private _backdropElement!: IBackdropComponent;
  @query(DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL) private _accessibleLabelElement!: HTMLElement;
  @query(DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION) private _accessibleDescriptionElement!: HTMLElement;

  #moveController: MoveController | undefined;
  #fullscreenMediaQuery: MediaQueryList | undefined;
  #originalFullscreenValue: boolean | undefined;

  #escapeDismissListener: EventListener = evt => this.#onEscapeDismiss(evt as KeyboardEvent);
  #backdropDismissListener: EventListener = () => this.#onBackdropDismiss();
  #dialogFormSubmitListener: EventListener = evt => this.#onDialogFormSubmit(evt as SubmitEvent);
  #triggerClickListener: EventListener = () => this.#onTriggerClick();
  #fullscreenListener: (value: boolean) => void = value => this.#onFullscreenChange(value);

  #triggerElement: HTMLElement | null = null;

  /** @internal */
  public [hideBackdrop](): void {
    this._backdropElement?.fadeOut();
  }

  /** @internal */
  public [showBackdrop](): void {
    this._backdropElement?.fadeIn();
  }

  public [tryDismiss](_state?: IDismissibleStackState<string> | undefined): boolean {
    return this.#dispatchBeforeCloseEvent('dismiss');
  }

  /**
   * Indicates whether the dialog is open.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public set open(value: boolean) {
    value = Boolean(value);
    if (this.#open === value) {
      return;
    }
    const oldValue = this.#open;
    this.#open = value;
    this.toggleAttribute(DIALOG_CONSTANTS.attributes.OPEN, this.#open);
    if (this.isConnected && this.hasUpdated) {
      this.#applyOpen();
    }
    this.requestUpdate('open', oldValue);
  }
  public get open(): boolean {
    return this.#open;
  }
  #open = false;

  /**
   * The mode of the dialog.
   * @default 'modal'
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public mode: DialogMode = DIALOG_CONSTANTS.defaults.MODE;

  /**
   * The type of the dialog.
   * @default 'dialog'
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public type: DialogType = DIALOG_CONSTANTS.defaults.TYPE;

  /**
   * The animation type of the dialog.
   * @default 'zoom'
   * @attribute animation-type
   */
  @property({ attribute: 'animation-type', reflect: true, useDefault: true })
  public animationType: DialogAnimationType = DIALOG_CONSTANTS.defaults.ANIMATION_TYPE;

  /**
   * The preset design that the dialog will apply.
   * @default 'dialog'
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public preset: DialogPreset = DIALOG_CONSTANTS.defaults.PRESET;

  /**
   * Indicates whether the dialog is dismissible via escape and backdrop click or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public set persistent(value: boolean) {
    value = Boolean(value);
    if (this.#persistent === value) {
      return;
    }
    const oldValue = this.#persistent;
    this.#persistent = value;
    if (this.isConnected && this.open) {
      if (this.#persistent) {
        this._backdropElement?.removeEventListener('click', this.#backdropDismissListener);
      } else {
        this._backdropElement?.addEventListener('click', this.#backdropDismissListener);
      }
    }
    this.requestUpdate('persistent', oldValue);
  }
  public get persistent(): boolean {
    return this.#persistent;
  }
  #persistent = false;

  /**
   * Indicates whether the dialog is fullscreen or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public set fullscreen(value: boolean) {
    value = Boolean(value);
    if (this.#fullscreen === value) {
      return;
    }
    const oldValue = this.#fullscreen;
    this.#fullscreen = value;
    this.#applyMoveable({ enabled: !this.#fullscreen });
    this.requestUpdate('fullscreen', oldValue);
  }
  public get fullscreen(): boolean {
    return this.#fullscreen;
  }
  #fullscreen = false;

  /**
   * The screen width at which the dialog will switch to fullscreen.
   * @default 599
   * @attribute fullscreen-threshold
   */
  @property({ type: Number, attribute: 'fullscreen-threshold', reflect: true, useDefault: true })
  public set fullscreenThreshold(value: number) {
    if (this.#fullscreenThreshold === value) {
      return;
    }
    const oldValue = this.#fullscreenThreshold;
    this.#fullscreenThreshold = value;
    if (this.isConnected && this.open && !this.fullscreen && this.#fullscreenThreshold > 0) {
      this.#removeFullscreenListener();
      this.#addFullscreenListener();
    }
    this.requestUpdate('fullscreenThreshold', oldValue);
  }
  public get fullscreenThreshold(): number {
    return this.#fullscreenThreshold;
  }
  #fullscreenThreshold = DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD;

  /**
   * The selector of the element that triggers the dialog.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public set trigger(value: string) {
    value = value ?? '';
    if (this.#trigger === value) {
      return;
    }
    const oldValue = this.#trigger;
    this.#trigger = value;
    if (this.#triggerElement) {
      this.#triggerElement.removeEventListener('click', this.#triggerClickListener);
    }
    if (this.isConnected) {
      this.#tryLocateTriggerElement(this.#trigger);
      this.#triggerElement?.addEventListener('click', this.#triggerClickListener);
    }
    this.requestUpdate('trigger', oldValue);
  }
  public get trigger(): string {
    return this.#trigger ?? '';
  }
  #trigger = '';

  /**
   * The element that triggers the dialog.
   * @default null
   */
  @property({ attribute: false })
  public set triggerElement(element: HTMLElement | null) {
    if (this.#triggerElement) {
      this.#triggerElement.removeEventListener('click', this.#triggerClickListener);
    }
    if (this.#trigger) {
      this.#trigger = '';
    }
    this.#triggerElement = element;
    if (this.isConnected) {
      this.#triggerElement?.addEventListener('click', this.#triggerClickListener);
    }
  }
  public get triggerElement(): HTMLElement | null {
    return this.#triggerElement;
  }

  /**
   * Indicates whether the dialog is moveable or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public set moveable(value: boolean) {
    value = Boolean(value);
    if (this.#moveable === value) {
      return;
    }
    const oldValue = this.#moveable;
    this.#moveable = value;
    this.toggleAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, this.#moveable);
    if (this.isConnected && this.open) {
      this.#applyMoveable();
    }
    this.requestUpdate('moveable', oldValue);
  }
  public get moveable(): boolean {
    return this.#moveable;
  }
  #moveable = false;

  /**
   * Controls whether the dialog is rendered relative to the viewport or its nearest containing block.
   * @default 'viewport'
   * @attribute position-strategy
   */
  @property({ attribute: 'position-strategy', reflect: true, useDefault: true })
  public positionStrategy: DialogPositionStrategy = DIALOG_CONSTANTS.defaults.POSITION_STRATEGY;

  /**
   * Controls the block and/or inline size of the dialog. Defaults to the size of the content it contains.
   * @default 'content'
   * @attribute size-strategy
   */
  @property({ attribute: 'size-strategy', reflect: true, useDefault: true })
  public sizeStrategy: DialogSizeStrategy = DIALOG_CONSTANTS.defaults.SIZE_STRATEGY;

  /**
   * The placement of the dialog.
   * @default 'center'
   * @attribute
   */
  @property({ reflect: true, useDefault: true })
  public placement: DialogPlacement = DIALOG_CONSTANTS.defaults.PLACEMENT;

  /**
   * The accessible label of the dialog.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public set label(value: string) {
    value = value ?? '';
    if (this.#label === value) {
      return;
    }
    this.#label = value;
    if (this._accessibleLabelElement) {
      this._accessibleLabelElement.textContent = this.#label;
    }
    this.requestUpdate('label');
  }
  public get label(): string {
    return this.#label;
  }
  #label = '';

  /**
   * The accessible description of the dialog.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public set description(value: string) {
    value = value ?? '';
    if (this.#description === value) {
      return;
    }
    this.#description = value;
    if (this._accessibleDescriptionElement) {
      this._accessibleDescriptionElement.textContent = this.#description;
    }
    this.requestUpdate('description');
  }
  public get description(): string {
    return this.#description;
  }
  #description = '';

  public connectedCallback(): void {
    super.connectedCallback();

    this.#applyGlobalConfiguration();

    if (this.trigger && !this.#triggerElement) {
      this.#tryLocateTriggerElement(this.trigger);
    }

    this.#triggerElement?.addEventListener('click', this.#triggerClickListener);

    // On first connection, the shadow DOM hasn't rendered yet, so `#applyOpen()` is deferred to `firstUpdated()`.
    if (this.hasUpdated && this.open) {
      this.#applyOpen();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.#triggerElement?.removeEventListener('click', this.#triggerClickListener);

    if (this.#moveController) {
      this.#destroyMoveController();
    }

    this.#release();
    this.#tryResetFullscreenValue();
    this.#forceClose();
  }

  public firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._accessibleLabelElement.textContent = this.label;
    this._accessibleDescriptionElement.textContent = this.description;
    if (!this._backdropElement.shadowRoot) {
      window.customElements.upgrade(this._backdropElement);
    }

    if (this.open) {
      this.#applyOpen();
    }
  }

  public render(): TemplateResult {
    return html`
      <dialog class="forge-dialog" part="root" aria-labelledby="forge-dialog-label" aria-describedby="forge-dialog-description">
        <div id="forge-dialog-label" class="visually-hidden"></div>
        <div id="forge-dialog-description" class="visually-hidden"></div>
        <forge-backdrop exportparts="root:backdrop"></forge-backdrop>
        <div class="surface" part="surface">
          <div class="move-handle-container" part="move-handle-container">
            <div class="move-handle" part="move-handle">
              <slot name="move-handle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" part="move-handle-icon">
                  <path
                    d="M3 15v-2h2v2H3m0-4V9h2v2H3m4 4v-2h2v2H7m0-4V9h2v2H7m4 4v-2h2v2h-2m0-4V9h2v2h-2m4 4v-2h2v2h-2m0-4V9h2v2h-2m4 4v-2h2v2h-2m0-4V9h2v2h-2z"></path>
                </svg>
              </slot>
            </div>
          </div>
          <slot></slot>
        </div>
      </dialog>
    `;
  }

  /** Shows the dialog. */
  public show(): void {
    this.open = true;
  }

  /** Hides the dialog. */
  public hide(): void {
    this.open = false;
  }

  #dispatchBeforeCloseEvent(reason: DialogCloseReason): boolean {
    const evt = new CustomEvent<IDialogBeforeCloseEventData>(DIALOG_CONSTANTS.events.BEFORE_CLOSE, {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: { reason }
    });
    this.dispatchEvent(evt);
    return !evt.defaultPrevented;
  }

  #show(): void {
    if (this._dialogElement.open) {
      /* c8 ignore next */
      return;
    }

    if (this.type !== 'dialog') {
      this._dialogElement.setAttribute('role', this.type);
    }

    const isModal = this.mode === 'modal' || this.mode === 'inline-modal';

    if (!isModal) {
      this._dialogElement.setAttribute('aria-modal', 'false');
    }

    if (isModal) {
      if (this.animationType === 'none') {
        this._backdropElement.show();
      } else {
        this._backdropElement.fadeIn();
      }
    }

    if (this.mode === 'modal') {
      this._dialogElement.showModal();
    } else {
      this._dialogElement.show();
    }

    if (isModal) {
      this.#hideOtherBackdrops();
    }

    DialogComponent[dialogStack].add(this);

    this._dialogElement.addEventListener('submit', this.#dialogFormSubmitListener);
    DismissibleStack.instance.add(this);

    if (isModal) {
      document.addEventListener('keydown', this.#escapeDismissListener, { capture: true });
    }

    if (!this.persistent) {
      this._backdropElement.addEventListener('click', this.#backdropDismissListener);
    }

    if (this.moveable && !this.fullscreen) {
      this.#initializeMoveController();
    }

    if (!this.fullscreen && this.fullscreenThreshold > 0) {
      this.#originalFullscreenValue = this.fullscreen;
      this.#addFullscreenListener();
    }

    this.dispatchEvent(new CustomEvent(DIALOG_CONSTANTS.events.OPEN, { bubbles: true, composed: true }));
  }

  async #hide(): Promise<void> {
    this.#release();

    if (this.animationType === 'none') {
      this.#forceClose();
    } else {
      this._backdropElement.fadeOut();
      await playKeyframeAnimation(this._surfaceElement, BACKDROP_CONSTANTS.classes.EXITING);
      this.#forceClose();
    }

    this.#tryResetFullscreenValue();

    if (this.#moveController) {
      this.#destroyMoveController();
    }

    this.dispatchEvent(new CustomEvent(DIALOG_CONSTANTS.events.CLOSE, { bubbles: true, composed: true }));
  }

  #release(): void {
    this._dialogElement?.removeEventListener('submit', this.#dialogFormSubmitListener);
    document.removeEventListener('keydown', this.#escapeDismissListener, { capture: true });
    this._backdropElement?.removeEventListener('click', this.#backdropDismissListener);
    DismissibleStack.instance.remove(this);
  }

  #forceClose(): void {
    this._surfaceElement?.classList.remove(BACKDROP_CONSTANTS.classes.EXITING);
    this._dialogElement?.close();
    DialogComponent[dialogStack].delete(this);
    this.#showMostRecentBackdrop();
  }

  #hideOtherBackdrops(): void {
    DialogComponent[dialogStack].forEach(dialog => dialog[hideBackdrop]());
  }

  #showMostRecentBackdrop(): void {
    Array.from(DialogComponent[dialogStack])
      .filter(dialog => dialog.mode === 'modal' || dialog.mode === 'inline-modal')
      .at(-1)
      ?.[showBackdrop]();
  }

  #tryResetFullscreenValue(): void {
    if (typeof this.#originalFullscreenValue === 'boolean') {
      this.fullscreen = this.#originalFullscreenValue;
    }
    this.#originalFullscreenValue = undefined;
  }

  async #applyOpen(): Promise<void> {
    if (this.open) {
      this.#show();
      this.#tryAutofocus();
    } else {
      await this.#hide();
    }

    this.toggleAttribute(DIALOG_CONSTANTS.attributes.VISIBLE, this.open); // We use this for styling purposes to control animations
  }

  #tryAutofocus(): void {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const alreadyHasFocus = this.matches(':focus-within');
        if (!alreadyHasFocus) {
          if (this.mode === 'modal') {
            this._dialogElement.focus();
          }

          if (this.open && this._dialogElement.isConnected) {
            const autofocusElement = this.querySelector<HTMLElement>(DIALOG_CONSTANTS.selectors.AUTOFOCUS);

            if (autofocusElement) {
              autofocusElement.focus();
            } else {
              const firstFocusableElement = getFirstFocusableElement(this._dialogElement);
              firstFocusableElement?.focus({ focusVisible: false });
            }
          }
        }
      });
    });
  }

  #onEscapeDismiss(evt: KeyboardEvent): void {
    if (evt.key !== 'Escape' || !DismissibleStack.instance.isMostRecent(this)) {
      return;
    }

    evt.preventDefault();

    if (!this.persistent) {
      this.#tryClose('escape');
    }
  }

  #onBackdropDismiss(): void {
    this.#tryClose('backdrop');
  }

  #onDialogFormSubmit(evt: SubmitEvent): void {
    evt.stopPropagation();
    const isDialogSubmitter = evt.submitter?.getAttribute('formmethod') === 'dialog' || (evt.target as HTMLFormElement)?.getAttribute('method') === 'dialog';
    if (isDialogSubmitter) {
      this.#tryClose('submit');
    }
  }

  #onFullscreenChange(value: boolean): void {
    this.fullscreen = value;
    const event = new CustomEvent(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, { bubbles: true, composed: true, detail: value });
    this.dispatchEvent(event);
  }

  #tryClose(reason: DialogCloseReason): void {
    if (this.#dispatchBeforeCloseEvent(reason)) {
      this.open = false;
    }
  }

  #onTriggerClick(): void {
    this.open = !this.open;
  }

  #tryLocateTriggerElement(id: string | null): void {
    if (!id) {
      this.#triggerElement = null;
      return;
    }
    const rootNode = this.getRootNode() as Document | ShadowRoot;
    this.#triggerElement = rootNode.querySelector<HTMLElement>(`#${id}`);
  }

  #initializeMoveController(): void {
    /* c8 ignore next 3 */
    if (this.#moveController) {
      return;
    }

    const onMoveStart = (): boolean => {
      const event = new CustomEvent(DIALOG_CONSTANTS.events.MOVE_START, { cancelable: true });
      this.dispatchEvent(event);
      return event.defaultPrevented;
    };
    const onMove = (position: IDialogMoveEventData): boolean => {
      const event = new CustomEvent(DIALOG_CONSTANTS.events.MOVE, { detail: position, cancelable: true });
      this.dispatchEvent(event);

      if (!event.defaultPrevented) {
        this._surfaceElement.classList.add(DIALOG_CONSTANTS.classes.MOVED);
        this._surfaceElement.classList.add(DIALOG_CONSTANTS.classes.MOVING);
      }

      return event.defaultPrevented;
    };
    const onMoveEnd = (): void => {
      // Move dialog back into view if the surface is clipped
      if (isElementClipped(this._surfaceElement)) {
        moveElementIntoViewport(this._surfaceElement);
      }

      const event = new CustomEvent(DIALOG_CONSTANTS.events.MOVE_END);
      this._surfaceElement.classList.remove(DIALOG_CONSTANTS.classes.MOVING);
      this.dispatchEvent(event);
    };
    this.#moveController = new MoveController({
      handleElement: this._moveHandleElement,
      surfaceElement: this._surfaceElement,
      onMoveStart,
      onMove,
      onMoveEnd
    });
  }

  #destroyMoveController(): void {
    this._surfaceElement?.classList.remove(DIALOG_CONSTANTS.classes.MOVED);
    this.#moveController?.destroy();
    this.#moveController = undefined;
  }

  #applyMoveable({ enabled } = { enabled: this.moveable }): void {
    if (enabled) {
      this.#initializeMoveController();
    } else {
      this.#destroyMoveController();
    }
  }

  #addFullscreenListener(): void {
    this.#fullscreenMediaQuery = window.matchMedia(`(max-width: ${this.fullscreenThreshold}px)`);
    this.#fullscreenMediaQuery.addEventListener('change', event => this.#fullscreenListener(event.matches));

    if (!this.fullscreen && this.#fullscreenMediaQuery.matches) {
      this.#fullscreenListener(true);
    }
  }

  #removeFullscreenListener(): void {
    this.#fullscreenMediaQuery = undefined;
  }

  #applyGlobalConfiguration(): void {
    const entry = GlobalConfiguration.get(DIALOG_CONSTANTS.elementName);
    if (!entry) {
      return;
    }

    (['mode', 'animationType', 'positionStrategy', 'sizeStrategy', 'persistent', 'moveable', 'fullscreenThreshold'] as const).forEach(prop => {
      if (entry.has(prop)) {
        const value = entry.valueOf(prop);
        if (value) {
          this[prop] = value as never;
        }
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-dialog': IDialogComponent;
  }

  interface HTMLElementEventMap {
    'forge-dialog-open': CustomEvent<void>;
    'forge-dialog-close': CustomEvent<void>;
    'forge-dialog-before-close': CustomEvent<IDialogBeforeCloseEventData>;
    'forge-dialog-move-start': CustomEvent<IDialogMoveStartEventData>;
    'forge-dialog-move': CustomEvent<IDialogMoveEventData>;
    'forge-dialog-move-end': CustomEvent<void>;
    'forge-dialog-fullscreen-change': CustomEvent<boolean>;
  }
}

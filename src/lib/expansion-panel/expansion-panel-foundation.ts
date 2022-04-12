import { debounce, ICustomElementFoundation } from '@tylertech/forge-core';
import { IExpansionPanelAdapter } from './expansion-panel-adapter';
import { EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';

export interface IExpansionPanelFoundation extends ICustomElementFoundation {
  open: boolean;
  orientation: string;
  useAnimations: boolean;
  openCallback: () => void | Promise<void>;
  closeCallback: () => void | Promise<void>;
  setOpenImmediate(open: boolean): void;
}

export class ExpansionPanelFoundation implements IExpansionPanelFoundation {
  private _open = false;
  private _useAnimations = true;
  private _openCallback: () => void | Promise<void>;
  private _closeCallback: () => void | Promise<void>;
  private _orientation = EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_VERTICAL;
  private _clickListener: (evt: MouseEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _headerSlotChangeListener: (evt: Event) => void;
  private _isInitialized = false;

  constructor(private _adapter: IExpansionPanelAdapter) {
    this._clickListener = debounce((evt: MouseEvent) => this._onClick(evt), EXPANSION_PANEL_CONSTANTS.numbers.CLICK_DEBOUNCE_THRESHOLD, true);
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
    this._headerSlotChangeListener = (evt: Event) => this._onHeaderSlotChanged(evt);
  }

  public initialize(): void {
    this.connect();
    this._adapter.initialize(this._open, this._orientation);
    this._isInitialized = true;
  }

  public connect(): void {
    this._adapter.registerHeaderSlotListener(this._headerSlotChangeListener);
    this._adapter.registerClickListener(this._clickListener);
    this._adapter.registerKeydownListener(this._keydownListener);
  }

  public disconnect(): void {
    this._adapter.deregisterHeaderSlotListener(this._headerSlotChangeListener);
    this._adapter.deregisterClickListener(this._clickListener);
    this._adapter.deregisterKeydownListener(this._keydownListener);
  }

  public setOpenImmediate(open: boolean): void {
    if (open) {
      this._openPanel(false);
    } else {
      this._closePanel(false);
    }
  }

  /** Controls the open state of the panel. */
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (value !== this._open) {
      if (this._isInitialized) {
        if (value) {
          if (this._openCallback) {
            Promise.resolve(this._openCallback())
              .then(() => {
                this._open = value;
                this._openPanel(this._useAnimations);
              })
              .catch(() => {});
          } else {
            this._open = value;
            this._openPanel(this._useAnimations);
          }
        } else {
          if (this._closeCallback) {
            Promise.resolve(this._closeCallback())
              .then(() => {
                this._open = value;
                this._closePanel(this._useAnimations);
              })
              .catch(() => {});
          } else {
            this._open = value;
            this._closePanel(this._useAnimations);
          }
        }
      } else {
        this._open = value;
      }
    }
  }

  public get openCallback(): () => void | Promise<void> {
    return this._openCallback;
  }
  public set openCallback(callback: () => void | Promise<void>) {
    this._openCallback = callback;
  }

  public get closeCallback(): () => void | Promise<void> {
    return this._closeCallback;
  }
  public set closeCallback(callback: () => void | Promise<void>) {
    this._closeCallback = callback;
  }

  public get orientation(): string {
    return this._orientation;
  }
  public set orientation(value: string) {
    this._orientation = value;
  }

  public get useAnimations(): boolean {
    return this._useAnimations;
  }
  public set useAnimations(value: boolean) {
    if (this._useAnimations !== !!value) {
      this._useAnimations = !!value;
      this._adapter.setHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.USE_ANIMATIONS, `${this._useAnimations}`);
    }
  }

  /**
   * Handles click events on the header element.
   * @param {MouseEvent} evt The click event.
   */
  private _onClick(evt: MouseEvent): void {
    evt.stopPropagation();
    this._toggle();
    this._emitEvent();
  }

  /**
   * Handles keydown events on the header.
   * @param {KeyboardEvent} evt The keydown event
   */
  private _onKeydown(evt: KeyboardEvent): void {
    evt.stopPropagation();

    if (evt.key === 'Space' || evt.key === 'Enter' || evt.keyCode === 32 || evt.keyCode === 13) {
      evt.preventDefault();
      this._toggle();
      this._emitEvent();
    }
  }

  private _emitEvent(): void {
    this._adapter.emitHostEvent(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, this._open);
  }

  /**
   * Toggles the collapsed state of the panel.
   */
  private _toggle(): void {
    this.open = !this.open;
  }

  private _openPanel(animate: boolean): void {
    this._adapter.setHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN, '');
    this._adapter.setOpenState(true, this._orientation, animate);
  }

  private _closePanel(animate: boolean): void {
    this._adapter.removeHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN);
    this._adapter.setOpenState(false, this._orientation, animate);
  }

  private _onHeaderSlotChanged(evt: Event): void {
    this._adapter.setHeaderVisibility(!!(evt.target as HTMLSlotElement).assignedNodes().length);
  }
}

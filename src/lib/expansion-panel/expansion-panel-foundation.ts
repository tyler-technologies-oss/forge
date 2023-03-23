import { debounce, getEventPath, ICustomElementFoundation } from '@tylertech/forge-core';
import { IExpansionPanelAdapter } from './expansion-panel-adapter';
import { ExpansionPanelType, EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';
import { eventPathIncludesIgnoredElement } from './expansion-panel-utils';

export interface IExpansionPanelFoundation extends ICustomElementFoundation {
  open: boolean;
  type: ExpansionPanelType;
  orientation: string;
  useAnimations: boolean;
  accessibleLabel: string;
  openCallback: () => void | Promise<void>;
  closeCallback: () => void | Promise<void>;
  setOpenImmediate(open: boolean): void;
}

export class ExpansionPanelFoundation implements IExpansionPanelFoundation {
  private _open = false;
  private _useAnimations = true;
  private _openCallback: () => void | Promise<void>;
  private _closeCallback: () => void | Promise<void>;
  private _type: ExpansionPanelType = 'button';
  private _orientation = EXPANSION_PANEL_CONSTANTS.strings.ORIENTATION_VERTICAL;
  private _accessibleLabel = 'expansion panel';
  private _clickListener: (evt: MouseEvent) => void;
  private _headerSlotChangeListener: (evt: Event) => void;
  private _isInitialized = false;

  constructor(private _adapter: IExpansionPanelAdapter) {
    this._clickListener = debounce((evt: MouseEvent) => this._onClick(evt), EXPANSION_PANEL_CONSTANTS.numbers.CLICK_DEBOUNCE_THRESHOLD, true);
    this._headerSlotChangeListener = (evt: Event) => this._onHeaderSlotChanged(evt);
  }

  public initialize(): void {
    this.connect();
    this._adapter.initialize(this._open, this._orientation);
    this._applyType();
    this._isInitialized = true;
  }

  public connect(): void {
    this._adapter.registerHeaderSlotListener(this._headerSlotChangeListener);
  }

  public disconnect(): void {
    this._adapter.deregisterHeaderSlotListener(this._headerSlotChangeListener);
    this._adapter.deregisterClickListener(this._clickListener);
  }

  public setOpenImmediate(open: boolean): void {
    if (open) {
      this._openPanel(false);
    } else {
      this._closePanel(false);
    }
  }

  private _applyOpen(value: boolean): void {
    if (!this._isInitialized) {
      this._open = value;
      return;
    }

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
  }

  private _applyType(): void {
    this._adapter.setHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.TYPE, this._type);
    this._adapter.setType(this._type, this._open);

    if (this._type === 'button') {
      this._adapter.registerClickListener(this._clickListener);
      this._adapter.setButtonLabel(this._accessibleLabel);
    } else {
      this._adapter.deregisterClickListener(this._clickListener);
    }
  }

  private _applyAccessibleLabel(): void {
    this._adapter.setHostAttribute(EXPANSION_PANEL_CONSTANTS.attributes.ACCESSIBLE_LABEL, this._accessibleLabel);
    this._adapter.setButtonLabel(this._accessibleLabel);
  }

  /** Controls the open state of the panel. */
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._applyOpen(value);
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

  public get type(): ExpansionPanelType {
    return this._type;
  }
  public set type(value: ExpansionPanelType) {
    if (this._type !== value) {
      this._type = value;
      this._applyType();
    }
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

  public get accessibleLabel(): string {
    return this._accessibleLabel;
  }
  public set accessibleLabel(value: string) {
    if (this._accessibleLabel !== value) {
      this._accessibleLabel = value;
      this._applyAccessibleLabel();
    }
  }

  /**
   * Handles click events on the header element.
   * @param {MouseEvent} evt The click event.
   */
  private _onClick(evt: MouseEvent): void {
    if (eventPathIncludesIgnoredElement(evt)) {
      return;
    }

    evt.stopPropagation();
    this._toggle();
    this._emitEvent();
  }

  private _emitEvent(): void {
    this._adapter.emitHostEvent(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, this._open);
  }

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

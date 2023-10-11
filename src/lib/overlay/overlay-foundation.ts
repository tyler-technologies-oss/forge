
import { IBaseOverlayFoundation, BaseOverlayFoundation } from './base-overlay-foundation';
import { IOverlayAdapter } from './overlay-adapter';
import { CAN_USE_POPOVER, IOverlayOffset, IOverlayToggleEventData, OverlayLightDismissEventData, OverlayPlacement, OverlayPositionStrategy, OverlayToggleEvent, OVERLAY_CONSTANTS } from './overlay-constants';

export interface IOverlayFoundation extends IBaseOverlayFoundation {
  arrowElement: HTMLElement;
  arrowElementOffset: number;
}

export class OverlayFoundation extends BaseOverlayFoundation<IOverlayAdapter> implements IOverlayFoundation {
  private _targetElement: HTMLElement;
  private _target: string | null;
  private _open = false;
  private _inline = false;
  private _placement: OverlayPlacement = 'bottom';
  private _positionStrategy: OverlayPositionStrategy = 'fixed';
  private _offset: IOverlayOffset = {};
  private _shift = false;
  private _hide = true;
  private _flip = true;
  private _auto = false;
  private _static = false;
  private _dialog = false;
  private _modal = false;
  private _arrowElement: HTMLElement;
  private _arrowElementOffset = 0;

  private _lightDismissPopoverListener: EventListener;
  private _lightDismissDialogListener: EventListener | (() => void);
  private _lightDismissCustomListener: () => void;

  constructor(adapter: IOverlayAdapter) {
    super(adapter);
    this._lightDismissPopoverListener = (evt: OverlayToggleEvent) => {
      if (evt.newState === 'closed') {
        this._onLightDismiss({ type: 'modeless' });
      }
    };
    this._lightDismissDialogListener = (evt: Event | undefined) => {
      evt?.preventDefault();
      if (!evt || this._adapter.isMostRecentOpenOverlay()) {
        this._onLightDismiss({ type: 'modal' });
      }
    };
    this._lightDismissCustomListener = () => this._onLightDismiss({ type: 'modeless' });
  }

  public initialize(): void {
    if (!this._targetElement && this._target) {
      const target = this._adapter.locateTargetElement(this._target);
      if (target) {
        this._targetElement = target;
      }
    }
  }

  public disconnect(): void {
    this._adapter.tryCleanupAutoUpdate();
    this._removeLightDismissListener();
  }

  public position(): void {
    if (!this._open || !this._targetElement) {
      return;
    }

    this._adapter.positionElement({
      targetElement: this._targetElement,
      strategy: this._positionStrategy,
      placement: this._placement,
      hide: this._hide,
      offset: this._offset,
      shift: this._shift,
      flip: this._flip,
      auto: this._auto
    });
  }

  private _onLightDismiss({ type }: OverlayLightDismissEventData): void {
    const isCancelled = this._adapter.dispatchHostEvent({
      type: OVERLAY_CONSTANTS.events.LIGHT_DISMISS,
      bubbles: false,
      cancelable: true,
      detail: { type } as OverlayLightDismissEventData
    });
    if (isCancelled) {
      return;
    }
    this._applyOpen(false);
  }

  protected _applyOpen(newState: boolean): void {
    if (this._open === newState || !this._adapter.isConnected) {
      return;
    }

    this._open = newState;
    this._adapter.setOpen(this._open);

    if (this._open) {
      if (!this._static) {
        this._applyLightDismissListener();
      }
    } else {
      this._removeLightDismissListener();
    }

    if (this._open && this._targetElement) {
      this.position();
    }
    
    this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.OPEN, this._open);
  }

  private _applyLightDismissListener(): void {
    if (this._dialog && this._modal) {
      this._adapter.addDialogLightDismissListener(this._lightDismissDialogListener);
    } else {
      if (this._inline && CAN_USE_POPOVER) {
        this._adapter.addCustomLightDismissListener(this._lightDismissCustomListener);
      } else {
        this._adapter.addPopoverLightDismissListener(this._lightDismissPopoverListener);
      }
    }
  }

  private _removeLightDismissListener(): void {
    this._adapter.removePopoverLightDismissListener(this._lightDismissPopoverListener);
    this._adapter.removeDialogLightDismissListener(this._lightDismissDialogListener);
    this._adapter.removeCustomLightDismissListener();
  }

  public get targetElement(): HTMLElement {
    return this._targetElement;
  }
  public set targetElement(value: HTMLElement) {
    this._targetElement = value;
  }

  public get target(): string | null {
    return this._target;
  }
  public set target(value: string | null) {
    if (this._target !== value) {
      this._target = value;
      if (this._adapter.isConnected && this._target) {
        const target = this._adapter.locateTargetElement(this._target);
        if (target) {
          this._targetElement = target;
        }
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.TARGET, !!this._target, this._target as string);
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._applyOpen(value);
    }
  }

  public get arrowElement(): HTMLElement {
    return this._arrowElement;
  }
  public set arrowElement(value: HTMLElement) {
    this._arrowElement = value;
  }

  public get arrowElementOffset(): number {
    return this._arrowElementOffset;
  }
  public set arrowElementOffset(value: number) {
    this._arrowElementOffset = value;
  }

  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    value = Boolean(value);
    if (this._inline !== value) {
      this._inline = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.INLINE, this._inline);
    }
  }

  public get placement(): OverlayPlacement {
    return this._placement;
  }
  public set placement(value: OverlayPlacement) {
    if (this._placement !== value) {
      this._placement = value;
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }

  public get positionStrategy(): OverlayPositionStrategy {
    return this._positionStrategy;
  }
  public set positionStrategy(value: OverlayPositionStrategy) {
    if (this._positionStrategy !== value) {
      this._positionStrategy = value;
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY, this._positionStrategy);
    }
  }

  public get offset(): IOverlayOffset {
    return this._offset;
  }
  public set offset(value: IOverlayOffset) {
    this._offset = value;
  }

  public get shift(): boolean {
    return this._shift;
  }
  public set shift(value: boolean) {
    value = Boolean(value);
    if (this._shift !== value) {
      this._shift = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.SHIFT, this._shift);
    }
  }

  public get hide(): boolean {
    return this._hide;
  }
  public set hide(value: boolean) {
    value = Boolean(value);
    if (this._hide !== value) {
      this._hide = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE, this._hide);
    }
  }

  public get static(): boolean {
    return this._static;
  }
  public set static(value: boolean) {
    value = Boolean(value);
    if (this._static !== value) {
      this._static = value;
      
      if (this._static) {
        this._removeLightDismissListener();
      }

      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.STATIC, this._static);
    }
  }

  public get flip(): boolean {
    return this._flip;
  }
  public set flip(value: boolean) {
    value = Boolean(value);
    if (this._flip !== value) {
      this._flip = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.NO_FLIP, !this._flip);
    }
  }

  public get auto(): boolean {
    return this._auto;
  }
  public set auto(value: boolean) {
    value = Boolean(value);
    if (this._auto !== value) {
      this._auto = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.AUTO, this._auto);
    }
  }

  public get dialog(): boolean {
    return this._dialog;
  }
  public set dialog(value: boolean) {
    if (this._dialog !== value) {
      this._dialog = value;
      this._adapter.setDialog(this._dialog);
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.DIALOG, this._dialog);
    }
  }

  public get modal(): boolean {
    return this._modal;
  }
  public set modal(value: boolean) {
    if (this._modal !== value) {
      this._modal = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.MODAL, this._modal);
    }
  }
}

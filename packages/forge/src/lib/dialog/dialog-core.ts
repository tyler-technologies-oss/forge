import { MoveController } from '../core/controllers/move-controller.js';
import { DismissibleStack } from '../core/utils/dismissible-stack.js';
import { IDialogAdapter } from './dialog-adapter.js';
import {
  DIALOG_CONSTANTS,
  DialogAnimationType,
  DialogCloseReason,
  DialogMode,
  DialogPlacement,
  DialogPositionStrategy,
  DialogPreset,
  DialogSizeStrategy,
  DialogType,
  IDialogMoveEventData
} from './dialog-constants.js';

export interface IDialogCore {
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
  hideBackdrop(): void;
  showBackdrop(): void;
  dispatchBeforeCloseEvent(reason: DialogCloseReason): boolean;
}

export class DialogCore implements IDialogCore {
  private _open = false;
  private _mode: DialogMode = DIALOG_CONSTANTS.defaults.MODE;
  private _type: DialogType = DIALOG_CONSTANTS.defaults.TYPE;
  private _animationType: DialogAnimationType = DIALOG_CONSTANTS.defaults.ANIMATION_TYPE;
  private _preset: DialogPreset = DIALOG_CONSTANTS.defaults.PRESET;
  private _persistent = false;
  private _fullscreen = false;
  private _fullscreenThreshold = DIALOG_CONSTANTS.defaults.FULLSCREEN_THRESHOLD;
  private _originalFullscreenValue: boolean | undefined;
  private _trigger = '';
  private _moveable = false;
  private _label = '';
  private _description = '';
  private _sizeStrategy: DialogSizeStrategy = DIALOG_CONSTANTS.defaults.SIZE_STRATEGY;
  private _placement: DialogPlacement = DIALOG_CONSTANTS.defaults.PLACEMENT;
  private _positionStrategy: DialogPositionStrategy = DIALOG_CONSTANTS.defaults.POSITION_STRATEGY;
  private _moveController: MoveController | undefined;

  private _escapeDismissListener: EventListener = this._onEscapeDismiss.bind(this);
  private _backdropDismissListener: EventListener = this._onBackdropDismiss.bind(this);
  private _dialogFormSubmitListener: EventListener = this._onDialogFormSubmit.bind(this);
  private _triggerClickListener: EventListener = this._onTriggerClick.bind(this);
  private _fullscreenListener: (value: boolean) => void = this._onFullscreenChange.bind(this);

  constructor(public _adapter: IDialogAdapter) {}

  public initialize(): void {
    this._adapter.tryApplyGlobalConfiguration(['mode', 'animationType', 'positionStrategy', 'sizeStrategy', 'persistent', 'moveable', 'fullscreenThreshold']);

    if (this._trigger && !this._adapter.triggerElement) {
      this._adapter.tryLocateTriggerElement(this._trigger);
    }

    if (this._adapter.triggerElement) {
      this._adapter.addTriggerInteractionListener(this._triggerClickListener);
    }

    if (this._open) {
      this._applyOpen();
    }
  }

  public destroy(): void {
    if (this._adapter.triggerElement) {
      this._adapter.removeTriggerInteractionListener(this._triggerClickListener);
    }

    if (this._moveController) {
      this._destroyMoveController();
    }

    this._release();
    this._tryResetFullscreenValue();
    this._adapter.destroy();
  }

  public dispatchBeforeCloseEvent(reason: DialogCloseReason): boolean {
    const evt = new CustomEvent(DIALOG_CONSTANTS.events.BEFORE_CLOSE, {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: { reason }
    });
    this._adapter.dispatchHostEvent(evt);
    return !evt.defaultPrevented;
  }

  public hideBackdrop(): void {
    this._adapter.hideBackdrop();
  }

  public showBackdrop(): void {
    this._adapter.showBackdrop();
  }

  private _show(): void {
    this._adapter.show();
    this._adapter.addDialogFormSubmitListener(this._dialogFormSubmitListener);
    DismissibleStack.instance.add(this._adapter.hostElement);

    if (this._mode === 'modal' || this._mode === 'inline-modal') {
      this._adapter.addDocumentListener('keydown', this._escapeDismissListener, { capture: true });
    }

    if (!this._persistent) {
      this._adapter.addBackdropDismissListener(this._backdropDismissListener);
    }

    if (this._moveable && !this._fullscreen) {
      this._initializeMoveController();
    }

    if (!this._fullscreen && this._fullscreenThreshold > 0) {
      this._originalFullscreenValue = this._fullscreen;
      this._adapter.addFullscreenListener(this._fullscreenThreshold, this._fullscreenListener);
    }

    this._adapter.dispatchHostEvent(new CustomEvent(DIALOG_CONSTANTS.events.OPEN, { bubbles: true, composed: true }));
  }

  private async _hide(): Promise<void> {
    this._release();
    await this._adapter.hide();

    // Reset the fullscreen value to the original value if it was changed internally by our media query listener
    this._tryResetFullscreenValue();

    if (this._moveController) {
      this._destroyMoveController();
    }

    this._adapter.dispatchHostEvent(new CustomEvent(DIALOG_CONSTANTS.events.CLOSE, { bubbles: true, composed: true }));
  }

  private _release(): void {
    this._adapter.removeDialogFormSubmitListener(this._dialogFormSubmitListener);
    this._adapter.removeDocumentListener('keydown', this._escapeDismissListener, { capture: true });
    this._adapter.removeBackdropDismissListener(this._backdropDismissListener);
    DismissibleStack.instance.remove(this._adapter.hostElement);
  }

  private _tryResetFullscreenValue(): void {
    if (typeof this._originalFullscreenValue === 'boolean') {
      this.fullscreen = this._originalFullscreenValue;
    }
    this._originalFullscreenValue = undefined;
  }

  private async _applyOpen(): Promise<void> {
    if (this._open) {
      this._show();
      this._adapter.tryAutofocus();
    } else {
      await this._hide();
    }

    this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.VISIBLE, this._open); // We use this for styling purposes to control animations
    this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.OPEN, this._open);
  }

  private _onEscapeDismiss(evt: KeyboardEvent): void {
    if (evt.key !== 'Escape' || !DismissibleStack.instance.isMostRecent(this._adapter.hostElement)) {
      return;
    }

    evt.preventDefault();

    if (!this._persistent) {
      this._tryClose('escape');
    }
  }

  private _onBackdropDismiss(): void {
    this._tryClose('backdrop');
  }

  private _onDialogFormSubmit(evt: SubmitEvent): void {
    evt.stopPropagation();
    const isDialogSubmitter = evt.submitter?.getAttribute('formmethod') === 'dialog' || (evt.target as HTMLFormElement)?.getAttribute('method') === 'dialog';
    if (isDialogSubmitter) {
      this._tryClose('submit');
    }
  }

  private _onFullscreenChange(value: boolean): void {
    this.fullscreen = value;
    const event = new CustomEvent(DIALOG_CONSTANTS.events.FULLSCREEN_CHANGE, { bubbles: true, composed: true, detail: value });
    this._adapter.dispatchHostEvent(event);
  }

  private _tryClose(reason: DialogCloseReason): void {
    if (this.dispatchBeforeCloseEvent(reason)) {
      this.open = false;
    }
  }

  private _onTriggerClick(_evt: MouseEvent): void {
    this.open = !this._open;
  }

  private _initializeMoveController(): void {
    /* c8 ignore next 3 */
    if (this._moveController) {
      return;
    }

    const onMoveStart = (): boolean => {
      const event = new CustomEvent(DIALOG_CONSTANTS.events.MOVE_START, { cancelable: true });
      this._adapter.dispatchHostEvent(event);
      return event.defaultPrevented;
    };
    const onMove = (position: IDialogMoveEventData): boolean => {
      const event = new CustomEvent(DIALOG_CONSTANTS.events.MOVE, { detail: position, cancelable: true });
      this._adapter.dispatchHostEvent(event);

      if (!event.defaultPrevented) {
        this._adapter.addSurfaceClass(DIALOG_CONSTANTS.classes.MOVED);
        this._adapter.addSurfaceClass(DIALOG_CONSTANTS.classes.MOVING);
      }

      return event.defaultPrevented;
    };
    const onMoveEnd = (): void => {
      // Move dialog back into view if the surface is clipped
      if (this._adapter.isSurfaceClipped()) {
        this._adapter.moveSurfaceIntoView();
      }

      const event = new CustomEvent(DIALOG_CONSTANTS.events.MOVE_END);
      this._adapter.removeSurfaceClass(DIALOG_CONSTANTS.classes.MOVING);
      this._adapter.dispatchHostEvent(event);
    };
    const { moveHandleElement: handleElement, surfaceElement } = this._adapter;
    this._moveController = new MoveController({ handleElement, surfaceElement, onMoveStart, onMove, onMoveEnd });
  }

  private _destroyMoveController(): void {
    this._adapter.removeSurfaceClass(DIALOG_CONSTANTS.classes.MOVED);
    this._moveController?.destroy();
    this._moveController = undefined;
  }

  private _applyMoveable({ enabled } = { enabled: this._moveable }): void {
    if (enabled) {
      this._initializeMoveController();
    } else {
      this._destroyMoveController();
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      if (this._adapter.isConnected) {
        this._applyOpen();
      }
    }
  }

  public get mode(): DialogMode {
    return this._mode;
  }
  public set mode(value: DialogMode) {
    if (this._mode !== value) {
      this._mode = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.MODE, this._mode);
    }
  }

  public get type(): DialogType {
    return this._type;
  }
  public set type(value: DialogType) {
    if (this._type !== value) {
      this._type = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  public get animationType(): DialogAnimationType {
    return this._animationType;
  }
  public set animationType(value: DialogAnimationType) {
    if (this._animationType !== value) {
      this._animationType = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.ANIMATION_TYPE, this._animationType);
    }
  }

  public get preset(): DialogPreset {
    return this._preset;
  }
  public set preset(value: DialogPreset) {
    if (this._preset !== value) {
      this._preset = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.PRESET, this._preset);
    }
  }

  public get persistent(): boolean {
    return this._persistent;
  }
  public set persistent(value: boolean) {
    value = Boolean(value);
    if (this._persistent !== value) {
      this._persistent = value;

      if (this._adapter.isConnected && this._open) {
        if (this._persistent) {
          this._adapter.removeBackdropDismissListener(this._backdropDismissListener);
        } else {
          this._adapter.addBackdropDismissListener(this._backdropDismissListener);
        }
      }

      this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.PERSISTENT, this._persistent);
    }
  }

  public get fullscreen(): boolean {
    return this._fullscreen;
  }
  public set fullscreen(value: boolean) {
    value = Boolean(value);
    if (this._fullscreen !== value) {
      this._fullscreen = value;
      this._applyMoveable({ enabled: !this._fullscreen });
      this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN, this._fullscreen);
    }
  }

  public get fullscreenThreshold(): number {
    return this._fullscreenThreshold;
  }
  public set fullscreenThreshold(value: number) {
    if (this._fullscreenThreshold !== value) {
      this._fullscreenThreshold = value;

      if (this._adapter.isConnected && this._open && !this._fullscreen && this._fullscreenThreshold > 0) {
        this._adapter.removeFullscreenListener(this._fullscreenListener);
        this._adapter.addFullscreenListener(this._fullscreenThreshold, this._fullscreenListener);
      }

      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.FULLSCREEN_THRESHOLD, this._fullscreenThreshold.toString());
    }
  }

  public get trigger(): string {
    return this._trigger ?? '';
  }
  public set trigger(value: string) {
    if (this._trigger !== value) {
      this._trigger = value;

      if (this._adapter.triggerElement) {
        this._adapter.removeTriggerInteractionListener(this._triggerClickListener);
      }

      if (this._adapter.isConnected) {
        this._adapter.tryLocateTriggerElement(this._trigger);
        this._adapter.addTriggerInteractionListener(this._triggerClickListener);
      }
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.TRIGGER, this._trigger);
    }
  }

  public get triggerElement(): HTMLElement | null {
    return this._adapter.triggerElement;
  }
  public set triggerElement(element: HTMLElement | null) {
    if (this._adapter.triggerElement) {
      this._adapter.removeTriggerInteractionListener(this._triggerClickListener);
    }

    if (this._trigger) {
      this._trigger = '';
    }

    this._adapter.triggerElement = element;

    if (this._adapter.isConnected) {
      this._adapter.addTriggerInteractionListener(this._triggerClickListener);
    }
  }

  public get moveable(): boolean {
    return this._moveable;
  }
  public set moveable(value: boolean) {
    value = Boolean(value);
    if (this._moveable !== value) {
      this._moveable = value;

      if (this._adapter.isConnected && this._open) {
        this._applyMoveable();
      }

      this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.MOVEABLE, this._moveable);
    }
  }

  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._adapter.setAccessibleLabel(this._label);
    }
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    if (this._description !== value) {
      this._description = value;
      this._adapter.setAccessibleDescription(this._description);
    }
  }

  public get positionStrategy(): DialogPositionStrategy {
    return this._positionStrategy;
  }
  public set positionStrategy(value: DialogPositionStrategy) {
    if (this._positionStrategy !== value) {
      this._positionStrategy = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.POSITION_STRATEGY, this._positionStrategy);
    }
  }

  public get sizeStrategy(): DialogSizeStrategy {
    return this._sizeStrategy;
  }
  public set sizeStrategy(value: DialogSizeStrategy) {
    if (this._sizeStrategy !== value) {
      this._sizeStrategy = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.SIZE_STRATEGY, this._sizeStrategy);
    }
  }

  public get placement(): DialogPlacement {
    return this._placement;
  }
  public set placement(value: DialogPlacement) {
    if (this._placement !== value) {
      this._placement = value;
      this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }
}

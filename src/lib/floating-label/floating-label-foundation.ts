import { FLOATING_LABEL_CONSTANTS } from './floating-label-constants';
import { IFloatingLabelAdapter } from './floating-label-adapter';
import { Platform } from '@tylertech/forge-core';

export class FloatingLabelFoundation {
  private _floatAnimationEndHandler: () => void;

  constructor(protected _adapter: IFloatingLabelAdapter) {
    this._floatAnimationEndHandler = () => this._handleFloatAnimationEnd();
  }

  public initialize(): void {
    this._adapter.addLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOATING_LABEL);
    
    if (Platform.BLINK) {
      // Chromium has a bug where the label renders blurry due to a scale transform
      // so we only provide a fix for that when the Blink engine is used
      this._adapter.addLabelListener('transitionend', this._floatAnimationEndHandler);
    }
  }

  public disconnect(): void {
    this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOATING_LABEL);
    this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE);
    this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE_END_KEYFRAME);
    this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME);
    if (this._floatAnimationEndHandler) {
      this._adapter.removeLabelListener('transitionend', this._floatAnimationEndHandler);
    }
  }

  public float(shouldFloat: boolean, alwaysFloat = false): void {
    if (shouldFloat) {
      if (this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME)) {
        this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME);
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (alwaysFloat || this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE)) {
            this._adapter.addLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE_END_KEYFRAME);
          }
          this._adapter.addLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE);
        });
      });
    } else {
      this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE);
      if (this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE_END_KEYFRAME)) {
        this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE_END_KEYFRAME);
        this._adapter.addLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME);
          });
        });
      }
    }
  }

  public getWidth(): number {
    return this._adapter.getWidth();
  }

  public get isFloating(): boolean {
    return this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE);
  }

  private _handleFloatAnimationEnd(): void {
    if (this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE) && !this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE_END_KEYFRAME)) {
      this._adapter.addLabelClass(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE_END_KEYFRAME);
    } else if (this._adapter.hasLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME)) {
      this._adapter.removeLabelClass(FLOATING_LABEL_CONSTANTS.classes.UNFLOAT_ABOVE_START_KEYFRAME);
    }
  }
}

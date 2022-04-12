import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ICheckboxAdapter } from './checkbox-adapter';
import { CHECKBOX_CONSTANTS } from './checkbox-constants';

export interface ICheckboxFoundation extends ICustomElementFoundation {
  dense: boolean;
}

export class CheckboxFoundation implements ICheckboxFoundation {
  private _dense = false;
  private _currentCheckState = CHECKBOX_CONSTANTS.strings.TRANSITION_STATE_INIT;
  private _currentAnimationClass = '';
  private _animEndLatchTimer = 0;
  private _enableAnimationEndHandler = false;

  private _handleChange!: () => void;
  private _inputAttributeChangedListener: (name: string, value: string) => void;
  private _handleAnimationEnd: () => void;

  constructor(private _adapter: ICheckboxAdapter) {}

  public disconnect(): void {
    this._adapter.unlisten('change', this._handleChange);
    this._adapter.disconnect();
    this._adapter.uninstallPropertyChangeHooks();
    this._adapter.unlisten('animationend', this._handleAnimationEnd);
  }

  public connect(): void {
    this._adapter.initialize();
    this._currentCheckState = this._determineCheckState();
    this._setDense(this.dense);
    this._updateAriaChecked();
    this._inputAttributeChangedListener = (name, value) => this._handleInputAttributeChange();
    this._adapter.setInputAttributeObserver((name, value) => this._inputAttributeChangedListener(name, value));

    this._handleChange = () => this._handleInputChange();
    this._adapter.listen('change', this._handleChange);
    this._adapter.installPropertyChangeHooks(() => {
      this._handleInputChange();
    });
    this._handleAnimationEnd = () => this.handleAnimationEnd();
    this._adapter.listen('animationend', this._handleAnimationEnd, true);

    this._handleInputChange();
  }

  public get dense(): boolean {
    return this._dense;
  }

  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._setDense(value);
    }
  }

  public handleAnimationEnd(): void {
    if (!this._enableAnimationEndHandler) {
      return;
    }

    const handler: TimerHandler = () => {
      this._adapter.removeRootClass(this._currentAnimationClass);
      this._enableAnimationEndHandler = false;
    };

    clearTimeout(this._animEndLatchTimer);
    this._animEndLatchTimer = setTimeout(handler, CHECKBOX_CONSTANTS.numbers.ANIM_END_LATCH_MS);
  }

  private _setDense(value: boolean): void {
    this._adapter.setDense(value);
  }

  private _determineCheckState(): string {
    const { TRANSITION_STATE_INDETERMINATE, TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED } = CHECKBOX_CONSTANTS.strings;

    if (this._adapter.isIndeterminate()) {
      return TRANSITION_STATE_INDETERMINATE;
    }

    return this._adapter.isChecked() ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  }

  private _updateAriaChecked(): void {
    const { ARIA_CHECKED_INDETERMINATE_VALUE, ARIA_CHECKED_ATTR } = CHECKBOX_CONSTANTS.strings;
    // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
    if (this._adapter.isIndeterminate()) {
      this._adapter.setNativeAttribute(ARIA_CHECKED_ATTR, ARIA_CHECKED_INDETERMINATE_VALUE);
      this._adapter.setRootClass(CHECKBOX_CONSTANTS.classes.INDETERMINATE);
      if (!this._adapter.isChecked()) {
        this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.CHECKED);
      }
    } else {
      // The on/off state does not need to keep track of aria-checked, since
      // the screenreader uses the checked property on the checkbox element.
      this._adapter.removeNativeAttribute(ARIA_CHECKED_ATTR);
      this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.INDETERMINATE);
    }
  }

  private _handleInputChange(): void {
    this._handleInputAttributeChange();
    this._updateCheckboxStateClasses();
    this._transitionCheckState();
  }

  private _transitionCheckState(): void {
    if (!this._adapter.isAttachedToDOM()) {
      return;
    }
    const oldState = this._currentCheckState;
    const newState = this._determineCheckState();

    if (oldState === newState) {
      return;
    }

    this._updateAriaChecked();

    const { TRANSITION_STATE_UNCHECKED } = CHECKBOX_CONSTANTS.strings;
    const { SELECTED } = CHECKBOX_CONSTANTS.classes;
    if (newState === TRANSITION_STATE_UNCHECKED) {
      this._adapter.removeRootClass(SELECTED);
    } else {
      this._adapter.setRootClass(SELECTED);
    }

    // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.
    if (this._currentAnimationClass.length > 0) {
      clearTimeout(this._animEndLatchTimer);
      this._adapter.forceLayout();
      this._adapter.removeRootClass(this._currentAnimationClass);
    }
    // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.
    if (this._currentAnimationClass.length > 0) {
      clearTimeout(this._animEndLatchTimer);
      this._adapter.forceLayout();
      this._adapter.removeRootClass(this._currentAnimationClass);
    }

    this._currentAnimationClass = this._getTransitionAnimationClass(oldState, newState);
    this._currentCheckState = newState;

    // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.
    if (this._adapter.isAttachedToDOM() && this._currentAnimationClass.length > 0) {
      this._adapter.setRootClass(this._currentAnimationClass);
      this._enableAnimationEndHandler = true;
    }

    this._adapter.forceLayout();
  }

  private _handleInputAttributeChange(): void {
    if (this._adapter.isDisabled()) {
      this._adapter.setRootClass(CHECKBOX_CONSTANTS.classes.DISABLED);
      this._adapter.setWrapperClass(CHECKBOX_CONSTANTS.classes.WRAPPER_DISABLED);
      this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.ENABLED);
    } else {
      this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.DISABLED);
      this._adapter.removeWrapperClass(CHECKBOX_CONSTANTS.classes.WRAPPER_DISABLED);
      this._adapter.setRootClass(CHECKBOX_CONSTANTS.classes.ENABLED);
    }

    this._updateCheckboxStateClasses();
  }

  private _getTransitionAnimationClass(oldState: string, newState: string): string {
    const { TRANSITION_STATE_CHECKED, TRANSITION_STATE_UNCHECKED } = CHECKBOX_CONSTANTS.strings;

    const {
      ANIM_UNCHECKED_CHECKED,
      ANIM_UNCHECKED_INDETERMINATE,
      ANIM_CHECKED_UNCHECKED,
      ANIM_CHECKED_INDETERMINATE,
      ANIM_INDETERMINATE_CHECKED,
      ANIM_INDETERMINATE_UNCHECKED
    } = CHECKBOX_CONSTANTS.classes;

    switch (oldState) {
      case TRANSITION_STATE_UNCHECKED:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
      case TRANSITION_STATE_CHECKED:
        return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
      default:
        // TRANSITION_STATE_INDETERMINATE
        // Handles TRANSITION_STATE_INIT
        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  }

  private _updateCheckboxStateClasses(): void {
    // Since we can't use the ::slotted():checked ~ selector, simulating the same functionality with classes
    if (this._adapter.isChecked()) {
      this._adapter.setRootClass(CHECKBOX_CONSTANTS.classes.CHECKED);
    } else {
      this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.CHECKED);
    }

    if (this._adapter.isIndeterminate()) {
      this._adapter.setRootClass(CHECKBOX_CONSTANTS.classes.INDETERMINATE);
      this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.CHECKED);
    } else {
      this._adapter.removeRootClass(CHECKBOX_CONSTANTS.classes.INDETERMINATE);
    }
  }
}

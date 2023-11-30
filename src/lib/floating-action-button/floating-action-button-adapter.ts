import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BaseButtonAdapter, IBaseButtonAdapter } from '../button/base/base-button-adapter';
import { IFloatingActionButtonComponent } from './floating-action-button';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

export interface IFloatingActionButtonAdapter extends IBaseButtonAdapter {
  destroy(): void;
}

export class FloatingActionButtonAdapter extends BaseButtonAdapter implements IFloatingActionButtonAdapter {
  private _labelSlotElement: HTMLSlotElement;
  private _extendedObserver: MutationObserver | undefined;

  constructor(component: IFloatingActionButtonComponent) {
    super(component);
    this._labelSlotElement = getShadowElement(this._component, FLOATING_ACTION_BUTTON_CONSTANTS.selectors.LABEL_SLOT) as HTMLSlotElement;
  }

  public override initialize(): void {
    super.initialize();

    if (!this._extendedObserver) {
      this._startExtendedWatcher();
    }
    
    this._detectExtendedState();
  }

  public destroy(): void {
    this._extendedObserver?.disconnect();
    this._extendedObserver = undefined;
  }

  public override toggleDefaultPopoverIcon(value: boolean): void {
    super.toggleDefaultPopoverIcon(value);
    this._detectExtendedState();
  }

  private _startExtendedWatcher(): void {
    this._extendedObserver = new MutationObserver(() => this._detectExtendedState());
    this._extendedObserver.observe(this._component, { childList: true, subtree: true, characterData: true });
  }

  private _detectExtendedState(): void {
    // If there are nodes in the "label" slot, then we always assume the extended state
    const hasLabel = this._labelSlotElement.assignedNodes().length > 0;
    if (hasLabel) {
      this._rootElement.classList.add(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED);
      return;
    }

    // Remove the extended class first so we can compare the width without it affecting the styles
    this._rootElement.classList.remove(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED);

    // When the width is greater than the height, we assume the button is in the extended state
    const isExtended = this._component.clientWidth > this._component.clientHeight;
    if (isExtended) {
      this._rootElement.classList.add(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED);
    }
  }
}

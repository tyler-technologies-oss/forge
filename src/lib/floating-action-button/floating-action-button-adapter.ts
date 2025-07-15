import { getShadowElement } from '@tylertech/forge-core';
import { BaseButtonAdapter, IBaseButtonAdapter } from '../button/base/base-button-adapter';
import { IFloatingActionButtonComponent } from './floating-action-button';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

export interface IFloatingActionButtonAdapter extends IBaseButtonAdapter<IFloatingActionButtonComponent> {}

export class FloatingActionButtonAdapter extends BaseButtonAdapter<IFloatingActionButtonComponent> implements IFloatingActionButtonAdapter {
  private _labelSlotElement: HTMLSlotElement;

  constructor(component: IFloatingActionButtonComponent) {
    super(component);
    this._labelSlotElement = getShadowElement(this._component, FLOATING_ACTION_BUTTON_CONSTANTS.selectors.LABEL_SLOT) as HTMLSlotElement;
  }

  public override initialize(): void {
    super.initialize();
    this._labelSlotElement.addEventListener('slotchange', () => this._detectExtendedState());
    this._detectExtendedState();
  }

  public override toggleDefaultPopoverIcon(value: boolean): void {
    super.toggleDefaultPopoverIcon(value);
    this._detectExtendedState();
  }

  private _detectExtendedState(): void {
    const isExtended = this._labelSlotElement.assignedNodes().length > 0 || this._component.popoverIcon;
    this._rootElement.classList.toggle(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED, isExtended);
  }
}

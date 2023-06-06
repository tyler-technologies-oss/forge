import { getShadowElement } from '@tylertech/forge-core';
import { IPopoverComponent } from './popover';
import { IOverlayComponent } from '../overlay';

export interface IPopoverAdapter {
  init(targetElement: HTMLElement): void;
}

export class PopoverAdapter implements IPopoverAdapter {
  private _overlayElement: IOverlayComponent;

  constructor(private _component: IPopoverComponent) {
    this._overlayElement = getShadowElement(this._component, 'forge-overlay') as IOverlayComponent;
  }

  public init(targetElement: HTMLElement): void {
    const target = targetElement ?? this._getTargetElement(); // TODO: if doesn't have an element reference already

    if (!target) {
      return;
    }

    this._overlayElement.targetElement = target;
    target.addEventListener('click', () => this._overlayElement.open = !this._overlayElement.open); // TODO: handle non-click events
  }

  private _getTargetElement(): HTMLElement {
    // TODO: accept an IDREF to locate the element by id
    // TODO: if element not found by IDREF, try querySelector in the current DOM tree

    // If still not found, try to use the previous element sibling first
    if (this._component.previousElementSibling) {
      return this._component.previousElementSibling as HTMLElement;
    }
    
    // Finally, if nothing else, we default to the parent element
    return this._component.parentElement as HTMLElement;
  }
}

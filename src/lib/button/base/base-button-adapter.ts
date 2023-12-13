import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { IBaseButton } from './base-button';
import { BASE_BUTTON_CONSTANTS } from './base-button-constants';
import { BUTTON_FORM_ATTRIBUTES, cloneAttributes } from '../../core/utils/reflect-utils';
import { internals, isFocusable, setDefaultAria } from '../../constants';
import { supportsPopover } from '../../core/utils/feature-detection';

// TODO: remove this augmentation when the TypeScript version is upgraded for latest DOM typings
type TempHTMLElementWithPopover = IBaseButton & {
  popoverTargetElement: TempHTMLElementWithPopover | null;
  popover: 'manual' | 'auto';
  showPopover(): void;
  hidePopover(): void;
  togglePopover(): boolean;
};

export interface IBaseButtonAdapter extends IBaseAdapter {
  initialize(): void;
  initializeAnchor(): void;
  removeAnchor(): void;
  setAnchorProperty<T extends keyof HTMLAnchorElement>(name: T, value: HTMLAnchorElement[T]): void;
  setDisabled(value: boolean): void;
  clickAnchor(): void;
  clickHost(): void;
  clickFormButton(type: string): void;
  forceFocusVisible(): void;
  addAnchorEventListener(type: string, listener: EventListener): void;
  removeAnchorEventListener(type: string, listener: EventListener): void;
  hasPopoverTarget(): boolean;
  managePopover(): boolean;
  toggleDefaultPopoverIcon(value: boolean): void;
  animateStateLayer(): void;
}

export abstract class BaseButtonAdapter extends BaseAdapter<IBaseButton> implements IBaseButtonAdapter {
  protected _rootElement: HTMLElement;
  protected _anchorElement: HTMLAnchorElement | undefined;
  protected _focusIndicatorElement: IFocusIndicatorComponent;
  protected _stateLayerElement: IStateLayerComponent;
  protected _endSlotElement: HTMLSlotElement;

  constructor(component: IBaseButton) {
    super(component);
    this._rootElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.ROOT) as HTMLButtonElement;
    this._focusIndicatorElement = getShadowElement(this._component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
    this._endSlotElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
  }

  public initialize(): void {
    this._applyHostSemantics();
  }

  public initializeAnchor(): void {
    this._anchorElement = this._createAnchorRootElement();
    this._rootElement.insertAdjacentElement('afterend', this._anchorElement);
    this._applyHostSemantics();
  }

  public removeAnchor(): void {
    this._anchorElement?.remove();
    this._anchorElement = undefined;
    this._applyHostSemantics();
  }

  public setAnchorProperty<T extends keyof HTMLAnchorElement>(name: T, value: HTMLAnchorElement[T]): void {
    if (this._anchorElement) {
      this._anchorElement[name] = value;
    }
  }

  public setDisabled(value: boolean): void {
    if (this._anchorElement) {
      if (this.hasHostAttribute('aria-disabled')) {
        this.removeHostAttribute('aria-disabled');
      }
      if (!this._focusIndicatorElement.isConnected) {
        this._rootElement.append(this._focusIndicatorElement);
      }
      if (!this._stateLayerElement.isConnected) {
        if (this._stateLayerElement.disabled) {
          this._stateLayerElement.disabled = false;
        }
        this._rootElement.append(this._stateLayerElement);
      }
      return; // Cannot disable an anchor element
    }

    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }

    this._component[isFocusable] = !value;
    this._component[setDefaultAria]({ ariaDisabled: value ? 'true' : null });
  }

  public clickAnchor(): void {
    this._anchorElement?.click();
  }

  public clickHost(): void {
    // Calling click() on the prototype ensures we don't end up in an infinite
    // recursion since the host overrides the HTMLElement.click() method
    HTMLElement.prototype.click.call(this._component);
  }

  public forceFocusVisible(): void {
    this._focusIndicatorElement.active = true;
  }

  public clickFormButton(type: string): void {
    if (!this._component.form) {
      return; // Nothing for us to do if there is no form element associated to us
    }

    if (type === 'submit') {
      // We need to set the form value to the button value before submitting the form
      this._component[internals].setFormValue(this._component.value);

      // We don't use a real <button> since the host is the semantic button, so for
      // the "submit" button type we need to create a temporary button and click it
      // to trigger the form submission
      const tempBtn = document.createElement('button');
      tempBtn.type = type;
      cloneAttributes(this._component, tempBtn, BUTTON_FORM_ATTRIBUTES);

      // form.requestSubmit(submitter) does not work with form associated custom
      // elements. This patches the dispatched submit event to add the correct `submitter`.
      // See https://github.com/WICG/webcomponents/issues/814
      this._component.form.addEventListener('submit', evt => {
        Object.defineProperty(evt, 'submitter', {
          configurable: true,
          enumerable: true,
          get: () => this._component
        });
      }, { capture: true, once: true });

      this._component.insertAdjacentElement('afterend', tempBtn);
      tempBtn.click();
      tempBtn.remove();
    } else if (type === 'reset') {
      this._component.form?.reset();
    }
  }

  public addAnchorEventListener(type: string, listener: EventListener): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeAnchorEventListener(type: string, listener: EventListener): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public hasPopoverTarget(): boolean {
    return this._component.hasAttribute('popovertarget') || !!(this._component as TempHTMLElementWithPopover).popoverTargetElement;
  }

  /**
   * We are emulating native behavior here since custom elements do not support integrating with the
   * native popover element. This method will attempt to find the popover target element and handle
   * its `popovertargetaction`
   */
  public managePopover(): boolean {
    if (this._component.form || !this.hasPopoverTarget() || !supportsPopover()) {
      return false;
    }
    
    const popoverElement = this._locatePopoverTargetElement();
    if (!popoverElement) {
      return false;
    }

    const action = this._component.getAttribute('popovertargetaction') || 'toggle';
    const isPopoverOpen = popoverElement.matches(':popover-open');

    switch (action) {
      case 'show':
        if (!isPopoverOpen) {
          popoverElement.showPopover();
        }
        return true;
      case 'hide':
        if (isPopoverOpen) {
          popoverElement.hidePopover();
        }
        return false;
      case 'toggle':
      default:
        const result = popoverElement.togglePopover();

        // When the popover is open and is using an "auto" popover mode, we need to handle
        // clicking ourselves again to close without re-opening the popover. We do this by
        // adding a click listener to the component that will stop propagation of the event
        // and then remove itself after the first click (or when the popover is closed externally).
        if (result && popoverElement.popover !== 'manual') {
          const listener: EventListener = evt => {
            evt.stopPropagation();

            // The popover will already be closed via pointer, but we need to ensure that
            // it closes via keyboard as well so we perform the following check regardless
            if (popoverElement.matches(':popover-open')) {
              popoverElement.hidePopover();
            }
          };
          this._component.addEventListener('click', listener, { capture: true, once: true });
          popoverElement.addEventListener('beforetoggle', async () => {
            await new Promise<void>(resolve => setTimeout(resolve)); // Wait a cycle to allow the click event to propagate first
            this._component.removeEventListener('click', listener, { capture: true });
          }, { once: true });
        }

        return result;
    }
  }

  public toggleDefaultPopoverIcon(value: boolean): void {
    if (value) {
      // We support a built-in "popover icon" for convenience that can be used to indicate that the button will show a popover
      const hasIcon = this._endSlotElement.querySelector('forge-icon');
      if (!hasIcon) {
        const icon = document.createElement('forge-icon');
        icon.classList.add(BASE_BUTTON_CONSTANTS.classes.POPOVER_ICON);
        icon.name = tylIconArrowDropDown.name;
        this._endSlotElement.append(icon);
      }
    } else {
      const icon = this._endSlotElement.querySelector('forge-icon');
      icon?.remove();
    }
  }

  public animateStateLayer(): void {
    if (this._stateLayerElement.disabled) {
      return;
    }
    this._stateLayerElement?.playAnimation();
  }

  private _locatePopoverTargetElement(): TempHTMLElementWithPopover | null {
    let popoverElement = (this._component as TempHTMLElementWithPopover).popoverTargetElement ?? null;

    if (!popoverElement) {
      const rootNode = this._component.ownerDocument.getRootNode() as Document | ShadowRoot;
      if (!rootNode) {
        return null;
      }

      const targetId = this._component.getAttribute('popovertarget');
      popoverElement = rootNode.querySelector(`#${targetId}`);
    }

    return popoverElement;
  }

  private _applyHostSemantics(): void {
    const role = this._component.getAttribute('role');
    const overwrite = !role || ['button', 'link'].includes(role);
    this._component[setDefaultAria]({ role: this._anchorElement ? 'link' : 'button' }, { setAttribute: overwrite });
    this._component[isFocusable] = !!this._anchorElement ?? !this._component.disabled;
  }

  /**
   * Our anchor element is the interactive element that will be used to trigger the click event when it is present.
   * 
   * We use the <a> element as an overlay on top of all content to ensure that it provides the native functionality,
   * while removing it from the accessibility tree and tab order so that it does not interfere with the host semantics.
   */
  private _createAnchorRootElement(): HTMLAnchorElement {
    const a = document.createElement('a');
    a.setAttribute('aria-hidden', 'true');
    a.tabIndex = -1;
    if (this._component.href) {
      a.href = this._component.href;
    }
    if (this._component.target) {
      a.target = this._component.target;
    }
    if (this._component.download) {
      a.download = this._component.download;
    }
    if (this._component.rel) {
      a.rel = this._component.rel;
    }
    return a;
  }
}

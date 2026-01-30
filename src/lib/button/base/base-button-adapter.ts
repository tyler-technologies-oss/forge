import { getShadowElement } from '@tylertech/forge-core';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { FOCUS_INDICATOR_TAG_NAME, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { IBaseButton } from './base-button';
import { BASE_BUTTON_CONSTANTS, ButtonType } from './base-button-constants';
import { BUTTON_FORM_ATTRIBUTES, cloneAttributes } from '../../core/utils/reflect-utils';
import { internals, setDefaultAria } from '../../constants';
import { supportsPopover } from '../../core/utils/feature-detection';
import { IBaseComponent } from '../../core';

export interface IBaseButtonAdapter<T extends IBaseComponent> extends IBaseAdapter<T> {
  readonly hasSlottedAnchor: boolean;
  initialize(): void;
  setDisabled(value: boolean): void;
  clickHost(): void;
  clickFormButton(type: string): void;
  forceFocusVisible(): void;
  hasPopoverTarget(): boolean;
  managePopover(): boolean;
  toggleDefaultPopoverIcon(value: boolean): void;
  animateStateLayer(): void;
  addDefaultSlotChangeListener(listener: EventListener): void;
  addNativeSubmitButton(): void;
  setNativeSubmitButtonForm(form: string | null | undefined): void;
  removeNativeSubmitButton(): void;
}

export abstract class BaseButtonAdapter<T extends IBaseButton> extends BaseAdapter<T> implements IBaseButtonAdapter<T> {
  protected readonly _rootElement: HTMLElement;
  protected readonly _focusIndicatorElement: IFocusIndicatorComponent;
  protected readonly _stateLayerElement: IStateLayerComponent;
  protected readonly _defaultSlotElement: HTMLSlotElement;
  protected readonly _endSlotElement: HTMLSlotElement;
  protected _nativeSubmitButton?: HTMLButtonElement;
  protected _nativeSubmitButtonClickListener: EventListener = evt => evt.stopPropagation();

  constructor(component: T) {
    super(component);
    this._rootElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.ROOT) as HTMLButtonElement;
    this._focusIndicatorElement = getShadowElement(this._component, FOCUS_INDICATOR_TAG_NAME) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
    this._defaultSlotElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
    this._endSlotElement = getShadowElement(this._component, BASE_BUTTON_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
  }

  public get hasSlottedAnchor(): boolean {
    return !!this.getSlottedAnchor;
  }

  public get getSlottedAnchor(): HTMLAnchorElement | undefined {
    return this._defaultSlotElement.assignedElements({ flatten: true }).find(el => el.tagName === 'A') as HTMLAnchorElement | undefined;
  }

  public initialize(): void {
    const slottedAnchor = this.getSlottedAnchor;
    this._component[setDefaultAria](
      {
        role: slottedAnchor ? null : 'button'
      },
      {
        setAttribute: !this._component.hasAttribute('role') || !!slottedAnchor
      }
    );

    this._rootElement.classList.toggle(BASE_BUTTON_CONSTANTS.classes.WITH_ANCHOR, !!slottedAnchor);

    if (slottedAnchor) {
      this._component.removeAttribute('tabindex');
    } else if (!this._component.disabled && !this._component.hasAttribute('tabindex')) {
      this._component.setAttribute('tabindex', '0');
    }

    this._focusIndicatorElement.targetElement = slottedAnchor ? slottedAnchor : this._component;
    this._stateLayerElement.targetElement = slottedAnchor ? slottedAnchor : this._component;
  }

  public setDisabled(value: boolean): void {
    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }

    const hasSlottedAnchor = this.hasSlottedAnchor;
    if (hasSlottedAnchor) {
      this._component.removeAttribute('tabindex');
      this._component[setDefaultAria]({ ariaDisabled: null }, { setAttribute: true });
    } else {
      if (value) {
        this._component.removeAttribute('tabindex');
      } else if (!this._component.hasAttribute('tabindex')) {
        this._component.setAttribute('tabindex', '0');
      }
      this._component[setDefaultAria]({ ariaDisabled: value ? 'true' : null });
    }
  }

  public clickHost(): void {
    // Calling click() on the prototype ensures we don't end up in an infinite
    // recursion since the host overrides the HTMLElement.click() method
    HTMLElement.prototype.click.call(this._component);
  }

  public forceFocusVisible(): void {
    this._focusIndicatorElement.active = true;
  }

  public clickFormButton(type: ButtonType): void {
    if (!this._component.form || type === 'button') {
      return; // Nothing for us to do if there is no form element associated to us
    }

    if (type === 'submit') {
      // Add a native submit button to the DOM if it doesn't already exist
      this.addNativeSubmitButton();

      // We need to set the form value to the button value before submitting the form
      this._component[internals].setFormValue(this._component.value);

      // We don't use a real <button> since the host is the semantic button, so for
      // the "submit" button type we need to clone attibutes to a native button and click it
      // to trigger the form submission
      cloneAttributes(this._component, this._nativeSubmitButton as HTMLButtonElement, BUTTON_FORM_ATTRIBUTES);

      // form.requestSubmit(submitter) does not work with form associated custom
      // elements. This patches the dispatched submit event to add the correct `submitter`.
      // See https://github.com/WICG/webcomponents/issues/814
      this._component.form.addEventListener(
        'submit',
        evt => {
          Object.defineProperty(evt, 'submitter', {
            configurable: true,
            enumerable: true,
            get: () => this._component
          });
        },
        { capture: true, once: true }
      );
      this._nativeSubmitButton?.addEventListener('click', evt => evt.stopPropagation(), { capture: true, once: true });
      this._nativeSubmitButton?.click();
    } else if (type === 'reset') {
      this._component.form?.reset();
    }
  }

  public hasPopoverTarget(): boolean {
    return this._component.hasAttribute('popovertarget') || !!this._component.popoverTargetElement;
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

    const action = this._component.getAttribute('popovertargetaction') ?? this._component.popoverTargetAction ?? 'toggle';
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
      default: {
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
          popoverElement.addEventListener(
            'beforetoggle',
            async () => {
              await new Promise<void>(resolve => setTimeout(resolve)); // Wait a cycle to allow the click event to propagate first
              this._component.removeEventListener('click', listener, { capture: true });
            },
            { once: true }
          );
        }

        return result;
      }
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
    if (this._stateLayerElement.disabled || !this._stateLayerElement.isConnected) {
      return;
    }
    this._stateLayerElement?.playAnimation();
  }

  public addDefaultSlotChangeListener(listener: EventListener): void {
    this._defaultSlotElement.addEventListener('slotchange', listener);
  }

  public addNativeSubmitButton(): void {
    if (this._nativeSubmitButton?.isConnected) {
      return;
    }

    this._nativeSubmitButton = document.createElement('button');
    this._nativeSubmitButton.type = 'submit';
    this._nativeSubmitButton.style.display = 'none';
    this._nativeSubmitButton.ariaHidden = 'true';

    const form = this._component.getAttribute('form');
    if (form) {
      this._nativeSubmitButton.setAttribute('form', form);
    }

    // Prevent click events from being handled by the button component to avoid forms being
    // submitted more than once
    this._nativeSubmitButton?.addEventListener('click', this._nativeSubmitButtonClickListener, { capture: true });

    this._component.prepend(this._nativeSubmitButton);
  }

  public setNativeSubmitButtonForm(form: string | null | undefined): void {
    if (!this._nativeSubmitButton) {
      return;
    }

    if (form) {
      this._nativeSubmitButton.setAttribute('form', form);
    } else {
      this._nativeSubmitButton.removeAttribute('form');
    }
  }

  public removeNativeSubmitButton(): void {
    this._nativeSubmitButton?.remove();
    this._nativeSubmitButton?.removeEventListener('click', this._nativeSubmitButtonClickListener, { capture: true });
    this._nativeSubmitButton = undefined;
  }

  private _locatePopoverTargetElement(): HTMLElement | null {
    let popoverElement = this._component.popoverTargetElement ?? null;

    if (!popoverElement) {
      const rootNode = this._component.ownerDocument.getRootNode() as Document | ShadowRoot;
      if (!rootNode) {
        return null;
      }

      const targetId = this._component.getAttribute('popovertarget');
      popoverElement = rootNode.querySelector(`#${targetId}`);
    }

    return popoverElement as HTMLElement | null;
  }
}

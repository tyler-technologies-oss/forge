import { ButtonTheme, BUTTON_CONSTANTS, IButtonComponent } from '../button/index.js';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter.js';
import { ISplitButtonComponent } from './split-button.js';
import { SplitButtonVariant } from './split-button-constants.js';

export interface ISplitButtonAdapter extends IBaseAdapter {
  setVariant(variant: SplitButtonVariant): void;
  setTheme(theme: ButtonTheme): void;
  setDisabled(value: boolean): void;
  setDense(value: boolean): void;
  setPill(value: boolean): void;
  startButtonObserver(): void;
  destroyButtonObserver(): void;
}

export class SplitButtonAdapter extends BaseAdapter<ISplitButtonComponent> implements ISplitButtonAdapter {
  private _buttonChangeObserver: MutationObserver | undefined;

  constructor(component: ISplitButtonComponent) {
    super(component);
  }

  public startButtonObserver(): void {
    // This observer is used to keep the buttons in sync with the split button state when they are added to DOM
    this._buttonChangeObserver = new MutationObserver(mutations => {
      // Find all `<forge-button>` elements that are contained within the added nodes
      const addedButtons = mutations.reduce((buttons, { addedNodes }) => {
        const addedButtonNodes = Array.from(addedNodes)
          .filter(node => node.nodeType === Node.ELEMENT_NODE)
          .map((node: HTMLElement) => {
            if (node.nodeName.toLowerCase() === BUTTON_CONSTANTS.elementName) {
              return node;
            }
            return node.querySelector(BUTTON_CONSTANTS.elementName);
          })
          .filter(node => !!node) as IButtonComponent[];
        return buttons.concat(addedButtonNodes);
      }, [] as IButtonComponent[]);

      if (!addedButtons.length) {
        return;
      }

      addedButtons.forEach(button => {
        button.variant = this._component.variant;
        button.theme = this._component.theme;
        button.disabled = this._component.disabled;
        button.dense = this._component.dense;
      });

      this.setPill(this._component.pill);
    });
    this._buttonChangeObserver.observe(this._component, { childList: true, subtree: true });
  }

  public destroyButtonObserver(): void {
    this._buttonChangeObserver?.disconnect();
    this._buttonChangeObserver = undefined;
  }

  public setVariant(variant: SplitButtonVariant): void {
    const buttons = this._getButtons();
    buttons.forEach(button => (button.variant = variant));
  }

  public setTheme(theme: ButtonTheme): void {
    const buttons = this._getButtons();
    buttons.forEach(button => (button.theme = theme));
  }

  public setDisabled(value: boolean): void {
    const buttons = this._getButtons();
    buttons.forEach(button => (button.disabled = value));
  }

  public setDense(value: boolean): void {
    const buttons = this._getButtons();
    buttons.forEach(button => (button.dense = value));
  }

  public setPill(value: boolean): void {
    const buttons = this._getButtons();

    // First we reset all the middle buttons to not be pill buttons
    if (buttons.length > 2) {
      Array.from(buttons)
        .slice(1, buttons.length - 1)
        .filter(({ pill }) => pill)
        .forEach(button => (button.pill = false));
    }

    // Only the first and last buttons need to be pill shaped
    const firstButton = buttons[0];
    if (firstButton) {
      firstButton.pill = value;
    }

    const lastButton = buttons[buttons.length - 1];
    if (lastButton) {
      lastButton.pill = value;
    }
  }

  private _getButtons(): NodeListOf<IButtonComponent> {
    return this._component.querySelectorAll(BUTTON_CONSTANTS.elementName);
  }
}

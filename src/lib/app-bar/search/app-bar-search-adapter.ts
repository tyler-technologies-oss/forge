import { addClass, getShadowElement, isDefined, removeClass, toggleElementPlaceholder, deepQuerySelectorAll, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IAppBarSearchComponent } from './app-bar-search';
import { APP_BAR_SEARCH_CONSTANTS } from './app-bar-search-constants';

export interface IAppBarSearchAdapter extends IBaseAdapter {
  initialize(): void;
  hasInputElement(): boolean;
  addRootClass(className: string | string[]): void;
  removeRootClass(className: string | string[]): void;
  addSearchInputEventListener(type: string, listener: (evt: Event) => void): void;
  removeSearchInputEventListener(type: string, listener: (evt: Event) => void): void;
  setDisabled(disabled: boolean): void;
  getInputValue(): string;
  setInputValue(value: string): void;
  setInputPlaceholder(value: string): void;
  setGlobalIconVisibility(isVisible: boolean): void;
  setContextVisibility(isVisible: boolean): void;
}

/**
 * Provides facilities for interacting with the internal DOM of `AppBarSearchComponent`.
 */
export class AppBarSearchAdapter extends BaseAdapter<IAppBarSearchComponent> implements IAppBarSearchAdapter {
  private _rootElement: HTMLElement;
  private _inputElement: HTMLInputElement;
  private _globalIconContainer: HTMLElement;
  private _globalIconPlaceholder: Comment;
  private _contextContainerElement: HTMLElement;
  private _contextContainerPlaceholder: Comment;

  constructor(component: IAppBarSearchComponent) {
    super(component);
    this._rootElement = getShadowElement(component, APP_BAR_SEARCH_CONSTANTS.selectors.ROOT);
    this._globalIconContainer = getShadowElement(component, APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER);
    this._contextContainerElement = getShadowElement(component, APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER);
  }

  public initialize(): void {
    const inputElements = deepQuerySelectorAll(this._component, APP_BAR_SEARCH_CONSTANTS.selectors.INPUT, false);
    if (inputElements.length) {
      this._inputElement = inputElements[0] as HTMLInputElement;
    }
  }

  public hasInputElement(): boolean {
    return isDefined(this._inputElement);
  }

  public addRootClass(className: string | string[]): void {
    addClass(className, this._rootElement);
  }

  public removeRootClass(className: string | string[]): void {
    removeClass(className, this._rootElement);
  }

  /**
   * Adds an event to the search input element.
   * @param {string} type The event type.
   * @param {Function} listener The event listener.
   */
  public addSearchInputEventListener(type: string, listener: (evt: Event) => void): void {
    this._inputElement.addEventListener(type, listener);
  }

  /**
   * Removes an event from the search input element.
   * @param {string} type The event type.
   * @param {Function} listener The event listener.
   */
  public removeSearchInputEventListener(type: string, listener: (evt: Event) => void): void {
    this._inputElement.removeEventListener(type, listener);
  }

  /**
   * Toggles the disabled attribute on the search input.
   * @param {boolean} disabled Whether the attribute should be set or not.
   */
  public setDisabled(disabled: boolean): void {
    toggleClass(this._rootElement, disabled, APP_BAR_SEARCH_CONSTANTS.classes.DISABLED);
    toggleAttribute(this._inputElement, disabled, APP_BAR_SEARCH_CONSTANTS.attributes.DISABLED);
  }

  public getInputValue(): string {
    return this._inputElement.value;
  }
  public setInputValue(value: string): void {
    this._inputElement.value = value;
  }

  public setInputPlaceholder(value: string): void {
    this._inputElement.placeholder = value;
  }

  public setGlobalIconVisibility(isVisible: boolean): void {
    this._globalIconPlaceholder = toggleElementPlaceholder(
      this._component,
      isVisible,
      APP_BAR_SEARCH_CONSTANTS.elementName,
      APP_BAR_SEARCH_CONSTANTS.selectors.GLOBAL_ICON_CONTAINER,
      this._globalIconContainer,
      this._globalIconPlaceholder
    );
  }

  public setContextVisibility(isVisible: boolean): void {
    this._contextContainerPlaceholder = toggleElementPlaceholder(
      this._component,
      isVisible,
      APP_BAR_SEARCH_CONSTANTS.elementName,
      APP_BAR_SEARCH_CONSTANTS.selectors.CONTEXT_CONTAINER,
      this._contextContainerElement,
      this._contextContainerPlaceholder
    );
  }
}

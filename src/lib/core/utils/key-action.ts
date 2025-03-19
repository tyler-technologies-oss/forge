import { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';

export type ModifierKey = 'alt' | 'ctrl' | 'meta' | 'shift';
export type SearchFn = (searchString: string, evt: KeyboardEvent) => void;

/**
 * Defines a key combination.
 */
export interface KeyCombination {
  /**
   * The key.
   */
  key: string;

  /**
   * One or more modifier keys that must be pressed in conjunction with the key.
   */
  modifier?: ModifierKey | ModifierKey[];
}

/**
 * Configuration interface for a key action.
 */
export interface IKeyAction {
  /**
   * One or more keys or key combinations that trigger the handler.
   */
  key: string | string[] | KeyCombination | KeyCombination[];

  /**
   * The function to be called when the specified key(s) are pressed.
   * @param event - The keyboard event that triggered the handler.
   * @returns A boolean or void. Returning `true` allows fallthrough to the next key handler.
   */
  handler(event: KeyboardEvent): boolean | void;

  /**
   * Indicates whether the handler should be called repeatedly while the key is held down.
   */
  allowRepeat?: boolean;
}

/**
 * Configuration interface for the key action controller.
 */
export interface IKeyActionControllerConfig {
  /**
   * An optional array of key interaction configurations.
   */
  actions?: IKeyAction[];

  /**
   * An optional search handling function. If not provided, searching is disabled.
   */
  searchHandler?: SearchFn;
}

/**
 * A Lit controller for attaching key down actions to a component host.
 *
 * @example
 * class ExampleComponent extends LitElement {
 *   private _keyActionController = new KeyActionController(this, {
 *     actions: [
 *       {
 *         key: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
 *         handler: this._handleArrowKey.bind(this),
 *         allowRepeat: true
 *       },
 *       { key: 'Enter', handler: this._handleEnterKey.bind(this) },
 *       { key: { key: 'a', modifier: 'shift' }, handler: this._handleAKey.bind(this) }
 *     ],
 *     searchHandler: this.handleSearch.bind(this)
 *   });
 *
 *   private _handleArrowKey(evt: KeyboardEvent): void {
 *     console.log(evt.key);
 *   }
 *
 *   private _handleEnterKey(evt: KeyboardEvent): void {
 *     console.log(evt.key);
 *   }
 *
 *   private _handleAKey(evt: KeyboardEvent): void {
 *     console.log(evt.key);
 *   }
 *
 *   private _handleSearch(searchString: string): void {
 *     console.log(searchString);
 *   }
 */
export class KeyActionController implements ReactiveController {
  private static _searchTimeout = 500;

  public host: ReactiveControllerHost;
  public actions: IKeyAction[];
  public searchHandler?: SearchFn;

  private _searchString = '';
  private _searchTimeout?: number;
  private _keyDownListener: EventListener = (event: KeyboardEvent) => this._handleKeyDown(event);

  constructor(host: ReactiveControllerHost, config?: IKeyActionControllerConfig) {
    this.host = host;
    this.actions = config?.actions ?? [];
    this.searchHandler = config?.searchHandler;
    host.addController(this);
  }

  public hostConnected(): void {
    (this.host as ReactiveElement).addEventListener('keydown', this._keyDownListener);
  }

  public hostDisconnected(): void {
    (this.host as ReactiveElement).removeEventListener('keydown', this._keyDownListener);
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    // Attempt to match the event to each action sequentially.
    for (const action of this.actions) {
      // Check if the event matches any of the action's keys. If not continue to the next action.
      const keys = Array.isArray(action.key) ? action.key : [action.key];
      if (!keys.some(key => this._eventMatchesKey(evt, key))) {
        continue;
      }

      // Exit if the key is repeated and the action does not allow it.
      if (!action.allowRepeat && evt.repeat) {
        return;
      }

      // Prevent default behavior, call the handler function, and return if the handler does not allow fallthrough.
      evt.preventDefault();
      if (!action.handler(evt)) {
        return;
      }
    }

    // If no keys matched or fallthrough was allowed, attempt to handle the event as a search.
    if (this.searchHandler) {
      this._handleSearch(evt);
    }
  }

  private _handleSearch(evt: KeyboardEvent): void {
    // Ignore the event if it includes a modifier key.
    if (evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
      return;
    }
    // Only accept single character keys that are not whitespace.
    if (evt.key.length !== 1 || !evt.key.match(/\S/)) {
      return;
    }
    evt.preventDefault();

    // Clear the previous timeout and start a new one that resets the search string after a delay.
    clearTimeout(this._searchTimeout);
    this._searchTimeout = window.setTimeout(() => (this._searchString = ''), KeyActionController._searchTimeout);

    // Append the pressed key to the search string and run the handler.
    this._searchString += evt.key;
    this.searchHandler?.(this._searchString, evt);
  }

  private _eventMatchesKey(evt: KeyboardEvent, key: string | KeyCombination): boolean {
    const keyName = typeof key === 'string' ? key : key.key;
    if (evt.key !== keyName) {
      return false;
    }

    // If the key is a string it already matches.
    if (typeof key === 'string') {
      return true;
    }

    // Return false if any required modifier keys are not pressed.
    const modifiers = key.modifier ? (Array.isArray(key.modifier) ? key.modifier : [key.modifier]) : [];
    return modifiers.every(modifier => evt[`${modifier}Key`]);
  }
}

import type { IKeyboardShortcutOptions, IKeyboardShortcutRegistration, IKeyboardShortcutEntry } from './keyboard-shortcut-constants.js';
import { WARNING_PREFIX } from './keyboard-shortcut-constants.js';
import { KeyboardShortcutScope } from './keyboard-shortcut-scope.js';
import { parseKeySequences } from './keyboard-shortcut-utils.js';

class KeyboardShortcutRegistry {
  static #instance: KeyboardShortcutRegistry;

  readonly #scopes = new Map<Element, KeyboardShortcutScope>();
  readonly #handled = new WeakSet<KeyboardEvent>();
  readonly #prevented = new WeakSet<KeyboardEvent>();

  private constructor() {}

  public static get instance(): KeyboardShortcutRegistry {
    if (!KeyboardShortcutRegistry.#instance) {
      KeyboardShortcutRegistry.#instance = new KeyboardShortcutRegistry();
    }
    return KeyboardShortcutRegistry.#instance;
  }

  public register(options: IKeyboardShortcutOptions): IKeyboardShortcutRegistration {
    const scopeElement = options.global ? document.documentElement : options.scopeElement;
    if (!scopeElement) {
      throw new Error(`${WARNING_PREFIX} A scopeElement or global option is required.`);
    }

    const sequences = parseKeySequences(options.key, options.useCode ?? false);
    const entry: IKeyboardShortcutEntry = {
      options: { ...options, key: options.key, scopeElement },
      sequences,
      capture: options.capture ?? false,
      useCode: options.useCode ?? false,
      allowWhileTyping: options.allowWhileTyping ?? false,
      allowRepeat: options.allowRepeat ?? false,
      fallthrough: options.fallthrough ?? false,
      preventDefault: options.preventDefault ?? true,
      anchorElement: options.anchorElement ?? null,
      onActivate: options.onActivate,
      ownerElement: options.ownerElement
    };

    let scope = this.#scopes.get(scopeElement);
    if (!scope) {
      scope = new KeyboardShortcutScope(scopeElement, this.#handled, this.#prevented);
      this.#scopes.set(scopeElement, scope);
    }

    this.#checkDuplicates(scope, entry);
    scope.add(entry);

    const registration: IKeyboardShortcutRegistration = {
      options: entry.options,
      scopeElement,
      dispose: () => {
        scope.remove(entry);
        if (scope.size === 0) {
          this.#scopes.delete(scopeElement);
        }
      }
    };

    return registration;
  }

  #checkDuplicates(scope: KeyboardShortcutScope, entry: IKeyboardShortcutEntry): void {
    if (scope.size === 0) {
      return;
    }
    for (const seq of entry.sequences) {
      if (scope.hasSequence(seq)) {
        const binding = seq.chords.map(c => (c.modifier ? `${c.modifier}+${c.key}` : c.key)).join('>');
        const ownerEl = entry.ownerElement ?? scope.element;
        console.warn(`${WARNING_PREFIX} Duplicate key binding "${binding}" registered in the same scope.`, ownerEl);
        return;
      }
    }
  }
}

export function registerKeyboardShortcut(options: IKeyboardShortcutOptions): IKeyboardShortcutRegistration {
  return KeyboardShortcutRegistry.instance.register(options);
}

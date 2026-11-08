/**
 * Generate a unique identifier with an optional prefix.
 * @param prefix - Optional prefix for the ID.
 * @returns A unique identifier string.
 */
export function generateUniqueId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Adds or removes a state from an element's custom state set.
 *
 * @param internals - The element's internals object.
 * @param state - The name of the custom state to toggle.
 * @param value - Whether to add or remove the state.
 */
export function toggleState(internals: ElementInternals, state: string, value: boolean): void {
  if (value) {
    try {
      internals.states.add(state);
    } catch {
      internals.states.add(`--${state}`);
    }
  } else {
    try {
      internals.states.delete(state);
    } catch {
      internals.states.delete(`--${state}`);
    }
  }
}

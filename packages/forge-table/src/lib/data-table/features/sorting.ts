import type { MultiSortKey } from '../types.js';

export function isMultiSortEvent(multiSortKey: MultiSortKey, evt: unknown): boolean {
  const { shiftKey, ctrlKey, metaKey, altKey } = evt as MouseEvent | KeyboardEvent;
  switch (multiSortKey) {
    case 'shift':
      return shiftKey;
    case 'ctrl':
      return ctrlKey;
    case 'meta':
      return metaKey;
    case 'alt':
      return altKey;
    default:
      return false;
  }
}

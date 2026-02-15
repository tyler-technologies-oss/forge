export type CanNavigateCallback = (index: number) => boolean;

export interface IKeyManagerConfig {
  canNavigateCallback?: CanNavigateCallback;
}

export const NAVIGATION_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'End', 'Home'];

export class KeyManager {
  constructor(private _config?: IKeyManagerConfig) {}

  public isNavigationKey({ key, ctrlKey, altKey, shiftKey, metaKey }: KeyboardEvent): boolean {
    if (ctrlKey || altKey || shiftKey || metaKey) {
      return false;
    }
    return NAVIGATION_KEYS.includes(key);
  }

  public navigate(key: string, currentIndex: number, total: number): number {
    const nextIndex = currentIndex + this.calculateNextIndex(key, total);
    if (!this.canNavigateAtIndex(nextIndex)) {
      return this.navigate(key, nextIndex, total);
    }
    return nextIndex;
  }

  public calculateNextIndex(key: string, total: number): number {
    switch (key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        return -1;
      case 'ArrowDown':
      case 'ArrowRight':
        return 1;
      case 'Home':
        return 0;
      case 'End':
        return total - 1;
      default:
        return 0;
    }
  }

  public canNavigateAtIndex(index: number): boolean {
    if (typeof this._config?.canNavigateCallback === 'function') {
      return this._config.canNavigateCallback.call(null, index);
    }
    return true;
  }
}

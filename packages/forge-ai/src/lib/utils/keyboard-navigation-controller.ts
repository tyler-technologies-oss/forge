export interface KeyboardNavigationCallbacks {
  onSelect: (index: number) => void;
  onClose: () => void;
  onNavigate?: () => void;
}

export class KeyboardNavigationController {
  #selectedIndex = -1;

  constructor(private callbacks: KeyboardNavigationCallbacks) {}

  public get selectedIndex(): number {
    return this.#selectedIndex;
  }

  public handleKeyDown(event: KeyboardEvent, itemCount: number): boolean {
    if (itemCount === 0) {
      return false;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.#moveSelection(1, itemCount);
        return true;

      case 'ArrowUp':
        event.preventDefault();
        this.#moveSelection(-1, itemCount);
        return true;

      case 'Home':
        event.preventDefault();
        this.#selectedIndex = 0;
        this.callbacks.onNavigate?.();
        return true;

      case 'End':
        event.preventDefault();
        this.#selectedIndex = itemCount - 1;
        this.callbacks.onNavigate?.();
        return true;

      case 'Enter':
        if (this.#selectedIndex >= 0) {
          event.preventDefault();
          this.callbacks.onSelect(this.#selectedIndex);
          return true;
        }
        return false;

      case 'Escape':
        event.preventDefault();
        this.callbacks.onClose();
        return true;

      default:
        return false;
    }
  }

  public reset(): void {
    this.#selectedIndex = -1;
  }

  #moveSelection(direction: number, itemCount: number): void {
    if (this.#selectedIndex === -1) {
      if (direction > 0) {
        this.#selectedIndex = 0;
      } else {
        this.#selectedIndex = itemCount - 1;
      }
    } else {
      let newIndex = this.#selectedIndex + direction;

      if (newIndex < 0) {
        newIndex = itemCount - 1;
      } else if (newIndex >= itemCount) {
        newIndex = 0;
      }

      this.#selectedIndex = newIndex;
    }

    this.callbacks.onNavigate?.();
  }
}

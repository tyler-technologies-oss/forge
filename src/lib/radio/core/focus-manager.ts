export type FocusManagerMode = 'delegates-focus' | 'roving-tabindex' | 'none';
export type FocusManagerOverflow = 'stop' | 'stop-column' | 'wrap';

export interface IFocusManagerOptions<T = HTMLElement> {
  elements: T[];
  mode: FocusManagerMode;
  columnCount: number;
  overflow: FocusManagerOverflow;
}

export class FocusManager<T = HTMLElement> {
  private _activeElement: T | null = null;
  private _elements: T[] = [];
  private _mode: FocusManagerMode;
  private _columnCount: number;
  private _overflow: FocusManagerOverflow;

  constructor(options?: Partial<IFocusManagerOptions<T>>) {
    this._elements = options?.elements ?? [];
    this._mode = options?.mode ?? 'none';
    this._columnCount = options?.columnCount ?? 1;
    this._overflow = options?.overflow ?? 'stop';
  }

  // Public methods

  public handleKey(key: string): void {
    let increment = 0;
    switch (key) {
      case 'ArrowUp':
        increment = -this._columnCount;
        break;
      case 'ArrowDown':
        increment = this._columnCount;
        break;
      case 'ArrowLeft':
        increment = -1;
        break;
      case 'ArrowRight':
        increment = 1;
        break;
      default:
        return;
    }

    const currentIndex = this._activeElement ? this._elements.indexOf(this._activeElement) : 0;
    let nextIndex = currentIndex + increment;

    if (this._overflow === 'wrap') {
      nextIndex = nextIndex % this._elements.length;
    } else if (this._elements.length >= nextIndex) {
      nextIndex = this._elements.length - 1;
    } else if (0 > nextIndex) {
      nextIndex = 0;
    }

    this._activeElement = this._elements[nextIndex];
  }

  // Public getters/setter

  public get activeElement(): T | null {
    return this._activeElement;
  }
  public set activeElement(value: T | null) {
    this._activeElement = value;
  }

  public set elements(value: T[]) {
    this._elements = value;

    if (this._activeElement && !this._elements.includes(this._activeElement)) {
      this._activeElement = null;
    }
  }

  public get mode(): FocusManagerMode {
    return this._mode;
  }

  public get columnCount(): number {
    return this._columnCount;
  }

  public get overflow(): FocusManagerOverflow {
    return this._overflow;
  }
}

export interface IVirtualScrollerOptions {
  appendOnly?: boolean;
  buffer?: number;
  insetBottom?: string;
  insetTop?: string;
  skipAccessibility?: boolean;
  startIndex?: number;
}
  
export interface IVirtualScrollerChild {
  element: HTMLElement;
  index: number;
}

export type VirtualScrollerChildBuilder<T> = (data: T, index: number) => HTMLElement;

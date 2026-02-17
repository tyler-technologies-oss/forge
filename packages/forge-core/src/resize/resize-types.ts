export type ForgeResizeObserverCallback = (entry: ResizeObserverEntry) => unknown;

export interface IResizeObserverOptions {
  box: 'content-box' | 'border-box' | 'device-pixel-content-box';
}

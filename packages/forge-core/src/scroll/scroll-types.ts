export enum ScrollDirection {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

export enum ScrollEvents {
  Scroll = 'scroll',
  Scrolled = 'scrolled',
  ScrolledStart = 'scrolled-start',
  ScrolledEnd = 'scrolled-end'
}

export declare type ScrollAxis = 'vertical' | 'horizontal';

export interface IScrollInfo {
  direction: ScrollDirection;
  position: number;
}

export interface IScrolledInfo {
  axis: ScrollAxis;
  isScrolled: boolean;
}

export interface IScrollObserverConfiguration {
  axis?: ScrollAxis;
  scrollThreshold?: number;
  paused?: boolean;
  throttle?: boolean;
  throttleTime?: number;
}

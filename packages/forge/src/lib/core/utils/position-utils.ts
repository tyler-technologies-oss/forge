import {
  arrow as arrowMiddleware,
  ArrowOptions,
  computePosition,
  flip as flipMiddleware,
  FlipOptions,
  hide as hideMiddleware,
  HideOptions,
  Middleware,
  MiddlewareData,
  offset as offsetMiddleware,
  OffsetOptions,
  Placement,
  shift as shiftMiddleware,
  ShiftOptions,
  Strategy
} from '@floating-ui/dom';
import { roundByDPR } from './utils.js';

export type PositionPlacement = Placement;
export type PositionStrategy = Strategy;

export interface IPositionElementResult {
  x: number;
  y: number;
  hidden: boolean;
  placement: PositionPlacement;
  arrow?: MiddlewareData['arrow'];
}

export class VirtualElement {
  constructor(
    public x: number,
    public y: number,
    public height = 0,
    public width = 0
  ) {}

  public getBoundingClientRect(): DOMRect {
    return {
      x: this.x,
      y: this.y,
      top: this.y,
      left: this.x,
      bottom: this.y,
      right: this.x,
      width: this.height,
      height: this.width,
      toJSON() {
        return;
      }
    };
  }

  public static fromElement(element: HTMLElement): VirtualElement {
    const rect = element.getBoundingClientRect();
    return new VirtualElement(rect.left, rect.top, rect.height, rect.width);
  }

  public static fromEvent(event: MouseEvent | TouchEvent): VirtualElement {
    if (event instanceof MouseEvent) {
      return new VirtualElement(event.clientX, event.clientY);
    }
    if (event instanceof TouchEvent) {
      return new VirtualElement(event.touches[0].clientX, event.touches[0].clientY);
    }
    throw new Error('Unsupported event type');
  }
}

export interface IPositionElementConfig {
  /** The element to apply position to. */
  element: HTMLElement;
  /** The anchor element to position `element` around. */
  anchorElement: HTMLElement | VirtualElement;
  /** The placement position. */
  placement: PositionPlacement;
  /** Whether the position values should be applied to the `element` or not. Default is `true`. */
  apply?: boolean;
  /** Should the element flip to the opposite placement when not enough room. */
  flip?: boolean;
  /** Options to provide to the flip middleware. */
  flipOptions?: Partial<FlipOptions>;
  /** Should the element stay visible at the same placement when scrolling. */
  shift?: boolean;
  /** Options to provide to the shift middleware. */
  shiftOptions?: Partial<ShiftOptions>;
  /** Should the element hide itself when the anchor element is out of the view. */
  hide?: boolean;
  /** Options to provide to the hide middleware. */
  hideOptions?: Partial<HideOptions>;
  /** Should any offset values be applied to the element. */
  offset?: boolean;
  /** The options provide to the offset middleware. */
  offsetOptions?: Partial<OffsetOptions>;
  /** The element to use as an arrow. */
  arrowElement?: HTMLElement;
  /** Options to provide to the arrow middleware. */
  arrowOptions?: Partial<ArrowOptions>;
  /** The positioning strategy. */
  strategy?: PositionStrategy;
}

/**
 * Calculates an elements position relative to another element.
 * @param {IPositionElementConfig} config Configuration to provide when positioning the element.
 * @returns {IPositionElementResult} The result of the positioning logic.
 */
export async function positionElementAsync({
  element,
  anchorElement,
  placement = 'bottom',
  offset = false,
  offsetOptions,
  strategy = 'fixed',
  apply = true,
  flip = true,
  flipOptions,
  shift = true,
  shiftOptions,
  hide = false,
  hideOptions,
  arrowElement,
  arrowOptions = {}
}: IPositionElementConfig): Promise<IPositionElementResult> {
  const middleware: Middleware[] = [];

  //
  // Order of the following middleware is **important**
  //

  if (offset) {
    middleware.push(offsetMiddleware(offsetOptions));
  }
  if (flip) {
    middleware.push(flipMiddleware(flipOptions));
  }
  if (shift) {
    middleware.push(shiftMiddleware(shiftOptions));
  }
  if (hide) {
    middleware.push(hideMiddleware(hideOptions));
  }
  if (arrowElement) {
    // Must come before the topLayer middleware
    middleware.push(arrowMiddleware({ ...arrowOptions, element: arrowElement }));
  }

  const { x, y, placement: finalPlacement, middlewareData } = await computePosition(anchorElement, element, { strategy, placement, middleware });

  // Should we apply the position information to the element?
  if (apply) {
    const styles: Partial<CSSStyleDeclaration> = {
      left: '0',
      top: '0',
      translate: `${roundByDPR(x)}px ${roundByDPR(y)}px`
    };

    Object.assign(element.style, styles);

    if (middlewareData.hide?.referenceHidden) {
      element.style.visibility = 'hidden';
    } else {
      element.style.removeProperty('visibility');
    }
  }

  return {
    x,
    y,
    hidden: middlewareData.hide?.referenceHidden ?? false,
    placement: finalPlacement,
    arrow: middlewareData.arrow
  };
}

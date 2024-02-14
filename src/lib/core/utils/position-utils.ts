import {
  computePosition,
  flip as flipMiddleware,
  hide as hideMiddleware,
  shift as shiftMiddleware,
  offset as offsetMiddleware,
  arrow as arrowMiddleware,
  FlipOptions,
  ShiftOptions,
  HideOptions,
  Middleware,
  Placement,
  Strategy,
  OffsetOptions,
  MiddlewareData,
  ArrowOptions,
  MiddlewareState
} from '@floating-ui/dom';
import { getContainingBlock, isContainingBlock, getWindow } from '@floating-ui/utils/dom';
import { roundByDPR } from './utils';

export type PositionPlacement = Placement;
export type PositionStrategy = Strategy;

export const DEFAULT_FALLBACK_PLACEMENTS: PositionPlacement[] = ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end'];

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
    public width = 0) {}

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
  /** Should the top-layer middleware be applied or not. */
  topLayer?: boolean;
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
  flipOptions = {
    fallbackPlacements: DEFAULT_FALLBACK_PLACEMENTS,
    fallbackStrategy: 'initialPlacement'
  },
  shift = true,
  shiftOptions,
  hide = false,
  hideOptions,
  arrowElement,
  arrowOptions = {},
  topLayer = false
}: IPositionElementConfig): Promise<IPositionElementResult> {
  const middleware: Middleware[] = [];

  //
  // Order of the following middleware is **important**
  //

  if (offset) {
    middleware.push(offsetMiddleware(offsetOptions));
  }
  if (shift) {
    middleware.push(shiftMiddleware(shiftOptions));
  }
  if (flip) {
    middleware.push(flipMiddleware(flipOptions));
  }
  if (hide) {
    middleware.push(hideMiddleware(hideOptions));
  }
  if (arrowElement) { // Must come before the topLayer middleware
    middleware.push(arrowMiddleware({ ...arrowOptions, element: arrowElement }));
  }
  if (topLayer) {
    middleware.push(topLayerMiddleware());
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

    // We use `display` here to ensure that any child overlays are also hidden
    if (middlewareData.hide?.referenceHidden) {
      element.style.display = 'none';
    } else {
      element.style.removeProperty('display');
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

/**
 * Custom middleware to handle positioning when the element is on the top layer AND within a containing block.
 */
export const topLayerMiddleware = (): Middleware => ({
  name: 'topLayer',
  async fn({ x, y, elements: { reference, floating }}: MiddlewareState) {
      let onTopLayer = false;
      let topLayerIsFloating = false;
      let withinReference = false;
      const diffCoords = { x: 0, y: 0 };

      try {
        onTopLayer = onTopLayer || floating.matches(':popover-open');
      } catch {}
      try {
        onTopLayer = onTopLayer || floating.matches(':open');
      } catch {}
      try {
        onTopLayer = onTopLayer || floating.matches(':modal');
      } catch {}
      
      topLayerIsFloating = onTopLayer;

      const dialogAncestorQueryEvent = new Event('floating-ui-dialog-test', { composed: true, bubbles: true });
      floating.addEventListener('floating-ui-dialog-test', (event: Event) => {
        (event.composedPath() as Element[]).forEach((el) => {
          withinReference = withinReference || el === reference;
          if (el === floating || el.localName !== 'dialog') {
            return;
          }
          try {
            onTopLayer = onTopLayer || el.matches(':modal');
          } catch {}
        });
      }, { once: true });
      floating.dispatchEvent(dialogAncestorQueryEvent);

      let overTransforms = false;
      if (!(reference instanceof VirtualElement)) {
        const root = (withinReference ? reference : floating) as Element;
        const containingBlock = isContainingBlock(root) ? root : getContainingBlock(root);
        let css: CSSStyleDeclaration | Record<string, string> = {};
        if (containingBlock !== null && getWindow(containingBlock) !== (containingBlock as unknown as Window)) {
          css = getComputedStyle(containingBlock);
          // The overlay is "over transforms" when the containing block uses specific CSS...
          overTransforms =
            css.transform !== 'none' ||
            css.translate !== 'none' ||
            (css.containerType ? css.containerType !== 'normal' : false) ||
            (css.backdropFilter ? css.backdropFilter !== 'none' : false) ||
            (css.filter ? css.filter !== 'none' : false) ||
            css.willChange.search('transform') > -1 ||
            css.willChange.search('translate') > -1 ||
            ['paint', 'layout', 'strict', 'content'].some((value) => (css.contain || '').includes(value));
        }

        if (onTopLayer && overTransforms && containingBlock) {
          const rect = containingBlock.getBoundingClientRect();
          // Margins and borders are not included in the bounding client rect and need to be handled separately
          const { marginInlineStart = '0', marginBlockStart = '0', borderInlineWidth = '0', borderBlockWidth = '0' } = css;
          const inlineBoxAdjust = parseFloat(marginInlineStart) + parseFloat(borderInlineWidth);
          const blockBoxAdjust = parseFloat(marginBlockStart) + parseFloat(borderBlockWidth);

          diffCoords.x = rect.x + inlineBoxAdjust - containingBlock.scrollLeft;
          diffCoords.y = rect.y + blockBoxAdjust - containingBlock.scrollTop;
        }
      }

      if (onTopLayer && topLayerIsFloating) {
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }

      if (onTopLayer) {
        return {
          x,
          y,
          data: diffCoords
        };
      }

      return {
        x: x - diffCoords.x,
        y: y - diffCoords.y,
        data: diffCoords
      };
  }
});

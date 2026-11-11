import { AUTO_SCROLL_EDGE_SIZE, AUTO_SCROLL_MAX_SPEED } from '../constants.js';

/**
 * The parts of the scroll element's visible area that are covered by sticky content (pinned columns, fixed headers) and so cannot be
 * the target of a drag.
 */
export interface AutoScrollInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface CellSelectionAutoScrollerOptions {
  getScrollElement: () => HTMLElement | undefined;
  getInsets: () => AutoScrollInsets;
  /**
   * Called with a viewport point inside the scrollable area of the scroll element while the pointer is outside it or the element scrolled,
   * which are the times the browser does not dispatch `mouseenter` for the cell under the pointer.
   */
  onPoint: (x: number, y: number, evt: MouseEvent) => void;
}

function getScrollDelta(position: number, start: number, end: number): number {
  const startDepth = AUTO_SCROLL_EDGE_SIZE - (position - start);
  if (startDepth > 0) {
    return -Math.min(startDepth / AUTO_SCROLL_EDGE_SIZE, 1) * AUTO_SCROLL_MAX_SPEED;
  }
  const endDepth = AUTO_SCROLL_EDGE_SIZE - (end - position);
  if (endDepth > 0) {
    return Math.min(endDepth / AUTO_SCROLL_EDGE_SIZE, 1) * AUTO_SCROLL_MAX_SPEED;
  }
  return 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

/**
 * Scrolls an element while a cell selection drag is held near or beyond one of its edges, and keeps extending the selection to the cell
 * that scrolls under the pointer.
 *
 * A drag ends on `mouseup`, or when a `mousemove` reports that no button is pressed (the button was released outside the window).
 */
export class CellSelectionAutoScroller {
  readonly #options: CellSelectionAutoScrollerOptions;
  #document: Document | null = null;
  #pointer: MouseEvent | null = null;
  #frame = 0;

  constructor(options: CellSelectionAutoScrollerOptions) {
    this.#options = options;
  }

  public start(evt: MouseEvent, contextDocument: Document = document): void {
    this.stop();
    this.#document = contextDocument;
    this.#pointer = evt;
    contextDocument.addEventListener('mousemove', this.#onMouseMove);
    contextDocument.addEventListener('mouseup', this.#onMouseUp);
    this.#frame = requestAnimationFrame(this.#tick);
  }

  public stop(): void {
    cancelAnimationFrame(this.#frame);
    this.#document?.removeEventListener('mousemove', this.#onMouseMove);
    this.#document?.removeEventListener('mouseup', this.#onMouseUp);
    this.#document = null;
    this.#pointer = null;
  }

  #onMouseMove = (evt: MouseEvent): void => {
    if (evt.buttons === 0) {
      this.stop();
      return;
    }
    this.#pointer = evt;
  };

  #onMouseUp = (): void => this.stop();

  #tick = (): void => {
    const element = this.#options.getScrollElement();
    const pointer = this.#pointer;
    if (element && pointer) {
      this.#scroll(element, pointer);
    }
    if (this.#document) {
      this.#frame = requestAnimationFrame(this.#tick);
    }
  };

  #scroll(element: HTMLElement, pointer: MouseEvent): void {
    const { clientX: x, clientY: y } = pointer;
    const bounds = element.getBoundingClientRect();
    const left = bounds.left + element.clientLeft;
    const top = bounds.top + element.clientTop;
    const right = left + element.clientWidth;
    const bottom = top + element.clientHeight;

    const scrollLeft = element.scrollLeft;
    const scrollTop = element.scrollTop;
    element.scrollBy({ left: getScrollDelta(x, left, right), top: getScrollDelta(y, top, bottom), behavior: 'instant' });
    const scrolled = element.scrollLeft !== scrollLeft || element.scrollTop !== scrollTop;
    const outside = x < left || x > right || y < top || y > bottom;
    if (!scrolled && !outside) {
      return;
    }

    const insets = this.#options.getInsets();
    this.#options.onPoint(clamp(x, left + insets.left + 1, right - insets.right - 1), clamp(y, top + insets.top + 1, bottom - insets.bottom - 1), pointer);
  }
}

import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Ref } from 'lit/directives/ref.js';

const RESIZE_SCREEN_BUFFER = 100;

export type ResizeGrowDirection = 'left' | 'right';

export interface ResizeControllerOptions {
  targetElementRef: Ref<HTMLElement>;
  resizeHandleRef: Ref<HTMLElement>;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  keyboardStep?: number;
  /** Screen direction the handle moves to make the width larger. Defaults to `'left'`, for a panel docked to the right. */
  growDirection?: () => ResizeGrowDirection;
  /** Widest the target may be given its container. Defaults to the window width minus a small buffer. */
  getAvailableWidth?: () => number;
  onResize?: (width: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  onCommit?: (width: number) => void;
}

export class ResizeController implements ReactiveController {
  #host: ReactiveControllerHost;
  #options: Required<ResizeControllerOptions>;

  #isResizing = false;
  #currentWidth = 0;
  #dragStartX = 0;
  #dragStartWidth = 0;

  #resizeAbortController?: AbortController;

  constructor(host: ReactiveControllerHost, options: ResizeControllerOptions) {
    this.#host = host;
    this.#options = {
      minWidth: 360,
      maxWidth: 800,
      defaultWidth: 420,
      keyboardStep: 20,
      growDirection: () => 'left',
      getAvailableWidth: () => window.innerWidth - RESIZE_SCREEN_BUFFER,
      onResize: () => {},
      onResizeStart: () => {},
      onResizeEnd: () => {},
      onCommit: () => {},
      ...options
    };
    this.#currentWidth = this.#options.defaultWidth;
    host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {
    this.#cleanup();
  }

  public get isResizing(): boolean {
    return this.#isResizing;
  }

  public get currentWidth(): number {
    return this.#currentWidth;
  }

  public setWidth(width: number): void {
    this.#currentWidth = this.#constrainWidth(width);
    this.#applyWidth();
  }

  public resetWidth(): void {
    this.setWidth(this.#options.defaultWidth);
  }

  public handlePointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    const resizeHandle = this.#options.resizeHandleRef.value;
    if (!resizeHandle) {
      return;
    }

    resizeHandle.setPointerCapture(event.pointerId);

    this.#dragStartX = event.clientX;
    this.#dragStartWidth = this.#currentWidth;
    this.#isResizing = true;
    this.#host.requestUpdate();
    this.#options.onResizeStart();

    this.#addResizeListeners();
  };

  public handleKeyDown = (event: KeyboardEvent): void => {
    const step = this.#options.keyboardStep;
    const growSign = this.#options.growDirection() === 'left' ? 1 : -1;
    let delta = 0;

    switch (event.key) {
      case 'ArrowLeft':
        delta = step * growSign;
        break;
      case 'ArrowRight':
        delta = -step * growSign;
        break;
      default:
        return;
    }

    event.preventDefault();

    const previousWidth = this.#currentWidth;
    this.#currentWidth = this.#constrainWidth(previousWidth + delta);
    this.#applyWidth();
    this.#commitIfChanged(previousWidth);
  };

  #handlePointerMove = (event: PointerEvent): void => {
    if (!this.#isResizing) {
      return;
    }

    event.preventDefault();

    const deltaX = this.#options.growDirection() === 'left' ? this.#dragStartX - event.clientX : event.clientX - this.#dragStartX;
    const newWidth = this.#dragStartWidth + deltaX;
    this.#currentWidth = this.#constrainWidth(newWidth);
    this.#applyWidth();
  };

  #handlePointerUp = (event: PointerEvent): void => {
    if (!this.#isResizing) {
      return;
    }

    event.preventDefault();

    const resizeHandle = this.#options.resizeHandleRef.value;
    if (resizeHandle) {
      resizeHandle.releasePointerCapture(event.pointerId);
    }

    this.#isResizing = false;
    this.#host.requestUpdate();
    this.#options.onResizeEnd();
    this.#commitIfChanged(this.#dragStartWidth);

    this.#removeResizeListeners();
  };

  #commitIfChanged(previousWidth: number): void {
    if (this.#currentWidth !== previousWidth) {
      this.#options.onCommit(this.#currentWidth);
    }
  }

  #constrainWidth(width: number): number {
    const effectiveMaxWidth = Math.min(this.#options.maxWidth, this.#options.getAvailableWidth());
    return Math.max(this.#options.minWidth, Math.min(width, effectiveMaxWidth));
  }

  #applyWidth(): void {
    this.#options.onResize(this.#currentWidth);
    this.#host.requestUpdate();
  }

  #addResizeListeners(): void {
    if (!this.#resizeAbortController) {
      this.#resizeAbortController = new AbortController();
      document.addEventListener('pointermove', this.#handlePointerMove, {
        signal: this.#resizeAbortController.signal
      });
      document.addEventListener('pointerup', this.#handlePointerUp, {
        signal: this.#resizeAbortController.signal
      });
    }
  }

  #removeResizeListeners(): void {
    if (this.#resizeAbortController) {
      this.#resizeAbortController.abort();
      this.#resizeAbortController = undefined;
    }
  }

  #cleanup(): void {
    this.#removeResizeListeners();
    this.#isResizing = false;
  }
}

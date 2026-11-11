import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Ref } from 'lit/directives/ref.js';

export interface DragControllerOptions {
  /** The element to make draggable */
  targetElementRef: Ref<HTMLElement>;
  /** The drag handle element reference */
  dragHandleRef: Ref<HTMLElement>;
  /** Whether to snap back to viewport bounds on release (default: true) */
  snapToViewport?: boolean;
  /** Whether keyboard navigation should be constrained to viewport (default: true) */
  constrainKeyboardNavigation?: boolean;
  /** Step size for keyboard navigation in pixels (default: 10) */
  keyboardStep?: number;
  /** Animation duration for snap-back in milliseconds (default: 200) */
  snapAnimationDuration?: number;
  /** Whether the element can be dragged outside viewport boundaries during drag (default: true) */
  allowOutOfBounds?: boolean;
}

export class DragController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _options: Required<DragControllerOptions>;

  // Drag state
  private _isDragging = false;
  private _currentTransformX = 0;
  private _currentTransformY = 0;
  private _dragOffsetX = 0;
  private _dragOffsetY = 0;

  // Event management
  private _dragAbortController?: AbortController;

  constructor(host: ReactiveControllerHost, options: DragControllerOptions) {
    this._host = host;
    this._options = {
      snapToViewport: true,
      constrainKeyboardNavigation: true,
      keyboardStep: 10,
      snapAnimationDuration: 200,
      allowOutOfBounds: true,
      ...options
    };
    host.addController(this);
  }

  public hostConnected(): void {
    // Setup happens when drag is initiated
  }

  public hostDisconnected(): void {
    this.cleanup();
  }

  /**
   * Gets whether the element is currently being dragged
   */
  public get isDragging(): boolean {
    return this._isDragging;
  }

  /**
   * Gets the current transform values
   */
  public get currentTransform(): { x: number; y: number } {
    return { x: this._currentTransformX, y: this._currentTransformY };
  }

  /**
   * Resets the drag position to original location
   */
  public resetPosition(): void {
    const targetElement = this._options.targetElementRef.value;
    if (targetElement) {
      targetElement.style.transform = '';
      targetElement.style.transition = '';
      this._currentTransformX = 0;
      this._currentTransformY = 0;
      this._dragOffsetX = 0;
      this._dragOffsetY = 0;
    }
  }

  /**
   * Cleanup method for removing event listeners and resetting state
   */
  public cleanup(): void {
    this._removeDragListeners();
    this._isDragging = false;
  }

  /**
   * Handle pointer down event to start dragging
   */
  public handlePointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    const targetElement = this._options.targetElementRef.value;
    const dragHandle = this._options.dragHandleRef.value;

    if (!targetElement || !dragHandle) {
      return;
    }

    // Capture pointer for proper cross-device drag behavior
    dragHandle.setPointerCapture(event.pointerId);

    // Get current transform values
    this._getCurrentTransform(targetElement);

    // Calculate offset from mouse to target's top-left corner
    const targetRect = targetElement.getBoundingClientRect();
    this._dragOffsetX = event.clientX - targetRect.left;
    this._dragOffsetY = event.clientY - targetRect.top;

    // Set dragging state
    this._isDragging = true;
    this._host.requestUpdate();

    // Add global event listeners
    this._addDragListeners();
  };

  /**
   * Handle keyboard navigation for drag handle
   */
  public handleKeyDown = (event: KeyboardEvent): void => {
    const step = this._options.keyboardStep;
    let deltaX = 0;
    let deltaY = 0;

    switch (event.key) {
      case 'ArrowUp':
        deltaY = -step;
        break;
      case 'ArrowDown':
        deltaY = step;
        break;
      case 'ArrowLeft':
        deltaX = -step;
        break;
      case 'ArrowRight':
        deltaX = step;
        break;
      default:
        return; // Don't handle other keys
    }

    event.preventDefault();

    const targetElement = this._options.targetElementRef.value;
    if (!targetElement) {
      return;
    }

    // Get current transform values
    this._getCurrentTransform(targetElement);

    // Calculate new position
    const newX = this._currentTransformX + deltaX;
    const newY = this._currentTransformY + deltaY;

    if (this._options.constrainKeyboardNavigation) {
      // Constrain keyboard navigation to viewport bounds
      const constrainedPosition = this._constrainToViewport(targetElement, newX, newY);
      this._currentTransformX = constrainedPosition.x;
      this._currentTransformY = constrainedPosition.y;
    } else {
      // Allow keyboard navigation outside viewport
      this._currentTransformX = newX;
      this._currentTransformY = newY;
    }

    // Apply position via CSS transform
    targetElement.style.transform = `translate(${this._currentTransformX}px, ${this._currentTransformY}px)`;
  };

  private _handlePointerMove = (event: PointerEvent): void => {
    if (!this._isDragging) {
      return;
    }

    event.preventDefault();

    const targetElement = this._options.targetElementRef.value;
    if (!targetElement) {
      return;
    }

    // Calculate desired position based on mouse position and offset
    const desiredX = event.clientX - this._dragOffsetX;
    const desiredY = event.clientY - this._dragOffsetY;

    // Get target's original position (where it would be without any transform)
    const { originalX, originalY } = this._getOriginalPosition(targetElement);

    // Calculate transform needed to get to desired position
    const newTransformX = desiredX - originalX;
    const newTransformY = desiredY - originalY;

    // Update current transform values (allow going outside viewport during drag if enabled)
    this._currentTransformX = newTransformX;
    this._currentTransformY = newTransformY;

    // Apply position via CSS transform
    targetElement.style.transform = `translate(${newTransformX}px, ${newTransformY}px)`;
  };

  private _handlePointerUp = (event: PointerEvent): void => {
    if (!this._isDragging) {
      return;
    }

    event.preventDefault();

    const dragHandle = this._options.dragHandleRef.value;
    if (dragHandle) {
      dragHandle.releasePointerCapture(event.pointerId);
    }

    // Snap back to nearest valid position if outside viewport and enabled
    if (this._options.snapToViewport) {
      this._snapToViewport();
    }

    // Reset dragging state
    this._isDragging = false;
    this._host.requestUpdate();

    // Remove global event listeners
    this._removeDragListeners();
  };

  private _snapToViewport(): void {
    const targetElement = this._options.targetElementRef.value;
    if (!targetElement) {
      return;
    }

    const constrainedPosition = this._constrainToViewport(targetElement, this._currentTransformX, this._currentTransformY);

    // Only snap if position actually changed
    if (constrainedPosition.x !== this._currentTransformX || constrainedPosition.y !== this._currentTransformY) {
      this._currentTransformX = constrainedPosition.x;
      this._currentTransformY = constrainedPosition.y;

      // Add smooth transition for snap-back
      targetElement.style.transition = `transform ${this._options.snapAnimationDuration}ms cubic-bezier(0.2, 0, 0, 1)`;
      targetElement.style.transform = `translate(${constrainedPosition.x}px, ${constrainedPosition.y}px)`;

      // Remove transition after animation completes
      setTimeout(() => {
        if (targetElement) {
          targetElement.style.transition = '';
        }
      }, this._options.snapAnimationDuration);
    }
  }

  private _constrainToViewport(targetElement: HTMLElement, transformX: number, transformY: number): { x: number; y: number } {
    // Get target dimensions and original position
    const targetWidth = targetElement.offsetWidth;
    const targetHeight = targetElement.offsetHeight;
    const { originalX, originalY } = this._getOriginalPosition(targetElement);

    // Calculate viewport bounds
    const maxTransformX = window.innerWidth - targetWidth - originalX;
    const minTransformX = -originalX;
    const maxTransformY = window.innerHeight - targetHeight - originalY;
    const minTransformY = -originalY;

    // Constrain to bounds
    const constrainedX = Math.max(minTransformX, Math.min(transformX, maxTransformX));
    const constrainedY = Math.max(minTransformY, Math.min(transformY, maxTransformY));

    return { x: constrainedX, y: constrainedY };
  }

  private _getOriginalPosition(targetElement: HTMLElement): { originalX: number; originalY: number } {
    const targetWidth = targetElement.offsetWidth;
    const targetHeight = targetElement.offsetHeight;
    const computedStyle = window.getComputedStyle(targetElement);

    const originalX = parseFloat(computedStyle.right) ? window.innerWidth - parseFloat(computedStyle.right) - targetWidth : parseFloat(computedStyle.left) || 0;
    const originalY = parseFloat(computedStyle.bottom)
      ? window.innerHeight - parseFloat(computedStyle.bottom) - targetHeight
      : parseFloat(computedStyle.top) || 0;

    return { originalX, originalY };
  }

  private _getCurrentTransform(targetElement: HTMLElement): void {
    const currentTransform = targetElement.style.transform;
    this._currentTransformX = 0;
    this._currentTransformY = 0;

    if (currentTransform) {
      const match = currentTransform.match(/translate\((-?\d+(?:\.\d+)?)px,\s*(-?\d+(?:\.\d+)?)px\)/);
      if (match) {
        this._currentTransformX = parseFloat(match[1]);
        this._currentTransformY = parseFloat(match[2]);
      }
    }
  }

  private _addDragListeners(): void {
    if (!this._dragAbortController) {
      this._dragAbortController = new AbortController();
      document.addEventListener('pointermove', this._handlePointerMove, {
        signal: this._dragAbortController.signal
      });
      document.addEventListener('pointerup', this._handlePointerUp, {
        signal: this._dragAbortController.signal
      });
    }
  }

  private _removeDragListeners(): void {
    if (this._dragAbortController) {
      this._dragAbortController.abort();
      this._dragAbortController = undefined;
    }
  }
}

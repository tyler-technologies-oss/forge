import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { locateTargetHeuristic, createUserInteractionListener } from '../core/utils/utils';
import { IStateLayerComponent } from './state-layer';
import { ANIMATION_FILL, EASING, MINIMUM_PRESS_MS, PRESS_GROW_MS, PRESS_PSEUDO, StateLayerCoords, STATE_LAYER_CONSTANTS } from './state-layer-constants';
import { calcRippleSize, getTranslationCoordinates, isInBounds } from './state-layer-utils';

export interface IStateLayerAdapter extends IBaseAdapter {
  destroy(): void;
  deferInitialization(listener: (evt?: PointerEvent) => void): void;
  getTargetElement(): HTMLElement | null;
  setTargetElement(el: HTMLElement | null): void;
  trySetTarget(value?: string | null): void;
  addTargetListener(type: string, listener: EventListener): void;
  removeTargetListener(type: string, listener: EventListener): void;
  setHovered(hovered: boolean): void;
  setPressed(pressed: boolean): void;
  startAnimation(coords?: StateLayerCoords): void;
  endAnimation(): Promise<void>;
  inBounds(x: number, y: number): boolean;
}

export class StateLayerAdapter extends BaseAdapter<IStateLayerComponent> implements IStateLayerAdapter {
  private readonly _surfaceElement: HTMLElement;
  private _targetElement: HTMLElement | null = null;
  private _rippleAnimation: Animation | undefined;
  private _destroyDeferListener: (() => void) | undefined;

  constructor(component: IStateLayerComponent) {
    super(component);
    this._surfaceElement = getShadowElement(component, STATE_LAYER_CONSTANTS.selectors.SURFACE);
  }

  public destroy(): void {
    if (typeof this._destroyDeferListener === 'function') {
      this._destroyDeferListener();
      this._destroyDeferListener = undefined;
    }
    this._targetElement = null;
  }

  public async deferInitialization(listener: (evt?: PointerEvent) => void): Promise<void> {
    if (!this._targetElement) {
      return;
    }
    const { userInteraction, destroy } = createUserInteractionListener(this._targetElement);
    this._destroyDeferListener = destroy;
    const evt = await userInteraction;
    listener(evt.type === 'pointerenter' ? evt as PointerEvent : undefined);
  }

  public addTargetListener(type: string, listener: EventListener): void {
    this._targetElement?.addEventListener(type, listener);
  }

  public removeTargetListener(type: string, listener: EventListener): void {
    this._targetElement?.removeEventListener(type, listener);
  }

  public setHovered(hovered: boolean): void {
    this._surfaceElement.classList.toggle(STATE_LAYER_CONSTANTS.classes.HOVERED, hovered);
  }
  
  public setPressed(pressed: boolean): void {
    this._surfaceElement.classList.toggle(STATE_LAYER_CONSTANTS.classes.PRESSED, pressed);
  }

  public getTargetElement(): HTMLElement | null {
    return this._targetElement;
  }

  public setTargetElement(el: HTMLElement | null): void {
    this._targetElement = el;
  }

  public trySetTarget(value?: string | null): void {
    this._targetElement = locateTargetHeuristic(this._component, value);
  }

  public startAnimation(coords?: StateLayerCoords): void {
    if (!this._surfaceElement) {
      return;
    }

    this.setPressed(true);
    this._rippleAnimation?.cancel();

    const { rippleSize, rippleScale, initialSize } = calcRippleSize(this._component);
    
    if (rippleScale === 'Infinity') {
      return;
    }

    const { startPoint, endPoint } = getTranslationCoordinates(this._component, initialSize, coords);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

    this._rippleAnimation = this._surfaceElement.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [rippleSize, rippleSize],
        width: [rippleSize, rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${rippleScale})`
        ]
      },
      {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING,
        fill: ANIMATION_FILL
      });
  }

  public async endAnimation(): Promise<void> {
    const animation = this._rippleAnimation;
    const pressAnimationPlayState = animation?.currentTime as number ?? Infinity;

    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      this.setPressed(false);
      return;
    }

    await new Promise(resolve => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });

    if (this._rippleAnimation !== animation) {
      return;
    }

    this.setPressed(false);
  }

  public inBounds(x: number, y: number): boolean {
    return isInBounds(this._component, x, y);
  }
}

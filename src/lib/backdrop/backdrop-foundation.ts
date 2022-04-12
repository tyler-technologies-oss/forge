import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBackdropAdapter } from './backdrop-adapter';
import { BackdropAppearance, BACKDROP_CONSTANTS } from './backdrop-constants';


export interface IBackdropFoundation extends ICustomElementFoundation {
  fadeOut(): Promise<void>;
  fadeIn(): Promise<void>;
  appearance: BackdropAppearance;
}

export class BackdropFoundation implements IBackdropFoundation {
  private _delay: number = BACKDROP_CONSTANTS.numbers.DELAY;
  private _maxOpacity: number = BACKDROP_CONSTANTS.numbers.OPACITY;
  private _appearance: BackdropAppearance;

  constructor(private _adapter: IBackdropAdapter) {
    this._adapter.addBackdropEventListener('click', this._onClick.bind(this));
  }

  public initialize(): void {
    this._adapter.setBackdropOpacity(0);
    this._applyAppearance();
    this._adapter.setHostAttribute(BACKDROP_CONSTANTS.attributes.DELAY, this._delay.toString());
    this.fadeIn();
  }

  /**
   * Starts the fade-out animation to animate the backdrop to 0% opacity.
   */
  public fadeOut(): Promise<void> {
    return new Promise<void>(resolve => {
      this._adapter.setBackdropOpacity(0);
      setTimeout(() => resolve(), BACKDROP_CONSTANTS.numbers.TRANSITION_DURATION);
    });
  }

  /**
   * Starts the fade-in animation to animate the backdrop to max opacity.
   */
  public fadeIn(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        this._adapter.setBackdropOpacity(this._maxOpacity);
        setTimeout(() => resolve(), BACKDROP_CONSTANTS.numbers.TRANSITION_DURATION);
      }, this.delay);
    });
  }

  private _onClick(evt: Event): void {
    evt.stopPropagation();
    this._adapter.emitHostEvent(BACKDROP_CONSTANTS.events.BACKDROP_CLICK, undefined, true, true);
  }

  public disconnect(): void {
    this._adapter.removeBackdropEventListener('click', this._onClick);
  }

  private _applyAppearance(): void {
    if (this._appearance) {
      this._adapter.setHostAttribute(BACKDROP_CONSTANTS.attributes.APPEARANCE, String(this._appearance));
    } else {
      this._adapter.removeHostAttribute(BACKDROP_CONSTANTS.attributes.APPEARANCE);
    }
  }

  public set delay(value: number) {
    if (this._delay !== value) {
      this._delay = value;
      this._adapter.setHostAttribute(BACKDROP_CONSTANTS.attributes.DELAY, this._delay.toString());
    }
  }
  public get delay(): number {
    return this._delay;
  }

  public set maxOpacity(value: number) {
    if (this._maxOpacity !== value) {
      this._maxOpacity = value;
      this._adapter.setHostAttribute(BACKDROP_CONSTANTS.attributes.MAX_OPACITY, this._maxOpacity.toString());
    }
  }
  public get maxOpacity(): number {
    return this._maxOpacity;
  }

  public get appearance(): BackdropAppearance {
    return this._appearance;
  }
  public set appearance(value: BackdropAppearance) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._applyAppearance();
    }
  }
}

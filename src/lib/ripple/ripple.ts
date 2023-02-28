import { coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ForgeRipple } from './forge-ripple';
import { RippleAdapter } from './ripple-adapter';
import { RIPPLE_CONSTANTS } from './ripple-constants';
import { RippleFoundation } from './ripple-foundation';

export interface IRippleComponent extends IBaseComponent {
  target: string;
  unbounded: boolean;
  getRippleInstance(): ForgeRipple | undefined;
  handleFocus(): void;
  layout(): void;
  activate(): void;
  deactivate(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-ripple': IRippleComponent;
  }
}

/**
 * The web component class behind the `<forge-ripple>` custom element.
 * 
 * @tag forge-ripple
 */
@CustomElement({
  name: RIPPLE_CONSTANTS.elementName
})
export class RippleComponent extends BaseComponent implements IRippleComponent {
  public static get observedAttributes(): string[] {
    return [
      RIPPLE_CONSTANTS.attributes.TARGET,
      RIPPLE_CONSTANTS.attributes.UNBOUNDED
    ];
  }

  private _foundation: RippleFoundation;

  constructor() {
    super();
    this._foundation = new RippleFoundation(new RippleAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case RIPPLE_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case RIPPLE_CONSTANTS.attributes.UNBOUNDED:
        this.unbounded = coerceBoolean(newValue);
        break;
    }
  }

  public layout(): void {
    this._foundation.layout();
  }

  public activate(): void {
    return this._foundation.activate();
  }

  public deactivate(): void {
    return this._foundation.deactivate();
  }

  public getRippleInstance(): ForgeRipple | undefined {
    return this._foundation.getRippleInstance();
  }

  public handleFocus(): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.getRippleInstance()?.['foundation'].handleFocus();
  }

  @FoundationProperty()
  public declare target: string;

  @FoundationProperty()
  public declare unbounded: boolean;
}

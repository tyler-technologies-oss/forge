import { MDCRipple, type MDCRippleAdapter, MDCRippleFoundation, type MDCRippleCapableSurface } from '@material/ripple';

export class ForgeRipple extends MDCRipple {
  public handleFocus(): void {
    this.foundation.handleFocus();
  }
}
export class ForgeRippleFoundation extends MDCRippleFoundation {}
export {
  MDCRippleAdapter as ForgeRippleAdapter,
  MDCRippleCapableSurface as ForgeRippleCapableSurface
};

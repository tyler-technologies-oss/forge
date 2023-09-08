import { MDCRipple, type MDCRippleAdapter, MDCRippleFoundation, type MDCRippleCapableSurface } from '@material/ripple';

export class ForgeRipple extends MDCRipple {
  /** Manually trigger focus activation. */
  public handleFocus(): void {
    this.foundation.handleFocus();
  }

  /** Manually trigger focus deactivation. */
  public handleBlur(): void {
    this.foundation.handleBlur();
  }

  /** Executes the ripple animation. */
  public animate(): void {
    (this.foundation as any).animateActivation(); // MDC does not expose this method, using `any` to access it.
  }
}
export class ForgeRippleFoundation extends MDCRippleFoundation {}
export {
  MDCRippleAdapter as ForgeRippleAdapter,
  MDCRippleCapableSurface as ForgeRippleCapableSurface
};

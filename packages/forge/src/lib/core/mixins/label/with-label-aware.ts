import { AbstractConstructor, DEFERRED_LABEL_TARGET, MixinBase, forgeLabelRef, updateTarget } from '../../../constants.js';
import { IBaseComponent } from '../../base/base-component.js';

/**
 * An element that can be associated with a Forge label component.
 */
export interface IWithLabelAwareness extends IBaseComponent {
  /**
   * A callback for when the associated label's text content changes.
   *
   * @param value The new text content of the label, or null if the label was removed or has no
   * text content.
   */
  labelChangedCallback(value: string | null): void;

  /**
   * A callback for when the associated label is clicked.
   */
  labelClickedCallback?(): void;

  [forgeLabelRef]?: { [updateTarget](target: HTMLElement): boolean };
}

export declare abstract class WithLabelAwarenessContract {
  public connectedCallback(): void;

  public abstract labelChangedCallback(value: string | null): void;
}

/**
 * Mixes in Forge label awareness into a base component.
 *
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithLabelAwareness<TBase extends MixinBase>(base: TBase) {
  abstract class LabelAwareComponent extends base implements WithLabelAwarenessContract {
    public override connectedCallback(): void {
      super.connectedCallback?.();
      if (this.hasAttribute(DEFERRED_LABEL_TARGET) && this[forgeLabelRef]) {
        this[forgeLabelRef][updateTarget](this);
      }
      this.removeAttribute(DEFERRED_LABEL_TARGET);
      delete this[forgeLabelRef];
    }

    public abstract labelChangedCallback(value: string | null): void;
    public abstract [forgeLabelRef]?: HTMLElement & { [updateTarget](target: HTMLElement): boolean };
  }

  return LabelAwareComponent as AbstractConstructor<WithLabelAwarenessContract> & TBase;
}

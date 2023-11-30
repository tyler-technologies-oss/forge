import { MixinBase, MixinReturn } from '../../constants';
import { BaseComponent, IBaseComponent } from './base-component';

/**
 * An element that can be associated with a Forge label component.
 */
export interface IBaseLabelAwareComponent extends IBaseComponent {
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
}

/**
 * Mixes in Forge label awareness into a base component.
 * 
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
export function WithLabelAwareness<T extends MixinBase<BaseComponent>>(base: T): MixinReturn<T, IBaseLabelAwareComponent> {
  abstract class LabelAwareComponent extends base implements IBaseLabelAwareComponent {
    public abstract labelChangedCallback(value: string | null): void;
  }

  return LabelAwareComponent;
}

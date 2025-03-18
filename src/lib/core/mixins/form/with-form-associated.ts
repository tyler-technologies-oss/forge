/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * Adapted and influenced from [Material Web](https://github.com/material-components/material-web).
 * The original source code can be found at: [GitHub](https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts)
 */

import { toggleAttribute } from '@tylertech/forge-core';
import { MixinBase, getFormState, getFormValue, getValidationMessage, inputType, internals, AbstractConstructor } from '../../../constants';
import { FormRestoreReason, FormRestoreState, FormValue, InputType, InputValidationProps } from '../../utils/form-utils';
import { IBaseComponent } from '../../base/base-component';

/**
 * A component that can be associated with a form.
 */
export interface IWithFormAssociation<TValue = FormValue | null> extends IBaseComponent {
  /**
   * The form element that the component is associated with.
   */
  readonly form: HTMLFormElement | null;

  /**
   * The labels associated with the component.
   */
  readonly labels: NodeList;

  /**
   * The HTML name to use in form submission.
   */
  name: string;

  /*
   * Whether or not the component is disabled.
   */
  disabled: boolean;

  /**
   * Whether or not the component is readonly.
   */
  readonly: boolean;

  /**
   * The internals of the component.
   */
  readonly [internals]: ElementInternals;

  /**
   * Sets the value type accepted by the component. This is used to set the type of the internal
   * input element and generate validation messages.
   */
  [inputType]: InputType;

  /**
   * Gets the validation message for the component.
   *
   * @param props Validation-affecting properties set on the component as well as the value of the
   * component.
   */
  [getValidationMessage](props: Partial<InputValidationProps>): string | undefined;

  /**
   * Gets the current form value of the component.
   */
  [getFormValue](): FormValue | null;

  /**
   * Gets the current form state of the component, defaulting to the component's `[formValue]`.
   *
   * Used when the component's state is different from its value, such as a checkboxes that have
   * both a boolean `checked` state and a string value.
   */
  [getFormState](): FormValue | null;

  /**
   * A callback for when the component should be enabled or disabled. This can be called when, for
   * example, the component is within a disabled fieldset.
   *
   * @param disabled Whether or not the component should be disabled.
   */
  formDisabledCallback(disabled: boolean): void;

  /**
   * A callback for when the form's value is to be reset.
   */
  formResetCallback(): void;

  /**
   * A callback for when a form restores the state of the component. For example, when a page is
   * reloaded or a form is autofilled.
   *
   * @param state The state to restore or null to reset the component's value.
   * @param reason The reason the state was restored.
   */
  formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  /**
   * An optional callback for when the associated form changes.
   *
   * @param form The new associated form or null if there is none.
   */
  formAssociatedCallback?(form: HTMLFormElement | null): void;
}

export declare abstract class WithFormAssociationContract {
  public static readonly formAssociated: boolean;

  public get form(): HTMLFormElement | null;

  public get labels(): NodeList;

  public get name(): string;
  public set name(value: string);

  public abstract get readonly(): boolean;
  public abstract set readonly(value: boolean);

  public abstract get [internals](): ElementInternals;

  public abstract [getFormValue](): FormValue | null;

  public [getFormState](): FormValue | null;

  public formDisabledCallback(disabled: boolean): void;

  public abstract formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  public abstract formResetCallback(): void;

  public set [inputType](type: InputType);

  public [getValidationMessage](props: Partial<InputValidationProps>): string | undefined;
}

/**
 * Mixes in form functionality into a base component.
 *
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithFormAssociation<TBase extends MixinBase>(base: TBase) {
  abstract class FormAssociatedComponent extends base implements IWithFormAssociation {
    public static readonly formAssociated = true;

    private _inputElement?: (HTMLInputElement | HTMLSelectElement) & { [key: string]: any };

    /** @ignore */
    public get form(): HTMLFormElement | null {
      return this[internals].form;
    }

    /** @ignore */
    public get labels(): NodeList {
      return this[internals].labels;
    }

    /** @ignore */
    public get name(): string {
      return this.getAttribute('name') ?? '';
    }
    /** @ignore */
    public set name(value: string) {
      toggleAttribute(this, !!value, 'name', value);
    }

    public abstract get disabled(): boolean;
    public abstract set disabled(value: boolean);

    public abstract get readonly(): boolean;
    public abstract set readonly(value: boolean);

    public abstract get [internals](): ElementInternals;

    public abstract [getFormValue](): FormValue | null;

    public [getFormState](): FormValue | null {
      return this[getFormValue]();
    }

    public formDisabledCallback(disabled: boolean): void {
      this.disabled = disabled;
    }

    public abstract formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

    public abstract formResetCallback(): void;

    public set [inputType](type: InputType) {
      // Create a detached input to retrieve localized validation messages from
      const inputElement = type === 'select' ? document.createElement('select') : document.createElement('input');
      inputElement.setAttribute('type', type);
      inputElement.name = 'internal';
      this._inputElement = inputElement;
    }

    public [getValidationMessage](props: Partial<InputValidationProps>): string | undefined {
      // If the input element hasn't been created yet return `undefined`
      if (!this._inputElement) {
        return undefined;
      }

      // A custom error message overrides all other messages
      if (this[internals].validity.customError) {
        return this[internals].validationMessage;
      }

      // Apply validation-affecting props to the input element to get the correct validation
      // message
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Object.entries(props).forEach(([key, value]) => (this._inputElement![key] = value));

      return this._inputElement.validationMessage;
    }
  }

  return FormAssociatedComponent as AbstractConstructor<WithFormAssociationContract> & TBase;
}

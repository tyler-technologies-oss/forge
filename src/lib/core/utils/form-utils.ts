export type FormValue = File | string | FormData;
export type FormRestoreState = File | string | FormData | Array<[string, FormDataEntryValue]>;
export type FormRestoreReason = 'restore' | 'autocomplete';
export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'select'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
export type InputValidationProp = keyof InputValidationProps;
export type ValidityStateFlag = Exclude<keyof ValidityState, 'valid'>;

export interface InputValidationProps {
  checked: boolean | null;
  disabled: boolean | null;
  max: number | null;
  maxLength: number | null;
  min: number | null;
  minLength: number | null;
  multiple: boolean | null;
  pattern: string | null;
  required: boolean | null;
  step: number | null;
  value: string | null;
}

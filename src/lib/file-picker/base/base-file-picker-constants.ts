const observedAttributes = {
  VALUE: 'value',
  FILES: 'files',
  ACCEPT: 'accept',
  MAX_SIZE: 'max-size',
  CAPTURE: 'capture',
  MULTIPLE: 'multiple',
  REQUIRED: 'required',
  DISABLED: 'disabled'
};

const attributes = {
  ...observedAttributes
};

const events = {
  CHANGE: 'change',
  INPUT: 'input'
};

export const BASE_FILE_PICKER_CONSTANTS = {
  observedAttributes,
  attributes,
  events
};

export type FilePickerDragEventName = 'dragenter' | 'dragover' | 'dragleave' | 'drop';

export interface IFilePickerChangeEventData {
  legalFiles?: File[];
  illegalFiles?: File[];
}

import { COMPONENT_NAME_PREFIX } from '../../constants.js';
import type { ProcessStepComponent } from '../process-step/process-step.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}process-stepper`;

const attributes = {
  ORIENTATION: 'orientation'
};

const events = {
  CHANGE: `${elementName}-change`
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const PROCESS_STEPPER_CONSTANTS = {
  elementName,
  attributes,
  events
};

export type ProcessStepperOrientation = 'vertical' | 'horizontal';

export interface IProcessStepperChangeEventData {
  /** The index of the step that was activated. */
  index: number;

  /** The step element that was activated. */
  step: ProcessStepComponent;
}

const numbers = {
  /** The container width, in pixels, at or below which the stepper collapses to its compact layout. */
  COMPACT_MAX_WIDTH: 599
};

export const PROCESS_STEPPER_NUMBERS = numbers;

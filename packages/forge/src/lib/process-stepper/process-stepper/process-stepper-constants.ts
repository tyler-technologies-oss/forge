import { createContext } from '@lit/context';
import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}process-stepper`;

const attributes = {
  ORIENTATION: 'orientation',
  READONLY: 'readonly'
};

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const PROCESS_STEPPER_CONSTANTS = {
  elementName,
  attributes
};

export type ProcessStepperOrientation = 'vertical' | 'horizontal';

export const PROCESS_STEPPER_ORIENTATIONS: ProcessStepperOrientation[] = ['vertical', 'horizontal'];

/** The stepper-wide configuration shared with each step. */
export interface IProcessStepperContext {
  count: number;
  /** The one-based position of the last current step, or 0 when no step is current. */
  currentIndex: number;
  numbered: boolean;
  readonly: boolean;
  orientation: ProcessStepperOrientation;
}

export const PROCESS_STEPPER_CONTEXT = createContext<IProcessStepperContext>(elementName);

const numbers = {
  /** The container width, in pixels, at or below which the stepper collapses to its compact layout. */
  COMPACT_MAX_WIDTH: 599
};

export const PROCESS_STEPPER_NUMBERS = numbers;

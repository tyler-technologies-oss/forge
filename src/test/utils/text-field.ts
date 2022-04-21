import { FLOATING_LABEL_CONSTANTS } from '@tylertech/forge';

export interface IFloatingLabelContext {
  label: HTMLLabelElement;
}

export function expectFloatingLabelState(
  instance: IFloatingLabelContext, 
  isFloating: boolean
): void {
  testFloatingLabelState(instance.label, isFloating);
}

export function testFloatingLabelState(
  labelElement: HTMLLabelElement, 
  isFloating: boolean
): void {
  expect(labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT_ABOVE)).toBe(isFloating);
}

export interface ILabelAware {
  labelClickedCallback(): void;
  labelChangedCallback(value: string | null): void;
}

/**
 * Determines if an object is label aware.
 * @param obj - The object to check.
 * @returns True if the object is label aware, false otherwise.
 */
export const isLabelAware = (obj: any): obj is ILabelAware => {
  return obj.labelClickedCallback &&
    typeof obj.labelClickedCallback === 'function' &&
    obj.labelChangedCallback &&
    typeof obj.labelChangedCallback === 'function';
};

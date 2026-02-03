// TODO: move everything here to the base-label-aware-component file

export interface ILabelAware {
  labelClickedCallback(): void;
  labelChangedCallback(value: string | null): void;
}

/**
 * Determines if an object is label aware.
 * @param obj - The object to check.
 * @returns True if the object is label aware, false otherwise.
 */
export const isLabelAware = (obj: any): obj is ILabelAware => typeof obj.labelChangedCallback === 'function';

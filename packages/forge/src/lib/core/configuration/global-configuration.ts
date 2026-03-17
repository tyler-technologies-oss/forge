export type TylerForgeGlobalConfiguration = {
  [K in keyof HTMLElementTagNameMap]?: Partial<HTMLElementTagNameMap[K]>;
};

declare global {
  interface Window {
    TylerForgeGlobalConfiguration: TylerForgeGlobalConfiguration;
  }
}

export class GlobalConfiguration {
  private constructor() {}

  /**
   * Gets an entry from the global configuration for the specified element.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public static get<T extends keyof HTMLElementTagNameMap>(element: T) {
    const entry = window.TylerForgeGlobalConfiguration?.[element];

    if (!entry) {
      return null;
    }

    return {
      has(key: keyof HTMLElementTagNameMap[T]): key is keyof HTMLElementTagNameMap[T] {
        return key in entry;
      },
      valueOf<TKey extends keyof HTMLElementTagNameMap[T]>(key: TKey) {
        return entry[key];
      }
    };
  }
}

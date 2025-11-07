import { ICON_REGISTRY_KEY } from './icon-constants';

/** The shape of an SVG icon that can be defined with the icon registry. */
export interface IIcon {
  /** The unique name of the icon. */
  name: string;
  /** The SVG icon data. */
  data: string;
}

export interface IIconDescriptor {
  raw: string;
  node?: SVGElement;
}

declare global {
  interface Window {
    [ICON_REGISTRY_KEY]: Map<string, IIconDescriptor>;
  }
}

/**
 * The registry for SVG icon instances being used within the current context.
 */
export class IconRegistry {
  private static get _icons(): Map<string, IIconDescriptor> {
    if (!window[ICON_REGISTRY_KEY]) {
      window[ICON_REGISTRY_KEY] = new Map<string, IIconDescriptor>();
    }
    return window[ICON_REGISTRY_KEY];
  }
  private static _listeners = new Map<string, Array<() => void>>();

  /**
   * Defines a new icon.
   * @param icon The icon(s) to register.
   */
  public static define(icon: IIcon | IIcon[] | string, svgData?: string): void {
    if (Array.isArray(icon)) {
      return icon.filter(i => IconRegistry._isIconObject(i)).forEach(i => IconRegistry._register(i.name, i.data));
    }
    const { name, data } = IconRegistry._parseIcon(icon, svgData);
    IconRegistry._register(name, data);
  }

  /**
   * Removes a defined icon.
   * @param icon The icon to unregister.
   */
  public static remove(icon: IIcon | string): void {
    const key = IconRegistry._isIconObject(icon) ? icon.name : icon;
    IconRegistry._icons.delete(key);
  }

  /**
   * Removes a listener
   * @param key The icon name.
   * @param listener The listener callback.
   */
  public static removeListener(key: string, listener: () => void): void {
    const listeners = IconRegistry._listeners.get(key);
    if (Array.isArray(listeners) && listeners.includes(listener)) {
      listeners.splice(listeners.indexOf(listener), 1);
    }
  }

  /** Removes all defined icons. */
  public static clear(): void {
    IconRegistry._icons.clear();
    IconRegistry._listeners.clear();
  }

  /** Gets the icon data by its name, or `undefined` if not found. */
  public static get(name: string): IIconDescriptor | undefined {
    return IconRegistry._icons.get(name);
  }

  /** Sets the icon node for a given icon name. */
  public static setNode(name: string, node: SVGElement): void {
    const descriptor = IconRegistry.get(name);
    if (descriptor) {
      descriptor.node = node;
    }
  }

  /** Gets the names of registered icons. */
  public static getIconNames(): string[] {
    return Array.from(IconRegistry._icons.keys());
  }

  /** Registers a listener to be notified when an icon with the provided key is registered in the future. */
  public static awaitIcon(key: string, listener: () => void): void {
    if (IconRegistry._icons.has(key)) {
      listener();
      return;
    }
    const listeners = IconRegistry._listeners.get(key) ?? [];
    IconRegistry._listeners.set(key, [...listeners, listener]);
  }

  /** Gets the number of defined icons in the registry. */
  public static get size(): number {
    return IconRegistry._icons.size;
  }

  /** Registers an icon, and attempts to invalidate any listeners. */
  private static _register(key: string, value: string): void {
    IconRegistry._icons.set(key, { raw: value, node: undefined });
    IconRegistry._invalidateListeners(key);
  }

  /** Gets all listeners for a specific key, calls the listeners (if any are found), and removes the listeners after they are called. */
  private static _invalidateListeners(key: string): void {
    const listeners = IconRegistry._listeners.get(key);
    if (Array.isArray(listeners) && listeners.length) {
      listeners.forEach(listener => listener());
      IconRegistry._listeners.delete(key);
    }
  }

  /** Normalizes incoming parameters to an `IIcon` type. */
  private static _parseIcon(icon: IIcon | string, data = ''): IIcon {
    if (IconRegistry._isIconObject(icon)) {
      return icon;
    }
    return { name: icon, data };
  }

  /** Determines if the provided `icon` matches the `IIcon` shape. */
  private static _isIconObject(icon: any): icon is IIcon {
    return typeof icon === 'object' && Object.prototype.hasOwnProperty.call(icon, 'name') && Object.prototype.hasOwnProperty.call(icon, 'data');
  }
}

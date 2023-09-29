import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IIconAdapter } from './icon-adapter';
import { ICON_CONSTANTS, IconUrlBuilder, IconExternalType } from './icon-constants';
import { sanitizeSvgContent, fetchIconContent, getCachedIcon, sanitizeExternalType, awaitIconDefinition, removeIconListener } from './icon-utils';

export interface IIconFoundation extends ICustomElementFoundation {
  name: string | undefined;
  src: string | undefined;
  lazy: boolean;
  external: boolean;
  externalType: IconExternalType;
  externalUrlBuilder: IconUrlBuilder;
  viewbox: string;
  layout(): void;
}

export class IconFoundation implements IIconFoundation {
  private _name: string | undefined;
  private _src: string | undefined;
  private _lazy: boolean;
  private _external = false;
  private _externalType: IconExternalType = 'standard';
  private _externalUrlBuilder: IconUrlBuilder;
  private _viewbox: string;
  private _applyTimer: number | undefined;
  private _lazyListener: () => void;
  private _registrationListener: () => void;

  constructor(private _adapter: IIconAdapter) {
    this._lazyListener = () => this._loadIcon();
  }

  public initialize(): void {
    this._applyIcon();
  }

  public disconnect(): void {
    this._adapter.destroyVisibilityObserver();
    this._clearIconQueue();
    this._tryRemoveListener();
  }

  private _safeApplyIcon(): void {
    if (!this._adapter.isConnected) {
      return;
    }
    this._clearIconQueue();
    this._queueIconUpdate();
  }

  private _tryRemoveListener(): void {
    if (this._registrationListener && this._name) {
      removeIconListener(this._name, this._registrationListener);
    }
  }

  private _applyIcon(): void {
    if (this._lazy && this._adapter.canLazyLoad()) {
      this._adapter.observeVisibility(this._lazyListener);
    } else {
      this._loadIcon();
    }
  }

  private _clearIconQueue(): void {
    if (this._applyTimer) {
      clearTimeout(this._applyTimer);
      this._applyTimer = undefined;
    }
  }

  private _queueIconUpdate(): void {
    this._applyTimer = window.setTimeout(() => {
      this._applyTimer = undefined;
      this._applyIcon();
    });
  }

  private async _loadIcon(): Promise<void> {
    try {
      if (this._src) {
        // We were provided direct icon source content so just set that
        this._setIconContent(this._src);
      } else if (this._name) {
        // Let's attempt to get our icon from the cache
        let content = this._tryGetIcon(this._name);

        if (!content) {
          if (!this._external) {
            // We attach a listener to the registry to let us know when the icon is registered
            this._registrationListener = () => this._applyIcon();
            awaitIconDefinition(this._name, this._registrationListener);

            // For now, we render nothing...
            this._adapter.setContent('');
            return;
          }
          
          // We don't have a registry icon, so let's try the network to fetch it
          if (!this._externalType) {
            throw new Error(`Invalid external type provided for icon: ${this._name}`);
          }
          const url = this._getExternalUrl(this._name, this._externalType);
          if (url) {
            content = await fetchIconContent(url, this._name);
          }
        }

        this._setIconContent(content);
      } else {
        this._adapter.setContent('');
      }
    } catch (e) {
      this._adapter.setContent('');
      throw e;
    }
  }

  private _setIconContent(svgContent: string | undefined): void {
    const content = sanitizeSvgContent(svgContent, this._viewbox);
    this._adapter.setContent(content);
  }

  private _tryGetIcon(key: string): string | undefined {
    return getCachedIcon(key);
  }

  private _getExternalUrl(name: string, type: IconExternalType): string {
    if (typeof this._externalUrlBuilder === 'function') {
      return this._externalUrlBuilder(name, type);
    }
    const setName = sanitizeExternalType(this._externalType);
    return `${ICON_CONSTANTS.strings.DEFAULT_NETWORK_BASE_URL}${setName ? `/${setName}` : ''}/${name}.svg`;
  }

  public get name(): string | undefined {
    return this._name;
  }
  public set name(value: string | undefined) {
    if (this._name !== value) {
      // We need to remove our listener for the previous name if we have any
      if (!!this._registrationListener) {
        this._tryRemoveListener();
      }
      this._name = (value || '').replace(/\s+/, '');
      this._safeApplyIcon();
      this._adapter.toggleHostAttribute(ICON_CONSTANTS.attributes.NAME, !!this._name, this._name);
    }
  }

  public get src(): string | undefined {
    return this._src;
  }
  public set src(value: string | undefined) {
    if (this._src !== value) {
      this._src = value;
      if (this._adapter.isConnected) {
        this._applyIcon();
      }
    }
  }

  public get lazy(): boolean {
    return this._lazy;
  }
  public set lazy(value: boolean) {
    if (this._lazy !== value) {
      this._lazy = value;
      this._safeApplyIcon();
      this._adapter.setHostAttribute(ICON_CONSTANTS.attributes.LAZY, `${this._lazy}`);
    }
  }

  public get external(): boolean {
    return this._external;
  }
  public set external(value: boolean) {
    if (this._external !== value) {
      this._external = value;
      this._safeApplyIcon();
      this._adapter.setHostAttribute(ICON_CONSTANTS.attributes.EXTERNAL, `${this._external}`);
    }
  }

  public get externalType(): IconExternalType {
    return this._externalType;
  }
  public set externalType(value: IconExternalType) {
    if (this._externalType !== value) {
      this._externalType = value;
      this._safeApplyIcon();
      this._adapter.setHostAttribute(ICON_CONSTANTS.attributes.EXTERNAL_TYPE, `${this._externalType}`);
    }
  }

  public get externalUrlBuilder(): IconUrlBuilder {
    return this._externalUrlBuilder;
  }
  public set externalUrlBuilder(cb: IconUrlBuilder) {
    if (this._externalUrlBuilder !== cb) {
      this._externalUrlBuilder = cb;
      this._safeApplyIcon();
    }
  }
  
  public get viewbox(): string {
    return this._viewbox;
  }
  public set viewbox(value: string) {
    if (this._viewbox !== value) {
      this._viewbox = value;
      this._safeApplyIcon();
      this._adapter.setHostAttribute(ICON_CONSTANTS.attributes.VIEWBOX, `${this.viewbox}`);
    }
  }

  public layout(): void {
    if (this._adapter.isConnected) {
      this._applyIcon();
    }
  }
}

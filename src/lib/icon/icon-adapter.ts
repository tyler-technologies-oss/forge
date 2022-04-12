import { IIconComponent } from './icon';
import { BaseAdapter, IBaseAdapter } from '../core';
import { ICON_CONSTANTS } from './icon-constants';

export interface IIconAdapter extends IBaseAdapter {
  initialize(): void;
  canLazyLoad(): boolean;
  observeVisibility(listener: () => void): void;
  destroyVisibilityObserver(): void;
  setContent(content: string): void;
}

export class IconAdapter extends BaseAdapter<IIconComponent> implements IIconAdapter {
  private _observer: IntersectionObserver | undefined;

  constructor(component: IIconComponent) {
    super(component);
  }

  public initialize(): void {
    if (!this._component.hasAttribute('aria-hidden')) {
      this._component.setAttribute('aria-hidden', 'true');
    }
  }

  public canLazyLoad(): boolean {
    return !!window.IntersectionObserver;
  }

  public observeVisibility(listener: () => void): void {
    this._observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        this.destroyVisibilityObserver();
        listener();
      }
    }, { rootMargin: `${ICON_CONSTANTS.numbers.LAZY_ROOT_MARGIN}px` });
    this._observer.observe(this._component);
  }

  public destroyVisibilityObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  public setContent(content: string): void {
    const shadowRoot = this._component.shadowRoot as ShadowRoot;
    const styleTag = shadowRoot.querySelector('style');
    shadowRoot.innerHTML = content;
    if (styleTag) {
      shadowRoot.appendChild(styleTag);
    }
  }
}

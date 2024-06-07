import { IIconComponent } from './icon';
import { BaseAdapter, IBaseAdapter } from '../core';
import { ICON_CONSTANTS } from './icon-constants';

export interface IIconAdapter extends IBaseAdapter {
  canLazyLoad(): boolean;
  observeVisibility(listener: () => void): void;
  destroyVisibilityObserver(): void;
  setContent(content: Node | null): void;
  setViewBox(viewBox: string): void;
}

export class IconAdapter extends BaseAdapter<IIconComponent> implements IIconAdapter {
  private _observer: IntersectionObserver | undefined;

  constructor(component: IIconComponent) {
    super(component);
  }

  public canLazyLoad(): boolean {
    return !!window.IntersectionObserver;
  }

  public observeVisibility(listener: () => void): void {
    this._observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          this.destroyVisibilityObserver();
          listener();
        }
      },
      { rootMargin: `${ICON_CONSTANTS.numbers.LAZY_ROOT_MARGIN}px` }
    );
    this._observer.observe(this._component);
  }

  public destroyVisibilityObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  public setContent(element: Element | null): void {
    const shadowRoot = this._component.shadowRoot as ShadowRoot;

    shadowRoot.querySelectorAll(':not(style)').forEach(child => child.remove());

    if (element) {
      if (this._component.viewbox) {
        element.setAttribute('viewBox', this._component.viewbox);
      }
      element.setAttribute('aria-hidden', 'true');
      shadowRoot.appendChild(element);
    }
  }

  public setViewBox(viewBox: string): void {
    const svgEl = this._component.shadowRoot?.querySelector('svg');
    svgEl?.setAttribute('viewBox', viewBox);
  }
}

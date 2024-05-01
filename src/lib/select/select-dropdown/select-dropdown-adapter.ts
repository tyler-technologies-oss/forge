import { ISelectDropdownComponent } from './select-dropdown';
import { BaseSelectAdapter, IBaseSelectAdapter } from '../core/base-select-adapter';
import { IListDropdownConfig } from '../../list-dropdown/list-dropdown-constants';

export interface ISelectDropdownAdapter extends IBaseSelectAdapter {
  attach(selector: string): void;
  detach(): void;
  setTargetDisconnectedListener(cb: () => void): () => void;
  isAttached(): boolean;
  setTargetText(text: string, selector: string): void;
  getTargetText(selector: string): string;
}

export class SelectDropdownAdapter extends BaseSelectAdapter<ISelectDropdownComponent> implements ISelectDropdownAdapter {
  constructor(component: ISelectDropdownComponent) {
    super(component);
  }

  public initializeAccessibility(): void {
    this._targetElement.setAttribute('role', 'listbox');
    this._targetElement.setAttribute('aria-live', 'polite');
    this._targetElement.setAttribute('aria-haspopup', 'true');
    this._targetElement.setAttribute('aria-expanded', 'false');
  }

  public addClickListener(listener: (evt: Event) => void): void {
    this._targetElement.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: Event) => void): void {
    if (this._targetElement) {
      this._targetElement.removeEventListener('click', listener);
    }
  }

  public addTargetListener(type: string, listener: (evt: Event) => void): void {
    let passive: boolean | undefined;
    let capture: boolean | undefined;
    
    if (type === 'keydown') {
      // We don't use a passive keydown listener because we are preventing default in this event and Angular doesn't like that
      // We need to use capturing to ensure that we get to this event before zone.js does
      passive = false;
      capture = true;
    }

    this._targetElement.addEventListener(type, listener, { passive, capture });
  }

  public removeTargetListener(type: string, listener: (evt: Event) => void): void {
    if (this._targetElement) {
      this._targetElement.removeEventListener(type, listener);
    }
  }

  public updateActiveDescendant(id: string): void {
    if (id) {
      this._targetElement.setAttribute('aria-activedescendant', id);
    } else {
      this._targetElement.removeAttribute('aria-activedescendant');
    }
  }

  public open(config: IListDropdownConfig): void {
    super.open(config);
    this._targetElement.setAttribute('aria-controls', `list-dropdown-popup-${config.id}`);
    this._targetElement.setAttribute('aria-expanded', 'true');
  }

  public close(): Promise<void> {
    this._targetElement.setAttribute('aria-expanded', 'false');
    this._targetElement.removeAttribute('aria-activedescendant');
    this._targetElement.removeAttribute('aria-controls');
    return super.close();
  }

  public attach(selector: string): void {
    const rootNode = this._component.getRootNode() as ShadowRoot || HTMLDocument;
    const doc = rootNode || this._component.ownerDocument || document;
    const element = doc.querySelector(selector) as HTMLElement;
    if (element) {
      this._targetElement = element;
    }
  }

  public detach(): void {
    this._targetElement = undefined as any;
  }

  public setTargetDisconnectedListener(cb: () => void): () => void {
    if (!this._targetElement || !this._targetElement.parentElement) {
      return () => {};
    }
    const observer = new MutationObserver(mutations => {
      const isTargetRemoved = mutations.some(mutation => {
        return Array.from(mutation.removedNodes).some(node => node === this._targetElement);
      });
      if (isTargetRemoved) {
        observer.disconnect();
        cb();
      }
    });
    observer.observe(this._targetElement.parentElement, { childList: true });
    return () => observer.disconnect();
  }

  public isAttached(): boolean {
    return !!this._targetElement;
  }

  public setTargetText(text: string, selector: string): void {
    let target: Element = this._targetElement;
    if (selector) {
      const element = this._getElementBySelector(selector);
      if (element) {
        target = element;
      }
    }
    if (target) {
      target.textContent = text;
    }
  }

  public getTargetText(selector: string): string {
    const element = selector ? this._getElementBySelector(selector) : this._targetElement;
    return element ? element.innerText : '';
  }

  private _getElementBySelector(selector: string): HTMLElement | null {
    return this._targetElement.querySelector(selector) || this._getRootNode().querySelector(selector);
  }

  private _getRootNode(): ShadowRoot | HTMLDocument {
    return (this._component.getRootNode() as ShadowRoot | HTMLDocument) || this._component.ownerDocument || document;
  }
}

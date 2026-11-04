import { Injectable, ApplicationRef, Injector, ViewContainerRef, inject, createComponent, EnvironmentInjector } from '@angular/core';
import { Type, EmbeddedViewRef, ComponentRef } from '@angular/core';

export interface IDynamicComponentRef<T> {
  instance: T;
  componentRef: ComponentRef<T>;
  componentElement?: HTMLElement;
  destroy(): void;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  private _injector = inject(Injector);
  private _envInjector = inject(EnvironmentInjector);
  private _appRef = inject(ApplicationRef);

  constructor() {}

  /**
   * Creates an Angular component dynamically, and optionally attaches the component instance to a given element.
   * @param component The component to create.
   * @param target Optional target to attach the component to. When a `ViewContainerRef` is provided the component
   *   is created within it; when an `HTMLElement` (or omitted) is provided the component is attached to the
   *   `ApplicationRef` and appended to the element.
   * @param injector Optional element injector to use when creating the component.
   */
  public create<T>(component: Type<T>, target?: ViewContainerRef | HTMLElement, injector?: Injector): IDynamicComponentRef<T> {
    injector = injector || this._injector;

    if (target instanceof ViewContainerRef) {
      const viewContainerComponentRef = target.createComponent(component, { injector });
      return {
        instance: viewContainerComponentRef.instance,
        componentRef: viewContainerComponentRef,
        destroy: () => {
          target.detach();
          viewContainerComponentRef.destroy();
        }
      };
    }

    const componentRef = createComponent(component, {
      environmentInjector: this._envInjector,
      elementInjector: injector
    });
    this._appRef.attachView(componentRef.hostView);
    const componentElement = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;

    if (target) {
      target.appendChild(componentElement);
    }

    return {
      instance: componentRef.instance,
      componentRef,
      componentElement,
      destroy: () => {
        this._appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }
    };
  }
}

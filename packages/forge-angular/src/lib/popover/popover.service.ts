import {
  ApplicationRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  NgModuleRef,
  NgZone,
  Provider,
  Type,
  createComponent,
  createEnvironmentInjector,
  inject
} from '@angular/core';
import { IPopoverComponent, definePopoverComponent } from '@tylertech/forge';
import { PopoverConfig } from './popover-config';
import { PopoverRef } from './popover-ref';

export interface IPopoverOptions extends Omit<Partial<IPopoverComponent>, 'attributes'> {
  className?: string;
  attributes?: Map<string, string>;
  anchorElement: HTMLElement;
}

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _ngZone = inject(NgZone);

  constructor() {
    definePopoverComponent();
  }

  /**
   * Displays a components within a Forge popover instance.
   * @param component The component reference.
   * @param options Sets attributes and properties on the `forge-popover` element. `targetElement` is required.
   * @param config The configuration to provide to the dynamic component as an injectable token.
   * @param moduleRef Optional NgModule ref if need by the component.
   * @returns A PopoverRef to the forge-popover and dynamically created component, and related close handling.
   */
  public show<T, TModule>(
    component: Type<T>,
    options: IPopoverOptions,
    config?: PopoverConfig,
    moduleRef?: NgModuleRef<TModule>,
    envInjector?: EnvironmentInjector
  ): PopoverRef<T> {
    // Contains tokens that will be provided to components through our custom popover injector
    const providers: Provider[] = [];

    // If we got a config, we should provide it as an injection token
    if (config) {
      providers.push({ provide: PopoverConfig, useValue: config });
    }

    // Create the Forge popover element
    const popoverElement = document.createElement('forge-popover');

    // Configure the popover with the provided options
    const { className, attributes, ...restOptions } = options;
    if (className) {
      popoverElement.classList.add(className);
    }
    if (attributes) {
      attributes.forEach((value, key) => popoverElement.setAttribute(key, value));
    }
    Object.assign(popoverElement, restOptions);

    // Create the ref that will allow the consumer to control the popover
    const popoverRef = new PopoverRef<T>(popoverElement);

    // Always provide the popover ref as an injection token
    providers.push({ provide: PopoverRef, useValue: popoverRef });

    // Create and attach the dynamic component to the popover element
    this._ngZone.run(() => {
      const parentInjector = envInjector ?? moduleRef?.injector ?? this._injector;
      const environmentInjector = createEnvironmentInjector(providers, parentInjector);
      const componentRef = createComponent(component, { environmentInjector });
      this._appRef.attachView(componentRef.hostView);

      const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      popoverElement.appendChild(element);

      // Always destroy when the popover is closed
      const sub = popoverRef.afterClosed.subscribe(() => {
        componentRef.destroy();
        sub.unsubscribe();
      });

      popoverElement.addEventListener('forge-popover-toggle', () => {
        popoverRef.close();
        componentRef.destroy();
        sub.unsubscribe();
        popoverElement.remove();
      });

      // Force initial change detection so component size can affect initial positioning.
      componentRef.changeDetectorRef.detectChanges();
    });

    popoverElement.open = true;
    document.body.appendChild(popoverElement);

    return popoverRef;
  }
}

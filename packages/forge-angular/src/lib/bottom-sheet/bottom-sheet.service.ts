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
import { IBottomSheetComponent, defineBottomSheetComponent } from '@tylertech/forge';
import { BottomSheetConfig } from './bottom-sheet-config';
import { BottomSheetRef } from './bottom-sheet-ref';

export interface IBottomSheetOptions extends Omit<Partial<IBottomSheetComponent>, 'attributes'> {
  bottomSheetClass?: string;
  attributes?: Map<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _ngZone = inject(NgZone);

  constructor() {
    defineBottomSheetComponent();
  }

  /**
   * Displays a components within a Forge bottom sheet instance.
   * @param component The component reference.
   * @param options The component reference.
   * @param config The configuration to provide to the dynamic component as an injectable token.
   * @param moduleRef An NgModuleRef to create the component factory from. (should the injector also inherit from this?)
   * @param envInjector An environment injector to provide to the component.
   * @returns A reference for interacting with the created bottom sheet.
   */
  public show<T, K>(
    component: Type<T>,
    options?: IBottomSheetOptions,
    config?: BottomSheetConfig,
    moduleRef?: NgModuleRef<K>,
    envInjector?: EnvironmentInjector
  ): BottomSheetRef<T> {
    // Contains tokens that will be provided to components through our custom bottom sheet injector
    const providers: Provider[] = [];

    // If we got a config, we should provide it as an injection token
    if (config) {
      providers.push({ provide: BottomSheetConfig, useValue: config });
    }

    // Create the Forge bottom sheet element
    const bottomSheetElement = document.createElement('forge-bottom-sheet');

    // Configure the bottom sheet with the provided options
    if (options) {
      const { bottomSheetClass, attributes, ...restOptions } = options;
      if (bottomSheetClass) {
        bottomSheetElement.classList.add(bottomSheetClass);
      }
      if (attributes) {
        attributes.forEach((value, key) => bottomSheetElement.setAttribute(key, value));
      }
      Object.assign(bottomSheetElement, restOptions);
    }

    // Create the ref that will allow the consumer to control the bottom sheet
    const bottomSheetRef = new BottomSheetRef<T>(bottomSheetElement);

    // Always provide the bottom sheet ref as an injection token
    providers.push({ provide: BottomSheetRef, useValue: bottomSheetRef });

    // Create and attach the dynamic component to the bottom sheet element
    this._ngZone.run(() => {
      const parentInjector = envInjector ?? moduleRef?.injector ?? this._injector;
      const environmentInjector = createEnvironmentInjector(providers, parentInjector);
      const componentRef = createComponent(component, { environmentInjector });
      this._appRef.attachView(componentRef.hostView);

      const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      bottomSheetElement.appendChild(element);

      bottomSheetElement.addEventListener('forge-bottom-sheet-close', () => {
        if (bottomSheetRef.nativeElement.open) {
          bottomSheetRef.close();
          return;
        }

        componentRef.destroy();
        bottomSheetElement.remove();
      });
    });

    bottomSheetElement.open = true;
    document.body.appendChild(bottomSheetElement);

    return bottomSheetRef;
  }
}

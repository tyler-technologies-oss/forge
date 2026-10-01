import {
  ApplicationRef,
  Binding,
  DestroyRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  NgZone,
  Provider,
  createComponent,
  createEnvironmentInjector,
  inject
} from '@angular/core';
import { Type, NgModuleRef } from '@angular/core';
import { IDialogProperties, defineDialogComponent } from '@tylertech/forge';
import { DIALOG_DATA, DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const MAX_NESTED_DIALOGS = 2;

export interface IDialogOptions extends Partial<IDialogProperties> {
  dialogClass?: string;
  attributes?: Map<string, string>;
}

export interface IDialogServiceShowConfiguration<TModule = unknown> {
  options?: IDialogOptions;
  config?: DialogConfig;
  data?: any;
  module?: NgModuleRef<TModule>;
  injector?: EnvironmentInjector;
  elementInjector?: Injector;
  directives?: (Type<unknown> | { type: Type<unknown>; bindings: Binding[] })[];
  bindings?: Binding[];
}

/**
 * Provides facilities for working with a Forge dialog and placing dynamic components within it.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _ngZone = inject(NgZone);

  private _openDialogRefs: DialogRef[] = [];
  private _destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    defineDialogComponent();
  }

  /**
   * Displays a component within a Forge dialog instance.
   * @deprecated Use `open()` instead.
   * @param component The component reference.
   * @param config The configuration to provide to the dynamic component as an injectable token.
   * @param moduleRef Optional NgModule ref if need by the component.
   * @param envInjector Optional environment injector to provide to the component.
   * @returns A reference for interacting with the created dialog.
   */
  public show<T, K>(
    component: Type<T>,
    options?: IDialogOptions,
    config?: DialogConfig,
    moduleRef?: NgModuleRef<K>,
    envInjector?: EnvironmentInjector
  ): DialogRef<T> {
    return this.open(component, { options, config, module: moduleRef, injector: envInjector });
  }

  /**
   * Opens a Forge dialog with the provided component.
   * @param component The component reference.
   * @param configuration The configuration for the dialog.
   * @returns A reference for interacting with the created dialog.
   */
  public open<TComponent, TModule>(component: Type<TComponent>, configuration: IDialogServiceShowConfiguration<TModule> = {}): DialogRef<TComponent> {
    const dialogRef = this._showDialog(component, configuration);
    this._openDialogRefs.push(dialogRef);
    dialogRef.afterClosed.pipe(take(1), takeUntilDestroyed(this._destroyRef)).subscribe(() => this._removeDialogRef(dialogRef));
    return dialogRef;
  }

  private _showDialog<TComponent, TModule>(
    component: Type<TComponent>,
    { config, data, injector, elementInjector, module, options, directives, bindings }: IDialogServiceShowConfiguration<TModule>
  ): DialogRef<TComponent> {
    // Contains tokens that will be provided to components through our custom dialog injector
    const providers: Provider[] = [];

    // Since config and data can be provided separately, we should create a config with data if only data was provided
    if (!config && data != null) {
      config = { data };
    }

    // If we got a config, we should provide it as an injection token
    if (config) {
      providers.push({ provide: DialogConfig, useValue: config });
    }

    // If we got data, we should also provide it as a injection token on its own
    if (data != null) {
      providers.push({ provide: DIALOG_DATA, useValue: data });
    }

    // Create the Forge dialog element
    const dialogElement = document.createElement('forge-dialog');

    // Configure the dialog with the provided options
    if (options) {
      const { dialogClass, attributes, ...restOptions } = options;
      if (dialogClass) {
        dialogElement.classList.add(dialogClass);
      }
      if (attributes) {
        attributes.forEach((value, key) => dialogElement.setAttribute(key, value));
      }
      Object.assign(dialogElement, restOptions);
    }

    // Create the ref that will allow the consumer to control the dialog
    const dialogRef = new DialogRef<TComponent>(dialogElement);

    // Always provide the dialog ref as an injection token
    providers.push({ provide: DialogRef, useValue: dialogRef });

    // Create and attach the dynamic component to the dialog element
    this._ngZone.run(() => {
      const parentInjector = injector ?? module?.injector ?? this._injector;
      const environmentInjector = createEnvironmentInjector(providers, parentInjector);
      const componentRef = createComponent(component, { environmentInjector, elementInjector, directives, bindings });
      dialogRef.componentRef = componentRef;
      dialogRef.componentInstance = componentRef.instance;
      this._appRef.attachView(componentRef.hostView);

      const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      dialogElement.appendChild(element);

      dialogElement.addEventListener('forge-dialog-close', () => {
        if (!dialogRef.isClosed) {
          dialogRef.close();
        }
        componentRef.destroy();
        dialogElement.remove();
      });
    });

    dialogElement.open = true;
    document.body.appendChild(dialogElement);

    return dialogRef;
  }

  /**
   * Closes all dialogs.
   * @param result The result of closing the dialogs. Default is false.
   */
  public closeAllDialogs(result = false): void {
    this._closeAllDialogs(result);
  }

  // While multiple dialogs is an anti-UX pattern, this is a minimal safeguard to protect against dirty dialogs
  private _closeAllDialogs(result: boolean, recursiveExecutionCount = 0): void {
    if (recursiveExecutionCount > MAX_NESTED_DIALOGS) {
      throw new Error('Could not close all dialogs. Reason: Too many nested dialogs.');
    }

    this._openDialogRefs.forEach(ref => ref.close(result));

    // This is here to close any dialogs that open as a result of other dialogs closing
    // e.g. A dirty dialog opening when a dirty form dialog closes.
    if (this._openDialogRefs.length > 0) {
      this._closeAllDialogs(result, ++recursiveExecutionCount);
    }
  }

  private _removeDialogRef(ref: DialogRef): void {
    const index = this._openDialogRefs.findIndex(dlgRef => ref === dlgRef);
    if (index < 0) {
      return;
    }

    this._openDialogRefs.splice(index, 1);
  }
}

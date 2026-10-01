import { IToastComponent, IToastPresentConfiguration, TOAST_CONSTANTS, ToastComponent } from '@tylertech/forge';
import { ReactComponentOrElements } from '../utils.js';
import { useDynamicForgeComponent, UseDynamicComponentDelegate } from './useDynamicForgeComponent.js';

export interface ForgeToastOptions extends Partial<IToastPresentConfiguration> {
  actionHandler?: () => void;
}

export type UseForgeToastResult = [(options?: ForgeToastOptions, dismissCallback?: () => void) => IToastComponent, () => void];

export const useForgeToast = (component?: ReactComponentOrElements, componentProps?: any): UseForgeToastResult => {
  const delegate: UseDynamicComponentDelegate<IToastComponent> = {
    show: (_instance, options) => {
      ToastComponent.present(options);
    },
    // eslint-disable-next-line arrow-body-style
    hide: instance => {
      return new Promise<void>(resolve => {
        const complete = (): void => {
          instance.remove();
          resolve();
        };

        if (!instance.open) {
          complete();
          return;
        }
        instance.addEventListener(TOAST_CONSTANTS.events.CLOSE, () => complete(), { once: true });
      });
    }
  };
  const controller = useDynamicForgeComponent('forge-toast', component, componentProps, delegate);

  function show(options?: ForgeToastOptions, dismissCallback?: () => void): IToastComponent {
    const toastElement = controller.show(options);

    // We need to attach a listener for the actions if the consumer cares to respond to it
    const actionHandler = options?.actionHandler;
    if (typeof actionHandler === 'function') {
      toastElement.addEventListener(TOAST_CONSTANTS.events.ACTION, () => actionHandler());
    }

    // We need to listen for the component automatically hiding itself so we can update our state
    toastElement.addEventListener(TOAST_CONSTANTS.events.CLOSE, () => {
      controller.hide();
      if (typeof dismissCallback === 'function') {
        dismissCallback();
      }
    });

    return toastElement;
  }

  return [show, controller.hide];
};

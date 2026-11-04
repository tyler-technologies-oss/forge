import { DIALOG_CONSTANTS, IDialogComponent, IDialogProperties } from '@tylertech/forge';
import { ReactComponentOrElements } from '../utils.js';
import { useDynamicForgeComponent, UseDynamicComponentDelegate } from './useDynamicForgeComponent.js';

export interface ForgeDialogOptions extends Partial<IDialogProperties> {
  dialogAttributes?: Map<string, string>;
  dialogClass?: string;
}

export type UseForgeDialogResult = [(options?: ForgeDialogOptions, dismissCallback?: () => void) => IDialogComponent, () => void];

export const useForgeDialog = (component: ReactComponentOrElements, componentProps?: any): UseForgeDialogResult => {
  const delegate: UseDynamicComponentDelegate<IDialogComponent> = {
    show: instance => {
      document.body.appendChild(instance); // TODO: make the parent element configurable
      instance.open = true;
    },
    hide: instance =>
      new Promise<void>(resolve => {
        const complete = (): void => {
          instance.remove();
          resolve();
        };

        if (!instance.open) {
          complete();
          return;
        }

        instance.open = false;
        instance.addEventListener(DIALOG_CONSTANTS.events.CLOSE, () => complete(), { once: true });
      })
  };
  const controller = useDynamicForgeComponent('forge-dialog', component, componentProps, delegate);

  function show({ dialogAttributes, dialogClass, ...options }: ForgeDialogOptions = {}, dismissCallback?: () => void): IDialogComponent {
    const dialogElement = controller.show(options);

    if (dialogAttributes) {
      dialogAttributes.forEach((value, key) => dialogElement.setAttribute(key, value));
    }

    if (dialogClass) {
      dialogElement.classList.add(dialogClass);
    }

    dialogElement.addEventListener(DIALOG_CONSTANTS.events.CLOSE, () => {
      controller.hide();
      if (typeof dismissCallback === 'function') {
        dismissCallback();
      }
    });
    return dialogElement;
  }

  return [show, controller.hide];
};

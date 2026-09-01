import { BOTTOM_SHEET_CONSTANTS, IBottomSheetComponent } from '@tylertech/forge';
import { ReactComponentOrElements } from '../utils.js';
import { useDynamicForgeComponent, UseDynamicComponentDelegate } from './useDynamicForgeComponent.js';

export interface ForgeBottomSheetOptions extends Partial<IBottomSheetComponent> {
  bottomSheetClass?: string;
  bottomSheetAttributes?: Map<string, string>;
}

const BOTTOM_SHEET_ANIMATION_DURATION = 300;

export type UseForgeBottomSheetResult = [(options?: ForgeBottomSheetOptions, dismissCallback?: () => void) => IBottomSheetComponent, () => void];

export const useForgeBottomSheet = (component: ReactComponentOrElements, componentProps?: any): UseForgeBottomSheetResult => {
  const delegate: UseDynamicComponentDelegate<IBottomSheetComponent> = {
    show: instance => {
      document.body.appendChild(instance); // TODO: make the parent element configurable
      instance.open = true;
    },
    // eslint-disable-next-line arrow-body-style
    hide: (instance, cb) => {
      return new Promise<void>(resolve => {
        const complete = (): void => {
          instance.remove();
          if (typeof cb === 'function') {
            cb();
          }
          resolve();
        };

        if (!instance.open) {
          complete();
          return;
        }

        instance.open = false;
        window.setTimeout(() => complete(), BOTTOM_SHEET_ANIMATION_DURATION);
      });
    }
  };
  const controller = useDynamicForgeComponent('forge-bottom-sheet', component, componentProps, delegate);

  function show({ bottomSheetAttributes, bottomSheetClass, ...options }: ForgeBottomSheetOptions = {}, dismissCallback?: () => void): IBottomSheetComponent {
    const bottomSheetElement = controller.show(options);

    if (bottomSheetAttributes) {
      bottomSheetAttributes.forEach((value, key) => bottomSheetElement.setAttribute(key, value));
    }

    if (bottomSheetClass) {
      bottomSheetElement.classList.add(bottomSheetClass);
    }

    bottomSheetElement.addEventListener(BOTTOM_SHEET_CONSTANTS.events.CLOSE, () => {
      controller.hide();
      if (typeof dismissCallback === 'function') {
        dismissCallback();
      }
    });

    return bottomSheetElement;
  }

  return [show, controller.hide];
};

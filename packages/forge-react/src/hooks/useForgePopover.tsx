import { IPopoverComponent, POPOVER_CONSTANTS } from '@tylertech/forge';
import { MutableRefObject } from 'react';
import { ReactComponentOrElements } from '../utils.js';
import { useDynamicForgeComponent, UseDynamicComponentDelegate } from './useDynamicForgeComponent.js';

export interface ForgePopoverOptions extends Partial<IPopoverComponent> {
  popoverAttributes?: Map<string, string>;
  popoverClass?: string;
}

export type UseForgePopoverResult = [
  (targetRef: MutableRefObject<any>, options?: ForgePopoverOptions, dismissCallback?: () => void) => IPopoverComponent,
  () => void
];

export function useForgePopover(component: ReactComponentOrElements, componentProps?: any): UseForgePopoverResult {
  const delegate: UseDynamicComponentDelegate<IPopoverComponent, ForgePopoverOptions> = {
    show: (instance, options) => {
      // Set default options
      instance.persistent = options?.persistent ?? false;
      if (options?.animationType) {
        instance.animationType = options.animationType;
      }
      if (options?.anchor) {
        instance.anchor = options.anchor;
      }
      if (options?.anchorElement) {
        instance.anchorElement = options.anchorElement;
      }

      document.body.appendChild(instance); // TODO: make the parent element configurable
      instance.open = true;
    },
    // eslint-disable-next-line arrow-body-style
    hide: (instance, cb) => {
      return new Promise<void>(resolve => {
        const complete = (): void => {
          if (typeof cb === 'function') {
            cb();
          }
          instance.remove();
          resolve();
        };

        if (!instance.open) {
          complete();
          return;
        }

        instance.open = false;
        instance.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, () => complete(), { once: true });
      });
    }
  };
  const controller = useDynamicForgeComponent('forge-popover', component, componentProps, delegate);

  function show(
    targetElement: MutableRefObject<any>,
    { popoverAttributes, popoverClass, ...options }: ForgePopoverOptions = {},
    dismissCallback?: () => void
  ): IPopoverComponent {
    const popoverElement = controller.show({ anchorElement: targetElement.current, ...options });

    if (popoverAttributes) {
      popoverAttributes.forEach((value, key) => popoverElement.setAttribute(key, value));
    }

    if (popoverClass) {
      popoverElement.classList.add(popoverClass);
    }

    if (options.persistent !== true) {
      targetElement.current.addEventListener('blur', () => {
        controller.hide();
        if (typeof dismissCallback === 'function') {
          dismissCallback();
        }
      });
    }

    return popoverElement;
  }

  return [show, controller.hide];
}

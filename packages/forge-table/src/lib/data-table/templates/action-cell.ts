import '@tylertech/forge/button';
import '@tylertech/forge/icon-button';
import type { IconButtonComponent } from '@tylertech/forge/icon-button';
import type { TooltipComponent } from '@tylertech/forge/tooltip';
import { labelWithRowName } from '../features/row-meta.js';

export interface ActionButtonConfig {
  text: string | ((row: any) => string);
  icon?: string;
  type?: 'button' | 'icon';
  defaultAction?: boolean;
  onClick: (row: any) => void;
}

export function actionCell(config: ActionButtonConfig[]) {
  return ({ row }: { row: any }) => {
    const container = document.createElement('div');
    container.classList.add('action-cell');
    let didSetDefaultAction = false;

    config.forEach(buttonConfig => {
      const button = document.createElement(buttonConfig.type === 'button' ? 'forge-button' : 'forge-icon-button');
      button.type = 'button';
      const textContent = typeof buttonConfig.text === 'function' ? buttonConfig.text(row) : buttonConfig.text;
      let tooltip: TooltipComponent | undefined;
      if (buttonConfig.type === 'button') {
        button.textContent = textContent;
      } else {
        button.setAttribute('aria-label', textContent);
        (button as IconButtonComponent).shape = 'squared';
        tooltip = document.createElement('forge-tooltip') as TooltipComponent;
        tooltip.textContent = textContent;
        tooltip.type = 'label';
        tooltip.placement = 'top';
        tooltip.anchorElement = button;
      }
      if (buttonConfig.icon) {
        const icon = document.createElement('forge-icon');
        icon.name = buttonConfig.icon;
        icon.slot = buttonConfig.type === 'button' ? 'start' : '';
        button.prepend(icon);
      }
      labelWithRowName(button, row);
      button.addEventListener('click', () => buttonConfig.onClick(row));
      if (!didSetDefaultAction && buttonConfig.defaultAction) {
        button.setAttribute('forge-default-action', '');
        didSetDefaultAction = true;
      }
      container.appendChild(button);
      if (tooltip) {
        container.appendChild(tooltip);
      }
    });

    return container;
  };
}

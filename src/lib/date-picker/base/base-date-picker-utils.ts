export function createToggleElement(iconName: string): HTMLElement {
  const iconButtonElement = document.createElement('forge-icon-button');
  iconButtonElement.slot = 'trailing';
  iconButtonElement.dense = true;
  iconButtonElement.densityLevel = 3;
  iconButtonElement.style.marginRight = '4px';

  const buttonElement = document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.tabIndex = -1;
  buttonElement.setAttribute('aria-label', 'Toggle calendar');
  iconButtonElement.appendChild(buttonElement);

  const iconElement = document.createElement('forge-icon');
  iconElement.name = iconName;
  buttonElement.appendChild(iconElement);

  return iconButtonElement;
}

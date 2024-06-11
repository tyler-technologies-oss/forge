export function createToggleElement(iconName: string): HTMLElement {
  const iconButtonElement = document.createElement('forge-icon-button');
  iconButtonElement.type = 'button';
  iconButtonElement.tabIndex = -1;
  iconButtonElement.setAttribute('aria-label', 'Toggle calendar');
  iconButtonElement.slot = 'end';
  iconButtonElement.density = 'medium';

  const iconElement = document.createElement('forge-icon');
  iconElement.name = iconName;
  iconButtonElement.appendChild(iconElement);

  return iconButtonElement;
}

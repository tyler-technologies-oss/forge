import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/tooltip';
import type { ISelectComponent, ISwitchComponent, ITooltipComponent } from '@tylertech/forge';

const tooltip = document.querySelector('#tooltip') as ITooltipComponent;

const textInput = document.querySelector('#tooltip-text') as HTMLInputElement;
textInput.addEventListener('input', () => tooltip.textContent = textInput.value);

const delayInput = document.querySelector('#tooltip-delay') as HTMLInputElement;
delayInput.addEventListener('input', () => tooltip.delay = +(delayInput.value ?? 0));

const positionSelect = document.querySelector('#tooltip-position') as ISelectComponent;
positionSelect.addEventListener('change', () => tooltip.position = positionSelect.value);

const useBuilderCheckbox = document.querySelector('#tooltip-builder') as ISwitchComponent;
useBuilderCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => tooltip.builder = selected ? tooltipBuilder : undefined);

function tooltipBuilder(): HTMLElement {
  const div = document.createElement('div');
  div.classList.add('flex');

  const avatar = document.createElement('forge-avatar');
  avatar.letterCount = 2;
  avatar.text = 'Tyler Forge™';
  div.appendChild(avatar);

  const span = document.createElement('span');
  span.textContent = `Custom: ${textInput.value}`;
  div.appendChild(span);

  return div;
}

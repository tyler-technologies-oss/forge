import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/tooltip';
import './tooltip.scss';
import { ITooltipComponent } from '@tylertech/forge/tooltip';
import { ISelectComponent } from '@tylertech/forge/select';

const demoEl = document.querySelector('.tooltip-demo') as HTMLElement;
const delayInput = document.querySelector('#opt-delay') as HTMLInputElement;
delayInput.addEventListener('input', () => getAllTooltips().forEach(tt => (tt.delay = +(delayInput.value ?? 0))));

const placementSelect = document.querySelector('#opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', () => getAllTooltips().forEach(tt => (tt.placement = placementSelect.value)));

const triggerTypeSelect = document.querySelector('#opt-trigger-type') as ISelectComponent;
triggerTypeSelect.addEventListener('change', () => getAllTooltips().forEach(tt => (tt.triggerType = triggerTypeSelect.value)));

function getAllTooltips(): ITooltipComponent[] {
  return Array.from(demoEl.querySelectorAll('forge-tooltip'));
}

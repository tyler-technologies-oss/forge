import '$src/shared';
import '@tylertech/forge/spinner';
import './spinner.scss';
import { ISpinnerComponent, ISwitchComponent } from '@tylertech/forge';

const spinner = document.querySelector('#spinner') as ISpinnerComponent;
spinner.addEventListener('forge-spinner-increment', () => console.log('INC'));
spinner.addEventListener('forge-spinner-decrement', () => console.log('DEC'));

const disabledCheckbox = document.querySelector('#spinner-disabled') as ISwitchComponent;
disabledCheckbox.addEventListener('forge-switch-select', ({detail: disabled}) => spinner.disabled = disabled);

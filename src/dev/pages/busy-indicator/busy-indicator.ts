import '$src/shared';
import type { IBusyIndicatorComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/busy-indicator';
import '@tylertech/forge/busy-indicator/forge-busy-indicator.scss';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import './busy-indicator.scss';

const titleInput = document.querySelector('#title-input') as HTMLInputElement;
const messageInput = document.querySelector('#message-input') as HTMLInputElement;
const fixedToggle = document.querySelector('#busy-indicator-fixed') as ISwitchComponent;
const showCancelToggle = document.querySelector('#busy-indicator-cancel') as ISwitchComponent;
const useCustomWidthToggle = document.querySelector('#busy-indicator-width') as ISwitchComponent;
const showSpinnerToggle = document.querySelector('#busy-indicator-spinner') as ISwitchComponent;
const showProgressBarToggle = document.querySelector('#busy-indicator-progress-bar') as ISwitchComponent;
const progressBarModeDropdown = document.querySelector('#progress-bar-mode') as ISelectComponent;
const progressBarDirection = document.querySelector('#layout-direction') as ISelectComponent;

const showButton = document.querySelector('#show-busy-indicator-button') as HTMLButtonElement;
showButton.addEventListener('click', () => showBusyIndicator());

function showBusyIndicator(): void {
  const busyIndicatorElement = createBusyIndicatorFromOptions();

  const parent = fixedToggle.selected ? document.body : document.querySelector('.busy-indicator-host') as HTMLElement;
  parent.appendChild(busyIndicatorElement);

  if (busyIndicatorElement.cancel) {
    busyIndicatorElement.addEventListener('forge-busy-indicator-cancel', () => {
      setTimeout(() => busyIndicatorElement.hide(true), 1000);
    });
  }

  if (showProgressBarToggle.selected && progressBarModeDropdown.value === 'determinate' || progressBarModeDropdown.value === 'buffer') {
    const progressInterval = setInterval(() => {
      if (!busyIndicatorElement.isConnected) {
        return clearInterval(progressInterval);
      }
      busyIndicatorElement.progress += 0.02;
      if (busyIndicatorElement.progress > 1) {
        clearInterval(progressInterval);
        if (busyIndicatorElement.isConnected) {
          busyIndicatorElement.hide();
        }
      }
    }, 100);

    if (progressBarModeDropdown.value === 'buffer') {
      const bufferInterval = setInterval(() => {
        if (!busyIndicatorElement.isConnected) {
          return clearInterval(progressInterval);
        }
        busyIndicatorElement.buffer += 0.03;
        if (busyIndicatorElement.progress > 1 || busyIndicatorElement.buffer > 1) {
          clearInterval(bufferInterval);
        }
      }, 100);
    }
  } else {
    setTimeout(() => busyIndicatorElement.hide(), 3000);
  }
}

function createBusyIndicatorFromOptions(): IBusyIndicatorComponent {
  const busyIndicatorElement = document.createElement('forge-busy-indicator');

  busyIndicatorElement.titleText = titleInput.value;
  busyIndicatorElement.message = messageInput.value;
  busyIndicatorElement.cancel = showCancelToggle.selected;
  busyIndicatorElement.spinner = showSpinnerToggle.selected;
  busyIndicatorElement.progressBar = showProgressBarToggle.selected;
  busyIndicatorElement.progressBarDeterminate = progressBarModeDropdown.value === 'determinate' || progressBarModeDropdown.value === 'buffer';
  busyIndicatorElement.direction = progressBarDirection.value;
  busyIndicatorElement.fixed = fixedToggle.selected;

  if (progressBarModeDropdown.value !== 'buffer') {
    busyIndicatorElement.buffer = 1;
  }

  if (useCustomWidthToggle.selected) {
    busyIndicatorElement.width = 500;
  }

  return busyIndicatorElement;
}

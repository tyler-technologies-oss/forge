import type { IBusyIndicatorComponent } from '@tylertech/forge/busy-indicator';

const showButton = document.querySelector<HTMLElement>('forge-button');
const busyIndicator = document.querySelector<IBusyIndicatorComponent>('forge-busy-indicator');

showButton?.addEventListener('click', () => {
  if (!busyIndicator) {
    return;
  }
  busyIndicator.open = true;
  setTimeout(() => {
    busyIndicator.open = false;
  }, 3000);
});

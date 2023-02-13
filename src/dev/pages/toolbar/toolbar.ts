import '$src/shared';
import '@tylertech/forge/toolbar';
import './toolbar.scss';
import type { IToolbarComponent, ISwitchComponent} from '@tylertech/forge';

const toolbar = document.querySelector('#toolbar') as IToolbarComponent;

const invertedToggle = document.querySelector('#toolbar-inverted') as ISwitchComponent;
invertedToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  toolbar.inverted = selected;
});

const showBorderToggle = document.querySelector('#toolbar-border') as ISwitchComponent;
showBorderToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    toolbar.removeAttribute('no-border');
  } else {
    toolbar.setAttribute('no-border', '');
  }
});

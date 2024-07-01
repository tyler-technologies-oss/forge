import '$src/shared';
import '@tylertech/forge/card';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/button';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/card/forge-card.scss';
import './card.scss';
import type { ICardComponent } from '@tylertech/forge/card';
import type { ISwitchComponent } from '@tylertech/forge/switch';

const card = document.querySelector('.demo-card') as ICardComponent;
const cssCard = document.querySelector('.demo-card.forge-card') as HTMLElement;

const raisedToggle = document.querySelector('#opt-card-raised') as ISwitchComponent;
raisedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  card.raised = selected;
  cssCard.classList.toggle('forge-card--raised', selected);
});


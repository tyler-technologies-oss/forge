import '$src/shared';
import '@tylertech/forge/accordion';
import type { IAccordionComponent } from '@tylertech/forge/accordion';
import './accordion.scss';

const accordion = document.querySelector('#accordion') as IAccordionComponent;

accordion.addEventListener('forge-expansion-panel-toggle', evt => {
  console.log('[forge-expansion-panel-toggle]', evt);
});

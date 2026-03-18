import figma, { html } from '@figma/code-connect/html';

/* slots are in beta, retaining until general availability
figma.connect('<FIGMA_POPOVER_POPOVER>', {
  props: {
    children: figma.children('*'),
    placement: html`placement="bottom-start"`
  },
  example: (props: any) => html` <forge-popover ${props.placement}> ${props.children} </forge-popover> `
});
*/

figma.connect('<FIGMA_POPOVER_POPOVER>', {
  props: {
    slot: figma.slot('Slot'),
    placement: html`placement="bottom-start"`
  },
  example: (props: any) => html` <forge-popover ${props.placement}> ${props.slot} </forge-popover> `
});

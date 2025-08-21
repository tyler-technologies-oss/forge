import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_POPOVER_POPOVER>', {
  props: {
    children: figma.children('*'),
    placement: html`placement="bottom-start"`
  },
  example: (props: any) => html` <forge-popover ${props.placement}> ${props.children} </forge-popover> `
});

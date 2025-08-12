import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_TOOLTIP_TOOLTIP>', {
  props: {
    Text: figma.string('Text'),
    placement: figma.enum('Placement', {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right'
    })
  },

  example: props => html`<forge-tooltip anchor="my-button" placement="${props.placement}">${props.Text}</forge-tooltip>`
});

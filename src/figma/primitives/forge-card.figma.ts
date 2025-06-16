import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_CARD_CARD>', {
  props: {
    elevated: figma.enum('Style', {
      Elevated: true
    })
  },
  example: props => html`<forge-card raised="${props.elevated}"></forge-card>`
});

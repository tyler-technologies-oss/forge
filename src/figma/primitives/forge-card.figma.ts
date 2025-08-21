import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_CARD_CARD>', {
  props: {
    raised: figma.enum('Style', {
      Raised: true
    })
  },
  example: (props: any) => html` <forge-card raised="${props.raised}"></forge-card>`
});

import figma, { html } from '@figma/code-connect/html';
/* slots are in open beta, keeping until general release
figma.connect('<FIGMA_CARD_CARD>', {
  props: {
    raised: figma.enum('Style', {
      Raised: true
    })
  },
  example: (props: any) => html` <forge-card raised="${props.raised}"></forge-card>`
});
*/

figma.connect('<FIGMA_CARD_CARD>', {
  props: {
    raised: figma.enum('Style', {
      Raised: true
    }),
    slot: figma.slot('Slot')
  },
  example: (props: any) => html` <forge-card raised="${props.raised}">${props.slot}</forge-card>`
});

import figma, { html } from '@figma/code-connect/html';

// circular progress component
figma.connect('<FIGMA_CIRCULAR_PROGRESS_CIRCULAR_PROGRESS>', {
  props: {
    track: figma.enum('Track', {
      true: 'track',
      false: undefined
    })
  },
  example: (props: any) => html`<forge-circular-progress ${props.track}></forge-circular-progress>`
});

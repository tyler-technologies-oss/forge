import figma, { html } from '@figma/code-connect/html';

figma.connect('<FIGMA_LINEAR_PROGRESS_LINEAR_PROGRESS>', {
  props: {},
  example: (props: any) => html`<forge-linear-progress determinate progress="0.7"></forge-linear-progress>`
});

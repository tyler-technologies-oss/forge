import figma, { html } from '@figma/code-connect/html';

// backdrop component
figma.connect('<FIGMA_BACKDROP_BACKDROP>', {
  props: {},
  example: () => html`<forge-backdrop visible fixed></forge-backdrop>`
});

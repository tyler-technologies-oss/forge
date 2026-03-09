import figma, { html } from '@figma/code-connect/html';

// color picker component
figma.connect('<FIGMA_COLOR_PICKER_COLOR_PICKER>', {
  props: {},
  example: () => html`<forge-color-picker value="000000"></forge-color-picker>`
});

export const DialogComplexCodeHtml = () => `
<template id="dialog-content">
  <forge-toolbar forge-dialog-move-target>
    <h2 class="forge-dialog__title">Discard draft?</h2>
    <forge-icon-button slot="end">
      <button id="complex-dialog-close-button" type="button" aria-label="Close complex dialog">
        <forge-icon name="close"></forge-icon>
      </button>
    </forge-icon-button>
  </forge-toolbar>
  <section class="forge-dialog__body" style="width: 500px">
    Lorem ipsum
  </section>
  <forge-toolbar>
    <forge-button type="outlined" style="margin-right: 16px" slot="end">
      <button type="button" id="cancel-button">Cancel</button>
    </forge-button>
    <forge-button type="raised" slot="end">
      <button type="button" id="accept-button" forge-dialog-focus>Discard</button>
    </forge-button>
  </forge-toolbar>
</template>
`;

export const DialogComplexCodeTs = () => `
IconRegistry.define(tylIconClose);

const dialog = document.createElement('forge-dialog');
const dialogTemplate = document.getElementById('dialog-content');
dialog.appendChild(dialogTemplate.content.cloneNode(true));
dialog.open = true; // This will append the dialog to the body automatically and start the open animation
`;

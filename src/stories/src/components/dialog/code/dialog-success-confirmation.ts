export const DialogSuccessConfirmationCodeHtml = () => `
<template id="dialog-content">
  <div style="padding: 16px 8px 8px 8px">
    <section class="forge-dialog__body" style="display: flex; flex-direction: column; align-items: center; margin: 0 32px; padding-bottom: 8px;">
      <img src="https://cdn.forge.tylertech.com/v1/images/spot/thumbs-up-spot.svg" width="128" height="128" alt="" style="margin-top: 8px" />
      <div class="forge-typography--body1" style="margin-top: 16px">Your condition has been saved successfully!</div>
      <div class="forge-typography--subtitle1" style="text-align: center">Would you like to create another condition within <br/> Revenue or move on to Expenditure?</div>
    </section>
    <footer class="forge-dialog__footer">
      <forge-button type="outlined" style="margin-right: 16px" slot="center">
        <button type="button">Create another condition</button>
      </forge-button>
      <forge-button type="unelevated" slot="center">
        <button type="submit">Move on</button>
      </forge-button>
    </footer>
  </div>
</template>
`;

export const DialogSuccessConfirmationCodeTs = () => `
const dialog = document.createElement(forge-dialog);
const dialogTemplate = document.getElementById(dialog-content);
dialog.appendChild(dialogTemplate.content.cloneNode(true));
dialog.open = true; // This will append the dialog to the body automatically and start the open animation
`;
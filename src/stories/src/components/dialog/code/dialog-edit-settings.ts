export const DialogEditSettingsCodeHtml = () => `
<template id="dialog-content">
  <form>
    <header class="forge-dialog__header">
      <div style="display: flex; flex-direction: row; align-items: center">
        <h2 style="flex: 1 1 0.0001px">Edit settings</h2>
        <forge-icon-button>
          <button 
            type="button" 
            aria-label="Close edit settings dialog" 
            class="tyler-icons">close</button>
        </forge-icon-button>
      </div>
    </header>
    <forge-divider></forge-divider>
    <section class="forge-dialog__body" style="width: 900px, max-height: 600px; display: flex; flex-direction: column;">
      <h3>Control information</h3>
      <!-- Control information fields -->
      <h3>Server information</h3>
      <!-- Server information fields -->
      <h3>Security settings</h3>
      <!-- Security setting fields -->
      <h3>Descriptions</h3>
      <!-- Descriptions fields -->
    </section>
    <forge-toolbar>
      <forge-button type="outlined" style="margin-right: 16px" slot="end">
        <button type="button">Cancel</button>
      </forge-button>
      <forge-button type="unelevated" style="margin-right: 16px" slot="end">
        <button type="submit">Submit</button> 
      </forge-button>
    </forge-toolbar>
  </form>
</template>
`;

export const DialogEditSettingsCodeTs = () => `
const dialog = document.createElement('forge-dialog');
const dialogTemplate = document.getElementById('dialog-content');
dialog.appendChild(dialogTemplate.content.cloneNode(true));
dialog.open = true; // This will append the dialog to the body automatically and start the open animation
`;

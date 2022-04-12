export const DialogStepperCodeHtml = () => `
<template id="dialog-content">
  <form>
    <!-- Stepper part of the dialog -->
    <!-- Hide this if the form is dirty and user tries to cancel-->
    <header class="forge-dialog__header">
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row; align-items: center">
          <h2 style="flex: 1 1 0.0001px">New service request</h2>
          <forge-icon-button>
            <button 
              type="button" 
              aria-label="Close service request dialog" 
              class="tyler-icons">close</button>
          </forge-icon-button>
        </div>
        <forge-stepper>
          <forge-step>Address</forge-step>
          <forge-step>Account</forge-step>
          <forge-step>Payment</forge-step>
          <forge-step>Terms</forge-step>
        </forge-stepper>
      </div>
    </header>
    <forge-divider></forge-divider>
    <section class="forge-dialog__body" style="width: 600px, max-height: 400px">
      <forge-view-switcher>
        <forge-view>
          <!-- place address fields here -->
        </forge-view>
        <forge-view>
          <!-- place account fields here -->
        </forge-view>
        <forge-view>
          <!-- place payment method here -->
        </forge-view>
        <forge-view>
          <!-- place terms of service here -->
        </forge-view>
      </forge-view-switcher>
    </section>
    <forge-toolbar>
      <forge-button type="unelevated" style="margin-right: 16px" slot="start">
        <button type="button">Previous</button>
      </forge-button>
      <forge-button type="outlined" style="margin-right: 16px" slot="end">
        <button type="button">Cancel</button>
      </forge-button>
      <forge-button type="unelevated" style="margin-right: 16px" slot="end">
        <button type="submit">Next</button> 
      </forge-button>
    </forge-toolbar>

    <!-- unsaved changes part of the dialog -->
    <!-- show this when form is dirty and user tries to cancel -->
    <header class="forge-dialog__header" forge-dialog-move-target>
      <h2>Discard request?</h2>
    </header>
    <section class="forge-dialog__body style="width: 600px; max-height: 400px;">
      About to cancel request for new service.
    </section>
    <forge-divider></forge-divider>
    <forge-toolbar>
      <forge-button type="outlined" style="margin-right: 16px" slot="end">
        <button type="button">Cancel</button>
      </forge-button>
      <forge-button type="unelevated" style="margin-right: 16px" slot="end">
        <button type="button">Discard</button>
      </forge-button>
    </forge-toolbar>

  </form>
</template>
`;

export const DialogStepperCodeTs = () => `
const dialog = document.createElement('forge-dialog');
const dialogTemplate = document.getElementById('dialog-content');
dialog.appendChild(dialogTemplate.content.cloneNode(true));
dialog.open = true; // This will append the dialog to the body automatically and start the open animation
`;
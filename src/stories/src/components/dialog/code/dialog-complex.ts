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

  <p id="dialog-message" class="forge-dialog__body" style="width: 500px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam, neque non varius egestas, nisi urna venenatis lacus, sit amet malesuada mauris urna et ex. Donec varius convallis egestas. Sed venenatis risus id euismod congue. Phasellus laoreet facilisis erat, ac auctor lectus euismod vitae. Vivamus a odio in turpis scelerisque venenatis. Etiam tempor vehicula ex vitae venenatis. Vivamus mollis erat leo. Etiam aliquet, erat a tempus tempor, lectus nunc viverra libero, a posuere tortor neque ultrices metus. Maecenas tristique rutrum nisi, sed porta metus venenatis vel.
  </p>

  <forge-toolbar>
    <forge-button variant="outlined" slot="end" style="margin-right: 16px" id="cancel-button">Cancel</forge-button>
    <forge-button variant="raised" slot="end" id="accept-button" forge-dialog-focus>Discard</forge-button>
  </forge-toolbar>
</template>
`;

export const DialogComplexCodeTs = () => `
IconRegistry.define(tylIconClose);

const dialog = document.createElement('forge-dialog');
dialog.setAttribute('aria-labelledby', 'dialog-title');
dialog.setAttribute('aria-describedby', 'dialog-message');

const dialogTemplate = document.getElementById('dialog-content');
dialog.appendChild(dialogTemplate.content.cloneNode(true));
document.body.appendChild(dialog);
dialog.open = true;
`;

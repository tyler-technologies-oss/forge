export const DialogSimpleCodeHtml = () => `
<template id="dialog-content">
  <header class="forge-dialog__header" forge-dialog-move-target>
    <h2 class="forge-dialog__title">Dialog header</h2>
  </header>
  <section class="forge-dialog__body">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt
    distinctio est praesentium. Sed saepe eius, voluptatibus officia dolores recusandae cum. Molestias est
    numquam odio.
  </section>
  <footer class="forge-dialog__footer">
    <forge-button type="outlined" style="margin-right: 16px">
      <button id="cancel-button">Cancel</button>
    </forge-button>
    <forge-button type="raised">
      <button id="accept-button" forge-dialog-focus>Submit</button>
    </forge-button>
  </footer>
</template>
`;

export const DialogSimpleCodeTs = () => `
const dialog = document.createElement('forge-dialog');
const dialogTemplate = document.getElementById('dialog-content');
dialog.appendChild(dialogTemplate.content.cloneNode(true));
dialog.open = true; // This will append the dialog to the body automatically and start the open animation
`;

export const DialogSimpleCodeBlazor = () => `
@inject ForgeDialog ForgeDialog

<ForgeDialogTemplate Identifier="dialog-content" Title="Dialog header">
  <BodyContent>
    <section class="forge-dialog__body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt
      distinctio est praesentium. Sed saepe eius, voluptatibus officia dolores recusandae cum. Molestias est
      numquam odio.
    </section>
  </BodyContent>
<FooterContent>
    <ForgeButton ButtonType="@ButtonType.Outlined" OnClickCallback="@((args) => ForgeDialog.CloseDialog())" Style="margin-right: 16px;">Cancel</ForgeButton>
    <ForgeButton ButtonType="@ButtonType.Raised" OnClickCallback="@((args) => ForgeDialog.CloseDialog())">Submit</ForgeButton>
</FooterContent>
</ForgeDialogTemplate>

@code {
  void OpenDialog() {
    ForgeDialog.OpenDialog("dialog-content");
  }
}
`;

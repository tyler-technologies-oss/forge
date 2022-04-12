export const ScaffoldDialogHtml = () => `
<template id="dialog-content">
  <forge-scaffold>
    <header slot="header" class="forge-dialog__header" forge-dialog-move-target>
      <h2 class="forge-dialog__title">Scaffold header</h2>
    </header>
    <section slot="body" class="forge-dialog__body">
      Scaffold body
    </section>
    <footer slot="footer" class="forge-dialog__footer">
      <forge-button type="raised">
        <button forge-dialog-focus>Scaffold footer</button>
      </forge-button>
    </footer>
  </forge-scaffold>
</template>
`;

export const ScaffoldDialogBlazor = () => `
<ForgeDialogTemplate Identifier="dialog-content" Title="Dialog header">
  <ForgeScaffold class="forge-scaffold-example" style="--forge-scaffold-height: 500px; --forge-scaffold-width: 100%;">
    <header slot="header" class="forge-dialog__header" forge-dialog-move-target>
      <h2 class="forge-dialog__title">Scaffold header</h2>
    </header>
    <section slot="body" class="forge-dialog__body">
      Scaffold body
    </section>
    <footer slot="footer" class="forge-dialog__footer">
      <ForgeButton ButtonType="@ButtonType.Raised">
        <button forge-dialog-focus>Scaffold footer</button>
      </ForgeButton>
    </footer>
  </ForgeScaffold>
</ForgeDialogTemplate>
`;
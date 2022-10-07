export const BottomSheetDefaultHtml = () => `
<template id="bottom-sheet-content">
  <header class="forge-dialog__header">
    <h2 class="forge-dialog__title">Bottom sheet header</h2>
  </header>
  <section class="forge-dialog__body forge-bottom-sheet__body">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt
    distinctio est praesentium. Sed saepe eius, voluptatibus officia dolores recusandae cum. Molestias est
    numquam odio.
  </section>
  <footer class="forge-dialog__footer">
    <forge-button type="raised">
      <button id="cancel-button">Close</button>
    </forge-button>
  </footer>
</template>
`;

export const BottomSheetDefaultTs = () => `
const bottomSheet = document.createElement('forge-bottom-sheet');
const bottomSheetTemplate = document.getElementById('bottom-sheet-content');
bottomSheet.appendChild(bottomSheetTemplate.content.cloneNode(true));
bottomSheet.open = true; // This will append the bottom sheet to the body automatically and start the open animation
`;

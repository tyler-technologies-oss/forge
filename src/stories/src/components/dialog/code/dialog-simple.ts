export const DialogSimpleCodeHtml = () => `
<forge-button variant="raised" id="my-button">Show dialog</forge-button>

<forge-dialog id="my-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-message">
  <header class="forge-dialog__header" forge-dialog-move-target>
    <h2 id="dialog-title" class="forge-dialog__title">Dialog header</h2>
  </header>

  <p id="dialog-message" class="forge-dialog__body">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam perspiciatis ea laboriosam alias quas incidunt
    distinctio est praesentium. Sed saepe eius, voluptatibus officia dolores recusandae cum. Molestias est
    numquam odio.
  </p>

  <footer class="forge-dialog__footer">
    <forge-button variant="raised" id="cancel-button">Close</forge-button>
  </footer>
</template>
`;

export const DialogSimpleCodeTs = () => `
const dialog = document.getElementById('my-dialog');
const button = document.getElementById('my-button');
button.addEventListener('click', () => dialog.open = true);
`;

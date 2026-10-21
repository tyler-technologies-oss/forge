import { ToastComponent } from "@tylertech/forge/toast";
const popover = document.querySelector("forge-popover");
const input = popover?.querySelector('input[name="your-name"]');
const [cancelButton, saveButton] = popover ? Array.from(popover.querySelectorAll('forge-toolbar[slot="footer"] forge-button')) : [];
function handleInput() {
  if (saveButton) {
    saveButton.disabled = !input?.value;
  }
}
function close() {
  if (input) {
    input.value = "";
  }
  if (saveButton) {
    saveButton.disabled = true;
  }
  if (popover) {
    popover.open = false;
  }
}
function save() {
  if (input?.value) {
    ToastComponent.present({ message: `Hello, ${input.value}!` });
  }
  close();
}
input?.addEventListener("input", handleInput);
cancelButton?.addEventListener("click", close);
saveButton?.addEventListener("click", save);
popover?.addEventListener("forge-popover-beforetoggle", (event) => {
  const { detail } = event;
  if (detail.newState === "closed" && input?.value) {
    event.preventDefault();
    ToastComponent.present({ message: "You have unsaved changes." });
  }
});

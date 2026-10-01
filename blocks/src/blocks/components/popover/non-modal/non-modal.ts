import type { IPopoverComponent, IPopoverToggleEventData } from '@tylertech/forge/popover';
import type { IButtonComponent } from '@tylertech/forge/button';
import { ToastComponent } from '@tylertech/forge/toast';

const popover = document.querySelector<IPopoverComponent>('forge-popover');
const input = popover?.querySelector<HTMLInputElement>('input[name="your-name"]');
const [cancelButton, saveButton] = popover
  ? Array.from(popover.querySelectorAll<IButtonComponent>('forge-toolbar[slot="footer"] forge-button'))
  : [];

function handleInput(): void {
  if (saveButton) {
    saveButton.disabled = !input?.value;
  }
}

function close(): void {
  if (input) {
    input.value = '';
  }
  if (saveButton) {
    saveButton.disabled = true;
  }
  if (popover) {
    popover.open = false;
  }
}

function save(): void {
  if (input?.value) {
    ToastComponent.present({ message: `Hello, ${input.value}!` });
  }
  close();
}

input?.addEventListener('input', handleInput);
cancelButton?.addEventListener('click', close);
saveButton?.addEventListener('click', save);
popover?.addEventListener('forge-popover-beforetoggle', event => {
  const { detail } = event as CustomEvent<IPopoverToggleEventData>;
  if (detail.newState === 'closed' && input?.value) {
    event.preventDefault();
    ToastComponent.present({ message: 'You have unsaved changes.' });
  }
});

import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/toast';
import './toast.scss';
import { ToastPlacement, ToastComponent } from '@tylertech/forge/toast';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

const optMessageInput = document.querySelector('#opt-toast-message') as HTMLInputElement;

const optActionTextInput = document.querySelector('#opt-toast-action-text') as HTMLInputElement;
optActionTextInput.addEventListener('input', () => {
  inlineToast.actionText = optActionTextInput.value;
});

const optDismissibleToggle = document.querySelector('#opt-toast-dismissible') as ISwitchComponent;
optDismissibleToggle.addEventListener('change', () => {
  inlineToast.dismissible = optDismissibleToggle.on;
});

const optDurationInput = document.querySelector('#opt-toast-duration') as HTMLInputElement;
optDurationInput.addEventListener('input', () => {
  inlineToast.duration = optDurationInput.value ? +optDurationInput.value : undefined;
});

const optPlacementSelect = document.querySelector('#opt-toast-placement') as ISelectComponent;
optPlacementSelect.addEventListener('change', ({ detail }) => {
  inlineToast.placement = detail as ToastPlacement;
});

const optThemeSelect = document.querySelector('#opt-toast-theme') as ISelectComponent;
optThemeSelect.addEventListener('change', ({ detail }) => {
  inlineToast.theme = detail;
});

const dynamicButton = document.querySelector('#show-toast-button') as HTMLButtonElement;
dynamicButton.addEventListener('click', () => {
  const toast = ToastComponent.present({
    message: optMessageInput.value,
    actionText: optActionTextInput.value,
    duration: optDurationInput.value ? +optDurationInput.value : undefined,
    placement: optPlacementSelect.value as ToastPlacement,
    dismissible: optDismissibleToggle.on,
    theme: optThemeSelect.value
  });

  if (optActionTextInput.value) {
    toast.addEventListener('forge-toast-action', () => {
      console.log('[toast] Action button clicked.');
      toast.hide();
    });
  }

  toast.addEventListener('forge-toast-close', () => console.log('[toast] Closed.'));
});

const inlineToast = document.querySelector('#inline-toast') as ToastComponent;
const inlineButton = document.querySelector('#show-inline-toast-button') as HTMLButtonElement;
inlineButton.addEventListener('click', () => {
  inlineToast.open = !inlineToast.open;
});

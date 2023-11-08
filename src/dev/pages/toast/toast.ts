import '$src/shared';
import type { ISelectComponent, ISwitchComponent, IToastComponent } from '@tylertech/forge';
import '@tylertech/forge/button';
import '@tylertech/forge/toast';
import './toast.scss';

const optMessageInput = document.querySelector('#opt-toast-message') as HTMLInputElement;
const optActionTextInput = document.querySelector('#opt-toast-action-text') as HTMLInputElement;
const optDurationInput = document.querySelector('#opt-toast-duration') as HTMLInputElement;
const optHorizMarginInput = document.querySelector('#opt-toast-horiz-margin') as HTMLInputElement;
const optVertMarginInput = document.querySelector('#opt-toast-vert-margin') as HTMLInputElement;
const optPlacementSelect = document.querySelector('#opt-toast-placement') as ISelectComponent;
const optCloseToggle = document.querySelector('#opt-toast-close') as ISwitchComponent;
const optBuilderToggle = document.querySelector('#opt-toast-builder') as ISwitchComponent;

const DEFAULT_MARGIN = 24;

const button = document.querySelector('#show-toast-button') as HTMLButtonElement;
button.addEventListener('click', () => {
  showToast();
});

optPlacementSelect.addEventListener('change', () => onPlacementChanged());
onPlacementChanged();

function showToast(): void {
  const toast = document.createElement('forge-toast');
  toast.message = optMessageInput.value;
  toast.actionText = optActionTextInput.value;
  toast.placement = optPlacementSelect.value;
  toast.showClose = optCloseToggle.selected;
  applyCustomStyleOverrides(toast);

  if (optBuilderToggle.selected) {
    toast.builder = () => {
      const container = document.createElement('div');
      container.classList.add('custom-toast');

      const left = document.createElement('div');
      left.textContent = 'Custom template!';
      container.appendChild(left);

      const right = document.createElement('div');
      right.textContent = '400px wide';
      container.appendChild(right);

      return container;
    };
  }

  if (optDurationInput.value) {
    toast.duration = +optDurationInput.value;
  }

  const actionHandler = (): void => {
    console.log('[toast] Action button clicked.');
    toast.hide();
  };
  if (optActionTextInput.value) {
    toast.addEventListener('forge-toast-action', actionHandler);
  }

  const closeHandler = (): void => {
    console.log('[toast] Closed.');
    if (actionHandler) {
      toast.removeEventListener('action', actionHandler);
    }
    toast.removeEventListener('forge-toast-close', closeHandler);
  };
  toast.addEventListener('forge-toast-close', closeHandler);

  document.body.appendChild(toast);
}


function applyCustomStyleOverrides(toast: IToastComponent): void {
  if (optHorizMarginInput.value || optVertMarginInput.value) {
    if (optPlacementSelect.value === 'bottom') {
      toast.style.setProperty('--forge-toast-bottom-margin-bottom', (optVertMarginInput.value || '0') + 'px');
      return;
    }

    if (optPlacementSelect.value === 'top') {
      toast.style.setProperty('--forge-toast-top-margin-top', (optVertMarginInput.value || '0') + 'px');
      return;
    }

    if (optPlacementSelect.value.includes('bottom')) {
      if (optPlacementSelect.value.includes('end')) {
        toast.style.setProperty('--forge-toast-bottom-right-margin-right', (optHorizMarginInput.value || DEFAULT_MARGIN) + 'px');
        toast.style.setProperty('--forge-toast-bottom-right-margin-bottom', (optVertMarginInput.value || DEFAULT_MARGIN) + 'px');
      } else {
        toast.style.setProperty('--forge-toast-bottom-left-margin-left', (optHorizMarginInput.value || DEFAULT_MARGIN) + 'px');
        toast.style.setProperty('--forge-toast-bottom-left-margin-bottom', (optVertMarginInput.value || DEFAULT_MARGIN) + 'px');
      }
    } else {
      if (optPlacementSelect.value.includes('end')) {
        toast.style.setProperty('--forge-toast-top-right-margin-right', (optHorizMarginInput.value || DEFAULT_MARGIN) + 'px');
        toast.style.setProperty('--forge-toast-top-right-margin-top', (optVertMarginInput.value || DEFAULT_MARGIN) + 'px');
      } else {
        toast.style.setProperty('--forge-toast-top-left-margin-left', (optHorizMarginInput.value || DEFAULT_MARGIN) + 'px');
        toast.style.setProperty('--forge-toast-top-left-margin-top', (optVertMarginInput.value || DEFAULT_MARGIN) + 'px');
      }
    }
  }
}

function onPlacementChanged(): void {
  if (optPlacementSelect.value === 'bottom' || optPlacementSelect.value === 'top') {
    optHorizMarginInput.disabled = true;
  } else {
    optHorizMarginInput.disabled = false;
  }
}

import '$src/shared';
import '@tylertech/forge/secret';
import '@tylertech/forge/secret/forge-secret.scss';
import type { SelectComponent } from '@tylertech/forge/select';
import type { SwitchComponent } from '@tylertech/forge/switch';

import './secret.scss';

const secrets = document.querySelectorAll('forge-secret');

const variantSelect = document.getElementById('opt-variant') as SelectComponent;
const maskInput = document.getElementById('opt-mask') as HTMLInputElement;
const maskCharacterInput = document.getElementById('opt-mask-character') as HTMLInputElement;
const allowInput = document.getElementById('opt-allow') as HTMLInputElement;
const buttonPositionSelect = document.getElementById('opt-button-position') as SelectComponent;
const showOnHoverSwitch = document.getElementById('opt-show-on-hover') as SwitchComponent;

// Variant select
if (variantSelect) {
  variantSelect.addEventListener('change', () => {
    secrets.forEach(secret => {
      secret.variant = variantSelect.value as 'blur' | 'dots';
    });
  });
}

// Mask input
if (maskInput) {
  maskInput.addEventListener('input', () => {
    secrets.forEach(secret => {
      secret.mask = maskInput.value;
    });
  });
}

// Mask character input
if (maskCharacterInput) {
  maskCharacterInput.addEventListener('input', () => {
    secrets.forEach(secret => {
      secret.maskCharacter = maskCharacterInput.value;
    });
  });
}

// Allow input
if (allowInput) {
  allowInput.addEventListener('input', () => {
    secrets.forEach(secret => {
      secret.allow = allowInput.value;
    });
  });
}

// Button position select
if (buttonPositionSelect) {
  buttonPositionSelect.addEventListener('change', () => {
    secrets.forEach(secret => {
      secret.buttonPosition = buttonPositionSelect.value as 'start' | 'end';
    });
  });
}

// Show on hover switch
if (showOnHoverSwitch) {
  showOnHoverSwitch.addEventListener('forge-switch-change', () => {
    secrets.forEach(secret => {
      secret.showOnHover = showOnHoverSwitch.checked;
    });
  });
}

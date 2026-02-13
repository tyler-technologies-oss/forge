import '$src/shared';
import '@tylertech/forge/secret';
import '@tylertech/forge/secret/forge-secret.scss';
import '@tylertech/forge/button';
import { tylIconEye, tylIconEyeOff } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge/icon';
import type { SecretComponent } from '@tylertech/forge/secret';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { ISelectComponent } from '@tylertech/forge/select';

import './secret.scss';

IconRegistry.define([tylIconEye, tylIconEyeOff]);

// Get the main demo secret element
const demoSecret = document.getElementById('demo-secret') as SecretComponent;

// Get option controls
const visibleSwitch = document.getElementById('opt-visible') as ISwitchComponent;
const iconSwitch = document.getElementById('opt-icon') as ISwitchComponent;
const showOnHoverSwitch = document.getElementById('opt-show-on-hover') as ISwitchComponent;
const noLabelSwitch = document.getElementById('opt-no-label') as ISwitchComponent;
const nameInput = document.getElementById('opt-name') as HTMLInputElement;
const variantSelect = document.getElementById('opt-variant') as ISelectComponent;

// Connect option controls to demo element
if (demoSecret) {
  // Visible switch
  if (visibleSwitch) {
    visibleSwitch.addEventListener('forge-switch-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      demoSecret.visible = customEvent.detail.selected;
    });
  }

  // Icon switch
  if (iconSwitch) {
    iconSwitch.addEventListener('forge-switch-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      demoSecret.icon = customEvent.detail.selected;
    });
  }

  // Show on hover switch
  if (showOnHoverSwitch) {
    showOnHoverSwitch.addEventListener('forge-switch-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      demoSecret.showOnHover = customEvent.detail.selected;
    });
  }

  // No label switch
  if (noLabelSwitch) {
    noLabelSwitch.addEventListener('forge-switch-change', (e: Event) => {
      const customEvent = e as CustomEvent;
      demoSecret.noLabel = customEvent.detail.selected;
    });
  }

  // Name input
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      demoSecret.name = nameInput.value;
    });
  }

  // Variant select
  if (variantSelect) {
    variantSelect.addEventListener('change', () => {
      demoSecret.variant = variantSelect.value as 'blur' | 'dots';
    });
  }

  // Listen for changes from the secret component itself
  demoSecret.addEventListener('forge-secret-change', (e: Event) => {
    const customEvent = e as CustomEvent;
    if (visibleSwitch) {
      visibleSwitch.selected = customEvent.detail.visible;
    }
  });
}

// Programmatic control demo
const programmaticSecret = document.getElementById('programmatic-secret') as SecretComponent;
const toggleBtn = document.getElementById('toggle-btn');

if (programmaticSecret && toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    programmaticSecret.visible = !programmaticSecret.visible;
  });
}

import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconEyeOutline, tylIconEyeClosed } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconEyeOutline, tylIconEyeClosed]);

const secret = document.getElementById('css-only-block-secret');
const button = secret?.querySelector<HTMLElement>('.forge-secret__text-button');

button?.addEventListener('click', () => {
  if (!secret || !button) {
    return;
  }
  const isExpanded = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(isExpanded));

  secret.querySelector('.forge-secret__content')?.toggleAttribute('inert', !isExpanded);

  const icon = button.querySelector<HTMLElement & { name: string }>('forge-icon');
  if (icon) {
    icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
  }

  const label = button.querySelector('span');
  if (label) {
    label.textContent = isExpanded ? 'Hide' : 'Show';
  }
});

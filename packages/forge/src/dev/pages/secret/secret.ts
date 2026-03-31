import '$src/shared';
import '@tylertech/forge/secret';
import '@tylertech/forge/secret/forge-secret.scss';
import type { SelectComponent } from '@tylertech/forge/select';
import type { SwitchComponent } from '@tylertech/forge/switch';
import { SecretVariant } from '@tylertech/forge/secret';

import './secret.scss';

const secrets = document.querySelectorAll('forge-secret');
const cssOnlySecret = document.getElementById('css-only-secret');
const cssOnlySecretButton = cssOnlySecret?.querySelector('forge-icon-button');
const cssOnlyBlockSecret = document.getElementById('css-only-block-secret');
const cssOnlyBlockSecretButton = cssOnlyBlockSecret?.querySelector('forge-button');

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
      secret.variant = variantSelect.value as SecretVariant;
    });
    const variantClasses = ['forge-secret--blur', 'forge-secret--dots', 'forge-secret--noise'];
    [cssOnlySecret, cssOnlyBlockSecret].forEach(secret => {
      if (secret) {
        secret.classList.remove(...variantClasses);
        secret.classList.add(`forge-secret--${variantSelect.value}`);
      }
      if (variantSelect.value === 'dots') {
        const dots = document.createElement('span');
        dots.classList.add('forge-secret__dots');
        secret?.prepend(dots);
      } else {
        const dots = secret?.querySelector('.forge-secret__dots');
        if (dots) {
          secret?.removeChild(dots);
        }
      }
    });
    if (variantSelect.value === 'dots') {
      setCssSecretMasks();
    }
  });
}

// Mask input
if (maskInput) {
  maskInput.addEventListener('input', () => {
    secrets.forEach(secret => {
      secret.mask = maskInput.value;
    });
    setCssSecretMasks();
  });
}

// Mask character input
if (maskCharacterInput) {
  maskCharacterInput.addEventListener('input', () => {
    secrets.forEach(secret => {
      secret.maskCharacter = maskCharacterInput.value;
    });
    setCssSecretMasks();
  });
}

// Allow input
if (allowInput) {
  allowInput.addEventListener('input', () => {
    secrets.forEach(secret => {
      secret.allow = allowInput.value;
    });
    setCssSecretMasks();
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
    [cssOnlySecret, cssOnlyBlockSecret].forEach(secret => {
      if (secret) {
        secret.classList.toggle('forge-secret--show-on-hover', showOnHoverSwitch.checked);
      }
    });
  });
}

// CSS-only secret
if (cssOnlySecret && cssOnlySecretButton) {
  cssOnlySecretButton.addEventListener('click', () => {
    const isExpanded = cssOnlySecretButton.getAttribute('aria-expanded') !== 'true';
    cssOnlySecretButton.setAttribute('aria-expanded', isExpanded.toString());

    const content = cssOnlySecret.querySelector('.forge-secret__content');
    if (content) {
      content.toggleAttribute('inert', !isExpanded);
    }
    const icon = cssOnlySecretButton.querySelector('forge-icon');
    if (icon) {
      icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
    }
    const tooltip = cssOnlySecret.querySelector('forge-tooltip');
    if (tooltip) {
      tooltip.textContent = isExpanded ? 'Hide' : 'Show';
    }
  });
}

// CSS-only block secret
if (cssOnlyBlockSecret && cssOnlyBlockSecretButton) {
  cssOnlyBlockSecretButton.addEventListener('click', () => {
    const isExpanded = cssOnlyBlockSecretButton.getAttribute('aria-expanded') !== 'true';
    cssOnlyBlockSecretButton.setAttribute('aria-expanded', isExpanded.toString());

    const content = cssOnlyBlockSecret.querySelector('.forge-secret__content');
    if (content) {
      content.toggleAttribute('inert', !isExpanded);
    }
    const icon = cssOnlyBlockSecretButton.querySelector('forge-icon');
    if (icon) {
      icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
    }
    const span = cssOnlyBlockSecretButton.querySelector('span');
    if (span) {
      span.textContent = isExpanded ? 'Hide' : 'Show';
    }
  });
}

function setCssSecretMasks(): void {
  const mask = maskInput?.value || 'xxxxx';
  const maskCharacter = maskCharacterInput?.value || '';
  const allow = allowInput?.value || '';
  const regex = new RegExp(`[^${allow.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`, 'g');
  const value = mask.replace(regex, maskCharacter);

  [cssOnlySecret, cssOnlyBlockSecret].forEach(secret => {
    const dots = secret?.querySelector('.forge-secret__dots');
    if (dots) {
      dots.setAttribute('data-mask', value);
    }
  });
}

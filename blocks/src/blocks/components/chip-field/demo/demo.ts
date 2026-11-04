import type { IChipFieldComponent } from '@tylertech/forge/chip-field';

const chipField = document.querySelector('forge-chip-field') as IChipFieldComponent;

chipField?.addEventListener('forge-chip-field-member-added', ({ detail: name }) => {
  const chip = document.createElement('forge-chip');
  chip.setAttribute('slot', 'member');
  chip.type = 'field';
  chip.dense = true;
  chip.value = name;
  chip.textContent = name;

  chip.addEventListener('forge-chip-delete', () => {
    if (chip.disabled) {
      return;
    }
    chip.remove();
  });

  chipField.appendChild(chip);
});

chipField?.addEventListener('forge-chip-field-member-removed', ({ detail }) => {
  chipField.removeChild(detail);
});

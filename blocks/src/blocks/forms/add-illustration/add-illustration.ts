import type { IChipFieldComponent } from '@tylertech/forge/chip-field';
import type { IChipComponent } from '@tylertech/forge/chips';

const chipField = document.querySelector('forge-chip-field') as IChipFieldComponent;

function wireChipDelete(chip: IChipComponent): void {
  chip.addEventListener('forge-chip-delete', () => {
    if (chip.disabled) {
      return;
    }
    chip.remove();
  });
}

chipField?.querySelectorAll('forge-chip').forEach(wireChipDelete);

chipField?.addEventListener('forge-chip-field-member-added', ({ detail: name }) => {
  const chip = document.createElement('forge-chip');
  chip.setAttribute('slot', 'member');
  chip.type = 'input';
  chip.dense = true;
  chip.value = name;
  chip.textContent = name;

  wireChipDelete(chip);

  chipField.appendChild(chip);
});

chipField?.addEventListener('forge-chip-field-member-removed', ({ detail }) => {
  chipField.removeChild(detail);
});

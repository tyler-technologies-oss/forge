export const ChipFieldDefaultHtml = () => {
  return `
<forge-chip-field>
  <label slot="label" for="tag-input">Tags</label>
  <input type="text" id="tag-input" />
  <div slot="helper-text">Press enter to create a tag</div>
</forge-chip-field>
  `;
}

export const ChipFieldDefaultTs = () => {
  return `
function onMemberAdded(event) {
  const name = event.detail;
  const newChip = document.createElement('forge-chip');
  newChip.setAttribute('slot', 'member');
  newChip.setAttribute('type', 'field');
  newChip.setAttribute('dense', '');
  newChip.addEventListener('forge-chip-delete', onChipRemoveButtonClicked);
  newChip.value = name;
  newChip.textContent = name;

  chipField.appendChild(newChip);
}

function onMemberRemoved(event) {
  event.detail.remove();
}

function onChipRemoveButtonClicked (event) {
  event.target.remove();
}

chipField.addEventListener('forge-chip-field-member-added', onMemberAdded);
chipField.addEventListener('forge-chip-field-member-removed', onMemberRemoved);
  `;
}
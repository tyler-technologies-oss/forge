export const ButtonMenuCodeHtml = () => {
  return `<forge-menu>
  <forge-button>
    <button type="button">Open menu</button>
  </forge-button>
</forge-menu>`;
};

export const ButtonMenuCodeTs = () => {
  return `
  const options = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'view', label: 'View' }
];
menu.options = options;

const optionBuilder = (option: IMenuOption, listItem: IListItemComponent) => {
  if (hasLeadingIcon) {
    const iconEl = document.createElement('i');
    iconEl.slot = 'leading';
    iconEl.classList.add('tyler-icons');
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = 'assignment';
    listItem.appendChild(iconEl);  
  }
  const labelDiv = document.createElement('div');
  labelDiv.classList.add('forge-typography--body1');
  labelDiv.style.width = "140px";
  labelDiv.textContent = option.label !== undefined ? option.label : '';
  listItem.appendChild(labelDiv);   
  if (hasTrailingIcon) {
    const iconEl = document.createElement('i');
    iconEl.slot = "trailing";
    iconEl.classList.add('tyler-icons');
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = 'assignment';
    listItem.appendChild(iconEl);  
  } 
};
menu.optionBuilder = optionBuilder;
`;
};

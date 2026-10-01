document.addEventListener("forge-listbox-drop", ((event) => {
  const listbox = event.target;
  const target = event.detail.group ?? listbox;
  const { option, index } = event.detail;
  const elementAtIndex = target.children[index];
  if (elementAtIndex === option) {
    return;
  }
  option.parentElement?.removeChild(option);
  target.insertBefore(option, elementAtIndex);
}));

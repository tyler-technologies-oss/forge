export const FilePickerDefaultCodeHtml = () => {
  return `
<forge-file-picker>
  <span slot="primary">Drag files here or</span>
  <span slot="secondary">Secondary text here</span>
  <forge-button variant="outlined">Select files</forge-button>
  <span slot="helper-text">Helper text goes here</span>
</forge-file-picker>
  `;
};

export const FilePickerDefaultCodeTs = () => {
  return `
const filePicker = document.querySelector('forge-file-picker');
filePicker.addEventListener('forge-file-picker-change', evt => console.log(evt));
  `;
};

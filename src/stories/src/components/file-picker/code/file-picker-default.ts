export const FilePickerDefaultCodeHtml = () => {
  return `<forge-file-picker>
  <span slot="primary">Drag files here or</span>
  <span slot="secondary">Secondary text here</span>
  <forge-button type="outlined">
    <button type="button">Select files</button>
  </forge-button>
  <span slot="helper-text"></span>
</forge-file-picker>`;
};

export const FilePickerDefaultCodeTs = () => {
  return `const filePicker = document.querySelector('forge-file-picker');
filePicker.addEventListener('forge-file-picker-change', handler); // handle when file picker changes`;
};

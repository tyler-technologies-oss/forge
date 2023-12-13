export const FilePickerCompactCodeHtml = () => {
  return `
<forge-file-picker compact>
  <forge-button variant="outlined">Select files</forge-button>
</forge-file-picker>
  `;
};

export const FilePickerCompactCodeTs = () => {
  return `
const filePicker = document.querySelector('forge-file-picker');
filePicker.addEventListener('forge-file-picker-change', evt => console.log(evt));
  `;
};

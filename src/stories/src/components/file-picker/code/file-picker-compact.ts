export const FilePickerCompactCodeHtml = () => {
  return `<forge-file-picker compact>
  <forge-button type="outlined">
    <button type="button">Select files</button>
  </forge-button>
</forge-file-picker>`;
};

export const FilePickerCompactCodeTs = () => {
  return `const filePicker = document.querySelector('forge-file-picker');
filePicker.addEventListener('forge-file-picker-change', handler); // handle when file picker changes`;
};

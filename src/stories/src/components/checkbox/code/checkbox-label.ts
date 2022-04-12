export const CheckboxLabelCodeHtml = () => {
  return `
<forge-checkbox>
  <input type="checkbox" id="checkbox-field" checked />
  <label for="checkbox-field">Label</label>
</forge-checkbox>`;
};

export const CheckboxLabelCodeBlazor = () => {
  return `<ForgeCheckbox Label="Label" Checked="@true" />`;
};

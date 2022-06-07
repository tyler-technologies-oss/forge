export const SelectHelperTextHtml = () => `
<forge-select label="Food Group" required>
  <forge-option value="grains">Bread, Cereal, Rice, and Pasta</forge-option>
  <forge-option value="vegetables">Vegetables</forge-option>
  <forge-option value="fruit">Fruit</forge-option>
  <span slot="helper-text">Food group is required</span>
</forge-select>
`;

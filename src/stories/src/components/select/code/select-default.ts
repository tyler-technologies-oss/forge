export const SelectDefaultHtml = () => `
<forge-select value="fruit" label="Food group">
  <forge-option value="grains">Bread, Cereal, Rice, and Pasta</forge-option>
  <forge-option value="vegetables">Vegetables</forge-option>
  <forge-option value="fruit">Fruit</forge-option>
</forge-select>
`;

export const SelectDefaultBlazor = () => `
<ForgeSelect Value="fruit" Label="Food group" Options="MyOptions" />

@code {
  List<Option<string>> MyOptions { get; set; } = new List<Option<string>>()
  {
      new Option<string>() { Value = "grains", Label = "Bread, Cereal, Rice, and Pasta" },
      new Option<string>() { Value = "vegetables", Label = "Vegetables" },
      new Option<string>() { Value = "fruit", Label = "Fruit" }
  };
}
`;

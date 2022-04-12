export const SelectAlwaysFloatHtml = () => `
<forge-select label="Food Group" float-label-type="always">
  <forge-option value="grains">Bread, Cereal, Rice, and Pasta</forge-option>
  <forge-option value="vegetables">Vegetables</forge-option>
  <forge-option value="fruit">Fruit</forge-option>
</forge-select>
`;


export const SelectAlwaysFloatBlazor = () => `
<ForgeSelect Label="Food group" Options="MyOptions" FloatLabelType="@SelectFloatLabelType.Always" />

@code {
  List<Option<string>> MyOptions { get; set; } = new List<Option<string>>()
  {
      new Option<string>() { Value = "grains", Label = "Bread, Cereal, Rice, and Pasta" },
      new Option<string>() { Value = "vegetables", Label = "Vegetables" },
      new Option<string>() { Value = "fruit", Label = "Fruit" }
  };
}
`;

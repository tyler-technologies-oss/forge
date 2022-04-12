export const SelectRoomyHtml = () => `
<forge-select label="Food Group" density="roomy">
  <forge-option value="grains">Bread, Cereal, Rice, and Pasta</forge-option>
  <forge-option value="vegetables">Vegetables</forge-option>
  <forge-option value="fruit">Fruit</forge-option>
</forge-select>
`;

export const SelectRoomyBlazor = () => `
<ForgeSelect Label="Food group" Options="MyOptions" Density="@SelectDensityType.Roomy" />

@code {
  List<Option<string>> MyOptions { get; set; } = new List<Option<string>>()
  {
      new Option<string>() { Value = "grains", Label = "Bread, Cereal, Rice, and Pasta" },
      new Option<string>() { Value = "vegetables", Label = "Vegetables" },
      new Option<string>() { Value = "fruit", Label = "Fruit" }
  };
}
`;

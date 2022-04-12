export const SelectLeadingIconHtml = () => `
<forge-select label="State" value="maine">
  <i class="tyler-icons" slot="leading">place</i>
  <forge-option value="maine">Maine</forge-option>
  <forge-option value="texas">Texas</forge-option>
  <forge-option value="seattle">Seattle</forge-option>
</forge-select>
`;

export const SelectLeadingIconBlazor = () => `
<ForgeSelect Value="maine" Label="State" LeadingIcon="place" Options="MyOptions" />

@code {
  List<Option<string>> MyOptions { get; set; } = new List<Option<string>>()
  {
      new Option<string>() { Value = "maine", Label = "Maine" },
      new Option<string>() { Value = "texas", Label = "Texas" },
      new Option<string>() { Value = "Washington", Label = "Washington" }
  };
}
`;
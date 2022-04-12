export const ChipsActionCodeHtml = () => {
  return `<forge-chip-set type="action">
  <forge-chip>Small</forge-chip>
  <forge-chip>Medium</forge-chip>
  <forge-chip>Large</forge-chip>
</forge-chip-set>>`;
};

export const ChipsActionCodeBlazor = () => {
  return `<ForgeChipSet Type="@ChipType.Action">
  <ForgeChip Value="calendar">
    <ForgeIcon slot="leading" name="event"></ForgeIcon>
    Add to calendar
  </ForgeChip>
  <ForgeChip Value="bookmark">
    <ForgeIcon slot="leading" name="alarm"></ForgeIcon>
    Add to calendar
  </ForgeChip>
  <ForgeChip Value="alarm">
    <ForgeIcon slot="leading" name="alarm"></ForgeIcon>
    Set alarm
  </ForgeChip>
  <ForgeChip Value="directions">
    <ForgeIcon slot="leading" name="directions"></ForgeIcon>
    Get directions
  </ForgeChip>
</ForgeChipSet>`;
};

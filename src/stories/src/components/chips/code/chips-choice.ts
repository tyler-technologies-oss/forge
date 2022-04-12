export const ChipsChoiceCodeHtml = () => {
  return `<forge-chip-set type="choice">
  <forge-chip>Small</forge-chip>
  <forge-chip>Medium</forge-chip>
  <forge-chip>Large</forge-chip>
</forge-chip-set>`;
};

export const ChipsChoiceCodeBlazor = () => {
  return `<ForgeChipSet Type="@ChipType.Choice">
  <ForgeChip>Small</ForgeChip>
  <ForgeChip Selected="@true">Medium</ForgeChip>
  <ForgeChip>Large</ForgeChip>
</ForgeChipSet>`;
};

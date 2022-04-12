export const ChipsFilterCodeHtml = () => {
  return `<forge-chip-set type="filter">
  <forge-chip>Small</forge-chip>
  <forge-chip>Medium</forge-chip>
  <forge-chip>Large</forge-chip>
</forge-chip-set>`;
};

export const ChipsFilterCodeBlazor = () => {
  return `<ForgeChipSet Type="@ChipType.Filter">
  <ForgeChip Selected="@true">Tops</ForgeChip>
  <ForgeChip Selected="@true">Bottoms</ForgeChip>
  <ForgeChip>Shoes</ForgeChip>
  <ForgeChip>Accessories</ForgeChip>
</ForgeChipSet>`;
};

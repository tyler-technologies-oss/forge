export const ChipsInputCodeHtml = () => {
  return `<forge-chip-set type="input">
  <forge-chip>Small</forge-chip>
  <forge-chip>Medium</forge-chip>
  <forge-chip>Large</forge-chip>
</forge-chip-set>`;
};

export const ChipsInputCodeBlazor = () => {
  return `<ForgeChipSet Type="@ChipType.Input">
  <ForgeChip>
    <i class="tyler-icons" slot="leading">place</i>
    Falmouth
  </ForgeChip>
  <ForgeChip>
    <i class="tyler-icons" slot="leading">place</i>
    Yarmouth
  </ForgeChip>
  <ForgeChip>
    <i class="tyler-icons" slot="leading">place</i>
    Plano
  </ForgeChip>
  <ForgeChip>
    <i class="tyler-icons" slot="leading">place</i>
    Renton
  </ForgeChip>
</ForgeChipSet>`;
};

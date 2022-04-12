export const LabelValueIconCodeHtml = () => {
  return `<forge-label-value>
  <i class="tyler-icons" slot="icon">person</i>
  <span slot="label">Name</span>
  <span slot="value">John Doe</span>
</forge-label-value>`;
};

export const LabelValueIconCodeBlazor = () => {
  return `<ForgeLabelvalue Label="Name" Value="John Doe" Icon="person" />`;
};

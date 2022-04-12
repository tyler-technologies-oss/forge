export const ListLeadingAvatarCodeHtml = () => {
  return `<forge-list>
  <forge-list-item two-line="true">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <span slot="title">Dog Photos</span>
    <span slot="subtitle">9 Jan 2018</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
  <forge-list-item two-line="true">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <span slot="title">Cat Photos</span>
    <span slot="subtitle">22 Dec 2017</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
  <forge-divider></forge-divider>
  <forge-list-item two-line="true">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <span slot="title">Potatoes</span>
    <span slot="subtitle">30 Nov 2017</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
  <forge-list-item two-line="true">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <span slot="title">Carrots</span>
    <span slot="subtitle">17 Oct 2017</span>
    <i class="tyler-icons" slot="trailing">info</i>
  </forge-list-item>
</forge-list>`;
};

export const ListLeadingAvatarCodeBlazor = () => {
  return `<ForgeList>
  <ForgeListItem TwoLine="@true" TrailingIcon="info">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <LineOneContent>Dog Photos</LineOneContent>
    <LineTwoContent>9 Jan 2018</LineTwoContent>
  </ForgeListItem>
  <ForgeListItem TwoLine="@true" TrailingIcon="info">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <LineOneContent>Cat Photos</LineOneContent>
    <LineTwoContent>22 Dec 2017</LineTwoContent>
  </ForgeListItem>
  <ForgeDivider />
  <ForgeListItem TwoLine="@true" TrailingIcon="info">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <LineOneContent>Potatoes</LineOneContent>
    <LineTwoContent>30 Nov 2017</LineTwoContent>
  </ForgeListItem>
  <ForgeListItem TwoLine="@true" TrailingIcon="info">
    <i class="tyler-icons forge-list-item__avatar-icon" slot="avatar">folder</i>
    <LineOneContent>Carrots</LineOneContent>
    <LineTwoContent>17 Oct 2017</LineTwoContent>
  </ForgeListItem>
</ForgeList>`;
};

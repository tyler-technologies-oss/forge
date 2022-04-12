export const BadgeThemedDemoCodeHtml = () => {
  return `<forge-badge theme="danger">Danger</forge-badge>
<forge-badge theme="warning">Warning</forge-badge>
<forge-badge theme="success">Success</forge-badge>
<forge-badge theme="info-primary">Info (primary)</forge-badge>
<forge-badge theme="info-secondary">Info (secondary)</forge-badge>`;
};

export const BadgeThemedDemoCodeBlazor = () => {
  return `<ForgeBadge Theme="@Theme.Danger">Danger</ForgeBadge>
<ForgeBadge Theme="@Theme.Warning">Warning</ForgeBadge>
<ForgeBadge Theme="@Theme.Success">Success</ForgeBadge>
<ForgeBadge Theme="@Theme.InfoPrimary">Info (primary)</ForgeBadge>
<ForgeBadge Theme="@Theme.InfoSecondary">Info (secondary)</ForgeBadge>`;
};

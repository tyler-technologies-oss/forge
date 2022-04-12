export const SkeletonAppHtml = () => `
<div style="height: 750px;">
  <forge-scaffold stretch>
    <forge-app-bar slot="header" title-text="Skeleton"></forge-app-bar>
    <forge-drawer slot="body-left" style="padding-top: 8px;">
      <div>
        <forge-skeleton list-item></forge-skeleton>
        <forge-skeleton list-item></forge-skeleton>
        <forge-skeleton list-item></forge-skeleton>
      </div>
    </forge-drawer>
    <div slot="body" style="padding: 16px; background-color: var(--mdc-theme-background);">
      <forge-card>
        <forge-skeleton avatar></forge-skeleton>
        <forge-skeleton text></forge-skeleton>
        <forge-skeleton text></forge-skeleton>
        <forge-skeleton text style="width: 75%;"></forge-skeleton>
      </forge-card>
      <forge-card>
        <forge-skeleton text></forge-skeleton>
        <forge-skeleton text></forge-skeleton>
        <forge-skeleton text style="width: 75%;"></forge-skeleton>
      </forge-card>
      <forge-card>
        <forge-skeleton text></forge-skeleton>
        <forge-skeleton text></forge-skeleton>
        <forge-skeleton text style="width: 75%;"></forge-skeleton>
      </forge-card>
    </div>
  </forge-scaffold>
</div>
`;
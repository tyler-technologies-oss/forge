export const AccordionDefaultDemoCodeHtml = () => {
  return `<forge-accordion>
  <forge-expansion-panel>
    <div role="button" tabindex="0" slot="header">
      <div>Panel One</div>
      <forge-open-icon></forge-open-icon>
    </div>
    <div>Content for panel one.</div>
  </forge-expansion-panel>
  <forge-expansion-panel>
    <div role="button" tabindex="0" slot="header">
      <div>Panel Two</div>
      <forge-open-icon></forge-open-icon>
    </div>
    <div>Content for panel two.</div>
  </forge-expansion-panel>
  <forge-expansion-panel>
    <div role="button" tabindex="0" slot="header">
      <div>Panel Three</div>
      <forge-open-icon></forge-open-icon>
    </div>
    <div >Content for panel three.</div>
  </forge-expansion-panel>
</forge-accordion>`;
};
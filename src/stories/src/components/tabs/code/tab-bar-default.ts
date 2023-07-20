export const TabBarDefaultHtml = () => `
<forge-tab-bar active-tab="0">
  <forge-tab id="tab-1" aria-controls="tabpanel-1">Tab one</forge-tab>
  <forge-tab id="tab-2" aria-controls="tabpanel-2">Tab two</forge-tab>
  <forge-tab id="tab-3" aria-controls="tabpanel-3">Tab three</forge-tab>
  <forge-tab id="tab-4" aria-controls="tabpanel-4">Tab three</forge-tab>
  <forge-tab id="tab-5" aria-controls="tabpanel-5">Tab three</forge-tab>
</forge-tab-bar>

<div>
  <div id="tabpanel-1" role="tabpanel" aria-labelledby="tab-1">Content 1</div>
  <div id="tabpanel-2" role="tabpanel" aria-labelledby="tab-2">Content 2</div>
  <div id="tabpanel-3" role="tabpanel" aria-labelledby="tab-3">Content 3</div>
  <div id="tabpanel-4" role="tabpanel" aria-labelledby="tab-4">Content 4</div>
  <div id="tabpanel-5" role="tabpanel" aria-labelledby="tab-5">Content 5</div>
</div>
`;

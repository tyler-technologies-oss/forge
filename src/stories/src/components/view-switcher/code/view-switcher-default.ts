export const ViewSwitcherDefaultCodeHtml = () => `
<forge-tab-bar active-tab="0">
  <forge-tab id="tab-1" aria-controls="tabpanel-1">View one</forge-tab>
  <forge-tab id="tab-2" aria-controls="tabpanel-2">View two</forge-tab>
  <forge-tab id="tab-3" aria-controls="tabpanel-3">View three</forge-tab>
</forge-tab-bar>

<forge-view-switcher>
  <forge-view id="tabpanel-1" aria-labelledby="tab-1" role="tabpanel">
    <div>View one</div>
  </forge-view>
  <forge-view id="tabpanel-2" aria-labelledby="tab-2" role="tabpanel">
    <div style="height: 300px;">View two</div>
  </forge-view>
  <forge-view id="tabpanel-3" aria-labelledby="tab-3" role="tabpanel">
    <div style="height: 500px;">View three</div>
  </forge-view>
</forge-view-switcher>
`;

export const ViewSwitcherDefaultCodeTs = () => `
var example = document.getElementById('ViewSwitcher');
var viewSwitcherComponent = example.querySelector('forge-view-switcher');
var tabBarComponent = example.querySelector('forge-tab-bar');
var typeRadioGroup = example.querySelector('[role=radiogroup]');
var noneRadio = example.querySelector('#view-switcher-animation-type-none');
noneRadio.checked = true;

tabBarComponent.addEventListener('forge-tab-bar-change', ({ detail: tabIndex }) => {
    viewSwitcherComponent.index = tabIndex;
});

typeRadioGroup.addEventListener('change', evt => {
    viewSwitcherComponent.animationType = evt.target.value;
});
`;

export const ViewSwitcherDefaultCodeHtml = () => `
<div role="tablist">
  <forge-tab-bar underline>
    <forge-tab>View one</forge-tab>
    <forge-tab>View two</forge-tab>
    <forge-tab>View three</forge-tab>
  </forge-tab-bar>

  <forge-view-switcher>
    <forge-view role="tabpanel">
      <div>View one</div>
    </forge-view>
    <forge-view role="tabpanel">
      <div style="height: 300px;">View two</div>
    </forge-view>
    <forge-view role="tabpanel">
      <div style="height: 500px;">View three</div>
    </forge-view>
  </forge-view-switcher>
</div>`;

export const ViewSwitcherDefaultCodeTs = () => `
var example = document.getElementById('ViewSwitcher');
var viewSwitcherComponent = example.querySelector('forge-view-switcher');
var tabBarComponent = example.querySelector('forge-tab-bar');
var typeRadioGroup = example.querySelector('[role=radiogroup]');
var noneRadio = example.querySelector('#view-switcher-animation-type-none');
noneRadio.checked = true;

tabBarComponent.addEventListener('forge-tab-bar-activate', function(evt) {
    viewSwitcherComponent.index = evt.detail.index;
});

typeRadioGroup.addEventListener('change', function(evt) {
    viewSwitcherComponent.animationType = evt.target.value;
});
`;

export const ViewSwitcherDefaultCodeHtml = () => `
<div id="ViewSwitcher">
  <div role="tablist">
    <h4>Controlled by Tab Bar</h4>

    <forge-tab-bar>
      <forge-tab>View one</forge-tab>
      <forge-tab>View two</forge-tab>
      <forge-tab>View three</forge-tab>
    </forge-tab-bar>

    <forge-divider></forge-divider>

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
  </div>

  <div>
    <h4>Animation Type</h4>
    <div role="radiogroup" aria-label="Choose Animation Type">
      <forge-radio>
        <input type="radio" id="view-switcher-animation-type-none" name="view-switcher-animation-type" value="none">
        <label slot="label" for="view-switcher-animation-type-none">None</label>
      </forge-radio>
      <forge-radio>
        <input type="radio" id="view-switcher-animation-type-slide" name="view-switcher-animation-type" value="slide">
        <label slot="label" for="view-switcher-animation-type-slide">Slide</label>
      </forge-radio>
      <forge-radio>
        <input type="radio" id="view-switcher-animation-type-fade" name="view-switcher-animation-type" value="fade">
        <label slot="label" for="view-switcher-animation-type-fade">Fade</label>
      </forge-radio>
    </div>
  </div>
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

export const ViewSwitcherDefaultCodeBlazor = () => `
<div id="ViewSwitcher">
  <div role="tablist">
    <h4>Controlled by Tab Bar</h4>

    <ForgeTabBar ActiveTab="@ActiveTab" ActivateCallback="ActiveTabCallback">
      <ForgeTab>View one</ForgeTab>
      <ForgeTab>View two</ForgeTab>
      <ForgeTab>View three</ForgeTab>
    </ForgeTabBar>

    <ForgeDivider />

    <ForgeViewSwitcher Index="@ActiveTab">
      <ForgeView Role="tabpanel">
        <div>View one</div>
      </ForgeView>
      <ForgeView Role="tabpanel">
        <div style="height: 300px;">View two</div>
      </ForgeView>
      <ForgeView Role="tabpanel">
        <div style="height: 500px;">View three</div>
      </ForgeView>
    </ForgeViewSwitcher>
  </div>
</div>

@code {
  int ActiveTab { get; set; } = 0;

  void ActiveTabCallback(int tab)
  {
    ActiveTab = tab;
  }
}`;

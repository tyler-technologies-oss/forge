import{A as r,b as t}from"./iframe-ZebJRd2k.js";import{s as o,b as $,g as S}from"./utils-DYC_LATD.js";import{o as h}from"./style-map-CHYpaRMA.js";import{I as A,p as I,t as _}from"./tyler-icons-CvAFZSnF.js";import"./service-adapter-8tADcN_b.js";import"./tab-panel-C5fQ6vP_.js";const{action:y}=__STORYBOOK_MODULE_ACTIONS__,v="forge-tab-bar",p=y("forge-tab-bar-change"),u=y("forge-tab-activate");A.define([I,_]);const B={title:"Components/Tabs",render:e=>{const a={...$(e)};e.vertical?a["max-width"]="200px":e.scrollButtons&&(a["max-width"]="500px");const f=Object.entries(a).length?h(a):r,m=Array.from({length:e.scrollButtons?20:3}).map((T,d)=>t`<forge-tab>
          ${e.startIcon?t`<forge-icon slot="start" name="favorite"></forge-icon>`:r} Tab ${d+1}
          ${e.endIcon?t`<forge-icon slot="end" name="forge_logo"></forge-icon>`:r}
        </forge-tab>`);return t`
      <forge-tab-bar
        data-aria-label="Demo tabs"
        .disabled=${e.disabled}
        .activeTab=${e.activeTab}
        .vertical=${e.vertical}
        .clustered=${e.clustered}
        .stacked=${e.stacked}
        .inverted=${e.inverted}
        .autoActivate=${e.autoActivate}
        .scrollButtons=${e.scrollButtons}
        style=${f}
        @forge-tab-bar-change=${p}
        @forge-tab-activate=${u}>
        ${m}
      </forge-tab-bar>
    `},component:v,subcomponents:{Tab:"forge-tab",TabPanel:"forge-tab-panel"},argTypes:{...S({tagName:v,controls:{activeTab:{control:{type:"inline-radio"},options:[0,1,2]}}}),startIcon:{control:{type:"boolean"}},endIcon:{control:{type:"boolean"}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,activeTabName:"",vertical:!1,clustered:!1,stacked:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},n={},s={...o,args:{vertical:!0}},c={...o,args:{clustered:!0}},l={...o,args:{scrollButtons:!0}},i={...o,args:{startIcon:!0}},b={...o,args:{activeTabName:"tab-2"},render:e=>{const a={...$(e)};e.vertical?a["max-width"]="200px":e.scrollButtons&&(a["max-width"]="500px");const f=Object.entries(a).length?h(a):r,m=Array.from({length:e.scrollButtons?20:3}).map((T,d)=>t`<forge-tab name="tab-${d+1}">
          ${e.startIcon?t`<forge-icon slot="start" name="favorite"></forge-icon>`:r} Tab ${d+1}
          ${e.endIcon?t`<forge-icon slot="end" name="forge_logo"></forge-icon>`:r}
        </forge-tab>`);return t`
      <forge-tab-bar
        data-aria-label="Demo tabs"
        active-tab-name=${e.activeTabName}
        .disabled=${e.disabled}
        .vertical=${e.vertical}
        .clustered=${e.clustered}
        .stacked=${e.stacked}
        .inverted=${e.inverted}
        .autoActivate=${e.autoActivate}
        .scrollButtons=${e.scrollButtons}
        style=${f}
        @forge-tab-bar-change=${p}
        @forge-tab-activate=${u}>
        ${m}
      </forge-tab-bar>
    `}},g={...o,args:{activeTab:0},render:e=>t`
    <forge-tab-bar
      aria-label="Tabs with panels"
      .activeTab=${e.activeTab}
      .disabled=${e.disabled}
      .vertical=${e.vertical}
      .clustered=${e.clustered}
      .stacked=${e.stacked}
      .inverted=${e.inverted}
      .autoActivate=${e.autoActivate}
      @forge-tab-bar-change=${p}
      @forge-tab-activate=${u}>
      <forge-tab id="tab-home">Home</forge-tab>
      <forge-tab id="tab-profile">Profile</forge-tab>
      <forge-tab id="tab-settings">Settings</forge-tab>
    </forge-tab-bar>

    <forge-tab-panel for="tab-home">
      <p>Home panel</p>
    </forge-tab-panel>

    <forge-tab-panel for="tab-profile">
      <p>Profile panel</p>
    </forge-tab-panel>

    <forge-tab-panel for="tab-settings">
      <p>Settings panel</p>
    </forge-tab-panel>
  `};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
}`,...i.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    activeTabName: 'tab-2'
  },
  render: args => {
    const styles = {
      ...getCssVariableArgs(args)
    };
    if (args.vertical) {
      styles['max-width'] = '200px';
    } else if (args.scrollButtons) {
      styles['max-width'] = '500px';
    }
    const style = Object.entries(styles).length ? styleMap(styles) : nothing;
    const tabs = Array.from({
      length: args.scrollButtons ? 20 : 3
    }).map((_, i) => html\`<forge-tab name="tab-\${i + 1}">
          \${args.startIcon ? html\`<forge-icon slot="start" name="favorite"></forge-icon>\` : nothing} Tab \${i + 1}
          \${args.endIcon ? html\`<forge-icon slot="end" name="forge_logo"></forge-icon>\` : nothing}
        </forge-tab>\`);
    return html\`
      <forge-tab-bar
        data-aria-label="Demo tabs"
        active-tab-name=\${args.activeTabName}
        .disabled=\${args.disabled}
        .vertical=\${args.vertical}
        .clustered=\${args.clustered}
        .stacked=\${args.stacked}
        .inverted=\${args.inverted}
        .autoActivate=\${args.autoActivate}
        .scrollButtons=\${args.scrollButtons}
        style=\${style}
        @forge-tab-bar-change=\${changeAction}
        @forge-tab-activate=\${activateAction}>
        \${tabs}
      </forge-tab-bar>
    \`;
  }
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    activeTab: 0
  },
  render: args => html\`
    <forge-tab-bar
      aria-label="Tabs with panels"
      .activeTab=\${args.activeTab}
      .disabled=\${args.disabled}
      .vertical=\${args.vertical}
      .clustered=\${args.clustered}
      .stacked=\${args.stacked}
      .inverted=\${args.inverted}
      .autoActivate=\${args.autoActivate}
      @forge-tab-bar-change=\${changeAction}
      @forge-tab-activate=\${activateAction}>
      <forge-tab id="tab-home">Home</forge-tab>
      <forge-tab id="tab-profile">Profile</forge-tab>
      <forge-tab id="tab-settings">Settings</forge-tab>
    </forge-tab-bar>

    <forge-tab-panel for="tab-home">
      <p>Home panel</p>
    </forge-tab-panel>

    <forge-tab-panel for="tab-profile">
      <p>Profile panel</p>
    </forge-tab-panel>

    <forge-tab-panel for="tab-settings">
      <p>Settings panel</p>
    </forge-tab-panel>
  \`
}`,...g.parameters?.docs?.source}}};const P=["Demo","Vertical","Clustered","Scrolling","WithIcons","NamedTabs","WithPanels"],D=Object.freeze(Object.defineProperty({__proto__:null,Clustered:c,Demo:n,NamedTabs:b,Scrolling:l,Vertical:s,WithIcons:i,WithPanels:g,__namedExportsOrder:P,default:B},Symbol.toStringTag,{value:"Module"}));export{c as C,n as D,l as S,D as T,s as V,i as W,g as a};

import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-B8S20_VI.js";import{_ as a,l as o,m as s,s as c}from"./utils-BifgMLEM.js";import{o as l,t as u}from"./icon-BDzt98o-.js";import{K as d,Q as f,t as p}from"./tyler-icons-CLXzO0Q_.js";import{r as m,t as h}from"./style-map-C_WKUe4Y.js";import{n as g,t as _}from"./tab-panel-NN8-jRdx.js";var v=t({Clustered:()=>E,Demo:()=>w,NamedTabs:()=>k,Scrolling:()=>D,Vertical:()=>T,WithIcons:()=>O,WithPanels:()=>A,__namedExportsOrder:()=>j,default:()=>C}),y,b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{i(),s(),h(),p(),u(),g(),_(),{action:y}=__STORYBOOK_MODULE_ACTIONS__,b=`forge-tab-bar`,x=y(`forge-tab-bar-change`),S=y(`forge-tab-activate`),l.define([d,f]),C={title:`Components/Tabs`,render:e=>{let t={...o(e)};e.vertical?t[`max-width`]=`200px`:e.scrollButtons&&(t[`max-width`]=`500px`);let i=Object.entries(t).length?m(t):r,a=Array.from({length:e.scrollButtons?20:3}).map((t,i)=>n`<forge-tab>
          ${e.startIcon?n`<forge-icon slot="start" name="favorite"></forge-icon>`:r} Tab ${i+1}
          ${e.endIcon?n`<forge-icon slot="end" name="forge_logo"></forge-icon>`:r}
        </forge-tab>`);return n`
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
        style=${i}
        @forge-tab-bar-change=${x}
        @forge-tab-activate=${S}>
        ${a}
      </forge-tab-bar>
    `},component:b,subcomponents:{Tab:`forge-tab`,TabPanel:`forge-tab-panel`},argTypes:{...c({tagName:b,controls:{activeTab:{control:{type:`inline-radio`},options:[0,1,2]}}}),startIcon:{control:{type:`boolean`}},endIcon:{control:{type:`boolean`}}},args:{startIcon:!1,endIcon:!1,disabled:!1,activeTab:0,activeTabName:``,vertical:!1,clustered:!1,stacked:!1,inverted:!1,autoActivate:!1,scrollButtons:!1}},w={},T={...a,args:{vertical:!0}},E={...a,args:{clustered:!0}},D={...a,args:{scrollButtons:!0}},O={...a,args:{startIcon:!0}},k={...a,args:{activeTabName:`tab-2`},render:e=>{let t={...o(e)};e.vertical?t[`max-width`]=`200px`:e.scrollButtons&&(t[`max-width`]=`500px`);let i=Object.entries(t).length?m(t):r,a=Array.from({length:e.scrollButtons?20:3}).map((t,i)=>n`<forge-tab name="tab-${i+1}">
          ${e.startIcon?n`<forge-icon slot="start" name="favorite"></forge-icon>`:r} Tab ${i+1}
          ${e.endIcon?n`<forge-icon slot="end" name="forge_logo"></forge-icon>`:r}
        </forge-tab>`);return n`
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
        style=${i}
        @forge-tab-bar-change=${x}
        @forge-tab-activate=${S}>
        ${a}
      </forge-tab-bar>
    `}},A={...a,args:{activeTab:0},render:e=>n`
    <forge-tab-bar
      aria-label="Tabs with panels"
      .activeTab=${e.activeTab}
      .disabled=${e.disabled}
      .vertical=${e.vertical}
      .clustered=${e.clustered}
      .stacked=${e.stacked}
      .inverted=${e.inverted}
      .autoActivate=${e.autoActivate}
      @forge-tab-bar-change=${x}
      @forge-tab-activate=${S}>
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
  `},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    vertical: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    clustered: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    scrollButtons: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    startIcon: true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j=[`Demo`,`Vertical`,`Clustered`,`Scrolling`,`WithIcons`,`NamedTabs`,`WithPanels`]})))()}export{T as a,M as c,v as i,w as n,O as o,D as r,A as s,E as t};
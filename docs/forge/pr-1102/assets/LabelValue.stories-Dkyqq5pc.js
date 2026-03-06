import{A as p,b as r}from"./iframe-HlIX8nsI.js";import{s as c,b as g,g as b}from"./utils-DhPatzMP.js";import{o as u}from"./style-map-CJVXeR4e.js";import{e as y}from"./class-map-knFPscsf.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CBMW7RFg.js";import"./expansion-panel-DExwsoGT.js";import"./open-icon-C_jTwCsD.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-DxXsoE2G.js";import{I as h,e as S}from"./tyler-icons-B1nAV5VC.js";import"./menu-MzeWWlwh.js";import"./linear-progress-Buvtsnzw.js";import"./list-2JCez8nQ.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./skeleton-D4yo0sfy.js";import"./avatar-CrzMonA2.js";import"./icon-button-kXhWo8t5.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";import"./autocomplete-Czj5S6PY.js";import"./label-YoDu1hYe.js";import"./button-C32nRzKT.js";import"./button-toggle-group-C7Z2oquR.js";import"./checkbox-IEt9rg4t.js";import"./switch-D4m-nLTp.js";import"./base-field-BqEaAztZ.js";import"./text-field-DXuIdBiY.js";import"./backdrop-oZnGSNKb.js";import"./badge-LpmmrA1A.js";import"./banner-DupgT2z3.js";import"./bottom-sheet-DDpnIaAl.js";import"./dialog-DnEdA4Zv.js";import"./button-area-Ddf19vd3.js";import"./calendar-TwY79W32.js";import"./card-C7PNSpyL.js";import"./chip-set-BvTqyg0d.js";import"./circular-progress-Ci4eSBMs.js";import"./color-picker-DFZyEYD_.js";import"./date-picker-DknlIXOx.js";import"./date-range-picker-DZ0leqKH.js";import"./divider-DhuFTWtL.js";import"./base-drawer-BE-Z-VKe.js";import"./drawer-CndaJZ5M.js";import"./modal-drawer-DJtc-YF3.js";import"./mini-drawer-DMU3MkON.js";import"./file-picker-C0wjiPhr.js";import"./floating-action-button-Dk4mhfjj.js";import"./inline-message-Bx3TFYuF.js";import"./key-item-BU2PeOPu.js";import"./keyboard-shortcut-IvUA1BNM.js";import"./label-value-DtSG8whe.js";import"./meter-group-BdQhAZGc.js";import"./page-state-DMYoHkwa.js";import"./paginator-BjUu2Kjj.js";import"./scaffold-WBY1Y1UI.js";import"./select-dropdown-Dc74TJVJ.js";import"./select-L2jk2k8L.js";import"./skip-link-DULI9kyH.js";import"./slider-EpYFEqG1.js";import"./split-view-CjQMwypy.js";import"./stack-RxD7iAYA.js";import"./stepper-GLJ5WlKI.js";import"./table-BSsJe38T.js";import"./tab-bar-CVa5ae4Z.js";import"./time-picker-B4NDrZYV.js";import"./toast-DqATFgpj.js";import"./toolbar-DZNz2UmX.js";import"./tooltip-CfnSp6nA.js";import"./tree-item-BfR1VjFc.js";import"./view-switcher-RGGrHK6Y.js";import"./deprecated-icon-button-WXraiasE.js";import"./split-button-O04zwv9R.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...c,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":o})} style=${v}>
        ${d?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:p}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":o?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
      </div>
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconPerson]);
    return html\`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    withIcon: false
  },
  render: ({
    inline,
    empty,
    ellipsis,
    withIcon,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args) ?? {};
    if (ellipsis) {
      cssVarArgs.maxWidth = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-label-value': true,
      'forge-label-value--inline': inline,
      'forge-label-value--empty': empty,
      'forge-label-value--ellipsis': ellipsis
    };
    return html\`
      <div class=\${classMap(classes)} style=\${style}>
        \${withIcon ? html\`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>\` : nothing}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> \${empty ? 'n/a' : ellipsis ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' : 'Active'} </span>
      </div>
    \`;
  }
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],We=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,We as L,l as a};

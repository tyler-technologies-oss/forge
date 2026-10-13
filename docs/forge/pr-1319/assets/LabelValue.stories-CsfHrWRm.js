import{A as n,b as r}from"./iframe-CfOLmNdo.js";import{s as c,b as g,g as b}from"./utils-BGdtyhdL.js";import{o as u}from"./style-map-Cqz7JYTW.js";import{e as y}from"./class-map-CNinm4lY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CHNM-iPB.js";import"./app-bar-menu-button-DR--0NQy.js";import"./app-bar-profile-button-iajHwjgT.js";import{I as h}from"./icon-CBhfd-3H.js";import"./menu-DsItPlMQ.js";import{i as S}from"./tyler-icons-Bg2kTxF-.js";import"./linear-progress-BuMeIIdZ.js";import"./list-CSkMbkO6.js";import"./popover-SQPenc0O.js";import"./overlay-ByK8Mow1.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CWIxuxVs.js";import"./list-item-BOvnL-I1.js";import"./avatar-C1AGOko9.js";import"./icon-button-DzuMMbE4.js";import"./autocomplete-nTqWBiaJ.js";import"./label-B1uxh5FL.js";import"./base-field-BObqKNNc.js";import"./focus-indicator--smaJyaa.js";import"./text-field-BC_WUwPA.js";import"./backdrop-ngk7d2eo.js";import"./badge-DBnshEW7.js";import"./banner-DEJboZy9.js";import"./bottom-sheet-C1iFCImm.js";import"./dialog-BKd6LGgB.js";import"./breadcrumb-overflow-menu-COzkIx7k.js";import"./button-area-BwC_Kkbx.js";import"./button-toggle-group-Ct0ww6ZU.js";import"./button-COy1ZAqx.js";import"./calendar-CqusHqSC.js";import"./card-DUkTyMO5.js";import"./checkbox-l7kbnJnB.js";import"./chip-set-DNK3boyA.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DUi5VXuf.js";import"./date-picker-Dt6zb0Hi.js";import"./date-range-picker-x2Cxu88s.js";import"./divider-D_mtm3YG.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BuXdGYcK.js";import"./open-icon-DcrpkyVc.js";import"./file-picker-DnA6NjHR.js";import"./floating-action-button-COwCK-JF.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-C3FW3od4.js";import"./key-item-CY3YzAw4.js";import"./keyboard-shortcut-Cc_A9QQc.js";import"./label-value-C0-wovkK.js";import"./listbox-CuOgVQof.js";import"./meter-group-BelbOht0.js";import"./page-state-DvaZGddB.js";import"./paginator-BKdL1BIa.js";import"./process-stepper-Bp5OCOUI.js";import"./radio-group-DsQJuu55.js";import"./scaffold-Ca9xBuAs.js";import"./secret-jFkF2IXi.js";import"./option-BdIJ6ogL.js";import"./select-dropdown-Cw1ITXM_.js";import"./select-sR1TTM1g.js";import"./skip-link-tmPFCuzR.js";import"./slider-CZwA20JM.js";import"./split-view-DFZqrn8y.js";import"./stack-D82n2o1P.js";import"./stepper-BlXm-mnR.js";import"./switch-CLFz6qq3.js";import"./table-D72IDEts.js";import"./tab-panel-DyswmtFm.js";import"./time-picker-DBchLKXN.js";import"./timestamp-Unrm8J_W.js";import"./toast-DTsEO4Qx.js";import"./toolbar-DNZr8FhC.js";import"./tooltip-DfvpF4Ch.js";import"./tree-item-C6qYHud-.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-B7uxVr6l.js";import"./split-button-BjEh0VXF.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <span slot="label">Label</span>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},a={...c,args:{inline:!0}},l={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const p=g(f)??{};o&&(p.maxWidth="150px");const v=p?u(p):n;return r`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":o})} style=${v}>
        ${d?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:n}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":o?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
      </div>
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconPerson]);
    return html\`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],or=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,or as L,a};

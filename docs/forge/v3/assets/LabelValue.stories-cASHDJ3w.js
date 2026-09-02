import{A as p,b as r}from"./iframe-B_lgGbu6.js";import{s as c,b as g,g as b}from"./utils-m5ghmQjV.js";import{o as u}from"./style-map-B6MLvlAY.js";import{e as y}from"./class-map-DQUeiaZ3.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DUqrBZcm.js";import"./app-bar-profile-button-nnrILrcq.js";import{I as h,e as S}from"./tyler-icons-CEN2klhX.js";import"./menu-CCmwP2o2.js";import"./linear-progress-Dwb4-mcz.js";import"./list-C6iz0ERj.js";import"./popover-t5fdcmFc.js";import"./overlay-B8JeDFYN.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CrysVSv4.js";import"./avatar-BRUM0X3t.js";import"./icon-button-BAkeg8m8.js";import"./focus-indicator-CrcLkhkn.js";import"./state-layer-BHOa6Zo2.js";import"./autocomplete-D5eP0iER.js";import"./label-CTco8L8H.js";import"./base-field-gOSZhYCf.js";import"./text-field-D_cgkpeu.js";import"./backdrop-27v6U1TD.js";import"./badge-DX88RtFX.js";import"./banner-apJYbmmY.js";import"./bottom-sheet-DmCa3GBp.js";import"./dialog-LLA-oPrh.js";import"./button-area-DoI-h4Os.js";import"./button-toggle-group-CPrz_66G.js";import"./button-CKPrXe8X.js";import"./calendar-CFQrs8wE.js";import"./card-QjeOfePN.js";import"./checkbox-VzbOLhwj.js";import"./chip-set-CYV0Vm26.js";import"./circular-progress-CbEv7fNu.js";import"./color-picker-dHWCoUBm.js";import"./date-picker-DDim7rnL.js";import"./date-range-picker-BYFZMMpD.js";import"./divider-DknL7lh0.js";import"./base-drawer-DYk7fD70.js";import"./drawer-BBzTugFU.js";import"./modal-drawer-CLmums_3.js";import"./mini-drawer-Bpy1YQYx.js";import"./expansion-panel-Dp73c8OX.js";import"./open-icon-C0WWHZ_p.js";import"./file-picker-CFA_YxQ4.js";import"./floating-action-button-CJxsr-g_.js";import"./inline-message-C_qyt6_O.js";import"./key-item-DLRR7VaE.js";import"./keyboard-shortcut-Hef5bg0C.js";import"./label-value-D6pRkq1Z.js";import"./meter-group-s7kgVckT.js";import"./page-state-BV5WYMri.js";import"./paginator-BDAo28-M.js";import"./radio-group-BnvR-s_V.js";import"./scaffold-BeSBqG9Y.js";import"./secret-C6XP-E9z.js";import"./select-dropdown-36RxcWoa.js";import"./select-BB-tm_Yc.js";import"./skip-link-D1CoOHCi.js";import"./slider-Bf7E_M0i.js";import"./split-view-D9Jlgq86.js";import"./stack-Bpa8uwy5.js";import"./stepper-Biy4IOeP.js";import"./switch-Bq8c-yo-.js";import"./table-B6aZdG5d.js";import"./tab-panel-BGR6pUzd.js";import"./time-picker-BMbGVygj.js";import"./timestamp-BJM7hDiB.js";import"./toast-BkglXzsC.js";import"./toolbar-Bq_AfmQC.js";import"./tooltip-DkAthYLb.js";import"./tree-item-CFG7KeJm.js";import"./view-switcher-B_SZUlTD.js";import"./deprecated-icon-button-Dqq9iO4v.js";import"./split-button-PjTja2xp.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <span slot="label">Label</span>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},a={...c,args:{inline:!0}},l={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
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
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ke as L,a};

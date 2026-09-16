import{A as n,b as r}from"./iframe-B3uRBkD3.js";import{s as c,b as g,g as b}from"./utils-CnROM8aW.js";import{o as u}from"./style-map-w6cwjf1_.js";import{e as y}from"./class-map-BsOXihy2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B8rbwwxu.js";import"./app-bar-profile-button-XK1WGDjz.js";import{I as h,e as S}from"./tyler-icons-CoQb4rn7.js";import"./menu-CGqle7b9.js";import"./linear-progress-BuTzYSPq.js";import"./list-ZmONF4RK.js";import"./popover-CoBuGMRm.js";import"./overlay-Y1uV9JXh.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-C3Ydk4_S.js";import"./avatar-DEZ2jdRE.js";import"./icon-button-Cv65tCEo.js";import"./focus-indicator-CEVhxSoX.js";import"./state-layer-B1dog9AJ.js";import"./autocomplete-Can599Y-.js";import"./label-WOSXuSGL.js";import"./base-field-DRIHvKC6.js";import"./text-field-D3KR3xbP.js";import"./backdrop-CIiH6Dag.js";import"./badge-C-2b81b5.js";import"./banner-BLKtJgKV.js";import"./bottom-sheet-DFevqYLb.js";import"./dialog-Cde_C6WI.js";import"./button-area-Dw3OL1H7.js";import"./button-toggle-group-C2tIdqFv.js";import"./button-D-LT5CJs.js";import"./calendar-BP05pjAZ.js";import"./card-TBBTzmBT.js";import"./checkbox-J6XO052F.js";import"./chip-set-D9nnox5f.js";import"./circular-progress-BqNemWjC.js";import"./color-picker-B8YSaSoX.js";import"./date-picker-tL6NDhU_.js";import"./date-range-picker-B2J5yH4v.js";import"./divider-DCEAIgvP.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-VrFasrSd.js";import"./modal-drawer-B5TY4Qqi.js";import"./mini-drawer-j_wQw-o8.js";import"./expansion-panel-BYub_lss.js";import"./open-icon-CzDwyOPC.js";import"./file-picker-CDpL1Ot9.js";import"./floating-action-button-Dka0CQ5T.js";import"./inline-message-Bn0Suvrv.js";import"./key-item-3pMmNidi.js";import"./keyboard-shortcut-D0cE9nH2.js";import"./label-value-BBtWzpWn.js";import"./listbox-CO7t2xmC.js";import"./meter-group-CTolLv1d.js";import"./page-state-CbLkYdiz.js";import"./paginator-k1AFTL2E.js";import"./radio-group-DEHN-R0v.js";import"./scaffold-DgAVuyRY.js";import"./secret-B3pj__iD.js";import"./option-Cu0cKHXU.js";import"./select-dropdown-C8EFslmZ.js";import"./select-22_XPSIy.js";import"./skip-link-wzLhYB71.js";import"./slider-PEhN9iwN.js";import"./split-view-C1czjq-S.js";import"./stack-BJj2fenZ.js";import"./stepper-weP6F0hj.js";import"./switch-CkArOn15.js";import"./table-Do0wWUEV.js";import"./tab-panel-CUMubjdG.js";import"./time-picker-Cmlt-nOk.js";import"./timestamp-Bypd-NIA.js";import"./toast-B4k1e3RP.js";import"./toolbar-ZKzuHk3g.js";import"./tooltip-CgNnMk9Z.js";import"./tree-item-BUoXr956.js";import"./view-switcher-Cke0UXCI.js";import"./deprecated-icon-button-CSFUt6lD.js";import"./split-button-B2ajRGsp.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ue=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ue as L,a};

import{A as n,b as r}from"./iframe-0q-2v6p2.js";import{s as c,b as g,g as b}from"./utils-DYC_LATD.js";import{o as u}from"./style-map-tx2cbuoa.js";import{e as y}from"./class-map-BZRGj2DG.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BkEKWVJ-.js";import"./app-bar-profile-button-DQLQVlTR.js";import{I as h,e as S}from"./tyler-icons-DfvsIf_8.js";import"./menu-DjtOwdpk.js";import"./linear-progress-Dh__ll_M.js";import"./list-C75Ks1_5.js";import"./popover-CD5RYHTR.js";import"./overlay-DD5-5Cd-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CnedPL3J.js";import"./avatar-DWMyJ-Dd.js";import"./icon-button-wRobUPyU.js";import"./focus-indicator-CoriJI7e.js";import"./state-layer-mJUCxnSJ.js";import"./autocomplete-CVpFBK-5.js";import"./label-6L8FSsax.js";import"./base-field-BLyxUt4_.js";import"./text-field-Bq18GTiN.js";import"./backdrop-6rFKosil.js";import"./badge-Dn01AbJ0.js";import"./banner-1UwTWV4s.js";import"./bottom-sheet-CzIU1Spc.js";import"./dialog-CgsRv-k4.js";import"./button-area-Bhg452d1.js";import"./button-toggle-group-BYgOYoUH.js";import"./button-DZYdKhTn.js";import"./calendar-B8WJiyuB.js";import"./card-CPxRRzBX.js";import"./checkbox-B7ewEX_Z.js";import"./chip-set-DGFDsFEg.js";import"./circular-progress-CNehBhf0.js";import"./color-picker-DmcCqTPB.js";import"./date-picker-Cx_ngoO0.js";import"./date-range-picker-fPm0pdsI.js";import"./divider-DuBICtiR.js";import"./base-drawer-7Wh9lkkV.js";import"./drawer-CRT3lE2E.js";import"./modal-drawer-BijuI8cC.js";import"./mini-drawer-BD00MKTN.js";import"./expansion-panel-BAkaKhRV.js";import"./open-icon-Cl2GS7aQ.js";import"./file-picker-2h1eLmgh.js";import"./floating-action-button-Cgk7o6f1.js";import"./inline-message-DGh2LsDu.js";import"./kbd-DzWgYmEM.js";import"./key-item-UcRRAcRX.js";import"./keyboard-shortcut-DyTPHoDS.js";import"./label-value-o_jvt4kl.js";import"./meter-group-D7NOufrU.js";import"./page-state-By0fGZIX.js";import"./paginator-CC99e8lp.js";import"./radio-group-D7ERu0Eb.js";import"./scaffold-DlnKxn3X.js";import"./secret-Bbe2aGlT.js";import"./select-dropdown-CGrHPg15.js";import"./select-CxGVVX27.js";import"./skip-link-BoJpGyHM.js";import"./slider-vjFy2D_6.js";import"./split-view-DlBmhOCe.js";import"./stack-Cbce-CUg.js";import"./stepper-jVb5t0jM.js";import"./switch-BWtby5Vs.js";import"./table-DT5w2x3U.js";import"./tab-panel-DZF5tJIX.js";import"./time-picker-DyckJMXH.js";import"./timestamp-BucHJv1R.js";import"./toast-DVMRoADF.js";import"./toolbar-CqEjLPKY.js";import"./tooltip-D4AerAD0.js";import"./tree-item-DmkFgnhf.js";import"./view-switcher-D7AQr4N8.js";import"./deprecated-icon-button-C4_SF3qR.js";import"./split-button-DGI1Pgxp.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Qe as L,a};

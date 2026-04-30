import{A as p,b as r}from"./iframe-M_rhnTR1.js";import{s as c,b as g,g as b}from"./utils-D34GR8-a.js";import{o as u}from"./style-map-Ctb43sGM.js";import{e as y}from"./class-map-Bsp7pQyV.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CHJDUFGD.js";import"./app-bar-profile-button-Bg8z4-9S.js";import{I as h,e as S}from"./tyler-icons-3BKCvRvJ.js";import"./menu-DEdrNeCe.js";import"./linear-progress-DP1CUIRM.js";import"./list-Dh2yXr00.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-C143zGcw.js";import"./icon-button-B9m9DVQB.js";import"./focus-indicator-Dklc76jU.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-BUS9ur-Y.js";import"./label-DhLAMQIi.js";import"./button-DDrog7fD.js";import"./button-toggle-group-CfY8JZEg.js";import"./checkbox-DGIiaQM2.js";import"./switch-CBDDVmLA.js";import"./base-field-DSz57eqy.js";import"./text-field-idXY4M-8.js";import"./backdrop-B_VtJyIN.js";import"./badge-BxVD_U0L.js";import"./banner-Bp4rNeGw.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-B1t9G6nf.js";import"./calendar-jtGJyRl8.js";import"./card-D1abBM62.js";import"./chip-set-C6u5XHSM.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CTYbMkDl.js";import"./date-picker-CPfsoWJr.js";import"./date-range-picker-CwRnLT_T.js";import"./divider-MKlUalfD.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Ck9G14Fv.js";import"./open-icon-DDaCvIFO.js";import"./file-picker-DQ4QdOLZ.js";import"./floating-action-button-cvledlvU.js";import"./inline-message-BK9gijHu.js";import"./key-item-DY0nBt8m.js";import"./keyboard-shortcut-M3MVUcgn.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DrwsYz0b.js";import"./page-state-BYBCycIs.js";import"./paginator-DCYvt4S5.js";import"./scaffold-D_SIXSFE.js";import"./secret-BbK0eeoN.js";import"./select-dropdown-DiLMwVgq.js";import"./select-BEt1Uoyi.js";import"./skip-link-DiaWsEyd.js";import"./slider-BylxH7Eo.js";import"./split-view-BRmXujoz.js";import"./stack-BuaXNRar.js";import"./stepper-DFpKoTBq.js";import"./table-Cb7m1bp9.js";import"./tab-bar-CnW0mLv3.js";import"./time-picker-CeZzUytm.js";import"./toast-D4RDaUZe.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-D1OLy6KI.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DDx3zjJM.js";import"./split-button-B7qbbR-L.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,qe as L,a};

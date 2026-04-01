import{A as p,b as r}from"./iframe-jQDb9HOx.js";import{s as c,b as g,g as b}from"./utils-QQyHyWEl.js";import{o as u}from"./style-map-DZnAH3wj.js";import{e as y}from"./class-map-D-M5TuKe.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BaxZ1nbV.js";import"./app-bar-profile-button-B7HTbYYH.js";import{I as h,e as S}from"./tyler-icons-CMhLRNQd.js";import"./menu-dg1zPm3i.js";import"./linear-progress-DP1CUIRM.js";import"./list-B40uNwDN.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-BIT1XZ0z.js";import"./icon-button-llDXN8bF.js";import"./focus-indicator-DHkP3feK.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-3QtFtWKA.js";import"./label-CbdjOoPP.js";import"./button-CONmEHCg.js";import"./button-toggle-group-BjvXwQmM.js";import"./checkbox-CwBr0x_Y.js";import"./switch-fKb4y1PT.js";import"./base-field-CpbOJt1a.js";import"./text-field-DMVNWxHf.js";import"./backdrop-B_VtJyIN.js";import"./badge-QMbx30oT.js";import"./banner-CMC34fNp.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-DJuFpObz.js";import"./calendar-BjLtISOD.js";import"./card-BtW70zEK.js";import"./chip-set-CfX3288k.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-BTF6c108.js";import"./date-picker-B1s-HCWI.js";import"./date-range-picker-BdXCjzO0.js";import"./divider-T_rgxRv5.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-oTW3uKg8.js";import"./open-icon-6HtjGE36.js";import"./file-picker-DKC2F7G-.js";import"./floating-action-button-GPodU8-D.js";import"./inline-message-BK9gijHu.js";import"./key-item-mLf2f234.js";import"./keyboard-shortcut-Daf5NqJG.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CxYr-qCy.js";import"./page-state-BYBCycIs.js";import"./paginator-CBel58TI.js";import"./scaffold-D_SIXSFE.js";import"./secret-Ch8w-Wtu.js";import"./select-dropdown-CneakloT.js";import"./select-DdKvbzkE.js";import"./skip-link-BrgeHCKV.js";import"./slider-BYpb_yIM.js";import"./split-view-B_Cbcuix.js";import"./stack-BuaXNRar.js";import"./stepper-DzL4hhlW.js";import"./table-CQor_87X.js";import"./tab-bar-DtUZFDkL.js";import"./time-picker-M8R-6BN6.js";import"./toast-Ci7Kh7X1.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-DhoEk3Oo.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DX-nnrz3.js";import"./split-button-DdFcyJ1l.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

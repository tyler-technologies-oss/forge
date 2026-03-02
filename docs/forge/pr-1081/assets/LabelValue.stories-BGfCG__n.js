import{A as p,b as r}from"./iframe-Co1TxWa1.js";import{s as c,b as g,g as b}from"./utils-3yMKERXj.js";import{o as u}from"./style-map-Dd40oAmE.js";import{e as y}from"./class-map-C2o-_jGF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BcfAM8qe.js";import"./expansion-panel-BV8pjqCF.js";import"./open-icon-BdOtvQ_6.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-m8l9D5Lo.js";import"./state-layer-Dr4I3-ea.js";import"./focus-indicator-D-5vSThe.js";import{I as h,e as S}from"./tyler-icons-BS8_pNWa.js";import"./menu-CkiVMedc.js";import"./linear-progress-Cnx_HyUf.js";import"./list-BIFSuh1A.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";import"./avatar-BoVD3kVh.js";import"./icon-button-Bgrx9pzH.js";import"./autocomplete-Dpzf1cTG.js";import"./label-CoQ2xHrI.js";import"./button-DHNtJFdN.js";import"./button-toggle-group-B6gbWzm1.js";import"./checkbox-iQjSoNxJ.js";import"./switch-HBk0yptu.js";import"./base-field-mtvRK-Y7.js";import"./text-field-cm5IL4zd.js";import"./backdrop--id5x3jp.js";import"./badge-CXuHYgqR.js";import"./banner-CYJc-wVC.js";import"./bottom-sheet-BJXxXepC.js";import"./dialog-DvB2hdYD.js";import"./button-area-D1RvuMoz.js";import"./calendar-BLMlSiqi.js";import"./card-ZwrpMhrm.js";import"./chip-set-CGdiLSxF.js";import"./circular-progress-B5Kshctg.js";import"./color-picker-BbgKmgMn.js";import"./date-picker-CfKwjEwn.js";import"./date-range-picker-CK2xMss_.js";import"./divider-CY-gug5I.js";import"./base-drawer-q74epyPW.js";import"./drawer-DRLMAEyk.js";import"./modal-drawer-CCu9BUGH.js";import"./mini-drawer-Cck9Qwkt.js";import"./file-picker-C8T7_80W.js";import"./floating-action-button-ChKwIWJx.js";import"./inline-message-DM46YaML.js";import"./key-item-BXqEjZe8.js";import"./keyboard-shortcut-DnEED6Tm.js";import"./label-value-Cm7o2IPb.js";import"./meter-group-u61cEoEu.js";import"./page-state-CTPXyko5.js";import"./paginator-D_Jo6-Hf.js";import"./scaffold-C0JMtL8O.js";import"./select-dropdown-BoqbhwmS.js";import"./select-DqmPrmrh.js";import"./skip-link-Glz5MDup.js";import"./slider-B2ZzbNPf.js";import"./split-view-DNAVAbBD.js";import"./stack-C45mBB1R.js";import"./stepper-u__vtiHp.js";import"./table-rrm8Zbe9.js";import"./tab-bar-BDucCW-P.js";import"./time-picker-CkxYC-aX.js";import"./toast-DihtTydd.js";import"./toolbar-DPBJiSu_.js";import"./tooltip-DZbumLUT.js";import"./tree-item-D7ErI9VJ.js";import"./view-switcher-ZGhMaguC.js";import"./deprecated-icon-button-ONLvL-w3.js";import"./split-button-BLVvSsHT.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

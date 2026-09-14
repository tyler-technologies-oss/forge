import{A as n,b as r}from"./iframe-DheuHIIc.js";import{s as c,b as g,g as b}from"./utils-CRT-IimF.js";import{o as u}from"./style-map-Bwz6Upoa.js";import{e as y}from"./class-map-IAxvU4dM.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Cs3oDls0.js";import"./app-bar-profile-button-BHUReiJe.js";import{I as h,e as S}from"./tyler-icons-C4N8ookd.js";import"./menu-CRXCq4eT.js";import"./linear-progress-C6Yw2NU-.js";import"./list-8iTj5qsV.js";import"./popover-BKF_pc1b.js";import"./overlay-P1TuxaOE.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-odX48L_4.js";import"./avatar-DyIYiFov.js";import"./icon-button-rIGU_j0T.js";import"./focus-indicator-D0XDuZvo.js";import"./state-layer-BUK1_NC2.js";import"./autocomplete-DLJnrdtR.js";import"./label-CE6WHBMV.js";import"./base-field-B0mk_q25.js";import"./text-field-BxHqVAKQ.js";import"./backdrop-DuggoVs4.js";import"./badge-BsUWDT1M.js";import"./banner-25RwZqxf.js";import"./bottom-sheet-DPSWQqpP.js";import"./dialog-BLUxrwXA.js";import"./button-area-CYtsojUX.js";import"./button-toggle-group-DBLsmb1_.js";import"./button-CVEhg-SN.js";import"./calendar-D1Pj6QU3.js";import"./card-BEzeTCQC.js";import"./checkbox-DeJqZycw.js";import"./chip-set-p7I15PpY.js";import"./circular-progress-DsGMumuf.js";import"./color-picker-DnlhX9gn.js";import"./date-picker-DpJEGlQL.js";import"./date-range-picker-z4pqfMvP.js";import"./divider-C7QvyeiA.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-DkNif9Rq.js";import"./modal-drawer-De0rlrxt.js";import"./mini-drawer-CJIvvL-H.js";import"./expansion-panel-BNSOeC0C.js";import"./open-icon-iTZnBTpd.js";import"./file-picker-BlDSB2kH.js";import"./floating-action-button-lcJMIFUB.js";import"./inline-message-BBlUMEcD.js";import"./key-item-CZoOVTzx.js";import"./keyboard-shortcut-TL9hCtBl.js";import"./label-value-BKZYa59d.js";import"./listbox-PVu8Yu7L.js";import"./meter-group-YgaIqbki.js";import"./page-state-B2CTwiCg.js";import"./paginator-Bm6o73Jz.js";import"./radio-group-CLOOC57s.js";import"./scaffold-DVCC5lGr.js";import"./secret-YpYyCzov.js";import"./select-dropdown-l9VeT-pC.js";import"./select-DrsVyXK3.js";import"./skip-link-C6lwxT9x.js";import"./slider-IojZWlyK.js";import"./split-view-PSrRVGeK.js";import"./stack-DIeJ-nuE.js";import"./stepper-DiloDWtW.js";import"./switch-B9qFwKfi.js";import"./table-Dzw0QCt9.js";import"./tab-panel-DLfaAIC2.js";import"./time-picker-Dl4QBzkE.js";import"./timestamp-sMqJsLnG.js";import"./toast-BPX1rhn-.js";import"./toolbar-CK4o0G-Y.js";import"./tooltip-DjdMmhcH.js";import"./tree-item-C8iamEMe.js";import"./view-switcher-B_53bUYO.js";import"./deprecated-icon-button-92pYUUgA.js";import"./split-button-CsJdkCu2.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

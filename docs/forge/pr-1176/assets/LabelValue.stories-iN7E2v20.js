import{A as p,b as r}from"./iframe-B5kixTUA.js";import{s as c,b as g,g as b}from"./utils-C2rEPPUi.js";import{o as u}from"./style-map-saHzlkzr.js";import{e as y}from"./class-map-BOuB-B9M.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BCKp9Kya.js";import"./app-bar-profile-button-DWSBefYW.js";import{I as h,e as S}from"./tyler-icons-BIZLfBgS.js";import"./menu-CpXkTirk.js";import"./linear-progress-Do3VWKo6.js";import"./list-CEdkemxi.js";import"./popover-PP0PBtnE.js";import"./overlay-B5Gi9o4o.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BE_elVrP.js";import"./avatar-BgaRou0X.js";import"./icon-button-CLEGMrxU.js";import"./focus-indicator-C4H0Z-Oe.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-GNhPAuu9.js";import"./label-B2DgDty_.js";import"./button-D8CfmJ6z.js";import"./button-toggle-group-Cc8RdE5a.js";import"./checkbox-DY7NS6Tz.js";import"./switch-j6pTSyQO.js";import"./base-field-CS3WuGUd.js";import"./text-field-CeMW75GH.js";import"./backdrop-B0IRqNVE.js";import"./badge-DdFGbGwL.js";import"./banner-DLEd223L.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-BC_xO8r5.js";import"./calendar-DY4hyF0a.js";import"./card-B1htjsqM.js";import"./chip-set-CznXWDAh.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-COiGVyO-.js";import"./date-picker-CuASCnBz.js";import"./date-range-picker-zKwi6Obk.js";import"./divider-D0pR_yH7.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-12G-UUro.js";import"./open-icon-CiMQEe_g.js";import"./file-picker-qhg412GA.js";import"./floating-action-button-DHxU-K6m.js";import"./inline-message-wW24XM3J.js";import"./key-item-BvAyCkf5.js";import"./keyboard-shortcut-nCWBOT-k.js";import"./label-value-DjHFGdMo.js";import"./meter-group-AhY0Pf0G.js";import"./page-state-DECQz5Rm.js";import"./paginator-CukHv0Ua.js";import"./scaffold-F_aQKixv.js";import"./secret-B8qsstVU.js";import"./select-dropdown-DgRn7wLd.js";import"./select-DBTkOZqs.js";import"./skip-link-S_vNpRsX.js";import"./slider-wheOO1aZ.js";import"./split-view-CSHw2XX_.js";import"./stack-DEQW1E_G.js";import"./stepper-CBPKPKoc.js";import"./table-C7dLdrc-.js";import"./tab-bar-DuZi8V5M.js";import"./time-picker-C9f4QEud.js";import"./timestamp-Co-SSk74.js";import"./toast-YwPmCRHI.js";import"./toolbar-BJ8vbzNM.js";import"./tooltip-C3Plx4lp.js";import"./tree-item-CISLuQ3e.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-Bu_eWg58.js";import"./split-button-BtA1b9Ak.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ge=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ge as L,a};

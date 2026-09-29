import{A as n,b as r}from"./iframe-CcCZn8Qo.js";import{s as c,b as g,g as b}from"./utils-BR1rLwc_.js";import{o as u}from"./style-map-BI7mT4Mo.js";import{e as y}from"./class-map-DV-Grsb7.js";import"./service-adapter-8tADcN_b.js";import"./accordion-gb_Ae6qo.js";import"./app-bar-menu-button-CoBXLDn4.js";import"./app-bar-profile-button-DZyj05jb.js";import{I as h}from"./icon-BIdGKJqZ.js";import"./menu-DT4vpUsb.js";import{i as S}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-0iJnd8Jh.js";import"./popover-d2r_ayMy.js";import"./overlay-DNJ2GsC-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-C4Wq8Idf.js";import"./list-item-P9WX-v0r.js";import"./avatar-BsLIimID.js";import"./icon-button-DuRpLS_m.js";import"./autocomplete-Bo9RBHkV.js";import"./label-BhaR9I0r.js";import"./base-field-BYB1dcoa.js";import"./focus-indicator-CwT8THhK.js";import"./text-field-D815X8jF.js";import"./backdrop-C9lBlb_d.js";import"./badge-Co1RQX_x.js";import"./banner-DdDVdR8H.js";import"./bottom-sheet-Cu2vEmAI.js";import"./dialog-DrWomsTl.js";import"./button-area-hv3dYcBQ.js";import"./button-toggle-group-DQ2DRpmb.js";import"./button-CifGyQIr.js";import"./calendar-DaNjMOFE.js";import"./card-B3eYTAtb.js";import"./checkbox-DcdDfC1U.js";import"./chip-set-DdObOAv_.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-Cr6Wetdd.js";import"./date-picker-CbP5HwgK.js";import"./date-range-picker-CzJCu-n2.js";import"./divider-BQPOzKgb.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-BwFrnUBA.js";import"./open-icon-BmFqXzQi.js";import"./file-picker-Coh_bSkm.js";import"./floating-action-button-BMoJ9tFy.js";import"./inline-message-BKecgmUf.js";import"./kbd-BB3T7qk9.js";import"./key-item-B_VFGdNA.js";import"./keyboard-shortcut-BjuTXX2L.js";import"./label-value-06gdOjV6.js";import"./meter-group-C8y4_j8T.js";import"./page-state-DdcxjGPv.js";import"./paginator-F8LLCfM4.js";import"./radio-group-BsHgaz8q.js";import"./scaffold-ua4VSBPI.js";import"./secret-BzSvAVhg.js";import"./select-dropdown-Bq2_WsER.js";import"./select-C1Uj7EgL.js";import"./skip-link-C_ZOhqKD.js";import"./slider-C-386un0.js";import"./split-view-Bk9QluVN.js";import"./stack-CzasDS03.js";import"./stepper-Cjgbs-fc.js";import"./switch-b9UWP0YG.js";import"./table-B_Q_QH6C.js";import"./tab-panel-CVYu2wWh.js";import"./time-picker-DkHcXYkL.js";import"./timestamp-DkDmGOIf.js";import"./toast-K5Pp21nd.js";import"./toolbar-B_F4fpMR.js";import"./tooltip-BTtmmlI8.js";import"./tree-item-f9vPpvvS.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-BCqTG2xj.js";import"./split-button-OJ7bKSMx.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ye=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ye as L,a};

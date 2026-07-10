import{A as p,b as r}from"./iframe-BTmUWVwH.js";import{s as c,b as g,g as b}from"./utils-Cu3TicFl.js";import{o as u}from"./style-map-C6OJkCQH.js";import{e as y}from"./class-map-Bql9K1QM.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CMXvbJEx.js";import"./app-bar-profile-button-DY7NB-jR.js";import{I as h,e as S}from"./tyler-icons-Dm9kVKGO.js";import"./menu-Davrh2ix.js";import"./linear-progress-BvuLf7up.js";import"./list-5-sNw3FD.js";import"./popover-nR64di3F.js";import"./overlay-DRBmjWU5.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-IZvJiFBF.js";import"./avatar-DGRn3LTw.js";import"./icon-button-DNSyxmm6.js";import"./focus-indicator-DQKlHuL5.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-DdpSCmDA.js";import"./label-CI7PxrYK.js";import"./base-field-ComZmZ30.js";import"./text-field-CYRZj-sj.js";import"./backdrop-SMwLBDG5.js";import"./badge-BvGupbIC.js";import"./banner-BzIwdi2t.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-BDd-ry7N.js";import"./button-toggle-group-D9HAsf89.js";import"./button-DVCkK0hu.js";import"./calendar-Z6Lb8jmO.js";import"./card-DzWcAfpK.js";import"./checkbox-Bhz4-l9m.js";import"./chip-set-Cfs2ly6l.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-CCmXErEH.js";import"./date-picker-B9V7AOy1.js";import"./date-range-picker-EFGB1xtE.js";import"./divider-DpX8I4m5.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DEdhFBI3.js";import"./open-icon-06xTWQce.js";import"./file-picker-0OiJzqWK.js";import"./floating-action-button-B0-6Sw_c.js";import"./inline-message-Dej6nioH.js";import"./key-item-CJCl-fWO.js";import"./keyboard-shortcut-CuM9gL5P.js";import"./label-value-CJDyRgCt.js";import"./meter-group-CRpOTHh-.js";import"./page-state-xtTZreUO.js";import"./paginator-CUjOF-tH.js";import"./radio-group-CcmpflHx.js";import"./scaffold-l7cEUk27.js";import"./secret-CZAmZN0r.js";import"./select-dropdown-CBMtUHT4.js";import"./select-BA56KeuA.js";import"./skip-link-Cmj_EBmq.js";import"./slider-h7q8wBPP.js";import"./split-view-BZlwh5La.js";import"./stack-DYrRnd9D.js";import"./stepper-75S1glZf.js";import"./switch-B_4RPJuC.js";import"./table--m_oba3d.js";import"./tab-bar-BywJzXuM.js";import"./time-picker-BdiUTkAU.js";import"./toast-CcS9jaa-.js";import"./toolbar-B53_l6vS.js";import"./tooltip-CK3n2hL6.js";import"./tree-item--E2ApP4-.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-CLBWnFC_.js";import"./split-button-BfupTdCo.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as p,b as r}from"./iframe-BYO1bXoJ.js";import{s as c,b as g,g as b}from"./utils-CJ7ikJXH.js";import{o as u}from"./style-map-qfztkuLE.js";import{e as y}from"./class-map-PpCHXYFJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CgDbFrXp.js";import"./app-bar-profile-button-C3sUBGjO.js";import{I as h,e as S}from"./tyler-icons-7uX1bPDw.js";import"./menu-SXsmU0nM.js";import"./linear-progress-DEYvX0ZE.js";import"./list-CUmFk2WX.js";import"./popover-CuKDZ7_o.js";import"./overlay-D9banag4.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-Pe-gyKWB.js";import"./icon-button-BImepwl9.js";import"./focus-indicator-DqIVBzGS.js";import"./state-layer-7HWBWBQu.js";import"./autocomplete-VmbUEKve.js";import"./label-CyCZ1UCZ.js";import"./button-veE_5Z_L.js";import"./button-toggle-group-N0k30em1.js";import"./checkbox-B-0yZncB.js";import"./switch-DecUR8kn.js";import"./base-field-DB0sHKTX.js";import"./text-field-DckKtu6K.js";import"./backdrop-DuhijlGd.js";import"./badge-BSBXRVV9.js";import"./banner-RxH9PBMw.js";import"./bottom-sheet-BE6jby3V.js";import"./dialog-CIwcrJYI.js";import"./button-area-B5LsVFiC.js";import"./calendar-Bujdz0BK.js";import"./card-5StB8P4_.js";import"./chip-set-B4dHo4ot.js";import"./circular-progress-uG5S0Plk.js";import"./color-picker-5rEyvrtD.js";import"./date-picker-CAww9mwx.js";import"./date-range-picker-CW9JHMvC.js";import"./divider-B2dPZjC5.js";import"./base-drawer-CUYrr1Bq.js";import"./drawer-BTwfPRXS.js";import"./modal-drawer-DlWTH1RZ.js";import"./mini-drawer-BzvDiXZa.js";import"./expansion-panel-Dx3PbgF2.js";import"./open-icon-Dg4qPtaB.js";import"./file-picker-Bme8l4HH.js";import"./floating-action-button-BRi3u1AT.js";import"./inline-message-CzR1CZl4.js";import"./key-item-CVkV1sHw.js";import"./keyboard-shortcut-BTgVW-5n.js";import"./label-value-CI8WZIke.js";import"./meter-group-D1KROUAU.js";import"./page-state-DLzWYTpL.js";import"./paginator-Bh-XIb0k.js";import"./scaffold-D6_2VrU0.js";import"./secret-D3l6_4sJ.js";import"./select-dropdown-CVslYo1R.js";import"./select-CpezNZUX.js";import"./skip-link-DoVJDQlL.js";import"./slider-j7mpEEET.js";import"./split-view-CCHub0uH.js";import"./stack-Ck9YjAi0.js";import"./stepper-B81M3veq.js";import"./table-BR1WVNzO.js";import"./tab-bar-CsglugRe.js";import"./time-picker-Dy29saUm.js";import"./toast-CNCDdfcv.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-BGJQ-ppx.js";import"./tree-item-SvntF2Jy.js";import"./view-switcher-CbwfYveT.js";import"./deprecated-icon-button-DTwkfEMu.js";import"./split-button-Di2LMism.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

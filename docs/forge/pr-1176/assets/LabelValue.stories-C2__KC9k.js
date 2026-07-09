import{A as p,b as r}from"./iframe-mEEp4vyl.js";import{s as c,b as g,g as b}from"./utils-C2rEPPUi.js";import{o as u}from"./style-map-CzflIghb.js";import{e as y}from"./class-map-BEJIzRMM.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DmLGZcJY.js";import"./app-bar-profile-button-mel29P5v.js";import{I as h,e as S}from"./tyler-icons-Dd_50CiF.js";import"./menu-CXnprRvQ.js";import"./linear-progress-Do3VWKo6.js";import"./list-DLqUJxC-.js";import"./popover-CU3EvxYx.js";import"./overlay-CJnoqSm4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-D-1mhuaY.js";import"./avatar-6NcjQeJG.js";import"./icon-button-Bx-1oLBZ.js";import"./focus-indicator-B-Oned0K.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-C2h-YSpp.js";import"./label-BxzW7H-R.js";import"./button-Bhi7bCnQ.js";import"./button-toggle-group-NJ8Db9ZQ.js";import"./checkbox-Ch9uDNN7.js";import"./switch-CCftY1Dm.js";import"./base-field-BISBlare.js";import"./text-field-BLXUe1A3.js";import"./backdrop-B0IRqNVE.js";import"./badge-DzEa3LYr.js";import"./banner-XDXC07vA.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-B8eL2H4J.js";import"./calendar-CNrHn12A.js";import"./card-B6IaFjjN.js";import"./chip-set-CjigyywZ.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-xJlhsU8y.js";import"./date-picker-Dzvk21B9.js";import"./date-range-picker-D0iwoIJ2.js";import"./divider-CUrYVFgo.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Crn33IsB.js";import"./open-icon-C5H8Ilt3.js";import"./file-picker-pINfgpby.js";import"./floating-action-button-Dsp2oT0u.js";import"./inline-message-wW24XM3J.js";import"./key-item-CmyCjFZL.js";import"./keyboard-shortcut-Ctxaca1R.js";import"./label-value-DjHFGdMo.js";import"./meter-group-lvWcZLHu.js";import"./page-state-DECQz5Rm.js";import"./paginator-D8iuSTm2.js";import"./scaffold-F_aQKixv.js";import"./secret-CaxOJWtU.js";import"./select-dropdown-DehuUXqr.js";import"./select-6MQr1LGK.js";import"./skip-link-CXsQNn00.js";import"./slider-CEL1fVE3.js";import"./split-view-B2DdVe3T.js";import"./stack-DEQW1E_G.js";import"./stepper-BgIKD4E9.js";import"./table-BZAvmscu.js";import"./tab-bar-Dy4Zs4Kv.js";import"./time-picker-Clardz0D.js";import"./timestamp-DmCbo_51.js";import"./toast-Cz8yeeBw.js";import"./toolbar-C9fY37NG.js";import"./tooltip-CtjGV45p.js";import"./tree-item-DJFkAgbr.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-C5x8WwlA.js";import"./split-button-B6jXbJxE.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as n,b as r}from"./iframe-BJPqycEt.js";import{s as c,b as g,g as b}from"./utils-CRT-IimF.js";import{o as u}from"./style-map-DHKItbxO.js";import{e as y}from"./class-map-BdMx4Flt.js";import"./service-adapter-8tADcN_b.js";import"./accordion-uwz1aiXv.js";import"./app-bar-profile-button-CF4BOGc0.js";import{I as h,e as S}from"./tyler-icons-DNkpPon9.js";import"./menu-CEHEj-7z.js";import"./linear-progress-C6Yw2NU-.js";import"./list-DgxEhhpR.js";import"./popover-DmcVXRTb.js";import"./overlay-Dzu_blL_.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-PcZLAGQ_.js";import"./avatar-5ILapoRQ.js";import"./icon-button-BZVzCxro.js";import"./focus-indicator-DFu3RSBr.js";import"./state-layer-BUK1_NC2.js";import"./autocomplete-B0fQFgbw.js";import"./label-iiA2WfmW.js";import"./base-field-BraIRaqt.js";import"./text-field-ClU7jdd4.js";import"./backdrop-DuggoVs4.js";import"./badge-DEiBWQE7.js";import"./banner-CryTB1Yh.js";import"./bottom-sheet-DAHF8E72.js";import"./dialog-kIOpZrZ0.js";import"./button-area-yXui8G8W.js";import"./button-toggle-group-BEwPe7Gg.js";import"./button-BRy-f3-q.js";import"./calendar-BJ-sv8r8.js";import"./card-N3qjjXm_.js";import"./checkbox-Os92ujye.js";import"./chip-set-BGTK1FJM.js";import"./circular-progress-DsGMumuf.js";import"./color-picker-BnAyJbh6.js";import"./date-picker-CtBEhIZX.js";import"./date-range-picker-3ymYQ553.js";import"./divider-BafjqDBo.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-DkNif9Rq.js";import"./modal-drawer-De0rlrxt.js";import"./mini-drawer-CJIvvL-H.js";import"./expansion-panel-CPQPdK-O.js";import"./open-icon-CB3evKBE.js";import"./file-picker-B78ebjl0.js";import"./floating-action-button-2madmOeY.js";import"./inline-message-BBlUMEcD.js";import"./key-item-BsVsKizD.js";import"./keyboard-shortcut-Dwsc744x.js";import"./label-value-BKZYa59d.js";import"./listbox-BVpOTX7r.js";import"./meter-group-D6D0Q45k.js";import"./page-state-B2CTwiCg.js";import"./paginator-DBTmQAnU.js";import"./radio-group-B8JjHdri.js";import"./scaffold-DVCC5lGr.js";import"./secret-BTINAjOR.js";import"./select-dropdown-Ck9qPcd0.js";import"./select-DHZasYFw.js";import"./skip-link-BMvQ3avx.js";import"./slider-DaUGvJ2y.js";import"./split-view-CfAkaOuL.js";import"./stack-DIeJ-nuE.js";import"./stepper-CeWVIGAW.js";import"./switch-2tvk8uD3.js";import"./table-BqX3Ia3I.js";import"./tab-panel-BBP_DtIW.js";import"./time-picker-DjEXbTt6.js";import"./timestamp-CyHsgPRX.js";import"./toast-BebJOAAP.js";import"./toolbar-B851t6lS.js";import"./tooltip-2qibAw6I.js";import"./tree-item-C1MdXtBz.js";import"./view-switcher-B_53bUYO.js";import"./deprecated-icon-button-CZcz0erk.js";import"./split-button-BxWXE0G1.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

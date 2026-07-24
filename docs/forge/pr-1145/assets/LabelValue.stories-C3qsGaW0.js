import{A as p,b as r}from"./iframe-oVCy0CKL.js";import{s as c,b as g,g as b}from"./utils-Cu3TicFl.js";import{o as u}from"./style-map-BBL9beC_.js";import{e as y}from"./class-map-D5WOPrWx.js";import"./service-adapter-8tADcN_b.js";import"./accordion-V6h2-OPj.js";import"./app-bar-profile-button-DnsOTPmD.js";import{I as h,e as S}from"./tyler-icons-B5QTbAtT.js";import"./menu-DiFQqMy1.js";import"./linear-progress-BvuLf7up.js";import"./list-IUhRNIec.js";import"./popover-98RIrDc_.js";import"./overlay-BduRS6k-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-0tvJWIW1.js";import"./avatar-DFDqZrkN.js";import"./icon-button-BkuiL2Hq.js";import"./focus-indicator-PC490wMa.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-BBr1jlor.js";import"./label-BDA3qcRk.js";import"./base-field-DdZdsiFy.js";import"./text-field-CipdUHVs.js";import"./backdrop-SMwLBDG5.js";import"./badge-BI9qGSCu.js";import"./banner-BNNl3TzW.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-CI6G92Xi.js";import"./button-toggle-group-BshhYDlD.js";import"./button-BLRO6C8h.js";import"./calendar-DShZz9jg.js";import"./card-BhaGv1yy.js";import"./checkbox-m4LQtTXF.js";import"./chip-set-BAp8u4V0.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-DtZobSHF.js";import"./date-picker-kc1pB5xH.js";import"./date-range-picker-CJKVGmDn.js";import"./divider-CBWqzXLl.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-fA7Scivn.js";import"./open-icon-c-IUX_XH.js";import"./file-picker-Bv7a4WFZ.js";import"./floating-action-button-BYCyt7vA.js";import"./inline-message-Dej6nioH.js";import"./key-item-EKvtAxx8.js";import"./keyboard-shortcut-BQ-ywjoE.js";import"./label-value-CJDyRgCt.js";import"./meter-group-C5V8IOh3.js";import"./page-state-xtTZreUO.js";import"./paginator-D4JhXJHk.js";import"./radio-group-tH4YQvv6.js";import"./scaffold-l7cEUk27.js";import"./secret-DXPXn3g_.js";import"./select-dropdown-DL0kcMJF.js";import"./select-DA_4284r.js";import"./skip-link-C73iYvmL.js";import"./slider-PccwMSOm.js";import"./split-view-DIJde9oH.js";import"./stack-DYrRnd9D.js";import"./stepper-C5RyMgPr.js";import"./switch-BAmLKqKc.js";import"./table-2kISL-id.js";import"./tab-bar-BrLETRGk.js";import"./time-picker-BX-5w7dx.js";import"./toast-C4ZP_q_g.js";import"./toolbar-Cn3D-JIp.js";import"./tooltip-DSFbs0bB.js";import"./tree-item-Ds5zXQZc.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-h98kcY4b.js";import"./split-button-DuNHo-kx.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

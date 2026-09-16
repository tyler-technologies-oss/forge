import{A as p,b as r}from"./iframe-C8qvgkWs.js";import{s as c,b as g,g as b}from"./utils-DJhy9_a3.js";import{o as u}from"./style-map-ei5Sap-n.js";import{e as y}from"./class-map-CWLweCHy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-uu5v9wc8.js";import"./app-bar-profile-button-DlNTOzDk.js";import{I as h,e as S}from"./tyler-icons-mQAAeURf.js";import"./menu-CIFOc0VJ.js";import"./linear-progress-DLb8lZjg.js";import"./list-JHtz7INH.js";import"./popover-DaDXCC47.js";import"./overlay-yq4T8o0m.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-TYHSOg_u.js";import"./avatar-BPktRV6z.js";import"./icon-button-DYY8bfWG.js";import"./focus-indicator-Bw-He_Dx.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-BG3jGjD5.js";import"./label-B17fuSeR.js";import"./button-Df4PRT3k.js";import"./button-toggle-group-7CGqyLTH.js";import"./checkbox-BlrXuvPQ.js";import"./switch-CuQRF9i0.js";import"./base-field-C3884F-h.js";import"./text-field-BMUiCuoX.js";import"./backdrop-Br-v5NXK.js";import"./badge-BgLUUI43.js";import"./banner-BgIwpVZm.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-BRTWYtZZ.js";import"./calendar-w_3KiiiN.js";import"./card-BijNrRDy.js";import"./chip-set-Cd9z4T0x.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-DYhX2AIp.js";import"./date-picker-CPO4X6qW.js";import"./date-range-picker-WJMvdiNW.js";import"./divider-CyxeBvoW.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-BqGfEZM0.js";import"./open-icon-CxHpZY5S.js";import"./file-picker-CSznQnzT.js";import"./floating-action-button-oznK8-aL.js";import"./inline-message-EO-dHXbB.js";import"./key-item-D0Z97Shw.js";import"./keyboard-shortcut-CylBMKnx.js";import"./label-value-C46r41pN.js";import"./meter-group-VE1aslow.js";import"./page-state-BeEclPwI.js";import"./paginator-Dw5C9lWh.js";import"./scaffold-B-1oYF3d.js";import"./secret-DM8pbca-.js";import"./select-dropdown-9aLjsoRo.js";import"./select-t_WfVuPi.js";import"./skip-link-Dk8SzYUZ.js";import"./slider-CvRIbxcq.js";import"./split-view-CSypF4rL.js";import"./stack-DskzmGQg.js";import"./stepper-UuSgqkNt.js";import"./table-Dz4n5XJy.js";import"./tab-bar-CcH4HRrF.js";import"./time-picker-n-uNTDT8.js";import"./toast-Ddmy9_7b.js";import"./toolbar-flUGbESJ.js";import"./tooltip-Bwds6NfI.js";import"./tree-item-BcePPynl.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CeDLL_XR.js";import"./split-button-DpAy-zgN.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

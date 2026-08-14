import{A as p,b as r}from"./iframe-CX1-OGuF.js";import{s as c,b as g,g as b}from"./utils-C5IA10r7.js";import{o as u}from"./style-map-B2UznZRL.js";import{e as y}from"./class-map-C-MhOG7K.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DGUmeVX-.js";import"./app-bar-profile-button-9oRfUTpa.js";import{I as h,e as S}from"./tyler-icons-BgIoXTEj.js";import"./menu-rZSGetJK.js";import"./linear-progress-CsGp1g6o.js";import"./list-auFvqODI.js";import"./popover-izFeuCcp.js";import"./overlay-CWAl4aP4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-XQANi3l8.js";import"./avatar-CTKz6auQ.js";import"./icon-button-TGumIkb-.js";import"./focus-indicator-sdf0mJJv.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-BBebijB5.js";import"./label-DzQvU5dn.js";import"./base-field-yqui2uH5.js";import"./text-field-KYARFHlZ.js";import"./backdrop-3KzDwztH.js";import"./badge-DFlUI_YX.js";import"./banner-BS1Sg8QJ.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-ejoilD50.js";import"./button-toggle-group-tQECqFSK.js";import"./button-D0Htf8_P.js";import"./calendar-RVjqMje4.js";import"./card-D2jiCLO-.js";import"./checkbox-Cb6OyIeu.js";import"./chip-set-CYp-Q5JM.js";import"./circular-progress-DIduwjig.js";import"./color-picker-icqt9F01.js";import"./date-picker-DAVPIZQL.js";import"./date-range-picker-C7SJpYU2.js";import"./divider-CcZZpVS3.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-BcUvGhOD.js";import"./open-icon-DEYHpK_9.js";import"./file-picker-B2FJfZZi.js";import"./floating-action-button-DNFdcZBx.js";import"./inline-message-fj34p3Px.js";import"./key-item-DzHyw-Sg.js";import"./keyboard-shortcut-CUlLGaLI.js";import"./label-value-cTsUvwyw.js";import"./meter-group-CrJhDoPg.js";import"./page-state-DDjhdZbK.js";import"./paginator-ChBVvnrz.js";import"./radio-group-cVy5dHcB.js";import"./scaffold-CufLEZ-a.js";import"./secret-C8w153aL.js";import"./select-dropdown-Bq3rzk2O.js";import"./select-DUGjfer4.js";import"./skip-link-CAwiEGAV.js";import"./slider-EacVQdvP.js";import"./split-view-DtNX_xc8.js";import"./stack-Bc7kWG9C.js";import"./stepper-O4JmNhNs.js";import"./switch-CcubUDei.js";import"./table-ibD_PPXm.js";import"./tab-panel-BQda-oOL.js";import"./time-picker-DQ7VUnOv.js";import"./timestamp--RGQNjIL.js";import"./toast-DwmZ2F-n.js";import"./toolbar-yKvdxy5C.js";import"./tooltip-BsIe97tw.js";import"./tree-item-D4r6jxHq.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-DXLYtm84.js";import"./split-button-nzuMhX-f.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ke as L,a};

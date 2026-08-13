import{A as p,b as r}from"./iframe-1a1WEcnC.js";import{s as c,b as g,g as b}from"./utils-DCILK08P.js";import{o as u}from"./style-map-CddThOmV.js";import{e as y}from"./class-map-DCAci6sF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B34PiBQk.js";import"./app-bar-profile-button-D7UO6Fi8.js";import{I as h,e as S}from"./tyler-icons-BqP_5Usb.js";import"./menu-ydD6hjiI.js";import"./linear-progress-CsGp1g6o.js";import"./list-Ba7Y7d-u.js";import"./popover-COnrFhSW.js";import"./overlay-CS0R_zpK.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DWmvzIbz.js";import"./avatar-CAwd1Zpl.js";import"./icon-button-B5QZOWNY.js";import"./focus-indicator-C0RU8xRV.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-CsFA0oR7.js";import"./label-DjrHQxzi.js";import"./base-field-BNJT_ifs.js";import"./text-field-BZrdezqH.js";import"./backdrop-3KzDwztH.js";import"./badge-BqP35XSK.js";import"./banner-DDKJjCPm.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-C011FUnc.js";import"./button-toggle-group-I31zOnu2.js";import"./button-zNUbTC2q.js";import"./calendar-CI-QYM09.js";import"./card-xPI6EPAH.js";import"./checkbox-CyQP4fah.js";import"./chip-set-C3CHnf8R.js";import"./circular-progress-DIduwjig.js";import"./color-picker-C6Z022LO.js";import"./date-picker-DvLkeLt7.js";import"./date-range-picker-xm9LAhmZ.js";import"./divider-DoamZZb_.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-wuU9dw90.js";import"./open-icon-OFzj_TSj.js";import"./file-picker-2aNq8xuV.js";import"./floating-action-button-Bl0D_xHF.js";import"./inline-message-fj34p3Px.js";import"./key-item-uEF48oYv.js";import"./keyboard-shortcut-DtMmlTPQ.js";import"./label-value-cTsUvwyw.js";import"./meter-group-ZczV8t4G.js";import"./page-state-DDjhdZbK.js";import"./paginator-2kPmiiLe.js";import"./radio-group-C8nnDuoZ.js";import"./scaffold-CufLEZ-a.js";import"./secret-CiDE3vUZ.js";import"./select-dropdown-By8Z1pA4.js";import"./select-dVWVGHlU.js";import"./skip-link-eFdxMOjN.js";import"./slider-DH-rwxk2.js";import"./split-view-C-fEy2_G.js";import"./stack-Bc7kWG9C.js";import"./stepper-CTiddnw1.js";import"./switch-CBcRtvGj.js";import"./table-BnoeFQj7.js";import"./tab-panel-DOGliMyk.js";import"./time-picker-hoVVoa4T.js";import"./timestamp-DsfMznGa.js";import"./toast-_ahnQbUW.js";import"./toolbar-3UjyVMfK.js";import"./tooltip-SwIZYm2z.js";import"./tree-item-6JjY0nHn.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-DiEVTtqF.js";import"./split-button-Ck3y1w2g.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

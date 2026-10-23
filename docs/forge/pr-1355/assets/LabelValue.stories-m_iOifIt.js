import{A as n,b as r}from"./iframe-BJl9WzyY.js";import{s as c,b as g,g as b}from"./utils-BIy79ypG.js";import{o as u}from"./style-map-BOTmrNYG.js";import{e as y}from"./class-map-Bqw-tANk.js";import"./service-adapter-8tADcN_b.js";import"./accordion-uJwPA7Dj.js";import"./app-bar-menu-button-2F0fWcoU.js";import"./app-bar-profile-button-Co4HuSZS.js";import{I as h}from"./icon-4j55E3iS.js";import"./menu-YvaPBPN_.js";import{i as S}from"./tyler-icons-6f2n3B-C.js";import"./linear-progress-BNAgl3n6.js";import"./list-DwCb4DW0.js";import"./popover--d8eA_uV.js";import"./overlay-CP97VZFA.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CmYlvMcd.js";import"./list-item-BITURLP4.js";import"./avatar-CFbwvf4T.js";import"./icon-button-BjiGUEcN.js";import"./autocomplete-CrR62g3l.js";import"./label-DZMar2Lh.js";import"./base-field-DersBkgE.js";import"./focus-indicator-spyGQm32.js";import"./text-field-BHr8z7_W.js";import"./backdrop-ngk7d2eo.js";import"./badge-AjPfUkJl.js";import"./banner-cZQok0Ur.js";import"./bottom-sheet-CIuCWD4l.js";import"./dialog-BNJo_hP-.js";import"./button-area-CEvzkTg9.js";import"./button-toggle-group-BOkH97Bx.js";import"./button-CDo-p3Lo.js";import"./calendar-CfinLd2I.js";import"./card-DdYS2LLh.js";import"./checkbox-Cv0zf-RQ.js";import"./chip-set-NsmocWnz.js";import"./state-layer-oVncPkRT.js";import"./circular-progress-BAYLkjmK.js";import"./color-picker-Bu4tfWak.js";import"./date-picker-y9Apiihs.js";import"./date-range-picker-BOPusYZ7.js";import"./divider-D8EUDr9B.js";import"./base-drawer-CRoTqCXm.js";import"./drawer-B-CimXk8.js";import"./modal-drawer-CrxWsVl8.js";import"./mini-drawer-Bt5EnS2p.js";import"./expansion-panel-Bf43yulM.js";import"./open-icon-BB41ut13.js";import"./file-picker-CbHCk2O7.js";import"./floating-action-button-B6UVX1mf.js";import"./inline-message-XoyeymbY.js";import"./kbd-9_MtPvUG.js";import"./key-item-CIQ7G-uZ.js";import"./keyboard-shortcut-D3HOoDnx.js";import"./label-value-C0-wovkK.js";import"./listbox-CiFxGNGA.js";import"./meter-group-7-DUR9rr.js";import"./page-state-DvaZGddB.js";import"./paginator-BgFiBcIe.js";import"./process-stepper-DlSj_3Qq.js";import"./radio-group-oNZqV0WG.js";import"./scaffold-Ca9xBuAs.js";import"./secret-B4IQ3AC-.js";import"./option-group-DV2aaa-X.js";import"./select-dropdown-CF9aDDcA.js";import"./select-e0dqW9CL.js";import"./skip-link-BWRksQmD.js";import"./slider-ClmLqMT7.js";import"./split-view-BvQMUbp_.js";import"./stack-DkbBaB-O.js";import"./stepper-Cwe8t4SO.js";import"./switch-D2tl2wiK.js";import"./table-DBQeotGy.js";import"./tab-panel-D1HDL1r2.js";import"./time-picker-B9TwH82p.js";import"./timestamp-Dgi7y3No.js";import"./toast-BZ7VSbr7.js";import"./toolbar-9YeKVdJA.js";import"./tooltip-xhdEL1O7.js";import"./tree-item-BX7C-6AO.js";import"./view-switcher-BSXTg3U6.js";import"./deprecated-icon-button-BDNi2oZX.js";import"./split-button-BTZdMkxV.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],rr=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,rr as L,a};

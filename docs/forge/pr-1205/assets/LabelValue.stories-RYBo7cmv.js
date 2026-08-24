import{A as n,b as r}from"./iframe-CdbO8ZWL.js";import{s as c,b as g,g as b}from"./utils-CjnDZgMw.js";import{o as u}from"./style-map-GYvMt1fF.js";import{e as y}from"./class-map-B443CMvP.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DlEcUnKb.js";import"./app-bar-profile-button-B8eD34fF.js";import{I as h,e as S}from"./tyler-icons-CP3IuoxV.js";import"./menu-BPXGi9ZL.js";import"./linear-progress-D4Cj2MuD.js";import"./list-zoQskWC0.js";import"./popover-Br804OQS.js";import"./overlay-BkwGtAvs.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CItCGZ0G.js";import"./avatar-kLL4w04k.js";import"./icon-button-CzzNgYJ5.js";import"./focus-indicator-CP_rFuyY.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-BZ7SlAQE.js";import"./label-CVi-YE1S.js";import"./base-field-_1zGY7FX.js";import"./text-field-BWVPyHXO.js";import"./backdrop-DWOkfyRe.js";import"./badge-CMGQXeTZ.js";import"./banner-CyfcIhSE.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-CbOpfH_e.js";import"./button-toggle-group-D2QlThN6.js";import"./button-BrC_FCoP.js";import"./calendar-CtsdANWB.js";import"./card-Cd5hCNYZ.js";import"./checkbox-oR1uAFLJ.js";import"./chip-set-BQ1G3V3B.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-BW2oVSBs.js";import"./date-picker-CwP0vNG2.js";import"./date-range-picker-TM8_6bZS.js";import"./divider-CWiGColg.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-YLFRr9Um.js";import"./open-icon-IasJz46n.js";import"./file-picker-B_uAc6z5.js";import"./floating-action-button-DGyp64De.js";import"./inline-message-MRVYAzAu.js";import"./key-item-CsZbJmdm.js";import"./keyboard-shortcut-CopzA2XR.js";import"./label-value-CWmtlzqa.js";import"./option-group-BPrct8lp.js";import"./meter-group-Dhl1dx1e.js";import"./page-state-j1LLkVCi.js";import"./paginator-CQ8VaWSr.js";import"./radio-group-cU3ZIX7Y.js";import"./scaffold-CssrLcVP.js";import"./secret-26QEXgJA.js";import"./select-dropdown-5oQY2MO7.js";import"./select-BsPtEYvJ.js";import"./skip-link-CqRRQvtp.js";import"./slider-DMDPXy5u.js";import"./split-view-dUjZXcD6.js";import"./stack-Cu7r2NOS.js";import"./stepper-yB4T19-h.js";import"./switch-GoP0XgUB.js";import"./table-CGqq0FlL.js";import"./tab-panel-D5ouAr0u.js";import"./time-picker-CkU-F63k.js";import"./timestamp-KCj83cQC.js";import"./toast-l-w7-lnx.js";import"./toolbar-zcd0Pa-9.js";import"./tooltip-CO01zmCT.js";import"./tree-item-r89von9U.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-Bc3anY8l.js";import"./split-button-BIPsb1xL.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as n,b as r}from"./iframe-BblV6lM6.js";import{s as c,b as g,g as b}from"./utils-BUKDVvEj.js";import{o as u}from"./style-map-BXri1jdm.js";import{e as y}from"./class-map-DgSiphtE.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DyCAmrOH.js";import"./app-bar-profile-button-BwGqUaUj.js";import{I as h,e as S}from"./tyler-icons-DRA6bGfg.js";import"./menu-FZTqW-M6.js";import"./linear-progress-D4Cj2MuD.js";import"./list-CCvIoFn6.js";import"./popover-Bh05NAXp.js";import"./overlay-DitP1Bcd.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B7MCDoop.js";import"./avatar-BzcoZcCt.js";import"./icon-button-C64ITINA.js";import"./focus-indicator-CJ06cRFQ.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-mcR7ddP1.js";import"./label-DgtLlFt3.js";import"./base-field-DI4hIcqj.js";import"./text-field-CoxHFm95.js";import"./backdrop-DWOkfyRe.js";import"./badge-D1mWFmFY.js";import"./banner-C93XYg3x.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-CaCZJR-6.js";import"./button-toggle-group-M180YuqW.js";import"./button-D6HkJmFA.js";import"./calendar-DPxRaNkJ.js";import"./card-ecxLMRer.js";import"./checkbox-C3IVmT_N.js";import"./chip-set-CfnKJWVU.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-BYRpUe-V.js";import"./date-picker-CGzZFZxN.js";import"./date-range-picker-DHXuCIan.js";import"./divider-DYs1bahi.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-CsNu_zGa.js";import"./open-icon-ejJ-3oqd.js";import"./file-picker-DXBJn6JG.js";import"./floating-action-button-CxwL6GF_.js";import"./inline-message-MRVYAzAu.js";import"./key-item-BmCLLyPg.js";import"./keyboard-shortcut-Bf4tIEHk.js";import"./label-value-CWmtlzqa.js";import"./option-group-L79y3Jcb.js";import"./meter-group-CRddPegR.js";import"./page-state-j1LLkVCi.js";import"./paginator-CTYmqLFP.js";import"./radio-group-2wbcHX_A.js";import"./scaffold-CssrLcVP.js";import"./secret-Pa9Q7GFj.js";import"./select-dropdown-CgLlLwcB.js";import"./select-BEm_mk-O.js";import"./skip-link-CLBNAST_.js";import"./slider-BqlOZw-0.js";import"./split-view-uwsBzyaD.js";import"./stack-Cu7r2NOS.js";import"./stepper-B3eSPYfT.js";import"./switch-ItbIKIMG.js";import"./table-vf8tCVDG.js";import"./tab-panel-RqDD2zgC.js";import"./time-picker-C9oyujmQ.js";import"./timestamp-CNRI7vML.js";import"./toast-Unu0PY3e.js";import"./toolbar-VQ731ONo.js";import"./tooltip-BCLlLAa8.js";import"./tree-item-DDz1tsv2.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-BbQtZKpv.js";import"./split-button-DO01OlVj.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

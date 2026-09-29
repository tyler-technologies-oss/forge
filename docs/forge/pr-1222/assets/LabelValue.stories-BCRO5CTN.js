import{A as n,b as r}from"./iframe-B0EMVDc7.js";import{s as c,b as g,g as b}from"./utils-Dx9-RsVp.js";import{o as u}from"./style-map-CS61OTdp.js";import{e as y}from"./class-map-DYRXDsjk.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D1RrxDFN.js";import"./app-bar-menu-button-Bz0TYTpE.js";import"./app-bar-profile-button-DqfWQLzf.js";import{I as h}from"./icon-C1AADWlB.js";import"./menu-DW_0Y_u0.js";import{i as S}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-B3Ua5Jq9.js";import"./popover-Dj3mHcTQ.js";import"./overlay-BiMQPje5.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-O3NFwJYz.js";import"./list-item-CqtgjLMz.js";import"./avatar-AChA-iGf.js";import"./icon-button-Cfus7nrp.js";import"./autocomplete-B8jvGsfm.js";import"./label-BHpjXJmF.js";import"./base-field-CMhue0TG.js";import"./focus-indicator-fOfraOtv.js";import"./text-field-DN9Z-9eu.js";import"./backdrop-C9lBlb_d.js";import"./badge-CN80SK-J.js";import"./banner-C4v5XUfQ.js";import"./bottom-sheet-CsQM36u3.js";import"./dialog-B49nv5T6.js";import"./button-area-biIIUdah.js";import"./button-toggle-group-DzAS1uKv.js";import"./button-RIwWqmi5.js";import"./calendar-DNEltBVj.js";import"./card-B9NJkrSg.js";import"./checkbox-yyje2zEv.js";import"./chip-set-H6KnpuyL.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-uVY3aJj4.js";import"./date-picker-nbIUfbVQ.js";import"./date-range-picker-CTTR5TRs.js";import"./divider-tMnvnZGL.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-DClQKHR4.js";import"./open-icon-DSbPGXzC.js";import"./file-picker-BQLlgw9k.js";import"./floating-action-button-CcjKNsdt.js";import"./inline-message-BKecgmUf.js";import"./kbd-CZEuOVAY.js";import"./key-item-6yo2kGKT.js";import"./keyboard-shortcut-B9jrniMA.js";import"./label-value-06gdOjV6.js";import"./meter-group-Dxd_fGqH.js";import"./page-state-DdcxjGPv.js";import"./paginator-C-vyTGRR.js";import"./radio-group-C10pj7zM.js";import"./scaffold-ua4VSBPI.js";import"./secret-BKCcA-zi.js";import"./select-dropdown-DwPtBLXn.js";import"./select-B3GuSeL7.js";import"./skip-link-dSW92KEQ.js";import"./slider-DMDnbkvA.js";import"./split-view-B4uEhJlG.js";import"./stack-CzasDS03.js";import"./stepper-DbRGIBUg.js";import"./switch-D4wIiIi5.js";import"./table-DNoePop1.js";import"./tab-panel-Ddv_7U3S.js";import"./time-picker-D8uHPrVR.js";import"./timestamp-DgiUGxoy.js";import"./toast-CMlUQiX1.js";import"./toolbar-D8HmtTbd.js";import"./tooltip-DvlG9nEu.js";import"./tree-item-iLmI6ls2.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-BAyFHASl.js";import"./split-button-bdjXLNDL.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ye=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ye as L,a};

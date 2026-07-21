import{A as p,b as r}from"./iframe-CJhNcN38.js";import{s as c,b as g,g as b}from"./utils-TiAJY-9P.js";import{o as u}from"./style-map-DHYLr7VN.js";import{e as y}from"./class-map-DliI9A76.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C223_CHM.js";import"./app-bar-profile-button-CAcE_y_s.js";import{I as h,e as S}from"./tyler-icons-DVutJ-sn.js";import"./menu-CerL6tjQ.js";import"./linear-progress-Do3VWKo6.js";import"./list-Bcitl4zM.js";import"./popover-B_b22AUE.js";import"./overlay-B_GK-FD4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-334I7GYI.js";import"./avatar-BsPn_JPY.js";import"./icon-button-DsngZIug.js";import"./focus-indicator-9EzLjfI_.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-CHnKwkIl.js";import"./label-CFeTXel8.js";import"./button-CV3Or9sw.js";import"./button-toggle-group-BKdoO-gM.js";import"./checkbox-BWzUMQKt.js";import"./switch-D2G0i_3l.js";import"./base-field-CuMLW2-y.js";import"./text-field-CdGWGHG3.js";import"./backdrop-B0IRqNVE.js";import"./badge-Db9mT6c9.js";import"./banner-DIQygI_6.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-CX74rpUO.js";import"./calendar-Bp_hi_ox.js";import"./card-B_-12FZ6.js";import"./chip-set-D18nxMVK.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-2xJnN1KK.js";import"./date-picker-BNqyfpdV.js";import"./date-range-picker-B0n3eREG.js";import"./divider-B4sEvA_D.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-DPkymO2T.js";import"./open-icon-DDB4Xydl.js";import"./file-picker-BVe2EFGn.js";import"./floating-action-button-COMMlfno.js";import"./inline-message-wW24XM3J.js";import"./key-item-BhhlKqKG.js";import"./keyboard-shortcut-n6fz62OE.js";import"./label-value-DjHFGdMo.js";import"./meter-group-CiIRfysO.js";import"./page-state-DECQz5Rm.js";import"./paginator-zM6C61P5.js";import"./scaffold-F_aQKixv.js";import"./secret-Cw0DGOj8.js";import"./select-dropdown-1b-1Nn2g.js";import"./select-DAbBW1B2.js";import"./skip-link-B4dl9hvM.js";import"./slider-pVXGJiUZ.js";import"./split-view-DJsuqWGn.js";import"./stack-DEQW1E_G.js";import"./stepper-CTPfg2P9.js";import"./table-BD0mxF7J.js";import"./tab-bar-DdOs-p9E.js";import"./time-picker-BKHeUvei.js";import"./timestamp-CzX5TqO_.js";import"./toast-DYpFP9vw.js";import"./toolbar-DW3QxPcn.js";import"./tooltip-BqbAk_Pe.js";import"./tree-item-DCooE2pO.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-CLWcBPHJ.js";import"./split-button-D6zcVlEf.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

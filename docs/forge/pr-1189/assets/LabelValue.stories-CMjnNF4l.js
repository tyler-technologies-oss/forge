import{A as n,b as r}from"./iframe-CYwqMFpx.js";import{s as c,b as g,g as b}from"./utils-BUEgyQuR.js";import{o as u}from"./style-map-iGxuQpg8.js";import{e as y}from"./class-map-BU8lYIPj.js";import"./service-adapter-gy1PbA1l.js";import"./accordion-BbAFW-zG.js";import"./app-bar-menu-button-fB8KMrPO.js";import"./app-bar-profile-button-rxBDKpp4.js";import{I as h,i as S}from"./icon-Tt8SKUgI.js";import"./menu-MsPtpkjZ.js";import"./linear-progress-BGu4ylYb.js";import"./list-CkoA38zs.js";import"./popover-B35Hts03.js";import"./overlay-Cs0NPCFb.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-LiqMF6t1.js";import"./list-item-CZAN63bf.js";import"./avatar-DXT36jsZ.js";import"./icon-button-DFwZyKlJ.js";import"./autocomplete-DeJJZqb-.js";import"./label-Dp2ZPcXR.js";import"./base-field-D_vR6NJB.js";import"./focus-indicator-ujSflWoB.js";import"./text-field-Clx__mgd.js";import"./backdrop-Cme44_g_.js";import"./badge-BgBaSQM8.js";import"./banner-BMSn9Uk5.js";import"./bottom-sheet-BpqXYMPv.js";import"./dialog-DltvDBv-.js";import"./button-area-COd3Yc_N.js";import"./button-toggle-group-KfojCQEN.js";import"./button-DHU_VBE6.js";import"./calendar-f9vYVO8l.js";import"./card-N-G0In5S.js";import"./checkbox-DNzhdoNi.js";import"./chip-set-BaQPIV90.js";import"./state-layer-D75fz-rw.js";import"./circular-progress-D4RaVrYZ.js";import"./color-picker-DHttPtra.js";import"./date-picker-mqNVZvo9.js";import"./date-range-picker-xWigc9us.js";import"./divider-CekVskZe.js";import"./base-drawer-BL5lye2C.js";import"./drawer-lU6k92RL.js";import"./modal-drawer-BZ72iO8w.js";import"./mini-drawer-OoNkqIRy.js";import"./expansion-panel-DX-93Wln.js";import"./open-icon-DQI1fgBS.js";import"./file-picker-Di9mAJ_f.js";import"./floating-action-button-CB2Xhyw3.js";import"./inline-message-BPZn-wv9.js";import"./key-item-C5O1zr69.js";import"./keyboard-shortcut-B59Hc7zC.js";import"./label-value-Arz5rsAk.js";import"./meter-group-JJaTCXmf.js";import"./page-state-DpE8pwA_.js";import"./paginator-DS9ek5iX.js";import"./radio-group-BhgzTalW.js";import"./scaffold-BVJBr1z1.js";import"./secret-BbAvbCcd.js";import"./select-dropdown-Ce_nBtiq.js";import"./select-BIGuyKav.js";import"./skip-link-B4nhO-Xi.js";import"./slider-CdwIts3-.js";import"./split-view-CaghH58h.js";import"./stack-k5bE-KTo.js";import"./stepper-Bj1HTAS-.js";import"./switch-DUXWpkCl.js";import"./table-CmRqRd4K.js";import"./tab-panel-DQc0Wb2z.js";import"./time-picker-BOSjJnW6.js";import"./timestamp-DfCxWnAj.js";import"./toast-Bs4ddvS2.js";import"./toolbar-BV7So2Bl.js";import"./tooltip-DctRAECl.js";import"./tree-item-c5WSOiC6.js";import"./view-switcher-BCdzMvcV.js";import"./deprecated-icon-button-BqTQJ6wG.js";import"./split-button-C8M2GJuz.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ue=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ue as L,a};

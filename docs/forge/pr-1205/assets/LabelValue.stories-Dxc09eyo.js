import{A as n,b as r}from"./iframe-B7LxWkL4.js";import{s as c,b as g,g as b}from"./utils-BgSSl4hg.js";import{o as u}from"./style-map-B4WdC4iL.js";import{e as y}from"./class-map-Bp2Z4U3t.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-ByUxvx3A.js";import"./app-bar-menu-button-CS-fK3VA.js";import"./app-bar-profile-button-BEaWFfDG.js";import{I as h,i as S}from"./tyler-icons-qc11a4hp.js";import"./menu-b7W_YMql.js";import"./linear-progress-Du-Ntegu.js";import"./list-G4hiICeQ.js";import"./popover-C6L45Wod.js";import"./overlay--ryFBZAY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BvzgNeZ5.js";import"./list-item-Dp-tcav_.js";import"./avatar-DbS-5rMy.js";import"./icon-button-BsODWw2P.js";import"./autocomplete-BQTflWeA.js";import"./label-BzpstwPX.js";import"./base-field-B8ua2P5-.js";import"./focus-indicator-DEh1smym.js";import"./text-field-C54iF8q8.js";import"./backdrop-e4rWKi0D.js";import"./badge-CdPUMXX0.js";import"./banner-D_YiAPiB.js";import"./bottom-sheet-C3SMhtk1.js";import"./dialog-qsRa4tTT.js";import"./button-area-Bfj5oCms.js";import"./button-toggle-group-CYP5cQah.js";import"./button-BT0VAunK.js";import"./calendar-CVP_f_MJ.js";import"./card-CJ3h7a6c.js";import"./checkbox-os_ppbgE.js";import"./chip-set-D4KXOvkD.js";import"./state-layer-BcVD1OXH.js";import"./circular-progress-QjF0OwOx.js";import"./color-picker-SNiMJRt5.js";import"./date-picker-DB5hkupA.js";import"./date-range-picker-34ArltN8.js";import"./divider-_UQ5Iqkl.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./expansion-panel-DQf0TsaP.js";import"./open-icon-D020JHVS.js";import"./file-picker-DOiysuP5.js";import"./floating-action-button-C59fwEjZ.js";import"./inline-message-D6TY8UzG.js";import"./key-item-BwLJTHwD.js";import"./keyboard-shortcut-C-aiQcKA.js";import"./label-value-Cs0_BMQ9.js";import"./listbox-DXIjlZ5_.js";import"./meter-group-svRi_zAG.js";import"./page-state-C_fu_Hm3.js";import"./paginator-8EtzZpLq.js";import"./radio-group-CxQp5fxO.js";import"./scaffold-C8LskKFX.js";import"./secret-BeorZPbj.js";import"./option-Vb52xj6p.js";import"./select-dropdown-kYfxYgFR.js";import"./select-BxGnTCUy.js";import"./skip-link-DwFWbz14.js";import"./slider-B1K9jGK0.js";import"./split-view-BdJjpEwr.js";import"./stack-Grf8E1p3.js";import"./stepper-CJWm1pH7.js";import"./switch-C7LPDzvo.js";import"./table-DEa-oTiq.js";import"./tab-panel-Dnh1K199.js";import"./time-picker-gJJiqzeu.js";import"./timestamp-kMpDBYBD.js";import"./toast-0aYeurA_.js";import"./toolbar-DUE3t8Rm.js";import"./tooltip-jHEbDM0A.js";import"./tree-item-p6vfdbsP.js";import"./view-switcher-Cw3vuBIn.js";import"./deprecated-icon-button-CA0uJ76k.js";import"./split-button-eVg0RXPV.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

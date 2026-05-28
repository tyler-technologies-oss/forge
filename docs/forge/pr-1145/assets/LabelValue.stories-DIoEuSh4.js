import{A as p,b as r}from"./iframe-DV1hlnLt.js";import{s as c,b as g,g as b}from"./utils-GdTrqNrR.js";import{o as u}from"./style-map-CySXS6FI.js";import{e as y}from"./class-map-CeCwxORi.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D2KwrrVF.js";import"./app-bar-profile-button-C8xAMLy_.js";import{I as h,e as S}from"./tyler-icons-dYOWTbWz.js";import"./menu-BLfBzRLx.js";import"./linear-progress-BmTkV8LG.js";import"./list-D0b0vzIp.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-HANkWcfy.js";import"./icon-button-DIIeI-ib.js";import"./focus-indicator-CSOOyR2s.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-CeN63Oxh.js";import"./label-DX3CgxL3.js";import"./button-kyjDGESX.js";import"./button-toggle-group-Y_UO5Y63.js";import"./checkbox-DwRo2V7R.js";import"./switch-DcW6YBn7.js";import"./base-field-BOt13iVE.js";import"./text-field-B8VU0z8U.js";import"./backdrop-B-u3npFo.js";import"./badge-CzpZntu8.js";import"./banner-CiQ3nyJ2.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-BkJTLNe-.js";import"./calendar-COl-C_T7.js";import"./card-DkU6wYBo.js";import"./chip-set-BCjs0rfv.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-BCc01TWu.js";import"./date-picker-BRTgcKvp.js";import"./date-range-picker-BqXsQtYd.js";import"./divider-Dw2JUMtf.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-DDioj5v9.js";import"./open-icon-3X5flIxh.js";import"./file-picker-CN4pPUTP.js";import"./floating-action-button-SMFkkcsM.js";import"./inline-message-rggUpLwV.js";import"./key-item-e_lhrayg.js";import"./keyboard-shortcut-BXPRYy6O.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BIgwISPl.js";import"./page-state-B9wnmWpA.js";import"./paginator-BxUdvq2v.js";import"./scaffold-ALuq0Bgn.js";import"./secret-D6TF95lF.js";import"./select-dropdown-CBI6ALpQ.js";import"./select-CaalttxP.js";import"./skip-link-DN9_ByC2.js";import"./slider-Bo3nCWAh.js";import"./split-view-wPmKmPZz.js";import"./stack-DGYl-onA.js";import"./stepper-R3TpHTZs.js";import"./table-DMvX5uYV.js";import"./tab-bar-D84d-y9m.js";import"./time-picker-APmlOckJ.js";import"./toast-DtBRuyAy.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-laiQEc1m.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-Dm4LczhI.js";import"./split-button-Cw3m5b5B.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as p,b as r}from"./iframe-Bm6ogQZk.js";import{s as c,b as g,g as b}from"./utils-DQ34OAOC.js";import{o as u}from"./style-map-DyZSdUSh.js";import{e as y}from"./class-map-fN18Hyul.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DfuJ0XvL.js";import"./app-bar-profile-button-BXYd3iE8.js";import{I as h,e as S}from"./tyler-icons-Cyw--ZSI.js";import"./menu-D40LPVFf.js";import"./linear-progress-DP1CUIRM.js";import"./list-pWISYltu.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-C5qBvaCu.js";import"./icon-button-sAndwBJY.js";import"./focus-indicator-BFy6CZSl.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-bsFV6OGq.js";import"./label-a7LsLXND.js";import"./button-B5JJr1Lo.js";import"./button-toggle-group-C2zgln5K.js";import"./checkbox-Dktn9RJO.js";import"./switch-C0Aj1J8z.js";import"./base-field-BZ3Xm8XF.js";import"./text-field-BTuf9Q8N.js";import"./backdrop-B_VtJyIN.js";import"./badge-CedQ26WI.js";import"./banner-08aQ97Tl.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-V5dvCnaU.js";import"./calendar-BzlwuPBm.js";import"./card-DgXryqyR.js";import"./chip-set-NvcRe2K0.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-17D5xVOb.js";import"./date-picker-5OEloF0Z.js";import"./date-range-picker-DnzLqMLo.js";import"./divider-DIKqIQtx.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-CN3lmwDk.js";import"./open-icon-Bsi-8NJl.js";import"./file-picker-CXsKh9o6.js";import"./floating-action-button-C15og4zu.js";import"./inline-message-BK9gijHu.js";import"./key-item-knLKMh22.js";import"./keyboard-shortcut-DLmOvnUG.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BS_7AuiL.js";import"./page-state-BYBCycIs.js";import"./paginator-CWx-QsGk.js";import"./scaffold-D_SIXSFE.js";import"./select-dropdown-CQSGCq54.js";import"./select-OVXbotC5.js";import"./skip-link-DrtJNXYb.js";import"./slider-CHO49VdN.js";import"./split-view-gKxKJ7lQ.js";import"./stack-BuaXNRar.js";import"./stepper-CFPhquzf.js";import"./table-CNecXgQb.js";import"./tab-bar-BRcXVC9q.js";import"./time-picker-C16yV2bW.js";import"./toast-dstNu1Ma.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-9MxLEXH1.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BHJfDBkY.js";import"./split-button-QSN2MU4h.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...c,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconPerson]);
    return html\`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:t,Icon:s,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,t as D,s as I,ke as L,l as a};

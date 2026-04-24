import{A as p,b as r}from"./iframe-DUkN5F6u.js";import{s as c,b as g,g as b}from"./utils-QQyHyWEl.js";import{o as u}from"./style-map-B7EY9ftD.js";import{e as y}from"./class-map-CfY3KtTY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B-cnkCow.js";import"./app-bar-profile-button-Co6Zx_s5.js";import{I as h,e as S}from"./tyler-icons-JX1t2Wgz.js";import"./menu-B32ONFPp.js";import"./linear-progress-BUmXHJif.js";import"./list-BAO5WLfe.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-CzebwZlC.js";import"./icon-button-BI3Gi8KU.js";import"./focus-indicator-W9h7yghR.js";import"./state-layer-Cext-Euv.js";import"./autocomplete-Bade8mxx.js";import"./label-ChEf3nsR.js";import"./button-BfDjVlOn.js";import"./button-toggle-group-d8VBhwh6.js";import"./checkbox-Zq5Z_KaC.js";import"./switch-DSFhR9rO.js";import"./base-field-fIAFHhCf.js";import"./text-field-DQaGBRQ4.js";import"./backdrop-B_VtJyIN.js";import"./badge-BJ1zHjmA.js";import"./banner-XGO97KM-.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-BRZUtsF-.js";import"./calendar-D5k-kDej.js";import"./card-6J-3YmIr.js";import"./chip-set-DXiXemNA.js";import"./circular-progress-BmiDq0cM.js";import"./color-picker-CX8AQDp2.js";import"./date-picker-DhP_yOyr.js";import"./date-range-picker-7hxtDG6y.js";import"./divider-B9fBVaPR.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DR-_gUVX.js";import"./modal-drawer-DJ67kJSZ.js";import"./mini-drawer-BybnH3Bp.js";import"./expansion-panel-CAbXM4YB.js";import"./open-icon-CnAVOSV2.js";import"./file-picker-BznVrmLi.js";import"./floating-action-button-D-UNxJhl.js";import"./inline-message-DtdgdAmC.js";import"./key-item-SF3u5EXg.js";import"./keyboard-shortcut-XAMlS6sS.js";import"./label-value-CCas1rcR.js";import"./meter-group-DFvlcFJO.js";import"./page-state-CG7zxuxw.js";import"./paginator-BmkKHqF8.js";import"./scaffold-D_SIXSFE.js";import"./secret-CqVY90ks.js";import"./select-dropdown-DNFoFcj4.js";import"./select-C9ARblnh.js";import"./skip-link-CxBPeYBz.js";import"./slider-BBNjY5Go.js";import"./split-view-CYMLb1_M.js";import"./stack-BuaXNRar.js";import"./stepper-Bli_5YoI.js";import"./table-92tS76MY.js";import"./tab-bar-B_88SM4v.js";import"./time-picker-DRuQCNpV.js";import"./toast-BsqeA54N.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-huMzrRDe.js";import"./tree-item-BcMa1zEz.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-ylYrQD7h.js";import"./split-button-sCODDVMY.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

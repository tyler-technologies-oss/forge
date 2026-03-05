import{A as p,b as r}from"./iframe-CG34Pyww.js";import{s as c,b as g,g as b}from"./utils-CUOVSmqg.js";import{o as u}from"./style-map-BqH2Kt10.js";import{e as y}from"./class-map-5ptpAyqn.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-DXXA9fxd.js";import"./expansion-panel-D3Q0t3k2.js";import"./open-icon-CAk2UJIJ.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CaekFkjS.js";import{I as h,e as S}from"./tyler-icons-DJO2-615.js";import"./menu-C-s5Ok3q.js";import"./linear-progress-CdLostcG.js";import"./list-BOJcxtba.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-CvthT5-E.js";import"./icon-button-BOixoLth.js";import"./focus-indicator-684J3Eeo.js";import"./state-layer-n7PzpGlA.js";import"./autocomplete-Vkcx6ozB.js";import"./label-C5i5lXak.js";import"./button-C38ZBOvE.js";import"./button-toggle-group-QHe7ank2.js";import"./checkbox-DNYJINVk.js";import"./switch-BGozN540.js";import"./base-field-uXwsmn5v.js";import"./text-field-cYMENDyC.js";import"./backdrop-C92f0qEt.js";import"./badge-zqJerjRA.js";import"./banner-9M-ZNjW_.js";import"./bottom-sheet-C3I4Q7_b.js";import"./dialog-6H06GjyS.js";import"./button-area-B-n1WBNo.js";import"./calendar-edfIjjF4.js";import"./card-mllA_MQ3.js";import"./chip-set-xisQQT3i.js";import"./circular-progress-Bjkv8PLj.js";import"./color-picker-CY4SHx_z.js";import"./date-picker-PjFBG-qe.js";import"./date-range-picker-CNHz74NZ.js";import"./divider-CKDe_5wd.js";import"./base-drawer-CehscPHD.js";import"./drawer-wD-VciIb.js";import"./modal-drawer-BeSECNts.js";import"./mini-drawer-DAoV4H3z.js";import"./file-picker-L2RveygI.js";import"./floating-action-button-PSY3OTWr.js";import"./inline-message-9zvVMjFA.js";import"./key-item-CS5IjHYg.js";import"./keyboard-shortcut-DtTWALVr.js";import"./label-value-CW81Czz-.js";import"./meter-group-ERHcBfmd.js";import"./page-state-Cg6BV8eb.js";import"./paginator-C0tLhH82.js";import"./scaffold-cHzeNvE0.js";import"./select-dropdown-N5FcI6xS.js";import"./select-B00cieTg.js";import"./skip-link-BFa8J-EF.js";import"./slider-DbIEMAGl.js";import"./split-view-BGV9Iz36.js";import"./stack-4trrgLzF.js";import"./stepper-CbyhA02T.js";import"./table-DL1Qdyvf.js";import"./tab-bar-Cy3yxvY6.js";import"./time-picker-BccOByUf.js";import"./toast-UO3Yh2kF.js";import"./toolbar-C0v5iIUr.js";import"./tooltip-Csbspw17.js";import"./tree-item-Dc-J0k4j.js";import"./view-switcher-FtobpJhv.js";import"./deprecated-icon-button-DWoy1XiS.js";import"./split-button-BmTHybDf.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
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
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],We=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,We as L,l as a};

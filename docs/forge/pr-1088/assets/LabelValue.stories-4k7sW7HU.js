import{A as p,b as r}from"./iframe-B_EPTatV.js";import{s as c,b as g,g as b}from"./utils-BUOWcVje.js";import{o as u}from"./style-map-DfkC4JFt.js";import{e as y}from"./class-map-BXqiYxOz.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-BmDSuovC.js";import"./expansion-panel-gMXAXjxL.js";import"./open-icon-DrWvebNv.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CmDriE6l.js";import{I as h,e as S}from"./tyler-icons-B4xXB1kz.js";import"./menu-BcJc7hM8.js";import"./linear-progress-CdLostcG.js";import"./list-PZUn4syt.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-Ba66sh6a.js";import"./icon-button-Dkrov9e0.js";import"./focus-indicator-B6DsizqW.js";import"./state-layer-n7PzpGlA.js";import"./autocomplete-GyCzMDE0.js";import"./label-CxbNeDya.js";import"./button-C9EdhuMP.js";import"./button-toggle-group-CSyLmzsf.js";import"./checkbox-BX3_i02m.js";import"./switch-BqZ88lwZ.js";import"./base-field-BYUC_oyN.js";import"./text-field-Cg-Ph0uy.js";import"./backdrop-C92f0qEt.js";import"./badge-BowbXbpI.js";import"./banner-CKjrFAmR.js";import"./bottom-sheet-C3I4Q7_b.js";import"./dialog-6H06GjyS.js";import"./button-area-LAuaAr6f.js";import"./calendar-BPKrpaEt.js";import"./card-_CegzURb.js";import"./chip-set-DC7ER8Tg.js";import"./circular-progress-Bjkv8PLj.js";import"./color-picker-qaeGPW9n.js";import"./date-picker-Gkjm58Xr.js";import"./date-range-picker-DMgdyf9D.js";import"./divider-B0lv7rW8.js";import"./base-drawer-CehscPHD.js";import"./drawer-wD-VciIb.js";import"./modal-drawer-BeSECNts.js";import"./mini-drawer-DAoV4H3z.js";import"./file-picker-iP2WifmW.js";import"./floating-action-button-DKtq_1uY.js";import"./inline-message-9zvVMjFA.js";import"./key-item-b48_0zm3.js";import"./keyboard-shortcut-BkmFWtpY.js";import"./label-value-CW81Czz-.js";import"./meter-group-gWbH_LTU.js";import"./page-state-Cg6BV8eb.js";import"./paginator-Db7pzfGH.js";import"./scaffold-cHzeNvE0.js";import"./select-dropdown-CkA16L-s.js";import"./select-B41K0D2P.js";import"./skip-link-DvlqA0Fh.js";import"./slider-BeZdc4AW.js";import"./split-view-BreZ-jiq.js";import"./stack-4trrgLzF.js";import"./stepper-Cn6Wpu9I.js";import"./table-qXWF0Anl.js";import"./tab-bar-BJfofAK1.js";import"./time-picker-s0RQSPVE.js";import"./toast-CbqduD09.js";import"./toolbar-C0v5iIUr.js";import"./tooltip-Csbspw17.js";import"./tree-item-CWpohSXK.js";import"./view-switcher-FtobpJhv.js";import"./deprecated-icon-button-Cb2kTmZH.js";import"./split-button-BpDxUCCg.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

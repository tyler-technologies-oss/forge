import{A as p,b as r}from"./iframe-5LTq8wZ1.js";import{s as c,b as g,g as b}from"./utils-DLgMzbe-.js";import{o as u}from"./style-map-B1hZUNKj.js";import{e as y}from"./class-map-BYHTwZJA.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BbIQ9d_o.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BxSCSkr-.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-BUDKaCFA.js";import{I as h,e as S}from"./tyler-icons-B0WPf66k.js";import"./menu-5brkJPhI.js";import"./linear-progress-CsYLd0m5.js";import"./list-CoogCWRP.js";import"./popover-zm7hjeEB.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar-IOimUBpN.js";import"./icon-button-DdBWwuxf.js";import"./autocomplete-r0hyVo45.js";import"./label-BIL6v9gy.js";import"./button-PV3UPUps.js";import"./button-toggle-group-6Pgmj0Bd.js";import"./checkbox-Di24v2pW.js";import"./switch-BrPNI0aD.js";import"./base-field-Br5NrBI4.js";import"./text-field-ByQIIUxH.js";import"./backdrop-ZqVEdIYI.js";import"./badge-DxcOAqFV.js";import"./banner-CRJ22SFM.js";import"./bottom-sheet-DCXcVNc8.js";import"./dialog-CvQkKqsY.js";import"./button-area-1-jjKHAz.js";import"./calendar-DOJFcr6P.js";import"./card-spzh0Jga.js";import"./chip-set-Hd7Fa2C2.js";import"./circular-progress-Ctu3rS_y.js";import"./color-picker-O8fXZ1aH.js";import"./date-picker-B_PR1X4p.js";import"./date-range-picker-BZFIZqdU.js";import"./divider-DtS4IZ9-.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./mini-drawer-B6eLxgR7.js";import"./file-picker-BWYlqgVT.js";import"./floating-action-button-BparxTvV.js";import"./inline-message-BmHmX7vQ.js";import"./key-item-BSAnBCdK.js";import"./keyboard-shortcut-C5gmWfMz.js";import"./label-value-D-KSqHDU.js";import"./meter-group-CzBXynpW.js";import"./page-state-BU7mMB2L.js";import"./paginator-BJcHCttg.js";import"./scaffold-B_qTjcmL.js";import"./select-dropdown-Cgs4BIKS.js";import"./select-BiBsBeJz.js";import"./skip-link-ZwvhR2Wb.js";import"./slider-DQKk8sbl.js";import"./split-view-CiuYynH0.js";import"./stack-D2V5d6LJ.js";import"./stepper-DHbtW0vb.js";import"./table-SHq42C9v.js";import"./tab-bar-DLtj2yiU.js";import"./time-picker-BlLy3QKH.js";import"./toast-V63Ws1yv.js";import"./toolbar-BK4uxBaY.js";import"./tooltip-BUHZd4St.js";import"./tree-item-CwTnn4Xq.js";import"./view-switcher-BOebY1Oz.js";import"./deprecated-icon-button-nWxpz0Ug.js";import"./split-button-CncDznkl.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

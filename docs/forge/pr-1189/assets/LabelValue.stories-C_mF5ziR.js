import{A as p,b as r}from"./iframe-D3Oii2TL.js";import{s as c,b as g,g as b}from"./utils-B3jYbaiS.js";import{o as u}from"./style-map-CFX20BJT.js";import{e as y}from"./class-map-DTWMORMG.js";import"./service-adapter-8tADcN_b.js";import"./accordion-xon7q9UB.js";import"./app-bar-profile-button-LuYDSuN9.js";import{I as h,e as S}from"./tyler-icons-CWFKOemj.js";import"./menu-YpU1T97T.js";import"./linear-progress-DLb8lZjg.js";import"./list-BRTZHC4C.js";import"./popover-88j80EOP.js";import"./overlay-yYpcIpns.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DYD8m2j0.js";import"./avatar-Dy5q_LfY.js";import"./icon-button-C1Zmz9J7.js";import"./focus-indicator-BZl6qRLK.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-Dg-mRnz_.js";import"./label-DTIviHOl.js";import"./button-CSCDv7wg.js";import"./button-toggle-group-CZruN2gd.js";import"./checkbox-DU0EpUEb.js";import"./switch-Cw2nKkSw.js";import"./base-field-CR_hTikp.js";import"./text-field-CYnraT90.js";import"./backdrop-Br-v5NXK.js";import"./badge-L6rs5pcC.js";import"./banner-DUWOzB9J.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-CWkj8I3u.js";import"./calendar-xHVN8nHw.js";import"./card-Cd_meIIC.js";import"./chip-set-NK8Ojnhm.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Botcygnb.js";import"./date-picker-B66ftVR2.js";import"./date-range-picker-BpDx_aD7.js";import"./divider-H-88T8WR.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-CzjCjPr6.js";import"./open-icon-CXT7NKc4.js";import"./file-picker-CRTSjFpI.js";import"./floating-action-button-CTbRIuvu.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Dwfo4wKW.js";import"./keyboard-shortcut-Be8UgwGQ.js";import"./label-value-C46r41pN.js";import"./meter-group-CCB5zD9x.js";import"./page-state-BeEclPwI.js";import"./paginator-Cin71aaV.js";import"./scaffold-B-1oYF3d.js";import"./secret-DMQ20Lqn.js";import"./select-dropdown-CqT4T8LQ.js";import"./select-4VeiR_E8.js";import"./skip-link-U9uAPDqg.js";import"./slider-II9xeD0l.js";import"./split-view-DCVv6yxF.js";import"./stack-DskzmGQg.js";import"./stepper-BhrMidWQ.js";import"./table-Dtslqp1Z.js";import"./tab-bar-DArwSYyW.js";import"./time-picker-Bk2nVnhH.js";import"./toast-CH8tcr-Y.js";import"./toolbar-D_dMkHw9.js";import"./tooltip-DeV8GtrX.js";import"./tree-item-4phMPsI4.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CXgpBibf.js";import"./split-button-jR_B11fs.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

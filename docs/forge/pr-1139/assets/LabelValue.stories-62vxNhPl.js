import{A as p,b as r}from"./iframe-BK3r3gy1.js";import{s as c,b as g,g as b}from"./utils-ZPyYhNMY.js";import{o as u}from"./style-map-B-zzhRls.js";import{e as y}from"./class-map-DK01xFt-.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CBK0azhz.js";import"./app-bar-profile-button-Bc88X_6L.js";import"./icon-CXw8uXM_.js";import{I as h,e as S}from"./tyler-icons-uU9Yd7lf.js";import"./menu-oM4UPGdx.js";import"./linear-progress-D8EbdkBB.js";import"./list-CRxpAe8T.js";import"./popover-HtFB3a_u.js";import"./overlay-B3G4TIM3.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-CAo0Ux7j.js";import"./avatar-B9BCroA5.js";import"./icon-button-Mxsm8Q6s.js";import"./focus-indicator-BBtCjyD8.js";import"./state-layer-Kw6pmYRH.js";import"./autocomplete-DJ63dKj8.js";import"./label-BfNTkqXX.js";import"./button-558tNDpa.js";import"./button-toggle-group-B_NQutYT.js";import"./checkbox-Czva33aP.js";import"./switch-AGgnckDO.js";import"./base-field-DWygkCL_.js";import"./text-field-Cel5Wjfj.js";import"./backdrop-a1S5RG8l.js";import"./badge-QMYMXgwr.js";import"./banner-J5qP2dCT.js";import"./bottom-sheet-D5T4IZuN.js";import"./dialog-DJEPAlvV.js";import"./button-area-DiGtPAb0.js";import"./calendar-B1JeLOEF.js";import"./card-Ck5qVP45.js";import"./chip-set-DfdspMPI.js";import"./circular-progress-Si-T5t1M.js";import"./color-picker-BprQxU5o.js";import"./date-picker-OGT6zjhS.js";import"./date-range-picker-BIF25fiL.js";import"./divider-BG1pHrzo.js";import"./base-drawer-CUYrr1Bq.js";import"./drawer-CDB0iEbf.js";import"./modal-drawer-C8vaVfK9.js";import"./mini-drawer-Bip3vlRk.js";import"./expansion-panel-Hh-RCnGo.js";import"./open-icon-CFmphaM2.js";import"./file-picker-O1FH0qPW.js";import"./floating-action-button-7aUsPFml.js";import"./inline-message-tKqAf8mr.js";import"./key-item-DS-jHBM0.js";import"./keyboard-shortcut-CvBjdgZr.js";import"./label-value-Cdqxole-.js";import"./meter-group-XUAI_tEJ.js";import"./page-state-B_vh_0Mk.js";import"./paginator-B-YVev9D.js";import"./scaffold-4YYLz8U4.js";import"./secret-BZStBRQF.js";import"./select-dropdown-DpeBoWee.js";import"./select-c4QyAe02.js";import"./skip-link-DAfehOCZ.js";import"./slider-n8CY4O4L.js";import"./split-view-vxLkhmwW.js";import"./stack-B-rTgSVu.js";import"./stepper-DbM8aFYp.js";import"./table-DzQmg83A.js";import"./view-switcher-BULqZKYq.js";import"./tab-bar-BoE821TQ.js";import"./time-picker-DbRN0xjg.js";import"./toast-CvAPX4Su.js";import"./toolbar-BB4q_Mxo.js";import"./tooltip-CePIGaWS.js";import"./tree-item-B6EW5pNY.js";import"./deprecated-icon-button-DA0u0hVr.js";import"./split-button-DAdsS1aE.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

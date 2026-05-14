import{A as p,b as r}from"./iframe-54dvmREw.js";import{s as c,b as g,g as b}from"./utils-CHhwppm_.js";import{o as u}from"./style-map-Z_yVS67s.js";import{e as y}from"./class-map-BovTmPJY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-81htP23C.js";import"./app-bar-profile-button-BwnTk-mH.js";import{I as h,e as S}from"./tyler-icons-C6Hny9SR.js";import"./menu-CEtVCZob.js";import"./linear-progress-CQSap4jm.js";import"./list-BW0qa89W.js";import"./popover-CUHnDXdw.js";import"./overlay-5BgNu8Uy.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-B1DH9z7r.js";import"./icon-button-CuL33LTi.js";import"./focus-indicator-DGginyZZ.js";import"./state-layer-DF73syxT.js";import"./autocomplete-B5Z7uxJe.js";import"./label-C_tGyKn-.js";import"./button-D03bOLfT.js";import"./button-toggle-group-BXJNUo8n.js";import"./checkbox-BWaV4RnL.js";import"./switch-BrGCo5jz.js";import"./base-field-Cgs4C_gj.js";import"./text-field-XCsJ9gz7.js";import"./backdrop-B_VtJyIN.js";import"./badge-Cp5I_N9k.js";import"./banner-CewP9xrV.js";import"./bottom-sheet-DKT8q8tz.js";import"./dialog-Dwl3PZbB.js";import"./button-area-B6AV5aA8.js";import"./calendar-Zbwr_jCm.js";import"./card-BIM78596.js";import"./chip-set-FNeG1f1-.js";import"./circular-progress-CaUNetLo.js";import"./color-picker-D6HznS4I.js";import"./date-picker-B6fr2voX.js";import"./date-range-picker-Co7Rj-ds.js";import"./divider-DypuW_Kz.js";import"./base-drawer-CyU1ZunB.js";import"./drawer-YtzVjQMj.js";import"./modal-drawer-Br-skC4C.js";import"./mini-drawer-CdmHaLKa.js";import"./expansion-panel-D64QXYyR.js";import"./open-icon-BGtJLnPm.js";import"./file-picker-CU5n8lT7.js";import"./floating-action-button-D8mZET05.js";import"./inline-message-CeWMjtBE.js";import"./key-item-C0TPAHC6.js";import"./keyboard-shortcut-CUnpd7xo.js";import"./label-value-DMg7pXRQ.js";import"./meter-group-D0eMI3o2.js";import"./page-state-CtvoNG-u.js";import"./paginator-CQvi_G9X.js";import"./scaffold-D_SIXSFE.js";import"./secret-BtUY4-zR.js";import"./select-dropdown-VuFLf0g6.js";import"./select-BtRTen42.js";import"./skip-link-S4ScUpoD.js";import"./slider-CfTQ9OmJ.js";import"./split-view-W3JLlKcx.js";import"./stack-D5YailS3.js";import"./stepper-DKnPRIB_.js";import"./table-CQJf4w1e.js";import"./tab-bar-P6302d8N.js";import"./time-picker-Dmc4wQeB.js";import"./toast-CzCJ5VkW.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-DMvFQEd_.js";import"./tree-item-DY-5BhKK.js";import"./view-switcher-LXtNBul2.js";import"./deprecated-icon-button-u-17CUHh.js";import"./split-button-40nrKkoK.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as p,b as r}from"./iframe-DoUS1-oo.js";import{s as c,b as g,g as b}from"./utils-GdTrqNrR.js";import{o as u}from"./style-map-BDDe6PLd.js";import{e as y}from"./class-map-nDJiKYwN.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CmBu2Xh3.js";import"./app-bar-profile-button-e9AhMT01.js";import{I as h,e as S}from"./tyler-icons-cwljV7td.js";import"./menu-CYyuvI-B.js";import"./linear-progress-dFUODLVX.js";import"./list-D34uG9M-.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-sfPSa9bB.js";import"./icon-button-DXwfZBq8.js";import"./focus-indicator-BqjQwaKb.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-B8hUerUr.js";import"./label-CCJpr-qV.js";import"./base-field-B0DwcZ0I.js";import"./text-field-UbjFyvkY.js";import"./backdrop--ezx6yHr.js";import"./badge-CN-nBqa4.js";import"./banner-CVU8hgrJ.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-BGm8V4K7.js";import"./button-toggle-group-CGpzQFu7.js";import"./button-BQPRgvho.js";import"./calendar-C5Yt0nLt.js";import"./card-DsVYzzkj.js";import"./checkbox-0sN7Tiv3.js";import"./chip-set-ci30GtYc.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-DoW3er2A.js";import"./date-picker-B5yV8I7d.js";import"./date-range-picker-Cvw-AC4C.js";import"./divider-7SlL6Ghb.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-DyPbB3I8.js";import"./open-icon-MMNJG2ay.js";import"./file-picker-8r5nIqO1.js";import"./floating-action-button-Cewtgn1I.js";import"./inline-message-1YYbEfHN.js";import"./key-item-Di7mVB3O.js";import"./keyboard-shortcut-B6AhE7hD.js";import"./label-value-CMJEsLJf.js";import"./meter-group-OBA6AxJe.js";import"./page-state-BwPC_Hd9.js";import"./paginator-2J1KAM9T.js";import"./radio-group-C2-FmNKb.js";import"./scaffold-BAVRvYZ-.js";import"./secret-BywGxhhg.js";import"./select-dropdown-pFCPNtNg.js";import"./select-Df9t-6Ez.js";import"./skip-link-D2-7vBj9.js";import"./slider-DGwt45W0.js";import"./split-view-D1ZrSCr1.js";import"./stack-BRmnsrL_.js";import"./stepper-BA5RddMe.js";import"./switch-CJrXoDMA.js";import"./table-FnyG0Fbi.js";import"./tab-bar-ZGRHcvji.js";import"./time-picker-_3cPMKbz.js";import"./toast-DvwTNgpF.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-Buq1zWrJ.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-CLYUh4Lb.js";import"./split-button-GViXqYUR.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

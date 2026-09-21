import{A as n,b as r}from"./iframe-DwkZy6ch.js";import{s as c,b as g,g as b}from"./utils-CElmhe9Y.js";import{o as u}from"./style-map-dMaxBFya.js";import{e as y}from"./class-map-D8QunlD9.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-CtJ72rDV.js";import"./app-bar-menu-button-D3dPyZpV.js";import"./app-bar-profile-button-BTbgdMiS.js";import{I as h,i as S}from"./tyler-icons-9EkLoMUE.js";import"./menu-Bd2MhDLk.js";import"./linear-progress-VpC6qUWa.js";import"./list-Bduf0Zil.js";import"./popover-C4YB0wev.js";import"./overlay-B-1J0zGL.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Bcd9Y6-A.js";import"./list-item-CIx9kMCC.js";import"./avatar-DLDYNb-a.js";import"./icon-button-DXyGa-P5.js";import"./autocomplete-Xjgqcxaa.js";import"./label-70FYznpm.js";import"./base-field-5Se0asf2.js";import"./focus-indicator-BtaUH7my.js";import"./text-field-CV-bF5Ih.js";import"./backdrop-Dvs4MPLP.js";import"./badge-C2VBIu6v.js";import"./banner-Bu8Anzju.js";import"./bottom-sheet-B0j07x_I.js";import"./dialog-QJx-v7BT.js";import"./button-area-oUFLLW2c.js";import"./button-toggle-group-vd5ZbBBl.js";import"./button-QeQK8Yg7.js";import"./calendar-DSvvH4nC.js";import"./card-DxaruR79.js";import"./checkbox-Bi8KCRa6.js";import"./chip-set-CEQkdvSk.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-33E9RlL_.js";import"./date-picker-BGVTb3QZ.js";import"./date-range-picker-BQKMRHcU.js";import"./divider-71N8vs5P.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-B1ffAQW3.js";import"./open-icon-CGQUjBxf.js";import"./file-picker-C5QWQifj.js";import"./floating-action-button-4iTEpwaw.js";import"./inline-message-BXrlbIvc.js";import"./key-item-DSAYwxkp.js";import"./keyboard-shortcut-C_nFFeng.js";import"./label-value-CDNJ622N.js";import"./meter-group-IEtErnoG.js";import"./page-state-C_fHeyC9.js";import"./paginator-CNKT7gwL.js";import"./radio-group-zg5FoE70.js";import"./scaffold-D8DtzjhO.js";import"./secret-7ORwUKq9.js";import"./select-dropdown-DTUdN2Jt.js";import"./select-Bn-DBh6r.js";import"./skip-link-CL6ldFss.js";import"./slider-B_cIa7DA.js";import"./split-view-DeW7eSg7.js";import"./stack-E4V9OTtJ.js";import"./stepper-mhphRrIG.js";import"./switch-BcwTBrV_.js";import"./table-mjgiOhyJ.js";import"./tab-panel-CS7YLRpv.js";import"./time-picker-CKBED7L1.js";import"./timestamp-DRq0YvCI.js";import"./toast-BlHodLii.js";import"./toolbar-BuA_G-vH.js";import"./tooltip-DOmotIMW.js";import"./tree-item-B9-ge35T.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-D4R-HzXn.js";import"./split-button-DUsg5XgJ.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
    `)},a={...c,args:{inline:!0}},l={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const p=g(f)??{};o&&(p.maxWidth="150px");const v=p?u(p):n;return r`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":o})} style=${v}>
        ${d?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:n}
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ue=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ue as L,a};

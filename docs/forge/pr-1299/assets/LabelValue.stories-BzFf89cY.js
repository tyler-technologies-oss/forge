import{A as n,b as r}from"./iframe-Q5Y6f9_2.js";import{s as c,b as g,g as b}from"./utils-CMQDsowF.js";import{o as u}from"./style-map-BzWo1Eiz.js";import{e as y}from"./class-map-DfIRgzLU.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DsiFsvkS.js";import"./app-bar-menu-button-DYxVzecB.js";import"./app-bar-profile-button-eSQkBmGF.js";import{I as h}from"./icon-CCxVJeCf.js";import"./menu-mGzVzeq9.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-Dipdj3Cz.js";import"./popover-B4mnVz4Z.js";import"./overlay-BkGC6i7p.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-Btc2_5ZV.js";import"./list-item-i9N1Pjln.js";import"./avatar-CPZHKmQP.js";import"./icon-button-btwNpeCp.js";import"./autocomplete-DLYTm6mI.js";import"./label-DixtrICL.js";import"./base-field-Du0AVBZp.js";import"./focus-indicator-DqJ5p9rG.js";import"./text-field-BbVn4awb.js";import"./backdrop-ngk7d2eo.js";import"./badge-DN88PClb.js";import"./banner-mUSVEBV8.js";import"./bottom-sheet-CWEsHpPT.js";import"./dialog-swqg_AKW.js";import"./button-area-_0uCXhu3.js";import"./button-toggle-group-B2fbgfyH.js";import"./button-pGUTgqOB.js";import"./calendar-KYt-9WCq.js";import"./card-BwLVvmyQ.js";import"./checkbox-DITcLgty.js";import"./chip-set-4Bsltn7F.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-D9AsMNpU.js";import"./date-picker-CIzTfNQa.js";import"./date-range-picker-lkUwa_qg.js";import"./divider-BzO45Rfk.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-eoaNWshX.js";import"./open-icon-CYa-Pieg.js";import"./file-picker-CoPvQztK.js";import"./floating-action-button-CAm3VVGh.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-DK7slNqD.js";import"./key-item-RC6OGVFD.js";import"./keyboard-shortcut-5eW5h7Wb.js";import"./label-value-C0-wovkK.js";import"./listbox-CyjuQ-Id.js";import"./meter-group-BB-xqn_Y.js";import"./page-state-DvaZGddB.js";import"./paginator-BjBrK1ug.js";import"./process-stepper-B5ZymMN5.js";import"./radio-group-DRy0HhkU.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CPislPO4.js";import"./option-9FimUq1N.js";import"./select-dropdown-Dv9OLqVG.js";import"./select-DQTlfzNb.js";import"./skip-link-5wLVTjaA.js";import"./slider-BlO9Kr_M.js";import"./split-view-MYGMgNqo.js";import"./stack-Bd7iC-xk.js";import"./stepper-BFoHUQjg.js";import"./switch-B5RV0qPG.js";import"./table-DlfEz7Nv.js";import"./tab-panel-B-I8yLbg.js";import"./time-picker-B4PLeshn.js";import"./timestamp-BVqqpi7b.js";import"./toast-CtJuwt_N.js";import"./toolbar-BAqfK8WK.js";import"./tooltip-DV18Ft3B.js";import"./tree-item-D9KV4ZT8.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CbSH_EdX.js";import"./split-button-CBpOngS1.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <span slot="label">Label</span>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],rr=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,rr as L,a};

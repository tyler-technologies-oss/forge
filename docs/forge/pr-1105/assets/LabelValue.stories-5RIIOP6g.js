import{A as p,b as r}from"./iframe-C07_izNT.js";import{s as c,b as g,g as b}from"./utils-B3m7KQiq.js";import{o as u}from"./style-map-DKtD9blK.js";import{e as y}from"./class-map-Dpr8fGyd.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BGI3m56J.js";import"./app-bar-profile-button-DsBoMkv6.js";import{I as h,e as S}from"./tyler-icons-fP-z9z1i.js";import"./index-DTwfV0k0.js";import"./menu-DCHQAwat.js";import"./linear-progress-g34J3BlM.js";import"./list-D_-uWQM4.js";import"./popover-DSGvC3fA.js";import"./overlay-Bcsgewax.js";import"./skeleton-C_yfi0NG.js";import"./avatar-Q39TJc0M.js";import"./icon-button-DM1nATYu.js";import"./focus-indicator-CXn9rWMK.js";import"./state-layer-BsCfz34t.js";import"./autocomplete-CI7Bh8Zy.js";import"./label-C6FUeE-w.js";import"./button-BHFcZZh0.js";import"./button-toggle-group-fHeSNXzP.js";import"./checkbox-gX6kE-qO.js";import"./switch-CK2cqgnY.js";import"./base-field-CEekToEX.js";import"./text-field-BXpA3LZ6.js";import"./backdrop-B9sZOcNp.js";import"./badge-lT9fck_t.js";import"./banner-Dh6mPXjn.js";import"./bottom-sheet-Ci5YcrRY.js";import"./dialog-C9AF9uqq.js";import"./button-area-CC12g-dL.js";import"./calendar-yPEfLGDB.js";import"./card-CEQtzTox.js";import"./chip-set-BdyeEYKz.js";import"./circular-progress-CCLVy_ad.js";import"./color-picker-BDKOT4mo.js";import"./date-picker-CkOmP1YI.js";import"./date-range-picker-Bup_FTCz.js";import"./divider-BUGsg7NB.js";import"./base-drawer-iGLMTyCj.js";import"./drawer-C-0etnGZ.js";import"./modal-drawer-DEEX0WZG.js";import"./mini-drawer-rL418fzY.js";import"./expansion-panel-DJx9zX1O.js";import"./open-icon-BVRD-J94.js";import"./file-picker-Dk72iNJa.js";import"./floating-action-button-Budp11WG.js";import"./inline-message-DH9Yz0cL.js";import"./key-item-DI_UG27x.js";import"./keyboard-shortcut-Bjgx-7Oa.js";import"./label-value-CSUslzUh.js";import"./meter-group-BAEqMWtk.js";import"./page-state-cCaRF79S.js";import"./paginator-B4e7pSQW.js";import"./scaffold-Lrq4JV9O.js";import"./select-dropdown-BPshTfAQ.js";import"./select-CVAYiG9b.js";import"./skip-link-Bnim_CaD.js";import"./slider-NH16rOfx.js";import"./split-view-Bt2il7ys.js";import"./stack-ClIWuQav.js";import"./stepper-RSLeaoi1.js";import"./table-4FsG5xWk.js";import"./tab-bar-HjtnoxBk.js";import"./time-picker-BnA1wokk.js";import"./toast-D7w5g0A3.js";import"./toolbar-DtwiO902.js";import"./tooltip-D8EeGsiQ.js";import"./tree-item-BltrJIEP.js";import"./view-switcher-e7DS3krj.js";import"./deprecated-icon-button-BuAwYzER.js";import"./split-button-PUFGBH1r.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

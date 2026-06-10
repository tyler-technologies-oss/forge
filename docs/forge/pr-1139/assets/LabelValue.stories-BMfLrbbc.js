import{A as p,b as r}from"./iframe-B4qL4WW8.js";import{s as c,b as g,g as b}from"./utils-BAJ2NYw0.js";import{o as u}from"./style-map-DzVWdP-R.js";import{e as y}from"./class-map-BYoKVp-s.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CzuVxpXq.js";import"./app-bar-profile-button-BMG5G6lJ.js";import{I as h,e as S}from"./tyler-icons-N_dRJhWh.js";import"./menu-rhjmP1El.js";import"./linear-progress-DLb8lZjg.js";import"./list-MRfQ1ZFc.js";import"./popover-BgA7_RAN.js";import"./overlay-BeM6eaPr.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-CySrahNq.js";import"./icon-button-BM3J1fbO.js";import"./focus-indicator-CWvPPMO_.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-ZbtZOCgJ.js";import"./label-Cez-rt1T.js";import"./button-KwClblCq.js";import"./button-toggle-group-BxYW3cle.js";import"./checkbox-BLVeyHfZ.js";import"./switch-nalHzitq.js";import"./base-field-uheUCyyA.js";import"./text-field-_spscdWS.js";import"./backdrop-Br-v5NXK.js";import"./badge-GvuSpuZR.js";import"./banner-BnIxuUaW.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-8sNEeqhF.js";import"./calendar-qRVzwEmp.js";import"./card-BXpTr0jx.js";import"./chip-set-DO9H8W5i.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-DxH4JKCg.js";import"./date-picker-XDPLC6vP.js";import"./date-range-picker-CJu-XkHt.js";import"./divider-CJu1o6qy.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-ins2ej8m.js";import"./open-icon-i2OabBmg.js";import"./file-picker-Do0HCc7f.js";import"./floating-action-button-C-eydPIS.js";import"./inline-message-EO-dHXbB.js";import"./key-item-BgicAxKR.js";import"./keyboard-shortcut-Ce-dNs6X.js";import"./label-value-C46r41pN.js";import"./meter-group-DuArPAL8.js";import"./page-state-BeEclPwI.js";import"./paginator-lhLGAd7B.js";import"./scaffold-B-1oYF3d.js";import"./secret-BFIaEYTi.js";import"./select-dropdown-DEkDJFtK.js";import"./select-Drakk4YN.js";import"./skip-link-BV48jx5L.js";import"./slider-Bmq-0B5Q.js";import"./split-view-Cbp261iT.js";import"./stack-DskzmGQg.js";import"./stepper-Da9s5Vxg.js";import"./table-Dxp3qESg.js";import"./tab-bar-BpMv8GmY.js";import"./time-picker-Kdn5w6bR.js";import"./toast-zxhFedNH.js";import"./toolbar-DlCov7p1.js";import"./tooltip-CbELgf5o.js";import"./tree-item-3QuB55Ib.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-B3gBfOA_.js";import"./split-button-BzgFw8EF.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

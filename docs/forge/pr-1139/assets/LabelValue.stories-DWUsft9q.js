import{A as p,b as r}from"./iframe-VEfyHWkW.js";import{s as c,b as g,g as b}from"./utils-BX30PoUy.js";import{o as u}from"./style-map-CVDwaut4.js";import{e as y}from"./class-map-BWpEeklq.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BGUENz2t.js";import"./app-bar-profile-button-CtIwlyr1.js";import{I as h,e as S}from"./tyler-icons-DXmxhIwE.js";import"./menu-D7IgUWs-.js";import"./linear-progress-CKPFd0xY.js";import"./list-CeiFAVN-.js";import"./popover-BS-OVdsI.js";import"./overlay-D2sOlsKa.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-D_CNZBur.js";import"./icon-button-C-tZnLZ9.js";import"./focus-indicator-wqDlsb_E.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-DD4L4otT.js";import"./label-DfBB20aY.js";import"./button-C2C39vE8.js";import"./button-toggle-group-BSUSg7i_.js";import"./checkbox-CkPWqzNQ.js";import"./switch-ouNxs7Nk.js";import"./base-field-BHMDuxhn.js";import"./text-field-Bib6mwff.js";import"./backdrop-DuhijlGd.js";import"./badge-Dz1bXeVq.js";import"./banner-6yksRxN4.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-D92EmbYK.js";import"./calendar-BUtVCiaB.js";import"./card-D1cX1f_S.js";import"./chip-set-a8_nCQYQ.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-DBDYrKWE.js";import"./date-picker-B809OjEq.js";import"./date-range-picker-CSjAlYHH.js";import"./divider-tA9VXx0m.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-DdIyCOp2.js";import"./open-icon-DoldPooA.js";import"./file-picker-DpSkCTiY.js";import"./floating-action-button-CUXG2Omc.js";import"./inline-message-CzR1CZl4.js";import"./key-item-CPRmM_91.js";import"./keyboard-shortcut-Be0Xwg37.js";import"./label-value-CI8WZIke.js";import"./meter-group-BMDp57mH.js";import"./page-state-DLzWYTpL.js";import"./paginator-DGwRw1mH.js";import"./scaffold-D6_2VrU0.js";import"./secret-D9LP_p2Y.js";import"./select-dropdown-Bq0o7KWU.js";import"./select-C7BZPiSQ.js";import"./skip-link-C3SmsL6L.js";import"./slider-js1t_5QK.js";import"./split-view-Ne00lBdM.js";import"./stack-DqNjYC3W.js";import"./stepper-BGskvG6b.js";import"./table-YG5qc9xJ.js";import"./tab-bar-BQSkWRIy.js";import"./time-picker-DEtMaql2.js";import"./toast-C2oiM28E.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-CXOV95To.js";import"./tree-item-DZvGxMyi.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-DBx8e_ny.js";import"./split-button-C60EwTuE.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as p,b as r}from"./iframe-BhK0cOWW.js";import{s as c,b as g,g as b}from"./utils-CCSzXMC0.js";import{o as u}from"./style-map-BqsNIil4.js";import{e as y}from"./class-map-CVOXVhjV.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BRdNQYdD.js";import"./app-bar-profile-button-b9jaTsfB.js";import{I as h,e as S}from"./tyler-icons-D2d9_cUK.js";import"./menu-f0usgW17.js";import"./linear-progress-DLb8lZjg.js";import"./list-DliWSL65.js";import"./popover-RdTjaaWq.js";import"./overlay-BUwiotyV.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-DEwx1SfH.js";import"./icon-button-qZQTjUiV.js";import"./focus-indicator-CudRM6ZX.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-DnGGcPXK.js";import"./label-YWi1B70Y.js";import"./button-Db24jlQk.js";import"./button-toggle-group-CZFL1Ntf.js";import"./checkbox-CSxhwcLK.js";import"./switch-Bv3dUswh.js";import"./base-field-8DknNgVO.js";import"./text-field-DYtRboDF.js";import"./backdrop-Br-v5NXK.js";import"./badge-C8MtQ_NJ.js";import"./banner-DnyNpnVF.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-Cdmo8I7N.js";import"./calendar-B9YkXU1S.js";import"./card--82LJzjK.js";import"./chip-set-BdpxUNqv.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-BRfO8aMA.js";import"./date-picker-Ct2CR7jY.js";import"./date-range-picker-DTq4zZvU.js";import"./divider-mKuI6uTW.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-7hnlznsr.js";import"./open-icon-Bt0t9qIS.js";import"./file-picker-CXIIpl0l.js";import"./floating-action-button-Y9_LOM-y.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Nb9D2L8z.js";import"./keyboard-shortcut-Cc2laHQQ.js";import"./label-value-C46r41pN.js";import"./meter-group-D2qk4w2O.js";import"./page-state-BeEclPwI.js";import"./paginator-CKn102FR.js";import"./scaffold-B-1oYF3d.js";import"./secret-sNsBN_cf.js";import"./select-dropdown-R1lcjpLg.js";import"./select-0wczanmp.js";import"./skip-link-C3pKafzz.js";import"./slider-Bit6Xbev.js";import"./split-view-Bxes9hU9.js";import"./stack-DskzmGQg.js";import"./stepper-DO4lsU3d.js";import"./table-vE6Hhona.js";import"./tab-bar-BN1WDMKT.js";import"./time-picker-DC4RF_4H.js";import"./timeline-break-Dw9Bwf2E.js";import"./toast-Cas63X3D.js";import"./toolbar-uWEWbS3i.js";import"./tooltip-DkiBleqD.js";import"./tree-item-Bcv1g6Lo.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-DDcllJl4.js";import"./split-button-CwmBLkjO.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

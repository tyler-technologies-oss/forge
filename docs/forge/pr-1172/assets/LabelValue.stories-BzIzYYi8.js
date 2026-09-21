import{A as n,b as r}from"./iframe-BQuUdi9A.js";import{s as c,b as g,g as b}from"./utils-CElmhe9Y.js";import{o as u}from"./style-map-DZMzP31B.js";import{e as y}from"./class-map-DAzR423m.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-C99VL_Si.js";import"./app-bar-menu-button-B1YJblx-.js";import"./app-bar-profile-button-DY69iVIm.js";import{I as h,i as S}from"./tyler-icons--haAADqW.js";import"./menu-D-lcVz-r.js";import"./linear-progress-VpC6qUWa.js";import"./list-DJY0Qsvo.js";import"./popover-C49q6_k0.js";import"./overlay-DlXgJPae.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnhVRD4Y.js";import"./list-item-ByLOjRzX.js";import"./avatar-C2T-zYOr.js";import"./icon-button-CqF7oM9r.js";import"./autocomplete-BJ_VtbTx.js";import"./label-BnmMXl01.js";import"./base-field-U1vI4X4O.js";import"./focus-indicator--VpOaZ6F.js";import"./text-field-CZ4Y4cDf.js";import"./backdrop-Dvs4MPLP.js";import"./badge-1n88vZyR.js";import"./banner-DcmTFn1M.js";import"./bottom-sheet-rwCTNSQ0.js";import"./dialog-Ch3czCB_.js";import"./button-area-JSx8c1Ta.js";import"./button-toggle-group-BuqjjRXG.js";import"./button-0aFc-rvC.js";import"./calendar-BkUv1tz_.js";import"./card-D4nNosYG.js";import"./checkbox-BovgCLF2.js";import"./chip-set-SskbQuYZ.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-CScFxF5l.js";import"./date-picker-ClEqQLzS.js";import"./date-range-picker-CeGattXb.js";import"./divider-BoT5wEQw.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-CVDUP46z.js";import"./open-icon-CZoIkz9V.js";import"./file-picker-DwlZKZeJ.js";import"./floating-action-button-ZuubCkXA.js";import"./inline-message-BXrlbIvc.js";import"./key-item-DBS9G46B.js";import"./keyboard-shortcut-Cp3ihP7e.js";import"./label-value-CDNJ622N.js";import"./meter-group-mw7VEZKc.js";import"./page-state-C_fHeyC9.js";import"./paginator-BxGpJb65.js";import"./radio-group-CTxw9zFP.js";import"./scaffold-D8DtzjhO.js";import"./secret-6NlzqR4z.js";import"./select-dropdown-CJVQOKyZ.js";import"./select-BG3qUTBk.js";import"./skip-link-rwUi_sBN.js";import"./slider-DO-XGDxi.js";import"./split-view-CR0DiTXv.js";import"./stack-E4V9OTtJ.js";import"./stepper-DhAMGtbB.js";import"./switch-BHB_lLoE.js";import"./table-BXy-6v7Z.js";import"./tab-panel-DCnI4SeF.js";import"./time-picker-BmvPIvcX.js";import"./timestamp-DS_mc1Uu.js";import"./toast-NB_2MhbI.js";import"./toolbar-u0CVrqbx.js";import"./tooltip-Dq2Q0xN1.js";import"./tree-item-lIPln6pc.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-CEm-Gzfb.js";import"./split-button-DcSGNSsY.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

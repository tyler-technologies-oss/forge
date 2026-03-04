import{A as p,b as r}from"./iframe-D6-BN427.js";import{s as c,b as g,g as b}from"./utils-3yMKERXj.js";import{o as u}from"./style-map-Cjel_uWl.js";import{e as y}from"./class-map-CGeaCfCR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CZcjk-Rp.js";import"./expansion-panel-CgR11RAA.js";import"./open-icon-CMFSOby6.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-B7tXVKT9.js";import"./state-layer-Dr4I3-ea.js";import"./focus-indicator-BY1zFJV4.js";import{I as h,e as S}from"./tyler-icons-BS8_pNWa.js";import"./menu-5G2t1qgD.js";import"./linear-progress-Cnx_HyUf.js";import"./list-DdrH15DZ.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";import"./avatar-CAfGi6CN.js";import"./icon-button-DRXv6M-B.js";import"./autocomplete-Y0eQC5uU.js";import"./label-Kx1iPI1y.js";import"./button-7INxEilv.js";import"./button-toggle-group-Cc7YegMF.js";import"./checkbox-DV6DqneI.js";import"./switch-Bl1uI7Wn.js";import"./base-field-D5b5fMX3.js";import"./text-field-BAejI60y.js";import"./backdrop--id5x3jp.js";import"./badge-GG6Z2MpL.js";import"./banner-rDhsUbqS.js";import"./bottom-sheet-BJXxXepC.js";import"./dialog-DvB2hdYD.js";import"./button-area-CxTkJWSm.js";import"./calendar-DFiHtXSs.js";import"./card-BirGXe0d.js";import"./chip-set-Cp18JhFi.js";import"./circular-progress-B5Kshctg.js";import"./color-picker-D2j5rMRS.js";import"./date-picker-CQcAHydD.js";import"./date-range-picker-DaDkpQ4B.js";import"./divider-CY-gug5I.js";import"./base-drawer-q74epyPW.js";import"./drawer-DRLMAEyk.js";import"./modal-drawer-CCu9BUGH.js";import"./mini-drawer-Cck9Qwkt.js";import"./file-picker-DEv08G0-.js";import"./floating-action-button-BmnR_Z4k.js";import"./inline-message-DM46YaML.js";import"./key-item-BFe1rnG8.js";import"./keyboard-shortcut-DnEED6Tm.js";import"./label-value-Cm7o2IPb.js";import"./meter-group-C93lp5Fw.js";import"./page-state-CTPXyko5.js";import"./paginator-CT5me0KA.js";import"./scaffold-C0JMtL8O.js";import"./select-dropdown-DMLftrpb.js";import"./select-72wTnzqp.js";import"./skip-link-OCZk9bOY.js";import"./slider-C0p9sgmD.js";import"./split-view-2vrsNLpF.js";import"./stack-C45mBB1R.js";import"./stepper-D5knxpyW.js";import"./table-BSRZsimZ.js";import"./tab-bar-CuSw5pca.js";import"./time-picker-Cxn4eACY.js";import"./toast-wZqmEUFy.js";import"./toolbar-DPBJiSu_.js";import"./tooltip-DZbumLUT.js";import"./tree-item-Dad7Kyva.js";import"./view-switcher-ZGhMaguC.js";import"./deprecated-icon-button-DIpmpDnb.js";import"./split-button-BDryKzT1.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

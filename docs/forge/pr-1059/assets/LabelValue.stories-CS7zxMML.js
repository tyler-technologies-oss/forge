import{A as p,b as r}from"./iframe-CSywYpvx.js";import{s as c,b as g,g as b}from"./utils-DLgMzbe-.js";import{o as u}from"./style-map-DvOzVcVe.js";import{e as y}from"./class-map-D_tDSXuV.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BbIQ9d_o.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-Do14EywD.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-D4hJH6o8.js";import{I as h,e as S}from"./tyler-icons-B0WPf66k.js";import"./menu-CtPVV0Sq.js";import"./linear-progress-CsYLd0m5.js";import"./list-Dmc107k5.js";import"./popover-zm7hjeEB.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar-CKKdz4B2.js";import"./icon-button-4mjEeylW.js";import"./autocomplete-iP0DpoFs.js";import"./label-BnttN8Gt.js";import"./button-DFhDR1qs.js";import"./button-toggle-group-BYn1tg2z.js";import"./checkbox-DpCO2BqI.js";import"./switch-DCFuVn_w.js";import"./base-field-DR01BPC3.js";import"./text-field-DdSzHiw5.js";import"./backdrop-ZqVEdIYI.js";import"./badge-Ct4HlFZ8.js";import"./banner-CIZg1OSY.js";import"./bottom-sheet-DCXcVNc8.js";import"./dialog-CvQkKqsY.js";import"./button-area-BaPjed_3.js";import"./calendar-C-lgv0z7.js";import"./card-RNAgGXO5.js";import"./chip-set-DPqS0lO0.js";import"./circular-progress-Ctu3rS_y.js";import"./color-picker-D8sb5xrG.js";import"./date-picker-D-r_WlCJ.js";import"./date-range-picker-otSlyGn1.js";import"./divider-DtS4IZ9-.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./mini-drawer-B6eLxgR7.js";import"./file-picker-BvrMlyzV.js";import"./floating-action-button-D8GSX5A7.js";import"./inline-message-BmHmX7vQ.js";import"./key-item-BsoNBEfD.js";import"./keyboard-shortcut-C5gmWfMz.js";import"./label-value-D-KSqHDU.js";import"./meter-group-aJtos3WN.js";import"./page-state-BU7mMB2L.js";import"./paginator-ikGcnkVJ.js";import"./scaffold-B_qTjcmL.js";import"./select-dropdown-UJHv1Aub.js";import"./select-X23zMW2H.js";import"./skip-link-BKJEdQQV.js";import"./slider-DdbHnf7l.js";import"./split-view-DGIgro3g.js";import"./stack-D2V5d6LJ.js";import"./stepper-Epycfoxr.js";import"./table-g7zKBGDK.js";import"./tab-bar-Bo_zjYdL.js";import"./time-picker-C688PiNh.js";import"./toast-B-AjQqY0.js";import"./toolbar-BK4uxBaY.js";import"./tooltip-BUHZd4St.js";import"./tree-item-CZHZRSdC.js";import"./view-switcher-BOebY1Oz.js";import"./deprecated-icon-button-DblO3y13.js";import"./split-button-Ccp8JQvn.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as p,b as r}from"./iframe-BWAobhOu.js";import{s as c,b as g,g as b}from"./utils-BmZ1G202.js";import{o as u}from"./style-map-CyeIkLVB.js";import{e as y}from"./class-map-BUxfhnyt.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BOGVYiZ9.js";import"./app-bar-profile-button-Dt1-aPj1.js";import{I as h,e as S}from"./tyler-icons-C2isZNDF.js";import"./menu-Db5tVldy.js";import"./linear-progress-CsGp1g6o.js";import"./list-BVxyNe29.js";import"./popover-CMixvJRM.js";import"./overlay-B2Oq3AqY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B7Gn8FGS.js";import"./avatar-CNy2wjid.js";import"./icon-button-CjKKMho2.js";import"./focus-indicator-DsmueVAt.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-RZkFxRku.js";import"./label-DsFbV3le.js";import"./base-field-BkUfAqwn.js";import"./text-field-DEX3_LrG.js";import"./backdrop-3KzDwztH.js";import"./badge-D6HcRNKM.js";import"./banner-Ro8zNaiJ.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-vccxiSy3.js";import"./button-toggle-group-vww4kAwk.js";import"./button-BZXwUSWo.js";import"./calendar-DlmvU6hF.js";import"./card-D9IB3zRq.js";import"./checkbox-Cp8REoWi.js";import"./chip-set-YaWyaETd.js";import"./circular-progress-DIduwjig.js";import"./color-picker-B2Wu5OLO.js";import"./date-picker-DTbublh2.js";import"./date-range-picker-5pob3cN6.js";import"./divider-DJ0JjzdV.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-Co5SsV4d.js";import"./open-icon-u5IwX--f.js";import"./file-picker-uO9qV1yc.js";import"./floating-action-button-DskyjavD.js";import"./inline-message-fj34p3Px.js";import"./key-item-BBsp2YVJ.js";import"./keyboard-shortcut-BB7azKrI.js";import"./label-value-cTsUvwyw.js";import"./meter-group-CNmc0Waj.js";import"./page-state-DDjhdZbK.js";import"./paginator-DZ7ZBCkn.js";import"./radio-group-DTE-tpfW.js";import"./scaffold-CufLEZ-a.js";import"./secret-BGNliMzc.js";import"./select-dropdown-DIjzQPNz.js";import"./select-CrJD6EGz.js";import"./skip-link-BRsOs8dv.js";import"./slider-B-vKOGJg.js";import"./split-view-SmvrSkAy.js";import"./stack-Bc7kWG9C.js";import"./stepper-CUJBubQB.js";import"./switch-vKLgt2Nh.js";import"./table-DHSXk39C.js";import"./tab-panel-CiLDhWMT.js";import"./time-picker-pY6k3vJT.js";import"./timestamp-tSu9IZbD.js";import"./toast-Ca5cpQsi.js";import"./toolbar-B9K5lYA9.js";import"./tooltip-Db-SDmAb.js";import"./tree-item-CdjlMtdC.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-auUMMqRf.js";import"./split-button-BZe8ycK6.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ke as L,a};

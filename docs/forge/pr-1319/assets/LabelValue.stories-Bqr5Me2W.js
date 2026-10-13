import{A as n,b as r}from"./iframe-DTNkYg14.js";import{s as c,b as g,g as b}from"./utils-YYNEckME.js";import{o as u}from"./style-map-Du2bhPVa.js";import{e as y}from"./class-map-4zklA2By.js";import"./service-adapter-8tADcN_b.js";import"./accordion-EEhc-i9L.js";import"./app-bar-menu-button-D5YkSG_Z.js";import"./app-bar-profile-button-f3zVk6na.js";import{I as h}from"./icon-DVhmv0eN.js";import"./menu-Bl0m91vI.js";import{i as S}from"./tyler-icons-Bg2kTxF-.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BdMAL8iF.js";import"./popover-CY5Ry9Cs.js";import"./overlay-iZgM2dxp.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BaOIlBwe.js";import"./list-item-6yDHUfH_.js";import"./avatar-SbpAm0DU.js";import"./icon-button-CUU1GWio.js";import"./autocomplete-Cuq3TQUr.js";import"./label-DjcObiwP.js";import"./base-field-Cdf0dwgO.js";import"./focus-indicator-3EiKPbSh.js";import"./text-field-Be6g3VTz.js";import"./backdrop-ngk7d2eo.js";import"./badge-DvAoB_om.js";import"./banner-B4NKF44k.js";import"./bottom-sheet-p42obXmZ.js";import"./dialog-LplVWkyl.js";import"./breadcrumb-overflow-menu-BjwZwXCr.js";import"./button-area-seiXvS-i.js";import"./button-toggle-group-9ja3uLea.js";import"./button-X3pBuwRw.js";import"./calendar-BUXRvIbD.js";import"./card-F2PCVnMB.js";import"./checkbox-evezQi-A.js";import"./chip-set-Dl0Xf43W.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-wWppRo29.js";import"./date-picker-DOPRTY2B.js";import"./date-range-picker-nHVEo6h6.js";import"./divider-kzdg1MSU.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-wltvlIhI.js";import"./open-icon-C4_OLN1T.js";import"./file-picker-CYrUkBMK.js";import"./floating-action-button-njcs7fR9.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-BZLAS7Mi.js";import"./key-item-6zmQhDw2.js";import"./keyboard-shortcut-Y9aphNi9.js";import"./label-value-C0-wovkK.js";import"./listbox-DtstewWm.js";import"./meter-group-BXU9ej4x.js";import"./page-state-DvaZGddB.js";import"./paginator-8sAlXZnq.js";import"./process-stepper-DIr3_ubM.js";import"./radio-group-BSJ3dK2a.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CuMGJHwr.js";import"./option-Dc7EVbrO.js";import"./select-dropdown-DMqgSGUd.js";import"./select-9m4CbelP.js";import"./skip-link-Cg7NjCqn.js";import"./slider-CdRCfW40.js";import"./split-view-XKJpo26S.js";import"./stack-BZ9L2zYz.js";import"./stepper-DVhAxsag.js";import"./switch-BiHjuj94.js";import"./table-D9TsrJLm.js";import"./tab-panel-CN_mU4KY.js";import"./time-picker-DTHpMCrc.js";import"./timestamp-C6Zzap8T.js";import"./toast-Co8DtpTf.js";import"./toolbar-CpplmqNI.js";import"./tooltip-Bgv5ULhC.js";import"./tree-item-CCtIJ6WB.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CExO_p9w.js";import"./split-button-Dzc1SVMt.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],or=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,or as L,a};

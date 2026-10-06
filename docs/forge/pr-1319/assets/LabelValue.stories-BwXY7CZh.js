import{A as n,b as r}from"./iframe-BgRf1TIz.js";import{s as c,b as g,g as b}from"./utils-C-EU7_QI.js";import{o as u}from"./style-map-DF6HnqQP.js";import{e as y}from"./class-map-CWpavWNe.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DIMt2wMW.js";import"./app-bar-menu-button-Ct0gHWkg.js";import"./app-bar-profile-button-ZJwJDMB3.js";import{I as h}from"./icon-BF2rMxkr.js";import"./menu-BWjOvr8h.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BguBqZQ5.js";import"./popover-CGb2usu3.js";import"./overlay-COLivfx5.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-C-3--dH7.js";import"./list-item-s49tr2Wv.js";import"./avatar-CreChVbB.js";import"./icon-button-DplwJpAj.js";import"./autocomplete-BmWVBsTI.js";import"./label-CpMUNpM9.js";import"./base-field-DLD_aOaf.js";import"./focus-indicator-Ddo_7foI.js";import"./text-field-MEI4fPKh.js";import"./backdrop-ngk7d2eo.js";import"./badge-DPF0JC0v.js";import"./banner-DMkZG2Kw.js";import"./bottom-sheet-UrJKR3RW.js";import"./dialog-fROW1iWI.js";import"./breadcrumb-overflow-menu-BPPisnZR.js";import"./button-area-DkDdpvUc.js";import"./button-toggle-group-k49QOIkr.js";import"./button-CnMjXOLQ.js";import"./calendar-CC46VsaJ.js";import"./card-CZw_lNnO.js";import"./checkbox-dejgc4dw.js";import"./chip-set-7VJtRl8L.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DJXvpA6I.js";import"./date-picker-BkIurqKu.js";import"./date-range-picker-J74tJH7d.js";import"./divider-C5_Mh1Jj.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-CX5eiwQl.js";import"./open-icon-TppMAFMH.js";import"./file-picker-DJN8KjfT.js";import"./floating-action-button-pZWsD7VE.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-ChRaLj5a.js";import"./key-item-DvKfX1H3.js";import"./keyboard-shortcut-DveRArDR.js";import"./label-value-C0-wovkK.js";import"./listbox-C3kQ6OXv.js";import"./meter-group-DMShNQ59.js";import"./page-state-DvaZGddB.js";import"./paginator-BcSGc_vI.js";import"./process-stepper-CJf02Ccl.js";import"./radio-group-DV58pug7.js";import"./scaffold-Ca9xBuAs.js";import"./secret-CGdXzd0G.js";import"./option-HuS1C3qt.js";import"./select-dropdown-3pKvfPGW.js";import"./select-CRpjEf2r.js";import"./skip-link-C4Zcj1ZB.js";import"./slider-kMxioyHV.js";import"./split-view-DkJ3nz7o.js";import"./stack-BFYODGK6.js";import"./stepper-BAU3dDyU.js";import"./switch-DmcPrUFX.js";import"./table-B58Rwhk3.js";import"./tab-panel-BPbatE74.js";import"./time-picker-DbgPa_oW.js";import"./timestamp-DNL-_ucl.js";import"./toast-C0lgEQFI.js";import"./toolbar-C0s16xqk.js";import"./tooltip-BDLKK-c_.js";import"./tree-item-CbOEPZpo.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-DZMor45M.js";import"./split-button-ysr-GRyK.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

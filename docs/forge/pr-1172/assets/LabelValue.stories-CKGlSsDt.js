import{A as n,b as r}from"./iframe-BaLQ_A2d.js";import{s as c,b as g,g as b}from"./utils-CElmhe9Y.js";import{o as u}from"./style-map-CyLVt2T4.js";import{e as y}from"./class-map-Bpya0c63.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-Ca9Y-bf7.js";import"./app-bar-menu-button-DrBTzQf-.js";import"./app-bar-profile-button-DpM6C9r4.js";import{I as h,i as S}from"./tyler-icons-DfIaYIv7.js";import"./menu-Bpyhfaa_.js";import"./linear-progress-VpC6qUWa.js";import"./list-CtFWDf9k.js";import"./popover-BqWv_wJF.js";import"./overlay-DFZfpbSi.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BnMa3F30.js";import"./list-item-Bra_7jX-.js";import"./avatar-BzhNyOik.js";import"./icon-button-IKvoqhNZ.js";import"./autocomplete-CWp43el_.js";import"./label-BIsRcMc6.js";import"./base-field-B2hMeS19.js";import"./focus-indicator-BeZvj0X5.js";import"./text-field-DpRJB-zB.js";import"./backdrop-Dvs4MPLP.js";import"./badge-DymMcnze.js";import"./banner-BvLty6Wy.js";import"./bottom-sheet-l8KRqCyS.js";import"./dialog-CWWGCOKC.js";import"./button-area-BmWGh6OZ.js";import"./button-toggle-group-CTKt_zci.js";import"./button-C5R_qqOK.js";import"./calendar-DYHmb5gP.js";import"./card-BdewD5or.js";import"./checkbox-DQTRdMdm.js";import"./chip-set-C3aByb5u.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-C0DblbD6.js";import"./date-picker-BLOopeVA.js";import"./date-range-picker-C_qAOYjd.js";import"./divider-DGwf0Vud.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-B_L_Rszi.js";import"./open-icon-Z3xYPoD8.js";import"./file-picker-CZjM4RSC.js";import"./floating-action-button-qq1q08PY.js";import"./inline-message-BXrlbIvc.js";import"./key-item-BQTnQgUN.js";import"./keyboard-shortcut-DQrU0P4T.js";import"./label-value-CDNJ622N.js";import"./meter-group-Be5UpxIj.js";import"./page-state-C_fHeyC9.js";import"./paginator-BDDWgHNa.js";import"./radio-group-BqfKTB-V.js";import"./scaffold-D8DtzjhO.js";import"./secret-Dv15S7Kn.js";import"./select-dropdown-Bb9B8K7M.js";import"./select-ByzXAQSi.js";import"./skip-link-DYN6GQqt.js";import"./slider-CsETvoUl.js";import"./split-view-Cj_5rNkN.js";import"./stack-E4V9OTtJ.js";import"./stepper-CF-eM1eu.js";import"./switch-aCewe0Hv.js";import"./table-Bzuns9tR.js";import"./tab-panel-COnKVwN9.js";import"./time-picker-B_JKVOM4.js";import"./timestamp-jg_-Mtnl.js";import"./toast-BP5KJUuF.js";import"./toolbar-Cijcphd3.js";import"./tooltip-C0ic2qYj.js";import"./tree-item-DH-5zwd9.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-DttVKQ2I.js";import"./split-button-BYSaAg6v.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

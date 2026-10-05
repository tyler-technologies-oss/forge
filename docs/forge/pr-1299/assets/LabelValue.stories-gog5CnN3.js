import{A as n,b as r}from"./iframe-DuTL4nLl.js";import{s as c,b as g,g as b}from"./utils-CwE7tZFf.js";import{o as u}from"./style-map-WHZOtuyF.js";import{e as y}from"./class-map-C0XngG5m.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BLbnKYW1.js";import"./app-bar-menu-button-BgLQ5xDT.js";import"./app-bar-profile-button-CvoVcJDN.js";import{I as h}from"./icon-BUzV7HWf.js";import"./menu-tpM8UxCX.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DNtySjlc.js";import"./popover-CLHAAODD.js";import"./overlay-i68906s2.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-DWKuOLCj.js";import"./list-item-BDyrHBxR.js";import"./avatar-CUnUjMLm.js";import"./icon-button-CJxY1IBT.js";import"./autocomplete-DcPH9ZUw.js";import"./label-Cs1b9vr6.js";import"./base-field-ZuZit9sw.js";import"./focus-indicator-DnG7A_bn.js";import"./text-field-DvsEyAvv.js";import"./backdrop-ngk7d2eo.js";import"./badge-Bcao1v-R.js";import"./banner-Mp3eXcFj.js";import"./bottom-sheet-CyPc9nAu.js";import"./dialog-BvtgQqmd.js";import"./button-area-BS3AEKE5.js";import"./button-toggle-group-D1Vqj9_y.js";import"./button-CXiX07Ik.js";import"./calendar-q0uo43fL.js";import"./card-qwoD5oQc.js";import"./checkbox-CXqqeG_-.js";import"./chip-set-B1HDTF8G.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-Bj5yfM95.js";import"./date-picker-CcaSszlq.js";import"./date-range-picker-Da2EAQer.js";import"./divider-Bmr77Gsj.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-CIbqn_AC.js";import"./open-icon-CdHT3fwT.js";import"./file-picker-XnBPJzDx.js";import"./floating-action-button-DMGAu3VY.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-CvNpNi_Y.js";import"./key-item-DeMQVlJZ.js";import"./keyboard-shortcut-ybbhl0uW.js";import"./label-value-C0-wovkK.js";import"./listbox-k0r4w10S.js";import"./meter-group-BTrVYdeJ.js";import"./page-state-DvaZGddB.js";import"./paginator-CZ3R05Q5.js";import"./process-stepper-BWgyC_y1.js";import"./radio-group-Bm3zeThb.js";import"./scaffold-Ca9xBuAs.js";import"./secret-D_n4CWn0.js";import"./option-DWRvPAO6.js";import"./select-dropdown-COzraM9j.js";import"./select-DSd8KQM1.js";import"./skip-link-VFniT5GO.js";import"./slider-K1Vps76c.js";import"./split-view-Dvbqbpf3.js";import"./stack-Bd7iC-xk.js";import"./stepper-4nHEJSY4.js";import"./switch-CAzqQxW8.js";import"./table-DHe-IF45.js";import"./tab-panel-DKU3x8RA.js";import"./time-picker-DWFX0k0Y.js";import"./timestamp-CVIiYUWH.js";import"./toast-DCSbgejH.js";import"./toolbar-CTtNvxpG.js";import"./tooltip-D8_0K3tX.js";import"./tree-item-DCmv370r.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-Brkrly8c.js";import"./split-button-BsCkQ_Ro.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],rr=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,rr as L,a};

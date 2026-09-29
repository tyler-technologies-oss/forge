import{A as n,b as r}from"./iframe-Dql2U7ym.js";import{s as c,b as g,g as b}from"./utils-Dx9-RsVp.js";import{o as u}from"./style-map-eHOUsUSp.js";import{e as y}from"./class-map-Dfln3TJ9.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B5b4KX8c.js";import"./app-bar-menu-button-DpQdu7bU.js";import"./app-bar-profile-button-C051y7LE.js";import{I as h}from"./icon-BQY5G9aX.js";import"./menu-mRwpImnh.js";import{i as S}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-6il26rgh.js";import"./popover-C21Z74UF.js";import"./overlay-NF8Tg9gz.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-ywBvlsHe.js";import"./list-item-h7d83OmT.js";import"./avatar-BhZnE0ad.js";import"./icon-button-CsrN_6vz.js";import"./autocomplete-whSP2lol.js";import"./label-PohRN3hn.js";import"./base-field-CajsbtNg.js";import"./focus-indicator-C82PZry3.js";import"./text-field-CHgjtMN3.js";import"./backdrop-C9lBlb_d.js";import"./badge-CwUcz7YW.js";import"./banner-o69sFFmy.js";import"./bottom-sheet-JTaAAo4i.js";import"./dialog-L6C-FO8i.js";import"./button-area-CC0Xeg7s.js";import"./button-toggle-group-DjXa17v_.js";import"./button-B_lbOGzp.js";import"./calendar-CPbT5bJY.js";import"./card-8wX2RMbV.js";import"./checkbox-DmjikLZ6.js";import"./chip-set-BA6lcYQV.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-CxSbA9Md.js";import"./date-picker-a4qMlLCi.js";import"./date-range-picker-bUMkzM5Q.js";import"./divider-ByX1qgHg.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-7zvknYhH.js";import"./open-icon-CnA43KCZ.js";import"./file-picker-DAVSGpkw.js";import"./floating-action-button-DeBEUWDY.js";import"./inline-message-BKecgmUf.js";import"./kbd-DB4mi8QB.js";import"./key-item-miAsJtTM.js";import"./keyboard-shortcut-Bij-xdTW.js";import"./label-value-06gdOjV6.js";import"./meter-group-C4GtroT0.js";import"./page-state-DdcxjGPv.js";import"./paginator-COWBoi0I.js";import"./radio-group-Bi9mu56L.js";import"./scaffold-ua4VSBPI.js";import"./secret-CY11vgXI.js";import"./select-dropdown-BZ17yLTC.js";import"./select-D_aVGHPB.js";import"./skip-link-DPrijJfM.js";import"./slider-baYGc-B5.js";import"./split-view-up9wDy2R.js";import"./stack-CzasDS03.js";import"./stepper-hmiprVGU.js";import"./switch-y3R_rla-.js";import"./table-CoglVQmR.js";import"./tab-panel-BiVUImSy.js";import"./time-picker-DAN7VozQ.js";import"./timestamp-BpD9Gr_v.js";import"./toast-YSXWxT0V.js";import"./toolbar-B_BYwz5U.js";import"./tooltip-DEr-sMn6.js";import"./tree-item-BC6OpDWV.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-Y-84y7oW.js";import"./split-button-Bl7lvKxh.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ye=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ye as L,a};

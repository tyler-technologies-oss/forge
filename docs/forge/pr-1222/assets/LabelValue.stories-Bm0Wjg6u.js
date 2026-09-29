import{A as n,b as r}from"./iframe-CeKgC4Tg.js";import{s as c,b as g,g as b}from"./utils-D6ldXT3I.js";import{o as u}from"./style-map-DudCfKEY.js";import{e as y}from"./class-map-UP19_nm-.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CZ5CrEx2.js";import"./app-bar-menu-button-CE3vqm4N.js";import"./app-bar-profile-button-DQqARlTH.js";import{I as h}from"./icon-BaAa1Ck7.js";import"./menu-nDrc3LKh.js";import{i as S}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-Oak2HfaZ.js";import"./popover-BaM9yRL2.js";import"./overlay-B0nIhxxX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Cp3qj50X.js";import"./list-item-STGQfT7T.js";import"./avatar-DQkbUFZT.js";import"./icon-button-BgdhWm-e.js";import"./autocomplete-Bhs_oqXW.js";import"./label-Wh14ysll.js";import"./base-field-B_sZ86kO.js";import"./focus-indicator-DJB1EMSX.js";import"./text-field-CSZs9ENS.js";import"./backdrop-C9lBlb_d.js";import"./badge-CVBE5I1d.js";import"./banner-CHgrK1ly.js";import"./bottom-sheet-BKlDie0_.js";import"./dialog-CAL1jFxe.js";import"./button-area-BsSFlCJJ.js";import"./button-toggle-group-YG3JNBOK.js";import"./button-DkeZ1DSR.js";import"./calendar-BZYO17-K.js";import"./card-Dv3Ot_ZX.js";import"./checkbox-B6bAGvJX.js";import"./chip-set-CAA2YcNR.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-Co2HpyuF.js";import"./date-picker-DpPUT1z5.js";import"./date-range-picker-BTbZPj5G.js";import"./divider-BMFeCfb2.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-BDtGseSE.js";import"./open-icon-CV--GR_T.js";import"./file-picker-O6evC40i.js";import"./floating-action-button-CxsyLVsF.js";import"./inline-message-BKecgmUf.js";import"./kbd-Da9tNz5r.js";import"./key-item-DhbOhth3.js";import"./keyboard-shortcut-BZtcrVof.js";import"./label-value-06gdOjV6.js";import"./meter-group-byNSiqny.js";import"./page-state-DdcxjGPv.js";import"./paginator-CdeiCc4Y.js";import"./radio-group-Ca3UcLGs.js";import"./scaffold-ua4VSBPI.js";import"./secret-B0C19AFh.js";import"./select-dropdown-VFdbTQ9U.js";import"./select-VwVQToCw.js";import"./skip-link-gFtx3YaW.js";import"./slider-DKcuD3LY.js";import"./split-view-B03ysKAl.js";import"./stack-CzasDS03.js";import"./stepper-BMeLjyJ6.js";import"./switch-B1yyLXJp.js";import"./table-brHAZfvQ.js";import"./tab-panel-CpK6uauY.js";import"./time-picker-CaCMPU6-.js";import"./timestamp-BSS4bcG-.js";import"./toast-B85WfXYk.js";import"./toolbar-k9nL1GJf.js";import"./tooltip-dfcTj2Ex.js";import"./tree-item-DPzFX9TA.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-DLGn0NgM.js";import"./split-button-CnjlK5Vs.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

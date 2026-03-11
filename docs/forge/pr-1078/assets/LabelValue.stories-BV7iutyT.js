import{A as p,b as r}from"./iframe-DGoJ1nOJ.js";import{s as c,b as g,g as b}from"./utils-DQ34OAOC.js";import{o as u}from"./style-map-D2IpQ2U1.js";import{e as y}from"./class-map-CeNVreM7.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DMbhM-ys.js";import"./app-bar-profile-button-DvUImR3J.js";import{I as h,e as S}from"./tyler-icons-JNKrLD-g.js";import"./menu-Dq9iuAq3.js";import"./linear-progress-DP1CUIRM.js";import"./list-CCUg2Cq5.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-D_lZwLCW.js";import"./icon-button-lFY3CnB1.js";import"./focus-indicator-VcUYsfiB.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-BnJh-uzG.js";import"./label-CMM9d_wI.js";import"./button-N89Sx3kH.js";import"./button-toggle-group-CFSiWMz_.js";import"./checkbox-BBeq_hsZ.js";import"./switch-Bm7MIFD1.js";import"./base-field-BQqHVraz.js";import"./text-field-DlBvbEi2.js";import"./backdrop-B_VtJyIN.js";import"./badge-DsjalJQN.js";import"./banner-jaCWRCdz.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Dc40aCPp.js";import"./calendar-Qp1MDLGD.js";import"./card-DOHfN5Yw.js";import"./chip-set-DzU89uq6.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-DcKfZ-kt.js";import"./date-picker-Ckj3Desg.js";import"./date-range-picker-g7TsgCVY.js";import"./divider-D_YlOpYa.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-46Qrd-pr.js";import"./open-icon-MaY7KraM.js";import"./file-picker-CVMGh-Lg.js";import"./floating-action-button-C-pvUU6E.js";import"./inline-message-BK9gijHu.js";import"./key-item-B4uuCnA_.js";import"./keyboard-shortcut-Yjw9zQ29.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CQwQowGj.js";import"./page-state-BYBCycIs.js";import"./paginator-DSiK4VwW.js";import"./scaffold-D_SIXSFE.js";import"./select-dropdown-D9K-ZfiH.js";import"./select-BKWHDGZZ.js";import"./skip-link-DAdvNWyw.js";import"./slider-CPq6Qqjn.js";import"./split-view-DVckXxqQ.js";import"./stack-BuaXNRar.js";import"./stepper-BGB4-kcP.js";import"./table-RX6vvyVP.js";import"./tab-bar-BHP75fiG.js";import"./time-picker-B6-1KOrb.js";import"./toast-__sn1v0m.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CJyEoaTL.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-CvcXKUiE.js";import"./split-button-D6Glyg-E.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:t,Icon:s,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,t as D,s as I,ke as L,l as a};

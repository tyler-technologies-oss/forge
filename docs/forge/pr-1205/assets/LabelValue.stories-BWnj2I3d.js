import{A as n,b as r}from"./iframe-C8ybUYbn.js";import{s as c,b as g,g as b}from"./utils-E9-_u7-I.js";import{o as u}from"./style-map-B2RanMjD.js";import{e as y}from"./class-map-C0Au3s0L.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BgV8KvDV.js";import"./app-bar-profile-button-CRKMvjir.js";import{I as h,e as S}from"./tyler-icons-CRlGDmUG.js";import"./menu-DShisam-.js";import"./linear-progress-BuTzYSPq.js";import"./list-DG8ewqF7.js";import"./popover-D2oimSag.js";import"./overlay-BLe9QgxT.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DAg_CUT8.js";import"./avatar-Bs6PZd28.js";import"./icon-button-Cy4k6hOV.js";import"./focus-indicator-BUamxVwB.js";import"./state-layer-B1dog9AJ.js";import"./autocomplete-D0l47dsh.js";import"./label-DlinoIlG.js";import"./base-field-CoaBVvua.js";import"./text-field-o0oDmfCJ.js";import"./backdrop-CIiH6Dag.js";import"./badge-BgAtsOx9.js";import"./banner-jUNf50WC.js";import"./bottom-sheet-q6S3FJW_.js";import"./dialog-DT-DUhM1.js";import"./button-area-DUa8j7xs.js";import"./button-toggle-group-DmyRpvBl.js";import"./button-O8hUbfqZ.js";import"./calendar-_Q_V2CNj.js";import"./card-Cd_KWw2Y.js";import"./checkbox-JalKMRMJ.js";import"./chip-set-Dn9nz41M.js";import"./circular-progress-BqNemWjC.js";import"./color-picker-BMXRquWo.js";import"./date-picker-CI-61pfS.js";import"./date-range-picker-rlt-FzYi.js";import"./divider-Dcn-_5Ud.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-VrFasrSd.js";import"./modal-drawer-B5TY4Qqi.js";import"./mini-drawer-j_wQw-o8.js";import"./expansion-panel-B1Cm6tr7.js";import"./open-icon-B_-5ETw7.js";import"./file-picker-2WrfLDcX.js";import"./floating-action-button-On1F4hAj.js";import"./inline-message-Bn0Suvrv.js";import"./key-item-BufjNmMi.js";import"./keyboard-shortcut-DKP1Ny49.js";import"./label-value-BBtWzpWn.js";import"./listbox-UTgo24Yv.js";import"./meter-group-BHSKMVhs.js";import"./page-state-CbLkYdiz.js";import"./paginator-0CK0uE9v.js";import"./radio-group-Cca84TeK.js";import"./scaffold-DgAVuyRY.js";import"./secret-8J-kiwwv.js";import"./option-mPqn71yb.js";import"./select-dropdown-V9Qp8vHp.js";import"./select-BTJz8574.js";import"./skip-link--NinZ010.js";import"./slider-PgrbLZp_.js";import"./split-view-BCx3k0R0.js";import"./stack-BJj2fenZ.js";import"./stepper-DD9edTRv.js";import"./switch-Djd3HgJY.js";import"./table-C-mjaMW7.js";import"./tab-panel-BGFCov6B.js";import"./time-picker-Do4DWGgd.js";import"./timestamp-B_-ROkKy.js";import"./toast-DSS-wDSN.js";import"./toolbar-BZryCujz.js";import"./tooltip-CqXIqgYQ.js";import"./tree-item-it637Jgr.js";import"./view-switcher-Cke0UXCI.js";import"./deprecated-icon-button-DTvpZpb2.js";import"./split-button-pBWjDD2O.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

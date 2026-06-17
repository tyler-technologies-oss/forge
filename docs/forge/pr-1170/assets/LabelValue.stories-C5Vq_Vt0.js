import{A as p,b as r}from"./iframe-DMo3MVJF.js";import{s as c,b as g,g as b}from"./utils-BAJ2NYw0.js";import{o as u}from"./style-map-CeutLtB2.js";import{e as y}from"./class-map-B7H8eY1V.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BtGAEhuz.js";import"./app-bar-profile-button-D9aAkVjq.js";import{I as h,e as S}from"./tyler-icons-CLRB61lC.js";import"./menu-DwiJ9gyK.js";import"./linear-progress-DLb8lZjg.js";import"./list-DsLQLLR8.js";import"./popover-CEB7wJ9f.js";import"./overlay-CO6PgNVS.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-S1ZnP54j.js";import"./icon-button-BfpH_20H.js";import"./focus-indicator-BIvf68Ln.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-DdxTRlS2.js";import"./label-MBhdfpnc.js";import"./button-CrfmxSql.js";import"./button-toggle-group-CBfl-rR_.js";import"./checkbox-CLsZjF62.js";import"./switch-B7XBRa8V.js";import"./base-field-DVohQNNY.js";import"./text-field-BG2fNnwF.js";import"./backdrop-Br-v5NXK.js";import"./badge-BPpoJdYu.js";import"./banner-Dfr0UOxd.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-CA-DoEIl.js";import"./calendar-DtAAKzmA.js";import"./card-DP576ngI.js";import"./chip-set-DyCCN5V_.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Dnmf1tGU.js";import"./date-picker-BlVWlJjx.js";import"./date-range-picker-CvisavCJ.js";import"./divider-COow-TVH.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-Bhumm2Fb.js";import"./open-icon-CLpApPQ_.js";import"./file-picker-DQIKbfFG.js";import"./floating-action-button-DRl50Gn9.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Cwmv-IqD.js";import"./keyboard-shortcut-DD950MXw.js";import"./label-value-C46r41pN.js";import"./meter-group-DnmkkfjE.js";import"./page-state-BeEclPwI.js";import"./paginator-pGkAC21y.js";import"./scaffold-B-1oYF3d.js";import"./secret-BjtuwVCL.js";import"./select-dropdown-D75Ksk7z.js";import"./select-CEfUyNnX.js";import"./skip-link-B89wPmah.js";import"./slider-DDlpyjMj.js";import"./split-view-BOA46rO1.js";import"./stack-DskzmGQg.js";import"./stepper-CXWaEwKK.js";import"./table-B4RgWhlS.js";import"./tab-bar-_6e16EBZ.js";import"./time-picker-DEbq4NnC.js";import"./toast-BP7hCEld.js";import"./toolbar-C7Yoq6pb.js";import"./tooltip-BITM9ydT.js";import"./tree-item-CXChPvRW.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-BdhMKPmU.js";import"./split-button-VyxZz8yK.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,qe as L,a};

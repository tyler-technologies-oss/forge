import{A as n,b as r}from"./iframe-Y92HmdHZ.js";import{s as c,b as g,g as b}from"./utils-DbbJplVM.js";import{o as u}from"./style-map-CPyruTRu.js";import{e as y}from"./class-map-COdHIAbq.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CB79L-wT.js";import"./app-bar-menu-button-3fshlFiS.js";import"./app-bar-profile-button-WsP3_rm8.js";import{I as h,i as S}from"./tyler-icons-SWWw4qdQ.js";import"./menu-Croe9Yxl.js";import"./linear-progress-Dj7Wb6Io.js";import"./list-CSKmw5w_.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FcTi7X6q.js";import"./list-item-DkeO-h5u.js";import"./avatar-B8eTfiem.js";import"./icon-button-BG-KzVAg.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import"./autocomplete-B7V2PGZL.js";import"./label-DSSUgOwJ.js";import"./base-field-CkmJM5z3.js";import"./text-field-DSbKfCGl.js";import"./backdrop-BlmHgV5b.js";import"./badge-DIdXzCuH.js";import"./banner-EKx5TKQM.js";import"./bottom-sheet-Beo76fUe.js";import"./dialog-C-zyrl9l.js";import"./button-area-ChCJ5CnA.js";import"./button-toggle-group-CrMPg9cW.js";import"./button-BUQjmV8l.js";import"./calendar-SkUls6rb.js";import"./card-De0-ErPh.js";import"./checkbox-C1eMKEmS.js";import"./chip-set-Bwj6Zi0S.js";import"./circular-progress-Bc1cF_P_.js";import"./color-picker--P1Kfn_3.js";import"./date-picker-cAxLG26t.js";import"./date-range-picker-CPF0Xjfa.js";import"./divider-DHqIzZ4F.js";import"./base-drawer-BWOPap5Z.js";import"./drawer-DDIZKTPG.js";import"./modal-drawer-D4WrCteS.js";import"./mini-drawer-4my3NLc4.js";import"./expansion-panel-BJnc3kmq.js";import"./open-icon-BWpwmz_Y.js";import"./file-picker-B5L1Tb3i.js";import"./floating-action-button-A3lqgEBN.js";import"./inline-message-aDJxkqUR.js";import"./key-item-D5XRLCjV.js";import"./keyboard-shortcut-D7Lk6qtL.js";import"./label-value-D_mAyTRE.js";import"./meter-group-C3TnBEjQ.js";import"./page-state-B___JwBk.js";import"./paginator-BjVn02NB.js";import"./radio-group-uL1mzLjW.js";import"./scaffold-zUZ5R4dI.js";import"./secret-DH2CiBkb.js";import"./select-dropdown-Hd3TElKH.js";import"./select-B4z0S6Zl.js";import"./skip-link-B0TiXM_n.js";import"./slider-CwNh-zBV.js";import"./split-view-AhArCsJo.js";import"./stack-CSbxxxDz.js";import"./stepper-BTODe-KY.js";import"./switch-D_CS2lkl.js";import"./table-Cmw3BM4n.js";import"./tab-panel-IAdcQ-dj.js";import"./time-picker-DmzHh-TU.js";import"./timestamp-BSWKrw2Z.js";import"./toast-DCkK1d2B.js";import"./toolbar-xc73DdA4.js";import"./tooltip-DMlClJRm.js";import"./tree-item-cLxavFCI.js";import"./view-switcher-Dt9MVoxU.js";import"./deprecated-icon-button-CpQY1t8S.js";import"./split-button-MQDHmJSy.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

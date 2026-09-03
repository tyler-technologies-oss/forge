import{A as n,b as r}from"./iframe-ZebJRd2k.js";import{s as c,b as g,g as b}from"./utils-DYC_LATD.js";import{o as u}from"./style-map-CHYpaRMA.js";import{e as y}from"./class-map-DNbw5Yt_.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Ug8gcxpy.js";import"./app-bar-profile-button-JOnMlEdZ.js";import{I as h,e as S}from"./tyler-icons-CvAFZSnF.js";import"./menu-Dh27MJLl.js";import"./linear-progress-Dh__ll_M.js";import"./list-N8ASX7X4.js";import"./popover-DJnfQE5v.js";import"./overlay-CZiEinF4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-q0AxETeF.js";import"./avatar-CG30mfRF.js";import"./icon-button-DCXr5XdP.js";import"./focus-indicator-vAXHGgAC.js";import"./state-layer-mJUCxnSJ.js";import"./autocomplete-Bk2_gtxY.js";import"./label-f55TS_D7.js";import"./base-field-DsCdnF0Y.js";import"./text-field-ucavXP17.js";import"./backdrop-6rFKosil.js";import"./badge-CeZia43N.js";import"./banner-s3g7c_IX.js";import"./bottom-sheet-DGmGkCpG.js";import"./dialog-IHMyQNAY.js";import"./button-area-C2in_mHz.js";import"./button-toggle-group-17YBKD5R.js";import"./button-BpytEDv8.js";import"./calendar-B_QUkRP1.js";import"./card-DfkIdtZw.js";import"./checkbox-Bc849Iht.js";import"./chip-set-BOwG39zE.js";import"./circular-progress-CNehBhf0.js";import"./color-picker-CSMUFsoe.js";import"./date-picker-DcomIif4.js";import"./date-range-picker-BikdNtKV.js";import"./divider-y91p-zHY.js";import"./base-drawer-7Wh9lkkV.js";import"./drawer-CRT3lE2E.js";import"./modal-drawer-BijuI8cC.js";import"./mini-drawer-BD00MKTN.js";import"./expansion-panel-DeavQ187.js";import"./open-icon-CIKLB1JF.js";import"./file-picker-DeC74yhf.js";import"./floating-action-button-edT7p-6w.js";import"./inline-message-DGh2LsDu.js";import"./kbd-C9587X8D.js";import"./key-item-Cu2hLkcq.js";import"./keyboard-shortcut-CMS3bTC6.js";import"./label-value-o_jvt4kl.js";import"./meter-group-BPfGGMbH.js";import"./page-state-By0fGZIX.js";import"./paginator-B1cjV7-o.js";import"./radio-group-DZrwsi0s.js";import"./scaffold-DlnKxn3X.js";import"./secret-BnZ7AX2b.js";import"./select-dropdown-DVf6hVJD.js";import"./select-CTNbtzak.js";import"./skip-link-CIphpZ5o.js";import"./slider-DROOd6f2.js";import"./split-view-DsCxL_Na.js";import"./stack-Cbce-CUg.js";import"./stepper-DMe1qmkB.js";import"./switch-CpOHNJV_.js";import"./table-BSFDgrOO.js";import"./tab-panel-C5fQ6vP_.js";import"./time-picker-DGtDDiAE.js";import"./timestamp-CY9JmWfG.js";import"./toast-Du-ej_ml.js";import"./toolbar-bgz36830.js";import"./tooltip-v0Hw78HT.js";import"./tree-item-BCSd17DI.js";import"./view-switcher-D7AQr4N8.js";import"./deprecated-icon-button-CPrSq0uw.js";import"./split-button-C14Sz91i.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Qe as L,a};

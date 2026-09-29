import{A as n,b as r}from"./iframe-BJxToyET.js";import{s as c,b as g,g as b}from"./utils-UHZ10xki.js";import{o as u}from"./style-map-DdyOA5fx.js";import{e as y}from"./class-map-BnEDXcyy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-RRt90sRv.js";import"./app-bar-menu-button-1cKXt_wX.js";import"./app-bar-profile-button-CBWn5KGD.js";import{I as h}from"./icon-CxJqbZxZ.js";import"./menu-aLJCoXgh.js";import{i as S}from"./tyler-icons-BAsQ94Lf.js";import"./linear-progress-BFcPS07f.js";import"./list-DcLkysYS.js";import"./popover-CyhOFEuV.js";import"./overlay-DJKQ8z9g.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-gZ6y8N7F.js";import"./list-item-CkV3pnHm.js";import"./avatar-MHFWGlvf.js";import"./icon-button-Jr3jBluS.js";import"./autocomplete-BAZ4Jny5.js";import"./label-D3aYJFzX.js";import"./base-field-CvxMEI8-.js";import"./focus-indicator-DrGqahUv.js";import"./text-field-Cqx3plho.js";import"./backdrop-DRDqOFah.js";import"./badge-lk4WKqw5.js";import"./banner-D67lyRfR.js";import"./bottom-sheet-DK4QcdmV.js";import"./dialog-DX49i-fZ.js";import"./button-area-DDZcRCLo.js";import"./button-toggle-group-DMyC3tpi.js";import"./button-BFMR-gG-.js";import"./calendar-Bm1iSSyA.js";import"./card-CkiTlThZ.js";import"./checkbox-owQ4xjG0.js";import"./chip-set-AET7Bsn_.js";import"./state-layer-C_jpB3Dn.js";import"./circular-progress-B6JHX0hV.js";import"./color-picker-Ho48nmAF.js";import"./date-picker-BnAr5mK4.js";import"./date-range-picker-DgpdC0gr.js";import"./divider-B4C5KLYP.js";import"./base-drawer-DyN1qGQ4.js";import"./drawer-DVzWakGj.js";import"./modal-drawer-BJ5voIVv.js";import"./mini-drawer-zT43CQ5q.js";import"./expansion-panel-BTn2JIx2.js";import"./open-icon-SDij93t6.js";import"./file-picker-DVSiVm6s.js";import"./floating-action-button-Cpo4Aipj.js";import"./inline-message-BfZQ61t1.js";import"./key-item-a89Z7DiP.js";import"./keyboard-shortcut-ByjEp9ng.js";import"./label-value-Dd33niBr.js";import"./listbox-BvwrO52E.js";import"./meter-group-DZ8W54Oa.js";import"./page-state-kROZlh-1.js";import"./paginator-1kcK-8Qg.js";import"./radio-group-CLo_ybCV.js";import"./scaffold-Bfaw0bF8.js";import"./secret-ywx-qkiI.js";import"./option-BrTo5tGE.js";import"./select-dropdown-CszhW8x2.js";import"./select-CNDx-9Qu.js";import"./skip-link-BK0CyKT0.js";import"./slider-CJ8vReLs.js";import"./split-view-C7t8fbPJ.js";import"./stack-DJDsqZ2Z.js";import"./stepper-Be_7bHgx.js";import"./switch-CrbMwA5a.js";import"./table-CPn2ZiFk.js";import"./tab-panel-C4qHpVEF.js";import"./time-picker-CyedJypy.js";import"./timestamp-D0gDgQOH.js";import"./toast-BBPNIzAg.js";import"./toolbar-D4eiazkc.js";import"./tooltip-DAmw-RhN.js";import"./tree-item-CBO-JSWQ.js";import"./view-switcher-Bm7PcBPE.js";import"./deprecated-icon-button-BEs0RKUT.js";import"./split-button-BL3FUSt4.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ze=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ze as L,a};

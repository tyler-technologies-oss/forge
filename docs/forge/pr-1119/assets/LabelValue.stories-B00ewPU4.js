import{A as p,b as r}from"./iframe-D8FO6Qui.js";import{s as c,b as g,g as b}from"./utils-Ckg8JNDy.js";import{o as u}from"./style-map-Bi4uIP-w.js";import{e as y}from"./class-map-CfRcoq7z.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DstuGk2-.js";import"./app-bar-profile-button-BFdm0XmE.js";import{I as h,e as S}from"./tyler-icons-BPPraRYM.js";import"./menu-CyCZIctU.js";import"./linear-progress-C9rKJPwB.js";import"./list-7TZwFZJa.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-7bCDpj6R.js";import"./avatar-32T4hYTN.js";import"./icon-button-D3lzCQ6m.js";import"./focus-indicator-EatIIEs7.js";import"./state-layer-D0SSeJ16.js";import"./autocomplete-D9xbvYcU.js";import"./label-I34sSzDA.js";import"./button-BQLvLqBM.js";import"./button-toggle-group-DuGP473l.js";import"./checkbox-DvcYDMoO.js";import"./switch-dWF8Uu4p.js";import"./base-field-C5n_ApQC.js";import"./text-field-DdKTfqir.js";import"./backdrop-Ck2ckKlw.js";import"./badge-BBzP3B18.js";import"./banner-DL-fuBcg.js";import"./bottom-sheet-CTDZIrhF.js";import"./dialog-CDD3XYiE.js";import"./button-area-DcJacWKV.js";import"./calendar-BI_e2aQk.js";import"./card-CT7_UNHh.js";import"./chip-set-CWDI2QHE.js";import"./circular-progress-Ccu7KP3W.js";import"./color-picker-C5zvK34q.js";import"./date-picker-CGxLE49x.js";import"./date-range-picker-B09_y3Cs.js";import"./divider-D3vD-PJu.js";import"./base-drawer-C4rHpISA.js";import"./drawer-C0IrLLch.js";import"./modal-drawer-IDmJNvF_.js";import"./mini-drawer-DaJAA5Gd.js";import"./expansion-panel-C10jyLKT.js";import"./open-icon-D9xPVFtv.js";import"./file-picker-B3QE0RPP.js";import"./floating-action-button-CkfOJKtP.js";import"./inline-message-MDZIyJNO.js";import"./key-item-Do9RaFu2.js";import"./keyboard-shortcut-DTvUsgkr.js";import"./label-value-342323er.js";import"./meter-group-Ccfbtn-9.js";import"./page-state-BXhyhEYZ.js";import"./paginator-CdF5-O5X.js";import"./scaffold-DpCXKOUM.js";import"./select-dropdown-CGDtiq_5.js";import"./select-vlNEZs5V.js";import"./skip-link-Bny4mJPU.js";import"./slider-C5hOfc4P.js";import"./split-view-CzIDoOTx.js";import"./stack-DTbT3KUK.js";import"./stepper-cl8JPVPT.js";import"./table-L3uy8S9A.js";import"./tab-bar-qrzKoBVu.js";import"./time-picker-BfPlekLo.js";import"./toast-BeME1y5O.js";import"./toolbar-CFdgiwTS.js";import"./tooltip-P-CrpSEv.js";import"./tree-item-Bmfh6DaO.js";import"./view-switcher-C5b2QH2R.js";import"./deprecated-icon-button-BlgxPDe7.js";import"./split-button-B1_0slm-.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

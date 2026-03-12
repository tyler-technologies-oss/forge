import{A as p,b as r}from"./iframe-B9Mn3MTF.js";import{s as c,b as g,g as b}from"./utils-Dr8ZxV_m.js";import{o as u}from"./style-map-CVgFEsOJ.js";import{e as y}from"./class-map-W8n9Mk9f.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BPY0cbT-.js";import"./app-bar-profile-button-IOisOeeZ.js";import{I as h,e as S}from"./tyler-icons-Cfjef8Hp.js";import"./menu-DKc7IJv6.js";import"./linear-progress-C9rKJPwB.js";import"./list-DpG-mQpV.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-7bCDpj6R.js";import"./avatar-D-sgIQHw.js";import"./icon-button-2xWdivGS.js";import"./focus-indicator-CYJ4ta_a.js";import"./state-layer-D0SSeJ16.js";import"./autocomplete-DPmkfLd7.js";import"./label-Dxps7CO4.js";import"./button-4-N4P9ye.js";import"./button-toggle-group-84yse_00.js";import"./checkbox-T1_XI6FM.js";import"./switch-9JcCyNt4.js";import"./base-field-B7MphIDB.js";import"./text-field-DluAQgMq.js";import"./backdrop-Ck2ckKlw.js";import"./badge-plC7yW6Z.js";import"./banner-CakA5Zpw.js";import"./bottom-sheet-CTDZIrhF.js";import"./dialog-CDD3XYiE.js";import"./button-area-CMddeWfb.js";import"./calendar-BpubrdMm.js";import"./card-DFnVtGn-.js";import"./chip-set-YJ14PC_u.js";import"./circular-progress-Ccu7KP3W.js";import"./color-picker-ejKnF7Jp.js";import"./date-picker-BgosHaG_.js";import"./date-range-picker-8imY5dMw.js";import"./divider-BhCygk1f.js";import"./base-drawer-B-oVfBtq.js";import"./drawer-BBpjY8SV.js";import"./modal-drawer-B3GF85-N.js";import"./mini-drawer-M-3gdrU4.js";import"./expansion-panel-BbxVbjPz.js";import"./open-icon-nGWqZslb.js";import"./file-picker-BReIA02t.js";import"./floating-action-button-Cauo5LPF.js";import"./inline-message-MDZIyJNO.js";import"./key-item-rg5ApiVY.js";import"./keyboard-shortcut-B888_VA0.js";import"./label-value-342323er.js";import"./meter-group-CO1MoxI7.js";import"./page-state-BXhyhEYZ.js";import"./paginator-BxusBlHw.js";import"./scaffold-DpCXKOUM.js";import"./select-dropdown-DY_Fu7IF.js";import"./select-Dfbo_3JR.js";import"./skip-link-CvTJ_J_9.js";import"./slider-DcLHZcfA.js";import"./split-view-DG9jPsC4.js";import"./stack-DTbT3KUK.js";import"./stepper-BM69YNhJ.js";import"./table-Bg3PKjCK.js";import"./tab-bar-DN4eHpYi.js";import"./time-picker-DuD9LB-a.js";import"./toast-D9ezil5Y.js";import"./toolbar-CFdgiwTS.js";import"./tooltip-P-CrpSEv.js";import"./tree-item-CcdMcHN4.js";import"./view-switcher-C5b2QH2R.js";import"./deprecated-icon-button-Cg-4Lc_9.js";import"./split-button-Rh7rC-YZ.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as p,b as r}from"./iframe-pqTvACNP.js";import{s as c,b as g,g as b}from"./utils-Cntew3lg.js";import{o as u}from"./style-map-BBm1Uuz6.js";import{e as y}from"./class-map-C94o5_Lu.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-D8n3fbCt.js";import"./expansion-panel-huBiB0DZ.js";import"./open-icon-BIuINibX.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-B1oFki5a.js";import"./state-layer-DGD4bZzf.js";import"./focus-indicator-B_dAHUd_.js";import{I as h,e as S}from"./tyler-icons-CBdZU-Tr.js";import"./menu-CcEjeL3H.js";import"./linear-progress-CpNoMDP5.js";import"./list-a6IB0DPO.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";import"./avatar-D-YCuW2k.js";import"./icon-button-B_qVG_it.js";import"./autocomplete-BgysD7Fj.js";import"./label-Blmy9e6R.js";import"./button-DIUHasWh.js";import"./button-toggle-group-CH9NiA1W.js";import"./checkbox-Dv_UGdzf.js";import"./switch-CicCqkci.js";import"./base-field-CdA0iQoJ.js";import"./text-field-gs39rriO.js";import"./backdrop-CaFxRXEM.js";import"./badge-BgAW2MVS.js";import"./banner-C6Sq7_TM.js";import"./bottom-sheet-9RBhFU7Z.js";import"./dialog-CGP43TQA.js";import"./button-area-CUbw0tU-.js";import"./calendar-BZuDsAIh.js";import"./card-CeH2SdBX.js";import"./chip-set-yZLLHaLw.js";import"./circular-progress-C2aFmJj-.js";import"./color-picker-Da_a5Bnt.js";import"./date-picker-D-tZYruE.js";import"./date-range-picker-Xc3yj4yH.js";import"./divider-Dq-Slgl_.js";import"./base-drawer-CNdRFpRQ.js";import"./drawer-D79-TANn.js";import"./modal-drawer-DO8CNRCC.js";import"./mini-drawer-CPIvZj6f.js";import"./file-picker-7LLhR8yu.js";import"./floating-action-button-hkupvqUw.js";import"./inline-message-kV-z6eDt.js";import"./key-item-H-_JZqKa.js";import"./keyboard-shortcut-48xwLAq2.js";import"./label-value-CmUo1iy-.js";import"./meter-group-C9Nx9c7t.js";import"./page-state-CSOfrMln.js";import"./paginator-DdPmkNw5.js";import"./scaffold-CspBWUuL.js";import"./select-dropdown-BDxRxeN8.js";import"./select-DEzE72V8.js";import"./skip-link-gsezxPAN.js";import"./slider-B2ZiCoxI.js";import"./split-view-B4nSGAYd.js";import"./stack-B5sNQmDm.js";import"./stepper-D7R_npXr.js";import"./table-D1qIp2da.js";import"./tab-bar-BItD-GAX.js";import"./time-picker-CX-RnTNR.js";import"./toast-LD-5tkSc.js";import"./toolbar-DM62Euqg.js";import"./tooltip-DxbQteKS.js";import"./tree-item-BoUZ1T6Z.js";import"./view-switcher-BguW3JYm.js";import"./deprecated-icon-button-D5lxZbHu.js";import"./split-button-D0_9kHBR.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
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
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],We=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,We as L,l as a};

import{A as n,b as r}from"./iframe-CCQPwMqK.js";import{s as c,b as g,g as b}from"./utils-71auwco3.js";import{o as u}from"./style-map-DcvoGNcx.js";import{e as y}from"./class-map-BspdE2wQ.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-DPyFEc5Q.js";import"./app-bar-menu-button-CKzj1r2k.js";import"./app-bar-profile-button-B1vK_dhd.js";import{I as h,i as S}from"./tyler-icons-D_P4inVM.js";import"./menu-sl54LpTS.js";import"./linear-progress-Du-Ntegu.js";import"./list-DoWEQWCg.js";import"./popover-avDoFPUj.js";import"./overlay-ejBQU7cY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BMUbeM10.js";import"./list-item-BE2FE9nz.js";import"./avatar-B8zO7L0B.js";import"./icon-button-CCm6VdsQ.js";import"./autocomplete-BEDAHktv.js";import"./label-B4HdJcCr.js";import"./base-field-D9i8FqrF.js";import"./focus-indicator-CoBrh689.js";import"./text-field-mdAFESNO.js";import"./backdrop-e4rWKi0D.js";import"./badge-vZbBLVs6.js";import"./banner-CFrstKct.js";import"./bottom-sheet-FmCzKL6a.js";import"./dialog-jSj7mubX.js";import"./button-area-CVtsKOdv.js";import"./button-toggle-group-CuulJVQt.js";import"./button-CArgg2AW.js";import"./calendar-BKpJ_GDn.js";import"./card-BOT7vSRz.js";import"./checkbox-DOBQJUdK.js";import"./chip-set-C28H1EOM.js";import"./state-layer-BcVD1OXH.js";import"./circular-progress-QjF0OwOx.js";import"./color-picker-Cn6hwXqE.js";import"./date-picker-C1F7X9h7.js";import"./date-range-picker-CBKYcM56.js";import"./divider-CYyN_dy_.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./expansion-panel-BGnV8huK.js";import"./open-icon-DhgksudA.js";import"./file-picker-CAPVga5k.js";import"./floating-action-button-BTfaMa44.js";import"./inline-message-D6TY8UzG.js";import"./key-item-C5sD9dLV.js";import"./keyboard-shortcut-Cm4Nksqt.js";import"./label-value-Cs0_BMQ9.js";import"./listbox-C7EIxqca.js";import"./meter-group-D2ztSBQk.js";import"./page-state-C_fu_Hm3.js";import"./paginator-CGiJXl49.js";import"./radio-group-Dx1J_ymN.js";import"./scaffold-C8LskKFX.js";import"./secret-BFKNX6K4.js";import"./option-DxLPA5Op.js";import"./select-dropdown-D5GhW_FN.js";import"./select-DFCfpj9W.js";import"./skip-link-DiJI6cl3.js";import"./slider-DSWx32a_.js";import"./split-view-BCDVwKfV.js";import"./stack-Grf8E1p3.js";import"./stepper-CkXUsgpf.js";import"./switch-Crd9jino.js";import"./table-BSvq45VP.js";import"./tab-panel-CDwwet2g.js";import"./time-picker-Jd52_qXw.js";import"./timestamp-9utdnwwG.js";import"./toast-DLrW0xgD.js";import"./toolbar-CtUE-sqJ.js";import"./tooltip-BwyfwMmY.js";import"./tree-item-C4PlwyAO.js";import"./view-switcher-Cw3vuBIn.js";import"./deprecated-icon-button-LKu6YyLo.js";import"./split-button-C27YHtIS.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

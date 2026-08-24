import{A as n,b as r}from"./iframe-CDZPIrnA.js";import{s as c,b as g,g as b}from"./utils-BUKDVvEj.js";import{o as u}from"./style-map-Bi3yv2V9.js";import{e as y}from"./class-map-CEBNhYyz.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C0S88n-h.js";import"./app-bar-profile-button-TnBJAWMO.js";import{I as h,e as S}from"./tyler-icons-D-GJLevi.js";import"./menu-YOllCC2W.js";import"./linear-progress-D4Cj2MuD.js";import"./list-CQgl2N9z.js";import"./popover-CG55Lm15.js";import"./overlay-DIU5fAP8.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BQUueydM.js";import"./avatar-BPt_toH5.js";import"./icon-button-BGGeCJn0.js";import"./focus-indicator-C6gjbqoY.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-Ch7vfQqt.js";import"./label-CcXTC4gs.js";import"./base-field-BPEQdQpN.js";import"./text-field-DnDu7gxA.js";import"./backdrop-DWOkfyRe.js";import"./badge-L5wVc6Hk.js";import"./banner-fIISV49_.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-CQmcjUc6.js";import"./button-toggle-group-BlLUDMd1.js";import"./button-C0WR4Msg.js";import"./calendar-CHFBl4nC.js";import"./card-BvL89Hpb.js";import"./checkbox-ChE9HdSQ.js";import"./chip-set-BESn29Zp.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-DLUoCOlg.js";import"./date-picker-BlAaPMc0.js";import"./date-range-picker-VX9pIDtb.js";import"./divider-DGfw4r81.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-DPFk1rbx.js";import"./open-icon-CeNJR1p8.js";import"./file-picker-DW51wknD.js";import"./floating-action-button-DGER2WAt.js";import"./inline-message-MRVYAzAu.js";import"./key-item-DF5zcEUk.js";import"./keyboard-shortcut-CA-aVP2o.js";import"./label-value-CWmtlzqa.js";import"./option-group-DJVodTxK.js";import"./meter-group-DCt7b_Y3.js";import"./page-state-j1LLkVCi.js";import"./paginator-BHyLGFOz.js";import"./radio-group-iA9o4SWr.js";import"./scaffold-CssrLcVP.js";import"./secret-DDFgtS4_.js";import"./select-dropdown-D-mPohCZ.js";import"./select-BVisZcNX.js";import"./skip-link-Dtz4gn0m.js";import"./slider-CJKHVo8o.js";import"./split-view-yF3TEDy7.js";import"./stack-Cu7r2NOS.js";import"./stepper-DO4GMjN4.js";import"./switch-MZMXToWJ.js";import"./table-BU6zVD8s.js";import"./tab-panel-BeufWbc3.js";import"./time-picker-asLiPXMl.js";import"./timestamp-CMfwhzFL.js";import"./toast-DkzBQHKc.js";import"./toolbar-CzMdbTAp.js";import"./tooltip-DTYSc0BY.js";import"./tree-item-rcopXKR8.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-CIwQevej.js";import"./split-button-BHYPI_7p.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

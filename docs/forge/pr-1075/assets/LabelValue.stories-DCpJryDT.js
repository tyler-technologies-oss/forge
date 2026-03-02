import{A as p,b as r}from"./iframe-BlOFKJDS.js";import{s as c,b as g,g as b}from"./utils-DUpaJ7b_.js";import{o as u}from"./style-map-CoXBBqwT.js";import{e as y}from"./class-map-CB8bWQ6X.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Cz67_g8i.js";import"./app-bar-profile-button-DwOmon_c.js";import"./state-layer-D_bEeiyc.js";import"./focus-indicator-DF2HrkuM.js";import{I as h,e as S}from"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import"./menu-DvHm9QHD.js";import"./linear-progress-CYTe6uKP.js";import"./list-By4HPSzV.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";import"./avatar-DVJnqbC5.js";import"./icon-button-CBB1Wyv0.js";import"./autocomplete-BdRTgpmE.js";import"./label-PBJgWwVx.js";import"./button-CrEyna-l.js";import"./button-toggle-group-CSYMjEX6.js";import"./checkbox-D6KNXaeb.js";import"./switch-DfOCriK_.js";import"./base-field-ByG2tr7F.js";import"./text-field-DWvKFKKM.js";import"./backdrop-TsivOJBj.js";import"./badge-CBjRh4TS.js";import"./banner-COjey8tM.js";import"./bottom-sheet-C-Lkmp9F.js";import"./dialog-Ck64qUvQ.js";import"./button-area-BJWbO6Ds.js";import"./calendar-9mrIiH1U.js";import"./card-BDdCE95F.js";import"./chip-set-BjGoRsy4.js";import"./circular-progress-D8W_v512.js";import"./color-picker-g_UyFbrr.js";import"./date-picker-BMuFSZSu.js";import"./date-range-picker-BzKRGOCY.js";import"./divider-BL37Lb2g.js";import"./base-drawer-BOH6KPhP.js";import"./drawer-DqRX_445.js";import"./modal-drawer-UtKsh6g7.js";import"./mini-drawer-CjKFhsAv.js";import"./expansion-panel-Ddnhu1du.js";import"./open-icon-zfnrNF6k.js";import"./file-picker-DhRxsOTT.js";import"./floating-action-button-DxcH-M42.js";import"./inline-message-CbmpByuI.js";import"./key-item-CfyooAY3.js";import"./keyboard-shortcut-CWcwLsK9.js";import"./label-value-ChKN0id0.js";import"./meter-group-89d_HKwD.js";import"./page-state-mAXa5csm.js";import"./paginator-BobgBXHO.js";import"./scaffold-BiMWLKK6.js";import"./select-dropdown-DYe0O7fo.js";import"./select-Cxi7Lztq.js";import"./skip-link-DJYsPyar.js";import"./slider-BYiNWqMa.js";import"./split-view-CghQS3Zp.js";import"./stack-DCH7zCMl.js";import"./stepper-DC4AKtBO.js";import"./table-BN8dYzvU.js";import"./tab-bar-Di5yib90.js";import"./time-picker-CHm6ZMIu.js";import"./toast-D4CeBP8R.js";import"./toolbar-DJfFE6T6.js";import"./tooltip-BQwGelzj.js";import"./tree-item-BWJMCI7C.js";import"./view-switcher-ip2Cf1MD.js";import"./deprecated-icon-button-LU_LWcAr.js";import"./split-button-DYMTATvH.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{A as n,b as r}from"./iframe-DQLkTsj5.js";import{s as c,b as g,g as b}from"./utils-RooUwGan.js";import{o as u}from"./style-map-DmjQRv9U.js";import{e as y}from"./class-map-EigTEi9S.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-BjYzWZHq.js";import"./app-bar-menu-button-Ds3KQZba.js";import"./app-bar-profile-button-6E85qYm4.js";import{I as h,i as S}from"./tyler-icons-DPuUJ4cJ.js";import"./menu-Cx7fFLhB.js";import"./linear-progress-VpC6qUWa.js";import"./list-nmWb3pVb.js";import"./popover-TR9PPKD2.js";import"./overlay-DGZ2XdhX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CwILcSG1.js";import"./list-item-DEpPizi1.js";import"./avatar-Ckf838TB.js";import"./icon-button-CMY5cmct.js";import"./autocomplete-CAUXEvuO.js";import"./label-CR5s3CYN.js";import"./base-field-SrDjUvEH.js";import"./focus-indicator-BzR77xDT.js";import"./text-field-L_Zp44sz.js";import"./backdrop-Dvs4MPLP.js";import"./badge-B-qmCmuX.js";import"./banner-U_DSUf8c.js";import"./bottom-sheet-D2WGIiuu.js";import"./dialog-D41xgR_D.js";import"./button-area-BpbOE84b.js";import"./button-toggle-group-BLLXbdPl.js";import"./button-DT_Na7FY.js";import"./calendar-Dbz0p-_z.js";import"./card-C3gFyNEB.js";import"./checkbox-BzNarstH.js";import"./chip-set-BDBdgkKU.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-4Nou3L92.js";import"./date-picker-CULUToRd.js";import"./date-range-picker-C1fPtKWK.js";import"./divider-Au3xwmhZ.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-zjQkefOT.js";import"./open-icon-DJjxABQQ.js";import"./file-picker-kQziegkh.js";import"./floating-action-button-h_wnpdNd.js";import"./inline-message-BXrlbIvc.js";import"./key-item-DZO5-Ix4.js";import"./keyboard-shortcut-BQdfizK8.js";import"./label-value-CDNJ622N.js";import"./meter-group-DeziYYvE.js";import"./page-state-C_fHeyC9.js";import"./paginator-CTj70Paf.js";import"./radio-group-CJOj088f.js";import"./scaffold-D8DtzjhO.js";import"./secret-7GNs9ipI.js";import"./select-dropdown-DsNzj9e7.js";import"./select-B0NkVT0c.js";import"./skip-link-B5qLZQY7.js";import"./slider-ChtR0ADE.js";import"./split-view-Bgogid_L.js";import"./stack-E4V9OTtJ.js";import"./stepper-wDG6cdAU.js";import"./switch-CL40Kqds.js";import"./table-DzZfPIf7.js";import"./tab-panel-V6bq_68y.js";import"./time-picker-CLcgtLTB.js";import"./timestamp-BQbg-_n4.js";import"./toast-Cr3vq2QO.js";import"./toolbar-Bm2frJkv.js";import"./tooltip-DF8jbOdo.js";import"./tree-item-CmGis0W2.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-B8C2UfA9.js";import"./split-button-BC_G3O6m.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

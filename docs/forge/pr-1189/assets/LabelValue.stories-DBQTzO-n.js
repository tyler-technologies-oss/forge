import{A as n,b as r}from"./iframe-BTsZxqzu.js";import{s as c,b as g,g as b}from"./utils-B0J9t6hU.js";import{o as u}from"./style-map-D_mDhrQD.js";import{e as y}from"./class-map-B2uIhfTt.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-CjVBnotg.js";import"./app-bar-menu-button-CFiTdJpq.js";import"./app-bar-profile-button-DoGxqipC.js";import{I as h,i as S}from"./tyler-icons-DhRbvloE.js";import"./menu-D5KoOrqK.js";import"./linear-progress-VpC6qUWa.js";import"./list-DxnPa9SU.js";import"./popover-CdNzs7fC.js";import"./overlay-knVFCZgv.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DBZT6LKu.js";import"./list-item-BTfzPPjj.js";import"./avatar-DoSh_Dn-.js";import"./icon-button-CSxHjIC-.js";import"./autocomplete-hXsQWRXE.js";import"./label-OjWKjQls.js";import"./base-field-CobvQUzz.js";import"./focus-indicator-BxamY3-n.js";import"./text-field-Ch1FWqHZ.js";import"./backdrop-Dvs4MPLP.js";import"./badge-DDQskPzl.js";import"./banner-Dm9dhMPo.js";import"./bottom-sheet-C7_rHYEu.js";import"./dialog-DxXf_Dbp.js";import"./button-area-4bI26jRa.js";import"./button-toggle-group-BFEOiNHv.js";import"./button-ClyH3Yl3.js";import"./calendar-EKqwaDxI.js";import"./card-Qhb2yYy0.js";import"./checkbox-DVtidS7M.js";import"./chip-set-D_vH5iS6.js";import"./state-layer-UyeTOOS1.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-CKIyPXzm.js";import"./date-picker-p-6IrbFy.js";import"./date-range-picker-aiXks6tR.js";import"./divider-Dg5OevOB.js";import"./base-drawer-BUa_Gi5V.js";import"./drawer-DmGwXUG9.js";import"./modal-drawer-CKqZfbJJ.js";import"./mini-drawer-BrHB6nIf.js";import"./expansion-panel-BbI0pkhF.js";import"./open-icon-BwO0GMIm.js";import"./file-picker-CtOJktyP.js";import"./floating-action-button-4KD-XSG5.js";import"./inline-message-BXrlbIvc.js";import"./key-item-Cwp8M_5_.js";import"./keyboard-shortcut-mXtlvBJF.js";import"./label-value-CDNJ622N.js";import"./meter-group-Bnnr3Hry.js";import"./page-state-C_fHeyC9.js";import"./paginator-B3As9dPL.js";import"./radio-group-D1m04xtX.js";import"./scaffold-D8DtzjhO.js";import"./secret-D9qW-V8N.js";import"./select-dropdown-BdiZ4bOb.js";import"./select-Bwz3DagM.js";import"./skip-link-3BiqU279.js";import"./slider-ojE6Aw4y.js";import"./split-view-CiqHmrFI.js";import"./stack-E4V9OTtJ.js";import"./stepper-H99SvyzG.js";import"./switch-BYCVeuO7.js";import"./table-DpM5Ey70.js";import"./tab-panel-CtZ60m4t.js";import"./time-picker-B_FvMdr4.js";import"./timestamp-dOqt_oXq.js";import"./toast-C42nowyP.js";import"./toolbar-BrM6y13y.js";import"./tooltip-DAcILSGy.js";import"./tree-item-Ds7WR_SG.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-FHI3ZZnx.js";import"./split-button-Bes8qIKO.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

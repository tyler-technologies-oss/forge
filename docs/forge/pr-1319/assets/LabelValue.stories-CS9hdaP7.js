import{A as n,b as r}from"./iframe-BlLbDnlR.js";import{s as c,b as g,g as b}from"./utils-BaIZrU9D.js";import{o as u}from"./style-map-B5Ix9hgE.js";import{e as y}from"./class-map-BpS8NEi2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D4YQO9Ue.js";import"./app-bar-menu-button-BaGw08-A.js";import"./app-bar-profile-button-C2m-3y6g.js";import{I as h}from"./icon-CJqXyQad.js";import"./menu-BJm1EpsD.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-C7kfQ7Om.js";import"./popover-COR2BVeW.js";import"./overlay-BwE7oRiM.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CBQ6kPse.js";import"./list-item-BteMMJXx.js";import"./avatar-B0LT2awf.js";import"./icon-button-CyhNoOEa.js";import"./autocomplete-BjizbZOM.js";import"./label-hOmdyDz5.js";import"./base-field-ClmyUAzy.js";import"./focus-indicator-CIttc_vs.js";import"./text-field-CJFYHWJt.js";import"./backdrop-ngk7d2eo.js";import"./badge-DVN63XgK.js";import"./banner-DG6x1V1F.js";import"./bottom-sheet-D_0DL6CS.js";import"./dialog-fH8z4QHs.js";import"./breadcrumb-overflow-menu-D5QuRlsa.js";import"./button-area-B8NThN95.js";import"./button-toggle-group-C_A4IeEk.js";import"./button-Dkyk4iXI.js";import"./calendar-CcyMAGNl.js";import"./card-BaX7aQWQ.js";import"./checkbox-CxpcJLs8.js";import"./chip-set-DU1xiE8U.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-BHUUTKxr.js";import"./date-picker-QGXL8HPu.js";import"./date-range-picker-X_fjR-FI.js";import"./divider-C7tnw8-Z.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-B9ysxp4s.js";import"./open-icon-BNsFzF3j.js";import"./file-picker-DjI6oZXa.js";import"./floating-action-button-yYTCKSia.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-D_KWbOTS.js";import"./key-item-D3JeWuxH.js";import"./keyboard-shortcut-BPiQX7UA.js";import"./label-value-C0-wovkK.js";import"./listbox-UqO_sJWD.js";import"./meter-group-Ceno2x1f.js";import"./page-state-DvaZGddB.js";import"./paginator-Di27Dqdj.js";import"./process-stepper-6G8CUGs9.js";import"./radio-group-fOpingEl.js";import"./scaffold-Ca9xBuAs.js";import"./secret-DS_HWtus.js";import"./option-DxaBBGMg.js";import"./select-dropdown-hojASTf6.js";import"./select-Bt2_Ex7X.js";import"./skip-link-CWvksz5L.js";import"./slider-D2xy5yd8.js";import"./split-view-CXC7o5sS.js";import"./stack-B7ywhmtQ.js";import"./stepper-CJCkjvVA.js";import"./switch-BsUixfA2.js";import"./table-IspVLf4I.js";import"./tab-panel-CfmqUZqN.js";import"./time-picker-DCBHQU9I.js";import"./timestamp-BjfoJRKY.js";import"./toast-BzMem4Sw.js";import"./toolbar-Uh-GtQd7.js";import"./tooltip-CQvCJDFH.js";import"./tree-item-ow1ztNkc.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-n4v3SZL_.js";import"./split-button-DmHAT2Hm.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],or=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,or as L,a};

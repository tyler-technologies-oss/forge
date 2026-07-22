import{A as p,b as r}from"./iframe-ZvzVysMB.js";import{s as c,b as g,g as b}from"./utils-D5x2rMta.js";import{o as u}from"./style-map-BYFhBNXo.js";import{e as y}from"./class-map-DS_zoLL-.js";import"./service-adapter-8tADcN_b.js";import"./accordion-5GbCI4xt.js";import"./app-bar-profile-button-CUxb0Xdj.js";import{I as h,e as S}from"./tyler-icons-H8C0T-24.js";import"./menu-iIi5F8Tp.js";import"./linear-progress-Bb0VsHdX.js";import"./list-BXM5oFgP.js";import"./popover-qCA9PGyj.js";import"./overlay-DZcAclZS.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-QEOzuRnR.js";import"./avatar-CogGad_2.js";import"./icon-button-wfw28VlB.js";import"./autocomplete-CqtINfQ8.js";import"./label-DLG3xkby.js";import"./button-B8ecmhvI.js";import"./button-toggle-group-DGSVgR77.js";import"./focus-indicator-D_djYoC-.js";import"./checkbox-BVNiu6nH.js";import"./switch-CCh3ISmz.js";import"./base-field-C3qoTWst.js";import"./text-field-DtSml0Xe.js";import"./backdrop-CJeGwdvM.js";import"./badge-C9ERgbqJ.js";import"./banner-Due-4cKM.js";import"./bottom-sheet-BbPe0My8.js";import"./dialog-DeYKv41n.js";import"./button-area-BYzf39yi.js";import"./calendar-Bcdl9Tdj.js";import"./card-B0LsWTph.js";import"./chip-set-BaGgSBZW.js";import"./state-layer-BjPyszbg.js";import"./circular-progress-CMqvPe99.js";import"./color-picker-RYFTuZNS.js";import"./date-picker-DxYzDfY8.js";import"./date-range-picker-BBI1DIJC.js";import"./divider-CjRPWH8q.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DjvThjH_.js";import"./modal-drawer-COSMbJws.js";import"./mini-drawer-CgzMGYo3.js";import"./expansion-panel-DR1Mvixy.js";import"./open-icon-DjVhjUr1.js";import"./file-picker-DY9QYq4S.js";import"./floating-action-button-eBg_Z6J8.js";import"./inline-message-CJe4-CHc.js";import"./key-item-Bgva_T8Q.js";import"./keyboard-shortcut-CAXYUc0u.js";import"./label-value-cj79W541.js";import"./meter-group-BZ_GZRqC.js";import"./page-state-BMZmoTs6.js";import"./paginator-Cvy5kStb.js";import"./scaffold-BxvL1G0m.js";import"./secret-CrFv_9fK.js";import"./select-dropdown-B4f1gBlD.js";import"./select-BRSYUHiU.js";import"./skip-link-BvziHuTe.js";import"./slider-DVukgl3T.js";import"./split-view-S5cq6mhO.js";import"./stack-_B9Egjn2.js";import"./stepper-C_ZzV-_y.js";import"./table-D-k-NSgC.js";import"./tab-bar-DZ9YLrMO.js";import"./time-picker-JhCbDo4r.js";import"./timestamp-DfAWLzE-.js";import"./toast-BaONwOs2.js";import"./toolbar-CgcJD7J8.js";import"./tooltip-D6dXzQ5h.js";import"./tree-item-DN8vQ8iq.js";import"./view-switcher-CxkXvxxP.js";import"./deprecated-icon-button-DXXxRxeQ.js";import"./split-button-C_a1-j5b.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
    `)},a={...c,args:{inline:!0}},l={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ge=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ge as L,a};

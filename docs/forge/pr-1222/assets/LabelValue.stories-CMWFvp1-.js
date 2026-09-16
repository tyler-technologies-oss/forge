import{A as n,b as r}from"./iframe-BPj94FGh.js";import{s as c,b as g,g as b}from"./utils-LbM5kS63.js";import{o as u}from"./style-map-DhpmFxzM.js";import{e as y}from"./class-map-oMFnGZ1n.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bckxvy97.js";import"./app-bar-profile-button-fTlS9ltg.js";import{I as h,e as S}from"./tyler-icons-D8NJqrYQ.js";import"./menu-BEUOKQvv.js";import"./linear-progress-Dh__ll_M.js";import"./list-Bog6thhw.js";import"./popover-b8Gx4sac.js";import"./overlay-MMpEd-75.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DP9gcNgN.js";import"./avatar-_-DI1-TJ.js";import"./icon-button-CR83Kg9m.js";import"./focus-indicator-DDCQz0qC.js";import"./state-layer-mJUCxnSJ.js";import"./autocomplete-tYeSo9MW.js";import"./label-DntvFisr.js";import"./base-field-DKvZp4s1.js";import"./text-field-BhRaR8G8.js";import"./backdrop-6rFKosil.js";import"./badge-DOWYtknc.js";import"./banner-CcvTs6jh.js";import"./bottom-sheet-CzibY-xn.js";import"./dialog-DqSQzysl.js";import"./button-area-WtMFY0Pu.js";import"./button-toggle-group-BeMdS7Rv.js";import"./button-fWyNfyy9.js";import"./calendar-BTY1cDDi.js";import"./card-BOAJRdnh.js";import"./checkbox-S0wbrtnY.js";import"./chip-set-ihRCQPgy.js";import"./circular-progress-CNehBhf0.js";import"./color-picker-DSU_-0nr.js";import"./date-picker-BhssqJw3.js";import"./date-range-picker-aZYBQ2ZQ.js";import"./divider-Gl_gGqnk.js";import"./base-drawer-7Wh9lkkV.js";import"./drawer-CRT3lE2E.js";import"./modal-drawer-BijuI8cC.js";import"./mini-drawer-BD00MKTN.js";import"./expansion-panel-BIsU606u.js";import"./open-icon-CUTwfP0D.js";import"./file-picker-BVDL8BKr.js";import"./floating-action-button-BdB76eGc.js";import"./inline-message-DGh2LsDu.js";import"./kbd-DYjwD61B.js";import"./key-item-DMWDnaJn.js";import"./keyboard-shortcut-BLkSP6_U.js";import"./label-value-o_jvt4kl.js";import"./meter-group-RheF0fPl.js";import"./page-state-By0fGZIX.js";import"./paginator-B7feSzkd.js";import"./radio-group-2nWXRnFr.js";import"./scaffold-DlnKxn3X.js";import"./secret-CxVQOAxP.js";import"./select-dropdown-BFj-6rdQ.js";import"./select-8BAXccUm.js";import"./skip-link-DNzLJwJl.js";import"./slider-Di2i4Url.js";import"./split-view-DJ132E5B.js";import"./stack-Cbce-CUg.js";import"./stepper-CDd8xGx6.js";import"./switch-EShiemOX.js";import"./table-Bs65j2Um.js";import"./tab-panel-DkUqwo7y.js";import"./time-picker-Bu9eSgpd.js";import"./timestamp-OUrhjBiQ.js";import"./toast-C_O3YvRg.js";import"./toolbar-Duiannn3.js";import"./tooltip-WnsCuOqb.js";import"./tree-item-BETKErDp.js";import"./view-switcher-D7AQr4N8.js";import"./deprecated-icon-button-BGVWKo7p.js";import"./split-button-hdLiZUtZ.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

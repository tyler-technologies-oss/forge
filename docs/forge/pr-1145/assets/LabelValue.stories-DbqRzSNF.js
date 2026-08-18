import{A as p,b as r}from"./iframe-B0vKBzPk.js";import{s as c,b as g,g as b}from"./utils-QCscRJfA.js";import{o as u}from"./style-map-D0CagAox.js";import{e as y}from"./class-map-yF0k6MxY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DYFIqpJs.js";import"./app-bar-profile-button-qNBq282f.js";import{I as h,e as S}from"./tyler-icons-Dp432aHk.js";import"./menu-DZyDPJNU.js";import"./linear-progress-CsGp1g6o.js";import"./list-CVzTbD2g.js";import"./popover-gwjvAjf-.js";import"./overlay-CqP4w4-f.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B5JliGtP.js";import"./avatar-BP484sZl.js";import"./icon-button-MtKQF9Cm.js";import"./focus-indicator-Bw8FAg-e.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-eNfkP8MS.js";import"./label-Ca7MhaHs.js";import"./base-field-sYTOEQ1U.js";import"./text-field-VqH1ZQ4i.js";import"./backdrop-3KzDwztH.js";import"./badge-BmFZS4uN.js";import"./banner-B1-5SWUu.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-E4Rk5a90.js";import"./button-toggle-group-CYXqogGb.js";import"./button-CC2Xkyfz.js";import"./calendar-BsGFxKDM.js";import"./card-DVSlM5Jf.js";import"./checkbox-BsBKZw4X.js";import"./chip-set-DVTVw06p.js";import"./circular-progress-DIduwjig.js";import"./color-picker-CCa06iEu.js";import"./date-picker-DzxaGmIN.js";import"./date-range-picker-B8cFK310.js";import"./divider-CZcBsnNn.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-KB_ZOHJc.js";import"./open-icon--hoiUnqy.js";import"./file-picker-DamEuHYi.js";import"./floating-action-button-DWp75xI0.js";import"./inline-message-fj34p3Px.js";import"./key-item-Ci3PTm0X.js";import"./keyboard-shortcut-BSY6Gvtq.js";import"./label-value-cTsUvwyw.js";import"./meter-group-C7vsdpzU.js";import"./page-state-DDjhdZbK.js";import"./paginator-BU8sXWR5.js";import"./radio-group-Dh6xMgYs.js";import"./scaffold-CufLEZ-a.js";import"./secret-C7chJRoP.js";import"./select-dropdown-DaZV1w3q.js";import"./select-wlwn4AGY.js";import"./skip-link-CF760mg-.js";import"./slider-Ckjezixm.js";import"./split-view-CUzkQCN5.js";import"./stack-Bc7kWG9C.js";import"./stepper-CVjj8f69.js";import"./switch-D11QlSLx.js";import"./table-NLLLwIPh.js";import"./tab-panel-CjoytrXY.js";import"./time-picker-BGFLiwdA.js";import"./timestamp-nhbc2po4.js";import"./toast-Bdxqt-pG.js";import"./toolbar-vumc9l8J.js";import"./tooltip-Di7PxSzI.js";import"./tree-item-C12koJyl.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-Q19sTOZx.js";import"./split-button-DF5r-RQA.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ke as L,a};

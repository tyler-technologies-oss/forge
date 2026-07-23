import{A as p,b as r}from"./iframe-IbY4Oy7g.js";import{s as c,b as g,g as b}from"./utils-D5x2rMta.js";import{o as u}from"./style-map-CgF03eRt.js";import{e as y}from"./class-map-3CuaVSER.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C90CwbYT.js";import"./app-bar-profile-button-B40PzRjy.js";import{I as h,e as S}from"./tyler-icons-D3PVExpf.js";import"./menu-Cj6_lG8e.js";import"./linear-progress-Bb0VsHdX.js";import"./list-BEvrgVXU.js";import"./popover-BG4-Pyu8.js";import"./overlay-BRsNG1-Q.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Bv38rDCU.js";import"./avatar-B5LrQJ10.js";import"./icon-button-CW3AgSAX.js";import"./autocomplete-13zwuh6n.js";import"./label-CFO2X73D.js";import"./button-BUCVRh9N.js";import"./button-toggle-group-BdfvY4f-.js";import"./focus-indicator-em7j0z3w.js";import"./checkbox-BWQKNjit.js";import"./switch-BHLx_rJf.js";import"./base-field-B8M5Rbwm.js";import"./text-field-DjKMWryZ.js";import"./backdrop-CJeGwdvM.js";import"./badge-DEeA44tk.js";import"./banner-Y6ijvO9g.js";import"./bottom-sheet-BbPe0My8.js";import"./dialog-DeYKv41n.js";import"./button-area-D1gXeTbC.js";import"./calendar-kMVEhX_X.js";import"./card-BPj2HYBm.js";import"./chip-set-B0aWveDe.js";import"./state-layer-BjPyszbg.js";import"./circular-progress-CMqvPe99.js";import"./color-picker-C4kR98Fw.js";import"./date-picker-7wsV4qez.js";import"./date-range-picker-C3e63Xmn.js";import"./divider-DU8cgQqr.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DjvThjH_.js";import"./modal-drawer-COSMbJws.js";import"./mini-drawer-CgzMGYo3.js";import"./expansion-panel-Cvj0tLEi.js";import"./open-icon-7uwpke22.js";import"./file-picker-DulUdguX.js";import"./floating-action-button-Cv-TcWr5.js";import"./inline-message-CJe4-CHc.js";import"./key-item-Dv4uVST_.js";import"./keyboard-shortcut-BhLl6n_E.js";import"./label-value-cj79W541.js";import"./meter-group-CrVBt-mx.js";import"./page-state-BMZmoTs6.js";import"./paginator-D635MB2u.js";import"./scaffold-BxvL1G0m.js";import"./secret-d5paID8F.js";import"./select-dropdown-6qFUn7ve.js";import"./select-qOMDemxs.js";import"./skip-link-Ypo-qMsG.js";import"./slider-qlSstSAR.js";import"./split-view-BRcvKZW0.js";import"./stack-_B9Egjn2.js";import"./stepper-Ci5FZXqN.js";import"./table-CJfDKLLx.js";import"./tab-bar-DRkdGrDW.js";import"./time-picker-Box2Q7RX.js";import"./timestamp-0XaEqbaI.js";import"./toast-DkK0GdZs.js";import"./toolbar-D9bbmaMw.js";import"./tooltip-BIhv8P-N.js";import"./tree-item-DaxsL0yr.js";import"./view-switcher-CxkXvxxP.js";import"./deprecated-icon-button-CASscuV2.js";import"./split-button-y_XzGKRd.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

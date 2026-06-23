import{A as p,b as r}from"./iframe-D3ywNwM8.js";import{s as c,b as g,g as b}from"./utils-DI4_RuhW.js";import{o as u}from"./style-map-DBMJ679P.js";import{e as y}from"./class-map-DyP0-09v.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bj4YjFbN.js";import"./app-bar-profile-button-S58fsRAk.js";import{I as h,e as S}from"./tyler-icons-B-oGyIaD.js";import"./menu-DiOOlW3h.js";import"./linear-progress-DLb8lZjg.js";import"./list-Drs8GpbO.js";import"./popover-CwCOnS6V.js";import"./overlay-CHo1bjNa.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar--VYXUsGR.js";import"./icon-button-C-gmku5F.js";import"./focus-indicator-L8jLY3bP.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-BcLGlvuO.js";import"./label-DSKa9dGD.js";import"./button-jbDXhbVx.js";import"./button-toggle-group-D3b7Fof0.js";import"./checkbox-BULrRoA1.js";import"./switch-CNr0V07u.js";import"./base-field-_ogFqgFi.js";import"./text-field-Dy5AkmIq.js";import"./backdrop-Br-v5NXK.js";import"./badge-sm_dRb1K.js";import"./banner-BPSVi3QM.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-D5whCPES.js";import"./calendar-BA1KMkIF.js";import"./card-kMaCCB0o.js";import"./chip-set-CTNif94r.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-LkeRQoSF.js";import"./date-picker-mYuLLO1f.js";import"./date-range-picker-2LG9bN2P.js";import"./divider-C2rifY9z.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-Cs4bmUMC.js";import"./open-icon-lLXUZ9dO.js";import"./file-picker-8YjEvxm3.js";import"./floating-action-button-D7VU3q7w.js";import"./inline-message-EO-dHXbB.js";import"./key-item-CAsmdyKX.js";import"./keyboard-shortcut-C7606aOO.js";import"./label-value-C46r41pN.js";import"./meter-group-BSFeyXPT.js";import"./page-state-BeEclPwI.js";import"./paginator-CykPTkhA.js";import"./scaffold-B-1oYF3d.js";import"./secret-B7I65b0X.js";import"./select-dropdown-quKX_lXx.js";import"./select-vEybfJiH.js";import"./skip-link-CMVBXWMu.js";import"./slider-CGo7DqIb.js";import"./split-view-Do8yzCcC.js";import"./stack-DskzmGQg.js";import"./stepper-BVyxrQzl.js";import"./table-D56IsUp-.js";import"./tab-bar-B0VuSy4w.js";import"./time-picker-C8Q9ORQC.js";import"./timeline-break-DF9CQAV3.js";import"./toast-DcDoY4pL.js";import"./toolbar-CIJK0Tzd.js";import"./tooltip-B_O9h6Rp.js";import"./tree-item-n5oXXDrG.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-mBDLvK2_.js";import"./split-button-BwjTHL4Q.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

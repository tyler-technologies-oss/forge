import{A as p,b as r}from"./iframe-Ct7_Im3r.js";import{s as c,b as g,g as b}from"./utils-YUGVIsXY.js";import{o as u}from"./style-map-B8AA-CCH.js";import{e as y}from"./class-map-BnItZqTF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BSbg8nrB.js";import"./app-bar-profile-button-P5X1ncIl.js";import{I as h,e as S}from"./tyler-icons-DHcFYUo8.js";import"./menu-C8uTwp6w.js";import"./linear-progress-BvuLf7up.js";import"./list-BZX3BfXR.js";import"./popover-mByQYqA1.js";import"./overlay-B4lWdMx2.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-9R_n9OY2.js";import"./icon-button-Bl0BWpRR.js";import"./autocomplete--n38x35G.js";import"./label-DIaGplDT.js";import"./button-CseKomli.js";import"./button-toggle-group-aLPXvlfd.js";import"./focus-indicator-CrKoG3Nd.js";import"./checkbox-D9bMPwhq.js";import"./switch-DwqAQuQf.js";import"./base-field-CCo-4VS7.js";import"./text-field-C_N2HQqH.js";import"./backdrop-SMwLBDG5.js";import"./badge-BUo2oWcY.js";import"./banner-BTkYn8ee.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-ChIF771t.js";import"./calendar-2kZbIc92.js";import"./card-Cd2DEfI2.js";import"./chip-set-4y51DhDX.js";import"./state-layer-DRsbBcDh.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-CZJi_L_e.js";import"./date-picker-cnjmRfDb.js";import"./date-range-picker-CQDglOff.js";import"./divider-DD8uvhxV.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DKywKqIa.js";import"./open-icon-qT7GFCH0.js";import"./file-picker-o4LJnebw.js";import"./floating-action-button-DmxSB-Ze.js";import"./inline-message-Dej6nioH.js";import"./key-item-DrZBStRL.js";import"./keyboard-shortcut-CswOvusr.js";import"./label-value-CJDyRgCt.js";import"./meter-group-7Sazfebw.js";import"./page-state-xtTZreUO.js";import"./paginator-CXr54Vko.js";import"./scaffold-l7cEUk27.js";import"./secret-D3em97yk.js";import"./select-dropdown-Cb-aoezb.js";import"./select-D5ODPpEs.js";import"./skip-link-VOUTEvDP.js";import"./slider-qQBHEUFh.js";import"./split-view-Bbr15cK3.js";import"./stack-DYrRnd9D.js";import"./stepper-BCvmb8cv.js";import"./table-jT_u-1ma.js";import"./tab-bar-CZdl7TQP.js";import"./time-picker-BOq4W6P_.js";import"./toast-Wr6V4s0r.js";import"./toolbar-B_QLjelg.js";import"./tooltip-ylaJPtpW.js";import"./tree-item-f4BEaGw9.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-Rc3fthZl.js";import"./split-button-RZjZQdTO.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,qe as L,a};

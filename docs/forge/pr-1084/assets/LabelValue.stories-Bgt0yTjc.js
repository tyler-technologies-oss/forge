import{A as p,b as r}from"./iframe-C968nksY.js";import{s as c,b as g,g as b}from"./utils-DWX6V94N.js";import{o as u}from"./style-map-XZhHHPuc.js";import{e as y}from"./class-map-DVSqzspb.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-qhnN9Dhm.js";import"./expansion-panel-CKd1i4pm.js";import"./open-icon-DNzxAzu8.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BlYyFM6s.js";import{I as h,e as S}from"./tyler-icons-DRTyRvfU.js";import"./menu-C9qBdRnF.js";import"./linear-progress-Dnev6XAt.js";import"./list-BBJyroMD.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./skeleton-D35b5pv1.js";import"./avatar-CgTTqmUj.js";import"./icon-button-XSoXgn_Y.js";import"./focus-indicator-kmsJjA3V.js";import"./state-layer-D7Damx7l.js";import"./autocomplete-Bu53YyCd.js";import"./label-DXROT2e8.js";import"./button-w0jPws2W.js";import"./button-toggle-group-By0fBApA.js";import"./checkbox-B51zW713.js";import"./switch-BiyA8dzM.js";import"./base-field-8Wp1oxjl.js";import"./text-field-ijRlUfbl.js";import"./backdrop-DBJsfqA2.js";import"./badge-YMU_Bkmv.js";import"./banner-DBp4KBnb.js";import"./bottom-sheet-Ce3j_iPW.js";import"./dialog-BidBU9U3.js";import"./button-area-CHUTGfRG.js";import"./calendar-CTQlHNhk.js";import"./card-wL8pMkBa.js";import"./chip-set-tSMorQPX.js";import"./circular-progress-YjONhwAO.js";import"./color-picker-5brkVgLV.js";import"./date-picker-Cdi3ha3j.js";import"./date-range-picker-CtTiWEon.js";import"./divider-BUi3LQey.js";import"./base-drawer-CMV8i4IQ.js";import"./drawer-6E6dRWgC.js";import"./modal-drawer-S8qVhni2.js";import"./mini-drawer-BD0KMCV8.js";import"./file-picker-DJ45wf34.js";import"./floating-action-button-BnMK0LXc.js";import"./inline-message-D4tR_oFp.js";import"./key-item-DIsjQEVf.js";import"./keyboard-shortcut-YNNDN05D.js";import"./label-value-BrspRHH6.js";import"./meter-group-DuWc0f7D.js";import"./page-state-Ds7MnXyo.js";import"./paginator-BIYmkLrs.js";import"./scaffold-B5aByuW8.js";import"./select-dropdown-BNh5VFa3.js";import"./select-DeEpVUVc.js";import"./skip-link-B-RJmx8i.js";import"./slider-CoMXAB23.js";import"./split-view-CeCsLx_c.js";import"./stack-DOOJtDNF.js";import"./stepper-CzfXBGrr.js";import"./table-B-hK3tf9.js";import"./tab-bar-CBRiBfUI.js";import"./time-picker-Bo0Bty4M.js";import"./toast-s0URM7xQ.js";import"./toolbar-DKTN8__P.js";import"./tooltip-jHI1dl1O.js";import"./tree-item-vBjDOHev.js";import"./view-switcher-CH_mOtvX.js";import"./deprecated-icon-button-D7UmpjNB.js";import"./split-button-DGwlG4It.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

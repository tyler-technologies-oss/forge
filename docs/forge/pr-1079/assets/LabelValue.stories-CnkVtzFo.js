import{A as p,b as r}from"./iframe-CvOKOd3F.js";import{s as c,b as g,g as b}from"./utils-zCyTXnrZ.js";import{o as u}from"./style-map-D9Aeadbf.js";import{e as y}from"./class-map-DXUaajGX.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-qhnN9Dhm.js";import"./expansion-panel-CKd1i4pm.js";import"./open-icon-DNzxAzu8.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BZMX21gE.js";import"./state-layer-D7Damx7l.js";import"./focus-indicator-D4rjhUva.js";import{I as h,e as S}from"./tyler-icons-DRTyRvfU.js";import"./menu-BlJ62tzA.js";import"./linear-progress-Dnev6XAt.js";import"./list-DrfuQcV0.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./skeleton-D35b5pv1.js";import"./avatar-7Qgj_Jkk.js";import"./icon-button-dDjQtfj0.js";import"./autocomplete-DNEfXPT6.js";import"./label-DjhrjYcA.js";import"./button-Bi90NRzP.js";import"./button-toggle-group-BVIytbZM.js";import"./checkbox-DW8QQYdx.js";import"./switch-DReLaeSi.js";import"./base-field-BDjPjPCs.js";import"./text-field-TrCZ3xYL.js";import"./backdrop-DBJsfqA2.js";import"./badge-B5eoFBN0.js";import"./banner-C6vs6cOZ.js";import"./bottom-sheet-Ce3j_iPW.js";import"./dialog-BidBU9U3.js";import"./button-area-CA0AK0GX.js";import"./calendar-C_sbnOBj.js";import"./card-DoZ6dVJM.js";import"./chip-set-BKprp8Rq.js";import"./circular-progress-YjONhwAO.js";import"./color-picker-C1wVmXbh.js";import"./date-picker-CQ6wKSpe.js";import"./date-range-picker-Dtpl9cX1.js";import"./divider-BUi3LQey.js";import"./base-drawer-CMV8i4IQ.js";import"./drawer-6E6dRWgC.js";import"./modal-drawer-S8qVhni2.js";import"./mini-drawer-BD0KMCV8.js";import"./file-picker-CjEb1Wtx.js";import"./floating-action-button-DS80j05t.js";import"./inline-message-D4tR_oFp.js";import"./key-item-BbUCbjlP.js";import"./keyboard-shortcut-YNNDN05D.js";import"./label-value-BrspRHH6.js";import"./meter-group-uWZdtsmz.js";import"./page-state-Ds7MnXyo.js";import"./paginator-BB9ExUfD.js";import"./scaffold-B5aByuW8.js";import"./select-dropdown-CqIm-WFg.js";import"./select-CpxPSkNS.js";import"./skip-link-Dg6-Nju6.js";import"./slider-DZgzOjEW.js";import"./split-view-CkLHLAtp.js";import"./stack-DOOJtDNF.js";import"./stepper-BeKjZBE1.js";import"./table-zH8x9uxO.js";import"./tab-bar-BCSyRZMn.js";import"./time-picker-DJ0uB05t.js";import"./toast-CEWYrknq.js";import"./toolbar-DKTN8__P.js";import"./tooltip-jHI1dl1O.js";import"./tree-item-BBGJykAV.js";import"./view-switcher-CH_mOtvX.js";import"./deprecated-icon-button-CfnBouRs.js";import"./split-button-DHIo14Gm.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

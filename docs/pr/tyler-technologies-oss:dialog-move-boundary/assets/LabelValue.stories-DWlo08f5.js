import{x as o,E as m}from"./iframe-Dk6FLRDb.js";import{g as C,s as x,a as $}from"./utils-QLgq-F6h.js";import{o as A}from"./style-map-DxxfczF-.js";import{e as M}from"./class-map-CFV1iACR.js";import"./feature-detection-uS6p5jc8.js";import"./accordion-C9RSixQz.js";import"./expansion-panel-BNaYdpp_.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-DqvvmGNO.js";import"./state-layer-CDmGOVud.js";import"./focus-indicator-13Sfphtk.js";import{I as H,e as L}from"./icon-B8CdcxqJ.js";import"./menu-COBLhr1H.js";import"./linear-progress-2PahUgVv.js";import"./list-BoYqkH2U.js";import"./popover-DCwSavHj.js";import"./overlay-Dg-i6Kxe.js";import"./skeleton-C4EH8VF8.js";import"./avatar-USdFneRN.js";import"./icon-button-CvGVrMJL.js";import"./autocomplete-CT01K3nf.js";import"./label-DwYtoavE.js";import"./button-BApUEgZW.js";import"./button-toggle-group-C313Qpis.js";import"./checkbox-BNaDur5-.js";import"./switch-B3HYUxdj.js";import"./base-field-DnyNt-Yd.js";import"./text-field-CpSfPocF.js";import"./backdrop-BZvWLwDX.js";import"./badge-CH-ibTj3.js";import"./banner-Ce9sAkFw.js";import"./bottom-sheet-C1jDSkxP.js";import"./dialog-D3BzxWt2.js";import"./button-area-VUYCJpLs.js";import"./calendar-DKVitxlb.js";import"./card-BmuWhvgj.js";import"./chip-set-CVBElNQP.js";import"./circular-progress-xrl2HF46.js";import"./color-picker-DSXxCxs3.js";import"./date-picker-C9K_r-7i.js";import"./date-range-picker-lIY1FBrt.js";import"./divider-DoNAUeHX.js";import"./base-drawer-DcDVrIqr.js";import"./drawer-BllaMlBA.js";import"./modal-drawer-CZ3WTkcn.js";import"./mini-drawer-B7yhXATB.js";import"./file-picker-CC5nSgSq.js";import"./floating-action-button-DgbsMxI1.js";import"./inline-message-By3BVHSa.js";import"./key-item-Dd3UCsSn.js";import"./keyboard-shortcut-Cs_3tUZu.js";import"./label-value-CaouEyrO.js";import"./meter-group-EOQUdhg7.js";import"./page-state-em5vC-QK.js";import"./paginator-CMQOcW-K.js";import"./scaffold-CGyusmPL.js";import"./select-dropdown-CZftB_AV.js";import"./select-DjvyOcF1.js";import"./skip-link-BP1PC1Az.js";import"./slider-DzAe4ZmL.js";import"./split-view-CRtxdIks.js";import"./stack-niTWfPr5.js";import"./stepper-DJWPwbnX.js";import"./table-eEsyXCkt.js";import"./tab-bar-C6TF7M88.js";import"./time-picker-Dl0YYNuB.js";import"./toast-BWBdWgdg.js";import"./toolbar-Byb6kcao.js";import"./tooltip-BZNSu0mZ.js";import"./view-switcher-EfMcYRc9.js";import"./deprecated-icon-button-DbRud03D.js";import"./split-button-Bh5M47Us.js";const c="forge-label-value",P={title:"Components/Label Value",render:e=>{const i=$(e),r=A({...i,width:e.ellipsis?"100px":null});return o`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${r}>
        <label slot="label">Label</label>
        ${e.empty?o`<span slot="value">n/a</span>`:o`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:c,parameters:{actions:{disable:!0}},argTypes:{...C({tagName:c,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...x,render:()=>(H.define([L]),o`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...x,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:r,withIcon:V,...z})=>{const n=$(z)??{};r&&(n.maxWidth="150px");const p=n?A(n):m;return console.log(p),o`
      <div class=${M({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":r})} style=${p}>
        ${V?o`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:m}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":r?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
      </div>
    `}};var g,u,d;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(d=(u=s.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var f,v,b;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(b=(v=t.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var y,h,S;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...(S=(h=l.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var w,I,_;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
      cssVarArgs['maxWidth'] = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    console.log(style);
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
}`,...(_=(I=a.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const D=["Demo","Icon","Inline","CSSOnly"],eo=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:D,default:P},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,eo as L,l as a};

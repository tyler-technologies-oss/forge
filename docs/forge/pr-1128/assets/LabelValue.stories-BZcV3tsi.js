import{A as p,b as r}from"./iframe-1amZ02A4.js";import{s as c,b as g,g as b}from"./utils-s6uih_-r.js";import{o as u}from"./style-map-DhE_eh_-.js";import{e as y}from"./class-map-UonRD9uw.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-BF2mgCNg.js";import"./expansion-panel-CBChvPjR.js";import"./open-icon-Nqx8IYIH.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CYKmH8Qe.js";import"./state-layer-DFBFTfpT.js";import"./focus-indicator-C5TEsO7E.js";import{I as h,e as S}from"./tyler-icons-CzoCbVaa.js";import"./menu-Ba834p8F.js";import"./linear-progress-DSeJSqzy.js";import"./list-7b1y5hwO.js";import"./popover-uUF2Q5pH.js";import"./overlay-xfWlPvUl.js";import"./skeleton-CfBVzZbg.js";import"./avatar-CFsh7WCn.js";import"./icon-button-DIbOVWXo.js";import"./autocomplete-x8xjn1HM.js";import"./label-bKp8WFBS.js";import"./button-YbSFJWqY.js";import"./button-toggle-group-CCsqyC6G.js";import"./checkbox-DZ8Y-EwU.js";import"./switch-CR8fKfBF.js";import"./base-field-BKgwQlzN.js";import"./text-field-Dij8M865.js";import"./backdrop-CFGTkHhD.js";import"./badge-BtIVeCB_.js";import"./banner-CYdZEO_F.js";import"./bottom-sheet-CrL0V2kM.js";import"./dialog-BYgxglOb.js";import"./button-area-CDYs9pSf.js";import"./calendar-A2Vs30Qb.js";import"./card-BvgwV_S5.js";import"./chip-set-DIq7DtGu.js";import"./circular-progress-CgxBC_0i.js";import"./color-picker-ws0MTkij.js";import"./date-picker-fQiyxFr6.js";import"./date-range-picker-BcabKXjm.js";import"./divider-DJWSVjA8.js";import"./base-drawer-CHln_uqB.js";import"./drawer-BshiIxT3.js";import"./modal-drawer-CvOegoGK.js";import"./mini-drawer-D9JJJUxN.js";import"./file-picker-06FB0o8M.js";import"./floating-action-button-DLPRa7LF.js";import"./inline-message-DD5odYkL.js";import"./key-item-BSfdraj-.js";import"./keyboard-shortcut-BR2S-sKL.js";import"./label-value-CGaatwms.js";import"./meter-group-Cn9D_BXF.js";import"./page-state-CO91jfaQ.js";import"./paginator-NrUZYg8u.js";import"./scaffold-DS4rOy-Y.js";import"./select-dropdown-d9jFTl9H.js";import"./select-ch4D81ze.js";import"./skip-link-DJWVCgKS.js";import"./slider-CFvPSsjb.js";import"./deprecated-icon-button-BA90Qr3T.js";import"./split-view-CsjuZ6uq.js";import"./stack-t6PyyOMT.js";import"./stepper-EvRfoy3R.js";import"./table-MY5bENqz.js";import"./tab-bar-1pCfMM_X.js";import"./time-picker-CA7-xOny.js";import"./toast-zSO_YKXU.js";import"./toolbar-C3hZOw9r.js";import"./tooltip-CZ9l9EMe.js";import"./tree-item-deCS-W7P.js";import"./view-switcher-BGnLVwx1.js";import"./split-button-D2rq4I5W.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

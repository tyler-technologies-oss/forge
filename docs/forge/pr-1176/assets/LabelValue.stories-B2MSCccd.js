import{A as p,b as r}from"./iframe-Hc2vxO-3.js";import{s as c,b as g,g as b}from"./utils-Ck-gGzab.js";import{o as u}from"./style-map-DymULE9L.js";import{e as y}from"./class-map-BirZx8YG.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CdtSBUx8.js";import"./app-bar-profile-button-syFfQTxl.js";import{I as h,e as S}from"./tyler-icons-BvDuEu60.js";import"./menu-BaLi85Ee.js";import"./linear-progress-Do3VWKo6.js";import"./list-LZCTD_xB.js";import"./popover-DSD9tpUV.js";import"./overlay-sExqbF4-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-ChM8mDa3.js";import"./avatar-CjBGbrW9.js";import"./icon-button-DrvoDOGf.js";import"./focus-indicator-B1FXTb5O.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-BY6nMtJv.js";import"./label-BQ6Zcfgc.js";import"./button-izRvq-sn.js";import"./button-toggle-group-COtB5IPL.js";import"./checkbox-BIwL8kgt.js";import"./switch-BxdaZ3zk.js";import"./base-field-B6Trs6w0.js";import"./text-field-CAx8lM7f.js";import"./backdrop-B0IRqNVE.js";import"./badge-Dj9DN67U.js";import"./banner-Crt7uQfR.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-Dsjrx5PC.js";import"./calendar-DzRD8pbD.js";import"./card-ooFRJGqH.js";import"./chip-set-D5lTVVnL.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-CYJCD5Mq.js";import"./date-picker-D82PVcO-.js";import"./date-range-picker-C1fMBeEE.js";import"./divider-OH7puZwD.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Dv4xr34o.js";import"./open-icon-DmeI41T3.js";import"./file-picker-C5Zepj4P.js";import"./floating-action-button-Bd3HNQwZ.js";import"./inline-message-wW24XM3J.js";import"./key-item-D4rSCsdC.js";import"./keyboard-shortcut-BTW1Rqev.js";import"./label-value-DjHFGdMo.js";import"./meter-group-DOQIOuFA.js";import"./page-state-DECQz5Rm.js";import"./paginator-DhFEDguD.js";import"./scaffold-F_aQKixv.js";import"./secret-BOxaZ37H.js";import"./select-dropdown-DLgF2uPz.js";import"./select-7YxbUEnH.js";import"./skip-link-CzjUa65p.js";import"./slider-DpeOtCeX.js";import"./split-view-GEhlViX4.js";import"./stack-DEQW1E_G.js";import"./stepper-mxmQmLzf.js";import"./table-DZHOw0pP.js";import"./tab-bar-DYvMZbKL.js";import"./time-picker-CEL4bzkW.js";import"./timestamp-gfscBUNz.js";import"./toast-BzhfeWsc.js";import"./toolbar-DJ05uX5e.js";import"./tooltip-Zih5Vpcf.js";import"./tree-item-Bqif1_OG.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-6TgqE8cM.js";import"./split-button-DvJl0JSp.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

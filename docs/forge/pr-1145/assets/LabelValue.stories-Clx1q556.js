import{A as p,b as r}from"./iframe-DMB8y2Lk.js";import{s as c,b as g,g as b}from"./utils-CqVN-aYX.js";import{o as u}from"./style-map-8UarLr56.js";import{e as y}from"./class-map-CxskXF_b.js";import"./service-adapter-8tADcN_b.js";import"./accordion-bW4b1unh.js";import"./app-bar-profile-button-DEqqY3ge.js";import{I as h,e as S}from"./tyler-icons-q3qt_rXj.js";import"./menu-hqANTDB_.js";import"./linear-progress-BvuLf7up.js";import"./list-Dpozo5Vs.js";import"./popover-DGXtkWZ2.js";import"./overlay-gLArHX3C.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CxWWXsKD.js";import"./avatar-CpqEZalC.js";import"./icon-button-CuvVCAic.js";import"./focus-indicator-Z65mqrHe.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-Beh3b5Tn.js";import"./label-CtOXRnEQ.js";import"./base-field-BMt88HlZ.js";import"./text-field-IZlwEFX7.js";import"./backdrop-SMwLBDG5.js";import"./badge-BFBj9MQi.js";import"./banner-C9mF7SZi.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-C4mvuQme.js";import"./button-toggle-group-Bpa5MWtD.js";import"./button-DEzPgAqM.js";import"./calendar-DxFOq1z6.js";import"./card-CIWuVsOo.js";import"./checkbox-CcIbF4gU.js";import"./chip-set-Bao77nzT.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-N66UEPXF.js";import"./date-picker-DYGe_MbN.js";import"./date-range-picker-YQvqaD6r.js";import"./divider-rDWdxIay.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-D5BgVMfo.js";import"./open-icon-BNYhGlj8.js";import"./file-picker-DOJPQPZA.js";import"./floating-action-button-CIpOqnJt.js";import"./inline-message-Dej6nioH.js";import"./key-item-By2PEjn4.js";import"./keyboard-shortcut--wykzj_t.js";import"./label-value-CJDyRgCt.js";import"./meter-group-BD7Pxt4s.js";import"./page-state-xtTZreUO.js";import"./paginator-DT4qra52.js";import"./radio-group-CQSrXybe.js";import"./scaffold-l7cEUk27.js";import"./secret-i1iVXtPf.js";import"./select-dropdown-xx_NiRKG.js";import"./select-DX_Fyl5j.js";import"./skip-link-D4kbsAIA.js";import"./slider-kXDT_RaM.js";import"./split-view-CnLFSGvp.js";import"./stack-DYrRnd9D.js";import"./stepper-CxCMSQeH.js";import"./switch-BSoF-cUx.js";import"./table-DYJPoDTE.js";import"./tab-bar-DVV4RxWB.js";import"./time-picker-Ccg6qbzQ.js";import"./toast-DipUGrBn.js";import"./toolbar-DX4Q6lV7.js";import"./tooltip-CifLNMza.js";import"./tree-item-Etxot378.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-DaZCzBG0.js";import"./split-button-D5y8QrXL.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

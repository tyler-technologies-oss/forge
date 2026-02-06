import{A as p,b as r}from"./iframe-DdIHyASQ.js";import{s as c,b as g,g as b}from"./utils-CahvXhhw.js";import{o as u}from"./style-map-DcrAbPhX.js";import{e as y}from"./class-map-H-xQdlxb.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BbIQ9d_o.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-Bqc_fXik.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-uodH7OpA.js";import{I as h,e as S}from"./tyler-icons-B0WPf66k.js";import"./menu-YVmc8C5m.js";import"./linear-progress-CsYLd0m5.js";import"./list-BUAyRRaS.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar--XQgll8F.js";import"./icon-button-4Ugq7Vza.js";import"./autocomplete-DCbBWGo6.js";import"./label-D0awfgcq.js";import"./button-BicBGy8b.js";import"./button-toggle-group-CpmH90E6.js";import"./checkbox-DkUBqL33.js";import"./switch-jtBvLIJF.js";import"./base-field-CR62eHRX.js";import"./text-field-MOo4FAf4.js";import"./backdrop-ZqVEdIYI.js";import"./badge-CRt7zSJ4.js";import"./banner-wS4VpkEo.js";import"./bottom-sheet-DeyRABAG.js";import"./dialog-Dic_j1BD.js";import"./button-area-DMfOJJX-.js";import"./calendar-DYUGkwpT.js";import"./card-cHHft-TI.js";import"./chip-set-DvZSc5kk.js";import"./circular-progress-Ctu3rS_y.js";import"./color-picker-CnEeeBvF.js";import"./date-picker-BcnUol4f.js";import"./date-range-picker-CQKrHw2a.js";import"./divider-DtS4IZ9-.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./mini-drawer-B6eLxgR7.js";import"./file-picker-NepK9WOd.js";import"./floating-action-button-dN4mmoWy.js";import"./inline-message-BmHmX7vQ.js";import"./key-item-DSN5puQy.js";import"./keyboard-shortcut-C5gmWfMz.js";import"./label-value-D-KSqHDU.js";import"./meter-group-CYr1w50N.js";import"./page-state-BU7mMB2L.js";import"./paginator-DZ0j5vHQ.js";import"./scaffold-B_qTjcmL.js";import"./select-dropdown-BKs-WjZ1.js";import"./select-CJzUOcWx.js";import"./skip-link-DWi9tiJS.js";import"./slider-BP9-rgm4.js";import"./split-view-BDGYzXgW.js";import"./stack-D2V5d6LJ.js";import"./stepper-BwwqaVCk.js";import"./table-Z6MF_nPv.js";import"./tab-bar-B64ExacE.js";import"./time-picker-DIAGdMvL.js";import"./toast-DlZtx6lb.js";import"./toolbar-BK4uxBaY.js";import"./tooltip-D8ywo7jr.js";import"./tree-item-BsRTlYL0.js";import"./view-switcher-BOebY1Oz.js";import"./deprecated-icon-button-CSKkaM1I.js";import"./split-button-Dz074bXH.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

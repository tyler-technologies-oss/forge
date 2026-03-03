import{A as p,b as r}from"./iframe-BJoIjGP7.js";import{s as c,b as g,g as b}from"./utils-DlRR_6up.js";import{o as u}from"./style-map-Bdj4ijuo.js";import{e as y}from"./class-map-CNeOa_ju.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CMVcOjIr.js";import"./expansion-panel-PLmKZqMG.js";import"./open-icon-C85rqQKN.js";import"./app-bar-profile-button-D3bkLnky.js";import"./state-layer-CwwoRddA.js";import"./focus-indicator-D1CeImek.js";import{I as h,e as S}from"./tyler-icons-Dn_DGO8W.js";import"./index-DTwfV0k0.js";import"./menu-BmbMI8hP.js";import"./linear-progress-BPDXw63a.js";import"./list-BmIuUSdG.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";import"./avatar-N430sfyE.js";import"./icon-button-D_JhKJdr.js";import"./autocomplete-BXTs_Zwu.js";import"./label-Dgyq1CIh.js";import"./button-Dgz3L8XP.js";import"./button-toggle-group-CwOE63C0.js";import"./checkbox-AWV5368s.js";import"./switch-HtibWHBE.js";import"./base-field-CJNUJxZl.js";import"./text-field-Bcd69DcX.js";import"./backdrop-D38KdwVf.js";import"./badge-BBYNrs72.js";import"./banner-amxffdbz.js";import"./bottom-sheet-Bz5tAfnc.js";import"./dialog-BHIjTFN9.js";import"./button-area-DMDzos8p.js";import"./calendar-CiQ-HJ1G.js";import"./card-CMt8gpzZ.js";import"./chip-set-0IeYNZwY.js";import"./circular-progress-sCU3ipF0.js";import"./color-picker-BPWawRTb.js";import"./date-picker-RvMf5-8E.js";import"./date-range-picker-DNgxXgdZ.js";import"./divider-C8Z9knLF.js";import"./base-drawer-DhUDqhET.js";import"./drawer-CBjgLAp7.js";import"./modal-drawer-B92jreWY.js";import"./mini-drawer-BoKnXVqz.js";import"./file-picker-B567HrPJ.js";import"./floating-action-button-BZ8tj-DN.js";import"./inline-message-Bxm-OuA9.js";import"./key-item-CGb4rp9N.js";import"./keyboard-shortcut-BUn6QSxQ.js";import"./label-value-CWtpDJwk.js";import"./meter-group-BThPnNY2.js";import"./page-state-B0m1Ibgi.js";import"./paginator-BOUIa-fR.js";import"./scaffold-Cez5RFLR.js";import"./select-dropdown-BIvIwxzy.js";import"./select-COV-J2JN.js";import"./skip-link-DtZbAdhQ.js";import"./slider-CWDyqap3.js";import"./split-view-CqvI6t-U.js";import"./stack-Csa7srza.js";import"./stepper-BxtnH_We.js";import"./table-bFSnDLq_.js";import"./tab-bar-CmgKl_ko.js";import"./time-picker-C8XgScfg.js";import"./toast-DAHlsxvg.js";import"./toolbar-EYXxyIl9.js";import"./tooltip-CMogPifb.js";import"./tree-item-Bjoq5sny.js";import"./view-switcher-CFtDEX4F.js";import"./deprecated-icon-button-D50L3ng_.js";import"./split-button-BcVWqDtf.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

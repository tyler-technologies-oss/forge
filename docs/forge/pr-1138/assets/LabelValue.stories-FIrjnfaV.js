import{A as p,b as r}from"./iframe-D8QRU-tV.js";import{s as c,b as g,g as b}from"./utils-QQyHyWEl.js";import{o as u}from"./style-map-UpbrRikP.js";import{e as y}from"./class-map-u3X-Wut3.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C-sTWBrd.js";import"./app-bar-profile-button-CcsIdpMb.js";import{I as h,e as S}from"./tyler-icons-ChHIax3p.js";import"./menu-UH2zjJ-Y.js";import"./linear-progress-BUmXHJif.js";import"./list-BlR1QDBu.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-DDIdQUFA.js";import"./icon-button-BGlfW1oY.js";import"./focus-indicator-azdGC1n3.js";import"./state-layer-Dj8VLfkk.js";import"./autocomplete-C3ycpFuq.js";import"./label-CIZlvnGp.js";import"./button-DSNQ_5yA.js";import"./button-toggle-group-BvL_7CJd.js";import"./checkbox-DRYMIyoy.js";import"./switch-nItaCm0y.js";import"./base-field-r83kWj0E.js";import"./text-field-CcxB30F-.js";import"./backdrop-B_VtJyIN.js";import"./badge-B6Z6yv88.js";import"./banner-BGQn8Ob3.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-RMrC-zbF.js";import"./calendar-DcGpU6V4.js";import"./card-Dv5hDNhO.js";import"./chip-set-B1TmUbcT.js";import"./circular-progress-BmiDq0cM.js";import"./color-picker-Dsb-ZETr.js";import"./date-picker-DZ0L2dTR.js";import"./date-range-picker-C-00gxpk.js";import"./divider-DpmBdJ3L.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DR-_gUVX.js";import"./modal-drawer-DJ67kJSZ.js";import"./mini-drawer-BybnH3Bp.js";import"./expansion-panel-DEn9jmrc.js";import"./open-icon-5s3XIwl0.js";import"./file-picker-BTj9R2g3.js";import"./floating-action-button-CrA8C6By.js";import"./inline-message-CeWMjtBE.js";import"./key-item-uljXKve7.js";import"./keyboard-shortcut-BmSiUxin.js";import"./label-value-DMg7pXRQ.js";import"./meter-group-CZf2gcId.js";import"./page-state-CtvoNG-u.js";import"./paginator-uD7pluI1.js";import"./scaffold-D_SIXSFE.js";import"./secret-Dqcht4Lr.js";import"./select-dropdown-D_U7iz87.js";import"./select-BBtVPH8v.js";import"./skip-link-C3tRo_Cn.js";import"./slider-CBd5rJqr.js";import"./split-view-DtLH06N6.js";import"./stack-BuaXNRar.js";import"./stepper-C6GleWxr.js";import"./table-DsozGQfR.js";import"./tab-bar-YrXEPUVy.js";import"./time-picker-CpWBOXRP.js";import"./toast-niZZSEBf.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-BC19SoDG.js";import"./tree-item-CRhUhqci.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DvVaM_Vi.js";import"./split-button-CiLfpDkY.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

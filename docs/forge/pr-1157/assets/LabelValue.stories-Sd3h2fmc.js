import{A as p,b as r}from"./iframe-TV9XAvMj.js";import{s as c,b as g,g as b}from"./utils-BzaDkCLg.js";import{o as u}from"./style-map-4dTJAmph.js";import{e as y}from"./class-map-BIzENm5v.js";import"./service-adapter-8tADcN_b.js";import"./accordion--nfOL1O2.js";import"./app-bar-profile-button-DlEk9JLR.js";import{I as h,e as S}from"./tyler-icons-DbetBFcH.js";import"./menu-DDhOX8zX.js";import"./linear-progress-BmTkV8LG.js";import"./list-CiW1kkYd.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-Blfnk1s_.js";import"./icon-button--NOIsf5y.js";import"./focus-indicator-9dYm11yZ.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-D2OAtmF8.js";import"./label-DF0EySA1.js";import"./button-NWWsfIKK.js";import"./button-toggle-group-Dok9C68H.js";import"./checkbox-DFyRkJoF.js";import"./switch-B11zG3es.js";import"./base-field-DHTLlkkA.js";import"./text-field-D4g4iwkK.js";import"./backdrop-B-u3npFo.js";import"./badge-CLsv49gK.js";import"./banner-CXpHPohl.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-DM_6_F4R.js";import"./calendar-DHnglAPv.js";import"./card-CiAkEZr5.js";import"./chip-set-CpjmwFSR.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-KrsAOypy.js";import"./date-picker-DpCvKUtN.js";import"./date-range-picker-CIWAwDou.js";import"./divider-CybbUVbI.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-Ho34_dpQ.js";import"./open-icon-CgVNkZ6Y.js";import"./file-picker-d6_NCGKN.js";import"./floating-action-button-CI2nXyzr.js";import"./inline-message-rggUpLwV.js";import"./key-item-DhoYhbH1.js";import"./keyboard-shortcut-DpkrgRTl.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-CVpWccEx.js";import"./page-state-B9wnmWpA.js";import"./paginator-DQu2xwmm.js";import"./scaffold-ALuq0Bgn.js";import"./secret-DIPYrx0Q.js";import"./select-dropdown-CE0Xdp0L.js";import"./select-r_u1mfaY.js";import"./skip-link-CsagLECr.js";import"./slider-BKV36bzD.js";import"./split-view-fdY652S8.js";import"./stack-DGYl-onA.js";import"./stepper-ZvYNLOo6.js";import"./table-DgyGrrns.js";import"./tab-bar-CVte6fK7.js";import"./time-picker-C3We4td2.js";import"./toast-BAKadwUy.js";import"./toolbar-Ce9HD0Yv.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-ChLbqBrl.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-8DIaw4AB.js";import"./split-button-CTccJ27K.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

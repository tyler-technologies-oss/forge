import{A as p,b as r}from"./iframe-MktPgWAA.js";import{s as c,b as g,g as b}from"./utils-C6q7qu_A.js";import{o as u}from"./style-map-6XxNn_yc.js";import{e as y}from"./class-map-BGDlGpHN.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Fy378HAt.js";import"./app-bar-profile-button-1elBJCcS.js";import{I as h,e as S}from"./tyler-icons-0-ZTEdj-.js";import"./menu-j1XxUNlP.js";import"./linear-progress-BmTkV8LG.js";import"./list-DgmFnUWQ.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-B84cpUiy.js";import"./icon-button-DJuSwMyH.js";import"./focus-indicator-C22xxO9c.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-B80xgOIJ.js";import"./label-Dsxzj2Q9.js";import"./button-CLmWBSd0.js";import"./button-toggle-group-CWHFPTny.js";import"./checkbox-DL9PJXu7.js";import"./switch-B9Ie-WGO.js";import"./base-field-AnwAwN2s.js";import"./text-field-CiiLUOIM.js";import"./backdrop-B-u3npFo.js";import"./badge-Dr5HatVf.js";import"./banner-BWYfQXcP.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-DvUgWqwd.js";import"./calendar-B-ceHf0O.js";import"./card-BmiOFj5P.js";import"./chip-set-BhMlB6zT.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-B7JDJbop.js";import"./date-picker-Cj_iAMyL.js";import"./date-range-picker-jaXRNd3W.js";import"./divider-DTjwMswR.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-DTtFpcfh.js";import"./open-icon-CHtGuw8k.js";import"./file-picker-DtAvtFBu.js";import"./floating-action-button-BwHSFqa3.js";import"./inline-message-rggUpLwV.js";import"./key-item-XH5wH2Ns.js";import"./keyboard-shortcut-DCGX6Hgb.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BZBIcKbn.js";import"./page-state-B9wnmWpA.js";import"./paginator-BbWm05Rp.js";import"./scaffold-ALuq0Bgn.js";import"./secret-B3wB5k3u.js";import"./select-dropdown-81N8fl6D.js";import"./select-D7ZINvKO.js";import"./skip-link-DyHbneMa.js";import"./slider-Ca9nWQqy.js";import"./split-view-iaZI9VNa.js";import"./stack-DGYl-onA.js";import"./stepper-K87uGn21.js";import"./table-Ck2SRI76.js";import"./tab-bar-AkVqEWzv.js";import"./time-picker-DivAWA06.js";import"./toast-ETr2DTlu.js";import"./toolbar-DpB4c-Z2.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-ClL9IVgo.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-x7a_m4G_.js";import"./split-button-C697An96.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

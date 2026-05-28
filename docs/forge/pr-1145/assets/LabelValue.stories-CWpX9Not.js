import{A as p,b as r}from"./iframe-CKUxNUwK.js";import{s as c,b as g,g as b}from"./utils-GdTrqNrR.js";import{o as u}from"./style-map-rrsoiJjf.js";import{e as y}from"./class-map-AnOwaCzX.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BktyQHKi.js";import"./app-bar-profile-button-xu2IQOQ5.js";import{I as h,e as S}from"./tyler-icons-Cl-vuQBY.js";import"./menu-Dd1dJSol.js";import"./linear-progress-BmTkV8LG.js";import"./list-6Gz7jq_7.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-CGOk1_cO.js";import"./icon-button-XyjzE-XO.js";import"./focus-indicator-Dxwlqb8p.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-CFfm-jOo.js";import"./label-BtKA7SuN.js";import"./button-Cxvu7MX1.js";import"./button-toggle-group-BWY8bXSY.js";import"./checkbox-zoLOzW2l.js";import"./switch-BX-_PPXh.js";import"./base-field-F3pN73hA.js";import"./text-field-C441wqBF.js";import"./backdrop-B-u3npFo.js";import"./badge-BYJc-A-D.js";import"./banner-BtdZUaBO.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-OzE3r4EG.js";import"./calendar-UYeWjD6_.js";import"./card-BuKzf6LJ.js";import"./chip-set-B6W09Nan.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-Budha77o.js";import"./date-picker-_jMMTZpT.js";import"./date-range-picker-BXEdUs_l.js";import"./divider-dY8S7Dhi.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-C8iGeBLZ.js";import"./open-icon-CqEAyqW8.js";import"./file-picker-DdI1th-v.js";import"./floating-action-button-BLOy2XfL.js";import"./inline-message-rggUpLwV.js";import"./key-item-smHtGpiQ.js";import"./keyboard-shortcut-Cv32Cz15.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-Dc8d6bWn.js";import"./page-state-B9wnmWpA.js";import"./paginator-DX2jcQkB.js";import"./scaffold-ALuq0Bgn.js";import"./secret-DAG0SkNj.js";import"./select-dropdown-DGa8j1fv.js";import"./select-BKKdH_z2.js";import"./skip-link-Ccwkcx0Y.js";import"./slider-BgOdZ1Cg.js";import"./split-view-B2N6v3gV.js";import"./stack-DGYl-onA.js";import"./stepper-S1oHGLTN.js";import"./table-c6StfmX7.js";import"./tab-bar-CopRG1EY.js";import"./time-picker-CqKd-Vhd.js";import"./toast-C6IBJCCF.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-Dl3uS5Qy.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-BkNXpiRv.js";import"./split-button-vaVJrOqA.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

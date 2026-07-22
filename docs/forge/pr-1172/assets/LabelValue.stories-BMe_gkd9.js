import{A as p,b as r}from"./iframe-CjzVpfqS.js";import{s as c,b as g,g as b}from"./utils-Bqf6WcF-.js";import{o as u}from"./style-map-BHakPK_e.js";import{e as y}from"./class-map-BraAMXTq.js";import"./service-adapter-8tADcN_b.js";import"./accordion-rtzAeS_l.js";import"./app-bar-profile-button-BnynZ60a.js";import{I as h,e as S}from"./tyler-icons-J8-UQPDE.js";import"./menu-CcwZnLlk.js";import"./linear-progress-CNsyrVbY.js";import"./list-DyIfwNHS.js";import"./popover-1VKXWetn.js";import"./overlay-BUaUM1sf.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CVBYr5DN.js";import"./avatar-DxpmsgtB.js";import"./icon-button-Y8A9ultm.js";import"./autocomplete-DFted_dJ.js";import"./label-DcyIgUN2.js";import"./button-RZbwlICz.js";import"./button-toggle-group-CizYn0Bm.js";import"./focus-indicator-DHikC1Y8.js";import"./checkbox-px03cLLv.js";import"./switch-xZjZ3ZX2.js";import"./base-field-Cab5qth9.js";import"./text-field-B9xZ2Bp8.js";import"./backdrop-CxI4uXvH.js";import"./badge-Dnzgjas2.js";import"./banner-BmQqOP71.js";import"./bottom-sheet-CKUEV18L.js";import"./dialog-MGs1MZzZ.js";import"./button-area-CSAqYybg.js";import"./calendar-DHsTgjoB.js";import"./card-lohytUav.js";import"./chip-set-DX0UhNMu.js";import"./state-layer-BCX73D4o.js";import"./circular-progress-CKUvGRn4.js";import"./color-picker-EyRmJWEw.js";import"./date-picker-CMJLaZEJ.js";import"./date-range-picker-BtlAmwSw.js";import"./divider-ygs7M1Xv.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-X4iPLOfK.js";import"./modal-drawer-D4sxpTjj.js";import"./mini-drawer-nZrpLlQe.js";import"./expansion-panel-D8sOzjVy.js";import"./open-icon-6s08rbeD.js";import"./file-picker-tMIHYh_N.js";import"./floating-action-button-CdDjPeSY.js";import"./inline-message-Cyv8bbnL.js";import"./key-item-DDGRDYRy.js";import"./keyboard-shortcut-CF-6-Ce3.js";import"./label-value-CWh-_Vq0.js";import"./meter-group-CvCSGroY.js";import"./page-state-CCE7cTVN.js";import"./paginator-CaL0JlzZ.js";import"./scaffold-B3wC-6gb.js";import"./secret-b0yFyJ9k.js";import"./select-dropdown-COsz7B1V.js";import"./select-D9-AWc8o.js";import"./skip-link-CwiqrCFG.js";import"./slider--Ji_TzjP.js";import"./split-view-U0bS3WHe.js";import"./stack-q4IFSwGv.js";import"./stepper-C9ffb3YR.js";import"./table-r5g5k3wY.js";import"./tab-bar-BWGQNMts.js";import"./time-picker-D2rLp28s.js";import"./toast-D6dYB9u_.js";import"./toolbar-jMC9x6_z.js";import"./tooltip-DD6ZsOiy.js";import"./tree-item-D7QJuAJS.js";import"./view-switcher-CG17TL-Z.js";import"./deprecated-icon-button-BJTixzmC.js";import"./split-button-Bb_17qZm.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

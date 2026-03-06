import{A as p,b as r}from"./iframe-Nz47_fHD.js";import{s as c,b as g,g as b}from"./utils-Ba9gsS7G.js";import{o as u}from"./style-map-YtahPS12.js";import{e as y}from"./class-map-Cq4Zsvyu.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Rhnu6CZk.js";import"./app-bar-profile-button-4GmUjn5l.js";import{I as h,e as S}from"./tyler-icons-D4_mmXXb.js";import"./index-DTwfV0k0.js";import"./menu-Cg3oAYpS.js";import"./linear-progress-BUFrhekn.js";import"./list-Cu8bwlYk.js";import"./popover-Dei7Vx-1.js";import"./overlay-C91thjfI.js";import"./skeleton-D7ds2eUz.js";import"./avatar-DYNzJ6XS.js";import"./icon-button-CfSeSDt7.js";import"./focus-indicator-B9pIc8ye.js";import"./state-layer-D2ldILW1.js";import"./autocomplete-DjKvXmbr.js";import"./label-BUhDowKT.js";import"./button-DCmcEZ2V.js";import"./button-toggle-group-By5RlPye.js";import"./checkbox-qD1ZxiPF.js";import"./switch-CuFjOXue.js";import"./base-field-CZ7afn2P.js";import"./text-field-B5oPl4dX.js";import"./backdrop-CGd_1ijy.js";import"./badge-Csy3LzSs.js";import"./banner-DcWQiy3x.js";import"./bottom-sheet-DKhYmQyH.js";import"./dialog-CoLUttnX.js";import"./button-area-QaXqU-NL.js";import"./calendar-CYLPaUv-.js";import"./card-DclqvZs0.js";import"./chip-set-Nh2PwH9O.js";import"./circular-progress-DjM8cQ4Y.js";import"./color-picker-BqtM9Ogx.js";import"./date-picker-jFl5GXQ3.js";import"./date-range-picker-xTWMR1g4.js";import"./divider-UtG3oNpZ.js";import"./base-drawer-BPiRC6hF.js";import"./drawer-CRlAabSP.js";import"./modal-drawer-le40c-8v.js";import"./mini-drawer-DVqGMxN4.js";import"./expansion-panel-DP6abnJe.js";import"./open-icon-DPrRtM-w.js";import"./file-picker-BKcO-4ia.js";import"./floating-action-button-CYb6ar5c.js";import"./inline-message-DVysxEfs.js";import"./key-item-BCDlJU_q.js";import"./keyboard-shortcut-nYhF8vwm.js";import"./label-value-w6aZjl26.js";import"./meter-group-DjN8Duzm.js";import"./page-state-CEMrZKq7.js";import"./paginator-C85Oz1hZ.js";import"./scaffold-4bRcGI7s.js";import"./select-dropdown-gwiuGcyc.js";import"./select-Bkdc5T7d.js";import"./skip-link-BlzOEXi2.js";import"./slider-Bg5gz0hF.js";import"./split-view-C8N1LxRO.js";import"./stack-Dp7al2JQ.js";import"./stepper-D8gDpcUo.js";import"./table-DKmnMYUQ.js";import"./tab-bar-DduOD1Ud.js";import"./time-picker-CTw3-m4g.js";import"./toast-CvzN_vmG.js";import"./toolbar-BFT5XFFB.js";import"./tooltip-BfgpHI7F.js";import"./tree-item-DwM5SCPY.js";import"./view-switcher-B5It4DcS.js";import"./deprecated-icon-button-CiEHQAXV.js";import"./split-button-JNQbakmu.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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

import{x as o,E as m}from"./iframe-B_AFpbKZ.js";import{g as C,s as x,a as $}from"./utils-D0zOu5id.js";import{o as A}from"./style-map-D63BE21Z.js";import{e as M}from"./class-map-B28AMhZr.js";import"./service-adapter-BykFeYYZ.js";import"./accordion-Dj-01N5e.js";import"./expansion-panel-BBO7eYZa.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-DK5zji9b.js";import"./state-layer-BRTtEqto.js";import"./focus-indicator-CyTlhlQD.js";import{I as H,e as L}from"./icon-eJOvSyyv.js";import"./menu-CrovJr5c.js";import"./linear-progress-BTaob5x2.js";import"./list-BKcKppFQ.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";import"./avatar-DD7NlKxa.js";import"./icon-button-U4pg755t.js";import"./autocomplete-Bwlq9PS4.js";import"./label-8C4joo3A.js";import"./button-BjTHYlPk.js";import"./button-toggle-group-BkTZIXUI.js";import"./checkbox-BwaxslW8.js";import"./switch-BxEMfYtZ.js";import"./base-field-CspDK4qd.js";import"./text-field-Ckbn5Mre.js";import"./backdrop-BqEK3-r8.js";import"./badge-C4YDm1UO.js";import"./banner-DwUstg-t.js";import"./bottom-sheet-B0-LCUir.js";import"./dialog-bZFrz6KW.js";import"./button-area-BIwvdsYT.js";import"./calendar-xAIqpgLo.js";import"./card-DWXijWME.js";import"./chip-set-DHKYydN0.js";import"./circular-progress-CZq2hNtE.js";import"./color-picker-Dp18frBk.js";import"./date-picker-B0IhPCwT.js";import"./date-range-picker-CdRZ1M2r.js";import"./divider-BT9ZT4ca.js";import"./base-drawer-DpzFm5sn.js";import"./drawer-CMJX_VXP.js";import"./modal-drawer-BcW7ce7M.js";import"./mini-drawer-DlIAARO3.js";import"./file-picker-M4MPS0hz.js";import"./floating-action-button-BF9AKdiX.js";import"./inline-message-Dq5-MYZT.js";import"./key-item-BKIvLr6d.js";import"./keyboard-shortcut-BkPHDYRH.js";import"./label-value-D_q4g7yi.js";import"./meter-group-CxgztAjx.js";import"./page-state-CHc7wzFU.js";import"./paginator-W8pWflX6.js";import"./scaffold-DGBqen_X.js";import"./select-dropdown-DnF3Eeir.js";import"./select-Bz6noCUM.js";import"./skip-link-BrjEJRJ6.js";import"./slider-B-AH6EQj.js";import"./split-view-CgwXHpZR.js";import"./stack-D7mJ6aR0.js";import"./stepper-BMrWK6Pl.js";import"./table-DkogYtO9.js";import"./tab-bar-BjM0EErf.js";import"./time-picker-D74lFKBf.js";import"./toast-DqQZLmAb.js";import"./toolbar-Bv8KpWT6.js";import"./tooltip-CRaofu57.js";import"./view-switcher-DSx2dL0c.js";import"./deprecated-icon-button-CkXXg8Aq.js";import"./split-button-BIpabqLp.js";const c="forge-label-value",P={title:"Components/Label Value",render:e=>{const i=$(e),r=A({...i,width:e.ellipsis?"100px":null});return o`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${r}>
        <label slot="label">Label</label>
        ${e.empty?o`<span slot="value">n/a</span>`:o`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:c,parameters:{actions:{disable:!0}},argTypes:{...C({tagName:c,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...x,render:()=>(H.define([L]),o`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...x,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:r,withIcon:V,...z})=>{const n=$(z)??{};r&&(n.maxWidth="150px");const p=n?A(n):m;return console.log(p),o`
      <div class=${M({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":r})} style=${p}>
        ${V?o`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:m}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":r?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
      </div>
    `}};var g,u,d;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(d=(u=s.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var f,v,b;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(b=(v=t.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var y,h,S;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...(S=(h=l.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var w,I,_;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
      cssVarArgs['maxWidth'] = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    console.log(style);
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
}`,...(_=(I=a.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const D=["Demo","Icon","Inline","CSSOnly"],eo=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:D,default:P},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,eo as L,l as a};

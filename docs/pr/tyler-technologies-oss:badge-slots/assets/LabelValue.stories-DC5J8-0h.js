import"./lit-element-BuSzPo2N.js";import{x as o,E as m}from"./lit-html-Ox1a2bD1.js";import{g as C,s as x,b as $}from"./utils-C9ubTmun.js";import{o as A}from"./style-map-CeIg-cuG.js";import{e as M}from"./class-map-D3FxRsP9.js";import"./feature-detection-CY6TVbRZ.js";import"./accordion-Dm9xnQv4.js";import"./expansion-panel-D16dSnMu.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-DmiB2VeR.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import{I as H,e as L}from"./icon-Bqgt-0wI.js";import"./menu-DoGfQb_z.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./skeleton-DocRecw2.js";import"./avatar-J3yRSZ-u.js";import"./icon-button-BkG6pY8m.js";import"./autocomplete-DypEH4r3.js";import"./label-BM0pESju.js";import"./button-CC-L5W3b.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./switch-ZI6WyDhE.js";import"./base-field-DFQttNW4.js";import"./text-field-CGeuarYD.js";import"./backdrop-Bv12Tb1U.js";import"./badge-DZcU4TLt.js";import"./banner-BiV2PXva.js";import"./bottom-sheet-CgdS1vNC.js";import"./dialog-DEObTM6-.js";import"./button-area-DkxJjLzq.js";import"./calendar-CT4vE586.js";import"./card-Cvm6cje1.js";import"./chip-set-BaPPEndZ.js";import"./circular-progress-pTvFqlis.js";import"./color-picker-C-nN1HcS.js";import"./date-picker-CI7xepNt.js";import"./date-range-picker-nZeORJPW.js";import"./divider-DBTw_7sm.js";import"./base-drawer-C68FwRuM.js";import"./drawer-DpoxQTjp.js";import"./modal-drawer-XYvP5Fib.js";import"./mini-drawer-uH-d4rqn.js";import"./file-picker-C7CcS7b7.js";import"./floating-action-button-CJ2m4J0M.js";import"./inline-message-CTo_BAYA.js";import"./key-item-fm9Fe_DR.js";import"./keyboard-shortcut-wz335gzF.js";import"./label-value-BHIrdMWh.js";import"./meter-group-Bwzct4Py.js";import"./page-state-Bl7puESY.js";import"./paginator-CUEGWPKf.js";import"./scaffold-BjMvQLbF.js";import"./select-dropdown-CZdSzMMv.js";import"./select-Deij91Nn.js";import"./skip-link-CkowTV5X.js";import"./slider-CTd3yYpZ.js";import"./split-view-CMQfhTzS.js";import"./stack-CpbYXLv7.js";import"./stepper-DmXVaR4b.js";import"./table-CXiILDHY.js";import"./tab-bar-C57kyXDQ.js";import"./time-picker-2LYr3XTv.js";import"./toast-d_4OHFWC.js";import"./toolbar-CJj-iw1_.js";import"./tooltip-BRjtM3KC.js";import"./view-switcher-CMdWoHU0.js";import"./deprecated-icon-button-taoMeYaJ.js";import"./split-button-1ZOFPfW2.js";const c="forge-label-value",P={title:"Components/Label Value",render:e=>{const i=$(e),r=A({...i,width:e.ellipsis?"100px":null});return o`
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
}`,...(_=(I=a.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const D=["Demo","Icon","Inline","CSSOnly"],oo=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:D,default:P},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,oo as L,l as a};
